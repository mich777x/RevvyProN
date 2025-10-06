import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const tiers = [
	{
		name: "Core",
		price: "$297/mo",
		cta: { label: "Start Free Trial", href: "/affiliates" /* swap to checkout later */ },
		features: ["AI Ad Copy Generator", "Budget Optimizer (Meta/Google)", "Basic Reporting", "Email Support"],
	},
	{
		name: "Pro",
		price: "$497/mo",
		highlighted: true,
		cta: { label: "Start Free Trial", href: "/affiliates" },
		features: ["Everything in Core", "Cross-Channel Intelligence (Meta/Google/TikTok)", "Creative Lab + Variations", "Priority Support"],
	},
	{
		name: "Lifetime (Launch)",
		price: "$997 one-time",
		cta: { label: "Claim Launch Deal", href: "/affiliates" },
		features: ["All Pro features", "Early Feature Access", "VIP Creator Perks", "No monthly fees — launch week only"],
	},
];

export default function PricingPage() {
	return (
		<main>
			<Nav />

			{/* Breadcrumb / Back bar */}
			<div className="border-b border-white/10 bg-white/[0.02]">
				<div className="container flex items-center gap-3 py-3 text-sm">
					<Link href="/" className="opacity-80 hover:opacity-100 transition">
						Home
					</Link>
					<span className="opacity-40">/</span>
					<span className="opacity-100">Pricing</span>

					<div className="ml-auto">
						<Link href="/" className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 border border-white/12 hover:bg-white/5 transition">
							← Back to Home
						</Link>
					</div>
				</div>
			</div>

			<section className="container pt-16 md:pt-24 pb-8">
				<h1 className="h1">Pricing</h1>
				<p className="mt-3 text-rp-sub max-w-prose">Launch faster. Pay less for ads. All plans include AI optimization and Shopify-native setup.</p>

				<div className="mt-10 grid gap-6 md:grid-cols-3">
					{tiers.map((t) => (
						<div key={t.name} className={`rp-card p-6 border ${t.highlighted ? "ring-1 ring-rp-primary/40" : ""}`}>
							<div className="flex items-center justify-between">
								<h3 className="text-xl font-semibold">{t.name}</h3>
								<span className="text-rp-sub">{t.price}</span>
							</div>
							<ul className="mt-5 space-y-2 text-sm">
								{t.features.map((f) => (
									<li key={f} className="flex items-start gap-2">
										<span className="mt-1 h-1.5 w-1.5 rounded-full bg-rp-accent" />
										<span className="opacity-90">{f}</span>
									</li>
								))}
							</ul>
							<Link href={t.cta.href} className="mt-6 inline-flex w-full justify-center rounded-xl px-5 py-3 font-medium ring-1 ring-rp-primary/35 bg-rp-primary/85 hover:bg-rp-primary transition">
								{t.cta.label}
							</Link>
						</div>
					))}
				</div>

				<div className="mt-10 text-sm text-rp-sub">
					<p>* Refunds honored within 7 days during launch week.</p>
					<p>* VAT/GST may apply depending on region.</p>
				</div>
			</section>

			<Footer />
		</main>
	);
}
