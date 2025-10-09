// src/app/robots.txt/route.ts
export async function GET() {
	const content = `
User-agent: *
Allow: /
Sitemap: https://revvypro.org/sitemap.xml
    `.trim();

	return new Response(content, {
		headers: { "Content-Type": "text/plain" },
	});
}
