import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  getMachineModels,
  parseMachineSlug,
  getCompatibilityByMachine,
  getProducts,
  MachineModel,
  CompatibilitySearchResult,
} from "@/lib/api";
import { MachineDetailContent } from "@/components/machines/machine-detail-content";
import {
  generateBreadcrumbSchema,
  generateMachineSchema,
  generateFAQPageSchema,
  getSiteUrl,
} from "@/lib/schema";
import {
  fullMachineModels,
  fullMachineCompatibility,
  getModelsForBrand,
  getTrackSizesForMachine,
  normalizeForMatching,
} from "@/lib/data/full-machine-data";
import {
  createMachineSlug,
  isMessySlug,
  parseMachineSlugClean,
  BUSINESS_INFO,
} from "@/lib/url-utils";

const SITE_URL = getSiteUrl();

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Parse a machine from the slug with normalized matching
function findMachineFromSlug(slug: string): { make: string; model: string; equipmentType?: string } | null {
  // Try to parse the slug to extract make/model
  const parsed = parseMachineSlugClean(slug);
  if (!parsed) return null;
  
  // Find the actual machine in our data
  const slugNormalized = normalizeForMatching(slug);
  
  for (const [brand, models] of Object.entries(fullMachineModels)) {
    for (const model of models) {
      // Generate what the clean slug would be
      const cleanSlug = createMachineSlug(brand, model);
      const cleanNormalized = normalizeForMatching(cleanSlug);
      
      // Also check against the original messy slug (for redirect detection)
      const messyPattern = `${brand}-${model}`.toLowerCase().replace(/\s+/g, "-");
      
      if (cleanSlug === slug || 
          cleanNormalized === slugNormalized ||
          messyPattern.includes(slugNormalized) ||
          slugNormalized.includes(normalizeForMatching(`${brand}${model}`))) {
        return { 
          make: brand, 
          model,
          equipmentType: getEquipmentType(model),
        };
      }
    }
  }
  
  // Fall back to parsed data if no exact match found
  return {
    make: parsed.make,
    model: parsed.model,
    equipmentType: getEquipmentType(parsed.model),
  };
}

// Determine equipment type from model name patterns
function getEquipmentType(model: string): string {
  const modelLower = model.toLowerCase();
  
  // Compact Track Loaders (CTL)
  if (/^svl|^ctl|^pt-|^tl\d/i.test(modelLower)) return "Compact Track Loader";
  if (/^t\d{3}|^t\d{2}$/i.test(modelLower)) return "Compact Track Loader";
  if (/track.*loader|skid.*steer/i.test(modelLower)) return "Compact Track Loader";
  
  // Mini Excavators
  if (/^kx|^u-?\d|^kx\d|^zx\d{2}|^ex\d{2}|^pc\d{2}|^sk\d{2}/i.test(modelLower)) return "Mini Excavator";
  if (/mini.*excav|compact.*excav/i.test(modelLower)) return "Mini Excavator";
  
  // Standard Excavators
  if (/^zx\d{3}|^ex\d{3}|^pc\d{3}|^sk\d{3}/i.test(modelLower)) return "Excavator";
  
  // Crawler Carriers
  if (/carrier|mst|crawler/i.test(modelLower)) return "Crawler Carrier";
  
  return "Compact Equipment";
}

// Get fallback compatibility data for a machine
function getFallbackCompatibility(make: string, model: string): CompatibilitySearchResult | null {
  const trackSizes = getTrackSizesForMachine(make, model);
  
  if (trackSizes.length === 0) {
    // Try variations of the model name
    const normalizedModel = normalizeForMatching(model);
    
    for (const [key, sizes] of Object.entries(fullMachineCompatibility)) {
      const [keyBrand, keyModel] = key.split("|");
      if (normalizeForMatching(keyBrand) === normalizeForMatching(make)) {
        if (normalizeForMatching(keyModel) === normalizedModel ||
            normalizeForMatching(keyModel).includes(normalizedModel) ||
            normalizedModel.includes(normalizeForMatching(keyModel))) {
          return {
            machine: {
              id: 1,
              make: keyBrand,
              model: keyModel,
              equipment_type: getEquipmentType(keyModel),
            },
            track_sizes: sizes.map((size, i) => ({
              id: i + 1,
              size,
              width: parseInt(size.split("x")[0]) || 0,
              pitch: parseFloat(size.split("x")[1]) || 0,
              links: parseInt(size.split("x")[2]) || 0,
            })),
            products: [],
          };
        }
      }
    }
    return null;
  }

  return {
    machine: {
      id: 1,
      make: make,
      model: model,
      equipment_type: getEquipmentType(model),
    },
    track_sizes: trackSizes.map((size, i) => ({
      id: i + 1,
      size,
      width: parseInt(size.split("x")[0]) || 0,
      pitch: parseFloat(size.split("x")[1]) || 0,
      links: parseInt(size.split("x")[2]) || 0,
    })),
    products: [],
  };
}

