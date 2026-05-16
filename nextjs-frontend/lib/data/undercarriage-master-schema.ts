/**
 * ============================================================================
 * MASTER UNDERCARRIAGE DATA SCHEMA
 * ============================================================================
 * 
 * This is the SINGLE SOURCE OF TRUTH for all undercarriage parts data.
 * 
 * ARCHITECTURE PRINCIPLES:
 * ------------------------
 * 1. Machine/component pages remain PRIMARY SEO entities
 *    - /bottom-rollers/kubota-svl75 (primary)
 *    - /sprockets/kubota-svl75 (primary)
 * 
 * 2. Part pages are SECONDARY detail pages
 *    - /parts/kubota-v0511-25104-bottom-roller (secondary)
 * 
 * 3. All future imports use this same schema
 * 4. Automatic SEO generation from templates
 * 5. Staged vs published workflow preserved
 * 
 * DATA FLOW:
 * ----------
 * CSV Import → Validation → Normalization → TypeScript Data → Site Generation
 * 
 * IMPORT SCRIPT: scripts/import-master-undercarriage.ts
 * TEMPLATE CSV:  data/master-undercarriage-template.csv
 */

// ============================================================================
// CORE TYPE DEFINITIONS
// ============================================================================

/**
 * Part classification types
 */
export type PartCategory = "roller" | "sprocket" | "idler" | "carrier-roller";
export type PartSubtype = 
  | "bottom"     // Bottom roller
  | "track"      // Track roller (alias for bottom)
  | "drive"      // Drive sprocket
  | "front"      // Front idler
  | "rear"       // Rear idler
  | "carrier"    // Carrier/top roller
  | "";          // Unspecified

/**
 * Publication status for staged publishing workflow
 */
export type PublishStatus = 
  | "published"           // Live on site, indexed
  | "staged"              // In CMS, not public
  | "pending-review"      // Needs owner approval
  | "draft";              // Work in progress

/**
 * Confidence level for verification workflow
 */
export type ConfidenceLevel =
  | "verified-imported-sold"    // We have imported/sold this part
  | "verified-researched"       // Manually researched and confirmed
  | "high-confidence"           // Strong evidence from multiple sources
  | "medium-confidence"         // Single source or partial match
  | "low-confidence"            // Needs verification
  | "unverified";               // No verification yet

/**
 * Equipment type for machine classification
 */
export type EquipmentCategory =
  | "compact-track-loader"
  | "mini-excavator"
  | "excavator"
  | "skid-steer"
  | "dozer"
  | "crawler-carrier"
  | "directional-drill"
  | "tracked-equipment";  // Generic fallback

// ============================================================================
// MASTER PART RECORD INTERFACE
// ============================================================================

/**
 * The complete master record for any undercarriage part.
 * This interface supports ALL current and future use cases.
 */
export interface MasterUndercarriagePart {
  // ========== IDENTIFICATION ==========
  /** Unique record ID (format: UP-XXXX) */
  record_id: string;
  
  /** Import batch identifier for tracking */
  import_batch: string;
  
  /** Priority for launch ordering (1 = highest) */
  launch_priority: number;
  
  // ========== PART INFORMATION ==========
  /** OEM brand (Kubota, CAT, Bobcat, etc.) */
  brand: string;
  
  /** Part category */
  part_category: PartCategory;
  
  /** Part subtype for specificity */
  part_subtype: PartSubtype;
  
  /** Primary part number (main identifier) */
  primary_part_number: string;
  
  /** Alternative part numbers (supersessions, variants) */
  alt_part_numbers: string[];
  
  /** Superseded part numbers (what this replaces) */
  superseded_part_numbers: string[];
  
  /** OEM equivalent reference */
  oem_equivalent: string;
  
  /** Human-readable product name */
  product_name: string;
  
  // ========== COMPATIBILITY ==========
  /** Raw text of compatible models (for display) */
  compatible_models_text: string;
  
  /** Parsed list of compatible model names */
  compatible_models: string[];
  
  /** Equipment type for this part */
  equipment_type: EquipmentCategory;
  
  /** Compatible track sizes */
  track_sizes: string[];
  
  /** Serial number ranges (if applicable) */
  serial_ranges: SerialRange[];
  
  // ========== TECHNICAL NOTES ==========
  /** Chassis/mount specific notes */
  chassis_mount_notes: string;
  
  /** Serial number notes */
  serial_notes: string;
  
  /** Position-specific notes (left/right, etc.) */
  position_notes: string;
  
  /** Installation notes */
  installation_notes: string;
  
  /** Wear indicator guidance */
  wear_indicators: string;
  
  /** Fitment notes for mechanics */
  fitment_notes: string;
  
