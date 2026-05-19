/**
 * Validation Script: Guiding Variant Normalization
 * 
 * Ensures that Camso guiding variants (E35 [I guiding], E35 [J guiding], etc.)
 * are NEVER exposed in SEO entities:
 * - Machine slugs / URLs
 * - H1s / titles
 * - Canonical URLs
 * - Internal links
 * - Sitemap URLs
 * - Schema model names
 * 
 * Run: npx tsx scripts/validate-guiding-normalization.ts
 */

import { 
  createMachineSlug, 
  normalizeMachineForSeoEntity,
  getBaseMachineModel,
  cleanMalformedSlug,
  isMessySlug,
} from "../lib/url-utils";
import { 
  fullMachineModels, 
  cleanModelForDisplay,
  searchMachines,
} from "../lib/data/full-machine-data";
import * as fs from "fs";
import * as path from "path";

// Patterns that should NEVER appear in SEO entities
const FORBIDDEN_PATTERNS = [
  /iguiding/i,
  /jguiding/i,
  /mcjguiding/i,
  /mseries/i,
  /rseries/i,
  /\[.*guiding.*\]/i,
  /\[.*series.*\]/i,
];

interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
  stats: {
    totalMachines: number;
    guidingVariants: number;
    uniqueBaseMachines: number;
    slugsGenerated: number;
    malformedSlugs: string[];
    guidingInSlugs: string[];
    searchDedupeIssues: string[];
  };
}

function hasForbiddenPattern(text: string): boolean {
  return FORBIDDEN_PATTERNS.some(pattern => pattern.test(text));
}

