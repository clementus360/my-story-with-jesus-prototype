const imgIconMapPin = "http://localhost:3845/assets/5539956cba384d17f0defbd9599fd710aa02490c.svg";
const imgIconQR = "http://localhost:3845/assets/75dd3f0571c230842aafb27b707d33642b21d925.svg";
const imgIconStopwatch = "http://localhost:3845/assets/c5c6578242c4453d0d54f12128643f67567c773c.svg";

const perks = [
  {
    icon: imgIconMapPin,
    title: "Geographic Tracking",
    description: "City, state, and country-level insights",
  },
  {
    icon: imgIconQR,
    title: "Scan Totals",
    description: "Total versus unique scans to gauge interest",
  },
  {
    icon: imgIconStopwatch,
    title: "Time-Based Trends",
    description: "Peak activity by hour, day, or week",
  },
];

export default function PerksSection() {
  return (
    <section className="w-full px-20 py-16">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between">
        {perks.map((perk, index) => (
          <div key={perk.title} className="flex items-center gap-0">
            <div className="w-[320px] flex flex-col items-center gap-4 text-center">
              <div className="bg-[#3949ab] border border-white rounded-full p-4 backdrop-blur-md">
                <img alt={perk.title} className="w-6 h-6" src={perk.icon} />
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
