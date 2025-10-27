import { Forecast } from "./autoValue";

export function viralScore(creativeQuality: number, forecast: Forecast): number {
	const roiScore = Math.max(0, Math.min(100, Math.round((forecast.roi + 1) * 25))); // roi≈3 -> ~100
	const blended = Math.round(0.6 * creativeQuality + 0.4 * roiScore);
	return Math.max(0, Math.min(100, blended));
}
