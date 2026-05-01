"use client";

import { motion } from "framer-motion";
import { Category } from "@/types";
import { CATEGORIES } from "@/lib/mockData";
import { getCategoryIcon, cn } from "@/utils";

interface CategoryFilterProps {
  value: Category | "All";
  onChange: (category: Category | "All") => void;
}

export function CategoryFilter({ value, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {CATEGORIES.map((cat) => {
        const active = value === cat;
        return (
          <motion.button
            key={cat}
            onClick={() => onChange(cat as Category | "All")}
            whileTap={{ scale: 0.95 }}
            className={cn(
              "flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 border",
              active
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-secondary text-secondary-foreground border-transparent hover:border-border hover:bg-secondary/70"
            )}
          >
            {cat !== "All" && <span className="text-xs">{getCategoryIcon(cat)}</span>}
            {cat}
          </motion.button>
        );
      })}
    </div>
  );
}
