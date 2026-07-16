import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import AdditionalServicesModal from "@/components/sellers/AdditionalServicesModal";

const emptyForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  property_address: "",
  city: "",
  zip_code: "",
};

const inputClass =
  "w-full h-12 rounded-xl border border-white/10 bg-sand-soft px-4 text-slate-midnight placeholder:text-pewter-cool/60 focus:border-amber-burnished focus:outline-none focus:ring-2 focus:ring-amber-burnished/30";

function FieldError({ children }) {
  if (!children) return null;

  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-300">
      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
      {children}
    </p>
  );
}

export default function SellerStrategyForm() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [initialSubmitted, setInitialSubmitted] = useState(false);
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [submittedLead, setSubmittedLead] = useState(null);
  const [requestHomeValue, setRequestHomeValue] = useState(false);

  useEffect(() => {
    const handler = () => {
      setRequestHomeValue(true);

      document
        .getElementById("seller-strategy-call")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    window.addEventListener("seller-check-home-value", handler);

    return () => {
      window.removeEventListener("seller-check-home-value", handler);
    };
  }, []);

  const update = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }));

    setGeneralError("");
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.first_name.trim()) {
      nextErrors.first_name = "Please enter your first name.";
    }

    if (!form.last_name.trim()) {
      nextErrors.last_name = "Please enter your last name.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.phone.trim()) {
      nextErrors.phone = "Please enter your phone number.";
    }

    if (!form.property_address.trim()) {
      nextErrors.property_address = "Please enter the property address.";
    }

    if (!form.city.trim()) {
      nextErrors.city = "Please enter the city.";
    }

    if (!form.zip_code.trim()) {
      nextErrors.zip_code = "Please enter the ZIP code.";
    } else if (!/^\d{5}(-\d{4})?$/.test(form.zip_code.trim())) {
      nextErrors.zip_code = "Please enter a valid ZIP code.";
    }

    return nextErrors;
  };

  const focusFirstError = (nextErrors) => {
    const fieldOrder = [
      "first_name",
      "last_name",
      "email",
      "phone",
      "property_address",
      "city",
      "zip_code",
    ];

    const firstInvalidField = fieldOrder.find(
      (fieldName) => nextErrors[fieldName],
    );

    if (firstInvalidField) {
      document.getElementById(`seller-${firstInvalidField}`)?.focus();
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setGeneralError(
        "Please review the highlighted fields and try again.",
      );
      focusFirstError(nextErrors);
      return;
    }

    setSubmitting(true);
    setGeneralError("");

    const payload = {
      ...form,
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      property_address: form.property_address.trim(),
      city: form.city.trim(),
      zip_code: form.zip_code.trim(),
      requests_home_value_review: requestHomeValue,
      lead_source: "Seller Landing Page",
      landing_page: "/sellers",
    };

    try {
      const response = await fetch("/api/send-seller-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.error ||
            "We could not submit your seller request. Please try again.",
        );
      }

      const completedLead = {
        ...payload,
        lead_id: result.lead_id,
        submitted_at: result.submitted_at,
      };

      setSubmittedLead(completedLead);
      setInitialSubmitted(true);
      setShowServicesModal(true);
    } catch (error) {
      setGeneralError(
        error.message ||
          "We could not submit your seller request. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (initialSubmitted) {
    return (
      <>
        <div className="rounded-[1.5rem] border border-white/10 bg-slate-800/60 p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-sm md:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-amber-burnished/15">
            <CheckCircle2 className="h-9 w-9 text-amber-burnished" />
          </div>

          <h3 className="mb-4 font-heading text-2xl leading-snug text-white md:text-3xl">
            Thank You — Your Seller Request Has Been Received
          </h3>

          <p className="mx-auto mb-7 max-w-xl text-base leading-relaxed text-white/70">
            Homes Around North Houston will review the information you
            submitted and contact you regarding your seller consultation.
          </p>

          <button
            type="button"
            onClick={() => setShowServicesModal(true)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-burnished px-6 py-3.5 font-semibold text-white transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-amber-burnished/30"
          >
            Review Optional Home Services
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mt-5 text-sm italic text-white/50">
            Optional service requests are separate from your real-estate
            inquiry.
          </p>
        </div>

        <AdditionalServicesModal
          open={showServicesModal}
          lead={submittedLead}
          onClose={() => setShowServicesModal(false)}
        />
      </>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-[1.5rem] border border-white/10 bg-slate-800/60 p-6 shadow-2xl shadow-black/30 backdrop-blur-sm md:p-10"
      >
        <div className="mb-7">
          <h3 className="mb-2 font-heading text-2xl text-white md:text-3xl">
            Request Your Seller Consultation
          </h3>

          <p className="text-base leading-relaxed text-white/65">
            Start with the essential information. After submitting, you may
            optionally request contact from home-service providers.
          </p>
        </div>

        {requestHomeValue && (
          <div className="mb-6 rounded-xl border border-amber-burnished/30 bg-amber-burnished/10 px-4 py-3 text-sm text-amber-100">
            Your request will also include a preliminary home-value review.
          </div>
        )}

        {generalError && (
          <div
            role="alert"
            className="mb-6 flex items-start gap-3 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>{generalError}</span>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Label
              htmlFor="seller-first_name"
              className="mb-1.5 block text-sm font-semibold text-slate-200"
            >
              First Name <span className="text-amber-burnished">*</span>
            </Label>

            <Input
              id="seller-first_name"
              name="first_name"
              autoComplete="given-name"
              value={form.first_name}
              onChange={update}
              placeholder="First name"
              aria-invalid={Boolean(errors.first_name)}
              className={`${inputClass} ${
                errors.first_name ? "ring-2 ring-red-400" : ""
              }`}
            />

            <FieldError>{errors.first_name}</FieldError>
          </div>

          <div>
            <Label
              htmlFor="seller-last_name"
              className="mb-1.5 block text-sm font-semibold text-slate-200"
            >
              Last Name <span className="text-amber-burnished">*</span>
            </Label>

            <Input
              id="seller-last_name"
              name="last_name"
              autoComplete="family-name"
              value={form.last_name}
              onChange={update}
              placeholder="Last name"
              aria-invalid={Boolean(errors.last_name)}
              className={`${inputClass} ${
                errors.last_name ? "ring-2 ring-red-400" : ""
              }`}
            />

            <FieldError>{errors.last_name}</FieldError>
          </div>

          <div>
            <Label
              htmlFor="seller-email"
              className="mb-1.5 block text-sm font-semibold text-slate-200"
            >
              Email Address <span className="text-amber-burnished">*</span>
            </Label>

            <Input
              id="seller-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={update}
              placeholder="you@example.com"
              aria-invalid={Boolean(errors.email)}
              className={`${inputClass} ${
                errors.email ? "ring-2 ring-red-400" : ""
              }`}
            />

            <FieldError>{errors.email}</FieldError>
          </div>

          <div>
            <Label
              htmlFor="seller-phone"
              className="mb-1.5 block text-sm font-semibold text-slate-200"
            >
              Phone Number <span className="text-amber-burnished">*</span>
            </Label>

            <Input
              id="seller-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={update}
              placeholder="(555) 123-4567"
              aria-invalid={Boolean(errors.phone)}
              className={`${inputClass} ${
                errors.phone ? "ring-2 ring-red-400" : ""
              }`}
            />

            <FieldError>{errors.phone}</FieldError>
          </div>

          <div className="md:col-span-2">
            <Label
              htmlFor="seller-property_address"
              className="mb-1.5 block text-sm font-semibold text-slate-200"
            >
              Property Address{" "}
              <span className="text-amber-burnished">*</span>
            </Label>

            <Input
              id="seller-property_address"
              name="property_address"
              autoComplete="street-address"
              value={form.property_address}
              onChange={update}
              placeholder="Street address"
              aria-invalid={Boolean(errors.property_address)}
              className={`${inputClass} ${
                errors.property_address ? "ring-2 ring-red-400" : ""
              }`}
            />

            <FieldError>{errors.property_address}</FieldError>
          </div>

          <div>
            <Label
              htmlFor="seller-city"
              className="mb-1.5 block text-sm font-semibold text-slate-200"
            >
              City <span className="text-amber-burnished">*</span>
            </Label>

            <Input
              id="seller-city"
              name="city"
              autoComplete="address-level2"
              value={form.city}
              onChange={update}
              placeholder="City"
              aria-invalid={Boolean(errors.city)}
              className={`${inputClass} ${
                errors.city ? "ring-2 ring-red-400" : ""
              }`}
            />

            <FieldError>{errors.city}</FieldError>
          </div>

          <div>
            <Label
              htmlFor="seller-zip_code"
              className="mb-1.5 block text-sm font-semibold text-slate-200"
            >
              ZIP Code <span className="text-amber-burnished">*</span>
            </Label>

            <Input
              id="seller-zip_code"
              name="zip_code"
              inputMode="numeric"
              autoComplete="postal-code"
              value={form.zip_code}
              onChange={update}
              placeholder="ZIP code"
              aria-invalid={Boolean(errors.zip_code)}
              className={`${inputClass} ${
                errors.zip_code ? "ring-2 ring-red-400" : ""
              }`}
            />

            <FieldError>{errors.zip_code}</FieldError>
          </div>
        </div>

        <div className="mt-7">
          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-burnished px-6 py-4 font-semibold text-white shadow-lg shadow-amber-burnished/20 transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-amber-burnished/30 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Sending Request...
              </>
            ) : (
              <>
                Submit My Seller Request
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>

          <p className="mt-4 text-center text-xs leading-relaxed text-white/45">
            Submitting this form sends your real-estate inquiry to Homes Around
            North Houston, a real-estate service of Golden Cross Realty.
            Optional contractor requests are handled separately after this
            form.
          </p>
        </div>
      </form>
    </>
  );
}