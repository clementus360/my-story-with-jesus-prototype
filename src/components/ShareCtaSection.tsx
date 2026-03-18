import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ShareCtaSection() {
  return (
    <section className="w-full px-6 py-14 bg-white">
      <div className="max-w-[1100px] mx-auto">
        <div className="relative bg-[#00194c] rounded-3xl overflow-hidden px-10 py-14 flex flex-col lg:flex-row items-center gap-10">

          {/* Background texture */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute w-[500px] h-[500px] rounded-full opacity-[0.06]" style={{ background: "radial-gradient(circle, #818cf8, transparent 70%)", top: "-20%", right: "-5%" }} />
            <div className="absolute w-[300px] h-[300px] rounded-full opacity-[0.04]" style={{ background: "radial-gradient(circle, #60a5fa, transparent 70%)", bottom: "-10%", left: "10%" }} />
          </div>

          {/* Left: text */}
          <div className="relative flex-1 text-center lg:text-left">
            <p className="text-[#7986cb] text-xs font-bold uppercase tracking-widest mb-3">Your voice matters</p>
            <h2 className="text-white text-[38px] font-bold leading-tight mb-4">
              "Your testimony is<br />someone else's miracle."
            </h2>
            <p className="text-[#b0bec5] text-base leading-relaxed max-w-[460px]">
              Real stories change real lives. Whether it's healing, salvation, or a quiet moment of grace — your experience with Jesus deserves to be heard.
            </p>
          </div>

          {/* Right: CTA */}
          <div className="relative flex flex-col items-center gap-4 shrink-0">
            <Link
              href="/share"
              className="flex items-center gap-2.5 bg-white text-[#00194c] font-semibold text-base px-8 py-4 rounded-full hover:bg-[#f0f2ff] transition-colors whitespace-nowrap"
            >
              Share My Story <ArrowRight size={18} />
            </Link>
            <Link
              href="/search"
              className="text-[#7986cb] text-sm hover:text-white transition-colors"
            >
              Or browse others' stories →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
