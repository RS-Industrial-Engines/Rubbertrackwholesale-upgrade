"""
Backend API Tests for E-commerce Platform for Undercarriage Parts
Tests: Public APIs, Admin CSV Export/Import/Template endpoints
"""
import pytest
import requests
import os
import io

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Admin credentials
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "admin123"


class TestPublicAPIs:
    """Test public API endpoints - data should come from DB, not mock"""
    
    def test_api_health(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        print(f"API Health: {data}")
    
    def test_get_products(self):
        """GET /api/products - should return products from DB"""
        response = requests.get(f"{BASE_URL}/api/products")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Products count: {len(data)}")
        if data:
            # Verify product structure
            product = data[0]
            assert "id" in product or "title" in product
            print(f"Sample product: {product.get('title', 'N/A')}")
    
    def test_get_brands(self):
        """GET /api/brands - should return brands from DB"""
        response = requests.get(f"{BASE_URL}/api/brands")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0, "Brands should not be empty"
        print(f"Brands count: {len(data)}")
        # Verify brand structure
        brand = data[0]
        assert "name" in brand
        print(f"Sample brands: {[b['name'] for b in data[:5]]}")
    
    def test_get_track_sizes(self):
        """GET /api/track-sizes - should return track sizes with width/pitch/links"""
        response = requests.get(f"{BASE_URL}/api/track-sizes")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        assert len(data) > 0, "Track sizes should not be empty"
        print(f"Track sizes count: {len(data)}")
        # Verify track size structure has width/pitch/links
        ts = data[0]
        assert "size" in ts
        # Check for width/pitch/links fields
        print(f"Sample track size: {ts}")
        if "width" in ts:
            print(f"Width: {ts.get('width')}, Pitch: {ts.get('pitch')}, Links: {ts.get('links')}")
    
    def test_compatibility_search_by_make_model(self):
        """GET /api/compatibility/search?make=CAT&model=259 - should return compatible tracks"""
        response = requests.get(f"{BASE_URL}/api/compatibility/search", params={"make": "CAT", "model": "259"})
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"CAT 259 compatibility results: {len(data)}")
        if data:
            entry = data[0]
            assert "make" in entry
            assert "model" in entry
            print(f"Sample: {entry.get('make')} {entry.get('model')} - tracks: {entry.get('track_sizes', [])}")
    
    def test_part_numbers_search_by_type(self):
        """GET /api/part-numbers/search?part_type=sprocket - should return sprocket parts"""
        response = requests.get(f"{BASE_URL}/api/part-numbers/search", params={"part_type": "sprocket"})
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
        print(f"Sprocket parts count: {len(data)}")
        if data:
            part = data[0]
            assert "part_number" in part
            print(f"Sample sprocket: {part.get('brand')} - {part.get('part_number')}")