function validateGuidingNormalization(): ValidationResult {
  const result: ValidationResult = {
    passed: true,
    errors: [],
    warnings: [],
    stats: {
      totalMachines: 0,
      guidingVariants: 0,
      uniqueBaseMachines: 0,
      slugsGenerated: 0,
      malformedSlugs: [],
      guidingInSlugs: [],
      searchDedupeIssues: [],
    },
  };

  console.log("=".repeat(80));
  console.log("GUIDING VARIANT NORMALIZATION VALIDATION");
  console.log("=".repeat(80));

  // 1. Test normalizeMachineForSeoEntity()
  console.log("\n1. Testing normalizeMachineForSeoEntity()...");
  const normalizationTests: Array<{ input: string; expected: string }> = [
    { input: "E35 [I guiding | M-series]", expected: "E35" },
    { input: "E35 [J guiding | R-series]", expected: "E35" },
    { input: "E32 [I guiding | M-series]", expected: "E32" },
    { input: "E32 [J guiding | R-series]", expected: "E32" },
    { input: "E60 [I guiding]", expected: "E60" },
    { input: "CX 36BMC[I guiding]", expected: "CX 36BMC" },
    { input: "CX 36BMC[J guiding]", expected: "CX 36BMC" },
    { input: "CX 36B[I guiding]", expected: "CX 36B" },
    { input: "CX 36B[J guiding]", expected: "CX 36B" },
    { input: "SVL 75 (Compact Track Loader)", expected: "SVL 75" },
    { input: "259D", expected: "259D" },
  ];

  for (const test of normalizationTests) {
    const actual = normalizeMachineForSeoEntity(test.input);
    if (actual !== test.expected) {
      result.errors.push(`normalizeMachineForSeoEntity("${test.input}") = "${actual}", expected "${test.expected}"`);
      result.passed = false;
    }
  }
  console.log(`   ${normalizationTests.length} tests completed`);

  // 2. Test createMachineSlug() produces identical slugs for guiding variants
  console.log("\n2. Testing createMachineSlug() deduplication...");
  const slugTests: Array<{ make: string; models: string[]; expectedSlug: string }> = [
    { 
      make: "Bobcat", 
      models: ["E35", "E35 [I guiding | M-series]", "E35 [J guiding | R-series]"],
      expectedSlug: "bobcat-e35"
    },
    { 
      make: "Bobcat", 
      models: ["E32", "E32 [I guiding | M-series]", "E32 [J guiding | R-series]"],
      expectedSlug: "bobcat-e32"
    },
    { 
      make: "Bobcat", 
      models: ["E60", "E60 [I guiding]"],
      expectedSlug: "bobcat-e60"
    },
    { 
      make: "CASE", 
      models: ["CX 36BMC", "CX 36BMC[I guiding]", "CX 36BMC[J guiding]"],
      expectedSlug: "case-cx36bmc"
    },
    { 
      make: "CASE", 
      models: ["CX 36B", "CX 36B[I guiding]", "CX 36B[J guiding]"],
      expectedSlug: "case-cx36b"
    },
  ];

  for (const test of slugTests) {
    for (const model of test.models) {
      const slug = createMachineSlug(test.make, model);
      if (slug !== test.expectedSlug) {
        result.errors.push(`createMachineSlug("${test.make}", "${model}") = "${slug}", expected "${test.expectedSlug}"`);
        result.passed = false;
      }
    }
  }
  console.log(`   ${slugTests.length} slug groups tested`);

  // 3. Scan ALL machines for forbidden patterns in slugs
  console.log("\n3. Scanning all machines for forbidden patterns...");
  const allSlugs = new Set<string>();
  const baseModelMap = new Map<string, string[]>(); // baseModel → [original models]

  for (const [brand, models] of Object.entries(fullMachineModels)) {
    for (const model of models) {
      result.stats.totalMachines++;
      
      // Check if this is a guiding variant
      if (/\[.*guiding.*\]/i.test(model) || /\[.*series.*\]/i.test(model)) {
        result.stats.guidingVariants++;
      }
      
      const slug = createMachineSlug(brand, model);
      allSlugs.add(slug);
      result.stats.slugsGenerated++;
      
      // Track base model mapping
      const baseModel = getBaseMachineModel(model);
      const key = `${brand}|${baseModel}`;
      if (!baseModelMap.has(key)) {
        baseModelMap.set(key, []);
      }
      baseModelMap.get(key)!.push(model);
      
      // Check for forbidden patterns in slug
      if (hasForbiddenPattern(slug)) {
        result.stats.guidingInSlugs.push(`${brand} ${model} → ${slug}`);
        result.errors.push(`GUIDING IN SLUG: ${brand} ${model} → ${slug}`);
        result.passed = false;
      }
      
      // Check for messy slug
      if (isMessySlug(slug)) {
        result.stats.malformedSlugs.push(`${brand} ${model} → ${slug}`);
      }
    }
  }

  result.stats.uniqueBaseMachines = baseModelMap.size;
  console.log(`   Total machines: ${result.stats.totalMachines}`);
  console.log(`   Guiding variants: ${result.stats.guidingVariants}`);
  console.log(`   Unique base machines: ${result.stats.uniqueBaseMachines}`);
  console.log(`   Unique slugs: ${allSlugs.size}`);
  console.log(`   Guiding patterns in slugs: ${result.stats.guidingInSlugs.length}`);

  // 4. Test searchMachines() deduplication
  console.log("\n4. Testing searchMachines() deduplication...");
  const searchTests = [
    { query: "Bobcat E35", expectedMaxResults: 1 },
    { query: "Bobcat E32", expectedMaxResults: 1 },
    { query: "Bobcat E60", expectedMaxResults: 1 },
    { query: "Case CX36", expectedMaxResults: 10 }, // Multiple CX36 variants exist
    { query: "Case CX36BMC", expectedMaxResults: 1 },
    { query: "Case CX36B", expectedMaxResults: 1 },
  ];

  for (const test of searchTests) {
    const results = searchMachines(test.query);
    
    // Check for forbidden patterns in results
    for (const r of results) {
      if (hasForbiddenPattern(r.model)) {
        result.stats.searchDedupeIssues.push(`Search "${test.query}" returned "${r.brand} ${r.model}" with guiding text`);
        result.errors.push(`SEARCH DEDUPE FAIL: "${test.query}" returned "${r.model}" with guiding text`);
        result.passed = false;
      }
    }
    
    // Check model names are clean
    for (const r of results) {
      const slug = createMachineSlug(r.brand, r.model);
      if (hasForbiddenPattern(slug)) {
        result.errors.push(`SEARCH SLUG FAIL: "${test.query}" result would generate slug "${slug}"`);
        result.passed = false;
      }
    }
  }
  console.log(`   ${searchTests.length} search queries tested`);

  // 5. Test cleanMalformedSlug() can recover malformed URLs
  console.log("\n5. Testing cleanMalformedSlug() recovery...");
  const malformedTests: Array<{ input: string; expected: string }> = [
    { input: "bobcat-e35iguiding", expected: "bobcat-e35" },
    { input: "bobcat-e35iguidingmseries", expected: "bobcat-e35" },
    { input: "bobcat-e35jguidingrseries", expected: "bobcat-e35" },
    { input: "bobcat-e32iguiding", expected: "bobcat-e32" },
    { input: "bobcat-e32jguiding", expected: "bobcat-e32" },
    { input: "case-cx36bmciguiding", expected: "case-cx36bmc" },
    { input: "case-cx36bmcjguiding", expected: "case-cx36bmc" },
    { input: "case-cx36biguiding", expected: "case-cx36b" },
  ];

  for (const test of malformedTests) {
    const actual = cleanMalformedSlug(test.input);
    if (actual !== test.expected) {
      result.errors.push(`cleanMalformedSlug("${test.input}") = "${actual}", expected "${test.expected}"`);
      result.passed = false;
    }
  }
  console.log(`   ${malformedTests.length} recovery tests completed`);

  // 6. Verify specific examples from requirements
  console.log("\n6. Verifying specific requirement examples...");
  const specificTests = [
    {
      desc: "Bobcat E35 search should link to /machines/bobcat-e35",
      test: () => {
        const results = searchMachines("Bobcat E35");
        if (results.length === 0) return "No results found";
        const slug = createMachineSlug(results[0].brand, results[0].model);
        if (slug !== "bobcat-e35") return `Got slug "${slug}" instead of "bobcat-e35"`;
        return null;
      },
    },
    {
      desc: "Bobcat E32 search should return clean model name",
      test: () => {
        const results = searchMachines("Bobcat E32");
        if (results.length === 0) return "No results found";
        if (results.some(r => hasForbiddenPattern(r.model))) {
          return `Found guiding text in results: ${results.map(r => r.model).join(", ")}`;
        }
        return null;
      },
    },
    {
      desc: "Case CX36BMC search should return clean model name",
      test: () => {
        const results = searchMachines("Case CX36BMC");
        if (results.length === 0) return "No results found";
        if (results.some(r => hasForbiddenPattern(r.model))) {
          return `Found guiding text in results: ${results.map(r => r.model).join(", ")}`;
        }
        return null;
      },
    },
    {
      desc: "cleanModelForDisplay should strip guiding",
      test: () => {
        const input = "E35 [I guiding | M-series]";
        const output = cleanModelForDisplay(input);
        if (hasForbiddenPattern(output)) {
          return `cleanModelForDisplay("${input}") = "${output}" still contains guiding`;
        }
        return null;
      },
    },
  ];

  for (const test of specificTests) {
    const error = test.test();
    if (error) {
      result.errors.push(`REQUIREMENT FAIL: ${test.desc} - ${error}`);
      result.passed = false;
    } else {
      console.log(`   ✓ ${test.desc}`);
    }
  }

  // Summary
  console.log("\n" + "=".repeat(80));
  if (result.passed) {
    console.log("✅ ALL VALIDATION CHECKS PASSED");
  } else {
    console.log("❌ VALIDATION FAILED");
    console.log("\nErrors:");
    result.errors.forEach(e => console.log(`  - ${e}`));
  }
  console.log("=".repeat(80));

  // Write report
  const reportPath = path.join(__dirname, "../data/guiding-normalization-report.json");
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(result, null, 2));
  console.log(`\nReport written to: ${reportPath}`);

  return result;
}

// Run validation
const result = validateGuidingNormalization();
process.exit(result.passed ? 0 : 1);
