"""
Data Verification Script
Compares the Full & Final Camso Size Chart Excel file with MongoDB database
to identify missing brands and models.
"""
import pandas as pd
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
import os
from collections import defaultdict

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(MONGO_URL)
db = client['parts_finder']

async def get_database_brands_and_models():
    """Fetch all brands and models from the compatibility collection"""
    print("\n📊 Fetching data from MongoDB...")
    
    compatibility_data = await db.compatibility.find({}, {'make': 1, 'model': 1}).to_list(length=None)
    
    # Organize by brand
    db_brands = defaultdict(set)
    for entry in compatibility_data:
        make = entry.get('make', '').strip()
        model = entry.get('model', '').strip()
        if make:
            db_brands[make].add(model)
    
    print(f"✅ Found {len(db_brands)} brands in database")
    print(f"✅ Found {len(compatibility_data)} total compatibility entries")
    
    return dict(db_brands)

def extract_spreadsheet_data(file_path):
    """Extract brands and models from the Camso Excel file"""
    print(f"\n📄 Reading Excel file: {file_path}")
    
    try:
        # Read the Excel file
        # Try to read all sheets first to understand structure
        xl_file = pd.ExcelFile(file_path)
        print(f"📋 Found {len(xl_file.sheet_names)} sheets: {xl_file.sheet_names}")
        
        # Read the first sheet (usually the main data)
        df = pd.read_excel(file_path, sheet_name=0)
        print(f"✅ Loaded sheet with {len(df)} rows and {len(df.columns)} columns")
        print(f"📊 Columns: {list(df.columns)}")
        
        # Display first few rows to understand structure
        print("\n📋 First 5 rows preview:")
        print(df.head())
        
        # Try to identify brand/model columns
        # Common column names: Make, Brand, Model, Machine, etc.
        brand_col = None
        model_col = None
        
        for col in df.columns:
            col_lower = str(col).lower()
            if 'make' in col_lower or 'brand' in col_lower or 'manufacturer' in col_lower:
                brand_col = col
            if 'model' in col_lower or 'machine' in col_lower:
                model_col = col
        
        print(f"\n🔍 Identified columns: Brand='{brand_col}', Model='{model_col}'")
        
        if not brand_col or not model_col:
            print("⚠️  Could not auto-identify brand/model columns. Showing all columns:")
            for i, col in enumerate(df.columns):
                print(f"  {i}: {col}")
            return None
        
        # Extract brands and models
        spreadsheet_brands = defaultdict(set)
        
        for _, row in df.iterrows():
            brand = str(row[brand_col]).strip()
            model = str(row[model_col]).strip()
            
            # Skip empty or NaN values
            if brand and brand != 'nan' and brand != 'None':
                if model and model != 'nan' and model != 'None':
                    spreadsheet_brands[brand].add(model)
        
        print(f"✅ Extracted {len(spreadsheet_brands)} brands from spreadsheet")
        total_models = sum(len(models) for models in spreadsheet_brands.values())
        print(f"✅ Extracted {total_models} total models from spreadsheet")
        
        return dict(spreadsheet_brands)
        
    except Exception as e:
        print(f"❌ Error reading Excel file: {e}")
        import traceback
        traceback.print_exc()
        return None

def compare_data(spreadsheet_brands, db_brands):
    """Compare spreadsheet data with database and identify missing items"""
    print("\n🔍 COMPARISON ANALYSIS")
    print("=" * 80)
    
    # Find missing brands
    missing_brands = set(spreadsheet_brands.keys()) - set(db_brands.keys())
    
    # Find missing models for existing brands
    missing_models_by_brand = defaultdict(set)
    existing_brands_with_gaps = []
    
    for brand in spreadsheet_brands:
        if brand in db_brands:
            spreadsheet_models = spreadsheet_brands[brand]
            db_models = db_brands[brand]
            missing = spreadsheet_models - db_models
            if missing:
                missing_models_by_brand[brand] = missing
                existing_brands_with_gaps.append(brand)
    
    # Generate report
    print("\n" + "=" * 80)
    print("📋 MISSING BRANDS (Present in Spreadsheet, Missing from Database)")
    print("=" * 80)
    
    if missing_brands:
        print(f"\n🚨 Found {len(missing_brands)} MISSING BRANDS:\n")
        for i, brand in enumerate(sorted(missing_brands), 1):
            model_count = len(spreadsheet_brands[brand])
            print(f"{i:3d}. {brand:30s} ({model_count} models)")
    else:
        print("\n✅ All brands from spreadsheet exist in database!")
    
    print("\n" + "=" * 80)
    print("📋 MISSING MODELS (Brands exist, but missing specific models)")
    print("=" * 80)
    
    if missing_models_by_brand:
        print(f"\n⚠️  Found {len(missing_models_by_brand)} brands with missing models:\n")
        for brand in sorted(missing_models_by_brand.keys()):
            missing = missing_models_by_brand[brand]
            print(f"\n{brand} ({len(missing)} missing models):")
            for model in sorted(missing):
                print(f"  - {model}")
    else:
        print("\n✅ All models from spreadsheet exist in database!")
    
    # Summary statistics
    print("\n" + "=" * 80)
    print("📊 SUMMARY STATISTICS")
    print("=" * 80)
    
    spreadsheet_total_models = sum(len(models) for models in spreadsheet_brands.values())
    db_total_models = sum(len(models) for models in db_brands.values())
    
    print(f"\nSpreadsheet:")
    print(f"  - Brands: {len(spreadsheet_brands)}")
    print(f"  - Total Models: {spreadsheet_total_models}")
    
    print(f"\nDatabase:")
    print(f"  - Brands: {len(db_brands)}")
    print(f"  - Total Models: {db_total_models}")
    
    print(f"\nGaps:")
    print(f"  - Missing Brands: {len(missing_brands)}")
    print(f"  - Brands with Missing Models: {len(missing_models_by_brand)}")
    missing_model_count = sum(len(models) for models in missing_models_by_brand.values())
    print(f"  - Total Missing Models: {missing_model_count}")
    
    return {
        'missing_brands': sorted(missing_brands),
        'missing_models_by_brand': {brand: sorted(models) for brand, models in missing_models_by_brand.items()},
        'spreadsheet_brands': len(spreadsheet_brands),
        'db_brands': len(db_brands),
        'spreadsheet_models': spreadsheet_total_models,
        'db_models': db_total_models
    }

async def main():
    print("=" * 80)
    print("🔍 CAMSO DATA VERIFICATION TOOL")
    print("=" * 80)
    print("\nThis tool compares the Full & Final Camso Size Chart with the database")
    print("to identify missing brands and models.\n")
    
    # Path to the Excel file
    excel_path = "/app/backend/camso_size_chart.xlsx"
    
    # Extract spreadsheet data
    spreadsheet_brands = extract_spreadsheet_data(excel_path)
    
    if spreadsheet_brands is None:
        print("\n❌ Failed to extract data from spreadsheet. Exiting.")
        return
    
    # Get database data
    db_brands = await get_database_brands_and_models()
    
    # Compare and generate report
    results = compare_data(spreadsheet_brands, db_brands)
    
    print("\n" + "=" * 80)
    print("✅ VERIFICATION COMPLETE")
    print("=" * 80)
    
    # Close MongoDB connection
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
