import { useEffect } from "react";
import { X } from "lucide-react";
import SellerStrategyForm from "@/components/sellers/SellerStrategyForm";

export default function SellerLeadModal({
  open,
  requestHomeValue = false,
  onClose,
  onSubmitted,
}) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="seller-lead-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[1.75rem] border border-white/25 bg-[#f8f5ef] shadow-[0_35px_100px_rgba(0,0,0,0.65)] ring-1 ring-black/10">
        <div className="sticky top-0 z-10 border-b border-slate-200 bg-[#f8f5ef]/95 px-6 py-5 backdrop-blur-md sm:px-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close seller consultation form"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-500 shadow-sm transition hover:border-slate-400 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-burnished"
          >
            <X className="h-5 w-5" />
          </button>

          <p className="mb-2 pr-12 text-xs font-semibold uppercase tracking-[0.2em] text-amber-burnished">
            Seller Consultation
          </p>

          <h2
            id="seller-lead-modal-title"
            className="pr-12 font-heading text-3xl leading-tight text-slate-midnight sm:text-4xl"
          >
            Tell Us About Your Home
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Submit the essential contact and property information below. Your
            optional home-service choices will appear immediately afterward.
          </p>
        </div>

        <div className="px-6 py-6 sm:px-8 sm:py-8">
          <SellerStrategyForm
            requestHomeValue={requestHomeValue}
            onSubmitted={onSubmitted}
          />
        </div>
      </div>
    </div>
  );
}
