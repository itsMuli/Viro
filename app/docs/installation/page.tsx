import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { CodeBlock } from "@/components/docs/code-block";
import { Button } from "@/components/ui/button";

export default function InstallationPage() {
  return (
    <div className="space-y-10 max-w-3xl">
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-mono">
          Installation
        </h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          How to install dependencies and configure your Next.js application for ROSE UI.
        </p>
      </div>

      {/* Step 1 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background text-[11px] font-mono font-bold">
            1
          </span>
          <h2 className="text-base font-semibold text-foreground font-mono">
            Install Core Dependencies
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          ROSE UI utilizes Tailwind CSS for styling and lightweight primitives for accessible ARIA mechanics.
        </p>
        <CodeBlock
          code={`npm install lucide-react clsx tailwind-merge next-themes @radix-ui/react-slot`}
          language="bash"
          showLineNumbers={false}
        />
      </div>

      {/* Step 2 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background text-[11px] font-mono font-bold">
            2
          </span>
          <h2 className="text-base font-semibold text-foreground font-mono">
            Add the <code className="text-xs font-mono">cn</code> Utility
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Create a utility function to merge Tailwind classes cleanly without conflicts.
        </p>
        <CodeBlock
          filename="lib/utils.ts"
          code={`import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`}
          language="typescript"
        />
      </div>

      {/* Step 3 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background text-[11px] font-mono font-bold">
            3
          </span>
          <h2 className="text-base font-semibold text-foreground font-mono">
            Configure Monochrome Design Tokens
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Add the editorial monochrome CSS variables into your <code className="text-foreground font-mono bg-secondary px-1 py-0.5 rounded">globals.css</code>:
        </p>
        <CodeBlock
          filename="app/globals.css"
          code={`@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: #ffffff;
  --foreground: #09090b;
  --card: #ffffff;
  --card-foreground: #09090b;
  --popover: #ffffff;
  --popover-foreground: #09090b;
  --primary: #09090b;
  --primary-foreground: #fafafa;
  --secondary: #f4f4f5;
  --secondary-foreground: #18181b;
  --muted: #f4f4f5;
  --muted-foreground: #71717a;
  --border: #e4e4e7;
  --input: #e4e4e7;
  --ring: #09090b;
}

.dark {
  --background: #050505;
  --foreground: #fafafa;
  --card: #0a0a0c;
  --card-foreground: #fafafa;
  --popover: #0a0a0c;
  --popover-foreground: #fafafa;
  --primary: #fafafa;
  --primary-foreground: #09090b;
  --secondary: #141416;
  --secondary-foreground: #fafafa;
  --muted: #141416;
  --muted-foreground: #8b8b93;
  --border: #222226;
  --input: #222226;
  --ring: #e4e4e7;
}`}
          language="css"
        />
      </div>

      {/* Step 4 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background text-[11px] font-mono font-bold">
            4
          </span>
          <h2 className="text-base font-semibold text-foreground font-mono">
            Add Your First Component
          </h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Add components using the upcoming CLI or simply copy and paste the code from any component's documentation page.
        </p>
        <CodeBlock
          code={`npx rose-ui add button`}
          language="bash"
          showLineNumbers={false}
        />
      </div>

      {/* Next Step CTA */}
      <div className="pt-6 border-t border-border/60 flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-mono">Explore Components</span>
        <Button asChild size="sm">
          <Link href="/docs/components/button" className="flex items-center gap-1.5">
            <span>Button Component</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
