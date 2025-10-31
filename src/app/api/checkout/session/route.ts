import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { stripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type CheckoutBody = {
	priceId: string;
	customerEmail?: string;
};

export async function POST(req: Request) {
	try {
		const { priceId, customerEmail } = (await req.json()) as CheckoutBody;

		if (!priceId) {
			return NextResponse.json({ error: "priceId required" }, { status: 400 });
		}

		const cookieStore = await cookies();
		const ref = cookieStore.get("revvy_ref")?.value || "";

		const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

		const session = await stripe.checkout.sessions.create({
			mode: "subscription",
			line_items: [{ price: priceId, quantity: 1 }],
			success_url: `${baseUrl}/?checkout=success`,
			cancel_url: `${baseUrl}/pricing?canceled=1`,
			customer_email: customerEmail,
			metadata: { refCode: ref },
		});

		return NextResponse.json({ id: session.id, url: session.url }, { status: 201 });
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : "server_error";
		console.error("checkout POST error:", err);
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
