"""
Add Yanmar and Kubota excavator models to machine_models collection
This ensures they appear in the Find Parts By Equipment dropdowns
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(MONGO_URL)
db = client['test_database']

# Models to add
YANMAR_EXCAVATORS = [
    "B 03", "B 03 Scopy", "B 05", "B 05 Scopy", "B 05R Scopy", "B 05SV", 
    "B 158", "B 22", "B 22-2", "B 22-2A", "B 22-2CR", "B 25", 
    "B 27 (New)", "B 27 (old)", "B 27-1", "B 27-2", "B 2U", "B 2V", 
    "B 2X", "B 2X-1", "B 3 (New)", "B 3 (old)", "B 3-2", "B 31", 
    "B 32", "B 32-2", "B 37 (new)", "B 37 (old)", "B 37-1", "B 37-2", 
    "B 37-2A", "B 43", "B 5", "B 5-1", "B 5-2", "B 50", "B 50-1", 
    "B 50-2", "B 50-2A", "B 50M", "B 6", "B 6U", "B 7", "B-5X",
    "VIO 30", "VIO 350", "VIO 40", "VIO 40-CR", "VIO 40-PC", "VIO 40-PR",
    "VIO 50", "VIO 50-CR", "VIO 50-PR",
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

async def add_to_machine_models():
    """Add excavator models to machine_models collection"""
    print("=" * 80)
    print("🔧 ADDING EXCAVATORS TO MACHINE_MODELS COLLECTION")
    print("=" * 80)
    
    added = 0
    skipped = 0
    
    # Add Yanmar models
    print("\n📥 Adding Yanmar excavator models...")
    for model in YANMAR_EXCAVATORS:
        # Check if already exists
        existing = await db.machine_models.find_one({
            'brand': 'Yanmar',
            'model_name': model
        })
        
        if existing:
            skipped += 1
            continue
        
        # Insert new model
        doc = {
            'brand': 'Yanmar',
            'model_name': model,
            'full_name': f'Yanmar {model}',
            'equipment_type': 'Mini Excavator',
            'created_at': datetime.utcnow().isoformat() + 'Z',
            'updated_at': datetime.utcnow().isoformat() + 'Z'
        }
        
        await db.machine_models.insert_one(doc)
        print(f"  ✓ Added: Yanmar {model}")
        added += 1
    
    # Add Kubota models
    print("\n📥 Adding Kubota excavator models...")
    for model in KUBOTA_EXCAVATORS:
        # Check if already exists
        existing = await db.machine_models.find_one({
            'brand': 'Kubota',
            'model_name': model
        })
        
        if existing:
            skipped += 1
            continue
        
        # Insert new model
        doc = {
            'brand': 'Kubota',
            'model_name': model,
            'full_name': f'Kubota {model}',
            'equipment_type': 'Mini Excavator',
            'created_at': datetime.utcnow().isoformat() + 'Z',
            'updated_at': datetime.utcnow().isoformat() + 'Z'
        }
        
        await db.machine_models.insert_one(doc)
        print(f"  ✓ Added: Kubota {model}")
        added += 1
    
    print(f"\n✅ Complete!")
    print(f"   Added: {added}")
    print(f"   Skipped (duplicates): {skipped}")
    
    # Verify
    yanmar_count = await db.machine_models.count_documents({'brand': 'Yanmar'})
    kubota_count = await db.machine_models.count_documents({'brand': 'Kubota'})
    
    print(f"\n🔍 Verification:")
    print(f"   Total Yanmar models in machine_models: {yanmar_count}")
    print(f"   Total Kubota models in machine_models: {kubota_count}")
    
    print("\n" + "=" * 80)
    
    client.close()

if __name__ == "__main__":
    asyncio.run(add_to_machine_models())
