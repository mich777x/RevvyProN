"use client";
import { useEffect, useState } from "react";

type Row = {
	rank: number;
	refCode: string;
	email: string;
	clicks: number;
	conversions: number;
	earnings: number;
	score: number;
};

export default function AffiliateLeaderboard() {
	const [rows, setRows] = useState<Row[]>([]);
	useEffect(() => {
		(async () => {
			const r = await fetch("/api/leaderboard/affiliates");
			if (r.ok) setRows(await r.json());
		})();
	}, []);
	return (
		<div className="rounded-2xl border p-4">
			<div className="mb-3 font-medium">Affiliate Leaderboard — This Week</div>
			<div className="grid grid-cols-12 gap-2 text-xs font-medium opacity-60 mb-2">
				<div>#</div>
				<div className="col-span-3">Affiliate</div>
				<div>Clicks</div>
				<div>Conv</div>
				<div>Earnings</div>
				<div className="col-span-5">Score</div>
			</div>
			<div className="divide-y">
				{rows.map((r) => (
					<div key={r.rank + r.refCode} className="grid grid-cols-12 gap-2 py-2 items-center">
						<div>{r.rank}</div>
						<div className="col-span-3">
							<div className="font-mono">{r.refCode}</div>
							<div className="opacity-60">{r.email}</div>
						</div>
						<div>{r.clicks}</div>
						<div>{r.conversions}</div>
						<div>${r.earnings.toFixed(2)}</div>
						<div className="col-span-5">
							<div className="h-2 w-full bg-neutral-200 rounded">
								<div className="h-2 rounded bg-black" style={{ width: `${Math.min(100, r.score)}%` }} />
							</div>
							<div className="text-xs opacity-70 mt-1">Score: {Math.round(r.score)}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
