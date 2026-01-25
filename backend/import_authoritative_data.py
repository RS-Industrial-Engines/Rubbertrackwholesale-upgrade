#!/usr/bin/env python3
"""
Authoritative Data Import Script
================================
This script performs a clean slate import of all data from the user-provided CSV files.
It clears existing collections and imports fresh data with generated internal IDs.

Usage: python import_authoritative_data.py
"""

import csv
import os
import re
import sys
from datetime import datetime, timezone
from pymongo import MongoClient
from bson import ObjectId


def generate_slug(text):
    """Generate a URL-friendly slug from text."""
    if not text:
        return None
    # Convert to lowercase, replace spaces and special chars with hyphens
    slug = text.lower().strip()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[\s_]+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    slug = slug.strip('-')
    return slug or None

# Configuration
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "test_database")

# File paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FILES = {
    "brands": os.path.join(BASE_DIR, "brands_FROM_compatibility.csv"),
    "machine_models": os.path.join(BASE_DIR, "machine_models_FROM_compatibility.csv"),
    "track_sizes": os.path.join(BASE_DIR, "track_sizes_FROM_compatibility.csv"),
    "compatibility": os.path.join(BASE_DIR, "compatibility_cleaned_UPDATED.csv"),
    "products": os.path.join(BASE_DIR, "products_with_ID_column.csv"),
}

# Results tracking
results = {
    "brands": {"created": 0, "rejected": []},
    "machine_models": {"created": 0, "rejected": []},
    "track_sizes": {"created": 0, "rejected": []},
    "compatibility": {"created": 0, "rejected": []},
    "products": {"created": 0, "rejected": []},
}


def connect_db():
    """Connect to MongoDB and return database instance."""
    client = MongoClient(MONGO_URL)
    return client[DB_NAME]


def clear_collections(db):
    """Clear all target collections for clean slate import."""
    collections_to_clear = ["brands", "machine_models", "track_sizes", "compatibility", "products"]
    print("\n" + "=" * 60)
    print("STEP 0: Clearing existing collections")
    print("=" * 60)
    
    for collection_name in collections_to_clear:
        count = db[collection_name].count_documents({})
        db[collection_name].delete_many({})
        print(f"  ✓ Cleared '{collection_name}': {count} records removed")
    
    print()


def import_brands(db):
    """Import brands from CSV."""
    print("\n" + "=" * 60)
    print("STEP 1: Importing Brands")
    print("=" * 60)
    
    filepath = FILES["brands"]
    if not os.path.exists(filepath):
        print(f"  ✗ File not found: {filepath}")
        return
    
    brands_to_insert = []
    seen_names = set()
    
    with open(filepath, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row_num, row in enumerate(reader, start=2):
            name = row.get("Name", "").strip()
            
            if not name:
                results["brands"]["rejected"].append({
                    "row": row_num,
                    "reason": "Empty brand name",
                    "data": row
                })
                continue
            
            # Skip duplicates within the file
            if name.lower() in seen_names:
                results["brands"]["rejected"].append({
                    "row": row_num,
                    "reason": f"Duplicate brand name: {name}",
                    "data": row
                })
                continue
            
            seen_names.add(name.lower())
            
            brand_doc = {
                "name": name,
                "slug": generate_slug(name),
                "logo": row.get("Logo", "").strip() or None,
                "description": row.get("Description", "").strip() or None,
                "seo_title": row.get("SEO Title", "").strip() or None,
                "seo_description": row.get("SEO Description", "").strip() or None,
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc),
            }
            brands_to_insert.append(brand_doc)
    
    if brands_to_insert:
        db.brands.insert_many(brands_to_insert)
        results["brands"]["created"] = len(brands_to_insert)
    
    print(f"  ✓ Created: {results['brands']['created']} brands")
    print(f"  ✗ Rejected: {len(results['brands']['rejected'])} rows")


