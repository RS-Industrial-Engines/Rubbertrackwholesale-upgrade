/**
 * Staged Parts Feature Flags
 * 
 * These flags control the visibility and behavior of staged/researched parts
 * on public pages. They should be set to false before production launch
 * unless explicitly approved for public display.
 * 
 * GOVERNANCE RULES:
 * - Staged parts are research-based and require serial verification
 * - Staged parts must NOT create standalone /parts/[slug] pages
 * - Staged parts must NOT be included in sitemap
 * - Staged parts must NOT generate Product schema
 * - Staged parts must NOT show fake inventory/ratings/reviews
 * - Only promoted/approved rows become true public indexed products
 */

/**
 * When TRUE: Researched/staged parts appear on machine component pages
 * (e.g., /machines/bobcat-t190/bottom-roller)
 * 
 * When FALSE: Only fully verified/imported parts appear on component pages
 * 
 * DEFAULT: true (for QA/testing)
 * SET TO FALSE before production launch if staged data should be hidden
 */
export const SHOW_RESEARCHED_PARTS_ON_PUBLIC_COMPONENT_PAGES = true;

/**
 * When TRUE: Researched parts show the full alternate/interchange details
 * When FALSE: Shows simplified view with just primary part number
 */
export const SHOW_RESEARCHED_PART_DETAILS = true;

/**
 * When TRUE: Staged parts can potentially create /parts/[slug] pages
 * When FALSE: Staged parts are blocked from creating public part pages
 * 
 * DEFAULT: false - MUST remain false until parts are promoted to published status
 */
export const ALLOW_STAGED_PARTS_PUBLIC_PAGES = false;

/**
 * When TRUE: Staged parts can be included in sitemap
 * When FALSE: Staged parts are blocked from sitemap
 * 
 * DEFAULT: false - MUST remain false for staged data
 */
export const ALLOW_STAGED_PARTS_IN_SITEMAP = false;

/**
 * When TRUE: Staged parts can generate Product schema
 * When FALSE: Staged parts do not generate any schema markup
 * 
 * DEFAULT: false - MUST remain false for staged data
 */
export const ALLOW_STAGED_PARTS_PRODUCT_SCHEMA = false;

/**
 * When TRUE: Machine-component pages with verified/researched data are included in sitemap
 * When FALSE: All machine-component pages are included (may create thin content)
 * 
 * DEFAULT: true - Only include pages with actual part data
 */
export const REQUIRE_COMPONENT_DATA_FOR_SITEMAP = true;
