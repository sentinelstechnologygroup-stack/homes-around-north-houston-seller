import AnimatedSection from "@/components/sellers/AnimatedSection";
import VideoPlayer from "@/components/sellers/VideoPlayer";
import MagneticButton from "@/components/sellers/MagneticButton";
import { scrollToSellerForm } from "@/components/sellers/scrollUtils";
import { MessageCircle } from "lucide-react";

const points = [
  "Common seller pain points",
  "How pricing affects buyer activity",
  "Which repairs and updates may matter",
  "How a listing should be prepared and marketed",
  "How to evaluate offers beyond the purchase price",
  "Why local market knowledge matters",
];

export default function SellerVideoSection() {
  return (
    <section id="seller-video" className="relative overflow-hidden bg-gradient-to-b from-sand-soft to-white py-20 md:py-28">
      <div className="absolute top-1/3 -right-24 w-96 h-96 bg-amber-burnished/5 rounded-full blur-3xl" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block bg-amber-burnished/10 text-amber-burnished font-semibold tracking-[0.2em] uppercase text-xs mb-5 px-4 py-1.5 rounded-full">
            Start Here
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-slate-midnight leading-[1.15] mb-5">
            Start With the Seller Strategy Video
          </h2>
          <p className="text-pewter-cool text-lg leading-relaxed">
            Before deciding when to list, what to repair, or how to price your home, take a few minutes
            to understand the decisions that can shape your selling experience.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* Video column */}
          <AnimatedSection className="lg:col-span-3">
            <div className="rounded-[1.75rem] overflow-hidden border border-amber-burnished/15 shadow-2xl shadow-slate-midnight/15 bg-slate-midnight">
              <VideoPlayer />
            </div>
          </AnimatedSection>

          {/* Content column */}
          <AnimatedSection delay={150} className="lg:col-span-2">
            <h3 className="font-heading text-2xl md:text-3xl text-slate-midnight mb-6">
              What This Video Covers
            </h3>
            <ul className="space-y-3.5 mb-7">
              {points.map((p, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full bg-amber-burnished flex-shrink-0" />
                  <span className="text-slate-midnight text-base leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>

            <div className="relative bg-gradient-to-br from-amber-burnished/10 to-sand-soft rounded-2xl p-6 border border-amber-burnished/15 mb-7">
              <p className="font-heading text-xl md:text-2xl text-slate-midnight leading-snug">
                A successful sale starts before the property ever reaches the market.
              </p>
            </div>

            <MagneticButton onClick={() => scrollToSellerForm()}>
              <MessageCircle className="w-5 h-5 mr-2" />
              Talk With Us About Selling
            </MagneticButton>
          </AnimatedSection>
        </div>
      </div>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-burnished/30 to-transparent" />
    </section>
  );
}