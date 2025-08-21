"use client";

import { useState } from "react";

type Platform = "tiktok" | "facebook" | "instagram" | "google";

type GenInput = {
	productName: string;
	productUrl?: string;
	audience: string;
	benefit: string;
	tone: "bold" | "friendly" | "luxury" | "playful" | "urgent";
	platform: Platform;
};

type GenOutput = {
	headlines: string[];
	primaryTexts: string[];
	descriptions: string[];
	ctas: string[];
	hooks: string[];
	angles: string[];
	hashtags: string[];
	audiences: string[];
	imagePrompts: string[];
	summary: string;
};

export default function GeneratorPage() {
	const [form, setForm] = useState<GenInput>({
		productName: "",
		productUrl: "",
		audience: "Shopify DTC shoppers who value quality and convenience",
		benefit: "Reduce cost-per-acquisition while increasing conversion rate",
		tone: "bold",
		platform: "tiktok",
	});
	const [loading, setLoading] = useState(false);
	const [data, setData] = useState<GenOutput | null>(null);

	const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		const { name, value } = e.target as { name: keyof GenInput; value: string };
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const generate = async () => {
		if (!form.productName.trim()) {
			alert("Enter a product name");
			return;
		}
		setLoading(true);
		setData(null);
		try {
			const res = await fetch("/api/generate", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(form),
			});
			const json = await res.json();
			if (res.ok) setData(json as GenOutput);
			else alert(json?.error ?? "Generation failed");
		} catch {
			alert("Network error");
		} finally {
			setLoading(false);
		}
	};

	const downloadJson = () => {
		if (!data) return;
		const blob = new Blob([JSON.stringify({ input: form, output: data }, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `revvy-creative-${form.productName.replace(/\s+/g, "-").toLowerCase()}.json`;
		a.click();
		URL.revokeObjectURL(url);
	};

	const copyBlock = async (text: string) => {
		await navigator.clipboard.writeText(text);
		alert("Copied!");
	};

	return (
		<main className="mx-auto max-w-6xl px-6 py-10">
			<div className="flex items-center justify-between">
				<h1 className="text-3xl md:text-4xl font-extrabold">Ad Creative Generator</h1>
				<a href="/" className="text-sm text-neutral-400 hover:text-neutral-200">
					← Back
				</a>
			</div>

			{/* Form */}
			<section className="mt-8 grid gap-6 md:grid-cols-2">
				<div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
					<div className="grid gap-4">
						<div>
							<label className="text-sm text-neutral-300">Product name</label>
							<input className="mt-1 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3 py-2 outline-none focus:border-fuchsia-500" name="productName" value={form.productName} onChange={onChange} placeholder="Revvy Bottle | Glow Serum | Smart Lamp" />
						</div>

						<div>
							<label className="text-sm text-neutral-300">Product URL (optional)</label>
							<input className="mt-1 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3 py-2 outline-none focus:border-fuchsia-500" name="productUrl" value={form.productUrl} onChange={onChange} placeholder="https://yourstore.com/product/xyz" />
						</div>

						<div>
							<label className="text-sm text-neutral-300">Audience</label>
							<input className="mt-1 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3 py-2 outline-none focus:border-fuchsia-500" name="audience" value={form.audience} onChange={onChange} placeholder="Busy professionals, skincare enthusiasts, eco-conscious shoppers" />
						</div>

						<div>
							<label className="text-sm text-neutral-300">Primary benefit</label>
							<input className="mt-1 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3 py-2 outline-none focus:border-fuchsia-500" name="benefit" value={form.benefit} onChange={onChange} placeholder="Clear acne fast without harsh chemicals" />
						</div>

						<div className="grid grid-cols-2 gap-4">
							<div>
								<label className="text-sm text-neutral-300">Tone</label>
								<select className="mt-1 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3 py-2 outline-none focus:border-fuchsia-500" name="tone" value={form.tone} onChange={onChange}>
									<option value="bold">Bold</option>
									<option value="friendly">Friendly</option>
									<option value="luxury">Luxury</option>
									<option value="playful">Playful</option>
									<option value="urgent">Urgent</option>
								</select>
							</div>

							<div>
								<label className="text-sm text-neutral-300">Platform</label>
								<select className="mt-1 w-full rounded-xl bg-neutral-950 border border-neutral-800 px-3 py-2 outline-none focus:border-fuchsia-500" name="platform" value={form.platform} onChange={onChange}>
									<option value="tiktok">TikTok</option>
									<option value="facebook">Facebook</option>
									<option value="instagram">Instagram</option>
									<option value="google">Google</option>
								</select>
							</div>
						</div>

						<button onClick={generate} disabled={loading} className="mt-2 rounded-xl bg-fuchsia-500 text-neutral-900 font-semibold px-5 py-3 hover:bg-fuchsia-400 disabled:opacity-60">
							{loading ? "Generating..." : "Generate creatives"}
						</button>
					</div>
				</div>

				{/* Output */}
				<div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
					{!data ? (
						<div className="text-neutral-400">Output will appear here after generation.</div>
					) : (
						<div className="space-y-6">
							<div>
								<div className="text-sm text-neutral-400 mb-1">Summary</div>
								<div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-sm">{data.summary}</div>
							</div>

							{[
								["Hooks", data.hooks],
								["Headlines", data.headlines],
								["Primary Text", data.primaryTexts],
								["Descriptions", data.descriptions],
								["CTAs", data.ctas],
								["Angles", data.angles],
								["Audiences", data.audiences],
								["Hashtags", data.hashtags],
								["Image Prompts", data.imagePrompts],
							].map(([label, arr]) => (
								<div key={label as string}>
									<div className="flex items-center justify-between">
										<div className="text-sm text-neutral-400 mb-1">{label}</div>
										<button onClick={() => copyBlock((arr as string[]).join("\n"))} className="text-xs rounded-lg border border-neutral-700 px-2 py-1 hover:border-neutral-500">
											Copy
										</button>
									</div>
									<div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-sm whitespace-pre-wrap">{(arr as string[]).join("\n")}</div>
								</div>
							))}

							<button onClick={downloadJson} className="w-full rounded-xl border border-neutral-700 px-5 py-3 hover:border-neutral-500">
								Download JSON
							</button>
						</div>
					)}
				</div>
			</section>

			{/* Tips */}
			<section className="mt-10 rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
				<div className="text-sm text-neutral-400 mb-2">Tips</div>
				<ul className="list-disc pl-5 text-sm text-neutral-300 space-y-1">
					<li>Use “Image Prompts” with Midjourney / SDXL, then upload to your ad manager.</li>
					<li>Test 3 hooks + 3 headlines per product. Kill losers fast.</li>
					<li>Run platform‑native formats (UGC vibe for TikTok/IG; structured for FB/Google).</li>
				</ul>
			</section>
		</main>
	);
}
