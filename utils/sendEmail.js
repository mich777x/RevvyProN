// utils/sendEmail.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcome(email) {
	await resend.emails.send({
		from: "RevvyPro AI <tron@revvyproai.com>",
		to: email,
		subject: "Welcome to RevvyPro AI 🚀",
		html: `<h2>You're In!</h2><p>Your AI Ad Engine is ready to run.</p>`,
	});
}

export async function sendRefundEmail(paymentId) {
	await resend.emails.send({
		from: "RevvyPro AI <tron@revvyproai.com>",
		to: "support@revvyproai.com",
		subject: `Refund processed for Payment ID: ${paymentId}`,
		html: `<p>A refund has been successfully completed.</p>`,
	});
}
