/**
 * ============================================================================
 * MASTER UNDERCARRIAGE DATA SCHEMA
 * ============================================================================
 * 
 * STATUS: STAGED - Future architecture for scaling
 * 
 * This schema defines the comprehensive data structure for undercarriage parts.
 * It is NOT yet wired to public routes - see MIGRATION STATUS below.
 * 
 * CURRENT STATE (as of this commit):
 * ----------------------------------
 * - verified-parts-data.ts → ACTIVE (powers public site)
 * - undercarriage-master-schema.ts → STAGED (this file, future architecture)
 * 
 * MIGRATION STATUS:
 * -----------------
 * [ ] Import script tested with full dataset
 * [ ] master-undercarriage-data.ts generated
 * [ ] /parts/[slug] routes switched to master data
 * [ ] /parts index page switched to master data
 * [ ] Sitemap switched to master data
 * [ ] Machine/component pages use master enrichment
 * [ ] verified-parts-data.ts deprecated
 * 
 * ARCHITECTURE PRINCIPLES:
 * ------------------------
 * 1. Machine/component pages remain PRIMARY SEO entities
 *    - /bottom-rollers/kubota-svl75 (priority 0.8)
 *    - /sprockets/kubota-svl75 (priority 0.8)
 * 
 * 2. Part pages are SECONDARY detail pages
 *    - /parts/kubota-v0511-25104-bottom-roller (priority 0.6)
 * 
 * 3. All future imports use this same schema
 * 4. Automatic SEO generation from templates (with manual override support)
 * 5. Staged vs published workflow preserved
 * 6. Deduplication and governance rules enforced
 * 
 * DATA FLOW:
 * ----------
 * CSV Import → Validation → Normalization → TypeScript Data → Site Generation
 * 
 * IMPORT SCRIPT: scripts/import-master-undercarriage.js
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
  
  // ========== SEO FIELDS (Auto-Generated with Manual Override Support) ==========
  /** URL slug (auto-generated if empty, MANUAL OVERRIDE supported) */
  slug: string;
  
  /** SEO title (auto-generated from template if empty, MANUAL OVERRIDE for high-value pages) */
  seo_title: string;
  
  /** H1 heading (auto-generated from template if empty, MANUAL OVERRIDE supported) */
  seo_h1: string;
  
  /** H2 subheading (MANUAL OVERRIDE only - for high-value pages) */
  seo_h2?: string;
  
  /** Meta description (auto-generated from template if empty, MANUAL OVERRIDE supported) */
  meta_description: string;
  
  /** Canonical URL type preference - MACHINE pages remain primary SEO entities */
  canonical_type: "part" | "machine";
  
  /** Breadcrumb label override (for cleaner breadcrumb display) */
  breadcrumb_label?: string;
  
  /** Page intro/lede paragraph (MANUAL OVERRIDE for unique content) */
  page_intro?: string;
  
  /** Custom fitment notes for display (MANUAL OVERRIDE) */
  custom_fitment_notes?: string;
  
  // ========== CONTENT DEPTH FIELDS (For Semantic Authority) ==========
  /** Wear patterns and indicators */
  wear_patterns?: string;
  
  /** Replacement symptoms (when to replace) */
  replacement_symptoms?: string;
  
  /** Operating environments (terrain, conditions) */
  operating_environments?: string;
  
  /** Installation guidance (step-by-step or tips) */
  installation_guidance?: string;
  
  /** Maintenance notes and schedule */
  maintenance_notes?: string;
  
  /** OEM reference documentation */
  oem_references?: string;
  
  /** Terrain/application context */
  terrain_applications?: string;
  
  /** Expert tips and best practices */
  expert_tips?: string;
  
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
 * SEO GOVERNANCE RULES:
 * ---------------------
 * 1. Machine-component pages are PRIMARY SEO entities (/bottom-rollers/kubota-svl75)
 * 2. Part pages are SECONDARY detail pages (/parts/kubota-v0511-25104-bottom-roller)
 * 3. Auto-generation provides baseline SEO - MANUAL OVERRIDES for high-value pages
 * 4. Only published + indexed parts appear in sitemap
 * 5. Quality over quantity - not a mass page generation engine
 * 
 * HIGH-VALUE MACHINES requiring manual SEO overrides:
 * - Kubota SVL75, SVL95
 * - CAT 259D, 299D
 * - John Deere 333G, 331G
 * - Bobcat T650, T770
 * - Takeuchi TL12, TL10
 */
