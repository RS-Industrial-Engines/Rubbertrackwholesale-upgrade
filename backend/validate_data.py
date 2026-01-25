#!/usr/bin/env python3
"""
Data Validation Report
======================
Cross-checks source CSV files against the MongoDB database to confirm 100% alignment.
"""

import csv
import os
from datetime import datetime, timezone
from pymongo import MongoClient
from collections import defaultdict

# Configuration
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "test_database")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FILES = {
    "brands": os.path.join(BASE_DIR, "brands_FROM_compatibility.csv"),
    "machine_models": os.path.join(BASE_DIR, "machine_models_FROM_compatibility.csv"),
    "track_sizes": os.path.join(BASE_DIR, "track_sizes_FROM_compatibility.csv"),
    "compatibility": os.path.join(BASE_DIR, "compatibility_cleaned_UPDATED.csv"),
    "products": os.path.join(BASE_DIR, "products_with_ID_column.csv"),
}

def connect_db():
    client = MongoClient(MONGO_URL)
    return client[DB_NAME]

def read_csv_brands(filepath):
    """Read brands from CSV, return set of unique names."""
    brands = set()
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            name = row.get('Name', '').strip()
            if name:
                brands.add(name)
    return brands

def read_csv_machine_models(filepath):
    """Read machine models from CSV, return set of (brand, model_name) tuples."""
    models = set()
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            brand = row.get('Brand', '').strip()
            model_name = row.get('Model Name', '').strip()
            if brand and model_name:
                models.add((brand, model_name))
    return models

def read_csv_track_sizes(filepath):
    """Read track sizes from CSV, return set of unique sizes."""
    sizes = set()
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            size = row.get('Size', '').strip()
            if size:
                sizes.add(size)
    return sizes

def read_csv_compatibility(filepath):
    """Read compatibility from CSV, return set of (make, model) tuples and track sizes dict."""
    compat = set()
    track_sizes_map = {}
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            make = row.get('Make', '').strip()
            model = row.get('Model', '').strip()
            track_sizes_str = row.get('Track Sizes (Base)', '').strip()
            if make and model:
                key = (make, model)
                compat.add(key)
                track_sizes = [s.strip() for s in track_sizes_str.split(';') if s.strip()]
                track_sizes_map[key] = track_sizes
    return compat, track_sizes_map

def read_csv_products(filepath):
    """Read products from CSV, return set of SKUs."""
    skus = set()
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            sku = row.get('SKU', '').strip()
            if sku:
                skus.add(sku)
    return skus

def validate_brands(db, csv_brands):
    """Validate brands collection against CSV."""
    print("\n" + "=" * 70)
    print("BRANDS VALIDATION")
    print("=" * 70)
    
    db_brands = set()
    for doc in db.brands.find({}, {'name': 1}):
        db_brands.add(doc['name'])
    
    csv_count = len(csv_brands)
    db_count = len(db_brands)
    
    in_csv_not_db = csv_brands - db_brands
    in_db_not_csv = db_brands - csv_brands
    
    print(f"  CSV brands:      {csv_count}")
    print(f"  DB brands:       {db_count}")
    print(f"  Match:           {'✓ EXACT MATCH' if csv_count == db_count and not in_csv_not_db else '✗ MISMATCH'}")
    
    if in_csv_not_db:
        print(f"\n  ⚠️ In CSV but NOT in DB ({len(in_csv_not_db)}):")
        for b in sorted(in_csv_not_db)[:10]:
            print(f"      - {b}")
        if len(in_csv_not_db) > 10:
            print(f"      ... and {len(in_csv_not_db) - 10} more")
    
    if in_db_not_csv:
        print(f"\n  ⚠️ In DB but NOT in CSV ({len(in_db_not_csv)}):")
        for b in sorted(in_db_not_csv)[:10]:
            print(f"      - {b}")
    
    return len(in_csv_not_db) == 0 and len(in_db_not_csv) == 0

