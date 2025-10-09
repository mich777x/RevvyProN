// src/components/StickyCTA.tsx (full component)
"use client";
import { useEffect, useState } from "react";

export default function StickyCTA() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const sec = document.getElementById("pricing");
		if (!sec) return;
		const io = new IntersectionObserver(([entry]) => setShow(!entry.isIntersecting), { threshold: 0.1 });
		io.observe(sec);
		return () => io.disconnect();
	}, []);

	if (!show) return null;

	return (
		<div className="fixed inset-x-0 bottom-3 z-40">
			<div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#0B0D12]/90 px-4 py-3 backdrop-blur shadow-lg">
				<div className="flex items-center gap-2 text-sm text-white/80">
					{/* tiny lock icon */}
					<svg viewBox="0 0 24 24" className="h-4 w-4 text-white/70" fill="currentColor" aria-hidden>
						<path d="M12 1a5 5 0 00-5 5v3H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-1V6a5 5 0 00-5-5zm-3 8V6a3 3 0 116 0v3H9z" />
					</svg>
					<span>Secure checkout via Stripe</span>
				</div>
				<a href="#pricing" className="rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#22D3EE] px-4 py-2 text-sm font-medium text-white" data-ph-event="sticky_view_plans_click">
					View Plans
				</a>
			</div>
		</div>
	);
}
