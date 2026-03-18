// Map + icon assets
const imgWorldMap   = "/assets/3e76db26597ea9b865099fb9804673e56f7fe209.png";
const imgIconPin1   = "/assets/3c0fa342d0bd3a312ff19d6350ef419b705c7e35.svg"; // map pin stroke 1
const imgIconPin2   = "/assets/e0172f6e4d78dafcac84ccb32f9cd3fe200d77a9.svg"; // map pin stroke 2
const imgIconPin3   = "/assets/030278bd8c477efe762730b54d7bc1273341f1f5.svg"; // map pin stroke 3
const imgIconCopy1  = "/assets/fa99156067c48aeb6ec7e6df533093aff0a06892.svg"; // copy icon stroke 1
const imgIconCopy2  = "/assets/0fe2c3ad564f70ab28195f6fc80b8060e4178d48.svg"; // copy icon stroke 2
const imgIconLocate = "/assets/8a4facaf0ade05a44230a4fb07e584c4f91e6f17.svg"; // locate icon

function MapPinIcon() {
  return (
    <div className="relative shrink-0 size-6">
      <div className="absolute inset-[5.21%_21.88%_26.04%_21.88%]">
        <img alt="" className="absolute block max-w-none size-full" src={imgIconPin1} />
      </div>
      <div className="absolute inset-[21.88%_38.54%_55.21%_38.54%]">
        <img alt="" className="absolute block max-w-none size-full" src={imgIconPin2} />
      </div>
      <div className="absolute inset-[55.21%_5.21%_5.21%_5.21%]">
        <img alt="" className="absolute block max-w-none size-full" src={imgIconPin3} />
      </div>
    </div>
  );
}

function CopyIcon() {
  return (
    <div className="overflow-clip relative shrink-0 size-6">
      <div className="absolute inset-[21.88%_6.25%_6.25%_21.88%]">
        <img alt="" className="absolute block max-w-none size-full" src={imgIconCopy1} />
      </div>
      <div className="absolute inset-[6.25%_21.88%_21.88%_6.25%]">
        <img alt="" className="absolute block max-w-none size-full" src={imgIconCopy2} />
      </div>
    </div>
  );
}

function LocateIcon() {
  return (
    <div className="relative shrink-0 size-6">
      <div className="absolute inset-[10.94%]">
        <div className="absolute inset-[-5.33%]">
          <img alt="" className="block max-w-none size-full" src={imgIconLocate} />
        </div>
      </div>
    </div>
  );
}

export default function OneVisionSection() {
  return (
    <section className="w-full px-20 py-20">
      {/* Section Heading */}
      <div className="max-w-[783px] mx-auto text-center mb-10">
        <h2 className="text-[#00194c] text-[40px] font-bold leading-[44px] mb-4">
          One Vision. One Platform. Many Stories.
        </h2>
        <p className="text-[#666] text-xl leading-7">
          One Vision. One Platform. Many Stories
        </p>
      </div>

      {/* Bento */}
      <div className="flex flex-col gap-6 max-w-[1282px] mx-auto">
        {/* World map card */}
        <div className="relative h-[600px] rounded-2xl overflow-hidden flex flex-col items-start px-10 py-6">
          {/* Background map image */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <img
              alt="World map"
              className="absolute w-full max-w-none object-cover"
              style={{ height: "140.46%", top: "-25.71%", left: "-0.01%" }}
              src={imgWorldMap}
            />
          </div>
          {/* Top gradient */}
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.64) 4.8%, rgba(0,0,0,0) 35.6%)",
            }}
          />
          {/* Inner shadow */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0px_4px_4px_0px_rgba(0,0,0,0.25)]" />

          {/* Trending pill */}
          <div className="relative z-10">
            <div className="backdrop-blur-[4px] border border-white/50 flex gap-2 items-center px-5 py-2 rounded-full">
              <MapPinIcon />
              <span className="text-white text-base leading-5">
                Stories trending in:{" "}
                <strong className="text-[#e5edff] font-bold">
                  North America, Europe, Africa
                </strong>
              </span>
            </div>
          </div>
        </div>

        {/* Feature cards row */}
        <div className="grid grid-cols-2 gap-4">
          {/* Multi-Front Architecture */}
          <div className="bg-[#00194c] rounded-2xl p-10 flex flex-col justify-between h-[252px]">
            <div className="bg-white/80 backdrop-blur-md rounded-full p-4 w-fit border border-white">
              <CopyIcon />
            </div>
            <div>
              <h3 className="text-white text-2xl font-medium mb-4 whitespace-nowrap">
                Multi-Front Architecture
              </h3>
              <p className="text-[#f5f5f5] text-base leading-5">
                Single-Engine backend powers regional sites like mystorywithjesus.com (English)
                and mihistoriaconjesus.com (Spanish).
              </p>
            </div>
          </div>

          {/* Proximity Logic */}
          <div className="bg-[#003299] rounded-2xl p-10 flex flex-col justify-between h-[252px]">
            <div className="bg-white/80 backdrop-blur-md rounded-full p-4 w-fit border border-white">
              <LocateIcon />
            </div>
            <div>
              <h3 className="text-white text-2xl font-medium mb-4 whitespace-nowrap">
                Proximity Logic
              </h3>
              <p className="text-[#f5f5f5] text-base leading-5">
                Location data surfaces local stories first, creating immediate connection between
                readers and authors in the same city.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
