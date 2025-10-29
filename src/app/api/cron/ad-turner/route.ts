import { NextResponse } from "next/server";
import { runAdaptiveTuner } from "@/ai";

export async function POST() {
	const result = await runAdaptiveTuner(5);
	return NextResponse.json(result);
}

export const dynamic = "force-dynamic"; // allow serverless platforms to run
