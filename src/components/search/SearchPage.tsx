"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Search, SlidersHorizontal, X, Eye, Heart, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials, type Testimonial } from "@/data/testimonials";
import SearchFilters, { type FilterState } from "./SearchFilters";
import TestimonialSearchCard from "./TestimonialSearchCard";

// ─── Filter logic ─────────────────────────────────────────────────────────────

const DEFAULT_FILTERS: FilterState = {
  sort: "recent", category: "", tags: [], countries: [], readTime: "all",
};

function filtersToParams(q: string, f: FilterState) {
  const p = new URLSearchParams();
  if (q) p.set("q", q);
  if (f.sort !== "recent") p.set("sort", f.sort);
  if (f.category) p.set("category", f.category);
  if (f.tags.length) p.set("tags", f.tags.join(","));
  if (f.countries.length) p.set("countries", f.countries.join(","));
  if (f.readTime !== "all") p.set("readTime", f.readTime);
  return p;
}

function paramsToState(params: URLSearchParams): { q: string; filters: FilterState } {
  return {
    q: params.get("q") ?? "",
    filters: {
      sort:      params.get("sort")      ?? "recent",
      category:  params.get("category") ?? "",
      tags:      params.get("tags")      ? params.get("tags")!.split(",")      : [],
      countries: params.get("countries") ? params.get("countries")!.split(",") : [],
      readTime:  params.get("readTime")  ?? "all",
    },
  };
}

function applyFilters(q: string, f: FilterState) {
  let r = [...testimonials];
  if (q.trim()) {
    const lo = q.toLowerCase();
    r = r.filter((t) =>
      [t.title, t.excerpt, t.name, t.location, t.country, t.category, ...t.tags]
        .some((s) => s.toLowerCase().includes(lo))
    );
  }
  if (f.category)         r = r.filter((t) => t.category === f.category);
  if (f.tags.length)      r = r.filter((t) => f.tags.some((tag) => t.tags.includes(tag)));
  if (f.countries.length) r = r.filter((t) => f.countries.includes(t.country));
  if (f.readTime === "short")  r = r.filter((t) => t.readTime < 5);
  if (f.readTime === "medium") r = r.filter((t) => t.readTime >= 5 && t.readTime <= 10);
  if (f.readTime === "long")   r = r.filter((t) => t.readTime > 10);
  r.sort((a, b) => {
    if (f.sort === "views")         return b.views    - a.views;
    if (f.sort === "likes")         return b.likes    - a.likes;
    if (f.sort === "oldest")        return +new Date(a.date) - +new Date(b.date);
    if (f.sort === "read-time-asc") return a.readTime - b.readTime;
    return +new Date(b.date) - +new Date(a.date);
  });
  return r;
}

function getRelated(t: Testimonial): Testimonial[] {
  return testimonials
    .filter((o) => o.id !== t.id && t.tags.some((tag) => o.tags.includes(tag)))
    .sort((a, b) => {
      const sa = t.tags.filter((tag) => a.tags.includes(tag)).length;
      const sb = t.tags.filter((tag) => b.tags.includes(tag)).length;
      return sb - sa;
    })
    .slice(0, 4);
}

// ─── Related mini card (like homepage scrolling cards) ────────────────────────

function MiniCard({ t, onClick }: { t: Testimonial; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative w-[116px] h-[164px] rounded-2xl overflow-hidden shrink-0 group"
      style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.18)" }}
    >
      <img src={t.photo} alt={t.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

      {/* Hover ring */}
      <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-white/50 transition-all duration-200" />

      {/* Arrow badge */}
      <div className="absolute top-2.5 right-2.5 w-6 h-6 bg-white/0 group-hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
        <ArrowRight size={11} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Name + tag */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5">
        <p className="text-white text-[11px] font-semibold leading-tight line-clamp-1">{t.name}</p>
        <p className="text-white/60 text-[9px] mt-0.5 line-clamp-1">
          {t.tags.slice(0, 2).map((tag) => `#${tag}`).join(" ")}
        </p>
      </div>
    </button>
  );
}

