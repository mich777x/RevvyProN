import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { makeRefCode } from "@/lib/ref";

const prisma = new PrismaClient();

// POST { email } -> { url, refCode }
export async function POST(req: Request) {
	const { email } = await req.json();
	if (!email || !/.+@.+\..+/.test(email)) {
		return NextResponse.json({ error: "Valid email required" }, { status: 400 });
	}

	let a = await prisma.affiliate.findUnique({ where: { userEmail: email } });
	if (!a) {
		a = await prisma.affiliate.create({
			data: { userEmail: email, refCode: makeRefCode(email) },
		});
	}

	const url = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}?ref=${a.refCode}`;
	return NextResponse.json({ url, refCode: a.refCode }, { status: 201 });
}
