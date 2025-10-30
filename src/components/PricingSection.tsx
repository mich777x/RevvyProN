"use client";

import * as React from "react";

// ===== Types =====
type PricingProps = {
	userEmail?: string;
};

type PlanKey = "starter" | "pro" | "agency";

type Plan = {
	key: PlanKey;
	name: string;
	price: string;
	blurb: string;
	features: string[];
};

type CardProps = {
	plan: Plan;
	highlighted?: boolean;
	userEmail?: string;
};

// Optional: if you have a signed-in user, pass { userEmail } to prefill Stripe's email field.
// Example usage: <PricingSection userEmail={session?.user?.email} />
export default function PricingSection({ userEmail }: PricingProps) {
	return (
		<section id="pricing" className="relative z-0 scroll-mt-24 bg-[#06070A] text-white">
			<div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
				{/* Header */}
				<div className="mx-auto max-w-2xl text-center">
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Simple pricing for serious growth</h2>
					<p className="mt-3 text-base text-white/70">Launch in minutes. Cancel anytime. No hidden fees.</p>
				</div>

				{/* Grid */}
				<div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					<Card
						plan={{
							key: "starter",
							name: "Starter",
							price: "$297",
							blurb: "Solo founders or new stores validating paid traffic.",
							features: ["AI Ad Engine core", "5 campaigns / mo", "Email support", "Basic analytics"],
						}}
						highlighted={false}
						userEmail={userEmail}
					/>
					<Card
						plan={{
							key: "pro",
							name: "Pro",
							price: "$497",
							blurb: "Scaling stores needing deeper optimizations & lift.",
							features: ["Everything in Starter", "Unlimited campaigns", "Creative variants AI", "Priority support"],
						}}
						highlighted
						userEmail={userEmail}
					/>
					<Card
						plan={{
							key: "agency",
							name: "Agency",
							price: "$997",
							blurb: "Multi-brand and agency workflows + reporting.",
							features: ["Everything in Pro", "Multi-workspace", "Client reports", "SLA support"],
						}}
						highlighted={false}
						userEmail={userEmail}
					/>
				</div>

				{/* Reassurance row */}
				<div className="mt-8 text-center text-sm text-white/60">7-day money-back guarantee • Cancel anytime via Stripe</div>
			</div>
		</section>
	);
}

function Card({ plan, highlighted, userEmail }: CardProps) {
	// Read ?aff=CODE (shown to user; actual capture should be Stripe "custom field")
	const affCode = React.useMemo<string | undefined>(() => {
		if (typeof window === "undefined") return undefined;
		const p = new URLSearchParams(window.location.search);
		const code = p.get("aff");
		return code ? code.toUpperCase() : undefined;
	}, []);

	// Map plan -> Payment Link URL from env
	const PAYMENT_LINKS = React.useMemo<Record<PlanKey, string>>(
		() => ({
			starter: process.env.NEXT_PUBLIC_STARTER_LINK ?? "",
			pro: process.env.NEXT_PUBLIC_PRO_LINK ?? "",
			agency: process.env.NEXT_PUBLIC_AGENCY_LINK ?? "",
		}),
		[]
	);

	// Stripe Payment Links support ?prefilled_email=
	function buildStripeUrl(baseUrl: string): string {
		if (!baseUrl) return "";
		try {
			const url = new URL(baseUrl);
			if (userEmail) url.searchParams.set("prefilled_email", userEmail);
			// NOTE: Affiliate Code MUST be captured via a "Custom field" configured on the Payment Link.
			// You cannot prefill that field from the URL; Stripe collects it on their hosted page.
			return url.toString();
		} catch {
			return baseUrl; // fallback
		}
	}

	function openStripeCheckout(planKey: PlanKey): void {
		const base = PAYMENT_LINKS[planKey];
		const url = buildStripeUrl(base);
		if (!url) {
			alert("Checkout link not configured. Contact support.");
			return;
		}
		window.location.href = url;
	}

	return (
		<div className={["group relative h-full rounded-2xl p-6", "bg-white/[0.04] ring-1 ring-white/10", highlighted ? "ring-1 ring-[#8B5CF6]/40 bg-[#11131A]" : ""].join(" ")}>
			<div className="flex h-full flex-col">
				{/* Title / Price */}
				<div>
					<div className="flex items-center justify-between">
						<h3 className="text-lg font-semibold">{plan.name}</h3>
						{highlighted && <span className="rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-2.5 py-1 text-xs font-medium text-[#C9B6FF]">Most popular</span>}
					</div>
					<div className="mt-2 text-4xl font-bold tracking-tight">
						{plan.price}
						<span className="text-sm">/mo</span>
					</div>
					<p className="mt-2 text-sm text-white/70">{plan.blurb}</p>
				</div>

				{/* Features */}
				<ul className="mt-5 space-y-2 text-sm text-white/80">
					{plan.features.map((f: string) => (
						<li key={f} className="flex items-start gap-2">
							<span aria-hidden="true" className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/40"></span>
							<span>{f}</span>
						</li>
					))}
				</ul>

				{/* Affiliate visual hint (optional) */}
				{affCode && (
					<div className="mt-3 text-xs text-[#C9B6FF]">
						Referred by <span className="font-semibold">{affCode}</span>
					</div>
				)}

				{/* CTA */}
				<div className="mt-6">
					<button type="button" onClick={() => openStripeCheckout(plan.key)} className={["w-full rounded-xl px-4 py-2.5 text-sm font-medium", highlighted ? "bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] text-white" : "bg-white/10 text-white hover:bg-white/15"].join(" ")}>
						Subscribe • {plan.name}
					</button>
				</div>
			</div>
		</div>
	);
}
