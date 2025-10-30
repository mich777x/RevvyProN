"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = { href?: string; text?: string; sub?: string };
export default function StickyCTA({ href = "/pricing", text = "Start Free Trial", sub = "Founders price active" }: Props) {
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 320);
		onScroll();
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return (
		<div className={`fixed inset-x-0 bottom-4 z-40 transition-all ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
			<div className="mx-auto max-w-3xl rounded-2xl border bg-white/80 backdrop-blur p-3 shadow-lg flex items-center justify-between gap-3">
				<div className="text-xs opacity-70">{sub}</div>
				<Link href={href} className="rounded-xl bg-black text-white px-4 py-2">
					{text}
				</Link>
			</div>
		</div>
	);
}
