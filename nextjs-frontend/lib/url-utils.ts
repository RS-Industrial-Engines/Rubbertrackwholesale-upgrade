/**
 * Machine URL Slug Utilities
 * 
 * Central helpers for creating clean, SEO-safe machine URLs.
 * All machine URLs should use these helpers for consistency.
 */

/**
 * Create a clean, SEO-safe machine slug from make and model.
 * 
 * Rules:
 * - No parentheses or equipment type descriptions
 * - No special characters except hyphens
 * - No double hyphens
 * - No spaces
 * - Normalized model numbers (e.g., "SVL 95" → "svl95", "KX 018-4" → "kx018-4")
 * 
 * Examples:
 * - createMachineSlug("Kubota", "SVL 95") → "kubota-svl95"
 * - createMachineSlug("Kubota", "SVL 95-2") → "kubota-svl95-2"
 * - createMachineSlug("Kubota", "KX 018-4") → "kubota-kx018-4"
 * - createMachineSlug("Kubota", "U-17") → "kubota-u17"
 * - createMachineSlug("CAT", "259D") → "cat-259d"
 * - createMachineSlug("John Deere", "333G") → "john-deere-333g"
 * - createMachineSlug("Kubota", "SVL 95 (Compact Track Loader)") → "kubota-svl95"
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
    // Remove brackets and their contents
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
    { prefix: "hyundai", categorical: "Hyundai" },
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
 */
export const BUSINESS_INFO = {
  phone: "346-438-6252",
  phoneFormatted: "(346) 438-6252",
  phoneTel: "tel:+13464386252",
  phoneInternational: "+1 346-438-6252",
  name: "Rubber Track Wholesale Houston",
  address: "7520 Eagle Pass St Suite-C, Houston, TX",
  city: "Houston",
  state: "TX",
  zipCode: "77012",
  country: "US",
  email: "info@rubbertrackwholesale.com",
};
