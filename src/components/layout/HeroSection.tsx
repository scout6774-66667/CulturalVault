"use client";

import { motion } from "framer-motion";
import { Compass, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative hero-gradient overflow-hidden pt-16 pb-8 sm:pt-24 sm:pb-12">
      {/* Decorative circles */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-48 h-48 rounded-full bg-orange-500/8 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-5 border border-primary/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles size={12} />
            12 World Heritage Cultures Catalogued
          </motion.div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-5">
            Discover the World's{" "}
            <span className="gradient-text">Cultural Soul</span>
          </h1>

          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl">
            Explore centuries of human creativity — from ancient wonders to living traditions, 
            art forms, and culinary heritage that define civilizations.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#explore"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
            >
              <Compass size={18} />
              Start Exploring
            </a>
            <a
              href="/bookmarks"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors"
            >
              My Collection
            </a>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { value: "12+", label: "Cultural Items" },
            { value: "8", label: "Categories" },
            { value: "6", label: "Continents" },
            { value: "50K+", label: "Years of History" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="font-display text-2xl font-bold text-primary">{value}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
