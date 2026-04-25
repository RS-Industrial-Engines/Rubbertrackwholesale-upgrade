"""
Script to enrich track_sizes collection with extracted width, pitch, and links fields
from the size string (e.g., "320x86x52" -> width=320, pitch=86, links=52).
Also handles decimal sizes like "300x52.5x80".
"""
import asyncio
import re
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "test_database"


async def enrich_track_sizes():
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    track_sizes = await db.track_sizes.find().to_list(length=None)
    print(f"Found {len(track_sizes)} track sizes to process")
    
    updated = 0
    failed = 0
    
    for ts in track_sizes:
        size_str = ts.get("size", "")
        # Parse size string like "320x86x52" or "300x52.5x80"
        match = re.match(r'^(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)x(\d+(?:\.\d+)?)$', size_str.strip())
        
        if match:
            width = float(match.group(1))
            pitch = float(match.group(2))
            links = int(float(match.group(3)))
            
            await db.track_sizes.update_one(
                {"_id": ts["_id"]},
                {"$set": {
                    "width": width,
                    "pitch": pitch,
                    "links": links
                }}
            )
            updated += 1
        else:
            print(f"  Could not parse size: '{size_str}'")
            failed += 1
    
    print(f"\nDone: {updated} updated, {failed} failed")
    
    # Verify
    sample = await db.track_sizes.find_one({"width": {"$exists": True}})
    if sample:
        print(f"Sample: size={sample['size']}, width={sample.get('width')}, pitch={sample.get('pitch')}, links={sample.get('links')}")


if __name__ == "__main__":
    asyncio.run(enrich_track_sizes())
