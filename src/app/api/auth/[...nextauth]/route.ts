import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

// Extend the built-in session types
declare module "next-auth" {
	interface Session {
		plan?: string | null;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		plan?: string | null;
	}
}

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
		async jwt({ token }: { token: JWT }) {
			// add any custom fields here later (e.g., plan from DB)
			return token;
		},
		async session({ session, token }: { session: Session; token: JWT }) {
			// expose fields from token into session if needed
			session.plan = token.plan ?? null;
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
