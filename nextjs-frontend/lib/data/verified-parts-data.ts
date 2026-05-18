/**
 * ============================================================================
 * VERIFIED UNDERCARRIAGE PARTS DATA
 * ============================================================================
 * 
 * STATUS: ACTIVE - This file powers the public site
 * 
 * This is the CURRENT source of truth for verified undercarriage parts.
 * It powers:
 *   - /parts/[slug] detail pages
 *   - /parts index page
 *   - Sitemap part URLs (via getSitemapPartSlugs)
 *   - Machine/component page verified parts sections
 * 
 * RELATIONSHIP TO MASTER SCHEMA:
 * ------------------------------
 * The master undercarriage schema (undercarriage-master-schema.ts) is the
 * FUTURE architecture for scaling to thousands of parts. It provides:
 *   - Comprehensive TypeScript interfaces
 *   - CSV import/export templates
 *   - Governance rules (publish, dedupe, SEO)
 *   - Content depth fields
 * 
 * MIGRATION PATH:
 * 1. Current: verified-parts-data.ts (this file) is active
 * 2. Future: import-master-undercarriage.js generates master-undercarriage-data.ts
 * 3. Final: Routes switch to master-undercarriage-data.ts
 * 
 * DO NOT DELETE THIS FILE until master system is fully wired and tested.
 * 
 * CONTAINS ONLY parts with:
 *   - confidence = "Verified-Imported/Sold"
 *   - should_publish = "YES"
 *   - owner_approved = true
 * 
 * Source: rtw_undercarriage_parts_launch_master_v2.csv
 * Generated from import script - do not manually edit
 * ============================================================================
 */

import { UndercarriageComponent } from "./undercarriage-data";
import { normalizeForMatching, cleanModelForDisplay, fullMachineModels } from "./full-machine-data";
import { createMachineSlug } from "../url-utils";

// Part type mapping
export type PartType = "roller" | "sprocket" | "idler";
export type PartSubtype = "bottom" | "drive" | "front" | "rear" | "";

// Map part types to undercarriage component types
const PART_TYPE_TO_COMPONENT: Record<string, UndercarriageComponent | null> = {
  "roller-bottom": "bottom-roller",
  "sprocket-drive": "sprocket",
  "sprocket-": "sprocket",
  "idler-": "idler",
  "idler-front": "idler",
  "idler-rear": "idler",
};

export interface VerifiedPart {
  record_id: string;
  launch_priority: number;
  brand: string;
  part_type: PartType;
  part_subtype: PartSubtype;
  primary_part_number: string;
  alt_part_numbers: string[];
  oem_equivalent: string;
  product_name: string;
  compatible_models_text: string;
  compatible_models: string[]; // Parsed list
  track_sizes: string[];
  chassis_mount_notes: string;
  serial_notes: string;
  position_notes: string;
  source_urls: string[];
  verification_notes: string;
  seo_title: string;
  seo_h1: string;
  meta_description: string;
  slug: string;
}

/**
 * All verified parts - only Verified-Imported/Sold with should_publish=YES
 */
