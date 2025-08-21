export default function Privacy() {
	return (
		<main className="mx-auto max-w-3xl px-6 py-16">
			<h1 className="text-3xl font-bold">Privacy Policy</h1>
			<p className="mt-4 text-neutral-300 text-sm">We collect account data (name, email), subscription data, and product inputs you provide. We use it to operate and improve Revvy Pro.</p>

			<h2 className="mt-8 text-xl font-semibold">Data We Collect</h2>
			<ul className="list-disc pl-5 text-neutral-300 text-sm">
				<li>Account: name, email, auth tokens</li>
				<li>Billing: via Stripe (we do not store card details)</li>
				<li>Usage: pages, features, logs for reliability</li>
			</ul>

			<h2 className="mt-6 text-xl font-semibold">How We Use Data</h2>
			<p className="text-neutral-300 text-sm">Provide features, prevent abuse, and support customers. We do not sell personal data.</p>

			<h2 className="mt-6 text-xl font-semibold">Third Parties</h2>
			<p className="text-neutral-300 text-sm">Stripe (payments), analytics (see below), hosting (Vercel). Each has its own policy.</p>

			<h2 className="mt-6 text-xl font-semibold">Security</h2>
			<p className="text-neutral-300 text-sm">Industry‑standard encryption in transit and at rest where applicable.</p>

			<h2 className="mt-6 text-xl font-semibold">Your Choices</h2>
			<p className="text-neutral-300 text-sm">You can request data deletion by contacting support@revvy.pro. Cancel anytime from your dashboard.</p>
		</main>
	);
}
