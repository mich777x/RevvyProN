import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma"; // <-- singleton client
import type Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
	// Stripe requires the raw body
	const rawBody = await req.text();

	const headerStore = await headers();
	const sig = headerStore.get("stripe-signature");
	if (!sig) {
		return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
	}

	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : "invalid_signature";
		return NextResponse.json({ error: `Webhook signature verification failed: ${message}` }, { status: 400 });
	}

	// Default affiliate revenue share (can move to PayoutTier logic later)
	const AFF_SHARE = 0.5;

	try {
		switch (event.type) {
			case "checkout.session.completed": {
				const s = event.data.object as Stripe.Checkout.Session;
				const refCode = s.metadata?.refCode ?? "";
				const amountCents = s.amount_total ?? 0;
				const amount = amountCents / 100;

				if (refCode && amount > 0) {
					// affiliate must be uniquely keyed by refCode
					const aff = await prisma.affiliate.findUnique({ where: { refCode } });
					if (aff) {
						// ensure one referral per session (requires unique index on stripeSessionId)
						let ref = await prisma.referral.findUnique({
							where: { stripeSessionId: s.id },
						});

						if (!ref) {
							ref = await prisma.referral.create({
								data: {
									affiliateId: aff.id,
									converted: true,
									amount: amount * AFF_SHARE,
									stripeSessionId: s.id,
								},
							});
						}

						// credit earnings idempotently by session uniqueness
						await prisma.affiliate.update({
							where: { id: aff.id },
							data: { earnings: (aff.earnings || 0) + amount * AFF_SHARE },
						});
					}
				}
				break;
			}

			case "invoice.paid": {
				const inv = event.data.object as Stripe.Invoice;

				// Ensure price objects are expanded so metadata is present at runtime
				const expanded = await stripe.invoices.retrieve(inv.id, {
					expand: ["lines.data.price"],
				});

				const amount = (expanded.amount_paid ?? 0) / 100;

				// Helper: read refCode from an optionally-present price field without `any`
				type PriceLike = { metadata?: Record<string, string> | null } | null | undefined;
				const getRefFromLine = (li: Stripe.InvoiceLineItem): string => {
					const maybePrice = (li as unknown as { price?: PriceLike }).price;
					const meta = maybePrice && typeof maybePrice === "object" ? (maybePrice as { metadata?: Record<string, string> | null }).metadata : undefined;
					return (meta?.refCode as string | undefined) ?? "";
				};

				const refFromLines = expanded.lines?.data?.map(getRefFromLine).find(Boolean) ?? "";

				const refCode = refFromLines || (expanded.metadata?.refCode ?? "");

				if (refCode && amount > 0) {
					const aff = await prisma.affiliate.findUnique({ where: { refCode } });
					if (aff) {
						await prisma.affiliate.update({
							where: { id: aff.id },
							data: { earnings: (aff.earnings || 0) + amount * AFF_SHARE },
						});
					}
				}
				break;
			}

			default:
				// ignore others
				break;
		}

		return NextResponse.json({ received: true }, { status: 200 });
	} catch (err: unknown) {
		const message = err instanceof Error ? err.message : "handler_error";
		console.error("webhook handler error:", err);
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
