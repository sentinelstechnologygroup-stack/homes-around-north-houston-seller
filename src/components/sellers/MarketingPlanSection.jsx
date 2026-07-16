import { useEffect, useRef, useState } from "react";
import AnimatedSection from "@/components/sellers/AnimatedSection";
import { Search, Target, Hammer, Camera, Handshake, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Home Value Review",
    desc: "We review your home, neighborhood, condition, upgrades, and current market activity.",
  },
  {
    icon: Target,
    title: "Pricing Strategy",
    desc: "We help position your home competitively without guessing or underpricing.",
  },
  {
    icon: Hammer,
    title: "Preparation Guidance",
    desc: "We identify what matters before listing and what may not be worth spending money on.",
  },
  {
    icon: Camera,
    title: "Professional Listing Presentation",
    desc: "Photography, listing copy, online exposure, and buyer-focused presentation.",
  },
  {
    icon: Handshake,
    title: "Offer & Negotiation Support",
    desc: "We help you compare offers, terms, contingencies, timelines, and buyer strength.",
  },
  {
    icon: CheckCircle,
    title: "Closing Coordination",
    desc: "We help keep the process organized through inspection, appraisal, title, and closing.",
  },
];

export default function MarketingPlanSection() {
  const sectionRef = useRef(null);
  const [fill, setFill] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrolled = viewportHeight - sectionTop;
      const total = sectionHeight + viewportHeight;
      const pct = Math.min(Math.max(scrolled / total, 0), 1) * 100;
      setFill(pct);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-gradient-to-b from-sand-soft to-white py-20 md:py-28">
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-amber-burnished/5 rounded-full blur-3xl" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-amber-burnished font-semibold tracking-widest uppercase text-sm mb-4">
            Step by Step
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-slate-midnight leading-[1.15] mb-4">
            Our Seller Marketing Plan
          </h2>
          <p className="text-pewter-cool text-lg">
            A clear path from preparation to closing day.
          </p>
        </AnimatedSection>

        <div className="relative max-w-3xl mx-auto">
          {/* Central timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2">
            <div
              className="w-full bg-amber-burnished transition-all duration-100 ease-out"
              style={{ height: `${fill}%` }}
            />
          </div>

          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <AnimatedSection key={i} delay={i * 100}>
                  <div className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                    {/* Timeline node */}
                    <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-burnished to-amber-700 border-2 border-white flex items-center justify-center shadow-lg shadow-amber-burnished/30">
                        <step.icon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    {/* Content card */}
                    <div className={`ml-16 md:ml-0 md:w-[calc(50%-40px)] ${isLeft ? "md:pr-0 md:mr-auto" : "md:pl-0 md:ml-auto"}`}>
                      <div className="bg-gradient-to-br from-white to-sand-soft/40 rounded-2xl p-6 shadow-lg shadow-amber-burnished/5 border border-amber-burnished/10 hover:shadow-xl hover:border-amber-burnished/20 transition-all duration-300">
                        <span className="text-amber-burnished/40 font-heading text-4xl leading-none">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <h3 className="font-semibold text-slate-midnight text-lg mt-2 mb-2">{step.title}</h3>
                        <p className="text-pewter-cool text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}