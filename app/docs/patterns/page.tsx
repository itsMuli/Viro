import { Badge } from "@/components/ui/badge";
import { CollapsibleSidebar } from "@/components/ui/collapsible-sidebar";
import { DataTable } from "@/components/ui/data-table";
import { CodeBlock } from "@/components/docs/code-block";

export default function PatternsPage() {
  return (
    <div className="space-y-12 max-w-4xl">
      {/* Title */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="outline" dot>Design Patterns</Badge>
          <span className="text-[11px] font-mono text-muted-foreground">Architectural Recipes</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-mono">
          Patterns
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Established UI paradigms and recipes for assembling complex product capabilities from ROSE UI primitives.
        </p>
      </div>

      {/* Pattern 1: Collapsible Sidebar */}
      <section className="space-y-4">
        <div className="border-b border-border/60 pb-2">
          <h2 className="text-base font-semibold text-foreground font-mono">
            01. Collapsible Sidebar Navigation
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Toggle between an expanded menu (brand name, full section titles) and a minimalist collapsed rail (icons only with hover tooltips).
          </p>
        </div>

        <div className="rounded-[8px] border border-border/80 bg-grid-subtle p-6 flex justify-center">
          <div className="h-96 rounded-[6px] border border-border overflow-hidden bg-card shadow-lg flex">
            <CollapsibleSidebar />
            <div className="flex-1 p-6 font-mono text-xs text-muted-foreground bg-background/50 flex items-center justify-center">
              [ Main Application Viewport ]
            </div>
          </div>
        </div>

        <CodeBlock
          filename="components/ui/collapsible-sidebar.tsx"
          code={`import { CollapsibleSidebar } from "@/components/ui/collapsible-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <CollapsibleSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}`}
          language="tsx"
        />
      </section>

      {/* Pattern 2: Signature Data Table */}
      <section className="space-y-4">
        <div className="border-b border-border/60 pb-2">
          <h2 className="text-base font-semibold text-foreground font-mono">
            02. High-Density Data Table with Sorting & Bulk Actions
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Combines search filtering, role and status dropdowns, sortable headers, row checkbox selection with bulk action bar, and pagination.
          </p>
        </div>

        <div className="rounded-[8px] border border-border/80 bg-grid-subtle p-6">
          <DataTable />
        </div>
      </section>
    </div>
  );
}
