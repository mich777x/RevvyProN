// src/app/api/checkout/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { z } from "zod";
import { assertServerEnv } from "@/lib/assertEnv";

const CheckoutBody = z.object({
	priceId: z.string().min(1),
	mode: z.enum(["subscription", "payment"]).default("subscription"),
});

function toErrMsg(e: unknown): string {
	if (e instanceof Error) return e.message;
	return "Checkout failed";
}

export async function POST(_req: NextRequest) {
	try {
		assertServerEnv();

		const raw: unknown = await _req.json();
		const parsed = CheckoutBody.safeParse(raw);
		if (!parsed.success) {
			return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
		}

		const { priceId, mode } = parsed.data;
		const origin = process.env.NEXT_PUBLIC_SITE_URL!; // absolute base
		const successUrl = `${origin}/success?sid={CHECKOUT_SESSION_ID}`;
		const cancelUrl = `${origin}/cancel`;

		const session = await stripe.checkout.sessions.create({
			mode,
			line_items: [{ price: priceId, quantity: 1 }],
			success_url: successUrl,
			cancel_url: cancelUrl,
			billing_address_collection: "required",
			allow_promotion_codes: true,
			automatic_tax: { enabled: false },
		});

		return NextResponse.json({ url: session.url }, { status: 200 });
	} catch (e: unknown) {
		// Temporary: log to Vercel Functions logs
		console.error("Checkout error:", e);
		return NextResponse.json({ error: toErrMsg(e) }, { status: 500 });
	}
}
