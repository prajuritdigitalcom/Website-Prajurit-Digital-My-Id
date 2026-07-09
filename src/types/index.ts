export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: string; // Name of Lucide icon
  href: string;
  badge?: string;
  category: "marketing" | "seo" | "media" | "writing";
  externalUrl?: string;
}

export interface MenuItem {
  label: string;
  href: string;
}
