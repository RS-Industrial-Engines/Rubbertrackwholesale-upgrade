/**
 * Sitemap SEO Value Helpers
 * 
 * These functions determine which machine-component pages have enough
 * SEO value to be included in the sitemap.
 * 
 * GOVERNANCE RULES:
 * - Machine-component pages should only be indexed if they have real data
 * - Verified parts (imported/sold) always qualify
 * - Researched parts qualify ONLY if feature flag is enabled
 * - Carrier rollers require verified availability data
 * - Avoid indexing thousands of thin placeholder pages
 */

import { getVerifiedPartsForMachine } from "@/lib/data/verified-parts-data";
import { getStagedPartsForMachine } from "@/lib/data/staged-parts-data";
import { hasCarrierRoller } from "@/lib/data/undercarriage-data";
import { 
  SHOW_RESEARCHED_PARTS_ON_PUBLIC_COMPONENT_PAGES,
  REQUIRE_COMPONENT_DATA_FOR_SITEMAP 
} from "@/lib/config/staged-parts-flags";

export type ComponentType = "bottom-rollers" | "sprockets" | "idlers" | "carrier-rollers";

/**
 * Check if a machine-component page has enough SEO value to be included in sitemap.
 * 
 * Returns true if:
 * - Has verified parts for this machine+component
 * - Has researched/staged parts AND feature flag is enabled
 * - Is a carrier-roller page with verified availability
 * 
 * @param brand - Machine brand (e.g., "Bobcat")
 * @param model - Machine model (e.g., "T190")
 * @param componentType - Component type (e.g., "bottom-rollers")
 * @returns boolean - Whether page should be in sitemap
 */
export function hasComponentSEOValue(
  brand: string,
  model: string,
  componentType: ComponentType
): boolean {
  // If governance flag is disabled, include all pages (legacy behavior)
  if (!REQUIRE_COMPONENT_DATA_FOR_SITEMAP) {
    return true;
  }

  // Carrier rollers have their own verification (hasCarrierRoller)
  if (componentType === "carrier-rollers") {
    return hasCarrierRoller(brand, model);
  }

  // Check for verified parts (always qualify)
  const verifiedParts = getVerifiedPartsForMachine(brand, model, componentType);
  if (verifiedParts.length > 0) {
    return true;
  }

  // Check for researched/staged parts (only if feature flag enabled)
  if (SHOW_RESEARCHED_PARTS_ON_PUBLIC_COMPONENT_PAGES) {
    const stagedParts = getStagedPartsForMachine(brand, model, componentType);
    if (stagedParts.length > 0) {
      return true;
    }
  }

  // No data found - exclude from sitemap to avoid thin content
  return false;
}

/**
 * Get statistics about component pages for QA reporting
 */
export interface ComponentPageStats {
  totalMachines: number;
  totalPossibleComponentPages: number;
  includedComponentPages: number;
  excludedComponentPages: number;
  includedByType: Record<ComponentType, number>;
  excludedByType: Record<ComponentType, number>;
  includedUrls: string[];
}

/**
 * Calculate sitemap statistics for component pages
 */
export function getComponentPageStats(
  machineModels: Record<string, string[]>
): ComponentPageStats {
  const componentTypes: ComponentType[] = ["bottom-rollers", "sprockets", "idlers", "carrier-rollers"];
  
  let totalMachines = 0;
  let includedComponentPages = 0;
  let excludedComponentPages = 0;
  const includedByType: Record<ComponentType, number> = {
    "bottom-rollers": 0,
    "sprockets": 0,
    "idlers": 0,
    "carrier-rollers": 0,
  };
  const excludedByType: Record<ComponentType, number> = {
    "bottom-rollers": 0,
    "sprockets": 0,
    "idlers": 0,
    "carrier-rollers": 0,
  };
  const includedUrls: string[] = [];

  for (const [brand, models] of Object.entries(machineModels)) {
    for (const model of models) {
      totalMachines++;
      
      for (const componentType of componentTypes) {
        if (hasComponentSEOValue(brand, model, componentType)) {
          includedComponentPages++;
          includedByType[componentType]++;
          
          // Create URL slug
          const slug = `${brand.toLowerCase().replace(/\s+/g, "-")}-${model.toLowerCase().replace(/\s+/g, "-")}`;
          includedUrls.push(`/${componentType}/${slug}`);
        } else {
          excludedComponentPages++;
          excludedByType[componentType]++;
        }
      }
    }
  }

  return {
    totalMachines,
    totalPossibleComponentPages: totalMachines * componentTypes.length,
    includedComponentPages,
    excludedComponentPages,
    includedByType,
    excludedByType,
    includedUrls,
  };
}
