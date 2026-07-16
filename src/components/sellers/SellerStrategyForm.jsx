import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";

const agentOptions = [
  "No",
  "Yes",
  "I have spoken with an agent but have not signed an agreement",
  "Prefer not to say",
];
const timelineOptions = [
  "As soon as possible",
  "Within 1–3 months",
  "Within 3–6 months",
  "Within 6–12 months",
  "More than one year",
  "I am only researching",
];
const propertyTypeOptions = [
  "Single-family home",
  "Townhome",
  "Condominium",
  "Acreage property",
  "Luxury home",
  "Investment property",
  "Vacant land",
  "Other",
];
const sellingReasonOptions = [
  "Purchasing another home",
  "Relocating",
  "Downsizing",
  "Upsizing",
  "Selling an investment property",
  "Inherited property",
  "Financial considerations",
  "Life change",
  "Exploring options",
  "Other",
];
const conditionOptions = [
  "Move-in ready",
  "Mostly updated",
  "Good condition with minor repairs needed",
  "Needs moderate repairs or updating",
  "Needs significant repairs",
  "Not sure",
  "Prefer to discuss",
];
const occupancyOptions = ["Owner occupied", "Tenant occupied", "Vacant", "Other"];
const mortgageOptions = ["Yes", "No", "Not sure", "Prefer not to say"];
const concernsOptions = [
  "Determining the right listing price",
  "Knowing what repairs are necessary",
  "Preparing the home for showings",
  "Understanding seller costs",
  "Estimating net proceeds",
  "Finding the right time to list",
  "Competing with new construction",
  "Managing inspections and appraisal",
  "Evaluating offers",
  "Coordinating the sale with another move",
  "Selling an inherited property",
  "Selling an occupied rental property",
  "Privacy and showing concerns",
  "Not sure yet",
];
const additionalServicesOptions = [
  "Buying another home",
  "Relocation assistance",
  "Home preparation recommendations",
  "Repair or contractor referrals",
  "Cleaning or staging guidance",
  "Photography and listing preparation",
  "Selling an inherited property",
  "Selling a tenant-occupied property",
  "Investment property guidance",
  "Mortgage or estimated proceeds discussion",
  "Moving-service recommendations",
  "Not sure yet",
];

const requiredOrder = [
  { key: "full_name", id: "ssf-name" },
  { key: "phone", id: "ssf-phone" },
  { key: "email", id: "ssf-email" },
  { key: "working_with_agent", id: "ssf-agent" },
  { key: "selling_timeline", id: "ssf-timeline" },
  { key: "property_type", id: "ssf-ptype" },
  { key: "contact_consent", id: "ssf-consent" },
];

const inputClass =
  "w-full bg-sand-soft border-0 rounded-xl h-12 px-3.5 text-slate-midnight placeholder:text-pewter-cool/60 font-body focus:ring-2 focus:ring-amber-burnished/40 transition-all duration-200";

function FieldLabel({ htmlFor, children, required }) {
  return (
    <Label htmlFor={htmlFor} className="block text-slate-200 text-sm font-semibold mb-1.5">
      {children}
      {required && <span className="text-amber-burnished ml-0.5">*</span>}
    </Label>
  );
}

function FieldError({ id, children }) {
  if (!children) return null;
  return (
    <p id={id} className="text-red-300 text-xs mt-1.5 flex items-center gap-1.5">
      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
      {children}
    </p>
  );
}

