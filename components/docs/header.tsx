"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, Terminal } from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/docs/theme-toggle";
import { CommandDialog } from "@/components/ui/command-dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onOpenMobileNav?: () => void;
}

export function Header({ onOpenMobileNav }: HeaderProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Components", href: "/docs/components/button" },
    { label: "Patterns", href: "/docs/patterns" },
    { label: "Blocks", href: "/blocks" },
    { label: "Flows", href: "/flows" },
    { label: "Lab", href: "/lab" },
    { label: "Docs", href: "/docs" },
  ];

  const triggerCommandPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        metaKey: true,
        bubbles: true,
      })
    );
  };

  return (
    <>
      <CommandDialog />
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200",
          isScrolled
            ? "border-b border-border/80 bg-background/80 backdrop-blur-md shadow-xs"
            : "border-b border-border/40 bg-background/50 backdrop-blur-xs"
        )}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Brand Logo & Mobile Trigger */}
          <div className="flex items-center gap-4">
            {onOpenMobileNav && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onOpenMobileNav}
                className="md:hidden h-8 w-8 text-muted-foreground hover:text-foreground"
                aria-label="Toggle navigation drawer"
              >
                <Menu className="h-4 w-4" />
              </Button>
            )}

            <Link
              href="/"
              className="flex items-center gap-2.5 font-mono text-sm tracking-tight font-semibold select-none group"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-foreground text-background font-bold text-xs group-hover:scale-105 transition-transform">
                R
              </span>
              <span className="text-foreground tracking-widest text-xs uppercase font-bold">
                ROSE UI
              </span>
              <span className="hidden sm:inline-flex rounded-full border border-border/60 bg-secondary/60 px-2 py-0.2 text-[10px] text-muted-foreground font-mono">
                v0.2
              </span>
            </Link>
          </div>

          {/* Center/Right: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium tracking-tight">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/docs"
                  ? pathname === "/docs"
                  : link.href.startsWith("/docs/components")
                  ? pathname.startsWith("/docs/components")
                  : pathname === link.href || pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-foreground py-1",
                    isActive
                      ? "text-foreground font-semibold border-b border-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <button
              type="button"
              onClick={triggerCommandPalette}
              className="hidden sm:flex items-center gap-2 rounded-[6px] border border-border/80 bg-secondary/40 px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="text-[11px] font-sans">Search...</span>
              <kbd className="rounded-[3px] border border-border/80 bg-background px-1 py-0.2 text-[9px] font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Quick CLI command hint */}
            <Link
              href="/docs/installation"
              className="hidden lg:flex items-center gap-1.5 rounded-[4px] border border-border/60 bg-secondary/40 px-2 py-1 text-[11px] font-mono text-muted-foreground hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              <Terminal className="h-3 w-3" />
              <span>npx rose-ui add</span>
            </Link>

            {/* GitHub link */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repository"
              className="inline-flex h-8 w-8 items-center justify-center rounded-[6px] text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
            </a>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>
    </>
  );
}
