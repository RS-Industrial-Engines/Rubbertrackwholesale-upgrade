"use client";

import { useMemo } from "react";
import useSWR from "swr";
import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { API, fetcher, type Brand } from "@/lib/api";
import { brands as fallbackBrandList, machineModels } from "@/lib/data/machine-models";

// Popular brands - prioritized for display
const POPULAR_BRANDS = [
  "Kubota",
  "Bobcat",
  "Caterpillar",
  "CAT",
  "John Deere",
  "Takeuchi",
  "CASE",
  "Ditch Witch",
  "Toro",
  "New Holland",
  "ASV",
  "Yanmar",
  "Komatsu",
  "Vermeer",
  "Wacker Neuson",
  "Mustang",
  "Terex",
  "Gehl",
  "JCB",
  "Hitachi",
  "Kobelco",
  "Volvo",
  "Hyundai",
  "Sany",
];

// Convert fallback brand list to Brand objects
function getFallbackBrands(): Brand[] {
  return fallbackBrandList.map((name, index) => ({
    id: index + 1,
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    description: `Premium rubber tracks and undercarriage parts for ${name} equipment. Find compatible tracks for all ${name} models.`,
    logo_url: undefined,
    machine_count: machineModels[name]?.length || 0,
  }));
}

export function BrandsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: apiBrands, isLoading } = useSWR<Brand[]>(API.brands, fetcher);

  // Use API data if available, otherwise use fallback
  const brands = useMemo(() => {
    if (apiBrands && apiBrands.length > 0) {
      return apiBrands;
    }
    return getFallbackBrands();
  }, [apiBrands]);

  // Sort brands: popular first, then alphabetically
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

    // Sort other brands alphabetically
    other.sort((a, b) => a.name.localeCompare(b.name));

    return [...popular, ...other];
  }, [brands]);

  // Filter brands by search query
  const filteredBrands = useMemo(() => {
    if (!searchQuery.trim()) {
      return sortedBrands;
    }
    const query = searchQuery.toLowerCase();
    return sortedBrands.filter((brand) =>
      brand.name.toLowerCase().includes(query)
    );
  }, [sortedBrands, searchQuery]);

  // Separate into popular and other for display
  const popularBrands = filteredBrands.filter((brand) =>
    POPULAR_BRANDS.some((pb) => pb.toLowerCase() === brand.name.toLowerCase())
  );
  const otherBrands = filteredBrands.filter(
    (brand) => !POPULAR_BRANDS.some((pb) => pb.toLowerCase() === brand.name.toLowerCase())
  );

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
              machinery brands. We stock parts for {brands.length}+ equipment manufacturers.
            </p>
            
            {/* Search */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search brands..."
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
        ) : filteredBrands.length > 0 ? (
          <div className="space-y-12">
            {/* Popular Brands Section */}
            {popularBrands.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-primary rounded-full" />
                  Popular Brands
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {popularBrands.map((brand) => (
                    <BrandCard key={brand.id} brand={brand} />
                  ))}
                </div>
              </div>
            )}

            {/* Other Brands Section */}
            {otherBrands.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-muted-foreground rounded-full" />
                  All Brands
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {otherBrands.map((brand) => (
                    <BrandCard key={brand.id} brand={brand} />
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">
              No brands found matching &quot;{searchQuery}&quot;
            </p>
            <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
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
              We maintain extensive inventory for popular brands including{" "}
              <strong>Kubota</strong>, <strong>Bobcat</strong>,{" "}
              <strong>Caterpillar</strong>, <strong>John Deere</strong>,{" "}
              <strong>Takeuchi</strong>, <strong>Case</strong>, and many more.
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
  const machineCount = brand.machine_count || machineModels[brand.name]?.length || 0;

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
