"use client";
import { useEffect, useState } from "react";

export default function Countdown({ end }: { end: string }) {
	const [left, setLeft] = useState<string>("");

	useEffect(() => {
		const endAt = new Date(end).getTime();
		const id = setInterval(() => {
			const d = Math.max(0, endAt - Date.now());
			const days = Math.floor(d / 86400000);
			const hours = Math.floor((d / 3600000) % 24);
			const mins = Math.floor((d / 60000) % 60);
			const secs = Math.floor((d / 1000) % 60);
			setLeft(`${days}d : ${hours}h : ${mins}m : ${secs}s`);
		}, 1000);
		return () => clearInterval(id);
	}, [end]);

	return (
		<div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
			<span className="text-xs uppercase tracking-wider text-rp-sub">Launch Ends In</span>
			<span className="font-mono">{left}</span>
		</div>
	);
}
