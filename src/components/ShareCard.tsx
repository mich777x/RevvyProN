"use client";
import { useEffect, useState } from "react";
import { affiliateOg, withRef } from "@/utils/share";
import Image from "next/image";

export default function ShareCard() {
	const [ref, setRef] = useState<string | null>(null);

	// Try to read cookie set by /api/aff/ref
	useEffect(() => {
		if (typeof document === "undefined") return;
		const m = document.cookie.match(/(?:^|;\s*)revvy_ref=([^;]+)/);
		setRef(m ? decodeURIComponent(m[1]) : null);
	}, []);

	const url = withRef("/", ref || undefined);
	const og = affiliateOg(ref || undefined);
	const tweetTxt = encodeURIComponent(`RevvyPro — AI Ad Engine for Shopify\n${url}`);

	return (
		<div className="rounded-2xl border p-4 space-y-2">
			<div className="font-medium">Quick Share</div>
			<Image src={og} alt="OG" className="w-full rounded-xl border" priority />
			<div className="flex gap-2">
				<a href={`https://twitter.com/intent/tweet?text=${tweetTxt}`} target="_blank" rel="noreferrer" className="rounded-xl bg-black text-white px-4 py-2">
					Post to X
				</a>
				<button onClick={() => navigator.clipboard.writeText(url)} className="rounded-xl border px-4 py-2">
					Copy Link
				</button>
			</div>
			<div className="text-xs opacity-70">
				{ref ? (
					<>
						Your ref: <span className="font-mono">{ref}</span>
					</>
				) : (
					"Visit via your ?ref= link to stamp your code."
				)}
			</div>
		</div>
	);
}
