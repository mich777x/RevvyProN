import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { z } from "zod";

const CheckoutBody = z.object({
	priceId: z.string().min(1, "priceId is required"),
	mode: z.enum(["subscription", "payment"]).default("subscription"),
});

// Small helper so we never touch `any`
function errMsg(e: unknown): string {
	if (e instanceof Error) return e.message;
	return "Checkout failed";
}

export async function POST(req: NextRequest) {
	try {
		// DO NOT destructure from req.json() directly (that yields `any`)
		const raw: unknown = await req.json();

		const parsed = CheckoutBody.safeParse(raw);
		if (!parsed.success) {
			// No `any` here either — Zod types are concrete
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
		return NextResponse.json({ error: errMsg(e) }, { status: 500 });
	}
}
