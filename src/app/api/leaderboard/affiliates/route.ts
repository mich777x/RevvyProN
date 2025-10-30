import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { daysAgoUTC } from "@/utils/date";

const prisma = new PrismaClient();

export async function GET() {
	const since = daysAgoUTC(7);

	const affiliates = await prisma.affiliate.findMany({
		include: {
			referrals: {
				where: { createdAt: { gte: since } },
				select: { converted: true },
			},
		},
		orderBy: { createdAt: "asc" },
		take: 500,
	});

	type Row = { refCode: string; email: string; clicks: number; conversions: number; earnings: number; score: number };
	const rows: Row[] = affiliates.map((a) => {
		const clicks = a.referrals.length;
		const conversions = a.referrals.filter((r) => r.converted).length;
		const earnings = a.earnings || 0;
		const score = conversions * 10 + clicks * 1 + earnings / 10;
		return { refCode: a.refCode, email: a.userEmail, clicks, conversions, earnings, score };
	});

	rows.sort((a, b) => b.score - a.score);
	const top = rows.slice(0, 25).map((r, i) => ({ rank: i + 1, ...r }));

	return NextResponse.json(top);
}
