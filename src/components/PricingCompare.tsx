"use client";

import { Check, Minus } from "lucide-react";

const rows = [
	{ label: "AI Ad Engine core", tiers: [true, true, true] },
	{ label: "Predictive creatives", tiers: [true, true, true] },
	{ label: "Advanced reporting", tiers: [false, true, true] },
	{ label: "White-glove onboarding", tiers: [false, true, true] },
	{ label: "Multi-brand support", tiers: [false, false, true] },
	{ label: "Priority SLA support", tiers: [false, false, true] },
	{ label: "Early API access", tiers: [false, false, true] },
];

export default function PricingCompare() {
	return (
		<section className="bg-[#07090F] text-white">
			<div className="mx-auto max-w-6xl px-6 pb-16">
				<h3 className="text-center text-2xl md:text-3xl font-semibold">What’s in each plan</h3>
				<div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
					<table className="min-w-[720px] w-full text-sm">
						<thead className="bg-white/5 text-white/70">
							<tr>
								<th className="px-4 py-3 text-left font-medium">Feature</th>
								<th className="px-4 py-3 font-medium text-center">Launch</th>
								<th className="px-4 py-3 font-medium text-center">Done-For-You</th>
								<th className="px-4 py-3 font-medium text-center">Multi-Location</th>
							</tr>
						</thead>
						<tbody>
							{rows.map((r, i) => (
								<tr key={r.label} className={i % 2 ? "bg-white/[0.03]" : ""}>
									<td className="px-4 py-3">{r.label}</td>
									{r.tiers.map((ok, j) => (
										<td key={j} className="px-4 py-3 text-center">
											{ok ? <Check className="inline-block size-4 text-emerald-400" /> : <Minus className="inline-block size-4 text-white/30" />}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<p className="mt-3 text-center text-xs text-white/60">All plans include consent-compliant tracking and secure OAuth.</p>
			</div>
		</section>
	);
}
