import Link from "next/link";

export const metadata = {
	title: "Press Kit",
	description: "Logos, product shots, and copy for press & partners.",
};

export default function PressPage() {
	return (
		<main className="mx-auto max-w-5xl p-6 space-y-8">
			<header>
				<h1 className="text-3xl font-semibold">Press Kit</h1>
				<p className="opacity-70">Logos, banners, product shots, and quick facts.</p>
			</header>

			<section className="rounded-2xl border p-5 space-y-3">
				<h2 className="text-xl font-medium">Company</h2>
				<ul className="list-disc pl-6 text-sm">
					<li>
						<b>Name:</b> RevvyPro
					</li>
					<li>
						<b>Tagline:</b> The AI Ad Engine for Shopify
					</li>
					<li>
						<b>One-liner:</b> Generate, score, and evolve high-CTR ads with a daily adaptive tuner.
					</li>
					<li>
						<b>Website:</b>{" "}
						<Link className="underline" href="/">
							revvypro.ai
						</Link>
					</li>
					<li>
						<b>Contact:</b> press@revvypro.ai
					</li>
				</ul>
			</section>

			<section className="rounded-2xl border p-5 space-y-4">
				<h2 className="text-xl font-medium">Media</h2>
				<div className="grid md:grid-cols-2 gap-4">
					<a href="/press-kit/logo.svg" className="rounded-xl border p-4 hover:bg-neutral-50">
						<div className="font-medium">Logo (SVG)</div>
						<div className="text-xs opacity-70 mt-1">/press-kit/logo.svg</div>
					</a>
					<a href="/press-kit/banner.png" className="rounded-xl border p-4 hover:bg-neutral-50">
						<div className="font-medium">Banner (PNG)</div>
						<div className="text-xs opacity-70 mt-1">1200×630 · /press-kit/banner.png</div>
					</a>
				</div>
				<div className="rounded-xl border p-4">
					<div className="font-medium mb-2">Trailer (MP4)</div>
					<video controls className="w-full rounded-xl" src="/press-kit/trailer.mp4" />
				</div>
			</section>

			<section className="rounded-2xl border p-5">
				<h2 className="text-xl font-medium">Screens & Social</h2>
				<div className="text-sm opacity-80">
					Dynamic social card: <code>/og?t=AI%20Ad%20Engine</code> · Affiliate variant: <code>/og?ref=YOURCODE</code>
				</div>
			</section>
		</main>
	);
}
