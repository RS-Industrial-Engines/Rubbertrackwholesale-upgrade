# Master Undercarriage Data System

## Overview

This document describes the unified MASTER UNDERCARRIAGE DATA TEMPLATE that supports all current and future undercarriage parts data.

**CORE PRINCIPLE:** This system is an INDUSTRIAL COMPATIBILITY KNOWLEDGE PLATFORM, NOT a mass page-generation engine.

## Governance Rules

### 1. Quality Over Quantity
- Every page must provide unique semantic value
- No thin or repetitive template pages
- Verified fitment required before publishing
- Real-world utility is the primary metric

### 2. SEO Hierarchy (Preserved)
```
PRIMARY SEO PAGES (Priority 0.8)     SECONDARY PAGES (Priority 0.6)
─────────────────────────────────    ─────────────────────────────────
/bottom-rollers/kubota-svl75         /parts/kubota-v0511-25104-bottom-roller
/sprockets/kubota-svl75              /parts/kubota-k7561-14512-sprocket
/idlers/kubota-svl75                 /parts/kubota-...
```

Machine-component pages remain PRIMARY. Part pages are SECONDARY detail pages.

### 3. SEO Override Support
Auto-generation provides baseline SEO. High-value pages support MANUAL OVERRIDES for:
- `seo_title`, `seo_h1`, `seo_h2`
- `meta_description`
- `breadcrumb_label`
- `page_intro` (custom lede paragraph)
- `custom_fitment_notes`

**High-value machines requiring manual SEO:**
- Kubota SVL75, SVL95
- CAT 259D, 299D
- John Deere 333G, 331G
- Bobcat T650, T770

### 4. Publish Governance
NOT every imported row becomes a public page:
- `published` + `index_status=YES` → Live on site, indexed
- `staged` → In CMS, not public
- `pending-review` → Needs owner approval
- `draft` → Work in progress
- `unverified` confidence → Never auto-publish

### 5. Deduplication Rules
Hierarchy: brand + normalized_part_number + part_category + machine_relationship
- No duplicate pages for same part number
- No near-identical machine/component combinations
- No SEO authority dilution across thin pages

### 6. Model Name Normalization
Internal normalization: SVL75 = SVL 75 = SVL-75
Public display: Clean format only ("SVL75", not "SVL 75 (Compact Track Loader)")

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    SEO HIERARCHY (PRESERVED)                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  PRIMARY PAGES (Machine Authority)                              │
│  ─────────────────────────────────                              │
│  /bottom-rollers/kubota-svl75                                   │
│  /sprockets/kubota-svl75                                        │
│  /idlers/kubota-svl75                                           │
│  /carrier-rollers/kubota-svl75                                  │
│                                                                 │
│  SECONDARY PAGES (Part Detail)                                  │
│  ─────────────────────────────                                  │
│  /parts/kubota-v0511-25104-bottom-roller                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## File Structure

```
nextjs-frontend/
├── data/
│   ├── master-undercarriage-template.csv     # Master CSV template
│   └── rtw_undercarriage_parts_*.csv         # Source data files
│
├── lib/data/
│   ├── undercarriage-master-schema.ts        # Type definitions & utilities
│   ├── master-undercarriage-data.ts          # Generated data (DO NOT EDIT)
│   └── verified-parts-data.ts                # Legacy (to be migrated)
│
└── scripts/
    └── import-master-undercarriage.js        # Import script
```

## Master CSV Template Columns

### Identification
| Column | Required | Description |
|--------|----------|-------------|
| `record_id` | Yes | Unique ID (format: UP-XXXX) |
| `import_batch` | No | Batch identifier for tracking |
| `launch_priority` | No | Priority order (1 = highest) |

### Part Information
| Column | Required | Description |
|--------|----------|-------------|
| `brand` | Yes | OEM brand (Kubota, CAT, Bobcat, etc.) |
| `part_category` | Yes | roller, sprocket, idler, carrier-roller |
| `part_subtype` | No | bottom, drive, front, rear, carrier |
| `primary_part_number` | Yes | Main part number identifier |
| `alt_part_numbers` | No | Pipe-delimited: "PN1\|PN2\|PN3" |
| `superseded_part_numbers` | No | Part numbers this replaces |
| `oem_equivalent` | No | OEM reference number |
| `product_name` | No | Human-readable name |

### Compatibility
| Column | Required | Description |
|--------|----------|-------------|
| `compatible_models_text` | No | Display text for models |
| `compatible_models` | Recommended | Pipe-delimited: "SVL75\|SVL90\|SVL95" |
| `equipment_type` | No | compact-track-loader, mini-excavator, etc. |
| `track_sizes` | No | Pipe-delimited: "320x86x52\|380x86x52" |
| `serial_ranges` | No | JSON: [{"start":"123","end":"456"}] |

### Technical Notes
| Column | Required | Description |
|--------|----------|-------------|
| `chassis_mount_notes` | No | Mounting-specific notes |
| `serial_notes` | No | Serial number restrictions |
| `position_notes` | No | Left/right, front/rear notes |
| `installation_notes` | No | Installation guidance |
| `wear_indicators` | No | When to replace guidance |
| `fitment_notes` | No | Mechanic notes |

### Verification
| Column | Required | Description |
|--------|----------|-------------|
| `confidence` | No | verified-imported-sold, verified-researched, etc. |
| `imported_by_rtw` | No | YES/NO |
| `sold_by_rtw` | No | YES/NO |
| `owner_approved` | No | YES/NO |
| `verification_notes` | No | Verification details |
| `source_urls` | No | Pipe-delimited source URLs |
| `last_verified` | No | ISO date (YYYY-MM-DD) |