  // ========== VERIFICATION ==========
  /** Confidence level */
  confidence: ConfidenceLevel;
  
  /** Has been imported by RTW */
  imported_by_rtw: boolean;
  
  /** Has been sold by RTW */
  sold_by_rtw: boolean;
  
  /** Owner approval status */
  owner_approved: boolean;
  
  /** Verification notes */
  verification_notes: string;
  
  /** Source URLs for verification */
  source_urls: string[];
  
  /** Date of last verification */
  last_verified: string;
  
  // ========== PUBLICATION ==========
  /** Current publish status */
  publish_status: PublishStatus;
  
  /** Should be indexed by search engines */
  index_status: boolean;
  
  /** Should appear in sitemap */
  sitemap_include: boolean;
  
  /** Date added to system */
  date_added: string;
  
  /** Date last modified */
  date_modified: string;
  
  // ========== SEO FIELDS (Auto-Generated) ==========
  /** URL slug (auto-generated if empty) */
  slug: string;
  
  /** SEO title (auto-generated from template if empty) */
  seo_title: string;
  
  /** H1 heading (auto-generated from template if empty) */
  seo_h1: string;
  
  /** Meta description (auto-generated from template if empty) */
  meta_description: string;
  
  /** Canonical URL type preference */
  canonical_type: "part" | "machine";
  
  // ========== INTERNAL LINKING ==========
  /** Related sprocket part IDs */
  related_sprockets: string[];
  
  /** Related roller part IDs */
  related_rollers: string[];
  
  /** Related idler part IDs */
  related_idlers: string[];
  
  /** Related carrier roller part IDs */
  related_carrier_rollers: string[];
  
  /** Related track size slugs */
  related_track_sizes: string[];
  
  // ========== PRICING (Optional - for future CMS) ==========
  /** Wholesale price tier */
  price_tier?: "economy" | "standard" | "premium";
  
  /** Has quantity pricing */
  has_quantity_pricing?: boolean;
  
  // ========== SUPPLIER DATA (Optional - for future enrichment) ==========
  /** Supplier SKU */
  supplier_sku?: string;
  
  /** Supplier name */
  supplier_name?: string;
  
  /** Lead time in days */
  lead_time_days?: number;
  
  /** Stock status */
  stock_status?: "in-stock" | "low-stock" | "out-of-stock" | "special-order";
}

/**
 * Serial number range for compatibility
 */
export interface SerialRange {
  prefix?: string;
  start?: string;
  end?: string;
  notes?: string;
}

// ============================================================================
// SEO TEMPLATE SYSTEM
// ============================================================================

/**
 * SEO templates for automatic generation.
 * Uses placeholders: {brand}, {model}, {part_number}, {component_type}
 */
export const SEO_TEMPLATES = {
  // Part page templates
  part_title: "{brand} {component_type} {part_number} | Wholesale Undercarriage Parts",
  part_h1: "{brand} {component_type} {part_number}",
  part_h2: "Compatible with {compatible_models_short}",
  part_meta: "In-stock {brand} {component_type} {part_number}. Wholesale undercarriage parts from Houston with nationwide shipping. Fits {compatible_models_short}.",
  
  // Machine-component page templates (PRIMARY SEO)
  machine_title: "{brand} {model} {component_type} Replacement | {component_plural} | Rubber Track Wholesale",
  machine_h1: "{brand} {model} {component_type}",
  machine_meta: "Find replacement {component_plural_lower} for your {brand} {model}. Premium quality undercarriage components with wholesale pricing. Houston warehouse with fast nationwide shipping.",
} as const;

/**
 * Component type display names for SEO
 */
export const COMPONENT_DISPLAY_MAP: Record<PartCategory, { singular: string; plural: string; url_path: string }> = {
  "roller": { singular: "Bottom Roller", plural: "Bottom Rollers", url_path: "bottom-rollers" },
  "sprocket": { singular: "Sprocket", plural: "Sprockets", url_path: "sprockets" },
  "idler": { singular: "Idler", plural: "Idlers", url_path: "idlers" },
  "carrier-roller": { singular: "Carrier Roller", plural: "Carrier Rollers", url_path: "carrier-rollers" },
};

// ============================================================================
// AUTOMATIC SEO GENERATION
// ============================================================================

/**
 * Generate SEO fields automatically from part data
 */
