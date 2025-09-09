// src/app/page.tsx
import Link from "next/link";

export const metadata = {
	title: "RevvyPro — AI Ad Engine",
	description: "Cut Ad Spend 40%. Boost ROI. AI-Powered.",
};

export default function HomePage() {
	return (
		<main className="min-h-screen bg-white text-gray-900">
			<div className="mx-auto max-w-5xl px-6 py-14">
				{/* Hero */}
				<section className="text-center">
					<h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">RevvyPro — AI Ad Engine</h1>
					<p className="mt-4 text-lg text-gray-600">Cut Ad Spend 40%. Boost ROI. Launch in minutes.</p>
					<div className="mt-8 flex items-center justify-center gap-4">
						<Link href="/trial" className="inline-block rounded-xl bg-black px-5 py-3 font-medium text-white hover:opacity-90">
							Start for $1 →
						</Link>
						<Link href="/agency" className="inline-block rounded-xl border border-gray-300 px-5 py-3 font-medium hover:bg-gray-50">
							Agency Exclusivity
						</Link>
						<span className="inline-block rounded-xl border border-gray-200 px-5 py-3 font-medium text-gray-400 cursor-not-allowed">Mega License (Coming Soon)</span>
					</div>
				</section>

				{/* 3 Simple Sections */}
				<section className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{/* SaaS Trial */}
					<div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
						<h2 className="text-xl font-semibold">SaaS Trial — “Cut Ad Spend 40%. Boost ROI. AI-Powered.”</h2>
						<p className="mt-2 text-sm text-gray-600">Launch today for just $1 → renews at $499 in October.</p>
						<Link href="/trial" className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-white hover:opacity-90">
							Go to Trial
						</Link>
					</div>

					{/* Agency Exclusivity */}
					<div className="rounded-2xl border border-gray-200 p-6 shadow-sm">
						<h2 className="text-xl font-semibold">Agency Exclusivity — Only 100 Spots</h2>
						<p className="mt-2 text-sm text-gray-600">Secure regional / national / global exclusivity before competitors do.</p>
						<Link href="/agency" className="mt-4 inline-block rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
							View Tiers ($300k / $500k / $1M)
						</Link>
					</div>

					{/* Mega License (Coming Soon) */}
					<div className="rounded-2xl border border-gray-200 p-6 shadow-sm opacity-60">
						<h2 className="text-xl font-semibold">Mega-License — $10M (Coming Soon)</h2>
						<p className="mt-2 text-sm text-gray-600">Exclusive 1-year Revvy AI license. Bank transfer via hosted invoice.</p>
						<span className="mt-4 inline-block rounded-lg border border-gray-300 px-4 py-2 text-gray-400 cursor-not-allowed">Coming Soon</span>
					</div>
				</section>

				{/* Footer */}
				<footer className="mt-16 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} RevvyPro. All rights reserved.</footer>
			</div>
		</main>
	);
}
