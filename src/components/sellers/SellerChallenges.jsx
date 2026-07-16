import AnimatedSection from "@/components/sellers/AnimatedSection";
import { DollarSign, Wrench, ImageIcon, Scale, Clock } from "lucide-react";

const challenges = [
  { icon: DollarSign, title: "Pricing Uncertainty", copy: "You do not want to underprice your home or chase the market with a price buyers ignore." },
  { icon: Wrench, title: "Preparation Questions", copy: "Some updates help. Others waste time and money. The goal is to focus on what buyers are most likely to notice." },
  { icon: ImageIcon, title: "Weak Presentation", copy: "A home needs more than a sign, a few photos, and a listing upload to compete for serious buyer attention." },
  { icon: Scale, title: "Offer Confusion", copy: "The highest offer is not always the strongest. Financing, contingencies, timelines, and buyer risk all matter." },
  { icon: Clock, title: "Timeline Pressure", copy: "Selling affects your move, your finances, and your next step. The strategy should fit your actual life." },
];

export default function SellerChallenges() {
  return (
    <section id="challenges" className="relative overflow-hidden bg-gradient-to-b from-white to-sand-soft/40 py-20 md:py-28">
      <div className="absolute top-24 right-0 w-80 h-80 bg-amber-burnished/5 rounded-full blur-3xl" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-amber-burnished/10 text-amber-burnished font-semibold tracking-[0.2em] uppercase text-xs mb-5 px-4 py-1.5 rounded-full">
            Seller Challenges
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-slate-midnight leading-[1.15] mb-5">
            Most Sellers Do Not Need More Guesswork
          </h2>
          <p className="text-pewter-cool text-lg leading-relaxed">
            Before you list, you deserve clear answers. What is your home worth? What should you fix?
            How should you price it? What happens when an offer arrives?
          </p>
        </AnimatedSection>

        {/* Staggered asymmetric grid on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {challenges.map((c, i) => {
            const offset = i % 2 === 1 ? "md:mt-10" : "";
            const span = i === 4 ? "lg:col-span-1 lg:col-start-2" : "";
            return (
              <AnimatedSection key={i} delay={i * 100} className={`${offset} ${span}`}>
                <div className="group h-full bg-gradient-to-br from-white to-sand-soft/40 rounded-2xl p-7 shadow-lg shadow-amber-burnished/5 border border-amber-burnished/10 hover:border-amber-burnished/25 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-burnished to-amber-700 flex items-center justify-center shadow-md shadow-amber-burnished/25 mb-5">
                    <c.icon className="w-6 h-6 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-heading text-xl text-slate-midnight mb-2.5 leading-snug">{c.title}</h3>
                  <p className="text-pewter-cool text-sm leading-relaxed">{c.copy}</p>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection delay={200} className="text-center mt-14">
          <p className="font-heading text-2xl md:text-3xl text-slate-midnight max-w-3xl mx-auto leading-snug">
            The right strategy replaces uncertainty with a clear sequence of decisions.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}