"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
	posterSrc?: string; // fallback image (e.g. /og.png or /logo.png)
	videoSrc?: string; // when you have a real mp4 later: /trailer.mp4
	title?: string;
	kpis?: { label: string; to: number; prefix?: string; suffix?: string }[];
};

function useCounter(to: number, duration = 1200) {
	const [val, setVal] = useState(0);
	const startRef = useRef<number | null>(null);

	useEffect(() => {
		let raf = 0;
		const step = (t: number) => {
			if (startRef.current === null) startRef.current = t;
			const p = Math.min(1, (t - startRef.current) / duration);
			setVal(Math.round(to * (0.05 + 0.95 * p))); // ease-in a tiny bit
			if (p < 1) raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	}, [to, duration]);

	return val;
}

export default function PromoBlock({
	posterSrc = "/og.png",
	videoSrc,
	title = "Product Trailer",
	kpis = [
		{ label: "Ad Spend Saved", to: 42380, prefix: "$" },
		{ label: "Avg ROAS Lift", to: 21, suffix: "×" }, // 2.1× shown as 21/10 below
		{ label: "Setup Time", to: 8, suffix: " min" },
	],
}: Props) {
	const saved = useCounter(kpis[0]?.to ?? 0);
	const roas10 = useCounter(kpis[1]?.to ?? 0); // will format /10 => 2.1× if to=21
	const setup = useCounter(kpis[2]?.to ?? 0);

	return (
		<div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40">
			{/* animated glow background */}
			<div className="absolute inset-0 -z-10 animate-rp-gradient opacity-30" />

			{/* poster or video */}
			<div className="aspect-video w-full grid place-items-center">
				{videoSrc ? (
					<video src={videoSrc} autoPlay loop muted playsInline className="w-full h-full object-cover" />
				) : (
					<div className="relative w-full h-full">
						<Image src={posterSrc} alt={title} fill className="object-cover opacity-95" priority />
						<div className="absolute inset-0 grid place-items-center">
							<div className="flex items-center gap-3 rounded-xl bg-black/35 px-4 py-2 ring-1 ring-white/15">
								<span className="inline-block h-2 w-2 rounded-full bg-rp-accent animate-pulse" />
								<span className="text-sm text-rp-sub">{title}</span>
							</div>
						</div>
					</div>
				)}
			</div>

			{/* KPI strip */}
			<div className="grid grid-cols-3 gap-3 p-4">
				<div className="rounded-xl bg-white/5 border border-white/10 p-4">
					<p className="text-xs text-rp-sub">Ad Spend Saved</p>
					<p className="mt-1 text-xl font-semibold">${saved.toLocaleString()}</p>
				</div>
				<div className="rounded-xl bg-white/5 border border-white/10 p-4">
					<p className="text-xs text-rp-sub">Avg ROAS Lift</p>
					<p className="mt-1 text-xl font-semibold">{(roas10 / 10).toFixed(1)}×</p>
				</div>
				<div className="rounded-xl bg-white/5 border border-white/10 p-4">
					<p className="text-xs text-rp-sub">Time to Launch</p>
					<p className="mt-1 text-xl font-semibold">{setup} min</p>
				</div>
			</div>
		</div>
	);
}
