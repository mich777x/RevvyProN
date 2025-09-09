import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

type CheckoutMode = "subscription" | "payment";

interface RequestBody {
	priceId: string;
	mode?: CheckoutMode;
}

interface StripeSession {
	url: string | null;
	id: string;
}

export async function POST(req: NextRequest) {
	try {
		const body: RequestBody = await req.json();
		const { priceId, mode = "subscription" } = body;

		if (!priceId) {
			return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
		}

		const origin = process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin;

		// Create the session and destructure only what we need
		const { url }: StripeSession = await stripe.checkout.sessions.create({
			mode,
			line_items: [{ price: priceId, quantity: 1 }],
			success_url: `${origin}/success?sid={CHECKOUT_SESSION_ID}`,
			cancel_url: `${origin}/cancel`,
			billing_address_collection: "required",
			allow_promotion_codes: true,
			automatic_tax: { enabled: false },
		});

		return NextResponse.json({ url }, { status: 200 });
	} catch (error: unknown) {
		if (error instanceof Error) {
			return NextResponse.json({ error: error.message }, { status: 500 });
		}
		return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
	}
}
