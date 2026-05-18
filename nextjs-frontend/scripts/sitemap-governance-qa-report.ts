/**
 * Sitemap SEO Governance QA Report
 * 
 * Generates a report showing:
 * - Total sitemap URLs before/after governance
 * - Number of machine pages
 * - Number of track-size pages  
 * - Number of component pages included
 * - Number of component pages excluded (no verified/researched data)
 * - List of included component URLs for the researched rows
 * 
 * Run with: npx tsx scripts/sitemap-governance-qa-report.ts
 */

import { fullMachineModels, fullTrackSizes, fullBrands } from "../lib/data/full-machine-data";
import { createMachineSlug } from "../lib/url-utils";
import { hasCarrierRoller } from "../lib/data/undercarriage-data";
import { getVerifiedPartsForMachine } from "../lib/data/verified-parts-data";
import { getStagedPartsForMachine, STAGED_PARTS } from "../lib/data/staged-parts-data";
import { STATIC_BLOG_POSTS } from "../lib/data/blog-posts";
import { 
  SHOW_RESEARCHED_PARTS_ON_PUBLIC_COMPONENT_PAGES,
  REQUIRE_COMPONENT_DATA_FOR_SITEMAP 
} from "../lib/config/staged-parts-flags";

type ComponentType = "bottom-rollers" | "sprockets" | "idlers" | "carrier-rollers";
type UndercarriageComponent = "bottom-roller" | "sprocket" | "idler" | "carrier-roller";

// Map plural URL routes to singular component types
function mapRouteToComponentType(routePath: ComponentType): UndercarriageComponent {
  const mapping: Record<ComponentType, UndercarriageComponent> = {
    "bottom-rollers": "bottom-roller",
    "sprockets": "sprocket",
    "idlers": "idler",
    "carrier-rollers": "carrier-roller",
  };
  return mapping[routePath];
}

// Helper to check SEO value (mirrors sitemap-seo-helpers.ts)
function hasComponentSEOValue(brand: string, model: string, routePath: ComponentType): boolean {
  if (!REQUIRE_COMPONENT_DATA_FOR_SITEMAP) {
    return true;
  }

  if (routePath === "carrier-rollers") {
    return hasCarrierRoller(brand, model);
  }

  const componentType = mapRouteToComponentType(routePath);
  const verifiedParts = getVerifiedPartsForMachine(brand, model, componentType);
  if (verifiedParts.length > 0) {
    return true;
  }

  if (SHOW_RESEARCHED_PARTS_ON_PUBLIC_COMPONENT_PAGES) {
    const stagedParts = getStagedPartsForMachine(brand, model, componentType);
    if (stagedParts.length > 0) {
      return true;
    }
  }

  return false;
}

