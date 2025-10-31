import { NextResponse } from "next/server";
import { PrismaClient, Prisma, WeeklyBonus } from "@prisma/client";
import { sendEmail, emails } from "@/lib/email";

const prisma = new PrismaClient();

// POST { weekStartISO?: string } -> pays all unpaid WeeklyBonus for that week
export async function POST(req: Request) {
	const body = (await req.json().catch(() => ({}))) as { weekStartISO?: string };
	const weekStartISO = body.weekStartISO;

	// Properly typed filter
	const where: Prisma.WeeklyBonusWhereInput = { paid: false };
	if (weekStartISO) where.weekStart = new Date(weekStartISO);

	// Query bonuses with affiliate relation
	const bonuses = await prisma.weeklyBonus.findMany({
		where,
		include: { affiliate: true },
		take: 100,
	});

	// Explicit array type
	const results: WeeklyBonus[] = [];

	for (const b of bonuses) {
		const updated = await prisma.weeklyBonus.update({
			where: { id: b.id },
			data: { paid: true, stripePayoutId: `sim_${b.id.slice(0, 8)}` },
		});

		results.push(updated);

		const affiliateEmail = b.affiliate?.userEmail ?? null;
		if (affiliateEmail) {
			const msg = emails.bonusPaid(b.bonusAmount);
			await sendEmail(affiliateEmail, msg.subject, msg.text);
		}
	}

	return NextResponse.json({ paid: results.length, items: results }, { status: 200 });
}

export const dynamic = "force-dynamic";
