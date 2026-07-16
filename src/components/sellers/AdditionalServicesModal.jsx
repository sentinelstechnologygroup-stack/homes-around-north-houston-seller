import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  Loader2,
  X,
} from "lucide-react";

const SERVICE_OPTIONS = [
  {
    key: "roofing",
    label: "Roofing",
    description: "Roof inspection, repair, or replacement",
  },
  {
    key: "fencing",
    label: "Fence Services",
    description: "Fence repair, staining, or replacement",
  },
  {
    key: "deck_patio",
    label: "Deck or Patio",
    description: "Deck, porch, or patio repair",
  },
  {
    key: "interior_painting",
    label: "Interior Painting",
    description: "Interior wall, ceiling, or trim painting",
  },
  {
    key: "exterior_painting",
    label: "Exterior Painting",
    description: "Exterior siding, trim, or door painting",
  },
  {
    key: "flooring",
    label: "Flooring",
    description: "Floor repair, refinishing, or replacement",
  },
  {
    key: "landscaping",
    label: "Landscaping",
    description: "Lawn, flowerbed, and curb-appeal work",
  },
  {
    key: "tree_service",
    label: "Tree Service",
    description: "Tree trimming, removal, or cleanup",
  },
  {
    key: "pressure_washing",
    label: "Pressure Washing",
    description: "Exterior, driveway, fence, or patio cleaning",
  },
  {
    key: "house_cleaning",
    label: "House Cleaning",
    description: "Pre-listing or move-out cleaning",
  },
  {
    key: "junk_removal",
    label: "Junk Removal",
    description: "Furniture, debris, or unwanted-item removal",
  },
  {
    key: "handyman",
    label: "Handyman Services",
    description: "General repairs and punch-list work",
  },
  {
    key: "plumbing",
    label: "Plumbing",
    description: "Leaks, fixtures, drains, or plumbing repairs",
  },
  {
    key: "electrical",
    label: "Electrical",
    description: "Fixtures, outlets, panels, or electrical repairs",
  },
  {
    key: "hvac",
    label: "Heating and Air",
    description: "HVAC inspection, repair, or servicing",
  },
  {
    key: "foundation",
    label: "Foundation",
    description: "Foundation evaluation or repair information",
  },
  {
    key: "pool_service",
    label: "Pool Service",
    description: "Pool cleaning, repair, or equipment servicing",
  },
  {
    key: "home_staging",
    label: "Home Staging",
    description: "Staging consultation or preparation guidance",
  },
  {
    key: "moving",
    label: "Moving Services",
    description: "Local or long-distance moving assistance",
  },
  {
    key: "storage",
    label: "Storage",
    description: "Temporary or long-term storage options",
  },
  {
    key: "remodeling",
    label: "General Remodeling",
    description: "Kitchen, bathroom, or general improvements",
  },
  {
    key: "unsure",
    label: "Not Sure Yet",
    description: "Help identifying which services may be useful",
  },
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

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
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

  const handleSkip = () => {
    onClose();
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

    try {
      const response = await fetch("/api/send-vendor-referrals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lead_id: lead?.lead_id,
          first_name: lead?.first_name,
          last_name: lead?.last_name,
          email: lead?.email,
          phone: lead?.phone,
          city: lead?.city,
          zip_code: lead?.zip_code,
          selected_services: selectedServices,
          consent: true,
          consent_text: consentText,
          consent_version: consentVersion,
          initial_submitted_at: lead?.submitted_at,
          lead_source: "Seller Landing Page Optional Service Request",
          landing_page: "/sellers",
        }),
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
      className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-midnight/80 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="additional-services-title"
    >
      <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-[1.5rem] border border-white/10 bg-slate-midnight shadow-2xl sm:rounded-[1.75rem]">
        <div className="flex items-start justify-between border-b border-white/10 px-5 py-5 sm:px-7">
          <div className="pr-10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-burnished">
              Optional Home Services
            </p>

            <h2
              id="additional-services-title"
              className="font-heading text-2xl leading-tight text-white sm:text-3xl"
            >
              Would You Like Information From Any Home-Service Providers?
            </h2>

            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white/60 sm:text-base">
              These services are optional and are not required to work with
              Homes Around North Houston or Golden Cross Realty. Select only
              the service providers you would like to contact you.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close optional services"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition hover:border-white/30 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-burnished"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="overflow-y-auto px-6 py-12 text-center sm:px-10">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-burnished/15">
              <CheckCircle2 className="h-9 w-9 text-amber-burnished" />
            </div>

            <h3 className="mb-4 font-heading text-2xl text-white sm:text-3xl">
              Your Service Requests Have Been Sent
            </h3>

            <p className="mx-auto max-w-xl text-base leading-relaxed text-white/65">
              The independent providers connected to the services you selected
              may contact you using the phone number or email address you
              provided.
            </p>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/45">
              Your street address was not included in the vendor requests.
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-8 rounded-full bg-amber-burnished px-7 py-3.5 font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-amber-burnished/30"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-y-auto px-5 py-6 sm:px-7">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {SERVICE_OPTIONS.map((service) => {
                  const selected = selectedServices.includes(service.key);

                  return (
                    <button
                      key={service.key}
                      type="button"
                      onClick={() => toggleService(service.key)}
                      aria-pressed={selected}
                      className={`relative min-h-[108px] rounded-xl border p-4 text-left transition focus:outline-none focus:ring-2 focus:ring-amber-burnished ${
                        selected
                          ? "border-amber-burnished bg-amber-burnished/15"
                          : "border-white/10 bg-white/[0.035] hover:border-white/25 hover:bg-white/[0.06]"
                      }`}
                    >
                      <span
                        className={`absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border ${
                          selected
                            ? "border-amber-burnished bg-amber-burnished text-white"
                            : "border-white/20 text-transparent"
                        }`}
                      >
                        <Check className="h-4 w-4" />
                      </span>

                      <span className="block pr-8 font-semibold text-white">
                        {service.label}
                      </span>

                      <span className="mt-2 block text-sm leading-relaxed text-white/50">
                        {service.description}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-7 rounded-xl border border-white/10 bg-white/[0.035] p-5">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => {
                      setConsent(event.target.checked);
                      setError("");
                    }}
                    className="mt-1 h-5 w-5 flex-shrink-0 rounded border-white/20 accent-amber-burnished"
                  />

                  <span>
                    <span className="block text-sm font-medium leading-relaxed text-white/85">
                      {consentText}
                    </span>

                    <span className="mt-3 block text-xs leading-relaxed text-white/45">
                      My street address will not be shared through this
                      request. Selecting a provider is optional, does not
                      create a contract, and is not required to receive
                      real-estate services. Service providers are independent
                      businesses. Homes Around North Houston and Golden Cross
                      Realty do not guarantee provider pricing, licensing,
                      insurance, availability, workmanship, or performance.
                    </span>
                  </span>
                </label>
              </div>

              {error && (
                <div
                  role="alert"
                  className="mt-5 flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                  {error}
                </div>
              )}
            </div>

            <div className="border-t border-white/10 bg-slate-900/80 px-5 py-5 sm:px-7">
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={handleSkip}
                  className="rounded-xl border border-white/15 px-5 py-3.5 font-semibold text-white/70 transition hover:border-white/30 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  No Thanks — Continue Without Service Requests
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex items-center justify-center gap-2 rounded-xl bg-amber-burnished px-6 py-3.5 font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-amber-burnished/30 disabled:cursor-not-allowed disabled:opacity-60"
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