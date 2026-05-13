/**
 * SEO Priority Data - Based on Real Sales Data
 * 
 * Top-selling track sizes identify which MACHINE PAGES generate the most revenue.
 * These machines should receive:
 * - Homepage links
 * - Related machine links
 * - Blog links
 * - Stronger internal-link authority
 * - "Popular machine" placement
 */

// Top-selling track sizes (from real sales data)
export const TOP_SELLING_TRACK_SIZES = [
  "400x86x52",    // #1
  "300x52.5x80",  // #2
  "320x86x49",    // #3
  "450x86x58",    // #4
  "450x86x60",    // #5
  "320x86x52",    // #6
  "400x72.5x74",  // #7
  "350x54.5x86",  // #8
  "300x52.5x84",  // #9
  "320x86x50",    // #10
] as const;

// High-priority machine models based on commercial importance
// These are the "money machines" that should receive SEO prominence
export const HIGH_PRIORITY_MACHINES = [
  // Kubota CTLs - extremely popular
  { brand: "Kubota", model: "SVL75", trackSize: "320x86x52" },
  { brand: "Kubota", model: "SVL75-2", trackSize: "320x86x52" },
  { brand: "Kubota", model: "SVL95", trackSize: "400x86x52" },
  { brand: "Kubota", model: "SVL95-2", trackSize: "400x86x52" },
  { brand: "Kubota", model: "SVL97-2", trackSize: "400x86x56" },
  
  // CAT CTLs - high commercial value
  { brand: "CAT", model: "259D", trackSize: "400x86x49" },
  { brand: "CAT", model: "259D3", trackSize: "400x86x49" },
  { brand: "CAT", model: "279D", trackSize: "457x101.6x51" },
  { brand: "CAT", model: "289D", trackSize: "457x101.6x51" },
  { brand: "CAT", model: "299D", trackSize: "450x86x58" },
  { brand: "CAT", model: "299D2", trackSize: "450x86x60" },
  
  // Bobcat CTLs - very popular
  { brand: "Bobcat", model: "T590", trackSize: "320x86x49" },
  { brand: "Bobcat", model: "T595", trackSize: "320x86x52" },
  { brand: "Bobcat", model: "T650", trackSize: "400x86x49" },
  { brand: "Bobcat", model: "T740", trackSize: "400x86x52" },
  { brand: "Bobcat", model: "T770", trackSize: "450x86x58" },
  { brand: "Bobcat", model: "T870", trackSize: "450x86x58" },
  
  // John Deere CTLs
  { brand: "John Deere", model: "317G", trackSize: "320x86x52" },
  { brand: "John Deere", model: "319E", trackSize: "320x86x52" },
  { brand: "John Deere", model: "325G", trackSize: "320x86x52" },
  { brand: "John Deere", model: "331G", trackSize: "400x86x52" },
  { brand: "John Deere", model: "333G", trackSize: "450x86x58" },
  
  // Takeuchi - strong commercial presence
  { brand: "Takeuchi", model: "TL6", trackSize: "300x52.5x80" },
  { brand: "Takeuchi", model: "TL8", trackSize: "320x86x52" },
  { brand: "Takeuchi", model: "TL10", trackSize: "320x86x52" },
  { brand: "Takeuchi", model: "TL12", trackSize: "450x86x58" },
  
  // ASV - premium track loaders
  { brand: "ASV", model: "RT-75", trackSize: "400x86x52" },
  { brand: "ASV", model: "RT-120", trackSize: "457x101.6x51" },
  { brand: "ASV", model: "VT-100", trackSize: "457x101.6x51" },
  
  // Mini Excavators - high volume
  { brand: "Kubota", model: "KX040", trackSize: "300x52.5x80" },
  { brand: "Kubota", model: "KX057", trackSize: "400x72.5x74" },
  { brand: "Kubota", model: "KX080", trackSize: "450x81x76" },
  { brand: "Kubota", model: "U35", trackSize: "300x52.5x80" },
  { brand: "Kubota", model: "U55", trackSize: "400x72.5x74" },
  
  { brand: "CAT", model: "303.5", trackSize: "300x52.5x80" },
  { brand: "CAT", model: "304", trackSize: "300x52.5x80" },
  { brand: "CAT", model: "305", trackSize: "400x72.5x72" },
  { brand: "CAT", model: "308", trackSize: "450x81x76" },
  
  { brand: "John Deere", model: "35G", trackSize: "300x52.5x80" },
  { brand: "John Deere", model: "50G", trackSize: "400x72.5x74" },
  { brand: "John Deere", model: "60G", trackSize: "450x81x76" },
  
  { brand: "Bobcat", model: "E35", trackSize: "300x52.5x80" },
  { brand: "Bobcat", model: "E42", trackSize: "350x54.5x86" },
  { brand: "Bobcat", model: "E50", trackSize: "400x72.5x72" },
  { brand: "Bobcat", model: "E55", trackSize: "400x72.5x74" },
];

// Get top machines for a specific track size
export function getTopMachinesForTrackSize(trackSize: string): typeof HIGH_PRIORITY_MACHINES {
  return HIGH_PRIORITY_MACHINES.filter(m => m.trackSize === trackSize);
}

// Get all high-priority machines for homepage display
export function getHomepageFeaturedMachines(): typeof HIGH_PRIORITY_MACHINES {
  // Return a diverse mix of popular machines for homepage
  const featured = [
    HIGH_PRIORITY_MACHINES.find(m => m.brand === "Kubota" && m.model === "SVL95"),
    HIGH_PRIORITY_MACHINES.find(m => m.brand === "CAT" && m.model === "259D"),
    HIGH_PRIORITY_MACHINES.find(m => m.brand === "Bobcat" && m.model === "T770"),
    HIGH_PRIORITY_MACHINES.find(m => m.brand === "John Deere" && m.model === "333G"),
    HIGH_PRIORITY_MACHINES.find(m => m.brand === "Takeuchi" && m.model === "TL12"),
    HIGH_PRIORITY_MACHINES.find(m => m.brand === "Kubota" && m.model === "KX040"),
    HIGH_PRIORITY_MACHINES.find(m => m.brand === "CAT" && m.model === "305"),
    HIGH_PRIORITY_MACHINES.find(m => m.brand === "Bobcat" && m.model === "E50"),
  ].filter(Boolean) as typeof HIGH_PRIORITY_MACHINES;
  
  return featured;
}

// Get machines by brand for internal linking
export function getTopMachinesByBrand(brand: string): typeof HIGH_PRIORITY_MACHINES {
  return HIGH_PRIORITY_MACHINES.filter(m => m.brand.toLowerCase() === brand.toLowerCase());
}

// Check if a machine is high-priority for SEO
export function isHighPriorityMachine(brand: string, model: string): boolean {
  return HIGH_PRIORITY_MACHINES.some(
    m => m.brand.toLowerCase() === brand.toLowerCase() && 
         m.model.toLowerCase() === model.toLowerCase()
  );
}

// Check if a track size is in the top-selling list
export function isTopSellingTrackSize(trackSize: string): boolean {
  return TOP_SELLING_TRACK_SIZES.includes(trackSize as typeof TOP_SELLING_TRACK_SIZES[number]);
}

// Get SEO priority rank (1-10 for top sellers, 0 for others)
export function getTrackSizePriorityRank(trackSize: string): number {
  const index = TOP_SELLING_TRACK_SIZES.indexOf(trackSize as typeof TOP_SELLING_TRACK_SIZES[number]);
  return index >= 0 ? index + 1 : 0;
}
