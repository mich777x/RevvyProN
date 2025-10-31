import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";

import StickyCTA from "@/components/StickyCTA";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
	metadataBase: new URL("https://revvyproai.com"),
	title: "RevvyPro — The AI Ad Engine for Shopify",
	description: "Generate, score, and evolve high-CTR Shopify ads. Adaptive tuner improves results every day.",
	openGraph: {
		title: "RevvyPro — The AI Ad Engine for Shopify",
		description: "Generate, score, and evolve high-CTR Shopify ads. Adaptive tuner improves results every day.",
		url: "/",
		siteName: "RevvyPro",
		images: [{ url: "/icon.png", width: 1200, height: 630, alt: "RevvyPro" }],
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "RevvyPro — The AI Ad Engine for Shopify",
		description: "Generate, score, and evolve high-CTR Shopify ads. Adaptive tuner improves results every day.",
		images: ["/icon.png"],
	},
	icons: {
		icon: "/icon.png",
	},
	alternates: { canonical: "https://revvyproai.com" },
	keywords: ["Shopify", "ads", "AI", "marketing", "RevvyPro"],
	category: "technology",
};

export const viewport: Viewport = {
	themeColor: "#06070A",
	colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${inter.className} scroll-smooth`}>
			<head>
				{/* Speed wins */}
				<link rel="preconnect" href="https://us.i.posthog.com" />
				<link rel="preconnect" href="https://js.stripe.com" />
			</head>
			<body className="bg-[#06070A] text-white antialiased selection:bg-white/10">
				<Header />
				{children}
				<StickyCTA href="/pricing" text="Lock Founder Price" sub="Limited launch window" />
				<Analytics />
				<Footer />
			</body>
		</html>
	);
}
