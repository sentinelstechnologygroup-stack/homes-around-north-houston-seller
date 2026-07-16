import AnimatedSection from "@/components/sellers/AnimatedSection";
import SellerStrategyForm from "@/components/sellers/SellerStrategyForm";

export default function SellerStrategyCall() {
  return (
    <section
      id="seller-strategy-call"
      className="relative overflow-hidden bg-slate-midnight py-20 md:py-28"
    >
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-amber-burnished/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-12 lg:px-20">
        <AnimatedSection className="mx-auto mb-12 max-w-3xl text-center">
          <span className="mb-5 inline-block rounded-full bg-amber-burnished/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-burnished">
            Get Started
          </span>

          <h2 className="mb-5 font-heading text-3xl leading-[1.15] text-white md:text-4xl lg:text-5xl">
            Start Your{" "}
            <span className="text-amber-burnished">
              Seller Consultation
            </span>
          </h2>

          <p className="text-lg leading-relaxed text-white/65">
            Submit your basic property and contact information first. After
            your real-estate request is received, you may optionally select
            home-service providers you would like to contact you.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={150} className="mx-auto max-w-3xl">
          <SellerStrategyForm />
        </AnimatedSection>
      </div>
    </section>
  );
}