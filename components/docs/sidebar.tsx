"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export interface NavSection {
  title: string;
  items: {
    title: string;
    href: string;
    badge?: string;
  }[];
}

export const docNavigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs" },
      { title: "Installation", href: "/docs/installation" },
      { title: "Foundations", href: "/docs/foundations" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Button", href: "/docs/components/button" },
      { title: "Input", href: "/docs/components/input" },
      { title: "Card", href: "/docs/components/card" },
      { title: "Badge", href: "/docs/components/badge" },
      { title: "Avatar", href: "/docs/components/avatar", badge: "New" },
      { title: "Alert", href: "/docs/components/alert", badge: "New" },
      { title: "Skeleton", href: "/docs/components/skeleton", badge: "New" },
      { title: "Select", href: "/docs/components/select", badge: "New" },
      { title: "Slider", href: "/docs/components/slider", badge: "New" },
      { title: "Dialog", href: "/docs/components/dialog" },
      { title: "Dropdown Menu", href: "/docs/components/dropdown-menu" },
      { title: "Tabs", href: "/docs/components/tabs" },
      { title: "Tooltip", href: "/docs/components/tooltip" },
      { title: "Checkbox", href: "/docs/components/checkbox" },
      { title: "Switch", href: "/docs/components/switch" },
      { title: "Calendar", href: "/docs/components/calendar", badge: "Custom" },
      { title: "Date Picker", href: "/docs/components/date-picker", badge: "Showcase" },
      { title: "Data Table", href: "/docs/components/data-table", badge: "Signature" },
    ],
  },
  {
    title: "Patterns & Studio",
    items: [
      { title: "Patterns", href: "/docs/patterns", badge: "Recipes" },
      { title: "UI Blocks", href: "/blocks", badge: "Compositions" },
      { title: "Interactive Flows", href: "/flows", badge: "Workflows" },
      { title: "Component Lab", href: "/lab", badge: "Studio" },
    ],
  },
];

export function Sidebar({ onItemClick }: { onItemClick?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className="w-full text-xs">
      <div className="space-y-6">
        {docNavigation.map((section, idx) => (
          <div key={idx} className="space-y-2">
            <h4 className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground/80 font-mono px-2">
              {section.title}
            </h4>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onItemClick}
                    className={cn(
                      "flex items-center justify-between rounded-[4px] px-2.5 py-1.5 transition-all text-xs font-medium tracking-tight",
                      isActive
                        ? "bg-foreground text-background font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                    )}
                  >
                    <span>{item.title}</span>
                    {item.badge && (
                      <span
                        className={cn(
                          "rounded-[3px] px-1.5 py-0.2 text-[9px] font-mono tracking-wider",
                          isActive
                            ? "bg-background/20 text-background"
                            : "bg-secondary text-muted-foreground border border-border/40"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
