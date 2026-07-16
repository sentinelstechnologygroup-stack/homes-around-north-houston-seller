import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  ArrowRight,
  Loader2,
} from "lucide-react";

const TEXAS_STATE = "TX";

const emptyForm = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  property_address: "",
  city: "",
  state: TEXAS_STATE,
  zip_code: "",
};

const inputClass =
  "h-12 w-full rounded-xl border border-slate-300 bg-white px-4 text-slate-midnight placeholder:text-slate-400 focus:border-amber-burnished focus:outline-none focus:ring-2 focus:ring-amber-burnished/25";

function FieldError({ children }) {
  if (!children) return null;

  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600">
      <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
      {children}
    </p>
  );
}

export default function SellerStrategyForm({
  requestHomeValue = false,
  onSubmitted,
}) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
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

    if (!form.state.trim()) {
      nextErrors.state = "Please select the state.";
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
      "state",
      "zip_code",
    ];

    const firstInvalidField = fieldOrder.find(
      (fieldName) => nextErrors[fieldName],
    );

    if (firstInvalidField) {
      document.getElementById(`seller-${firstInvalidField}`)?.focus();
    }
  };

  const createLocalTestResult = (payload) => ({
    ...payload,
    lead_id: `local-${Date.now()}`,
    submitted_at: new Date().toISOString(),
  });

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
      state: form.state.trim(),
      zip_code: form.zip_code.trim(),
      requests_home_value_review: requestHomeValue,
      lead_source: "Seller Landing Page",
      landing_page: "/sellers",
    };

    try {
      /*
       * `npm run dev` runs Vite only, so the Vercel API functions are not
       * available. This development branch allows the entire two-step modal
       * flow to be tested locally without sending email.
       *
       * Use `vercel dev` with VITE_USE_LIVE_API=true to test real delivery.
       */
      if (import.meta.env.DEV && !import.meta.env.VITE_USE_LIVE_API) {
        const completedLead = createLocalTestResult(payload);
        console.info("LOCAL SELLER FORM TEST", completedLead);
        onSubmitted?.(completedLead);
        return;
      }

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

      onSubmitted?.({
        ...payload,
        lead_id: result.lead_id,
        submitted_at: result.submitted_at,
      });
    } catch (error) {
      console.error("Seller form submission error:", error);

      setGeneralError(
        error.message ||
          "We could not submit your seller request. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {requestHomeValue && (
        <div className="mb-5 rounded-xl border border-amber-burnished/30 bg-amber-burnished/10 px-4 py-3 text-sm text-amber-900">
          Your request will also include a preliminary home-value review.
        </div>
      )}

      {generalError && (
        <div
          role="alert"
          className="mb-5 flex items-start gap-3 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
          <span>{generalError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label
            htmlFor="seller-first_name"
            className="mb-1.5 block text-sm font-semibold text-slate-700"
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
            className="mb-1.5 block text-sm font-semibold text-slate-700"
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
            className="mb-1.5 block text-sm font-semibold text-slate-700"
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
            className="mb-1.5 block text-sm font-semibold text-slate-700"
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
            className="mb-1.5 block text-sm font-semibold text-slate-700"
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
            className="mb-1.5 block text-sm font-semibold text-slate-700"
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

        <div className="grid grid-cols-[0.8fr_1.2fr] gap-4">
          <div>
            <Label
              htmlFor="seller-state"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              State <span className="text-amber-burnished">*</span>
            </Label>

            <select
              id="seller-state"
              name="state"
              autoComplete="address-level1"
              value={form.state}
              onChange={update}
              aria-invalid={Boolean(errors.state)}
              className={`${inputClass} appearance-none ${
                errors.state ? "ring-2 ring-red-400" : ""
              }`}
            >
              <option value="TX">Texas</option>
            </select>

            <FieldError>{errors.state}</FieldError>
          </div>

          <div>
            <Label
              htmlFor="seller-zip_code"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
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
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-burnished px-6 py-4 font-semibold text-white shadow-lg shadow-amber-burnished/20 transition hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-amber-burnished/30 disabled:cursor-not-allowed disabled:opacity-60"
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

      <p className="mt-4 text-center text-xs leading-relaxed text-slate-500">
        Submitting this form sends your real-estate inquiry to Homes Around
        North Houston, a real-estate service of Golden Cross Realty. Optional
        contractor requests are handled separately after this form.
      </p>
    </form>
  );
}
