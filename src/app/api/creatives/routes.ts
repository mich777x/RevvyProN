import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateAdCreative } from "@/ai";
import { viralScoreFromForecast } from "@/ai/scoring";

const prisma = new PrismaClient();

export async function GET() {
	const items = await prisma.creative.findMany({
		orderBy: { createdAt: "desc" },
		take: 50,
		include: { product: true, runs: true },
	});
	return NextResponse.json(items);
}

export async function POST(req: Request) {
	const { product } = (await req.json()) as { product: { title: string; description?: string; imageUrl?: string } };

	const creative = await generateAdCreative(product);
	const score = viralScoreFromForecast(creative.headline, creative.primary, creative.description);

	const handle = product.title.toLowerCase().replace(/\s+/g, "-");
	const prod = await prisma.product.upsert({
		where: { handle },
		create: { title: product.title, handle, imageUrl: product.imageUrl },
		update: {},
	});

	const saved = await prisma.creative.create({
		data: {
			productId: prod.id,
			headline: creative.headline,
			primary: creative.primary,
			description: creative.description,
			imagePrompt: creative.imagePrompt,
			viralScore: score,
		},
		include: { product: true, runs: true },
	});

	return NextResponse.json(saved, { status: 201 });
}
