import AnimatedSection from "@/components/sellers/AnimatedSection";
import SellerStrategyForm from "@/components/sellers/SellerStrategyForm";

export default function SellerStrategyCall() {
  return (
    <section id="seller-strategy-call" className="relative overflow-hidden bg-slate-midnight py-20 md:py-28">
      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[42rem] h-80 bg-amber-burnished/8 rounded-full blur-3xl" />

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
        <AnimatedSection className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block bg-amber-burnished/15 text-amber-burnished font-semibold tracking-[0.2em] uppercase text-xs mb-5 px-4 py-1.5 rounded-full">
            Get Started
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15] mb-5">
            Schedule Your <span className="text-amber-burnished">Seller Strategy Call</span>
          </h2>
          <p className="text-white/65 text-lg leading-relaxed">
            Tell us about your home, your timeline, and what you want to accomplish. We will use this
            information to prepare for a more useful seller conversation.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={150} className="max-w-[800px] mx-auto">
          <SellerStrategyForm />
        </AnimatedSection>
      </div>
    </section>
  );
}