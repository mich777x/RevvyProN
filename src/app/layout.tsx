import type { Metadata } from "next";
import "./globals.css";

// ✅ Font (Inter recommended; you can swap if you use another)
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

// ✅ Global metadata for SEO + OG sharing
export const metadata: Metadata = {
	title: "RevvyPro — The AI Ad Engine for Shopify",
	description: "Slash ad spend by up to 40%. Boost ROI 2×. Launch AI-powered campaigns in minutes.",
	keywords: ["AI Ads", "Shopify Marketing", "RevvyPro", "Ad Engine", "Ecommerce Automation"],
	authors: [{ name: "RevvyPro Team", url: "https://revvypro.org" }],
	metadataBase: new URL("https://revvypro.org"),

	// ✅ Open Graph (for link previews)
	openGraph: {
		title: "RevvyPro — The AI Ad Engine for Shopify",
		description: "Slash ad spend by 40%, boost ROI 2×, and launch AI ad campaigns in minutes.",
		url: "https://revvypro.org",
		siteName: "RevvyPro",
		images: [
			{
				url: "/og.png",
				width: 1200,
				height: 630,
				alt: "RevvyPro – The AI Ad Engine for Shopify",
			},
		],
		locale: "en_US",
		type: "website",
	},

	// ✅ Twitter Card meta
	twitter: {
		card: "summary_large_image",
		title: "RevvyPro — The AI Ad Engine for Shopify",
		description: "AI-powered ad optimization built for Shopify brands and creators.",
		images: ["/og.png"],
		creator: "@revvypro",
	},

	// ✅ Favicon + icons
	icons: {
		icon: "/logo.png", // appears in browser tab
		shortcut: "/logo.png",
		apple: "/logo.png",
	},
};

// ✅ Root layout component
export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-[#06070A] text-white antialiased selection:bg-rp-primary/25`}>
				{children}

				{/* ✅ Optional analytics (enable later) */}
				{/* <script defer data-domain="revvypro.org" src="https://plausible.io/js/script.js" /> */}
			</body>
		</html>
	);
}
