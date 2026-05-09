import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import sys

async def check_mongo():
    try:
        client = AsyncIOMotorClient("mongodb://localhost:27017", serverSelectionTimeoutMS=2000)
        await client.admin.command('ping')
        print("MongoDB is UP")
    except Exception as e:
        print(f"MongoDB is DOWN: {e}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(check_mongo())
