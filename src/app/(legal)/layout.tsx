export default function LegalLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="bg-[#06070A] text-white">
			<div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">{children}</div>
		</div>
	);
}
