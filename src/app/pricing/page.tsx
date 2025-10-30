import PricingTimer from "@/components/PricingTimer";
import TrustBadges from "@/components/TrustBadges";
import PressBar from "@/components/PressBar";
import Link from "next/link";

const PLANS = [
	{ name: "Starter", price: 297, features: ["AI creatives", "Viral Score", "Basic reports"] },
	{ name: "Pro", price: 497, features: ["Everything in Starter", "Adaptive Tuner", "Leaderboard access"] },
	{ name: "Agency", price: 997, features: ["All Pro", "Affiliate hub", "Priority support"] },
];

export default function PricingPage() {
	const deadline = new Date(Date.now() + 72 * 3600 * 1000).toISOString();
	return (
		<main className="mx-auto max-w-5xl p-6 space-y-8">
			<h1 className="text-3xl font-semibold">Pricing</h1>
			<PricingTimer deadlineISO={deadline} />
			<div className="grid md:grid-cols-3 gap-4">
				{PLANS.map((p) => (
					<div key={p.name} className="rounded-2xl border p-5">
						<div className="text-sm opacity-60">{p.name}</div>
						<div className="text-3xl font-bold mt-1">
							${p.price}
							<span className="text-base opacity-60">/mo</span>
						</div>
						<ul className="mt-3 space-y-1 text-sm">
							{p.features.map((f) => (
								<li key={f}>• {f}</li>
							))}
						</ul>
						<Link href="/signup" className="mt-4 inline-block rounded-xl bg-black text-white px-4 py-2">
							Choose {p.name}
						</Link>
					</div>
				))}
			</div>
			<PressBar />
			<TrustBadges />
		</main>
	);
}
