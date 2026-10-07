import { Badge } from "@/components/ui/badge";

export default function FoundationsPage() {
  const colors = [
    { name: "Obsidian", light: "#050505", dark: "#fafafa", desc: "Primary brand background in dark mode, text in light." },
    { name: "Charcoal", light: "#141416", dark: "#27272a", desc: "Secondary elevation and container fills." },
    { name: "Graphite", light: "#71717a", dark: "#8b8b93", desc: "Muted text, metadata labels, and helper descriptions." },
    { name: "Border Gray", light: "#e4e4e7", dark: "#222226", desc: "Subtle dividers, input borders, and card framing." },
    { name: "Off-White", light: "#f4f4f5", dark: "#18181b", desc: "Subtle hovered card and button surfaces." },
    { name: "Pure White", light: "#ffffff", dark: "#050505", desc: "Crisp light background and dark high-contrast foreground." },
  ];

  return (
    <div className="space-y-10 max-w-3xl">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-mono">
          Design Foundations
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The typographic, chromatic, and spatial principles that make ROSE UI feel precise, minimal, and editorial.
        </p>
      </div>

      {/* Palette section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground font-mono">
          Monochrome Palette
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          We eschew arbitrary saturated hues in favor of rich neutral values calibrated for maximum readability in both low-light and bright daylight settings.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
          {colors.map((c) => (
            <div
              key={c.name}
              className="rounded-[6px] border border-border/80 p-3 bg-card space-y-2"
            >
              <div
                className="h-10 w-full rounded-[4px] border border-border/40"
                style={{ backgroundColor: c.light }}
              />
              <div>
                <div className="text-xs font-semibold text-foreground font-mono">
                  {c.name}
                </div>
                <div className="text-[10px] text-muted-foreground font-mono">
                  Light: {c.light} · Dark: {c.dark}
                </div>
                <p className="text-[11px] text-muted-foreground/80 mt-1 leading-tight">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground font-mono">
          Typography System
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Inspired by Swiss international typographic style. Headings are confident and tightly tracked. Body copy is airy and crisp. Monospace is used liberally for technical precision.
        </p>

        <div className="rounded-[8px] border border-border/80 bg-card p-6 space-y-4">
          <div className="border-b border-border/40 pb-3">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Display 32px</span>
            <div className="text-2xl font-bold tracking-tight text-foreground font-mono">
              The Architecture of Minimal Interfaces
            </div>
          </div>
          <div className="border-b border-border/40 pb-3">
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Heading 18px</span>
            <div className="text-sm font-semibold tracking-tight text-foreground">
              Composability Over Abstraction
            </div>
          </div>
          <div>
            <span className="text-[10px] font-mono text-muted-foreground uppercase">Technical Monospace</span>
            <div className="font-mono text-xs text-muted-foreground">
              const theme = {`{ border: "1px solid var(--border)", radius: 6 }`}
            </div>
          </div>
        </div>
      </div>

      {/* Motion */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground font-mono">
          Motion & Interaction
        </h2>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Animations exist purely to reinforce spatial context. All transitions are tuned to under 200ms using easing curves that feel snappy and mechanical rather than bouncy or playful.
        </p>
      </div>
    </div>
  );
}
