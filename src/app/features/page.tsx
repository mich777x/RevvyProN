// src/app/features/page.tsx
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

/* ---------- Types ---------- */
type FeatureKey = "copy" | "budget" | "xchannel" | "audience" | "creative" | "shopify";

type Feature = {
	k: FeatureKey;
	title: string;
	blurb: string;
	bullets: string[];
};

type Plan = {
	name: string;
	includes: Record<FeatureKey, boolean>;
};

/* ---------- Data ---------- */
const features: Feature[] = [
	{
		k: "copy",
		title: "AI Ad Copy Generator",
		blurb: "Turn product URLs or bullet points into on-brand ad copy, angles, and CTAs—ready for Meta, Google, and TikTok.",
		bullets: ["One-click primary text, headlines, descriptions", "Brand voice presets + profanity/claim guardrails", "Variant scoring: predicts top-3 before you spend"],
	},
	{
		k: "budget",
		title: "Real-Time Budget Optimizer",
		blurb: "Auto-shifts spend from losing ad sets to winners every hour—no babysitting or spreadsheets.",
		bullets: ["Guardrails for CPA/ROAS targets", "Cold start pacing to avoid overspend", "Spend caps + safe rollback"],
	},
	{
		k: "xchannel",
		title: "Cross-Channel Intelligence",
		blurb: "Unified view across Meta, Google, and TikTok with consistent KPIs and deduped attribution.",
		bullets: ["Single dashboard, no CSV juggling", "Attribution blending (platform + modeled)", "Creative, audience, and placement drilldowns"],
	},
	{
		k: "audience",
		title: "Audience Miner",
		blurb: "Discovers new profitable interests/lookalikes and auto-tests them in small sandboxes.",
		bullets: ["Seed from product feed or UTM revenue", "Auto-kill rules on CPR/CTR/ROAS", "Hands-off winner promotion"],
	},
	{
		k: "creative",
		title: "Creative Lab",
		blurb: "Batch variations for hooks, captions, and CTAs—ranked by predicted engagement.",
		bullets: ["Hook library tuned for DTC", "Auto captioning & timing for shorts", "Snapshot testing without full launches"],
	},
	{
		k: "shopify",
		title: "Shopify-Native Setup",
		blurb: "Plug in and go—no clunky middleware. Pulls catalog, margins, top sellers, and onsite events.",
		bullets: ["One-time OAuth, 8-minute setup", "Margin-aware bidding (optional)", "Error alerts in plain English"],
	},
];

const plans: Plan[] = [
	{
		name: "Core",
		includes: { copy: true, budget: true, xchannel: false, audience: true, creative: false, shopify: true },
	},
	{
		name: "Pro",
		includes: { copy: true, budget: true, xchannel: true, audience: true, creative: true, shopify: true },
	},
	{
		name: "Lifetime (Launch)",
		includes: { copy: true, budget: true, xchannel: true, audience: true, creative: true, shopify: true },
	},
];

export const metadata = {
	title: "Features — RevvyPro",
	description: "See how RevvyPro cuts ad spend and doubles ROI with AI.",
};

