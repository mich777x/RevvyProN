export async function GET() {
	const base = "https://revvypro.org";

	const urls = ["", "/terms", "/privacy", "#pricing"].map((path) => {
		return `
    <url>
        <loc>${base}${path}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    `;
	});

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("")}
    </urlset>`;

	return new Response(xml, {
		headers: { "Content-Type": "application/xml" },
	});
}
