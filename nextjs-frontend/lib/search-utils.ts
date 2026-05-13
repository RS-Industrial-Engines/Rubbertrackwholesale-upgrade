/**
 * Search utilities for parsing and routing search queries
 * Handles track sizes, machine models, brands, and part numbers
 */

import { API } from "./api";
import { fullBrands, normalizeForMatching, BRAND_ALIASES, resolveBrandAlias } from "./data/full-machine-data";
import { normalizeTrackSize as centralNormalizeTrackSize } from "./url-utils";

// Extended brand aliases for detection
export const SEARCH_BRAND_ALIASES: Record<string, string> = {
  // Caterpillar
  cat: "CAT",
  caterpillar: "CAT",
  // John Deere
  deere: "John Deere",
  "john deere": "John Deere",
  johndeere: "John Deere",
  jd: "John Deere",
  // Case
  case: "CASE",
  "case ih": "CASE",
  caseih: "CASE",
  // Toro/Dingo
  dingo: "Toro",
  "toro dingo": "Toro",
  toro: "Toro",
  // New Holland
  "new holland": "New Holland",
  newholland: "New Holland",
  nh: "New Holland",
  // Ditch Witch
  "ditch witch": "Ditch Witch",
  ditchwitch: "Ditch Witch",
  "ditch-witch": "Ditch-Witch",
  dw: "Ditch-Witch",
  // Wacker Neuson
  wacker: "Wacker Neuson",
  neuson: "Wacker Neuson",
  "wacker neuson": "Wacker Neuson",
  // Others - direct mapping
  kubota: "Kubota",
  bobcat: "Bobcat",
  takeuchi: "Takeuchi",
  hitachi: "Hitachi",
  komatsu: "Komatsu",
  kobelco: "Kobelco",
  yanmar: "Yanmar",
  ihi: "IHI",
  gehl: "Gehl",
  mustang: "Mustang",
  jcb: "JCB",
  volvo: "Volvo",
  hyundai: "Hyundai",
  terex: "Terex",
  asv: "ASV",
  vermeer: "Vermeer",
  boxer: "Boxer",
  sany: "SANY",
  xcmg: "XCMG",
  nagano: "Nagano",
  airman: "Airman",
  morooka: "Morooka",
  marooka: "Morooka",
  sumitomo: "Sumitomo",
  hanix: "Hanix",
  hinowa: "Hinowa",
};

// Use the full brands list from comprehensive data
export const KNOWN_BRANDS = fullBrands;

export interface ParsedQuery {
  type: "track_size" | "machine" | "brand_only" | "model_only" | "keyword";
  trackSize?: string;
  make?: string;
  model?: string;
  originalQuery: string;
  normalizedQuery: string;
}

/**
 * Detect if a query looks like a track size
 * Formats: 400x86x52, 400 x 86 x 52, 300x52.5x80
 */
export function isTrackSizeQuery(query: string): boolean {
  const normalized = query.replace(/\s+/g, "").toLowerCase();
  // Match patterns like 400x86x52, 300x52.5x80
  return /^\d{2,4}x\d{2,4}\.?\d*x\d{2,4}$/i.test(normalized);
}

/**
 * Normalize a track size to standard format: 400x86x52
 * Re-exports from url-utils for backward compatibility
 */
export function normalizeTrackSize(size: string): string {
  return centralNormalizeTrackSize(size);
}

/**
 * Detect brand from query string using normalized matching
 */
export function detectBrand(query: string): { brand: string; remainder: string } | null {
  const queryLower = query.toLowerCase().trim();
  const queryNormalized = normalizeForMatching(query);
  
  // Try to match brand aliases (longest match first)
  const sortedAliases = Object.keys(SEARCH_BRAND_ALIASES).sort((a, b) => b.length - a.length);
  
  for (const alias of sortedAliases) {
    if (queryLower.startsWith(alias + " ") || queryLower === alias) {
      const brand = SEARCH_BRAND_ALIASES[alias];
      const remainder = query.slice(alias.length).trim();
      return { brand, remainder };
    }
  }
  
  // Try normalized matching against full brand list
  for (const brand of KNOWN_BRANDS) {
    const brandNormalized = normalizeForMatching(brand);
    if (queryNormalized.startsWith(brandNormalized)) {
      const brandEndPos = queryLower.indexOf(brand.toLowerCase());
      if (brandEndPos !== -1) {
        const remainder = query.slice(brandEndPos + brand.length).trim();
        return { brand, remainder };
      }
      // Use normalized length to find remainder
      const remainder = query.slice(brand.length).trim();
      return { brand, remainder };
    }
  }
  
  return null;
}

/**
 * Parse a search query and determine its type
 */
export function parseSearchQuery(query: string): ParsedQuery {
  const trimmed = query.trim();
  const normalized = trimmed.toLowerCase();
  
  // Check for track size first
  if (isTrackSizeQuery(trimmed)) {
    return {
      type: "track_size",
      trackSize: normalizeTrackSize(trimmed),
      originalQuery: trimmed,
      normalizedQuery: normalized,
    };
  }
  
  // Check for brand + model
  const brandMatch = detectBrand(trimmed);
  if (brandMatch) {
    if (brandMatch.remainder) {
      return {
        type: "machine",
        make: brandMatch.brand,
        model: brandMatch.remainder.toUpperCase(),
        originalQuery: trimmed,
        normalizedQuery: normalized,
      };
    } else {
      return {
        type: "brand_only",
        make: brandMatch.brand,
        originalQuery: trimmed,
        normalizedQuery: normalized,
      };
    }
  }
  
  // Check if query looks like a model number (alphanumeric, short)
  if (/^[a-zA-Z]{1,4}\d{2,5}[a-zA-Z]?$/i.test(trimmed) || /^\d{2,4}[a-zA-Z]{1,4}$/i.test(trimmed)) {
    return {
      type: "model_only",
      model: trimmed.toUpperCase(),
      originalQuery: trimmed,
      normalizedQuery: normalized,
    };
  }
  
  // Default to keyword search
  return {
    type: "keyword",
    originalQuery: trimmed,
    normalizedQuery: normalized,
  };
}

/**
 * Build API URL for compatibility search
 */
export function buildCompatibilitySearchUrl(parsed: ParsedQuery): string {
  const params = new URLSearchParams();
  
  switch (parsed.type) {
    case "track_size":
      if (parsed.trackSize) {
        params.set("track_size", parsed.trackSize);
      }
      break;
    case "machine":
      if (parsed.make) params.set("make", parsed.make);
      if (parsed.model) params.set("model", parsed.model);
      break;
    case "brand_only":
      if (parsed.make) params.set("make", parsed.make);
      break;
    case "model_only":
      if (parsed.model) params.set("model", parsed.model);
      break;
    default:
      // For keyword search, try model parameter
      params.set("model", parsed.originalQuery);
  }
  
  // Always include all results (don't filter by inventory)
  params.set("include_all", "true");
  
  return `${API.compatibilitySearch}?${params.toString()}`;
}

/**
 * Create a machine slug for URL
 */
export function createMachineSlug(make: string, model: string): string {
  return `${make.toLowerCase().replace(/\s+/g, "-")}-${model.toLowerCase().replace(/\s+/g, "-")}`;
}

/**
 * Format track size for display
 */
export function formatTrackSizeDisplay(size: string): string {
  // Convert 400x86x52 to 400 x 86 x 52
  return size.replace(/x/gi, " x ");
}
