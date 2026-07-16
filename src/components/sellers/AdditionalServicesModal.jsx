// src/components/sellers/AdditionalServicesModal.jsx
import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Loader2,
  X,
} from "lucide-react";

const SERVICE_OPTIONS = [
  { key: "roofing", label: "Roofing", description: "Inspection, repair, or replacement" },
  { key: "fencing", label: "Fence Services", description: "Repair, staining, or replacement" },
  { key: "deck_patio", label: "Deck or Patio", description: "Deck, porch, or patio repair" },
  { key: "interior_painting", label: "Interior Painting", description: "Walls, ceilings, and trim" },
  { key: "exterior_painting", label: "Exterior Painting", description: "Siding, trim, and doors" },
  { key: "flooring", label: "Flooring", description: "Repair, refinishing, or replacement" },
  { key: "landscaping", label: "Landscaping", description: "Lawn, beds, and curb appeal" },
  { key: "tree_service", label: "Tree Service", description: "Trimming, removal, or cleanup" },
  { key: "pressure_washing", label: "Pressure Washing", description: "Exterior, driveway, fence, or patio" },
  { key: "house_cleaning", label: "House Cleaning", description: "Pre-listing or move-out cleaning" },
  { key: "junk_removal", label: "Junk Removal", description: "Furniture, debris, or unwanted items" },
  { key: "handyman", label: "Handyman Services", description: "General repairs and punch-list work" },
  { key: "plumbing", label: "Plumbing", description: "Leaks, fixtures, drains, or repairs" },
  { key: "electrical", label: "Electrical", description: "Fixtures, outlets, panels, or repairs" },
  { key: "hvac", label: "Heating and Air", description: "Inspection, repair, or servicing" },
  { key: "foundation", label: "Foundation", description: "Evaluation or repair information" },
  { key: "pool_service", label: "Pool Service", description: "Cleaning, repair, or equipment" },
  { key: "home_staging", label: "Home Staging", description: "Consultation and presentation guidance" },
  { key: "moving", label: "Moving Services", description: "Local or long-distance assistance" },
  { key: "storage", label: "Storage", description: "Temporary or long-term options" },
  { key: "remodeling", label: "General Remodeling", description: "Kitchen, bathroom, or improvements" },
  { key: "unsure", label: "Not Sure Yet", description: "Help identifying useful services" },
];

