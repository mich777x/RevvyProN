"use client";
import ShareBanner from "./ShareBanner";
import ScoreHint from "./ScoreHint";

type Creative = {
	id: string;
	headline: string;
	primary: string;
	description: string;
	viralScore: number;
	ctr: number | null;
	product?: { title: string };
};

type Props = {
	item: Creative;
	actions?: React.ReactNode;
};

export default function CreativeCard({ item, actions }: Props) {
	return (
		<div className="rounded-2xl border p-4 space-y-3">
			<div className="flex items-start justify-between gap-4">
				<div>
					<div className="text-xs uppercase opacity-60">{item.product?.title ?? "Product"}</div>
					<div className="font-medium">{item.headline}</div>
					<div className="text-sm opacity-80">{item.primary}</div>
					<div className="text-sm opacity-70">{item.description}</div>
				</div>
				<div className="text-right">
					<div className="text-3xl font-bold">{item.viralScore}</div>
					<div className="text-xs opacity-60">Viral Score</div>
					<div className="text-xs opacity-60 mt-1">CTR: {item.ctr ?? 0}</div>
					<ScoreHint score={item.viralScore} />
				</div>
			</div>
			<ShareBanner headline={item.headline} productTitle={item.product?.title} />
			{actions}
		</div>
	);
}
