/**
 * Validate URL Normalization Logic
 * 
 * Tests that:
 * 1. All internal links use clean slugs (no guiding descriptors)
 * 2. Malformed slugs are properly cleaned
 * 3. No URLs contain bracket-derived text
 */

import { createMachineSlug, isMessySlug, cleanMalformedSlug } from "../lib/url-utils";
import { fullMachineModels } from "../lib/data/full-machine-data";

// Test cases for malformed URLs
const malformedTestCases = [
  // Bobcat E35 variants
  { input: "bobcat-e35iguiding", expected: "bobcat-e35" },
  { input: "bobcat-e35jguiding", expected: "bobcat-e35" },
  { input: "bobcat-e35iguidingmseries", expected: "bobcat-e35" },
  { input: "bobcat-e35jguidingrseries", expected: "bobcat-e35" },
  // Bobcat E32 variants
  { input: "bobcat-e32iguiding", expected: "bobcat-e32" },
  { input: "bobcat-e32jguiding", expected: "bobcat-e32" },
  { input: "bobcat-e32iguidingmseries", expected: "bobcat-e32" },
  { input: "bobcat-e32jguidingrseries", expected: "bobcat-e32" },
  // Bobcat E60 variants
  { input: "bobcat-e60iguiding", expected: "bobcat-e60" },
  // CASE CX36 variants
  { input: "case-cx36bmciguiding", expected: "case-cx36bmc" },
  { input: "case-cx36bmcjguiding", expected: "case-cx36bmc" },
  { input: "case-cx36bmriguiding", expected: "case-cx36bmr" },
  { input: "case-cx36bmrjguiding", expected: "case-cx36bmr" },
  { input: "case-cx36bztsiguiding", expected: "case-cx36bzts" },
  { input: "case-cx36bztsjguiding", expected: "case-cx36bzts" },
  { input: "case-cx36biguiding", expected: "case-cx36b" },
  { input: "case-cx36bjguiding", expected: "case-cx36b" },
  // Clean slugs should remain unchanged
  { input: "bobcat-e35", expected: "bobcat-e35" },
  { input: "kubota-svl75-2", expected: "kubota-svl75-2" },
  { input: "cat-259d", expected: "cat-259d" },
];

// Check that createMachineSlug properly strips bracket content
function testCreateMachineSlug(): { pass: number; fail: number; failures: string[] } {
  let pass = 0;
  let fail = 0;
  const failures: string[] = [];
  
  // Models with bracket descriptors that should be stripped
  const modelsWithBrackets = [
    { brand: "Bobcat", model: "E32 [I guiding | M-series]", expectedSlug: "bobcat-e32" },
    { brand: "Bobcat", model: "E32 [J guiding | R-series]", expectedSlug: "bobcat-e32" },
    { brand: "Bobcat", model: "E35 [I guiding | M-series]", expectedSlug: "bobcat-e35" },
    { brand: "Bobcat", model: "E35I [J guiding | R-series]", expectedSlug: "bobcat-e35i" },
    { brand: "Bobcat", model: "E60 [I guiding]", expectedSlug: "bobcat-e60" },
    { brand: "CASE", model: "CX 36BMC[I guiding]", expectedSlug: "case-cx36bmc" },
    { brand: "CASE", model: "CX 36BMC[J guiding]", expectedSlug: "case-cx36bmc" },
    { brand: "CASE", model: "CX 36BMR[I guiding]", expectedSlug: "case-cx36bmr" },
    { brand: "CASE", model: "CX 36BMR[J guiding]", expectedSlug: "case-cx36bmr" },
    { brand: "CASE", model: "CX 36BZTS[I guiding]", expectedSlug: "case-cx36bzts" },
    { brand: "CASE", model: "CX 36BZTS[J guiding]", expectedSlug: "case-cx36bzts" },
    { brand: "CASE", model: "CX 36B[I guiding]", expectedSlug: "case-cx36b" },
    { brand: "CASE", model: "CX 36B[J guiding]", expectedSlug: "case-cx36b" },
  ];
  
  for (const { brand, model, expectedSlug } of modelsWithBrackets) {
    const actual = createMachineSlug(brand, model);
    if (actual === expectedSlug) {
      pass++;
    } else {
      fail++;
      failures.push(`createMachineSlug("${brand}", "${model}"): expected "${expectedSlug}", got "${actual}"`);
    }
  }
  
  return { pass, fail, failures };
}

