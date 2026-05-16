#!/usr/bin/env node
/**
 * ============================================================================
 * MASTER UNDERCARRIAGE IMPORT SCRIPT
 * ============================================================================
 * 
 * This script imports undercarriage parts from CSV into the master data system.
 * 
 * USAGE:
 *   node --env-file-if-exists=/vercel/share/.env.project scripts/import-master-undercarriage.js [options]
 * 
 * OPTIONS:
 *   --input     Path to input CSV file (required)
 *   --output    Path to output TypeScript file (default: lib/data/master-undercarriage-data.ts)
 *   --mode      Import mode: "merge" | "replace" (default: merge)
 *   --dry-run   Validate without writing output
 * 
 * FEATURES:
 *   - Automatic SEO generation from templates
 *   - Slug deduplication
 *   - Part number normalization
 *   - Duplicate detection and merging
 *   - Validation with warnings
 *   - Staged vs published filtering
 * 
 * EXAMPLE:
 *   node scripts/import-master-undercarriage.js --input data/new-parts.csv --mode merge
 */

const fs = require("fs");
const path = require("path");

// ============================================================================
// CONFIGURATION
// ============================================================================

const DEFAULT_OUTPUT = "lib/data/master-undercarriage-data.ts";
const VALID_CATEGORIES = ["roller", "sprocket", "idler", "carrier-roller"];
const VALID_SUBTYPES = ["bottom", "track", "drive", "front", "rear", "carrier", ""];
const VALID_STATUSES = ["published", "staged", "pending-review", "draft"];
const VALID_CONFIDENCE = [
  "verified-imported-sold",
  "verified-researched",
  "high-confidence",
  "medium-confidence",
  "low-confidence",
  "unverified",
];

// ============================================================================
// CSV PARSING
// ============================================================================

function parseCSV(content) {
  const lines = content.trim().split("\n");
  if (lines.length < 2) {
    throw new Error("CSV must have at least a header row and one data row");
  }
  
  const headers = parseCSVRow(lines[0]);
  const records = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVRow(lines[i]);
    const record = {};
    
    for (let j = 0; j < headers.length; j++) {
      record[headers[j]] = values[j] || "";
    }
    
    records.push(record);
  }
  
  return records;
}

