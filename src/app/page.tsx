import HeroCinematic from "@/components/HeroCinematic";
import LiveProofStrip from "@/components/LiveProofStrip";
import CredibilityRibbon from "@/components/CredibilityRibbon";
import AffiliateEarnings from "@/components/AffiliateEarnings";

import PricingSection from "@/components/PricingSection";
import StartModal from "@/components/StartModal";
import PricingCompare from "@/components/PricingCompare";
import PricingFAQ from "@/components/PricingFAQ";
import StickyCTA from "@/components/StickyCTA";

export default function Page() {
	return (
		<main className="min-h-screen bg-[#06070A] text-white antialiased overflow-x-hidden">
			{/* Hero + Core Funnel */}
			<HeroCinematic />
			<PricingSection />
			<LiveProofStrip />

			{/* Core Conversion Stack */}
			<StartModal />
			<PricingCompare />
			<PricingFAQ />
			<StickyCTA />

			{/* Credibility + Social Proof */}
			<CredibilityRibbon />
			<AffiliateEarnings />
		</main>
	);
}
