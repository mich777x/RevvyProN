export default function TrialPage() {
	return (
		<main className="mx-auto max-w-2xl p-8 text-center">
			<h1 className="text-3xl font-bold">Cut Ad Spend 40%. Boost ROI. AI-Powered.</h1>
			<p className="mt-3 text-gray-600">Launch today for just $1 → renews at $499 in October.</p>
			<div className="mt-6">
				<a href={process.env.NEXT_PUBLIC_STRIPE_LINK_TRIAL} className="px-5 py-3 rounded-lg bg-black text-white inline-block">
					Start for $1
				</a>
			</div>
		</main>
	);
}
