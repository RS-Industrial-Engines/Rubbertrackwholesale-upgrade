"""
Import Yanmar and Kubota excavator models from Camso Size Chart
Adds only the specific models requested: 77 Yanmar excavators + 10 Kubota excavators
"""
import pandas as pd
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
import os
from datetime import datetime

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(MONGO_URL)
db = client['test_database']

# Models to import
YANMAR_EXCAVATORS = [
    # B Series
    "B 03", "B 03 Scopy", "B 05", "B 05 Scopy", "B 05R Scopy", "B 05SV", 
    "B 158", "B 22", "B 22-2", "B 22-2A", "B 22-2CR", "B 25", 
    "B 27 (New)", "B 27 (old)", "B 27-1", "B 27-2", "B 2U", "B 2V", 
    "B 2X", "B 2X-1", "B 3 (New)", "B 3 (old)", "B 3-2", "B 31", 
    "B 32", "B 32-2", "B 37 (new)", "B 37 (old)", "B 37-1", "B 37-2", 
    "B 37-2A", "B 43", "B 5", "B 5-1", "B 5-2", "B 50", "B 50-1", 
    "B 50-2", "B 50-2A", "B 50M", "B 6", "B 6U", "B 7", "B-5X",
    # VIO Series
    "VIO 30", "VIO 350", "VIO 40", "VIO 40-CR", "VIO 40-PC", "VIO 40-PR",
    "VIO 50", "VIO 50-CR", "VIO 50-PR",
    # YB Series
    "YB 191", "YB 20", "YB 201", "YB 221", "YB 231", "YB 241", "YB 241Z",
    "YB 251", "YB 27", "YB 271", "YB 271 (New)", "YB 271 (old)", "YB 271.30",
    "YB 281", "YB 281X", "YB 281X-2", "YB 281XR", "YB 301", "YB 301-2U",
    "YB 32", "YB 351", "YB 352", "YB 401", "YB 451", "YB 501", "YB 551",
    "YB 551X-B"
]

KUBOTA_EXCAVATORS = [
    "K 005", "K 022 (Lotus root)", "K 030-3 (Lotus root)", "K 50SR",
    "KH 005", "KX 005", "KX 191", "KX 41SRV-1", "KX 60-2", "KX 60-3"
]

def normalize_model_name(model):
    """Normalize model name for comparison"""
    return model.strip().upper()

async def extract_models_from_spreadsheet(file_path):
    """Extract specific models and their track sizes from the Camso spreadsheet"""
    print(f"\n📄 Reading Excel file: {file_path}")
    
    # Create normalized lookup sets
    yanmar_lookup = {normalize_model_name(m): m for m in YANMAR_EXCAVATORS}
    kubota_lookup = {normalize_model_name(m): m for m in KUBOTA_EXCAVATORS}
    
    models_data = []
    xl_file = pd.ExcelFile(file_path)
    
    print(f"📖 Searching through {len(xl_file.sheet_names)} sheets...")
    
    for sheet_name in xl_file.sheet_names:
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        
        # Get column names (assuming 'Make ' and 'Model')
        brand_col = 'Make '
        model_col = 'Model'
        size1_col = 'Size 1'
        size2_col = 'Size 2'
        
        for _, row in df.iterrows():
            brand = str(row[brand_col]).strip()
            model = str(row[model_col]).strip()
            
            if brand == 'nan' or brand == 'None' or model == 'nan' or model == 'None':
                continue
            
            model_normalized = normalize_model_name(model)
            
            # Check if this is one of our target models
            target_model = None
            if brand == 'Yanmar' and model_normalized in yanmar_lookup:
                target_model = yanmar_lookup[model_normalized]
            elif brand == 'Kubota' and model_normalized in kubota_lookup:
                target_model = kubota_lookup[model_normalized]
            
            if target_model:
                # Extract track sizes
                track_sizes = []
                size1 = str(row[size1_col]).strip()
                size2 = str(row[size2_col]).strip()
                
                if size1 and size1 != 'nan' and size1 != 'None':
                    track_sizes.append(size1.upper())
                if size2 and size2 != 'nan' and size2 != 'None':
                    track_sizes.append(size2.upper())
                
                models_data.append({
                    'make': brand,
                    'model': model,  # Use original spelling from spreadsheet
                    'track_sizes': track_sizes
                })
                
                print(f"  ✓ Found: {brand} {model} - Track sizes: {track_sizes}")
    
    return models_data

async def import_to_database(models_data):
    """Import models to the compatibility collection"""
    print(f"\n📥 Importing {len(models_data)} models to database...")
    
    imported = 0
    skipped = 0
    
    for model_data in models_data:
        # Check if already exists
        existing = await db.compatibility.find_one({
            'make': model_data['make'],
            'model': model_data['model']
        })
        
        if existing:
            print(f"  ⚠️  Skipped (already exists): {model_data['make']} {model_data['model']}")
            skipped += 1
            continue
        
        # Insert new model
        doc = {
            'make': model_data['make'],
            'model': model_data['model'],
            'track_sizes': model_data['track_sizes'],
            'is_active': True,
            'created_at': datetime.utcnow(),
            'updated_at': datetime.utcnow()
        }
        
        await db.compatibility.insert_one(doc)
        print(f"  ✓ Imported: {model_data['make']} {model_data['model']}")
        imported += 1
    
    print(f"\n✅ Import complete!")
    print(f"   Imported: {imported}")
    print(f"   Skipped (duplicates): {skipped}")
    
    return imported, skipped

async def main():
    print("=" * 80)
    print("🔧 YANMAR & KUBOTA EXCAVATOR IMPORT TOOL")
    print("=" * 80)
    print("\nImporting 87 excavator models:")
    print(f"  - Yanmar: {len(YANMAR_EXCAVATORS)} models")
    print(f"  - Kubota: {len(KUBOTA_EXCAVATORS)} models")
    
    # Extract from spreadsheet
    excel_path = "/app/backend/camso_size_chart.xlsx"
    models_data = await extract_models_from_spreadsheet(excel_path)
    
    print(f"\n📊 Extraction Summary:")
    print(f"   Found {len(models_data)} models with track sizes")
    
    if len(models_data) == 0:
        print("\n❌ No models found in spreadsheet. Exiting.")
        return
    
    # Import to database
    imported, skipped = await import_to_database(models_data)
    
    # Verify import
    print("\n🔍 Verification:")
    yanmar_count = await db.compatibility.count_documents({'make': 'Yanmar'})
    kubota_count = await db.compatibility.count_documents({'make': 'Kubota'})
    print(f"   Total Yanmar models in DB: {yanmar_count}")
    print(f"   Total Kubota models in DB: {kubota_count}")
    
    print("\n" + "=" * 80)
    print("✅ IMPORT COMPLETE")
    print("=" * 80)
    
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
