// src/components/StartModal.tsx
"use client";

import * as React from "react";
import { createPortal } from "react-dom";

type PlanKey = "starter" | "pro" | "agency";

export default function StartModal() {
	const [mounted, setMounted] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [selectedPlan, setSelectedPlan] = React.useState<PlanKey | null>(null);
	const [priceId, setPriceId] = React.useState<string | null>(null);
	const emailRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => setMounted(true), []);

	// Open from pricing/header
	React.useEffect(() => {
		const handler = (e: Event) => {
			const ce = e as CustomEvent<{ plan?: PlanKey; priceId?: string }>;
			setSelectedPlan(ce.detail?.plan ?? null);
			setPriceId(ce.detail?.priceId ?? null);
			setOpen(true);
			setTimeout(() => emailRef.current?.focus(), 0);
		};
		window.addEventListener("revvy:startModalOpen", handler as EventListener);
		return () => window.removeEventListener("revvy:startModalOpen", handler as EventListener);
	}, []);

	// ESC to close
	React.useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

	if (!mounted || !open) return null;

	const primaryCta = selectedPlan ? "Continue to Checkout" : "Continue";
	const subline = selectedPlan ? "You selected a plan. Enter your work email to continue to secure checkout." : "Enter your work email to create your RevvyPro account. You'll choose a plan on the next step.";

	return createPortal(
		<div className="fixed inset-0 z-[80] flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="start-modal-title">
			{/* Backdrop */}
			<button type="button" aria-label="Close" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/60" />
			{/* Panel */}
			<div className="relative z-[81] mx-4 w-full max-w-md rounded-2xl bg-[#0B0D12] p-6 text-white shadow-2xl ring-1 ring-white/10">
				<div className="flex items-start justify-between">
					<h2 id="start-modal-title" className="text-lg font-semibold">
						Create your RevvyPro account
					</h2>
					<button type="button" onClick={() => setOpen(false)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 hover:bg-white/5">
						<span className="sr-only">Close</span>✕
					</button>
				</div>

				{selectedPlan && (
					<p className="mt-2 text-sm text-white/70">
						Selected plan: <span className="capitalize text-white">{selectedPlan}</span>
					</p>
				)}

				<p className="mt-2 text-sm text-white/70">{subline}</p>

				<form
					className="mt-4 space-y-3"
					onSubmit={async (e) => {
						e.preventDefault();
						const email = emailRef.current?.value?.trim();
						if (!email) return;

						// Send lead to your backend; no “trial” wording anywhere.
						await fetch("/api/start", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ email, plan: selectedPlan, priceId }),
						});

						// If you already have a checkout endpoint, redirect now:
						// if (priceId) {
						//   const r = await fetch("/api/checkout", { method: "POST", body: JSON.stringify({ priceId, customer_email: email, success_url: location.origin + "/success", cancel_url: location.href }) });
						//   const { url } = await r.json();
						//   if (url) location.href = url;
						// }

						setOpen(false);
					}}
				>
					<label className="block text-sm font-medium text-white">Work Email</label>
					<input ref={emailRef} type="email" required placeholder="you@brand.com" className="mt-1 w-full rounded-xl border border-white/10 bg-[#0E1116] px-3 py-2 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-[#8B5CF6]" />

					<button type="submit" className="w-full rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] px-4 py-2.5 font-medium text-white">
						{primaryCta}
					</button>

					<input type="hidden" name="plan" value={selectedPlan ?? ""} />
					<input type="hidden" name="priceId" value={priceId ?? ""} />
				</form>

				{/* Confidence line */}
				<p className="mt-3 text-center text-xs text-white/60">7-day money-back guarantee • Cancel anytime</p>
			</div>
		</div>,
		document.body
	);
}
