export default function Testimonials() {
	return (
		<section className="py-20 bg-gray-50">
			<div className="max-w-5xl mx-auto text-center">
				<h2 className="text-3xl font-bold mb-10">What early users say</h2>
				<div className="grid md:grid-cols-3 gap-8">
					<div className="p-6 bg-white rounded-xl shadow">
						<p>Revvy Pro cut our ad costs in half within 2 weeks.</p>
						<h3 className="mt-4 font-semibold">- Beta User 1</h3>
					</div>
					<div className="p-6 bg-white rounded-xl shadow">
						<p>We saved 20+ hours/week with AI-generated creatives.</p>
						<h3 className="mt-4 font-semibold">- Beta User 2</h3>
					</div>
					<div className="p-6 bg-white rounded-xl shadow">
						<p>Best $499 we've spent — CTR doubled instantly.</p>
						<h3 className="mt-4 font-semibold">- Beta User 3</h3>
					</div>
				</div>
			</div>
		</section>
	);
}
