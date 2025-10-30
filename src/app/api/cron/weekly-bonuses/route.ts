import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { startOfWeekUTC, daysAgoUTC } from "@/utils/date";

const prisma = new PrismaClient();

/**
 * - Computes last week's leaderboard (Mon..Sun UTC)
 * - Awards bonuses to Top N (default 10) with descending amounts
 * - Stores WeeklyBonus (paid=false). Day 9 will pay these via Stripe.
 */
export async function POST() {
	const now = new Date();
	const thisWeekStart = startOfWeekUTC(now);
	const lastWeekStart = new Date(thisWeekStart);
	lastWeekStart.setUTCDate(thisWeekStart.getUTCDate() - 7);
	const lastWeekEnd = new Date(thisWeekStart);
	lastWeekEnd.setUTCMilliseconds(-1);

	// Gather affiliate metrics for last 7 days
	const affiliates = await prisma.affiliate.findMany({
		include: {
			referrals: {
				where: { createdAt: { gte: lastWeekStart, lte: lastWeekEnd } },
				select: { converted: true },
			},
		},
		take: 1000,
	});

	const rows = affiliates.map((a) => {
		const clicks = a.referrals.length;
		const conversions = a.referrals.filter((r) => r.converted).length;
		const earnings = a.earnings || 0;
		const score = conversions * 10 + clicks * 1 + earnings / 10;
		return { id: a.id, score };
	});

	rows.sort((a, b) => b.score - a.score);

	const TOP_N = 10;
	const bonusSchedule = [2000, 1500, 1200, 1000, 800, 600, 500, 400, 300, 200];
	const awarded = [];

	for (let i = 0; i < Math.min(TOP_N, rows.length); i++) {
		const row = rows[i];
		const bonusAmount = bonusSchedule[i] ?? 200;
		// Idempotent upsert (one record per affiliate per weekStart)
		const rec = await prisma.weeklyBonus.upsert({
			where: { affiliateId_weekStart: { affiliateId: row.id, weekStart: lastWeekStart } },
			update: { rank: i + 1, bonusAmount },
			create: { affiliateId: row.id, weekStart: lastWeekStart, rank: i + 1, bonusAmount },
		});
		// track affiliate weekly points + last rank
		await prisma.affiliate.update({
			where: { id: row.id },
			data: { weeklyPoints: Math.round(row.score), lastWeekRank: i + 1 },
		});
		awarded.push({ affiliateId: row.id, rank: i + 1, bonusAmount });
	}

	return NextResponse.json({
		week: { start: lastWeekStart.toISOString(), end: lastWeekEnd.toISOString() },
		awardedCount: awarded.length,
		awarded,
	});
}

export const dynamic = "force-dynamic";
