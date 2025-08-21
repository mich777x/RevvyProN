type Platform = "tiktok" | "facebook" | "instagram" | "google";

type GenInput = {
	productName: string;
	productUrl?: string;
	audience: string;
	benefit: string;
	tone: "bold" | "friendly" | "luxury" | "playful" | "urgent";
	platform: Platform;
};

const toneStyle = (tone: GenInput["tone"]) => {
	switch (tone) {
		case "bold":
			return ["punchy", "direct", "confident"];
		case "friendly":
			return ["warm", "helpful", "simple"];
		case "luxury":
			return ["elevated", "refined", "premium"];
		case "playful":
			return ["fun", "quirky", "energetic"];
		case "urgent":
			return ["time‑sensitive", "scarcity", "action‑driven"];
	}
};

const platformHint = (p: Platform) => {
	switch (p) {
		case "tiktok":
			return "Short, hooky, UGC feel, on-screen captions";
		case "instagram":
			return "Reels/Stories, aesthetic visuals, concise copy";
		case "facebook":
			return "Clear benefit, social proof, strong CTA";
		case "google":
			return "Keyword-aligned, concise headlines, direct value";
	}
};

const hashtagBase = (name: string) => {
	const base = name
		.replace(/[^a-z0-9 ]/gi, "")
		.trim()
		.split(/\s+/)
		.slice(0, 3)
		.join("");
	return base ? [`#${base}`, `#${base}Deals`, `#Buy${base}`] : [];
};

function craftCopy(input: GenInput) {
	const { productName, productUrl, audience, benefit, tone, platform } = input;
	const style = toneStyle(tone);
	const pf = platformHint(platform);

	const hooks = [`Stop wasting ad $$ — ${productName} fixes it.`, `${productName}: your new ROAS unlock.`, `This ${productName} trick dropped our CPA by 32%.`, `What if your ads wrote themselves? Meet ${productName}.`, `Scale faster: creatives + targeting in minutes.`];

	const headlines = [`${productName} — AI Ads That Convert`, `Cut CPA. Grow ROAS. ${productName}`, `Smarter Ads in Minutes — ${productName}`, `Your AI Growth Partner: ${productName}`, `${productName}: Creatives, Targeting, Launch.`];

	const primaryTexts = [`For ${audience}. ${productName} generates scroll‑stopping creatives and suggests audiences. ${benefit}. ${productUrl ? `See it in action: ${productUrl}` : ""}`.trim(), `${productName} builds ads that feel native to the feed. Push to TikTok/Meta/Google in one click. Less waste, more wins.`, `Stronger hooks. Better images. Sharper targeting. ${productName} does the heavy lifting so you can scale.`];

	const descriptions = [`${pf}. ${style?.join(", ")} tone. Built for speed and results.`, `Plug in your product → get creatives, audiences, and a plan.`, `Stop guessing. Start scaling with ${productName}.`];

	const ctas = ["Start Now", "Get Early Access", "Launch My Ads", "Try the Demo", "See It Work"];

	const angles = ["Pain → Solution → Benefit", "Before/After transformation", "Social proof / UGC testimonial", "Risk reversal (trial/guarantee)", "Speed & ease (one‑click launch)"];

	const audiences = [audience, "Lookalikes of recent purchasers", "Cart abandoners last 14 days", "Video viewers 25%+ watch time", "High‑intent keyword retargeting"];

	const imagePrompts = [`Studio photo of ${productName} on clean backdrop, soft rim light, high contrast, brand colors, add overlay text 'CPA ↓ 32%'`, `UGC style: hand holding ${productName}, casual desk scene, natural light, smartphone photo, text bubble 'Before/After'`, `Flatlay: ${productName} with complementary props, top‑down, minimal aesthetic, space for headline`, `Lifestyle: happy customer using ${productName}, candid motion blur, dynamic angle, on-screen caption hook`];

	const hashtags = ["#DTC", "#Shopify", "#AdsThatConvert", "#UGC", "#EcomGrowth", ...hashtagBase(productName)];

	const summary = `${productName} for ${audience}. Tone: ${tone}. Platform: ${platform}. ` + `Focus: ${benefit}. Output includes ${hooks.length} hooks, ${headlines.length} headlines, ` + `copy blocks, CTAs, angles, audiences, hashtags, and ${imagePrompts.length} image prompts.`;

	return { hooks, headlines, primaryTexts, descriptions, ctas, angles, audiences, hashtags, imagePrompts, summary };
}

export async function POST(req: Request) {
	try {
		const input = (await req.json()) as GenInput;
		if (!input?.productName || !input?.audience || !input?.benefit) {
			return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: { "content-type": "application/json" } });
		}
		const out = craftCopy(input);
		return new Response(JSON.stringify(out), { status: 200, headers: { "content-type": "application/json" } });
	} catch (e) {
		console.error("[GEN_ERROR]", e);
		return new Response(JSON.stringify({ error: "Generation error" }), { status: 500, headers: { "content-type": "application/json" } });
	}
}
