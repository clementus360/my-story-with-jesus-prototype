"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import {
  Heart, Star, TrendingUp, ShieldCheck, Smile, Users,
  Compass, Zap, BookOpen, Check, ArrowRight, ArrowLeft,
  Copy, CheckCircle, Eye, Heart as HeartIcon,
} from "lucide-react";
import Image from "next/image";
import { ALL_TAGS, ALL_COUNTRIES } from "@/data/testimonials";

// ─── Cover photos (reusing existing assets) ───────────────────────────────────

const COVER_PHOTOS = [
  "/assets/7b144509c9cf1588679ecd840b037923759bbdd0.png",
  "/assets/1a62366225817c187f92eeee1bc130ed5441bd06.png",
  "/assets/04189945b9f91e27a439d4c4b3825ffeb1a4f1bb.png",
  "/assets/dfa16d3ee4100f15be507aca397fb2fa00c4ae5a.png",
  "/assets/9497e14f739043d17dcb8d2a446f90d753187f07.png",
  "/assets/b590e4583a18ec4b8da73564d8b0dd9985284e20.png",
  "/assets/a26c75adbdb47ee4635814612ff657dfbd013ad0.png",
  "/assets/0b99d64341d1de73aeae603e5e099c0ea1b82bb7.png",
];

// ─── Category config ──────────────────────────────────────────────────────────

const CATEGORIES = [
  { label: "Healing",                Icon: Heart,      color: "#f87171" },
  { label: "Salvation",              Icon: Star,       color: "#fbbf24" },
  { label: "Financial Breakthrough", Icon: TrendingUp, color: "#34d399" },
  { label: "Freedom from Addiction", Icon: ShieldCheck,color: "#c084fc" },
  { label: "Mental Health",          Icon: Smile,      color: "#60a5fa" },
  { label: "Family Restoration",     Icon: Users,      color: "#fb923c" },
  { label: "Purpose & Calling",      Icon: Compass,    color: "#2dd4bf" },
  { label: "Miraculous Encounter",   Icon: Zap,        color: "#a78bfa" },
  { label: "Faith Journey",          Icon: BookOpen,   color: "#818cf8" },
];

// ─── Steps ────────────────────────────────────────────────────────────────────

const STEPS = ["Your Story", "About You", "Cover & Publish"];

type FormData = {
  title: string;
  category: string;
  story: string;
  tags: string[];
  name: string;
  location: string;
  country: string;
  coverPhoto: string;
};

type Errors = Partial<Record<keyof FormData | "tags", string>>;

// ─── Step progress indicator ──────────────────────────────────────────────────

