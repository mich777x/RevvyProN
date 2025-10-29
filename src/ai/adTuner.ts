import { PrismaClient } from "@prisma/client";
import { generateAdCreative } from "./revvyBrain";
import { viralScoreFromForecast } from "./scoring";

const prisma = new PrismaClient();

/**
 * Strategy v1:
 * - Pick top N creatives by observed CTR (fallback: by viralScore)
 * - Regenerate 1 variant per top creative
 * - Save as new Creative rows linked to same Product
 * - Log a PredictionRun and return counts
 */
export async function runAdaptiveTuner(topN = 5) {
	// Prefer creatives with CTR; fallback to viralScore if CTR is null
	const base = await prisma.creative.findMany({
		orderBy: [{ ctr: "desc" }, { viralScore: "desc" }, { createdAt: "desc" }],
		take: topN,
		include: { product: true },
	});

	let regenerated = 0;

	for (const c of base) {
		const promptBoost = `Make variant with a stronger hook and urgency. Keep product consistent: ${c.product.title}`;
		const variant = await generateAdCreative({
			title: c.product.title,
			description: `${c.description}\n${promptBoost}`,
			imageUrl: c.product.imageUrl ?? undefined,
		});

		const score = viralScoreFromForecast(variant.headline, variant.primary, variant.description);

		const created = await prisma.creative.create({
			data: {
				productId: c.productId,
				headline: variant.headline,
				primary: variant.primary,
				description: variant.description,
				imagePrompt: variant.imagePrompt,
				viralScore: score,
			},
		});

		await prisma.predictionRun.create({
			data: {
				creativeId: created.id,
				cpc: 0.8,
				cpa: 12,
				roi: 1.5,
				notes: "tuner_v1 seed forecast",
			},
		});

		regenerated++;
	}

	return { status: "DONE", selected: base.length, regenerated };
}
