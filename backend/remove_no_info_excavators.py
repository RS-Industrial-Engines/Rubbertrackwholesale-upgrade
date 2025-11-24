"""
Remove Yanmar and Kubota excavator models that have "NO INFO" track sizes
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(MONGO_URL)
db = client['test_database']

# Models to remove (the ones we added that have NO INFO)
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

async def remove_models():
    """Remove models with NO INFO from both collections"""
    print("=" * 80)
    print("🗑️  REMOVING EXCAVATOR MODELS WITH 'NO INFO' TRACK SIZES")
    print("=" * 80)
    
    removed_compatibility = 0
    removed_machine_models = 0
    
    print("\n📥 Removing from compatibility collection...")
    # Remove from compatibility collection
    for model in YANMAR_EXCAVATORS:
        result = await db.compatibility.delete_one({
            'make': 'Yanmar',
            'model': model,
            'track_sizes': ['NO INFO', 'NO INFO']
        })
        if result.deleted_count > 0:
            print(f"  ✓ Removed: Yanmar {model}")
            removed_compatibility += 1
    
    for model in KUBOTA_EXCAVATORS:
        result = await db.compatibility.delete_one({
            'make': 'Kubota',
            'model': model,
            'track_sizes': ['NO INFO', 'NO INFO']
        })
        if result.deleted_count > 0:
            print(f"  ✓ Removed: Kubota {model}")
            removed_compatibility += 1
    
    print("\n📥 Removing from machine_models collection...")
    # Remove from machine_models collection
    for model in YANMAR_EXCAVATORS:
        result = await db.machine_models.delete_one({
            'brand': 'Yanmar',
            'model_name': model
        })
        if result.deleted_count > 0:
            print(f"  ✓ Removed: Yanmar {model}")
            removed_machine_models += 1
    
    for model in KUBOTA_EXCAVATORS:
        result = await db.machine_models.delete_one({
            'brand': 'Kubota',
            'model_name': model
        })
        if result.deleted_count > 0:
            print(f"  ✓ Removed: Kubota {model}")
            removed_machine_models += 1
    
    print(f"\n✅ Removal complete!")
    print(f"   Removed from compatibility: {removed_compatibility}")
    print(f"   Removed from machine_models: {removed_machine_models}")
    
    # Verify removal
    yanmar_compat = await db.compatibility.count_documents({'make': 'Yanmar'})
    kubota_compat = await db.compatibility.count_documents({'make': 'Kubota'})
    yanmar_models = await db.machine_models.count_documents({'brand': 'Yanmar'})
    kubota_models = await db.machine_models.count_documents({'brand': 'Kubota'})
    
    print(f"\n🔍 Verification:")
    print(f"   Yanmar in compatibility: {yanmar_compat}")
    print(f"   Kubota in compatibility: {kubota_compat}")
    print(f"   Yanmar in machine_models: {yanmar_models}")
    print(f"   Kubota in machine_models: {kubota_models}")
    
    print("\n" + "=" * 80)
    
    client.close()

if __name__ == "__main__":
    asyncio.run(remove_models())
