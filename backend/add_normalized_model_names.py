#!/usr/bin/env python3
"""
Add Normalized Model Names
==========================
Adds model_name_normalized field to machine_models and compatibility collections
for flexible search matching while preserving canonical data.
"""

import re
import os
from datetime import datetime, timezone
from pymongo import MongoClient

MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "test_database")


def normalize_model_name(model_name: str) -> str:
    """
    Normalize a model name for flexible search matching.
    - Removes all spaces, hyphens, underscores, punctuation
    - Converts to lowercase
    
    Examples:
        "PC 50FR-2" -> "pc50fr2"
        "SVL 75-2" -> "svl752"
        "T190" -> "t190"
    """
    if not model_name:
        return ""
    # Remove all non-alphanumeric characters and convert to lowercase
    normalized = re.sub(r'[^a-zA-Z0-9]', '', model_name).lower()
    return normalized


def update_machine_models(db):
    """Add model_name_normalized to all machine_models documents."""
    print("\n" + "=" * 60)
    print("Updating machine_models collection")
    print("=" * 60)
    
    updated = 0
    for doc in db.machine_models.find():
        model_name = doc.get('model_name', '')
        normalized = normalize_model_name(model_name)
        
        db.machine_models.update_one(
            {'_id': doc['_id']},
            {'$set': {'model_name_normalized': normalized}}
        )
        updated += 1
    
    print(f"  ✓ Updated {updated} machine models with normalized field")
    
    # Create index on normalized field
    db.machine_models.create_index('model_name_normalized')
    print("  ✓ Created index on model_name_normalized")
    
    # Show samples
    print("\n  Sample normalizations:")
    samples = list(db.machine_models.find().limit(10))
    for s in samples:
        print(f"    '{s.get('model_name')}' → '{s.get('model_name_normalized')}'")
    
    return updated


def update_compatibility(db):
    """Add model_normalized to all compatibility documents."""
    print("\n" + "=" * 60)
    print("Updating compatibility collection")
    print("=" * 60)
    
    updated = 0
    for doc in db.compatibility.find():
        model = doc.get('model', '')
        normalized = normalize_model_name(model)
        
        db.compatibility.update_one(
            {'_id': doc['_id']},
            {'$set': {'model_normalized': normalized}}
        )
        updated += 1
    
    print(f"  ✓ Updated {updated} compatibility entries with normalized field")
    
    # Create index on normalized field
    db.compatibility.create_index('model_normalized')
    db.compatibility.create_index([('make', 1), ('model_normalized', 1)])
    print("  ✓ Created indexes on model_normalized")
    
    # Show samples
    print("\n  Sample normalizations:")
    samples = list(db.compatibility.find().limit(10))
    for s in samples:
        print(f"    '{s.get('model')}' → '{s.get('model_normalized')}'")
    
    return updated


def verify_search_examples(db):
    """Test search examples to verify normalization works."""
    print("\n" + "=" * 60)
    print("Verifying Search Examples")
    print("=" * 60)
    
    test_cases = [
        # (brand, search_input, expected_behavior)
        ("Komatsu", "pc50fr", "Should match PC 50FR variants"),
        ("Komatsu", "pc50 fr2", "Should match PC 50FR-2"),
        ("Komatsu", "pc 50 fr 2", "Should match PC 50FR-2"),
        ("Kubota", "svl75-2", "Should match SVL 75-2"),
        ("Kubota", "svl", "Should match all SVL models"),
        ("CAT", "259d", "Should match 259D variants"),
    ]
    
    for brand, search_input, expected in test_cases:
        normalized_query = normalize_model_name(search_input)
        
        # Test exact match first
        exact_count = db.compatibility.count_documents({
            'make': {'$regex': f'^{brand}$', '$options': 'i'},
            'model_normalized': normalized_query
        })
        
        # Then prefix match
        prefix_count = db.compatibility.count_documents({
            'make': {'$regex': f'^{brand}$', '$options': 'i'},
            'model_normalized': {'$regex': f'^{normalized_query}', '$options': 'i'}
        })
        
        # Then contains match
        contains_count = db.compatibility.count_documents({
            'make': {'$regex': f'^{brand}$', '$options': 'i'},
            'model_normalized': {'$regex': normalized_query, '$options': 'i'}
        })
        
        print(f"\n  '{brand} {search_input}' → normalized: '{normalized_query}'")
        print(f"    Exact: {exact_count}, Prefix: {prefix_count}, Contains: {contains_count}")
        print(f"    Expected: {expected}")
        
        # Show actual matches (first 5)
        if contains_count > 0:
            matches = list(db.compatibility.find({
                'make': {'$regex': f'^{brand}$', '$options': 'i'},
                'model_normalized': {'$regex': normalized_query, '$options': 'i'}
            }).limit(5))
            for m in matches:
                print(f"      → {m.get('make')} {m.get('model')}")


def main():
    print("\n" + "=" * 60)
    print("NORMALIZED MODEL NAME MIGRATION")
    print(f"Started: {datetime.now(timezone.utc).isoformat()}")
    print("=" * 60)
    
    client = MongoClient(MONGO_URL)
    db = client[DB_NAME]
    
    # Update collections
    mm_count = update_machine_models(db)
    compat_count = update_compatibility(db)
    
    # Verify with test cases
    verify_search_examples(db)
    
    print("\n" + "=" * 60)
    print("MIGRATION COMPLETE")
    print("=" * 60)
    print(f"  Machine Models: {mm_count} updated")
    print(f"  Compatibility:  {compat_count} updated")
    print("=" * 60)


if __name__ == "__main__":
    main()
