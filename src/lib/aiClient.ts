export type LLMClient = { generate: (prompt: string) => Promise<string> };

export const aiClient: LLMClient = {
	async generate(prompt) {
		// TODO: wire to OpenAI/Claude later; stub for now
		return `DRAFT:${prompt.slice(0, 64)}...`;
	},
};
