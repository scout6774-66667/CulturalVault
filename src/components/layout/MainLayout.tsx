"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { useSidebar } from "@/context/SidebarContext";
import { cn } from "@/utils";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { collapsed } = useSidebar();
  
  // Check if we are exactly on the homepage
  const isHome = pathname === "/";

  return (
    <div 
      className={cn(
        "flex-1 flex flex-col min-h-screen transition-all duration-300 w-full",
        // CRITICAL FIX: Force 0 padding on home page. Otherwise, apply sidebar padding.
        isHome ? "pl-0" : (collapsed ? "md:pl-[80px]" : "md:pl-[260px]") 
      )}
    >
      <Navbar />
      <main className="flex-1 w-full overflow-x-hidden flex flex-col">
        {children}
      </main>
    </div>
  );
}