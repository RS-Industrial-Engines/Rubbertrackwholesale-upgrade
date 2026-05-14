import { MetadataRoute } from "next";
import {
  fullMachineModels,
  fullTrackSizes,
  fullBrands,
} from "@/lib/data/full-machine-data";
import { STATIC_BLOG_POSTS } from "@/lib/data/blog-posts";
import { createMachineSlug } from "@/lib/url-utils";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rubbertrackwholesale.com";

/**
 * Generate sitemap for the entire site.
 * Uses full-machine-data.ts as the authoritative source for all machine/track/brand URLs.
 * 
 * NO old fallback imports.
 * NO URLs with parentheses.
 * NO duplicate URLs.
 * NO admin routes.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages - high priority core pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/rubber-tracks`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/bottom-rollers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sprockets`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/idlers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/final-drives`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/machines`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/track-size`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/brands`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/faqs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Blog post pages - from static blog posts
  const blogPages: MetadataRoute.Sitemap = STATIC_BLOG_POSTS.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.published_at),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Machine pages - generated from full-machine-data.ts
  // This is the authoritative source with 4,631 machines
  const machinePages: MetadataRoute.Sitemap = [];
  const seenMachineSlugs = new Set<string>();
  
  for (const [brand, models] of Object.entries(fullMachineModels)) {
    for (const model of models) {
      const slug = createMachineSlug(brand, model);
      // Prevent duplicate URLs
      if (!seenMachineSlugs.has(slug)) {
        seenMachineSlugs.add(slug);
        machinePages.push({
          url: `${BASE_URL}/machines/${slug}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        });
      }
    }
  }

  // Track size pages - generated from full-machine-data.ts
  const trackSizePages: MetadataRoute.Sitemap = fullTrackSizes.map((size) => ({
    url: `${BASE_URL}/track-size/${size.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Brand pages - generated from full-machine-data.ts
  const brandPages: MetadataRoute.Sitemap = fullBrands.map((brand) => ({
    url: `${BASE_URL}/brands/${brand.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...blogPages,
    ...machinePages,
    ...trackSizePages,
    ...brandPages,
  ];
}
