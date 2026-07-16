import AnimatedSection from "@/components/sellers/AnimatedSection";
import { Calculator, Sparkles, Compass, Check } from "lucide-react";

const cards = [
  {
    icon: Calculator,
    title: "Clear Numbers",
    copy: "Review likely market positioning, estimated selling expenses, and possible proceeds before making major decisions.",
    points: ["Pricing considerations", "Estimated seller costs", "Potential net proceeds", "Offer comparison factors"],
  },
  {
    icon: Sparkles,
    title: "Clear Preparation",
    copy: "Understand which tasks may help the home compete and which improvements may not provide a meaningful return.",
    points: ["Repairs", "Presentation", "Decluttering", "Photography readiness"],
  },
  {
    icon: Compass,
    title: "Clear Next Steps",
    copy: "Move forward with a process that reflects your timing, priorities, comfort level, and next destination.",
    points: ["Listing timeline", "Showing preparation", "Offer decisions", "Closing coordination"],
  },
];

export default function SellerConfidence() {
  return (
    <section id="confidence" className="relative overflow-hidden bg-gradient-to-b from-sand-soft to-white py-20 md:py-28">
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-amber-burnished/5 rounded-full blur-3xl" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-amber-burnished/10 text-amber-burnished font-semibold tracking-[0.2em] uppercase text-xs mb-5 px-4 py-1.5 rounded-full">
            Seller Confidence
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-slate-midnight leading-[1.15] mb-5">
            Confidence Comes From Having a Plan
          </h2>
          <p className="text-pewter-cool text-lg leading-relaxed">
            Before your home is listed, you should understand the likely numbers, preparation priorities,
            market position, and decisions ahead.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-14">
          {cards.map((c, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="h-full bg-white rounded-2xl p-8 shadow-lg shadow-slate-midnight/5 border border-amber-burnished/10 hover:border-amber-burnished/25 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-burnished/15 to-amber-burnished/5 flex items-center justify-center mb-6">
                  <c.icon className="w-7 h-7 text-amber-burnished" strokeWidth={1.5} />
                </div>
                <h3 className="font-heading text-2xl text-slate-midnight mb-3">{c.title}</h3>
                <p className="text-pewter-cool text-sm leading-relaxed mb-5">{c.copy}</p>
                <ul className="space-y-2.5 border-t border-amber-burnished/10 pt-5">
                  {c.points.map((p, j) => (
                    <li key={j} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-amber-burnished flex-shrink-0" />
                      <span className="text-slate-midnight text-sm font-medium">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={150} className="text-center">
          <p className="font-heading text-2xl md:text-3xl text-slate-midnight max-w-3xl mx-auto leading-snug">
            A better selling experience begins with better information.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}