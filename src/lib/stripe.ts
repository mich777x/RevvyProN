// src/lib/stripe.ts
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
	throw new Error("STRIPE_SECRET_KEY is missing");
}

// The SDK you have installed expects this exact literal:
const LATEST: Stripe.LatestApiVersion = "2025-07-30.basil";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
	apiVersion: LATEST,
	typescript: true,
});
