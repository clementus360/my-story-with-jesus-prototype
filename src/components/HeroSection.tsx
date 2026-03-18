"use client";

const imgMainHero = "http://localhost:3845/assets/7b144509c9cf1588679ecd840b037923759bbdd0.png";
const imgAvatar = "http://localhost:3845/assets/e0ed72f85793600186c470be8d093a1d975d0f98.png";
const imgSearchIcon = "http://localhost:3845/assets/2843b9a4277a57fd79701c736ab2ad92a47cca52.svg";

const testimonialImages = [
  "http://localhost:3845/assets/1a62366225817c187f92eeee1bc130ed5441bd06.png",
  "http://localhost:3845/assets/2bc32670cac098b01bfea288012634d320a6df70.png",
  "http://localhost:3845/assets/04189945b9f91e27a439d4c4b3825ffeb1a4f1bb.png",
  "http://localhost:3845/assets/8c2135d4cd7928a771e3325c2c15b656c2ba90f4.png",
  "http://localhost:3845/assets/dfa16d3ee4100f15be507aca397fb2fa00c4ae5a.png",
  "http://localhost:3845/assets/674c3930cb576a8d7f5898eea09eab4e14a08c1e.png",
  "http://localhost:3845/assets/9497e14f739043d17dcb8d2a446f90d753187f07.png",
  "http://localhost:3845/assets/b590e4583a18ec4b8da73564d8b0dd9985284e20.png",
  "http://localhost:3845/assets/a26c75adbdb47ee4635814612ff657dfbd013ad0.png",
  "http://localhost:3845/assets/0b99d64341d1de73aeae603e5e099c0ea1b82bb7.png",
];

const tags = [
  "#Healing",
  "#Financial Transformation",
  "#Free From Addiction",
  "#Faith",
  "#What Happened to Me",
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
    <div className="rounded-2xl overflow-hidden shrink-0 w-[139px] h-[200px] relative">
      <img alt="Testimony" className="absolute inset-0 w-full h-full object-cover" src={src} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
  const col1 = testimonialImages.slice(0, 5);
  const col2 = testimonialImages.slice(5, 10);
  const col3 = testimonialImages.slice(0, 6);
  const col4 = testimonialImages.slice(4, 10);

  return (
    <section className="w-full px-8 pt-0 pb-10">
      {/* Title + Search */}
      <div className="max-w-[746px] mx-auto text-center mb-8">
        <h1 className="text-[#00194c] text-[56px] font-bold leading-tight mb-5">
          This is My Story With Jesus
        </h1>
        <p className="text-[#666] text-lg mb-8">Real people. Real stories. A real Jesus.</p>

        {/* Search */}
        <div className="relative w-full mb-4">
          <div className="flex items-center bg-white border border-[#e0e0e0] rounded-full px-5 py-3 gap-3 shadow-sm">
            <img alt="Search" className="w-5 h-5 shrink-0" src={imgSearchIcon} />
            <input
              type="text"
              placeholder="Search for a testimony..."
              className="flex-1 text-base text-[#666] outline-none bg-transparent placeholder:text-[#aaa]"
            />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {tags.map((tag) => (
            <a
              key={tag}
              href="#"
              className="border border-[#3949ab] text-[#3949ab] text-sm px-5 py-2 rounded-full hover:bg-[#3949ab] hover:text-white transition-colors"
            >
              {tag}
            </a>
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
        <div className="shrink-0 w-[720px] h-[640px] rounded-2xl overflow-hidden relative">
          <img
            alt="Featured testimony"
            className="absolute inset-0 w-full h-full object-cover"
            src={imgMainHero}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {/* Card overlay content */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center gap-3 mb-3">
              <img
                alt="Jane D."
                className="w-10 h-10 rounded-full object-cover border-2 border-white"
                src={imgAvatar}
              />
              <div>
                <p className="font-semibold text-sm">Jane D.</p>
                <p className="text-xs text-white/70">Chicago, IL</p>
              </div>
            </div>
            <h3 className="text-xl font-bold leading-snug mb-2">
              How Jesus Transformed My Life
            </h3>
            <p className="text-sm text-white/80 line-clamp-2">
              I never imagined my life could change so drastically. Through faith and prayer,
              everything transformed...
            </p>
            <div className="flex gap-3 mt-4">
              <button className="bg-white text-[#3949ab] text-sm font-medium px-5 py-2 rounded-full hover:bg-[#f5f5f5] transition-colors">
                Read Story
              </button>
              <button className="border border-white text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-white/10 transition-colors">
                Share
              </button>
            </div>
          </div>
        </div>

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
