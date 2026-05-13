import { MetadataRoute } from "next";
import {
  getMachineModels,
  getTrackSizes,
  getBrands,
  getProducts,
  getBlogs,
} from "@/lib/api";
import {
  machineModels as fallbackMachineModels,
  trackSizes as fallbackTrackSizes,
  brands as fallbackBrands,
  machineCompatibility,
} from "@/lib/data/machine-models";
import { fallbackRubberTracks, fallbackBottomRollers, fallbackSprockets, fallbackIdlers, fallbackFinalDrives } from "@/lib/data/products";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rubbertrackwholesale.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
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
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
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
      priority: 0.7,
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
      changeFrequency: "daily",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // Dynamic pages - fetch data and generate URLs
  let machinePages: MetadataRoute.Sitemap = [];
  let trackSizePages: MetadataRoute.Sitemap = [];
  let brandPages: MetadataRoute.Sitemap = [];
  let productPages: MetadataRoute.Sitemap = [];
  let blogPages: MetadataRoute.Sitemap = [];
  let listingPages: MetadataRoute.Sitemap = [];

  // Machine pages - try API first, then fallback
  try {
    const machines = await getMachineModels();
    if (machines && machines.length > 0) {
      machinePages = machines.map((machine) => ({
        url: `${BASE_URL}/machines/${machine.make?.toLowerCase().replace(/\s+/g, "-")}-${machine.model?.toLowerCase().replace(/\s+/g, "-")}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    } else {
      throw new Error("Empty API response");
    }
  } catch {
    // Generate from fallback data
    for (const [brand, models] of Object.entries(fallbackMachineModels)) {
      for (const model of models) {
        machinePages.push({
          url: `${BASE_URL}/machines/${brand.toLowerCase().replace(/\s+/g, "-")}-${model.toLowerCase().replace(/\s+/g, "-")}`,
          lastModified: new Date(),
          changeFrequency: "weekly" as const,
          priority: 0.8,
        });
      }
    }
  }

  // Track size pages - try API first, then fallback
  try {
    const trackSizes = await getTrackSizes();
    if (trackSizes && trackSizes.length > 0) {
      trackSizePages = trackSizes.map((track) => ({
        url: `${BASE_URL}/track-size/${track.size.toLowerCase().replace(/\s+/g, "-")}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      }));
    } else {
      throw new Error("Empty API response");
    }
  } catch {
    // Generate from fallback data
    trackSizePages = fallbackTrackSizes.map((track) => ({
      url: `${BASE_URL}/track-size/${track.size.toLowerCase().replace(/\s+/g, "-")}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  }

  // Brand pages - try API first, then fallback
  try {
    const brands = await getBrands();
    if (brands && brands.length > 0) {
      brandPages = brands.map((brand) => ({
        url: `${BASE_URL}/brands/${brand.slug || brand.name.toLowerCase().replace(/\s+/g, "-")}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    } else {
      throw new Error("Empty API response");
    }
  } catch {
    // Generate from fallback data
    brandPages = fallbackBrands.map((brand) => ({
      url: `${BASE_URL}/brands/${brand.toLowerCase().replace(/\s+/g, "-")}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  }

  // Product pages - try API first
  try {
    const products = await getProducts();
    if (products && products.length > 0) {
      productPages = products.slice(0, 1000).map((product) => ({
        url: `${BASE_URL}/products/${product.id}`,
        lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));
    }
  } catch {
    // No product pages from API
  }

  // Listing pages (fallback products) - always include these
  const allFallbackProducts = [
    ...fallbackRubberTracks,
    ...fallbackBottomRollers,
    ...fallbackSprockets,
    ...fallbackIdlers,
    ...fallbackFinalDrives,
  ];
  listingPages = allFallbackProducts.map((product) => ({
    url: `${BASE_URL}/listing/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Blog pages - try API first
  try {
    const blogs = await getBlogs();
    if (blogs && blogs.length > 0) {
      blogPages = blogs.map((blog) => ({
        url: `${BASE_URL}/blog/${blog.slug}`,
        lastModified: blog.published_at ? new Date(blog.published_at) : new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }));
    }
  } catch {
    // No blog pages from API
  }

  return [
    ...staticPages,
    ...machinePages,
    ...trackSizePages,
    ...brandPages,
    ...productPages,
    ...listingPages,
    ...blogPages,
  ];
}
