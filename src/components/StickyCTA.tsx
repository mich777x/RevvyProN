"use client";

export default function StickyCTA() {
	return (
		<div className="fixed inset-x-0 bottom-0 z-40 block md:hidden">
			<div className="mx-auto max-w-xl px-4 pb-4">
				<button onClick={() => (location.hash = "#get-started")} className="w-full rounded-2xl bg-white text-black px-4 py-3 text-sm font-medium shadow-lg">
					Launch my AI Ad Engine →
				</button>
			</div>
		</div>
	);
}
