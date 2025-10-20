import express from "express";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { sendWelcome } from "../utils/sendEmail.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

// Map Stripe price IDs → our plan names
const PRICE_TO_PLAN = {
	[process.env.STARTER_PRICE_ID]: "starter", // $297/mo
	[process.env.PRO_PRICE_ID]: "pro", // $497/mo
	[process.env.AGENCY_PRICE_ID]: "agency", // $997/mo
};

// Helper: get plan name from subscription
async function getPlanFromSubscription(sub) {
	try {
		const item = sub.items?.data?.[0];
		const priceId = item?.price?.id;
		return PRICE_TO_PLAN[priceId] || "unknown";
	} catch {
		return "unknown";
	}
}

router.post("/", async (req, res) => {
	const sig = req.headers["stripe-signature"];
	let event;

	// 1) Verify signature (uses raw body from server.js)
	try {
		event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
	} catch (err) {
		console.error("⚠️ Webhook signature error:", err.message);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}

	try {
		switch (event.type) {
			// Fired after successful checkout redirect (mode: "subscription")
			case "checkout.session.completed": {
				const s = event.data.object;
				if (s.mode !== "subscription") break;

				const email = s.customer_details?.email || s.customer_email || undefined;
				const customerId = s.customer;
				const subscriptionId = s.subscription;

				// Upsert user by email
				const user = await prisma.user.upsert({
					where: { email },
					update: {},
					create: { email },
				});

				// Pull full sub (has items/prices + metadata)
				const sub = await stripe.subscriptions.retrieve(subscriptionId);
				const plan = await getPlanFromSubscription(sub);
				const status = sub.status;
				const currentPeriodEnd = new Date(sub.current_period_end * 1000);

				// Optional affiliate code (we pass via subscription_data.metadata on checkout)
				const affiliateCode = sub.metadata?.affiliate_code || sub.items?.data?.[0]?.price?.metadata?.affiliate_code || null;

				let affiliateId = null;
				if (affiliateCode) {
					const aff = await prisma.affiliate.findUnique({
						where: { code: affiliateCode.toUpperCase() },
					});
					if (aff) affiliateId = aff.id;
				}

				// Upsert subscription
				await prisma.subscription.upsert({
					where: { stripeSubId: sub.id },
					update: {
						status,
						currentPeriodEnd,
						plan,
						affiliateId,
					},
					create: {
						userId: user.id,
						stripeCustomerId: customerId,
						stripeSubId: sub.id,
						plan,
						status,
						currentPeriodEnd,
						affiliateId,
					},
				});

				// Welcome email
				if (email) await sendWelcome(email);

				break;
			}

			// Lifecycle updates (status change, period end changes, plan upgrades)
			case "customer.subscription.created":
			case "customer.subscription.updated": {
				const sub = event.data.object;
				const plan = await getPlanFromSubscription(sub);
				const status = sub.status;
				const currentPeriodEnd = new Date(sub.current_period_end * 1000);

				// Ensure we know the user to attach if new
				const existing = await prisma.subscription.findUnique({
					where: { stripeSubId: sub.id },
				});

				if (existing) {
					await prisma.subscription.update({
						where: { stripeSubId: sub.id },
						data: { status, currentPeriodEnd, plan },
					});
				} else {
					// Need a user; fetch customer → email → user
					const customer = await stripe.customers.retrieve(sub.customer);
					const email = customer.email;
					const user = await prisma.user.upsert({
						where: { email },
						update: {},
						create: { email },
					});

					await prisma.subscription.create({
						data: {
							userId: user.id,
							stripeCustomerId: sub.customer,
							stripeSubId: sub.id,
							plan,
							status,
							currentPeriodEnd,
						},
					});
				}
				break;
			}

			// Cancellation
			case "customer.subscription.deleted": {
				const sub = event.data.object;
				await prisma.subscription.update({
					where: { stripeSubId: sub.id },
					data: { status: "canceled" },
				});
				break;
			}

			// Recurring invoices paid (monthly renewals)
			case "invoice.paid": {
				const inv = event.data.object;
				const amount = (inv.amount_paid || 0) / 100;
				const currency = inv.currency || "usd";

				const subscriptionId = inv.subscription || null;
				const subscription = subscriptionId
					? await prisma.subscription.findUnique({
							where: { stripeSubId: subscriptionId },
					  })
					: null;

				if (subscription?.userId) {
					// Record invoice
					await prisma.invoice.upsert({
						where: { stripeInvoice: inv.id },
						update: { paid: true },
						create: {
							userId: subscription.userId,
							stripeInvoice: inv.id,
							amount,
							currency,
							paid: true,
						},
					});

					// Credit affiliate revenue (if any)
					if (subscription.affiliateId && amount > 0) {
						await prisma.affiliate.update({
							where: { id: subscription.affiliateId },
							data: { revenue: { increment: amount } },
						});
					}
				}
				break;
			}

			// Failed renewals (add dunning later if you want)
			case "invoice.payment_failed": {
				// Optionally: send “update card” email & mark sub past_due via event.data.object.subscription
				break;
			}

			default:
				// Ignore other events
				break;
		}

		return res.json({ received: true });
	} catch (err) {
		console.error("⚠️ Webhook handler error:", err);
		return res.status(500).json({ error: "Webhook processing failed" });
	}
});

export default router;
