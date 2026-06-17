"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, Compass, ShieldAlert, X,
  ScrollText, LayoutDashboard, MessageSquare, Mic, User, MoreHorizontal
} from "lucide-react";
import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/utils";

export function Sidebar() {
  const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar();
  const [showMore, setShowMore] = useState(false);
  const pathname = usePathname();

  // HIDE SIDEBAR ON THE FRONT PAGE & LOGIN PAGE
  if (pathname === "/" || pathname === "/login") return null;

  // 1. Core Links (Always Visible)
  const coreLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/explore", label: "Explore Heritage", icon: Compass },
    { href: "/chatbot", label: "AI Chatbot", icon: MessageSquare },
  ];

  // 2. Extra Links (Hidden behind 3-dots)
  const extraLinks = [
    { href: "/explore#restoration", label: "Manuscript Engine", icon: ScrollText },
    { href: "/explore#risk-map", label: "Risk Management", icon: ShieldAlert },
    { href: "/oral-story", label: "Oral Story Section", icon: Mic },
  ];

  const profileLink = { href: "/profile", label: "Profile", icon: User };

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => {
    const isCollapsed = !isMobile && collapsed;

    const renderLink = (item: { href: string; label: string; icon: any }) => {
      const isActive = pathname === item.href;
      return (
        <Link
          key={item.href}
          href={item.href}
          onClick={() => isMobile && setMobileOpen(false)}
          className={cn(
            "flex items-center gap-4 px-3 py-3 rounded-xl transition-colors whitespace-nowrap",
            isActive ? "bg-secondary font-semibold text-foreground" : "hover:bg-secondary/50 font-medium text-muted-foreground hover:text-foreground",
            isCollapsed && "justify-center px-0"
          )}
          title={isCollapsed ? item.label : undefined}
        >
          <item.icon size={22} className={cn(isActive && "text-primary")} />
          {!isCollapsed && <span className="text-sm">{item.label}</span>}
        </Link>
      );
    };

    return (
      <div className="flex flex-col h-full bg-background border-r">
        <div className="h-16 flex items-center px-4 shrink-0 border-b border-border/50">
          <button
            onClick={() => isMobile ? setMobileOpen(false) : setCollapsed(!collapsed)}
            className="p-2 rounded-lg hover:bg-secondary transition-colors"
          >
            {isMobile ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="flex-1 flex flex-col overflow-y-auto py-4 px-3 gap-1 custom-scrollbar">
          {coreLinks.map(renderLink)}

          <button
            onClick={() => setShowMore(!showMore)}
            className={cn(
              "flex items-center gap-4 px-3 py-3 rounded-xl transition-colors hover:bg-secondary/50 font-medium text-muted-foreground",
              isCollapsed && "justify-center px-0"
            )}
          >
            <MoreHorizontal size={22} />
            {!isCollapsed && <span className="text-sm">More</span>}
          </button>

          <AnimatePresence>
            {showMore && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                {extraLinks.map(renderLink)}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex-1" />
          <div className="my-2 border-t border-border/50" />
          {renderLink(profileLink)}
        </div>
      </div>
    );
  };

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="hidden md:block fixed left-0 top-0 h-screen z-40 overflow-hidden bg-background"
      >
        <SidebarContent />
      </motion.aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="md:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="md:hidden fixed left-0 top-0 h-screen w-[280px] z-50 bg-background"
            >
              <SidebarContent isMobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}