"use client";

import { useMemo, useState } from "react";
import { Copy, Check } from "lucide-react";
import { buildAffiliateLink } from "@/lib/affiliates";

export default function AffiliateEarnings() {
	const [views, setViews] = useState(50000);
	const [ctr, setCtr] = useState(1.8);
	const [conv, setConv] = useState(4.5);
	const [payout, setPayout] = useState(250); // avg first-month rev share
	const [copied, setCopied] = useState(false);

	const result = useMemo(() => {
		const clicks = Math.round(views * (ctr / 100));
		const sales = Math.round(clicks * (conv / 100));
		const rev = sales * payout;
		return { clicks, sales, rev };
	}, [views, ctr, conv, payout]);

	const link = buildAffiliateLink({ id: "DEMO123", campaign: "viral-preview" });

	return (
		<section id="affiliate" className="bg-[#0B0C11] text-white">
			<div className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-2 gap-10">
				<div>
					<h2 className="text-3xl md:text-4xl font-semibold">See your earnings in one week</h2>
					<p className="mt-3 text-white/70">One short video. Real utility. Premium conversion. Affiliates earn 50% of first-month revenue.</p>

					<div className="mt-6 space-y-4">
						<Slider label="Monthly views" value={views} onChange={setViews} min={1000} max={1000000} step={1000} />
						<Slider label="Click-through %" value={ctr} onChange={setCtr} min={0.3} max={8} step={0.1} />
						<Slider label="Signup conversion %" value={conv} onChange={setConv} min={1} max={12} step={0.1} />
						<Slider label="$ per signup (avg payout)" value={payout} onChange={setPayout} min={80} max={600} step={5} />
					</div>
				</div>

				<div className="rounded-2xl border border-white/10 bg-white/5 p-6">
					<div className="grid grid-cols-3 gap-4 text-center">
						<Stat label="Clicks" value={result.clicks.toLocaleString()} />
						<Stat label="Signups" value={result.sales.toLocaleString()} />
						<Stat label="Your payout" value={`$${result.rev.toLocaleString()}`} highlight />
					</div>

					<div className="mt-6">
						<button
							onClick={async () => {
								await navigator.clipboard.writeText(link);
								setCopied(true);
								setTimeout(() => setCopied(false), 1200);
							}}
							className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white text-black px-4 py-3 hover:bg-white/90"
						>
							{copied ? <Check className="size-4" /> : <Copy className="size-4" />}
							{copied ? "Copied affiliate link" : "Copy your affiliate link"}
						</button>
						<p className="mt-2 text-xs text-white/50 break-all">{link}</p>
					</div>
				</div>
			</div>
		</section>
	);
}

function Slider({ label, value, onChange, min, max, step }: { label: string; value: number; onChange: (n: number) => void; min: number; max: number; step: number }) {
	return (
		<label className="block">
			<div className="mb-1 text-sm text-white/70">
				{label}: <span className="text-white font-medium">{value}</span>
			</div>
			<input type="range" value={value} min={min} max={max} step={step} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-white" />
		</label>
	);
}

function Stat({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
	return (
		<div className="rounded-xl bg-black/30 px-4 py-5">
			<div className="text-xs uppercase tracking-wide text-white/50">{label}</div>
			<div className={`mt-1 text-xl font-semibold ${highlight ? "text-emerald-400" : ""}`}>{value}</div>
		</div>
	);
}
