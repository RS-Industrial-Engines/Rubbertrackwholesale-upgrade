/**
 * Export Normalized Undercarriage Datasets
 * 
 * Generates authoritative source-of-truth exports for:
 * - Machine compatibility (all 4713 machines)
 * - Machine → rubber track size mapping
 * - Machine → bottom roller mapping
 * - Machine → sprocket mapping
 * - Machine → idler mapping
 * - Verified undercarriage parts
 * - Deduplicated compatibility maps
 * 
 * Output: JSON files in /exports directory
 */

import * as fs from "fs";
import * as path from "path";
import {
  fullMachineModels,
  fullMachineCompatibility,
  getTrackSizesForMachine,
  cleanModelForDisplay,
  splitCompatibilityKey,
} from "../lib/data/full-machine-data";
import { createMachineSlug } from "../lib/url-utils";
import {
  getAllMachinesForComponent,
  getAllMachinesForCategoryPage,
  hasComponentData,
  COMPONENT_URL_PATHS,
  UndercarriageComponent,
} from "../lib/data/undercarriage-data";
import {
  VERIFIED_PARTS,
  getVerifiedPartsForMachine,
  getVerifiedPartsForComponentType,
} from "../lib/data/verified-parts-data";

// Create exports directory
const EXPORTS_DIR = path.join(process.cwd(), "exports");
if (!fs.existsSync(EXPORTS_DIR)) {
  fs.mkdirSync(EXPORTS_DIR, { recursive: true });
}

function writeJSON(filename: string, data: unknown) {
  const filepath = path.join(EXPORTS_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
  console.log(`✓ Exported: ${filename}`);
}

function writeCSV(filename: string, headers: string[], rows: string[][]) {
  const filepath = path.join(EXPORTS_DIR, filename);
  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
  ].join("\n");
  fs.writeFileSync(filepath, csvContent);
  console.log(`✓ Exported: ${filename}`);
}

// ============================================================================
// 1. COMPLETE MACHINE COMPATIBILITY DATASET
// ============================================================================
console.log("\n=== Exporting Machine Compatibility Dataset ===");

interface MachineEntry {
  brand: string;
  model: string;
  cleanModel: string;
  slug: string;
  trackSizes: string[];
  hasBottomRollerData: boolean;
  hasSprocketData: boolean;
  hasIdlerData: boolean;
  hasCarrierRollerData: boolean;
}

const allMachines: MachineEntry[] = [];
const seenSlugs = new Set<string>();

for (const [brand, models] of Object.entries(fullMachineModels)) {
  for (const model of models) {
    const slug = createMachineSlug(brand, model);
    if (seenSlugs.has(slug)) continue;
    seenSlugs.add(slug);
    
    const cleanModel = cleanModelForDisplay(model);
    const trackSizes = getTrackSizesForMachine(brand, model);
    
    allMachines.push({
      brand,
      model,
      cleanModel,
      slug,
      trackSizes,
      hasBottomRollerData: hasComponentData(brand, model, "bottom-rollers"),
      hasSprocketData: hasComponentData(brand, model, "sprockets"),
      hasIdlerData: hasComponentData(brand, model, "idlers"),
      hasCarrierRollerData: hasComponentData(brand, model, "carrier-rollers"),
    });
  }
}

writeJSON("01-machine-compatibility-full.json", {
  exportDate: new Date().toISOString(),
  totalMachines: allMachines.length,
  totalBrands: Object.keys(fullMachineModels).length,
  machines: allMachines,
});

// CSV version
const machineCSVRows = allMachines.map(m => [
  m.brand,
  m.model,
  m.cleanModel,
  m.slug,
  m.trackSizes.join("; "),
  m.hasBottomRollerData ? "YES" : "NO",
  m.hasSprocketData ? "YES" : "NO",
  m.hasIdlerData ? "YES" : "NO",
  m.hasCarrierRollerData ? "YES" : "NO",
]);

writeCSV("01-machine-compatibility-full.csv", [
  "Brand", "Model (Raw)", "Model (Clean)", "Slug", "Track Sizes",
  "Has Bottom Roller Data", "Has Sprocket Data", "Has Idler Data", "Has Carrier Roller Data"
], machineCSVRows);

// ============================================================================
// 2. MACHINE → RUBBER TRACK SIZE MAPPING
// ============================================================================
console.log("\n=== Exporting Rubber Track Size Mapping ===");

interface TrackSizeMapping {
  brand: string;
  model: string;
  cleanModel: string;
  slug: string;
  trackSizes: string[];
  primarySize: string;
}

