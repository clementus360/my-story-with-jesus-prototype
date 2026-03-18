// Icons
const imgIconWrite1  = "http://localhost:3845/assets/2e3dd0236754bc95afa704853bcb37abb90aea90.svg"; // create stroke
const imgIconWrite2  = "http://localhost:3845/assets/d862a98ceb4e4c4173cd349e550930ae4c091077.svg"; // create vector
const imgIconPublish = "http://localhost:3845/assets/9be5a2749a730971b324b7a710548cbdd3e1edb8.svg"; // upload/download stroke
const imgIconQR      = "http://localhost:3845/assets/75dd3f0571c230842aafb27b707d33642b21d925.svg"; // QR
const imgIconHeart   = "http://localhost:3845/assets/fc1d68ff713b706a400fbee42add2a92e8cf09cb.svg"; // heart

function WriteIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-6">
      <div className="absolute inset-[21.88%_21.88%_9.38%_9.38%]">
        <img alt="" className="absolute block max-w-none size-full" src={imgIconWrite1} />
      </div>
      <div className="absolute inset-[9.37%_9.37%_40.62%_40.62%]">
        <img alt="" className="absolute block max-w-none size-full" src={imgIconWrite2} />
      </div>
    </div>
  );
}

function PublishIcon() {
  return (
    <div className="flex items-center justify-center relative shrink-0">
      {/* Flipped vertically to show upload arrow */}
      <div className="-scale-y-100 flex-none">
        <div className="relative size-6">
          <div className="absolute inset-[15.63%_13.54%_13.54%_13.54%]">
            <img alt="" className="absolute block max-w-none size-full" src={imgIconPublish} />
          </div>
        </div>
      </div>
    </div>
  );
}

function QRIcon() {
  return (
    <div className="relative shrink-0 size-6">
      <div className="absolute inset-[16.67%]">
        <img alt="" className="absolute block max-w-none size-full" src={imgIconQR} />
      </div>
    </div>
  );
}

function HeartIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-6">
      <div className="absolute inset-[16.67%_12.5%_12.83%_8.33%]">
        <img alt="" className="absolute block max-w-none size-full" src={imgIconHeart} />
      </div>
    </div>
  );
}

const steps = [
  {
    number: "1",
    icon: <WriteIcon />,
    title: "Write (5 Minutes)",
    description: "Use the Writer's Studio to tell what Jesus has done in your life.",
  },
  {
    number: "2",
    icon: <PublishIcon />,
    title: "Publish",
    description:
      "AI auto-tags your story (e.g., #Healing, #Restoration) to reach people searching for those exact topics.",
  },
  {
    number: "3",
    icon: <QRIcon />,
    title: "Equip",
    description:
      "Receive personalized business cards with a unique QR code linking to your page.",
  },
  {
    number: "4",
    icon: <HeartIcon />,
    title: "Share",
    description:
      'Hand out cards in shops, workplaces, or while traveling. "You can read my story with Jesus here."',
  },
];

export default function SimplePictureSection() {
  return (
    <section className="bg-[#e0e0e0] w-full py-20 flex flex-col items-center gap-16 relative">
      {/* Connecting line at step-icon level */}
      <div className="absolute top-[252px] left-0 right-0 h-px bg-[#bdbdbd]" />

      {/* Section Heading */}
      <div className="max-w-[783px] text-center relative z-10">
        <h2 className="text-[#00194c] text-[40px] font-bold leading-[44px] mb-4">
          The &ldquo;Simple Picture&rdquo;
        </h2>
        <p className="text-[#666] text-xl leading-7">
          Digital to Physical—Four simple steps to share your testimony
        </p>
      </div>

      {/* Steps */}
      <div className="w-full max-w-[1280px] px-4 relative z-10">
        <div className="grid grid-cols-4 gap-6 h-[252px] items-center">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col h-full justify-center p-4 rounded-2xl">
              <div className="flex items-end relative">
                {/* Ghost number */}
                <span className="text-[200px] font-bold leading-[140px] text-[#3949ab] opacity-5 select-none shrink-0 -mr-10">
                  {step.number}
                </span>
                <div className="flex flex-col gap-10 shrink-0 flex-1 -ml-10 relative z-10">
                  {/* Icon */}
                  <div className="bg-[#3949ab] border border-white backdrop-blur-md rounded-full p-4 w-fit">
                    {step.icon}
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
      <div className="flex flex-col items-center gap-2 relative z-10">
        <button className="bg-[#3949ab] text-white text-xl leading-7 px-6 py-5 rounded-full hover:bg-[#003299] transition-colors">
          Start Sharing Today
        </button>
        <p className="text-[#666] text-base text-center">
          Join thousands of believers sharing their stories
        </p>
      </div>
    </section>
  );
}
