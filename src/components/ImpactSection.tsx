const imgGroupPhoto = "http://localhost:3845/assets/2c8af520db8b2da2b9bf74c429690d48178e41c0.png";
const imgArrowUp = "http://localhost:3845/assets/1d42a6d136e33f47abb96842fbcb5386bcd127f7.svg";

type StatItemProps = {
  number: string;
  label: string;
  raise?: string;
  countries?: string[];
};

function StatItem({ number, label, raise, countries }: StatItemProps) {
  return (
    <div className="border-l-4 border-[#ffa000] pl-10 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-white text-6xl font-bold leading-[60px]">{number}</span>
        {raise && (
          <div className="bg-[#cdead0] flex items-center gap-1 px-3 py-1 rounded-full shrink-0">
            <img alt="up" className="w-4 h-4 -rotate-45" src={imgArrowUp} />
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
  return (
    <section className="bg-[#3949ab] w-full px-20 py-40 flex gap-16 items-center">
      {/* Left: Text + Stats */}
      <div className="flex-1 flex flex-col gap-20">
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
            number="12,847"
            label="Total story views this month"
            raise="23%"
          />
          <StatItem
            number="150+"
            label="Countries reached worldwide"
            countries={["🇨🇦", "🇧🇷", "🇬🇧", "🇺🇸", "🇪🇹", "🇫🇷"]}
          />
          <StatItem
            number="52,234"
            label="QR code scans from business cards"
          />
        </div>
      </div>

      {/* Right: Photo */}
      <div className="flex-1 self-stretch relative rounded-2xl overflow-hidden min-h-[400px]">
        <img
          alt="Community of believers"
          className="absolute inset-0 w-full h-full object-cover"
          src={imgGroupPhoto}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
    </section>
  );
}
