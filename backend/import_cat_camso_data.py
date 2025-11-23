"""
Import/Update Caterpillar track data based on Camso website research
This script adds missing track sizes and updates compatibility data
"""
import asyncio
from database import db, track_sizes_collection, compatibility_collection
from datetime import datetime

# Track data from Camso research
CAT_TRACK_DATA = {
    # Compact Track Loaders - Based on Camso.co research
    "247": {
        "series": ["247", "247A", "247B", "247B2", "247B3"],
        "track_sizes": ["381x100x42"],  # 15x4x42
        "notes": "General Duty Track"
    },
    "257": {
        "series": ["257", "257A", "257B", "257B2", "257B3", "257D", "257D3"],
        "track_sizes": ["381x100x42"],  # 15x4x42
        "notes": "General Duty Track"
    },
    "267": {
        "series": ["267", "267A", "267B"],
        "track_sizes": ["457x100.6x56"],  # 18x4x56
        "notes": "General Duty Track"
    },
    "277": {
        "series": ["277", "277A", "277B"],
        "track_sizes": ["457x100.6x56"],  # 18x4x56 for A, B series
        "notes": "General Duty Track for A, B series"
    },
    "277C": {
        "series": ["277C", "277C2", "277D"],
        "track_sizes": ["457x100.6x51"],  # 18x4x51
        "notes": "General Duty for C series and later"
    },
    "287": {
        "series": ["287", "287A", "287B", "287C", "287D"],
        "track_sizes": ["457x100x51"],  # 18x4x51
        "notes": "General Duty Track"
    },
    "289": {
        "series": ["289C", "289C2", "289D", "289D2", "289D3"],
        "track_sizes": ["400x86x56", "450x86x60"],  # Two sizes available
        "notes": "Heavy Duty Block or Bar Track options"
    },
    "297": {
        "series": ["297C", "297D", "297D2", "297D2 XHP"],
        "track_sizes": ["457x100x51"],  # 18x4x51
        "notes": "General Duty Track"
    },
    "299": {
        "series": ["299C", "299C2", "299D", "299D XHP", "299D2", "299D2 XHP", "299D3", "299D3XE"],
        "track_sizes": ["450x86x60", "400x86x60"],  # Primary: 450, Alternative: 400
        "notes": "Heavy Duty Rubber Track - 450 is primary size, 400 is narrower alternative"
    },
    "259": {
        "series": ["259", "259B", "259B3", "259C", "259D", "259D3"],
        "track_sizes": ["320x86x53"],  # 12.6x3.4x53
        "notes": "Multi-Bar rubber track, premium grade option"
    },
    "279": {
        "series": ["279C", "279C2", "279D", "279D2", "279D3"],
        "track_sizes": ["400x86x56", "450x86x60"],  # Two sizes available
        "notes": "Heavy Duty Block or Bar Track options"
    }
}

async def add_track_size_if_missing(size: str, description: str = None):
    """Add track size to database if it doesn't exist"""
    existing = await track_sizes_collection.find_one({"size": size})
    
    if not existing:
        # Parse size to extract width, pitch, links
        parts = size.replace('x', ' ').replace('.', ' ').split()
        width = float(parts[0]) if len(parts) > 0 else None
        pitch = float(parts[1]) if len(parts) > 1 else None
        links = int(parts[2]) if len(parts) > 2 else None
        
        track_size_doc = {
            "size": size,
            "width": width,
            "pitch": pitch,
            "links": links,
            "price": None,
            "is_in_stock": False,
            "description": description or f"Caterpillar rubber track {size}",
            "is_active": True,
            "width_variant": None,
            "inventory_count": 0,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        await track_sizes_collection.insert_one(track_size_doc)
        print(f"  ✓ Added track size: {size}")
        return True
    else:
        print(f"  - Track size already exists: {size}")
        return False

async def update_compatibility(make: str, model: str, track_sizes: list):
    """Update or insert compatibility entry"""
    existing = await compatibility_collection.find_one({
        "make": make,
        "model": model
    })
    
    if existing:
        # Update if track sizes are different
        existing_sizes = set(existing.get('track_sizes', []))
        new_sizes = set(track_sizes)
        
        if existing_sizes != new_sizes:
            await compatibility_collection.update_one(
                {"make": make, "model": model},
                {
                    "$set": {
                        "track_sizes": track_sizes,
                        "updated_at": datetime.utcnow()
                    }
                }
            )
            print(f"  ↻ Updated: {make} {model}: {track_sizes}")
            return "updated"
        else:
            print(f"  = No change: {make} {model}")
            return "unchanged"
    else:
        # Insert new compatibility entry
        compat_doc = {
            "make": make,
            "model": model,
            "track_sizes": track_sizes,
            "is_active": True,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        await compatibility_collection.insert_one(compat_doc)
        print(f"  + Added: {make} {model}: {track_sizes}")
        return "added"

async def import_camso_cat_data():
    """Import CAT data from Camso research"""
    print("=" * 80)
    print("IMPORTING CATERPILLAR DATA FROM CAMSO RESEARCH")
    print("=" * 80)
    
    stats = {
        "track_sizes_added": 0,
        "compatibility_added": 0,
        "compatibility_updated": 0,
        "compatibility_unchanged": 0
    }
    
    # First, add all track sizes
    print("\n[1] Adding Track Sizes...")
    print("-" * 80)
    all_sizes = set()
    for model_data in CAT_TRACK_DATA.values():
        all_sizes.update(model_data["track_sizes"])
    
    for size in sorted(all_sizes):
        added = await add_track_size_if_missing(size, f"Caterpillar {size}")
        if added:
            stats["track_sizes_added"] += 1
    
    # Then, update compatibility for all models
    print("\n[2] Updating Compatibility Data...")
    print("-" * 80)
    for base_model, model_data in CAT_TRACK_DATA.items():
        print(f"\nProcessing {base_model} series:")
        for model in model_data["series"]:
            result = await update_compatibility("CAT", model, model_data["track_sizes"])
            stats[f"compatibility_{result}"] += 1
    
    # Print summary
    print("\n" + "=" * 80)
    print("IMPORT SUMMARY")
    print("=" * 80)
    print(f"Track Sizes Added:        {stats['track_sizes_added']}")
    print(f"Compatibility Added:      {stats['compatibility_added']}")
    print(f"Compatibility Updated:    {stats['compatibility_updated']}")
    print(f"Compatibility Unchanged:  {stats['compatibility_unchanged']}")
    print("=" * 80)
    
    # Verify a few key models
    print("\n[3] Verification - Sample Models:")
    print("-" * 80)
    test_models = ["299D", "279D", "289D", "257", "277B"]
    for model in test_models:
        entry = await compatibility_collection.find_one({"make": "CAT", "model": model})
        if entry:
            print(f"  ✓ {model}: {entry.get('track_sizes', [])}")
        else:
            print(f"  ✗ {model}: NOT FOUND")
    
    print("\n✅ Import complete!")

if __name__ == "__main__":
    asyncio.run(import_camso_cat_data())
