import { TRUST_BADGES } from "@/config/press";

export default function TrustBadges() {
	return (
		<div className="rounded-2xl border p-3 bg-white/60">
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-center">
				{TRUST_BADGES.map((x) => (
					<div key={x} className="opacity-70">
						{x}
					</div>
				))}
			</div>
		</div>
	);
}
