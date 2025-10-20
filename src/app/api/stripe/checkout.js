import Stripe from "stripe";
import express from "express";
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/checkout", async (req, res) => {
	try {
		const session = await stripe.checkout.sessions.create({
			line_items: req.body.items,
			mode: "payment",
			success_url: "https://revvyproai.com/success",
			cancel_url: "https://revvyproai.com/cancel",
		});
		res.json({ url: session.url });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;
