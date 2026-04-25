# Parts Finder - Product Requirements Document

## Project Overview
Full-stack e-commerce platform for undercarriage parts (rubber tracks, rollers, sprockets, idlers) with comprehensive compatibility search functionality.

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
- CSV Import/Export functionality
- Dashboard with statistics
- U.S. vs Non-U.S. market segmentation tabs

### 3. Data Entities
| Entity | Count | Description |
|--------|-------|-------------|
| Brands | 350 (51 U.S. supported) | Equipment manufacturers |
| Machine Models | 4,632 | Specific equipment models |
| Track Sizes | 381 | Track dimensions with width/pitch/links fields |
| Compatibility | 4,631 | Machine-to-track-size relationships |
| Part Numbers | 76 (35 rollers, 21 idlers, 20 sprockets) | Undercarriage parts |
| Products | 3 | Sample products (mock data) |

## Data Import (Completed 2025-01-25)

### Source Files (Authoritative)
- `compatibility_cleaned_UPDATED.csv` - Primary compatibility mapping
- `brands_FROM_compatibility.csv` - Brand entities
- `machine_models_FROM_compatibility.csv` - Machine model entities
- `track_sizes_FROM_compatibility.csv` - Track size entities

### Import Script
Location: `/app/backend/import_authoritative_data.py`

### Data Enrichment (Completed 2025-04-25)
- `track_sizes` collection enriched with `width`, `pitch`, `links` fields parsed from `size` string
- Script: `/app/backend/enrich_track_sizes.py`
- All 381 records successfully enriched

## Search Behavior

### Brand/Make Search Rules
- **EXACT matching** for make/brand field (case-insensitive)
- `CAT` returns only CAT entries (not Bobcat)

### Model Search Rules
- **FLEXIBLE matching** using normalized field
- Handles space/hyphen variations: `svl75` matches `SVL 75`, `SVL-75`

### Track Size Search
- **EXACT matching** for track size strings

## API Endpoints

### Public API
- `GET /api/products` - Product listing with filters
- `GET /api/brands` - U.S. supported brands (use `include_all=true` for all)
- `GET /api/categories` - All categories
- `GET /api/machine-models` - U.S. supported machine models
- `GET /api/track-sizes` - Active track sizes (with width/pitch/links)
- `GET /api/compatibility` - Active compatibility entries
- `GET /api/compatibility/search?make=&model=&track_size=` - Compatibility search
- `GET /api/part-numbers/search?query=&part_type=&brand=&model=` - Part number search

### Admin API (Requires Auth)
- `POST /api/admin/login` - Admin authentication
- CRUD endpoints for all entities under `/api/admin/`

## Completed Tasks

### Phase 1: Data Import ✅
- [x] Clean slate import from authoritative CSV files
- [x] Create database indexes
- [x] Verify data integrity
- [x] Normalized model search (model_name_normalized field)

### Phase 2: U.S. Market Segmentation ✅
- [x] `is_us_supported` boolean flag on brands and machine models
- [x] API filtering by U.S. supported brands
- [x] Admin UI tabs for U.S. vs Non-U.S. records

### Phase 3: Bug Fixes (2025-04-25) ✅
- [x] Fix NaN track properties (enriched track_sizes with width/pitch/links)
- [x] Fix Navbar search bar (wired up with state, navigation)
- [x] Fix category pages showing no data (DB enrichment fixed compatibility chart)
- [x] All frontend tests passing (11/11)

## Pending Tasks

### P0 (High Priority)
- [ ] Complete Grizzly Rubber Tracks web scraping for sprocket data
- [ ] Data enrichment for additional part_numbers (sprockets, rollers from more brands)

### P1 (Medium Priority)
- [ ] Product catalog expansion (only 3 mock products currently)

### P2 (Future/Backlog)
- [ ] SEO & Architecture Upgrade (SSR with Next.js, clean URLs) - **BLOCKED: Needs user approval**
- [ ] Replace hash routing with browser routing
- [ ] Abstract duplicated CSV import/export logic in admin components

## Database Schema

### track_sizes (Updated 2025-04-25)
```javascript
{
  _id: ObjectId,
  size: String (e.g., "320x86x52"),
  width: Number,    // Extracted from size
  pitch: Number,    // Extracted from size
  links: Number,    // Extracted from size
  price: Number,
  width_variant: String,
  is_in_stock: Boolean,
  is_active: Boolean,
  created_at: DateTime,
  updated_at: DateTime
}
```

### part_numbers
```javascript
{
  _id: ObjectId,
  brand: String,
  part_number: String,
  part_type: String (roller|sprocket|idler),
  part_subtype: String,
  product_name: String,
  compatible_models: [String],
  price: Number,
  is_active: Boolean
}
```

## Files of Reference
- `/app/backend/enrich_track_sizes.py` - Track size enrichment script
- `/app/backend/routes/public.py` - Public API routes
- `/app/frontend/src/components/Navbar.jsx` - Navigation with search
- `/app/frontend/src/components/CategoryNav.jsx` - Category navigation with dropdowns
- `/app/frontend/src/components/RubberTrackCompatibility.jsx` - Compatibility chart
- `/app/frontend/src/pages/ProductsPage.jsx` - Product search/category page