export function generatePartSEO(part: Partial<MasterUndercarriagePart>): {
  slug: string;
  seo_title: string;
  seo_h1: string;
  meta_description: string;
} {
  const brand = part.brand || "Unknown";
  const partNumber = part.primary_part_number || "";
  const category = part.part_category || "roller";
  const display = COMPONENT_DISPLAY_MAP[category];
  const componentType = display.singular;
  
  // Generate slug: brand-partnumber-componenttype
  const slug = part.slug || 
    `${brand}-${partNumber}-${category}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  
  // Get first 3 compatible models for short list
  const compatibleShort = (part.compatible_models || []).slice(0, 3).join(", ");
  const compatibleModelsShort = compatibleShort || "multiple models";
  
  // Generate SEO title
  const seo_title = part.seo_title ||
    SEO_TEMPLATES.part_title
      .replace("{brand}", brand)
      .replace("{component_type}", componentType)
      .replace("{part_number}", partNumber);
  
  // Generate H1
  const seo_h1 = part.seo_h1 ||
    SEO_TEMPLATES.part_h1
      .replace("{brand}", brand)
      .replace("{component_type}", componentType)
      .replace("{part_number}", partNumber);
  
  // Generate meta description
  const meta_description = part.meta_description ||
    SEO_TEMPLATES.part_meta
      .replace("{brand}", brand)
      .replace("{component_type}", componentType)
      .replace("{part_number}", partNumber)
      .replace("{compatible_models_short}", compatibleModelsShort);
  
  return { slug, seo_title, seo_h1, meta_description };
}

/**
 * Generate record ID for new imports
 */
export function generateRecordId(existingIds: string[]): string {
  const maxId = existingIds
    .map(id => parseInt(id.replace("UP-", ""), 10))
    .filter(n => !isNaN(n))
    .reduce((max, n) => Math.max(max, n), 0);
  
  return `UP-${String(maxId + 1).padStart(4, "0")}`;
}

// ============================================================================
// SLUG GENERATION & DEDUPLICATION
// ============================================================================

/**
 * Generate unique slug, handling duplicates
 */
export function generateUniqueSlug(
  part: Partial<MasterUndercarriagePart>,
  existingSlugs: Set<string>
): string {
  const baseSlug = generatePartSEO(part).slug;
  
  if (!existingSlugs.has(baseSlug)) {
    return baseSlug;
  }
  
  // Add disambiguator
  let counter = 2;
  let uniqueSlug = `${baseSlug}-${counter}`;
  while (existingSlugs.has(uniqueSlug)) {
    counter++;
    uniqueSlug = `${baseSlug}-${counter}`;
  }
  
  return uniqueSlug;
}

/**
 * Normalize part number for deduplication
 */
export function normalizePartNumber(partNumber: string): string {
  return partNumber
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

/**
 * Check if two parts are duplicates
 */
export function isDuplicatePart(
  part1: Partial<MasterUndercarriagePart>,
  part2: Partial<MasterUndercarriagePart>
): boolean {
  const norm1 = normalizePartNumber(part1.primary_part_number || "");
  const norm2 = normalizePartNumber(part2.primary_part_number || "");
  
  if (norm1 === norm2 && part1.brand === part2.brand) {
    return true;
  }
  
  // Check alt part numbers
  const alts1 = (part1.alt_part_numbers || []).map(normalizePartNumber);
  const alts2 = (part2.alt_part_numbers || []).map(normalizePartNumber);
  
  if (alts1.includes(norm2) || alts2.includes(norm1)) {
    return true;
  }
  
  return false;
}

// ============================================================================
// VALIDATION
// ============================================================================

/**
 * Validation result for import
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate a part record before import
 */
export function validatePart(part: Partial<MasterUndercarriagePart>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Required fields
  if (!part.brand) errors.push("Missing required field: brand");
  if (!part.primary_part_number) errors.push("Missing required field: primary_part_number");
  if (!part.part_category) errors.push("Missing required field: part_category");
  
  // Valid part category
  const validCategories: PartCategory[] = ["roller", "sprocket", "idler", "carrier-roller"];
  if (part.part_category && !validCategories.includes(part.part_category)) {
    errors.push(`Invalid part_category: ${part.part_category}`);
  }
  
  // Valid publish status
  const validStatuses: PublishStatus[] = ["published", "staged", "pending-review", "draft"];
  if (part.publish_status && !validStatuses.includes(part.publish_status)) {
    errors.push(`Invalid publish_status: ${part.publish_status}`);
  }
  
  // Warnings
  if (!part.compatible_models || part.compatible_models.length === 0) {
    warnings.push("No compatible_models specified - part won't link to machines");
  }
  
  if (!part.confidence) {
    warnings.push("No confidence level specified - defaulting to 'unverified'");
  }
  
  if (part.publish_status === "published" && !part.owner_approved) {
    warnings.push("Part is published but owner_approved is false");
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

// ============================================================================
// INTERNAL LINKING HELPERS
// ============================================================================

/**
 * Map part category to undercarriage component URL path
 */
export function getComponentUrlPath(category: PartCategory): string {
  return COMPONENT_DISPLAY_MAP[category]?.url_path || "parts";
}

/**
 * Get related machine URLs for a part
 */
export function getRelatedMachineUrls(
  part: MasterUndercarriagePart,
  validMachines: Set<string>
): Array<{ brand: string; model: string; url: string }> {
  const results: Array<{ brand: string; model: string; url: string }> = [];
  const urlPath = getComponentUrlPath(part.part_category);
  
  for (const model of part.compatible_models) {
    const slug = `${part.brand}-${model}`.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    
    // Only include if machine exists in our data
    if (validMachines.has(slug)) {
      results.push({
        brand: part.brand,
        model,
        url: `/${urlPath}/${slug}`,
      });
    }
  }
  
  return results;
}

// ============================================================================
// FILTER HELPERS FOR PUBLICATION
// ============================================================================

/**
 * Filter parts by publish status
 */
export function filterByPublishStatus(
  parts: MasterUndercarriagePart[],
  status: PublishStatus
): MasterUndercarriagePart[] {
  return parts.filter(p => p.publish_status === status);
}

/**
 * Filter parts for public display (published + indexed)
 */
export function filterPublicParts(
  parts: MasterUndercarriagePart[]
): MasterUndercarriagePart[] {
  return parts.filter(p => 
    p.publish_status === "published" && 
    p.index_status === true
  );
}

/**
 * Filter parts for sitemap inclusion
 */
export function filterSitemapParts(
  parts: MasterUndercarriagePart[]
): MasterUndercarriagePart[] {
  return parts.filter(p => 
    p.publish_status === "published" && 
    p.sitemap_include === true
  );
}

/**
 * Filter parts by confidence level
 */
export function filterByConfidence(
  parts: MasterUndercarriagePart[],
  minConfidence: ConfidenceLevel
): MasterUndercarriagePart[] {
  const confidenceOrder: ConfidenceLevel[] = [
    "verified-imported-sold",
    "verified-researched",
    "high-confidence",
    "medium-confidence",
    "low-confidence",
    "unverified",
  ];
  
  const minIndex = confidenceOrder.indexOf(minConfidence);
  
  return parts.filter(p => {
    const partIndex = confidenceOrder.indexOf(p.confidence);
    return partIndex <= minIndex;
  });
}

// ============================================================================
// CSV COLUMN MAPPING
// ============================================================================

/**
 * CSV column names for master template export/import
 */
export const CSV_COLUMNS = [
  // Identification
  "record_id",
  "import_batch",
  "launch_priority",
  
  // Part Information
  "brand",
  "part_category",
  "part_subtype",
  "primary_part_number",
  "alt_part_numbers",           // Pipe-delimited: "PN1|PN2|PN3"
  "superseded_part_numbers",    // Pipe-delimited
  "oem_equivalent",
  "product_name",
  
  // Compatibility
  "compatible_models_text",
  "compatible_models",          // Pipe-delimited: "SVL75|SVL90|SVL95"
  "equipment_type",
  "track_sizes",                // Pipe-delimited: "320x86x52|380x86x52"
  "serial_ranges",              // JSON: [{"start":"123","end":"456"}]
  
  // Technical Notes
  "chassis_mount_notes",
  "serial_notes",
  "position_notes",
  "installation_notes",
  "wear_indicators",
  "fitment_notes",
  
  // Verification
  "confidence",
  "imported_by_rtw",            // YES/NO
  "sold_by_rtw",                // YES/NO
  "owner_approved",             // YES/NO
  "verification_notes",
  "source_urls",                // Pipe-delimited
  "last_verified",              // ISO date
  
  // Publication
  "publish_status",
  "index_status",               // YES/NO
  "sitemap_include",            // YES/NO
  "date_added",                 // ISO date
  "date_modified",              // ISO date
  
  // SEO (Auto-generated if empty)
  "slug",
  "seo_title",
  "seo_h1",
  "meta_description",
  "canonical_type",
  
  // Internal Linking
  "related_sprockets",          // Pipe-delimited record IDs
  "related_rollers",            // Pipe-delimited record IDs
  "related_idlers",             // Pipe-delimited record IDs
  "related_carrier_rollers",    // Pipe-delimited record IDs
  "related_track_sizes",        // Pipe-delimited slugs
  
  // Optional Pricing
  "price_tier",
  "has_quantity_pricing",       // YES/NO
  
  // Optional Supplier
  "supplier_sku",
  "supplier_name",
  "lead_time_days",
  "stock_status",
] as const;

export type CsvColumnName = typeof CSV_COLUMNS[number];
