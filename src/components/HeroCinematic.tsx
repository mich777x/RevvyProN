"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTransform } from "framer-motion";
import Link from "next/link";

export default function HeroCinematic() {
	const mx = useMotionValue(0);
	const my = useMotionValue(0);
	const sx = useSpring(mx, { stiffness: 120, damping: 20 });
	const sy = useSpring(my, { stiffness: 120, damping: 20 });
	const xDerived = useTransform(sx, (v) => v * 24);
	const yDerived = useTransform(sy, (v) => v * -24);

	return (
		<section
			onMouseMove={(e) => {
				const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
				mx.set((e.clientX - (left + width / 2)) / width);
				my.set((e.clientY - (top + height / 2)) / height);
			}}
			className="relative overflow-hidden min-h-[88vh] bg-[#06070A] text-white"
		>
			{/* Glow mesh */}
			<motion.div style={{ x: xDerived, y: yDerived }} className="pointer-events-none absolute inset-0">
				<div
					className="absolute -inset-32 blur-3xl opacity-60"
					style={{
						background: "radial-gradient(600px 300px at 20% 20%, #8B5CF6 30%, transparent 60%), radial-gradient(600px 300px at 80% 60%, #22D3EE 30%, transparent 60%)",
					}}
				/>
			</motion.div>

			{/* Content */}
			<div className="relative mx-auto max-w-6xl px-6 pt-28 pb-16">
				<div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs tracking-wide">
					<span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
					Live: Shopify ad engine v1.0 • <span className="opacity-75">ROAS up to +42%</span>
				</div>

				<h1 className="mt-6 text-5xl md:text-7xl font-semibold leading-[1.05]">
					RevvyPro —{" "}
					<span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(90deg,#8B5CF6,#22D3EE)" }}>
						The AI Ad Engine
					</span>{" "}
					for Shopify
				</h1>

				<p className="mt-5 max-w-2xl text-lg md:text-xl text-white/70">Launch high-performing ads in minutes. Predict winners, cut waste, and turn every dollar into compounding ROI.</p>

				<div className="mt-8 flex flex-col sm:flex-row gap-3">
					<Link href="#get-started" className="group inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 text-base font-medium border border-white/10 bg-white/10 hover:bg-white/15">
						Try the 10-sec demo
						<ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
					</Link>
					<Link href="#affiliate" className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium bg-white text-black hover:bg-white/90">
						Affiliates: preview your earnings
					</Link>
				</div>

				{/* Subtle “trails” layer */}
				<Trails />
			</div>
		</section>
	);
}

function Trails() {
	return (
		<svg className="pointer-events-none absolute inset-0 opacity-30" aria-hidden>
			<defs>
				<linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
					<stop stopColor="#8B5CF6" offset="0" />
					<stop stopColor="#22D3EE" offset="1" />
				</linearGradient>
			</defs>
			<g>
				{[...Array(7)].map((_, i) => (
					<motion.path key={i} d={`M -100 ${120 + i * 120} C 400 ${60 + i * 90}, 800 ${180 + i * 60}, 1400 ${80 + i * 110}`} stroke="url(#g1)" strokeWidth={1.2} fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6 + i * 0.15, ease: "easeOut" }} />
				))}
			</g>
		</svg>
	);
}
