import express from "express";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { isWithin7Days } from "../utils/refundEligibility.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

// simple admin guard
router.use((req, res, next) => {
	const key = req.headers["x-api-key"];
	if (!key || key !== process.env.ADMIN_API_KEY) return res.status(401).json({ error: "Unauthorized" });
	next();
});

// POST /api/refund { subscriptionId }  -> full refund if ≤ 7 days, then cancel
router.post("/", express.json(), async (req, res) => {
	try {
		const { subscriptionId } = req.body || {};
		if (!subscriptionId) return res.status(400).json({ error: "subscriptionId required" });

		const subRow = await prisma.subscription.findUnique({ where: { stripeSubId: subscriptionId } });
		if (!subRow) return res.status(404).json({ error: "Subscription not found" });
		if (subRow.refunded) return res.status(400).json({ error: "Already refunded" });
		if (!isWithin7Days(subRow.firstChargeAt)) return res.status(400).json({ error: "Outside 7-day window" });

		// Expand latest invoice payment intent (first period)
		const sub = await stripe.subscriptions.retrieve(subscriptionId, { expand: ["latest_invoice.payment_intent"] });
		const inv = sub.latest_invoice;
		const pi = inv?.payment_intent;
		if (!pi || typeof pi === "string" || pi.status !== "succeeded") {
			return res.status(400).json({ error: "No refundable charge" });
		}

		// ... after you validate the 7-day window and locate the correct PaymentIntent

		const refund = await stripe.refunds.create({ payment_intent: pi.id }, { idempotencyKey: `refund:first:${pi.id}` });

		// ✅ Now persist refund state and stop future renewals:
		await prisma.subscription.update({
			where: { stripeSubId: subscriptionId },
			data: { refunded: true, status: "canceled" }, // keep 'refunded' boolean in your schema
		});

		// Cancel at Stripe so there are no more invoices:
		await stripe.subscriptions.cancel(subscriptionId);

		// Return success
		return res.json({ ok: true, refundId: refund.id });
	} catch (err) {
		console.error("Refund error:", err);
		return res.status(500).json({ error: "Refund failed" });
	}
});

export default router;
