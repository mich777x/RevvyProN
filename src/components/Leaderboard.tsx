"use client";
import { useEffect, useState } from "react";

type Row = {
	id: string;
	productTitle: string;
	headline: string;
	viralScore: number;
	roi: number;
	score: number;
};

export default function Leaderboard() {
	const [rows, setRows] = useState<Row[]>([]);
	useEffect(() => {
		(async () => {
			const r = await fetch("/api/leaderboard");
			const d = await r.json();
			setRows(d);
		})();
	}, []);
	return (
		<div className="rounded-2xl border p-4">
			<div className="mb-3 font-medium">Top Creatives — Weekly Leaderboard</div>
			<div className="divide-y">
				{rows.map((r, i) => (
					<div key={r.id} className="py-3 flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="w-8 text-right">{i + 1}</div>
							<div>
								<div className="text-sm uppercase opacity-60">{r.productTitle}</div>
								<div className="font-medium line-clamp-1">{r.headline}</div>
							</div>
						</div>
						<div className="flex items-center gap-6 text-right">
							<div className="text-sm">
								Viral: <b>{r.viralScore}</b>
							</div>
							<div className="text-sm">
								ROI: <b>{(r.roi ?? 0).toFixed(2)}</b>
							</div>
							<div className="text-sm">
								Score: <b>{r.score}</b>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
