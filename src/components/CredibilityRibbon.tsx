export default function CredibilityRibbon() {
	return (
		<div className="bg-[#0E1016] border-t border-b border-white/10">
			<div className="mx-auto max-w-6xl px-6 py-4 flex flex-col md:flex-row items-center gap-3 md:gap-6 text-white/70 text-sm">
				<span>Compliant: GDPR • CCPA • Consent Mode v2</span>
				<span className="hidden md:inline">•</span>
				<span>Backed by Shopify ecosystem + modern ad APIs</span>
				<span className="hidden md:inline">•</span>
				<span>Security: SSO, token-scoped, least-privilege</span>
			</div>
		</div>
	);
}
