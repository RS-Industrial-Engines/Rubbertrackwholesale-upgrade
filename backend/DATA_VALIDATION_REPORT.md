
======================================================================
DATA VALIDATION REPORT
Generated: 2026-01-25T03:07:28.661762+00:00
======================================================================

Reading source CSV files...
  Brands CSV:        350 unique
  Models CSV:        4632 unique
  Track Sizes CSV:   381 unique
  Compatibility CSV: 4631 entries
  Products CSV:      3 SKUs

======================================================================
BRANDS VALIDATION
======================================================================
  CSV brands:      350
  DB brands:       350
  Match:           ✓ EXACT MATCH

======================================================================
MACHINE MODELS VALIDATION
======================================================================
  CSV models:      4632
  DB models:       4632
  Match:           ✓ EXACT MATCH

======================================================================
TRACK SIZES VALIDATION
======================================================================
  CSV unique sizes: 381
  DB sizes:         381
  Match:            ✓ ALL CSV SIZES IN DB

======================================================================
COMPATIBILITY VALIDATION
======================================================================
  CSV entries:     4631
  DB entries:      4631
  Match:           ✓ EXACT MATCH

  Track Sizes Data Integrity Check:
    ✓ All track sizes match between CSV and DB

======================================================================
PRODUCTS VALIDATION
======================================================================
  CSV products:    3
  DB products:     3
  Match:           ✓ EXACT MATCH

======================================================================
BRAND SUMMARY (Top Manufacturers)
======================================================================

  Top 20 Makes by Compatibility Records:
  ----------------------------------------
    Kubota                      288 models
    Komatsu                     273 models
    Hitachi                     235 models
    IHI                         222 models
    Yanmar                      211 models
    CAT                         185 models
    Wacker Neuson               178 models
    Bobcat                      161 models
    CASE                        134 models
    Kobelco                     131 models
    Hinowa                      110 models
    Takeuchi                    105 models
    JCB                         102 models
    Airman                       99 models
    Sumitomo                     89 models
    New Holland                  83 models
    Hanix                        82 models
    Volvo                        62 models
    Mustang                      59 models
    Peljob                       54 models

  Key Brand Verification:
  ----------------------------------------
    CAT                         185 entries
    Bobcat                      161 entries
    Kubota                      288 entries
    ASV                          23 entries
    John Deere                   53 entries
    Takeuchi                    105 entries
    Komatsu                     273 entries
    Hitachi                     235 entries

======================================================================
VALIDATION SUMMARY
======================================================================
  brands               ✓ PASS
  machine_models       ✓ PASS
  track_sizes          ✓ PASS
  compatibility        ✓ PASS
  products             ✓ PASS

----------------------------------------------------------------------
  ✓ ALL VALIDATIONS PASSED - 100% DATA ALIGNMENT CONFIRMED
======================================================================
