import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const base = "https://revvypro.org";
	const now = new Date().toISOString();
	return [
		{ url: `${base}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
		{ url: `${base}/pricing`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
		{ url: `${base}/affiliates`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
		{ url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
		{ url: `${base}/legal/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
		{ url: `${base}/legal/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
	];
}
