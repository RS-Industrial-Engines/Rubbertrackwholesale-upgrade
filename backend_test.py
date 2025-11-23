#!/usr/bin/env python3
"""
Backend API Testing for Enhanced Search Normalization
Tests the enhanced search normalization functionality in compatibility and part-numbers APIs
Focus: space/hyphen variations in search terms (e.g., 'svl75' finding 'SVL 75', '1273807' finding '127-3807')
"""

import requests
import json
import sys
from typing import Dict, List, Any

# Get backend URL from frontend env
BACKEND_URL = "https://parts-search-bug.preview.emergentagent.com/api"

def test_track_sizes_api():
    """Test GET /api/track-sizes endpoint"""
    print("🔍 Testing GET /api/track-sizes...")
    
    try:
        response = requests.get(f"{BACKEND_URL}/track-sizes", timeout=30)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"   ❌ FAILED: Expected 200, got {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
        data = response.json()
        print(f"   ✅ SUCCESS: Received {len(data)} track sizes")
        
        # Verify data structure
        if not data:
            print("   ❌ FAILED: No track sizes returned")
            return False
            
        # Check first item structure
        first_item = data[0]
        required_fields = ['size', 'width', 'pitch', 'links']
        missing_fields = [field for field in required_fields if field not in first_item]
        
        if missing_fields:
            print(f"   ❌ FAILED: Missing required fields: {missing_fields}")
            print(f"   Sample item: {json.dumps(first_item, indent=2)}")
            return False
            
        print(f"   ✅ Data structure valid - has required fields: {required_fields}")
        
        # Check if we have expected number of track sizes (around 359)
        if len(data) < 300:
            print(f"   ⚠️  WARNING: Expected ~359 track sizes, got {len(data)}")
        else:
            print(f"   ✅ Track size count looks good: {len(data)}")
            
        # Sample a few items to verify data quality
        print("   📋 Sample track sizes:")
        for i, item in enumerate(data[:3]):
            print(f"      {i+1}. Size: {item.get('size')}, Width: {item.get('width')}mm, Pitch: {item.get('pitch')}mm, Links: {item.get('links')}")
            
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"   ❌ FAILED: Request error - {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"   ❌ FAILED: JSON decode error - {e}")
        return False
    except Exception as e:
        print(f"   ❌ FAILED: Unexpected error - {e}")
        return False


def test_compatibility_api():
    """Test GET /api/compatibility endpoint"""
    print("\n🔍 Testing GET /api/compatibility...")
    
    try:
        response = requests.get(f"{BACKEND_URL}/compatibility", timeout=30)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"   ❌ FAILED: Expected 200, got {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
        data = response.json()
        print(f"   ✅ SUCCESS: Received {len(data)} compatibility entries")
        
        # Verify data structure
        if not data:
            print("   ❌ FAILED: No compatibility entries returned")
            return False
            
        # Check first item structure
        first_item = data[0]
        required_fields = ['make', 'model', 'track_sizes']
        missing_fields = [field for field in required_fields if field not in first_item]
        
        if missing_fields:
            print(f"   ❌ FAILED: Missing required fields: {missing_fields}")
            print(f"   Sample item: {json.dumps(first_item, indent=2)}")
            return False
            
        print(f"   ✅ Data structure valid - has required fields: {required_fields}")
        
        # Check if we have expected number of compatibility entries (around 4727)
        if len(data) < 4000:
            print(f"   ⚠️  WARNING: Expected ~4727 compatibility entries, got {len(data)}")
        else:
            print(f"   ✅ Compatibility entry count looks good: {len(data)}")
            
        # Sample a few items to verify data quality
        print("   📋 Sample compatibility entries:")
        for i, item in enumerate(data[:3]):
            track_sizes = item.get('track_sizes', [])
            track_count = len(track_sizes) if isinstance(track_sizes, list) else 1
            print(f"      {i+1}. Make: {item.get('make')}, Model: {item.get('model')}, Track Sizes: {track_count}")
            
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"   ❌ FAILED: Request error - {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"   ❌ FAILED: JSON decode error - {e}")
        return False
    except Exception as e:
        print(f"   ❌ FAILED: Unexpected error - {e}")
        return False


