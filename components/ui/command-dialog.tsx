"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Calendar,
  Code2,
  FileText,
  Layers,
  Laptop,
  Moon,
  Search,
  Sparkles,
  Sun,
  Table,
  Terminal,
  X,
  Workflow,
  Sliders,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

interface CommandItem {
  id: string;
  title: string;
  category: "Components" | "Navigation" | "Actions";
  href?: string;
  action?: () => void;
  icon: React.ReactNode;
  shortcut?: string;
}

export function CommandDialog() {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const { toast } = useToast();

  const commandItems: CommandItem[] = React.useMemo(
    () => [
      // Components
      { id: "c-button", title: "Button", category: "Components", href: "/docs/components/button", icon: <Terminal className="h-3.5 w-3.5" /> },
      { id: "c-date-picker", title: "Date Picker", category: "Components", href: "/docs/components/date-picker", icon: <Calendar className="h-3.5 w-3.5" />, shortcut: "Showcase" },
      { id: "c-dialog", title: "Dialog", category: "Components", href: "/docs/components/dialog", icon: <Layers className="h-3.5 w-3.5" /> },
      { id: "c-tabs", title: "Tabs", category: "Components", href: "/docs/components/tabs", icon: <Layers className="h-3.5 w-3.5" /> },
      { id: "c-dropdown", title: "Dropdown Menu", category: "Components", href: "/docs/components/dropdown-menu", icon: <Layers className="h-3.5 w-3.5" /> },
      { id: "c-input", title: "Input", category: "Components", href: "/docs/components/input", icon: <Terminal className="h-3.5 w-3.5" /> },
      { id: "c-data-table", title: "Data Table", category: "Components", href: "/docs/components/data-table", icon: <Table className="h-3.5 w-3.5" />, shortcut: "Signature" },

      // Navigation
      { id: "n-docs", title: "Documentation Intro", category: "Navigation", href: "/docs", icon: <FileText className="h-3.5 w-3.5" /> },
      { id: "n-installation", title: "Installation Guide", category: "Navigation", href: "/docs/installation", icon: <Code2 className="h-3.5 w-3.5" /> },
      { id: "n-foundations", title: "Design Foundations", category: "Navigation", href: "/docs/foundations", icon: <Sparkles className="h-3.5 w-3.5" /> },
      { id: "n-blocks", title: "UI Blocks", category: "Navigation", href: "/blocks", icon: <Layers className="h-3.5 w-3.5" />, shortcut: "Blocks" },
      { id: "n-flows", title: "Interactive Flows", category: "Navigation", href: "/flows", icon: <Workflow className="h-3.5 w-3.5" />, shortcut: "Flows" },
      { id: "n-lab", title: "Component Lab", category: "Navigation", href: "/lab", icon: <Sliders className="h-3.5 w-3.5" />, shortcut: "Studio" },

      // Actions
      {
        id: "a-theme",
        title: "Toggle Light / Dark Mode",
        category: "Actions",
        icon: resolvedTheme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />,
        action: () => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
          toast({ title: "Theme toggled", description: `Switched to ${resolvedTheme === "dark" ? "light" : "dark"} mode.` });
        },
      },
      {
        id: "a-copy-cli",
        title: "Copy CLI Command: npx rose-ui add",
        category: "Actions",
        icon: <Terminal className="h-3.5 w-3.5" />,
        action: () => {
          navigator.clipboard.writeText("npx rose-ui add button");
          toast({ title: "Copied to clipboard", description: "npx rose-ui add button" });
        },
      },
    ],
    [resolvedTheme, setTheme, toast]
  );

  const filteredItems = React.useMemo(() => {
    if (!search.trim()) return commandItems;
    return commandItems.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [commandItems, search]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const handleSelect = (item: CommandItem) => {
    setOpen(false);
    setSearch("");
    if (item.action) {
      item.action();
    } else if (item.href) {
      router.push(item.href);
    }
  };

  const handleKeyDownInMenu = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  if (!open) return null;

  // Group filtered items by category
  const categories: Array<CommandItem["category"]> = ["Components", "Navigation", "Actions"];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-150"
        onClick={() => setOpen(false)}
      />

      {/* Palette Dialog Window */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="relative w-full max-w-lg rounded-[8px] border border-border bg-popover shadow-2xl overflow-hidden z-50 animate-in zoom-in-95 duration-150"
      >
        {/* Input Bar */}
        <div className="flex items-center border-b border-border/60 px-3.5 py-2.5">
          <Search className="h-4 w-4 text-muted-foreground mr-2.5 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or search components..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDownInMenu}
            className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground/60 outline-none font-sans"
          />
          <kbd className="hidden sm:inline-flex rounded-[3px] border border-border/80 bg-secondary/80 px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-3">
          {filteredItems.length > 0 ? (
            categories.map((cat) => {
              const catItems = filteredItems.filter((i) => i.category === cat);
              if (catItems.length === 0) return null;

              return (
                <div key={cat} className="space-y-1">
                  <div className="px-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground/80 font-semibold">
                    {cat}
                  </div>
                  <div className="space-y-0.5">
                    {catItems.map((item) => {
                      const globalIdx = filteredItems.indexOf(item);
                      const isSelected = globalIdx === selectedIndex;

                      return (
                        <div
                          key={item.id}
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setSelectedIndex(globalIdx)}
                          className={cn(
                            "flex items-center justify-between rounded-[4px] px-2.5 py-1.5 text-xs cursor-pointer transition-colors select-none",
                            isSelected
                              ? "bg-foreground text-background font-medium"
                              : "text-foreground hover:bg-secondary"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            <span className={cn(isSelected ? "text-background" : "text-muted-foreground")}>
                              {item.icon}
                            </span>
                            <span>{item.title}</span>
                          </div>

                          {item.shortcut && (
                            <span
                              className={cn(
                                "text-[10px] font-mono px-1.5 py-0.2 rounded-[3px]",
                                isSelected
                                  ? "bg-background/20 text-background"
                                  : "bg-secondary text-muted-foreground border border-border/40"
                              )}
                            >
                              {item.shortcut}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-6 text-center text-xs text-muted-foreground font-mono">
              No results found for &ldquo;{search}&rdquo;
            </div>
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="flex items-center justify-between border-t border-border/40 bg-secondary/20 px-3 py-1.5 text-[10px] font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>ROSE UI Palette</span>
        </div>
      </div>
    </div>
  );
}
