import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  AlertTriangle,
  Users,
  BookOpen,
  Globe,
  MessageCircle,
  Flag,
} from "lucide-react";

const sections = [
  {
    id: "authenticity",
    Icon: Heart,
    title: "Authenticity & Truth",
    color: "#e53935",
    rules: [
      "Share only your own genuine, personal testimony. Do not fabricate or embellish events.",
      "Represent your story honestly, including the struggles and not just the triumphs.",
      "Do not claim experiences that belong to someone else or present hearsay as personal experience.",
      "If your story involves others, use discretion and change identifying details where necessary to protect their privacy.",
    ],
  },
  {
    id: "respect",
    Icon: Users,
    title: "Respect & Inclusion",
    color: "#3949ab",
    rules: [
      "Treat every story and every person with dignity, regardless of background, denomination, or journey.",
      "Avoid language that demeans, mocks, or dismisses other faith traditions or people who do not yet believe.",
      "Celebrate diversity — Jesus draws people from every nation, tribe, and tongue.",
      "Do not engage in arguments about denominational differences in the comments or story submissions.",
    ],
  },
  {
    id: "content",
    Icon: BookOpen,
    title: "Appropriate Content",
    color: "#f9a825",
    rules: [
      "Stories should be Christ-centred and focused on God's work in your life.",
      "Graphic descriptions of violence, abuse, or explicit content are not permitted, even as part of a testimony.",
      "You may reference difficult experiences (addiction, trauma, illness) but keep descriptions tasteful and redemptive in tone.",
      "Do not include commercial promotions, links to products, or solicitations for donations within your story.",
    ],
  },
  {
    id: "safety",
    Icon: ShieldCheck,
    title: "Safety & Privacy",
    color: "#2e7d32",
    rules: [
      "Never share another person's private information (address, phone number, full name) without their explicit consent.",
      "If your story involves minors, do not include identifying information about them.",
      "Do not use the platform to arrange in-person meetings or solicit personal contact information from others.",
      "If you are currently in danger or crisis, please contact your local emergency services or a crisis line immediately.",
    ],
  },
  {
    id: "community",
    Icon: MessageCircle,
    title: "Community Interaction",
    color: "#6a1b9a",
    rules: [
      "Respond to others' stories with encouragement and prayer, not critique or theological debate.",
      "Harassment, bullying, or targeted negative comments of any kind will result in immediate removal.",
      "Do not spam reactions, duplicate stories, or flood the platform with repeated submissions.",
      "Constructive feedback on someone's story is welcome only when directly invited by the author.",
    ],
  },
  {
    id: "global",
    Icon: Globe,
    title: "Global Sensitivity",
    color: "#00838f",
    rules: [
      "Be mindful that this is a global community — avoid idioms, cultural references, or humour that may not translate.",
      "Do not use stories as a platform for political commentary, even if framed in spiritual language.",
      "Respect that believers in some regions face real danger — avoid identifying specific individuals in high-risk countries.",
      "Translate the spirit of your story clearly so that it transcends cultural context and speaks to the universal human experience of faith.",
    ],
  },
];

const prohibited = [
  "False or fabricated testimonies",
  "Hate speech or discriminatory language",
  "Graphic or explicit content",
  "Promotion of cults or heretical movements",
  "Spam, advertising, or affiliate links",
  "Impersonation of another person",
  "Content that endangers vulnerable individuals",
  "Harassment of other community members",
];

export default function GuidelinesPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="bg-[#00194c] px-6 py-20 text-center">
        <div className="max-w-[680px] mx-auto">
          <p className="text-[#7986cb] text-sm font-semibold uppercase tracking-widest mb-4">Community Guidelines</p>
          <h1 className="text-white text-[48px] font-bold leading-tight mb-5">
            A space built on truth, grace, and love
          </h1>
          <p className="text-[#b0bec5] text-lg leading-relaxed">
            Our community exists to glorify God through authentic testimony. These guidelines help
            us maintain a safe, uplifting space for believers and seekers worldwide.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-[800px] mx-auto px-6 py-16 text-center">
        <p className="text-[#444] text-lg leading-8">
          Every story shared here carries the potential to change a life. We take that responsibility
          seriously. These guidelines are not restrictions — they are the conditions that make
          authentic, powerful testimony possible.
        </p>
        <p className="text-[#858585] text-sm mt-4">
          Last updated: March 2026 · Questions? <Link href="/contact" className="text-[#3949ab] hover:underline">Contact us</Link>
        </p>
      </section>

      {/* Guidelines grid */}
      <section className="max-w-[1100px] mx-auto px-6 pb-16">
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map(({ id, Icon, title, color, rules }) => (
            <div
              key={id}
              className="bg-white rounded-2xl border border-[#e0e0e0] p-7 hover:shadow-[0px_8px_32px_0px_rgba(0,0,0,0.07)] transition-shadow"
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${color}18` }}
                >
                  <Icon size={20} style={{ color }} />
                </div>
                <h2 className="text-[#00194c] font-bold text-lg">{title}</h2>
              </div>
              <ul className="flex flex-col gap-3">
                {rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 w-5 h-5 rounded-full text-white text-[11px] font-bold flex items-center justify-center shrink-0"
                      style={{ backgroundColor: color }}
                    >
                      {i + 1}
                    </span>
                    <p className="text-[#555] text-sm leading-6">{rule}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Prohibited content */}
      <section className="bg-[#fff8f8] border-y border-[#fde0e0] px-6 py-16">
        <div className="max-w-[800px] mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
            <h2 className="text-[#00194c] font-bold text-2xl">Strictly Prohibited</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {prohibited.map((item) => (
              <div key={item} className="flex items-start gap-3 bg-white rounded-xl border border-[#fde0e0] px-4 py-3">
                <X size={14} className="text-red-400 mt-0.5 shrink-0" />
                <span className="text-sm text-[#555]">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reporting */}
      <section className="max-w-[800px] mx-auto px-6 py-16">
        <div className="bg-[#f5f7ff] border border-[#c5cae9] rounded-2xl p-8 text-center">
          <div className="w-12 h-12 bg-[#3949ab]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Flag size={22} className="text-[#3949ab]" />
          </div>
          <h2 className="text-[#00194c] font-bold text-xl mb-3">See something that breaks these guidelines?</h2>
          <p className="text-[#666] text-sm leading-6 mb-6 max-w-[480px] mx-auto">
            Every story has a "Report" option. Use it — your report is confidential and helps us
            keep this community safe and honouring to God.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#3949ab] text-white text-sm font-medium px-8 py-3 rounded-full hover:bg-[#003299] transition-colors"
          >
            Contact the moderation team
          </Link>
        </div>
      </section>

      {/* Consequences */}
      <section className="bg-[#f9f9f9] px-6 py-16">
        <div className="max-w-[800px] mx-auto">
          <h2 className="text-[#00194c] font-bold text-2xl mb-8 text-center">Enforcement</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { step: "1st violation", action: "Story removed + warning issued", color: "#f9a825" },
              { step: "2nd violation", action: "Temporary suspension of posting privileges", color: "#e65100" },
              { step: "3rd violation", action: "Permanent removal from the platform", color: "#c62828" },
            ].map(({ step, action, color }) => (
              <div key={step} className="bg-white rounded-2xl border border-[#e0e0e0] p-5 text-center">
                <div
                  className="text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ color }}
                >
                  {step}
                </div>
                <p className="text-[#333] text-sm leading-5">{action}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-[#858585] text-sm mt-6">
            Severe violations (illegal content, threats) may result in immediate permanent removal
            and reporting to relevant authorities.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function X({ size, className }: { size: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
