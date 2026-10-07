export interface RegistryEntry {
  name: string;
  title: string;
  description: string;
  category: "actions" | "forms" | "overlays" | "navigation" | "data-display" | "date-time" | "feedback";
  dependencies: string[];
  devDependencies?: string[];
  files: {
    path: string;
    type: "component" | "hook" | "util";
    content: string;
  }[];
  props?: {
    name: string;
    type: string;
    defaultValue?: string;
    description: string;
  }[];
  examples?: {
    title: string;
    description?: string;
    code: string;
  }[];
}

export const componentRegistry: Record<string, RegistryEntry> = {
  button: {
    name: "button",
    title: "Button",
    description: "An interactive element used for actions, submissions, and dialog triggers with multiple monochrome variants.",
    category: "actions",
    dependencies: ["@radix-ui/react-slot", "lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "components/ui/button.tsx",
        type: "component",
        content: `"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "link";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
  isLoading?: boolean;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default:
    "bg-foreground text-background hover:opacity-90 active:scale-[0.98] border border-transparent shadow-sm",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98] border border-border/40",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-secondary/60 hover:border-foreground/40 active:scale-[0.98]",
  ghost:
    "text-foreground hover:bg-secondary/60 active:scale-[0.98]",
  destructive:
    "bg-destructive text-destructive-foreground hover:opacity-90 active:scale-[0.98] border border-border/20",
  link:
    "text-foreground underline-offset-4 hover:underline p-0 h-auto font-normal",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-8 px-3 text-xs tracking-tight rounded-[5px] gap-1.5",
  md: "h-9 px-4 text-xs font-medium tracking-tight rounded-[6px] gap-2",
  lg: "h-11 px-5 text-sm font-medium tracking-tight rounded-[6px] gap-2.5",
  icon: "h-9 w-9 p-0 rounded-[6px] justify-center items-center shrink-0",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      asChild = false,
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap transition-all duration-150 select-none cursor-pointer",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
          "disabled:pointer-events-none disabled:opacity-40 disabled:cursor-not-allowed",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
        )}
        {children}
      </Comp>
    );
  }
);
Button.displayName = "Button";`,
      },
    ],
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"',
        defaultValue: '"default"',
        description: "The visual aesthetic variant of the button.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg" | "icon"',
        defaultValue: '"md"',
        description: "The button size and padding scale.",
      },
      {
        name: "isLoading",
        type: "boolean",
        defaultValue: "false",
        description: "Renders a monochrome spinning loader and disables interaction.",
      },
      {
        name: "asChild",
        type: "boolean",
        defaultValue: "false",
        description: "Delegates rendering to the child element via Radix Slot.",
      },
    ],
    examples: [
      {
        title: "All Variants",
        description: "Displaying the complete monochrome variant set.",
        code: `<div className="flex flex-wrap gap-3">
  <Button variant="default">Default</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="ghost">Ghost</Button>
  <Button variant="destructive">Destructive</Button>
  <Button variant="link">Link</Button>
</div>`,
      },
      {
        title: "Button Sizes",
        description: "Compact to prominent touch and click targets.",
        code: `<div className="flex items-center gap-3">
  <Button size="sm">Small</Button>
  <Button size="md">Medium</Button>
  <Button size="lg">Large</Button>
</div>`,
      },
      {
        title: "Loading State",
        description: "Disables click actions with an integrated spinner.",
        code: `<Button isLoading>Processing...</Button>`,
      },
    ],
  },

  input: {
    name: "input",
    title: "Input",
    description: "A refined single-line text input with support for icons, error feedback, and monochrome focus rings.",
    category: "forms",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "components/ui/input.tsx",
        type: "component",
        content: `"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", leftIcon, rightIcon, isError, disabled, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          disabled={disabled}
          ref={ref}
          className={cn(
            "flex h-9 w-full rounded-[6px] border border-input bg-background/50 px-3 py-1 text-xs text-foreground placeholder:text-muted-foreground/60 transition-colors",
            "hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-foreground",
            "disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-input",
            leftIcon && "pl-9",
            rightIcon && "pr-9",
            isError && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 flex items-center text-muted-foreground">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";`,
      },
    ],
    props: [
      {
        name: "leftIcon",
        type: "React.ReactNode",
        defaultValue: "undefined",
        description: "Icon element rendered on the inner left side of the input.",
      },
      {
        name: "rightIcon",
        type: "React.ReactNode",
        defaultValue: "undefined",
        description: "Icon element or interactive action rendered on the right.",
      },
      {
        name: "isError",
        type: "boolean",
        defaultValue: "false",
        description: "Applies high-contrast error border and focus ring.",
      },
      {
        name: "disabled",
        type: "boolean",
        defaultValue: "false",
        description: "Disables user interaction and dims the field.",
      },
    ],
    examples: [
      {
        title: "Standard Input",
        code: `<Input placeholder="developer@viro-ui.dev" />`,
      },
      {
        title: "With Search Icon",
        code: `<Input leftIcon={<Search className="h-4 w-4" />} placeholder="Search documentation..." />`,
      },
      {
        title: "Error State",
        code: `<Input isError defaultValue="invalid.email@" />`,
      },
    ],
  },

  card: {
    name: "card",
    title: "Card",
    description: "Structured content container featuring subtle borders, editorial padding, and clear typographic hierarchy.",
    category: "data-display",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "components/ui/card.tsx",
        type: "component",
        content: `import * as React from "react";
import { cn } from "@/lib/utils";

export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[8px] border border-border/80 bg-card text-card-foreground shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] transition-all",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-sm font-semibold leading-none tracking-tight text-foreground",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-muted-foreground leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0 border-t border-border/40 mt-4", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";`,
      },
    ],
    props: [
      {
        name: "className",
        type: "string",
        defaultValue: "undefined",
        description: "Additional CSS classes to merge into the container.",
      },
    ],
    examples: [
      {
        title: "Standard Card",
        code: `<Card className="w-[350px]">
  <CardHeader>
    <CardTitle>API Key Generated</CardTitle>
    <CardDescription>Use this token in your Authorization headers.</CardDescription>
  </CardHeader>
  <CardContent>
    <p className="font-mono text-xs text-muted-foreground bg-secondary p-2 rounded">viro_live_8390b1c7</p>
  </CardContent>
  <CardFooter className="justify-end gap-2">
    <Button variant="outline" size="sm">Revoke</Button>
    <Button size="sm">Copy</Button>
  </CardFooter>
</Card>`,
      },
    ],
  },

  badge: {
    name: "badge",
    title: "Badge",
    description: "A compact status pill or metadata tag with optional animated pulse indicators.",
    category: "data-display",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "components/ui/badge.tsx",
        type: "component",
        content: `import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "subtle" | "destructive";
  dot?: boolean;
}

const badgeVariants = {
  default: "border-transparent bg-foreground text-background",
  secondary: "border-border/50 bg-secondary text-secondary-foreground",
  outline: "border-border text-foreground bg-transparent",
  subtle: "border-border/40 bg-secondary/50 text-muted-foreground",
  destructive: "border-destructive/30 bg-destructive/10 text-foreground",
};

export function Badge({
  className,
  variant = "default",
  dot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-tight transition-colors font-mono select-none",
        badgeVariants[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
      )}
      {children}
    </div>
  );
}`,
      },
    ],
    props: [
      {
        name: "variant",
        type: '"default" | "secondary" | "outline" | "subtle" | "destructive"',
        defaultValue: '"default"',
        description: "Color and border scheme of the badge.",
      },
      {
        name: "dot",
        type: "boolean",
        defaultValue: "false",
        description: "Renders an animated status indicator dot.",
      },
    ],
    examples: [
      {
        title: "Status Badges",
        code: `<div className="flex gap-2">
  <Badge dot variant="default">v1.0.0</Badge>
  <Badge variant="secondary">TypeScript</Badge>
  <Badge variant="outline">Production</Badge>
  <Badge dot variant="subtle">Syncing</Badge>
</div>`,
      },
    ],
  },

  dialog: {
    name: "dialog",
    title: "Dialog",
    description: "An accessible modal overlay window powered by Radix UI with subtle backdrop blur and smooth entrance animations.",
    category: "overlays",
    dependencies: ["@radix-ui/react-dialog", "lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "components/ui/dialog.tsx",
        type: "component",
        content: `// Radix UI Dialog implementation (see components/ui/dialog.tsx)`,
      },
    ],
    props: [
      {
        name: "open",
        type: "boolean",
        defaultValue: "undefined",
        description: "Controlled open state of the dialog.",
      },
      {
        name: "onOpenChange",
        type: "(open: boolean) => void",
        defaultValue: "undefined",
        description: "Callback fired when open state changes.",
      },
    ],
    examples: [
      {
        title: "Standard Confirmation Dialog",
        code: `<Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Deploy Project</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Deploy to Production</DialogTitle>
      <DialogDescription>
        This will create a new immutable release and route 100% of incoming traffic.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="ghost">Cancel</Button>
      <Button>Confirm & Deploy</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>`,
      },
    ],
  },

  "dropdown-menu": {
    name: "dropdown-menu",
    title: "Dropdown Menu",
    description: "A contextual overlay menu for actions, radio groups, checkboxes, and nested submenus with keyboard shortcuts.",
    category: "overlays",
    dependencies: ["@radix-ui/react-dropdown-menu", "lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "components/ui/dropdown-menu.tsx",
        type: "component",
        content: `// Radix UI Dropdown Menu implementation (see components/ui/dropdown-menu.tsx)`,
      },
    ],
    props: [
      {
        name: "sideOffset",
        type: "number",
        defaultValue: "4",
        description: "Distance in pixels between the trigger and dropdown content.",
      },
    ],
    examples: [
      {
        title: "User Profile Dropdown",
        code: `<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Options ▾</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="w-48">
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuItem>
      Profile <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuItem>
      Settings <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem destructive>
      Log out <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
      },
    ],
  },

  tabs: {
    name: "tabs",
    title: "Tabs",
    description: "A clean, segmented view switcher for organizing content into layered sections.",
    category: "navigation",
    dependencies: ["@radix-ui/react-tabs", "clsx", "tailwind-merge"],
    files: [
      {
        path: "components/ui/tabs.tsx",
        type: "component",
        content: `// Radix UI Tabs implementation (see components/ui/tabs.tsx)`,
      },
    ],
    props: [
      {
        name: "defaultValue",
        type: "string",
        defaultValue: "undefined",
        description: "The value of the tab that should be active on initial render.",
      },
    ],
    examples: [
      {
        title: "Account Settings Tabs",
        code: `<Tabs defaultValue="general" className="w-[400px]">
  <TabsList className="grid w-full grid-cols-2">
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="billing">Billing</TabsTrigger>
  </TabsList>
  <TabsContent value="general" className="p-4 border rounded-[6px]">
    <p className="text-xs text-muted-foreground">Manage your workspace account preferences.</p>
  </TabsContent>
  <TabsContent value="billing" className="p-4 border rounded-[6px]">
    <p className="text-xs text-muted-foreground">Invoices and subscription payment methods.</p>
  </TabsContent>
</Tabs>`,
      },
    ],
  },

  tooltip: {
    name: "tooltip",
    title: "Tooltip",
    description: "A subtle popup displaying contextual information when an element receives focus or hover.",
    category: "overlays",
    dependencies: ["@radix-ui/react-tooltip", "clsx", "tailwind-merge"],
    files: [
      {
        path: "components/ui/tooltip.tsx",
        type: "component",
        content: `// Radix UI Tooltip implementation (see components/ui/tooltip.tsx)`,
      },
    ],
    props: [
      {
        name: "delayDuration",
        type: "number",
        defaultValue: "700",
        description: "Duration in milliseconds before the tooltip appears on hover.",
      },
    ],
    examples: [
      {
        title: "Action Button with Tooltip",
        code: `<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <Button variant="outline" size="icon">⌘</Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>Quick Command Menu</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>`,
      },
    ],
  },

  checkbox: {
    name: "checkbox",
    title: "Checkbox",
    description: "A precision square control that toggles between checked, unchecked, and indeterminate states.",
    category: "forms",
    dependencies: ["@radix-ui/react-checkbox", "lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "components/ui/checkbox.tsx",
        type: "component",
        content: `// Radix UI Checkbox implementation (see components/ui/checkbox.tsx)`,
      },
    ],
    props: [
      {
        name: "checked",
        type: "boolean | 'indeterminate'",
        defaultValue: "false",
        description: "State of the checkbox.",
      },
    ],
    examples: [
      {
        title: "Terms and Conditions",
        code: `<div className="flex items-center space-x-2">
  <Checkbox id="terms" />
  <label htmlFor="terms" className="text-xs text-foreground font-medium cursor-pointer">
    Accept telemetry and open telemetry streaming
  </label>
</div>`,
      },
    ],
  },

  switch: {
    name: "switch",
    title: "Switch",
    description: "A tactile binary toggle for enabling or disabling application settings with smooth spring animation.",
    category: "forms",
    dependencies: ["@radix-ui/react-switch", "clsx", "tailwind-merge"],
    files: [
      {
        path: "components/ui/switch.tsx",
        type: "component",
        content: `// Radix UI Switch implementation (see components/ui/switch.tsx)`,
      },
    ],
    props: [
      {
        name: "checked",
        type: "boolean",
        defaultValue: "false",
        description: "Controlled checked state.",
      },
    ],
    examples: [
      {
        title: "Notification Switch",
        code: `<div className="flex items-center justify-between w-[300px]">
  <div className="space-y-0.5">
    <div className="text-xs font-medium">Automatic Backups</div>
    <div className="text-[11px] text-muted-foreground">Snapshot database every 6 hours</div>
  </div>
  <Switch defaultChecked />
</div>`,
      },
    ],
  },

  calendar: {
    name: "calendar",
    title: "Calendar",
    description: "A standalone, lightweight monochrome calendar component with month navigation, single/range selection, and date bounds.",
    category: "date-time",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "components/ui/calendar.tsx",
        type: "component",
        content: `// Calendar implementation (see components/ui/calendar.tsx)`,
      },
    ],
    props: [
      {
        name: "mode",
        type: '"single" | "range"',
        defaultValue: '"single"',
        description: "Selection mode for single date or date range intervals.",
      },
      {
        name: "selected",
        type: "Date | { from?: Date; to?: Date }",
        defaultValue: "undefined",
        description: "Currently selected date or range object.",
      },
      {
        name: "onSelect",
        type: "(date: any) => void",
        defaultValue: "undefined",
        description: "Event handler fired when a date is selected.",
      },
    ],
    examples: [
      {
        title: "Inline Month Grid",
        code: `<Calendar mode="single" />`,
      },
    ],
  },

  "date-picker": {
    name: "date-picker",
    title: "Date Picker",
    description: "A signature VIRO UI date picker offering formatted date display, quick presets (Today, Tomorrow), and date range selection.",
    category: "date-time",
    dependencies: ["@radix-ui/react-popover", "lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "components/ui/date-picker.tsx",
        type: "component",
        content: `// DatePicker implementation (see components/ui/date-picker.tsx)`,
      },
    ],
    props: [
      {
        name: "date",
        type: "Date",
        defaultValue: "undefined",
        description: "The selected single date.",
      },
      {
        name: "onSelect",
        type: "(date: Date | undefined) => void",
        defaultValue: "undefined",
        description: "Callback invoked on date change or clear.",
      },
      {
        name: "placeholder",
        type: "string",
        defaultValue: '"Select date"',
        description: "Input trigger placeholder text.",
      },
    ],
    examples: [
      {
        title: "Single Date Picker",
        code: `<DatePicker placeholder="Choose meeting date" />`,
      },
      {
        title: "Date Range Picker",
        code: `<DateRangePicker placeholder="Select sprint dates" />`,
      },
    ],
  },

  "data-table": {
    name: "data-table",
    title: "Data Table",
    description: "Signature high-density data table with sorting, search filtering, role and status selectors, row checkbox selection with bulk action bar, and pagination.",
    category: "data-display",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "components/ui/data-table.tsx",
        type: "component",
        content: `// Signature DataTable implementation (see components/ui/data-table.tsx)`,
      },
    ],
    props: [
      {
        name: "data",
        type: "T[]",
        defaultValue: "[]",
        description: "Array of records to display and paginate.",
      },
    ],
    examples: [
      {
        title: "User Management Table",
        code: `<DataTable />`,
      },
    ],
  },

  avatar: {
    name: "avatar",
    title: "Avatar",
    description: "An image element with fallbacks and online/offline status dot indicator.",
    category: "data-display",
    dependencies: ["@radix-ui/react-avatar", "clsx", "tailwind-merge"],
    files: [
      {
        path: "components/ui/avatar.tsx",
        type: "component",
        content: `// Avatar implementation (see components/ui/avatar.tsx)`,
      },
    ],
    props: [
      {
        name: "status",
        type: '"online" | "offline" | "busy"',
        defaultValue: "undefined",
        description: "Status indicator dot rendered at bottom right.",
      },
    ],
    examples: [
      {
        title: "Avatar with Status",
        code: `<Avatar status="online"><AvatarFallback>SC</AvatarFallback></Avatar>`,
      },
    ],
  },

  alert: {
    name: "alert",
    title: "Alert",
    description: "Callout banner for displaying critical notices, confirmations, and warnings.",
    category: "feedback",
    dependencies: ["lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "components/ui/alert.tsx",
        type: "component",
        content: `// Alert implementation (see components/ui/alert.tsx)`,
      },
    ],
    props: [
      {
        name: "variant",
        type: '"default" | "destructive" | "success" | "warning"',
        defaultValue: '"default"',
        description: "Visual severity and border style.",
      },
    ],
    examples: [
      {
        title: "Default Alert",
        code: `<Alert><AlertTitle>Cluster Active</AlertTitle><AlertDescription>Nodes in sync.</AlertDescription></Alert>`,
      },
    ],
  },

  skeleton: {
    name: "skeleton",
    title: "Skeleton",
    description: "Animated placeholder used while content is loading.",
    category: "feedback",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "components/ui/skeleton.tsx",
        type: "component",
        content: `// Skeleton implementation (see components/ui/skeleton.tsx)`,
      },
    ],
    props: [
      {
        name: "className",
        type: "string",
        defaultValue: "undefined",
        description: "Dimensions and spacing utilities.",
      },
    ],
    examples: [
      {
        title: "Profile Card Skeleton",
        code: `<div className="flex gap-4"><Skeleton className="h-12 w-12 rounded-full" /><div className="space-y-2"><Skeleton className="h-4 w-40" /><Skeleton className="h-4 w-28" /></div></div>`,
      },
    ],
  },

  select: {
    name: "select",
    title: "Select",
    description: "Accessible dropdown selector powered by Radix UI primitive.",
    category: "forms",
    dependencies: ["@radix-ui/react-select", "lucide-react", "clsx", "tailwind-merge"],
    files: [
      {
        path: "components/ui/select.tsx",
        type: "component",
        content: `// Select implementation (see components/ui/select.tsx)`,
      },
    ],
    props: [
      {
        name: "defaultValue",
        type: "string",
        defaultValue: "undefined",
        description: "Default selected value key.",
      },
    ],
    examples: [
      {
        title: "Region Selector",
        code: `<Select defaultValue="us-east"><SelectTrigger><SelectValue placeholder="Region" /></SelectTrigger><SelectContent><SelectItem value="us-east">US East</SelectItem></SelectContent></Select>`,
      },
    ],
  },

  slider: {
    name: "slider",
    title: "Slider",
    description: "Continuous or stepped range slider for adjusting numeric configurations.",
    category: "forms",
    dependencies: ["@radix-ui/react-slider", "clsx", "tailwind-merge"],
    files: [
      {
        path: "components/ui/slider.tsx",
        type: "component",
        content: `// Slider implementation (see components/ui/slider.tsx)`,
      },
    ],
    props: [
      {
        name: "defaultValue",
        type: "number[]",
        defaultValue: "[0]",
        description: "Default value array.",
      },
    ],
    examples: [
      {
        title: "Concurrency Limit",
        code: `<Slider defaultValue={[50]} max={100} step={1} />`,
      },
    ],
  },
};
