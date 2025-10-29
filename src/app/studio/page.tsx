"use client";
import { useEffect, useMemo, useState } from "react";
import CreativeCard from "@/components/CreativeCard";

type Creative = {
	id: string;
	headline: string;
	primary: string;
	description: string;
	viralScore: number;
	ctr: number | null;
	product?: { title: string };
};

async function fetchCreatives(): Promise<Creative[]> {
	const r = await fetch("/api/creatives");
	return r.json();
}

export default function StudioPage() {
	const [items, setItems] = useState<Creative[]>([]);
	const [left, setLeft] = useState<string>("");
	const [right, setRight] = useState<string>("");

	useEffect(() => {
		(async () => {
			const list = await fetchCreatives();
			setItems(list);
			if (list.length >= 2) {
				setLeft(list[0].id);
				setRight(list[1].id);
			}
		})();
	}, []);

	const leftItem = useMemo(() => items.find((i) => i.id === left), [items, left]);
	const rightItem = useMemo(() => items.find((i) => i.id === right), [items, right]);

	async function mark(id: string, result: "win" | "loss" | "tie") {
		await fetch(`/api/creatives/${id}/win`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ result }),
		});
		// refresh list to reflect updated scores/wins
		const list = await fetchCreatives();
		setItems(list);
	}

	return (
		<main className="mx-auto max-w-6xl p-6 space-y-6">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Creative Studio — A/B Compare</h1>
			</div>

			{/* selectors */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="rounded-xl border p-3">
					<label htmlFor="leftCreative" className="text-xs opacity-60">
						Left Creative
					</label>
					<select id="leftCreative" className="w-full mt-1 rounded-lg border p-2" value={left} onChange={(e) => setLeft(e.target.value)}>
						{items.map((c) => (
							<option key={c.id} value={c.id}>
								{c.product?.title ?? "Product"} — {c.headline.slice(0, 50)}
							</option>
						))}
					</select>
				</div>
				<div className="rounded-xl border p-3">
					<label htmlFor="rightCreative" className="text-xs opacity-60">
						Right Creative
					</label>
					<select id="rightCreative" className="w-full mt-1 rounded-lg border p-2" value={right} onChange={(e) => setRight(e.target.value)}>
						{items.map((c) => (
							<option key={c.id} value={c.id}>
								{c.product?.title ?? "Product"} — {c.headline.slice(0, 50)}
							</option>
						))}
					</select>
				</div>
			</div>

			{/* side-by-side */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{leftItem && (
					<CreativeCard
						item={leftItem}
						actions={
							<div className="flex gap-2">
								<button onClick={() => mark(leftItem.id, "win")} className="rounded-xl px-3 py-2 bg-black text-white">
									Left Wins
								</button>
								<button onClick={() => mark(leftItem.id, "loss")} className="rounded-xl px-3 py-2 border">
									Left Loses
								</button>
							</div>
						}
					/>
				)}

				{rightItem && (
					<CreativeCard
						item={rightItem}
						actions={
							<div className="flex gap-2">
								<button onClick={() => mark(rightItem.id, "win")} className="rounded-xl px-3 py-2 bg-black text-white">
									Right Wins
								</button>
								<button onClick={() => mark(rightItem.id, "loss")} className="rounded-xl px-3 py-2 border">
									Right Loses
								</button>
							</div>
						}
					/>
				)}
			</div>

			{/* tie action */}
			{leftItem && rightItem && (
				<div className="flex justify-center">
					<button onClick={() => Promise.all([mark(leftItem.id, "tie"), mark(rightItem.id, "tie")])} className="rounded-xl px-4 py-2 border">
						Mark Tie
					</button>
				</div>
			)}
		</main>
	);
}
