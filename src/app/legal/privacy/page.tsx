import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "Privacy Policy — RevvyPro" };

export default function PrivacyPage() {
	return (
		<main>
			<Nav />

			{/* Breadcrumb / Back bar */}
			<div className="border-b border-white/10 bg-white/[0.02]">
				<div className="container flex items-center gap-3 py-3 text-sm">
					<Link href="/" className="opacity-80 hover:opacity-100 transition">
						Home
					</Link>
					<span className="opacity-40">/</span>
					<a href="/legal/terms" className="opacity-80 hover:opacity-100 transition">
						Legal
					</a>
					<span className="opacity-40">/</span>
					<span className="opacity-100">Privacy</span>

					<div className="ml-auto">
						<Link href="/" className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 border border-white/12 hover:bg-white/5 transition">
							← Back to Home
						</Link>
					</div>
				</div>
			</div>

			<section className="container prose prose-invert max-w-3xl pt-16 md:pt-24 pb-16">
				<h1>Privacy Policy</h1>
				<p>
					<em>Last updated: Oct 5, 2025</em>
				</p>

				<h2>Data We Collect</h2>
				<ul>
					<li>Account data (name, email).</li>
					<li>Usage data (events, performance metrics).</li>
					<li>Integrations (Shopify, ad platforms) as authorized by you.</li>
				</ul>

				<h2>How We Use Data</h2>
				<ul>
					<li>To operate and improve RevvyPro’s AI optimization.</li>
					<li>To provide support and communicate updates.</li>
					<li>For analytics in aggregate and de-identified form.</li>
				</ul>

				<h2>Sharing</h2>
				<p>We do not sell personal data. We use processors (hosting, analytics) under DPA terms.</p>

				<h2>Security</h2>
				<p>Industry-standard encryption in transit; access controls; audit logging.</p>

				<h2>Your Rights</h2>
				<p>Request access, correction, or deletion at any time: tron@revvypro.org</p>

				<h2>Retention</h2>
				<p>We retain data for as long as needed to deliver the service or as required by law.</p>
			</section>
			<Footer />
		</main>
	);
}
