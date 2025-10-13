export const metadata = {
	title: "Terms of Service — RevvyPro",
	description: "Terms of Service for RevvyPro.",
};

export default function TermsPage() {
	return (
		<article className="prose prose-invert max-w-none prose-headings:scroll-mt-24">
			<h1 className="mb-1 text-3xl font-bold">Terms of Service</h1>
			<p className="text-sm text-white/60">Last updated: October 9, 2025</p>

			<p>Welcome to RevvyPro. By accessing or using our website, products, or services (“Services”), you agree to be bound by these Terms of Service (“Terms”). If you do not agree, do not use the Services.</p>

			<h2>1. Accounts & Eligibility</h2>
			<p>You must be at least 18 years old and capable of forming a binding contract. You are responsible for maintaining the confidentiality of your account and for all activity under it.</p>

			<h2>2. Use of Services</h2>
			<p>You agree to use the Services in compliance with applicable laws and not to misuse, reverse engineer, or access without authorization any portion of the platform. We may suspend or terminate accounts that violate these Terms.</p>

			<h2>3. Subscriptions, Payments & Taxes</h2>
			<p>Paid plans are billed via our payment processor (e.g., Stripe). Prices, features, and billing cycles are listed at checkout. Fees are non-refundable except where required by law or by our posted refund policy. You are responsible for all applicable taxes.</p>

			<h2>4. Intellectual Property</h2>
			<p>The Services, including software, content, and trademarks, are owned by RevvyPro or its licensors. You receive a limited, non-exclusive, non-transferable license to use the Services solely as provided.</p>

			<h2>5. Data & Privacy</h2>
			<p>
				Our use of personal data is described in our{" "}
				<a href="/privacy" className="text-[#8B5CF6] underline">
					Privacy Policy
				</a>
				. By using the Services, you consent to such processing.
			</p>

			<h2>6. Disclaimers</h2>
			<p>The Services are provided “as is” without warranties of any kind. We do not guarantee specific results, uptime, or error-free operation.</p>

			<h2>7. Limitation of Liability</h2>
			<p>To the maximum extent permitted by law, RevvyPro and its affiliates are not liable for indirect, incidental, special, consequential, or punitive damages, or lost profits or revenues.</p>

			<h2>8. Termination</h2>
			<p>We may suspend or terminate access to the Services at any time, with or without cause. Upon termination, provisions which by their nature should survive will survive.</p>

			<h2>9. Changes to Terms</h2>
			<p>We may update these Terms from time to time. Changes are effective upon posting. Continued use constitutes acceptance of the updated Terms.</p>

			<h2>10. Contact</h2>
			<p>
				Questions? Email{" "}
				<a href="mailto:tron@revvyproai.com" className="text-[#22D3EE] underline">
					tron@revvyproai.com
				</a>
				.
			</p>
		</article>
	);
}
