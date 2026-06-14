"use client";

import { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Search, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { type Brand, type MachineModel } from "@/lib/api";
import {
  fullMachineModels,
  fullBrands,
  popularBrands as POPULAR_BRANDS,
  getBrandStats,
  normalizeBrand,
  normalizeForMatching,
  cleanModelForDisplay,
} from "@/lib/data/full-machine-data";
import { createMachineSlug, createBrandSlug } from "@/lib/url-utils";

// Convert full brand list to Brand objects with model counts
function getFullBrands(): Brand[] {
  const stats = getBrandStats();
  return stats.map((stat, index) => ({
    id: index + 1,
    name: stat.brand,
    slug: createBrandSlug(stat.brand),
    description: `Premium rubber tracks and undercarriage parts for ${stat.brand} equipment. Find compatible tracks for all ${stat.modelCount} ${stat.brand} models.`,
    logo_url: undefined,
    machine_count: stat.modelCount,
  }));
}

export function BrandsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  // API data is NOT used - full-machine-data.ts is the authoritative source
  // This prevents incomplete CMS/API data from overriding our complete dataset
  const isLoading = false;

  // ALWAYS use full-machine-data.ts as PRIMARY source for /brands
  // full-machine-data.ts has complete 349-brand data that API may not have
  const brands = useMemo(() => {
    return getFullBrands();
  }, []);

  // Sort brands: popular first, then by model count
  const sortedBrands = useMemo(() => {
    const popular: Brand[] = [];
    const other: Brand[] = [];

    brands.forEach((brand) => {
      if (POPULAR_BRANDS.some((pb) => pb.toLowerCase() === brand.name.toLowerCase())) {
        popular.push(brand);
      } else {
        other.push(brand);
      }
    });

    // Sort popular brands by their priority order
    popular.sort((a, b) => {
      const aIndex = POPULAR_BRANDS.findIndex((pb) => pb.toLowerCase() === a.name.toLowerCase());
      const bIndex = POPULAR_BRANDS.findIndex((pb) => pb.toLowerCase() === b.name.toLowerCase());
      return aIndex - bIndex;
    });

    // Sort other brands by model count then alphabetically
    other.sort((a, b) => {
      const countDiff = (b.machine_count || 0) - (a.machine_count || 0);
      if (countDiff !== 0) return countDiff;
      return a.name.localeCompare(b.name);
    });

    return [...popular, ...other];
  }, [brands]);

  // Search for machines when query contains brand + model
  const matchedMachines = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.trim().split(/\s+/).length < 2) {
      return [];
    }
    
    const normalizedQuery = normalizeForMatching(searchQuery);
    const queryParts = searchQuery.trim().toLowerCase().split(/\s+/);
    const matches: MachineModel[] = [];
    
    // Check if first word is a brand (with normalization)
    const potentialBrand = queryParts[0];
    const normalizedPotentialBrand = normalizeBrand(potentialBrand);
    
    for (const [brand, models] of Object.entries(fullMachineModels)) {
      // Check if brand matches (with normalization for CAT/Caterpillar, CASE/Case, etc.)
      const brandNormalized = normalizeBrand(brand);
      const brandMatches = brandNormalized === normalizedPotentialBrand || 
                          brand.toLowerCase().startsWith(potentialBrand);
      
      if (!brandMatches) continue;
      
      // If brand matches, look for model match in remaining query
      const modelQuery = queryParts.slice(1).join(" ");
      const normalizedModelQuery = normalizeForMatching(modelQuery);
      
      for (const model of models) {
        const normalizedModel = normalizeForMatching(model);
        
        // Check for exact or partial model match
        if (normalizedModel === normalizedModelQuery || 
            normalizedModel.startsWith(normalizedModelQuery) ||
            normalizedModel.includes(normalizedModelQuery)) {
          matches.push({
            id: matches.length,
            make: brand,
            model: model,
            track_sizes: [],
          });
          
          // Limit results
          if (matches.length >= 5) break;
        }
      }
      
      if (matches.length >= 5) break;
    }
    
    return matches;
  }, [searchQuery]);

  // Filter brands by search query
  const filteredBrands = useMemo(() => {
    if (!searchQuery.trim()) {
      return sortedBrands;
    }
    const query = searchQuery.toLowerCase();
    // Also try normalized brand search (Caterpillar -> CAT, etc.)
    const normalizedSearchBrand = normalizeBrand(query.split(/\s+/)[0]);
    
    return sortedBrands.filter((brand) => {
      const brandLower = brand.name.toLowerCase();
      const brandNormalized = normalizeBrand(brand.name);
      return brandLower.includes(query) || 
             brandNormalized === normalizedSearchBrand ||
             brandLower.startsWith(query.split(/\s+/)[0]);
    });
  }, [sortedBrands, searchQuery]);

  // Separate into popular and other for display
  const popularBrandsList = filteredBrands.filter((brand) =>
    POPULAR_BRANDS.some((pb) => pb.toLowerCase() === brand.name.toLowerCase())
  );
  const otherBrandsList = filteredBrands.filter(
    (brand) => !POPULAR_BRANDS.some((pb) => pb.toLowerCase() === brand.name.toLowerCase())
  );

  // Calculate total machines across all brands
  const totalMachines = brands.reduce((sum, b) => sum + (b.machine_count || 0), 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-secondary to-background py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Shop by Brand
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find rubber tracks and undercarriage parts for all major heavy
              machinery brands. We have compatibility data for{" "}
              <strong className="text-foreground">{totalMachines.toLocaleString()} machines</strong> across{" "}
              <strong className="text-foreground">{brands.length} brands</strong>.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search brands or machines (e.g., Kubota KX040)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-card border-border"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading brands...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Machine matches from brand + model search */}
            {matchedMachines.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-primary rounded-full" />
                  Machine Results
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {matchedMachines.map((machine) => {
                    const slug = createMachineSlug(machine.make || "", machine.model || "");
                    return (
                      <Link
                        key={slug}
                        href={`/machines/${slug}`}
                        className="group flex items-center justify-between p-4 bg-card rounded-lg border-2 border-primary hover:shadow-lg transition-all"
                      >
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {machine.make} {machine.model}
                          </h3>
                          <span className="text-xs text-primary mt-1 block">
                            View Tracks & Parts
                          </span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-primary transition-colors" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Show brands if any match or if no machine matches */}
            {(filteredBrands.length > 0 || matchedMachines.length === 0) && (
              <>
                {/* Popular Brands Section */}
                {popularBrandsList.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                      <span className="w-2 h-8 bg-primary rounded-full" />
                      {searchQuery ? 'Matching Brands' : 'Popular Brands'}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {popularBrandsList.map((brand) => (
                        <BrandCard key={brand.id} brand={brand} />
                      ))}
                    </div>
                  </div>
                )}

                {/* Other Brands Section */}
                {otherBrandsList.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                      <span className="w-2 h-8 bg-muted-foreground rounded-full" />
                      {searchQuery ? `Other Matching Brands (${otherBrandsList.length})` : `All Brands (${otherBrandsList.length})`}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {otherBrandsList.map((brand) => (
                        <BrandCard key={brand.id} brand={brand} />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* No results */}
                {filteredBrands.length === 0 && matchedMachines.length === 0 && (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground mb-4">
                      No brands or machines found matching &quot;{searchQuery}&quot;
                    </p>
                    <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {/* SEO Content */}
        <section className="mt-16 bg-card rounded-lg p-8 border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Rubber Tracks for All Major Equipment Brands
          </h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              Rubber Track Wholesale is your trusted source for rubber tracks and
              undercarriage parts from all major construction equipment manufacturers.
              We maintain compatibility data for <strong>{totalMachines.toLocaleString()} machines</strong> including{" "}
              <strong>Kubota</strong> ({fullMachineModels["Kubota"]?.length || 0} models),{" "}
              <strong>Komatsu</strong> ({fullMachineModels["Komatsu"]?.length || 0} models),{" "}
              <strong>Hitachi</strong> ({fullMachineModels["Hitachi"]?.length || 0} models),{" "}
              <strong>CAT</strong> ({fullMachineModels["CAT"]?.length || 0} models), and many more.
            </p>
            <p className="text-muted-foreground">
              Whether you need tracks for a mini excavator, compact track loader,
              or skid steer, we have the parts in stock at our Houston warehouse
              ready for same-day shipping. Contact us for competitive wholesale
              pricing on any brand or model.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function BrandCard({ brand }: { brand: Brand }) {
  const machineCount = brand.machine_count || fullMachineModels[brand.name]?.length || 0;

  return (
    <Card className="bg-card border-border hover:border-primary transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mb-4">
          <span className="text-2xl font-bold text-primary">
            {brand.name.charAt(0)}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-1">
          {brand.name}
        </h3>
        {machineCount > 0 && (
          <p className="text-sm text-muted-foreground mb-4">
            {machineCount} models
          </p>
        )}
        <Link
          href={`/machines?brand=${encodeURIComponent(brand.name)}`}
          className="inline-block"
        >
          <Button
            variant="outline"
            size="sm"
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
          >
            View Machines
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
