import express from "express";
import Stripe from "stripe";
import { sendWelcome } from "../utils/sendEmail.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @route POST /api/stripe/checkout
router.post("/checkout", async (req, res) => {
	try {
		const { email, priceId } = req.body;

		const session = await stripe.checkout.sessions.create({
			customer_email: email,
			line_items: [{ price: priceId, quantity: 1 }],
			mode: "payment",
			success_url: "https://revvyproai.com/success",
			cancel_url: "https://revvyproai.com/cancel",
		});

		res.json({ url: session.url });
	} catch (err) {
		console.error("Stripe Checkout Error:", err.message);
		res.status(500).json({ error: err.message });
	}
});

export default router;
