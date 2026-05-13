// Script to generate comprehensive machine data from CSV
// Run with: node --env-file-if-exists=/vercel/share/.env.project scripts/generate-machine-data.js

const fs = require('fs');
const path = require('path');

const CSV_PATH = path.join(__dirname, '../../backend/compatibility_cleaned_UPDATED.csv');
const OUTPUT_PATH = path.join(__dirname, '../lib/data/full-machine-data.ts');

function parseCSV(content) {
  const lines = content.trim().split('\n');
  const headers = lines[0].split(',');
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    // Handle CSV parsing with potential commas in values
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());
    
    if (values.length >= 3) {
      data.push({
        make: values[0],
        model: values[1],
        trackSizes: values[2] || ''
      });
    }
  }
  
  return data;
}

function parseTrackSizes(trackSizesStr) {
  if (!trackSizesStr) return [];
  
  // Split by semicolon, pipe, or comma
  return trackSizesStr
    .split(/[;|,\/]/)
    .map(s => s.trim())
    .filter(s => s && s.length > 0)
    .map(s => {
      // Clean up the size - remove annotations like (Narrow), (N), etc.
      return s.replace(/\s*\(.*?\)\s*/g, '').trim();
    })
    .filter(s => s.length > 0);
}

function main() {
  console.log('Reading CSV from:', CSV_PATH);
  const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
  const rawData = parseCSV(csvContent);
  
  console.log(`Parsed ${rawData.length} rows from CSV`);
  
  // Group by brand
  const brandModels = {};
  const machineCompatibility = {};
  const allTrackSizes = new Set();
  
  for (const row of rawData) {
    const brand = row.make.trim();
    const model = row.model.trim();
    const trackSizes = parseTrackSizes(row.trackSizes);
    
    if (!brand || !model) continue;
    
    // Add to brand models
    if (!brandModels[brand]) {
      brandModels[brand] = [];
    }
    if (!brandModels[brand].includes(model)) {
      brandModels[brand].push(model);
    }
    
    // Add to compatibility
    const key = `${brand}|${model}`;
    machineCompatibility[key] = trackSizes;
    
    // Collect track sizes
    trackSizes.forEach(ts => allTrackSizes.add(ts));
  }
  
  // Sort brands and models
  const sortedBrands = Object.keys(brandModels).sort();
  for (const brand of sortedBrands) {
    brandModels[brand].sort();
  }
  
  // Generate TypeScript file
  const output = `// Auto-generated from compatibility_cleaned_UPDATED.csv
// Generated on: ${new Date().toISOString()}
// Total machines: ${rawData.length}
// Total brands: ${sortedBrands.length}
// Total track sizes: ${allTrackSizes.size}

/**
 * Normalize a value for matching (lowercase, remove all non-alphanumeric)
 * This allows matching:
 * - "KX018-4" == "KX 018-4" == "kx0184" == "kx 018 4"
 * - "U17" == "U-17" == "u 17"
 */
export function normalizeForMatching(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Check if two values match after normalization
 */
export function normalizedMatch(a: string, b: string): boolean {
  return normalizeForMatching(a) === normalizeForMatching(b);
}

/**
 * Check if a query matches a value (partial match after normalization)
 */
export function normalizedContains(value: string, query: string): boolean {
  return normalizeForMatching(value).includes(normalizeForMatching(query));
}

// Brand aliases for search
export const BRAND_ALIASES: Record<string, string[]> = {
  "cat": ["CAT", "Caterpillar"],
  "caterpillar": ["CAT", "Caterpillar"],
  "deere": ["John Deere"],
  "john deere": ["John Deere"],
  "nh": ["New Holland"],
  "new holland": ["New Holland"],
  "dw": ["Ditch-Witch", "Ditch Witch"],
  "ditch witch": ["Ditch-Witch", "Ditch Witch"],
  "ditch-witch": ["Ditch-Witch", "Ditch Witch"],
  "wacker": ["Wacker Neuson"],
  "wacker neuson": ["Wacker Neuson"],
  "jd": ["John Deere"],
};

/**
 * Resolve brand aliases
 */
export function resolveBrandAlias(brand: string): string[] {
  const normalized = brand.toLowerCase().trim();
  return BRAND_ALIASES[normalized] || [brand];
}

// All machine models grouped by brand
// Total: ${rawData.length} machines across ${sortedBrands.length} brands
export const fullMachineModels: Record<string, string[]> = ${JSON.stringify(brandModels, null, 2)};

// Machine to track size compatibility
// Key format: "Brand|Model"
export const fullMachineCompatibility: Record<string, string[]> = ${JSON.stringify(machineCompatibility, null, 2)};

// All unique track sizes
export const fullTrackSizes: string[] = ${JSON.stringify([...allTrackSizes].sort(), null, 2)};

// Get all brands sorted alphabetically
export const fullBrands: string[] = ${JSON.stringify(sortedBrands, null, 2)};

// Popular brands (prioritized for display)
export const popularBrands: string[] = [
  "Kubota",
  "Bobcat",
  "CAT",
  "John Deere",
  "Takeuchi",
  "CASE",
  "Komatsu",
  "Hitachi",
  "Yanmar",
  "New Holland",
  "JCB",
  "Kobelco",
  "Volvo",
  "Ditch-Witch",
  "Vermeer",
  "Wacker Neuson",
  "Mustang",
  "Gehl",
  "Terex",
  "ASV",
];

/**
 * Get models for a brand
 */
export function getModelsForBrand(brand: string): string[] {
  // Try exact match first
  if (fullMachineModels[brand]) {
    return fullMachineModels[brand];
  }
  
  // Try case-insensitive match
  const normalizedBrand = brand.toLowerCase();
  for (const [key, models] of Object.entries(fullMachineModels)) {
    if (key.toLowerCase() === normalizedBrand) {
      return models;
    }
  }
  
  // Try brand aliases
  const aliases = resolveBrandAlias(brand);
  for (const alias of aliases) {
    for (const [key, models] of Object.entries(fullMachineModels)) {
      if (key.toLowerCase() === alias.toLowerCase()) {
        return models;
      }
    }
  }
  
  return [];
}

/**
 * Get track sizes for a specific machine
 */
export function getTrackSizesForMachine(brand: string, model: string): string[] {
  // Try exact key
  const exactKey = \`\${brand}|\${model}\`;
  if (fullMachineCompatibility[exactKey]) {
    return fullMachineCompatibility[exactKey];
  }
  
  // Try normalized matching
  const normalizedBrand = normalizeForMatching(brand);
  const normalizedModel = normalizeForMatching(model);
  
  for (const [key, sizes] of Object.entries(fullMachineCompatibility)) {
    const [keyBrand, keyModel] = key.split('|');
    if (normalizeForMatching(keyBrand) === normalizedBrand &&
        normalizeForMatching(keyModel) === normalizedModel) {
      return sizes;
    }
  }
  
  return [];
}

/**
 * Search machines by query (brand, model, or both)
 * Uses aggressive normalization
 */
export function searchMachines(query: string): { brand: string; model: string; trackSizes: string[] }[] {
  const normalizedQuery = normalizeForMatching(query);
  const queryWords = query.toLowerCase().split(/\\s+/).filter(Boolean);
  const results: { brand: string; model: string; trackSizes: string[] }[] = [];
  
  for (const [key, sizes] of Object.entries(fullMachineCompatibility)) {
    const [brand, model] = key.split('|');
    const normalizedBrand = normalizeForMatching(brand);
    const normalizedModel = normalizeForMatching(model);
    const normalizedFull = normalizeForMatching(\`\${brand} \${model}\`);
    
    // Check various matching strategies
    let matches = false;
    
    // 1. Full normalized match
    if (normalizedFull.includes(normalizedQuery)) {
      matches = true;
    }
    
    // 2. Model only match (e.g., "KX018-4")
    if (!matches && normalizedModel.includes(normalizedQuery)) {
      matches = true;
    }
    
    // 3. Brand only match
    if (!matches && normalizedBrand.includes(normalizedQuery)) {
      matches = true;
    }
    
    // 4. All query words match (for "kubota svl75" etc.)
    if (!matches && queryWords.length > 1) {
      const fullLower = \`\${brand} \${model}\`.toLowerCase();
      const allWordsMatch = queryWords.every(word => {
        const normalizedWord = normalizeForMatching(word);
        return normalizedFull.includes(normalizedWord) ||
               fullLower.includes(word);
      });
      if (allWordsMatch) {
        matches = true;
      }
    }
    
    // 5. Check brand aliases
    if (!matches) {
      const aliases = resolveBrandAlias(queryWords[0] || '');
      for (const alias of aliases) {
        if (normalizedBrand === normalizeForMatching(alias)) {
          // Brand alias matches, check if model matches remaining query
          const remainingQuery = queryWords.slice(1).join('');
          if (!remainingQuery || normalizedModel.includes(normalizeForMatching(remainingQuery))) {
            matches = true;
            break;
          }
        }
      }
    }
    
    if (matches) {
      results.push({ brand, model, trackSizes: sizes });
    }
  }
  
  return results;
}

/**
 * Get machines compatible with a track size
 */
export function getMachinesForTrackSize(trackSize: string): { brand: string; model: string }[] {
  const normalizedSize = normalizeForMatching(trackSize);
  const results: { brand: string; model: string }[] = [];
  
  for (const [key, sizes] of Object.entries(fullMachineCompatibility)) {
    const [brand, model] = key.split('|');
    
    for (const size of sizes) {
      if (normalizeForMatching(size) === normalizedSize) {
        results.push({ brand, model });
        break;
      }
    }
  }
  
  return results;
}

/**
 * Get brand statistics
 */
export function getBrandStats(): { brand: string; modelCount: number }[] {
  return Object.entries(fullMachineModels)
    .map(([brand, models]) => ({
      brand,
      modelCount: models.length
    }))
    .sort((a, b) => b.modelCount - a.modelCount);
}

/**
 * Check if a query looks like a track size
 */
export function isTrackSizeQuery(query: string): boolean {
  // Track sizes follow patterns like: 400x86x52, 300x52.5x80
  const trackSizePattern = /^\\d{3}x\\d{2,3}\\.?\\d*x\\d{2,3}$/i;
  const normalized = query.replace(/[\\s-]/g, '');
  return trackSizePattern.test(normalized);
}
`;

  console.log('Writing output to:', OUTPUT_PATH);
  fs.writeFileSync(OUTPUT_PATH, output);
  
  console.log('\\nGeneration complete!');
  console.log('- Total brands:', sortedBrands.length);
  console.log('- Total machines:', rawData.length);
  console.log('- Total track sizes:', allTrackSizes.size);
  
  // Show top brands
  console.log('\\nTop 10 brands by model count:');
  const brandStats = Object.entries(brandModels)
    .map(([brand, models]) => ({ brand, count: models.length }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  for (const { brand, count } of brandStats) {
    console.log(`  ${brand}: ${count} models`);
  }
}

main();
