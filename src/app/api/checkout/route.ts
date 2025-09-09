// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { z } from "zod";

const CheckoutBody = z.object({
	priceId: z.string().min(1, "priceId is required"),
	mode: z.enum(["subscription", "payment"]).default("subscription"),
});

// Helper: never use `any` in catch paths
function toErrMsg(e: unknown): string {
	if (e instanceof Error) return e.message;
	return "Checkout failed";
}

export async function POST(req: NextRequest) {
	try {
		// DO NOT destructure directly from req.json() (that yields implicit any)
		const raw: unknown = await req.json();

		// Parse & type the body (no any anywhere)
		const parsed = CheckoutBody.safeParse(raw);
		if (!parsed.success) {
			return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
		}

		const { priceId, mode } = parsed.data;

		const origin = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;

		const session = await stripe.checkout.sessions.create({
			mode, // "subscription" or "payment"
			line_items: [{ price: priceId, quantity: 1 }],
			success_url: `${origin}/success?sid={CHECKOUT_SESSION_ID}`,
			cancel_url: `${origin}/cancel`,
			billing_address_collection: "required",
			allow_promotion_codes: true,
			automatic_tax: { enabled: false },
		});

		return NextResponse.json({ url: session.url }, { status: 200 });
	} catch (e: unknown) {
		return NextResponse.json({ error: toErrMsg(e) }, { status: 500 });
	}
}
