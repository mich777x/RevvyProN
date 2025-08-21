export default function Success() {
	return (
		<main className="mx-auto max-w-2xl px-6 py-24 text-center">
			<h1 className="text-4xl font-extrabold">✅ Payment successful — welcome!</h1>
			<p className="mt-4 text-neutral-300">Check your email for receipts. Next, create your workspace and generate your first ads.</p>
			<div className="mt-8 flex items-center justify-center gap-3">
				<a href="/dashboard" className="rounded-xl bg-fuchsia-500 text-neutral-900 font-semibold px-6 py-3 hover:bg-fuchsia-400">
					Go to Dashboard
				</a>
				<a href="/generator" className="rounded-xl border border-neutral-700 px-6 py-3 hover:border-neutral-500">
					Try the Generator
				</a>
			</div>
		</main>
	);
}
