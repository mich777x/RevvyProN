"use client";
import { useEffect } from "react";

export default function useRefCapture() {
	useEffect(() => {
		if (typeof window === "undefined") return;
		const sp = new URLSearchParams(window.location.search);
		const ref = sp.get("ref");
		if (!ref) return;
		// Convert to server-tracked click (sets cookie + redirect back)
		const url = `/api/aff/ref?code=${encodeURIComponent(ref)}`;
		// Allow the page to render; fire-and-forget (no nav change)
		fetch(url, { method: "GET" }).catch(() => {});
	}, []);
}
