"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const contactInfo = [
  {
    Icon: Mail,
    label: "Email us",
    value: "hello@mystorywithjesus.com",
    sub: "We reply within 24 hours",
  },
  {
    Icon: MapPin,
    label: "Based in",
    value: "Global Ministry",
    sub: "Serving believers worldwide",
  },
  {
    Icon: Clock,
    label: "Response time",
    value: "Within 24 hours",
    sub: "Monday – Friday",
  },
];

const subjects = [
  "General Inquiry",
  "Submit a Testimony",
  "Report a Story",
  "Technical Support",
  "Partnership",
  "Press & Media",
  "Other",
];

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: subjects[0],
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function set(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function validate(): Errors {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email address.";
    if (!form.message.trim()) e.message = "Message is required.";
    else if (form.message.trim().length < 20) e.message = "Please write at least 20 characters.";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000)); // mock submit
    setLoading(false);
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="bg-[#00194c] px-6 py-20 text-center">
        <div className="max-w-[640px] mx-auto">
          <p className="text-[#7986cb] text-sm font-semibold uppercase tracking-widest mb-4">Contact Us</p>
          <h1 className="text-white text-[48px] font-bold leading-tight mb-5">
            We'd love to hear from you
          </h1>
          <p className="text-[#b0bec5] text-lg leading-relaxed">
            Have a question, a testimony to share, or just want to connect? Reach out — our team is here for you.
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">

          {/* Left: contact info */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-[#00194c] text-2xl font-bold mb-3">Get in touch</h2>
              <p className="text-[#666] text-sm leading-6">
                Whether you have a question about the platform, want to share your story, or need
                prayer support — we're here and we care.
              </p>
            </div>

            <div className="flex flex-col gap-5">
              {contactInfo.map(({ Icon, label, value, sub }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#3949ab]/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#3949ab]" />
                  </div>
                  <div>
                    <p className="text-[#858585] text-xs font-medium uppercase tracking-wide mb-0.5">{label}</p>
                    <p className="text-[#00194c] font-semibold text-sm">{value}</p>
                    <p className="text-[#858585] text-xs">{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Prayer note */}
            <div className="bg-[#3949ab]/8 border border-[#3949ab]/20 rounded-2xl p-5">
              <p className="text-[#3949ab] font-semibold text-sm mb-1">Need Prayer?</p>
              <p className="text-[#444] text-sm leading-5">
                Our team prays over every message we receive. You are not alone — whatever you're
                going through, we are standing with you.
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div className="bg-white rounded-2xl shadow-[0px_6px_24px_0px_rgba(0,0,0,0.08)] border border-[#f0f0f0] p-8">
            {submitted ? (
              <div className="text-center py-10">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-[#00194c] font-bold text-xl mb-2">Message sent!</h3>
                <p className="text-[#666] text-sm leading-6 mb-6">
                  Thank you for reaching out, {form.name}. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: subjects[0], message: "" }); }}
                  className="text-[#3949ab] text-sm font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <h3 className="text-[#00194c] text-xl font-bold">Send us a message</h3>
                  <p className="text-[#858585] text-sm">We read every message and will respond personally.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    id="name"
                    type="text"
                    label="Your name"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={set("name")}
                    error={errors.name}
                    autoComplete="name"
                  />
                  <Input
                    id="email"
                    type="email"
                    label="Email address"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={set("email")}
                    error={errors.email}
                    autoComplete="email"
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-sm font-medium text-[#333]">Subject</label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={set("subject")}
                    className="border border-[#858585] rounded-full px-4 py-4 text-sm text-[#333] outline-none focus:border-[#3949ab] focus:ring-2 focus:ring-[#3949ab]/20 transition-colors bg-white appearance-none"
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-[#333]">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Write your message here..."
                    className={`border rounded-2xl px-4 py-3 text-sm text-[#333] outline-none focus:ring-2 focus:ring-[#3949ab]/20 transition-colors resize-none placeholder:text-[#aaa] ${
                      errors.message ? "border-red-400 focus:border-red-400" : "border-[#858585] focus:border-[#3949ab]"
                    }`}
                  />
                  {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
                </div>

                <Button type="submit" fullWidth disabled={loading}>
                  {loading ? "Sending…" : "Send Message"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
