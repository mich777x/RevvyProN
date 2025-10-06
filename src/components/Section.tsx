export function Section({ id, title, subtitle, children }: { id?: string; title: string; subtitle?: string; children: React.ReactNode }) {
	return (
		<section id={id} className="container py-20 md:py-28">
			<div className="max-w-2xl">
				<h2 className="h2">{title}</h2>
				{subtitle && <p className="mt-3 text-rp-sub">{subtitle}</p>}
			</div>
			<div className="mt-8 md:mt-10">{children}</div>
		</section>
	);
}
