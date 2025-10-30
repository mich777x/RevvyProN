import { PRESS_LOGOS } from "@/config/press";

export default function PressBar() {
	return (
		<div className="rounded-2xl border p-3 bg-white/60">
			<div className="text-xs opacity-60 mb-2">As seen in</div>
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
				{PRESS_LOGOS.map((l) => (
					<a key={l.label} href={l.href} className="text-center text-sm opacity-70 hover:opacity-100">
						{l.label}
					</a>
				))}
			</div>
		</div>
	);
}
