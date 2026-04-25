# Parts Finder - Product Requirements Document

## Project Overview
Full-stack e-commerce platform for undercarriage parts (rubber tracks, rollers, sprockets, idlers) with comprehensive compatibility search and CMS/admin functionality. Designed as a backend/API-first system — the React frontend serves as a working prototype, with a final Next.js SSR frontend planned separately.

**Live Preview URL**: https://parts-tracker-92.preview.emergentagent.com

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Shadcn/UI
- **Backend**: FastAPI (Python), Motor (async MongoDB)
- **Database**: MongoDB

## Core Features

### 1. Compatibility Search (Primary Feature)
- Universal search bar for machine make/model lookup
- Track size to compatible machines lookup
- Flexible regex matching (handles "SVL75", "SVL 75", "SVL-75")
- Navbar search bar with navigation to products page

### 2. Admin Panel (`/admin`)
- **Credentials**: admin / admin123
- Full CRUD for all entities
- CSV Import/Export/Template functionality for all 6 entities
- Dashboard with statistics
- U.S. vs Non-U.S. market segmentation tabs

### 3. Data Entities
| Entity | Count | Description |
|--------|-------|-------------|
| Brands | 350 (51 U.S. supported) | Equipment manufacturers |
| Machine Models | 4,632 | Specific equipment models |
| Track Sizes | 381 | Track dimensions with width/pitch/links |
| Compatibility | 4,631 | Machine-to-track-size relationships |
| Part Numbers | 76 (35 rollers, 21 idlers, 20 sprockets) | Undercarriage parts |
| Products | 3 | Sample products |

### 4. CSV Data Portability (All 6 Entities)
Each entity supports:
- **Export CSV**: Download current data
- **Import CSV**: Upload to add/update records (upsert)
- **CSV Template**: Download empty template with correct column structure

| Entity | Export | Import | Template | Upsert Key |
|--------|--------|--------|----------|------------|
| Brands | /api/admin/brands/export-csv | /api/admin/brands/import-csv | /api/admin/brands/csv-template | name |
| Machine Models | /api/admin/machine-models/export-csv | /api/admin/machine-models/import-csv | /api/admin/machine-models/csv-template | brand+model_name |
| Track Sizes | /api/admin/track-sizes/export-csv | /api/admin/track-sizes/import-csv | /api/admin/track-sizes/csv-template | size |
| Compatibility | /api/admin/compatibility/export-csv | /api/admin/compatibility/import-csv | /api/admin/compatibility/csv-template | make+model |
| Products | /api/admin/products/export-csv | /api/admin/products/import-csv | /api/admin/products/csv-template | sku or title |
| Part Numbers | /api/admin/part-numbers/export-csv | /api/admin/part-numbers/import-csv | /api/admin/part-numbers/csv-template | brand+part_number |

## Public API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/products` | Product listing with brand/category/search filters |
| `GET /api/products/{id}` | Single product by ID |
| `GET /api/brands` | U.S. supported brands |
| `GET /api/categories` | All categories |
| `GET /api/machine-models` | Machine models by brand |
| `GET /api/track-sizes` | Track sizes with width/pitch/links |
| `GET /api/compatibility` | All compatibility entries |
| `GET /api/compatibility/search?make=&model=&track_size=` | Compatibility search |
| `GET /api/part-numbers/search?query=&part_type=&brand=&model=` | Part number search |
| `GET /api/models/{brand}/{model}` | Products for specific machine model |

## Completed Tasks

### Phase 1: Data Import ✅
- Clean slate import from authoritative CSV files
- Create database indexes
- Verify data integrity
- Normalized model search (model_name_normalized field)

### Phase 2: U.S. Market Segmentation ✅
- `is_us_supported` boolean flag on brands and machine models
- API filtering by U.S. supported brands
- Admin UI tabs for U.S. vs Non-U.S. records

### Phase 3: Bug Fixes (2025-04-25) ✅
- Fix NaN track properties (enriched track_sizes with width/pitch/links)
- Fix Navbar search bar (wired up with state, navigation)
- Fix category pages showing no data

### Phase 4: Backend Stabilization (2025-04-25) ✅
- Removed all mockData.js dependencies (except static testimonials)
- All frontend data now fetched from DB via API
- ProductsPage, HomePage, ProductDetailPage all DB-driven
- 18 CSV endpoints added (6 entities x export/import/template)
- All public APIs verified stable and documented

## Pending / Backlog

### Paused (Per User Request)
- Scraping/expansion of rollers, sprockets, idlers data
- Grizzly Rubber Tracks web scraping

### Future (Needs User Approval)
- SEO & Architecture Upgrade (SSR with Next.js, clean URLs) — **BLOCKED**
- Replace hash routing with browser routing
- Abstract duplicated CSV import/export logic in admin components
- Product catalog expansion

## Frontend Mock Data Status
- `mockData.js` still exists but only `testimonials` is imported (static marketing content)
- `products`, `brands`, `categories` — NO LONGER imported anywhere
- All business data comes from DB/API

## Database Schema

### track_sizes
```
{ size, width, pitch, links, price, is_in_stock, is_active, created_at, updated_at }
```

### compatibility
```
{ make, model, model_name_normalized, track_sizes: [String], is_active, created_at, updated_at }
```

### part_numbers
```
{ brand, part_number, part_type, part_subtype, product_name, compatible_models: [String], price, is_active }
```

### products
```
{ title, sku, part_number, brand, category, size, price, description, in_stock, images: [String], slug }
```

### brands
```
{ name, logo, is_us_supported, is_active }
```

### machine_models
```
{ brand, model_name, model_name_normalized, is_us_supported }
```
