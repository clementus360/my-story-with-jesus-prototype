"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BookOpen, LayoutDashboard, Settings, LogOut } from "lucide-react";

const logoSrc = "/assets/f8d5e47573f3512eadbc708ea82da8c054f36f15.png";

const navLinks = [
  { label: "Home",       href: "/" },
  { label: "About",      href: "/about" },
  { label: "Contact",    href: "/contact" },
  { label: "Guidelines", href: "/guidelines" },
];

// ─── Avatar with initials fallback ───────────────────────────────────────────
function Avatar({ user }: { user: { name: string; initials: string; avatar?: string } }) {
  const [imgError, setImgError] = useState(false);

  if (user.avatar && !imgError) {
    return (
      <img
        src={user.avatar}
        alt={user.name}
        className="w-9 h-9 rounded-full object-cover border-2 border-[#3949ab] shrink-0"
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className="w-9 h-9 rounded-full bg-[#3949ab] text-white text-sm font-bold flex items-center justify-center shrink-0 border-2 border-[#3949ab]">
      {user.initials}
    </div>
  );
}

// ─── Dropdown menu ────────────────────────────────────────────────────────────
const userMenuItems = [
  { label: "Share Your Story", href: "/share", Icon: BookOpen },
  { label: "Dashboard",        href: "#",      Icon: LayoutDashboard },
  { label: "Settings",         href: "#",      Icon: Settings },
];

function UserMenu({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="absolute right-0 top-[calc(100%+8px)] w-52 bg-white rounded-2xl shadow-[0px_8px_32px_0px_rgba(0,0,0,0.12)] border border-[#e0e0e0] overflow-hidden z-50">
      {userMenuItems.map(({ label, href, Icon }) => (
        <Link
          key={label}
          href={href}
          className="flex items-center gap-3 px-4 py-3 text-sm text-[#333] hover:bg-[#f5f5f5] transition-colors"
        >
          <Icon size={16} className="text-[#666] shrink-0" />
          {label}
        </Link>
      ))}
      <div className="border-t border-[#e0e0e0] mx-3" />
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors"
      >
        <LogOut size={16} className="shrink-0" />
        Sign Out
      </button>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
export default function Header() {
  const router = useRouter();
  const { user, isAuthenticated, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    router.push("/");
  }

  return (
    <header className="bg-white flex items-center justify-between px-20 py-6 w-full">
      {/* Logo */}
      <div className="h-[53px] w-[300px] relative shrink-0">
        <Link href="/">
          <Image src={logoSrc} alt="My Story With Jesus" width={300} height={53} className="h-full w-auto object-contain" priority />
        </Link>
      </div>

      <div className="flex gap-10 items-center">
        {/* Nav links */}
        <nav className="flex gap-10 items-center">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[#333] text-base leading-5 hover:text-[#3949ab] transition-colors whitespace-nowrap"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* ── Unauthenticated CTA ── */}
        {!isAuthenticated && (
          <div className="flex gap-2 items-center">
            <Link
              href="/login"
              className="border border-[#3949ab] bg-[#f5f5f5] text-[#3949ab] text-base px-6 py-4 rounded-full whitespace-nowrap hover:bg-[#3949ab] hover:text-white transition-colors"
            >
              Read Story
            </Link>
            <Link
              href="/register"
              className="bg-[#3949ab] text-white text-base px-6 py-4 rounded-full whitespace-nowrap hover:bg-[#003299] transition-colors"
            >
              Share Your Story
            </Link>
          </div>
        )}

        {/* ── Authenticated user menu ── */}
        {isAuthenticated && user && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-full border border-[#e0e0e0] hover:border-[#3949ab] hover:bg-[#f5f5f5] transition-colors"
              aria-expanded={menuOpen}
              aria-haspopup="true"
            >
              <Avatar user={user} />
              <span className="text-[#333] text-sm font-medium leading-5 whitespace-nowrap max-w-[120px] truncate">
                {user.name}
              </span>
              {/* Chevron */}
              <svg
                className={`w-4 h-4 text-[#666] transition-transform shrink-0 ${menuOpen ? "rotate-180" : ""}`}
                viewBox="0 0 16 16" fill="none"
              >
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Dropdown */}
            {menuOpen && <UserMenu onLogout={handleLogout} />}
          </div>
        )}
      </div>
    </header>
  );
}
