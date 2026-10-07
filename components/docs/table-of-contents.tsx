"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  title: string;
}

export function TableOfContents({ items }: { items: TocItem[] }) {
  const [activeId, setActiveId] = React.useState<string>(items[0]?.id || "");

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      for (const item of items) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop - 120;
          if (scrollY >= top) {
            setActiveId(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 90,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-2 text-xs">
      <h4 className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
        On This Page
      </h4>
      <nav className="space-y-1">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className={cn(
              "block w-full text-left py-1 text-xs transition-colors hover:text-foreground cursor-pointer",
              activeId === item.id
                ? "text-foreground font-semibold border-l-2 border-foreground pl-2 -ml-2"
                : "text-muted-foreground"
            )}
          >
            {item.title}
          </button>
        ))}
      </nav>
    </div>
  );
}
