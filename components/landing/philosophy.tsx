import { Check, Code2, Cpu, GitBranch, ShieldCheck } from "lucide-react";

export function Philosophy() {
  const pillars = [
    {
      icon: <Code2 className="h-5 w-5" />,
      title: "Direct Code Ownership",
      description:
        "You don't install an opaque NPM black box. You copy clean, readable TypeScript directly into your repository. You own every line, change whatever you wish, and never worry about breaking upstream package releases.",
    },
    {
      icon: <ShieldCheck className="h-5 w-5" />,
      title: "Accessible Primitives",
      description:
        "Every interactive component is built atop headless Radix UI primitives. Keyboard navigation, ARIA roles, focus management, and screen-reader accessibility work flawlessly out of the box.",
    },
    {
      icon: <Cpu className="h-5 w-5" />,
      title: "Zero Runtime CSS Overhead",
      description:
        "No CSS-in-JS compilers or heavy style engines slowing down your hydration. Built natively with Tailwind CSS and atomic utility tokens compiled directly during your build step.",
    },
    {
      icon: <GitBranch className="h-5 w-5" />,
      title: "Monochrome Editorial Identity",
      description:
        "Designed to look intentional, confident, and sophisticated. We deliberately avoid noisy neon gradients and generic templates in favor of crisp Swiss typography and restrained grayscale precision.",
    },
  ];

  return (
    <section className="py-20 border-t border-border/40 bg-secondary/10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
            Philosophy
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-mono">
            Built to be owned.
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            The era of heavyweight UI dependencies holding your codebase hostage is over.
            ROSE UI puts you back in total control of your frontend architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <div
              key={i}
              className="rounded-[8px] border border-border/80 bg-card p-6 space-y-3 hover:border-foreground/30 transition-colors"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-[4px] bg-secondary text-foreground">
                {p.icon}
              </div>
              <h3 className="text-sm font-semibold tracking-tight text-foreground font-mono">
                {p.title}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {p.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
