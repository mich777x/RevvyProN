export async function startCheckout(priceId: string, customerEmail?: string) {
	const r = await fetch("/api/checkout/session", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ priceId, customerEmail }),
	});
	const d = await r.json();
	if (!r.ok) throw new Error(d.error || "Failed to start checkout");
	window.location.href = d.url;
}