### Publication
| Column | Required | Description |
|--------|----------|-------------|
| `publish_status` | No | published, staged, pending-review, draft |
| `index_status` | No | YES/NO - should search engines index? |
| `sitemap_include` | No | YES/NO - include in sitemap? |
| `date_added` | No | ISO date |
| `date_modified` | No | ISO date |

### SEO (Auto-Generated with Manual Override Support)
| Column | Required | Description |
|--------|----------|-------------|
| `slug` | Auto | URL slug |
| `seo_title` | Auto | Page title (MANUAL OVERRIDE for high-value pages) |
| `seo_h1` | Auto | H1 heading (MANUAL OVERRIDE supported) |
| `seo_h2` | Manual | H2 subheading (MANUAL OVERRIDE only) |
| `meta_description` | Auto | Meta description (MANUAL OVERRIDE supported) |
| `canonical_type` | No | part or machine (machine is primary) |
| `breadcrumb_label` | Manual | Custom breadcrumb text |
| `page_intro` | Manual | Custom intro paragraph for unique content |
| `custom_fitment_notes` | Manual | Custom fitment notes for high-value pages |

### Content Depth (For Semantic Authority)
| Column | Required | Description |
|--------|----------|-------------|
| `wear_patterns` | No | Wear patterns and indicators |
| `replacement_symptoms` | No | When to replace guidance |
| `operating_environments` | No | Terrain and conditions |
| `installation_guidance` | No | Step-by-step or tips |
| `maintenance_notes` | No | Maintenance schedule |
| `oem_references` | No | OEM documentation |
| `terrain_applications` | No | Application context |
| `expert_tips` | No | Best practices |

### Internal Linking
| Column | Required | Description |
|--------|----------|-------------|
| `related_sprockets` | No | Pipe-delimited record IDs |
| `related_rollers` | No | Pipe-delimited record IDs |
| `related_idlers` | No | Pipe-delimited record IDs |
| `related_carrier_rollers` | No | Pipe-delimited record IDs |
| `related_track_sizes` | No | Pipe-delimited slugs |

### Optional (Future)
| Column | Required | Description |
|--------|----------|-------------|
| `price_tier` | No | economy, standard, premium |
| `has_quantity_pricing` | No | YES/NO |
| `supplier_sku` | No | Supplier SKU |
| `supplier_name` | No | Supplier name |
| `lead_time_days` | No | Lead time in days |
| `stock_status` | No | in-stock, low-stock, out-of-stock, special-order |

## Import Workflow

### Step 1: Prepare CSV
```bash
# Use the template as a starting point
cp data/master-undercarriage-template.csv data/my-import.csv

# Edit with your data
```

### Step 2: Validate (Dry Run)
```bash
node scripts/import-master-undercarriage.js \
  --input data/my-import.csv \
  --dry-run
```

### Step 3: Import
```bash
# Merge with existing data (default)
node scripts/import-master-undercarriage.js \
  --input data/my-import.csv \
  --mode merge

# Or replace all data
node scripts/import-master-undercarriage.js \
  --input data/my-import.csv \
  --mode replace
```

### Step 4: Review Generated File
The import creates/updates `lib/data/master-undercarriage-data.ts` with:
- `MASTER_UNDERCARRIAGE_PARTS` - All parts
- `PUBLIC_UNDERCARRIAGE_PARTS` - Published parts only
- `STAGED_UNDERCARRIAGE_PARTS` - Staged parts
- Helper functions for querying

## Automatic SEO Generation

If SEO fields are empty in the CSV, the import script automatically generates:

### Slug
```
{brand}-{part_number}-{category}
Example: kubota-v0511-25104-roller
```

### Title
```
{Brand} {ComponentType} {PartNumber} for {Brand} {FirstModel}
Example: Kubota Bottom Roller V0511-25104 for Kubota SVL65-2
```

### H1
Same format as title.

### Meta Description
```
In-stock {Brand} {ComponentType} {PartNumber} for {Brand} {FirstModel}. 
Wholesale undercarriage parts from Houston with nationwide shipping.
```

## Publication Workflow

### Confidence Levels
1. `verified-imported-sold` - We have imported/sold this part
2. `verified-researched` - Manually researched and confirmed
3. `high-confidence` - Strong evidence from multiple sources
4. `medium-confidence` - Single source or partial match
5. `low-confidence` - Needs verification
6. `unverified` - No verification yet

### Publish Status
1. `draft` - Work in progress
2. `pending-review` - Needs owner approval
3. `staged` - Ready but not public
4. `published` - Live on site

### Recommended Workflow
```
unverified → verified-researched → pending-review → staged → published
         ↑
    OR: imported_by_rtw=YES, sold_by_rtw=YES → verified-imported-sold → published
```

## Deduplication

The import script automatically:
1. Normalizes part numbers (removes spaces, converts to uppercase)
2. Detects duplicates by primary part number + brand
3. Detects cross-references via alt_part_numbers
4. Reports duplicates (does not auto-merge - requires manual review)

## Internal Linking

### Automatic Linking
- Parts link to compatible machine pages (validated against full-machine-data.ts)
- Machine pages link to verified parts
- Related parts link to each other via `related_*` fields

### Manual Linking
Use record IDs in the `related_*` columns:
```csv
related_sprockets,related_rollers,related_idlers
UP-0011,UP-0002|UP-0003,UP-0021
```

## Sitemap Integration

Parts with `sitemap_include=YES` and `publish_status=published` are automatically included in:
- `/sitemap.xml` via `getAllPublicPartSlugs()`
- Priority based on `launch_priority`

## Future Scaling

This system is designed to handle:
- 500+ rollers
- 300+ sprockets
- 200+ idlers
- Unlimited alternate part numbers
- Supplier enrichment data
- Price/inventory data (when ready)

All future imports use the same CSV template and import script.
