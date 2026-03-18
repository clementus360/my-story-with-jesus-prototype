"use client";

import { Video, ImageIcon, FileText, Sparkles, BarChart2, QrCode } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const imgGlobalReach = "/assets/2c8af520db8b2da2b9bf74c429690d48178e41c0.png";
const imgMultimedia = "/assets/a57ab92c0455773f14ef972f47154c38a03a8216.png";

const languages = ["EN", "ES", "FR", "PT", "ZH"];

const mediaTypes = [
  { Icon: Video, label: "Video" },
  { Icon: ImageIcon, label: "Images" },
  { Icon: FileText, label: "Text" },
];

const bottomFeatures = [
  {
    Icon: Sparkles,
    title: "AI-Driven Discovery",
    description: "Smart algorithm surfaces trending stories and nearby testimonies based on location.",
    bg: "bg-[#00194c]",
  },
  {
    Icon: BarChart2,
    title: "Impact Analytics",
    description: "Track views, scans, and geographic reach. See real-time impact worldwide.",
    bg: "bg-[#003299]",
  },
  {
    Icon: QrCode,
    title: "QR Business Cards",
    description: "Free personalized evangelism cards with trackable QR codes.",
    bg: "bg-[#3949ab]",
  },
];

export default function WhatMakesUsDifferentSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="w-full px-20 py-20">
      {/* Section Heading */}
      <div
        ref={ref}
        className={`max-w-[783px] mx-auto text-center mb-10 transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <h2 className="text-[#00194c] text-[40px] font-bold leading-[44px] mb-4">
          What Makes Us Different
        </h2>
        <p className="text-[#666] text-xl leading-7">
          A powerful platform designed to amplify your testimony and inspire believers worldwide
        </p>
      </div>

      {/* Bento Grid */}
      <div className="flex flex-col gap-5">
        {/* Row 1 */}
        <div className="grid grid-cols-3 gap-5">
          {/* Global Reach — spans 2 cols */}
          <div
            className={`col-span-2 h-[420px] rounded-2xl overflow-hidden relative flex flex-col justify-end p-10 transition-all duration-700 ease-out ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="absolute inset-0">
              <img alt="Global reach" className="w-full h-full object-cover" src={imgGlobalReach} />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
            </div>
            <div className="relative z-10 max-w-[400px]">
              <h3 className="text-white text-2xl font-medium mb-4">
                Global Reach Across Languages
              </h3>
              <p className="text-[#f5f5f5] text-base leading-5 mb-4">
                Your testimony is shared across multiple regional domains reaching believers in
                their native language through our multi-front architecture.
              </p>
              <div className="flex gap-2 flex-wrap">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="border border-white/80 text-white text-base px-5 py-2 rounded-full backdrop-blur-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Multimedia — spans 1 col */}
          <div
            className={`col-span-1 h-[420px] rounded-2xl overflow-hidden relative flex flex-col justify-between p-10 bg-[#00194c] transition-all duration-700 ease-out ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="absolute inset-0 opacity-20 overflow-hidden rounded-2xl">
              <img alt="" className="w-full h-full object-cover" src={imgMultimedia} />
            </div>
            <div className="relative z-10">
              <h3 className="text-white text-2xl font-medium mb-3">Multimedia Testimonies</h3>
              <p className="text-[#f5f5f5] text-base leading-5">
                Share through video, images, or text. AI transcribes videos and tags content automatically.
              </p>
            </div>
            <div className="relative z-10 flex flex-col gap-2">
              {mediaTypes.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="bg-[rgba(40,53,147,0.5)] border border-[#99baff] rounded-2xl flex items-center gap-3 px-6 py-4"
                >
                  <div className="bg-white/10 rounded-full p-2 shrink-0">
                    <Icon size={20} className="text-white" />
                  </div>
                  <span className="text-white text-xl leading-7">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-3 gap-5">
          {bottomFeatures.map(({ Icon, title, description, bg }, i) => (
            <div
              key={title}
              className={`${bg} rounded-2xl p-10 flex flex-col justify-between h-[252px] transition-all duration-700 ease-out ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${300 + i * 100}ms` }}
            >
              <div className="bg-white/10 rounded-full p-4 w-fit">
                <Icon size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-white text-2xl font-medium mb-4">{title}</h3>
                <p className="text-[#f5f5f5] text-base leading-5">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
