/**
 * STAGED UNDERCARRIAGE QA REPORT GENERATOR
 * =========================================
 * 
 * Generates a comprehensive QA report for all 54 staged undercarriage parts.
 * 
 * Usage: npx ts-node --esm scripts/generate-staged-qa-report.ts
 * 
 * Output: Markdown report to stdout
 */

import { STAGED_PARTS, getStagedPartStats, getStagedPartsReadyForReview } from "../lib/data/staged-parts-data";

const SITE_URL = "https://rubbertrackwholesale.com";

interface QARow {
  record_id: string;
  brand: string;
  machine_models: string;
  part_category: string;
  part_number: string;
  alt_part_numbers: string;
  proposed_slug: string;
  proposed_title: string;
  proposed_h1: string;
  proposed_meta_description: string;
  proposed_canonical: string;
  proposed_internal_links: string;
  publish_status: string;
  index_status: string;
  sitemap_status: string;
  owner_approved: string;
  qa_notes: string;
}

function generateProposedSlug(part: typeof STAGED_PARTS[0]): string {
  if (part.slug) return part.slug;
  
  // Generate from brand + part number
  const brand = part.brand.toLowerCase().replace(/\s+/g, "-");
  const partNum = part.primary_part_number.toLowerCase().replace(/\s+/g, "-");
  return `${brand}-${partNum}`;
}

function generateProposedTitle(part: typeof STAGED_PARTS[0]): string {
  if (part.seo_title_override) return part.seo_title_override;
  
  const categoryName = {
    "roller": "Bottom Roller",
    "sprocket": "Sprocket",
    "idler": "Idler",
    "carrier-roller": "Carrier Roller",
    "track": "Rubber Track",
  }[part.part_category] || part.part_category;
  
  const models = part.compatible_models.slice(0, 2).join(", ");
  const moreCount = part.compatible_models.length > 2 ? ` & ${part.compatible_models.length - 2} more` : "";
  
  return `${part.brand} ${part.primary_part_number} ${categoryName} for ${models}${moreCount} | Rubber Track Wholesale`;
}

function generateProposedH1(part: typeof STAGED_PARTS[0]): string {
  const categoryName = {
    "roller": "Bottom Roller",
    "sprocket": "Sprocket",
    "idler": "Idler",
    "carrier-roller": "Carrier Roller",
    "track": "Rubber Track",
  }[part.part_category] || part.part_category;
  
  return `${part.brand} ${part.primary_part_number} ${categoryName}`;
}

function generateProposedMetaDescription(part: typeof STAGED_PARTS[0]): string {
  if (part.meta_description_override) return part.meta_description_override;
  
  const categoryName = {
    "roller": "bottom roller",
    "sprocket": "sprocket",
    "idler": "idler",
    "carrier-roller": "carrier roller",
    "track": "rubber track",
  }[part.part_category] || part.part_category;
  
  const models = part.compatible_models.slice(0, 3).join(", ");
  
  return `Buy ${part.brand} ${part.primary_part_number} ${categoryName} for ${models}. Verified fitment. Houston warehouse, nationwide shipping. Call for pricing.`;
}

function generateProposedInternalLinks(part: typeof STAGED_PARTS[0]): string {
  const links: string[] = [];
  
  // Link to compatible machine pages
  part.compatible_models.slice(0, 3).forEach(model => {
    const machineSlug = `${part.brand.toLowerCase()}-${model.toLowerCase().replace(/\s+/g, "-")}`;
    links.push(`/machines/${machineSlug}`);
  });
  
  // Link to component pages
  const componentSlug = {
    "roller": "bottom-rollers",
    "sprocket": "sprockets",
    "idler": "idlers",
    "carrier-roller": "carrier-rollers",
    "track": "rubber-tracks",
  }[part.part_category];
  
  if (componentSlug && part.compatible_models[0]) {
    const machineSlug = `${part.brand.toLowerCase()}-${part.compatible_models[0].toLowerCase().replace(/\s+/g, "-")}`;
    links.push(`/${componentSlug}/${machineSlug}`);
  }
  
  return links.join(", ");
}

function generateQANotes(part: typeof STAGED_PARTS[0]): string {
  const notes: string[] = [];
  
  if (part.compatible_models.length === 0) {
    notes.push("MISSING: No compatible models");
  }
  
  if (!part.primary_part_number) {
    notes.push("MISSING: No part number");
  }
  
  if (part.serial_notes) {
    notes.push(`HAS SERIAL NOTES: ${part.serial_notes.substring(0, 50)}...`);
  }
  
  if (part.chassis_mount_notes) {
    notes.push(`HAS CHASSIS NOTES: ${part.chassis_mount_notes.substring(0, 50)}...`);
  }
  
  if (part.alt_part_numbers.length > 0) {
    notes.push(`${part.alt_part_numbers.length} alternate part number(s)`);
  }
  
  if (notes.length === 0) {
    notes.push("Ready for review");
  }
  
  return notes.join("; ");
}

