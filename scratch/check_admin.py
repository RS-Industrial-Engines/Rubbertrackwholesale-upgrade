import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv
from pathlib import Path

async def check_admin_user():
    ROOT_DIR = Path(__file__).parent.parent / 'backend'
    load_dotenv(ROOT_DIR / '.env')
    mongo_url = os.environ.get('MONGO_URL')
    db_name = os.environ.get('DB_NAME')
    
    client = AsyncIOMotorClient(mongo_url)
    db = client[db_name]
    
    admin = await db.admin_users.find_one({"username": "admin"})
    if admin:
        print(f"Admin user found: {admin['username']}")
    else:
        print("Admin user NOT found in Atlas database")

if __name__ == "__main__":
    asyncio.run(check_admin_user())
