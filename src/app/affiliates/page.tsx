import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import EarningsCalculator from "@/components/EarningsCalculator";

export const metadata = {
	title: "Affiliate Program — RevvyPro",
	description: "Earn 50-60% per signup promoting RevvyPro to your audience.",
};

export default function AffiliatesPage() {
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
					<span className="opacity-100">Affiliate</span>
					<div className="ml-auto">
						<Link href="/" className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 border border-white/12 hover:bg-white/5 transition">
							← Back to Home
						</Link>
					</div>
				</div>
			</div>

			{/* Hero */}
			<section className="container pt-16 md:pt-24 pb-8">
				<div className="rp-card p-6 md:p-10">
					<div className="grid gap-8 md:grid-cols-2 items-center">
						<div>
							<h1 className="text-3xl md:text-5xl font-bold">RevvyPro Affiliate Program</h1>
							<p className="mt-4 text-rp-sub">
								Earn <span className="text-white font-medium">50–60% per signup</span> promoting the AI Ad Engine for Shopify. One high-performing video can earn <span className="text-white font-medium">$5k–$20k</span> in a week.
							</p>
							<div className="mt-6 flex flex-wrap gap-3">
								<Link href="#apply" className="rounded-xl px-5 py-3 font-medium ring-1 ring-rp-primary/35 bg-rp-primary/85 hover:bg-rp-primary transition">
									Apply Now
								</Link>
								<Link href="/features" className="rounded-xl px-5 py-3 border border-white/12 hover:bg-white/5 transition">
									See Features
								</Link>
							</div>
							<div className="mt-4 text-sm text-rp-sub">Payouts via Stripe/PayPal • Net-7 during launch week • Custom codes for top creators</div>
						</div>

						<div className="grid grid-cols-3 gap-3">
							{[
								["Base Commission", "50% per signup"],
								["Launch Boost", "60% for top creators"],
								["Avg Payout", "$150-$500 / sale"],
							].map(([k, v]) => (
								<div key={k} className="p-5 rounded-xl border border-white/10 bg-white/5">
									<p className="text-xs text-rp-sub">{k}</p>
									<p className="mt-2 font-medium">{v}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Benefits */}
			<section className="container pb-6">
				<div className="grid md:grid-cols-3 gap-6">
					{[
						["High Commissions", "50-60% per signup with weekly payouts."],
						["Assets Provided", "Scripts, B-roll, thumbnails, captions, CTAs."],
						["Creator-First Terms", "No exclusivity. Co-branded pages for top partners."],
						["Real Product Value", "We cut ad spend and lift ROI — easy to sell."],
						["Transparent Tracking", "Live dashboard, UTMs, custom codes."],
						["Bonus Pool", "$5k for Top 10 during launch week."],
					].map(([t, s]) => (
						<div key={t} className="rp-card p-6">
							<h3 className="font-semibold">{t}</h3>
							<p className="mt-2 text-rp-sub">{s}</p>
						</div>
					))}
				</div>
			</section>

			{/* How it works + Calculator */}
			<section className="container pb-6">
				<div className="grid gap-6 md:grid-cols-2">
					<div className="rp-card p-6">
						<h3 className="text-lg font-semibold">How It Works</h3>
						<ol className="mt-4 list-decimal list-inside text-rp-sub space-y-2">
							<li>Apply below — instant approval for creators with 50k+ reach or strong niche fit.</li>
							<li>Receive your unique link + asset pack.</li>
							<li>Publish content (YouTube/TikTok/IG/Twitter/Newsletter).</li>
							<li>Track clicks & sales in your dashboard. Get paid weekly.</li>
						</ol>
						<div className="mt-5 rounded-xl border border-white/10 bg-white/5 p-4 text-sm">
							<p className="text-rp-sub">We support Meta, Google, and TikTok advertisers — perfect for Shopify agencies & creators in e-commerce.</p>
						</div>
					</div>

					<EarningsCalculator />
				</div>
			</section>

			{/* Leaderboard (placeholder) */}
			<section className="container pb-6">
				<div className="rp-card p-6">
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold">Leaderboard (Live Soon)</h3>
						<span className="text-xs text-rp-sub">Opt-in to display earnings</span>
					</div>
					<div className="mt-4 grid md:grid-cols-3 gap-3 text-sm">
						{[
							["@ecomvision", "$—"],
							["@growthwithnina", "$—"],
							["@adsmastery", "$—"],
						].map(([h, m], i) => (
							<div key={h} className="rounded-xl border border-white/10 bg-white/5 p-4 flex items-center justify-between">
								<span className="opacity-80">
									{i + 1}. {h}
								</span>
								<span className="font-mono">{m}</span>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Apply */}
			<section id="apply" className="container pb-16">
				<div className="rp-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
					<div>
						<h3 className="text-xl font-semibold">Join the Affiliate Launch</h3>
						<p className="text-rp-sub mt-2">Tell us about your audience. Instant approval for strong fits.</p>
					</div>
					{/* TODO: swap href to your Tally/Formspree modal or page tomorrow */}
					<Link href="#" className="rounded-xl px-6 py-3 font-medium ring-1 ring-rp-primary/35 bg-rp-primary/85 hover:bg-rp-primary transition">
						Apply Now
					</Link>
				</div>
				<p className="mt-3 text-xs text-rp-sub">
					Questions?{" "}
					<Link className="underline" href="mailto:tron@revvypro.org">
						tron@revvypro.org
					</Link>
				</p>
			</section>

			<Footer />
		</main>
	);
}
