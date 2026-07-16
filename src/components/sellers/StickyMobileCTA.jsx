import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import { scrollToSellerForm } from "@/components/sellers/scrollUtils";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const form = document.getElementById("seller-strategy-call");
      if (!form) return;
      const scrolled = window.scrollY;
      const formTop = form.getBoundingClientRect().top + window.scrollY;
      // Show after passing the hero, hide once the form section is near.
      setVisible(scrolled > 700 && window.scrollY + window.innerHeight < formTop + 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 animate-fade-rise">
      <button
        onClick={() => scrollToSellerForm()}
        className="w-full flex items-center justify-center gap-2 bg-amber-burnished text-white font-semibold rounded-full px-6 py-4 shadow-2xl shadow-slate-midnight/30"
      >
        <Calendar className="w-5 h-5" />
        Schedule a Seller Consultation
      </button>
    </div>
  );
}