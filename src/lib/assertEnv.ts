export function assertServerEnv() {
	const miss: string[] = [];
	if (!process.env.STRIPE_SECRET_KEY) miss.push("STRIPE_SECRET_KEY");
	if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) miss.push("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY");
	if (!process.env.NEXT_PUBLIC_SITE_URL) miss.push("NEXT_PUBLIC_SITE_URL");
	if (miss.length) {
		// Surface clearly in Vercel logs
		throw new Error(`Missing env(s): ${miss.join(", ")}`);
	}
}
