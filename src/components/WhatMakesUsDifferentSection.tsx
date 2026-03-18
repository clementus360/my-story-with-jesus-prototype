const imgGlobalReach = "http://localhost:3845/assets/2c8af520db8b2da2b9bf74c429690d48178e41c0.png";
const imgMultimedia = "http://localhost:3845/assets/a57ab92c0455773f14ef972f47154c38a03a8216.png";
const imgIconVideo = "http://localhost:3845/assets/2d14be374a258035d581b882ab90e149870ef83c.svg";
const imgIconImage = "http://localhost:3845/assets/77c390d3b29335759dde45bdf933b1b150c232e7.svg";
const imgIconText = "http://localhost:3845/assets/a21413af7261d8526057a4477e3b4a68c922138b.svg";
const imgIconAI = "http://localhost:3845/assets/77335cffb822d185ec6ca486a24fd8e0b294a4df.svg";
const imgIconAnalytics = "http://localhost:3845/assets/2525a7fce8aaa21dbc34acf1289ab9f5aa774a9f.svg";
const imgIconQR = "http://localhost:3845/assets/952158f716855843bcd63c5856026a88cb23831c.svg";

const languages = ["EN", "ES", "FR", "PT", "ZH"];

const mediaTypes = [
  { icon: imgIconVideo, label: "Video" },
  { icon: imgIconImage, label: "Images" },
  { icon: imgIconText, label: "Text" },
];

const bottomFeatures = [
  {
    icon: imgIconAI,
    title: "AI-Driven Discovery",
    description: "Smart algorithm surfaces trending stories and nearby testimonies based on location.",
    bg: "bg-[#00194c]",
  },
  {
    icon: imgIconAnalytics,
    title: "Impact Analytics",
    description: "Track views, scans, and geographic reach. See real-time impact worldwide.",
    bg: "bg-[#003299]",
  },
  {
    icon: imgIconQR,
    title: "QR Business Cards",
    description: "Free personalized evangelism cards with trackable QR codes.",
    bg: "bg-[#3949ab]",
  },
];

export default function WhatMakesUsDifferentSection() {
  return (
    <section className="w-full px-20 py-20">
      {/* Section Heading */}
      <div className="max-w-[783px] mx-auto text-center mb-10">
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
          <div className="col-span-2 h-[420px] rounded-2xl overflow-hidden relative flex flex-col justify-end p-10">
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
          <div className="col-span-1 h-[420px] rounded-2xl overflow-hidden relative flex flex-col justify-between p-10 bg-[#00194c]">
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
              {mediaTypes.map(({ icon, label }) => (
                <div
                  key={label}
                  className="bg-[rgba(40,53,147,0.5)] border border-[#99baff] rounded-2xl flex items-center gap-3 px-6 py-4"
                >
                  <div className="bg-white/80 rounded-full p-2 backdrop-blur-md shrink-0">
                    <img alt={label} className="w-5 h-5" src={icon} />
                  </div>
                  <span className="text-white text-xl leading-7">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-3 gap-5">
          {bottomFeatures.map(({ icon, title, description, bg }) => (
            <div key={title} className={`${bg} rounded-2xl p-10 flex flex-col justify-between h-[252px]`}>
              <div className="bg-white/80 backdrop-blur-md rounded-full p-4 w-fit border border-white">
                <img alt={title} className="w-6 h-6" src={icon} />
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
