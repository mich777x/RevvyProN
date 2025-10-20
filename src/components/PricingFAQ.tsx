"use client";

import Link from "next/link";

export default function FAQPage() {
	return (
		<main className="min-h-screen bg-[#06070A] text-white">
			{/* Header */}
			<section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
				<div className="text-center">
					<h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Pricing & Refunds — Frequently Asked Questions</h1>
					<p className="mt-3 text-white/70">Transparent, flexible, and risk-free. Here’s everything you need to know.</p>
				</div>

				{/* Top CTA/summary */}
				<div className="mt-10 grid gap-6 md:grid-cols-3">
					<Card title="Starter — $297/mo" bullets={["AI Ad Engine core", "5 campaigns / mo", "Email support"]} />
					<Card title="Pro — $497/mo" bullets={["Everything in Starter", "Unlimited campaigns", "Priority support"]} badge="Most popular" />
					<Card title="Agency — $997/mo" bullets={["Everything in Pro", "Multi-workspace", "Client reporting"]} />
				</div>

				<p className="mt-6 text-center text-sm text-white/60">7-day money-back guarantee • Cancel anytime via Stripe • No hidden fees</p>
			</section>

			{/* FAQ */}
			<section className="mx-auto max-w-3xl px-4 pb-24 sm:px-6 lg:px-8">
				<h2 className="text-2xl font-semibold">Pricing & Billing</h2>
				<div className="mt-6 space-y-6">
					<QA
						q="What are the plan prices?"
						a={
							<>
								We offer <b>Starter ($297/mo)</b>, <b>Pro ($497/mo)</b>, and <b>Agency ($997/mo)</b>. All plans are monthly; upgrade or cancel anytime.
							</>
						}
					/>
					<QA q="Do you offer a free trial or discount?" a="No free trial — instead we offer a 7-day, no-questions-asked refund on first-time purchases." />
					<QA q="How do I pay?" a={<>Securely via Stripe. Your card details never touch our servers. You’ll get an email receipt and a portal link to manage your subscription.</>} />
					<QA q="Can I upgrade or downgrade?" a="Yes. Changes prorate automatically via Stripe. You can manage this in the billing portal link from your receipt." />
				</div>

				<h2 className="mt-12 text-2xl font-semibold">7-Day Refund Policy</h2>
				<div className="mt-6 space-y-6">
					<QA
						q="How does the 7-day guarantee work?"
						a={
							<>
								If RevvyPro isn’t a fit, email{" "}
								<a className="underline" href="mailto:support@revvyproai.com">
									support@revvyproai.com
								</a>{" "}
								within <b>7 days of your first purchase</b>. We’ll refund that first charge in full and cancel your subscription.
							</>
						}
					/>
					<QA
						q="What’s included vs. excluded?"
						a={
							<>
								Included: the <b>first month’s charge</b> of your plan. Excluded: renewals, repeat refunds, or abuse.
							</>
						}
					/>
					<QA q="How long do refunds take?" a="We issue approved refunds within 1–3 business days. Your bank may take 3–10 days to reflect it." />
					<QA q="How do I cancel ongoing renewals?" a="Use the billing portal link included in your Stripe receipt or from account settings. Cancels are immediate for future cycles." />
				</div>

				<h2 className="mt-12 text-2xl font-semibold">Technical & Data</h2>
				<div className="mt-6 space-y-6">
					<QA q="Is checkout secure?" a="Yes. We use Stripe Payment Links — PCI-compliant, HTTPS-only. We never store card data." />
					<QA q="Can I get an invoice?" a="Yes — every charge has a Stripe invoice emailed to you automatically. You can update billing details in the portal." />
					<QA q="Do you support affiliates?" a="Yes. We attribute affiliate codes during checkout and track commissions automatically." />
				</div>

				<div className="mt-14 text-center">
					<Link href="/#pricing" className="rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] px-5 py-3 font-semibold">
						Back to Pricing
					</Link>
				</div>
			</section>
		</main>
	);
}

function Card({ title, bullets, badge }: { title: string; bullets: string[]; badge?: string }) {
	return (
		<div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
			<div className="flex items-start justify-between">
				<h3 className="text-lg font-semibold">{title}</h3>
				{badge && <span className="rounded-full border border-[#8B5CF6]/30 bg-[#8B5CF6]/10 px-2.5 py-1 text-xs text-[#C9B6FF]">{badge}</span>}
			</div>
			<ul className="mt-4 space-y-2 text-sm text-white/80">
				{bullets.map((b) => (
					<li key={b} className="flex items-start gap-2">
						<span aria-hidden className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-white/40" />
						<span>{b}</span>
					</li>
				))}
			</ul>
		</div>
	);
}

function QA({ q, a }: { q: string; a: React.ReactNode }) {
	return (
		<div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
			<h3 className="text-base font-semibold">{q}</h3>
			<p className="mt-2 text-sm text-white/75">{a}</p>
		</div>
	);
}
