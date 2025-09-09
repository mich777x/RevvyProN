"use client";
import { useState } from "react";

export default function StripeButton({
	priceId,
	mode, // "subscription" | "payment"
	label,
}: {
	priceId: string;
	mode: "subscription" | "payment";
	label: string;
}) {
	const [loading, setLoading] = useState(false);

	const click = async () => {
		try {
			setLoading(true);
			const r = await fetch("/api/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ priceId, mode }),
			});
			const j = await r.json();
			if (j.url) window.location.href = j.url;
			else alert(j.error || "Checkout error");
		} finally {
			setLoading(false);
		}
	};

	return (
		<button onClick={click} disabled={loading} className="px-5 py-3 rounded-lg bg-black text-white hover:opacity-90 disabled:opacity-50">
			{loading ? "Redirecting…" : label}
		</button>
	);
}
