import Link from "next/link";
import { ArrowRight, CheckCircle2, Copy, Sparkles, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function DocsIntroductionPage() {
  return (
    <div className="space-y-10 max-w-3xl">
      {/* Title Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" dot>Release v0.1.0</Badge>
          <span className="text-[11px] font-mono text-muted-foreground">Next.js 15+ & React 19</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-mono">
          Introduction
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          ROSE UI is a premium, minimal, black-and-white component system built for React and Next.js applications.
          Designed with an editorial sensibility, strict typographic hierarchy, and an architecture prioritizing full developer ownership.
        </p>
      </div>

      {/* Philosophy Card */}
      <div className="rounded-[8px] border border-border/80 bg-secondary/30 p-6 space-y-4">
        <div className="flex items-center gap-2 text-foreground font-semibold text-sm">
          <Sparkles className="h-4 w-4" />
          <span>The ROSE UI Philosophy: Built to be Owned</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          This is not a monolithic component library that locks you into external dependencies or rigid themes.
          Instead of wrapping complex CSS engines behind opaque props, ROSE UI gives you transparent, idiomatic
          TypeScript code that lives directly inside your repository.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="flex items-start gap-2 text-xs">
            <CheckCircle2 className="h-4 w-4 text-foreground shrink-0 mt-0.5" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">Zero Runtime Overhead:</strong> Tailwind CSS utilities merged directly at compile time.
            </span>
          </div>
          <div className="flex items-start gap-2 text-xs">
            <CheckCircle2 className="h-4 w-4 text-foreground shrink-0 mt-0.5" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">Full Accessibility:</strong> Powered by Radix UI primitives with full ARIA specifications.
            </span>
          </div>
          <div className="flex items-start gap-2 text-xs">
            <CheckCircle2 className="h-4 w-4 text-foreground shrink-0 mt-0.5" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">Monochrome Harmony:</strong> Tailored shades of obsidian, charcoal, and crisp white.
            </span>
          </div>
          <div className="flex items-start gap-2 text-xs">
            <CheckCircle2 className="h-4 w-4 text-foreground shrink-0 mt-0.5" />
            <span className="text-muted-foreground">
              <strong className="text-foreground">No Lock-in:</strong> Customize any component to match your unique brand identity.
            </span>
          </div>
        </div>
      </div>

      {/* Quick Start Steps */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground font-mono">
          Quick Start
        </h2>
        <div className="space-y-3">
          <div className="rounded-[6px] border border-border bg-[#0c0c0e] p-4 text-[#ededed] font-mono text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-[#88888e]" />
              <span>npx rose-ui add button date-picker</span>
            </div>
            <span className="text-[10px] text-white/40 uppercase">CLI Ready</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Or copy and paste the component source files directly from each documentation page into your project's <code className="text-foreground font-mono bg-secondary px-1 py-0.5 rounded">components/ui/</code> folder.
          </p>
        </div>
      </div>

      {/* Featured Components Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground font-mono">
          Featured Components
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/docs/components/button" className="group">
            <Card className="h-full hover:border-foreground/40 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Button</CardTitle>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <CardDescription>
                  6 monochrome variants, 4 sizes, loading spinner, and Radix Slot support.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/docs/components/date-picker" className="group">
            <Card className="h-full hover:border-foreground/40 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle>Date Picker</CardTitle>
                    <Badge variant="outline">Showcase</Badge>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <CardDescription>
                  Custom calendar popover, quick presets, and range selection.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/docs/components/dialog" className="group">
            <Card className="h-full hover:border-foreground/40 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Dialog</CardTitle>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <CardDescription>
                  Accessible modal dialog with backdrop blur and smooth motion transitions.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>

          <Link href="/docs/components/tabs" className="group">
            <Card className="h-full hover:border-foreground/40 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Tabs</CardTitle>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <CardDescription>
                  Minimal segmented views for organizing dense product interfaces.
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        </div>
      </div>

      {/* Next Step CTA */}
      <div className="pt-6 border-t border-border/60 flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-mono">Next: Installation Guide</span>
        <Button asChild size="sm">
          <Link href="/docs/installation" className="flex items-center gap-1.5">
            <span>Installation</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
