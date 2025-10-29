"use client";
import { useEffect, useMemo, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

type Run = { id: string; cpc: number | null; cpa: number | null; roi: number | null; createdAt: string };
type Props = { creativeId: string; title?: string };

export default function TrendsChart({ creativeId, title = "Performance" }: Props) {
	const [runs, setRuns] = useState<Run[]>([]);

	useEffect(() => {
		(async () => {
			const r = await fetch(`/api/creatives/${creativeId}/runs`);
			const d = await r.json();
			setRuns(d);
		})();
	}, [creativeId]);

	const data = useMemo(
		() =>
			runs.map((r) => ({
				t: new Date(r.createdAt).toLocaleDateString(),
				roi: r.roi ?? 0,
				cpa: r.cpa ?? 0,
				cpc: r.cpc ?? 0,
			})),
		[runs]
	);

	return (
		<div className="rounded-2xl border p-4">
			<div className="mb-3 font-medium">{title}</div>
			<div className="h-64">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="t" />
						<YAxis />
						<Tooltip />
						<Line type="monotone" dataKey="roi" dot={false} />
						<Line type="monotone" dataKey="cpa" dot={false} />
						<Line type="monotone" dataKey="cpc" dot={false} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}
