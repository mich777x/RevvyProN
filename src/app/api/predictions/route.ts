import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { forecastROI } from "@/ai";
import { viralScoreFromForecast } from "@/ai/scoring";

const prisma = new PrismaClient();

export async function POST(req: Request) {
	const body = await req.json();
	const { creativeId, impressions = 10000, ctr = 0.03, aov = 60, convRate = 0.02, cpc = 0.8 } = body;

	const creative = await prisma.creative.findUnique({ where: { id: creativeId } });
	if (!creative) return NextResponse.json({ error: "creative not found" }, { status: 404 });

	const f = forecastROI(impressions, ctr, aov, convRate, cpc);
	const score = viralScoreFromForecast(creative.headline, creative.primary, creative.description, impressions, ctr, aov, convRate, cpc);

	const run = await prisma.predictionRun.create({
		data: { creativeId, cpc: f.cpc, cpa: f.cpa, roi: f.roi, notes: "auto-forecast" },
	});

	// Optionally update creative’s viralScore with latest forecast
	await prisma.creative.update({ where: { id: creativeId }, data: { viralScore: score } });

	return NextResponse.json({ run, score, forecast: f }, { status: 201 });
}
