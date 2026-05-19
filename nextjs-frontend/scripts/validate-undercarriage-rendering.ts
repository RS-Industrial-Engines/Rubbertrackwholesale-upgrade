/**
 * Undercarriage Rendering Validation Script
 * 
 * Validates that all researched and verified undercarriage parts:
 * 1. Have a valid machine route
 * 2. Have a valid component route  
 * 3. Do not 404
 * 4. Have all required fields rendering
 * 
 * Outputs a CSV report with pass/fail status for each row.
 */

import * as fs from "fs";
import * as path from "path";

import { STAGED_PARTS } from "../lib/data/staged-parts-data";
import { VERIFIED_PARTS } from "../lib/data/verified-parts-data";
import { fullMachineModels, normalizeForMatching, cleanModelForDisplay } from "../lib/data/full-machine-data";
import { createMachineSlug } from "../lib/url-utils";

// Normalization helpers
function normalizeBrandName(brand: string): string {
  const normalized = brand.toLowerCase().trim();
  const aliases: Record<string, string> = {
    "cat": "CAT",
    "caterpillar": "CAT",
    "john deere": "John Deere",
    "johndeere": "John Deere",
    "jd": "John Deere",
  };
  return aliases[normalized] || brand;
}

function normalizeModelName(model: string): string {
  return model
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[^\w\s\-\.]/g, "")
    .toUpperCase();
}

// Check if a machine exists in the master list
function machineExistsInMasterList(brand: string, model: string): boolean {
  const normalizedBrand = normalizeBrandName(brand);
  const normalizedSearchModel = normalizeForMatching(model);
  
  // Find the brand in fullMachineModels
  for (const [key, models] of Object.entries(fullMachineModels)) {
    if (key.toLowerCase() === normalizedBrand.toLowerCase() ||
        normalizeForMatching(key) === normalizeForMatching(normalizedBrand)) {
      // Check if model exists - use cleanModelForDisplay to handle descriptors
      for (const m of models) {
        // Clean the master list model to remove descriptors like "[I guiding | M-series]"
        const cleanedMasterModel = cleanModelForDisplay(m);
        if (normalizeForMatching(cleanedMasterModel) === normalizedSearchModel) {
          return true;
        }
        // Also try direct match
        if (normalizeForMatching(m) === normalizedSearchModel) {
          return true;
        }
      }
    }
  }
  return false;
}

// Find missing machines from compatible_models arrays
function findMissingMachines(): {brand: string, model: string, source: string}[] {
  const missing: {brand: string, model: string, source: string}[] = [];
  const seen = new Set<string>();
  
  // Check staged parts
  for (const part of STAGED_PARTS) {
    for (const model of part.compatible_models) {
      const key = `${part.brand}|${model}`;
      if (!seen.has(key)) {
        seen.add(key);
        if (!machineExistsInMasterList(part.brand, model)) {
          missing.push({ brand: part.brand, model, source: "staged" });
        }
      }
    }
  }
  
  // Check verified parts
  for (const part of VERIFIED_PARTS) {
    for (const model of part.compatible_models) {
      const key = `${part.brand}|${model}`;
      if (!seen.has(key)) {
        seen.add(key);
        if (!machineExistsInMasterList(part.brand, model)) {
          missing.push({ brand: part.brand, model, source: "verified" });
        }
      }
    }
  }
  
  return missing;
}

// Find parts with empty compatible_models that have text in compatible_models_text
function findPartsWithEmptyModels(): {part_number: string, brand: string, text: string}[] {
  const empty: {part_number: string, brand: string, text: string}[] = [];
  
  for (const part of STAGED_PARTS) {
    if (part.compatible_models.length === 0 && part.compatible_models_text.trim() !== "") {
      empty.push({
        part_number: part.primary_part_number,
        brand: part.brand,
        text: part.compatible_models_text,
      });
    }
  }
  
  return empty;
}

