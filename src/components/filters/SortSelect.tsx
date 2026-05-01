"use client";

import { SortOption } from "@/types";
import { SlidersHorizontal } from "lucide-react";

interface SortSelectProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

const OPTIONS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "rating", label: "Highest Rated" },
  { value: "title", label: "A to Z" },
];

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="relative flex-shrink-0">
      <SlidersHorizontal
        size={14}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="pl-8 pr-8 py-2.5 rounded-xl bg-secondary border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all appearance-none cursor-pointer"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