/* ---------- Page ---------- */
export default function FeaturesPage() {
	return (
		<main>
			<Nav />

			{/* Breadcrumb / Back bar */}
			<div className="border-b border-white/10 bg-white/[0.02]">
				<div className="container flex items-center gap-3 py-3 text-sm">
					<a href="/" className="opacity-80 hover:opacity-100 transition">
						Home
					</a>
					<span className="opacity-40">/</span>
					<span className="opacity-100">Features</span>
					<div className="ml-auto">
						<a href="/" className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 border border-white/12 hover:bg-white/5 transition">
							← Back to Home
						</a>
					</div>
				</div>
			</div>

			{/* Header */}
			<section className="container pt-16 md:pt-24 pb-6">
				<h1 className="h1">Features</h1>
				<p className="mt-3 text-rp-sub max-w-prose">Built for speed, trained on millions in ad spend. Every tool you need to scale profitably—without the late-night babysitting.</p>
			</section>

			{/* Feature cards */}
			<section className="container pb-6">
				<div className="grid gap-6 md:grid-cols-2">
					{features.map((f) => (
						<article key={f.k} className="rp-card p-6">
							<div className="flex items-start justify-between gap-4">
								<h2 className="text-xl font-semibold">{f.title}</h2>
								<span className="rounded-full px-2 py-1 text-xs bg-white/5 border border-white/10 text-rp-sub">RP</span>
							</div>
							<p className="mt-2 text-rp-sub">{f.blurb}</p>
							<ul className="mt-4 space-y-2 text-sm">
								{f.bullets.map((b) => (
									<li key={b} className="flex items-start gap-2">
										<span className="mt-1 h-1.5 w-1.5 rounded-full bg-rp-accent" />
										<span className="opacity-90">{b}</span>
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			</section>

			{/* Comparison table */}
			<section className="container py-12">
				<div className="rp-card overflow-hidden">
					<div className="p-6 border-b border-white/10">
						<h3 className="text-xl font-semibold">What’s in each plan</h3>
						<p className="mt-1 text-rp-sub text-sm">Pick the plan that matches your growth stage. Upgrade anytime.</p>
					</div>

					<div className="overflow-x-auto">
						<table className="min-w-[720px] w-full text-sm">
							<thead className="text-left bg-white/5">
								<tr>
									<th className="px-4 py-3">Feature</th>
									{plans.map((p) => (
										<th key={p.name} className="px-4 py-3">
											{p.name}
										</th>
									))}
								</tr>
							</thead>
							<tbody className="[&>tr:nth-child(even)]:bg-white/5">
								{features.map((f) => (
									<tr key={f.k} className="border-t border-white/10">
										<td className="px-4 py-3">{f.title}</td>
										{plans.map((p) => {
											const on = p.includes[f.k]; // ✅ strongly typed
											return (
												<td key={p.name} className="px-4 py-3">
													{on ? <span className="inline-block h-2 w-2 rounded-full bg-rp-accent" /> : <span className="inline-block h-2 w-2 rounded-full bg-white/15" />}
												</td>
											);
										})}
									</tr>
								))}
							</tbody>
						</table>
					</div>

					<div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/10">
						<p className="text-rp-sub">Launch deal includes Pro features. Lifetime tier available during launch week only.</p>
						<Link href="/pricing" className="rounded-xl px-5 py-3 font-medium ring-1 ring-rp-primary/35 bg-rp-primary/85 hover:bg-rp-primary transition">
							See Pricing
						</Link>
					</div>
				</div>
			</section>

			{/* Mini FAQ */}
			<section className="container pb-16">
				<div className="grid gap-6 md:grid-cols-2">
					{[
						{
							q: "Will RevvyPro work if my ad accounts are messy?",
							a: "Yes. Setup runs in about 8 minutes and audits your structure. Guardrails stop spend on losers and promote early winners automatically.",
						},
						{
							q: "Do I need to change my Shopify theme or pixels?",
							a: "No. We pull your catalog and events via OAuth. No theme edits required. Pixels remain intact.",
						},
						{
							q: "How does attribution work across channels?",
							a: "We blend platform-reported conversions with modeled signals for a stable, deduped view. You can weight sources per brand.",
						},
						{
							q: "What if I only run Meta ads today?",
							a: "Start with Meta. As you add Google/TikTok, Cross-Channel Intelligence lights up automatically—no reconfiguration.",
						},
					].map((f) => (
						<div key={f.q} className="rp-card p-6">
							<p className="font-medium">{f.q}</p>
							<p className="mt-2 text-rp-sub">{f.a}</p>
						</div>
					))}
				</div>

				<div className="mt-8 rp-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
					<div>
						<h3 className="text-xl font-semibold">Ready to cut ad spend & lift ROI?</h3>
						<p className="text-rp-sub mt-2">Join the launch and earn as an affiliate or get early access.</p>
					</div>
					<div className="flex flex-wrap gap-3">
						<Link href="/affiliates" className="rounded-xl px-5 py-3 font-medium ring-1 ring-rp-primary/35 bg-rp-primary/85 hover:bg-rp-primary transition">
							Join Affiliate Launch
						</Link>
						<Link href="/pricing" className="rounded-xl px-5 py-3 border border-white/12 hover:bg-white/5 transition">
							View Pricing
						</Link>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