const trackSizeMappings: TrackSizeMapping[] = allMachines
  .filter(m => m.trackSizes.length > 0)
  .map(m => ({
    brand: m.brand,
    model: m.model,
    cleanModel: m.cleanModel,
    slug: m.slug,
    trackSizes: m.trackSizes,
    primarySize: m.trackSizes[0] || "",
  }));

writeJSON("02-machine-track-size-mapping.json", {
  exportDate: new Date().toISOString(),
  totalMappings: trackSizeMappings.length,
  mappings: trackSizeMappings,
});

// Flat CSV for track sizes (one row per size)
const trackSizeCSVRows: string[][] = [];
for (const m of trackSizeMappings) {
  for (const size of m.trackSizes) {
    trackSizeCSVRows.push([m.brand, m.cleanModel, m.slug, size]);
  }
}

writeCSV("02-machine-track-size-mapping.csv", [
  "Brand", "Model", "Slug", "Track Size"
], trackSizeCSVRows);

// ============================================================================
// 3. RAW COMPATIBILITY DATA (fullMachineCompatibility)
// ============================================================================
console.log("\n=== Exporting Raw Compatibility Data ===");

const rawCompatibilityEntries: Array<{
  key: string;
  brand: string;
  model: string;
  trackSizes: string[];
}> = [];

for (const [key, sizes] of Object.entries(fullMachineCompatibility)) {
  const [brand, model] = splitCompatibilityKey(key);
  rawCompatibilityEntries.push({
    key,
    brand,
    model,
    trackSizes: sizes,
  });
}

writeJSON("03-raw-compatibility-data.json", {
  exportDate: new Date().toISOString(),
  totalEntries: rawCompatibilityEntries.length,
  entries: rawCompatibilityEntries,
});

// ============================================================================
// 4. COMPONENT-SPECIFIC MACHINE MAPPINGS
// ============================================================================
console.log("\n=== Exporting Component-Specific Mappings ===");

const components: UndercarriageComponent[] = ["bottom-roller", "sprocket", "idler", "carrier-roller"];

for (const component of components) {
  const routePath = COMPONENT_URL_PATHS[component];
  
  // Get machines with verified data for this component
  const machinesWithData = getAllMachinesForComponent(component);
  
  writeJSON(`04-${routePath}-machines-with-data.json`, {
    exportDate: new Date().toISOString(),
    component,
    routePath,
    totalMachines: machinesWithData.length,
    machines: machinesWithData,
  });
  
  // CSV version
  const componentCSVRows = machinesWithData.map(m => [m.brand, m.model, m.slug]);
  writeCSV(`04-${routePath}-machines-with-data.csv`, [
    "Brand", "Model", "Slug"
  ], componentCSVRows);
}

// ============================================================================
// 5. VERIFIED UNDERCARRIAGE PARTS DATA
// ============================================================================
console.log("\n=== Exporting Verified Parts Data ===");

writeJSON("05-verified-parts-data.json", {
  exportDate: new Date().toISOString(),
  totalParts: VERIFIED_PARTS.length,
  parts: VERIFIED_PARTS,
});

// Flat CSV for verified parts
const verifiedPartsCSVRows: string[][] = [];
for (const part of VERIFIED_PARTS) {
  verifiedPartsCSVRows.push([
    part.brand,
    part.model,
    part.partType,
    part.partSubtype || "",
    part.partNumber,
    part.description || "",
    part.price?.toString() || "",
    part.source || "",
    part.compatibleMachines?.join("; ") || "",
  ]);
}

writeCSV("05-verified-parts-data.csv", [
  "Brand", "Model", "Part Type", "Part Subtype", "Part Number", "Description", "Price", "Source", "Compatible Machines"
], verifiedPartsCSVRows);

// ============================================================================
// 6. BRAND SUMMARY
// ============================================================================
console.log("\n=== Exporting Brand Summary ===");

interface BrandSummary {
  brand: string;
  totalModels: number;
  modelsWithTrackSizes: number;
  modelsWithBottomRollers: number;
  modelsWithSprockets: number;
  modelsWithIdlers: number;
  modelsWithCarrierRollers: number;
}

const brandSummaries: BrandSummary[] = [];

for (const brand of Object.keys(fullMachineModels).sort()) {
  const brandMachines = allMachines.filter(m => m.brand === brand);
  
  brandSummaries.push({
    brand,
    totalModels: brandMachines.length,
    modelsWithTrackSizes: brandMachines.filter(m => m.trackSizes.length > 0).length,
    modelsWithBottomRollers: brandMachines.filter(m => m.hasBottomRollerData).length,
    modelsWithSprockets: brandMachines.filter(m => m.hasSprocketData).length,
    modelsWithIdlers: brandMachines.filter(m => m.hasIdlerData).length,
    modelsWithCarrierRollers: brandMachines.filter(m => m.hasCarrierRollerData).length,
  });
}

