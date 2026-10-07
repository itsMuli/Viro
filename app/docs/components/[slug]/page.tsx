import { notFound } from "next/navigation";
import { componentRegistry } from "@/registry";
import { ComponentDemo } from "@/components/docs/component-demo";
import { ComponentPreview } from "@/components/docs/component-preview";
import { ComponentPlayground } from "@/components/docs/component-playground";
import { CodeBlock } from "@/components/docs/code-block";
import { TableOfContents } from "@/components/docs/table-of-contents";
import { Badge } from "@/components/ui/badge";
import { Terminal } from "lucide-react";

export const instant = false;

export async function generateStaticParams() {
  return Object.keys(componentRegistry).map((slug) => ({ slug }));
}

export default async function ComponentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = componentRegistry[slug];

  if (!entry) {
    notFound();
  }

  const tocItems = [
    { id: "preview", title: "Live Preview" },
    { id: "playground", title: "Interactive Playground" },
    { id: "installation", title: "Installation" },
    { id: "usage", title: "Usage" },
    { id: "props", title: "Props & API" },
    { id: "accessibility", title: "Accessibility" },
    { id: "examples", title: "Examples" },
  ];

  const primaryFile = entry.files[0];

  return (
    <div className="flex gap-10">
      {/* Main Content Area */}
      <div className="min-w-0 flex-1 space-y-12">
        {/* Title Header */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="uppercase tracking-wider">
              {entry.category}
            </Badge>
            <span className="text-[11px] font-mono text-muted-foreground">
              v0.1.0
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-mono">
            {entry.title}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {entry.description}
          </p>
        </div>

        {/* 1. Live Preview Section */}
        <section id="preview" className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-2">
            <h2 className="text-base font-semibold tracking-tight text-foreground font-mono">
              Live Preview
            </h2>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground">
              <Terminal className="h-3 w-3" />
              <span>npx rose-ui add {entry.name}</span>
            </div>
          </div>

          <ComponentPreview code={primaryFile?.content || ""}>
            <ComponentDemo slug={entry.name} />
          </ComponentPreview>
        </section>

        {/* 2. Interactive Playground Section */}
        <section id="playground" className="space-y-4">
          <div className="border-b border-border/60 pb-2">
            <h2 className="text-base font-semibold tracking-tight text-foreground font-mono">
              Interactive Playground
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Adjust properties in real time to inspect states, variants, and design tokens.
            </p>
          </div>

          <ComponentPlayground componentName={entry.name} />
        </section>

        {/* 3. Installation Section */}
        <section id="installation" className="space-y-4">
          <div className="border-b border-border/60 pb-2">
            <h2 className="text-base font-semibold tracking-tight text-foreground font-mono">
              Installation
            </h2>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-medium text-foreground">CLI Command</div>
            <CodeBlock
              code={`npx rose-ui add ${entry.name}`}
              language="bash"
              showLineNumbers={false}
            />

            {entry.dependencies.length > 0 && (
              <div className="pt-2 space-y-2">
                <div className="text-xs font-medium text-foreground">Manual Dependencies</div>
                <CodeBlock
                  code={`npm install ${entry.dependencies.join(" ")}`}
                  language="bash"
                  showLineNumbers={false}
                />
              </div>
            )}
          </div>
        </section>

        {/* 4. Usage Section */}
        <section id="usage" className="space-y-4">
          <div className="border-b border-border/60 pb-2">
            <h2 className="text-base font-semibold tracking-tight text-foreground font-mono">
              Usage
            </h2>
          </div>

          <CodeBlock
            code={`import { ${entry.title.replace(/\s+/g, "")} } from "@/components/ui/${entry.name}";

export default function Example() {
  return (
    <${entry.title.replace(/\s+/g, "")}>Continue</${entry.title.replace(/\s+/g, "")}>
  );
}`}
            language="tsx"
          />
        </section>

        {/* 5. Props / API Table */}
        <section id="props" className="space-y-4">
          <div className="border-b border-border/60 pb-2">
            <h2 className="text-base font-semibold tracking-tight text-foreground font-mono">
              Props & API
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              TypeScript types and configuration options available on this component.
            </p>
          </div>

          {entry.props && entry.props.length > 0 ? (
            <div className="rounded-[8px] border border-border/80 overflow-hidden bg-card text-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-secondary/40 border-b border-border/60 text-[11px] font-mono uppercase text-muted-foreground">
                    <tr>
                      <th className="p-3 font-semibold">Prop</th>
                      <th className="p-3 font-semibold">Type</th>
                      <th className="p-3 font-semibold">Default</th>
                      <th className="p-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40 font-mono text-[11px]">
                    {entry.props.map((p, i) => (
                      <tr key={i} className="hover:bg-secondary/20 transition-colors">
                        <td className="p-3 font-semibold text-foreground">{p.name}</td>
                        <td className="p-3 text-muted-foreground font-mono max-w-[200px] truncate">{p.type}</td>
                        <td className="p-3 text-muted-foreground">{p.defaultValue || "-"}</td>
                        <td className="p-3 font-sans text-xs text-muted-foreground leading-relaxed">{p.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Inherits standard HTML element attributes.
            </p>
          )}
        </section>

        {/* 6. Accessibility Notes */}
        <section id="accessibility" className="space-y-4">
          <div className="border-b border-border/60 pb-2">
            <h2 className="text-base font-semibold tracking-tight text-foreground font-mono">
              Accessibility
            </h2>
          </div>
          <div className="rounded-[6px] border border-border/60 bg-secondary/20 p-4 text-xs space-y-2">
            <div className="font-semibold text-foreground">WAI-ARIA Pattern Compliance</div>
            <p className="text-muted-foreground leading-relaxed">
              Adheres strictly to the W3C WAI-ARIA authoring practices. Fully navigable via standard keyboard controls:
            </p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground font-mono text-[11px] pt-1">
              <li><kbd className="bg-secondary px-1 py-0.5 rounded text-foreground">Tab</kbd> navigates focus between interactive elements</li>
              <li><kbd className="bg-secondary px-1 py-0.5 rounded text-foreground">Enter</kbd> or <kbd className="bg-secondary px-1 py-0.5 rounded text-foreground">Space</kbd> activates selections and opens popovers</li>
              <li><kbd className="bg-secondary px-1 py-0.5 rounded text-foreground">Escape</kbd> closes open overlays, dropdowns, and dialogs</li>
              <li>High-contrast visible focus rings provide clear navigation context</li>
            </ul>
          </div>
        </section>

        {/* 7. Examples Section */}
        {entry.examples && entry.examples.length > 0 && (
          <section id="examples" className="space-y-6">
            <div className="border-b border-border/60 pb-2">
              <h2 className="text-base font-semibold tracking-tight text-foreground font-mono">
                Additional Examples
              </h2>
            </div>

            <div className="space-y-6">
              {entry.examples.map((ex, i) => (
                <div key={i} className="space-y-2">
                  <h3 className="text-xs font-semibold text-foreground font-mono">
                    {ex.title}
                  </h3>
                  {ex.description && (
                    <p className="text-xs text-muted-foreground">{ex.description}</p>
                  )}
                  <CodeBlock code={ex.code} language="tsx" />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Right Table of Contents (Desktop) */}
      <div className="hidden xl:block w-48 shrink-0 sticky top-20 self-start pt-2">
        <TableOfContents items={tocItems} />
      </div>
    </div>
  );
}
