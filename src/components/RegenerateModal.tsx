"use client";
import { useState } from "react";

type Props = {
	creativeId: string;
	onDone?: () => void;
};

export default function RegenerateModal({ creativeId, onDone }: Props) {
	const [open, setOpen] = useState(false);
	const [count, setCount] = useState(3);
	const [busy, setBusy] = useState(false);

	async function submit() {
		setBusy(true);
		await fetch(`/api/creatives/${creativeId}/variants`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ count }),
		});
		setBusy(false);
		setOpen(false);
		onDone?.();
	}

	return (
		<>
			<button className="rounded-xl px-3 py-2 border" onClick={() => setOpen(true)}>
				Regenerate N Variants
			</button>

			{open && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
					<div className="w-full max-w-sm rounded-2xl bg-white p-5">
						<div className="text-lg font-medium mb-3">Generate Variants</div>
						<label htmlFor="variantCount" className="text-sm block mb-2">
							How many?
						</label>

						<input
							id="variantCount"
							type="number"
							min={1}
							max={10}
							value={count}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								const n = Number(e.currentTarget.value);
								setCount(Number.isNaN(n) ? 1 : Math.max(1, Math.min(10, n)));
							}}
							className="w-full rounded-xl border p-2 mb-4"
						/>

						<div className="flex justify-end gap-3">
							<button className="rounded-xl px-3 py-2 border" onClick={() => setOpen(false)} disabled={busy}>
								Cancel
							</button>
							<button className="rounded-xl px-3 py-2 bg-black text-white" onClick={submit} disabled={busy}>
								{busy ? "Working…" : "Generate"}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