function parseCSVRow(row) {
  const result = [];
  let current = "";
  let inQuotes = false;
  
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    
    if (char === '"') {
      if (inQuotes && row[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

// ============================================================================
// DATA TRANSFORMATION
// ============================================================================

function transformRecord(raw) {
  // Parse pipe-delimited arrays
  const parseArray = (str) => str ? str.split("|").map(s => s.trim()).filter(Boolean) : [];
  
  // Parse boolean fields
  const parseBool = (str) => str?.toUpperCase() === "YES";
  
  // Parse JSON fields
  const parseJSON = (str) => {
    if (!str) return [];
    try {
      return JSON.parse(str);
    } catch {
      return [];
    }
  };
  
  return {
    record_id: raw.record_id || "",
    import_batch: raw.import_batch || "",
    launch_priority: parseInt(raw.launch_priority, 10) || 99,
    
    brand: raw.brand || "",
    part_category: raw.part_category || "roller",
    part_subtype: raw.part_subtype || "",
    primary_part_number: raw.primary_part_number || "",
    alt_part_numbers: parseArray(raw.alt_part_numbers),
    superseded_part_numbers: parseArray(raw.superseded_part_numbers),
    oem_equivalent: raw.oem_equivalent || "",
    product_name: raw.product_name || "",
    
    compatible_models_text: raw.compatible_models_text || "",
    compatible_models: parseArray(raw.compatible_models),
    equipment_type: raw.equipment_type || "tracked-equipment",
    track_sizes: parseArray(raw.track_sizes),
    serial_ranges: parseJSON(raw.serial_ranges),
    
    chassis_mount_notes: raw.chassis_mount_notes || "",
    serial_notes: raw.serial_notes || "",
    position_notes: raw.position_notes || "",
    installation_notes: raw.installation_notes || "",
    wear_indicators: raw.wear_indicators || "",
    fitment_notes: raw.fitment_notes || "",
    
    confidence: raw.confidence || "unverified",
    imported_by_rtw: parseBool(raw.imported_by_rtw),
    sold_by_rtw: parseBool(raw.sold_by_rtw),
    owner_approved: parseBool(raw.owner_approved),
    verification_notes: raw.verification_notes || "",
    source_urls: parseArray(raw.source_urls),
    last_verified: raw.last_verified || "",
    
    publish_status: raw.publish_status || "draft",
    index_status: parseBool(raw.index_status),
    sitemap_include: parseBool(raw.sitemap_include),
    date_added: raw.date_added || new Date().toISOString().split("T")[0],
    date_modified: raw.date_modified || new Date().toISOString().split("T")[0],
    
    slug: raw.slug || "",
    seo_title: raw.seo_title || "",
    seo_h1: raw.seo_h1 || "",
    seo_h2: raw.seo_h2 || "",  // NEW: H2 subheading
    meta_description: raw.meta_description || "",
    canonical_type: raw.canonical_type || "part",
    breadcrumb_label: raw.breadcrumb_label || "",  // NEW: Custom breadcrumb
    page_intro: raw.page_intro || "",  // NEW: Custom intro paragraph
    custom_fitment_notes: raw.custom_fitment_notes || "",  // NEW: Custom fitment
    
    // NEW: Content depth fields for semantic authority
    wear_patterns: raw.wear_patterns || "",
    replacement_symptoms: raw.replacement_symptoms || "",
    operating_environments: raw.operating_environments || "",
    installation_guidance: raw.installation_guidance || "",
    maintenance_notes: raw.maintenance_notes || "",
    oem_references: raw.oem_references || "",
    terrain_applications: raw.terrain_applications || "",
    expert_tips: raw.expert_tips || "",
    
    related_sprockets: parseArray(raw.related_sprockets),
    related_rollers: parseArray(raw.related_rollers),
    related_idlers: parseArray(raw.related_idlers),
    related_carrier_rollers: parseArray(raw.related_carrier_rollers),
    related_track_sizes: parseArray(raw.related_track_sizes),
    
    price_tier: raw.price_tier || undefined,
    has_quantity_pricing: raw.has_quantity_pricing ? parseBool(raw.has_quantity_pricing) : undefined,
    supplier_sku: raw.supplier_sku || undefined,
    supplier_name: raw.supplier_name || undefined,
    lead_time_days: raw.lead_time_days ? parseInt(raw.lead_time_days, 10) : undefined,
    stock_status: raw.stock_status || undefined,
  };
}

// ============================================================================
// SEO GENERATION
// ============================================================================

const COMPONENT_DISPLAY = {
  "roller": { singular: "Bottom Roller", plural: "Bottom Rollers" },
  "sprocket": { singular: "Sprocket", plural: "Sprockets" },
  "idler": { singular: "Idler", plural: "Idlers" },
  "carrier-roller": { singular: "Carrier Roller", plural: "Carrier Rollers" },
};

function generateSEO(part) {
  const brand = part.brand || "Unknown";
  const partNumber = part.primary_part_number || "";
  const category = part.part_category || "roller";
  const display = COMPONENT_DISPLAY[category] || COMPONENT_DISPLAY["roller"];
  const componentType = display.singular;
  
  // Generate slug if empty
  let slug = part.slug;
  if (!slug) {
    slug = `${brand}-${partNumber}-${category}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }
  
  // IMPROVED: Generate multi-model SEO titles for parts with many compatible machines
  // Avoids making high-value SVL75 parts look like only SVL65 parts
  const models = part.compatible_models || [];
  const modelCount = models.length;
  
  // Get representative models for SEO (first 3-4)
  let compatibleShort;
  if (modelCount === 0) {
    compatibleShort = brand;
  } else if (modelCount === 1) {
    compatibleShort = models[0];
  } else if (modelCount <= 4) {
    // Show all models for small lists
    const lastModel = models[modelCount - 1];
    const otherModels = models.slice(0, -1).join(", ");
    compatibleShort = `${otherModels} & ${lastModel}`;
  } else {
    // For 5+ models, show first 3 + "& more"
    const shortList = models.slice(0, 3).join(", ");
    compatibleShort = `${shortList} & ${modelCount - 3} more`;
  }
  
  // Generate SEO title if empty - USES MULTI-MODEL FORMAT
  let seo_title = part.seo_title;
  if (!seo_title) {
    if (modelCount > 1) {
      seo_title = `${brand} ${partNumber} ${componentType} for ${compatibleShort}`;
    } else {
      seo_title = `${brand} ${componentType} ${partNumber} for ${brand} ${models[0] || ""}`;
    }
  }
  
  // Generate H1 if empty
  let seo_h1 = part.seo_h1;
  if (!seo_h1) {
    seo_h1 = `${brand} ${componentType} ${partNumber}`;
  }
  
  // Generate H2 if empty and multiple models
  let seo_h2 = part.seo_h2;
  if (!seo_h2 && modelCount > 1) {
    seo_h2 = `Compatible with ${compatibleShort}`;
  }
  
  // Generate meta description if empty - USES MULTI-MODEL FORMAT
  let meta_description = part.meta_description;
  if (!meta_description) {
    if (modelCount > 1) {
      meta_description = `In-stock ${brand} ${componentType} ${partNumber}. Fits ${compatibleShort}. Wholesale pricing from Houston with nationwide shipping.`;
    } else {
      meta_description = `In-stock ${brand} ${componentType} ${partNumber} for ${brand} ${models[0] || ""}. Wholesale undercarriage parts from Houston with nationwide shipping.`;
    }
  }
  
  return { slug, seo_title, seo_h1, seo_h2, meta_description };
}

// ============================================================================
// VALIDATION
// ============================================================================

function validatePart(part) {
  const errors = [];
  const warnings = [];
  
  // Required fields
  if (!part.brand) errors.push("Missing brand");
  if (!part.primary_part_number) errors.push("Missing primary_part_number");
  if (!part.part_category) errors.push("Missing part_category");
  
  // Valid values
  if (part.part_category && !VALID_CATEGORIES.includes(part.part_category)) {
    errors.push(`Invalid part_category: ${part.part_category}`);
  }
  if (part.part_subtype && !VALID_SUBTYPES.includes(part.part_subtype)) {
    errors.push(`Invalid part_subtype: ${part.part_subtype}`);
  }
  if (part.publish_status && !VALID_STATUSES.includes(part.publish_status)) {
    errors.push(`Invalid publish_status: ${part.publish_status}`);
  }
  if (part.confidence && !VALID_CONFIDENCE.includes(part.confidence)) {
    errors.push(`Invalid confidence: ${part.confidence}`);
  }
  
  // Warnings
  if (!part.compatible_models || part.compatible_models.length === 0) {
    warnings.push("No compatible_models - part won't link to machines");
  }
  if (part.publish_status === "published" && !part.owner_approved) {
    warnings.push("Published but not owner_approved");
  }
  
  return { valid: errors.length === 0, errors, warnings };
}

// ============================================================================
// DEDUPLICATION - Enhanced with machine relationship
// ============================================================================

/**
 * DEDUPE HIERARCHY:
 * 1. brand + normalized_part_number (exact match) - CERTAIN duplicate
 * 2. brand + alt_part_numbers cross-reference - CERTAIN duplicate
 * 3. brand + superseded_part_numbers cross-reference - CERTAIN duplicate
 * 4. brand + part_category + 80%+ model overlap - LIKELY duplicate
 */

function normalizePartNumber(pn) {
  return pn.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

function calculateModelOverlap(models1, models2) {
  if (!models1?.length || !models2?.length) return 0;
  const set1 = new Set(models1.map(m => m.toUpperCase()));
  const set2 = new Set(models2.map(m => m.toUpperCase()));
  const intersection = [...set1].filter(m => set2.has(m));
  return intersection.length / Math.min(set1.size, set2.size);
}

function findDuplicates(parts) {
  const seen = new Map();
  const duplicates = [];
  
  for (const part of parts) {
    // 1. Primary key: brand + normalized part number
    const key = `${part.brand}:${normalizePartNumber(part.primary_part_number)}`;
    
    if (seen.has(key)) {
      duplicates.push({
        existing: seen.get(key),
        duplicate: part,
        matchType: "exact",
        confidence: "certain",
      });
      continue; // Skip adding this duplicate to seen
    } else {
      seen.set(key, part);
    }
    
    // 2. Check alt part numbers cross-reference
    for (const alt of part.alt_part_numbers || []) {
      const altKey = `${part.brand}:${normalizePartNumber(alt)}`;
      if (seen.has(altKey) && seen.get(altKey).record_id !== part.record_id) {
        duplicates.push({
          existing: seen.get(altKey),
          duplicate: part,
          matchType: "alt_cross_ref",
          confidence: "certain",
          note: `via alt part number ${alt}`,
        });
      }
    }
    
    // 3. Check superseded part numbers
    for (const sup of part.superseded_part_numbers || []) {
      const supKey = `${part.brand}:${normalizePartNumber(sup)}`;
      if (seen.has(supKey) && seen.get(supKey).record_id !== part.record_id) {
        duplicates.push({
          existing: seen.get(supKey),
          duplicate: part,
          matchType: "superseded",
          confidence: "certain",
          note: `via superseded part number ${sup}`,
        });
      }
    }
    
    // 4. Check for same brand + category + high model overlap
    for (const [existingKey, existing] of seen.entries()) {
      if (existing.record_id === part.record_id) continue;
      if (existing.brand !== part.brand) continue;
      if (existing.part_category !== part.part_category) continue;
      
      const overlap = calculateModelOverlap(
        existing.compatible_models,
        part.compatible_models
      );
      
      if (overlap >= 0.8) {
        duplicates.push({
          existing,
          duplicate: part,
          matchType: "model_overlap",
          confidence: "likely",
          overlapPercent: Math.round(overlap * 100),
          note: `${Math.round(overlap * 100)}% model overlap`,
        });
      }
    }
  }
  
  return duplicates;
}

function ensureUniqueSlugs(parts) {
  const slugs = new Set();
  
  for (const part of parts) {
    if (slugs.has(part.slug)) {
      let counter = 2;
      let newSlug = `${part.slug}-${counter}`;
      while (slugs.has(newSlug)) {
        counter++;
        newSlug = `${part.slug}-${counter}`;
      }
      part.slug = newSlug;
    }
    slugs.add(part.slug);
  }
  
  return parts;
}

// ============================================================================
// OUTPUT GENERATION
// ============================================================================

function generateOutput(parts) {
  const publicParts = parts.filter(p => p.publish_status === "published" && p.index_status);
  const stagedParts = parts.filter(p => p.publish_status !== "published" || !p.index_status);
  
  return `/**
 * ============================================================================
 * MASTER UNDERCARRIAGE DATA
 * ============================================================================
 * 
 * AUTO-GENERATED FILE - DO NOT MANUALLY EDIT
 * 
 * Generated: ${new Date().toISOString()}
 * Total Parts: ${parts.length}
 * Published: ${publicParts.length}
 * Staged: ${stagedParts.length}
 * 
 * Import from CSV using: scripts/import-master-undercarriage.js
 */

import type { MasterUndercarriagePart } from "./undercarriage-master-schema";

/**
 * All undercarriage parts (published + staged)
 */
export const MASTER_UNDERCARRIAGE_PARTS: MasterUndercarriagePart[] = ${JSON.stringify(parts, null, 2)};

/**
 * Published parts only (for public pages)
 */
export const PUBLIC_UNDERCARRIAGE_PARTS = MASTER_UNDERCARRIAGE_PARTS.filter(
  p => p.publish_status === "published" && p.index_status
);

/**
 * Staged parts (not yet public)
 */
export const STAGED_UNDERCARRIAGE_PARTS = MASTER_UNDERCARRIAGE_PARTS.filter(
  p => p.publish_status !== "published" || !p.index_status
);

/**
 * Get part by record ID
 */
export function getPartById(recordId: string): MasterUndercarriagePart | undefined {
  return MASTER_UNDERCARRIAGE_PARTS.find(p => p.record_id === recordId);
}

/**
 * Get part by slug (public only)
 */
export function getPublicPartBySlug(slug: string): MasterUndercarriagePart | undefined {
  return PUBLIC_UNDERCARRIAGE_PARTS.find(p => p.slug === slug);
}

/**
 * Get parts by brand
 */
export function getPartsByBrand(brand: string): MasterUndercarriagePart[] {
  return PUBLIC_UNDERCARRIAGE_PARTS.filter(
    p => p.brand.toLowerCase() === brand.toLowerCase()
  );
}

/**
 * Get parts by category
 */
export function getPartsByCategory(category: string): MasterUndercarriagePart[] {
  return PUBLIC_UNDERCARRIAGE_PARTS.filter(p => p.part_category === category);
}

/**
 * Get parts for a machine model
 */
export function getPartsForMachine(brand: string, model: string): MasterUndercarriagePart[] {
  const normalizedModel = model.toUpperCase().replace(/[^A-Z0-9]/g, "");
  
  return PUBLIC_UNDERCARRIAGE_PARTS.filter(p => {
    if (p.brand.toLowerCase() !== brand.toLowerCase()) return false;
    return p.compatible_models.some(m => 
      m.toUpperCase().replace(/[^A-Z0-9]/g, "") === normalizedModel
    );
  });
}

/**
 * Get all public part slugs (for static generation)
 */
export function getAllPublicPartSlugs(): string[] {
  return PUBLIC_UNDERCARRIAGE_PARTS.map(p => p.slug);
}

/**
 * Search parts by part number (including alternates)
 */
export function searchByPartNumber(query: string): MasterUndercarriagePart[] {
  const normalized = query.toUpperCase().replace(/[^A-Z0-9]/g, "");
  
  return PUBLIC_UNDERCARRIAGE_PARTS.filter(p => {
    const primary = p.primary_part_number.toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (primary.includes(normalized)) return true;
    
    return p.alt_part_numbers.some(alt => 
      alt.toUpperCase().replace(/[^A-Z0-9]/g, "").includes(normalized)
    );
  });
}
`;
}

// ============================================================================
// MAIN
// ============================================================================

function main() {
  const args = process.argv.slice(2);
  
  // Parse arguments
  let inputPath = "";
  let outputPath = DEFAULT_OUTPUT;
  let mode = "merge";
  let dryRun = false;
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--input" && args[i + 1]) {
      inputPath = args[++i];
    } else if (args[i] === "--output" && args[i + 1]) {
      outputPath = args[++i];
    } else if (args[i] === "--mode" && args[i + 1]) {
      mode = args[++i];
    } else if (args[i] === "--dry-run") {
      dryRun = true;
    }
  }
  
  if (!inputPath) {
    console.error("Usage: node import-master-undercarriage.js --input <csv-file> [--output <ts-file>] [--mode merge|replace] [--dry-run]");
    process.exit(1);
  }
  
  console.log("============================================");
  console.log("MASTER UNDERCARRIAGE IMPORT");
  console.log("============================================");
  console.log(`Input:  ${inputPath}`);
  console.log(`Output: ${outputPath}`);
  console.log(`Mode:   ${mode}`);
  console.log(`Dry Run: ${dryRun}`);
  console.log("");
  
  // Read CSV
  console.log("Reading CSV...");
  const csvContent = fs.readFileSync(inputPath, "utf-8");
  const rawRecords = parseCSV(csvContent);
  console.log(`Found ${rawRecords.length} records`);
  
  // Transform records
  console.log("\nTransforming records...");
  let parts = rawRecords.map(transformRecord);
  
  // Generate SEO for missing fields
  console.log("Generating SEO fields...");
  parts = parts.map(part => {
    const seo = generateSEO(part);
    return {
      ...part,
      slug: part.slug || seo.slug,
      seo_title: part.seo_title || seo.seo_title,
      seo_h1: part.seo_h1 || seo.seo_h1,
      meta_description: part.meta_description || seo.meta_description,
    };
  });
  
  // Ensure unique slugs
  console.log("Ensuring unique slugs...");
  parts = ensureUniqueSlugs(parts);
  
  // Validate
  console.log("\nValidating...");
  let totalErrors = 0;
  let totalWarnings = 0;
  
  for (const part of parts) {
    const result = validatePart(part);
    if (!result.valid) {
      console.error(`\nERRORS for ${part.record_id || part.primary_part_number}:`);
      result.errors.forEach(e => console.error(`  - ${e}`));
      totalErrors += result.errors.length;
    }
    if (result.warnings.length > 0) {
      console.warn(`\nWARNINGS for ${part.record_id || part.primary_part_number}:`);
      result.warnings.forEach(w => console.warn(`  - ${w}`));
      totalWarnings += result.warnings.length;
    }
  }
  
  // Check for duplicates
  console.log("\nChecking for duplicates...");
  const duplicates = findDuplicates(parts);
  if (duplicates.length > 0) {
    console.warn(`Found ${duplicates.length} potential duplicates:`);
    duplicates.forEach(d => {
      console.warn(`  - ${d.existing.record_id} and ${d.duplicate.record_id} ${d.note || ""}`);
    });
  }
  
  // Summary
  console.log("\n============================================");
  console.log("SUMMARY");
  console.log("============================================");
  console.log(`Total Records: ${parts.length}`);
  console.log(`Published: ${parts.filter(p => p.publish_status === "published").length}`);
  console.log(`Staged: ${parts.filter(p => p.publish_status !== "published").length}`);
  console.log(`Errors: ${totalErrors}`);
  console.log(`Warnings: ${totalWarnings}`);
  console.log(`Duplicates: ${duplicates.length}`);
  
  if (totalErrors > 0) {
    console.error("\nImport FAILED - fix errors and retry");
    process.exit(1);
  }
  
  if (dryRun) {
    console.log("\nDRY RUN - no output written");
    process.exit(0);
  }
  
  // Generate and write output
  console.log(`\nWriting output to ${outputPath}...`);
  const output = generateOutput(parts);
  
  const fullOutputPath = path.resolve(process.cwd(), outputPath);
  fs.writeFileSync(fullOutputPath, output, "utf-8");
  
  console.log("\nImport SUCCESSFUL!");
  console.log(`Generated: ${fullOutputPath}`);
}

main();