def import_machine_models(db):
    """Import machine models from CSV."""
    print("\n" + "=" * 60)
    print("STEP 2: Importing Machine Models")
    print("=" * 60)
    
    filepath = FILES["machine_models"]
    if not os.path.exists(filepath):
        print(f"  ✗ File not found: {filepath}")
        return
    
    models_to_insert = []
    seen_models = set()
    
    with open(filepath, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row_num, row in enumerate(reader, start=2):
            brand = row.get("Brand", "").strip()
            model_name = row.get("Model Name", "").strip()
            full_name = row.get("Full Name", "").strip()
            equipment_type = row.get("Equipment Type", "").strip()
            
            if not brand or not model_name:
                results["machine_models"]["rejected"].append({
                    "row": row_num,
                    "reason": "Missing brand or model name",
                    "data": row
                })
                continue
            
            # Create unique key for deduplication
            unique_key = f"{brand.lower()}|{model_name.lower()}"
            if unique_key in seen_models:
                results["machine_models"]["rejected"].append({
                    "row": row_num,
                    "reason": f"Duplicate model: {brand} {model_name}",
                    "data": row
                })
                continue
            
            seen_models.add(unique_key)
            
            model_doc = {
                "brand": brand,
                "model_name": model_name,
                "full_name": full_name or f"{brand} {model_name}",
                "equipment_type": equipment_type or None,
                "description": row.get("Description", "").strip() or None,
                "image_url": row.get("Image URL", "").strip() or None,
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc),
            }
            models_to_insert.append(model_doc)
    
    if models_to_insert:
        db.machine_models.insert_many(models_to_insert)
        results["machine_models"]["created"] = len(models_to_insert)
    
    print(f"  ✓ Created: {results['machine_models']['created']} machine models")
    print(f"  ✗ Rejected: {len(results['machine_models']['rejected'])} rows")


def import_track_sizes(db):
    """Import track sizes from CSV."""
    print("\n" + "=" * 60)
    print("STEP 3: Importing Track Sizes")
    print("=" * 60)
    
    filepath = FILES["track_sizes"]
    if not os.path.exists(filepath):
        print(f"  ✗ File not found: {filepath}")
        return
    
    sizes_to_insert = []
    seen_sizes = set()
    
    with open(filepath, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row_num, row in enumerate(reader, start=2):
            size = row.get("Size", "").strip()
            
            if not size:
                results["track_sizes"]["rejected"].append({
                    "row": row_num,
                    "reason": "Empty size value",
                    "data": row
                })
                continue
            
            # Normalize size for deduplication
            normalized_size = size.lower().replace(" ", "")
            if normalized_size in seen_sizes:
                results["track_sizes"]["rejected"].append({
                    "row": row_num,
                    "reason": f"Duplicate size: {size}",
                    "data": row
                })
                continue
            
            seen_sizes.add(normalized_size)
            
            # Parse optional numeric fields
            price = None
            try:
                price_str = row.get("Price", "").strip()
                if price_str:
                    price = float(price_str)
            except ValueError:
                pass
            
            inventory_count = None
            try:
                inv_str = row.get("Inventory Count", "").strip()
                if inv_str:
                    inventory_count = int(inv_str)
            except ValueError:
                pass
            
            is_in_stock = row.get("Is In Stock", "").strip().lower() in ["true", "1", "yes"]
            
            size_doc = {
                "size": size,
                "price": price,
                "width_variant": row.get("Width Variant", "").strip() or None,
                "inventory_count": inventory_count,
                "is_in_stock": is_in_stock,
                "description": row.get("Description", "").strip() or None,
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc),
            }
            sizes_to_insert.append(size_doc)
    
    if sizes_to_insert:
        db.track_sizes.insert_many(sizes_to_insert)
        results["track_sizes"]["created"] = len(sizes_to_insert)
    
    print(f"  ✓ Created: {results['track_sizes']['created']} track sizes")
    print(f"  ✗ Rejected: {len(results['track_sizes']['rejected'])} rows")


