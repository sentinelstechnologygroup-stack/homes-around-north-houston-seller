import SellerHero from "@/components/sellers/SellerHero";
import SellerVideoSection from "@/components/sellers/SellerVideoSection";
import SellerStrategyCall from "@/components/sellers/SellerStrategyCall";
import SellerChallenges from "@/components/sellers/SellerChallenges";
import WhySellersChooseUs from "@/components/sellers/WhySellersChooseUs";
import SellerRoadmap from "@/components/sellers/SellerRoadmap";
import NorthHoustonMarket from "@/components/sellers/NorthHoustonMarket";
import SellerConfidence from "@/components/sellers/SellerConfidence";
import FinalCTA from "@/components/sellers/FinalCTA";
import SellerFooter from "@/components/sellers/SellerFooter";
import StickyMobileCTA from "@/components/sellers/StickyMobileCTA";

export default function Sellers() {
  return (
    <div className="min-h-screen bg-white">
      <div id="hero">
        <SellerHero />
      </div>
      <SellerVideoSection />
      <SellerStrategyCall />
      <SellerChallenges />
      <WhySellersChooseUs />
      <SellerRoadmap />
      <NorthHoustonMarket />
      <SellerConfidence />
      <FinalCTA />
      <SellerFooter />
      <StickyMobileCTA />
    </div>
  );
}