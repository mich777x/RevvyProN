import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const code = searchParams.get("code");
	if (!code) return NextResponse.json({ error: "code required" }, { status: 400 });

	const aff = await prisma.affiliate.findUnique({ where: { refCode: code } });
	if (!aff) return NextResponse.json({ error: "not found" }, { status: 404 });

	// basic IP capture (best-effort)
	const xfwd = req.headers.get("x-forwarded-for");
	const xreal = req.headers.get("x-real-ip");
	const ip = xfwd?.split(",")[0]?.trim() || xreal || "0.0.0.0";

	await prisma.referral.create({
		data: { affiliateId: aff.id, visitorIp: String(ip) },
	});

	// set a cookie for later conversion capture
	const res = NextResponse.redirect(new URL("/", req.url));
	res.cookies.set("revvy_ref", code, { path: "/", maxAge: 60 * 60 * 24 * 30 });
	return res;
}
