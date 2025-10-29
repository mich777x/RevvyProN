"use client";
import { useEffect, useState } from "react";
import TrendsChart from "@/components/TrendsChart";
import Leaderboard from "@/components/Leaderboard";
import RegenerateModal from "@/components/RegenerateModal";

type Creative = {
	id: string;
	headline: string;
	primary: string;
	description: string;
	viralScore: number;
	ctr: number | null;
	product?: { title: string };
};

export default function DashboardPage() {
	const [items, setItems] = useState<Creative[]>([]);
	const [loading, setLoading] = useState(false);
	const [selected, setSelected] = useState<string | null>(null);

	async function load() {
		setLoading(true);
		const res = await fetch("/api/creatives");
		const data = await res.json();
		setItems(data);
		setSelected((prev) => prev ?? data[0]?.id ?? null);
		setLoading(false);
	}

	useEffect(() => {
		load();
	}, []);

	async function regenerate(productTitle: string) {
		await fetch("/api/creatives", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ product: { title: productTitle } }),
		});
		await load();
	}

	async function forecast(creativeId: string) {
		await fetch("/api/predictions", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ creativeId }),
		});
		await load();
	}

	async function runTuner() {
		await fetch("/api/cron/ad-tuner", { method: "POST" });
		await load();
	}

	return (
		<main className="mx-auto max-w-6xl p-6 space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Revvy Dashboard</h1>
				<div className="flex gap-3">
					<button onClick={runTuner} className="rounded-xl px-4 py-2 bg-black text-white">
						Run Adaptive Tuner
					</button>
					<button onClick={load} className="rounded-xl px-4 py-2 border">
						Refresh
					</button>
				</div>
			</div>

			{loading && <p className="opacity-70">Loading…</p>}

			{/* Leaderboard */}
			<Leaderboard />

			{/* Creatives list */}
			<div className="grid gap-4">
				{items.map((c) => (
					<div key={c.id} className="rounded-2xl border p-4">
						<div className="flex items-center justify-between">
							<div onClick={() => setSelected(c.id)} className="cursor-pointer">
								<div className="text-sm uppercase opacity-60">{c.product?.title ?? "Product"}</div>
								<h3 className="text-lg font-medium">{c.headline}</h3>
								<p className="text-sm opacity-80">{c.primary}</p>
								<p className="text-sm opacity-70 mt-1">{c.description}</p>
							</div>
							<div className="text-right">
								<div className="text-3xl font-bold">{c.viralScore}</div>
								<div className="text-xs opacity-60">Viral Score</div>
								<div className="text-xs opacity-60 mt-1">CTR: {c.ctr ?? 0}</div>
							</div>
						</div>
						<div className="flex gap-3 mt-4">
							<button onClick={() => regenerate(c.product?.title ?? "Demo Product")} className="rounded-xl px-3 py-2 border">
								Regenerate Variant
							</button>
							<button onClick={() => forecast(c.id)} className="rounded-xl px-3 py-2 border">
								Forecast & Score
							</button>
							<RegenerateModal creativeId={c.id} onDone={load} />
						</div>
						{/* Chart per selected creative */}
						{selected === c.id && (
							<div className="mt-4">
								<TrendsChart creativeId={c.id} title="CTR/ROI Trends" />
							</div>
						)}
					</div>
				))}
			</div>
		</main>
	);
}
