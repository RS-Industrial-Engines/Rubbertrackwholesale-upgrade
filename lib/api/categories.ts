import { fetchAPI } from "./client";
import type { Category } from "@/types";

export async function getCategories(): Promise<Category[]> {
  return fetchAPI<Category[]>("/categories", {
    tags: ["categories"],
    revalidate: 86400, // Cache for 24 hours
  });
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  return categories.find((cat) => cat.slug === slug) || null;
}

// Pre-defined category info for SEO pages
export const MAIN_CATEGORIES = [
  {
    slug: "rubber-tracks",
    name: "Rubber Tracks",
    icon: "tracks",
    description: "Premium rubber tracks for compact track loaders and mini excavators",
    href: "/rubber-tracks",
  },
  {
    slug: "bottom-rollers",
    name: "Bottom Rollers",
    icon: "circle",
    description: "Heavy-duty track rollers for undercarriage systems",
    href: "/bottom-rollers",
  },
  {
    slug: "sprockets",
    name: "Sprockets",
    icon: "cog",
    description: "Precision drive sprockets for construction equipment",
    href: "/sprockets",
  },
  {
    slug: "idlers",
    name: "Idlers",
    icon: "target",
    description: "Front and rear idler wheels for track systems",
    href: "/idlers",
  },
  {
    slug: "final-drives",
    name: "Final Drives",
    icon: "settings",
    description: "Complete final drive assemblies and components",
    href: "/final-drives",
  },
] as const;

export type MainCategorySlug = (typeof MAIN_CATEGORIES)[number]["slug"];
