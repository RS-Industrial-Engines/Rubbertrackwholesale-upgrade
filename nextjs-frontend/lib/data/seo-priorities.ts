/**
 * SEO Priority Data - Based on Real Sales Data
 * 
 * IMPORTANT ARCHITECTURE:
 * - This file stores ONLY sales priority rankings and machine identifiers
 * - DO NOT hardcode track sizes for machines here
 * - The AUTHORITATIVE source for track sizes is: lib/data/full-machine-data.ts
 * - Components must look up track sizes from full-machine-data.ts
 */

// Top 12 selling track sizes (from real sales data)
// This is purely ranking data - no machine associations
export const TOP_SELLING_TRACK_SIZES = [
  { rank: 1, size: "400x86x52", description: "Most popular CTL size" },
  { rank: 2, size: "300x52.5x80", description: "Top mini excavator size" },
  { rank: 3, size: "320x86x49", description: "Mid-size CTL standard" },
  { rank: 4, size: "450x86x58", description: "Large CTL size" },
  { rank: 5, size: "450x86x60", description: "Large CTL extended" },
  { rank: 6, size: "320x86x52", description: "Compact CTL size" },
  { rank: 7, size: "400x72.5x74", description: "Mini excavator wide" },
  { rank: 8, size: "350x54.5x86", description: "Mini excavator standard" },
  { rank: 9, size: "300x52.5x84", description: "Mini excavator extended" },
  { rank: 10, size: "320x86x50", description: "Compact CTL alternate" },
  { rank: 11, size: "450x86x56", description: "Large CTL alternate" },
  { rank: 12, size: "400x86x53", description: "CTL alternate pitch" },
] as const;

/**
 * High-priority machine models for SEO focus.
 * ONLY brand and model identifiers - NO track sizes.
 * Track sizes must be looked up from full-machine-data.ts
 * 
 * PRIORITY ORDER: CTLs first (what customers search for most), then mini excavators.
 * Based on high-demand commercial machines from SEO clusters.
 * 
 * TOP 16 MACHINES (positions 0-15):
 * Used on homepage "Popular Machine Models" and /rubber-tracks "Popular Rubber Tracks by Machine"
 * Both pages show these in EXACT same order for SEO consistency.
 */
