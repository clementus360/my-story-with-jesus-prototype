"use client";

import { TrendingUp } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

const imgGroupPhoto = "/assets/2c8af520db8b2da2b9bf74c429690d48178e41c0.png";

function useCountUp(target: number, duration: number, enabled: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;
    let raf: number;
    let startTime: number | null = null;

    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.round(eased * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [enabled, target, duration]);

  return value;
}

type StatItemProps = {
  countTarget: number;
  suffix?: string;
  label: string;
  raise?: string;
  countries?: string[];
  enabled: boolean;
  delay?: number;
};

function StatItem({ countTarget, suffix = "", label, raise, countries, enabled, delay = 0 }: StatItemProps) {
  const count = useCountUp(countTarget, 1800, enabled);

  return (
    <div
      className={`border-l-4 border-[#ffa000] pl-10 flex flex-col gap-2 transition-all duration-700 ease-out ${
        enabled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2">
        <span className="text-white text-6xl font-bold leading-[60px] tabular-nums">
          {count.toLocaleString("en-US")}{suffix}
        </span>
        {raise && (
          <div className="bg-[#cdead0] flex items-center gap-1 px-3 py-1 rounded-full shrink-0">
            <TrendingUp size={16} className="text-[#2e7d32]" />
            <span className="text-[#2e7d32] text-sm">{raise}</span>
          </div>
        )}
      </div>
      <p className="text-[#e0e0e0] text-xl leading-7">{label}</p>
      {countries && (
        <div className="flex gap-2 flex-wrap mt-1">
          {countries.map((flag) => (
            <div key={flag} className="bg-white rounded-lg px-3 py-2">
              <span className="text-xl">{flag}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ImpactSection() {
  const { ref, inView } = useInView<HTMLElement>(0.2);

  return (
    <section
      ref={ref}
      className="bg-[#3949ab] w-full px-20 py-40 flex gap-16 items-center"
    >
      {/* Left: Text + Stats */}
      <div
        className={`flex-1 flex flex-col gap-20 transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div>
          <h2 className="text-white text-[40px] font-bold leading-[44px] mb-4">
            Track Your Testimony&apos;s Impact
          </h2>
          <p className="text-white text-xl leading-7">
            See exactly how your story is touching lives around the world with powerful real-time
            analytics and geographic insights.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          <StatItem
            countTarget={12847}
            label="Total story views this month"
            raise="23%"
            enabled={inView}
            delay={150}
          />
          <StatItem
            countTarget={150}
            suffix="+"
            label="Countries reached worldwide"
            countries={["🇨🇦", "🇧🇷", "🇬🇧", "🇺🇸", "🇪🇹", "🇫🇷"]}
            enabled={inView}
            delay={300}
          />
          <StatItem
            countTarget={52234}
            label="QR code scans from business cards"
            enabled={inView}
            delay={450}
          />
        </div>
      </div>

      {/* Right: Photo */}
      <div
        className={`flex-1 self-stretch relative rounded-2xl overflow-hidden min-h-[400px] transition-all duration-1000 ease-out ${
          inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
        }`}
        style={{ transitionDelay: "100ms" }}
      >
        <Image
          src={imgGroupPhoto}
          alt="Community of believers"
          fill
          sizes="50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
    </section>
  );
}
