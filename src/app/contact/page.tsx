import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";

export const metadata = {
	title: "Contact — RevvyPro",
	description: "Talk to the RevvyPro team.",
};

export default function ContactPage() {
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
					<span className="opacity-100">Contact</span>

					<div className="ml-auto">
						<Link href="/" className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 border border-white/12 hover:bg-white/5 transition">
							← Back to Home
						</Link>
					</div>
				</div>
			</div>

			<section className="container pt-16 md:pt-24 pb-12">
				<h1 className="h1">Contact</h1>
				<p className="mt-3 text-rp-sub max-w-prose">Questions, partnerships, or media? Drop us a line.</p>

				<div className="mt-8 rp-card p-5 md:p-8">
					{/* Replace src with your real Tally/Typeform link */}
					<div className="aspect-video w-full rounded-xl overflow-hidden border border-white/10">
						<iframe className="w-full h-full" src="https://tally.so/r/w5eXAMPLE" title="Contact RevvyPro" />
					</div>

					<div className="mt-6 text-sm text-rp-sub">
						Prefer email?{" "}
						<a className="underline" href="mailto:tron@revvypro.org">
							tron@revvypro.org
						</a>
					</div>
				</div>
			</section>
			<Footer />
		</main>
	);
}
