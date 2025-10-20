import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // ensure Node runtime (not edge)

// Validate presence of secret at module load (fail fast)
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
if (!STRIPE_SECRET_KEY) throw new Error("Missing STRIPE_SECRET_KEY");

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

type Body = {
	priceId: string;
	email?: string;
	affCode?: string;
};

export async function POST(req: Request) {
	try {
		const body = (await req.json()) as Body;

		if (!body.priceId || !/^price_/.test(body.priceId)) {
			return NextResponse.json({ error: "Invalid priceId" }, { status: 400 });
		}
		if (body.email && !/^\S+@\S+\.\S+$/.test(body.email)) {
			return NextResponse.json({ error: "Invalid email" }, { status: 400 });
		}

		const session = await stripe.checkout.sessions.create(
			{
				mode: "subscription",
				line_items: [{ price: body.priceId, quantity: 1 }],
				customer_email: body.email || undefined,
				allow_promotion_codes: true,
				subscription_data: body.affCode ? { metadata: { affiliate_code: String(body.affCode).toUpperCase() } } : {},
				success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
				cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
			},
			{
				// simple idempotency key; can pass a client-generated UUID instead
				idempotencyKey: `sub:${body.priceId}:${(body.email || "anon").toLowerCase()}:${Date.now()}`,
			}
		);

		return NextResponse.json({ url: session.url });
	} catch (err: any) {
		console.error("Subscribe error:", err?.message || err);
		return NextResponse.json({ error: "Subscription failed" }, { status: 500 });
	}
}