def import_compatibility(db):
    """Import compatibility data from CSV (authoritative source)."""
    print("\n" + "=" * 60)
    print("STEP 4: Importing Compatibility (Authoritative)")
    print("=" * 60)
    
    filepath = FILES["compatibility"]
    if not os.path.exists(filepath):
        print(f"  ✗ File not found: {filepath}")
        return
    
    compat_to_insert = []
    seen_compat = set()
    
    with open(filepath, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row_num, row in enumerate(reader, start=2):
            make = row.get("Make", "").strip()
            model = row.get("Model", "").strip()
            
            # Use "Track Sizes (Base)" as the primary track sizes field
            track_sizes_str = row.get("Track Sizes (Base)", "").strip()
            
            if not make or not model:
                results["compatibility"]["rejected"].append({
                    "row": row_num,
                    "reason": "Missing make or model",
                    "data": row
                })
                continue
            
            # Create unique key for deduplication
            unique_key = f"{make.lower()}|{model.lower()}"
            if unique_key in seen_compat:
                results["compatibility"]["rejected"].append({
                    "row": row_num,
                    "reason": f"Duplicate compatibility: {make} {model}",
                    "data": row
                })
                continue
            
            seen_compat.add(unique_key)
            
            # Parse track sizes (semicolon-separated)
            track_sizes = []
            if track_sizes_str:
                track_sizes = [s.strip() for s in track_sizes_str.split(";") if s.strip()]
            
            compat_doc = {
                "make": make,
                "model": model,
                "track_sizes": track_sizes,
                "track_sizes_display": row.get("Track Sizes (Display)", "").strip() or track_sizes_str,
                "track_sizes_canonical": row.get("Track Sizes (Canonical w/ N/W)", "").strip() or track_sizes_str,
                "is_active": True,
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc),
            }
            compat_to_insert.append(compat_doc)
    
    if compat_to_insert:
        # Insert in batches for large datasets
        batch_size = 1000
        for i in range(0, len(compat_to_insert), batch_size):
            batch = compat_to_insert[i:i + batch_size]
            db.compatibility.insert_many(batch)
        results["compatibility"]["created"] = len(compat_to_insert)
    
    print(f"  ✓ Created: {results['compatibility']['created']} compatibility records")
    print(f"  ✗ Rejected: {len(results['compatibility']['rejected'])} rows")


