"use client";
import { useEffect, useMemo, useState } from "react";

type Props = {
	deadlineISO?: string; // e.g., "2025-11-05T23:59:59Z"
	label?: string;
};
export default function PricingTimer({ deadlineISO, label = "Founders price ends in" }: Props) {
	const [now, setNow] = useState<Date>(new Date());
	const deadline = useMemo(() => (deadlineISO ? new Date(deadlineISO) : new Date(Date.now() + 72 * 3600 * 1000)), [deadlineISO]);

	useEffect(() => {
		const id = setInterval(() => setNow(new Date()), 1000);
		return () => clearInterval(id);
	}, []);

	const diff = Math.max(0, Math.floor((deadline.getTime() - now.getTime()) / 1000));
	const d = Math.floor(diff / 86400);
	const h = Math.floor((diff % 86400) / 3600);
	const m = Math.floor((diff % 3600) / 60);
	const s = diff % 60;

	return (
		<div className="rounded-2xl border p-4 bg-white/60 backdrop-blur">
			<div className="text-sm opacity-70">{label}</div>
			<div className="mt-1 text-2xl font-semibold tabular-nums">
				{d}d : {h}h : {m}m : {s}s
			</div>
			<div className="text-xs opacity-60 mt-1">Price increases after the timer.</div>
		</div>
	);
}
