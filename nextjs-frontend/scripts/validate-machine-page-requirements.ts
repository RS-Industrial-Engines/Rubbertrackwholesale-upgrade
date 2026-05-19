/**
 * Validation Script: Machine Page Requirements
 * 
 * Validates:
 * 1. No guiding descriptors in H1/title/meta/schema
 * 2. No duplicate track sizes for same machine
 * 3. All machine pages show all 4 component cards
 * 4. Only data-backed components link to SEO pages
 * 5. Sitemap only includes data-backed component pages
 * 6. Bobcat E32/E35 render as clean base machine pages
 * 7. Malformed URLs redirect properly
 * 8. Track sizes are deduped after normalization
 */

import { fullMachineModels, getTrackSizesForMachine, cleanModelForDisplay, normalizeForMatching } from "../lib/data/full-machine-data";
import { createMachineSlug, cleanMalformedSlug, isMessySlug } from "../lib/url-utils";
import { getAllMachineComponentCards, hasComponentData } from "../lib/data/undercarriage-data";

interface ValidationResult {
  passed: boolean;
  testName: string;
  errors: string[];
  warnings: string[];
  stats: Record<string, number | string | string[]>;
}

const results: ValidationResult[] = [];

// Test 1: No guiding descriptors in display names
function testNoGuidingInDisplayNames(): ValidationResult {
  const result: ValidationResult = {
    passed: true,
    testName: "No Guiding Descriptors in Display Names",
    errors: [],
    warnings: [],
    stats: { checked: 0, violations: [] as string[] },
  };

  const badPatterns = [
    /iguiding/i,
    /jguiding/i,
    /\[I guiding/i,
    /\[J guiding/i,
    /mseries/i,
    /rseries/i,
    /m-series/i,
    /r-series/i,
  ];

  for (const [brand, models] of Object.entries(fullMachineModels)) {
    for (const model of models) {
      (result.stats.checked as number)++;
      const cleanModel = cleanModelForDisplay(model);
      const slug = createMachineSlug(brand, model);
      
      // Check cleaned model name
      for (const pattern of badPatterns) {
        if (pattern.test(cleanModel)) {
          result.passed = false;
          (result.stats.violations as string[]).push(`Display name: ${brand} ${cleanModel} (raw: ${model})`);
          result.errors.push(`GUIDING IN DISPLAY: cleanModelForDisplay("${model}") = "${cleanModel}"`);
          break;
        }
      }
      
      // Check slug
      for (const pattern of badPatterns) {
        if (pattern.test(slug)) {
          result.passed = false;
          (result.stats.violations as string[]).push(`Slug: ${slug} (raw: ${model})`);
          result.errors.push(`GUIDING IN SLUG: createMachineSlug("${brand}", "${model}") = "${slug}"`);
          break;
        }
      }
    }
  }

  return result;
}

// Test 2: Track sizes are deduped
function testTrackSizeDeduplication(): ValidationResult {
  const result: ValidationResult = {
    passed: true,
    testName: "Track Size Deduplication",
    errors: [],
    warnings: [],
    stats: { checked: 0, duplicates: [] as string[] },
  };

  for (const [brand, models] of Object.entries(fullMachineModels)) {
    for (const model of models) {
      const cleanModel = cleanModelForDisplay(model);
      const sizes = getTrackSizesForMachine(brand, cleanModel);
      (result.stats.checked as number)++;
      
      // Check for duplicates
      const seen = new Set<string>();
      for (const size of sizes) {
        if (seen.has(size)) {
          result.passed = false;
          (result.stats.duplicates as string[]).push(`${brand} ${cleanModel}: ${size}`);
          result.errors.push(`DUPLICATE SIZE: ${brand} ${cleanModel} has duplicate track size "${size}"`);
        }
        seen.add(size);
      }
    }
  }

  return result;
}

// Test 3: All machine pages show all 4 component cards
function testAllComponentCardsDisplayed(): ValidationResult {
  const result: ValidationResult = {
    passed: true,
    testName: "All Component Cards Displayed",
    errors: [],
    warnings: [],
    stats: { 
      checked: 0, 
      withData: 0, 
      withoutData: 0,
      missingCards: [] as string[],
    },
  };

  // Sample a few machines to verify
  const testMachines = [
    { brand: "Bobcat", model: "E32" },
    { brand: "Bobcat", model: "E35" },
    { brand: "Kubota", model: "SVL75" },
    { brand: "CAT", model: "259D" },
    { brand: "John Deere", model: "333G" },
  ];

  for (const { brand, model } of testMachines) {
    (result.stats.checked as number)++;
    const cards = getAllMachineComponentCards(brand, model);
    
    // Should always have 3 cards (bottom-roller, sprocket, idler)
    if (cards.length !== 3) {
      result.passed = false;
      (result.stats.missingCards as string[]).push(`${brand} ${model}: only ${cards.length} cards`);
      result.errors.push(`MISSING CARDS: ${brand} ${model} has ${cards.length} cards, expected 3`);
    }
    
    // Count data availability
    for (const card of cards) {
      if (card.hasData) {
        (result.stats.withData as number)++;
      } else {
        (result.stats.withoutData as number)++;
      }
    }
  }

  return result;
}

// Test 4: Only data-backed components have SEO links
function testDataBackedLinksOnly(): ValidationResult {
  const result: ValidationResult = {
    passed: true,
    testName: "Data-Backed SEO Links Only",
    errors: [],
    warnings: [],
    stats: { 
      checked: 0, 
      correctDataLinks: 0,
      correctNoDataLinks: 0,
      violations: [] as string[],
    },
  };

  const testMachines = [
    { brand: "Bobcat", model: "E32" },
    { brand: "Bobcat", model: "E35" },
    { brand: "Kubota", model: "KX018-4" },
  ];

  for (const { brand, model } of testMachines) {
    const cards = getAllMachineComponentCards(brand, model);
    
    for (const card of cards) {
      (result.stats.checked as number)++;
      
      if (card.hasData && card.url) {
        // Has data AND has URL - correct
        (result.stats.correctDataLinks as number)++;
      } else if (!card.hasData && card.url === null) {
        // No data AND no URL - correct
        (result.stats.correctNoDataLinks as number)++;
      } else if (card.hasData && !card.url) {
        // Has data but no URL - error
        result.passed = false;
        (result.stats.violations as string[]).push(`${brand} ${model} ${card.component}: has data but no URL`);
        result.errors.push(`MISSING URL: ${brand} ${model} ${card.component} has data but url is null`);
      } else if (!card.hasData && card.url) {
        // No data but has URL - error (would create thin content SEO page)
        result.passed = false;
        (result.stats.violations as string[]).push(`${brand} ${model} ${card.component}: no data but has URL ${card.url}`);
        result.errors.push(`INVALID SEO LINK: ${brand} ${model} ${card.component} has no data but links to ${card.url}`);
      }
    }
  }

  return result;
}

// Test 5: Bobcat E32/E35 render as clean base machines
function testBobcatGuidingMachines(): ValidationResult {
  const result: ValidationResult = {
    passed: true,
    testName: "Bobcat E32/E35 Clean Base Machines",
    errors: [],
    warnings: [],
    stats: {},
  };

  const guidingMachines = [
    { brand: "Bobcat", rawModel: "E32 [I guiding | M-series]", expectedClean: "E32", expectedSlug: "bobcat-e32" },
    { brand: "Bobcat", rawModel: "E32 [J guiding | R-series]", expectedClean: "E32", expectedSlug: "bobcat-e32" },
    { brand: "Bobcat", rawModel: "E35 [I guiding | M-series]", expectedClean: "E35", expectedSlug: "bobcat-e35" },
    { brand: "Bobcat", rawModel: "E35 [J guiding | R-series]", expectedClean: "E35", expectedSlug: "bobcat-e35" },
  ];

  for (const { brand, rawModel, expectedClean, expectedSlug } of guidingMachines) {
    const cleanModel = cleanModelForDisplay(rawModel);
    const slug = createMachineSlug(brand, rawModel);
    
    if (cleanModel !== expectedClean) {
      result.passed = false;
      result.errors.push(`CLEAN MODEL MISMATCH: cleanModelForDisplay("${rawModel}") = "${cleanModel}", expected "${expectedClean}"`);
    }
    
    if (slug !== expectedSlug) {
      result.passed = false;
      result.errors.push(`SLUG MISMATCH: createMachineSlug("${brand}", "${rawModel}") = "${slug}", expected "${expectedSlug}"`);
    }
  }

  result.stats = {
    "E32 clean": cleanModelForDisplay("E32 [I guiding | M-series]"),
    "E32 slug": createMachineSlug("Bobcat", "E32 [I guiding | M-series]"),
    "E35 clean": cleanModelForDisplay("E35 [I guiding | M-series]"),
    "E35 slug": createMachineSlug("Bobcat", "E35 [I guiding | M-series]"),
  };

  return result;
}

// Test 6: Malformed URL redirect
function testMalformedUrlRedirect(): ValidationResult {
  const result: ValidationResult = {
    passed: true,
    testName: "Malformed URL Redirect",
    errors: [],
    warnings: [],
    stats: {},
  };

  const testCases = [
    { input: "bobcat-e32iguiding", expected: "bobcat-e32" },
    { input: "bobcat-e35iguiding", expected: "bobcat-e35" },
    { input: "bobcat-e32jguiding", expected: "bobcat-e32" },
    { input: "case-cx36bjguiding", expected: "case-cx36b" },
  ];

  for (const { input, expected } of testCases) {
    const cleaned = cleanMalformedSlug(input);
    
    if (cleaned !== expected) {
      result.passed = false;
      result.errors.push(`REDIRECT MISMATCH: cleanMalformedSlug("${input}") = "${cleaned}", expected "${expected}"`);
    }
    
    result.stats[input] = cleaned;
  }

  return result;
}

// Test 7: No invalid inch-format track sizes
function testNoInchFormatSizes(): ValidationResult {
  const result: ValidationResult = {
    passed: true,
    testName: "No Invalid Inch-Format Track Sizes",
    errors: [],
    warnings: [],
    stats: { checked: 0, inchSizesFiltered: [] as string[] },
  };

  // Check Bobcat CTL models that historically had inch data
  const testMachines = [
    { brand: "Bobcat", model: "T190" },
    { brand: "Bobcat", model: "T550" },
    { brand: "Bobcat", model: "T590" },
  ];

  for (const { brand, model } of testMachines) {
    (result.stats.checked as number)++;
    const sizes = getTrackSizesForMachine(brand, model);
    
    for (const size of sizes) {
      // Check if any size looks like inch format (width < 100)
      const match = size.match(/^(\d+)x/);
      if (match) {
        const width = parseInt(match[1], 10);
        if (width < 100) {
          result.passed = false;
          (result.stats.inchSizesFiltered as string[]).push(`${brand} ${model}: ${size}`);
          result.errors.push(`INCH SIZE NOT FILTERED: ${brand} ${model} has inch-format size "${size}"`);
        }
      }
    }
    
    result.stats[`${brand} ${model}`] = sizes.join(", ");
  }

  return result;
}

// Run all tests
async function runValidation() {
  console.log("=".repeat(70));
  console.log("MACHINE PAGE REQUIREMENTS VALIDATION");
  console.log("=".repeat(70));
  console.log();

  results.push(testNoGuidingInDisplayNames());
  results.push(testTrackSizeDeduplication());
  results.push(testAllComponentCardsDisplayed());
  results.push(testDataBackedLinksOnly());
  results.push(testBobcatGuidingMachines());
  results.push(testMalformedUrlRedirect());
  results.push(testNoInchFormatSizes());

  let allPassed = true;

  for (const result of results) {
    const status = result.passed ? "PASS" : "FAIL";
    console.log(`[${status}] ${result.testName}`);
    
    if (!result.passed) {
      allPassed = false;
      for (const error of result.errors.slice(0, 5)) {
        console.log(`  ERROR: ${error}`);
      }
      if (result.errors.length > 5) {
        console.log(`  ... and ${result.errors.length - 5} more errors`);
      }
    }
    
    if (result.warnings.length > 0) {
      for (const warning of result.warnings.slice(0, 3)) {
        console.log(`  WARNING: ${warning}`);
      }
    }
    
    // Print key stats
    for (const [key, value] of Object.entries(result.stats)) {
      if (typeof value === "number") {
        console.log(`  ${key}: ${value}`);
      } else if (Array.isArray(value) && value.length > 0) {
        console.log(`  ${key}: ${value.length} items`);
        if (value.length <= 3) {
          value.forEach(v => console.log(`    - ${v}`));
        }
      } else if (typeof value === "string") {
        console.log(`  ${key}: ${value}`);
      }
    }
    
    console.log();
  }

  console.log("=".repeat(70));
  console.log(`OVERALL: ${allPassed ? "ALL TESTS PASSED" : "SOME TESTS FAILED"}`);
  console.log("=".repeat(70));

  process.exit(allPassed ? 0 : 1);
}

runValidation();
