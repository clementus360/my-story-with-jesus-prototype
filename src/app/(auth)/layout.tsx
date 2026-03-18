import Image from "next/image";

const imgHero    = "/assets/7b144509c9cf1588679ecd840b037923759bbdd0.png";
const imgLogo    = "/assets/f8d5e47573f3512eadbc708ea82da8c054f36f15.png";
const imgLogoAlt = "/assets/1dadfaa94ab6e3472c340b8e6b5a3cc3378243e7.png";

const testimonialImages = [
  "/assets/1a62366225817c187f92eeee1bc130ed5441bd06.png",
  "/assets/04189945b9f91e27a439d4c4b3825ffeb1a4f1bb.png",
  "/assets/dfa16d3ee4100f15be507aca397fb2fa00c4ae5a.png",
  "/assets/9497e14f739043d17dcb8d2a446f90d753187f07.png",
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* ── Left panel: branding ── */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-between p-12 overflow-hidden">
        {/* Hero photo */}
        <Image
          src={imgHero}
          alt=""
          fill
          sizes="45vw"
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#00194c]/80" />

        {/* Top: logo */}
        <div className="relative z-10">
          <Image src={imgLogoAlt} alt="My Story With Jesus" width={160} height={40} className="h-10 w-auto object-contain object-left" />
        </div>

        {/* Middle: headline */}
        <div className="relative z-10 flex flex-col gap-6">
          <h1 className="text-white text-[42px] font-bold leading-[48px]">
            Your story matters.
            <br />
            Share it with the world.
          </h1>
          <p className="text-white/80 text-lg leading-7">
            Join thousands of believers sharing their faith journeys — from healing to transformation.
          </p>

          {/* Mini testimonial preview strip */}
          <div className="flex gap-3 mt-2">
            {testimonialImages.map((src, i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/60 shrink-0 relative"
                style={{ marginLeft: i > 0 ? -16 : 0 }}
              >
                <Image src={src} alt="" fill sizes="56px" className="object-cover" />
              </div>
            ))}
            <div className="w-14 h-14 rounded-full bg-[#3949ab] border-2 border-white/60 flex items-center justify-center shrink-0 -ml-4">
              <span className="text-white text-xs font-bold">1K+</span>
            </div>
          </div>
        </div>

        {/* Bottom: quote */}
        <div className="relative z-10">
          <p className="text-white/60 text-sm italic">
            &ldquo;Every believer has a story. This is a simple platform to share yours.&rdquo;
          </p>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-[#f5f5f5] px-6 py-12 min-h-screen">
        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <Image src={imgLogo} alt="My Story With Jesus" width={160} height={40} className="h-10 w-auto object-contain" />
        </div>

        <div className="w-full max-w-[440px]">
          {children}
        </div>
      </div>
    </div>
  );
}
