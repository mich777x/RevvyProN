"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Header() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<header className={["fixed top-0 left-0 right-0 z-50 transition-all", scrolled ? "backdrop-blur-md bg-[#06070A]/70 border-b border-white/10 shadow-lg" : "bg-transparent border-b border-transparent"].join(" ")}>
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-3">
					<Image src="/logo.png" alt="RevvyPro logo" width={36} height={36} priority className="drop-shadow-[0_0_10px_rgba(139,92,246,0.6)]" />
					<span className="text-lg font-semibold tracking-tight text-white">RevvyPro</span>
				</Link>

				<Link href="/affiliate" className="text-sm opacity-80 hover:opacity-100">
					Affiliate
				</Link>

				{/* Nav */}
				<nav className="hidden items-center gap-8 text-sm text-white/70 sm:flex">
					<button type="button" onClick={() => window.dispatchEvent(new CustomEvent("revvy:startModalOpen"))} className="rounded-xl border border-white/10 bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] px-4 py-1.5 font-medium text-white shadow-[0_0_10px_rgba(139,92,246,0.3)] transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]">
						Start Now
					</button>
				</nav>

				{/* Mobile Button */}
				<button type="button" onClick={() => window.dispatchEvent(new CustomEvent("revvy:startModalOpen"))} className="sm:hidden rounded-lg border border-white/10 bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] px-3 py-1.5 text-sm font-medium text-white shadow-lg" aria-label="Start">
					Start
				</button>
			</div>
		</header>
	);
}
