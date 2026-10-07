import { CheckCheck, Copy, Palette, Rocket, Shield } from "lucide-react";

export function DxSection() {
  const steps = [
    {
      step: "01",
      name: "Copy",
      icon: <Copy className="h-5 w-5" />,
      description: "Grab the component source code directly or execute the CLI command into your local repo.",
    },
    {
      step: "02",
      name: "Customize",
      icon: <Palette className="h-5 w-5" />,
      description: "Tweak tokens, adjust border radiuses, change motion timings, and edit Tailwind classes without limits.",
    },
    {
      step: "03",
      name: "Own",
      icon: <Shield className="h-5 w-5" />,
      description: "The code is fully yours. Zero external package lock-in, zero unpredictable upstream version conflicts.",
    },
    {
      step: "04",
      name: "Ship",
      icon: <Rocket className="h-5 w-5" />,
      description: "Deploy production applications with battle-tested accessibility and blazing compile performance.",
    },
  ];

  return (
    <section className="py-20 border-t border-border/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-3 max-w-2xl">
          <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground font-semibold">
            Developer Experience
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-mono">
            How ROSE UI Works
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A linear, friction-free loop designed for engineers who value velocity and code control.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div
              key={s.step}
              className="relative rounded-[8px] border border-border/80 bg-card p-6 space-y-3 hover:border-foreground/30 transition-colors"
            >
              <div className="flex items-center justify-between text-muted-foreground font-mono">
                <span className="text-xs font-semibold">{s.step}</span>
                <div className="text-foreground">{s.icon}</div>
              </div>
              <h3 className="text-lg font-bold font-mono tracking-tight text-foreground">
                {s.name}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
