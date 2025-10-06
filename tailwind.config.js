/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ["class"],
	content: ["./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				rp: {
					bg: "#06070A",
					card: "#0B0D13",
					primary: "#8B5CF6",
					primaryDim: "#6D28D9",
					accent: "#22D3EE",
					text: "#E5E7EB",
					sub: "#9CA3AF",
					ring: "#3B82F6",
				},
			},
			boxShadow: {
				glow: "0 0 24px rgba(139,92,246,.20)",
			},
			backgroundImage: {
				hero: "radial-gradient(800px 320px at 65% -40%, rgba(139,92,246,.22), transparent 60%), radial-gradient(720px 300px at 20% -35%, rgba(34,211,238,.12), transparent 55%)",
			},
			container: { center: true, padding: "1.25rem" },
		},
	},
	plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
