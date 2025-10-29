import { aiClient } from "@/lib/aiClient";

export type ProductInput = { title: string; description?: string; imageUrl?: string };
export type CreativeOutput = { headline: string; primary: string; description: string; imagePrompt?: string };

export async function generateAdCreative(p: ProductInput): Promise<CreativeOutput> {
	const prompt = `Create a high-CTR Shopify ad.
Product: ${p.title}
Description: ${p.description ?? ""}`;
	const text = await aiClient.generate(prompt);
	return {
		headline: `Try ${p.title} — ${text.slice(0, 24)}`,
		primary: `Why ${p.title}? ${text.slice(0, 48)}`,
		description: `Tap to see more about ${p.title}.`,
		imagePrompt: `Cinematic product shot of ${p.title}, neon rim light.`,
	};
}