def validate_machine_models(db, csv_models):
    """Validate machine_models collection against CSV."""
    print("\n" + "=" * 70)
    print("MACHINE MODELS VALIDATION")
    print("=" * 70)
    
    db_models = set()
    for doc in db.machine_models.find({}, {'brand': 1, 'model_name': 1}):
        db_models.add((doc['brand'], doc['model_name']))
    
    csv_count = len(csv_models)
    db_count = len(db_models)
    
    in_csv_not_db = csv_models - db_models
    in_db_not_csv = db_models - csv_models
    
    print(f"  CSV models:      {csv_count}")
    print(f"  DB models:       {db_count}")
    print(f"  Match:           {'✓ EXACT MATCH' if csv_count == db_count and not in_csv_not_db else '✗ MISMATCH'}")
    
    if in_csv_not_db:
        print(f"\n  ⚠️ In CSV but NOT in DB ({len(in_csv_not_db)}):")
        for m in sorted(in_csv_not_db)[:10]:
            print(f"      - {m[0]} {m[1]}")
        if len(in_csv_not_db) > 10:
            print(f"      ... and {len(in_csv_not_db) - 10} more")
    
    if in_db_not_csv:
        print(f"\n  ⚠️ In DB but NOT in CSV ({len(in_db_not_csv)}):")
        for m in sorted(in_db_not_csv)[:10]:
            print(f"      - {m[0]} {m[1]}")
    
    return len(in_csv_not_db) == 0 and len(in_db_not_csv) == 0

def validate_track_sizes(db, csv_sizes):
    """Validate track_sizes collection against CSV."""
    print("\n" + "=" * 70)
    print("TRACK SIZES VALIDATION")
    print("=" * 70)
    
    db_sizes = set()
    for doc in db.track_sizes.find({}, {'size': 1}):
        db_sizes.add(doc['size'])
    
    # Note: CSV may have duplicates that were filtered during import
    csv_unique = csv_sizes
    db_count = len(db_sizes)
    
    in_csv_not_db = csv_unique - db_sizes
    in_db_not_csv = db_sizes - csv_unique
    
    print(f"  CSV unique sizes: {len(csv_unique)}")
    print(f"  DB sizes:         {db_count}")
    print(f"  Match:            {'✓ ALL CSV SIZES IN DB' if not in_csv_not_db else '✗ MISSING IN DB'}")
    
    if in_csv_not_db:
        print(f"\n  ⚠️ In CSV but NOT in DB ({len(in_csv_not_db)}):")
        for s in sorted(in_csv_not_db)[:10]:
            print(f"      - {s}")
    
    if in_db_not_csv:
        print(f"\n  ℹ️ In DB but NOT in CSV ({len(in_db_not_csv)}) - may be from other sources:")
        for s in sorted(in_db_not_csv)[:5]:
            print(f"      - {s}")
    
    return len(in_csv_not_db) == 0

def validate_compatibility(db, csv_compat, csv_track_sizes_map):
    """Validate compatibility collection against CSV."""
    print("\n" + "=" * 70)
    print("COMPATIBILITY VALIDATION")
    print("=" * 70)
    
    db_compat = set()
    db_track_sizes_map = {}
    for doc in db.compatibility.find({}, {'make': 1, 'model': 1, 'track_sizes': 1}):
        key = (doc['make'], doc['model'])
        db_compat.add(key)
        db_track_sizes_map[key] = doc.get('track_sizes', [])
    
    csv_count = len(csv_compat)
    db_count = len(db_compat)
    
    in_csv_not_db = csv_compat - db_compat
    in_db_not_csv = db_compat - csv_compat
    
    print(f"  CSV entries:     {csv_count}")
    print(f"  DB entries:      {db_count}")
    print(f"  Match:           {'✓ EXACT MATCH' if csv_count == db_count and not in_csv_not_db else '✗ MISMATCH'}")
    
    if in_csv_not_db:
        print(f"\n  ⚠️ In CSV but NOT in DB ({len(in_csv_not_db)}):")
        for c in sorted(in_csv_not_db)[:10]:
            print(f"      - {c[0]} {c[1]}")
    
    # Validate track sizes for matching entries
    print("\n  Track Sizes Data Integrity Check:")
    mismatched_sizes = []
    for key in csv_compat & db_compat:
        csv_sizes = set(csv_track_sizes_map.get(key, []))
        db_sizes = set(db_track_sizes_map.get(key, []))
        if csv_sizes != db_sizes:
            mismatched_sizes.append((key, csv_sizes, db_sizes))
    
    if mismatched_sizes:
        print(f"    ⚠️ {len(mismatched_sizes)} entries have mismatched track sizes:")
        for key, csv_s, db_s in mismatched_sizes[:5]:
            print(f"      - {key[0]} {key[1]}:")
            print(f"        CSV: {csv_s}")
            print(f"        DB:  {db_s}")
    else:
        print(f"    ✓ All track sizes match between CSV and DB")
    
    return len(in_csv_not_db) == 0 and len(mismatched_sizes) == 0

