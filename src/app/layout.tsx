import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
	title: "Revvy Pro — AI Ad Engine for Shopify Growth",
	description: "Cut ad spend and boost ROI with AI-generated ad creatives, targeting, and one-click launch.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="scroll-smooth">
			<script defer data-domain="revvy.pro" src="https://plausible.io/js/script.js"></script>

			<body className="bg-neutral-950 text-neutral-100 antialiased">
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
