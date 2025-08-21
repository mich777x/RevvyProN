export default function FAQ() {
	const faqs = [
		{
			q: "Can I cancel anytime?",
			a: "Yes, cancel anytime with 1 click in your dashboard.",
		},
		{
			q: "Do you offer refunds?",
			a: "No, all sales are final. Cancel anytime — but no refunds.",
		},
		{
			q: "Is there support?",
			a: "Email support is included on the Starter plan. Priority email + chat support are available on Growth and Agency plans.",
		},
		{
			q: "Do you connect to my ad accounts?",
			a: "Yes, integrations for TikTok, Meta (Facebook/Instagram), and Google Ads are rolling out soon.",
		},
		{
			q: "How secure is my data?",
			a: "We use industry-standard encryption and never share your ad account data with third parties.",
		},
		{
			q: "What happens if I upgrade my plan?",
			a: "Upgrades are applied instantly, and you get access to the new features right away.",
		},
		{
			q: "Do I need a credit card for the trial?",
			a: "Yes, a credit card is required. You can cancel anytime before the next billing cycle to avoid charges.",
		},
	];

	return (
		<section className="py-20 bg-neutral-950 text-white">
			<div className="max-w-4xl mx-auto px-6">
				<h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
				<div className="space-y-6">
					{faqs.map((faq, i) => (
						<div key={i} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
							<h3 className="font-semibold">{faq.q}</h3>
							<p className="mt-2 text-neutral-300 text-sm">{faq.a}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
