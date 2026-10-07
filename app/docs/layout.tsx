"use client";

import * as React from "react";
import { Header } from "@/components/docs/header";
import { Sidebar } from "@/components/docs/sidebar";
import { MobileNav } from "@/components/docs/mobile-nav";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header onOpenMobileNav={() => setMobileNavOpen(true)} />
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
      />

      <div className="mx-auto flex w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-56 shrink-0 py-8 pr-6 border-r border-border/40 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
          <Sidebar />
        </div>

        {/* Main Docs Content */}
        <main className="flex-1 min-w-0 py-8 md:px-8 lg:px-12">
          {children}
        </main>
      </div>
    </div>
  );
}
