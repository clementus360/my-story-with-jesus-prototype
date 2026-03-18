const logoSrc = "http://localhost:3845/assets/f8d5e47573f3512eadbc708ea82da8c054f36f15.png";

const navLinks = ["Home", "About", "Contact", "Guidelines"];

export default function Header() {
  return (
    <header className="bg-white flex items-center justify-between px-20 py-6 w-full">
      <div className="h-[53px] w-[300px] relative shrink-0">
        <img alt="My Story With Jesus" className="h-full w-auto object-contain" src={logoSrc} />
      </div>

      <div className="flex gap-10 items-center">
        <nav className="flex gap-10 items-center">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-[#333] text-base leading-5 hover:text-[#3949ab] transition-colors whitespace-nowrap"
            >
              {link}
            </a>
          ))}
        </nav>

        <div className="flex gap-2 items-center">
          <a
            href="#"
            className="border border-[#3949ab] bg-[#f5f5f5] text-[#3949ab] text-base px-6 py-4 rounded-full whitespace-nowrap hover:bg-[#3949ab] hover:text-white transition-colors"
          >
            Read Story
          </a>
          <a
            href="#"
            className="bg-[#3949ab] text-white text-base px-6 py-4 rounded-full whitespace-nowrap hover:bg-[#003299] transition-colors"
          >
            Share Your Story
          </a>
        </div>
      </div>
    </header>
  );
}
