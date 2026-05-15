/**
 * Undercarriage Component Data Layer
 * 
 * Provides machine-specific undercarriage configuration for bottom rollers,
 * sprockets, idlers, and carrier rollers. Uses full-machine-data.ts as the
 * authoritative source for machine models.
 */

import { fullMachineModels } from "./full-machine-data";
import { createMachineSlug } from "../url-utils";

// Component types
export type UndercarriageComponent = "bottom-roller" | "sprocket" | "idler" | "carrier-roller";

// Component display names
export const COMPONENT_DISPLAY_NAMES: Record<UndercarriageComponent, string> = {
  "bottom-roller": "Bottom Roller",
  "sprocket": "Sprocket",
  "idler": "Idler",
  "carrier-roller": "Carrier Roller",
};

// Component plural names for category pages
export const COMPONENT_PLURAL_NAMES: Record<UndercarriageComponent, string> = {
  "bottom-roller": "Bottom Rollers",
  "sprocket": "Sprockets",
  "idler": "Idlers",
  "carrier-roller": "Carrier Rollers",
};

// Component URL paths
export const COMPONENT_URL_PATHS: Record<UndercarriageComponent, string> = {
  "bottom-roller": "bottom-rollers",
  "sprocket": "sprockets",
  "idler": "idlers",
  "carrier-roller": "carrier-rollers",
};

// Machine undercarriage configuration
// These fields exist for future CMS enrichment - blank fields are NOT rendered publicly
export interface MachineUndercarriage {
  brand: string;
  model: string;
  has_carrier_roller: boolean;
  // CMS fields - populated when data is imported/verified
  component_type?: string;
  machine_brand?: string;
  machine_model?: string;
  primary_part_number?: string;
  alternate_part_numbers?: string[];
  common_fitment_notes?: string;
  chassis_type?: string;
  mount_type?: string;
  serial_break_notes?: string;
  bolt_style?: string;
  flange_type?: string;
  source_url?: string;
  confidence_level?: "verified" | "inferred" | "unverified";
  publish_part_page?: boolean;
  seo_short_description?: string;
}

/**
 * Machines that have carrier rollers (top rollers).
 * Most CTLs and mini excavators do NOT have carrier rollers.
 * 
 * IMPORTANT: Carrier roller pages are DISABLED by default.
 * Only add machines here when CMS/data EXPLICITLY confirms they have carrier rollers.
 * Do not guess or assume - this must be verified data.
 * 
 * For now, this list is EMPTY until verified carrier roller data is imported.
 * The /carrier-rollers index page still exists for SEO, but no machine-specific
 * pages will be generated until machines are verified.
 */
const MACHINES_WITH_CARRIER_ROLLERS: Set<string> = new Set([
  // DISABLED: No verified carrier roller data yet
  // When CMS data is ready, add verified machine slugs here:
  // "cat-320",
  // "komatsu-pc200",
  // etc.
]);

/**
 * Check if a machine has carrier rollers
 */
export function hasCarrierRoller(brand: string, model: string): boolean {
  const slug = createMachineSlug(brand, model);
  return MACHINES_WITH_CARRIER_ROLLERS.has(slug);
}

/**
 * Get undercarriage configuration for a machine
 */
export function getMachineUndercarriageConfig(brand: string, model: string): MachineUndercarriage {
  return {
    brand,
    model,
    has_carrier_roller: hasCarrierRoller(brand, model),
  };
}

/**
 * Get available undercarriage components for a machine
 */
export function getUndercarriageComponents(brand: string, model: string): UndercarriageComponent[] {
  const components: UndercarriageComponent[] = ["bottom-roller", "sprocket", "idler"];
  
  if (hasCarrierRoller(brand, model)) {
    components.push("carrier-roller");
  }
  
  return components;
}

/**
 * Get all machines for a specific component type
 * For carrier rollers, only returns machines that have them
 */
export function getAllMachinesForComponent(component: UndercarriageComponent): Array<{ brand: string; model: string; slug: string }> {
  const machines: Array<{ brand: string; model: string; slug: string }> = [];
  
  for (const [brand, models] of Object.entries(fullMachineModels)) {
    for (const model of models) {
      // For carrier rollers, only include machines that have them
      if (component === "carrier-roller" && !hasCarrierRoller(brand, model)) {
        continue;
      }
      
      machines.push({
        brand,
        model,
        slug: createMachineSlug(brand, model),
      });
    }
  }
  
  return machines;
}

/**
 * Get the URL for a machine's undercarriage component page
 */
export function getComponentUrl(brand: string, model: string, component: UndercarriageComponent): string {
  const slug = createMachineSlug(brand, model);
  const path = COMPONENT_URL_PATHS[component];
  return `/${path}/${slug}`;
}

/**
 * Get all component URLs for a machine (only available components)
 */
export function getMachineComponentUrls(brand: string, model: string): Array<{ component: UndercarriageComponent; url: string; displayName: string }> {
  const components = getUndercarriageComponents(brand, model);
  
  return components.map((component) => ({
    component,
    url: getComponentUrl(brand, model, component),
    displayName: COMPONENT_DISPLAY_NAMES[component],
  }));
}

/**
 * Get total machine count for a component
 */
export function getMachineCountForComponent(component: UndercarriageComponent): number {
  if (component === "carrier-roller") {
    return MACHINES_WITH_CARRIER_ROLLERS.size;
  }
  
  // For other components, count all machines
  let count = 0;
  for (const models of Object.values(fullMachineModels)) {
    count += models.length;
  }
  return count;
}

/**
 * Get priority brands for display on category pages
 */
export const PRIORITY_BRANDS = [
  "Kubota",
  "CAT",
  "Bobcat",
  "John Deere",
  "CASE",
  "Takeuchi",
  "New Holland",
  "Komatsu",
  "Hitachi",
  "Kobelco",
  "ASV",
  "Gehl",
  "Mustang",
  "Terex",
  "Volvo",
  "JCB",
  "Yanmar",
  "Hyundai",
];

/**
 * Get machines grouped by brand for a component
 */
export function getMachinesGroupedByBrand(component: UndercarriageComponent): Record<string, Array<{ model: string; slug: string }>> {
  const grouped: Record<string, Array<{ model: string; slug: string }>> = {};
  
  for (const [brand, models] of Object.entries(fullMachineModels)) {
    const brandMachines: Array<{ model: string; slug: string }> = [];
    
    for (const model of models) {
      // For carrier rollers, only include machines that have them
      if (component === "carrier-roller" && !hasCarrierRoller(brand, model)) {
        continue;
      }
      
      brandMachines.push({
        model,
        slug: createMachineSlug(brand, model),
      });
    }
    
    if (brandMachines.length > 0) {
      grouped[brand] = brandMachines;
    }
  }
  
  return grouped;
}

/**
 * Sorted brands list (priority brands first, then alphabetical)
 */
export function getSortedBrandsForComponent(component: UndercarriageComponent): string[] {
  const grouped = getMachinesGroupedByBrand(component);
  const brands = Object.keys(grouped);
  
  // Sort with priority brands first
  return brands.sort((a, b) => {
    const aIndex = PRIORITY_BRANDS.indexOf(a);
    const bIndex = PRIORITY_BRANDS.indexOf(b);
    
    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex;
    }
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    
    return a.localeCompare(b);
  });
}
