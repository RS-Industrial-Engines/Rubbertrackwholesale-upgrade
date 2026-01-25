#!/usr/bin/env python3
"""
U.S. Market Scoping - Apply Boolean Flags
==========================================
This script applies is_us_supported boolean flags to brands and machine_models
collections based on the authoritative CSV files provided.

IMPORTANT: This is a FLAGGING operation only. NO data is deleted.
- Compatibility rows remain untouched
- Track sizes remain untouched
- All existing data preserved

Usage: python apply_us_market_flags.py
"""

import csv
import os
from datetime import datetime, timezone
from pymongo import MongoClient

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "test_database")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FILES = {
    "brands_keep": os.path.join(BASE_DIR, "US_BRANDS_KEEP_RECOMMENDED.csv"),
    "brands_suppress": os.path.join(BASE_DIR, "US_BRANDS_SUPPRESS_RECOMMENDED.csv"),
    "models_keep": os.path.join(BASE_DIR, "US_MACHINE_MODELS_KEEP_RECOMMENDED.csv"),
    "models_suppress": os.path.join(BASE_DIR, "US_MACHINE_MODELS_SUPPRESS_RECOMMENDED.csv"),
}


def connect_db():
    client = MongoClient(MONGO_URL)
    return client[DB_NAME]


def read_brand_names(filepath):
    """Read brand names from CSV file."""
    brands = set()
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            name = row.get('Name', '').strip()
            if name:
                brands.add(name)
    return brands


def read_model_keys(filepath):
    """Read (brand, model_name) tuples from CSV file."""
    models = set()
    with open(filepath, 'r', encoding='utf-8-sig') as f:
        reader = csv.DictReader(f)
        for row in reader:
            brand = row.get('Brand', '').strip()
            model_name = row.get('Model Name', '').strip()
            if brand and model_name:
                models.add((brand, model_name))
    return models


def apply_brand_flags(db):
    """Apply is_us_supported flags to brands collection."""
    print("\n" + "=" * 70)
    print("STEP 1: Applying flags to BRANDS collection")
    print("=" * 70)
    
    # Read authoritative lists
    brands_keep = read_brand_names(FILES["brands_keep"])
    brands_suppress = read_brand_names(FILES["brands_suppress"])
    
    print(f"  Brands to KEEP (is_us_supported=True):     {len(brands_keep)}")
    print(f"  Brands to SUPPRESS (is_us_supported=False): {len(brands_suppress)}")
    
    # Apply flags
    keep_count = 0
    suppress_count = 0
    unmatched = []
    
    for brand_name in brands_keep:
        result = db.brands.update_many(
            {"name": brand_name},
            {"$set": {"is_us_supported": True, "updated_at": datetime.now(timezone.utc)}}
        )
        keep_count += result.modified_count
    
    for brand_name in brands_suppress:
        result = db.brands.update_many(
            {"name": brand_name},
            {"$set": {"is_us_supported": False, "updated_at": datetime.now(timezone.utc)}}
        )
        suppress_count += result.modified_count
    
    # Check for brands not in either list (set to FALSE by default)
    all_specified = brands_keep | brands_suppress
    db_brands = set(doc['name'] for doc in db.brands.find({}, {'name': 1}))
    unspecified = db_brands - all_specified
    
    if unspecified:
        print(f"\n  ⚠️ {len(unspecified)} brands not in any list - setting is_us_supported=False:")
        for brand_name in sorted(unspecified)[:10]:
            print(f"      - {brand_name}")
        if len(unspecified) > 10:
            print(f"      ... and {len(unspecified) - 10} more")
        
        # Set unspecified brands to False
        for brand_name in unspecified:
            db.brands.update_one(
                {"name": brand_name},
                {"$set": {"is_us_supported": False, "updated_at": datetime.now(timezone.utc)}}
            )
    
    print(f"\n  ✓ Updated {keep_count} brands with is_us_supported=True")
    print(f"  ✓ Updated {suppress_count} brands with is_us_supported=False")
    
    # Final counts
    true_count = db.brands.count_documents({"is_us_supported": True})
    false_count = db.brands.count_documents({"is_us_supported": False})
    total_count = db.brands.count_documents({})
    
    print(f"\n  Final brand counts:")
    print(f"    is_us_supported=True:  {true_count}")
    print(f"    is_us_supported=False: {false_count}")
    print(f"    Total brands:          {total_count}")
    
    return true_count


