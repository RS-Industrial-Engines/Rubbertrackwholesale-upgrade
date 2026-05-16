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

// Equipment type classification based on model naming patterns
export type EquipmentType = 
  | "Compact Track Loader"
  | "Mini Excavator"
  | "Skid Steer"
  | "Directional Drill"
  | "Crawler Carrier"
  | "Tracked Dumper"
  | "Excavator"
  | "Dozer"
  | "Tracked Equipment"; // Neutral fallback

/**
 * Infer equipment type from brand and model
 * Uses OEM naming patterns - returns neutral "Tracked Equipment" if unknown
 */
export function inferEquipmentType(brand: string, model: string): EquipmentType {
  const modelUpper = model.toUpperCase();
  const brandUpper = brand.toUpperCase();
  
  // Mini Excavator patterns
  // Kubota: KX, U series; CAT: 3xx (small); Bobcat: E series; Takeuchi: TB; etc.
  if (/^KX\d/i.test(model) || /^U\d/i.test(model)) return "Mini Excavator";
  if (/^E\d{2,3}$/i.test(model)) return "Mini Excavator"; // Bobcat E32, E35, E85
  if (/^TB\d/i.test(model)) return "Mini Excavator"; // Takeuchi TB
  if (/^SK\d{2,3}SR/i.test(model)) return "Mini Excavator"; // Kobelco SK55SR, etc.
  if (/^ZX\d{2,3}U/i.test(model)) return "Mini Excavator"; // Hitachi mini
  if (/^PC\d{2,3}MR/i.test(model)) return "Mini Excavator"; // Komatsu mini
  if (/^SV\d{2}/i.test(model)) return "Mini Excavator"; // Yanmar SV series
  if (/^VIO\d/i.test(model)) return "Mini Excavator"; // Yanmar VIO
  if (/^35G|50G|60G|75G|85G/i.test(model) && brandUpper === "JOHN DEERE") return "Mini Excavator";
  if (/^301|302|303|304|305|306|307|308|309/i.test(model) && brandUpper.includes("CAT")) return "Mini Excavator";
  
  // Compact Track Loader (CTL) patterns
  // Kubota: SVL series; CAT: 2xxD; Bobcat: T series; Takeuchi: TL; etc.
  if (/^SVL\d/i.test(model)) return "Compact Track Loader";
  if (/^T\d{3}/i.test(model) && brandUpper === "BOBCAT") return "Compact Track Loader"; // Bobcat T450, T650, T770
  if (/^T\d{2}$/i.test(model) && brandUpper === "BOBCAT") return "Compact Track Loader"; // Bobcat T66, T76, T86
  if (/^TL\d/i.test(model)) return "Compact Track Loader"; // Takeuchi TL
  if (/^\d{3}D$/i.test(model) && brandUpper.includes("CAT")) return "Compact Track Loader"; // CAT 239D, 249D, 259D, 299D
  if (/^TR\d{3}/i.test(model)) return "Compact Track Loader"; // CASE TR320, TR310
  if (/^TV\d{3}/i.test(model)) return "Compact Track Loader"; // New Holland TV380
  if (/^PT\d/i.test(model)) return "Compact Track Loader"; // Terex PT
  if (/^RT\d/i.test(model) && brandUpper === "ASV") return "Compact Track Loader";
  if (/^CTL\d/i.test(model)) return "Compact Track Loader";
  if (/^333G|331G|329G|325G|323E|317G/i.test(model) && brandUpper === "JOHN DEERE") return "Compact Track Loader";
  if (/^C\d{3}/i.test(model) && brandUpper === "NEW HOLLAND") return "Compact Track Loader"; // New Holland C175, C227
  
  // Skid Steer patterns
  if (/^S\d{3}/i.test(model) && brandUpper === "BOBCAT") return "Skid Steer"; // Bobcat S570, S650
  if (/^SR\d{3}/i.test(model)) return "Skid Steer"; // CASE SR200, SR175
  if (/^L\d{3}/i.test(model) && brandUpper === "NEW HOLLAND") return "Skid Steer"; // New Holland L218
  if (/^226D|232D|236D|242D|246D|262D|272D/i.test(model)) return "Skid Steer"; // CAT skid steers
  
  // Directional Drill patterns
  if (/^JT\d/i.test(model)) return "Directional Drill"; // Ditch Witch JT series
  if (/^D\d{2,3}x\d/i.test(model)) return "Directional Drill"; // Vermeer D20x22, etc.
  
  // Large Excavator patterns (20+ ton)
  if (/^PC[2-9]\d{2}/i.test(model) && !modelUpper.includes("MR")) return "Excavator"; // Komatsu PC200+
  if (/^ZX[2-9]\d{2}/i.test(model) && !modelUpper.includes("U")) return "Excavator"; // Hitachi ZX200+
  if (/^SK[2-9]\d{2}/i.test(model) && !modelUpper.includes("SR")) return "Excavator"; // Kobelco SK200+
  if (/^EC[2-9]\d{2}/i.test(model)) return "Excavator"; // Volvo EC200+
  if (/^320|325|329|330|336|345|349|352|390/i.test(model) && brandUpper.includes("CAT")) return "Excavator";
  
  // Dozer patterns
  if (/^D[3-9]$/i.test(model) && brandUpper.includes("CAT")) return "Dozer"; // CAT D3-D9
  if (/^D[3-9][KNTLMHX]/i.test(model)) return "Dozer"; // CAT D6N, D6T, etc.
  if (/^D[3-9]\d{1,2}/i.test(model) && brandUpper === "KOMATSU") return "Dozer"; // Komatsu D31, D65, etc.
  if (/^450|550|650|700|750|850/i.test(model) && brandUpper === "JOHN DEERE") return "Dozer";
  
  // Crawler Carrier / Tracked Dumper
  if (/^MST/i.test(model)) return "Crawler Carrier"; // Morooka MST
  if (/^CD\d/i.test(model)) return "Tracked Dumper";
  
  // Default - neutral wording
  return "Tracked Equipment";
}

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
 * Get all machines for a specific component type (deduped by slug)
 * For carrier rollers, only returns machines that have them
 */
export function getAllMachinesForComponent(component: UndercarriageComponent): Array<{ brand: string; model: string; slug: string }> {
  const machines: Array<{ brand: string; model: string; slug: string }> = [];
  const seenSlugs = new Set<string>();
  
  for (const [brand, models] of Object.entries(fullMachineModels)) {
    for (const model of models) {
      const slug = createMachineSlug(brand, model);
      
      // Dedupe by slug
      if (seenSlugs.has(slug)) {
        continue;
      }
      seenSlugs.add(slug);
      
      // For carrier rollers, only include machines that have them
      if (component === "carrier-roller" && !hasCarrierRoller(brand, model)) {
        continue;
      }
      
      machines.push({
        brand,
        model,
        slug,
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