export const HIGH_PRIORITY_MACHINES = [
  // ========== TOP 16 PRIORITY: Shared between homepage & /rubber-tracks ==========
  // These 16 machines appear in exact order on both pages for consistency
  // Order: Kubota SVL → CAT → Bobcat → John Deere → Mini Excavators
  
  // Kubota SVL Series (6)
  { brand: "Kubota", model: "SVL75" },
  { brand: "Kubota", model: "SVL75-2" },
  { brand: "Kubota", model: "SVL75-3" },
  { brand: "Kubota", model: "SVL95" },    // Added: before SVL95-2
  { brand: "Kubota", model: "SVL95-2" },
  { brand: "Kubota", model: "SVL97-2" },
  
  // CAT CTLs (4)
  { brand: "CAT", model: "259D" },
  { brand: "CAT", model: "259D3" },
  { brand: "CAT", model: "289D" },
  { brand: "CAT", model: "299D2" },
  
  // Bobcat CTLs (2)
  { brand: "Bobcat", model: "T650" },
  { brand: "Bobcat", model: "T770" },
  
  // John Deere CTLs (1)
  { brand: "John Deere", model: "325G" },
  
  // Mini Excavators (2) - complete the 16
  { brand: "Kubota", model: "KX121-3" },
  { brand: "Bobcat", model: "E35" },
  // 16th slot: Another high-demand model to fill grid
  { brand: "Bobcat", model: "E32" },
  
  // ========== SECONDARY PRIORITY: Additional high-demand machines ==========
  // John Deere CTL (moved from top 16)
  { brand: "John Deere", model: "333G" },
  
  // Kubota SVL variants
  { brand: "Kubota", model: "SVL 95" },
  { brand: "Kubota", model: "SVL65-2" },
  { brand: "Kubota", model: "SVL75-2C" },
  { brand: "Kubota", model: "SVL 90" },
  { brand: "Kubota", model: "SVL90-2" },
  { brand: "Kubota", model: "SVL95-2S" },
  
  // Additional CAT models
  { brand: "CAT", model: "299D" },
  { brand: "CAT", model: "299D3" },
  { brand: "CAT", model: "239D" },
  { brand: "CAT", model: "249D" },
  { brand: "CAT", model: "249D3" },
  { brand: "CAT", model: "259B" },
  { brand: "CAT", model: "259B3" },
  { brand: "CAT", model: "259C" },
  { brand: "CAT", model: "279C" },
  { brand: "CAT", model: "279D" },
  { brand: "CAT", model: "279D3" },
  { brand: "CAT", model: "289C" },
  { brand: "CAT", model: "289D3" },
  { brand: "CAT", model: "299C" },
  
  // Additional Bobcat models
  { brand: "Bobcat", model: "T630" },
  { brand: "Bobcat", model: "T870" },
  { brand: "Bobcat", model: "T590" },
  { brand: "Bobcat", model: "T595" },
  { brand: "Bobcat", model: "T180" },
  { brand: "Bobcat", model: "T190" },
  { brand: "Bobcat", model: "T200" },
  { brand: "Bobcat", model: "T550" },
  { brand: "Bobcat", model: "T570" },
  { brand: "Bobcat", model: "T740" },
  { brand: "Bobcat", model: "T830" },
  
  // Additional John Deere models
  { brand: "John Deere", model: "331G" },
  { brand: "John Deere", model: "317G" },
  { brand: "John Deere", model: "319E" },
  { brand: "John Deere", model: "323D" },
  { brand: "John Deere", model: "323E" },
  { brand: "John Deere", model: "325" },
  { brand: "John Deere", model: "328" },
  { brand: "John Deere", model: "CT319D" },
  { brand: "John Deere", model: "CT319E" },
  { brand: "John Deere", model: "CT322" },
  { brand: "John Deere", model: "CT323D" },
  { brand: "John Deere", model: "CT323E" },
  { brand: "John Deere", model: "CT329D" },
  { brand: "John Deere", model: "CT333D" },
  { brand: "John Deere", model: "CT333E" },
  
  // Takeuchi
  { brand: "Takeuchi", model: "TL10V2" },
  { brand: "Takeuchi", model: "TL12V2" },
  { brand: "Takeuchi", model: "TL6" },
  { brand: "Takeuchi", model: "TL8" },
  { brand: "Takeuchi", model: "TL10" },
  { brand: "Takeuchi", model: "TL12" },
  { brand: "Takeuchi", model: "TL12R2" },
  
  // ========== TERTIARY: Mini Excavators ==========
  { brand: "Kubota", model: "KX040-4" },
  
  { brand: "Kubota", model: "KX042-4" },
  { brand: "Kubota", model: "KX057-4" },
  { brand: "Kubota", model: "KX080-4" },
  { brand: "Kubota", model: "KX91-3" },
  { brand: "Kubota", model: "KX71-3" },
  { brand: "Kubota", model: "KX161-3" },
  { brand: "Kubota", model: "KX030" },
  { brand: "Kubota", model: "KX033" },
  { brand: "Kubota", model: "U25" },
  { brand: "Kubota", model: "U25-3" },
  { brand: "Kubota", model: "U25-3G" },
  { brand: "Kubota", model: "U35-4" },
  { brand: "Kubota", model: "U45" },
  { brand: "Kubota", model: "U55" },
  { brand: "Kubota", model: "U55-4" },
  
  { brand: "CAT", model: "303.5E2 CR" },
  { brand: "CAT", model: "304E2 CR" },
  { brand: "CAT", model: "305E2 CR" },
  { brand: "CAT", model: "308E2 CR" },
  
  { brand: "Bobcat", model: "E32" },
  { brand: "Bobcat", model: "E42" },
  { brand: "Bobcat", model: "E50" },
  { brand: "Bobcat", model: "E55" },
  { brand: "Bobcat", model: "331" },
  { brand: "Bobcat", model: "334" },
  
  { brand: "John Deere", model: "27D" },
  { brand: "John Deere", model: "35G" },
  { brand: "John Deere", model: "50D" },
  { brand: "John Deere", model: "50G" },
  { brand: "John Deere", model: "60D" },
  { brand: "John Deere", model: "60G" },
  
  { brand: "Takeuchi", model: "TB045" },
  { brand: "Takeuchi", model: "TB145" },
  { brand: "Takeuchi", model: "TB250" },
  
  // ========== OTHER IMPORTANT OEMs ==========
  { brand: "JCB", model: "180T" },
  { brand: "JCB", model: "190T" },
  
  { brand: "CASE", model: "CX27" },
  { brand: "CASE", model: "TR270" },
  { brand: "CASE", model: "TR320" },
  
  { brand: "New Holland", model: "LS180" },
  { brand: "New Holland", model: "LS190" },
  { brand: "New Holland", model: "C232" },
  
  { brand: "GEHL", model: "6635" },
  { brand: "GEHL", model: "6640" },
  
  { brand: "Mustang", model: "1650RT" },
  { brand: "Mustang", model: "2500RT" },
  
  { brand: "ASV", model: "RT-75" },
  { brand: "ASV", model: "RT-120" },
  { brand: "ASV", model: "VT-100" },
  
  { brand: "Komatsu", model: "PC27" },
  { brand: "Komatsu", model: "PC27MR" },
  { brand: "Komatsu", model: "PC28" },
  { brand: "Komatsu", model: "PC40MR" },
  { brand: "Komatsu", model: "PC45MR" },
  { brand: "Komatsu", model: "SK1020" },
  
  { brand: "Kobelco", model: "SK27SR-3" },
  { brand: "Kobelco", model: "SK50" },
  
  { brand: "Hitachi", model: "ZX27-3" },
] as const;

// Type for a priority machine
export type PriorityMachine = (typeof HIGH_PRIORITY_MACHINES)[number];

// Helper to check if a machine is high priority
export function isHighPriorityMachine(brand: string, model: string): boolean {
  const normalizedBrand = brand.toLowerCase().trim();
  const normalizedModel = model.toLowerCase().trim();
  
  return HIGH_PRIORITY_MACHINES.some(
    (m) => 
      m.brand.toLowerCase() === normalizedBrand && 
      m.model.toLowerCase() === normalizedModel
  );
}

// Get top 10 track size strings (for use in components)
export function getTop10TrackSizeStrings(): string[] {
  return TOP_SELLING_TRACK_SIZES.slice(0, 10).map(t => t.size);
}

// Get top 12 track size strings
export function getTop12TrackSizeStrings(): string[] {
  return TOP_SELLING_TRACK_SIZES.map(t => t.size);
}
