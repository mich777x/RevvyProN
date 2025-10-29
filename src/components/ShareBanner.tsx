"use client";
import { useState } from "react";

type Props = {
	headline: string;
	productTitle?: string;
	url?: string; // optional landing page
};

export default function ShareBanner({ headline, productTitle = "RevvyPro", url = "https://revvypro.ai" }: Props) {
	const [copied, setCopied] = useState(false);
	const txt = `🚀 ${productTitle} — ${headline}\n\nGenerated with RevvyPro (AI Ad Engine for Shopify)\n${url}`;

	const tweetHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(txt)}`;

	async function copy() {
		await navigator.clipboard.writeText(txt);
		setCopied(true);
		setTimeout(() => setCopied(false), 1500);
	}

	return (
		<div className="rounded-xl border p-3 flex items-center justify-between gap-3">
			<div className="text-sm">
				<b>Share this creative</b>
				<div className="opacity-70 text-xs">Copy text or post to X in one click.</div>
			</div>
			<div className="flex gap-2">
				<button onClick={copy} className="rounded-lg px-3 py-2 border">
					{copied ? "Copied!" : "Copy"}
				</button>
				<a href={tweetHref} target="_blank" rel="noreferrer" className="rounded-lg px-3 py-2 bg-black text-white">
					Post to X
				</a>
			</div>
		</div>
	);
}
