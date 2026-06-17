"use client";

import { useState, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { FilterState, Category, SortOption } from "@/types";
import { useItems } from "@/hooks";
import { SearchBar } from "@/components/search/SearchBar";
import { CategoryFilter } from "@/components/filters/CategoryFilter";
import { SortSelect } from "@/components/filters/SortSelect";
import { ItemGrid } from "@/components/cards/ItemGrid";
import { Pagination } from "@/components/ui/Pagination";
import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// --- DASHBOARD IMPORTS ---
import dynamic from "next/dynamic";
import Link from "next/link";
import { ShieldAlert, Activity, BookOpen, Bookmark, FileText, ArrowRight, Globe2, Database, Users } from "lucide-react";

const RiskMap = dynamic(() => import("@/components/Map"), { 
  ssr: false,
  loading: () => <div className="w-full h-[450px] bg-secondary/50 animate-pulse rounded-xl flex items-center justify-center text-muted-foreground font-medium">Loading Interactive Map...</div>
});

const DEFAULT_FILTERS: FilterState = {
  search: "",
  category: "All",
  sortBy: "newest",
  era: "All Eras",
};

// --- MOCK DATA FOR DASHBOARDS ---
const riskDashboardData = [
  { id: 1, name: "Taj Mahal", location: "India", risk: "Low", score: 20, description: "Well maintained and protected", coords: [27.1751, 78.0421] },
  { id: 2, name: "Sundarbans", location: "India/Bangladesh", risk: "Medium", score: 55, description: "Climate change and rising sea levels", coords: [21.9497, 89.1833] },
  { id: 3, name: "Mohenjo-daro", location: "Pakistan", risk: "High", score: 85, description: "Weather erosion and degradation", coords: [27.3292, 68.1388] },
  { id: 4, name: "Colosseum", location: "Italy", risk: "Low", score: 25, description: "Strong preservation efforts", coords: [41.8902, 12.4922] },
  { id: 5, name: "Machu Picchu", location: "Peru", risk: "Medium", score: 60, description: "Tourism pressure", coords: [-13.1631, -72.5450] },
];
const recentRestorations = [
  { title: "Herculaneum Papyri", status: "78% Decoded", tech: "X-Ray Phase-Contrast Tomography" },
  { title: "Dead Sea Scrolls", status: "Completed", tech: "Multispectral Imaging & AI Matching" },
  { title: "Voynich Manuscript", status: "Syntax Analysis Active", tech: "Deep Learning Pattern Recognition" },
];
const stats = [
  { label: "Heritage Sites Tracked", value: "1,154", icon: Globe2 },
  { label: "Artifacts Digitized", value: "45,200+", icon: Database },
  { label: "Active Restorations", value: "342", icon: BookOpen },
  { label: "Global Contributors", value: "50k+", icon: Users },
];

export default function ExplorePage() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [debouncedSearch] = useDebounce(filters.search, 350);
  const { language } = useLanguage();
  const t = translations[language];

  const activeFilters = { ...filters, search: debouncedSearch };
  const { items, loading, error, total } = useItems(activeFilters, page);

  const handleSearchChange = useCallback((search: string) => {
    setFilters((f) => ({ ...f, search }));
    setPage(1);
  }, []);

  const handleCategoryChange = useCallback((category: Category | "All") => {
    setFilters((f) => ({ ...f, category }));
    setPage(1);
  }, []);

  const handleSortChange = useCallback((sortBy: SortOption) => {
    setFilters((f) => ({ ...f, sortBy }));
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  return (
    <PageWrapper>
      {/* 1. EXPLORE GRID SECTION */}
      {/* CRITICAL: Note the id="explore" and scroll-mt-20 here so the Sidebar link works! */}
      <section id="explore" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-20">
        
        <div className="flex justify-between items-end mb-8">
          <div>
             <h2 className="text-4xl font-extrabold font-display mb-2">Heritage Library</h2>
             <p className="text-muted-foreground">Search and filter through centuries of human history.</p>
          </div>
          <LanguageSwitcher />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col gap-4 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <SearchBar
              value={filters.search}
              onChange={handleSearchChange}
              placeholder={t.searchPlaceholder}
              className="flex-1"
            />
            <SortSelect value={filters.sortBy} onChange={handleSortChange} />
          </div>

          <CategoryFilter
            value={filters.category}
            onChange={handleCategoryChange}
          />
        </motion.div>

        {!loading && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground mb-6"
          >
            {total === 0
              ? t.noItems
              : `${t.showing} ${Math.min((page - 1) * ITEMS_PER_PAGE + 1, total)}–${Math.min(page * ITEMS_PER_PAGE, total)} ${t.of} ${total} ${t.items}`}
            {debouncedSearch && (
              <span className="ml-1">
                {t.for} <span className="text-foreground font-medium">"{debouncedSearch}"</span>
              </span>
            )}
          </motion.p>
        )}

        <ItemGrid items={items} loading={loading} error={error} />

        {!loading && totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </motion.div>
        )}
      </section>

      {/* 2. RESTORATION AI SECTION */}
      <section id="restoration" className="py-24 scroll-mt-20 border-t border-b border-border/50 bg-secondary/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2 flex flex-col justify-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold w-fit">
              <Activity size={16} /> Active Technology
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold font-display">Manuscript Restoration AI</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our advanced machine learning models help historians translate dead languages and digitally restore faded texts.
            </p>
            <div className="space-y-4 mt-4">
              {recentRestorations.map((restoration, idx) => (
                <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-background border border-border shadow-sm">
                  <FileText className="text-primary mt-1 shrink-0" size={20} />
                  <div>
                    <h5 className="font-bold text-sm">{restoration.title}</h5>
                    <p className="text-xs text-muted-foreground mt-0.5">{restoration.tech}</p>
                  </div>
                  <span className="ml-auto text-[10px] uppercase font-mono font-bold bg-secondary px-2 py-1 rounded text-primary">
                    {restoration.status}
                  </span>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-2 text-primary font-semibold hover:gap-4 transition-all pt-4">
              Try the AI Tool <ArrowRight size={20} />
            </button>
          </div>

          <div className="lg:w-1/2 w-full min-h-[400px] rounded-3xl border border-border bg-card shadow-xl p-8 flex flex-col items-center justify-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-tr from-background to-secondary opacity-50" />
             <div className="relative z-10 w-full max-w-sm space-y-6">
                <div className="relative w-32 h-32 mx-auto rounded-2xl bg-secondary flex items-center justify-center border border-border overflow-hidden">
                  <BookOpen size={48} className="text-muted-foreground opacity-50" />
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_20px_2px_rgba(245,158,11,0.5)] animate-[scan_3s_ease-in-out_infinite]" />
                </div>
                <div className="text-center space-y-2">
                  <p className="font-mono text-sm text-primary animate-pulse">Processing artifact_042.jpg...</p>
                  <p className="text-xs text-muted-foreground">Isolating carbon ink signatures</p>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-2/3 animate-pulse" />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. RISK DASHBOARD SECTION */}
      <section id="risk-map" className="py-24 scroll-mt-20 flex flex-col items-center border-b border-border/50 bg-background px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full">
          <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
            <ShieldAlert className="text-destructive shrink-0" size={32} />
            <h2 className="text-3xl md:text-4xl font-extrabold text-center md:text-left font-display">Heritage Risk Intelligence</h2>
          </div>
          <p className="text-muted-foreground mb-8 text-center md:text-left text-lg">Monitor endangered cultural heritage sites using AI-inspired risk assessment.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <div className="p-5 rounded-xl border border-border bg-card">
              <p className="text-sm text-muted-foreground mb-1 font-medium">Total Sites</p>
              <p className="text-3xl font-extrabold">5</p>
            </div>
            <div className="p-5 rounded-xl border border-destructive/20 bg-destructive/5">
              <p className="text-sm font-semibold text-destructive mb-1">High Risk</p>
              <p className="text-3xl font-extrabold text-destructive">1</p>
            </div>
            <div className="p-5 rounded-xl border border-amber-500/20 bg-amber-500/5">
              <p className="text-sm font-semibold text-amber-500 mb-1">Medium Risk</p>
              <p className="text-3xl font-extrabold text-amber-500">2</p>
            </div>
            <div className="p-5 rounded-xl border border-green-500/20 bg-green-500/5">
              <p className="text-sm font-semibold text-green-500 mb-1">Low Risk</p>
              <p className="text-3xl font-extrabold text-green-500">2</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 font-display">Global Heritage Risk Map</h3>
          <div className="w-full h-[450px] border border-border rounded-xl mb-12 relative z-0 overflow-hidden shadow-sm">
             <RiskMap sites={riskDashboardData} />
          </div>

          <h3 className="text-xl font-bold mb-6 font-display">Risk Assessment Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {riskDashboardData.map((site) => (
              <div key={site.id} className="p-6 rounded-xl border border-border bg-card flex flex-col shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg">{site.name}</h4>
                  <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold text-white tracking-widest ${
                    site.risk === 'High' ? 'bg-destructive' : 
                    site.risk === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
                  }`}>
                    {site.risk}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-8">{site.location}</p>
                <div className="mb-2 flex justify-between text-sm mt-auto">
                  <span className="font-medium text-muted-foreground">Risk Score</span>
                  <span className="font-bold">{site.score}%</span>
                </div>
                <div className="w-full h-1.5 bg-secondary rounded-full mb-5 overflow-hidden">
                  <div className={`h-full ${site.risk === 'High' ? 'bg-destructive' : site.risk === 'Medium' ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${site.score}%` }} />
                </div>
                <p className="text-xs text-foreground font-medium border-t border-border/50 pt-4">{site.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ANALYTICS SECTION */}
      <section id="analytics" className="py-24 scroll-mt-20 flex flex-col items-center border-b border-border/50 bg-secondary/30 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="p-8 rounded-3xl bg-background border border-border shadow-sm hover:-translate-y-1 transition-transform">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <stat.icon size={32} className="text-primary" />
              </div>
              <h4 className="text-4xl md:text-5xl font-extrabold mb-3">{stat.value}</h4>
              <p className="text-muted-foreground font-medium text-sm tracking-wide uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BOOKMARKS SECTION */}
      <section id="bookmarks" className="min-h-[50vh] pt-24 pb-32 scroll-mt-20 flex flex-col items-center bg-secondary/10 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 font-display">Your Bookmarks</h2>
        <p className="text-xl text-muted-foreground max-w-2xl text-center mb-12">Review your saved cultural heritage items.</p>
        <div className="p-16 rounded-3xl border-2 border-dashed border-border bg-background flex flex-col items-center justify-center text-center max-w-2xl w-full">
           <div className="p-6 bg-secondary/30 rounded-full border border-border mb-6">
             <Bookmark size={40} className="text-muted-foreground opacity-50" />
           </div>
           <h3 className="text-2xl font-bold mb-3 font-display">No bookmarks yet</h3>
           <p className="text-muted-foreground max-w-md mb-8">When you save archaeological sites, artifacts, or restoration documents from the library, they will appear here for easy access.</p>
           <button onClick={() => { document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" }) }} className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
             Scroll Up to Explore
           </button>
        </div>
      </section>

    </PageWrapper>
  );
}