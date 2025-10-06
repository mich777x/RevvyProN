import Link from "next/link";

export default function Footer() {
	return (
		<footer className="border-t border-white/10">
			<div className="container py-10 text-sm text-rp-sub grid gap-4 md:flex md:items-center md:justify-between">
				<p>© {new Date().getFullYear()} RevvyPro</p>
				<nav className="flex flex-wrap gap-4">
					<Link href="/pricing" className="hover:text-rp-text">
						Pricing
					</Link>
					<Link href="/affiliates" className="hover:text-rp-text">
						Affiliate
					</Link>
					<Link href="/contact" className="hover:text-rp-text">
						Contact
					</Link>
					<Link href="/legal/terms" className="hover:text-rp-text">
						Terms
					</Link>
					<Link href="/legal/privacy" className="hover:text-rp-text">
						Privacy
					</Link>
				</nav>
			</div>
		</footer>
	);
}
