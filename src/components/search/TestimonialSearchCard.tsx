import { Eye, Heart } from "lucide-react";
import type { Testimonial } from "@/data/testimonials";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default function TestimonialSearchCard({
  testimonial,
  onTagClick,
  onClick,
}: {
  testimonial: Testimonial;
  onTagClick?: (tag: string) => void;
  onClick?: () => void;
}) {
  const t = testimonial;

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-xl border border-[#ebebeb] overflow-hidden hover:border-[#c5cae9] hover:shadow-sm transition-all duration-200 group"
    >
      {/* Photo */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={t.photo}
          alt={t.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute bottom-2 left-3 text-white text-[10px] font-medium bg-black/30 px-2 py-0.5 rounded-full">
          {t.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2.5">
        <h3 className="text-[#00194c] font-semibold text-sm leading-snug line-clamp-2 group-hover:text-[#3949ab] transition-colors">
          {t.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {t.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              onClick={(e) => { e.stopPropagation(); onTagClick?.(tag); }}
              className="text-[10px] text-[#3949ab] bg-[#f0f2ff] px-2 py-0.5 rounded-full cursor-pointer hover:bg-[#3949ab] hover:text-white transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author + stats */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            <img src={t.avatar} alt={t.name} className="w-5 h-5 rounded-full object-cover" />
            <span className="text-[#555] text-[11px]">{t.name} · {t.location}</span>
          </div>
          <div className="flex items-center gap-2.5 text-[#aaa]">
            <span className="flex items-center gap-0.5 text-[10px]"><Eye size={10} />{t.views.toLocaleString()}</span>
            <span className="flex items-center gap-0.5 text-[10px]"><Heart size={10} />{t.likes.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </button>
  );
}
