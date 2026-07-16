import AnimatedSection from "@/components/sellers/AnimatedSection";
import MagneticButton from "@/components/sellers/MagneticButton";
import VideoPlayer from "@/components/sellers/VideoPlayer";
import { Calendar, TrendingUp } from "lucide-react";

export default function HeroSection() {
  const scrollToForm = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sand-soft via-white to-amber-burnished/5">
      {/* Warm decorative blobs */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-amber-burnished/8 to-transparent rounded-bl-[120px] -z-10" />
      <div className="absolute top-20 -left-20 w-72 h-72 bg-amber-burnished/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-amber-200/10 rounded-full blur-3xl -z-10" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 pt-12 md:pt-20 pb-8">
        {/* Header text */}
        <AnimatedSection className="text-center max-w-4xl mx-auto mb-12 md:mb-16">
          <span className="inline-block bg-amber-burnished/10 text-amber-burnished font-semibold tracking-widest uppercase text-sm mb-4 px-4 py-1.5 rounded-full">
            Homes Around North Houston
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl text-slate-midnight leading-[1.1] mb-6">
            Sell Your Home <span className="text-amber-burnished">FAST</span>
          </h1>
          <p className="text-pewter-cool text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">

          </p>
        </AnimatedSection>

        {/* Video with floating metadata */}
        <AnimatedSection delay={200} className="relative max-w-5xl mx-auto mb-10">
          <div className="flex items-stretch gap-0">
            {/* Left metadata */}
            <div className="hidden lg:flex flex-col justify-center items-end pr-8 w-48 space-y-6">
              <MetaLabel text="Seller Pain Points" index="01" />
              <MetaLabel text="Why Choose Us" index="02" />
            </div>

            {/* Video player */}
            <div className="flex-1">
              <VideoPlayer />
            </div>

            {/* Right metadata */}
            <div className="hidden lg:flex flex-col justify-center items-start pl-8 w-48 space-y-6">
              <MetaLabel text="Our Strategy" index="03" align="left" />
              <MetaLabel text="Your Results" index="04" align="left" />
            </div>
          </div>

          {/* Mobile metadata below video */}
          <div className="flex lg:hidden justify-center gap-6 mt-6 flex-wrap">
            {["Seller Pain Points", "Why Choose Us", "Our Strategy", "Your Results"].map((t, i) => (
              <span key={i} className="text-xs text-pewter-cool font-medium tracking-wider uppercase">
                <span className="text-amber-burnished mr-1">0{i + 1}</span> {t}
              </span>
            ))}
          </div>
        </AnimatedSection>

        {/* CTA buttons */}
        <AnimatedSection delay={400} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <MagneticButton onClick={scrollToForm}>
            <Calendar className="w-5 h-5 mr-2" />
            Schedule a Seller Consultation
          </MagneticButton>
          <MagneticButton variant="secondary" onClick={scrollToForm}>
            <TrendingUp className="w-5 h-5 mr-2" />
            Get My Home Value
          </MagneticButton>
        </AnimatedSection>
      </div>

      {/* Horizon line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-burnished/30 to-transparent" />
    </section>
  );
}

function MetaLabel({ text, index, align = "right" }) {
  return (
    <div className={`text-${align}`}>
      <span className="block font-heading text-3xl text-amber-burnished/20 leading-none">{index}</span>
      <span className="block text-xs text-pewter-cool tracking-wider uppercase font-medium mt-1">{text}</span>
    </div>
  );
}