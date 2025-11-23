/**
 * Brand name aliases and variations
 * Maps common search terms to actual database brand names
 */

export const BRAND_ALIASES = {
  // Caterpillar variations
  'caterpillar': 'CAT',
  'cat': 'CAT',
  
  // Case variations
  'case': 'CASE',
  'case ih': 'CASE',
  
  // Ditch Witch variations
  'ditch witch': 'Ditch-Witch',
  'ditchwitch': 'Ditch-Witch',
  'ditch-witch': 'Ditch-Witch',
  
  // John Deere variations
  'john deere': 'John Deere',
  'johndeere': 'John Deere',
  'deere': 'John Deere',
  'jd': 'John Deere',
  
  // New Holland variations
  'new holland': 'New Holland',
  'newholland': 'New Holland',
  'nh': 'New Holland',
  
  // Wacker Neuson variations
  'wacker neuson': 'Wacker Neuson',
  'wacker': 'Wacker Neuson',
  'neuson': 'Wacker Neuson',
  
  // Toro Dingo (if user adds it later)
  'toro': 'Toro Dingo',
  'dingo': 'Toro Dingo',
  'toro dingo': 'Toro Dingo',
  
  // Other common variations
  'bobcat': 'Bobcat',
  'kubota': 'Kubota',
  'komatsu': 'Komatsu',
  'takeuchi': 'Takeuchi',
  'yanmar': 'Yanmar',
  'hitachi': 'Hitachi',
  'hyundai': 'Hyundai',
  'volvo': 'Volvo',
  'doosan': 'Doosan',
  'kobelco': 'Kobelco',
  'asv': 'ASV',
  'terex': 'Terex',
  'gehl': 'Gehl',
  'mustang': 'Mustang',
  'vermeer': 'Vermeer',
  'ihi': 'IHI',
  'jcb': 'JCB',
};

/**
 * Normalize a brand name to match database
 * @param {string} brandName - User input brand name
 * @returns {string} - Normalized brand name
 */
export const normalizeBrandName = (brandName) => {
  if (!brandName) return brandName;
  
  const normalized = brandName.toLowerCase().trim();
  return BRAND_ALIASES[normalized] || brandName;
};

/**
 * Get all possible aliases for a brand
 * @param {string} brandName - Brand name
 * @returns {string[]} - Array of possible variations
 */
export const getBrandVariations = (brandName) => {
  const variations = [brandName];
  const normalized = brandName.toLowerCase().trim();
  
  // Add the normalized version
  variations.push(normalized);
  
  // Find all aliases that map to this brand
  Object.entries(BRAND_ALIASES).forEach(([alias, actualBrand]) => {
    if (actualBrand.toLowerCase() === normalized) {
      variations.push(alias);
    }
  });
  
  return [...new Set(variations)]; // Remove duplicates
};

/**
 * Enhanced search that handles brand aliases with space/hyphen normalization
 * @param {string} searchTerm - User search term
 * @param {Array} items - Array of items to search
 * @param {Function} getMakeField - Function to get the 'make' field from item
 * @param {Function} getModelField - Function to get the 'model' field from item
 * @returns {Array} - Filtered items
 */
export const searchWithBrandAliases = (searchTerm, items, getMakeField, getModelField) => {
  if (!searchTerm || !items) return items;
  
  const searchLower = searchTerm.toLowerCase().trim();
  const searchWords = searchLower.split(/\s+/);
  
  // Normalize search term (remove spaces, hyphens, special chars)
  const normalizeForSearch = (str) => {
    if (!str) return '';
    return str.toLowerCase().replace(/[\s\-_]/g, '').replace(/[^\w]/g, '');
  };
  
  const normalizedSearch = normalizeForSearch(searchTerm);
  
  return items.filter(item => {
    const make = (getMakeField(item) || '').toLowerCase();
    const model = (getModelField(item) || '').toLowerCase();
    const combined = `${make} ${model}`;
    
    // Normalized versions (no spaces, hyphens)
    const normalizedMake = normalizeForSearch(make);
    const normalizedModel = normalizeForSearch(model);
    const normalizedCombined = normalizeForSearch(combined);
    
    // Strategy 1: Normalized match (handles "svl75" vs "svl 75", "e70b" vs "e70 b")
    if (normalizedCombined.includes(normalizedSearch)) return true;
    if (normalizedMake.includes(normalizedSearch)) return true;
    if (normalizedModel.includes(normalizedSearch)) return true;
    
    // Strategy 2: Try direct match
    if (combined.includes(searchLower)) return true;
    
    // Strategy 3: Try with brand normalization
    const normalizedBrand = normalizeBrandName(searchWords[0]);
    if (normalizedBrand) {
      const normalizedBrandLower = normalizedBrand.toLowerCase();
      if (make.includes(normalizedBrandLower) || normalizedMake.includes(normalizeForSearch(normalizedBrandLower))) {
        // First word matched brand, check if remaining words match model
        if (searchWords.length === 1) return true;
        
        const remainingWords = searchWords.slice(1).join(' ');
        const normalizedRemainingWords = normalizeForSearch(remainingWords);
        
        if (model.includes(remainingWords) || normalizedModel.includes(normalizedRemainingWords)) {
          return true;
        }
      }
    }
    
    // Strategy 4: Multi-word flexible matching with normalization
    if (searchWords.length > 1) {
      // Check if all search words (normalized) are present
      const allWordsMatch = searchWords.every(word => {
        const normalizedWord = normalizeForSearch(word);
        return normalizedCombined.includes(normalizedWord);
      });
      if (allWordsMatch) return true;
      
      // Check first word in make, remaining in model (normalized)
      const firstWordNormalized = normalizeForSearch(searchWords[0]);
      const remainingWordsNormalized = normalizeForSearch(searchWords.slice(1).join(' '));
      
      if (normalizedMake.includes(firstWordNormalized) && normalizedModel.includes(remainingWordsNormalized)) {
        return true;
      }
    }
    
    return false;
  });
};