export const SEO_TEMPLATES = {
  // Part page templates (SECONDARY)
  part_title: "{brand} {component_type} {part_number} | Wholesale Undercarriage Parts",
  part_h1: "{brand} {component_type} {part_number}",
  part_h2: "Compatible with {compatible_models_short}",
  part_meta: "In-stock {brand} {component_type} {part_number}. Wholesale undercarriage parts from Houston with nationwide shipping. Fits {compatible_models_short}.",
  
  // Machine-component page templates (PRIMARY SEO - highest priority)
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
  
  // SEO (Auto-generated if empty, MANUAL OVERRIDE supported)
  "slug",
  "seo_title",
  "seo_h1",
  "seo_h2",                       // MANUAL OVERRIDE only
  "meta_description",
  "canonical_type",
  "breadcrumb_label",             // MANUAL OVERRIDE for cleaner display
  "page_intro",                   // MANUAL OVERRIDE for unique lede
  "custom_fitment_notes",         // MANUAL OVERRIDE for high-value pages
  
  // Content Depth (For Semantic Authority)
  "wear_patterns",
  "replacement_symptoms",
  "operating_environments",
  "installation_guidance",
  "maintenance_notes",
  "oem_references",
  "terrain_applications",
  "expert_tips",
  
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

// ============================================================================
// DEDUPLICATION RULES
// ============================================================================

/**
 * DEDUPLICATION HIERARCHY:
 * 1. brand + normalized_part_number (exact match)
 * 2. brand + part_category + compatible_models overlap (potential duplicate)
 * 3. alt_part_numbers cross-reference
 * 4. superseded_part_numbers cross-reference
 * 
 * Duplicates are NOT allowed to:
 * - Create separate pages for same part number
 * - Create near-identical machine/component combinations
 * - Dilute SEO authority across thin pages
 */
export interface DuplicateCheckResult {
  isDuplicate: boolean;
  duplicateOf?: string;       // record_id of original
  matchType?: "exact" | "alt" | "superseded" | "overlap";
  confidence: "certain" | "likely" | "possible";
}

/**
 * Generate dedupe key for a part (brand + normalized part number + category)
 */
export function generateDedupeKey(part: Partial<MasterUndercarriagePart>): string {
  const brand = (part.brand || "").toUpperCase().trim();
  const partNum = normalizePartNumber(part.primary_part_number || "");
  const category = part.part_category || "";
  return `${brand}::${partNum}::${category}`;
}

/**
 * Check for duplicates in a collection
 */
export function findDuplicates(
  newPart: Partial<MasterUndercarriagePart>,
  existingParts: MasterUndercarriagePart[]
): DuplicateCheckResult {
  const newKey = generateDedupeKey(newPart);
  const newNormalized = normalizePartNumber(newPart.primary_part_number || "");
  const newAlts = (newPart.alt_part_numbers || []).map(normalizePartNumber);
  
  for (const existing of existingParts) {
    // 1. Exact match
    const existingKey = generateDedupeKey(existing);
    if (newKey === existingKey) {
      return {
        isDuplicate: true,
        duplicateOf: existing.record_id,
        matchType: "exact",
        confidence: "certain",
      };
    }
    
    // 2. Alt part number cross-reference
    const existingAlts = (existing.alt_part_numbers || []).map(normalizePartNumber);
    const existingNormalized = normalizePartNumber(existing.primary_part_number);
    
    if (newAlts.includes(existingNormalized) || existingAlts.includes(newNormalized)) {
      return {
        isDuplicate: true,
        duplicateOf: existing.record_id,
        matchType: "alt",
        confidence: "certain",
      };
    }
    
    // 3. Superseded part number check
    const existingSuperseded = (existing.superseded_part_numbers || []).map(normalizePartNumber);
    const newSuperseded = (newPart.superseded_part_numbers || []).map(normalizePartNumber);
    
    if (existingSuperseded.includes(newNormalized) || newSuperseded.includes(existingNormalized)) {
      return {
        isDuplicate: true,
        duplicateOf: existing.record_id,
        matchType: "superseded",
        confidence: "certain",
      };
    }
    
    // 4. Same brand + category + significant model overlap (80%+ overlap)
    if (newPart.brand === existing.brand && newPart.part_category === existing.part_category) {
      const newModels = new Set(newPart.compatible_models || []);
      const existingModels = new Set(existing.compatible_models || []);
      
      if (newModels.size > 0 && existingModels.size > 0) {
        const intersection = [...newModels].filter(m => existingModels.has(m));
        const overlapPercent = intersection.length / Math.min(newModels.size, existingModels.size);
        
        if (overlapPercent >= 0.8) {
          return {
            isDuplicate: true,
            duplicateOf: existing.record_id,
            matchType: "overlap",
            confidence: "likely",
          };
        }
      }
    }
  }
  
  return { isDuplicate: false, confidence: "certain" };
}

// ============================================================================
// MODEL NAME NORMALIZATION
// ============================================================================

/**
 * NORMALIZATION RULES:
 * - SVL75, SVL 75, SVL-75 → SVL75
 * - KX040-4, KX040 4, KX0404 → KX040-4 (preserve meaningful hyphens)
 * - Remove equipment type suffixes: "(Compact Track Loader)", "(Mini Excavator)"
 * - Preserve serial suffix: -2, -2S, etc.
 * 
 * Public display remains clean: "SVL75" not "SVL 75 (Compact Track Loader)"
 */
export function normalizeModelName(model: string): string {
  let normalized = model
    // Remove equipment type descriptors in parentheses
    .replace(/\s*\([^)]*\)\s*/g, "")
    // Collapse internal spaces for certain patterns
    .replace(/([A-Z]{2,3})\s+(\d)/gi, "$1$2")  // SVL 75 → SVL75
    // Preserve meaningful hyphens (model variants like -2, -4)
    .replace(/\s+-/g, "-")
    .replace(/-\s+/g, "-")
    // Trim and collapse whitespace
    .trim()
    .replace(/\s+/g, " ");
  
  return normalized;
}

