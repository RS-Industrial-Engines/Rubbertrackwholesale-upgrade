import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { MachineComponentDetailContent } from "@/components/undercarriage/machine-component-detail-content";
import { generateUndercarriageComponentSchema, generateBreadcrumbSchema, getSiteUrl } from "@/lib/schema";
import { parseMachineSlugClean, createMachineSlug, isMessySlug, cleanMalformedSlug } from "@/lib/url-utils";
import { fullMachineModels, normalizeForMatching, cleanModelForDisplay } from "@/lib/data/full-machine-data";
import { getTrackSizesForMachine } from "@/lib/data/full-machine-data";
import {
  COMPONENT_DISPLAY_NAMES,
  COMPONENT_PLURAL_NAMES,
  COMPONENT_URL_PATHS,
  hasCarrierRoller,
  getAllMachinesForComponent,
  inferEquipmentType,
} from "@/lib/data/undercarriage-data";

const COMPONENT_TYPE = "carrier-roller" as const;
const SITE_URL = getSiteUrl();

interface PageProps {
  params: Promise<{ "machine-slug": string }>;
}

// Generate static params ONLY for machines that have carrier rollers
// This is critical - carrier roller pages should not exist for machines that don't have them
export async function generateStaticParams() {
  // Only generate pages for machines where hasCarrierRoller returns true
  const machinesWithCarrierRollers = getAllMachinesForComponent(COMPONENT_TYPE);
  
  return machinesWithCarrierRollers.map((machine) => ({
    "machine-slug": machine.slug,
  }));
}

// Find machine by slug - only return if it has carrier rollers (with fallback for malformed slugs)
function findMachineBySlug(slug: string): { brand: string; model: string; canonicalSlug: string } | null {
  // First try the clean parser
  const parsed = parseMachineSlugClean(slug);
  if (parsed) {
    // Verify the machine exists AND has carrier rollers
    const models = fullMachineModels[parsed.make];
    if (models) {
      const normalizedParsedModel = normalizeForMatching(parsed.model);
      for (const model of models) {
        if (normalizeForMatching(model) === normalizedParsedModel) {
          // Check if this machine has carrier rollers
          if (hasCarrierRoller(parsed.make, model)) {
            const canonicalSlug = createMachineSlug(parsed.make, model);
            return { brand: parsed.make, model, canonicalSlug };
          }
          // Machine exists but doesn't have carrier rollers - return null
          return null;
        }
      }
    }
  }
  
  // Fallback: search all machines for matching slug
  for (const [brand, models] of Object.entries(fullMachineModels)) {
    for (const model of models) {
      const canonicalSlug = createMachineSlug(brand, model);
      if (canonicalSlug === slug) {
        // Check if this machine has carrier rollers
        if (hasCarrierRoller(brand, model)) {
          return { brand, model, canonicalSlug };
        }
        // Machine exists but doesn't have carrier rollers - return null
        return null;
      }
    }
  }
  
  // Try cleaning the malformed slug and searching again
  if (isMessySlug(slug)) {
    const cleanedSlug = cleanMalformedSlug(slug);
    if (cleanedSlug !== slug) {
      // Try parsing the cleaned slug
      const cleanedParsed = parseMachineSlugClean(cleanedSlug);
      if (cleanedParsed) {
        const models = fullMachineModels[cleanedParsed.make];
        if (models) {
          const normalizedModel = normalizeForMatching(cleanedParsed.model);
          for (const model of models) {
            if (normalizeForMatching(model) === normalizedModel) {
              if (hasCarrierRoller(cleanedParsed.make, model)) {
                const canonicalSlug = createMachineSlug(cleanedParsed.make, model);
                return { brand: cleanedParsed.make, model, canonicalSlug };
              }
              return null;
            }
          }
        }
      }
      
      // Direct search with cleaned slug
      for (const [brand, models] of Object.entries(fullMachineModels)) {
        for (const model of models) {
          const canonicalSlug = createMachineSlug(brand, model);
          if (canonicalSlug === cleanedSlug) {
            if (hasCarrierRoller(brand, model)) {
              return { brand, model, canonicalSlug };
            }
            return null;
          }
        }
      }
    }
  }
  
  return null;
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { "machine-slug": slug } = await params;
  const machine = findMachineBySlug(slug);
  
  if (!machine) {
    return {
      title: "Carrier Roller Not Found",
    };
  }
  
  const { brand, model } = machine;
  const displayName = COMPONENT_DISPLAY_NAMES[COMPONENT_TYPE];
  const pluralName = COMPONENT_PLURAL_NAMES[COMPONENT_TYPE];
  
  // Clean model for public display
  const cleanModel = cleanModelForDisplay(model);
  
  return {
    title: `${brand} ${cleanModel} ${displayName} Replacement | ${pluralName} | Rubber Track Wholesale`,
    description: `Find replacement ${pluralName.toLowerCase()} for your ${brand} ${cleanModel}. Premium quality undercarriage components with wholesale pricing. Houston warehouse with fast nationwide shipping.`,
    alternates: {
      canonical: `${SITE_URL}/${COMPONENT_URL_PATHS[COMPONENT_TYPE]}/${slug}`,
    },
    openGraph: {
      title: `${brand} ${cleanModel} ${displayName} Replacement`,
      description: `Premium quality replacement ${pluralName.toLowerCase()} for ${brand} ${cleanModel}. Wholesale pricing with fast shipping from Houston.`,
      type: "website",
      url: `${SITE_URL}/${COMPONENT_URL_PATHS[COMPONENT_TYPE]}/${slug}`,
    },
  };
}

export default async function CarrierRollerMachinePage({ params }: PageProps) {
  const { "machine-slug": slug } = await params;
  const machine = findMachineBySlug(slug);
  
  // If machine doesn't exist OR doesn't have carrier rollers, return 404
  if (!machine) {
    notFound();
  }
  
  const { brand, model, canonicalSlug } = machine;
  
  // Redirect malformed slugs to canonical URL (301 permanent redirect)
  if (slug !== canonicalSlug) {
    redirect(`/${COMPONENT_URL_PATHS[COMPONENT_TYPE]}/${canonicalSlug}`);
  }
  
  const displayName = COMPONENT_DISPLAY_NAMES[COMPONENT_TYPE];
  const pluralName = COMPONENT_PLURAL_NAMES[COMPONENT_TYPE];
  const urlPath = COMPONENT_URL_PATHS[COMPONENT_TYPE];
  
  // Clean model for public display
  const cleanModel = cleanModelForDisplay(model);
  
  // Infer equipment type
  const equipmentType = inferEquipmentType(brand, model);
  
  // Get track sizes for this machine
  const trackSizes = getTrackSizesForMachine(brand, model);
  
  // Generate schema using clean model name
  const componentSchema = generateUndercarriageComponentSchema(
    brand,
    cleanModel,
    COMPONENT_TYPE,
    displayName,
    pluralName,
    urlPath
  );
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: pluralName, url: `${SITE_URL}/${urlPath}` },
    { name: `${brand} ${cleanModel}`, url: `${SITE_URL}/${urlPath}/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([componentSchema, breadcrumbSchema]),
        }}
      />
      <MachineComponentDetailContent
        brand={brand}
        model={cleanModel}
        componentType={COMPONENT_TYPE}
        equipmentType={equipmentType}
        trackSizes={trackSizes}
      />
    </>
  );
}
