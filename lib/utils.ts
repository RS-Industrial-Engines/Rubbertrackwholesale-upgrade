import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function formatTrackSize(size: string): string {
  // Format track sizes for display (e.g., "400x86x52" -> "400 x 86 x 52")
  return size.replace(/x/g, " x ");
}

export function generateMachineSlug(brand: string, model: string): string {
  return slugify(`${brand}-${model}`);
}

export function parseMachineSlug(slug: string): { brand: string; model: string } | null {
  // Attempt to parse slug back to brand and model
  const parts = slug.split("-");
  if (parts.length < 2) return null;
  
  // First part is typically the brand
  const brand = parts[0];
  const model = parts.slice(1).join("-");
  
  return { brand, model };
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toTitleCase(str: string): string {
  return str
    .split(/[\s-_]+/)
    .map((word) => capitalizeFirst(word.toLowerCase()))
    .join(" ");
}
