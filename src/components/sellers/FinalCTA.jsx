import AnimatedSection from "@/components/sellers/AnimatedSection";
import MagneticButton from "@/components/sellers/MagneticButton";
import { scrollToSellerForm } from "@/components/sellers/scrollUtils";
import { Calendar, Home, Check } from "lucide-react";

const SUNSET_IMAGE = "https://media.base44.com/images/public/6a46a1b06959ba89ed68344c/7107a5d53_generated_6b270817.png";

const trust = [
  "Local guidance",
  "No-pressure conversation",
  "Property-specific review",
  "Clear next steps",
];

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        <img
          src={SUNSET_IMAGE}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-slate-midnight/85" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-midnight via-slate-midnight/70 to-amber-burnished/15" />
      </div>

      <div className="relative z-10 py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 text-center">
          <AnimatedSection>
            <span className="inline-block bg-amber-burnished/15 text-amber-burnished font-semibold tracking-[0.2em] uppercase text-xs mb-6 px-4 py-1.5 rounded-full">
              Before You List
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15] mb-6">
              Before You List, Know Your Options
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Whether you are ready to sell soon or only beginning to think about it, Homes Around North
              Houston can help you understand your property&rsquo;s position in the current market and
              identify a practical next step.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
              <MagneticButton onClick={() => scrollToSellerForm()} className="w-full sm:w-auto">
                <Calendar className="w-5 h-5 mr-2" />
                Schedule a Seller Consultation
              </MagneticButton>
              <MagneticButton
                variant="secondary"
                onClick={() => scrollToSellerForm({ checkHomeValue: true })}
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-slate-midnight"
              >
                <Home className="w-5 h-5 mr-2" />
                Request a Home Value Review
              </MagneticButton>
            </div>
            <p className="text-white/55 text-base italic mb-10">
              A better selling experience starts with a better plan.
            </p>
          </AnimatedSection>

          {/* Trust strip */}
          <AnimatedSection delay={250}>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-8">
              {trust.map((t, i) => (
                <span key={i} className="flex items-center gap-2 text-white/70 text-sm font-medium">
                  <Check className="w-4 h-4 text-amber-burnished" />
                  {t}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}