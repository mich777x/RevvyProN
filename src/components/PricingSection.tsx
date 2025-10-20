"use client";

import * as React from "react";

type PlanKey = "starter" | "pro" | "agency";

const PLANS: Array<{
	key: PlanKey;
	name: string;
	price: string;
	blurb: string;
	features: string[];
	highlighted?: boolean;
}> = [
	{
		key: "starter",
		name: "Starter",
		price: "$297",
		blurb: "Solo founders or new stores validating paid traffic.",
		features: ["AI Ad Engine core", "5 campaigns / mo", "Email support", "Basic analytics"],
	},
	{
		key: "pro",
		name: "Pro",
		price: "$497",
		blurb: "Scaling stores needing deeper optimizations & lift.",
		features: ["Everything in Starter", "Unlimited campaigns", "Creative variants AI", "Priority support"],
		highlighted: true,
	},
	{
		key: "agency",
		name: "Agency",
		price: "$997",
		blurb: "Multi-brand and agency workflows + reporting.",
		features: ["Everything in Pro", "Multi-workspace", "Client reports", "SLA support"],
	},
];

function StartModal() {
	const [open, setOpen] = React.useState(false);
	const [plan, setPlan] = React.useState<PlanKey | null>(null);
	const [email, setEmail] = React.useState("");
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string | null>(null);

	// read ?aff=CODE once
	const affCode = React.useMemo(() => {
		if (typeof window === "undefined") return undefined;
		const p = new URLSearchParams(window.location.search);
		const code = p.get("aff");
		return code ? code.toUpperCase() : undefined;
	}, []);

	// API base (empty = same origin)
	const apiBase = (process.env.NEXT_PUBLIC_API_BASE || "").replace(/\/$/, "");

	// Map plan → priceId from env
	const PRICE_IDS: Record<PlanKey, string> = {
		starter: process.env.NEXT_PUBLIC_STARTER_PRICE_ID || "",
		pro: process.env.NEXT_PUBLIC_PRO_PRICE_ID || "",
		agency: process.env.NEXT_PUBLIC_AGENCY_PRICE_ID || "",
	};

	// Listen for your custom event
	React.useEffect(() => {
		const handler = (e: Event) => {
			const detail = (e as CustomEvent).detail as { plan: PlanKey };
			setPlan(detail.plan);
			setOpen(true);
			setError(null);
		};
		window.addEventListener("revvy:startModalOpen", handler as EventListener);
		return () => window.removeEventListener("revvy:startModalOpen", handler as EventListener);
	}, []);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError(null);
		if (!plan) return;
		const priceId = PRICE_IDS[plan];
		if (!priceId) {
			setError("Missing price configuration. Contact support.");
			return;
		}
		if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
			setError("Please enter a valid email.");
			return;
		}
		setLoading(true);
		try {
			const r = await fetch(`${apiBase}/api/stripe/subscribe`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ priceId, email, affCode }),
			});
			if (!r.ok) {
				const body = await r.json().catch(() => ({}));
				throw new Error(body.error || "Subscription failed.");
			}
			const { url } = await r.json();
			window.location.href = url; // → Stripe Checkout
		} catch (err: any) {
			setError(err.message || "Something went wrong.");
			setLoading(false);
		}
	}

	if (!open) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
			<div className="w-full max-w-md rounded-2xl bg-[#0B0E14] p-6 ring-1 ring-white/10">
				<div className="flex items-start justify-between">
					<h4 className="text-xl font-semibold text-white">Start {plan === "starter" ? "Starter" : plan === "pro" ? "Pro" : "Agency"}</h4>
					<button onClick={() => setOpen(false)} className="rounded-md px-2 py-1 text-sm text-white/70 hover:bg-white/10" aria-label="Close">
						✕
					</button>
				</div>

				<p className="mt-2 text-sm text-white/70">Enter your email to continue to secure Stripe checkout.</p>

				<form onSubmit={handleSubmit} className="mt-4 space-y-3">
					<input type="email" placeholder="you@store.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-white placeholder-white/40 outline-none focus:border-[#8B5CF6]" autoFocus required />
					{affCode && (
						<div className="text-xs text-[#C9B6FF]">
							Referred by <span className="font-semibold">{affCode}</span>
						</div>
					)}
					{error && <div className="text-sm text-red-400">{error}</div>}
					<button type="submit" disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] py-2.5 font-medium text-white disabled:opacity-60">
						{loading ? "Redirecting…" : "Continue to Stripe"}
					</button>
					<div className="text-center text-xs text-white/50">Secured by Stripe • 7-day money-back guarantee</div>
				</form>
			</div>
		</div>
	);
}

export default function PricingSection() {
	return (
		<section id="pricing" className="relative z-0 scroll-mt-24 bg-[#06070A] text-white">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple pricing for serious growth</h2>
					<p className="mt-3 text-base text-white/70">Launch in minutes. Cancel anytime. No hidden fees.</p>
				</div>

				<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{PLANS.map((plan) => (
						<Card key={plan.key} plan={plan} />
					))}
				</div>

				<div className="mt-8 text-center text-sm text-white/60">7-day money-back guarantee • Secure checkout via Stripe</div>
			</div>

			{/* ⚠️ Mount the modal once per page */}
			<StartModal />
		</section>
	);
}

function Card({
	plan,
}: {
	plan: {
		key: PlanKey;
		name: string;
		price: string;
		blurb: string;
		features: string[];
		highlighted?: boolean;
	};
}) {
	const openStart = (key: PlanKey) => {
		const ev = new CustomEvent("revvy:startModalOpen", { detail: { plan: key } });
		window.dispatchEvent(ev);
	};

	return (
		<div className={["group relative h-full rounded-2xl p-6", "bg-white/[0.04] ring-1 ring-white/10", plan.highlighted ? "ring-1 ring-[#8B5CF6]/40 bg-[#11131A]" : ""].join(" ")}>
			<div className="flex h-full flex-col">
				<div>
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold">{plan.name}</h3>
						{plan.highlighted && <span className="rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-2.5 py-1 text-xs font-medium text-[#C9B6FF]">Most popular</span>}
					</div>
					<div className="mt-2 text-4xl font-bold tracking-tight">{plan.price}</div>
					<p className="mt-2 text-sm text-white/70">{plan.blurb}</p>
				</div>

				<ul className="mt-5 space-y-2 text-sm text-white/80">
					{plan.features.map((f) => (
						<li key={f} className="flex items-start gap-2">
							<span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/40" />
							<span>{f}</span>
						</li>
					))}
				</ul>

				<div className="mt-6">
					<button type="button" onClick={() => openStart(plan.key)} className={["w-full rounded-xl px-4 py-2.5 text-sm font-medium", plan.highlighted ? "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white" : "bg-white/10 text-white hover:bg-white/15"].join(" ")}>
						Start • Enter Email
					</button>
				</div>
			</div>
		</div>
	);
}
