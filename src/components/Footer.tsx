import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Image from "next/image";

const logoSrc = "/assets/1dadfaa94ab6e3472c340b8e6b5a3cc3378243e7.png";

const exploreLinks = ["Read Stories", "Featured Testimonies", "By Topic", "By Location"];
const shareLinks = ["Share Your Story", "Create Account", "Guidelines"];

const socialLinks = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Youtube, label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-[#00194c] w-full pt-16 px-20">
      <div className="grid grid-cols-4 gap-12 pb-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <Image src={logoSrc} alt="My Story With Jesus" width={200} height={40} className="h-10 w-auto object-contain" />
          <p className="text-white/80 text-base leading-5 w-[224px]">
            Real people. Real stories. A real Jesus.
          </p>
        </div>

        {/* Explore */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white text-xl font-medium">Explore</h4>
          <ul className="flex flex-col gap-3">
            {exploreLinks.map((link) => (
              <li key={link}>
                <a href="#" className="text-white/80 text-base hover:text-white transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Share */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white text-xl font-medium">Share</h4>
          <ul className="flex flex-col gap-3">
            {shareLinks.map((link) => (
              <li key={link}>
                <a href="#" className="text-white/80 text-base hover:text-white transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div className="flex flex-col gap-4">
          <h4 className="text-white text-xl font-medium">Connect</h4>
          <div className="flex gap-4">
            {socialLinks.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="bg-white/10 rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <Icon size={18} className="text-white" />
              </a>
            ))}
          </div>
          <p className="text-white/80 text-sm">Join our community</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 py-4 flex items-center justify-between">
        <p className="text-white/60 text-base">
          © 2026 My Story With Jesus. All rights reserved.
        </p>
        <p className="text-white/60 text-base">Made for believers worldwide</p>
      </div>
    </footer>
  );
}
