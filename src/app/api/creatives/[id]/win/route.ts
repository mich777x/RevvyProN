import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Body: { result: "win" | "loss" | "tie" }
 * - win:   increments wins and +5 viralScore (cap 100)
 * - loss:  increments losses and -2 viralScore (floor 0)
 * - tie:   no W/L change; slight normalize toward 60
 */
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
	const { id } = params;
	const { result } = (await req.json()) as { result: "win" | "loss" | "tie" };

	const cRaw = await prisma.creative.findUnique({ where: { id } });
	if (!cRaw) return NextResponse.json({ error: "creative not found" }, { status: 404 });

	// Widen the fetched record so TS knows these may exist.
	const c = cRaw as typeof cRaw & { wins?: number; losses?: number };

	// Explicit (non-any) update shape to satisfy eslint
	let data: { wins?: number; losses?: number; viralScore?: number } = {};

	if (result === "win") {
		data = {
			wins: (c.wins ?? 0) + 1,
			viralScore: Math.min(100, (c.viralScore ?? 0) + 5),
		};
	} else if (result === "loss") {
		data = {
			losses: (c.losses ?? 0) + 1,
			viralScore: Math.max(0, (c.viralScore ?? 0) - 2),
		};
	} else {
		// small nudge toward mid if tie
		const current = c.viralScore ?? 0;
		const toward = current > 60 ? -1 : 1;
		data = { viralScore: Math.max(0, Math.min(100, current + toward)) };
	}

	const updated = await prisma.creative.update({
		where: { id },
		// Cast via unknown → CreativeUpdateInput to avoid 'any' and make Prisma happy
		data: data as unknown as Prisma.CreativeUpdateInput,
	});

	return NextResponse.json(updated);
}
