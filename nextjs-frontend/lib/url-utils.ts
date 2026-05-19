/**
 * Machine URL Slug Utilities
 * 
 * Central helpers for creating clean, SEO-safe machine URLs.
 * All machine URLs should use these helpers for consistency.
 */

/**
 * CENTRAL NORMALIZER: Strip Camso/descriptive track-only variants from machine names
 * 
 * This is the SINGLE SOURCE OF TRUTH for normalizing machine models for SEO purposes.
 * Guiding descriptors are track-fitment attributes ONLY - they must NOT appear in:
 * - Machine slugs, page URLs
 * - H1s, titles, canonical URLs
 * - Internal links, sitemap URLs
 * - Schema model names
 * 
 * Examples:
 * - "E35 [I guiding | M-series]" → "E35"
 * - "E35 [J guiding | R-series]" → "E35"
 * - "E32 [I guiding | M-series]" → "E32"
 * - "CX 36BMC[I guiding]" → "CX 36BMC"
 * - "CX 36B[J guiding]" → "CX 36B"
 * - "E60 [I guiding]" → "E60"
 * - "SVL 75 (Compact Track Loader)" → "SVL 75"
 */
export function normalizeMachineForSeoEntity(model: string): string {
  return model
    // Remove bracket descriptors (guiding variants): [I guiding], [J guiding | M-series], etc.
    .replace(/\s*\[[^\]]*\]/g, "")
    // Remove parentheses descriptors (equipment types): (Compact Track Loader), etc.
    .replace(/\s*\([^)]*\)/g, "")
    // Clean up any double spaces
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Get the base machine model for SEO deduplication.
 * Multiple guiding variants should map to the same base model.
 * 
 * Examples:
 * - "E35 [I guiding | M-series]" → "E35"
 * - "E35 [J guiding | R-series]" → "E35"
 * - "E35I [J guiding | R-series]" → "E35I" (note: E35I is a different base model)
 * - "CX 36BMC[I guiding]" → "CX36BMC"
 * - "CX 36BMC[J guiding]" → "CX36BMC"
 */
export function getBaseMachineModel(model: string): string {
  // First normalize to remove brackets/parens
  const normalized = normalizeMachineForSeoEntity(model);
  // Then normalize for comparison (removes spaces, hyphens, case)
  return normalized
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Create a clean, SEO-safe machine slug from make and model.
 * 
 * CRITICAL: Uses normalizeMachineForSeoEntity() to strip guiding variants.
 * Multiple guiding variants MUST produce the same slug.
 * 
 * Rules:
 * - No parentheses or equipment type descriptions
 * - No bracket guiding descriptors ([I guiding], [J guiding], etc.)
 * - No special characters except hyphens
 * - No double hyphens
 * - No spaces
 * - Normalized model numbers (e.g., "SVL 95" → "svl95", "KX 018-4" → "kx018-4")
 * 
 * Examples:
 * - createMachineSlug("Kubota", "SVL 95") → "kubota-svl95"
 * - createMachineSlug("Bobcat", "E35 [I guiding | M-series]") → "bobcat-e35"
 * - createMachineSlug("Bobcat", "E35 [J guiding | R-series]") → "bobcat-e35"
 * - createMachineSlug("CASE", "CX 36BMC[I guiding]") → "case-cx36bmc"
 * - createMachineSlug("CASE", "CX 36BMC[J guiding]") → "case-cx36bmc"
 */
export function createMachineSlug(make: string, model: string): string {
  // Normalize make: lowercase, replace spaces with hyphens
  const normalizedMake = make
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
  
  // Clean model:
  // 1. Remove parentheses and everything inside them (equipment type descriptors)
  // 2. Remove special characters except hyphens and alphanumerics
  // 3. Normalize model numbers by removing spaces between letters and numbers
  // 4. Handle hyphenated model suffixes (like -2, -3, -4)
  let normalizedModel = model
    .toLowerCase()
    .trim()
    // Remove parentheses and their contents
    .replace(/\s*\([^)]*\)/g, "")
    // Remove brackets and their contents (with or without leading space)
    .replace(/\s*\[[^\]]*\]/g, "")
    // Remove special characters except alphanumerics, hyphens, and spaces
    .replace(/[^a-z0-9\s-]/g, "")
    // Normalize spaces between letters/numbers in model (e.g., "SVL 95" → "SVL95")
    .replace(/([a-z]+)\s+(\d)/gi, "$1$2")
    .replace(/(\d)\s+([a-z]+)/gi, "$1$2")
    // Remove remaining spaces
    .replace(/\s+/g, "")
    // Remove double hyphens
    .replace(/-+/g, "-")
    // Remove leading/trailing hyphens
    .replace(/^-|-$/g, "")
    .trim();
  
  // Ensure we don't have double hyphens after combining
  return `${normalizedMake}-${normalizedModel}`.replace(/-+/g, "-");
}

/**
 * Check if a URL slug is "messy" and needs cleanup.
 * A messy slug contains parentheses, double hyphens, or equipment type descriptors.
 */
export function isMessySlug(slug: string): boolean {
  // Check for parentheses
  if (slug.includes("(") || slug.includes(")")) return true;
  // Check for brackets
  if (slug.includes("[") || slug.includes("]")) return true;
  // Check for double hyphens
  if (slug.includes("--")) return true;
  // Check for guiding descriptor residue (e.g., "e35iguiding", "e35jguiding", "cx36bmciguiding")
  // These patterns indicate bracket content wasn't stripped properly from source
  if (/[a-z0-9](i|j)guiding/i.test(slug)) return true;
  if (/guiding|mseries|rseries/i.test(slug)) return true;
  // Check for common equipment type keywords in the slug
  const messyPatterns = [
    "compact-track-loader",
    "mini-excavator",
    "excavator",
    "skid-steer",
    "track-loader",
    "crawler",
  ];
  for (const pattern of messyPatterns) {
    if (slug.toLowerCase().includes(pattern)) return true;
  }
  return false;
}

