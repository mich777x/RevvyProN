import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
	const body = await req.json();
	const { email, audience, notes } = body ?? {};
	if (!email || !/.+@.+\..+/.test(email)) {
		return NextResponse.json({ error: "valid email required" }, { status: 400 });
	}
	const lead = await prisma.affiliateLead.upsert({
		where: { email },
		update: { audience, notes },
		create: { email, audience, notes },
	});
	return NextResponse.json({ ok: true, lead }, { status: 201 });
}
