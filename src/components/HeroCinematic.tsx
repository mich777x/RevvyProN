"use client";

import React from "react";
import useRefCapture from "@/hooks/useRefCapture";

export default function HeroCinematic() {
	useRefCapture();
	const bars = [12, 36, 28, 44, 30, 52, 41];
	const line = [22, 28, 25, 34, 31, 45, 39, 52];
	const linePath = (() => {
		const w = 100;
		const h = 40;
		const step = w / (line.length - 1);
		const max = Math.max(...line);
		const min = Math.min(...line);
		const norm = (v: number) => h - ((v - min) / Math.max(1, max - min)) * (h - 4) - 2;
		return line.map((v, i) => `${i === 0 ? "M" : "L"} ${i * step},${norm(v)}`).join(" ");
	})();

	return (
		<section className="relative isolate overflow-hidden bg-[#06070A] pt-28 sm:pt-32">
			{/* Gradient background */}
			<div
				aria-hidden
				className="pointer-events-none absolute inset-0"
				style={{
					background: "radial-gradient(60rem 60rem at 50% -10%, rgba(139,92,246,0.22), transparent 55%), radial-gradient(48rem 48rem at 85% 20%, rgba(34,211,238,0.18), transparent 60%)",
				}}
			/>
			<GridLines />

			<div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
				{/* Text + CTA */}
				<div className="relative z-10">
					<Badge>RevvyPro · AI Ad Engine for Shopify</Badge>

					<h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
						Cut ad spend <span className="text-white/80">by</span> <span className="bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] bg-clip-text text-transparent">40%</span> & boost ROI — in minutes.
					</h1>

					<p className="mt-4 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg">RevvyPro finds winning audiences and creatives automatically, runs experiments, and scales what works across Meta & Google — no agency retainer required.</p>

					{/* Proof
					<div id="proof" className="mt-5 flex items-center gap-3 text-sm">
						<Dot className="bg-[#8B5CF6]" />
						<Dot className="bg-[#22D3EE]" />
						<Dot className="bg-white/70" />
						<p className="text-white/70">
							Trusted by <span className="font-medium text-white">200+ Shopify brands</span>
						</p>
					</div> */}

					{/* Premium CTAs */}
					<div className="mt-6 flex flex-col items-start gap-3 sm:flex-row">
						<button type="button" onClick={() => window.dispatchEvent(new CustomEvent("revvy:startModalOpen"))} className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] px-5 py-3 text-sm font-medium text-white shadow-[0_0_24px_rgba(139,92,246,0.25)] transition-transform hover:scale-[1.01] active:scale-[0.99] animate-[pulse_2.4s_ease-in-out_infinite]" data-ph-event="hero_cta_click">
							Get Started
						</button>
						<a href="#pricing" className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/10" data-ph-event="view_plans_click">
							View Plans
						</a>
					</div>

					{/* 3 key benefits (clarity) */}
					<ul className="mt-5 space-y-2 text-sm text-white/80">
						<li className="flex items-start gap-2">
							<span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" />
							Audience discovery that actually works.
						</li>
						<li className="flex items-start gap-2">
							<span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#22D3EE]" />
							Creative testing without spreadsheets.
						</li>
						<li className="flex items-start gap-2">
							<span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/70" />
							Auto-scales winners across Meta + Google.
						</li>
					</ul>

					{/* KPI strip */}
					<ul className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
						<li className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
							<div className="font-semibold">↓ 31%</div>
							<div className="text-white/60">Avg CPA</div>
						</li>
						<li className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
							<div className="font-semibold">2.1×</div>
							<div className="text-white/60">ROAS lift</div>
						</li>
						<li className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2">
							<div className="font-semibold">7&nbsp;min</div>
							<div className="text-white/60">Time to launch</div>
						</li>
					</ul>
				</div>

				{/* Visual code dashboard */}
				<div className="relative z-10">
					<div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-2 shadow-[0_0_40px_rgba(34,211,238,0.12)]">
						<div className="relative overflow-hidden rounded-xl bg-[#0B0D12] p-4">
							<div className="pointer-events-none absolute inset-x-0 -top-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
							<div className="mb-4 flex items-center gap-2">
								<div className="h-2.5 w-2.5 rounded-full bg-white/20" />
								<div className="h-2.5 w-2.5 rounded-full bg-white/20" />
								<div className="h-2.5 w-2.5 rounded-full bg-white/20" />
								<div className="ml-auto rounded-md border border-white/10 px-2 py-0.5 text-[10px] text-white/60">RevvyPro • Demo</div>
							</div>

							{/* Chart visuals */}
							<div className="grid gap-4 md:grid-cols-2">
								<BarChart bars={bars} />
								<LineChart linePath={linePath} />
								<CreativeTags />
							</div>
						</div>
					</div>
					<p className="mt-3 text-center text-xs text-white/50">*Code-rendered demo — visual only, no images.</p>
				</div>
			</div>

			<div className="pointer-events-none absolute inset-x-0 bottom-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
		</section>
	);
}