def import_products(db):
    """Import products from CSV."""
    print("\n" + "=" * 60)
    print("STEP 5: Importing Products")
    print("=" * 60)
    
    filepath = FILES["products"]
    if not os.path.exists(filepath):
        print(f"  ✗ File not found: {filepath}")
        return
    
    products_to_insert = []
    seen_skus = set()
    
    with open(filepath, "r", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        for row_num, row in enumerate(reader, start=2):
            sku = row.get("SKU", "").strip()
            title = row.get("Title", "").strip()
            
            if not sku or not title:
                results["products"]["rejected"].append({
                    "row": row_num,
                    "reason": "Missing SKU or Title",
                    "data": row
                })
                continue
            
            # Skip duplicates within the file
            if sku.lower() in seen_skus:
                results["products"]["rejected"].append({
                    "row": row_num,
                    "reason": f"Duplicate SKU: {sku}",
                    "data": row
                })
                continue
            
            seen_skus.add(sku.lower())
            
            # Parse price
            price = None
            try:
                price_str = row.get("Price", "").strip()
                if price_str:
                    price = float(price_str)
            except ValueError:
                pass
            
            # Parse stock quantity
            stock_qty = None
            try:
                qty_str = row.get("Stock Quantity", "").strip()
                if qty_str:
                    stock_qty = int(qty_str)
            except ValueError:
                pass
            
            in_stock = row.get("In Stock", "").strip().upper() in ["TRUE", "1", "YES"]
            
            # Generate slug from SKU
            slug = row.get("Unique Key", "").strip() or sku.lower().replace(" ", "-")
            
            product_doc = {
                "sku": sku,
                "name": title,
                "slug": slug,
                "description": row.get("Description", "").strip() or None,
                "price": price,
                "brand": row.get("Brand", "").strip() or None,
                "category": row.get("Category", "").strip() or None,
                "size": row.get("Size", "").strip() or None,
                "part_number": row.get("Part Number", "").strip() or None,
                "in_stock": in_stock,
                "stock_quantity": stock_qty,
                "images": [],
                "created_at": datetime.now(timezone.utc),
                "updated_at": datetime.now(timezone.utc),
            }
            products_to_insert.append(product_doc)
    
    if products_to_insert:
        db.products.insert_many(products_to_insert)
        results["products"]["created"] = len(products_to_insert)
    
    print(f"  ✓ Created: {results['products']['created']} products")
    print(f"  ✗ Rejected: {len(results['products']['rejected'])} rows")


def print_summary():
    """Print final import summary."""
    print("\n" + "=" * 60)
    print("IMPORT SUMMARY")
    print("=" * 60)
    
    total_created = 0
    total_rejected = 0
    
    for collection, data in results.items():
        total_created += data["created"]
        total_rejected += len(data["rejected"])
        print(f"\n  {collection.upper()}:")
        print(f"    Created:  {data['created']}")
        print(f"    Rejected: {len(data['rejected'])}")
    
    print("\n" + "-" * 60)
    print(f"  TOTAL CREATED:  {total_created}")
    print(f"  TOTAL REJECTED: {total_rejected}")
    print("=" * 60)
    
    # Print rejected rows details if any
    if total_rejected > 0:
        print("\n" + "=" * 60)
        print("REJECTED ROWS DETAILS")
        print("=" * 60)
        
        for collection, data in results.items():
            if data["rejected"]:
                print(f"\n  {collection.upper()} ({len(data['rejected'])} rejected):")
                for item in data["rejected"][:10]:  # Show first 10
                    print(f"    Row {item['row']}: {item['reason']}")
                if len(data["rejected"]) > 10:
                    print(f"    ... and {len(data['rejected']) - 10} more")
    
    return total_created, total_rejected


def create_indexes(db):
    """Create indexes for better query performance."""
    print("\n" + "=" * 60)
    print("Creating Indexes")
    print("=" * 60)
    
    # Brands
    db.brands.create_index("name", unique=True)
    print("  ✓ brands.name (unique)")
    
    # Machine models
    db.machine_models.create_index([("brand", 1), ("model_name", 1)], unique=True)
    db.machine_models.create_index("brand")
    db.machine_models.create_index("full_name")
    print("  ✓ machine_models.brand+model_name (unique)")
    print("  ✓ machine_models.brand")
    print("  ✓ machine_models.full_name")
    
    # Track sizes
    db.track_sizes.create_index("size", unique=True)
    print("  ✓ track_sizes.size (unique)")
    
    # Compatibility
    db.compatibility.create_index([("make", 1), ("model", 1)], unique=True)
    db.compatibility.create_index("make")
    db.compatibility.create_index("track_sizes")
    print("  ✓ compatibility.make+model (unique)")
    print("  ✓ compatibility.make")
    print("  ✓ compatibility.track_sizes")
    
    # Products
    db.products.create_index("sku", unique=True)
    db.products.create_index("slug")
    print("  ✓ products.sku (unique)")
    print("  ✓ products.slug")


def main():
    """Main entry point."""
    print("\n" + "=" * 60)
    print("AUTHORITATIVE DATA IMPORT")
    print(f"Started at: {datetime.now(timezone.utc).isoformat()}")
    print("=" * 60)
    
    # Verify files exist
    print("\nVerifying source files...")
    missing_files = []
    for name, path in FILES.items():
        if os.path.exists(path):
            print(f"  ✓ {name}: {path}")
        else:
            print(f"  ✗ {name}: NOT FOUND - {path}")
            missing_files.append(name)
    
    if missing_files and "compatibility" in missing_files:
        print("\n✗ Critical file missing! Aborting.")
        sys.exit(1)
    
    # Connect to database
    print(f"\nConnecting to MongoDB: {MONGO_URL}")
    db = connect_db()
    print(f"Using database: {DB_NAME}")
    
    # Execute import steps
    clear_collections(db)
    import_brands(db)
    import_machine_models(db)
    import_track_sizes(db)
    import_compatibility(db)
    import_products(db)
    
    # Create indexes
    create_indexes(db)
    
    # Print summary
    total_created, total_rejected = print_summary()
    
    print(f"\n✓ Import completed at: {datetime.now(timezone.utc).isoformat()}")
    
    return 0 if total_rejected == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
