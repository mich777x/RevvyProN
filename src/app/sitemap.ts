import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
	const now = new Date().toISOString();
	const pages = ["", "/pricing", "/dashboard", "/studio", "/affiliate", "/affiliate/assets", "/press"];
	return pages.map((p) => ({
		url: `${base}${p}`,
		lastModified: now,
		changeFrequency: "daily",
		priority: p === "" ? 1.0 : 0.7,
	}));
}
