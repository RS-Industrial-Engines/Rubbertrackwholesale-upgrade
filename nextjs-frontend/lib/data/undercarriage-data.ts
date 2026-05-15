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
export interface MachineUndercarriage {
  brand: string;
  model: string;
  has_carrier_roller: boolean;
  // Future CMS fields (schema exists now, populated later):
  // primary_part_number?: string;
  // alternate_part_numbers?: string[];
  // common_fitment_notes?: string;
  // chassis_type?: string;
  // mount_type?: string;
  // serial_break_notes?: string;
  // bolt_style?: string;
  // flange_type?: string;
}

/**
 * Machines that have carrier rollers (top rollers).
 * Most CTLs and mini excavators do NOT have carrier rollers.
 * Only add machines here when confirmed they have carrier rollers.
 * 
 * Common machines WITH carrier rollers:
 * - Large excavators (20+ ton)
 * - Bulldozers
 * - Some larger CTLs
 */
const MACHINES_WITH_CARRIER_ROLLERS: Set<string> = new Set([
  // Large CAT excavators
  "cat-320",
  "cat-320d",
  "cat-320e",
  "cat-325",
  "cat-329",
  "cat-330",
  "cat-336",
  "cat-349",
  // Large Komatsu excavators
  "komatsu-pc200",
  "komatsu-pc210",
  "komatsu-pc220",
  "komatsu-pc240",
  "komatsu-pc300",
  "komatsu-pc350",
  "komatsu-pc400",
  // Large Hitachi excavators
  "hitachi-zx200",
  "hitachi-zx210",
  "hitachi-zx225",
  "hitachi-zx240",
  "hitachi-zx250",
  "hitachi-zx270",
  "hitachi-zx350",
  // Large Kobelco excavators
  "kobelco-sk200",
  "kobelco-sk210",
  "kobelco-sk250",
  "kobelco-sk350",
  // Large John Deere excavators
  "john-deere-200d",
  "john-deere-210g",
  "john-deere-225d",
  "john-deere-240d",
  "john-deere-250g",
  "john-deere-350g",
  // Large Volvo excavators
  "volvo-ec200",
  "volvo-ec210",
  "volvo-ec220",
  "volvo-ec250",
  "volvo-ec300",
  "volvo-ec350",
  // Dozers
  "cat-d3",
  "cat-d4",
  "cat-d5",
  "cat-d6",
  "cat-d7",
  "cat-d8",
  "cat-d9",
  "komatsu-d31",
  "komatsu-d37",
  "komatsu-d39",
  "komatsu-d51",
  "komatsu-d61",
  "komatsu-d65",
  "komatsu-d85",
  "john-deere-450",
  "john-deere-550",
  "john-deere-650",
  "john-deere-700",
  "john-deere-750",
  "john-deere-850",
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
