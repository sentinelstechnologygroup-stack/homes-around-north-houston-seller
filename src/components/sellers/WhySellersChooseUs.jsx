import AnimatedSection from "@/components/sellers/AnimatedSection";
import { MapPin, Target, Camera, Handshake, MessageSquare, Check, Quote } from "lucide-react";

const features = [
  { icon: MapPin, title: "Local Market Perspective", copy: "North Houston is not one market. Buyer activity can vary by neighborhood, school zone, acreage, commute access, new construction competition, condition, and price range." },
  { icon: Target, title: "Thoughtful Pricing Strategy", copy: "We look beyond automated estimates and evaluate relevant sales, current competition, property condition, buyer demand, and timing." },
  { icon: Camera, title: "Stronger Presentation", copy: "Photography, listing copy, preparation, and buyer positioning should work together to make the home easier to understand and remember." },
  { icon: Handshake, title: "Offer and Negotiation Guidance", copy: "We help sellers compare price, terms, financing, contingencies, timelines, and overall transaction risk." },
  { icon: MessageSquare, title: "Clear Communication", copy: "Sellers should understand what is happening, what requires a decision, and what comes next." },
];

const HOME_IMAGE = "https://media.base44.com/images/public/6a46a1b06959ba89ed68344c/289820b17_generated_4759153d.png";
const DETAIL_IMAGE = "https://media.base44.com/images/public/6a46a1b06959ba89ed68344c/a893b73d2_generated_0311e014.png";

const checklist = [
  "Pricing strategy",
  "Preparation plan",
  "Launch presentation",
  "Offer review",
];

export default function WhySellersChooseUs() {
  return (
    <section id="why-us" className="relative overflow-hidden bg-slate-midnight py-20 md:py-28">
      {/* Decorative warm glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-amber-burnished/8 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-amber-700/8 rounded-full blur-3xl" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative">
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-amber-burnished/15 text-amber-burnished font-semibold tracking-[0.2em] uppercase text-xs mb-5 px-4 py-1.5 rounded-full">
            Local Strategy. Personal Guidance.
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15] mb-5">
            Built for Sellers Who Want a Smarter Listing Strategy
          </h2>
          <p className="text-white/65 text-lg leading-relaxed">
            Homes Around North Houston helps homeowners understand the market, position their property
            thoughtfully, and move through the selling process with confidence. The goal is not simply to
            put a home online. The goal is to prepare it, price it, present it, negotiate it, and close it
            with a clear plan.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* LEFT — features */}
          <div className="space-y-5">
            {features.map((f, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-amber-burnished/30 transition-colors duration-300 group">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-burnished to-amber-700 flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-burnished/20">
                    <f.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-base mb-1.5">{f.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{f.copy}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* RIGHT — layered visual */}
          <AnimatedSection delay={150}>
            <div className="relative">
              {/* Primary image */}
              <div className="rounded-[1.75rem] overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
                <img
                  src={HOME_IMAGE}
                  alt="North Houston home interior prepared for a professional listing presentation"
                  className="w-full h-72 md:h-80 object-cover"
                  loading="lazy"
                />
              </div>

              {/* Smaller detail image */}
              <div className="absolute -bottom-8 -left-4 md:-left-8 w-40 md:w-48 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border-4 border-slate-midnight hidden sm:block">
                <img
                  src={DETAIL_IMAGE}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-28 md:h-32 object-cover"
                  loading="lazy"
                />
              </div>

              {/* Floating Seller Plan checklist */}
              <div className="absolute -top-6 -right-3 md:-right-6 bg-white rounded-2xl shadow-2xl p-5 w-44">
                <p className="text-amber-burnished text-[11px] tracking-[0.2em] uppercase font-semibold mb-3">
                  Seller Plan
                </p>
                <ul className="space-y-2">
                  {checklist.map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-amber-burnished flex-shrink-0" />
                      <span className="text-slate-midnight text-xs font-medium">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Highlighted quote-style statement */}
        <AnimatedSection delay={200} className="max-w-4xl mx-auto mt-16">
          <div className="relative bg-gradient-to-br from-amber-burnished/10 to-transparent rounded-2xl p-8 md:p-10 border border-amber-burnished/20">
            <Quote className="w-8 h-8 text-amber-burnished/40 mb-4" />
            <p className="font-heading text-2xl md:text-3xl text-white leading-snug">
              Your home should not enter the market without a clear reason behind its price,
              presentation, and launch strategy.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}