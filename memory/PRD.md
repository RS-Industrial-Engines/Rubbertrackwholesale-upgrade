# Parts Finder - Product Requirements Document

## Project Overview
Full-stack e-commerce platform for undercarriage parts (rubber tracks, rollers, sprockets, idlers) with comprehensive compatibility search functionality.

**Live Preview URL**: https://undercarriage-db.preview.emergentagent.com

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Shadcn/UI
- **Backend**: FastAPI (Python), Motor (async MongoDB)
- **Database**: MongoDB

## Core Features

### 1. Compatibility Search (Primary Feature)
- Universal search bar for machine make/model lookup
- Track size to compatible machines lookup
- Flexible regex matching (handles "SVL75", "SVL 75", "SVL-75")

### 2. Admin Panel (`/admin`)
- **Credentials**: admin / admin123
- Full CRUD for all entities
- CSV Import/Export functionality
- Dashboard with statistics

### 3. Data Entities
| Entity | Count | Description |
|--------|-------|-------------|
| Brands | 350 | Equipment manufacturers (CAT, Bobcat, Kubota, etc.) |
| Machine Models | 4,632 | Specific equipment models |
| Track Sizes | 381 | Track dimensions (e.g., 300x55x82) |
| Compatibility | 4,631 | Machine-to-track-size relationships |
| Products | 3 | Purchasable items (sample data) |

## Data Import (Completed 2025-01-25)

### Source Files (Authoritative)
- `compatibility_cleaned_UPDATED.csv` - Primary compatibility mapping
- `brands_FROM_compatibility.csv` - Brand entities  
- `machine_models_FROM_compatibility.csv` - Machine model entities
- `track_sizes_FROM_compatibility.csv` - Track size entities
- `products_with_ID_column.csv` - Product catalog (3 sample items)

### Import Script
Location: `/app/backend/import_authoritative_data.py`
- Performs clean slate import (clears existing data)
- Generates internal IDs
- Creates database indexes
- Sets `is_active=True` for compatibility entries

### Import Results
- **Total Records**: 9,997
- **Brands**: 350 created, 0 rejected
- **Machine Models**: 4,632 created, 0 rejected
- **Track Sizes**: 381 created, 32 rejected (duplicates in source)
- **Compatibility**: 4,631 created, 0 rejected
- **Products**: 3 created, 0 rejected

## API Endpoints

### Public API
- `GET /api/products` - Product listing with filters
- `GET /api/brands` - All brands
- `GET /api/categories` - All categories
- `GET /api/compatibility/search?make=&model=&track_size=` - Compatibility search
- `GET /api/compatibility/by-machine/{make}/{model}` - Machine lookup
- `GET /api/compatibility/by-track-size/{track_size}` - Track size lookup
- `GET /api/part-numbers/search` - Part number search

### Admin API (Requires Auth)
- `POST /api/admin/login` - Admin authentication
- `GET/POST/PUT/DELETE /api/admin/brands`
- `GET/POST/PUT/DELETE /api/admin/machine-models`
- `GET/POST/PUT/DELETE /api/admin/track-sizes`
- `GET/POST/PUT/DELETE /api/admin/compatibility`
- `GET/POST/PUT/DELETE /api/admin/products`
- `GET/POST/PUT/DELETE /api/admin/categories`

## Completed Tasks

### Phase 1: Data Import ✅
- [x] Clean slate import from authoritative CSV files
- [x] Create brands, machine models, track sizes entities
- [x] Create compatibility relationships (text-based)
- [x] Import sample products
- [x] Set up database indexes
- [x] Verify data integrity

### Previous Work
- [x] Database-driven machine models (migrated from hardcoded JS)
- [x] Enhanced CSV import/export for admin sections
- [x] Universal search enhancements
- [x] Admin panel CRUD operations

## Pending Tasks

### P0 (High Priority)
- [ ] Category data import (user to provide `categories_with_ID_column.csv`)
- [ ] Verify admin panel loads data correctly

### P1 (Medium Priority)  
- [ ] Complete "Enhanced Basic CSV" for remaining admin sections (Products, Categories)
- [ ] Add validation/reconciliation workflow for compatibility data

### P2 (Future/Backlog)
- [ ] SEO & Architecture Major Upgrade (SSR with Next.js, clean URLs) - **DEFERRED**
- [ ] Enterprise-grade CSV features (relationship resolution, dry-run)
- [ ] Product catalog expansion
- [ ] User authentication for frontend

## Database Schema

### brands
```javascript
{
  _id: ObjectId,
  name: String (unique),
  slug: String,
  logo: String,
  description: String,
  seo_title: String,
  seo_description: String,
  created_at: DateTime,
  updated_at: DateTime
}
```

### machine_models
```javascript
{
  _id: ObjectId,
  brand: String,
  model_name: String,
  full_name: String,
  equipment_type: String,
  description: String,
  image_url: String,
  created_at: DateTime,
  updated_at: DateTime
}
// Unique index: brand + model_name
```

### track_sizes
```javascript
{
  _id: ObjectId,
  size: String (unique, e.g., "300x55x82"),
  price: Number,
  width_variant: String,
  inventory_count: Number,
  is_in_stock: Boolean,
  description: String,
  created_at: DateTime,
  updated_at: DateTime
}
```

### compatibility
```javascript
{
  _id: ObjectId,
  make: String,
  model: String,
  track_sizes: [String],  // Array of size strings
  track_sizes_display: String,
  track_sizes_canonical: String,
  is_active: Boolean,
  created_at: DateTime,
  updated_at: DateTime
}
// Unique index: make + model
```

### products
```javascript
{
  _id: ObjectId,
  sku: String (unique),
  name: String,
  slug: String,
  description: String,
  price: Number,
  brand: String,
  category: String,
  size: String,
  part_number: String,
  in_stock: Boolean,
  stock_quantity: Number,
  images: [String],
  created_at: DateTime,
  updated_at: DateTime
}
```

## Files of Reference
- `/app/backend/import_authoritative_data.py` - Main import script
- `/app/backend/routes/admin.py` - Admin API routes
- `/app/backend/routes/public.py` - Public API routes
- `/app/frontend/src/pages/admin/*.jsx` - Admin panel components
- `/app/frontend/src/pages/ProductsPage.jsx` - Product search page
