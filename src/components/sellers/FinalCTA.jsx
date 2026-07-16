import AnimatedSection from "@/components/sellers/AnimatedSection";
import MagneticButton from "@/components/sellers/MagneticButton";
import { scrollToSellerForm } from "@/components/sellers/scrollUtils";
import { Calendar, Check, Home } from "lucide-react";

const SUNSET_IMAGE =
  "/images/final-cta.png";

const trust = [
  "Local guidance",
  "No-pressure conversation",
  "Property-specific review",
  "Clear next steps",
];

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={SUNSET_IMAGE}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-slate-midnight/85" />

        <div className="absolute inset-0 bg-gradient-to-br from-slate-midnight via-slate-midnight/70 to-amber-burnished/15" />
      </div>

      <div className="relative z-10 py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center md:px-12 lg:px-20">
          <AnimatedSection>
            <span className="mb-6 inline-block rounded-full bg-amber-burnished/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-burnished">
              Before You List
            </span>

            <h2 className="mb-6 font-heading text-3xl leading-[1.15] text-white md:text-4xl lg:text-5xl">
              Before You List, Know Your Options
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/70">
              Whether you are ready to sell soon or only beginning to think
              about it, Homes Around North Houston can help you understand your
              property&apos;s position in the current market and identify a
              practical next step.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={150}>
            <div className="mb-6 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
              <MagneticButton
                onClick={() => scrollToSellerForm()}
                className="w-full sm:w-auto"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Seller Consultation
              </MagneticButton>

              <button
                type="button"
                onClick={() =>
                  scrollToSellerForm({ checkHomeValue: true })
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white bg-white px-7 py-4 font-semibold text-slate-midnight shadow-lg transition-all duration-300 hover:border-amber-burnished hover:bg-amber-burnished hover:text-white focus:outline-none focus:ring-4 focus:ring-white/30 sm:w-auto"
              >
                <Home className="h-5 w-5" />
                Request a Home Value Review
              </button>
            </div>

            <p className="mb-10 text-base italic text-white/55">
              A better selling experience starts with a better plan.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={250}>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-8">
              {trust.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-white/70"
                >
                  <Check className="h-4 w-4 text-amber-burnished" />
                  {item}
                </span>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}