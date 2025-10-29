import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { generateAdCreative } from "@/ai";
import { viralScoreFromForecast } from "@/ai/scoring";

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const { count = 3 } = await req.json();

	const base = await prisma.creative.findUnique({ where: { id }, include: { product: true } });
	if (!base || !base.product) return NextResponse.json({ error: "creative not found" }, { status: 404 });

	const createdIds: string[] = [];

	for (let i = 0; i < Math.min(10, Math.max(1, Number(count))); i++) {
		const variant = await generateAdCreative({
			title: base.product.title,
			description: `${base.description}\nVariant #${i + 1}: stronger hook + urgency.`,
			imageUrl: base.product.imageUrl ?? undefined,
		});
		const score = viralScoreFromForecast(variant.headline, variant.primary, variant.description);
		const v = await prisma.creative.create({
			data: {
				productId: base.productId,
				headline: variant.headline,
				primary: variant.primary,
				description: variant.description,
				imagePrompt: variant.imagePrompt,
				viralScore: score,
			},
		});
		createdIds.push(v.id);
	}

	return NextResponse.json({ ok: true, created: createdIds.length, ids: createdIds }, { status: 201 });
}
