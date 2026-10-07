export interface ComponentProp {
  name: string;
  type: string;
  defaultValue?: string;
  description: string;
  required?: boolean;
}

export interface ComponentExample {
  title: string;
  description?: string;
  code: string;
}

export interface ComponentDoc {
  name: string;
  title: string;
  slug: string;
  description: string;
  category: "form" | "action" | "overlay" | "navigation" | "data-display" | "feedback";
  dependencies?: string[];
  registryFile: string;
  props: ComponentProp[];
  examples: ComponentExample[];
}

export interface RegistryItem {
  name: string;
  title: string;
  description: string;
  category: string;
  dependencies: string[];
  devDependencies?: string[];
  files: {
    name: string;
    content: string;
    path: string;
  }[];
}

export interface NavItem {
  title: string;
  href: string;
  badge?: string;
  isNew?: boolean;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}
