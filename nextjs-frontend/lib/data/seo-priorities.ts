/**
 * SEO Priority Data - Based on Real Sales Data
 * 
 * IMPORTANT ARCHITECTURE:
 * - This file stores ONLY sales priority rankings and machine identifiers
 * - DO NOT hardcode track sizes for machines here
 * - The AUTHORITATIVE source for track sizes is: lib/data/full-machine-data.ts
 * - Components must look up track sizes from full-machine-data.ts
 */

// Top 10 selling track sizes (from real sales data)
// This is purely ranking data - no machine associations
export const TOP_SELLING_TRACK_SIZES = [
  { rank: 1, size: "400x86x52", description: "Most popular CTL size" },
  { rank: 2, size: "300x52.5x80", description: "Top mini excavator size" },
  { rank: 3, size: "320x86x49", description: "Mid-size CTL standard" },
  { rank: 4, size: "450x86x58", description: "Large CTL size" },
  { rank: 5, size: "450x86x60", description: "Large CTL extended" },
  { rank: 6, size: "320x86x52", description: "Compact CTL size" },
  { rank: 7, size: "400x72.5x74", description: "Wide pitch CTL" },
  { rank: 8, size: "350x54.5x86", description: "Mini excavator wide" },
  { rank: 9, size: "300x52.5x84", description: "Mini excavator standard" },
  { rank: 10, size: "320x86x50", description: "Compact CTL alternate" },
] as const;

/**
 * High-priority machine models for SEO focus.
 * ONLY brand and model identifiers - NO track sizes.
 * Track sizes must be looked up from full-machine-data.ts
 */
export const HIGH_PRIORITY_MACHINES = [
  // Kubota CTLs - extremely popular
  { brand: "Kubota", model: "SVL 75 (Compact Track Loader)" },
  { brand: "Kubota", model: "SVL 75-2 (Compact Track Loader)" },
  { brand: "Kubota", model: "SVL 95-2 (Compact Track Loader)" },
  { brand: "Kubota", model: "SVL 97-2 (Compact Track Loader)" },
  
  // CAT CTLs - high commercial value
  { brand: "CAT", model: "259D" },
  { brand: "CAT", model: "259D3" },
  { brand: "CAT", model: "279D" },
  { brand: "CAT", model: "289D" },
  { brand: "CAT", model: "299D" },
  { brand: "CAT", model: "299D2" },
  
  // Bobcat CTLs - very popular
  { brand: "Bobcat", model: "T590" },
  { brand: "Bobcat", model: "T595" },
  { brand: "Bobcat", model: "T650" },
  { brand: "Bobcat", model: "T740" },
  { brand: "Bobcat", model: "T770" },
  { brand: "Bobcat", model: "T870" },
  
  // John Deere CTLs
  { brand: "John Deere", model: "317G" },
  { brand: "John Deere", model: "319E" },
  { brand: "John Deere", model: "325G" },
  { brand: "John Deere", model: "331G" },
  { brand: "John Deere", model: "333G" },
  
  // Takeuchi - strong commercial presence
  { brand: "Takeuchi", model: "TL6" },
  { brand: "Takeuchi", model: "TL8" },
  { brand: "Takeuchi", model: "TL10" },
  { brand: "Takeuchi", model: "TL12" },
  
  // ASV - premium track loaders
  { brand: "ASV", model: "RT-75" },
  { brand: "ASV", model: "RT-120" },
  { brand: "ASV", model: "VT-100" },
  
  // Mini Excavators - high volume
  { brand: "Kubota", model: "KX040-4" },
  { brand: "Kubota", model: "KX057-4" },
  { brand: "Kubota", model: "KX080-4" },
  { brand: "Kubota", model: "U35-4" },
  { brand: "Kubota", model: "U55-4" },
  
  { brand: "CAT", model: "303.5E2 CR" },
  { brand: "CAT", model: "304E2 CR" },
  { brand: "CAT", model: "305E2 CR" },
  { brand: "CAT", model: "308E2 CR" },
  
  { brand: "John Deere", model: "35G" },
  { brand: "John Deere", model: "50G" },
  { brand: "John Deere", model: "60G" },
  
  { brand: "Bobcat", model: "E35" },
  { brand: "Bobcat", model: "E42" },
  { brand: "Bobcat", model: "E50" },
  { brand: "Bobcat", model: "E55" },
] as const;

/**
 * Get the top-selling track size strings only.
 */
export function getTopSellingTrackSizes(): string[] {
  return TOP_SELLING_TRACK_SIZES.map(item => item.size);
}

/**
 * Get top 10 track sizes with rank and description.
 */
export function getTop10TrackSizes() {
  return TOP_SELLING_TRACK_SIZES;
}

/**
 * Check if a track size is in the top-selling list.
 */
export function isTopSellingTrackSize(size: string): boolean {
  const normalizedSize = size.toLowerCase().replace(/\s+/g, "");
  return TOP_SELLING_TRACK_SIZES.some(
    item => item.size.toLowerCase().replace(/\s+/g, "") === normalizedSize
  );
}

/**
 * Get SEO priority rank (1-10 for top sellers, 0 for others).
 */
export function getTrackSizePriorityRank(trackSize: string): number {
  const found = TOP_SELLING_TRACK_SIZES.find(
    item => item.size.toLowerCase() === trackSize.toLowerCase()
  );
  return found ? found.rank : 0;
}

/**
 * Check if a machine is high-priority for SEO.
 * Uses fuzzy matching to handle model name variations.
 */
export function isHighPriorityMachine(brand: string, model: string): boolean {
  const normalizedBrand = brand.toLowerCase();
  const normalizedModel = model.toLowerCase().replace(/[^a-z0-9]/g, "");
  
  return HIGH_PRIORITY_MACHINES.some(machine => {
    const machineBrand = machine.brand.toLowerCase();
    const machineModel = machine.model.toLowerCase().replace(/[^a-z0-9]/g, "");
    
    return machineBrand === normalizedBrand && 
           (machineModel === normalizedModel ||
            machineModel.includes(normalizedModel) ||
            normalizedModel.includes(machineModel.split(/[^a-z0-9]/)[0]));
  });
}

/**
 * Get high-priority machines by brand.
 */
export function getHighPriorityMachinesByBrand(brand: string) {
  return HIGH_PRIORITY_MACHINES.filter(
    m => m.brand.toLowerCase() === brand.toLowerCase()
  );
}
