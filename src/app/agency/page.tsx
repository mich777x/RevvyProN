export default function AgencyPage() {
	return (
		<main className="mx-auto max-w-2xl p-8 text-center">
			<h1 className="text-3xl font-bold">Lock Your Agency’s Territory — Only 100 Spots.</h1>
			<p className="mt-3 text-gray-600">Secure regional/national/global exclusivity before your competitors do.</p>
			<div className="mt-6 flex flex-col items-center gap-3">
				<a href={process.env.NEXT_PUBLIC_STRIPE_LINK_300K} className="px-4 py-2 rounded border inline-block">
					Secure for $300,000
				</a>
				<a href={process.env.NEXT_PUBLIC_STRIPE_LINK_500K} className="px-4 py-2 rounded border inline-block">
					Secure for $500,000
				</a>
				<a href={process.env.NEXT_PUBLIC_STRIPE_LINK_1M} className="px-4 py-2 rounded border inline-block">
					Secure for $1,000,000
				</a>
			</div>
		</main>
	);
}
