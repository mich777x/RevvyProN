export function makeRefCode(email: string) {
	const base = email
		.split("@")[0]
		.replace(/[^a-zA-Z0-9]/g, "")
		.slice(0, 8);
	const salt = Math.random().toString(36).slice(2, 6);
	return `${base}-${salt}`.toLowerCase();
}
