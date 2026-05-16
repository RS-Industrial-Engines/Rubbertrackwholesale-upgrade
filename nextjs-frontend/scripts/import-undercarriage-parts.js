#!/usr/bin/env node
/**
 * Undercarriage Parts Import Script
 * 
 * Reads rtw_undercarriage_parts_launch_master_v2.csv and generates
 * the verified-parts-data.ts file for the frontend.
 * 
 * Usage:
 *   node scripts/import-undercarriage-parts.js
 * 
 * Input:
 *   data/rtw_undercarriage_parts_launch_master_v2.csv
 * 
 * Output:
 *   lib/data/verified-parts-data.ts (auto-generated)
 * 
 * Rules:
 *   - Only imports rows where:
 *     - confidence = "Verified-Imported/Sold"
 *     - should_publish = "YES"
 *   - High/Medium confidence rows are logged but not published
 *   - Unmatched machine warnings are output
 */

const fs = require('fs');
const path = require('path');

// CSV file location
const CSV_PATH = path.join(__dirname, '..', 'data', 'rtw_undercarriage_parts_launch_master_v2.csv');
const OUTPUT_PATH = path.join(__dirname, '..', 'lib', 'data', 'verified-parts-data.ts');

// Parse CSV row (handles quoted fields with commas)
function parseCSVRow(row) {
  const result = [];
  let inQuotes = false;
  let field = '';
  
  for (let i = 0; i < row.length; i++) {
    const char = row[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(field.trim());
      field = '';
    } else {
      field += char;
    }
  }
  result.push(field.trim());
  
  return result;
}

// Parse compatible models text into array
function parseCompatibleModels(text) {
  if (!text) return [];
  
  // Split by comma, clean up each model
  return text
    .split(',')
    .map(m => m.trim())
    .map(m => {
      // Remove brand prefix if present
      return m.replace(/^(Kubota|Bobcat|CAT|Caterpillar|Takeuchi|John Deere|JCB|Gehl|Mustang|ASV|Terex|Volvo|Hitachi|Komatsu|Kobelco)\s*/i, '');
    })
    .filter(m => m.length > 0)
    // Normalize model names (remove spaces, standardize)
    .map(m => m.replace(/\s+/g, '').toUpperCase())
    // Remove duplicates
    .filter((m, i, arr) => arr.indexOf(m) === i);
}

// Parse alt part numbers
function parseAltPartNumbers(text) {
  if (!text) return [];
  return text.split('|').map(p => p.trim()).filter(p => p.length > 0);
}

// Parse source URLs
function parseSourceUrls(text) {
  if (!text) return [];
  return text.split('|').map(u => u.trim()).filter(u => u.startsWith('http'));
}

// Main import function
async function importParts() {
  console.log('Starting undercarriage parts import...\n');
  
  // Check if CSV exists
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`ERROR: CSV file not found at ${CSV_PATH}`);
    process.exit(1);
  }
  
  // Read CSV
  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
  const lines = csvContent.split('\n').filter(l => l.trim().length > 0);
  
  // Parse header
  const headers = parseCSVRow(lines[0]);
  console.log(`Found ${headers.length} columns, ${lines.length - 1} data rows\n`);
  
  // Map headers to indices
  const headerMap = {};
  headers.forEach((h, i) => {
    headerMap[h] = i;
  });
  
  // Process rows
  const verifiedParts = [];
  const highConfidenceParts = [];
  const mediumConfidenceParts = [];
  const skippedParts = [];
  
  for (let i = 1; i < lines.length; i++) {
    const row = parseCSVRow(lines[i]);
    
    const confidence = row[headerMap['confidence']] || '';
    const shouldPublish = row[headerMap['should_publish']] || '';
    
    const part = {
      record_id: row[headerMap['record_id']] || '',
      launch_priority: parseInt(row[headerMap['launch_priority']] || '0'),
      brand: row[headerMap['brand']] || '',
      part_type: row[headerMap['part_type']] || '',
      part_subtype: row[headerMap['part_subtype']] || '',
      primary_part_number: row[headerMap['primary_part_number']] || '',
      alt_part_numbers: parseAltPartNumbers(row[headerMap['alt_part_numbers']] || ''),
      oem_equivalent: row[headerMap['oem_equivalent']] || '',
      product_name: row[headerMap['product_name']] || '',
      compatible_models_text: row[headerMap['compatible_models_text']] || '',
      compatible_models: parseCompatibleModels(row[headerMap['compatible_models_text']] || ''),
      track_sizes: (row[headerMap['track_sizes']] || '').split(',').map(s => s.trim()).filter(s => s),
      chassis_mount_notes: row[headerMap['chassis_mount_notes']] || '',
      serial_notes: row[headerMap['serial_notes']] || '',
      position_notes: row[headerMap['position_notes']] || '',
      source_urls: parseSourceUrls(row[headerMap['source_urls']] || ''),
      verification_notes: row[headerMap['verification_notes']] || '',
      seo_title: row[headerMap['seo_title']] || '',
      seo_h1: row[headerMap['seo_h1']] || '',
      meta_description: row[headerMap['meta_description']] || '',
      slug: row[headerMap['slug']] || '',
      confidence,
      shouldPublish,
    };
    
    // Skip if missing required fields
    if (!part.primary_part_number || !part.brand) {
      skippedParts.push({ reason: 'Missing required fields', part });
      continue;
    }
    
    // Only publish Verified-Imported/Sold with should_publish=YES
    if (confidence === 'Verified-Imported/Sold' && shouldPublish === 'YES') {
      verifiedParts.push(part);
    } else if (confidence === 'High') {
      highConfidenceParts.push(part);
    } else if (confidence === 'Medium') {
      mediumConfidenceParts.push(part);
    } else {
      skippedParts.push({ reason: `Confidence: ${confidence}, Publish: ${shouldPublish}`, part });
    }
  }
  
  // Report
  console.log('=== Import Summary ===');
  console.log(`Verified-Imported/Sold (will publish): ${verifiedParts.length}`);
  console.log(`High confidence (staged, not published): ${highConfidenceParts.length}`);
  console.log(`Medium confidence (staged, not published): ${mediumConfidenceParts.length}`);
  console.log(`Skipped: ${skippedParts.length}`);
  console.log('');
  
  // List verified parts
  console.log('=== Verified Parts to Publish ===');
  verifiedParts.forEach(p => {
    console.log(`  ${p.record_id}: ${p.brand} ${p.primary_part_number} (${p.part_type})`);
  });
  console.log('');
  
  // Generate TypeScript output
  const tsContent = generateTypeScript(verifiedParts);
  
  // Write output
  fs.writeFileSync(OUTPUT_PATH, tsContent, 'utf-8');
  console.log(`\nGenerated: ${OUTPUT_PATH}`);
  console.log(`\nTo rebuild, run: cd nextjs-frontend && pnpm build`);
}

