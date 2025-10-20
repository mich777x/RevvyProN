import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

// ---------- ENV VALIDATION ----------
const required = [
	"NODE_ENV",
	"PORT",
	"DATABASE_URL",
	"STRIPE_SECRET_KEY",
	"RESEND_API_KEY",
	"CLIENT_ORIGIN", // e.g. https://revvyproai.com
];
const missing = required.filter((k) => !process.env[k]);
if (missing.length) {
	console.error("❌ Missing env vars:", missing.join(", "));
	process.exit(1);
}

const isProd = process.env.NODE_ENV === "production";
const PORT = parseInt(process.env.PORT, 10) || 4000;

// ---------- APP & DB ----------
const app = express();
const prisma = new PrismaClient();

// Trust proxy if behind Vercel/Render/Nginx
app.set("trust proxy", 1);

// ---------- SECURITY & UTILS ----------
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(
	cors({
		origin: process.env.CLIENT_ORIGIN.split(",").map((s) => s.trim()),
		credentials: true,
	})
);
app.use(
	rateLimit({
		windowMs: 60 * 1000,
		max: 120, // 120 req/min/IP
		standardHeaders: true,
		legacyHeaders: false,
	})
);
if (!isProd) app.use(morgan("dev"));

// NOTE: Stripe webhook needs raw body BEFORE express.json()
import stripeWebhookRouter from "./routes/stripe.webhook.js";
app.use("/api/stripe/webhook", express.raw({ type: "application/json" }), stripeWebhookRouter);

// JSON parser for everything else
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false }));

// subscribe route (after json parser)
import subscribeRoute from "./routes/stripe.subscribe.js";
app.use("/api/stripe", subscribeRoute);

// ---------- ROUTES ----------
app.get("/health", async (_req, res) => {
	try {
		await prisma.$queryRaw`SELECT 1`; // DB ping
		res.json({
			ok: true,
			env: process.env.NODE_ENV,
			version: "v1",
			timestamp: new Date().toISOString(),
		});
	} catch (e) {
		res.status(500).json({ ok: false, error: "DB unreachable" });
	}
});

// Feature routers (implement these files)
import stripeCheckoutRouter from "./routes/stripe.checkout.js";
import refundRouter from "./routes/refund.js";
import affiliatesRouter from "./routes/affiliates.js";

app.use("/api/stripe", stripeCheckoutRouter); // /checkout
app.use("/api/refund", refundRouter); // POST / (refund by payment/charge)
app.use("/api/affiliates", affiliatesRouter); // /apply, /stats, etc.

// ---------- 404 ----------
app.use((req, res) => {
	res.status(404).json({ error: "Not Found", path: req.originalUrl });
});

// ---------- ERROR HANDLER ----------
app.use((err, _req, res, _next) => {
	console.error("Unhandled error:", err);
	const status = err.status || 500;
	res.status(status).json({
		error: err.message || "Internal Server Error",
		...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
	});
});

// ---------- START ----------
app.listen(PORT, () => {
	console.log(`✅ RevvyPro API running on http://localhost:${PORT}`);
});

// ---------- GRACEFUL SHUTDOWN ----------
process.on("SIGINT", async () => {
	console.log("\nGracefully shutting down…");
	await prisma.$disconnect();
	process.exit(0);
});