export const VERIFIED_PARTS: VerifiedPart[] = [
  // UP-0001: Kubota SVL75/SVL90 Bottom Roller
  {
    record_id: "UP-0001",
    launch_priority: 1,
    brand: "Kubota",
    part_type: "roller",
    part_subtype: "bottom",
    primary_part_number: "V0511-25104",
    alt_part_numbers: ["V0511-25100"],
    oem_equivalent: "V0511-25104",
    product_name: "Kubota SVL75 and SVL90 compact track loaders bottom rollers",
    compatible_models_text: "Kubota SVL65-2, Kubota SVL65-2C, Kubota SVL75, SVL90, SVL90C, SVL90-2, SVL90-2C, SVL95-2S, SVL95-2SC, SVL97-2, SVL97-2C",
    compatible_models: ["SVL65-2", "SVL65-2C", "SVL75", "SVL90", "SVL90C", "SVL90-2", "SVL90-2C", "SVL95-2S", "SVL95-2SC", "SVL97-2", "SVL97-2C"],
    track_sizes: [],
    chassis_mount_notes: "",
    serial_notes: "",
    position_notes: "",
    source_urls: [
      "https://store.rubbertrax.com/Kubota-SVL75-SVL95-SV97-Bottom-Roller-p704.htm",
      "https://www.rubbertrax.com/rollers",
    ],
    verification_notes: "User-confirmed: imported and sold with no known issue. Use as highest-confidence launch data.",
    seo_title: "Kubota Bottom Roller V0511-25104 for Kubota SVL65-2",
    seo_h1: "Kubota Bottom Roller V0511-25104 for Kubota SVL65-2",
    meta_description: "In-stock Kubota Bottom Roller V0511-25104 for Kubota SVL65-2. Wholesale undercarriage parts from Houston with nationwide shipping.",
    slug: "kubota-v0511-25104-bottom-roller",
  },
  // UP-0002: CAT 259D Bottom Roller
  {
    record_id: "UP-0002",
    launch_priority: 1,
    brand: "CAT",
    part_type: "roller",
    part_subtype: "bottom",
    primary_part_number: "304-1890",
    alt_part_numbers: ["536-3549", "389-7624"],
    oem_equivalent: "304-1890",
    product_name: "CAT 259D Bottom Roller",
    compatible_models_text: "259D, 279D, 289D, 299D, 226B, 272B, 267B, 259B3, 259D3, 279, 279C2, 279D3, 289C, 289C2, 289D3, 299D3, 299C",
    compatible_models: ["259D", "279D", "289D", "299D", "226B", "272B", "267B", "259B3", "259D3", "279", "279C2", "279D3", "289C", "289C2", "289D3", "299D3", "299C"],
    track_sizes: [],
    chassis_mount_notes: "",
    serial_notes: "",
    position_notes: "",
    source_urls: [
      "https://store.rubbertrax.com/CAT-259B3-279C-289C-299C-Bottom-Roller-p418.htm",
      "https://www.flundercarriage.com/products/caterpillar-cat-259b3-279c-289c-299c-bottom-track-roller",
    ],
    verification_notes: "User-confirmed: imported and sold with no known issue. Web spot-check: Rubbertrax and FL Undercarriage confirm 304-1890 / 536-3549 / 389-7624 bottom roller cluster for CAT 259B3/259D/279C/279D/289C/289D/299C/299D/299D3 family.",
    seo_title: "CAT Bottom Roller 304-1890 for CAT 259D",
    seo_h1: "CAT Bottom Roller 304-1890 for CAT 259D",
    meta_description: "In-stock CAT Bottom Roller 304-1890 for CAT 259D. Wholesale undercarriage parts from Houston with nationwide shipping.",
    slug: "cat-304-1890-bottom-roller",
  },
  // UP-0003: Bobcat T140 Bottom Roller
  {
    record_id: "UP-0003",
    launch_priority: 1,
    brand: "Bobcat",
    part_type: "roller",
    part_subtype: "bottom",
    primary_part_number: "6689371",
    alt_part_numbers: ["7233399", "6732901", "6686632"],
    oem_equivalent: "6689371 NEW STYLE WITH BOLTS; supersedes 6732901 (post/nut style); 7233399 for suspension mount high serials",
    product_name: "Bobcat T140 Bottom Roller",
    compatible_models_text: "Bobcat T140, T180, T190, T200, T250, T300, T320, T630, T650, T630 (S/N AJDT1101-AJDT12076 solid mount), T550 (A7UJ1101 & above, AJZV1101-AJZV13999), T590 (only for solid mount undercarriage S/N A3NR1101-A3NR15598), T650 (Only for solid mount), T750 (Only for solid mount), T770 (serial number specific & must have solid mount suspension), 864",
    compatible_models: ["T140", "T180", "T190", "T200", "T250", "T300", "T320", "T630", "T650", "T550", "T590", "T750", "T770", "864"],
    track_sizes: [],
    chassis_mount_notes: "Bolt-style mounting. Solid mount suspension required for T550, T590, T650, T750, T770.",
    serial_notes: "T630 (S/N AJDT1101-AJDT12076), T550 (A7UJ1101 & above, AJZV1101-AJZV13999), T590 (S/N A3NR1101-A3NR15598, A3NS1101-A3NS11999, ALJU1101-ALJU16824, B3781101-B37811103)",
    position_notes: "",
    source_urls: [
      "https://store.rubbertrax.com/Bobcat-CTL-Bolt-Style-Bottom-Rollers-6689371-p407.htm",
    ],
    verification_notes: "User-confirmed: imported and sold with no known issue. Use as highest-confidence launch data.",
    seo_title: "Bobcat Bottom Roller 6689371 for Bobcat T140",
    seo_h1: "Bobcat Bottom Roller 6689371 for Bobcat T140",
    meta_description: "In-stock Bobcat Bottom Roller 6689371 for Bobcat T140. Wholesale undercarriage parts from Houston with nationwide shipping.",
    slug: "bobcat-6689371-bottom-roller",
  },
  // UP-0004: Bobcat T870 Bottom Roller
  {
    record_id: "UP-0004",
    launch_priority: 1,
    brand: "Bobcat",
    part_type: "roller",
    part_subtype: "bottom",
    primary_part_number: "7323310",
    alt_part_numbers: [],
    oem_equivalent: "7323310",
    product_name: "Bobcat T870 Bottom Roller",
    compatible_models_text: "BOBCAT T870",
    compatible_models: ["T870"],
    track_sizes: [],
    chassis_mount_notes: "",
    serial_notes: "",
    position_notes: "",
    source_urls: [
      "https://store.rubbertrax.com/Bobcat-T870-SUSPENSION-MOUNT-Bottom-Roller-p3150.htm",
    ],
    verification_notes: "User-confirmed: imported and sold with no known issue. Use as highest-confidence launch data.",
    seo_title: "Bobcat Bottom Roller 7323310 for Bobcat T870",
    seo_h1: "Bobcat Bottom Roller 7323310 for Bobcat T870",
    meta_description: "In-stock Bobcat Bottom Roller 7323310 for Bobcat T870. Wholesale undercarriage parts from Houston with nationwide shipping.",
    slug: "bobcat-7323310-bottom-roller",
  },
  // UP-0005: Kubota SVL65/SVL75 Drive Sprocket
  {
    record_id: "UP-0005",
    launch_priority: 1,
    brand: "Kubota",
    part_type: "sprocket",
    part_subtype: "drive",
    primary_part_number: "V0511-21110",
    alt_part_numbers: [],
    oem_equivalent: "V0511-21110",
    product_name: "Kubota SVL65-2, SVL65-2C, SVL75, SVL75-2, SVL75C, SVL75-2C drive sprocket",
    compatible_models_text: "Kubota SVL65-2, SVL65-2C, SVL75, SVL75-2, SVL75C, SVL75-2C",
    compatible_models: ["SVL65-2", "SVL65-2C", "SVL75", "SVL75-2", "SVL75C", "SVL75-2C"],
    track_sizes: [],
    chassis_mount_notes: "",
    serial_notes: "",
    position_notes: "",
    source_urls: [
      "https://store.rubbertrax.com/Kubota-SVL-75-2-Drive-Sprocket-p692.htm",
    ],
    verification_notes: "User-confirmed: imported and sold with no known issue. Use as highest-confidence launch data.",
    seo_title: "Kubota Drive Sprocket V0511-21110 for Kubota SVL65-2",
    seo_h1: "Kubota Drive Sprocket V0511-21110 for Kubota SVL65-2",
    meta_description: "In-stock Kubota Drive Sprocket V0511-21110 for Kubota SVL65-2. Wholesale undercarriage parts from Houston with nationwide shipping.",
    slug: "kubota-v0511-21110-drive-sprocket",
  },
  // UP-0006: Kubota SVL90 Drive Sprocket
  {
    record_id: "UP-0006",
    launch_priority: 1,
    brand: "Kubota",
    part_type: "sprocket",
    part_subtype: "drive",
    primary_part_number: "V0611-21112",
    alt_part_numbers: [],
    oem_equivalent: "V0611-21112",
    product_name: "Kubota SVL90 Drive Sprocket",
    compatible_models_text: "Kubota SVL90, SVL90C, SVL90-2, SVL90-2C, SVL90C, SVL95-2S, SVL95-2SC, SVL97-2, SVL97-2C",
    compatible_models: ["SVL90", "SVL90C", "SVL90-2", "SVL90-2C", "SVL95-2S", "SVL95-2SC", "SVL97-2", "SVL97-2C"],
    track_sizes: [],
    chassis_mount_notes: "",
    serial_notes: "",
    position_notes: "",
    source_urls: [
      "https://store.rubbertrax.com/Kubota-SVL90-SVL95-SVL97-Drive-Sprockets-p698.htm",
    ],
    verification_notes: "User-confirmed: imported and sold with no known issue. Use as highest-confidence launch data.",
    seo_title: "Kubota Drive Sprocket V0611-21112 for Kubota SVL90",
    seo_h1: "Kubota Drive Sprocket V0611-21112 for Kubota SVL90",
    meta_description: "In-stock Kubota Drive Sprocket V0611-21112 for Kubota SVL90. Wholesale undercarriage parts from Houston with nationwide shipping.",
    slug: "kubota-v0611-21112-drive-sprocket",
  },
  // UP-0007: CAT 279C Drive Sprocket
  {
    record_id: "UP-0007",
    launch_priority: 1,
    brand: "CAT",
    part_type: "sprocket",
    part_subtype: "drive",
    primary_part_number: "304-1916",
    alt_part_numbers: [],
    oem_equivalent: "304-1916",
    product_name: "CAT 279C Drive Sprocket",
    compatible_models_text: "Cat 279C, 279C2, 279D, 279D3, 289C (specific to JMP serial break), 289C2, 289D, 289D3, 299C, 299D, 299DR, 299D3, 299D3 XE",
    compatible_models: ["279C", "279C2", "279D", "279D3", "289C", "289C2", "289D", "289D3", "299C", "299D", "299DR", "299D3", "299D3XE"],
    track_sizes: [],
    chassis_mount_notes: "",
    serial_notes: "289C specific to JMP serial break",
    position_notes: "",
    source_urls: [],
    verification_notes: "User-confirmed: imported and sold with no known issue. Use as highest-confidence launch data.",
    seo_title: "CAT Drive Sprocket 304-1916 for CAT 279C",
    seo_h1: "CAT Drive Sprocket 304-1916 for CAT 279C",
    meta_description: "In-stock CAT Drive Sprocket 304-1916 for CAT 279C. Wholesale undercarriage parts from Houston with nationwide shipping.",
    slug: "cat-304-1916-drive-sprocket",
  },
  // UP-0008: CAT 239D Drive Sprocket
  {
    record_id: "UP-0008",
    launch_priority: 1,
    brand: "CAT",
    part_type: "sprocket",
    part_subtype: "drive",
    primary_part_number: "304-1870",
    alt_part_numbers: [],
    oem_equivalent: "304-1870",
    product_name: "CAT 239D / DR Drive Sprocket",
    compatible_models_text: "Cat 239D / DR, 249D, 249D3, 255, 259B3, 259D, 259D3, 239 DLRC, 249 DLRC, 259D3, 259DLRC, 265",
    compatible_models: ["239D", "239DR", "249D", "249D3", "255", "259B3", "259D", "259D3", "239DLRC", "249DLRC", "259DLRC", "265"],
    track_sizes: [],
    chassis_mount_notes: "",
    serial_notes: "",
    position_notes: "",
    source_urls: [],
    verification_notes: "User-confirmed: imported and sold with no known issue. Use as highest-confidence launch data.",
    seo_title: "CAT Drive Sprocket 304-1870 for CAT 239D / DR",
    seo_h1: "CAT Drive Sprocket 304-1870 for CAT 239D / DR",
    meta_description: "In-stock CAT Drive Sprocket 304-1870 for CAT 239D / DR. Wholesale undercarriage parts from Houston with nationwide shipping.",
    slug: "cat-304-1870-drive-sprocket",
  },
  // UP-0009: CAT 259B3 Idler
  {
    record_id: "UP-0009",
    launch_priority: 1,
    brand: "CAT",
    part_type: "idler",
    part_subtype: "",
    primary_part_number: "348-9647",
    alt_part_numbers: ["536-3552"],
    oem_equivalent: "348-9647",
    product_name: "CAT Cat 259B3 Idler - Triple Flange",
    compatible_models_text: "Cat 259B3, 259D, 259D3, 279C, 279D, 289C, 289D, 299C, 299D",
    compatible_models: ["259B3", "259D", "259D3", "279C", "279D", "289C", "289D", "299C", "299D"],
    track_sizes: [],
    chassis_mount_notes: "Triple Flange design",
    serial_notes: "",
    position_notes: "",
    source_urls: [],
    verification_notes: "User-confirmed: imported and sold with no known issue. Use as highest-confidence launch data.",
    seo_title: "CAT Idler 348-9647 for CAT 259B3",
    seo_h1: "CAT Idler 348-9647 for CAT 259B3",
    meta_description: "In-stock CAT Idler 348-9647 for CAT 259B3. Wholesale undercarriage parts from Houston with nationwide shipping.",
    slug: "cat-348-9647-idler",
  },
  // UP-0010: Bobcat T450/T590/T595 Sprocket
  {
    record_id: "UP-0010",
    launch_priority: 1,
    brand: "Bobcat",
    part_type: "sprocket",
    part_subtype: "drive",
    primary_part_number: "7204050",
    alt_part_numbers: [],
    oem_equivalent: "7204050",
    product_name: "Bobcat T450 T595 T590 Sprocket",
    compatible_models_text: "Bobcat T450 T595 T590, GEHL RT165",
    compatible_models: ["T450", "T595", "T590"],
    track_sizes: [],
    chassis_mount_notes: "",
    serial_notes: "",
    position_notes: "",
    source_urls: [],
    verification_notes: "User-confirmed: imported and sold with no known issue. Use as highest-confidence launch data.",
    seo_title: "Bobcat Drive Sprocket 7204050 for Bobcat T450 T595 T590",
    seo_h1: "Bobcat Drive Sprocket 7204050 for Bobcat T450 T595 T590",
    meta_description: "In-stock Bobcat Drive Sprocket 7204050 for Bobcat T450 T595 T590. Wholesale undercarriage parts from Houston with nationwide shipping.",
    slug: "bobcat-7204050-drive-sprocket",
  },
];

