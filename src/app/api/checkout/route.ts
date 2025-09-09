import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
	try {
		const requestBody = await req.json();
		const priceId: string = requestBody.priceId;
		const mode: "subscription" | "payment" = requestBody.mode || "subscription";

		if (!priceId) {
			return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
		}

		const origin = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;

		const session = await stripe.checkout.sessions.create({
			mode: mode,
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			success_url: `${origin}/success?sid={CHECKOUT_SESSION_ID}`,
			cancel_url: `${origin}/cancel`,
			billing_address_collection: "required",
			allow_promotion_codes: true,
			automatic_tax: {
				enabled: false,
			},
		});

		const checkoutUrl = session.url;
		return NextResponse.json({ url: checkoutUrl }, { status: 200 });
	} catch (error) {
		console.error("Checkout error:", error);

		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}

		return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
	}
}
