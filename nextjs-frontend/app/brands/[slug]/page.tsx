import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  fullMachineModels,
  fullBrands,
  getTrackSizesForMachine,
} from "@/lib/data/full-machine-data";
import { createMachineSlug, createBrandSlug, BUSINESS_INFO } from "@/lib/url-utils";
import { generateBreadcrumbSchema, generateBrandPageSchema } from "@/lib/schema";
import BrandDetailContent from "@/components/brands/brand-detail-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Brand aliases for URL normalization
const BRAND_SLUG_MAP: Record<string, string> = {
  "caterpillar": "cat",
  "cat": "cat",
  "john-deere": "john-deere",
  "johndeere": "john-deere",
  "jd": "john-deere",
  "new-holland": "new-holland",
  "newholland": "new-holland",
  "ditch-witch": "ditch-witch",
  "ditchwitch": "ditch-witch",
  "wacker-neuson": "wacker-neuson",
  "wacker": "wacker-neuson",
};

// Map canonical slug to brand name
const SLUG_TO_BRAND: Record<string, string> = {
  "cat": "CAT",
  "john-deere": "John Deere",
  "new-holland": "New Holland",
  "ditch-witch": "Ditch Witch",
  "wacker-neuson": "Wacker Neuson",
};

function findBrandBySlug(slug: string): string | null {
  const normalizedSlug = slug.toLowerCase();
  
  // Check alias map first
  if (BRAND_SLUG_MAP[normalizedSlug]) {
    const canonicalSlug = BRAND_SLUG_MAP[normalizedSlug];
    if (SLUG_TO_BRAND[canonicalSlug]) {
      return SLUG_TO_BRAND[canonicalSlug];
    }
  }
  
  // Check if we have a canonical brand name mapping
  if (SLUG_TO_BRAND[normalizedSlug]) {
    return SLUG_TO_BRAND[normalizedSlug];
  }
  
  // Search in fullBrands for exact slug match
  for (const brand of fullBrands) {
    const brandSlug = createBrandSlug(brand);
    if (brandSlug === normalizedSlug) {
      return brand;
    }
  }
  
  // Search for partial match (e.g., "kubota" matches "Kubota")
  for (const brand of fullBrands) {
    if (brand.toLowerCase() === normalizedSlug.replace(/-/g, " ")) {
      return brand;
    }
  }
  
  return null;
}

function getBrandSlug(brand: string): string {
  // Check if this brand has a canonical slug
  const brandLower = brand.toLowerCase();
  for (const [slug, name] of Object.entries(SLUG_TO_BRAND)) {
    if (name.toLowerCase() === brandLower) {
      return slug;
    }
  }
  return createBrandSlug(brand);
}

export async function generateStaticParams() {
  // Generate params for all brands
  const params: { slug: string }[] = [];
  const seenSlugs = new Set<string>();
  
  for (const brand of fullBrands) {
    const slug = getBrandSlug(brand);
    if (!seenSlugs.has(slug)) {
      seenSlugs.add(slug);
      params.push({ slug });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = findBrandBySlug(slug);
  
  if (!brand) {
    return {
      title: "Brand Not Found | Rubber Track Wholesale",
    };
  }
  
  const models = fullMachineModels[brand] || [];
  const modelCount = models.length;
  
  return {
    title: `${brand} Rubber Tracks & Undercarriage Parts | ${modelCount} Models | Rubber Track Wholesale`,
    description: `Find compatible rubber tracks, bottom rollers, sprockets, idlers, and final drives for ${brand} machines. ${modelCount} models supported. Wholesale prices, fast shipping from Houston.`,
    keywords: [
      `${brand} rubber tracks`,
      `${brand} undercarriage parts`,
      `${brand} excavator tracks`,
      `${brand} CTL tracks`,
      `${brand} skid steer tracks`,
      `${brand} parts`,
      "wholesale rubber tracks",
      "Houston rubber tracks",
    ],
    alternates: {
      canonical: `${BUSINESS_INFO.url}/brands/${getBrandSlug(brand)}`,
    },
    openGraph: {
      title: `${brand} Rubber Tracks & Undercarriage Parts`,
      description: `Find compatible rubber tracks and undercarriage parts for ${brand} machines. ${modelCount} models supported.`,
      url: `${BUSINESS_INFO.url}/brands/${getBrandSlug(brand)}`,
      type: "website",
    },
  };
}

export default async function BrandDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = findBrandBySlug(slug);
  
  if (!brand) {
    notFound();
  }
  
  // Check if URL needs normalization (redirect to canonical slug)
  const canonicalSlug = getBrandSlug(brand);
  if (slug !== canonicalSlug) {
    redirect(`/brands/${canonicalSlug}`);
  }
  
  // Get all models for this brand
  const models = fullMachineModels[brand] || [];
  
  // Get track sizes for each model
  const modelsWithTrackSizes = models.map((model) => ({
    model,
    trackSizes: getTrackSizesForMachine(brand, model),
    slug: createMachineSlug(brand, model),
  }));
  
  // Generate schemas
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: BUSINESS_INFO.url },
    { name: "Brands", url: `${BUSINESS_INFO.url}/brands` },
    { name: brand, url: `${BUSINESS_INFO.url}/brands/${canonicalSlug}` },
  ]);
  
  const brandSchema = generateBrandPageSchema(
    brand,
    modelsWithTrackSizes,
    canonicalSlug
  );
  
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandSchema) }}
      />
      <BrandDetailContent
        brand={brand}
        models={modelsWithTrackSizes}
        totalCount={models.length}
      />
    </>
  );
}
