const imgHeroBg = "/assets/e980077697368521cb46b7e65da3158c5cc21f0e.png";

export default function AboutHero() {
  return (
    <section className="relative w-full h-[640px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          src={imgHeroBg}
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-[#00194c]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-10 px-20 text-center max-w-[1113px]">
        <h1 className="text-white text-[60px] font-bold leading-[60px]">
          Not everyone is called to preach from a stage—but everyone has a story.
        </h1>
        <p className="text-white text-xl leading-7 max-w-[953px]">
          Every believer has a story. This is a simple platform to share yours online and carry
          it into everyday life.
        </p>
        <div className="flex gap-2 items-center">
          <a
            href="#"
            className="bg-[#f5f5f5] border border-[#3949ab] text-[#3949ab] text-base px-6 py-4 rounded-full hover:bg-white transition-colors whitespace-nowrap"
          >
            Read Story
          </a>
          <a
            href="#"
            className="bg-[#3949ab] text-white text-base px-6 py-4 rounded-full hover:bg-[#003299] transition-colors whitespace-nowrap"
          >
            Share Your Story
          </a>
        </div>
      </div>
    </section>
  );
}