function generateReport(): void {
  const stats = getStagedPartStats();
  const readyForReview = getStagedPartsReadyForReview();
  
  console.log(`# STAGED UNDERCARRIAGE QA REPORT`);
  console.log(`Generated: ${new Date().toISOString()}`);
  console.log(``);
  console.log(`## Summary Statistics`);
  console.log(`- Total staged parts: ${stats.total}`);
  console.log(`- Ready for review: ${readyForReview.length}`);
  console.log(``);
  console.log(`### Parts by Brand`);
  Object.entries(stats.byBrand).sort((a, b) => b[1] - a[1]).forEach(([brand, count]) => {
    console.log(`- ${brand}: ${count}`);
  });
  console.log(``);
  console.log(`## Governance Status (ALL PARTS)`);
  console.log(`| Field | Value |`);
  console.log(`|-------|-------|`);
  console.log(`| publish_status | staged |`);
  console.log(`| index_status | false (NO indexing) |`);
  console.log(`| sitemap_include | false (NOT in sitemap) |`);
  console.log(`| owner_approved | false (awaiting approval) |`);
  console.log(``);
  console.log(`## CONFIRMATION: Staged rows are NOT public/indexed`);
  console.log(`- [ ] /parts/[slug] does NOT render staged parts`);
  console.log(`- [ ] /sitemap.xml does NOT include staged parts`);
  console.log(`- [ ] robots meta is noindex,nofollow on /review/parts/*`);
  console.log(`- [ ] No staged parts appear in public navigation`);
  console.log(``);
  console.log(`---`);
  console.log(``);
  console.log(`## Detailed QA Report`);
  console.log(``);
  
  // Group by brand
  const byBrand: Record<string, typeof STAGED_PARTS> = {};
  STAGED_PARTS.forEach(part => {
    if (!byBrand[part.brand]) byBrand[part.brand] = [];
    byBrand[part.brand].push(part);
  });
  
  Object.entries(byBrand).sort((a, b) => a[0].localeCompare(b[0])).forEach(([brand, parts]) => {
    console.log(`### ${brand} (${parts.length} parts)`);
    console.log(``);
    console.log(`| Record ID | Part # | Category | Models | Proposed Slug | Status |`);
    console.log(`|-----------|--------|----------|--------|---------------|--------|`);
    
    parts.forEach(part => {
      const slug = generateProposedSlug(part);
      const models = part.compatible_models.slice(0, 2).join(", ") + (part.compatible_models.length > 2 ? ` +${part.compatible_models.length - 2}` : "");
      const status = part.compatible_models.length > 0 && part.primary_part_number ? "Ready" : "Incomplete";
      console.log(`| ${part.record_id} | ${part.primary_part_number} | ${part.part_category} | ${models} | ${slug} | ${status} |`);
    });
    
    console.log(``);
  });
  
  console.log(`---`);
  console.log(``);
  console.log(`## Full Part Details`);
  console.log(``);
  
  STAGED_PARTS.forEach((part, index) => {
    console.log(`### ${index + 1}. ${part.brand} ${part.primary_part_number}`);
    console.log(``);
    console.log(`| Field | Value |`);
    console.log(`|-------|-------|`);
    console.log(`| Record ID | ${part.record_id} |`);
    console.log(`| Brand | ${part.brand} |`);
    console.log(`| Part Category | ${part.part_category} |`);
    console.log(`| Primary Part Number | ${part.primary_part_number} |`);
    console.log(`| Alt Part Numbers | ${part.alt_part_numbers.join(", ") || "None"} |`);
    console.log(`| Compatible Models | ${part.compatible_models.join(", ")} |`);
    console.log(`| Proposed Slug | ${generateProposedSlug(part)} |`);
    console.log(`| Proposed Title | ${generateProposedTitle(part)} |`);
    console.log(`| Proposed H1 | ${generateProposedH1(part)} |`);
    console.log(`| Proposed Meta Desc | ${generateProposedMetaDescription(part)} |`);
    console.log(`| Proposed Canonical | ${SITE_URL}/parts/${generateProposedSlug(part)} |`);
    console.log(`| Internal Links | ${generateProposedInternalLinks(part)} |`);
    console.log(`| Publish Status | ${part.publish_status} |`);
    console.log(`| Index Status | ${part.index_status} |`);
    console.log(`| Sitemap Include | ${part.sitemap_include} |`);
    console.log(`| Owner Approved | ${part.owner_approved} |`);
    console.log(`| QA Notes | ${generateQANotes(part)} |`);
    console.log(``);
  });
}

// Run the report
generateReport();