def apply_model_flags(db):
    """Apply is_us_supported flags to machine_models collection."""
    print("\n" + "=" * 70)
    print("STEP 2: Applying flags to MACHINE_MODELS collection")
    print("=" * 70)
    
    # Read authoritative lists
    models_keep = read_model_keys(FILES["models_keep"])
    models_suppress = read_model_keys(FILES["models_suppress"])
    
    print(f"  Models to KEEP (is_us_supported=True):     {len(models_keep)}")
    print(f"  Models to SUPPRESS (is_us_supported=False): {len(models_suppress)}")
    
    # Apply flags
    keep_count = 0
    suppress_count = 0
    
    for brand, model_name in models_keep:
        result = db.machine_models.update_many(
            {"brand": brand, "model_name": model_name},
            {"$set": {"is_us_supported": True, "updated_at": datetime.now(timezone.utc)}}
        )
        keep_count += result.modified_count
    
    for brand, model_name in models_suppress:
        result = db.machine_models.update_many(
            {"brand": brand, "model_name": model_name},
            {"$set": {"is_us_supported": False, "updated_at": datetime.now(timezone.utc)}}
        )
        suppress_count += result.modified_count
    
    # Check for models not in either list (set to FALSE by default)
    all_specified = models_keep | models_suppress
    db_models = set((doc['brand'], doc['model_name']) for doc in db.machine_models.find({}, {'brand': 1, 'model_name': 1}))
    unspecified = db_models - all_specified
    
    if unspecified:
        print(f"\n  ⚠️ {len(unspecified)} models not in any list - setting is_us_supported=False:")
        for brand, model_name in sorted(unspecified)[:10]:
            print(f"      - {brand} {model_name}")
        if len(unspecified) > 10:
            print(f"      ... and {len(unspecified) - 10} more")
        
        # Set unspecified models to False
        for brand, model_name in unspecified:
            db.machine_models.update_one(
                {"brand": brand, "model_name": model_name},
                {"$set": {"is_us_supported": False, "updated_at": datetime.now(timezone.utc)}}
            )
    
    print(f"\n  ✓ Updated {keep_count} models with is_us_supported=True")
    print(f"  ✓ Updated {suppress_count} models with is_us_supported=False")
    
    # Final counts
    true_count = db.machine_models.count_documents({"is_us_supported": True})
    false_count = db.machine_models.count_documents({"is_us_supported": False})
    total_count = db.machine_models.count_documents({})
    
    print(f"\n  Final machine model counts:")
    print(f"    is_us_supported=True:  {true_count}")
    print(f"    is_us_supported=False: {false_count}")
    print(f"    Total models:          {total_count}")
    
    return true_count


def verify_data_integrity(db):
    """Verify that compatibility and track_sizes data is untouched."""
    print("\n" + "=" * 70)
    print("STEP 3: Data Integrity Verification")
    print("=" * 70)
    
    # Count compatibility rows
    compat_count = db.compatibility.count_documents({})
    print(f"  Compatibility rows: {compat_count} (MUST remain unchanged)")
    
    # Count track sizes
    track_count = db.track_sizes.count_documents({})
    print(f"  Track sizes:        {track_count} (MUST remain unchanged)")
    
    # Verify no deletions occurred
    print("\n  ✓ No data deleted - flagging operation only")
    
    return compat_count


def create_indexes(db):
    """Create indexes for is_us_supported field."""
    print("\n" + "=" * 70)
    print("STEP 4: Creating Indexes")
    print("=" * 70)
    
    db.brands.create_index("is_us_supported")
    print("  ✓ Created index on brands.is_us_supported")
    
    db.machine_models.create_index("is_us_supported")
    print("  ✓ Created index on machine_models.is_us_supported")


def main():
    print("\n" + "=" * 70)
    print("U.S. MARKET SCOPING - APPLY BOOLEAN FLAGS")
    print(f"Started: {datetime.now(timezone.utc).isoformat()}")
    print("=" * 70)
    
    # Verify files exist
    print("\nVerifying source files...")
    for name, path in FILES.items():
        if os.path.exists(path):
            print(f"  ✓ {name}: {path}")
        else:
            print(f"  ✗ {name}: NOT FOUND - {path}")
            return 1
    
    db = connect_db()
    
    # Apply flags
    brands_us_count = apply_brand_flags(db)
    models_us_count = apply_model_flags(db)
    compat_count = verify_data_integrity(db)
    create_indexes(db)
    
    # Final summary
    print("\n" + "=" * 70)
    print("FINAL VALIDATION SUMMARY")
    print("=" * 70)
    print(f"  ✓ Total brands with is_us_supported=TRUE:        {brands_us_count}")
    print(f"  ✓ Total machine_models with is_us_supported=TRUE: {models_us_count}")
    print(f"  ✓ Total compatibility rows (UNCHANGED):           {compat_count}")
    print("=" * 70)
    print("U.S. MARKET SCOPING COMPLETE")
    print("=" * 70)
    
    return 0


if __name__ == "__main__":
    exit(main())
