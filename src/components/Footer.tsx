"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-white/10 bg-[#06070A] text-white">
			<div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
				{/* Top */}
				<div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
					<div className="flex items-center gap-3">
						<Image src="/logo.png" alt="RevvyPro logo" width={28} height={28} className="rounded-md" />
						<span className="text-lg font-semibold tracking-tight">RevvyPro</span>
					</div>

					{/* Only legal links here now */}
					<nav className="flex flex-wrap justify-center gap-5 text-sm text-white/70">
						<Link href="/terms" className="transition-colors hover:text-white underline-offset-4 hover:underline">
							Terms
						</Link>
						<Link href="/privacy" className="transition-colors hover:text-white underline-offset-4 hover:underline">
							Privacy
						</Link>
					</nav>
				</div>

				{/* Divider */}
				<div className="my-8 border-t border-white/10" />

				{/* Bottom */}
				<div className="flex flex-col items-center justify-between gap-4 text-sm text-white/60 sm:flex-row">
					<p>
						© {year} RevvyPro AI. All rights reserved. <span className="hidden sm:inline">Built with ⚡ by Tron.</span>
					</p>

					<div className="flex items-center gap-4">
						<a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
								<path fillRule="evenodd" d="M12 .5a11.5 11.5 0 0 0-3.64 22.4c.58.1.8-.26.8-.58 0-.28-.01-1.04-.02-2.05-3.26.7-3.95-1.57-3.95-1.57-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.76 2.67 1.25 3.33.96.1-.74.4-1.25.72-1.54-2.6-.3-5.34-1.3-5.34-5.8 0-1.28.46-2.34 1.2-3.17-.12-.3-.52-1.53.12-3.18 0 0 .98-.31 3.2 1.2a10.8 10.8 0 0 1 5.82 0c2.22-1.51 3.2-1.2 3.2-1.2.64 1.65.24 2.88.12 3.18.74.83 1.2 1.9 1.2 3.17 0 4.51-2.75 5.5-5.37 5.8.41.36.77 1.07.77 2.16 0 1.56-.01 2.81-.01 3.19 0 .32.21.69.8.57A11.5 11.5 0 0 0 12 .5Z" clipRule="evenodd" />
							</svg>
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