/**
 * Get the undercarriage component type from a part
 */
export function getComponentTypeFromPart(part: VerifiedPart): UndercarriageComponent | null {
  const key = `${part.part_type}-${part.part_subtype}`;
  return PART_TYPE_TO_COMPONENT[key] || null;
}

/**
 * Get a verified part by its slug
 */
export function getVerifiedPartBySlug(slug: string): VerifiedPart | null {
  return VERIFIED_PARTS.find((p) => p.slug === slug) || null;
}

/**
 * Get all verified parts for a specific component type
 */
export function getVerifiedPartsForComponentType(componentType: UndercarriageComponent): VerifiedPart[] {
  return VERIFIED_PARTS.filter((part) => getComponentTypeFromPart(part) === componentType);
}

/**
 * Check if a model matches a part's compatible models list
 * Uses normalized matching to handle variations like "SVL75" vs "SVL 75"
 */
function modelMatchesPart(model: string, part: VerifiedPart): boolean {
  const normalizedModel = normalizeForMatching(cleanModelForDisplay(model));
  
  // Check against compatible_models array
  for (const compatModel of part.compatible_models) {
    if (normalizeForMatching(compatModel) === normalizedModel) {
      return true;
    }
  }
  
  // Also check compatible_models_text for partial matches
  const textNormalized = normalizeForMatching(part.compatible_models_text);
  if (textNormalized.includes(normalizedModel)) {
    return true;
  }
  
  return false;
}

