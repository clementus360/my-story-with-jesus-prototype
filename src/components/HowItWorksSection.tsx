"use client";

import { PenLine, ClipboardCheck, Heart } from "lucide-react";
import Link from "next/link";
import { useInView } from "@/hooks/useInView";

const steps = [
  {
    number: "1",
    Icon: PenLine,
    title: "Write Your Story",
    description:
      "Share your testimony using video, images, or text in our Writer's Studio. Our AI helps you craft a powerful narrative.",
  },
  {
    number: "2",
    Icon: ClipboardCheck,
    title: "We Review It",
    description:
      "Our team ensures your story meets community guidelines and maintains platform integrity. Quick turnaround time.",
  },
  {
    number: "3",
    Icon: Heart,
    title: "It Encourages Others",
    description:
      "Your testimony reaches believers worldwide, inspiring faith and bringing hope. Track your impact in real-time.",
  },
];

export default function HowItWorksSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="bg-[#e0e0e0] w-full py-20 flex flex-col items-center gap-16">
      {/* Section Heading */}
      <div
        ref={ref}
        className={`max-w-[783px] text-center transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <h2 className="text-[#00194c] text-[40px] font-bold leading-[44px] mb-4">
          How It Works
        </h2>
        <p className="text-[#666] text-xl leading-7">
          Share your testimony in three simple steps and inspire believers around the world
        </p>
      </div>

      {/* Steps */}
      <div className="w-full max-w-[1280px] px-8">
        <div className="grid grid-cols-3 gap-0 relative">
          {/* Connecting line */}
          <div className="absolute top-[28px] left-0 right-0 h-px bg-[#bdbdbd] z-0" />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`relative z-10 p-4 transition-all duration-700 ease-out ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${100 + i * 150}ms` }}
            >
              <div className="flex items-end gap-0 relative">
                {/* Ghost number */}
                <span className="text-[200px] font-bold leading-[140px] text-[#3949ab] opacity-5 select-none shrink-0 -mr-10">
                  {step.number}
                </span>
                <div className="flex flex-col gap-10 shrink-0 w-[320px]">
                  {/* Icon */}
                  <div className="bg-[#3949ab] rounded-full p-4 w-fit">
                    <step.Icon size={24} className="text-white" />
                  </div>
                  {/* Text */}
                  <div>
                    <h3 className="text-[#00194c] text-2xl font-medium mb-4">{step.title}</h3>
                    <p className="text-[#666] text-base leading-5">{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        className={`flex flex-col items-center gap-2 transition-all duration-700 ease-out ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
        style={{ transitionDelay: "550ms" }}
      >
        <Link
          href="/share"
          className="bg-[#3949ab] text-white text-xl leading-7 px-6 py-5 rounded-full hover:bg-[#003299] transition-colors"
        >
          Start Sharing Today
        </Link>
        <p className="text-[#666] text-base text-center">
          Join thousands of believers sharing their stories
        </p>
      </div>
    </section>
  );
}
