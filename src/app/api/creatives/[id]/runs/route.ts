import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(_: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const runs = await prisma.predictionRun.findMany({
		where: { creativeId: id },
		orderBy: { createdAt: "asc" },
		take: 200,
	});
	return NextResponse.json(runs);
}
