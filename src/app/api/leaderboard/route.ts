import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
	const since = new Date();
	since.setDate(since.getDate() - 7);

	// Top creatives by: (viralScore * 0.6 + last ROI*100 * 0.4), last 7 days bias
	const creatives = await prisma.creative.findMany({
		where: { createdAt: { gte: since } },
		include: { product: true, runs: { orderBy: { createdAt: "desc" }, take: 1 } },
		orderBy: [{ viralScore: "desc" }],
		take: 50,
	});

	const scores = creatives.map((c) => {
		const roi = c.runs[0]?.roi ?? 0;
		const blend = Math.round(0.6 * c.viralScore + 0.4 * Math.max(0, Math.min(100, (roi + 1) * 25)));
		return {
			id: c.id,
			productTitle: c.product?.title ?? "Product",
			headline: c.headline,
			viralScore: c.viralScore,
			roi,
			score: blend,
			createdAt: c.createdAt,
		};
	});

	scores.sort((a, b) => b.score - a.score);

	return NextResponse.json(scores.slice(0, 10));
}
