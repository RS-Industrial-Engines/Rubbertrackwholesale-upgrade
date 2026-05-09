import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import sys
import os
from dotenv import load_dotenv
from pathlib import Path

async def check_mongo():
    ROOT_DIR = Path(__file__).parent.parent / 'backend'
    load_dotenv(ROOT_DIR / '.env')
    mongo_url = os.environ.get('MONGO_URL')
    print(f"Testing connection to: {mongo_url.split('@')[-1]}")
    try:
        client = AsyncIOMotorClient(mongo_url, serverSelectionTimeoutMS=5000)
        await client.admin.command('ping')
        print("MongoDB Atlas is UP and credentials are VALID")
    except Exception as e:
        print(f"MongoDB Atlas is DOWN or credentials INVALID: {e}")
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(check_mongo())