function SelectField({ id, name, label, value, onChange, options, error, placeholder = "Select…", required }) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>{label}</FieldLabel>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${inputClass} ${error ? "ring-2 ring-red-400" : ""} pr-10 appearance-none cursor-pointer`}
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pewter-cool pointer-events-none" />
      </div>
      <FieldError id={`${id}-error`}>{error}</FieldError>
    </div>
  );
}

const emptyForm = {
  full_name: "",
  phone: "",
  email: "",
  property_address: "",
  city: "",
  zip_code: "",
  working_with_agent: "",
  selling_timeline: "",
  property_type: "",
  selling_reason: "",
  seller_concerns: [],
  additional_services: [],
  property_condition: "",
  occupancy_status: "",
  has_mortgage: "",
  requests_home_value_review: false,
  message: "",
  contact_consent: false,
};

export default function SellerStrategyForm() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Auto-check the home value review box when a "home value" CTA is clicked.
  useEffect(() => {
    const handler = () => {
      setForm((f) => ({ ...f, requests_home_value_review: true }));
      const box = document.getElementById("ssf-home-value");
      box?.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    window.addEventListener("seller-check-home-value", handler);
    return () => window.removeEventListener("seller-check-home-value", handler);
  }, []);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const setBool = (key, val) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const toggleConcern = (c) => {
    setForm((f) => {
      const has = f.seller_concerns.includes(c);
      return {
        ...f,
        seller_concerns: has ? f.seller_concerns.filter((x) => x !== c) : [...f.seller_concerns, c],
      };
    });
  };

  const toggleService = (s) => {
    setForm((f) => {
      const has = f.additional_services.includes(s);
      return {
        ...f,
        additional_services: has ? f.additional_services.filter((x) => x !== s) : [...f.additional_services, s],
      };
    });
  };

  const validate = () => {
    const errs = {};
    if (!form.full_name.trim()) errs.full_name = "Please enter your full name.";
    if (!form.phone.trim()) errs.phone = "Please enter your phone number.";
    if (!form.email.trim()) errs.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Please enter a valid email address.";
    if (!form.working_with_agent) errs.working_with_agent = "Please select an option.";
    if (!form.selling_timeline) errs.selling_timeline = "Please select a timeline.";
    if (!form.property_type) errs.property_type = "Please select a property type.";
    if (!form.contact_consent) errs.contact_consent = "Please agree to be contacted to continue.";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      setGeneralError(true);
      const first = requiredOrder.find((r) => errs[r.key]);
      if (first) document.getElementById(first.id)?.focus();
      return;
    }
    setGeneralError(false);
    setSubmitting(true);
    const payload = {
      ...form,
      lead_source: "Seller Video Landing Page",
      landing_page: "/sellers",
      submitted_at: new Date().toISOString(),
    };
    // Preserved submission hook point — ready for lead storage / CRM / email integration.
    void payload;
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="bg-slate-800/60 backdrop-blur-sm rounded-[1.5rem] p-8 md:p-12 shadow-2xl shadow-black/30 border border-white/10 text-center">
        <div className="w-16 h-16 rounded-full bg-amber-burnished/15 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-9 h-9 text-amber-burnished" />
        </div>
        <h3 className="font-heading text-2xl md:text-3xl text-white mb-4 leading-snug">
          Thank You — Your Seller Request Has Been Received
        </h3>
        <p className="text-slate-300 text-base leading-relaxed max-w-lg mx-auto mb-4">
          A member of Homes Around North Houston will review the information you provided and follow up
          regarding your seller strategy conversation.
        </p>
        <p className="text-slate-400 text-sm">
          Please keep an eye on the phone number and email address you submitted.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-slate-800/60 backdrop-blur-sm rounded-[1.5rem] p-6 md:p-10 shadow-2xl shadow-black/30 border border-white/10"
    >
      {generalError && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-2.5 rounded-xl bg-red-500/10 border border-red-400/30 px-4 py-3 text-red-200 text-sm"
        >
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <span>We were unable to submit your request. Please review the highlighted fields and try again.</span>
        </div>
      )}

      {/* ROW 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <FieldLabel htmlFor="ssf-name" required>Full Name</FieldLabel>
          <Input
            id="ssf-name"
            name="full_name"
            value={form.full_name}
            onChange={update}
            placeholder="Your full name"
            aria-invalid={!!errors.full_name}
            aria-describedby={errors.full_name ? "ssf-name-error" : undefined}
            className={`${inputClass} ${errors.full_name ? "ring-2 ring-red-400" : ""}`}
          />
          <FieldError id="ssf-name-error">{errors.full_name}</FieldError>
        </div>
        <div>
          <FieldLabel htmlFor="ssf-phone" required>Phone Number</FieldLabel>
          <Input
            id="ssf-phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={update}
            placeholder="(555) 123-4567"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "ssf-phone-error" : undefined}
            className={`${inputClass} ${errors.phone ? "ring-2 ring-red-400" : ""}`}
          />
          <FieldError id="ssf-phone-error">{errors.phone}</FieldError>
        </div>
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <FieldLabel htmlFor="ssf-email" required>Email Address</FieldLabel>
          <Input
            id="ssf-email"
            name="email"
            type="email"
            value={form.email}
            onChange={update}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "ssf-email-error" : undefined}
            className={`${inputClass} ${errors.email ? "ring-2 ring-red-400" : ""}`}
          />
          <FieldError id="ssf-email-error">{errors.email}</FieldError>
        </div>
        <div>
          <FieldLabel htmlFor="ssf-address" required>Property Address</FieldLabel>
          <Input
            id="ssf-address"
            name="property_address"
            value={form.property_address}
            onChange={update}
            placeholder="Street address"
            className={inputClass}
          />
        </div>
      </div>

      {/* ROW 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
        <div>
          <FieldLabel htmlFor="ssf-city" required>City</FieldLabel>
          <Input
            id="ssf-city"
            name="city"
            value={form.city}
            onChange={update}
            placeholder="City"
            className={inputClass}
          />
        </div>
        <div>
          <FieldLabel htmlFor="ssf-zip" required>ZIP Code</FieldLabel>
          <Input
            id="ssf-zip"
            name="zip_code"
            inputMode="numeric"
            value={form.zip_code}
            onChange={update}
            placeholder="ZIP code"
            className={inputClass}
          />
        </div>
      </div>

      {/* Full-width dropdowns */}
      <div className="space-y-5 mb-6">
        <SelectField
          id="ssf-agent"
          name="working_with_agent"
          label="Are you currently working with a real estate agent?"
          value={form.working_with_agent}
          onChange={update}
          options={agentOptions}
          error={errors.working_with_agent}
          placeholder="Select an option…"
          required
        />
        <SelectField
          id="ssf-timeline"
          name="selling_timeline"
          label="When are you hoping to sell?"
          value={form.selling_timeline}
          onChange={update}
          options={timelineOptions}
          error={errors.selling_timeline}
          placeholder="Select a timeline…"
          required
        />
        <SelectField
          id="ssf-ptype"
          name="property_type"
          label="What best describes your property?"
          value={form.property_type}
          onChange={update}
          options={propertyTypeOptions}
          error={errors.property_type}
          placeholder="Select a property type…"
          required
        />
        <SelectField
          id="ssf-reason"
          name="selling_reason"
          label="What is your primary reason for selling?"
          value={form.selling_reason}
          onChange={update}
          options={sellingReasonOptions}
          placeholder="Select a reason…"
        />
      </div>

      {/* Concerns checkbox grid */}
      <div className="mb-6">
        <FieldLabel>What concerns you most about selling your home?</FieldLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {concernsOptions.map((c) => {
            const checked = form.seller_concerns.includes(c);
            return (
              <label
                key={c}
                className={`flex items-start gap-2.5 rounded-xl px-3 py-2.5 border cursor-pointer transition-colors ${
                  checked
                    ? "bg-amber-burnished/10 border-amber-burnished/40"
                    : "bg-slate-900/30 border-white/10 hover:border-white/25"
                }`}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggleConcern(c)}
                  className="mt-0.5 border-white/30 data-[state=checked]:bg-amber-burnished data-[state=checked]:border-amber-burnished"
                />
                <span className="text-slate-200 text-xs leading-snug">{c}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Condition */}
      <div className="mb-5">
        <SelectField
          id="ssf-condition"
          name="property_condition"
          label="How would you describe the current condition of the home?"
          value={form.property_condition}
          onChange={update}
          options={conditionOptions}
          placeholder="Select a condition…"
        />
      </div>

      {/* Occupancy / Mortgage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <SelectField
          id="ssf-occupancy"
          name="occupancy_status"
          label="Is the property currently occupied?"
          value={form.occupancy_status}
          onChange={update}
          options={occupancyOptions}
          placeholder="Select…"
        />
        <SelectField
          id="ssf-mortgage"
          name="has_mortgage"
          label="Do you currently have a mortgage on the property?"
          value={form.has_mortgage}
          onChange={update}
          options={mortgageOptions}
          placeholder="Select…"
        />
      </div>

      {/* Home value review */}
      <div id="ssf-home-value" className="mb-6 rounded-xl bg-slate-900/30 border border-white/10 p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            checked={form.requests_home_value_review}
            onCheckedChange={(v) => setBool("requests_home_value_review", !!v)}
            className="mt-0.5 border-white/30 data-[state=checked]:bg-amber-burnished data-[state=checked]:border-amber-burnished"
          />
          <span className="text-slate-100 text-sm font-medium">
            I would also like a preliminary home value review.
          </span>
        </label>
        <p className="text-slate-400 text-xs mt-2 ml-8 leading-relaxed">
          A preliminary review may require additional property details and does not replace a formal
          comparative market analysis or appraisal.
        </p>
      </div>

      {/* Additional services */}
      <div className="mb-6">
        <FieldLabel>Are there any additional services you may need?</FieldLabel>
        <p className="text-slate-400 text-xs mb-3 leading-relaxed">
          Select any areas you would like us to discuss during your seller strategy call.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {additionalServicesOptions.map((s) => {
            const checked = form.additional_services.includes(s);
            return (
              <label
                key={s}
                className={`flex items-start gap-2.5 rounded-xl px-3 py-2.5 border cursor-pointer transition-colors ${
                  checked
                    ? "bg-amber-burnished/10 border-amber-burnished/40"
                    : "bg-slate-900/30 border-white/10 hover:border-white/25"
                }`}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggleService(s)}
                  className="mt-0.5 border-white/30 data-[state=checked]:bg-amber-burnished data-[state=checked]:border-amber-burnished"
                />
                <span className="text-slate-200 text-xs leading-snug">{s}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Message */}
      <div className="mb-6">
        <FieldLabel htmlFor="ssf-message">Tell us about your situation</FieldLabel>
        <Textarea
          id="ssf-message"
          name="message"
          value={form.message}
          onChange={update}
          rows={4}
          placeholder="Share any details about your home, your selling timeline, your next move, or questions you would like us to address."
          className={`${inputClass} min-h-[110px] resize-none h-auto py-3`}
        />
      </div>

      {/* Consent */}
      <div className="mb-7">
        <label id="ssf-consent" className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            checked={form.contact_consent}
            onCheckedChange={(v) => setBool("contact_consent", !!v)}
            className="mt-0.5 border-white/30 data-[state=checked]:bg-amber-burnished data-[state=checked]:border-amber-burnished"
          />
          <span className="text-slate-100 text-sm font-medium">
            I agree to be contacted by Homes Around North Houston regarding my seller request.
            <span className="text-amber-burnished ml-0.5">*</span>
          </span>
        </label>
        <FieldError>{errors.contact_consent}</FieldError>
        <p className="text-slate-400 text-xs mt-2 ml-8 leading-relaxed">
          Your information will only be used to respond to your request and provide related real estate
          information. Submitting this form does not create an agency relationship.
        </p>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full flex items-center justify-center gap-2 bg-amber-burnished hover:bg-amber-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold rounded-xl px-6 py-4 text-base shadow-lg shadow-amber-burnished/30 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-burnished/50 focus:ring-offset-2 focus:ring-offset-slate-800"
      >
        {submitting ? "Submitting…" : "Schedule My Seller Strategy Call"}
        {!submitting && <ArrowRight className="w-5 h-5" />}
      </button>
    </form>
  );
}