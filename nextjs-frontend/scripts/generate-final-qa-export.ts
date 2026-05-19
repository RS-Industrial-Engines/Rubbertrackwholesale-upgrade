/**
 * Final Rendered Undercarriage QA Export
 * 
 * Generates CSV export of all undercarriage data currently connected to public
 * component pages, reflecting the final rendered state after F-K spreadsheet updates.
 * 
 * Run: npx tsx scripts/generate-final-qa-export.ts
 */

import * as fs from "fs";
import * as path from "path";
import { STAGED_PARTS, StagedPart } from "../lib/data/staged-parts-data";
import { VERIFIED_PARTS, VerifiedPart } from "../lib/data/verified-parts-data";
import { 
  SHOW_RESEARCHED_PARTS_ON_PUBLIC_COMPONENT_PAGES,
  REQUIRE_COMPONENT_DATA_FOR_SITEMAP,
  ALLOW_STAGED_PARTS_PRODUCT_SCHEMA 
} from "../lib/config/staged-parts-flags";

// Types
type ComponentType = "bottom-rollers" | "sprockets" | "idlers" | "carrier-rollers";
type UndercarriageComponent = "bottom-roller" | "sprocket" | "idler" | "carrier-roller";

interface ExportRow {
  brand: string;
  machine_model: string;
  component_type: string;
  primary_part_number: string;
  alternate_part_numbers: string;
  product_name: string;
  compatible_models: string;
  serial_notes: string;
  chassis_mount_notes: string;
  supersession_notes: string;
  researched_vs_verified: "researched" | "verified";
  publish_status: string;
  generated_component_url: string;
  included_in_sitemap: "YES" | "NO";
  generates_product_schema: "YES" | "NO";
  generates_parts_slug: "YES" | "NO";
}

// Helper: Map part category to component type
function mapPartCategoryToComponentType(category: string, subtype: string): UndercarriageComponent {
  const categoryLower = category.toLowerCase();
  const subtypeLower = subtype?.toLowerCase() || "";
  
  if (categoryLower === "roller") {
    if (subtypeLower === "carrier" || subtypeLower === "top") {
      return "carrier-roller";
    }
    return "bottom-roller";
  }
  if (categoryLower === "sprocket" || categoryLower === "drive") {
    return "sprocket";
  }
  if (categoryLower === "idler") {
    return "idler";
  }
  if (categoryLower === "carrier-roller" || categoryLower === "top-roller") {
    return "carrier-roller";
  }
  return "bottom-roller";
}

// Helper: Map singular to plural route
function mapComponentToRoute(component: UndercarriageComponent): ComponentType {
  const mapping: Record<UndercarriageComponent, ComponentType> = {
    "bottom-roller": "bottom-rollers",
    "sprocket": "sprockets",
    "idler": "idlers",
    "carrier-roller": "carrier-rollers",
  };
  return mapping[component];
}

// Helper: Create machine slug
function createMachineSlug(brand: string, model: string): string {
  return `${brand.toLowerCase()}-${model.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-").replace(/-$/, "")}`;
}

