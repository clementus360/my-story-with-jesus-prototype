"use client";

import { MapPin, QrCode, Timer } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const perks = [
  {
    Icon: MapPin,
    title: "Geographic Tracking",
    description: "City, state, and country-level insights",
  },
  {
    Icon: QrCode,
    title: "Scan Totals",
    description: "Total versus unique scans to gauge interest",
  },
  {
    Icon: Timer,
    title: "Time-Based Trends",
    description: "Peak activity by hour, day, or week",
  },
];

export default function PerksSection() {
  const { ref, inView } = useInView(0.2);

  return (
    <section className="w-full px-20 py-16">
      <div ref={ref} className="max-w-[1280px] mx-auto flex items-center justify-between">
        {perks.map((perk, index) => (
          <div key={perk.title} className="flex items-center gap-0">
            <div
              className={`w-[320px] flex flex-col items-center gap-4 text-center transition-all duration-700 ease-out ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="bg-[#3949ab] rounded-full p-4">
                <perk.Icon size={24} className="text-white" />
              </div>
              <h3 className="text-[#00194c] text-2xl font-medium">{perk.title}</h3>
              <p className="text-[#666] text-base leading-5">{perk.description}</p>
            </div>
            {index < perks.length - 1 && (
              <div className="w-px h-24 bg-[#e0e0e0] mx-12 shrink-0" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
