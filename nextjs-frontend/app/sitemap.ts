import { MetadataRoute } from "next";
import {
  getMachineModels,
  getTrackSizes,
  getBrands,
  getProducts,
  getBlogs,
} from "@/lib/api";

const BASE_URL = "https://rubbertrackwholesale.com";

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
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
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
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faqs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.7,
    },
  ];

  // Dynamic pages - fetch data and generate URLs
  let machinePages: MetadataRoute.Sitemap = [];
  let trackSizePages: MetadataRoute.Sitemap = [];
  let brandPages: MetadataRoute.Sitemap = [];
  let productPages: MetadataRoute.Sitemap = [];
  let blogPages: MetadataRoute.Sitemap = [];

  try {
    // Machine pages
    const machines = await getMachineModels();
    machinePages = machines.map((machine) => ({
      url: `${BASE_URL}/machines/${machine.make?.toLowerCase().replace(/\s+/g, "-")}-${machine.model?.toLowerCase().replace(/\s+/g, "-")}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to fetch machines for sitemap:", error);
  }

  try {
    // Track size pages
    const trackSizes = await getTrackSizes();
    trackSizePages = trackSizes.map((track) => ({
      url: `${BASE_URL}/track-size/${track.size.toLowerCase().replace(/\s+/g, "-")}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Failed to fetch track sizes for sitemap:", error);
  }

  try {
    // Brand pages
    const brands = await getBrands();
    brandPages = brands.map((brand) => ({
      url: `${BASE_URL}/brands/${brand.slug || brand.name.toLowerCase().replace(/\s+/g, "-")}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Failed to fetch brands for sitemap:", error);
  }

  try {
    // Product pages (limit to first 1000 for sitemap size)
    const products = await getProducts();
    productPages = products.slice(0, 1000).map((product) => ({
      url: `${BASE_URL}/products/${product.id}`,
      lastModified: product.updated_at ? new Date(product.updated_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Failed to fetch products for sitemap:", error);
  }

  try {
    // Blog pages
    const blogs = await getBlogs();
    blogPages = blogs.map((blog) => ({
      url: `${BASE_URL}/blog/${blog.slug}`,
      lastModified: blog.published_at ? new Date(blog.published_at) : new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Failed to fetch blogs for sitemap:", error);
  }

  return [
    ...staticPages,
    ...machinePages,
    ...trackSizePages,
    ...brandPages,
    ...productPages,
    ...blogPages,
  ];
}