/**
 * Get verified parts for a specific brand+model+component combination
 */
export function getVerifiedPartsForMachine(
  brand: string,
  model: string,
  componentType: UndercarriageComponent
): VerifiedPart[] {
  const normalizedBrand = brand.toUpperCase();
  
  return VERIFIED_PARTS.filter((part) => {
    // Check brand (handle CAT/Caterpillar, etc.)
    const partBrandUpper = part.brand.toUpperCase();
    const brandMatches = 
      partBrandUpper === normalizedBrand ||
      (partBrandUpper === "CAT" && normalizedBrand === "CATERPILLAR") ||
      (partBrandUpper === "CATERPILLAR" && normalizedBrand === "CAT");
    
    if (!brandMatches) return false;
    
    // Check component type matches
    if (getComponentTypeFromPart(part) !== componentType) return false;
    
    // Check model matches
    return modelMatchesPart(model, part);
  });
}

/**
 * Get all verified part slugs for static generation
 * GOVERNANCE: Only returns published parts for public site generation
 */
export function getAllVerifiedPartSlugs(): string[] {
  return VERIFIED_PARTS.map((p) => p.slug);
}

/**
 * Get verified part slugs for sitemap inclusion
 * GOVERNANCE: Only includes published + indexed parts per SEO rules
 * Excludes: staged, pending-review, draft, unverified parts
 */
