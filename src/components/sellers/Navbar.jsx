import { useState, useEffect } from "react";
import { Home, Menu, X } from "lucide-react";
import MagneticButton from "@/components/sellers/MagneticButton";

const navLinks = [
  { label: "Pain Points", href: "#pain-points" },
  { label: "Why Us", href: "#why-us" },
  { label: "Our Plan", href: "#marketing-plan" },
  { label: "Before You List", href: "#trust" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/90 backdrop-blur-lg shadow-sm" : "bg-transparent"}`}>
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <a href="/sellers" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-amber-burnished flex items-center justify-center">
            <Home className="w-4.5 h-4.5 text-white" />
          </div>
          <div className="leading-tight">
            <span className="block font-heading text-lg text-slate-midnight">Homes Around</span>
            <span className="block text-[11px] text-pewter-cool tracking-widest uppercase font-medium -mt-0.5">North Houston</span>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-sm font-medium text-pewter-cool hover:text-slate-midnight transition-colors"
            >
              {link.label}
            </button>
          ))}
          <MagneticButton
            variant="primary"
            className="text-sm px-6 py-2.5"
            onClick={() => scrollTo("#contact-form")}
          >
            Contact Us
          </MagneticButton>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center text-slate-midnight"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-lg">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left py-3 text-base font-medium text-pewter-cool hover:text-slate-midnight transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3">
              <MagneticButton
                variant="primary"
                className="w-full text-sm"
                onClick={() => scrollTo("#contact-form")}
              >
                Contact Us
              </MagneticButton>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}