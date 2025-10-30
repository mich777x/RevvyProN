"use client";
import { useEffect, useState } from "react";

type T = { name: string; role: string; quote: string; avatar?: string };
const ITEMS: T[] = [
	{ name: "NovaWear", role: "Shopify Plus", quote: "RevvyPro cut our CPA by 37% in week one." },
	{ name: "PixelGoods", role: "DTC Apparel", quote: "Creatives evolve daily—CTR keeps climbing." },
	{ name: "BlueCart", role: "Agency", quote: "Clients love the leaderboard & reporting." },
];

export default function Testimonials() {
	const [i, setI] = useState(0);
	useEffect(() => {
		const id = setInterval(() => setI((p) => (p + 1) % ITEMS.length), 4000);
		return () => clearInterval(id);
	}, []);
	const t = ITEMS[i];
	return (
		<div className="rounded-2xl border p-5 bg-white/60">
			<div className="text-sm opacity-60 mb-1">What merchants say</div>
			<blockquote className="text-lg leading-snug">“{t.quote}”</blockquote>
			<div className="text-sm mt-2 opacity-70">
				— {t.name} · {t.role}
			</div>
		</div>
	);
}
