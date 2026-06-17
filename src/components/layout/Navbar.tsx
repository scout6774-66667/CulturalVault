"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Sun, Moon, Bookmark, Menu, Globe } from "lucide-react";
import { useBookmarks } from "@/context/BookmarksContext";
import { cn } from "@/utils";
import { useSidebar } from "@/context/SidebarContext";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { count } = useBookmarks();
  const [scrolled, setScrolled] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const pathname = usePathname();
  
  const { setMobileOpen } = useSidebar();

  useEffect(() => {
    setIsAuth(!!localStorage.getItem("user_token"));
    
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300 w-full",
        scrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Changed to grid-cols-2 to force left/right alignment */}
        <div className="grid grid-cols-2 items-center h-16 w-full">
          
          {/* 1. Left Side: Logo & Mobile Menu */}
          <div className="flex items-center justify-start gap-4">
            {pathname !== "/" && (
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors md:hidden"
              >
                <Menu size={20} />
              </button>
            )}
            
            <Link href="/" className="flex items-center gap-2">
              <div className="p-1.5 bg-primary rounded-lg flex items-center justify-center">
                <Globe size={18} className="text-primary-foreground" />
              </div>
              <span className="font-bold text-lg tracking-tight">CulturalVault</span>
            </Link>
          </div>

          {/* 2. Right Side: Actions (Theme, Bookmarks, Sign In) */}
          <div className="flex items-center justify-end gap-3 shrink-0">
            
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative p-2 rounded-lg hover:bg-secondary transition-colors flex items-center justify-center h-9 w-9"
              aria-label="Toggle Theme"
            >
              <Sun size={18} className="absolute rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon size={18} className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </button>
            
            {/* Bookmarks */}
            <Link
              href="/explore#bookmarks"
              className="relative p-2 rounded-lg hover:bg-secondary transition-colors flex items-center justify-center h-9 w-9"
            >
              <Bookmark size={18} />
              {count > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {isAuth ? (
              <div className="flex items-center gap-2">
                <Link href="/dashboard" className="text-sm font-medium text-primary hover:underline px-2 hidden sm:block">
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem("user_token");
                    setIsAuth(false);
                    window.location.href = "/";
                  }}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground px-2"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/signin"
                className="hidden sm:flex items-center justify-center text-sm font-bold bg-primary text-primary-foreground px-5 py-2 rounded-full hover:bg-primary/90 transition-colors ml-1 whitespace-nowrap"
              >
                Sign In
              </Link>
            )}
          </div>
          
        </div>
      </nav>
    </header>
  );
}