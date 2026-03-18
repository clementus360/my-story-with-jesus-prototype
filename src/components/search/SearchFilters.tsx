"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { ALL_CATEGORIES, ALL_COUNTRIES, ALL_TAGS } from "@/data/testimonials";

export type FilterState = {
  sort: string;
  category: string;
  tags: string[];
  countries: string[];
  readTime: string;
};

function Section({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-[#f5f5f5] last:border-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full py-2.5 text-left"
      >
        <span className="text-xs font-semibold text-[#333] uppercase tracking-wide">{title}</span>
        <ChevronDown size={14} className={`text-[#aaa] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="pb-3 flex flex-col gap-1.5">{children}</div>}
    </div>
  );
}

function Radio({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group" onClick={onChange}>
      <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${checked ? "border-[#3949ab]" : "border-[#d0d0d0] group-hover:border-[#3949ab]/50"}`}>
        {checked && <div className="w-1.5 h-1.5 rounded-full bg-[#3949ab]" />}
      </div>
      <span className={`text-xs transition-colors ${checked ? "text-[#3949ab] font-medium" : "text-[#555] group-hover:text-[#333]"}`}>{label}</span>
    </label>
  );
}

function Checkbox({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group" onClick={onChange}>
      <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors ${checked ? "bg-[#3949ab] border-[#3949ab]" : "border-[#d0d0d0] group-hover:border-[#3949ab]/50"}`}>
        {checked && <svg width="7" height="7" viewBox="0 0 7 7" fill="none"><path d="M1 3.5l1.5 1.5 3-3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
      </div>
      <span className={`text-xs transition-colors ${checked ? "text-[#3949ab] font-medium" : "text-[#555] group-hover:text-[#333]"}`}>{label}</span>
    </label>
  );
}

export default function SearchFilters({
  filters,
  onChange,
  onClear,
  totalActive,
}: {
  filters: FilterState;
  onChange: (next: Partial<FilterState>) => void;
  onClear: () => void;
  totalActive: number;
}) {
  const toggleTag     = (tag: string) => onChange({ tags:      filters.tags.includes(tag)     ? filters.tags.filter((t) => t !== tag)      : [...filters.tags, tag] });
  const toggleCountry = (c: string)   => onChange({ countries: filters.countries.includes(c) ? filters.countries.filter((x) => x !== c) : [...filters.countries, c] });

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-[#00194c] uppercase tracking-wide">Filters</span>
        {totalActive > 0 && (
          <button onClick={onClear} className="text-[11px] text-[#3949ab] hover:underline">
            Clear {totalActive}
          </button>
        )}
      </div>

      <Section title="Sort">
        {[
          { value: "recent",        label: "Most Recent" },
          { value: "views",         label: "Most Viewed" },
          { value: "likes",         label: "Most Liked" },
          { value: "oldest",        label: "Oldest" },
          { value: "read-time-asc", label: "Shortest" },
        ].map((o) => (
          <Radio key={o.value} label={o.label} checked={filters.sort === o.value} onChange={() => onChange({ sort: o.value })} />
        ))}
      </Section>

      <Section title="Category">
        <Radio label="All" checked={!filters.category} onChange={() => onChange({ category: "" })} />
        {ALL_CATEGORIES.map((cat) => (
          <Radio key={cat} label={cat} checked={filters.category === cat} onChange={() => onChange({ category: cat })} />
        ))}
      </Section>

      <Section title="Tags" defaultOpen={false}>
        {ALL_TAGS.map((tag) => (
          <Checkbox key={tag} label={`#${tag}`} checked={filters.tags.includes(tag)} onChange={() => toggleTag(tag)} />
        ))}
      </Section>

      <Section title="Country" defaultOpen={false}>
        {ALL_COUNTRIES.map((c) => (
          <Checkbox key={c} label={c} checked={filters.countries.includes(c)} onChange={() => toggleCountry(c)} />
        ))}
      </Section>

      <Section title="Read Time" defaultOpen={false}>
        {[
          { value: "all",    label: "Any" },
          { value: "short",  label: "< 5 min" },
          { value: "medium", label: "5–10 min" },
          { value: "long",   label: "> 10 min" },
        ].map((o) => (
          <Radio key={o.value} label={o.label} checked={filters.readTime === o.value} onChange={() => onChange({ readTime: o.value })} />
        ))}
      </Section>
    </div>
  );
}
