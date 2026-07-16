import AnimatedSection from "@/components/sellers/AnimatedSection";
import MagneticButton from "@/components/sellers/MagneticButton";
import { scrollToSellerForm } from "@/components/sellers/scrollUtils";
import { Calendar, Check, Home, MapPin, Play } from "lucide-react";

const VIDEO_POSTER =
  "https://media.base44.com/images/public/6a46a1b06959ba89ed68344c/289820b17_generated_4759153d.png";

const benefits = [
  "Local North Houston market guidance",
  "Strategic pricing before your home is listed",
  "Marketing designed to help your property stand out",
  "Clear communication from preparation through closing",
];

function SellerVideoCard() {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-amber-burnished/20 bg-slate-midnight shadow-2xl shadow-slate-midnight/20">
      {/* Video/poster area */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-midnight">
        <img
          src={VIDEO_POSTER}
          alt="North Houston home featured in the seller strategy video"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-midnight/95 via-slate-midnight/30 to-slate-midnight/30" />

        <button
          type="button"
          aria-label="Play the seller strategy video"
          className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-amber-burnished shadow-xl transition-transform duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-amber-burnished/40 sm:h-20 sm:w-20"
        >
          <Play className="ml-1 h-7 w-7 fill-white text-white sm:h-8 sm:w-8" />
        </button>

        <span className="absolute bottom-4 left-4 right-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-white sm:text-xs">
          Watch the Seller Strategy Video
        </span>
      </div>

      {/* Video details */}
      <div className="px-5 py-5 sm:px-6 sm:py-6">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-burnished sm:text-xs">
          Seller Strategy Video
        </p>

        <h2 className="font-heading text-xl leading-snug text-white sm:text-2xl">
          What North Houston Homeowners Should Know Before Listing
        </h2>

        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          Pricing, preparation, marketing, offers, and what to expect from the
          selling process.
        </p>

        <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-5">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-amber-burnished/15">
            <MapPin className="h-5 w-5 text-amber-burnished" />
          </span>

          <div>
            <p className="font-heading text-base leading-tight text-white">
              North Houston
            </p>

            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-400">
              Local Market Focus
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SellerHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sand-soft via-white to-amber-burnished/5">
      {/* Decorative background elements */}
      <div className="pointer-events-none absolute -left-24 top-20 -z-10 h-96 w-96 rounded-full bg-amber-burnished/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-200/10 blur-3xl" />

      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-5 sm:px-6 md:px-12 md:pb-24 md:pt-10 lg:px-20 lg:pt-20">
        {/* =====================================================
            MOBILE VIDEO

            This is physically rendered first on mobile.
            It is hidden on desktop.
        ====================================================== */}
        <div className="mb-8 block w-full lg:hidden">
          <AnimatedSection>
            <SellerVideoCard />
          </AnimatedSection>
        </div>

        {/* =====================================================
            HERO GRID

            Mobile: copy only, because mobile video is above it.
            Desktop: copy left and video right.
        ====================================================== */}
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Hero copy */}
          <AnimatedSection>
            <div className="w-full">
              <span className="mb-5 inline-block rounded-full bg-amber-burnished/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-burnished md:text-sm">
                North Houston Seller Guidance
              </span>

              <h1 className="mb-6 font-heading text-4xl leading-[1.08] text-slate-midnight sm:text-5xl lg:text-6xl">
                Sell Your North Houston Home With a Plan, Not a Guess
              </h1>

              <p className="mb-8 max-w-xl text-lg leading-relaxed text-pewter-cool md:text-xl">
                Selling your home is too important to leave to rough estimates,
                weak marketing, or hope. Get local guidance, a thoughtful
                pricing strategy, and a clear listing plan built around your
                home, your timeline, and your goals.
              </p>

              <ul className="mb-9 space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-burnished to-amber-700 shadow-sm shadow-amber-burnished/30">
                      <Check className="h-3.5 w-3.5 text-white" />
                    </span>

                    <span className="text-base font-medium text-slate-midnight">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                <MagneticButton
                  onClick={() => scrollToSellerForm()}
                  className="w-full sm:w-auto"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a Seller Consultation
                </MagneticButton>

                <MagneticButton
                  variant="secondary"
                  onClick={() =>
                    scrollToSellerForm({ checkHomeValue: true })
                  }
                  className="w-full sm:w-auto"
                >
                  <Home className="mr-2 h-5 w-5" />
                  Request My Home Value Review
                </MagneticButton>
              </div>

              <p className="text-sm italic text-pewter-cool/80">
                No pressure. No obligation. Just honest local guidance before
                you list.
              </p>
            </div>
          </AnimatedSection>

          {/* Desktop video only */}
          <div className="hidden w-full lg:block">
            <AnimatedSection delay={200}>
              <SellerVideoCard />
            </AnimatedSection>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-amber-burnished/30 to-transparent" />
    </section>
  );
}