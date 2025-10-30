"use client";
import { useEffect, useState } from "react";
import AffiliateLeaderboard from "@/components/AffiliateLeaderboard";

type Stat = { clicks: number; conversions: number; earnings: number };
type LinkResp = { url: string; refCode: string };

export default function AffiliatePage() {
	const [email, setEmail] = useState("");
	const [link, setLink] = useState<LinkResp | null>(null);
	const [stat, setStat] = useState<Stat | null>(null);
	const [err, setErr] = useState<string | null>(null);

	async function getLink() {
		setErr(null);
		try {
			const r = await fetch("/api/affiliate/link", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email }),
			});
			const d = await r.json();
			if (!r.ok) throw new Error(d.error || "Failed");
			setLink(d);
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : String(e);
			setErr(msg);
		}
	}

	useEffect(() => {
		(async () => {
			const r = await fetch("/api/affiliate/stats");
			if (r.ok) setStat(await r.json());
		})();
	}, []);

	return (
		<main className="mx-auto max-w-4xl p-6 space-y-6">
			<h1 className="text-2xl font-semibold">Affiliate Dashboard</h1>

			<section className="rounded-2xl border p-4 space-y-3">
				<div className="text-sm opacity-70">Get your referral link</div>
				<div className="flex flex-col sm:flex-row gap-2">
					<input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="rounded-xl border p-2 flex-1" />
					<button onClick={getLink} className="rounded-xl bg-black text-white px-4 py-2">
						Get Link
					</button>
				</div>
				{err && <div className="text-xs text-red-600">{err}</div>}
				{link && (
					<div className="text-sm">
						<div className="opacity-70">Your code</div>
						<div className="font-mono">{link.refCode}</div>
						<div className="opacity-70 mt-2">Your URL</div>
						<div className="font-mono break-all">{link.url}</div>
					</div>
				)}
			</section>

			<section className="rounded-2xl border p-4">
				<div className="text-sm opacity-70">Stats (aggregate)</div>
				<div className="grid grid-cols-3 gap-3 mt-3 text-center">
					<div className="rounded-xl border p-4">
						<div className="text-2xl font-semibold">{stat?.clicks ?? 0}</div>
						<div className="text-xs opacity-60">Clicks</div>
					</div>
					<div className="rounded-xl border p-4">
						<div className="text-2xl font-semibold">{stat?.conversions ?? 0}</div>
						<div className="text-xs opacity-60">Conversions</div>
					</div>
					<div className="rounded-xl border p-4">
						<div className="text-2xl font-semibold">${(stat?.earnings ?? 0).toFixed(2)}</div>
						<div className="text-xs opacity-60">Earnings</div>
					</div>
				</div>
			</section>
			<AffiliateLeaderboard />
		</main>
	);
}
