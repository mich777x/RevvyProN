type Props = { score: number };

export default function ScoreHint({ score }: Props) {
	// very simple rules; you can refine later to show real factors
	let msg = "Balanced performance.";
	if (score >= 85) msg = "Elite: strong hook + high ROI forecast.";
	else if (score >= 70) msg = "Great: solid copy + promising ROI.";
	else if (score >= 55) msg = "Good: test more variants for uplift.";
	else msg = "Low: try stronger hook & CTA.";

	return (
		<span className="text-xs opacity-70" title={msg}>
			Why? {msg}
		</span>
	);
}
