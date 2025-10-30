import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
	const clicks = await prisma.referral.count();
	const conversions = await prisma.referral.count({ where: { converted: true } });
	const earningsAgg = await prisma.affiliate.aggregate({ _sum: { earnings: true } });
	return NextResponse.json({
		clicks,
		conversions,
		earnings: earningsAgg._sum.earnings || 0,
	});
}
