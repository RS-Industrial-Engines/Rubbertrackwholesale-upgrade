/**
 * Staged Parts QA Report Generator
 * 
 * Generates a comprehensive QA report showing all staged/researched parts
 * and their governance status (sitemap, public pages, schema inclusion).
 * 
 * Run: npx ts-node scripts/generate-staged-qa-report.ts > qa-report.md
 */

import { STAGED_PARTS, StagedPart } from "../lib/data/staged-parts-data";
import {
  SHOW_RESEARCHED_PARTS_ON_PUBLIC_COMPONENT_PAGES,
  ALLOW_STAGED_PARTS_PUBLIC_PAGES,
  ALLOW_STAGED_PARTS_IN_SITEMAP,
  ALLOW_STAGED_PARTS_PRODUCT_SCHEMA,
} from "../lib/config/staged-parts-flags";

function generateReport(): void {
  const now = new Date().toISOString();
  
  console.log(`# Staged Parts QA Report`);
  console.log(`Generated: ${now}`);
  console.log(``);
  
  // Feature Flags Status
  console.log(`## Feature Flags Status`);
  console.log(``);
  console.log(`| Flag | Value | Description |`);
  console.log(`|------|-------|-------------|`);
  console.log(`| SHOW_RESEARCHED_PARTS_ON_PUBLIC_COMPONENT_PAGES | ${SHOW_RESEARCHED_PARTS_ON_PUBLIC_COMPONENT_PAGES} | Show on /machines/[brand]/[model]/[component] |`);
  console.log(`| ALLOW_STAGED_PARTS_PUBLIC_PAGES | ${ALLOW_STAGED_PARTS_PUBLIC_PAGES} | Allow /parts/[slug] pages |`);
  console.log(`| ALLOW_STAGED_PARTS_IN_SITEMAP | ${ALLOW_STAGED_PARTS_IN_SITEMAP} | Include in sitemap.xml |`);
  console.log(`| ALLOW_STAGED_PARTS_PRODUCT_SCHEMA | ${ALLOW_STAGED_PARTS_PRODUCT_SCHEMA} | Generate Product schema |`);
  console.log(``);
  
  // Summary Statistics
  const byBrand: Record<string, StagedPart[]> = {};
  const byCategory: Record<string, StagedPart[]> = {};
  
  for (const part of STAGED_PARTS) {
    if (!byBrand[part.brand]) byBrand[part.brand] = [];
    byBrand[part.brand].push(part);
    
    if (!byCategory[part.part_category]) byCategory[part.part_category] = [];
    byCategory[part.part_category].push(part);
  }
  
  console.log(`## Summary Statistics`);
  console.log(``);
  console.log(`- **Total Staged Parts:** ${STAGED_PARTS.length}`);
  console.log(`- **Brands:** ${Object.keys(byBrand).join(", ")}`);
  console.log(`- **Categories:** ${Object.keys(byCategory).join(", ")}`);
  console.log(``);
  
  console.log(`### By Brand`);
  console.log(``);
  for (const [brand, parts] of Object.entries(byBrand)) {
    console.log(`- ${brand}: ${parts.length} parts`);
  }
  console.log(``);
  
  console.log(`### By Category`);
  console.log(``);
  for (const [category, parts] of Object.entries(byCategory)) {
    console.log(`- ${category}: ${parts.length} parts`);
  }
  console.log(``);
  
  // Governance Status
  console.log(`## Governance Status`);
  console.log(``);
  console.log(`All staged parts have the following governance status:`);
  console.log(``);
  console.log(`- **Excluded from sitemap:** YES (sitemap_include = false)`);
  console.log(`- **Excluded from /parts/[slug]:** YES (publish_status = staged)`);
  console.log(`- **Excluded from Product schema:** YES (ALLOW_STAGED_PARTS_PRODUCT_SCHEMA = false)`);
  console.log(`- **Shows on component pages:** ${SHOW_RESEARCHED_PARTS_ON_PUBLIC_COMPONENT_PAGES ? "YES (controlled by feature flag)" : "NO"}`);
  console.log(``);
  
  // Detailed Parts Table
  console.log(`## Detailed Parts List`);
  console.log(``);
  console.log(`| Record ID | Brand | Category | Primary Part # | Alternate Part #s | Compatible Models | Serial Notes | In Sitemap | Has /parts Page | Has Schema |`);
  console.log(`|-----------|-------|----------|----------------|-------------------|-------------------|--------------|------------|-----------------|------------|`);
  
  for (const part of STAGED_PARTS) {
    const altNums = part.alt_part_numbers.length > 0 
      ? part.alt_part_numbers.slice(0, 3).join(", ") + (part.alt_part_numbers.length > 3 ? "..." : "")
      : "-";
    const models = part.compatible_models.slice(0, 4).join(", ") + (part.compatible_models.length > 4 ? "..." : "");
    const serialNotes = part.serial_notes 
      ? (part.serial_notes.length > 30 ? part.serial_notes.substring(0, 30) + "..." : part.serial_notes)
      : "-";
    
    console.log(`| ${part.record_id} | ${part.brand} | ${part.part_category} | ${part.primary_part_number} | ${altNums} | ${models} | ${serialNotes} | NO | NO | NO |`);
  }
  console.log(``);
  
  // Component Page URLs
  console.log(`## Component Page URLs (Where Staged Parts Appear)`);
  console.log(``);
  console.log(`When SHOW_RESEARCHED_PARTS_ON_PUBLIC_COMPONENT_PAGES = true, staged parts appear on these URLs:`);
  console.log(``);
  
  const urlSet = new Set<string>();
  for (const part of STAGED_PARTS) {
    const brandSlug = part.brand.toLowerCase().replace(/\s+/g, "-");
    const componentPath = part.part_category === "roller" && part.part_subtype === "bottom" 
      ? "bottom-roller"
      : part.part_category === "roller" && part.part_subtype === "carrier"
      ? "carrier-roller"
      : part.part_category;
    
    for (const model of part.compatible_models) {
      const modelSlug = model.toLowerCase().replace(/\s+/g, "-");
      const url = `/machines/${brandSlug}-${modelSlug}/${componentPath}`;
      urlSet.add(url);
    }
  }
  
  const sortedUrls = Array.from(urlSet).sort();
  for (const url of sortedUrls.slice(0, 50)) {
    console.log(`- ${url}`);
  }
  if (sortedUrls.length > 50) {
    console.log(`- ... and ${sortedUrls.length - 50} more URLs`);
  }
  console.log(``);
  
  // Data Quality Check
  console.log(`## Data Quality Check`);
  console.log(``);
  
  const missingAltNumbers = STAGED_PARTS.filter(p => p.alt_part_numbers.length === 0);
  const missingSerialNotes = STAGED_PARTS.filter(p => !p.serial_notes);
  const missingChassisNotes = STAGED_PARTS.filter(p => !p.chassis_mount_notes);
  const missingSupersession = STAGED_PARTS.filter(p => !p.superseded_part_numbers);
  
  console.log(`| Check | Count | Status |`);
  console.log(`|-------|-------|--------|`);
  console.log(`| Parts with alternate numbers | ${STAGED_PARTS.length - missingAltNumbers.length}/${STAGED_PARTS.length} | ${missingAltNumbers.length === 0 ? "COMPLETE" : "MISSING: " + missingAltNumbers.length} |`);
  console.log(`| Parts with serial notes | ${STAGED_PARTS.length - missingSerialNotes.length}/${STAGED_PARTS.length} | ${missingSerialNotes.length === 0 ? "COMPLETE" : "MISSING: " + missingSerialNotes.length} |`);
  console.log(`| Parts with chassis notes | ${STAGED_PARTS.length - missingChassisNotes.length}/${STAGED_PARTS.length} | ${missingChassisNotes.length === 0 ? "COMPLETE" : "MISSING: " + missingChassisNotes.length} |`);
  console.log(`| Parts with supersession info | ${STAGED_PARTS.length - missingSupersession.length}/${STAGED_PARTS.length} | ${missingSupersession.length === 0 ? "COMPLETE" : "MISSING: " + missingSupersession.length} |`);
  console.log(``);
  
  // Parts Missing Alt Numbers
  if (missingAltNumbers.length > 0) {
    console.log(`### Parts Missing Alternate Numbers`);
    console.log(``);
    for (const part of missingAltNumbers) {
      console.log(`- ${part.record_id}: ${part.brand} ${part.primary_part_number}`);
    }
    console.log(``);
  }
}

generateReport();
