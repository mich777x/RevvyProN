import Link from "next/link";
import Nav from "@/components/Nav";
import TrustBar from "@/components/TrustBar";
import Countdown from "@/components/Countdown";
import { Section } from "@/components/Section";
import PromoBlock from "@/components/PromoBlock";
import Footer from "@/components/Footer";

export default function HomePage() {
	return (
		<main className="min-h-screen">
			<Nav />

			{/* HERO */}
			<div className="container pt-16 md:pt-24 pb-6">
				<div className="grid md:grid-cols-12 gap-8 items-center">
					{/* Left: headline, copy, CTAs */}
					<div className="md:col-span-6">
						<span className="inline-flex items-center gap-2 text-[11px] tracking-widest uppercase rounded-full border border-white/10 bg-white/5 px-3 py-1 text-rp-sub">
							<span className="h-2 w-2 rounded-full bg-rp-accent animate-pulse" />
							Affiliate Launch • Oct 10
						</span>

						<h1 className="h1 mt-4">
							Power Shopify Ads with <span className="text-transparent bg-clip-text bg-gradient-to-r from-rp-primary to-rp-accent">RevvyPro</span>
						</h1>

						<p className="mt-4 text-[16px] md:text-[18px] text-rp-sub max-w-prose">Slash ad spend by up to 40%. Boost ROI 2×. Launch in minutes. Built for creators who want results, not promises.</p>

						<div className="mt-6 flex flex-wrap items-center gap-3">
							<Link href="/affiliates" className="rp-cta">
								Join the Affiliate Launch
							</Link>
							<Link href="#demo" className="rp-ghost">
								Watch 30s Demo
							</Link>
							<div className="ml-1">
								<Countdown end={"2025-10-10T23:59:59-04:00"} />
							</div>
						</div>

						<TrustBar />
					</div>

					{/* Right: promo/video block with animated poster + live KPIs */}
					<div className="md:col-span-6">
						<div className="rp-card p-5 md:p-6">
							{/* Use your OG image or logo as poster for now.
           When you have a real MP4 later, just add: videoSrc="/trailer.mp4" */}
							<PromoBlock posterSrc="/og.png" />
						</div>
					</div>
				</div>
			</div>

			{/* FEATURES */}
			<Section id="features" title="Why RevvyPro Wins" subtitle="Built for speed, trained on millions in ad spend.">
				<div className="grid md:grid-cols-3 gap-5">
					{[
						["1-Click Ad Generation", "Instantly drafts high-converting copy & creative angles."],
						["Budget Optimizer", "Auto-shifts spend from losers to winners in real time."],
						["Cross-Channel Brain", "Meta, Google, TikTok — one brain, unified reporting."],
						["Audience Miner", "Discovers 100s of profitable interests/lookalikes."],
						["Creative Lab", "Variations, hooks, CTAs — auto-tested and ranked."],
						["Shopify-Native", "No clunky middleware. Plug in and go."],
					].map(([t, s]) => (
						<div key={t} className="rp-card p-5">
							<h3 className="font-semibold">{t}</h3>
							<p className="mt-2 text-rp-sub">{s}</p>
						</div>
					))}
				</div>
			</Section>

			{/* PROOF */}
			<Section id="proof" title="Proof, Not Promises" subtitle="From day 1, it must pay for itself.">
				<div className="grid md:grid-cols-3 gap-5">
					{[
						["Saved 42% in 7 days", "Beta merchant with $50k/mo spend"],
						["Cut CPA by 33%", "DTC skincare brand"],
						["2.4× ROAS Lift", "Niche apparel store"],
					].map(([h, d]) => (
						<div key={h} className="rp-card p-5">
							<p className="font-medium">{h}</p>
							<p className="text-rp-sub mt-1">{d}</p>
						</div>
					))}
				</div>
			</Section>

			{/* CTA */}
			<Section title="Creators Make the Internet Move" subtitle="We built the engine. You bring the reach. Let’s split the upside.">
				<div className="rp-card p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
					<div>
						<h3 className="text-xl font-semibold">Earn 50–60% Per Signup</h3>
						<p className="text-rp-sub mt-2">Typical payout: $150–$500 per sale. Bonuses for top 10 affiliates.</p>
					</div>
					<Link href="/affiliates" className="rp-cta px-6 py-3 font-medium">
						Join Affiliate Program
					</Link>
				</div>
			</Section>

			{/* FOOTER */}
			<Footer />
		</main>
	);
}
