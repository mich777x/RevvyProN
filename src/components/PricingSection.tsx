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

export default function PricingSection() {
	return (
		<section id="pricing" className="relative z-0 scroll-mt-24 bg-[#06070A] text-white">
			{/* Container — compact padding; no min-h-screen */}
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
				{/* Header — remove top margins to avoid collapse */}
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple pricing for serious growth</h2>
					<p className="mt-3 text-base text-white/70">Launch in minutes. Cancel anytime. No hidden fees.</p>
				</div>

				{/* Grid */}
				<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{PLANS.map((plan) => (
						<Card key={plan.key} plan={plan} />
					))}
				</div>

				{/* Small reassurance row */}
				<div className="mt-8 text-center text-sm text-white/60">7-day money-back guarantee • Secure checkout via Stripe</div>
			</div>
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
		// Open your StartModal with details (won't affect layout)
		const ev = new CustomEvent("revvy:startModalOpen", {
			detail: { plan: key },
		});
		window.dispatchEvent(ev);
	};

	return (
		<div className={["group relative h-full rounded-2xl p-6", "bg-white/[0.04] ring-1 ring-white/10", plan.highlighted ? "ring-1 ring-[#8B5CF6]/40 bg-[#11131A]" : ""].join(" ")}>
			<div className="flex h-full flex-col">
				{/* Title / Price */}
				<div>
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold">{plan.name}</h3>
						{plan.highlighted && <span className="rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-2.5 py-1 text-xs font-medium text-[#C9B6FF]">Most popular</span>}
					</div>
					<div className="mt-2 text-4xl font-bold tracking-tight">{plan.price}</div>
					<p className="mt-2 text-sm text-white/70">{plan.blurb}</p>
				</div>

				{/* Features */}
				<ul className="mt-5 space-y-2 text-sm text-white/80">
					{plan.features.map((f) => (
						<li key={f} className="flex items-start gap-2">
							<span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/40" />
							<span>{f}</span>
						</li>
					))}
				</ul>

				{/* CTA — stays at bottom; no extra vertical space */}
				<div className="mt-6">
					<button type="button" onClick={() => openStart(plan.key)} className={["w-full rounded-xl px-4 py-2.5 text-sm font-medium", plan.highlighted ? "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white" : "bg-white/10 text-white hover:bg-white/15"].join(" ")}>
						Start • Enter Email
					</button>
				</div>
			</div>
		</div>
	);
}
