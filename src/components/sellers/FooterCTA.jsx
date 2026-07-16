import AnimatedSection from "@/components/sellers/AnimatedSection";
import ContactForm from "@/components/sellers/ContactForm";
import MagneticButton from "@/components/sellers/MagneticButton";
import { ArrowUp } from "lucide-react";

const SUNSET_IMAGE = "https://media.base44.com/images/public/6a46a1b06959ba89ed68344c/7107a5d53_generated_6b270817.png";

export default function FooterCTA() {
  const scrollToTop = () => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background sunset image */}
      <div className="absolute inset-0">
        <img
          src={SUNSET_IMAGE}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-midnight/80 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 py-20 md:py-28">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">
          <AnimatedSection className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-amber-burnished font-semibold tracking-widest uppercase text-sm mb-4">
              Let's Connect
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white leading-[1.15] mb-4">
              Thinking About Selling? Let's Start With a Conversation.
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Tell us a little about your home and we'll help you understand your next best step.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={200} className="max-w-3xl mx-auto">
            <ContactForm id="footer-contact-form" variant="glass" />
          </AnimatedSection>

          <AnimatedSection delay={300} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <MagneticButton variant="secondary" onClick={scrollToTop} className="border-white text-white hover:bg-white hover:text-slate-midnight">
              Contact Us About Selling
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={scrollToTop} className="text-white/80 hover:text-white">
              Request a Home Value Review
            </MagneticButton>
          </AnimatedSection>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10 py-6">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Homes Around North Houston. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="/sellers#hero" className="text-white/40 hover:text-white/70 text-sm transition-colors">Privacy</a>
            <a href="/sellers#hero" className="text-white/40 hover:text-white/70 text-sm transition-colors">Terms</a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/40 hover:text-white hover:border-white/60 transition-all"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}