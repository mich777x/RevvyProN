"use client";
import { useState } from "react";

const angles = [
	{ h: "Cut CPA Fast", b: "RevvyPro’s adaptive tuner improved our CTR daily and cut CPA by 30% in week one." },
	{ h: "Daily-Evolving Creatives", b: "Set your ads on autopilot. RevvyPro evolves winners every 24 hours." },
	{ h: "Viral Score Proof", b: "Every creative gets a 0–100 Viral Score so you know what to scale." },
];

export default function AffiliateAssetsPage() {
	const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
	function copy(t: string, i: number) {
		navigator.clipboard.writeText(t).then(() => {
			setCopiedIdx(i);
			setTimeout(() => setCopiedIdx(null), 1200);
		});
	}
	return (
		<main className="mx-auto max-w-5xl p-6 space-y-6">
			<h1 className="text-2xl font-semibold">Affiliate Assets</h1>

			<section className="rounded-2xl border p-4">
				<div className="font-medium mb-2">Angles & Copy (1-click copy)</div>
				<div className="grid md:grid-cols-2 gap-4">
					{angles.map((a, i) => (
						<div key={i} className="rounded-xl border p-3">
							<div className="font-medium">{a.h}</div>
							<p className="text-sm opacity-80 mt-1">{a.b}</p>
							<button onClick={() => copy(`${a.h} — ${a.b}`, i)} className="mt-2 rounded-xl px-3 py-2 border">
								{copiedIdx === i ? "Copied!" : "Copy"}
							</button>
						</div>
					))}
				</div>
			</section>

			<section className="rounded-2xl border p-4">
				<div className="font-medium mb-2">Logos & Media</div>
				<div className="text-sm opacity-80">
					Drop your real files into <code>/public/press-kit/</code> later (logo.svg, banner.png, trailer.mp4). We’ll auto-link them on Day 10.
				</div>
				<ul className="list-disc pl-6 text-sm mt-2">
					<li>/public/press-kit/logo.svg</li>
					<li>/public/press-kit/banner.png</li>
					<li>/public/press-kit/trailer.mp4</li>
				</ul>
			</section>
		</main>
	);
}
