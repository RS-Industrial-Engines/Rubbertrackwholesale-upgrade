# Independent Deployment Guide

## Quick Answers to Your Questions

### 1. Database Export
**Full MongoDB dump included** at two locations:
- **BSON dump** (recommended): `/exports/mongodb/test_database/` — use `mongorestore` to import
- **JSON export**: `/exports/json/` — human-readable, 8 collection files

**CSV exports also available** via admin API (see Section 8).

### 2. Environment Configuration

#### Backend `.env` (create at `backend/.env`)
```
MONGO_URL=mongodb://localhost:27017
DB_NAME=rubber_track_wholesale
CORS_ORIGINS=http://localhost:3000
SECRET_KEY=change-this-to-a-random-64-char-string-in-production
```

#### Frontend `.env` (create at `frontend/.env`)
```
REACT_APP_BACKEND_URL=http://localhost:8001
```

**No external API keys or third-party secrets required.** The entire system is self-contained.

### 3. Backend Runs Independently — Zero Emergent Dependencies
```bash
cd backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```
That's it. No Emergent platform, no external services.

### 4. Admin Panel — Fully in This Codebase
- Built into the React frontend at `/#/admin`
- Auth: JWT-based (24-hour tokens), implemented in `backend/auth.py`
- Default credentials: `admin` / `admin123`
- Password stored as bcrypt hash in MongoDB `admin_users` collection

### 5. All APIs Are Self-Contained
Every API endpoint the frontend calls lives in:
- `backend/routes/public.py` — Public storefront APIs
- `backend/routes/admin.py` — Admin/CMS APIs
- **No hidden or external API calls**

### 6. File/Asset Storage
- **No external file storage** is used
- Product images are stored as URLs in MongoDB (currently using placeholder/unsplash URLs)
- For production: add your own image hosting (S3, Cloudflare R2, etc.) and update the image URLs in the products collection

### 7. Run Everything Locally — Step by Step

---

## Full Local Setup

### Prerequisites
- Python 3.10+
- Node.js 18+
- MongoDB 6+ (running on localhost:27017)
- yarn (for frontend)

### Step 1: Start MongoDB
```bash
# macOS (Homebrew)
brew services start mongodb-community

# Ubuntu/Debian
sudo systemctl start mongod

# Docker
docker run -d --name mongodb -p 27017:27017 mongo:7
```

### Step 2: Restore Database
```bash
# Option A: From BSON dump (recommended — preserves indexes)
mongorestore --db rubber_track_wholesale exports/mongodb/test_database/

# Option B: From JSON files
for f in exports/json/*.json; do
  collection=$(basename "$f" .json)
  mongoimport --db rubber_track_wholesale --collection "$collection" --jsonArray --file "$f"
done
```

### Step 3: Configure Backend
```bash
cd backend

# Create .env
cat > .env << 'EOF'
MONGO_URL=mongodb://localhost:27017
DB_NAME=rubber_track_wholesale
CORS_ORIGINS=http://localhost:3000
SECRET_KEY=your-production-secret-key-min-32-chars
EOF

# Install dependencies
pip install -r requirements.txt

# Start backend
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```
Backend will be at: `http://localhost:8001`
Health check: `http://localhost:8001/api/`

### Step 4: Configure Frontend
```bash
cd frontend

# Create .env
cat > .env << 'EOF'
REACT_APP_BACKEND_URL=http://localhost:8001
EOF

# Install dependencies
yarn install

# Start frontend
yarn start
```
Frontend will be at: `http://localhost:3000`
Admin panel: `http://localhost:3000/#/admin`

---

## Collection Summary

| Collection | Docs | Description |
|-----------|------|-------------|
| brands | 350 | Equipment manufacturers (51 U.S. supported) |
| machine_models | 4,632 | Equipment models with normalized names |
| track_sizes | 381 | Track dimensions (size, width, pitch, links) |
| compatibility | 4,631 | Machine-to-track-size mappings |
| part_numbers | 76 | Rollers, sprockets, idlers |
| products | 3 | Sample products |
| categories | 6 | Product categories |
| admin_users | 1 | Admin login (admin/admin123) |
| compatibilities | 4,305 | Legacy compatibility data (can be ignored) |

