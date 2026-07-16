import AnimatedSection from "@/components/sellers/AnimatedSection";
import ContactForm from "@/components/sellers/ContactForm";
import { Check } from "lucide-react";

const items = [
  "Discuss your selling timeline",
  "Review your property and location",
  "Identify possible preparation priorities",
  "Talk through pricing and market conditions",
  "Understand what the next step may look like",
];

export default function SellerConsultation() {
  return (
    <section id="contact-form" className="relative overflow-hidden bg-gradient-to-b from-white to-sand-soft/60 py-20 md:py-28">
      <div className="absolute top-10 left-10 w-72 h-72 bg-amber-burnished/5 rounded-full blur-3xl" />
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 max-w-6xl mx-auto rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-midnight/10 border border-amber-burnished/10">
          {/* LEFT content area */}
          <div className="lg:col-span-2 bg-gradient-to-br from-slate-midnight to-slate-800 p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-amber-burnished/10 rounded-full blur-3xl" />
            <div className="relative">
              <span className="inline-block bg-amber-burnished/15 text-amber-burnished font-semibold tracking-[0.2em] uppercase text-[11px] mb-5 px-4 py-1.5 rounded-full">
                Complimentary Seller Conversation
              </span>
              <h2 className="font-heading text-3xl md:text-4xl leading-[1.12] mb-5">
                Start With a Simple Seller Conversation
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-8">
                Tell us where you are in the process. We will help you understand your options,
                potential market position, and practical next steps before you make a decision.
              </p>
              <ul className="space-y-3.5 mb-8">
                {items.map((it, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-amber-burnished/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-amber-burnished" />
                    </span>
                    <span className="text-white/85 text-base leading-relaxed">{it}</span>
                  </li>
                ))}
              </ul>
              <p className="text-white/55 text-sm italic border-l-2 border-amber-burnished/40 pl-4">
                You do not need to be ready to list today. This is simply a place to start.
              </p>
            </div>
          </div>

          {/* RIGHT form area */}
          <div className="lg:col-span-3 bg-white p-6 md:p-10">
            <AnimatedSection>
              <ContactForm id="contact-form-inner" />
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}