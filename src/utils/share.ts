export function withRef(url: string, ref?: string) {
	if (!ref) return url;
	const u = new URL(url, typeof window !== "undefined" ? window.location.origin : process.env.NEXT_PUBLIC_APP_URL);
	u.searchParams.set("ref", ref);
	return u.toString();
}

export function affiliateOg(ref?: string) {
	const base = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
	const u = new URL("/og", base);
	if (ref) u.searchParams.set("ref", ref);
	return u.toString();
}
