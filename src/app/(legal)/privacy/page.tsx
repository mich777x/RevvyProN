// src/app/(legal)/privacy/page.tsx
export const metadata = {
	title: "Privacy Policy — RevvyPro",
	description: "Privacy Policy for RevvyPro.",
};

export default function PrivacyPage() {
	return (
		<article className="prose prose-invert max-w-none prose-headings:scroll-mt-24">
			<h1 className="mb-1 text-3xl font-bold">Privacy Policy</h1>
			<p className="text-sm text-white/60">Last updated: October 9, 2025</p>

			<p>This Privacy Policy explains how RevvyPro (“we”, “us”) collects, uses, and shares information when you use our website and Services.</p>

			<h2>1. Information We Collect</h2>
			<ul>
				<li>
					<strong>Account & Contact</strong>: name, email, company.
				</li>
				<li>
					<strong>Billing</strong>: payment details processed by our provider (e.g., Stripe).
				</li>
				<li>
					<strong>Usage</strong>: logs, device info, cookies for analytics and security.
				</li>
			</ul>

			<h2>2. How We Use Information</h2>
			<ul>
				<li>Provide and improve the Services.</li>
				<li>Process payments and manage subscriptions.</li>
				<li>Communicate updates, support, and marketing (opt-out anytime).</li>
				<li>Protect against fraud and abuse; comply with legal obligations.</li>
			</ul>

			<h2>3. Sharing</h2>
			<p>We share data with service providers (e.g., hosting, analytics, payment) under appropriate contracts, and when required by law. We do not sell personal data.</p>

			<h2>4. Cookies & Tracking</h2>
			<p>We use cookies and similar technologies for essential functionality, analytics, and personalization. You can manage preferences via your browser or device settings.</p>

			<h2>5. Data Retention</h2>
			<p>We retain information as long as needed to provide the Services and meet legal obligations, then delete or anonymize it.</p>

			<h2>6. Your Rights</h2>
			<p>Depending on your region, you may have rights to access, correct, delete, or restrict processing of your personal information. Contact us to make a request.</p>

			<h2>7. International Transfers</h2>
			<p>Data may be processed in locations outside your country. We implement safeguards appropriate to the transfer mechanism.</p>

			<h2>8. Security</h2>
			<p>We use technical and organizational measures to protect data. No method is 100% secure; please use strong passwords and protect your account.</p>

			<h2>9. Children</h2>
			<p>Our Services are not directed to children under 13. We do not knowingly collect data from children.</p>

			<h2>10. Changes</h2>
			<p>We may update this Policy. Material changes will be posted on this page with a new “Last updated” date.</p>

			<h2>11. Contact</h2>
			<p>
				For privacy requests, email{" "}
				<a href="mailto:tron@revvyproai.com" className="text-[#22D3EE] underline">
					tron@revvyproai.com
				</a>
				.
			</p>
		</article>
	);
}