export default function AdditionalServicesModal({
  open,
  lead,
  onClose,
}) {
  const [selectedServices, setSelectedServices] = useState([]);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const selectedCount = selectedServices.length;
  const consentVersion = "vendor-referral-consent-v1-2026-07";

  const consentText = useMemo(
    () =>
      "I authorize Homes Around North Houston, as a real-estate service of Golden Cross Realty, to share my first name, last name, phone number, email address, city, ZIP code, and selected service request with the independent service providers I select so those providers may contact me about the requested services.",
    [],
  );

  useEffect(() => {
    if (!open) return undefined;

    setSelectedServices([]);
    setConsent(false);
    setSubmitted(false);
    setError("");

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

  const toggleService = (serviceKey) => {
    setSelectedServices((current) =>
      current.includes(serviceKey)
        ? current.filter((key) => key !== serviceKey)
        : [...current, serviceKey],
    );
    setError("");
  };

  const handleSubmit = async () => {
    if (selectedCount === 0) {
      setError("Select at least one service or choose No Thanks.");
      return;
    }

    if (!consent) {
      setError(
        "Please authorize sharing your contact information with the providers you selected.",
      );
      return;
    }

    setSubmitting(true);
    setError("");

    const payload = {
      lead_id: lead?.lead_id,
      first_name: lead?.first_name,
      last_name: lead?.last_name,
      email: lead?.email,
      phone: lead?.phone,
      city: lead?.city,
      state: lead?.state,
      zip_code: lead?.zip_code,
      selected_services: selectedServices,
      consent: true,
      consent_text: consentText,
      consent_version: consentVersion,
      initial_submitted_at: lead?.submitted_at,
      lead_source: "Seller Landing Page Optional Service Request",
      landing_page: "/sellers",
    };

    try {
      if (import.meta.env.DEV && !import.meta.env.VITE_USE_LIVE_API) {
        console.info("LOCAL VENDOR REQUEST TEST", payload);
        setSubmitted(true);
        return;
      }

      const response = await fetch("/api/send-vendor-referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error ||
            "We could not send your service requests. Please try again.",
        );
      }

      setSubmitted(true);
    } catch (requestError) {
      console.error("Vendor request submission error:", requestError);
      setError(
        requestError.message ||
          "We could not send your service requests. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-3 backdrop-blur-lg sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="additional-services-title"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-[1240px] flex-col overflow-hidden rounded-[1.75rem] border border-white/25 bg-[#0b1428] shadow-[0_40px_120px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
        <div className="flex-shrink-0 border-b border-white/15 bg-[#101b32] px-5 py-5 sm:px-7">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close optional services"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/70 shadow-lg transition hover:border-white/40 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-burnished"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="pr-14">
            <div className="mb-2 flex flex-wrap items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-burnished">
                Optional Home Services
              </p>
              <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                Your seller request was received
              </span>
            </div>

            <h2
              id="additional-services-title"
              className="font-heading text-2xl leading-tight text-white sm:text-3xl"
            >
              Would You Like Information From Any Home-Service Providers?
            </h2>

            <p className="mt-2 max-w-4xl text-sm leading-relaxed text-white/65">
              Choose only the services you want. This step is optional and does
              not affect your request for a real-estate consultation.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="flex min-h-[360px] flex-1 items-center justify-center px-6 py-10 text-center">
            <div>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-burnished/15 ring-1 ring-amber-burnished/30">
                <CheckCircle2 className="h-9 w-9 text-amber-burnished" />
              </div>

              <h3 className="mb-3 font-heading text-3xl text-white">
                Your Service Requests Have Been Sent
              </h3>

              <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/65">
                The independent providers connected to your selected services
                may contact you using the phone number or email address you
                supplied.
              </p>

              <p className="mt-3 text-sm text-white/45">
                Your street address was not included in the vendor requests.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-7 rounded-full bg-amber-burnished px-8 py-3.5 font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-amber-burnished/30"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="min-h-0 flex-1 overflow-y-auto bg-[#0b1428] px-5 py-5 sm:px-7">
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
                {SERVICE_OPTIONS.map((service) => {
                  const selected = selectedServices.includes(service.key);

                  return (
                    <button
                      key={service.key}
                      type="button"
                      onClick={() => toggleService(service.key)}
                      aria-pressed={selected}
                      className={`relative min-h-[92px] rounded-xl border p-3.5 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-amber-burnished ${
                        selected
                          ? "border-amber-burnished bg-amber-burnished/20 shadow-amber-burnished/10"
                          : "border-white/15 bg-[#162138] hover:border-white/35 hover:bg-[#1a2843]"
                      }`}
                    >
                      <span
                        className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border ${
                          selected
                            ? "border-amber-burnished bg-amber-burnished text-white"
                            : "border-white/25 bg-black/10 text-transparent"
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </span>

                      <span className="block pr-8 text-sm font-semibold text-white">
                        {service.label}
                      </span>

                      <span className="mt-1.5 block text-xs leading-relaxed text-white/55">
                        {service.description}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 rounded-xl border border-white/15 bg-[#162138] p-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => {
                      setConsent(event.target.checked);
                      setError("");
                    }}
                    className="mt-1 h-5 w-5 flex-shrink-0 rounded border-white/30 accent-amber-burnished"
                  />

                  <span>
                    <span className="block text-sm font-medium leading-relaxed text-white/90">
                      {consentText}
                    </span>

                    <span className="mt-2 block text-xs leading-relaxed text-white/50">
                      Your street address will not be shared. Selecting a
                      provider is optional and does not create a contract.
                      Service providers are independent businesses.
                    </span>
                  </span>
                </label>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mt-4 flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  {error}
                </div>
              )}
            </div>

            <div className="flex-shrink-0 border-t border-white/15 bg-[#101b32] px-5 py-4 sm:px-7">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-white/20 px-5 py-3 font-semibold text-white/75 transition hover:border-white/40 hover:bg-white/5 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  No Thanks — Skip This Step
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 rounded-xl bg-amber-burnished px-6 py-3 font-semibold text-white shadow-lg shadow-amber-burnished/20 transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-amber-burnished/30 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending Requests...
                    </>
                  ) : (
                    <>
                      Send My Service Requests
                      {selectedCount > 0 && (
                        <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs">
                          {selectedCount}
                        </span>
                      )}
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
