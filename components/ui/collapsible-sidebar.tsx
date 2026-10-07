"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  Grid,
  Layers,
  LayoutDashboard,
  LogIn,
  Sliders,
  Sparkles,
  Table,
  Terminal,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export interface CollapsibleSidebarProps {
  className?: string;
  defaultCollapsed?: boolean;
}

export function CollapsibleSidebar({
  className,
  defaultCollapsed = false,
}: CollapsibleSidebarProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const pathname = usePathname();

  const navGroups = [
    {
      title: "OVERVIEW",
      items: [
        { label: "Dashboard", href: "/docs", icon: <LayoutDashboard className="h-4 w-4" /> },
      ],
    },
    {
      title: "COMPONENTS",
      items: [
        { label: "Button", href: "/docs/components/button", icon: <Terminal className="h-4 w-4" /> },
        { label: "Input", href: "/docs/components/input", icon: <FileText className="h-4 w-4" /> },
        { label: "Dialog", href: "/docs/components/dialog", icon: <Layers className="h-4 w-4" /> },
        { label: "Date Picker", href: "/docs/components/date-picker", icon: <Calendar className="h-4 w-4" /> },
        { label: "Data Table", href: "/docs/components/data-table", icon: <Table className="h-4 w-4" /> },
      ],
    },
    {
      title: "PATTERNS",
      items: [
        { label: "Login Pattern", href: "/flows", icon: <LogIn className="h-4 w-4" /> },
        { label: "Checkout", href: "/flows", icon: <CreditCard className="h-4 w-4" /> },
        { label: "Analytics", href: "/blocks", icon: <Grid className="h-4 w-4" /> },
      ],
    },
  ];

  return (
    <TooltipProvider>
      <div
        className={cn(
          "relative flex flex-col border-r border-border bg-card transition-all duration-300 ease-in-out select-none",
          isCollapsed ? "w-16" : "w-56",
          className
        )}
      >
        {/* Sidebar Brand Header */}
        <div className="flex h-14 items-center justify-between border-b border-border/60 px-3.5">
          {isCollapsed ? (
            <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-[4px] bg-foreground text-background font-mono font-bold text-xs">
              R
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-[3px] bg-foreground text-background font-mono font-bold text-xs">
                R
              </span>
              <span className="font-mono font-bold text-xs uppercase tracking-wider text-foreground">
                ROSE
              </span>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex h-6 w-6 items-center justify-center rounded-[4px] border border-border/40 text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
          </button>
        </div>

        {/* Navigation Sections */}
        <div className="flex-1 overflow-y-auto p-2 space-y-4">
          {navGroups.map((group, idx) => (
            <div key={idx} className="space-y-1">
              {!isCollapsed && (
                <div className="px-2.5 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/70 font-semibold">
                  {group.title}
                </div>
              )}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;

                  const linkEl = (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-2.5 rounded-[4px] p-2 text-xs font-medium transition-colors",
                        isCollapsed && "justify-center",
                        isActive
                          ? "bg-foreground text-background font-semibold"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      )}
                    >
                      <span className="shrink-0">{item.icon}</span>
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  );

                  if (isCollapsed) {
                    return (
                      <Tooltip key={item.label}>
                        <TooltipTrigger asChild>{linkEl}</TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{item.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    );
                  }

                  return <div key={item.label}>{linkEl}</div>;
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        {!isCollapsed && (
          <div className="border-t border-border/40 p-3 text-[10px] font-mono text-muted-foreground">
            ROSE UI Architecture
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}
