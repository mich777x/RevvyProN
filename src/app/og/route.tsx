import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RevvyPro — The AI Ad Engine for Shopify";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const title = searchParams.get("t") || "The AI Ad Engine for Shopify";
	const ref = searchParams.get("ref") || "";

	return new ImageResponse(
		(
			<div
				style={{
					width: "1200px",
					height: "630px",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					padding: "48px",
					background: "#06070A",
				}}
			>
				<div style={{ fontSize: 54, color: "white", fontWeight: 700 }}>
					<span
						style={{
							backgroundImage: "linear-gradient(90deg,#8B5CF6,#22D3EE)",
							WebkitBackgroundClip: "text",
							color: "transparent",
						}}
					>
						RevvyPro
					</span>
					<span style={{ color: "white" }}> — {title}</span>
				</div>

				<div style={{ color: "rgba(255,255,255,0.8)", fontSize: 28, maxWidth: 900 }}>Generate, score, and evolve high-CTR ads. Adaptive tuner improves results daily.</div>

				<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<div style={{ color: "rgba(255,255,255,0.7)", fontSize: 24 }}>revvypro.ai</div>

					{ref ? (
						<div
							style={{
								color: "#06070A",
								background: "linear-gradient(90deg,#8B5CF6,#22D3EE)",
								padding: "12px 20px",
								borderRadius: 12,
								fontSize: 24,
								fontWeight: 700,
							}}
						>
							REF: {ref}
						</div>
					) : null}
				</div>
			</div>
		),
		{ width: size.width, height: size.height }
	);
}
