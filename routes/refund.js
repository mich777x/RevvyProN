import express from "express";
import Stripe from "stripe";
import { PrismaClient } from "@prisma/client";
import { sendRefundEmail } from "../utils/sendEmail.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const prisma = new PrismaClient();

// @route POST /api/refund
router.post("/", async (req, res) => {
	try {
		const { paymentId } = req.body;

		const payment = await prisma.payment.findUnique({
			where: { id: paymentId },
		});

		if (!payment) return res.status(404).json({ error: "Payment not found" });

		const refund = await stripe.refunds.create({
			payment_intent: payment.stripeId,
		});

		await prisma.payment.update({
			where: { id: paymentId },
			data: { status: "refunded" },
		});

		await sendRefundEmail(paymentId);

		res.json({ success: true, refund });
	} catch (err) {
		console.error("Refund Error:", err.message);
		res.status(500).json({ error: err.message });
	}
});

export default router;
