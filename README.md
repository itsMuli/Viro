# VIRO UI

> A minimal, editorial, monochrome component system for modern React and Next.js applications.

Inspired by the philosophy of headless ownership pioneered by `shadcn/ui`, **VIRO UI** features a completely original visual identity rooted in Swiss typography, high-contrast monochrome design, and clean developer workflows.

---

## ✦ Core Features

- **Built to be Owned**: Copy, customize, own, and ship. Zero opaque NPM package lock-in.
- **Monochrome Editorial Aesthetic**: Obsidian black, charcoal, graphite, and crisp white palette. No neon distractions.
- **Radix UI Primitives**: Accessible keyboard navigation, focus trap handling, and W3C WAI-ARIA compliance.
- **Tailwind CSS v4 & Turbopack**: Compiled atomic utilities without CSS-in-JS runtime overhead.
- **Dark & Light Mode**: Deep obsidian dark mode and crisp gallery light mode with instantaneous switching.
- **Signature Custom Date Picker**: Calendar popover with month navigation, single date and range selection, and quick presets.
- **Interactive Component Playground**: Test variants, sizes, and states in real-time within the documentation.
- **Component Registry Architecture**: Ready for CLI expansion (`npx viro add <component>`).

---

## ✦ Project Structure

```
├── app/
│   ├── layout.tsx                  # Root layout with ThemeProvider and Geist fonts
│   ├── globals.css                 # Monochrome tokens, dark variants, and utilities
│   ├── page.tsx                    # Landing page
│   └── docs/
│       ├── layout.tsx              # Docs shell (Sticky Header + Sidebar + Mobile Drawer)
│       ├── page.tsx                # Introduction & philosophy
│       ├── installation/page.tsx   # Step-by-step setup guide
│       ├── foundations/page.tsx    # Design tokens, typography, and motion rules
│       ├── blocks/page.tsx         # Pre-composed UI blocks (Auth, Telemetry, Security)
│       └── components/[slug]/      # Dynamic component documentation & playground
├── components/
│   ├── ui/                         # 12 Core components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── tabs.tsx
│   │   ├── tooltip.tsx
│   │   ├── checkbox.tsx
│   │   ├── switch.tsx
│   │   ├── calendar.tsx
│   │   └── date-picker.tsx
│   ├── docs/                       # Docs system (Header, Sidebar, Playground, Preview, etc.)
│   ├── landing/                    # Landing page sections (Hero, Demo, Philosophy, Showcase, etc.)
│   └── icons.tsx                   # Brand icons (Github, etc.)
├── lib/
│   └── utils.ts                    # Class name merging utility (cn)
├── registry/
│   └── index.ts                    # Structured registry metadata, source code & props
└── types/
    └── index.ts                    # Shared TypeScript interfaces
```

---

## ✦ Getting Started

### 1. Install Dependencies

```bash
npm install lucide-react clsx tailwind-merge next-themes @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-tooltip @radix-ui/react-tabs @radix-ui/react-popover @radix-ui/react-checkbox @radix-ui/react-switch @radix-ui/react-slot
```

### 2. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3001](http://localhost:3001) (or port 3000) to browse the documentation and live component system.

---

## ✦ Components (Initial Release)

1. **Button** (`components/ui/button.tsx`): 6 monochrome variants (`default`, `secondary`, `outline`, `ghost`, `destructive`, `link`), 4 sizes (`sm`, `md`, `lg`, `icon`), loading spinner, `asChild` Slot support.
2. **Input** (`components/ui/input.tsx`): Focus ring, left/right icon slots, error states.
3. **Card** (`components/ui/card.tsx`): `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`.
4. **Badge** (`components/ui/badge.tsx`): Status pills with animated pulse dot indicators.
5. **Dialog** (`components/ui/dialog.tsx`): Accessible modal overlay with backdrop blur.
6. **Dropdown Menu** (`components/ui/dropdown-menu.tsx`): Keyboard navigation, shortcuts, separators, destructive items.
7. **Tabs** (`components/ui/tabs.tsx`): Segmented tab views.
8. **Tooltip** (`components/ui/tooltip.tsx`): Micro popovers with hover delay.
9. **Checkbox** (`components/ui/checkbox.tsx`): High-contrast checkmark with accessible focus.
10. **Switch** (`components/ui/switch.tsx`): Tactile binary toggle with smooth thumb transitions.
11. **Calendar** (`components/ui/calendar.tsx`): Custom month grid, weekday headers, single and range selection, today indicator.
12. **Date Picker & Range Picker** (`components/ui/date-picker.tsx`): Custom popover calendar, formatted dates, and quick presets.

---

## ✦ License

Open-source under the MIT License. Designed and engineered by **Viro**.
