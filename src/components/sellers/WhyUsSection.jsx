import AnimatedSection from "@/components/sellers/AnimatedSection";
import { MapPin, Target, Camera, Globe, MessageSquare, Phone } from "lucide-react";

const reasons = [
  { icon: MapPin, title: "Local North Houston Market Knowledge", desc: "We know the neighborhoods, school zones, buyer activity, and pricing patterns across the North Houston corridor." },
  { icon: Target, title: "Clear Pricing Strategy", desc: "We use real data and market trends to position your home competitively from day one." },
  { icon: Camera, title: "Strong Property Presentation", desc: "Professional photography, listing copy, and staging guidance that highlight what buyers care about." },
  { icon: Globe, title: "Online Marketing Exposure", desc: "Your listing reaches buyers through the platforms and channels where they are actively searching." },
  { icon: MessageSquare, title: "Negotiation Guidance", desc: "We help you evaluate offers, terms, and contingencies so you make informed decisions." },
  { icon: Phone, title: "Communication From Listing to Closing", desc: "You will always know what is happening and what comes next. No guessing." },
];

const WHY_US_IMAGE = "https://media.base44.com/images/public/6a46a1b06959ba89ed68344c/289820b17_generated_4759153d.png";

export default function WhyUsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-sand-soft/50 to-white py-20 md:py-28">
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-amber-burnished/5 rounded-full blur-3xl" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-amber-burnished font-semibold tracking-widest uppercase text-sm mb-4">
            The Difference
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-slate-midnight leading-[1.15]">
            Why Sellers Choose Homes Around North Houston
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Left: reason cards */}
          <div className="space-y-4">
            {reasons.map((r, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-white to-sand-soft/40 hover:from-amber-burnished/5 hover:to-amber-burnished/10 transition-colors duration-300 group border border-transparent hover:border-amber-burnished/10">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-burnished/10 to-amber-burnished/5 flex items-center justify-center flex-shrink-0 group-hover:from-amber-burnished group-hover:to-amber-700 transition-all duration-300 shadow-sm">
                    <r.icon className="w-5 h-5 text-amber-burnished group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-midnight text-base mb-1">{r.title}</h3>
                    <p className="text-pewter-cool text-sm leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Right: image */}
          <AnimatedSection delay={200}>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-slate-midnight/10">
                <img
                  src={WHY_US_IMAGE}
                  alt="High-end kitchen with market report and keys on marble countertop representing a successful home sale"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-6 -left-4 md:-left-6 bg-gradient-to-br from-amber-burnished to-amber-700 rounded-2xl shadow-xl p-5">
                <p className="text-white font-heading text-3xl leading-none">100%</p>
                <p className="text-white/80 text-xs font-semibold mt-1">Local Expertise</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}