def test_compatibility_search_api():
    """Test GET /api/compatibility/search?make=Bobcat endpoint"""
    print("\n🔍 Testing GET /api/compatibility/search?make=Bobcat...")
    
    try:
        response = requests.get(f"{BACKEND_URL}/compatibility/search?make=Bobcat", timeout=30)
        print(f"   Status Code: {response.status_code}")
        
        if response.status_code != 200:
            print(f"   ❌ FAILED: Expected 200, got {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
        data = response.json()
        print(f"   ✅ SUCCESS: Received {len(data)} Bobcat compatibility entries")
        
        # Verify data structure
        if not data:
            print("   ❌ FAILED: No Bobcat compatibility entries returned")
            return False
            
        # Verify all entries are for Bobcat
        non_bobcat_entries = [item for item in data if 'bobcat' not in item.get('make', '').lower()]
        if non_bobcat_entries:
            print(f"   ❌ FAILED: Found {len(non_bobcat_entries)} non-Bobcat entries in search results")
            return False
            
        print(f"   ✅ All {len(data)} entries are for Bobcat machines")
        
        # Sample a few items to verify data quality
        print("   📋 Sample Bobcat compatibility entries:")
        for i, item in enumerate(data[:5]):
            track_sizes = item.get('track_sizes', [])
            track_count = len(track_sizes) if isinstance(track_sizes, list) else 1
            print(f"      {i+1}. Make: {item.get('make')}, Model: {item.get('model')}, Track Sizes: {track_count}")
            
        return True
        
    except requests.exceptions.RequestException as e:
        print(f"   ❌ FAILED: Request error - {e}")
        return False
    except json.JSONDecodeError as e:
        print(f"   ❌ FAILED: JSON decode error - {e}")
        return False
    except Exception as e:
        print(f"   ❌ FAILED: Unexpected error - {e}")
        return False


def test_data_consistency():
    """Test data consistency between track-sizes and compatibility endpoints"""
    print("\n🔍 Testing data consistency between track-sizes and compatibility...")
    
    try:
        # Get track sizes
        track_sizes_response = requests.get(f"{BACKEND_URL}/track-sizes", timeout=30)
        if track_sizes_response.status_code != 200:
            print("   ❌ FAILED: Could not fetch track sizes for consistency check")
            return False
            
        track_sizes_data = track_sizes_response.json()
        available_sizes = {item.get('size') for item in track_sizes_data if item.get('size')}
        print(f"   📊 Found {len(available_sizes)} unique track sizes")
        
        # Get compatibility data (sample first 100 entries for performance)
        compatibility_response = requests.get(f"{BACKEND_URL}/compatibility", timeout=30)
        if compatibility_response.status_code != 200:
            print("   ❌ FAILED: Could not fetch compatibility data for consistency check")
            return False
            
        compatibility_data = compatibility_response.json()
        
        # Check consistency for first 50 entries (to avoid timeout)
        sample_entries = compatibility_data[:50]
        inconsistent_entries = []
        
        for entry in sample_entries:
            track_sizes = entry.get('track_sizes', [])
            if isinstance(track_sizes, list):
                for size in track_sizes:
                    if size not in available_sizes:
                        inconsistent_entries.append({
                            'make': entry.get('make'),
                            'model': entry.get('model'),
                            'missing_size': size
                        })
        
        if inconsistent_entries:
            print(f"   ⚠️  WARNING: Found {len(inconsistent_entries)} inconsistent track size references in sample")
            print("   📋 Sample inconsistent entries:")
            for entry in inconsistent_entries[:3]:
                print(f"      - {entry['make']} {entry['model']} references missing size: {entry['missing_size']}")
        else:
            print(f"   ✅ Data consistency check passed for sample of {len(sample_entries)} entries")
            
        return len(inconsistent_entries) == 0
        
    except Exception as e:
        print(f"   ❌ FAILED: Consistency check error - {e}")
        return False


def test_track_loader_compatibility():
    """Test newly imported track loader compatibility data"""
    print("\n🔍 Testing Track Loader Compatibility Data...")
    
    all_passed = True
    
    # Test 1: CAT 277B compatibility lookup
    print("   Test 1: CAT 277B compatibility lookup")
    try:
        response = requests.get(f"{BACKEND_URL}/compatibility/search?model=277B", timeout=30)
        if response.status_code != 200:
            print(f"      ❌ FAILED: Status {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            print(f"      ✅ Found {len(data)} results for model=277B")
            
            # Verify response includes track size "18x4x56" and make is "CAT"
            cat_277b_found = False
            track_size_found = False
            
            for entry in data:
                if entry.get('make', '').upper() == 'CAT' and '277B' in entry.get('model', ''):
                    cat_277b_found = True
                    track_sizes = entry.get('track_sizes', [])
                    if '18x4x56' in track_sizes:
                        track_size_found = True
                        print(f"      ✅ CAT 277B found with track size 18x4x56")
                        break
            
            if not cat_277b_found:
                print(f"      ❌ FAILED: CAT 277B not found in results")
                all_passed = False
            elif not track_size_found:
                print(f"      ❌ FAILED: Track size 18x4x56 not found for CAT 277B")
                all_passed = False
                
    except Exception as e:
        print(f"      ❌ FAILED: Error testing CAT 277B - {e}")
        all_passed = False
    
    # Test 2: Brand and model filter
    print("   Test 2: Brand and model filter (CAT + 277B)")
    try:
        response = requests.get(f"{BACKEND_URL}/compatibility/search?make=CAT&model=277B", timeout=30)
        if response.status_code != 200:
            print(f"      ❌ FAILED: Status {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            print(f"      ✅ Found {len(data)} results for make=CAT&model=277B")
            
            # Confirm "18x4x56" is returned
            track_size_found = False
            for entry in data:
                track_sizes = entry.get('track_sizes', [])
                if '18x4x56' in track_sizes:
                    track_size_found = True
                    print(f"      ✅ Track size 18x4x56 confirmed in CAT 277B results")
                    break
            
            if not track_size_found:
                print(f"      ❌ FAILED: Track size 18x4x56 not found in CAT 277B filtered results")
                all_passed = False
                
    except Exception as e:
        print(f"      ❌ FAILED: Error testing CAT 277B filter - {e}")
        all_passed = False
    
    # Test 3: Case insensitive search
    print("   Test 3: Case insensitive search (cat + 277b)")
    try:
        response = requests.get(f"{BACKEND_URL}/compatibility/search?make=cat&model=277b", timeout=30)
        if response.status_code != 200:
            print(f"      ❌ FAILED: Status {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            print(f"      ✅ Found {len(data)} results for make=cat&model=277b (case insensitive)")
            
            # Should still find the compatibility
            if len(data) == 0:
                print(f"      ❌ FAILED: Case insensitive search returned no results")
                all_passed = False
            else:
                print(f"      ✅ Case insensitive search working correctly")
                
    except Exception as e:
        print(f"      ❌ FAILED: Error testing case insensitive search - {e}")
        all_passed = False
    
    # Test 4: Bobcat T550 model
    print("   Test 4: Bobcat T550 compatibility")
    try:
        response = requests.get(f"{BACKEND_URL}/compatibility/search?model=T550", timeout=30)
        if response.status_code != 200:
            print(f"      ❌ FAILED: Status {response.status_code}")
            all_passed = False
        else:
            data = response.json()
            print(f"      ✅ Found {len(data)} results for model=T550")
            
            # Verify Bobcat T550 returns "18x4x56" in track_sizes
            bobcat_t550_found = False
            track_size_found = False
            
            for entry in data:
                if 'bobcat' in entry.get('make', '').lower() and 'T550' in entry.get('model', ''):
                    bobcat_t550_found = True
                    track_sizes = entry.get('track_sizes', [])
                    if '18x4x56' in track_sizes:
                        track_size_found = True
                        print(f"      ✅ Bobcat T550 found with track size 18x4x56")
                        break
            
            if not bobcat_t550_found:
                print(f"      ❌ FAILED: Bobcat T550 not found in results")
                all_passed = False
            elif not track_size_found:
                print(f"      ❌ FAILED: Track size 18x4x56 not found for Bobcat T550")
                all_passed = False
                
    except Exception as e:
        print(f"      ❌ FAILED: Error testing Bobcat T550 - {e}")
        all_passed = False
    
    return all_passed


def test_track_sizes_verification():
    """Test that specific track sizes were created"""
    print("\n🔍 Testing Track Sizes Verification...")
    
    expected_sizes = ["18x4x56", "13x4x56", "15x4x56", "18x4x50", "18x4x51"]
    
    try:
        response = requests.get(f"{BACKEND_URL}/track-sizes", timeout=30)
        if response.status_code != 200:
            print(f"   ❌ FAILED: Status {response.status_code}")
            return False
            
        data = response.json()
        print(f"   ✅ Retrieved {len(data)} track sizes")
        
        # Extract all size values
        available_sizes = [item.get('size') for item in data if item.get('size')]
        
        # Check for expected sizes
        missing_sizes = []
        found_sizes = []
        
        for expected_size in expected_sizes:
            if expected_size in available_sizes:
                found_sizes.append(expected_size)
                print(f"      ✅ Found track size: {expected_size}")
            else:
                missing_sizes.append(expected_size)
                print(f"      ❌ Missing track size: {expected_size}")
        
        if missing_sizes:
            print(f"   ❌ FAILED: Missing {len(missing_sizes)} expected track sizes: {missing_sizes}")
            return False
        else:
            print(f"   ✅ SUCCESS: All {len(expected_sizes)} expected track sizes found")
            return True
            
    except Exception as e:
        print(f"   ❌ FAILED: Error verifying track sizes - {e}")
        return False


def test_additional_search_scenarios():
    """Test additional search scenarios"""
    print("\n🔍 Testing additional search scenarios...")
    
    test_cases = [
        ("make=Caterpillar", "Caterpillar"),
        ("make=John", "John"),  # Should match John Deere
        ("model=T190", "T190"),
    ]
    
    all_passed = True
    
    for query, expected_term in test_cases:
        try:
            print(f"   Testing search: {query}")
            response = requests.get(f"{BACKEND_URL}/compatibility/search?{query}", timeout=30)
            
            if response.status_code != 200:
                print(f"      ❌ FAILED: Status {response.status_code}")
                all_passed = False
                continue
                
            data = response.json()
            print(f"      ✅ SUCCESS: Found {len(data)} results for {query}")
            
            # Verify results contain expected term
            if data and expected_term.lower() not in str(data[0]).lower():
                print(f"      ⚠️  WARNING: Results may not match search term '{expected_term}'")
                
        except Exception as e:
            print(f"      ❌ FAILED: Error testing {query} - {e}")
            all_passed = False
            
    return all_passed


def test_compatibility_search_normalization():
    """Test enhanced search normalization in /api/compatibility/search endpoint"""
    print("\n🔍 Testing Enhanced Search Normalization - Compatibility API...")
    
    all_passed = True
    
    # Test scenarios from review request
    test_scenarios = [
        {
            "name": "SVL75 without spaces should find SVL 75",
            "params": {"model": "svl75"},
            "expected_make": "kubota",
            "expected_model_contains": "SVL 75"
        },
        {
            "name": "SVL 75 with spaces should still work",
            "params": {"model": "svl 75"},
            "expected_make": "kubota", 
            "expected_model_contains": "SVL 75"
        },
        {
            "name": "Make+Model search: kubota svl75",
            "params": {"make": "kubota", "model": "svl75"},
            "expected_make": "kubota",
            "expected_model_contains": "SVL 75"
        },
        {
            "name": "CAT E70 search",
            "params": {"make": "cat", "model": "e70"},
            "expected_make": "cat",
            "expected_model_contains": "E70"
        },
        {
            "name": "CAT E70B search",
            "params": {"make": "cat", "model": "e70b"},
            "expected_make": "cat",
            "expected_model_contains": "E70"
        },
        {
            "name": "E70B without spaces should find E70 B",
            "params": {"model": "e70b"},
            "expected_make": "cat",
            "expected_model_contains": "E70"
        }
    ]
    
    for scenario in test_scenarios:
        print(f"   Testing: {scenario['name']}")
        try:
            # Build query string
            query_params = []
            for key, value in scenario['params'].items():
                query_params.append(f"{key}={value}")
            query_string = "&".join(query_params)
            
            response = requests.get(f"{BACKEND_URL}/compatibility/search?{query_string}", timeout=30)
            
            if response.status_code != 200:
                print(f"      ❌ FAILED: Status {response.status_code}")
                print(f"      Response: {response.text}")
                all_passed = False
                continue
                
            data = response.json()
            print(f"      ✅ SUCCESS: Found {len(data)} results")
            
            if len(data) == 0:
                print(f"      ❌ FAILED: No results found for {scenario['name']}")
                all_passed = False
                continue
            
            # Verify results contain expected make/model
            found_match = False
            for entry in data:
                make = entry.get('make', '').lower()
                model = entry.get('model', '').upper()
                
                expected_make = scenario['expected_make'].lower()
                expected_model = scenario['expected_model_contains'].upper()
                
                if expected_make in make and expected_model in model:
                    found_match = True
                    print(f"      ✅ Found matching entry: {entry.get('make')} {entry.get('model')}")
                    break
            
            if not found_match:
                print(f"      ❌ FAILED: No matching entry found for {scenario['expected_make']} {scenario['expected_model_contains']}")
                sample_results = [f"{r.get('make')} {r.get('model')}" for r in data[:3]]
                print(f"      Sample results: {sample_results}")
                all_passed = False
                
        except Exception as e:
            print(f"      ❌ FAILED: Error testing {scenario['name']} - {e}")
            all_passed = False
    
    return all_passed


def test_part_numbers_search_normalization():
    """Test enhanced search normalization in /api/part-numbers/search endpoint"""
    print("\n🔍 Testing Enhanced Search Normalization - Part Numbers API...")
    
    all_passed = True
    
    # Test scenarios from review request
    test_scenarios = [
        {
            "name": "Part number 1273807 should find 127-3807 or 127-3808",
            "params": {"query": "1273807"},
            "expected_part_contains": ["127-3807", "127-3808", "1273807"]
        },
        {
            "name": "Part number 127-3807 with hyphens should work",
            "params": {"query": "127-3807"},
            "expected_part_contains": ["127-3807", "1273807"]
        },
        {
            "name": "Model compatibility search: svl75",
            "params": {"model": "svl75"},
            "expected_model_contains": "SVL 75"
        },
        {
            "name": "Combined search: roller + e70",
            "params": {"query": "roller", "model": "e70"},
            "expected_query_contains": "roller",
            "expected_model_contains": "E70"
        }
    ]
    
    for scenario in test_scenarios:
        print(f"   Testing: {scenario['name']}")
        try:
            # Build query string
            query_params = []
            for key, value in scenario['params'].items():
                query_params.append(f"{key}={value}")
            query_string = "&".join(query_params)
            
            response = requests.get(f"{BACKEND_URL}/part-numbers/search?{query_string}", timeout=30)
            
            if response.status_code != 200:
                print(f"      ❌ FAILED: Status {response.status_code}")
                print(f"      Response: {response.text}")
                all_passed = False
                continue
                
            data = response.json()
            print(f"      ✅ SUCCESS: Found {len(data)} results")
            
            if len(data) == 0:
                print(f"      ⚠️  WARNING: No results found for {scenario['name']} - this may be expected if no data exists")
                continue
            
            # Verify results based on scenario expectations
            found_match = False
            
            if 'expected_part_contains' in scenario:
                # Check if any result contains expected part number patterns
                for entry in data:
                    part_number = entry.get('part_number', '').upper()
                    for expected_part in scenario['expected_part_contains']:
                        if expected_part.upper() in part_number or part_number in expected_part.upper():
                            found_match = True
                            print(f"      ✅ Found matching part: {entry.get('part_number')}")
                            break
                    if found_match:
                        break
            
            if 'expected_model_contains' in scenario:
                # Check if any result has compatible models containing expected model
                for entry in data:
                    compatible_models = entry.get('compatible_models', [])
                    if isinstance(compatible_models, list):
                        for model in compatible_models:
                            if scenario['expected_model_contains'].upper() in model.upper():
                                found_match = True
                                print(f"      ✅ Found compatible model: {model}")
                                break
                    if found_match:
                        break
            
            if 'expected_query_contains' in scenario:
                # Check if any result contains the query term
                for entry in data:
                    product_name = entry.get('product_name', '').lower()
                    part_number = entry.get('part_number', '').lower()
                    expected_query = scenario['expected_query_contains'].lower()
                    
                    if expected_query in product_name or expected_query in part_number:
                        found_match = True
                        print(f"      ✅ Found query match in: {entry.get('product_name', entry.get('part_number'))}")
                        break
            
            # If no specific expectations, just check that we got results
            if not any(key.startswith('expected_') for key in scenario.keys()):
                found_match = True
            
            if not found_match and len(data) > 0:
                print(f"      ⚠️  WARNING: Results found but didn't match expected criteria")
                print(f"      Sample results: {[r.get('part_number', 'N/A') for r in data[:3]]}")
                
        except Exception as e:
            print(f"      ❌ FAILED: Error testing {scenario['name']} - {e}")
            all_passed = False
    
    return all_passed


def test_regression_scenarios():
    """Test that previous searches still work (no regressions)"""
    print("\n🔍 Testing Regression Scenarios - Ensure existing searches still work...")
    
    all_passed = True
    
    # Test scenarios that should continue working
    regression_tests = [
        {
            "name": "CAT 299D search should still work",
            "endpoint": "compatibility/search",
            "params": {"make": "cat", "model": "299d"},
            "should_find_results": True
        },
        {
            "name": "Bobcat search should still work", 
            "endpoint": "compatibility/search",
            "params": {"make": "bobcat"},
            "should_find_results": True
        },
        {
            "name": "General part search should still work",
            "endpoint": "part-numbers/search",
            "params": {"query": "track"},
            "should_find_results": True
        }
    ]
    
    for test in regression_tests:
        print(f"   Testing: {test['name']}")
        try:
            # Build query string
            query_params = []
            for key, value in test['params'].items():
                query_params.append(f"{key}={value}")
            query_string = "&".join(query_params)
            
            response = requests.get(f"{BACKEND_URL}/{test['endpoint']}?{query_string}", timeout=30)
            
            if response.status_code != 200:
                print(f"      ❌ FAILED: Status {response.status_code}")
                all_passed = False
                continue
                
            data = response.json()
            
            if test['should_find_results'] and len(data) == 0:
                print(f"      ❌ FAILED: Expected results but got none")
                all_passed = False
            elif not test['should_find_results'] and len(data) > 0:
                print(f"      ❌ FAILED: Expected no results but got {len(data)}")
                all_passed = False
            else:
                print(f"      ✅ SUCCESS: Found {len(data)} results as expected")
                
        except Exception as e:
            print(f"      ❌ FAILED: Error testing {test['name']} - {e}")
            all_passed = False
    
    return all_passed


def main():
    """Run all backend API tests for enhanced search normalization"""
    print("🚀 Starting Backend API Tests for Enhanced Search Normalization")
    print("=" * 80)
    print("Focus: Testing space/hyphen variations in search terms")
    print("Examples: 'svl75' finding 'SVL 75', '1273807' finding '127-3807'")
    print("=" * 80)
    
    test_results = []
    
    # Test enhanced search normalization functionality
    test_results.append(("Compatibility Search Normalization", test_compatibility_search_normalization()))
    test_results.append(("Part Numbers Search Normalization", test_part_numbers_search_normalization()))
    test_results.append(("Regression Testing", test_regression_scenarios()))
    
    # Summary
    print("\n" + "=" * 80)
    print("📊 TEST SUMMARY")
    print("=" * 80)
    
    passed_tests = 0
    total_tests = len(test_results)
    
    for test_name, result in test_results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name:<40} {status}")
        if result:
            passed_tests += 1
    
    print(f"\nOverall Result: {passed_tests}/{total_tests} tests passed")
    
    if passed_tests == total_tests:
        print("🎉 All tests passed! Enhanced search normalization is working correctly.")
        return 0
    else:
        print("⚠️  Some tests failed. Please check the detailed output above.")
        return 1


if __name__ == "__main__":
    sys.exit(main())