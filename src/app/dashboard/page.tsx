"use client";

import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

type Plan = "starter" | "growth" | "agency" | null;

export default function DashboardPage() {
	const { data: session, status } = useSession();
	const [plan, setPlan] = useState<Plan>(null);

	// TEMP: pull plan from localStorage (until Stripe webhooks wire real plans)
	useEffect(() => {
		const p = window.localStorage.getItem("revvy_plan");
		setPlan((p as Plan) ?? null);
	}, []);

	if (status === "loading") {
		return (
			<main className="mx-auto max-w-4xl px-6 py-24">
				<div className="text-neutral-400">Loading…</div>
			</main>
		);
	}

	return (
		<main className="mx-auto max-w-5xl px-6 py-10">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl md:text-4xl font-extrabold">Dashboard</h1>
				<button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm rounded-xl border border-neutral-700 px-3 py-2 hover:border-neutral-500">
					Sign out
				</button>
			</div>

			<section className="mt-6 grid gap-6 md:grid-cols-3">
				<div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
					<div className="text-sm text-neutral-400">User</div>
					<div className="mt-2 text-lg font-semibold">{session?.user?.email ?? "Unknown"}</div>
					<div className="mt-1 text-neutral-400 text-sm">{session?.user?.name}</div>
				</div>

				<div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
					<div className="text-sm text-neutral-400">Plan</div>
					<div className="mt-2 text-lg font-semibold capitalize">{plan ?? "none"}</div>

					{/* TEMP plan selector for demos */}
					<div className="mt-3 grid grid-cols-3 gap-2">
						{["starter", "growth", "agency"].map((p) => (
							<button
								key={p}
								onClick={() => {
									window.localStorage.setItem("revvy_plan", p);
									setPlan(p as Plan);
								}}
								className="rounded-xl border border-neutral-700 px-3 py-2 text-sm hover:border-neutral-500 capitalize"
							>
								{p}
							</button>
						))}
					</div>
					<p className="mt-2 text-xs text-neutral-500">Temporary for demos — Stripe webhooks will set this automatically later.</p>
				</div>

				<div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
					<div className="text-sm text-neutral-400">Quick Links</div>
					<div className="mt-2 flex flex-col gap-2">
						<a href="/generator" className="rounded-xl border border-neutral-700 px-3 py-2 hover:border-neutral-500 text-sm">
							Ad Creative Generator
						</a>
						<Link href="/" className="rounded-xl border border-neutral-700 px-3 py-2 hover:border-neutral-500 text-sm">
							Pricing
						</Link>
					</div>
				</div>
			</section>

			{/* Example: surface last generated creatives, stats, etc. later */}
			<section className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
				<div className="text-sm text-neutral-400 mb-2">Notes</div>
				<p className="text-sm text-neutral-300">This is your command center. Coming next: connect ad accounts, weekly AI reports, and multi‑store manager.</p>
			</section>
		</main>
	);
}
