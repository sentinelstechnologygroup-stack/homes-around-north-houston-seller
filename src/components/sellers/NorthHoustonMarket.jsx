import AnimatedSection from "@/components/sellers/AnimatedSection";
import { MapPin, Layers, Clock } from "lucide-react";

const areas = [
  "Magnolia", "Tomball", "The Woodlands", "Spring", "Cypress",
  "Conroe", "Montgomery", "Hockley", "North Houston",
];

const cards = [
  { icon: Layers, title: "Neighborhood Competition", copy: "Your home is competing with nearby resale properties and, in some areas, new construction incentives." },
  { icon: MapPin, title: "Property-Specific Value", copy: "Acreage, lot position, updates, condition, layout, neighborhood, and buyer demand can affect value differently." },
  { icon: Clock, title: "Timing and Buyer Activity", copy: "Market conditions can change. The listing strategy should reflect what buyers are doing now, not only what happened months ago." },
];

const LAWN_IMAGE = "https://media.base44.com/images/public/6a46a1b06959ba89ed68344c/a893b73d2_generated_0311e014.png";

export default function NorthHoustonMarket() {
  return (
    <section id="local-market" className="relative overflow-hidden bg-gradient-to-b from-white via-sand-soft/50 to-white py-20 md:py-28">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-burnished/5 rounded-full blur-3xl" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto mb-14">
          {/* Left — text */}
          <AnimatedSection>
            <span className="inline-block bg-amber-burnished/10 text-amber-burnished font-semibold tracking-[0.2em] uppercase text-xs mb-5 px-4 py-1.5 rounded-full">
              Local Market Knowledge
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-slate-midnight leading-[1.15] mb-5">
              Selling in North Houston Requires More Than a General Estimate
            </h2>
            <p className="text-pewter-cool text-lg leading-relaxed mb-8">
              Buyer demand can shift from one community to the next. Neighborhood condition, school zones,
              acreage, commute access, flood considerations, available inventory, new construction, property
              type, and price range can all influence how a home should be positioned.
            </p>

            {/* Service-area chips */}
            <div className="flex flex-wrap gap-2.5">
              {areas.map((a, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 bg-white border border-amber-burnished/20 text-slate-midnight text-sm font-medium px-4 py-2 rounded-full shadow-sm hover:border-amber-burnished/40 hover:shadow transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-amber-burnished" />
                  {a}
                </span>
              ))}
            </div>
          </AnimatedSection>

          {/* Right — abstract community grid visual */}
          <AnimatedSection delay={150}>
            <div className="relative rounded-[1.75rem] overflow-hidden shadow-2xl shadow-slate-midnight/15 border border-amber-burnished/15">
              <img
                src={LAWN_IMAGE}
                alt="A well-manicured North Houston neighborhood property"
                className="w-full h-72 md:h-80 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-midnight/40 to-transparent" />
              {/* Abstract map line overlay */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage:
                  "linear-gradient(rgba(180,83,9,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(180,83,9,0.6) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }} />
              <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2.5 shadow-lg">
                <p className="text-amber-burnished text-[11px] tracking-[0.2em] uppercase font-semibold">Service Area</p>
                <p className="text-slate-midnight font-heading text-lg leading-none mt-0.5">North Houston Communities</p>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Local market cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cards.map((c, i) => (
            <AnimatedSection key={i} delay={i * 100}>
              <div className="h-full bg-gradient-to-br from-white to-sand-soft/40 rounded-2xl p-7 shadow-lg shadow-amber-burnished/5 border border-amber-burnished/10 hover:border-amber-burnished/25 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-burnished to-amber-700 flex items-center justify-center shadow-md shadow-amber-burnished/25 mb-5">
                  <c.icon className="w-6 h-6 text-white" strokeWidth={1.75} />
                </div>
                <h3 className="font-heading text-xl text-slate-midnight mb-2.5 leading-snug">{c.title}</h3>
                <p className="text-pewter-cool text-sm leading-relaxed">{c.copy}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}