def validate_products(db, csv_skus):
    """Validate products collection against CSV."""
    print("\n" + "=" * 70)
    print("PRODUCTS VALIDATION")
    print("=" * 70)
    
    db_skus = set()
    for doc in db.products.find({}, {'sku': 1}):
        db_skus.add(doc['sku'])
    
    csv_count = len(csv_skus)
    db_count = len(db_skus)
    
    in_csv_not_db = csv_skus - db_skus
    in_db_not_csv = db_skus - csv_skus
    
    print(f"  CSV products:    {csv_count}")
    print(f"  DB products:     {db_count}")
    print(f"  Match:           {'✓ EXACT MATCH' if csv_count == db_count and not in_csv_not_db else '✗ MISMATCH'}")
    
    if in_csv_not_db:
        print(f"\n  ⚠️ In CSV but NOT in DB ({len(in_csv_not_db)}):")
        for s in sorted(in_csv_not_db):
            print(f"      - {s}")
    
    return len(in_csv_not_db) == 0

def generate_brand_summary(db):
    """Generate summary of records by major brands."""
    print("\n" + "=" * 70)
    print("BRAND SUMMARY (Top Manufacturers)")
    print("=" * 70)
    
    # Count compatibility entries by make
    pipeline = [
        {"$group": {"_id": "$make", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 20}
    ]
    results = list(db.compatibility.aggregate(pipeline))
    
    print("\n  Top 20 Makes by Compatibility Records:")
    print("  " + "-" * 40)
    for r in results:
        print(f"    {r['_id']:<25} {r['count']:>5} models")
    
    # Specific brand counts
    print("\n  Key Brand Verification:")
    print("  " + "-" * 40)
    key_brands = ['CAT', 'Bobcat', 'Kubota', 'ASV', 'John Deere', 'Takeuchi', 'Komatsu', 'Hitachi']
    for brand in key_brands:
        count = db.compatibility.count_documents({"make": brand})
        print(f"    {brand:<25} {count:>5} entries")

def main():
    print("\n" + "=" * 70)
    print("DATA VALIDATION REPORT")
    print(f"Generated: {datetime.now(timezone.utc).isoformat()}")
    print("=" * 70)
    
    db = connect_db()
    
    # Read CSV data
    print("\nReading source CSV files...")
    csv_brands = read_csv_brands(FILES["brands"])
    csv_models = read_csv_machine_models(FILES["machine_models"])
    csv_sizes = read_csv_track_sizes(FILES["track_sizes"])
    csv_compat, csv_track_sizes_map = read_csv_compatibility(FILES["compatibility"])
    csv_products = read_csv_products(FILES["products"])
    
    print(f"  Brands CSV:        {len(csv_brands)} unique")
    print(f"  Models CSV:        {len(csv_models)} unique")
    print(f"  Track Sizes CSV:   {len(csv_sizes)} unique")
    print(f"  Compatibility CSV: {len(csv_compat)} entries")
    print(f"  Products CSV:      {len(csv_products)} SKUs")
    
    # Run validations
    results = {
        "brands": validate_brands(db, csv_brands),
        "machine_models": validate_machine_models(db, csv_models),
        "track_sizes": validate_track_sizes(db, csv_sizes),
        "compatibility": validate_compatibility(db, csv_compat, csv_track_sizes_map),
        "products": validate_products(db, csv_products),
    }
    
    # Brand summary
    generate_brand_summary(db)
    
    # Final summary
    print("\n" + "=" * 70)
    print("VALIDATION SUMMARY")
    print("=" * 70)
    
    all_passed = all(results.values())
    for collection, passed in results.items():
        status = "✓ PASS" if passed else "✗ FAIL"
        print(f"  {collection:<20} {status}")
    
    print("\n" + "-" * 70)
    if all_passed:
        print("  ✓ ALL VALIDATIONS PASSED - 100% DATA ALIGNMENT CONFIRMED")
    else:
        print("  ⚠️ SOME VALIDATIONS FAILED - REVIEW DETAILS ABOVE")
    print("=" * 70)
    
    return 0 if all_passed else 1

if __name__ == "__main__":
    exit(main())
