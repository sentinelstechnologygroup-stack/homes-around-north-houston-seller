import { useCallback, useEffect, useState } from "react";
import SellerHero from "@/components/sellers/SellerHero";
import SellerVideoSection from "@/components/sellers/SellerVideoSection";
import SellerChallenges from "@/components/sellers/SellerChallenges";
import WhySellersChooseUs from "@/components/sellers/WhySellersChooseUs";
import SellerRoadmap from "@/components/sellers/SellerRoadmap";
import NorthHoustonMarket from "@/components/sellers/NorthHoustonMarket";
import SellerConfidence from "@/components/sellers/SellerConfidence";
import FinalCTA from "@/components/sellers/FinalCTA";
import SellerFooter from "@/components/sellers/SellerFooter";
import StickyMobileCTA from "@/components/sellers/StickyMobileCTA";
import SellerLeadModal from "@/components/sellers/SellerLeadModal";
import AdditionalServicesModal from "@/components/sellers/AdditionalServicesModal";

export default function Sellers() {
  const [sellerModalOpen, setSellerModalOpen] = useState(false);
  const [requestHomeValue, setRequestHomeValue] = useState(false);
  const [servicesModalOpen, setServicesModalOpen] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);

  const openSellerModal = useCallback((checkHomeValue = false) => {
    setRequestHomeValue(Boolean(checkHomeValue));
    setSellerModalOpen(true);
  }, []);

  useEffect(() => {
    const handleOpenSellerModal = (event) => {
      openSellerModal(event.detail?.checkHomeValue);
    };

    window.addEventListener(
      "open-seller-consultation",
      handleOpenSellerModal,
    );

    return () => {
      window.removeEventListener(
        "open-seller-consultation",
        handleOpenSellerModal,
      );
    };
  }, [openSellerModal]);

  const handleLeadSubmitted = (lead) => {
    setSubmittedLead(lead);
    setSellerModalOpen(false);

    window.setTimeout(() => {
      setServicesModalOpen(true);
    }, 180);
  };

  return (
    <div className="min-h-screen bg-white">
      <div id="hero">
        <SellerHero />
      </div>

      <SellerVideoSection />
      <SellerChallenges />
      <WhySellersChooseUs />
      <SellerRoadmap />
      <NorthHoustonMarket />
      <SellerConfidence />
      <FinalCTA />
      <SellerFooter />
      <StickyMobileCTA />

      <SellerLeadModal
        open={sellerModalOpen}
        requestHomeValue={requestHomeValue}
        onClose={() => setSellerModalOpen(false)}
        onSubmitted={handleLeadSubmitted}
      />

      <AdditionalServicesModal
        open={servicesModalOpen}
        lead={submittedLead}
        onClose={() => setServicesModalOpen(false)}
      />
    </div>
  );
}
