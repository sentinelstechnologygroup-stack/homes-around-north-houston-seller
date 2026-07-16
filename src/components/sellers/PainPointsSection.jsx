import AnimatedSection from "@/components/sellers/AnimatedSection";
import { DollarSign, Wrench, PiggyBank, CalendarCheck, ShieldCheck } from "lucide-react";

const painPoints = [
  {
    icon: DollarSign,
    question: "What is my home really worth?",
    answer: "We provide a detailed market analysis based on current local data, not just online estimates.",
  },
  {
    icon: Wrench,
    question: "Should I repair or update before listing?",
    answer: "We identify what matters to buyers and what may not be worth spending money on before you list.",
  },
  {
    icon: PiggyBank,
    question: "How do I avoid leaving money on the table?",
    answer: "Strategic pricing and strong marketing position your home to attract competitive offers.",
  },
  {
    icon: CalendarCheck,
    question: "How do I handle showings, negotiations, and deadlines?",
    answer: "We coordinate every step from scheduling to closing so you can focus on your next move.",
  },
  {
    icon: ShieldCheck,
    question: "How do I know if an offer is actually strong?",
    answer: "We help you evaluate terms, contingencies, timelines, and buyer qualifications — not just the price.",
  },
];

export default function PainPointsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sand-soft to-amber-burnished/5 py-20 md:py-28">
      <div className="absolute top-20 left-10 w-80 h-80 bg-amber-burnished/5 rounded-full blur-3xl" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-amber-burnished font-semibold tracking-widest uppercase text-sm mb-4">
            We Understand
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-slate-midnight leading-[1.15] mb-4">
            Selling a Home Can Feel Overwhelming
          </h2>
          <p className="text-pewter-cool text-lg">
            These are the questions most sellers are thinking about — and the ones we help answer every day.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {painPoints.map((point, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="pain-card perspective-[1000px] h-64 cursor-pointer">
                <div className="pain-card-inner relative w-full h-full">
                  {/* Front */}
                  <div className="pain-card-front absolute inset-0 bg-gradient-to-br from-white to-sand-soft rounded-3xl p-8 shadow-lg shadow-amber-burnished/5 flex flex-col items-start justify-between border border-amber-burnished/10">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-burnished to-amber-700 flex items-center justify-center shadow-md shadow-amber-burnished/20">
                      <point.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-heading text-xl text-slate-midnight leading-snug">{point.question}</p>
                    <span className="text-xs text-amber-burnished/60 tracking-wider uppercase font-medium">Hover to learn more</span>
                  </div>
                  {/* Back */}
                  <div className="pain-card-back absolute inset-0 bg-gradient-to-br from-slate-midnight to-slate-800 rounded-3xl p-8 shadow-lg flex flex-col items-start justify-center">
                    <point.icon className="w-6 h-6 text-amber-burnished mb-4" />
                    <p className="text-white/90 text-base leading-relaxed">{point.answer}</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}