"""
Comprehensive verification script against unitedskidtracks.com
This script will crawl the website systematically and compare with our database
"""
import asyncio
import requests
from bs4 import BeautifulSoup
from database import compatibility_collection, track_sizes_collection
from datetime import datetime
import time

# Priority brands to check (most popular)
PRIORITY_BRANDS = {
    "track_loaders": [
        ("Caterpillar", "https://unitedskidtracks.com/track-loaders/caterpillar/"),
        ("Bobcat", "https://unitedskidtracks.com/track-loaders/bobcat/"),
        ("Kubota", "https://unitedskidtracks.com/track-loaders/kubota/"),
        ("John Deere", "https://unitedskidtracks.com/track-loaders/john-deere/"),
        ("CASE", "https://unitedskidtracks.com/track-loaders/case/"),
        ("ASV", "https://unitedskidtracks.com/track-loaders/asv/"),
    ],
    "mini_excavators": [
        ("Caterpillar", "https://unitedskidtracks.com/mini-excavators/caterpillar/"),
        ("Bobcat", "https://unitedskidtracks.com/mini-excavators/bobcat/"),
        ("Kubota", "https://unitedskidtracks.com/mini-excavators/kubota/"),
        ("John Deere", "https://unitedskidtracks.com/mini-excavators/john-deere/"),
        ("Takeuchi", "https://unitedskidtracks.com/mini-excavators/takeuchi/"),
    ]
}

def fetch_model_track_size(url):
    """Fetch track size for a specific model"""
    try:
        time.sleep(0.5)  # Rate limiting
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            return None
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Look for product listings with track sizes
        # Track sizes usually appear in product titles like "Bobcat T190 Track - 320x86x52"
        products = soup.find_all('h4', class_='card-title')
        
        track_sizes = set()
        for product in products:
            title = product.get_text()
            # Extract track size pattern: NNNxNNxNN or NNxNxNN
            import re
            matches = re.findall(r'(\d{2,3}x\d{1,3}\.?\d?x\d{2,3})', title)
            track_sizes.update(matches)
        
        return list(track_sizes) if track_sizes else None
        
    except Exception as e:
        print(f"Error fetching {url}: {e}")
        return None

async def verify_brand_models(brand_name, brand_url, equipment_type):
    """Verify all models for a brand"""
    print(f"\n{'='*80}")
    print(f"Checking {brand_name} - {equipment_type}")
    print(f"{'='*80}")
    
    try:
        # Fetch brand page
        response = requests.get(brand_url, timeout=10)
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Find all model links
        model_links = []
        for link in soup.find_all('a', href=True):
            href = link['href']
            if f"/{brand_name.lower().replace(' ', '-')}/" in href.lower() and '/tracks/' in href:
                model_links.append(href)
        
        print(f"Found {len(model_links)} model/track pages")
        
        # Process each model
        discrepancies = []
        for link in model_links[:10]:  # Limit to first 10 for now
            # Extract model name from URL
            parts = link.rstrip('/').split('/')
            model_name = parts[-2] if len(parts) >= 2 else None
            
            if not model_name or model_name in ['tracks', 'sprockets', 'idlers', 'rollers']:
                continue
            
            print(f"\n  Checking {brand_name} {model_name}...")
            
            # Fetch track sizes from website
            full_url = f"https://unitedskidtracks.com{link}" if link.startswith('/') else link
            web_track_sizes = fetch_model_track_size(full_url)
            
            if not web_track_sizes:
                print(f"    ⚠️  Could not extract track sizes from website")
                continue
            
            print(f"    Website has: {web_track_sizes}")
            
            # Check database - normalize brand name
            db_brand = brand_name
            if brand_name == "Caterpillar":
                db_brand = "CAT"
            elif brand_name == "John Deere":
                db_brand = "John Deere"  # Keep as is
            
            # Query database
            db_entry = await compatibility_collection.find_one({
                "make": {"$regex": f"^{db_brand}$", "$options": "i"},
                "model": {"$regex": f"^{model_name}$", "$options": "i"}
            })
            
            if db_entry:
                db_track_sizes = db_entry.get('track_sizes', [])
                print(f"    Database has: {db_track_sizes}")
                
                # Compare
                web_set = set(web_track_sizes)
                db_set = set(db_track_sizes)
                
                missing_in_db = web_set - db_set
                extra_in_db = db_set - web_set
                
                if missing_in_db or extra_in_db:
                    discrepancies.append({
                        'brand': db_brand,
                        'model': model_name,
                        'web_sizes': web_track_sizes,
                        'db_sizes': db_track_sizes,
                        'missing_in_db': list(missing_in_db),
                        'extra_in_db': list(extra_in_db)
                    })
                    
                    if missing_in_db:
                        print(f"    ⚠️  Missing in DB: {missing_in_db}")
                    if extra_in_db:
                        print(f"    ℹ️  Extra in DB: {extra_in_db}")
                else:
                    print(f"    ✓ Match!")
            else:
                print(f"    ✗ NOT IN DATABASE")
                discrepancies.append({
                    'brand': db_brand,
                    'model': model_name,
                    'web_sizes': web_track_sizes,
                    'db_sizes': [],
                    'missing_in_db': web_track_sizes,
                    'extra_in_db': []
                })
        
        return discrepancies
        
    except Exception as e:
        print(f"Error processing {brand_name}: {e}")
        return []

async def main():
    print("="*80)
    print("UNITEDSKIDTRACKS.COM DATA VERIFICATION")
    print("="*80)
    print("\nThis script will verify rubber track compatibility data against")
    print("unitedskidtracks.com for major brands.")
    print("\nNote: This is a sample verification of first 10 models per brand.")
    print("For full verification, increase the limit in the script.")
    print("="*80)
    
    all_discrepancies = []
    
    # Check Track Loaders
    print("\n\n" + "="*80)
    print("TRACK LOADERS")
    print("="*80)
    for brand_name, brand_url in PRIORITY_BRANDS["track_loaders"]:
        discrepancies = await verify_brand_models(brand_name, brand_url, "Track Loaders")
        all_discrepancies.extend(discrepancies)
    
    # Check Mini Excavators
    print("\n\n" + "="*80)
    print("MINI EXCAVATORS")
    print("="*80)
    for brand_name, brand_url in PRIORITY_BRANDS["mini_excavators"]:
        discrepancies = await verify_brand_models(brand_name, brand_url, "Mini Excavators")
        all_discrepancies.extend(discrepancies)
    
    # Summary
    print("\n\n" + "="*80)
    print("VERIFICATION SUMMARY")
    print("="*80)
    print(f"\nTotal discrepancies found: {len(all_discrepancies)}")
    
    if all_discrepancies:
        print("\nDiscrepancies by type:")
        missing_count = len([d for d in all_discrepancies if d['missing_in_db']])
        not_in_db_count = len([d for d in all_discrepancies if not d['db_sizes']])
        
        print(f"  - Models with missing track sizes: {missing_count}")
        print(f"  - Models not in database: {not_in_db_count}")
        
        print("\n\nDetailed discrepancies:")
        for disc in all_discrepancies[:20]:  # Show first 20
            print(f"\n  {disc['brand']} {disc['model']}:")
            if disc['missing_in_db']:
                print(f"    Missing in DB: {disc['missing_in_db']}")
            if not disc['db_sizes']:
                print(f"    NOT IN DATABASE")
    else:
        print("\n✓ All checked models match!")
    
    print("\n" + "="*80)
    print("Note: This was a sample check. For comprehensive verification,")
    print("modify the script to check all models (remove [:10] limit).")
    print("="*80)

if __name__ == "__main__":
    asyncio.run(main())
