/**
 * Universal search normalization utility
 * Handles spaces, hyphens, special characters, and case sensitivity
 * to ensure flexible search matching across all search components
 */

/**
 * Normalize a string for search comparison
 * Removes spaces, hyphens, and special characters, converts to lowercase
 * @param {string} str - String to normalize
 * @returns {string} - Normalized string
 */
export const normalizeForSearch = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/[\s\-_]/g, '') // Remove spaces, hyphens, underscores
    .replace(/[^\w]/g, '');   // Remove remaining special characters except alphanumeric
};

/**
 * Check if a normalized search term matches a normalized target string
 * @param {string} searchTerm - What the user is searching for
 * @param {string} targetString - The string to search in
 * @returns {boolean} - True if match found
 */
export const searchMatches = (searchTerm, targetString) => {
  if (!searchTerm || !targetString) return false;
  
  const normalizedSearch = normalizeForSearch(searchTerm);
  const normalizedTarget = normalizeForSearch(targetString);
  
  return normalizedTarget.includes(normalizedSearch);
};

/**
 * Enhanced search for items with make/model fields (for compatibility searches)
 * Handles brand+model combinations with flexible matching and normalization
 * @param {string} searchTerm - User search term
 * @param {Array} items - Array of items to search
 * @param {Function} getMakeField - Function to get the 'make' field from item
 * @param {Function} getModelField - Function to get the 'model' field from item
 * @returns {Array} - Filtered items
 */
export const searchMakeModel = (searchTerm, items, getMakeField, getModelField) => {
  if (!searchTerm || !items) return items;
  
  const searchLower = searchTerm.toLowerCase().trim();
  const normalizedSearch = normalizeForSearch(searchTerm);
  const searchWords = searchLower.split(/\s+/);
  
  return items.filter(item => {
    const make = (getMakeField(item) || '').toLowerCase();
    const model = (getModelField(item) || '').toLowerCase();
    const combined = `${make} ${model}`;
    
    // Normalized versions (no spaces, hyphens, special chars)
    const normalizedMake = normalizeForSearch(make);
    const normalizedModel = normalizeForSearch(model);
    const normalizedCombined = normalizeForSearch(combined);
    
    // Strategy 1: Direct normalized match (handles "svl75" vs "svl 75", "127-3807" vs "1273807")
    if (normalizedCombined.includes(normalizedSearch)) return true;
    if (normalizedMake.includes(normalizedSearch)) return true;
    if (normalizedModel.includes(normalizedSearch)) return true;
    
    // Strategy 2: Multi-word search with normalization
    if (searchWords.length > 1) {
      // Check if all search words (normalized) are present in combined string
      const allWordsMatch = searchWords.every(word => {
        const normalizedWord = normalizeForSearch(word);
        return normalizedCombined.includes(normalizedWord);
      });
      if (allWordsMatch) return true;
      
      // Check first word in make, remaining in model
      const firstWordNormalized = normalizeForSearch(searchWords[0]);
      const remainingWordsNormalized = normalizeForSearch(searchWords.slice(1).join(' '));
      
      if (normalizedMake.includes(firstWordNormalized) && 
          normalizedModel.includes(remainingWordsNormalized)) {
        return true;
      }
    }
    
    // Strategy 3: Original string matching (for cases where spaces matter)
    if (combined.includes(searchLower)) return true;
    
    return false;
  });
};

/**
 * Enhanced search for part numbers and generic strings
 * Handles part numbers with/without hyphens (e.g., "127-3807" vs "1273807")
 * @param {string} searchTerm - User search term
 * @param {string} targetString - String to search in
 * @returns {boolean} - True if match found
 */
export const searchPartNumber = (searchTerm, targetString) => {
  if (!searchTerm || !targetString) return false;
  
  const searchLower = searchTerm.toLowerCase().trim();
  const targetLower = targetString.toLowerCase().trim();
  
  // Direct match
  if (targetLower.includes(searchLower)) return true;
  
  // Normalized match (no spaces, hyphens, special chars)
  const normalizedSearch = normalizeForSearch(searchTerm);
  const normalizedTarget = normalizeForSearch(targetString);
  
  return normalizedTarget.includes(normalizedSearch);
};

/**
 * Multi-field search with normalization
 * Searches across multiple fields with flexible matching
 * @param {string} searchTerm - User search term
 * @param {Array<string>} fields - Array of strings to search in
 * @returns {boolean} - True if match found in any field
 */
export const searchMultipleFields = (searchTerm, fields) => {
  if (!searchTerm || !fields || fields.length === 0) return false;
  
  const normalizedSearch = normalizeForSearch(searchTerm);
  const searchLower = searchTerm.toLowerCase().trim();
  
  return fields.some(field => {
    if (!field) return false;
    
    const fieldLower = field.toLowerCase().trim();
    
    // Direct match
    if (fieldLower.includes(searchLower)) return true;
    
    // Normalized match
    const normalizedField = normalizeForSearch(field);
    return normalizedField.includes(normalizedSearch);
  });
};
