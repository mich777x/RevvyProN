// src/components/LiveProofStrip.tsx
"use client";
import { motion } from "framer-motion";
import { ShieldCheck, Rocket } from "lucide-react";
import { kCompactNumber } from "@/lib/format";
import { sampleProof } from "@/lib/proof";

export default function LiveProofStrip() {
	const items = sampleProof(); // anonymized, rotating examples

	return (
		<div className="bg-black border-y border-white/10">
			<div className="mx-auto max-w-6xl px-6 py-5 flex items-center gap-6 overflow-x-auto">
				<span className="inline-flex items-center gap-2 text-white/70 text-sm whitespace-nowrap">
					<ShieldCheck className="size-4 text-emerald-400" />
					Verifiable wins (hashed)
				</span>

				{items.map((p, i) => (
					<motion.div key={i} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }} className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
						<div className="text-xs text-white/60">
							{p.vertical} • {p.region}
						</div>
						<div className="mt-1 flex items-center gap-3">
							<span className="text-white font-semibold">
								ROAS {p.before.roas}→{p.after.roas}
							</span>
							<span className="text-emerald-400 text-sm">CPA ↓ {p.delta.cpa}%</span>
							<span className="text-cyan-300 text-sm">Spend Saved ${kCompactNumber(p.delta.spend)}</span>
						</div>
						<div className="mt-1 text-[10px] text-white/50">proof:{p.proof.slice(0, 10)}…</div>
					</motion.div>
				))}

				<span className="ml-auto inline-flex items-center gap-2 text-white/70 text-sm whitespace-nowrap">
					<Rocket className="size-4 text-cyan-300" />
					Typical launch: minutes, not weeks
				</span>
			</div>
		</div>
	);
}
