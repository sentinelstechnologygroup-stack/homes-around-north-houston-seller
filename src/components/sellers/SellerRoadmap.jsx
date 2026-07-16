import AnimatedSection from "@/components/sellers/AnimatedSection";
import MagneticButton from "@/components/sellers/MagneticButton";
import { scrollToSellerForm } from "@/components/sellers/scrollUtils";
import { Search, Target, Hammer, Rocket, FileCheck, KeyRound } from "lucide-react";

const steps = [
  { icon: Search, title: "Home Review", copy: "We review the property, location, condition, upgrades, neighborhood, and current competing listings." },
  { icon: Target, title: "Price Positioning", copy: "We build a pricing strategy around market evidence, buyer behavior, competition, and your goals." },
  { icon: Hammer, title: "Pre-Listing Preparation", copy: "We identify what should be cleaned, repaired, improved, simplified, or left alone." },
  { icon: Rocket, title: "Launch Strategy", copy: "The home is prepared for photography, listing presentation, online exposure, and buyer attention." },
  { icon: FileCheck, title: "Offer Review", copy: "We compare purchase price, financing, contingencies, timelines, concessions, and buyer strength." },
  { icon: KeyRound, title: "Closing Coordination", copy: "We help keep inspections, appraisal, title, deadlines, communication, and final closing steps organized." },
];

export default function SellerRoadmap() {
  return (
    <section id="roadmap" className="relative overflow-hidden bg-gradient-to-b from-sand-soft to-white py-20 md:py-28">
      <div className="absolute top-1/3 -left-24 w-96 h-96 bg-amber-burnished/5 rounded-full blur-3xl" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-amber-burnished/10 text-amber-burnished font-semibold tracking-[0.2em] uppercase text-xs mb-5 px-4 py-1.5 rounded-full">
            Step by Step
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-slate-midnight leading-[1.15] mb-5">
            Your Seller Roadmap
          </h2>
          <p className="text-pewter-cool text-lg leading-relaxed">
            A clear process helps remove uncertainty before your home ever reaches the market.
          </p>
        </AnimatedSection>

        {/* Connected timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Connecting line — desktop */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-burnished/30 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-x-8 lg:gap-y-14">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="relative">
                  {/* Step node */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-amber-burnished to-amber-700 flex items-center justify-center shadow-lg shadow-amber-burnished/30 flex-shrink-0">
                      <step.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-heading text-4xl md:text-5xl text-amber-burnished/25 leading-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  {/* Card */}
                  <div className="bg-gradient-to-br from-white to-sand-soft/40 rounded-2xl p-6 shadow-lg shadow-amber-burnished/5 border border-amber-burnished/10 hover:shadow-xl hover:border-amber-burnished/20 transition-all duration-300">
                    <h3 className="font-heading text-xl text-slate-midnight mb-2.5">{step.title}</h3>
                    <p className="text-pewter-cool text-sm leading-relaxed">{step.copy}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        <AnimatedSection delay={150} className="text-center mt-14">
          <MagneticButton onClick={() => scrollToSellerForm()}>
            Build My Seller Plan
          </MagneticButton>
        </AnimatedSection>
      </div>
    </section>
  );
}