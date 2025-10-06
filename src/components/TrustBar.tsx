export default function TrustBar() {
	const items = ["Meta Ads", "Google Ads", "Klaviyo", "Shopify Plus", "TikTok Ads"];
	return (
		<div className="mt-10 opacity-80">
			<p className="text-center text-xs uppercase tracking-widest text-rp-sub">Optimizes Across</p>
			<div className="mt-3 flex flex-wrap items-center justify-center gap-5 text-sm">
				{items.map((i) => (
					<span key={i} className="px-3 py-1 rounded-md border border-white/10 bg-white/5">
						{i}
					</span>
				))}
			</div>
		</div>
	);
}
