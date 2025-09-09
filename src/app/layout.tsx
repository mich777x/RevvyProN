import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
	metadataBase: new URL("https://revvypro.org"),
	title: {
		default: "RevvyPro – AI Ad Engine",
		template: "%s | RevvyPro",
	},
	description: "RevvyPro is the AI ad engine for agencies and brands. Cut ad spend by 40% and boost ROI with AI targeting, creative generation, and real‑time analytics.",
	robots: {
		index: true,
		follow: true,
	},
	openGraph: {
		type: "website",
		url: "https://revvypro.org",
		title: "RevvyPro – AI Ad Engine",
		description: "Cut ad spend by 40% and boost ROI with AI targeting, creative generation, and real‑time analytics.",
		siteName: "RevvyPro",
		images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "RevvyPro" }],
	},
	twitter: {
		card: "summary_large_image",
		site: "@revvypro",
		title: "RevvyPro – AI Ad Engine",
		description: "Cut ad spend by 40% and boost ROI with AI targeting, creative generation, and real‑time analytics.",
		images: ["/og.jpg"],
	},
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="min-h-screen bg-white text-gray-900 antialiased dark:bg-neutral-950 dark:text-neutral-100">
				{/* Header */}
				<header className="sticky top-0 z-40 w-full border-b border-black/5 bg-white/70 backdrop-blur dark:border-white/10 dark:bg-neutral-950/70">
					<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
						<Link href="/" className="font-semibold tracking-tight">
							<span className="text-lg">RevvyPro</span>
							<span className="ml-2 hidden text-xs font-normal text-gray-500 sm:inline">AI Ad Engine</span>
						</Link>

						{/* Desktop Nav */}
						<nav className="hidden gap-6 text-sm md:flex">
							<Link href="/" className="hover:text-blue-600">
								Home
							</Link>
							<Link href="/saas" className="hover:text-blue-600">
								SaaS $1 Trial
							</Link>
							<Link href="/agencies" className="hover:text-blue-600">
								Agencies
							</Link>
							<Link href="/license" className="hover:text-blue-600">
								Mega‑License
							</Link>
							<Link href="/contact" className="hover:text-blue-600">
								Contact
							</Link>
						</nav>

						{/* Mobile Nav (no JS, details/summary) */}
						<details className="group relative md:hidden">
							<summary className="list-none cursor-pointer rounded-lg border border-black/10 px-3 py-2 text-sm dark:border-white/10">Menu</summary>
							<div className="absolute right-0 mt-2 w-48 rounded-xl border border-black/10 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-neutral-900">
								<Link href="/" className="block rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
									Home
								</Link>
								<Link href="/saas" className="block rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
									SaaS $1 Trial
								</Link>
								<Link href="/agencies" className="block rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
									Agencies
								</Link>
								<Link href="/license" className="block rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
									Mega‑License
								</Link>
								<Link href="/contact" className="block rounded-lg px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
									Contact
								</Link>
							</div>
						</details>
					</div>
				</header>

				{/* Page container */}
				<main className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6">{children}</main>

				{/* Footer */}
				<footer className="border-t border-black/5 bg-white/60 py-8 backdrop-blur dark:border-white/10 dark:bg-neutral-950/60">
					<div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-3 md:px-6">
						<div>
							<div className="text-base font-semibold">RevvyPro</div>
							<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">AI ad engine for agencies & brands. Cut ad spend by 40%.</p>
						</div>
						<div className="text-sm">
							<div className="font-medium">Links</div>
							<ul className="mt-2 space-y-1">
								<li>
									<Link href="/privacy" className="hover:text-blue-600">
										Privacy
									</Link>
								</li>
								<li>
									<Link href="/terms" className="hover:text-blue-600">
										Terms
									</Link>
								</li>
								<li>
									<Link href="/status" className="hover:text-blue-600">
										Status
									</Link>
								</li>
							</ul>
						</div>
						<div className="text-sm">
							<div className="font-medium">Contact</div>
							<ul className="mt-2 space-y-1">
								<li>
									<a href="mailto:tron@revvypro.org" className="hover:text-blue-600">
										tron@revvypro.org
									</a>
								</li>
								<li className="text-gray-500 dark:text-gray-400">© {new Date().getFullYear()} RevvyPro</li>
							</ul>
						</div>
					</div>
				</footer>

				{/* Optional: analytics/trackers can be added here */}
			</body>
		</html>
	);
}
