import AnimatedSection from "@/components/sellers/AnimatedSection";
import { Check } from "lucide-react";

const TRUST_IMAGE = "https://media.base44.com/images/public/6a46a1b06959ba89ed68344c/a893b73d2_generated_0311e014.png";

const bullets = [
  "Know your likely market value",
  "Understand your estimated seller costs",
  "Review possible net proceeds",
  "Prepare for buyer questions",
  "Avoid unnecessary delays",
  "Make confident decisions",
];

export default function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-burnished/5 via-white to-sand-soft/50 py-20 md:py-28">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-burnished/5 rounded-full blur-3xl" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Left: Image */}
          <AnimatedSection>
            <div className="rounded-3xl overflow-hidden shadow-2xl shadow-amber-burnished/15 ring-4 ring-amber-burnished/5">
              <img
                src={TRUST_IMAGE}
                alt="View through a window onto a well-manicured Texas lawn, symbolizing clarity and new beginnings"
                className="w-full h-auto object-cover"
              />
            </div>
          </AnimatedSection>

          {/* Right: Content */}
          <AnimatedSection delay={150}>
            <p className="text-amber-burnished font-semibold tracking-widest uppercase text-sm mb-4">
              Before You List
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-slate-midnight leading-[1.15] mb-6">
              A Clear Plan Before You List
            </h2>
            <p className="text-pewter-cool text-lg leading-relaxed mb-8">
              Before your home ever goes live, we help you understand your numbers, your options, and the steps ahead. You should never feel like you are guessing your way through one of the biggest financial decisions you will make.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bullets.map((b, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/60 rounded-xl px-3 py-2 border border-amber-burnished/10">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-burnished to-amber-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-slate-midnight text-sm font-medium">{b}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}