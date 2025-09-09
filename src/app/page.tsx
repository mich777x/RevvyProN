import Link from "next/link";

export default function HomePage() {
	return (
		<main className="min-h-screen bg-white text-gray-900 dark:bg-neutral-950 dark:text-neutral-100">
			<div className="mx-auto max-w-6xl px-6 py-16">
				{/* Hero */}
				<section className="text-center">
					<h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">RevvyPro — AI Ad Engine</h1>
					<p className="mt-4 text-lg text-gray-600 dark:text-gray-400">Cut ad spend by 40%. Boost ROI. Launch in minutes.</p>
					<div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
						<Link href="/saas" className="inline-block rounded-xl bg-black px-5 py-3 font-medium text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black/30 dark:bg-white dark:text-black dark:hover:opacity-90">
							Start for $1 →
						</Link>
						<Link href="/agencies" className="inline-block rounded-xl border border-gray-300 px-5 py-3 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 dark:border-white/20 dark:hover:bg-white/10">
							Agency Exclusivity
						</Link>
						<span aria-disabled className="inline-block cursor-not-allowed rounded-xl border border-gray-200 px-5 py-3 font-medium text-gray-400 dark:border-white/10 dark:text-white/40">
							Mega‑License (Coming Soon)
						</span>
					</div>
				</section>

				{/* Value Props */}
				<section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{/* SaaS Trial */}
					<div className="rounded-2xl border border-gray-200 p-6 shadow-sm dark:border-white/10">
						<h2 className="text-xl font-semibold">SaaS Trial — $1 to Start</h2>
						<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Launch today for just $1. After the trial, it renews at $499/month. Cancel anytime.</p>
						<Link href="/saas" className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-black/30 dark:bg-white dark:text-black dark:hover:opacity-90">
							Go to Trial
						</Link>
					</div>

					{/* Agency Exclusivity */}
					<div className="rounded-2xl border border-gray-200 p-6 shadow-sm dark:border-white/10">
						<h2 className="text-xl font-semibold">Agency Exclusivity — Only 100 Spots</h2>
						<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Secure regional, national, or global exclusivity before competitors do.</p>
						<Link href="/agencies" className="mt-4 inline-block rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black/10 dark:border-white/20 dark:hover:bg-white/10">
							View Tiers ($300k / $500k / $1M)
						</Link>
					</div>

					{/* Mega License */}
					<div className="rounded-2xl border border-gray-200 p-6 opacity-60 shadow-sm dark:border-white/10">
						<h2 className="text-xl font-semibold">Mega‑License — $10M (Coming Soon)</h2>
						<p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Exclusive 1‑year RevvyPro license. Bank transfer via hosted invoice.</p>
						<span className="mt-4 inline-block rounded-lg border border-gray-300 px-4 py-2 text-gray-400 dark:border-white/10 dark:text-white/40">Coming Soon</span>
					</div>
				</section>

				{/* Footer */}
				<footer className="mt-16 border-t border-gray-200 pt-6 text-center text-sm text-gray-500 dark:border-white/10 dark:text-gray-400">© {new Date().getFullYear()} RevvyPro. All rights reserved.</footer>
			</div>
		</main>
	);
}
