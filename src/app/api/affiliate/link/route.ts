import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { makeRefCode } from "@/lib/ref";
import { sendEmail, emails } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
	const { email } = await req.json();

	if (!email || !/.+@.+\..+/.test(email)) {
		return NextResponse.json({ error: "Valid email required" }, { status: 400 });
	}

	const refCode = makeRefCode(email);

	const a = await prisma.affiliate.upsert({
		where: { userEmail: email },
		update: {},
		create: { userEmail: email, refCode },
	});

	const urlBase = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
	const url = `${urlBase}?ref=${a.refCode}`;

	const msg = emails.affiliateLinkCreated(a.refCode, url);
	await sendEmail(email, msg.subject, msg.text);

	return NextResponse.json({ url, refCode: a.refCode }, { status: 201 });
}
