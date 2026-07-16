import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import MagneticButton from "@/components/sellers/MagneticButton";
import { Send } from "lucide-react";

const timelines = [
  "As soon as possible",
  "Within 1–3 months",
  "Within 3–6 months",
  "Within 6–12 months",
  "More than one year",
  "I am only researching",
];

export default function ContactForm({ id, variant = "default" }) {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    timeline: "",
    message: "",
  });
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      title: "Request Received",
      description:
        "Thank you. Your seller request has been received. A member of Homes Around North Houston will contact you shortly.",
    });
    setForm({ name: "", email: "", phone: "", address: "", city: "", zip: "", timeline: "", message: "" });
  };

  const isGlass = variant === "glass";
  const cardClass = isGlass
    ? "glass-card rounded-[2rem] p-8 md:p-10 shadow-2xl shadow-slate-midnight/10 border border-white/40"
    : "bg-white rounded-[2rem] p-8 md:p-10 shadow-xl shadow-slate-midnight/8 border border-amber-burnished/10";

  const inputClass =
    "bg-sand-soft/60 border-0 rounded-xl h-12 text-slate-midnight placeholder:text-pewter-cool/50 font-body focus:ring-2 focus:ring-amber-burnished/40 transition-all duration-300";
  const labelClass = "block text-slate-midnight text-sm font-semibold mb-1.5";

  return (
    <form id={id} onSubmit={handleSubmit} className={cardClass}>
      <h3 className="font-heading text-2xl md:text-3xl text-slate-midnight mb-2">
        Tell Us About Your Home
      </h3>
      <p className="text-pewter-cool text-base mb-7">
        Fill out the form and we&rsquo;ll reach out to start the conversation.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label htmlFor="cf-name" className={labelClass}>Full Name</Label>
          <Input
            id="cf-name"
            name="name"
            placeholder="Your full name"
            value={form.name}
            onChange={handleChange}
            className={`${inputClass} ${focused === "name" ? "ring-2 ring-amber-burnished/40" : ""}`}
            required
          />
        </div>
        <div>
          <Label htmlFor="cf-email" className={labelClass}>Email Address</Label>
          <Input
            id="cf-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            className={`${inputClass} ${focused === "email" ? "ring-2 ring-amber-burnished/40" : ""}`}
            required
          />
        </div>
        <div>
          <Label htmlFor="cf-phone" className={labelClass}>Phone Number</Label>
          <Input
            id="cf-phone"
            name="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={form.phone}
            onChange={handleChange}
            className={`${inputClass} ${focused === "phone" ? "ring-2 ring-amber-burnished/40" : ""}`}
          />
        </div>
        <div>
          <Label htmlFor="cf-address" className={labelClass}>Property Address</Label>
          <Input
            id="cf-address"
            name="address"
            placeholder="Street address"
            value={form.address}
            onChange={handleChange}
            className={`${inputClass} ${focused === "address" ? "ring-2 ring-amber-burnished/40" : ""}`}
          />
        </div>
        <div>
          <Label htmlFor="cf-city" className={labelClass}>City</Label>
          <Input
            id="cf-city"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className={`${inputClass} ${focused === "city" ? "ring-2 ring-amber-burnished/40" : ""}`}
          />
        </div>
        <div>
          <Label htmlFor="cf-zip" className={labelClass}>ZIP Code</Label>
          <Input
            id="cf-zip"
            name="zip"
            inputMode="numeric"
            placeholder="ZIP code"
            value={form.zip}
            onChange={handleChange}
            className={`${inputClass} ${focused === "zip" ? "ring-2 ring-amber-burnished/40" : ""}`}
          />
        </div>
      </div>

      <div className="mb-5">
        <Label htmlFor="cf-timeline" className={labelClass}>Approximate Selling Timeline</Label>
        <select
          id="cf-timeline"
          name="timeline"
          value={form.timeline}
          onChange={handleChange}
          onFocus={() => setFocused("timeline")}
          onBlur={() => setFocused(null)}
          className={`w-full h-12 ${inputClass} ${focused === "timeline" ? "ring-2 ring-amber-burnished/40" : ""} px-3`}
        >
          <option value="">Select a timeline…</option>
          {timelines.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="mb-7">
        <Label htmlFor="cf-message" className={labelClass}>How Can We Help?</Label>
        <Textarea
          id="cf-message"
          name="message"
          placeholder="Tell us about your home, your timeline, or any questions you have about selling."
          value={form.message}
          onChange={handleChange}
          rows={4}
          className={`${inputClass} min-h-[110px] resize-none ${focused === "message" ? "ring-2 ring-amber-burnished/40" : ""}`}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <MagneticButton type="submit" variant="primary">
          <Send className="w-4 h-4 mr-2" />
          Start My Seller Conversation
        </MagneticButton>
        <p className="text-sm text-pewter-cool/70 italic">
          No pressure. No obligation. Your information will only be used to respond to your request.
        </p>
      </div>
    </form>
  );
}