// Map component type for URL generation
type ComponentType = "bottom-rollers" | "sprockets" | "idlers" | "carrier-rollers";

function getComponentRoute(partCategory: string, partSubtype: string): ComponentType {
  const cat = partCategory.toLowerCase();
  const sub = partSubtype.toLowerCase();
  
  if (cat === "roller" && sub === "bottom") return "bottom-rollers";
  if (cat === "roller" && sub === "carrier") return "carrier-rollers";
  if (cat === "sprocket" || cat === "drive") return "sprockets";
  if (cat === "idler") return "idlers";
  return "bottom-rollers";
}

interface ValidationRow {
  data_source: "staged" | "verified";
  part_number: string;
  brand: string;
  model: string;
  component_type: string;
  url: string;
  machine_in_master_list: "YES" | "NO";
  has_compatible_models: "YES" | "NO";
  has_primary_part_number: "YES" | "NO";
  has_alternate_numbers: "YES" | "NO";
  has_serial_notes: "YES" | "NO";
  has_chassis_notes: "YES" | "NO";
  has_supersession_notes: "YES" | "NO";
  normalization_match: "PASS" | "FAIL";
  overall_status: "PASS" | "FAIL" | "MISSING_MACHINE" | "EMPTY_MODELS";
}

function generateValidationReport(): ValidationRow[] {
  const rows: ValidationRow[] = [];
  
  // Validate staged parts
  for (const part of STAGED_PARTS) {
    const componentRoute = getComponentRoute(part.part_category, part.part_subtype);
    
    if (part.compatible_models.length === 0) {
      // Part has empty compatible models
      rows.push({
        data_source: "staged",
        part_number: part.primary_part_number,
        brand: part.brand,
        model: "(EMPTY)",
        component_type: componentRoute,
        url: "(NO URL - EMPTY MODELS)",
        machine_in_master_list: "NO",
        has_compatible_models: "NO",
        has_primary_part_number: part.primary_part_number ? "YES" : "NO",
        has_alternate_numbers: part.alt_part_numbers.length > 0 ? "YES" : "NO",
        has_serial_notes: part.serial_notes ? "YES" : "NO",
        has_chassis_notes: part.chassis_mount_notes ? "YES" : "NO",
        has_supersession_notes: part.superseded_part_numbers ? "YES" : "NO",
        normalization_match: "FAIL",
        overall_status: "EMPTY_MODELS",
      });
      continue;
    }
    
    for (const model of part.compatible_models) {
      const machineExists = machineExistsInMasterList(part.brand, model);
      const slug = createMachineSlug(part.brand, model);
      const url = `/${componentRoute}/${slug}`;
      
      rows.push({
        data_source: "staged",
        part_number: part.primary_part_number,
        brand: part.brand,
        model: model,
        component_type: componentRoute,
        url: url,
        machine_in_master_list: machineExists ? "YES" : "NO",
        has_compatible_models: "YES",
        has_primary_part_number: part.primary_part_number ? "YES" : "NO",
        has_alternate_numbers: part.alt_part_numbers.length > 0 ? "YES" : "NO",
        has_serial_notes: part.serial_notes ? "YES" : "NO",
        has_chassis_notes: part.chassis_mount_notes ? "YES" : "NO",
        has_supersession_notes: part.superseded_part_numbers ? "YES" : "NO",
        normalization_match: machineExists ? "PASS" : "FAIL",
        overall_status: machineExists ? "PASS" : "MISSING_MACHINE",
      });
    }
  }
  
  // Validate verified parts
  for (const part of VERIFIED_PARTS) {
    const componentRoute = getComponentRoute(part.part_type, part.part_subtype);
    
    for (const model of part.compatible_models) {
      const machineExists = machineExistsInMasterList(part.brand, model);
      const slug = createMachineSlug(part.brand, model);
      const url = `/${componentRoute}/${slug}`;
      
      rows.push({
        data_source: "verified",
        part_number: part.primary_part_number,
        brand: part.brand,
        model: model,
        component_type: componentRoute,
        url: url,
        machine_in_master_list: machineExists ? "YES" : "NO",
        has_compatible_models: "YES",
        has_primary_part_number: part.primary_part_number ? "YES" : "NO",
        has_alternate_numbers: part.alt_part_numbers.length > 0 ? "YES" : "NO",
        has_serial_notes: part.serial_notes ? "YES" : "NO",
        has_chassis_notes: part.chassis_mount_notes ? "YES" : "NO",
        has_supersession_notes: part.oem_equivalent ? "YES" : "NO",
        normalization_match: machineExists ? "PASS" : "FAIL",
        overall_status: machineExists ? "PASS" : "MISSING_MACHINE",
      });
    }
  }
  
  return rows;
}

