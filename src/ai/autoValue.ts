export type Forecast = { cpc: number; cpa: number; roi: number };

export function forecastROI(impressions: number, ctr: number, aov: number, convRate: number, cpc: number): Forecast {
	const clicks = impressions * ctr;
	const cost = clicks * cpc;
	const orders = clicks * convRate;
	const revenue = orders * aov;
	const roi = cost ? (revenue - cost) / cost : 0;
	const cpa = orders ? cost / orders : 0;
	return { cpc, cpa, roi };
}
