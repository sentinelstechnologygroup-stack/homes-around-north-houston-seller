import { ArrowUp, Home } from "lucide-react";

export default function SellerFooter() {
  return (
    <footer className="bg-slate-midnight border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-burnished flex items-center justify-center">
              <Home className="w-4.5 h-4.5 text-white" />
            </div>
            <div className="leading-tight">
              <span className="block font-heading text-lg text-white">Homes Around</span>
              <span className="block text-[11px] text-white/40 tracking-widest uppercase font-medium -mt-0.5">North Houston</span>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="/sellers#hero" className="text-white/50 hover:text-white text-sm transition-colors">Privacy</a>
            <a href="/sellers#hero" className="text-white/50 hover:text-white text-sm transition-colors">Terms</a>
            <a href="/sellers#contact-form" className="text-white/50 hover:text-white text-sm transition-colors">Contact</a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Scroll to top"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-white/40 text-sm text-center">
            &copy; {new Date().getFullYear()} Homes Around North Houston. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}