// Generate TypeScript file
function generateTypeScript(parts) {
  const partEntries = parts.map(p => `  // ${p.record_id}: ${p.brand} ${p.primary_part_number}
  {
    record_id: "${p.record_id}",
    launch_priority: ${p.launch_priority},
    brand: "${p.brand}",
    part_type: "${p.part_type}",
    part_subtype: "${p.part_subtype}",
    primary_part_number: "${p.primary_part_number}",
    alt_part_numbers: ${JSON.stringify(p.alt_part_numbers)},
    oem_equivalent: "${escapeString(p.oem_equivalent)}",
    product_name: "${escapeString(p.product_name)}",
    compatible_models_text: "${escapeString(p.compatible_models_text)}",
    compatible_models: ${JSON.stringify(p.compatible_models)},
    track_sizes: ${JSON.stringify(p.track_sizes)},
    chassis_mount_notes: "${escapeString(p.chassis_mount_notes)}",
    serial_notes: "${escapeString(p.serial_notes)}",
    position_notes: "${escapeString(p.position_notes)}",
    source_urls: ${JSON.stringify(p.source_urls)},
    verification_notes: "${escapeString(p.verification_notes)}",
    seo_title: "${escapeString(p.seo_title)}",
    seo_h1: "${escapeString(p.seo_h1)}",
    meta_description: "${escapeString(p.meta_description)}",
    slug: "${p.slug}",
  }`).join(',\n');

  return `/**
 * Verified Undercarriage Parts Data
 * 
 * AUTO-GENERATED FILE - DO NOT EDIT DIRECTLY
 * 
 * This file contains ONLY parts with:
 * - confidence = "Verified-Imported/Sold"
 * - should_publish = "YES"
 * 
 * To regenerate, run: node scripts/import-undercarriage-parts.js
 * 
 * Source: data/rtw_undercarriage_parts_launch_master_v2.csv
 * Generated: ${new Date().toISOString()}
 */

import { UndercarriageComponent } from "./undercarriage-data";
import { normalizeForMatching, cleanModelForDisplay } from "./full-machine-data";

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
  compatible_models: string[];
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
${partEntries}
];

/**
 * Get the undercarriage component type from a part
 */
export function getComponentTypeFromPart(part: VerifiedPart): UndercarriageComponent | null {
  const key = \`\${part.part_type}-\${part.part_subtype}\`;
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
 */
function modelMatchesPart(model: string, part: VerifiedPart): boolean {
  const normalizedModel = normalizeForMatching(cleanModelForDisplay(model));
  
  for (const compatModel of part.compatible_models) {
    if (normalizeForMatching(compatModel) === normalizedModel) {
      return true;
    }
  }
  
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
    const partBrandUpper = part.brand.toUpperCase();
    const brandMatches = 
      partBrandUpper === normalizedBrand ||
      (partBrandUpper === "CAT" && normalizedBrand === "CATERPILLAR") ||
      (partBrandUpper === "CATERPILLAR" && normalizedBrand === "CAT");
    
    if (!brandMatches) return false;
    if (getComponentTypeFromPart(part) !== componentType) return false;
    
    return modelMatchesPart(model, part);
  });
}

/**
 * Get all verified part slugs for static generation
 */
export function getAllVerifiedPartSlugs(): string[] {
  return VERIFIED_PARTS.map((p) => p.slug);
}
`;
}

function escapeString(str) {
  return (str || '').replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

// Run
importParts().catch(console.error);
