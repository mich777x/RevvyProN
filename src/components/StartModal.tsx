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

	// Listen for open events with details from pricing buttons
	React.useEffect(() => {
		const handler = (e: Event) => {
			const ce = e as CustomEvent<{ plan: PlanKey; priceId?: string }>;
			setSelectedPlan(ce.detail?.plan ?? null);
			setPriceId(ce.detail?.priceId ?? null);
			setOpen(true);
			// focus email after a tick
			setTimeout(() => emailRef.current?.focus(), 0);
		};
		window.addEventListener("revvy:startModalOpen", handler as EventListener);
		return () => window.removeEventListener("revvy:startModalOpen", handler as EventListener);
	}, []);

	// esc to close
	React.useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

	if (!mounted || !open) return null;

	return createPortal(
		<div className="fixed inset-0 z-[80] flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="start-modal-title">
			<button type="button" aria-label="Close" onClick={() => setOpen(false)} className="absolute inset-0 bg-black/60" />
			<div className="relative z-[81] mx-4 w-full max-w-md rounded-2xl bg-white p-6 text-gray-900 shadow-xl">
				<div className="flex items-start justify-between">
					<h2 id="start-modal-title" className="text-lg font-semibold">
						Start Your RevvyPro Trial
					</h2>
					<button type="button" onClick={() => setOpen(false)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50">
						<span className="sr-only">Close</span>✕
					</button>
				</div>

				{/* Prefill summary */}
				{selectedPlan && (
					<p className="mt-2 text-sm text-gray-600">
						Selected plan: <span className="font-medium capitalize">{selectedPlan}</span>
					</p>
				)}

				{/* Email capture */}
				<form
					className="mt-4 space-y-3"
					onSubmit={(e) => {
						e.preventDefault();
						const email = emailRef.current?.value?.trim();
						if (!email) return;
						// TODO: send to your endpoint (e.g., /api/start) with plan + priceId
						// fetch("/api/start", { method:"POST", body: JSON.stringify({ email, plan: selectedPlan, priceId }) })
						setOpen(false);
					}}
				>
					<label className="block text-sm font-medium text-gray-900">Work Email</label>
					<input ref={emailRef} type="email" required placeholder="you@brand.com" className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500" />

					<button type="submit" className="w-full rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] px-4 py-2.5 font-medium text-white">
						Continue
					</button>

					<input type="hidden" name="plan" value={selectedPlan ?? ""} />
					<input type="hidden" name="priceId" value={priceId ?? ""} />
				</form>
			</div>
		</div>,
		document.body
	);
}