function generateReport(): void {
  console.log("=".repeat(80));
  console.log("SITEMAP SEO GOVERNANCE QA REPORT");
  console.log("=".repeat(80));
  console.log(`Generated: ${new Date().toISOString()}`);
  console.log("");

  // Feature flags status
  console.log("## Feature Flags Status");
  console.log("-".repeat(40));
  console.log(`SHOW_RESEARCHED_PARTS_ON_PUBLIC_COMPONENT_PAGES: ${SHOW_RESEARCHED_PARTS_ON_PUBLIC_COMPONENT_PAGES}`);
  console.log(`REQUIRE_COMPONENT_DATA_FOR_SITEMAP: ${REQUIRE_COMPONENT_DATA_FOR_SITEMAP}`);
  console.log("");

  // Count machines
  let totalMachines = 0;
  const seenMachineSlugs = new Set<string>();
  for (const [brand, models] of Object.entries(fullMachineModels)) {
    for (const model of models) {
      const slug = createMachineSlug(brand, model);
      if (!seenMachineSlugs.has(slug)) {
        seenMachineSlugs.add(slug);
        totalMachines++;
      }
    }
  }

  // Count component pages (before governance - all machines)
  const componentTypes: ComponentType[] = ["bottom-rollers", "sprockets", "idlers"];
  const beforeGovernance = totalMachines * componentTypes.length;

  // Count component pages (after governance - only with data)
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
  const includedComponentUrls: string[] = [];
  const seenComponentSlugs = new Set<string>();

  for (const [brand, models] of Object.entries(fullMachineModels)) {
    for (const model of models) {
      const slug = createMachineSlug(brand, model);
      
      for (const componentType of componentTypes) {
        const key = `${componentType}/${slug}`;
        if (seenComponentSlugs.has(key)) continue;
        seenComponentSlugs.add(key);

        if (hasComponentSEOValue(brand, model, componentType)) {
          includedComponentPages++;
          includedByType[componentType]++;
          includedComponentUrls.push(`/${componentType}/${slug}`);
        } else {
          excludedComponentPages++;
          excludedByType[componentType]++;
        }
      }

      // Carrier rollers
      const carrierKey = `carrier-rollers/${slug}`;
      if (!seenComponentSlugs.has(carrierKey)) {
        seenComponentSlugs.add(carrierKey);
        if (hasCarrierRoller(brand, model)) {
          includedComponentPages++;
          includedByType["carrier-rollers"]++;
          includedComponentUrls.push(`/carrier-rollers/${slug}`);
        } else {
          excludedComponentPages++;
          excludedByType["carrier-rollers"]++;
        }
      }
    }
  }

  // Static pages count
  const staticPagesCount = 15; // From sitemap.ts static pages array

  // Blog pages count
  const blogPagesCount = STATIC_BLOG_POSTS.length;

  // Track size pages
  const trackSizePagesCount = fullTrackSizes.length;

  // Brand pages
  const brandPagesCount = fullBrands.length;

  // Summary calculations
  const totalBeforeGovernance = 
    staticPagesCount + 
    blogPagesCount + 
    totalMachines + 
    trackSizePagesCount + 
    brandPagesCount + 
    beforeGovernance + 
    (totalMachines); // carrier rollers (before - all machines)

  const totalAfterGovernance = 
    staticPagesCount + 
    blogPagesCount + 
    totalMachines + 
    trackSizePagesCount + 
    brandPagesCount + 
    includedComponentPages;

  console.log("## Sitemap URL Counts");
  console.log("-".repeat(40));
  console.log(`Static pages:           ${staticPagesCount.toLocaleString()}`);
  console.log(`Blog pages:             ${blogPagesCount.toLocaleString()}`);
  console.log(`Machine pages:          ${totalMachines.toLocaleString()}`);
  console.log(`Track size pages:       ${trackSizePagesCount.toLocaleString()}`);
  console.log(`Brand pages:            ${brandPagesCount.toLocaleString()}`);
  console.log("");

  console.log("## Component Pages (Before vs After Governance)");
  console.log("-".repeat(40));
  console.log(`Before governance (all machines * 4 component types):`);
  console.log(`  Total possible:       ${(beforeGovernance + totalMachines).toLocaleString()}`);
  console.log("");
  console.log(`After governance (only pages with verified/researched data):`);
  console.log(`  Included:             ${includedComponentPages.toLocaleString()}`);
  console.log(`  Excluded:             ${excludedComponentPages.toLocaleString()}`);
  console.log("");
  console.log(`By component type (included / excluded):`);
  console.log(`  Bottom rollers:       ${includedByType["bottom-rollers"]} / ${excludedByType["bottom-rollers"]}`);
  console.log(`  Sprockets:            ${includedByType["sprockets"]} / ${excludedByType["sprockets"]}`);
  console.log(`  Idlers:               ${includedByType["idlers"]} / ${excludedByType["idlers"]}`);
  console.log(`  Carrier rollers:      ${includedByType["carrier-rollers"]} / ${excludedByType["carrier-rollers"]}`);
  console.log("");

  console.log("## Total Sitemap URLs");
  console.log("-".repeat(40));
  console.log(`BEFORE governance:      ${totalBeforeGovernance.toLocaleString()}`);
  console.log(`AFTER governance:       ${totalAfterGovernance.toLocaleString()}`);
  console.log(`URLs eliminated:        ${(totalBeforeGovernance - totalAfterGovernance).toLocaleString()}`);
  console.log(`Reduction:              ${((1 - totalAfterGovernance / totalBeforeGovernance) * 100).toFixed(1)}%`);
  console.log("");

  // Researched parts data
  console.log("## Researched Parts Data (54 staged rows)");
  console.log("-".repeat(40));
  console.log(`Total staged parts:     ${STAGED_PARTS.length}`);
  
  // Get unique machines from staged parts
  const stagedMachines = new Set<string>();
  const stagedComponentUrls: string[] = [];
  
  for (const part of STAGED_PARTS) {
    const brand = part.brand;
    for (const model of part.compatible_models) {
      const machineKey = `${brand}|${model}`;
      if (!stagedMachines.has(machineKey)) {
        stagedMachines.add(machineKey);
      }
      
      // Map part category to component type
      let componentType: ComponentType | null = null;
      const category = part.part_category.toLowerCase();
      if (category === "roller") {
        componentType = part.part_subtype?.toLowerCase() === "carrier" ? "carrier-rollers" : "bottom-rollers";
      } else if (category === "sprocket" || category === "drive") {
        componentType = "sprockets";
      } else if (category === "idler") {
        componentType = "idlers";
      }
      
      if (componentType) {
        const slug = createMachineSlug(brand, model);
        const url = `/${componentType}/${slug}`;
        if (!stagedComponentUrls.includes(url)) {
          stagedComponentUrls.push(url);
        }
      }
    }
  }

  console.log(`Unique machines covered: ${stagedMachines.size}`);
  console.log(`Component URLs from staged data: ${stagedComponentUrls.length}`);
  console.log("");

  // List included component URLs
  if (includedComponentUrls.length <= 200) {
    console.log("## Included Component URLs (All)");
    console.log("-".repeat(40));
    for (const url of includedComponentUrls.sort()) {
      console.log(`  ${url}`);
    }
  } else {
    console.log("## Included Component URLs (First 50)");
    console.log("-".repeat(40));
    for (const url of includedComponentUrls.sort().slice(0, 50)) {
      console.log(`  ${url}`);
    }
    console.log(`  ... and ${includedComponentUrls.length - 50} more`);
  }
  console.log("");

  console.log("## Component URLs from Staged/Researched Data");
  console.log("-".repeat(40));
  for (const url of stagedComponentUrls.sort()) {
    console.log(`  ${url}`);
  }
  console.log("");

  console.log("=".repeat(80));
  console.log("END OF REPORT");
  console.log("=".repeat(80));
}

generateReport();
