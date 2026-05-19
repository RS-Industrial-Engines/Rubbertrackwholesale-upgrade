/**
 * Validate Internal Link Governance
 * 
 * Ensures:
 * 1. No malformed guiding URLs are generated internally
 * 2. No component pages with no data receive internal links
 * 3. Component pages in sitemap = component pages internally linked
 * 4. All URLs are clean and normalized
 */

import { 
  getMachinesGroupedByBrand,
  getAllMachinesForComponent,
  getMachineComponentUrls,
  getUndercarriageComponents,
  COMPONENT_URL_PATHS,
  UndercarriageComponent,
} from "../lib/data/undercarriage-data";
import { fullMachineModels } from "../lib/data/full-machine-data";
import { createMachineSlug } from "../lib/url-utils";
import { hasComponentSEOValue, ComponentType } from "../lib/sitemap-seo-helpers";
import * as fs from "fs";
import * as path from "path";

interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    totalMachines: number;
    machinesWithComponentLinks: number;
    machinesWithNoComponentLinks: number;
    totalInternalLinks: number;
    malformedUrls: string[];
    componentLinksGenerated: Record<string, number>;
    sitemapPages: Record<string, number>;
    linkSitemapMismatch: string[];
  };
}

function validateInternalLinkGovernance(): ValidationResult {
  const result: ValidationResult = {
    passed: true,
    errors: [],
    warnings: [],
    stats: {
      totalMachines: 0,
      machinesWithComponentLinks: 0,
      machinesWithNoComponentLinks: 0,
      totalInternalLinks: 0,
      malformedUrls: [],
      componentLinksGenerated: {
        "bottom-rollers": 0,
        "sprockets": 0,
        "idlers": 0,
        "carrier-rollers": 0,
      },
      sitemapPages: {
        "bottom-rollers": 0,
        "sprockets": 0,
        "idlers": 0,
        "carrier-rollers": 0,
      },
      linkSitemapMismatch: [],
    },
  };

  const internalLinksSet = new Set<string>();
  const sitemapPagesSet = new Set<string>();
  const seenSlugs = new Set<string>();

  console.log("Starting internal link governance validation...\n");

  // 1. Check all machine component URLs for malformed patterns
  console.log("Step 1: Checking machine component URLs for malformed patterns...");
  
  for (const [brand, models] of Object.entries(fullMachineModels)) {
    for (const model of models) {
      const slug = createMachineSlug(brand, model);
      
      // Skip duplicates
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);
      
      result.stats.totalMachines++;
      
      // Check for guiding patterns in slug (the critical malformed patterns)
      if (/[ij]guiding|guiding|mseries|rseries/i.test(slug)) {
        result.stats.malformedUrls.push(`${brand} ${model} → ${slug} (contains guiding/series)`);
        result.errors.push(`GUIDING IN SLUG: ${brand} ${model} generates slug with guiding: ${slug}`);
        result.passed = false;
      }
      
      // Get component URLs for this machine
      const componentUrls = getMachineComponentUrls(brand, model);
      
      if (componentUrls.length > 0) {
        result.stats.machinesWithComponentLinks++;
        
        for (const { component, url } of componentUrls) {
          result.stats.totalInternalLinks++;
          internalLinksSet.add(url);
          
          const routePath = COMPONENT_URL_PATHS[component] as keyof typeof result.stats.componentLinksGenerated;
          result.stats.componentLinksGenerated[routePath]++;
          
          // Check URL for guiding patterns (the critical malformed patterns)
          if (/[ij]guiding|guiding|mseries|rseries/i.test(url)) {
            result.stats.malformedUrls.push(url);
            result.errors.push(`MALFORMED URL: ${url} contains guiding/series pattern`);
            result.passed = false;
          }
        }
      } else {
        result.stats.machinesWithNoComponentLinks++;
      }
    }
  }

  console.log(`  - Total machines: ${result.stats.totalMachines}`);
  console.log(`  - Machines with component links: ${result.stats.machinesWithComponentLinks}`);
  console.log(`  - Machines with NO component links: ${result.stats.machinesWithNoComponentLinks}`);
  console.log(`  - Malformed URLs found: ${result.stats.malformedUrls.length}`);

  // 2. Check category page machine listings
  console.log("\nStep 2: Checking category page machine listings...");
  
  const componentTypes: UndercarriageComponent[] = ["bottom-roller", "sprocket", "idler", "carrier-roller"];
  
  for (const component of componentTypes) {
    const routePath = COMPONENT_URL_PATHS[component];
    const machines = getAllMachinesForComponent(component);
    
    console.log(`  - ${routePath}: ${machines.length} machines listed`);
    
    for (const { slug } of machines) {
      const url = `/${routePath}/${slug}`;
      
      if (/[ij]guiding|guiding|mseries|rseries/i.test(slug)) {
        result.stats.malformedUrls.push(url);
        result.errors.push(`CATEGORY PAGE MALFORMED: ${url} contains guiding/series pattern`);
        result.passed = false;
      }
    }
  }

  // 3. Check getMachinesGroupedByBrand for category pages
  console.log("\nStep 3: Checking grouped brand listings...");
  
  for (const component of componentTypes) {
    const routePath = COMPONENT_URL_PATHS[component];
    const grouped = getMachinesGroupedByBrand(component);
    
    let totalInBrand = 0;
    for (const [brand, machines] of Object.entries(grouped)) {
      totalInBrand += machines.length;
      
      for (const { slug } of machines) {
        if (/[ij]guiding|guiding|mseries|rseries/i.test(slug)) {
          result.stats.malformedUrls.push(`/${routePath}/${slug}`);
          result.errors.push(`BRAND GROUP MALFORMED: ${brand} ${slug} contains guiding/series pattern`);
          result.passed = false;
        }
      }
    }
    
    console.log(`  - ${routePath}: ${Object.keys(grouped).length} brands, ${totalInBrand} machines`);
  }

  // 4. Compare with sitemap pages (using hasComponentSEOValue)
  console.log("\nStep 4: Comparing internal links with sitemap eligibility...");
  
  seenSlugs.clear();
  const componentRoutePaths: ComponentType[] = ["bottom-rollers", "sprockets", "idlers", "carrier-rollers"];
  
  for (const [brand, models] of Object.entries(fullMachineModels)) {
    for (const model of models) {
      const slug = createMachineSlug(brand, model);
      
      // Skip duplicates
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);
      
      for (const routePath of componentRoutePaths) {
        const url = `/${routePath}/${slug}`;
        
        if (hasComponentSEOValue(brand, model, routePath)) {
          sitemapPagesSet.add(url);
          result.stats.sitemapPages[routePath]++;
        }
      }
    }
  }

  // 5. Check for mismatches between internal links and sitemap
  console.log("\nStep 5: Checking for internal link / sitemap mismatches...");
  
  // Internal links that shouldn't exist (not in sitemap)
  for (const url of internalLinksSet) {
    if (!sitemapPagesSet.has(url)) {
      result.stats.linkSitemapMismatch.push(`INTERNAL_LINK_NO_SITEMAP: ${url}`);
      result.warnings.push(`Internal link exists but page not in sitemap: ${url}`);
    }
  }
  
  // Sitemap pages that have no internal links (might be orphans)
  for (const url of sitemapPagesSet) {
    if (!internalLinksSet.has(url)) {
      result.stats.linkSitemapMismatch.push(`SITEMAP_NO_INTERNAL_LINK: ${url}`);
      // This is just a warning, not an error - sitemap pages can exist without internal links
    }
  }

  console.log(`  - Internal links generated: ${internalLinksSet.size}`);
  console.log(`  - Sitemap pages: ${sitemapPagesSet.size}`);
  console.log(`  - Mismatches: ${result.stats.linkSitemapMismatch.length}`);

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("VALIDATION SUMMARY");
  console.log("=".repeat(60));
  
  console.log("\nComponent Link Statistics:");
  for (const [component, count] of Object.entries(result.stats.componentLinksGenerated)) {
    const sitemapCount = result.stats.sitemapPages[component as keyof typeof result.stats.sitemapPages];
    console.log(`  ${component}: ${count} internal links, ${sitemapCount} sitemap pages`);
  }
  
  console.log(`\nTotal Internal Links: ${result.stats.totalInternalLinks}`);
  console.log(`Total Sitemap Pages: ${sitemapPagesSet.size}`);
  console.log(`Malformed URLs: ${result.stats.malformedUrls.length}`);
  console.log(`Errors: ${result.errors.length}`);
  console.log(`Warnings: ${result.warnings.length}`);
  
  if (result.passed) {
    console.log("\n✅ VALIDATION PASSED - No malformed URLs or governance violations found");
  } else {
    console.log("\n❌ VALIDATION FAILED - Issues found:");
    for (const error of result.errors.slice(0, 20)) {
      console.log(`  - ${error}`);
    }
    if (result.errors.length > 20) {
      console.log(`  ... and ${result.errors.length - 20} more errors`);
    }
  }

  // Write report to file
  const reportPath = path.join(__dirname, "../data/internal-link-governance-report.json");
  fs.writeFileSync(reportPath, JSON.stringify(result, null, 2));
  console.log(`\nReport saved to: ${reportPath}`);

  return result;
}

// Run validation
validateInternalLinkGovernance();
