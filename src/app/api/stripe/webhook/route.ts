import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;
if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
	throw new Error("Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET");
}

const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2024-06-20" });

// Map price IDs → plan
const PRICE_TO_PLAN: Record<string, "starter" | "pro" | "agency"> = {
	[process.env.STARTER_PRICE_ID as string]: "starter",
	[process.env.PRO_PRICE_ID as string]: "pro",
	[process.env.AGENCY_PRICE_ID as string]: "agency",
};

export async function POST(req: Request) {
	const sig = (req.headers.get("stripe-signature") || "") as string;

	let event: Stripe.Event;
	let body: string;

	try {
		body = await req.text();
	} catch {
		return new NextResponse("Invalid body", { status: 400 });
	}

	try {
		event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
	} catch (err: any) {
		console.error("Webhook signature error:", err?.message || err);
		return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
	}

	try {
		switch (event.type) {
			case "checkout.session.completed": {
				const s = event.data.object as Stripe.Checkout.Session;
				if (s.mode !== "subscription") break;

				// Pull full subscription to get price + metadata
				const sub = await stripe.subscriptions.retrieve(String(s.subscription));
				const priceId = sub.items.data[0]?.price?.id;
				const plan = (priceId && PRICE_TO_PLAN[priceId]) || "starter"; // default

				// Optional affiliate code
				const affCode = sub.metadata?.affiliate_code || sub.items.data[0]?.price?.metadata?.affiliate_code || null;

				const email = s.customer_details?.email || s.customer_email || "";
				const customerId = String(s.customer);

				// TODO: upsert to your DB (Prisma) here.
				// await prisma.user.upsert({ ... });
				// await prisma.subscription.upsert({ ... });

				// TODO: send welcome email if you’ve wired Resend
				// await sendWelcome(email);

				console.log("✅ checkout.session.completed", { email, customerId, plan, affCode });
				break;
			}

			case "invoice.paid": {
				const inv = event.data.object as Stripe.Invoice;
				const amount = (inv.amount_paid || 0) / 100;
				const currency = inv.currency || "usd";
				const subscriptionId = String(inv.subscription || "");

				// TODO: insert/update invoice row in DB and credit affiliate revenue if applicable

				console.log("🧾 invoice.paid", { subscriptionId, amount, currency });
				break;
			}

			case "customer.subscription.updated":
			case "customer.subscription.created": {
				const sub = event.data.object as Stripe.Subscription;
				const priceId = sub.items.data[0]?.price?.id;
				const plan = (priceId && PRICE_TO_PLAN[priceId]) || "starter";

				// TODO: upsert subscription status & currentPeriodEnd in DB

				console.log(`🔄 ${event.type}`, { subId: sub.id, status: sub.status, plan });
				break;
			}

			case "customer.subscription.deleted": {
				const sub = event.data.object as Stripe.Subscription;
				// TODO: mark subscription canceled in DB
				console.log("🛑 subscription.deleted", { subId: sub.id });
				break;
			}

			default:
				// Ignore the rest for now
				break;
		}

		return NextResponse.json({ received: true });
	} catch (err: any) {
		console.error("Webhook handler error:", err?.message || err);
		return new NextResponse("Webhook processing failed", { status: 500 });
	}
}
