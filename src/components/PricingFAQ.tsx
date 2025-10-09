"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
	{ q: "Do I need a credit card for the demo?", a: "No. The beta demo runs without payment details — you’ll get a private link after entering your email." },
	{ q: "Can you set it up for us?", a: "Yes — choose the Done-For-You plan. We handle onboarding and the first optimization cycle." },
	{ q: "Will this work with our current ad accounts?", a: "Yes. We connect via official ad APIs and follow least-privilege access." },
	{ q: "Are my results real or simulated?", a: "The preview uses anonymized models; your connected account produces live metrics inside the app." },
	{ q: "Is data privacy compliant?", a: "We support GDPR/CCPA and Consent Mode v2. Data is encrypted at rest and in transit." },
];

export default function PricingFAQ() {
	return (
		<section className="bg-[#07090F] text-white">
			<div className="mx-auto max-w-3xl px-6 pb-20">
				<h3 className="text-center text-2xl md:text-3xl font-semibold">Questions, answered</h3>
				<div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
					{faqs.map((f) => (
						<Item key={f.q} q={f.q} a={f.a} />
					))}
				</div>
				{/* <p className="mt-4 text-center text-sm text-white/60">
					Still unsure?{" "}
					<a href="#get-started" className="underline">
						Launch the demo
					</a>{" "}
					— 10 seconds, no card.
				</p> */}
			</div>
		</section>
	);
}

function Item({ q, a }: { q: string; a: string }) {
	const [open, setOpen] = useState(false);
	return (
		<div className="px-5">
			<button className="flex w-full items-center justify-between py-4 text-left" onClick={() => setOpen((v) => !v)}>
				<span className="font-medium">{q}</span>
				<ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
			</button>
			<div className={`pb-4 text-white/70 text-sm ${open ? "block" : "hidden"}`}>{a}</div>
		</div>
	);
}
