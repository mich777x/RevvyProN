import { Resend } from "resend";
export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(to: string, subject: string, text: string) {
	if (!process.env.RESEND_API_KEY) return { skipped: true };
	return resend.emails.send({
		from: "RevvyPro <noreply@revvypro.ai>",
		to,
		subject,
		text,
	});
}

export const emails = {
	affiliateLinkCreated: (refCode: string, url: string) => ({
		subject: "Your RevvyPro affiliate link",
		text: `You're in! Your code: ${refCode}\nLink: ${url}\nShare and earn 50% recurring.`,
	}),
	bonusAwarded: (amount: number) => ({ subject: "You earned a weekly bonus!", text: `Congrats — a $${amount.toFixed(2)} bonus has been recorded for you.` }),
	bonusPaid: (amount: number) => ({ subject: "Your weekly bonus was paid", text: `$${amount.toFixed(2)} was paid out to your Stripe account.` }),
};
