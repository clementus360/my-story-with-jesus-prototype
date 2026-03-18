"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import TestimonialMainCard from "@/components/TestimonialMainCard";

const testimonialImages = [
  "/assets/1a62366225817c187f92eeee1bc130ed5441bd06.png",
  "/assets/2bc32670cac098b01bfea288012634d320a6df70.png",
  "/assets/04189945b9f91e27a439d4c4b3825ffeb1a4f1bb.png",
  "/assets/8c2135d4cd7928a771e3325c2c15b656c2ba90f4.png",
  "/assets/dfa16d3ee4100f15be507aca397fb2fa00c4ae5a.png",
  "/assets/674c3930cb576a8d7f5898eea09eab4e14a08c1e.png",
  "/assets/9497e14f739043d17dcb8d2a446f90d753187f07.png",
  "/assets/b590e4583a18ec4b8da73564d8b0dd9985284e20.png",
  "/assets/a26c75adbdb47ee4635814612ff657dfbd013ad0.png",
  "/assets/0b99d64341d1de73aeae603e5e099c0ea1b82bb7.png",
];

const tags = [
  "Healing",
  "Freedom from Addiction",
  "Depression",
  "Family",
  "Faith & Repentance",
];

const userJourney = [
  {
    title: "Read Stories",
    description:
      "Discover powerful testimonies from believers around the world. Each story is a unique journey of faith, hope, and transformation.",
  },
  {
    title: "Get Inspired",
    description:
      "Find stories that resonate with your own journey. Connect with testimonies that speak to your heart and strengthen your faith.",
  },
  {
    title: "Share Your Story",
    description:
      "Contribute your own testimony and inspire others. Your story matters and can make a difference in someone's life.",
  },
];

function TestimonialCard({ src }: { src: string }) {
  return (
    <div className="rounded-2xl overflow-hidden shrink-0 w-[139px] h-[200px] relative shadow-[0px_6px_24px_0px_rgba(0,0,0,0.05)]">
      <img alt="Testimony" className="absolute inset-0 w-full h-full object-cover rounded-2xl" src={src} />
      <div className="absolute inset-0 rounded-2xl bg-[#404040] mix-blend-color" />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-black/60" />
    </div>
  );
}

function SlidingColumn({
  images,
  direction = "up",
}: {
  images: string[];
  direction?: "up" | "down";
}) {
  const doubled = [...images, ...images];
  return (
    <div className="overflow-hidden h-[592px] w-[139px]">
      <div
        className={direction === "up" ? "animate-scroll-up" : "animate-scroll-down"}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        {doubled.map((src, i) => (
          <TestimonialCard key={i} src={src} />
        ))}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const col1 = testimonialImages.slice(0, 5);
  const col2 = testimonialImages.slice(5, 10);
  const col3 = testimonialImages.slice(0, 6);
  const col4 = testimonialImages.slice(4, 10);

  function handleSearch() {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/search");
    }
  }

  function handleTagClick(tag: string) {
    router.push(`/search?tags=${encodeURIComponent(tag)}`);
  }

  return (
    <section className="w-full px-8 pt-16 pb-10">
      {/* Title + Search */}
      <div className="max-w-[746px] mx-auto text-center mb-8">
        <h1 className="text-[#00194c] text-[56px] font-bold leading-tight mb-5">
          This is My Story With Jesus
        </h1>
        <p className="text-[#666] text-lg mb-8">Real people. Real stories. A real Jesus.</p>

        {/* Search */}
        <div className="relative w-full mb-4">
          <div className="flex items-center bg-white border border-[#e0e0e0] rounded-full px-5 py-3 gap-3 shadow-sm focus-within:border-[#3949ab] transition-colors">
            <Search size={18} className="text-[#858585] shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search stories by topic, name, country or testimony..."
              className="flex-1 text-base text-[#666] outline-none bg-transparent placeholder:text-[#aaa]"
            />
            <button
              onClick={handleSearch}
              className="bg-[#3949ab] text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-[#003299] transition-colors whitespace-nowrap shrink-0"
            >
              Search
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="border border-[#3949ab] text-[#3949ab] text-sm px-5 py-2 rounded-full hover:bg-[#3949ab] hover:text-white transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Testimonials Display */}
      <div className="flex gap-4 items-start justify-center w-full overflow-hidden">
        {/* Left sliding panel */}
        <div className="flex gap-3 shrink-0">
          <SlidingColumn images={col1} direction="up" />
          <SlidingColumn images={col2} direction="down" />
        </div>

        {/* Main testimonial card */}
        <TestimonialMainCard />

        {/* Right sliding panel */}
        <div className="flex gap-3 shrink-0">
          <SlidingColumn images={col3} direction="up" />
          <SlidingColumn images={col4} direction="down" />
        </div>
      </div>

      {/* User Journey */}
      <div className="max-w-[1280px] mx-auto mt-12 px-12">
        <div className="flex items-start justify-between">
          {userJourney.map((step, index) => (
            <div key={step.title} className="flex items-start gap-0">
              <div className="w-[320px]">
                <h3 className="text-[#00194c] text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-[#666] text-sm leading-5">{step.description}</p>
              </div>
              {index < userJourney.length - 1 && (
                <div className="w-px h-24 bg-[#e0e0e0] mx-12 mt-2 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
