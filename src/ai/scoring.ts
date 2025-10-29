import { forecastROI } from "./autoValue";

export function estimateCreativeQuality(headline: string, primary: string, description: string) {
	// quick heuristic until we have live metrics
	const lengthScore = Math.min(40, Math.round((headline.length + primary.length) / 6));
	const keywordBoost = /\b(save|free|limited|new|today|viral|best|official)\b/i.test(`${headline} ${primary} ${description}`) ? 20 : 0;
	const callToAction = /\b(buy now|shop now|get started|try free|learn more)\b/i.test(`${headline} ${description} ${primary}`) ? 20 : 0;
	const structure = /[:\-—|]/.test(headline) ? 10 : 0;
	const cap = 100;
	return Math.min(cap, lengthScore + keywordBoost + callToAction + structure);
}

export function viralScoreFromForecast(headline: string, primary: string, description: string, impressions = 10_000, ctr = 0.03, aov = 60, convRate = 0.02, cpc = 0.8) {
	const quality = estimateCreativeQuality(headline, primary, description); // 0–100
	const f = forecastROI(impressions, ctr, aov, convRate, cpc); // {roi,cpa,cpc}
	// Blend creative quality and ROI into 0–100
	const roiScore = Math.max(0, Math.min(100, Math.round((f.roi + 1) * 25))); // roi≈3 → ~100
	return Math.max(0, Math.min(100, Math.round(0.6 * quality + 0.4 * roiScore)));
}