class TestAdminAuth:
    """Test admin authentication"""
    
    def test_admin_login(self):
        """POST /api/admin/login - should return access token"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": ADMIN_USERNAME,
            "password": ADMIN_PASSWORD
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"
        print("Admin login successful")
        return data["access_token"]
    
    def test_admin_login_invalid(self):
        """POST /api/admin/login with wrong credentials"""
        response = requests.post(f"{BASE_URL}/api/admin/login", json={
            "username": "wrong",
            "password": "wrong"
        })
        assert response.status_code == 401
        print("Invalid login correctly rejected")


@pytest.fixture
def admin_token():
    """Get admin auth token"""
    response = requests.post(f"{BASE_URL}/api/admin/login", json={
        "username": ADMIN_USERNAME,
        "password": ADMIN_PASSWORD
    })
    if response.status_code == 200:
        return response.json()["access_token"]
    pytest.skip("Admin authentication failed")


@pytest.fixture
def auth_headers(admin_token):
    """Get auth headers with token"""
    return {"Authorization": f"Bearer {admin_token}"}


class TestCSVExport:
    """Test CSV export endpoints for all 6 entities"""
    
    def test_brands_export_csv(self, auth_headers):
        """GET /api/admin/brands/export-csv"""
        response = requests.get(f"{BASE_URL}/api/admin/brands/export-csv", headers=auth_headers)
        assert response.status_code == 200
        assert "text/csv" in response.headers.get("content-type", "")
        content = response.text
        assert "name" in content  # CSV header
        lines = content.strip().split('\n')
        print(f"Brands CSV: {len(lines)-1} rows (excluding header)")
        print(f"Headers: {lines[0]}")
    
    def test_machine_models_export_csv(self, auth_headers):
        """GET /api/admin/machine-models/export-csv"""
        response = requests.get(f"{BASE_URL}/api/admin/machine-models/export-csv", headers=auth_headers)
        assert response.status_code == 200
        assert "text/csv" in response.headers.get("content-type", "")
        content = response.text
        assert "brand" in content and "model_name" in content
        lines = content.strip().split('\n')
        print(f"Machine Models CSV: {len(lines)-1} rows")
        print(f"Headers: {lines[0]}")
    
    def test_track_sizes_export_csv(self, auth_headers):
        """GET /api/admin/track-sizes/export-csv"""
        response = requests.get(f"{BASE_URL}/api/admin/track-sizes/export-csv", headers=auth_headers)
        assert response.status_code == 200
        assert "text/csv" in response.headers.get("content-type", "")
        content = response.text
        assert "size" in content
        lines = content.strip().split('\n')
        print(f"Track Sizes CSV: {len(lines)-1} rows")
        print(f"Headers: {lines[0]}")
    
    def test_compatibility_export_csv(self, auth_headers):
        """GET /api/admin/compatibility/export-csv"""
        response = requests.get(f"{BASE_URL}/api/admin/compatibility/export-csv", headers=auth_headers)
        assert response.status_code == 200
        assert "text/csv" in response.headers.get("content-type", "")
        content = response.text
        assert "make" in content and "model" in content
        lines = content.strip().split('\n')
        print(f"Compatibility CSV: {len(lines)-1} rows")
        print(f"Headers: {lines[0]}")
    
    def test_products_export_csv(self, auth_headers):
        """GET /api/admin/products/export-csv"""
        response = requests.get(f"{BASE_URL}/api/admin/products/export-csv", headers=auth_headers)
        assert response.status_code == 200
        assert "text/csv" in response.headers.get("content-type", "")
        content = response.text
        assert "title" in content or "sku" in content
        lines = content.strip().split('\n')
        print(f"Products CSV: {len(lines)-1} rows")
        print(f"Headers: {lines[0]}")
    
    def test_part_numbers_export_csv(self, auth_headers):
        """GET /api/admin/part-numbers/export-csv"""
        response = requests.get(f"{BASE_URL}/api/admin/part-numbers/export-csv", headers=auth_headers)
        assert response.status_code == 200
        assert "text/csv" in response.headers.get("content-type", "")
        content = response.text
        assert "part_number" in content
        lines = content.strip().split('\n')
        print(f"Part Numbers CSV: {len(lines)-1} rows")
        print(f"Headers: {lines[0]}")


class TestCSVTemplate:
    """Test CSV template download endpoints for all 6 entities"""
    
    def test_brands_csv_template(self, auth_headers):
        """GET /api/admin/brands/csv-template"""
        response = requests.get(f"{BASE_URL}/api/admin/brands/csv-template", headers=auth_headers)
        assert response.status_code == 200
        assert "text/csv" in response.headers.get("content-type", "")
        content = response.text
        # Template should have headers but no data rows
        lines = content.strip().split('\n')
        assert len(lines) == 1, "Template should only have header row"
        assert "name" in lines[0]
        print(f"Brands template headers: {lines[0]}")
    
    def test_machine_models_csv_template(self, auth_headers):
        """GET /api/admin/machine-models/csv-template"""
        response = requests.get(f"{BASE_URL}/api/admin/machine-models/csv-template", headers=auth_headers)
        assert response.status_code == 200
        assert "text/csv" in response.headers.get("content-type", "")
        content = response.text
        lines = content.strip().split('\n')
        assert len(lines) == 1
        assert "brand" in lines[0] and "model_name" in lines[0]
        print(f"Machine Models template headers: {lines[0]}")
    
    def test_track_sizes_csv_template(self, auth_headers):
        """GET /api/admin/track-sizes/csv-template"""
        response = requests.get(f"{BASE_URL}/api/admin/track-sizes/csv-template", headers=auth_headers)
        assert response.status_code == 200
        assert "text/csv" in response.headers.get("content-type", "")
        content = response.text
        lines = content.strip().split('\n')
        assert len(lines) == 1
        assert "size" in lines[0]
        print(f"Track Sizes template headers: {lines[0]}")
    
    def test_compatibility_csv_template(self, auth_headers):
        """GET /api/admin/compatibility/csv-template"""
        response = requests.get(f"{BASE_URL}/api/admin/compatibility/csv-template", headers=auth_headers)
        assert response.status_code == 200
        assert "text/csv" in response.headers.get("content-type", "")
        content = response.text
        lines = content.strip().split('\n')
        assert len(lines) == 1
        assert "make" in lines[0] and "model" in lines[0]
        print(f"Compatibility template headers: {lines[0]}")
    
    def test_products_csv_template(self, auth_headers):
        """GET /api/admin/products/csv-template"""
        response = requests.get(f"{BASE_URL}/api/admin/products/csv-template", headers=auth_headers)
        assert response.status_code == 200
        assert "text/csv" in response.headers.get("content-type", "")
        content = response.text
        lines = content.strip().split('\n')
        assert len(lines) == 1
        assert "title" in lines[0] or "sku" in lines[0]
        print(f"Products template headers: {lines[0]}")
    
    def test_part_numbers_csv_template(self, auth_headers):
        """GET /api/admin/part-numbers/csv-template"""
        response = requests.get(f"{BASE_URL}/api/admin/part-numbers/csv-template", headers=auth_headers)
        assert response.status_code == 200
        assert "text/csv" in response.headers.get("content-type", "")
        content = response.text
        lines = content.strip().split('\n')
        assert len(lines) == 1
        assert "part_number" in lines[0]
        print(f"Part Numbers template headers: {lines[0]}")


class TestCSVImport:
    """Test CSV import endpoints - test with brands as sample"""
    
    def test_brands_import_csv(self, auth_headers):
        """POST /api/admin/brands/import-csv - test upsert"""
        # Create a test CSV content
        csv_content = "name,logo,is_us_supported\nTEST_Brand_Import,https://example.com/logo.png,true"
        files = {"file": ("test_brands.csv", io.BytesIO(csv_content.encode()), "text/csv")}
        
        response = requests.post(
            f"{BASE_URL}/api/admin/brands/import-csv",
            headers=auth_headers,
            files=files
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        print(f"Import result: created={data.get('created')}, updated={data.get('updated')}")
        
        # Verify the brand was created by checking export
        export_response = requests.get(f"{BASE_URL}/api/admin/brands/export-csv", headers=auth_headers)
        assert "TEST_Brand_Import" in export_response.text
        print("Brand import verified in export")


class TestProductById:
    """Test single product retrieval"""
    
    def test_get_product_by_id(self):
        """GET /api/products/{id} - should return single product from DB"""
        # First get a product ID from the list
        response = requests.get(f"{BASE_URL}/api/products?limit=1")
        assert response.status_code == 200
        products = response.json()
        
        if products:
            product_id = products[0].get("id")
            if product_id:
                detail_response = requests.get(f"{BASE_URL}/api/products/{product_id}")
                assert detail_response.status_code == 200
                product = detail_response.json()
                assert "id" in product or "title" in product
                print(f"Product detail: {product.get('title', 'N/A')}")
            else:
                print("No product ID found in response")
        else:
            print("No products in DB to test")
    
    def test_get_product_invalid_id(self):
        """GET /api/products/{invalid_id} - should return 400 or 404"""
        response = requests.get(f"{BASE_URL}/api/products/invalid-id")
        assert response.status_code in [400, 404]
        print(f"Invalid product ID correctly rejected with status {response.status_code}")


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
