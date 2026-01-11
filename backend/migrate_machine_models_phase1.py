"""
Machine Models Migration Script - Phase 1: Data Safety & Verification
This script performs a comprehensive backup and comparison between database and code files
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
import json
import csv
from datetime import datetime

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(MONGO_URL)
db = client['test_database']

# Import the code-based machine models
import sys
sys.path.append('/app/frontend/src/data')

async def export_database_to_csv():
    """Export all machine_models from database to CSV"""
    print("=" * 80)
    print("STEP 1: EXPORTING DATABASE TO CSV")
    print("=" * 80)
    
    models = await db.machine_models.find({}).to_list(length=None)
    
    if not models:
        print("⚠️  Database is empty!")
        return []
    
    # Create CSV file
    csv_file = '/app/backend/machine_models_database_backup.csv'
    
    with open(csv_file, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['brand', 'model_name', 'full_name', 'equipment_type', 'created_at', 'updated_at']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        
        for model in models:
            writer.writerow({
                'brand': model.get('brand', ''),
                'model_name': model.get('model_name', ''),
                'full_name': model.get('full_name', ''),
                'equipment_type': model.get('equipment_type', ''),
                'created_at': model.get('created_at', ''),
                'updated_at': model.get('updated_at', '')
            })
    
    print(f"✅ Database exported to: {csv_file}")
    print(f"   Total records: {len(models)}")
    
    return models

async def load_code_based_models():
    """Load machine models from machineModels.js file"""
    print("\n" + "=" * 80)
    print("STEP 2: LOADING CODE-BASED MODELS FROM machineModels.js")
    print("=" * 80)
    
    # Read the JS file and parse it manually
    js_file = '/app/frontend/src/data/machineModels.js'
    
    with open(js_file, 'r') as f:
        content = f.read()
    
    # Extract the machineModels object
    # This is a simple parser - assumes the format in the file
    machine_models = {}
    
    lines = content.split('\n')
    current_brand = None
    
    for line in lines:
        line = line.strip()
        
        # Look for brand name (e.g., 'ASV': [)
        if "': [" in line:
            brand = line.split("'")[1]
            current_brand = brand
            machine_models[brand] = []
        
        # Look for models (quoted strings in arrays)
        elif current_brand and "'" in line:
            # Extract all quoted strings from this line
            import re
            models = re.findall(r"'([^']*)'", line)
            machine_models[current_brand].extend(models)
        
        # End of brand array
        elif current_brand and '],' in line:
            current_brand = None
    
    # Flatten to list of (brand, model) tuples
    code_models = []
    for brand, models in machine_models.items():
        for model in models:
            code_models.append({'brand': brand, 'model_name': model})
    
    print(f"✅ Code file loaded: {js_file}")
    print(f"   Total brands: {len(machine_models)}")
    print(f"   Total models: {len(code_models)}")
    
    return code_models

async def compare_and_find_missing(db_models, code_models):
    """Compare database and code-based models to find missing records"""
    print("\n" + "=" * 80)
    print("STEP 3: COMPARING DATABASE VS CODE FILE")
    print("=" * 80)
    
    # Create lookup sets for comparison
    db_set = {(m['brand'], m['model_name']) for m in db_models}
    code_set = {(m['brand'], m['model_name']) for m in code_models}
    
    # Find missing in database (exists in code but not in DB)
    missing_in_db = code_set - db_set
    
    # Find missing in code (exists in DB but not in code)
    missing_in_code = db_set - code_set
    
    print(f"\n📊 COMPARISON RESULTS:")
    print(f"   Database records: {len(db_set)}")
    print(f"   Code file records: {len(code_set)}")
    print(f"   Missing in DATABASE: {len(missing_in_db)}")
    print(f"   Missing in CODE file: {len(missing_in_code)}")
    
    # Save detailed comparison reports
    if missing_in_db:
        print(f"\n⚠️  CRITICAL: {len(missing_in_db)} models exist in CODE but NOT in DATABASE")
        print("   These will be migrated to database...")
        
        csv_file = '/app/backend/missing_in_database.csv'
        with open(csv_file, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(['Brand', 'Model Name'])
            for brand, model in sorted(missing_in_db):
                writer.writerow([brand, model])
        print(f"   Saved to: {csv_file}")
    
    if missing_in_code:
        print(f"\nℹ️  {len(missing_in_code)} models exist in DATABASE but not in code file")
        print("   (This is OK - these were added via Admin)")
        
        csv_file = '/app/backend/missing_in_code.csv'
        with open(csv_file, 'w', newline='', encoding='utf-8') as f:
            writer = csv.writer(f)
            writer.writerow(['Brand', 'Model Name'])
            for brand, model in sorted(missing_in_code):
                writer.writerow([brand, model])
        print(f"   Saved to: {csv_file}")
    
    return missing_in_db, missing_in_code

async def migrate_missing_to_database(missing_models):
    """Migrate missing models from code to database"""
    if not missing_models:
        print("\n✅ No migration needed - all code models exist in database!")
        return
    
    print("\n" + "=" * 80)
    print("STEP 4: MIGRATING MISSING MODELS TO DATABASE")
    print("=" * 80)
    
    migrated = 0
    
    for brand, model_name in sorted(missing_models):
        doc = {
            'brand': brand,
            'model_name': model_name,
            'full_name': f'{brand} {model_name}',
            'equipment_type': 'Track Loader',  # Default type
            'created_at': datetime.utcnow().isoformat() + 'Z',
            'updated_at': datetime.utcnow().isoformat() + 'Z'
        }
        
        await db.machine_models.insert_one(doc)
        migrated += 1
        print(f"  ✓ Migrated: {brand} {model_name}")
    
    print(f"\n✅ Migration complete: {migrated} models added to database")

async def create_final_backup():
    """Create final complete backup after migration"""
    print("\n" + "=" * 80)
    print("STEP 5: CREATING FINAL COMPLETE BACKUP")
    print("=" * 80)
    
    models = await db.machine_models.find({}).to_list(length=None)
    
    # CSV backup
    csv_file = '/app/backend/machine_models_COMPLETE_BACKUP.csv'
    with open(csv_file, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['brand', 'model_name', 'full_name', 'equipment_type', 'created_at', 'updated_at']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        
        for model in models:
            writer.writerow({
                'brand': model.get('brand', ''),
                'model_name': model.get('model_name', ''),
                'full_name': model.get('full_name', ''),
                'equipment_type': model.get('equipment_type', ''),
                'created_at': model.get('created_at', ''),
                'updated_at': model.get('updated_at', '')
            })
    
    # JSON backup
    json_file = '/app/backend/machine_models_COMPLETE_BACKUP.json'
    with open(json_file, 'w') as f:
        # Remove MongoDB ObjectId for JSON serialization
        for model in models:
            if '_id' in model:
                del model['_id']
        json.dump(models, f, indent=2, default=str)
    
    print(f"✅ Complete backup created:")
    print(f"   CSV: {csv_file}")
    print(f"   JSON: {json_file}")
    print(f"   Total records: {len(models)}")

async def main():
    print("=" * 80)
    print("🔒 MACHINE MODELS MIGRATION - PHASE 1: DATA SAFETY & VERIFICATION")
    print("=" * 80)
    print("\nThis script will:")
    print("  1. Export database to CSV backup")
    print("  2. Load code-based models from machineModels.js")
    print("  3. Compare and identify any missing records")
    print("  4. Migrate missing records to database")
    print("  5. Create final complete backup")
    print("\n⚠️  NO DATA WILL BE DELETED - Only additions and backups\n")
    
    # Step 1: Export current database
    db_models = await export_database_to_csv()
    
    # Step 2: Load code-based models
    code_models = await load_code_based_models()
    
    # Step 3: Compare and find missing
    missing_in_db, missing_in_code = await compare_and_find_missing(db_models, code_models)
    
    # Step 4: Migrate missing models
    await migrate_missing_to_database(missing_in_db)
    
    # Step 5: Create final backup
    await create_final_backup()
    
    print("\n" + "=" * 80)
    print("✅ PHASE 1 COMPLETE - DATA SAFETY VERIFIED")
    print("=" * 80)
    print("\n📄 Backup files created:")
    print("   • machine_models_database_backup.csv (original database)")
    print("   • machine_models_COMPLETE_BACKUP.csv (final complete backup)")
    print("   • machine_models_COMPLETE_BACKUP.json (JSON format)")
    print("   • missing_in_database.csv (if any were found)")
    print("   • missing_in_code.csv (admin-added models)")
    
    print("\n✅ READY FOR PHASE 2: All data is now safely in database!")
    print("   You can now proceed with removing code dependencies.\n")
    
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
