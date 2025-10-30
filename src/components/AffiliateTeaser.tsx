"use client";
import { useState } from "react";
import Link from "next/link";

export default function AffiliateTeaser() {
	const [email, setEmail] = useState("");
	const [audience, setAudience] = useState("");
	const [busy, setBusy] = useState(false);
	const [ok, setOk] = useState(false);
	const [err, setErr] = useState<string | null>(null);

	async function submit() {
		setBusy(true);
		setErr(null);
		try {
			const r = await fetch("/api/affiliate/waitlist", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, audience }),
			});
			const d = await r.json();
			if (!r.ok) throw new Error(d.error || "Failed");
			setOk(true);
		} catch (e: unknown) {
			const msg = e instanceof Error ? e.message : String(e);
			setErr(msg);
		} finally {
			setBusy(false);
		}
	}

	if (ok) {
		return (
			<div className="rounded-2xl border p-5 bg-white/60">
				<div className="font-medium">You`re on the list!</div>
				<div className="text-sm opacity-70">
					We`ll send your unique link soon. Meanwhile, see{" "}
					<Link className="underline" href="/affiliate">
						affiliate info
					</Link>
					.
				</div>
			</div>
		);
	}

	return (
		<div className="rounded-2xl border p-5 bg-white/60">
			<div className="flex items-center justify-between gap-4 mb-3">
				<div>
					<div className="text-sm opacity-60">Affiliate Program</div>
					<div className="font-medium">Earn 50% recurring on RevvyPro</div>
				</div>
				<Link href="/affiliate" className="text-sm underline">
					Details
				</Link>
			</div>
			<div className="grid md:grid-cols-3 gap-2">
				<input placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-xl border p-2" />
				<input placeholder="Audience size / niche (optional)" value={audience} onChange={(e) => setAudience(e.target.value)} className="rounded-xl border p-2" />
				<button onClick={submit} disabled={busy} className="rounded-xl bg-black text-white px-4">
					{busy ? "Submitting..." : "Get Early Link"}
				</button>
			</div>
			{err && <div className="text-xs text-red-600 mt-2">{err}</div>}
			<div className="text-xs opacity-70 mt-2">We’ll verify & send a unique link. Payouts via Stripe Connect.</div>
		</div>
	);
}
