export default function CtaSection() {
  return (
    <section className="w-full px-20 py-10">
      <div className="bg-[#3949ab] rounded-2xl px-[253px] py-20 flex flex-col items-center">
        <div className="max-w-[774px] flex flex-col items-center gap-10 text-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-white text-[60px] font-bold leading-[60px]">
              Ready to Inspire Others?
            </h2>
            <p className="text-white text-xl leading-7 max-w-[659px]">
              Join thousands of believers worldwide who are sharing their stories of faith,
              healing, and transformation through Jesus Christ.
            </p>
          </div>
          <a href="/share" className="bg-[#f5f5f5] border border-[#3949ab] text-[#3949ab] text-2xl font-medium px-6 py-4 rounded-full hover:bg-white transition-colors">
            Share Your Story
          </a>
        </div>
      </div>
    </section>
  );
}
