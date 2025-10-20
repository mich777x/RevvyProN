import express from "express";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const router = express.Router();
const prisma = new PrismaClient();

// @route POST /api/affiliates/apply
router.post("/apply", async (req, res) => {
	try {
		const { email } = req.body;

		const user = await prisma.user.upsert({
			where: { email },
			update: {},
			create: { email },
		});

		const code = crypto.randomBytes(4).toString("hex").toUpperCase();

		const affiliate = await prisma.affiliate.create({
			data: {
				userId: user.id,
				code,
			},
		});

		res.json({ success: true, code });
	} catch (err) {
		console.error("Affiliate Apply Error:", err.message);
		res.status(500).json({ error: err.message });
	}
});

// @route GET /api/affiliates/:code
router.get("/:code", async (req, res) => {
	try {
		const { code } = req.params;
		const affiliate = await prisma.affiliate.findUnique({ where: { code } });
		if (!affiliate) return res.status(404).json({ error: "Invalid code" });
		res.json(affiliate);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

export default router;
