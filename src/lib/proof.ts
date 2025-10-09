import crypto from "crypto";

type Proof = {
	vertical: string;
	region: string;
	before: { roas: number; cpa: number };
	after: { roas: number; cpa: number };
	delta: { cpa: number; spend: number };
	proof: string; // hash
};

const samples: Omit<Proof, "proof">[] = [
	{ vertical: "Beauty", region: "US", before: { roas: 1.1, cpa: 38 }, after: { roas: 2.3, cpa: 22 }, delta: { cpa: 42, spend: 12400 } },
	{ vertical: "Supplements", region: "UK", before: { roas: 0.9, cpa: 41 }, after: { roas: 2.0, cpa: 24 }, delta: { cpa: 41, spend: 9800 } },
	{ vertical: "Streetwear", region: "CA", before: { roas: 1.2, cpa: 33 }, after: { roas: 2.6, cpa: 18 }, delta: { cpa: 45, spend: 15200 } },
];

export function sampleProof(): Proof[] {
	return samples.map((s) => ({
		...s,
		proof: crypto
			.createHash("sha256")
			.update(JSON.stringify(s) + "|revvypro|v1")
			.digest("hex"),
	}));
}