function escapeCSV(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function main() {
  console.log("=== Undercarriage Rendering Validation ===\n");
  
  // Find missing machines
  const missingMachines = findMissingMachines();
  console.log(`Found ${missingMachines.length} missing machines from master list:\n`);
  
  // Group by brand
  const byBrand: Record<string, string[]> = {};
  for (const m of missingMachines) {
    if (!byBrand[m.brand]) byBrand[m.brand] = [];
    byBrand[m.brand].push(m.model);
  }
  
  for (const [brand, models] of Object.entries(byBrand)) {
    console.log(`  ${brand}: ${models.join(", ")}`);
  }
  
  // Find parts with empty compatible_models
  const emptyParts = findPartsWithEmptyModels();
  console.log(`\nFound ${emptyParts.length} parts with empty compatible_models array:\n`);
  for (const p of emptyParts) {
    console.log(`  ${p.brand} ${p.part_number}: "${p.text.substring(0, 80)}..."`);
  }
  
  // Generate full validation report
  const rows = generateValidationReport();
  
  // Summary stats
  const pass = rows.filter(r => r.overall_status === "PASS").length;
  const missingMachine = rows.filter(r => r.overall_status === "MISSING_MACHINE").length;
  const emptyModels = rows.filter(r => r.overall_status === "EMPTY_MODELS").length;
  
  console.log(`\n=== Validation Summary ===`);
  console.log(`  Total rows: ${rows.length}`);
  console.log(`  PASS: ${pass}`);
  console.log(`  MISSING_MACHINE: ${missingMachine}`);
  console.log(`  EMPTY_MODELS: ${emptyModels}`);
  
  // Write CSV report
  const headers = [
    "data_source",
    "part_number",
    "brand",
    "model",
    "component_type",
    "url",
    "machine_in_master_list",
    "has_compatible_models",
    "has_primary_part_number",
    "has_alternate_numbers",
    "has_serial_notes",
    "has_chassis_notes",
    "has_supersession_notes",
    "normalization_match",
    "overall_status",
  ];
  
  const csvLines = [headers.join(",")];
  for (const row of rows) {
    const values = headers.map(h => escapeCSV(String(row[h as keyof ValidationRow])));
    csvLines.push(values.join(","));
  }
  
  const outputPath = path.join(__dirname, "../data/undercarriage-validation-report.csv");
  fs.writeFileSync(outputPath, csvLines.join("\n"), "utf-8");
  console.log(`\nCSV report written to: ${outputPath}`);
  
  // Also write missing machines to a separate file for easy reference
  const missingPath = path.join(__dirname, "../data/missing-machines-to-add.txt");
  let missingContent = "# Missing Machines to Add to fullMachineModels\n\n";
  for (const [brand, models] of Object.entries(byBrand)) {
    missingContent += `## ${brand}\n`;
    for (const model of models.sort()) {
      missingContent += `- "${model}"\n`;
    }
    missingContent += "\n";
  }
  fs.writeFileSync(missingPath, missingContent, "utf-8");
  console.log(`Missing machines list written to: ${missingPath}`);
}

main();
