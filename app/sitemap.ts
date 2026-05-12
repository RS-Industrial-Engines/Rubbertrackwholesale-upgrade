import { MetadataRoute } from "next"
import { getBrands } from "@/lib/api/brands"
import { getMachines } from "@/lib/api/machines"
import { getTrackSizes } from "@/lib/api/track-sizes"
import { slugify, formatMachineSlug } from "@/lib/utils"

const BASE_URL = "https://rubbertrackwholesale.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/machines`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/track-sizes`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/brands`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
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
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]

  // Fetch dynamic data
  const [brands, machines, trackSizes] = await Promise.all([
    getBrands(),
    getMachines(),
    getTrackSizes(),
  ])

  // Brand pages
  const brandPages: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${BASE_URL}/brands/${slugify(brand.name)}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }))

  // Machine pages - highest priority for conversion
  const machinePages: MetadataRoute.Sitemap = machines.map((machine) => {
    const brand = brands.find((b) => b.id === machine.brand_id)
    const brandName = brand?.name || "Unknown"
    return {
      url: `${BASE_URL}/machines/${formatMachineSlug(brandName, machine.model_name)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }
  })

  // Track size pages
  const trackSizePages: MetadataRoute.Sitemap = trackSizes.map((size) => ({
    url: `${BASE_URL}/track-sizes/${size.size}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...brandPages, ...machinePages, ...trackSizePages]
}
