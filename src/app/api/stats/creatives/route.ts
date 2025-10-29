import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
	const creatives = await prisma.creative.findMany({
		include: { product: true, runs: { orderBy: { createdAt: "desc" }, take: 1 } },
		orderBy: [{ viralScore: "desc" }, { createdAt: "desc" }],
		take: 100,
	});

	const rows = creatives.map((c) => {
		const last = c.runs[0];
		return {
			id: c.id,
			productTitle: c.product?.title ?? "Product",
			headline: c.headline,
			viralScore: c.viralScore,
			ctr: c.ctr ?? null,
			roi: last?.roi ?? null,
			createdAt: c.createdAt,
		};
	});

	return NextResponse.json(rows);
}