/**
 * Normalize model for matching (more aggressive - for lookups only)
 */
export function normalizeModelForMatching(model: string): string {
  return normalizeModelName(model)
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

// ============================================================================
// PUBLISH GOVERNANCE RULES
// ============================================================================

/**
 * PUBLISH GOVERNANCE:
 * - Only "published" + "index_status: true" pages enter sitemap
 * - staged/pending-review/draft pages are EXCLUDED from public site
 * - Low-confidence parts require owner_approved before publishing
 * - Duplicates/canonicalized pages NEVER enter sitemap
 * 
 * Page creation rules:
 * - verified-imported-sold → can auto-publish if owner_approved
 * - verified-researched → can auto-publish if owner_approved
 * - high-confidence → requires manual review before publish
 * - medium/low-confidence → requires enrichment before publish
 * - unverified → stays in staging, never published
 */
export function canAutoPublish(part: MasterUndercarriagePart): boolean {
  // Must have owner approval
  if (!part.owner_approved) return false;
  
  // Must be high confidence
  const autoPublishConfidences: ConfidenceLevel[] = [
    "verified-imported-sold",
    "verified-researched",
  ];
  
  if (!autoPublishConfidences.includes(part.confidence)) return false;
  
  // Must have minimum required fields
  if (!part.brand || !part.primary_part_number) return false;
  if (!part.compatible_models || part.compatible_models.length === 0) return false;
  
  return true;
}

/**
 * Check if part meets minimum quality for public display
 */
export function meetsPublishQuality(part: MasterUndercarriagePart): {
  meets: boolean;
  missing: string[];
} {
  const missing: string[] = [];
  
  // Required fields for any public page
  if (!part.brand) missing.push("brand");
  if (!part.primary_part_number) missing.push("primary_part_number");
  if (!part.part_category) missing.push("part_category");
  if (!part.compatible_models?.length) missing.push("compatible_models");
  if (!part.seo_title) missing.push("seo_title");
  if (!part.meta_description) missing.push("meta_description");
  
  // Quality checks
  if (part.confidence === "unverified") missing.push("verified_confidence");
  if (!part.owner_approved) missing.push("owner_approval");
  
  return {
    meets: missing.length === 0,
    missing,
  };
}

