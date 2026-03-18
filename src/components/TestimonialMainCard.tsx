"use client";

import { useState } from "react";
import Image from "next/image";

// ─── Assets ────────────────────────────────────────────────────────────────
const imgStars        = "/assets/4469bf716aabf3f6e95fb1deac60219ceedfc20d.svg";
const imgIconShare    = "/assets/2843b9a4277a57fd79701c736ab2ad92a47cca52.svg";
const imgChevronDown  = "/assets/b4408331f149c5b75592f975a4ae1cf656e79afd.svg";

const imgChevronBack  = "/assets/874ff3e313f797920ed6397deb38e0eece6117d3.svg";
const imgChevronNext  = "/assets/5b41c18920cab88893cec572df7f9aeb03c3c33b.svg";

// ─── Testimonial data ───────────────────────────────────────────────────────
const testimonials = [
  {
    photo:    "/assets/7b144509c9cf1588679ecd840b037923759bbdd0.png",
    avatar:   "/assets/e0ed72f85793600186c470be8d093a1d975d0f98.png",
    name:     "Jane Doe",
    location: "LA, USA",
    tags:     ["Healing", "Faith", "Transformation", "Hope"],
  },
  {
    photo:    "/assets/1a62366225817c187f92eeee1bc130ed5441bd06.png",
    avatar:   "/assets/2bc32670cac098b01bfea288012634d320a6df70.png",
    name:     "Daniel K.",
    location: "Nairobi, Kenya",
    tags:     ["Salvation", "Purpose", "Freedom"],
  },
  {
    photo:    "/assets/04189945b9f91e27a439d4c4b3825ffeb1a4f1bb.png",
    avatar:   "/assets/8c2135d4cd7928a771e3325c2c15b656c2ba90f4.png",
    name:     "Maria S.",
    location: "São Paulo, Brazil",
    tags:     ["Financial Breakthrough", "Prayer", "Miracle"],
  },
  {
    photo:    "/assets/dfa16d3ee4100f15be507aca397fb2fa00c4ae5a.png",
    avatar:   "/assets/674c3930cb576a8d7f5898eea09eab4e14a08c1e.png",
    name:     "Liam T.",
    location: "London, UK",
    tags:     ["Addiction Recovery", "New Life", "Grace"],
  },
];

// ─── Hashtag pill ────────────────────────────────────────────────────────────
function Hashtag({ label }: { label: string }) {
  return (
    <div className="backdrop-blur-[4px] bg-[rgba(118,118,118,0.38)] border-[0.5px] border-white/50 flex items-center justify-center px-5 py-2 rounded-full shrink-0">
      <span className="text-white text-base leading-5 whitespace-nowrap">#{label}</span>
    </div>
  );
}

// ─── Icon containers matching Figma's inset positioning ─────────────────────
function ShareIcon() {
  return (
    <div className="relative shrink-0 size-6">
      <div className="absolute inset-[9.38%_15.63%]">
        <img alt="" className="absolute block max-w-none size-full" src={imgIconShare} />
      </div>
    </div>
  );
}

function ChevronDownIcon() {
  return (
    <div className="relative shrink-0 size-6">
      <div className="absolute flex inset-[32.81%_18.75%] items-center justify-center">
        <div className="-scale-y-100 flex-none h-[5.5px] w-[10px] rotate-180">
          <div className="relative size-full">
            <img alt="" className="absolute block max-w-none size-full" src={imgChevronDown} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ChevronBackIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-6">
      <div className="absolute inset-[18.75%_32.81%]">
        <img alt="" className="absolute block max-w-none size-full" src={imgChevronBack} />
      </div>
    </div>
  );
}

function ChevronNextIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-6">
      <div className="absolute flex inset-[18.75%_32.81%] items-center justify-center">
        <div className="-scale-y-100 flex-none h-[10px] w-[5.5px] rotate-180">
          <div className="relative size-full">
            <img alt="" className="absolute block max-w-none size-full" src={imgChevronNext} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main card ───────────────────────────────────────────────────────────────
export default function TestimonialMainCard() {
  const [index, setIndex] = useState(0);
  const t = testimonials[index];

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <div className="relative w-[720px] h-[640px] rounded-2xl shadow-[0px_6px_24px_0px_rgba(0,0,0,0.05)] flex flex-col items-start justify-between p-6 overflow-hidden">

      {/* Background photo + gradient */}
      <div className="absolute inset-0 pointer-events-none rounded-2xl">
        <Image
          key={t.photo}
          src={t.photo}
          alt="Testimony background"
          fill
          sizes="720px"
          className="object-cover rounded-2xl transition-opacity duration-500"
          priority
        />
        {/* Figma gradient: from-transparent (at 54.9%) to black/50 */}
        <div className="absolute inset-0 rounded-2xl"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0) 54.9%, rgba(0,0,0,0.5) 100%)" }}
        />
      </div>

      {/* ── Top row: stars + action buttons ── */}
      <div className="relative flex items-center justify-between w-full z-10">
        {/* 5-star rating SVG */}
        <div className="w-[160px] h-6 shrink-0">
          <Image src={imgStars} alt="5 stars" width={160} height={24} className="object-contain object-left" />
        </div>

        {/* Share + Read Story */}
        <div className="flex gap-3 items-center">
          {/* Share button: bg #f5f5f5, border #283593, h-40px, p-8px */}
          <button
            onClick={() => {}}
            className="bg-[#f5f5f5] border border-[#283593] rounded-full h-10 w-10 flex items-center justify-center hover:bg-white transition-colors shrink-0"
            aria-label="Share"
          >
            <ShareIcon />
          </button>

          {/* Read Story button: bg #3949ab, border white, w-160px, px-24px py-8px */}
          <button
            onClick={() => {}}
            className="bg-[#3949ab] border border-white text-white text-base leading-4 px-6 py-2 rounded-full flex items-center gap-1 w-[160px] justify-center hover:bg-[#003299] transition-colors shrink-0"
          >
            <span>Read Story</span>
            <ChevronDownIcon />
          </button>
        </div>
      </div>

      {/* ── Bottom section: hashtags + divider + user + nav ── */}
      <div className="relative w-full flex flex-col gap-4 z-10">

        {/* Hashtags + divider line */}
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center flex-wrap">
            {t.tags.map((tag) => (
              <Hashtag key={tag} label={tag} />
            ))}
          </div>
          <div className="w-full h-px bg-white/30" />
        </div>

        {/* User info + prev/next nav */}
        <div className="flex items-center justify-between w-full">
          {/* Avatar + name + location */}
          <div className="flex items-center gap-3">
            <Image
              key={t.avatar}
              src={t.avatar}
              alt={t.name}
              width={64}
              height={64}
              className="rounded-full object-cover shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-white text-xl font-bold leading-7 whitespace-nowrap">{t.name}</span>
              <span className="text-white text-xs leading-[18px]">{t.location}</span>
            </div>
          </div>

          {/* Prev / Next: p-[16px] = 56×56px */}
          <div className="flex gap-3 items-center">
            {/* Back: bg #f5f5f5, border #3949ab */}
            <button
              onClick={prev}
              className="bg-[#f5f5f5] border border-[#3949ab] rounded-full p-4 flex items-center justify-center hover:bg-white transition-colors shrink-0"
              aria-label="Previous testimony"
            >
              <ChevronBackIcon />
            </button>

            {/* Next: bg #3949ab, no border */}
            <button
              onClick={next}
              className="bg-[#3949ab] rounded-full p-4 flex items-center justify-center hover:bg-[#003299] transition-colors shrink-0"
              aria-label="Next testimony"
            >
              <ChevronNextIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
