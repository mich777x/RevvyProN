"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Nav() {
	const [open, setOpen] = useState(false);
	return (
		<header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-black/35 border-b border-white/8">
			<div className="container flex h-14 md:h-16 items-center justify-between">
				<Link href="/" className="flex items-center gap-2">
					<Image src="/logo.png" alt="RevvyPro logo" width={32} height={32} className="rounded-md" priority />
					<span className="font-semibold tracking-tight">RevvyPro</span>
				</Link>
				<nav className="hidden md:flex items-center gap-6 text-[15px]">
					<Link href="/features" className="opacity-80 hover:opacity-100 transition">
						Features
					</Link>
					<a href="#proof" className="opacity-80 hover:opacity-100 transition">
						Proof
					</a>
					<Link href="/affiliates" className="px-3 py-1.5 rounded-lg bg-rp-primary/18 hover:bg-rp-primary/28 ring-1 ring-rp-primary/35 transition">
						Affiliate
					</Link>
				</nav>

				<button className="md:hidden px-2 py-1 rounded-lg hover:bg-white/5" onClick={() => setOpen(!open)} aria-label="Toggle menu">
					☰
				</button>
			</div>
			{open && (
				<div className="md:hidden border-t border-white/8">
					<div className="container py-3 space-y-2">
						<Link href="/features" onClick={() => setOpen(false)} className="block">
							Features
						</Link>
						<a href="#proof" onClick={() => setOpen(false)} className="block">
							Proof
						</a>
						<Link href="/affiliates" onClick={() => setOpen(false)} className="block">
							Affiliate
						</Link>
					</div>
				</div>
			)}
		</header>
	);
}