export function getSitemapPartSlugs(): string[] {
  return VERIFIED_PARTS
    .filter((p) => {
      // All current verified parts are high confidence and should be in sitemap
      // Future: add publish_status and sitemap_include fields to filter
      return true;
    })
    .map((p) => p.slug);
}

/**
 * Validate if a machine exists in full-machine-data.ts and return link info
 * Returns null if machine doesn't exist (should render as text only)
 */
export function getValidatedMachineLink(
  brand: string,
  model: string,
  componentType: UndercarriageComponent
): { slug: string; url: string } | null {
  // Check if brand exists
  const brandModels = fullMachineModels[brand];
  if (!brandModels) {
    // Try case variations
    const brandKey = Object.keys(fullMachineModels).find(
      (b) => normalizeForMatching(b) === normalizeForMatching(brand)
    );
    if (!brandKey) return null;
    const models = fullMachineModels[brandKey];
    if (!models) return null;
    
    // Check if model exists
    const modelExists = models.some(
      (m) => normalizeForMatching(cleanModelForDisplay(m)) === normalizeForMatching(model)
    );
    if (!modelExists) return null;
    
    const slug = createMachineSlug(brandKey, model);
    const urlPath = componentType === "bottom-roller" ? "bottom-rollers" : 
                    componentType === "sprocket" ? "sprockets" :
                    componentType === "idler" ? "idlers" : "carrier-rollers";
    return { slug, url: `/${urlPath}/${slug}` };
  }
  
  // Check if model exists
  const modelExists = brandModels.some(
    (m) => normalizeForMatching(cleanModelForDisplay(m)) === normalizeForMatching(model)
  );
  if (!modelExists) return null;
  
  const slug = createMachineSlug(brand, model);
  const urlPath = componentType === "bottom-roller" ? "bottom-rollers" : 
                  componentType === "sprocket" ? "sprockets" :
                  componentType === "idler" ? "idlers" : "carrier-rollers";
  return { slug, url: `/${urlPath}/${slug}` };
}

/**
 * Get compatible machines for a part, separated into verified (with links) and unverified (text only)
 */
export function getCompatibleMachinesForPart(
  part: VerifiedPart,
  componentType: UndercarriageComponent
): {
  verified: Array<{ brand: string; model: string; slug: string; url: string }>;
  unverified: Array<{ brand: string; model: string }>;
} {
  const verified: Array<{ brand: string; model: string; slug: string; url: string }> = [];
  const unverified: Array<{ brand: string; model: string }> = [];
  
  // Parse compatible models from the part
  for (const modelName of part.compatible_models) {
    // Try to match the brand from the part
    const link = getValidatedMachineLink(part.brand, modelName, componentType);
    
    if (link) {
      verified.push({
        brand: part.brand,
        model: cleanModelForDisplay(modelName),
        slug: link.slug,
        url: link.url,
      });
    } else {
      unverified.push({
        brand: part.brand,
        model: cleanModelForDisplay(modelName),
      });
    }
  }
  
  return { verified, unverified };
}
