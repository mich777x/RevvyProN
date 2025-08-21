"use client";

import { useState } from "react";
import Link from "next/link";

type Plan = "starter" | "growth" | "agency";

export default function HomePage() {
	const [loadingPlan, setLoadingPlan] = useState<Plan | null>(null);

	const handleCheckout = async (plan: Plan) => {
		try {
			setLoadingPlan(plan);
			const res = await fetch("/api/checkout", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ plan }),
			});
			const data = await res.json();
			if (data?.url) {
				// Optional: remember plan locally for demo dashboard
				try {
					window.localStorage.setItem("revvy_plan", plan);
				} catch {}
				window.location.href = data.url as string;
			} else {
				alert(data?.error ?? "Checkout failed.");
			}
		} catch {
			alert("Network error during checkout.");
		} finally {
			setLoadingPlan(null);
		}
	};

	return (
		<main>
			{/* NAV */}
			<nav className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-neutral-900/50">
				<div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
					<div className="font-bold tracking-tight text-xl">
						Revvy <span className="text-fuchsia-400">Pro</span>
					</div>
					<div className="flex items-center gap-2">
						<a href="/generator" className="rounded-xl border border-neutral-700 px-4 py-2 hover:border-neutral-500">
							Generator
						</a>
						<a href="#pricing" className="rounded-xl border border-neutral-700 px-4 py-2 hover:border-fuchsia-500">
							Pricing
						</a>
						<a href="/api/auth/signin" className="rounded-xl border border-neutral-700 px-4 py-2 hover:border-neutral-500">
							Sign in
						</a>
						<a href="/dashboard" className="rounded-xl bg-neutral-100 text-neutral-900 px-4 py-2 font-semibold hover:bg-white">
							Dashboard
						</a>
					</div>
				</div>
			</nav>

			{/* HERO */}
			<section className="mx-auto max-w-7xl px-6 pt-20 pb-16">
				<div className="grid gap-8 md:grid-cols-2 items-center">
					<div>
						<h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
							AI Ad Engine for <span className="text-fuchsia-400">Shopify</span> Growth
						</h1>
						<p className="mt-5 text-neutral-300 text-lg">
							Cut ad spend by <span className="text-white font-semibold">30%+</span> with AI‑generated creatives, smarter targeting, and one‑click posting to TikTok, Meta, and Google.
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<a href="#pricing" className="rounded-xl bg-fuchsia-500 px-6 py-3 font-semibold text-neutral-900 hover:bg-fuchsia-400">
								Get Early Access
							</a>
							<a href="#how-it-works" className="rounded-xl border border-neutral-700 px-6 py-3 hover:border-neutral-500">
								How it works
							</a>
						</div>
						<p className="mt-4 text-sm text-neutral-400">Beta discount active — limited spots.</p>
					</div>
					<div className="relative">
						<div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5 shadow-xl">
							<div className="text-sm text-neutral-400 mb-3">Before</div>
							<div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
								<p className="text-neutral-300 text-sm">Generic ad creative, broad targeting, rising CPA.</p>
							</div>
							<div className="text-sm text-neutral-400 mt-5 mb-3">
								After <span className="text-fuchsia-400 font-semibold">Revvy Pro</span>
							</div>
							<div className="rounded-xl border border-fuchsia-700/50 bg-neutral-950 p-4">
								<p className="text-neutral-100 text-sm">AI copy + tailored images + lookalike targeting → CPA ↓ 32%, ROAS ↑ 1.4×</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* INTEGRATIONS / SOCIAL PROOF LOGOS */}
			<section className="mx-auto max-w-7xl px-6 py-10">
				<div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
					<p className="text-center text-neutral-400 text-sm">Works with your ad stack</p>
					<div className="mt-4 flex flex-wrap items-center justify-center gap-10 opacity-80">
						<img src="/logos/Meta.png" alt="Meta Ads" className="h-8" loading="lazy" />
						<img src="/logos/google.png" alt="Google Ads" className="h-8" loading="lazy" />
						<img src="/logos/tiktok.png" alt="TikTok Ads" className="h-8" loading="lazy" />
						<img src="/logos/shopify.png" alt="Shopify" className="h-8" loading="lazy" />
					</div>
				</div>
			</section>

			{/* HOW IT WORKS */}
			<section id="how-it-works" className="mx-auto max-w-7xl px-6 py-14">
				<h2 className="text-2xl font-bold mb-6">How it works</h2>
				<div className="grid gap-6 md:grid-cols-3">
					{[
						{ t: "Generate", d: "Paste product URL. We create ad copy, images/video prompts, and hooks." },
						{ t: "Target", d: "AI proposes audiences and lookalikes most likely to convert." },
						{ t: "Launch", d: "One‑click posting to TikTok/Meta/Google + weekly AI performance report." },
					].map((x, i) => (
						<div key={i} className="rounded-2xl border border-neutral-800 p-6 bg-neutral-900">
							<div className="text-fuchsia-400 font-semibold">{String(i + 1).padStart(2, "0")}</div>
							<div className="mt-2 text-lg font-semibold">{x.t}</div>
							<p className="mt-2 text-neutral-300 text-sm">{x.d}</p>
						</div>
					))}
				</div>
			</section>

			{/* TESTIMONIALS */}
			<section className="mx-auto max-w-7xl px-6 py-14">
				<h2 className="text-2xl font-bold mb-8">What early users say</h2>
				<div className="grid gap-6 md:grid-cols-3">
					{[
						{ q: "“Revvy Pro cut our ad costs in half within 2 weeks.”", a: "— Beta User 1, DTC Skincare" },
						{ q: "“We saved 20+ hours/week with AI-generated creatives.”", a: "— Beta User 2, Agency" },
						{ q: "“Best $499 we’ve spent — CTR doubled instantly.”", a: "— Beta User 3, Apparel" },
					].map((t, i) => (
						<div key={i} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
							<p className="text-neutral-100">{t.q}</p>
							<p className="mt-3 text-sm text-neutral-400">{t.a}</p>
						</div>
					))}
				</div>
			</section>

			{/* PRICING */}
			<section id="pricing" className="mx-auto max-w-7xl px-6 py-14">
				<h2 className="text-2xl font-bold mb-6">Pricing</h2>
				<div className="grid gap-6 md:grid-cols-3">
					{/* Starter */}
					<div className="rounded-2xl border border-neutral-800 p-6 bg-neutral-900 flex flex-col transition-transform hover:scale-[1.01] hover:shadow-xl">
						<div className="text-sm text-neutral-400">Indie Stores</div>
						<div className="mt-2 text-3xl font-extrabold">
							$49<span className="text-base font-medium text-neutral-400">/mo</span>
						</div>
						<ul className="mt-4 space-y-2 text-sm text-neutral-300">
							<li>✅ AI ad copy & images</li>
							<li>✅ 10 campaigns/month</li>
							<li>✅ Basic targeting suggestions</li>
							<li>— Email support</li>
						</ul>
						<button onClick={() => handleCheckout("starter")} className="mt-6 rounded-xl bg-neutral-100 text-neutral-900 font-semibold px-5 py-3 hover:bg-white disabled:opacity-60" disabled={loadingPlan === "starter"}>
							{loadingPlan === "starter" ? "Redirecting..." : "Start Starter"}
						</button>
					</div>

					{/* Growth (Most Popular) */}
					<div className="relative rounded-2xl border border-fuchsia-700/50 p-6 bg-neutral-900 flex flex-col transition-transform hover:scale-[1.015] hover:shadow-2xl">
						<span className="absolute -top-3 right-4 rounded-full bg-fuchsia-500 text-neutral-900 text-xs font-bold px-3 py-1">MOST POPULAR</span>
						<div className="text-sm text-fuchsia-400">Growing Brands</div>
						<div className="mt-2 text-3xl font-extrabold">
							$499<span className="text-base font-medium text-neutral-400">/mo</span>
						</div>
						<ul className="mt-4 space-y-2 text-sm text-neutral-300">
							<li>✅ Everything in Starter</li>
							<li>✅ Unlimited campaigns</li>
							<li>✅ Lookalike audiences + AI budget tips</li>
							<li>✅ Weekly performance reports</li>
							<li>— Priority email support</li>
						</ul>
						<button onClick={() => handleCheckout("growth")} className="mt-6 rounded-xl bg-fuchsia-500 text-neutral-900 font-semibold px-5 py-3 hover:bg-fuchsia-400 disabled:opacity-60" disabled={loadingPlan === "growth"}>
							{loadingPlan === "growth" ? "Redirecting..." : "Start Growth"}
						</button>
					</div>

					{/* Agency */}
					<div className="rounded-2xl border border-neutral-800 p-6 bg-neutral-900 flex flex-col transition-transform hover:scale-[1.01] hover:shadow-xl">
						<div className="text-sm text-neutral-400">Agencies</div>
						<div className="mt-2 text-3xl font-extrabold">
							$4,999<span className="text-base font-medium text-neutral-400">/mo</span>
						</div>
						<ul className="mt-4 space-y-2 text-sm text-neutral-300">
							<li>✅ Multi‑store manager</li>
							<li>✅ White‑label mode</li>
							<li>✅ API & priority support</li>
							<li>✅ Quarterly strategy workshop</li>
						</ul>
						<button onClick={() => handleCheckout("agency")} className="mt-6 rounded-xl border border-neutral-700 px-5 py-3 hover:border-neutral-500 disabled:opacity-60" disabled={loadingPlan === "agency"}>
							{loadingPlan === "agency" ? "Redirecting..." : "Start Agency"}
						</button>
					</div>
				</div>
				<p className="mt-4 text-sm text-neutral-500">No refunds. Cancel anytime from your dashboard.</p>
			</section>

			{/* FAQ */}
			<section className="mx-auto max-w-5xl px-6 py-14">
				<h2 className="text-2xl font-bold mb-8">FAQ</h2>
				<div className="space-y-6">
					{[
						{ q: "Can I cancel anytime?", a: "Yes, cancel anytime with 1 click in your dashboard." },
						{ q: "Do you offer refunds?", a: "No, all sales are final. Cancel anytime — but no refunds." },
						{ q: "Is there support?", a: "Email support on Starter; priority support on Growth/Agency." },
						{ q: "Do you connect to my ad accounts?", a: "Yes, integrations for TikTok, Meta, and Google are rolling out." },
					].map((f, i) => (
						<div key={i} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
							<div className="font-semibold">{f.q}</div>
							<div className="mt-2 text-neutral-300 text-sm">{f.a}</div>
						</div>
					))}
				</div>
			</section>

			{/* FOOTER */}
			<footer className="border-t border-neutral-800">
				<div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
					<div>Trusted by 200+ marketers (beta). © {new Date().getFullYear()} Revvy Pro</div>
					<div className="space-x-4">
						<a href="/success" className="hover:text-neutral-200">
							Success
						</a>
						<a href="#pricing" className="hover:text-neutral-200">
							Pricing
						</a>
						<a href="/privacy" className="hover:text-neutral-200">
							Privacy
						</a>
						<a href="/terms" className="hover:text-neutral-200">
							Terms
						</a>
						<a href="mailto:support@revvy.pro" className="hover:text-neutral-200">
							Contact
						</a>
					</div>
				</div>
			</footer>
		</main>
	);
}
