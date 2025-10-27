import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
	const p = await prisma.product.upsert({
		where: { handle: "demo-shirt" },
		update: {},
		create: { title: "Demo Shirt", handle: "demo-shirt", imageUrl: "https://picsum.photos/seed/shirt/600" },
	});

	await prisma.creative.create({
		data: {
			productId: p.id,
			headline: "Level-Up Your Fit",
			primary: "Premium cotton. Next-gen comfort.",
			description: "Tap to feel the difference.",
			imagePrompt: "Studio, soft neon key light.",
			viralScore: 42,
		},
	});
}

main().finally(() => prisma.$disconnect());