/**
 * Clean a potentially malformed slug by removing guiding/descriptor residue.
 * Used for redirect logic and fuzzy matching.
 * 
 * Examples:
 * - "bobcat-e35iguiding" → "bobcat-e35"
 * - "bobcat-e35iguidingmseries" → "bobcat-e35"
 * - "case-cx36bmciguiding" → "case-cx36bmc"
 * - "bobcat-e32jguidingrseries" → "bobcat-e32"
 */
export function cleanMalformedSlug(slug: string): string {
  return slug
    .toLowerCase()
    // Remove guiding descriptor patterns and everything after
    // Match: iguiding, jguiding, iguidingmseries, jguidingrseries, etc.
    .replace(/[ij]guiding.*$/i, "")
    // Remove any stray "guiding", "mseries", "rseries" that might remain
    .replace(/guiding/gi, "")
    .replace(/mseries/gi, "")
    .replace(/rseries/gi, "")
    // Clean up any trailing hyphens or double hyphens
    .replace(/-+/g, "-")
    .replace(/-$/g, "")
    .trim();
}

/**
 * Get the canonical (clean) slug from a potentially messy slug.
 * Used for redirect logic.
 */
export function getCanonicalSlug(messySlug: string, make: string, model: string): string {
  return createMachineSlug(make, model);
}

/**
 * Parse a machine slug to extract make and model.
 * Works with both clean and messy slugs.
 * 
 * Returns null if the slug cannot be parsed.
 */
export function parseMachineSlugClean(slug: string): { make: string; model: string } | null {
  // First, clean up the slug by removing parentheses content
  const cleanSlug = slug
    .toLowerCase()
    .replace(/\([^)]*\)/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .trim();
  
  if (!cleanSlug || cleanSlug.length < 2) return null;
  
  // Known brand prefixes (sorted by length descending for longest match first)
  const brandPrefixes: Array<{ prefix: string; canonical: string }> = [
    // Multi-word brands first (longest match)
    { prefix: "wacker-neuson", canonical: "Wacker Neuson" },
    { prefix: "john-deere", canonical: "John Deere" },
    { prefix: "new-holland", canonical: "New Holland" },
    { prefix: "ditch-witch", canonical: "Ditch Witch" },
    // Single-word brands
    { prefix: "caterpillar", canonical: "CAT" },
    { prefix: "kubota", canonical: "Kubota" },
    { prefix: "bobcat", canonical: "Bobcat" },
    { prefix: "takeuchi", canonical: "Takeuchi" },
    { prefix: "hitachi", canonical: "Hitachi" },
    { prefix: "komatsu", canonical: "Komatsu" },
    { prefix: "kobelco", canonical: "Kobelco" },
    { prefix: "yanmar", canonical: "Yanmar" },
    { prefix: "mustang", canonical: "Mustang" },
    { prefix: "terex", canonical: "Terex" },
    { prefix: "vermeer", canonical: "Vermeer" },
    { prefix: "hyundai", canonical: "Hyundai" },
    { prefix: "volvo", canonical: "Volvo" },
    { prefix: "sumitomo", canonical: "Sumitomo" },
    { prefix: "morooka", canonical: "Morooka" },
    { prefix: "nagano", canonical: "Nagano" },
    { prefix: "airman", canonical: "Airman" },
    { prefix: "hinowa", canonical: "Hinowa" },
    { prefix: "boxer", canonical: "Boxer" },
    { prefix: "hanix", canonical: "Hanix" },
    { prefix: "gehl", canonical: "Gehl" },
    { prefix: "case", canonical: "CASE" },
    { prefix: "sany", canonical: "SANY" },
    { prefix: "xcmg", canonical: "XCMG" },
    { prefix: "cat", canonical: "CAT" },
    { prefix: "asv", canonical: "ASV" },
    { prefix: "jcb", canonical: "JCB" },
    { prefix: "ihi", canonical: "IHI" },
  ];
  
  for (const { prefix, canonical } of brandPrefixes) {
    if (cleanSlug.startsWith(prefix + "-")) {
      const modelPart = cleanSlug.slice(prefix.length + 1);
      if (modelPart) {
        return {
          make: canonical,
          model: modelPart.toUpperCase(),
        };
      }
    }
  }
  
  return null;
}

/**
 * Generate the full machine URL path.
 */
export function getMachineUrl(make: string, model: string): string {
  return `/machines/${createMachineSlug(make, model)}`;
}

/**
 * Business contact information - centralized for consistency.
 * Must match Google Business Profile exactly.
 */
export const BUSINESS_INFO = {
  name: "Rubber Track Wholesale Houston",
  phone: "346-438-6252",
  phoneFormatted: "(346) 438-6252",
  phoneTel: "tel:+13464386252",
  phoneInternational: "+1 346-438-6252",
  phoneSchema: "+13464386252",
  address: {
    street: "7520 Eagle Pass St Suite-C",
    city: "Houston",
    state: "TX",
    zipCode: "77020",
    country: "US",
    full: "7520 Eagle Pass St Suite-C, Houston, TX 77020",
  },
  email: "info@rubbertrackwholesale.com",
  category: "Rubber products supplier",
  url: "https://rubbertrackwholesale.com",
  // Google Business Profile data
  aggregateRating: {
    ratingValue: "4.9",
    reviewCount: "31",
  },
  // Opening hours
  hours: {
    weekdays: { opens: "08:00", closes: "17:00" },
    saturday: { opens: "09:00", closes: "13:00" },
    sunday: null, // closed
  },
};
