import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const handler = NextAuth({
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	session: { strategy: "jwt" },
	pages: {}, // using App Router pages
	callbacks: {
		async jwt({ token }) {
			// add any custom fields here later (e.g., plan from DB)
			return token;
		},
		async session({ session, token }) {
			// expose fields from token into session if needed
			(session as any).plan = (token as any).plan ?? null;
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
