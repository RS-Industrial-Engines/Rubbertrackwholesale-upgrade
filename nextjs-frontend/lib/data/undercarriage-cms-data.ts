/**
 * Undercarriage CMS Data Layer
 * 
 * This file provides the data import path for undercarriage enrichment from CMS/admin.
 * Fields are populated when verified data is imported. Blank fields are NOT rendered publicly.
 * 
 * DATA FLOW:
 * 1. Admin/CMS exports undercarriage data (CSV, JSON, or API)
 * 2. Data is validated and imported into this file
 * 3. Frontend components check this data before rendering CMS fields
 * 4. Only populated fields are displayed publicly
 * 
 * IMPORT FORMAT:
 * Each record should include:
 * - machine_key: "Brand|Model" (matches fullMachineModels key format)
 * - component_type: "bottom-roller" | "sprocket" | "idler" | "carrier-roller"
 * - Plus any CMS fields that are verified
 */

import { createMachineSlug } from "../url-utils";

// CMS field interface - all fields optional, only render when populated
export interface UndercarriageCMSRecord {
  // Required identifiers
  machine_key: string; // "Brand|Model" format
  component_type: "bottom-roller" | "sprocket" | "idler" | "carrier-roller";
  
  // Part identification - render only when populated
  primary_part_number?: string;
  alternate_part_numbers?: string[];
  oem_part_number?: string;
  
  // Fitment information - render only when populated  
  common_fitment_notes?: string;
  chassis_type?: string;
  mount_type?: string;
  serial_break_notes?: string;
  bolt_style?: string;
  flange_type?: string;
  
  // Data quality metadata
  source_url?: string;
  confidence_level?: "verified" | "inferred" | "unverified";
  last_verified_date?: string;
  
  // Publishing controls
  publish_part_page?: boolean;
  seo_short_description?: string;
  
  // Carrier roller specific
  has_carrier_roller?: boolean;
}

/**
 * CMS Data Store
 * 
 * This is populated by importing verified undercarriage data.
 * Key format: "brand|model|component" (all lowercase)
 * 
 * Example:
 * {
 *   "kubota|svl75|bottom-roller": {
 *     machine_key: "Kubota|SVL75",
 *     component_type: "bottom-roller",
 *     primary_part_number: "RC461-21903",
 *     confidence_level: "verified",
 *     ...
 *   }
 * }
 * 
 * TO IMPORT DATA:
 * 1. Run the import script: scripts/import-undercarriage-data.ts
 * 2. Or manually add records below
 * 3. Rebuild the site to generate pages with CMS data
 */
export const UNDERCARRIAGE_CMS_DATA: Record<string, UndercarriageCMSRecord> = {
  // Example record (commented out until real data is imported):
  // "kubota|svl75|bottom-roller": {
  //   machine_key: "Kubota|SVL75",
  //   component_type: "bottom-roller",
  //   primary_part_number: "RC461-21903",
  //   alternate_part_numbers: ["RC461-21900", "RC411-21903"],
  //   common_fitment_notes: "Fits SVL75, SVL75-2, SVL75-2HF models",
  //   confidence_level: "verified",
  //   publish_part_page: true,
  // },
};

/**
 * Get CMS data for a specific machine + component
 * Returns undefined if no CMS data exists (component still renders, just without CMS fields)
 */
export function getUndercarriageCMSData(
  brand: string,
  model: string,
  component: "bottom-roller" | "sprocket" | "idler" | "carrier-roller"
): UndercarriageCMSRecord | undefined {
  const key = `${brand.toLowerCase()}|${model.toLowerCase()}|${component}`;
  return UNDERCARRIAGE_CMS_DATA[key];
}

/**
 * Check if CMS data exists for a machine + component
 */
export function hasCMSData(
  brand: string,
  model: string,
  component: "bottom-roller" | "sprocket" | "idler" | "carrier-roller"
): boolean {
  return getUndercarriageCMSData(brand, model, component) !== undefined;
}

/**
 * Get all machines with verified CMS data for a component type
 * Useful for generating "verified parts" sections
 */
export function getMachinesWithVerifiedData(
  component: "bottom-roller" | "sprocket" | "idler" | "carrier-roller"
): Array<{ brand: string; model: string; slug: string; data: UndercarriageCMSRecord }> {
  const machines: Array<{ brand: string; model: string; slug: string; data: UndercarriageCMSRecord }> = [];
  
  for (const [key, data] of Object.entries(UNDERCARRIAGE_CMS_DATA)) {
    if (data.component_type !== component) continue;
    if (data.confidence_level !== "verified") continue;
    if (data.publish_part_page === false) continue;
    
    const [brand, model] = data.machine_key.split("|");
    machines.push({
      brand,
      model,
      slug: createMachineSlug(brand, model),
      data,
    });
  }
  
  return machines;
}

/**
 * Validate a CMS record before import
 * Returns array of validation errors (empty if valid)
 */
export function validateCMSRecord(record: Partial<UndercarriageCMSRecord>): string[] {
  const errors: string[] = [];
  
  if (!record.machine_key) {
    errors.push("machine_key is required");
  } else if (!record.machine_key.includes("|")) {
    errors.push("machine_key must be in 'Brand|Model' format");
  }
  
  if (!record.component_type) {
    errors.push("component_type is required");
  } else if (!["bottom-roller", "sprocket", "idler", "carrier-roller"].includes(record.component_type)) {
    errors.push("component_type must be one of: bottom-roller, sprocket, idler, carrier-roller");
  }
  
  if (record.confidence_level && !["verified", "inferred", "unverified"].includes(record.confidence_level)) {
    errors.push("confidence_level must be one of: verified, inferred, unverified");
  }
  
  return errors;
}

/**
 * Import CMS records (for use in import scripts)
 * This is a helper for bulk imports - validates and logs results
 */
export function importCMSRecords(records: Partial<UndercarriageCMSRecord>[]): {
  imported: number;
  skipped: number;
  errors: Array<{ record: Partial<UndercarriageCMSRecord>; errors: string[] }>;
} {
  const results = {
    imported: 0,
    skipped: 0,
    errors: [] as Array<{ record: Partial<UndercarriageCMSRecord>; errors: string[] }>,
  };
  
  for (const record of records) {
    const validationErrors = validateCMSRecord(record);
    
    if (validationErrors.length > 0) {
      results.errors.push({ record, errors: validationErrors });
      results.skipped++;
      continue;
    }
    
    // In a real implementation, this would write to the data store
    // For now, log what would be imported
    console.log(`[CMS Import] Would import: ${record.machine_key} - ${record.component_type}`);
    results.imported++;
  }
  
  return results;
}
