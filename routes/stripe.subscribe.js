import express from "express";
import Stripe from "stripe";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/subscribe", async (req, res) => {
	try {
		const { priceId, email, affCode } = req.body;

		const session = await stripe.checkout.sessions.create({
			mode: "subscription",
			line_items: [{ price: priceId, quantity: 1 }],
			customer_email: email || undefined,
			allow_promotion_codes: true,
			subscription_data: {
				metadata: affCode ? { affiliate_code: affCode } : {},
			},
			success_url: "https://revvyproai.com/success?session_id={CHECKOUT_SESSION_ID}",
			cancel_url: "https://revvyproai.com/cancel",
		});

		res.json({ url: session.url });
	} catch (err) {
		console.error("Subscribe Error:", err);
		res.status(500).json({ error: err.message });
	}
});

export default router;
