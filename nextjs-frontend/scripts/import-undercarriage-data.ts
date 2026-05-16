#!/usr/bin/env node
/**
 * Undercarriage CMS Data Import Script
 * 
 * This script imports undercarriage data from CSV/JSON into the CMS data store.
 * 
 * USAGE:
 *   node --env-file-if-exists=/vercel/share/.env.project scripts/import-undercarriage-data.ts
 * 
 * INPUT FORMAT (CSV):
 *   machine_key,component_type,primary_part_number,alternate_part_numbers,common_fitment_notes,confidence_level,publish_part_page
 *   Kubota|SVL75,bottom-roller,RC461-21903,"RC461-21900,RC411-21903","Fits SVL75, SVL75-2",verified,true
 * 
 * INPUT FORMAT (JSON):
 *   [
 *     {
 *       "machine_key": "Kubota|SVL75",
 *       "component_type": "bottom-roller",
 *       "primary_part_number": "RC461-21903",
 *       ...
 *     }
 *   ]
 * 
 * OUTPUT:
 *   Updates lib/data/undercarriage-cms-data.ts with imported records
 */

import * as fs from 'fs';
import * as path from 'path';

interface CMSRecord {
  machine_key: string;
  component_type: string;
  primary_part_number?: string;
  alternate_part_numbers?: string[];
  oem_part_number?: string;
  common_fitment_notes?: string;
  chassis_type?: string;
  mount_type?: string;
  serial_break_notes?: string;
  bolt_style?: string;
  flange_type?: string;
  source_url?: string;
  confidence_level?: string;
  last_verified_date?: string;
  publish_part_page?: boolean;
  seo_short_description?: string;
  has_carrier_roller?: boolean;
}

function parseCSV(content: string): CMSRecord[] {
  const lines = content.trim().split('\n');
  if (lines.length < 2) return [];
  
  const headers = lines[0].split(',').map(h => h.trim());
  const records: CMSRecord[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const record: Record<string, string | string[] | boolean | undefined> = {};
    
    headers.forEach((header, index) => {
      const value = values[index]?.trim();
      if (!value) return;
      
      // Handle array fields
      if (header === 'alternate_part_numbers' && value) {
        record[header] = value.split(',').map(v => v.trim());
      }
      // Handle boolean fields
      else if (header === 'publish_part_page' || header === 'has_carrier_roller') {
        record[header] = value.toLowerCase() === 'true';
      }
      // String fields
      else {
        record[header] = value;
      }
    });
    
    // Type guard: ensure required fields exist before casting
    if (typeof record.machine_key === 'string' && 
        typeof record.component_type === 'string' &&
        record.machine_key && 
        record.component_type) {
      records.push(record as unknown as CMSRecord);
    }
  }
  
  return records;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (const char of line) {
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  
  return result;
}

function generateDataFileContent(records: CMSRecord[]): string {
  const dataEntries = records.map(record => {
    const key = `${record.machine_key.toLowerCase()}|${record.component_type}`;
    const fields = Object.entries(record)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([fieldKey, value]) => {
        if (Array.isArray(value)) {
          return `    ${fieldKey}: ${JSON.stringify(value)},`;
        } else if (typeof value === 'boolean') {
          return `    ${fieldKey}: ${value},`;
        } else {
          return `    ${fieldKey}: "${value}",`;
        }
      })
      .join('\n');
    
    return `  "${key}": {\n${fields}\n  },`;
  }).join('\n');
  
  return `// AUTO-GENERATED - DO NOT EDIT MANUALLY
// Generated on: ${new Date().toISOString()}
// Total records: ${records.length}

export const UNDERCARRIAGE_CMS_DATA: Record<string, any> = {
${dataEntries}
};
`;
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('Undercarriage CMS Data Import Script');
    console.log('=====================================');
    console.log('');
    console.log('Usage:');
    console.log('  npx ts-node scripts/import-undercarriage-data.ts <input-file>');
    console.log('');
    console.log('Input file can be CSV or JSON format.');
    console.log('');
    console.log('Example CSV:');
    console.log('  machine_key,component_type,primary_part_number,confidence_level');
    console.log('  Kubota|SVL75,bottom-roller,RC461-21903,verified');
    console.log('');
    console.log('No input file provided. Run with --help for more info.');
    return;
  }
  
  const inputFile = args[0];
  
  if (!fs.existsSync(inputFile)) {
    console.error(`Error: File not found: ${inputFile}`);
    process.exit(1);
  }
  
  const content = fs.readFileSync(inputFile, 'utf-8');
  let records: CMSRecord[];
  
  if (inputFile.endsWith('.json')) {
    records = JSON.parse(content);
  } else {
    records = parseCSV(content);
  }
  
  console.log(`Parsed ${records.length} records from ${inputFile}`);
  
  // Validate records
  const valid: CMSRecord[] = [];
  const invalid: { record: CMSRecord; errors: string[] }[] = [];
  
  for (const record of records) {
    const errors: string[] = [];
    
    if (!record.machine_key?.includes('|')) {
      errors.push('machine_key must be in "Brand|Model" format');
    }
    
    if (!['bottom-roller', 'sprocket', 'idler', 'carrier-roller'].includes(record.component_type)) {
      errors.push('component_type must be one of: bottom-roller, sprocket, idler, carrier-roller');
    }
    
    if (errors.length > 0) {
      invalid.push({ record, errors });
    } else {
      valid.push(record);
    }
  }
  
  if (invalid.length > 0) {
    console.log(`\nValidation errors (${invalid.length} records):`);
    invalid.forEach(({ record, errors }) => {
      console.log(`  ${record.machine_key}: ${errors.join(', ')}`);
    });
  }
  
  if (valid.length === 0) {
    console.error('No valid records to import');
    process.exit(1);
  }
  
  // Generate output
  const outputContent = generateDataFileContent(valid);
  const outputPath = path.join(__dirname, '../lib/data/undercarriage-cms-data.generated.ts');
  
  fs.writeFileSync(outputPath, outputContent);
  
  console.log(`\nImported ${valid.length} records to ${outputPath}`);
  console.log('Review the generated file and merge into undercarriage-cms-data.ts');
}

main().catch(console.error);
