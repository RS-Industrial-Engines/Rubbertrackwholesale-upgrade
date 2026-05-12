import type { Metadata } from "next";
import type { BreadcrumbItem } from "@/types";

const SITE_NAME = "Rubber Track Wholesale";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rubbertrackwholesale.com";
const DEFAULT_DESCRIPTION =
  "Premium rubber tracks and undercarriage parts for compact track loaders, mini excavators, and skid steers. Wholesale pricing, Houston warehouse, nationwide shipping.";

export function generatePageMetadata({
  title,
  description,
  path,
  images,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  images?: { url: string; width: number; height: number; alt: string }[];
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${path}`;

  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      images: images || [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function generateMachineMetadata(
  brand: string,
  model: string,
  trackSizes: string[]
): Metadata {
  const title = `${brand} ${model} Rubber Tracks & Undercarriage Parts`;
  const description = `Shop ${brand} ${model} rubber tracks${trackSizes.length > 0 ? ` (${trackSizes.slice(0, 3).join(", ")})` : ""}, bottom rollers, sprockets, and idlers. Premium quality, wholesale pricing, Houston warehouse.`;
  const slug = `${brand.toLowerCase()}-${model.toLowerCase().replace(/\s+/g, "-")}`;

  return generatePageMetadata({
    title,
    description,
    path: `/machines/${slug}`,
  });
}

export function generateTrackSizeMetadata(
  size: string,
  machineCount: number
): Metadata {
  const title = `${size} Rubber Tracks - Compatible Machines & Wholesale Pricing`;
  const description = `${size} rubber tracks fit ${machineCount}+ machine models. Find compatible equipment, compare options, and get wholesale pricing. Ships from Houston.`;

  return generatePageMetadata({
    title,
    description,
    path: `/track-sizes/${size}`,
  });
}

export function generateCategoryMetadata(
  name: string,
  slug: string,
  seoTitle?: string | null,
  seoDescription?: string | null
): Metadata {
  const title = seoTitle || `${name} for Skid Steers & Mini Excavators`;
  const description =
    seoDescription ||
    `Shop premium ${name.toLowerCase()} for compact track loaders and mini excavators. OEM quality, wholesale prices, fast shipping from Houston.`;

  return generatePageMetadata({
    title,
    description,
    path: `/${slug}`,
  });
}

export function generateBrandMetadata(
  brandName: string,
  machineCount: number
): Metadata {
  const title = `${brandName} Rubber Tracks & Undercarriage Parts`;
  const description = `Shop rubber tracks and undercarriage parts for ${machineCount}+ ${brandName} models. Compact track loaders, mini excavators, and more. Wholesale pricing.`;

  return generatePageMetadata({
    title,
    description,
    path: `/brands/${brandName.toLowerCase()}`,
  });
}

// Breadcrumb generation helpers
export function generateBreadcrumbs(...items: BreadcrumbItem[]): BreadcrumbItem[] {
  return [{ name: "Home", href: "/" }, ...items];
}

export function generateMachineBreadcrumbs(
  brand: string,
  model: string
): BreadcrumbItem[] {
  return generateBreadcrumbs(
    { name: "Machines", href: "/machines" },
    { name: brand, href: `/brands/${brand.toLowerCase()}` },
    { name: model, href: `/machines/${brand.toLowerCase()}-${model.toLowerCase().replace(/\s+/g, "-")}` }
  );
}

export function generateTrackSizeBreadcrumbs(size: string): BreadcrumbItem[] {
  return generateBreadcrumbs(
    { name: "Track Sizes", href: "/track-sizes" },
    { name: size, href: `/track-sizes/${size}` }
  );
}

export function generateCategoryBreadcrumbs(
  name: string,
  slug: string
): BreadcrumbItem[] {
  return generateBreadcrumbs({ name, href: `/${slug}` });
}

export function generateBrandBreadcrumbs(brandName: string): BreadcrumbItem[] {
  return generateBreadcrumbs(
    { name: "Brands", href: "/brands" },
    { name: brandName, href: `/brands/${brandName.toLowerCase()}` }
  );
}

export { SITE_NAME, SITE_URL, DEFAULT_DESCRIPTION };
