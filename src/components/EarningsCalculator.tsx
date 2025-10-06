"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export default function EarningsCalculator() {
	const [views, setViews] = useState(50000); // monthly audience views
	const [ctr, setCtr] = useState(1.5); // % click-through
	const [conv, setConv] = useState(5); // % signup conversion
	const [payout, setPayout] = useState(250); // $ per sale avg

	const result = useMemo(() => {
		const clicks = Math.round(views * (ctr / 100));
		const sales = Math.round(clicks * (conv / 100));
		const rev = sales * payout;
		return { clicks, sales, rev };
	}, [views, ctr, conv, payout]);

	const Input = ({ label, value, onChange, min, max, step, suffix }: { label: string; value: number; onChange: (v: number) => void; min: number; max: number; step: number; suffix?: string }) => (
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<label className="opacity-80">{label}</label>
				<span className="text-rp-sub">
					{value}
					{suffix}
				</span>
			</div>
			<input t="range" className="w-full accent-current" min={min} max={max} step={step} value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.currentTarget.value))} />
		</div>
	);

	return (
		<div className="rp-card p-6">
			<h3 className="text-lg font-semibold">Earnings Calculator</h3>
			<p className="mt-1 text-sm text-rp-sub">Estimate potential affiliate earnings from a single post.</p>

			<div className="mt-5 grid gap-5 md:grid-cols-2">
				<div className="space-y-5">
					<Input label="Monthly Views" value={views} onChange={setViews} min={5000} max={1000000} step={5000} />
					<Input label="Click-Through Rate" value={ctr} onChange={setCtr} min={0.5} max={8} step={0.1} suffix="%" />
					<Input label="Conversion Rate" value={conv} onChange={setConv} min={1} max={20} step={0.5} suffix="%" />
					<Input label="Avg Payout per Sale" value={payout} onChange={setPayout} min={100} max={600} step={25} suffix="$" />
				</div>

				<div className="rounded-2xl border border-white/10 bg-white/5 p-5 grid gap-4 content-start">
					<div>
						<p className="text-xs text-rp-sub">Estimated Clicks</p>
						<p className="text-2xl font-semibold">{result.clicks.toLocaleString()}</p>
					</div>
					<div>
						<p className="text-xs text-rp-sub">Estimated Sales</p>
						<p className="text-2xl font-semibold">{result.sales.toLocaleString()}</p>
					</div>
					<div>
						<p className="text-xs text-rp-sub">Estimated Earnings</p>
						<p className="text-3xl font-semibold">${result.rev.toLocaleString()}</p>
					</div>

					<Link href="#apply" className="mt-2 inline-flex justify-center rounded-xl px-5 py-3 font-medium ring-1 ring-rp-primary/35 bg-rp-primary/85 hover:bg-rp-primary transition">
						Apply to the Program
					</Link>

					<p className="text-xs text-rp-sub">* Actual results vary. CTR/CR depend on audience fit and message.</p>
				</div>
			</div>
		</div>
	);
}
