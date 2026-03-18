const imgBg       = "/assets/9473d5f8ad5cb017f863dfa628977a31d3b7d435.png";
const imgVideo    = "/assets/356a3ddf9c430503fdbb2972080c8f433d4be278.png";
const imgPlayIcon = "/assets/ce5190fec291d9412b98d7028e290ed3f6f795e3.svg";

// Connector lines between avatars and video
const connectorLines = [
  { src: "/assets/99f32dba21322af18d717314d838d71970b103d7.svg",  deg: -33.93,  w: 132.6  },
  { src: "/assets/504e130a44f6d4db8780c0c374936b59f16b6b71.svg",  deg: -3.6,    w: 191.4  },
  { src: "/assets/673a1e5d44ee401689c9c8ae56385d22d29e1a23.svg",  deg: 60.84,   w: 108.8  },
  { src: "/assets/3e0ec7922ca079672207af6268fa6f3e2588d132.svg",  deg: 90,      w: 102    },
  { src: "/assets/857c260963906c8a46d166eb728b73c9b1f10839.svg",  deg: 149.04,  w: 122.5  },
  { src: "/assets/3894b1b96662992aed6c0eab7bb69650e786e7d1.svg",  deg: 172.79,  w: 159.3  },
  { src: "/assets/a64783602ca3b1a7f94f04aafa4d5948bca4d491.svg",  deg: -147.99, w: 113.2  },
];

// 7 community avatars + their absolute positions (ml / mt from Figma grid origin)
const avatars = [
  { src: "/assets/377268403580342663fd510d39b202c00b515953.png",  ml: 74,   mt: 658 },
  { src: "/assets/a2694540b0bbe13388ba733365eeb1f82df47250.png",  ml: 0,    mt: 324 },
  { src: "/assets/77167c0aecbac770481e8ed549f4281e5344eef5.png",  ml: 162,  mt: 0   },
  { src: "/assets/9a5acc9f8fee76c2678e52e6dd18e938c596b141.png",  ml: 606,  mt: 0   },
  { src: "/assets/0d1499e14d0666e7cca39a942c45542a9b1281c1.png",  ml: 1048, mt: 56  },
  { src: "/assets/29cce539192758a143c71a71dc9d074687c54964.png",  ml: 1128, mt: 374 },
  { src: "/assets/3e37bef5c2660a9684f3543d875e8138d852ea10.png",  ml: 1048, mt: 658 },
];

// Video card placed at ml:212, mt:156 within the grid
const VIDEO_ML = 212;
const VIDEO_MT = 156;
const GRID_W   = 1258; // 1128 + 100 (rightmost avatar)
const GRID_H   = 758;  // 658 + 100 (bottom avatars)

export default function VideoSection() {
  return (
    <section className="relative w-full flex flex-col items-center pb-[108px] pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#e9e9e9]" />
        <img alt="" className="absolute inset-0 w-full h-full object-cover opacity-10" src={imgBg} />
      </div>

      {/* Grid layout — avatars + video + connector lines */}
      <div
        className="relative shrink-0 mb-7"
        style={{ width: GRID_W, height: GRID_H }}
      >
        {/* Connector lines */}
        {connectorLines.map(({ src, deg, w }, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%)`,
            }}
          >
            <div style={{ transform: `rotate(${deg}deg)`, width: w, height: 1 }}>
              <img alt="" className="block w-full" src={src} />
            </div>
          </div>
        ))}

        {/* Avatars */}
        {avatars.map(({ src, ml, mt }, i) => (
          <div
            key={i}
            className="absolute size-[100px] rounded-full overflow-hidden border-2 border-white shadow-md"
            style={{ left: ml, top: mt }}
          >
            <img alt="Community member" className="w-full h-full object-cover" src={src} />
          </div>
        ))}

        {/* Video card */}
        <div
          className="absolute bg-[#3949ab] rounded-2xl overflow-hidden p-6"
          style={{ left: VIDEO_ML, top: VIDEO_MT }}
        >
          <div
            className="relative rounded-2xl overflow-hidden shadow-[0px_6px_24px_0px_rgba(0,0,0,0.05)] flex flex-col items-center justify-center"
            style={{ width: 734, height: 460 }}
          >
            {/* Video thumbnail */}
            <img
              alt="Video testimony"
              className="absolute inset-0 w-full h-full object-cover"
              src={imgVideo}
            />
            <div className="absolute inset-0 bg-black/62" />

            {/* Play button */}
            <div className="relative z-10 bg-[#99baff] rounded-full p-4">
              <div className="bg-[#f5f5f5] rounded-full size-[120px] flex items-center justify-center">
                <div className="relative size-full overflow-clip">
                  <div className="absolute inset-[21.42%_20.83%_20.25%_33.33%]">
                    <img alt="Play" className="absolute block max-w-none size-full" src={imgPlayIcon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <p className="relative z-10 text-[#333] text-2xl font-medium text-center">
        Over{" "}
        <span className="text-[#3949ab]">1000</span>
        {" "}shared testimonies worldwide
      </p>
    </section>
  );
}
