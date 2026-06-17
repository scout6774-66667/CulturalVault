import type { Metadata } from "next";
import "./globals.css";
import "leaflet/dist/leaflet.css";

import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { BookmarksProvider } from "@/context/BookmarksContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { SidebarProvider } from "@/context/SidebarContext"; // <-- ADDED THIS

import { Sidebar } from "@/components/layout/Sidebar"; // <-- ADDED THIS
import { MainLayout } from "@/components/layout/MainLayout"; // <-- ADDED THIS
import { Toaster } from "@/components/ui/Toaster";

export const metadata: Metadata = {
  title: "CulturalVault — World Heritage Explorer",
  description: "Discover and explore the world's most remarkable cultural heritage sites, traditions, and art forms.",
  keywords: ["culture", "heritage", "art", "history", "travel", "UNESCO"],
  openGraph: {
    title: "CulturalVault — World Heritage Explorer",
    description: "Discover the world's most remarkable cultural heritage.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      {/* Added overflow-x-hidden to prevent horizontal scrolling bugs */}
      <body className="min-h-screen flex flex-col antialiased bg-background overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <BookmarksProvider>
              {/* Wrapped everything in SidebarProvider */}
              <SidebarProvider>
                
                <div className="flex min-h-screen w-full">
                  <Sidebar />
                  <MainLayout>
                    {children}
                  </MainLayout>
                </div>
                
                <Toaster />
              </SidebarProvider>
            </BookmarksProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}