// Generate static params for all machines using clean URLs
export async function generateStaticParams() {
  const params: { slug: string }[] = [];
  const seenSlugs = new Set<string>();
  
  for (const [brand, models] of Object.entries(fullMachineModels)) {
    for (const model of models) {
      const slug = createMachineSlug(brand, model);
      if (!seenSlugs.has(slug)) {
        seenSlugs.add(slug);
        params.push({ slug });
      }
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Find the machine from slug
  const machineInfo = findMachineFromSlug(slug);
  if (!machineInfo) {
    return {
      title: "Machine Not Found | Rubber Track Wholesale",
    };
  }
  
  const { make, model, equipmentType } = machineInfo;
  const cleanSlug = createMachineSlug(make, model);
  const trackSizes = getTrackSizesForMachine(make, model);
  const primaryTrackSize = trackSizes[0] || "";
  
  const title = `${make} ${model} Rubber Tracks & Undercarriage Parts | Houston TX`;
  const description = `Buy ${make} ${model} ${equipmentType || "equipment"} rubber tracks${primaryTrackSize ? ` (${primaryTrackSize})` : ""}, sprockets, rollers & idlers. Wholesale prices. Houston warehouse. Nationwide shipping. Call ${BUSINESS_INFO.phone}.`;

  return {
    title,
    description,
    keywords: [
      `${make} ${model} rubber tracks`,
      `${make} ${model} tracks`,
      `${make} ${model} undercarriage`,
      primaryTrackSize ? `${primaryTrackSize} rubber tracks` : "",
      `${make} rubber tracks`,
      `${equipmentType} rubber tracks`,
      "rubber track wholesale",
      "Houston TX",
    ].filter(Boolean),
    alternates: {
      canonical: `${SITE_URL}/machines/${cleanSlug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/machines/${cleanSlug}`,
      type: "website",
    },
  };
}

export default async function MachineDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Check if this is a messy URL that needs redirect
  if (isMessySlug(slug)) {
    const machineInfo = findMachineFromSlug(slug);
    if (machineInfo) {
      const cleanSlug = createMachineSlug(machineInfo.make, machineInfo.model);
      if (cleanSlug !== slug) {
        redirect(`/machines/${cleanSlug}`);
      }
    }
  }
  
  // Find the machine from slug
  const machineInfo = findMachineFromSlug(slug);
  if (!machineInfo) {
    notFound();
  }
  
  const { make, model, equipmentType } = machineInfo;
  const cleanSlug = createMachineSlug(make, model);
  
  // Also redirect if the current slug doesn't match the clean slug
  if (cleanSlug !== slug) {
    redirect(`/machines/${cleanSlug}`);
  }

  // Try API first, then fallback
  let compatibility: CompatibilitySearchResult | null = null;
  try {
    const apiResult = await getCompatibilityByMachine(make, model);
    if (apiResult && apiResult.track_sizes?.length > 0) {
      compatibility = apiResult;
    }
  } catch {
    // API failed, will use fallback
  }

  if (!compatibility) {
    compatibility = getFallbackCompatibility(make, model);
  }

  if (!compatibility) {
    notFound();
  }

  // Get related machines from same brand
  const relatedModels = getModelsForBrand(make)
    .filter((m) => m !== model)
    .slice(0, 8);

  const relatedMachines = relatedModels.map((relModel) => ({
    make,
    model: relModel,
    slug: createMachineSlug(make, relModel),
    trackSizes: getTrackSizesForMachine(make, relModel),
    equipmentType: getEquipmentType(relModel),
  }));

  // Generate FAQs
  const trackSizes = compatibility.track_sizes?.map((t) => t.size) || [];
  const primaryTrackSize = trackSizes[0] || "";
  
  const faqs = [
    {
      question: `What size rubber tracks fit ${make} ${model}?`,
      answer: trackSizes.length > 0
        ? `The ${make} ${model} uses ${trackSizes.join(", ")} rubber tracks. The most common size is ${primaryTrackSize}. We stock all sizes at our Houston warehouse with nationwide shipping.`
        : `Contact us for ${make} ${model} rubber track sizing. Call ${BUSINESS_INFO.phone} for expert assistance.`,
    },
    {
      question: `Do you stock ${make} ${model} rubber tracks in Houston?`,
      answer: `Yes, we stock ${make} ${model} rubber tracks at our Houston warehouse (${BUSINESS_INFO.address}). Same-day pickup available for in-stock items, or we ship nationwide.`,
    },
    {
      question: `Can you ship ${make} ${model} tracks nationwide?`,
      answer: `Absolutely! We ship ${make} ${model} rubber tracks and undercarriage parts to all 50 states. Most orders ship within 1-2 business days from our Houston facility.`,
    },
    {
      question: `How do I confirm the right track size for my ${make} ${model}?`,
      answer: `Measure your existing track: Width (mm) x Pitch (mm) x Number of Links. For ${make} ${model}, the typical size is ${primaryTrackSize || "varies by model year"}. Call ${BUSINESS_INFO.phone} if you need help confirming.`,
    },
    {
      question: `Do you also sell sprockets, rollers, and idlers for ${make} ${model}?`,
      answer: `Yes! We carry complete undercarriage parts for ${make} ${model}: rubber tracks, bottom rollers, top rollers, drive sprockets, front idlers, and final drives. Call ${BUSINESS_INFO.phone} for a complete parts quote.`,
    },
    {
      question: `What is the warranty on ${make} ${model} rubber tracks?`,
      answer: `All our rubber tracks come with a manufacturer warranty against defects. Warranty terms vary by product. Contact us at ${BUSINESS_INFO.phone} for specific warranty information.`,
    },
  ];

  // Schema data
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Machines", url: `${SITE_URL}/machines` },
    { name: `${make} ${model}`, url: `${SITE_URL}/machines/${cleanSlug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateMachineSchema(make, model, equipmentType || "Compact Equipment", trackSizes)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQPageSchema(faqs)),
        }}
      />
      <MachineDetailContent
        make={make}
        model={model}
        equipmentType={equipmentType || "Compact Equipment"}
        compatibility={compatibility}
        relatedMachines={relatedMachines}
        faqs={faqs}
        businessInfo={BUSINESS_INFO}
      />
    </>
  );
}