// Test cleanMalformedSlug function
function testCleanMalformedSlug(): { pass: number; fail: number; failures: string[] } {
  let pass = 0;
  let fail = 0;
  const failures: string[] = [];
  
  for (const { input, expected } of malformedTestCases) {
    const actual = cleanMalformedSlug(input);
    if (actual === expected) {
      pass++;
    } else {
      fail++;
      failures.push(`cleanMalformedSlug("${input}"): expected "${expected}", got "${actual}"`);
    }
  }
  
  return { pass, fail, failures };
}

// Test isMessySlug function
function testIsMessySlug(): { pass: number; fail: number; failures: string[] } {
  let pass = 0;
  let fail = 0;
  const failures: string[] = [];
  
  const testCases = [
    // Messy slugs that should be detected
    { input: "bobcat-e35iguiding", shouldBeMessy: true },
    { input: "bobcat-e35jguiding", shouldBeMessy: true },
    { input: "case-cx36bmciguiding", shouldBeMessy: true },
    { input: "kubota-svl75--2", shouldBeMessy: true }, // double hyphen
    { input: "cat-259d(compact-track-loader)", shouldBeMessy: true },
    // Clean slugs that should NOT be detected as messy
    { input: "bobcat-e35", shouldBeMessy: false },
    { input: "kubota-svl75-2", shouldBeMessy: false },
    { input: "cat-259d", shouldBeMessy: false },
    { input: "john-deere-333g", shouldBeMessy: false },
  ];
  
  for (const { input, shouldBeMessy } of testCases) {
    const actual = isMessySlug(input);
    if (actual === shouldBeMessy) {
      pass++;
    } else {
      fail++;
      failures.push(`isMessySlug("${input}"): expected ${shouldBeMessy}, got ${actual}`);
    }
  }
  
  return { pass, fail, failures };
}

// Scan all models to ensure no generated slugs contain guiding text
function scanAllModelsForCleanSlugs(): { pass: number; fail: number; failures: string[] } {
  let pass = 0;
  let fail = 0;
  const failures: string[] = [];
  
  for (const [brand, models] of Object.entries(fullMachineModels)) {
    for (const model of models) {
      const slug = createMachineSlug(brand, model);
      
      // Check for problematic patterns in the generated slug
      if (/guiding/i.test(slug)) {
        fail++;
        failures.push(`${brand} ${model} → "${slug}" contains "guiding"`);
      } else if (/mseries|rseries/i.test(slug)) {
        fail++;
        failures.push(`${brand} ${model} → "${slug}" contains "series"`);
      } else if (/\[|\]/i.test(slug)) {
        fail++;
        failures.push(`${brand} ${model} → "${slug}" contains brackets`);
      } else if (/--/.test(slug)) {
        fail++;
        failures.push(`${brand} ${model} → "${slug}" contains double hyphens`);
      } else {
        pass++;
      }
    }
  }
  
  return { pass, fail, failures };
}

// Run all tests
console.log("=== URL Normalization Validation ===\n");

const test1 = testCreateMachineSlug();
console.log(`1. createMachineSlug (bracket stripping): ${test1.pass} PASS, ${test1.fail} FAIL`);
if (test1.failures.length > 0) {
  test1.failures.forEach(f => console.log(`   ❌ ${f}`));
}

const test2 = testCleanMalformedSlug();
console.log(`\n2. cleanMalformedSlug: ${test2.pass} PASS, ${test2.fail} FAIL`);
if (test2.failures.length > 0) {
  test2.failures.forEach(f => console.log(`   ❌ ${f}`));
}

const test3 = testIsMessySlug();
console.log(`\n3. isMessySlug detection: ${test3.pass} PASS, ${test3.fail} FAIL`);
if (test3.failures.length > 0) {
  test3.failures.forEach(f => console.log(`   ❌ ${f}`));
}

const test4 = scanAllModelsForCleanSlugs();
console.log(`\n4. All model slugs clean: ${test4.pass} PASS, ${test4.fail} FAIL`);
if (test4.failures.length > 0) {
  test4.failures.slice(0, 20).forEach(f => console.log(`   ❌ ${f}`));
  if (test4.failures.length > 20) {
    console.log(`   ... and ${test4.failures.length - 20} more`);
  }
}

// Summary
const totalPass = test1.pass + test2.pass + test3.pass + test4.pass;
const totalFail = test1.fail + test2.fail + test3.fail + test4.fail;

console.log("\n=== SUMMARY ===");
console.log(`Total: ${totalPass} PASS, ${totalFail} FAIL`);

if (totalFail === 0) {
  console.log("\n✅ All URL normalization tests passed!");
  process.exit(0);
} else {
  console.log("\n❌ Some URL normalization tests failed. Fix the issues above.");
  process.exit(1);
}
