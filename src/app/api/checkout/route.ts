import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
	try {
		const { priceId, mode = "subscription" } = await req.json();
		if (!priceId) {
			return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
		}

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
		// 🔹 Narrow unknown before using
		if (e instanceof Error) {
			return NextResponse.json({ error: e.message }, { status: 500 });
		}
		return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
	}
}
