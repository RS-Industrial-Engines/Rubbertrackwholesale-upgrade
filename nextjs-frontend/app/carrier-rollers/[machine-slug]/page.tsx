import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MachineComponentDetailContent } from "@/components/undercarriage/machine-component-detail-content";
import { generateUndercarriageComponentSchema, generateBreadcrumbSchema, getSiteUrl } from "@/lib/schema";
import { parseMachineSlugClean, createMachineSlug } from "@/lib/url-utils";
import { fullMachineModels, normalizeForMatching } from "@/lib/data/full-machine-data";
import { getTrackSizesForMachine } from "@/lib/data/full-machine-data";
import {
  COMPONENT_DISPLAY_NAMES,
  COMPONENT_PLURAL_NAMES,
  COMPONENT_URL_PATHS,
  hasCarrierRoller,
  getAllMachinesForComponent,
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

// Find machine by slug - only return if it has carrier rollers
function findMachineBySlug(slug: string): { brand: string; model: string } | null {
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
            return { brand: parsed.make, model };
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
      if (createMachineSlug(brand, model) === slug) {
        // Check if this machine has carrier rollers
        if (hasCarrierRoller(brand, model)) {
          return { brand, model };
        }
        // Machine exists but doesn't have carrier rollers - return null
        return null;
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
  
  return {
    title: `${brand} ${model} ${displayName} Replacement | ${pluralName} | Rubber Track Wholesale`,
    description: `Find replacement ${pluralName.toLowerCase()} for your ${brand} ${model}. Premium quality undercarriage components with wholesale pricing. Houston warehouse with fast nationwide shipping.`,
    alternates: {
      canonical: `${SITE_URL}/${COMPONENT_URL_PATHS[COMPONENT_TYPE]}/${slug}`,
    },
    openGraph: {
      title: `${brand} ${model} ${displayName} Replacement`,
      description: `Premium quality replacement ${pluralName.toLowerCase()} for ${brand} ${model}. Wholesale pricing with fast shipping from Houston.`,
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
  
  const { brand, model } = machine;
  const displayName = COMPONENT_DISPLAY_NAMES[COMPONENT_TYPE];
  const pluralName = COMPONENT_PLURAL_NAMES[COMPONENT_TYPE];
  const urlPath = COMPONENT_URL_PATHS[COMPONENT_TYPE];
  
  // Get track sizes for this machine
  const trackSizes = getTrackSizesForMachine(brand, model);
  
  // Generate schema
  const componentSchema = generateUndercarriageComponentSchema(
    brand,
    model,
    COMPONENT_TYPE,
    displayName,
    pluralName,
    urlPath
  );
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: pluralName, url: `${SITE_URL}/${urlPath}` },
    { name: `${brand} ${model}`, url: `${SITE_URL}/${urlPath}/${slug}` },
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
        model={model}
        componentType={COMPONENT_TYPE}
        trackSizes={trackSizes}
      />
    </>
  );
}
