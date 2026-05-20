import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import {
  getMachineModels,
  parseMachineSlug,
  getCompatibilityByMachine,
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
  cleanModelForDisplay,
  splitCompatibilityKey,
} from "@/lib/data/full-machine-data";
import {
  createMachineSlug,
  isMessySlug,
  cleanMalformedSlug,
  parseMachineSlugClean,
  BUSINESS_INFO,
} from "@/lib/url-utils";

const SITE_URL = getSiteUrl();

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Parse a machine from the slug with EXACT matching
// CRITICAL: john-deere-325g MUST match only "John Deere 325G", NOT "John Deere 325"
// IMPORTANT: Returns CLEAN model name (without guiding descriptors) for display
function findMachineFromSlug(slug: string): { make: string; model: string; equipmentType?: string; canonicalSlug?: string } | null {
  const slugNormalized = normalizeForMatching(slug);
  
  // First pass: find EXACT match by checking clean slugs
  for (const [brand, models] of Object.entries(fullMachineModels)) {
    for (const model of models) {
      const cleanSlug = createMachineSlug(brand, model);
      
      // Exact slug match
      if (cleanSlug === slug) {
        // Return CLEAN model name for display (strips guiding descriptors)
        const cleanModel = cleanModelForDisplay(model);
        return { 
          make: brand, 
          model: cleanModel,
          equipmentType: getEquipmentType(cleanModel),
          canonicalSlug: cleanSlug,
        };
      }
      
      // Normalized exact match (handles case differences)
      const cleanNormalized = normalizeForMatching(cleanSlug);
      if (cleanNormalized === slugNormalized) {
        const cleanModel = cleanModelForDisplay(model);
        return { 
          make: brand, 
          model: cleanModel,
          equipmentType: getEquipmentType(cleanModel),
          canonicalSlug: cleanSlug,
        };
      }
    }
  }
  
  // Second pass: try parsing the slug directly
  const parsed = parseMachineSlugClean(slug);
  if (parsed) {
    // Verify the parsed result exists in our data with EXACT match
    const parsedMakeNorm = normalizeForMatching(parsed.make);
    const parsedModelNorm = normalizeForMatching(parsed.model);
    
    for (const [brand, models] of Object.entries(fullMachineModels)) {
      if (normalizeForMatching(brand) === parsedMakeNorm) {
        for (const model of models) {
          if (normalizeForMatching(model) === parsedModelNorm) {
            const cleanModel = cleanModelForDisplay(model);
            return {
              make: brand,
              model: cleanModel,
              equipmentType: getEquipmentType(cleanModel),
              canonicalSlug: createMachineSlug(brand, cleanModel),
            };
          }
        }
      }
    }
    
    // Return parsed data even if not in our database (might be a valid machine we don't have)
    return {
      make: parsed.make,
      model: parsed.model,
      equipmentType: getEquipmentType(parsed.model),
      canonicalSlug: createMachineSlug(parsed.make, parsed.model),
    };
  }
  
  // Third pass: try cleaning malformed slugs and searching again
  if (isMessySlug(slug)) {
    const cleanedSlug = cleanMalformedSlug(slug);
    if (cleanedSlug !== slug) {
      // Recursive call with cleaned slug
      const cleanedResult = findMachineFromSlug(cleanedSlug);
      if (cleanedResult) {
        return cleanedResult;
      }
    }
  }
  
  return null;
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
// CRITICAL: Must use EXACT matching - "325" must NOT return "325G" data
// IMPORTANT: Machine pages should render even if no track sizes - they may have undercarriage data
function getFallbackCompatibility(make: string, model: string): CompatibilitySearchResult | null {
  const trackSizes = getTrackSizesForMachine(make, model);
  
  // If we have track sizes, return immediately with that data
  if (trackSizes.length > 0) {
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
  
  // No track sizes - but machine may still exist in models list (e.g., undercarriage-only machines)
  // Check if machine exists in fullMachineModels
  const normalizedMake = normalizeForMatching(make);
  const normalizedModel = normalizeForMatching(model);
  
  // First check fullMachineModels - if machine exists there, it's valid even without track sizes
  for (const [brand, models] of Object.entries(fullMachineModels)) {
    if (normalizeForMatching(brand) === normalizedMake) {
      for (const m of models) {
        if (normalizeForMatching(cleanModelForDisplay(m)) === normalizedModel) {
          // Machine exists in models - return empty track_sizes (undercarriage-only machine)
          return {
            machine: {
              id: 1,
              make: brand,
              model: cleanModelForDisplay(m),
              equipment_type: getEquipmentType(m),
            },
            track_sizes: [], // No rubber track sizes, but machine is valid
            products: [],
          };
        }
      }
    }
  }
  
  // Also check fullMachineCompatibility for exact match
  for (const [key, sizes] of Object.entries(fullMachineCompatibility)) {
    const [keyBrand, keyModel] = splitCompatibilityKey(key);
    const keyBrandNorm = normalizeForMatching(keyBrand);
    const keyModelNorm = normalizeForMatching(cleanModelForDisplay(keyModel));
    
    // EXACT match only - brand must match AND cleaned model must match exactly
    if (keyBrandNorm === normalizedMake && keyModelNorm === normalizedModel) {
      const cleanModel = cleanModelForDisplay(keyModel);
      return {
        machine: {
          id: 1,
          make: keyBrand,
          model: cleanModel,
          equipment_type: getEquipmentType(cleanModel),
        },
        track_sizes: getTrackSizesForMachine(keyBrand, cleanModel).map((size, i) => ({
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
  
  return null;
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

  // ALWAYS use full-machine-data.ts as PRIMARY source
  // This ensures exact machine matching and prevents fuzzy API data issues
  let compatibility: CompatibilitySearchResult | null = getFallbackCompatibility(make, model);
  
  // API is supplemental only - only use if local data is missing
  if (!compatibility || (compatibility.track_sizes?.length === 0)) {
    try {
      const apiResult = await getCompatibilityByMachine(make, model);
      if (apiResult && apiResult.track_sizes?.length > 0) {
        // Only use API if we have NO local data
        if (!compatibility) {
          compatibility = apiResult;
        }
      }
    } catch {
      // API failed, continue with local data
    }
  }

  if (!compatibility) {
    notFound();
  }

  // Get related machines from same brand (deduplicated by clean model name)
  const seenRelatedModels = new Set<string>();
  const relatedMachines = getModelsForBrand(make)
    .map((rawModel) => {
      const cleanModel = cleanModelForDisplay(rawModel);
      const slug = createMachineSlug(make, rawModel);
      return { rawModel, cleanModel, slug };
    })
    .filter(({ cleanModel, slug }) => {
      // Skip current machine and duplicates
      if (cleanModel === model || seenRelatedModels.has(cleanModel)) return false;
      seenRelatedModels.add(cleanModel);
      return true;
    })
    .slice(0, 8)
    .map(({ cleanModel, slug }) => ({
      make,
      model: cleanModel,
      slug,
      trackSizes: getTrackSizesForMachine(make, cleanModel),
      equipmentType: getEquipmentType(cleanModel),
    }));

  // Generate FAQs - SAFETY DEDUPE track sizes by size string
  const rawTrackSizes = compatibility.track_sizes?.map((t) => t.size) || [];
  const trackSizes = [...new Set(rawTrackSizes)]; // Dedupe by exact size string
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