function StepBar({ current }: { current: number }) {
  return (
    <div className="flex items-center gap-0 mb-10">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
              i < current  ? "bg-[#3949ab] text-white" :
              i === current ? "bg-[#3949ab] text-white ring-4 ring-[#3949ab]/20" :
              "bg-[#f0f0f0] text-[#aaa]"
            }`}>
              {i < current ? <Check size={14} /> : i + 1}
            </div>
            <span className={`text-[11px] font-medium whitespace-nowrap ${i <= current ? "text-[#3949ab]" : "text-[#aaa]"}`}>
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`flex-1 h-px mx-3 mb-5 transition-colors ${i < current ? "bg-[#3949ab]" : "bg-[#e0e0e0]"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({ label, hint, error, children }: { label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-[#333]">{label}</label>
        {hint && <span className="text-xs text-[#aaa]">{hint}</span>}
      </div>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// ─── Preview card ─────────────────────────────────────────────────────────────

function PreviewCard({ data }: { data: FormData }) {
  const cat = CATEGORIES.find((c) => c.label === data.category);
  return (
    <div className="bg-white rounded-2xl border border-[#ebebeb] overflow-hidden w-full max-w-[300px]">
      <div className="relative h-36 overflow-hidden bg-[#f5f5f5]">
        {data.coverPhoto && (
          <Image src={data.coverPhoto} alt="" fill sizes="300px" className="object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        {data.category && (
          <span className="absolute bottom-2 left-3 text-white text-[10px] font-medium bg-black/30 px-2 py-0.5 rounded-full">
            {data.category}
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        <h4 className="text-[#00194c] font-semibold text-xs leading-snug line-clamp-2">
          {data.title || "Your story title will appear here"}
        </h4>
        <div className="flex flex-wrap gap-1">
          {data.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[9px] text-[#3949ab] bg-[#f0f2ff] px-2 py-0.5 rounded-full">#{tag}</span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-1 border-t border-[#f5f5f5]">
          <span className="text-[10px] text-[#555]">{data.name || "Your name"} · {data.location || "Location"}</span>
          <div className="flex gap-1.5 text-[#ccc]">
            <Eye size={9} /><HeartIcon size={9} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

export default function ShareStoryForm() {
  const router  = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [step,    setStep]    = useState(0);
  const [loading, setLoading] = useState(false);
  const [copied,  setCopied]  = useState(false);
  const [done,    setDone]    = useState(false);
  const [errors,  setErrors]  = useState<Errors>({});

  const [data, setData] = useState<FormData>({
    title: "", category: "", story: "",
    tags: [], name: user?.name ?? "", location: "", country: "", coverPhoto: "",
  });

  const set = (field: keyof FormData, value: string | string[]) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const toggleTag = (tag: string) => {
    const current = data.tags;
    if (current.includes(tag)) {
      set("tags", current.filter((t) => t !== tag));
    } else if (current.length < 5) {
      set("tags", [...current, tag]);
    }
  };

  function validate(s: number): Errors {
    const e: Errors = {};
    if (s === 0) {
      if (data.title.trim().length < 10)   e.title    = "Title must be at least 10 characters.";
      if (!data.category)                   e.category = "Please select a category.";
      if (data.story.trim().length < 100)   e.story    = "Please write at least 100 characters.";
    }
    if (s === 1) {
      if (data.name.trim().length < 2)      e.name     = "Please enter your name.";
      if (!data.country)                    e.country  = "Please select your country.";
    }
    return e;
  }

  async function handleNext() {
    const errs = validate(step);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1400));
      setLoading(false);
      setDone(true);
    }
  }

  function handleCopyLink() {
    const url = `${window.location.origin}/story/${encodeURIComponent(data.title.toLowerCase().replace(/\s+/g, "-"))}`;
    try {
      const el = document.createElement("textarea");
      el.value = url;
      el.style.cssText = "position:absolute;left:-9999px;top:-9999px";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    } catch {
      // silent fail
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ── Success screen ─────────────────────────────────────────────────────────

  if (done) {
    return (
      <div className="max-w-[560px] mx-auto py-16 text-center px-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h2 className="text-[#00194c] font-bold text-2xl mb-2">Your story has been submitted!</h2>
        <p className="text-[#666] text-sm leading-6 mb-8">
          Thank you, {data.name}. Your testimony is now under review and will be published shortly. Stories like yours change lives.
        </p>

        {/* Preview */}
        <div className="flex justify-center mb-8">
          <PreviewCard data={data} />
        </div>

        {/* Share */}
        <div className="bg-[#f9f9f9] rounded-2xl p-5 mb-6 text-left">
          <p className="text-xs font-semibold text-[#333] mb-3 uppercase tracking-wide">Share your story</p>
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-between bg-white border border-[#e0e0e0] rounded-full px-4 py-3 text-sm text-[#555] hover:border-[#3949ab] transition-colors"
          >
            <span className="truncate text-[#aaa]">
              {`${typeof window !== "undefined" ? window.location.origin : ""}/story/${data.title.toLowerCase().replace(/\s+/g, "-")}`}
            </span>
            <span className="flex items-center gap-1.5 ml-3 text-[#3949ab] font-medium shrink-0">
              {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy link</>}
            </span>
          </button>
        </div>

        <div className="flex gap-3 justify-center">
          <Link href="/search" className="border border-[#e0e0e0] text-[#555] text-sm px-6 py-3 rounded-full hover:border-[#3949ab] hover:text-[#3949ab] transition-colors">
            Browse stories
          </Link>
          <Link href="/" className="bg-[#3949ab] text-white text-sm px-6 py-3 rounded-full hover:bg-[#003299] transition-colors">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  // ── Form steps ────────────────────────────────────────────────────────────

  return (
    <div className="max-w-[680px] mx-auto px-6 py-12">
      <StepBar current={step} />

      {/* ── STEP 0: Your Story ── */}
      {step === 0 && (
        <div className="flex flex-col gap-6">
          <Field label="Story title" hint={`${data.title.length}/100`} error={errors.title}>
            <input
              type="text"
              maxLength={100}
              value={data.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Give your testimony a compelling title"
              className={`border rounded-full px-5 py-3 text-sm text-[#333] outline-none transition-colors placeholder:text-[#bbb] ${errors.title ? "border-red-400 focus:border-red-400" : "border-[#d0d0d0] focus:border-[#3949ab]"}`}
            />
          </Field>

          <Field label="Category" error={errors.category}>
            <div className="grid grid-cols-3 gap-2.5">
              {CATEGORIES.map(({ label, Icon, color }) => {
                const selected = data.category === label;
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => set("category", label)}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-center transition-all ${
                      selected
                        ? "border-[#3949ab] bg-[#f0f2ff]"
                        : "border-[#ebebeb] bg-white hover:border-[#c5cae9]"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full flex items-center justify-center"
                      style={{ background: `${color}18` }}>
                      <Icon size={16} style={{ color }} />
                    </div>
                    <span className={`text-[11px] font-medium leading-tight ${selected ? "text-[#3949ab]" : "text-[#555]"}`}>
                      {label}
                    </span>
                    {selected && (
                      <div className="w-4 h-4 rounded-full bg-[#3949ab] flex items-center justify-center">
                        <Check size={9} className="text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </Field>

          <Field
            label="Your testimony"
            hint={`${data.story.trim().split(/\s+/).filter(Boolean).length} words`}
            error={errors.story}
          >
            <textarea
              rows={10}
              maxLength={5000}
              value={data.story}
              onChange={(e) => set("story", e.target.value)}
              placeholder="Share your story in your own words. What happened? How did Jesus change your life? Don't hold back — authenticity is what moves hearts."
              className={`border rounded-2xl px-5 py-4 text-sm text-[#333] outline-none resize-none leading-7 placeholder:text-[#bbb] transition-colors ${errors.story ? "border-red-400 focus:border-red-400" : "border-[#d0d0d0] focus:border-[#3949ab]"}`}
            />
            {data.story.trim().length > 0 && data.story.trim().length < 100 && (
              <p className="text-xs text-[#aaa]">{100 - data.story.trim().length} more characters needed</p>
            )}
          </Field>
        </div>
      )}

      {/* ── STEP 1: About You ── */}
      {step === 1 && (
        <div className="flex flex-col gap-6">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Your name" error={errors.name}>
              <input
                type="text"
                value={data.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Jane Doe"
                className={`border rounded-full px-5 py-3 text-sm text-[#333] outline-none transition-colors placeholder:text-[#bbb] ${errors.name ? "border-red-400" : "border-[#d0d0d0] focus:border-[#3949ab]"}`}
              />
            </Field>
            <Field label="Location" hint="optional">
              <input
                type="text"
                value={data.location}
                onChange={(e) => set("location", e.target.value)}
                placeholder="City, Country"
                className="border border-[#d0d0d0] focus:border-[#3949ab] rounded-full px-5 py-3 text-sm text-[#333] outline-none transition-colors placeholder:text-[#bbb]"
              />
            </Field>
          </div>

          <Field label="Country" error={errors.country}>
            <select
              value={data.country}
              onChange={(e) => set("country", e.target.value)}
              className={`border rounded-full px-5 py-3 text-sm text-[#333] outline-none bg-white appearance-none transition-colors ${errors.country ? "border-red-400" : "border-[#d0d0d0] focus:border-[#3949ab]"}`}
            >
              <option value="">Select your country</option>
              {ALL_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>

          <Field label="Tags" hint={`${data.tags.length}/5 selected`}>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((tag) => {
                const selected = data.tags.includes(tag);
                const maxed    = data.tags.length >= 5 && !selected;
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    disabled={maxed}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      selected   ? "bg-[#3949ab] border-[#3949ab] text-white" :
                      maxed      ? "border-[#e0e0e0] text-[#ccc] cursor-not-allowed" :
                      "border-[#d0d0d0] text-[#555] hover:border-[#3949ab] hover:text-[#3949ab]"
                    }`}
                  >
                    #{tag}
                  </button>
                );
              })}
            </div>
          </Field>
        </div>
      )}

      {/* ── STEP 2: Cover & Publish ── */}
      {step === 2 && (
        <div className="flex flex-col gap-8">
          <Field label="Choose a cover photo" hint="optional">
            <div className="grid grid-cols-4 gap-2">
              {COVER_PHOTOS.map((src) => {
                const selected = data.coverPhoto === src;
                return (
                  <button
                    key={src}
                    type="button"
                    onClick={() => set("coverPhoto", selected ? "" : src)}
                    className="relative rounded-xl overflow-hidden aspect-[3/4] group"
                    style={{ boxShadow: selected ? "0 0 0 2px #3949ab" : undefined }}
                  >
                    <Image src={src} alt="" fill sizes="150px" className="object-cover group-hover:scale-105 transition-transform duration-200" />
                    {selected && (
                      <div className="absolute inset-0 bg-[#3949ab]/30 flex items-center justify-center">
                        <div className="w-6 h-6 rounded-full bg-[#3949ab] flex items-center justify-center">
                          <Check size={12} className="text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </Field>

          {/* Preview */}
          <div>
            <p className="text-sm font-medium text-[#333] mb-3">Preview</p>
            <div className="flex items-start gap-6">
              <PreviewCard data={data} />
              <div className="flex-1 flex flex-col gap-2 pt-2">
                <p className="text-xs text-[#858585] leading-5">This is how your story will appear in the feed. You can always update your details later.</p>
                {!data.coverPhoto && (
                  <p className="text-xs text-amber-500">No cover photo selected — a default will be used.</p>
                )}
                {data.tags.length === 0 && (
                  <p className="text-xs text-amber-500">No tags selected — go back to add some.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Navigation ── */}
      <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#f0f0f0]">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => { setStep((s) => s - 1); setErrors({}); }}
            className="flex items-center gap-2 text-sm text-[#666] hover:text-[#333] transition-colors"
          >
            <ArrowLeft size={15} /> Back
          </button>
        ) : (
          <div />
        )}

        <button
          type="button"
          onClick={handleNext}
          disabled={loading}
          className="flex items-center gap-2 bg-[#3949ab] hover:bg-[#003299] disabled:opacity-60 text-white text-sm font-medium px-8 py-3 rounded-full transition-colors"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              Publishing…
            </>
          ) : step < STEPS.length - 1 ? (
            <>Continue <ArrowRight size={15} /></>
          ) : (
            <>Publish Story <ArrowRight size={15} /></>
          )}
        </button>
      </div>
    </div>
  );
}