// Helper: Escape CSV value
function escapeCSV(value: string): string {
  if (!value) return "";
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

// Process staged parts
function processStaged(): ExportRow[] {
  const rows: ExportRow[] = [];
  
  for (const part of STAGED_PARTS) {
    const componentType = mapPartCategoryToComponentType(part.part_category, part.part_subtype);
    const routePath = mapComponentToRoute(componentType);
    
    // Generate rows for each compatible model
    for (const model of part.compatible_models) {
      const slug = createMachineSlug(part.brand, model);
      const url = `https://rubbertrackwholesale.com/${routePath}/${slug}`;
      
      // Staged parts are included in sitemap when feature flag is enabled
      const includedInSitemap = SHOW_RESEARCHED_PARTS_ON_PUBLIC_COMPONENT_PAGES && 
                                REQUIRE_COMPONENT_DATA_FOR_SITEMAP ? "YES" : "NO";
      
      rows.push({
        brand: part.brand,
        machine_model: model,
        component_type: componentType,
        primary_part_number: part.primary_part_number,
        alternate_part_numbers: part.alt_part_numbers.join("; "),
        product_name: part.product_name || "",
        compatible_models: part.compatible_models_text,
        serial_notes: part.serial_notes || "",
        chassis_mount_notes: part.chassis_mount_notes || "",
        supersession_notes: part.superseded_part_numbers || "",
        researched_vs_verified: "researched",
        publish_status: part.publish_status,
        generated_component_url: url,
        included_in_sitemap: includedInSitemap,
        generates_product_schema: ALLOW_STAGED_PARTS_PRODUCT_SCHEMA ? "YES" : "NO",
        generates_parts_slug: "NO", // Staged parts never get /parts/[slug] pages
      });
    }
  }
  
  return rows;
}

// Process verified parts
function processVerified(): ExportRow[] {
  const rows: ExportRow[] = [];
  
  for (const part of VERIFIED_PARTS) {
    const componentType: UndercarriageComponent = 
      part.part_subtype === "carrier" ? "carrier-roller" :
      part.part_type === "sprocket" ? "sprocket" :
      part.part_type === "idler" ? "idler" : "bottom-roller";
    
    const routePath = mapComponentToRoute(componentType);
    
    // Generate rows for each compatible model
    for (const model of part.compatible_models) {
      const slug = createMachineSlug(part.brand, model);
      const url = `https://rubbertrackwholesale.com/${routePath}/${slug}`;
      
      rows.push({
        brand: part.brand,
        machine_model: model,
        component_type: componentType,
        primary_part_number: part.primary_part_number,
        alternate_part_numbers: part.alt_part_numbers.join("; "),
        product_name: part.product_name || "",
        compatible_models: part.compatible_models_text,
        serial_notes: part.serial_notes || "",
        chassis_mount_notes: part.chassis_mount_notes || "",
        supersession_notes: part.oem_equivalent || "",
        researched_vs_verified: "verified",
        publish_status: part.publish_status,
        generated_component_url: url,
        included_in_sitemap: "YES", // Verified parts always in sitemap
        generates_product_schema: "YES", // Verified parts get Product schema
        generates_parts_slug: part.slug ? "YES" : "NO",
      });
    }
  }
  
  return rows;
}

// Main export function
function generateExport() {
  console.log("Generating Final Rendered Undercarriage QA Export...\n");
  
  const stagedRows = processStaged();
  const verifiedRows = processVerified();
  const allRows = [...stagedRows, ...verifiedRows];
  
  // Sort by brand, then model
  allRows.sort((a, b) => {
    if (a.brand !== b.brand) return a.brand.localeCompare(b.brand);
    if (a.machine_model !== b.machine_model) return a.machine_model.localeCompare(b.machine_model);
    return a.primary_part_number.localeCompare(b.primary_part_number);
  });
  
  // Generate CSV header
  const headers = [
    "brand",
    "machine_model",
    "component_type",
    "primary_part_number",
    "alternate_part_numbers",
    "product_name",
    "compatible_models",
    "serial_notes",
    "chassis_mount_notes",
    "supersession_notes",
    "researched_vs_verified",
    "publish_status",
    "generated_component_url",
    "included_in_sitemap",
    "generates_product_schema",
    "generates_parts_slug",
  ];
  
  // Generate CSV content
  const csvLines: string[] = [headers.join(",")];
  
  for (const row of allRows) {
    const values = headers.map(h => escapeCSV(row[h as keyof ExportRow]));
    csvLines.push(values.join(","));
  }
  
  const csvContent = csvLines.join("\n");
  
  // Write to file
  const outputPath = path.join(__dirname, "../data/final-rendered-undercarriage-qa-export.csv");
  fs.writeFileSync(outputPath, csvContent, "utf-8");
  
  // Print summary
  console.log("=".repeat(60));
  console.log("FINAL RENDERED UNDERCARRIAGE QA EXPORT");
  console.log("=".repeat(60));
  console.log(`\nTotal rows: ${allRows.length}`);
  console.log(`  - Researched (staged): ${stagedRows.length}`);
  console.log(`  - Verified: ${verifiedRows.length}`);
  console.log(`\nUnique parts:`);
  console.log(`  - Staged: ${STAGED_PARTS.length}`);
  console.log(`  - Verified: ${VERIFIED_PARTS.length}`);
  console.log(`\nFeature Flags:`);
  console.log(`  - SHOW_RESEARCHED_PARTS_ON_PUBLIC_COMPONENT_PAGES: ${SHOW_RESEARCHED_PARTS_ON_PUBLIC_COMPONENT_PAGES}`);
  console.log(`  - REQUIRE_COMPONENT_DATA_FOR_SITEMAP: ${REQUIRE_COMPONENT_DATA_FOR_SITEMAP}`);
  console.log(`  - ALLOW_STAGED_PARTS_PRODUCT_SCHEMA: ${ALLOW_STAGED_PARTS_PRODUCT_SCHEMA}`);
  console.log(`\nOutput: ${outputPath}`);
  console.log("\n" + "=".repeat(60));
  
  // Brand breakdown
  const brandCounts: Record<string, { researched: number; verified: number }> = {};
  for (const row of allRows) {
    if (!brandCounts[row.brand]) {
      brandCounts[row.brand] = { researched: 0, verified: 0 };
    }
    if (row.researched_vs_verified === "researched") {
      brandCounts[row.brand].researched++;
    } else {
      brandCounts[row.brand].verified++;
    }
  }
  
  console.log("\nBrand Breakdown (machine/component combinations):");
  for (const [brand, counts] of Object.entries(brandCounts).sort()) {
    console.log(`  ${brand}: ${counts.researched + counts.verified} total (${counts.researched} researched, ${counts.verified} verified)`);
  }
  
  // Sitemap summary
  const inSitemap = allRows.filter(r => r.included_in_sitemap === "YES").length;
  const withSchema = allRows.filter(r => r.generates_product_schema === "YES").length;
  const withSlug = allRows.filter(r => r.generates_parts_slug === "YES").length;
  
  console.log("\nGovernance Summary:");
  console.log(`  - Included in sitemap: ${inSitemap}`);
  console.log(`  - Generates Product schema: ${withSchema}`);
  console.log(`  - Generates /parts/[slug] page: ${withSlug}`);
  
  console.log("\nExport complete!");
}

// Run
generateExport();
