// ============================================================================
// PRICE RANGES — source of truth: RTW_Price_Ranges_per_size.xlsx
// Generated: 2026-06-13T18:54:31Z
// Formula: Low = Avg CIF x 1.70, High = Avg CIF x 2.40, rounded to nearest $5.
//
// DATA INTEGRITY RULES (do not violate):
//  - ONLY sizes in this file get a published price range + Product/Offer schema.
//    Every other size on the site stays QUOTE-ONLY (no price, no Offer).
//  - 3 width-variant collisions (N/W/Std share one base size string in machine
//    data) are MERGED to min(low)->max(high) so the published range covers every
//    variant a machine might take. The visible price and schema price come from
//    the SAME getPriceRange() call, so they can never disagree (Google penalizes
//    visible/schema price mismatch).
//  - To update prices: edit the spreadsheet, regenerate this file.
//
// Source rows: 47 priced variants -> 44 published base sizes.
// ============================================================================

export interface PriceRange {
  low: number;
  high: number;
}

/**
 * Normalize a track-size string to the lookup key used here.
 * Mirrors the size format in full-machine-data.ts: lowercase, "x" separators,
 * no spaces, unicode "×" folded to "x".
 */
export function normalizeSizeForPricing(size: string): string {
  return size.toLowerCase().replace(/×/g, "x").replace(/\s+/g, "");
}

// Keyed by normalized base size string.
const PRICE_RANGES: Record<string, PriceRange> = {
  "450x81.5x76": { low: 1485, high: 2100 },
  "450x81x76": { low: 1470, high: 2075 },
  "450x81x78": { low: 1450, high: 2045 },
  "381x101.6x42": { low: 1225, high: 1730 },
  "400x72.5x76": { low: 1220, high: 1720 },
  "400x72.5x72": { low: 1115, high: 1575 },
  "18x4x51": { low: 1070, high: 1510 },
  "400x72.5x74": { low: 1060, high: 1615 }, // variants: N, W
  "450x86x58": { low: 1060, high: 1495 },
  "450x86x60": { low: 1050, high: 1480 },
  "450x86x53": { low: 1045, high: 1475 },
  "450x86x55": { low: 1025, high: 1445 },
  "450x86x56": { low: 1025, high: 1445 },
  "450x100x50": { low: 990, high: 1400 },
  "450x86x52": { low: 985, high: 1390 },
  "450x100x48": { low: 975, high: 1390 }, // variants: N, Std
  "350x54.5x86": { low: 840, high: 1185 },
  "400x86x56": { low: 830, high: 1170 },
  "400x86x55": { low: 810, high: 1140 },
  "300x55x88": { low: 785, high: 1105 },
  "400x86x53": { low: 780, high: 1100 },
  "400x86x52": { low: 755, high: 1070 },
  "400x86x50": { low: 735, high: 1040 },
  "350x55x88": { low: 720, high: 1020 },
  "400x86x49": { low: 715, high: 1010 },
  "320x86x50": { low: 670, high: 945 },
  "320x86x53": { low: 670, high: 945 },
  "300x52.5x82": { low: 650, high: 920 },
  "320x86x49": { low: 640, high: 905 },
  "320x86x52": { low: 635, high: 900 },
  "300x52.5x88": { low: 600, high: 850 },
  "300x52.5x90": { low: 600, high: 850 },
  "300x52.5x86": { low: 590, high: 835 },
  "300x52.5x80": { low: 560, high: 790 },
  "300x52.5x78": { low: 560, high: 790 },
  "300x52.5x84": { low: 540, high: 810 }, // variants: N, W
  "300x52.5x74": { low: 510, high: 725 },
  "230x48x70": { low: 325, high: 460 },
  "230x72x44": { low: 320, high: 450 },
  "250x72x45": { low: 310, high: 440 },
  "180x72x45": { low: 250, high: 350 },
  "180x72x42": { low: 240, high: 340 },
  "180x72x39": { low: 225, high: 320 },
  "180x72x37": { low: 220, high: 315 },
};

// Alternate size formats that map to a canonical key (e.g. imperial<->metric duals).
const SIZE_ALIASES: Record<string, string> = {
  "457x101.6x51": "18x4x51",
};

/**
 * Returns the published price range for a track size, or null if the size is
 * quote-only (not in the priced set). Callers MUST treat null as "show no price,
 * emit no Offer schema."
 */
export function getPriceRange(size: string): PriceRange | null {
  if (!size) return null;
  const key = normalizeSizeForPricing(size);
  if (PRICE_RANGES[key]) return PRICE_RANGES[key];
  const aliased = SIZE_ALIASES[key];
  if (aliased && PRICE_RANGES[aliased]) return PRICE_RANGES[aliased];
  return null;
}

/**
 * Given a list of track sizes for a machine, returns the overall price range
 * spanning every PRICED size (min low -> max high), plus the count of priced
 * sizes. Sizes without pricing are ignored. Returns null if NONE are priced
 * (machine stays fully quote-only).
 */
export function getMachinePriceRange(sizes: string[]): { low: number; high: number; pricedCount: number } | null {
  const ranges = sizes.map(getPriceRange).filter((r): r is PriceRange => r !== null);
  if (ranges.length === 0) return null;
  return {
    low: Math.min(...ranges.map((r) => r.low)),
    high: Math.max(...ranges.map((r) => r.high)),
    pricedCount: ranges.length,
  };
}

/** True if this exact size has a published price (not quote-only). */
export function isPricedSize(size: string): boolean {
  return getPriceRange(size) !== null;
}
