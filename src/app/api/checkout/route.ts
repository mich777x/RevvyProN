// src/app/api/checkout/route.ts

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Plan = "starter" | "growth" | "agency";

type Body = { plan: Plan; quantity?: number; successPath?: string; cancelPath?: string } | { priceId: string; quantity?: number; successPath?: string; cancelPath?: string };

const json = (data: unknown, status = 200) =>
	new Response(JSON.stringify(data), {
		status,
		headers: { "content-type": "application/json" },
	});

const getDomain = () => process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || "http://localhost:3000";

const planToPriceId = (plan: Plan) =>
	({
		starter: process.env.STRIPE_PRICE_ID_STARTER,
		growth: process.env.STRIPE_PRICE_ID_GROWTH,
		agency: process.env.STRIPE_PRICE_ID_AGENCY,
	}[plan]);

export async function POST(req: Request) {
	try {
		const body = (await req.json()) as Body;

		// 1) Validate Stripe secret exists (don’t crash app on boot)
		const secret = process.env.STRIPE_SECRET_KEY;
		if (!secret) return json({ error: "Missing STRIPE_SECRET_KEY (set in .env.local or hosting env)" }, 500);

		// 2) Resolve priceId from plan or raw priceId
		let priceId: string | undefined;
		if ("plan" in body && body.plan) {
			priceId = planToPriceId(body.plan);
			if (!priceId) return json({ error: `Missing Price ID env for plan: ${body.plan}` }, 500);
		} else if ("priceId" in body && body.priceId) {
			priceId = body.priceId;
		} else {
			return json({ error: "Provide either { plan } or { priceId } in POST body" }, 400);
		}

		// 3) Lazy import Stripe & init with the secret
		const { default: Stripe } = await import("stripe");
		const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

		// 4) Verify the price actually exists and is active (great for catching wrong mode / typos)
		let price;
		try {
			price = await stripe.prices.retrieve(priceId);
			if (!price.active) {
				return json({ error: `Stripe price ${priceId} is not active` }, 400);
			}
		} catch (e: any) {
			return json(
				{
					error: `Unable to retrieve Stripe price: ${priceId}. Check that it exists and matches your key mode (test vs live).`,
					detail: e?.message || String(e),
				},
				400
			);
		}

		// 5) Basic quantity & URLs
		const qty = Math.max(1, Math.min(Number((body as any).quantity ?? 1), 99));
		const domain = getDomain();
		const successPath = (body as any).successPath || "/success?session_id={CHECKOUT_SESSION_ID}";
		const cancelPath = (body as any).cancelPath || "/#pricing";

		// 6) Create Checkout session
		const session = await stripe.checkout.sessions.create({
			mode: "subscription",
			payment_method_types: ["card"],
			line_items: [{ price: priceId, quantity: qty }],
			success_url: `${domain}${successPath}`,
			cancel_url: `${domain}${cancelPath}`,
			metadata: {
				...("plan" in body && body.plan ? { plan: body.plan } : {}),
				source: "revvy-pro-web",
			},
		});

		if (!session.url) return json({ error: "Stripe did not return a session URL" }, 500);
		return json({ url: session.url }, 200);
	} catch (err: any) {
		// In dev, include more detail; in prod keep it generic
		const isDev = process.env.NODE_ENV !== "production";
		console.error("[CHECKOUT_ERROR]", err?.message || err);
		return json(
			{
				error: "Stripe checkout error",
				...(isDev ? { detail: err?.message || String(err) } : {}),
			},
			500
		);
	}
}
