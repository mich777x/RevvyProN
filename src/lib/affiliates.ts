export function buildAffiliateLink({ id, campaign }: { id: string; campaign?: string }) {
	const base = "https://revvy.pro/signup";
	const params = new URLSearchParams({ aff: id, utm_source: "affiliate", utm_campaign: campaign ?? "default" });
	return `${base}?${params.toString()}`;
}
