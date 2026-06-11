import { MetadataRoute } from "next";
import {
  fullMachineModels,
  fullTrackSizes,
  fullBrands,
  isValidMetricTrackSize,
} from "@/lib/data/full-machine-data";
import { STATIC_BLOG_POSTS } from "@/lib/data/blog-posts";
import { createMachineSlug } from "@/lib/url-utils";
import { hasCarrierRoller } from "@/lib/data/undercarriage-data";
import { getSitemapPartSlugs } from "@/lib/data/verified-parts-data";
import { hasComponentSEOValue, ComponentType } from "@/lib/sitemap-seo-helpers";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rubbertrackwholesale.com";

/**
 * SITEMAP GOVERNANCE RULES:
 * ========================
 * 1. Machine pages are PRIMARY SEO entities (priority 0.8)
 * 2. Track size pages are PRIMARY SEO entities (priority 0.8)
 * 3. Component pages (bottom-rollers, sprockets, idlers) are PRIMARY SEO entities
 *    BUT only included when hasComponentSEOValue() returns true:
 *    - Has verified parts data (imported/sold)
 *    - Has researched parts data AND feature flag is enabled
 *    - This prevents indexing thousands of thin placeholder pages
 * 4. Carrier roller pages only included when hasCarrierRoller() returns true
 * 5. Part pages are SECONDARY detail pages (priority 0.6)
 * 6. Only published + indexed pages enter sitemap
 * 7. Staged/draft/unverified pages EXCLUDED
 * 8. Duplicates and canonicalized pages EXCLUDED
 * 
 * PRIORITY HIERARCHY:
 * - 1.0: Homepage
 * - 0.9: Category hubs (/rubber-tracks, /machines, /track-size, /brands)
 * - 0.8: Component category pages (/bottom-rollers, /sprockets, /idlers)
 * - 0.8: Machine-component pages WITH DATA (/bottom-rollers/kubota-svl75)
 * - 0.8: Machine pages (/machines/kubota-svl75)
 * - 0.8: Track size pages (/track-size/400x86x52)
 * - 0.7: Brand pages (/brands/kubota)
 * - 0.6: Part detail pages (SECONDARY) (/parts/kubota-v0511-25104)
 * - 0.5: Blog posts
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
      url: `${BASE_URL}/rubber-tracks-houston`,
      lastModified: new Date(),
      changeFrequency: "monthly",
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
      url: `${BASE_URL}/carrier-rollers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
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
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/parts`,
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
  // Filter out invalid/corrupted sizes before generating sitemap entries
  const trackSizePages: MetadataRoute.Sitemap = fullTrackSizes.filter(isValidMetricTrackSize).map((size) => ({
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

  // Undercarriage component pages - machine-specific
  // GOVERNANCE: Only include pages with verified or researched part data
  // This prevents indexing thousands of thin placeholder pages
  // Bottom rollers, sprockets, idlers - ONLY when hasComponentSEOValue() returns true
  // Carrier rollers - ONLY when hasCarrierRoller() returns true (verified availability)
  // Uses Sets to prevent duplicate URLs
  const undercarriagePages: MetadataRoute.Sitemap = [];
  const seenUndercarriageSlugs = new Set<string>();
  const componentTypes: ComponentType[] = ["bottom-rollers", "sprockets", "idlers"];
  
  for (const [brand, models] of Object.entries(fullMachineModels)) {
    for (const model of models) {
      const slug = createMachineSlug(brand, model);
      
      // Add bottom-rollers, sprockets, idlers ONLY when page has SEO value (deduped)
      // PRIORITY 0.8: Machine/component pages are PRIMARY SEO entities
      // SEO VALUE: Must have verified parts OR researched parts (if flag enabled)
      for (const componentType of componentTypes) {
        const key = `${componentType}/${slug}`;
        if (!seenUndercarriageSlugs.has(key) && hasComponentSEOValue(brand, model, componentType)) {
          seenUndercarriageSlugs.add(key);
          undercarriagePages.push({
            url: `${BASE_URL}/${componentType}/${slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8, // PRIMARY SEO - same as machine pages
          });
        }
      }
      
      // Add carrier-rollers ONLY when verified availability exists (deduped)
      // Uses hasCarrierRoller() which checks verified undercarriage data
      if (hasCarrierRoller(brand, model)) {
        const carrierKey = `carrier-rollers/${slug}`;
        if (!seenUndercarriageSlugs.has(carrierKey)) {
          seenUndercarriageSlugs.add(carrierKey);
          undercarriagePages.push({
            url: `${BASE_URL}/carrier-rollers/${slug}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8, // PRIMARY SEO - same as machine pages
          });
        }
      }
    }
  }

  // Verified parts pages (SECONDARY SEO - lower priority than machine pages)
  // GOVERNANCE: Only includes published + indexed parts per getSitemapPartSlugs()
  const verifiedPartPages: MetadataRoute.Sitemap = getSitemapPartSlugs().map((slug) => ({
    url: `${BASE_URL}/parts/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6, // SECONDARY priority - machine pages are PRIMARY at 0.8
  }));

  return [
    ...staticPages,
    ...blogPages,
    ...machinePages,
    ...trackSizePages,
    ...brandPages,
    ...undercarriagePages,
    ...verifiedPartPages,
  ];
}
