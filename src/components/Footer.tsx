const logoSrc = "http://localhost:3845/assets/1dadfaa94ab6e3472c340b8e6b5a3cc3378243e7.png";
const imgIconFacebook = "http://localhost:3845/assets/0465d34fd7fceb5f3500d437d904992a580e5dd7.svg";
const imgIconTwitter = "http://localhost:3845/assets/3b3f3a40b4c438e81fc748996ba4411c9067966d.svg";
const imgIconInstagram = "http://localhost:3845/assets/6347f0ceb52515685f762ffad302cefeb2f1f24d.svg";
const imgIconYoutube = "http://localhost:3845/assets/2cdb6aceefc3dda21c915e310ef45cbdb35b9220.svg";

const exploreLinks = ["Read Stories", "Featured Testimonies", "By Topic", "By Location"];
const shareLinks = ["Share Your Story", "Create Account", "Guidelines"];
const socialIcons = [imgIconFacebook, imgIconTwitter, imgIconInstagram, imgIconYoutube];

export default function Footer() {
  return (
    <footer className="bg-[#00194c] w-full pt-16 px-20">
      <div className="grid grid-cols-4 gap-12 pb-12">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <img alt="My Story With Jesus" className="h-10 w-auto object-contain" src={logoSrc} />
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
            {socialIcons.map((icon, i) => (
              <a
                key={i}
                href="#"
                className="bg-white/10 rounded-full w-10 h-10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <img alt="Social" className="w-5 h-5" src={icon} />
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