**Note**: The `compatibilities` collection is legacy data from earlier imports. The active compatibility data is in the `compatibility` collection.

---

## Architecture Overview

```
frontend/ (React SPA)
├── src/
│   ├── App.js              — Router (HashRouter)
│   ├── pages/
│   │   ├── HomePage.jsx     — Landing + search
│   │   ├── ProductsPage.jsx — Search results + category browsing
│   │   ├── BrandsPage.jsx   — Brand directory
│   │   └── admin/           — Full CMS admin panel
│   └── components/
│       ├── Navbar.jsx
│       ├── CategoryNav.jsx
│       └── RubberTrackCompatibility.jsx

backend/ (FastAPI)
├── server.py      — App entry point, mounts routes under /api
├── database.py    — MongoDB connection + collections
├── auth.py        — JWT auth (bcrypt + python-jose)
├── models.py      — Pydantic models
└── routes/
    ├── public.py  — All public API endpoints
    └── admin.py   — Admin CRUD + CSV import/export
```

---

## CSV Import/Export Endpoints (Admin Auth Required)

All require `Authorization: Bearer <token>` header.

| Entity | Export | Import | Template |
|--------|--------|--------|----------|
| Brands | `GET /api/admin/brands/export-csv` | `POST /api/admin/brands/import-csv` | `GET /api/admin/brands/csv-template` |
| Machine Models | `GET /api/admin/machine-models/export-csv` | `POST /api/admin/machine-models/import-csv` | `GET /api/admin/machine-models/csv-template` |
| Track Sizes | `GET /api/admin/track-sizes/export-csv` | `POST /api/admin/track-sizes/import-csv` | `GET /api/admin/track-sizes/csv-template` |
| Compatibility | `GET /api/admin/compatibility/export-csv` | `POST /api/admin/compatibility/import-csv` | `GET /api/admin/compatibility/csv-template` |
| Products | `GET /api/admin/products/export-csv` | `POST /api/admin/products/import-csv` | `GET /api/admin/products/csv-template` |
| Part Numbers | `GET /api/admin/part-numbers/export-csv` | `POST /api/admin/part-numbers/import-csv` | `GET /api/admin/part-numbers/csv-template` |

### Example: Export brands
```bash
TOKEN=$(curl -s -X POST http://localhost:8001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' | python3 -c "import sys,json;print(json.load(sys.stdin)['access_token'])")

curl -o brands.csv http://localhost:8001/api/admin/brands/export-csv \
  -H "Authorization: Bearer $TOKEN"
```

---

## Key Backend Files (What to Keep)

**Essential** — required to run:
```
backend/server.py
backend/database.py
backend/auth.py
backend/models.py
backend/routes/__init__.py
backend/routes/public.py
backend/routes/admin.py
backend/requirements.txt
backend/.env
```

**Utility scripts** — one-time data tools (keep for reference):
```
backend/import_authoritative_data.py    — CSV import pipeline
backend/enrich_track_sizes.py           — Parses size → width/pitch/links
backend/add_normalized_model_names.py   — Adds model_name_normalized
backend/apply_us_market_flags.py        — Sets is_us_supported flags
backend/validate_data.py                — Data integrity checks
```

**Can be deleted** — old migration scripts:
```
backend/import_*.py (except import_authoritative_data.py)
backend/migrate_*.py
backend/seed_*.py
backend/fix_*.py
backend/remove_*.py
backend/check_data.py
backend/verify_*.py
```

---

## Production Deployment Options

### Option A: VPS (DigitalOcean, Linode, etc.)
1. Install MongoDB, Python, Node
2. Follow local setup steps above
3. Use Nginx as reverse proxy
4. Use PM2/supervisord for process management

### Option B: Docker
```dockerfile
# backend/Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "server:app", "--host", "0.0.0.0", "--port", "8001"]
```

### Option C: Separate Backend + Frontend
- Backend: Any Python hosting (Railway, Render, AWS)
- Frontend: Build with `yarn build`, deploy to Vercel/Netlify/Cloudflare Pages
- Update `REACT_APP_BACKEND_URL` to point to your backend URL