/* Subcomponents */
function GridLines() {
	return (
		<div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.12]">
			<div
				className="h-full w-full"
				style={{
					backgroundImage: "linear-gradient(to right, rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.12) 1px, transparent 1px)",
					backgroundSize: "56px 56px",
				}}
			/>
		</div>
	);
}
function Badge({ children }: { children: React.ReactNode }) {
	return (
		<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
			<span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE]" />
			{children}
		</div>
	);
}
function Dot({ className = "" }: { className?: string }) {
	return <span className={`inline-block h-2.5 w-2.5 rounded-full ${className}`} />;
}
function BarChart({ bars }: { bars: number[] }) {
	return (
		<div className="rounded-lg border border-white/10 bg-[#10141B] p-4">
			<h3 className="text-xs font-medium text-white/80">Audience Discovery</h3>
			<div className="mt-3 flex h-28 items-end gap-2">
				{bars.map((v, i) => (
					<div key={i} style={{ height: `${v}%` }} className="w-5 rounded-md bg-gradient-to-t from-[#0E1520] to-[#1B2540] ring-1 ring-white/10">
						<div className="h-full w-full rounded-md bg-gradient-to-t from-[#22D3EE] to-[#8B5CF6] opacity-80" style={{ height: "65%" }} />
					</div>
				))}
			</div>
			<p className="mt-2 text-xs text-white/60">Top segments trending ↑</p>
		</div>
	);
}
function LineChart({ linePath }: { linePath: string }) {
	return (
		<div className="rounded-lg border border-white/10 bg-[#10141B] p-4">
			<h3 className="text-xs font-medium text-white/80">Performance (ROAS)</h3>
			<div className="mt-3 h-28 rounded-md border border-white/5 bg-[#0E1520] p-2">
				<svg viewBox="0 0 100 40" className="h-full w-full">
					<defs>
						<linearGradient id="grad" x1="0" x2="1" y1="0" y2="0">
							<stop offset="0" stopColor="#8B5CF6" />
							<stop offset="1" stopColor="#22D3EE" />
						</linearGradient>
					</defs>
					<g opacity="0.2" stroke="white">
						{[8, 16, 24, 32].map((y) => (
							<line key={y} x1="0" y1={y} x2="100" y2={y} strokeWidth="0.5" />
						))}
					</g>
					<path d={linePath} fill="none" stroke="url(#grad)" strokeWidth="2" strokeLinecap="round" />
				</svg>
			</div>
			<p className="mt-2 text-xs text-white/60">ROAS lift over last 7 days</p>
		</div>
	);
}
function CreativeTags() {
	return (
		<div className="rounded-lg border border-white/10 bg-[#10141B] p-4 md:col-span-2">
			<h3 className="text-xs font-medium text-white/80">Creative Testing</h3>
			<div className="mt-3 flex flex-wrap gap-2">
				{["UGC • Hooks", "Static • Offer", "Carousel • Benefits", "Video • Story"].map((t) => (
					<span key={t} className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/80">
						{t}
					</span>
				))}
			</div>
			<p className="mt-2 text-xs text-white/60">
				Best variant: <span className="text-white">UGC • Hooks</span> (CPA ↓ 18%)
			</p>
		</div>
	);
}
