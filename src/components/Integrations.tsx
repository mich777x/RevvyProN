import Image from "next/image";
export default function Integrations() {
	return (
		<section className="py-16">
			<div className="max-w-4xl mx-auto text-center">
				<h2 className="text-xl font-semibold mb-6">Works with your favorite ad platforms</h2>
				<div className="flex justify-center gap-10 grayscale opacity-80">
					<Image src="/logos/facebook.png" alt="Facebook Ads" className="h-10" />
					<Image src="/logos/google.png" alt="Google Ads" className="h-10" />
					<Image src="/logos/tiktok.png" alt="TikTok Ads" className="h-10" />
				</div>
			</div>
		</section>
	);
}
