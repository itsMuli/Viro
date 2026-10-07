import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="py-24 border-t border-border/40 bg-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-subtle opacity-40 pointer-events-none" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground font-mono">
          Build your interface your way.
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Open-source, free to copy, and meticulously engineered for modern React & Next.js applications.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button asChild size="lg" className="px-8 font-mono text-xs">
            <Link href="/docs/components/button" className="flex items-center gap-2">
              <span>Explore Components</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-6 font-mono text-xs">
            <Link href="/docs/installation">
              Getting Started
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
