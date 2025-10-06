import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = { title: "Terms of Service — RevvyPro" };

export default function TermsPage() {
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
					<a href="/legal/privacy" className="opacity-80 hover:opacity-100 transition">
						Legal
					</a>
					<span className="opacity-40">/</span>
					<span className="opacity-100">Terms</span>

					<div className="ml-auto">
						<Link href="/" className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 border border-white/12 hover:bg-white/5 transition">
							← Back to Home
						</Link>
					</div>
				</div>
			</div>

			<section className="container prose prose-invert max-w-3xl pt-16 md:pt-24 pb-16">
				<h1>Terms of Service</h1>
				<p>
					<em>Last updated: Oct 5, 2025</em>
				</p>
				<h2>1. Agreement</h2>
				<p>By accessing or using RevvyPro, you agree to these Terms.</p>
				<h2>2. Subscriptions</h2>
				<p>Plans renew monthly unless cancelled. Lifetime plan is a one-time, non-transferable license.</p>
				<h2>3. Acceptable Use</h2>
				<ul>
					<li>No illegal content or misuse of ad platforms.</li>
					<li>No reselling or sublicensing without written consent.</li>
				</ul>
				<h2>4. Refunds</h2>
				<p>Launch-week purchases refundable within 7 days. After that, refunds are not guaranteed.</p>
				<h2>5. Data</h2>
				<p>We process data to provide services per our Privacy Policy.</p>
				<h2>6. Liability</h2>
				<p>Service provided “as is”; to the maximum extent permitted by law, we limit liability for indirect damages.</p>
				<h2>7. Changes</h2>
				<p>We may update Terms; continued use constitutes acceptance.</p>
				<h2>8. Contact</h2>
				<p>Email: tron@revvypro.org</p>
			</section>
			<Footer />
		</main>
	);
}