writeJSON("06-brand-summary.json", {
  exportDate: new Date().toISOString(),
  totalBrands: brandSummaries.length,
  brands: brandSummaries,
});

writeCSV("06-brand-summary.csv", [
  "Brand", "Total Models", "With Track Sizes", "With Bottom Rollers",
  "With Sprockets", "With Idlers", "With Carrier Rollers"
], brandSummaries.map(b => [
  b.brand,
  b.totalModels.toString(),
  b.modelsWithTrackSizes.toString(),
  b.modelsWithBottomRollers.toString(),
  b.modelsWithSprockets.toString(),
  b.modelsWithIdlers.toString(),
  b.modelsWithCarrierRollers.toString(),
]));

// ============================================================================
// 7. TRACK SIZE INDEX (all unique track sizes)
// ============================================================================
console.log("\n=== Exporting Track Size Index ===");

const allTrackSizes = new Map<string, { size: string; machineCount: number; machines: string[] }>();

for (const machine of allMachines) {
  for (const size of machine.trackSizes) {
    if (!allTrackSizes.has(size)) {
      allTrackSizes.set(size, { size, machineCount: 0, machines: [] });
    }
    const entry = allTrackSizes.get(size)!;
    entry.machineCount++;
    entry.machines.push(`${machine.brand} ${machine.cleanModel}`);
  }
}

const trackSizeIndex = Array.from(allTrackSizes.values())
  .sort((a, b) => b.machineCount - a.machineCount);

writeJSON("07-track-size-index.json", {
  exportDate: new Date().toISOString(),
  totalUniqueSizes: trackSizeIndex.length,
  sizes: trackSizeIndex,
});

writeCSV("07-track-size-index.csv", [
  "Track Size", "Machine Count", "Sample Machines (first 5)"
], trackSizeIndex.map(s => [
  s.size,
  s.machineCount.toString(),
  s.machines.slice(0, 5).join("; "),
]));

// ============================================================================
// 8. SEO SITEMAP DATA
// ============================================================================
console.log("\n=== Exporting SEO Sitemap Data ===");

interface SitemapEntry {
  url: string;
  type: "machine" | "component";
  brand: string;
  model: string;
  component?: string;
  hasData: boolean;
}

const sitemapEntries: SitemapEntry[] = [];

// Machine pages
for (const m of allMachines) {
  sitemapEntries.push({
    url: `/machines/${m.slug}`,
    type: "machine",
    brand: m.brand,
    model: m.cleanModel,
    hasData: m.trackSizes.length > 0,
  });
}

// Component pages
for (const component of components) {
  const routePath = COMPONENT_URL_PATHS[component];
  for (const m of allMachines) {
    const hasData = hasComponentData(m.brand, m.model, routePath as "bottom-rollers" | "sprockets" | "idlers" | "carrier-rollers");
    sitemapEntries.push({
      url: `/${routePath}/${m.slug}`,
      type: "component",
      brand: m.brand,
      model: m.cleanModel,
      component: routePath,
      hasData,
    });
  }
}

writeJSON("08-seo-sitemap-data.json", {
  exportDate: new Date().toISOString(),
  totalURLs: sitemapEntries.length,
  machinePages: sitemapEntries.filter(e => e.type === "machine").length,
  componentPages: sitemapEntries.filter(e => e.type === "component").length,
  indexedPages: sitemapEntries.filter(e => e.hasData).length,
  noindexPages: sitemapEntries.filter(e => !e.hasData).length,
  entries: sitemapEntries,
});

writeCSV("08-seo-sitemap-data.csv", [
  "URL", "Type", "Brand", "Model", "Component", "Has Data (Indexed)"
], sitemapEntries.map(e => [
  e.url,
  e.type,
  e.brand,
  e.model,
  e.component || "",
  e.hasData ? "YES" : "NO",
]));

// ============================================================================
// SUMMARY
// ============================================================================
console.log("\n=== Export Complete ===");
console.log(`Total machines: ${allMachines.length}`);
console.log(`Total brands: ${Object.keys(fullMachineModels).length}`);
console.log(`Total track size mappings: ${trackSizeMappings.length}`);
console.log(`Total unique track sizes: ${trackSizeIndex.length}`);
console.log(`Total sitemap entries: ${sitemapEntries.length}`);
console.log(`\nExports saved to: ${EXPORTS_DIR}`);
