import Link from "next/link";
import { GithubIcon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-12 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-foreground text-background font-mono font-bold text-xs">
              R
            </span>
            <span className="font-mono font-semibold tracking-wider text-foreground">
              ROSE UI
            </span>
            <span className="text-muted-foreground">·</span>
            <span className="text-muted-foreground">
              Beautiful building blocks for modern interfaces.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-muted-foreground">
            <Link href="/docs/components/button" className="hover:text-foreground transition-colors">
              Components
            </Link>
            <Link href="/docs/patterns" className="hover:text-foreground transition-colors">
              Patterns
            </Link>
            <Link href="/blocks" className="hover:text-foreground transition-colors">
              Blocks
            </Link>
            <Link href="/flows" className="hover:text-foreground transition-colors">
              Flows
            </Link>
            <Link href="/lab" className="hover:text-foreground transition-colors">
              Lab
            </Link>
            <Link href="/docs" className="hover:text-foreground transition-colors">
              Docs
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between text-[11px] text-muted-foreground font-mono gap-4">
          <div>
            © 2026 ROSE UI. Open source under MIT license. Built to be owned.
          </div>
          <div>
            Monochrome · Accessible · Zero Lock-in
          </div>
        </div>
      </div>
    </footer>
  );
}