// ─── Expanded overlay ─────────────────────────────────────────────────────────

function TestimonialOverlay({
  testimonial,
  onClose,
  onNavigate,
}: {
  testimonial: Testimonial;
  onClose: () => void;
  onNavigate: (t: Testimonial) => void;
}) {
  const related = getRelated(testimonial);
  const left    = related.slice(0, 2);
  const right   = related.slice(2, 4);

  // Close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const date = new Date(testimonial.date).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ animation: "fade-in 0.2s ease" }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/55"
        style={{ backdropFilter: "blur(3px)" }}
        onClick={onClose}
      />

      {/* Layout: left column | center card | right column */}
      <div className="relative flex items-center gap-5 max-w-[860px] w-full">

        {/* Left related cards */}
        <div className="hidden sm:flex flex-col gap-4 shrink-0" style={{ animation: "slide-in-left 0.3s ease 0.05s both" }}>
          {left.length > 0 ? left.map((r) => (
            <MiniCard key={r.id} t={r} onClick={() => onNavigate(r)} />
          )) : (
            <div className="w-[116px]" />
          )}
        </div>

        {/* Center: expanded card */}
        <div
          className="flex-1 min-w-0 bg-white rounded-2xl overflow-hidden"
          style={{
            boxShadow: "0 24px 64px rgba(0,0,0,0.28)",
            animation: "scale-in 0.25s ease",
          }}
        >
          {/* Photo */}
          <div className="relative h-52 overflow-hidden">
            <img src={testimonial.photo} alt={testimonial.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

            {/* Category */}
            <span className="absolute bottom-3 left-4 text-white text-xs font-medium bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
              {testimonial.category}
            </span>

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-8 h-8 bg-black/25 hover:bg-black/45 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors"
            >
              <X size={15} className="text-white" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 flex flex-col gap-4">
            <div>
              <h2 className="text-[#00194c] font-bold text-lg leading-snug mb-1">{testimonial.title}</h2>
              <p className="text-[#666] text-sm leading-6 line-clamp-3">{testimonial.excerpt}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {testimonial.tags.map((tag) => (
                <span key={tag} className="text-xs text-[#3949ab] bg-[#f0f2ff] border border-[#c5cae9]/50 px-2.5 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author + stats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <p className="text-[#333] text-sm font-semibold leading-none mb-0.5">{testimonial.name}</p>
                  <p className="text-[#858585] text-xs">{testimonial.location} · {date}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-[#aaa]">
                <span className="flex items-center gap-1 text-xs"><Eye size={12} />{testimonial.views.toLocaleString()}</span>
                <span className="flex items-center gap-1 text-xs"><Heart size={12} />{testimonial.likes.toLocaleString()}</span>
              </div>
            </div>

            {/* CTA */}
            <button className="w-full bg-[#3949ab] hover:bg-[#003299] text-white rounded-full py-3 text-sm font-medium transition-colors">
              Read Full Story
            </button>

            {/* Related hint (mobile only) */}
            {related.length > 0 && (
              <div className="sm:hidden">
                <p className="text-[#858585] text-xs mb-2">Related testimonies</p>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {related.map((r) => (
                    <MiniCard key={r.id} t={r} onClick={() => onNavigate(r)} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right related cards */}
        <div className="hidden sm:flex flex-col gap-4 shrink-0" style={{ animation: "slide-in-right 0.3s ease 0.05s both" }}>
          {right.length > 0 ? right.map((r) => (
            <MiniCard key={r.id} t={r} onClick={() => onNavigate(r)} />
          )) : (
            <div className="w-[116px]" />
          )}
        </div>
      </div>

      {/* Related label hint */}
      {related.length > 0 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-1.5 text-white/50 text-xs pointer-events-none" style={{ animation: "fade-in 0.4s ease 0.3s both" }}>
          <ChevronLeft size={12} />
          related testimonies
          <ChevronRight size={12} />
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function SearchPage() {
  const searchParams = useSearchParams();
  const router       = useRouter();

  const [query,          setQuery]          = useState(() => searchParams.get("q") ?? "");
  const [inputValue,     setInputValue]     = useState(() => searchParams.get("q") ?? "");
  const [filters,        setFilters]        = useState<FilterState>(() => paramsToState(searchParams).filters);
  const [filtersVisible, setFiltersVisible] = useState(true);
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [selected,       setSelected]       = useState<Testimonial | null>(null);

  useEffect(() => {
    const { q, filters: f } = paramsToState(searchParams);
    setQuery(q); setInputValue(q); setFilters(f);
  }, [searchParams]);

  const pushURL = useCallback((q: string, f: FilterState) => {
    const p = filtersToParams(q, f);
    router.push(`/search${p.toString() ? `?${p}` : ""}`, { scroll: false });
  }, [router]);

  const results     = applyFilters(query, filters);
  const totalActive = (filters.category ? 1 : 0) + filters.tags.length + filters.countries.length + (filters.readTime !== "all" ? 1 : 0);

  const handleSearch = () => { setQuery(inputValue); pushURL(inputValue, filters); };

  const handleFilterChange = (next: Partial<FilterState>) => {
    const updated = { ...filters, ...next };
    setFilters(updated); pushURL(query, updated);
  };

  const handleClearFilters = () => { setFilters(DEFAULT_FILTERS); pushURL(query, DEFAULT_FILTERS); };

  const handleTagClick = (tag: string) => {
    const next = { ...filters, tags: filters.tags.includes(tag) ? filters.tags.filter((t) => t !== tag) : [...filters.tags, tag] };
    setFilters(next); pushURL(query, next);
  };

  // Active chips
  const chips: { label: string; remove: () => void }[] = [];
  if (filters.category) chips.push({ label: filters.category, remove: () => handleFilterChange({ category: "" }) });
  filters.tags.forEach((tag) => chips.push({ label: `#${tag}`, remove: () => handleTagClick(tag) }));
  filters.countries.forEach((c) => chips.push({ label: c, remove: () => handleFilterChange({ countries: filters.countries.filter((x) => x !== c) }) }));
  if (filters.readTime !== "all") {
    const lbl: Record<string, string> = { short: "< 5 min", medium: "5–10 min", long: "> 10 min" };
    chips.push({ label: lbl[filters.readTime], remove: () => handleFilterChange({ readTime: "all" }) });
  }

  return (
    <>
      {/* Overlay */}
      {selected && (
        <TestimonialOverlay
          key={selected.id}
          testimonial={selected}
          onClose={() => setSelected(null)}
          onNavigate={(t) => setSelected(t)}
        />
      )}

      <div className="min-h-screen bg-[#f9f9f9]">

        {/* Sticky search bar */}
        <div className="bg-white border-b border-[#e0e0e0] sticky top-0 z-30">
          <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center gap-3">
            <div className="flex-1 flex items-center bg-[#f5f5f5] border border-[#e0e0e0] rounded-full px-5 py-3 gap-3 focus-within:border-[#3949ab] transition-colors">
              <Search size={17} className="text-[#858585] shrink-0" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search stories by topic, name, country or testimony..."
                className="flex-1 text-sm text-[#333] outline-none bg-transparent placeholder:text-[#aaa]"
              />
              {inputValue && (
                <button onClick={() => { setInputValue(""); setQuery(""); pushURL("", filters); }}>
                  <X size={14} className="text-[#aaa] hover:text-[#333] transition-colors" />
                </button>
              )}
            </div>

            <button onClick={handleSearch} className="bg-[#3949ab] text-white text-sm font-medium px-6 py-3 rounded-full hover:bg-[#003299] transition-colors whitespace-nowrap">
              Search
            </button>

            {/* Filters toggle — desktop */}
            <button
              onClick={() => setFiltersVisible((v) => !v)}
              className="hidden lg:flex items-center gap-2 border border-[#e0e0e0] rounded-full px-4 py-3 text-sm text-[#555] hover:border-[#3949ab] hover:text-[#3949ab] transition-colors"
            >
              <SlidersHorizontal size={15} />
              {filtersVisible ? "Hide filters" : "Filters"}
              {totalActive > 0 && (
                <span className="bg-[#3949ab] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{totalActive}</span>
              )}
            </button>

            {/* Mobile */}
            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden flex items-center gap-2 border border-[#e0e0e0] rounded-full px-4 py-3 text-sm text-[#555] hover:border-[#3949ab] transition-colors"
            >
              <SlidersHorizontal size={15} />
              {totalActive > 0 && (
                <span className="bg-[#3949ab] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{totalActive}</span>
              )}
            </button>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-6 py-8">
          {/* Results summary + chips */}
          <div className="mb-6">
            <p className="text-[#666] text-sm mb-2">
              {query
                ? <><span className="font-medium text-[#333]">{results.length}</span> result{results.length !== 1 ? "s" : ""} for <span className="font-medium text-[#3949ab]">"{query}"</span></>
                : <>Showing <span className="font-medium text-[#333]">{results.length}</span> testimonies</>
              }
            </p>
            {chips.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <span key={chip.label} className="flex items-center gap-1.5 bg-[#3949ab]/10 text-[#3949ab] text-xs font-medium px-3 py-1.5 rounded-full">
                    {chip.label}
                    <button onClick={chip.remove} className="hover:text-[#00194c]"><X size={11} /></button>
                  </span>
                ))}
                <button onClick={handleClearFilters} className="text-xs text-[#aaa] hover:text-[#555] px-2 py-1.5">Clear all</button>
              </div>
            )}
          </div>

          <div className="flex gap-7 items-start">
            {/* Desktop sidebar */}
            {filtersVisible && (
              <div className="hidden lg:block w-52 shrink-0 sticky top-[81px]">
                <div className="bg-white rounded-xl border border-[#ebebeb] p-4">
                  <SearchFilters filters={filters} onChange={handleFilterChange} onClear={handleClearFilters} totalActive={totalActive} />
                </div>
              </div>
            )}

            {/* Mobile drawer */}
            {mobileOpen && (
              <div className="lg:hidden fixed inset-0 z-50 bg-black/40" onClick={() => setMobileOpen(false)}>
                <div className="absolute right-0 top-0 h-full w-72 bg-white overflow-y-auto p-5 shadow-xl" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-[#00194c] text-sm">Filters</h2>
                    <button onClick={() => setMobileOpen(false)}><X size={18} className="text-[#666]" /></button>
                  </div>
                  <SearchFilters filters={filters} onChange={handleFilterChange} onClear={handleClearFilters} totalActive={totalActive} />
                </div>
              </div>
            )}

            {/* Results grid */}
            <div className="flex-1 min-w-0">
              {results.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-14 h-14 bg-[#f0f0f0] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={22} className="text-[#bbb]" />
                  </div>
                  <h3 className="text-[#00194c] font-bold text-lg mb-2">No testimonies found</h3>
                  <p className="text-[#888] text-sm mb-5">Try adjusting your search or removing some filters.</p>
                  <button onClick={() => { setInputValue(""); setQuery(""); handleClearFilters(); }} className="bg-[#3949ab] text-white text-sm px-6 py-3 rounded-full hover:bg-[#003299] transition-colors">
                    Clear search
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {results.map((t) => (
                    <TestimonialSearchCard
                      key={t.id}
                      testimonial={t}
                      onTagClick={handleTagClick}
                      onClick={() => setSelected(t)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
