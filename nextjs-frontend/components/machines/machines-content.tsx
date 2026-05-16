"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronRight, Wrench, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { MachineModel } from "@/lib/api";
import { normalizeForMatching, normalizeBrand } from "@/lib/data/full-machine-data";
import { createMachineSlug, BUSINESS_INFO } from "@/lib/url-utils";

interface MachinesContentProps {
  machines: MachineModel[];
  brands: string[];
}

// Popular/high-demand brands - prioritized for customer relevance
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
];

export function MachinesContent({ machines, brands }: MachinesContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [showAllBrands, setShowAllBrands] = useState(false);

  // Handle search input - auto-clear brand filter if search contains a different brand
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    
    // If user types a brand+model query, check if it conflicts with selected filter
    if (value.trim() && selectedBrand) {
      const queryParts = value.trim().toLowerCase().split(/\s+/);
      const queryBrand = queryParts[0];
      const normalizedQueryBrand = normalizeBrand(queryBrand);
      const normalizedSelectedBrand = normalizeBrand(selectedBrand);
      
      // If query starts with a different brand, clear the filter
      // e.g., user selected "Bobcat" but types "John Deere 333G"
      if (queryParts.length >= 2) {
        // Check if the query looks like a brand search
        const matchesDifferentBrand = brands.some(brand => {
          const brandNormalized = normalizeBrand(brand);
          return (brand.toLowerCase().startsWith(queryBrand) || brandNormalized === normalizedQueryBrand) &&
                 brandNormalized !== normalizedSelectedBrand;
        });
        
        if (matchesDifferentBrand) {
          setSelectedBrand(null);
        }
      }
    }
  };

  // Sort brands: popular first, then alphabetically
  const sortedBrands = useMemo(() => {
    const popular: string[] = [];
    const other: string[] = [];

    brands.forEach((brand) => {
      if (POPULAR_BRANDS.some((pb) => pb.toLowerCase() === brand.toLowerCase())) {
        popular.push(brand);
      } else {
        other.push(brand);
      }
    });

    // Sort popular brands by their priority order
    popular.sort((a, b) => {
      const aIndex = POPULAR_BRANDS.findIndex((pb) => pb.toLowerCase() === a.toLowerCase());
      const bIndex = POPULAR_BRANDS.findIndex((pb) => pb.toLowerCase() === b.toLowerCase());
      return aIndex - bIndex;
    });

    // Sort other brands alphabetically
    other.sort((a, b) => a.localeCompare(b));

    return { popular, other, all: [...popular, ...other] };
  }, [brands]);

  const displayedBrands = showAllBrands ? sortedBrands.all : sortedBrands.popular;

  // Separate exact matches from partial matches for better search UX
  const { exactMatches, partialMatches } = useMemo(() => {
    let filtered = machines;

    if (selectedBrand) {
      // Use brand normalization to handle variations like CASE/Case/case, CAT/Caterpillar
      const normalizedSelectedBrand = normalizeBrand(selectedBrand);
      filtered = filtered.filter(
        (m) => normalizeBrand(m.make || '') === normalizedSelectedBrand
      );
    }

    if (!searchQuery) {
      return { exactMatches: [], partialMatches: filtered };
    }

    const normalizedQuery = normalizeForMatching(searchQuery);
    const queryLower = searchQuery.toLowerCase().trim();
    
    const exact: MachineModel[] = [];
    const related: MachineModel[] = [];
    const partial: MachineModel[] = [];
    
    filtered.forEach((m) => {
      const normalizedMake = normalizeForMatching(m.make || '');
      const normalizedModel = normalizeForMatching(m.model || '');
      const normalizedFull = normalizeForMatching(`${m.make} ${m.model}`);
      const modelLower = (m.model || '').toLowerCase();
      
      // EXACT MATCH ONLY: normalized model equals normalized query exactly
      // e.g., "249D" matches "249D" but NOT "249D3"
      const isExactModelMatch = normalizedModel === normalizedQuery;
      
      // RELATED MATCH: model starts with query (close variants)
      // e.g., "249D" query shows "249D3" as related, not exact
      const isRelatedMatch = !isExactModelMatch && (
        modelLower.startsWith(queryLower) || 
        normalizedModel.startsWith(normalizedQuery)
      );
      
      if (isExactModelMatch) {
        // Perfect match - this is THE model the user searched for
        exact.push(m);
      } else if (isRelatedMatch) {
        // Close variant - put in related section
        related.push(m);
      } else if (
        normalizedMake.includes(normalizedQuery) ||
        normalizedModel.includes(normalizedQuery) ||
        normalizedFull.includes(normalizedQuery)
      ) {
        // Partial match - broader results
        partial.push(m);
      }
    });

    // Exact matches shown first, then related variants in partial section
    return { exactMatches: exact, partialMatches: [...related, ...partial] };
  }, [machines, selectedBrand, searchQuery]);

  // Combined filtered machines for grouping
  const filteredMachines = useMemo(() => {
    return [...exactMatches, ...partialMatches];
  }, [exactMatches, partialMatches]);

  const machinesByBrand = useMemo(() => {
    const grouped: Record<string, MachineModel[]> = {};
    filteredMachines.forEach((machine) => {
      const brand = machine.make || "Other";
      if (!grouped[brand]) {
        grouped[brand] = [];
      }
      grouped[brand].push(machine);
    });
    return grouped;
  }, [filteredMachines]);

  const createMachineUrl = (machine: MachineModel) => {
    return `/machines/${createMachineSlug(machine.make || "", machine.model || "")}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Find Rubber Tracks by Machine Model
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Select your equipment make and model to find compatible rubber tracks
              and undercarriage parts. We stock parts for all major brands.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by make or model (e.g., Kubota SVL75, Cat 259D)..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-12 h-14 text-lg bg-card border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Filter */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Popular Brands
            </h2>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedBrand === null ? "default" : "outline"}
                onClick={() => setSelectedBrand(null)}
                size="sm"
              >
                All Brands
              </Button>
              {displayedBrands.map((brand) => (
                <Button
                  key={brand}
                  variant={selectedBrand === brand ? "default" : "outline"}
                  onClick={() => setSelectedBrand(brand)}
                  size="sm"
                >
                  {brand}
                </Button>
              ))}
              {!showAllBrands && sortedBrands.other.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllBrands(true)}
                  className="text-primary hover:text-primary/80"
                >
                  +{sortedBrands.other.length} More Brands
                </Button>
              )}
              {showAllBrands && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllBrands(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Show Less
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Machines Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {filteredMachines.length === 0 ? (
            <div className="text-center py-16">
              <Wrench className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                No machines found
              </h2>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : searchQuery ? (
            // Search results mode - show exact matches first, then related
            <div className="space-y-12">
              {exactMatches.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="w-2 h-8 bg-primary rounded-full" />
                    Exact Machine Match
                    <span className="text-sm font-normal text-muted-foreground">
                      ({exactMatches.length})
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {exactMatches.map((machine) => (
                      <Link
                        key={`${machine.make}-${machine.model}`}
                        href={createMachineUrl(machine)}
                        className="group flex items-center justify-between p-4 bg-card rounded-lg border-2 border-primary hover:shadow-lg transition-all"
                      >
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {machine.make} {machine.model}
                          </h3>
                          {machine.equipment_type && (
                            <p className="text-sm text-muted-foreground">
                              {machine.equipment_type}
                            </p>
                          )}
                          {machine.track_sizes && machine.track_sizes.length > 0 && (
                            <p className="text-xs text-primary mt-1">
                              {machine.track_sizes.length} compatible track
                              {machine.track_sizes.length !== 1 ? "s" : ""}
                            </p>
                          )}
                        </div>
                        <ChevronRight className="h-5 w-5 text-primary transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              {partialMatches.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                    <span className="w-2 h-8 bg-muted-foreground rounded-full" />
                    {exactMatches.length > 0 ? 'Related Machine Models' : 'Other Matching Models'}
                    <span className="text-sm font-normal text-muted-foreground">
                      ({partialMatches.length})
                    </span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {partialMatches.slice(0, 20).map((machine) => (
                      <Link
                        key={`${machine.make}-${machine.model}`}
                        href={createMachineUrl(machine)}
                        className="group flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                      >
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {machine.make} {machine.model}
                          </h3>
                          {machine.equipment_type && (
                            <p className="text-sm text-muted-foreground">
                              {machine.equipment_type}
                            </p>
                          )}
                          {machine.track_sizes && machine.track_sizes.length > 0 && (
                            <p className="text-xs text-primary mt-1">
                              {machine.track_sizes.length} compatible track
                              {machine.track_sizes.length !== 1 ? "s" : ""}
                            </p>
                          )}
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                      </Link>
                    ))}
                  </div>
                  {partialMatches.length > 20 && (
                    <p className="text-sm text-muted-foreground mt-4 text-center">
                      Showing 20 of {partialMatches.length} related models. Refine your search for more specific results.
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            // Browse mode - group by brand
            <div className="space-y-12">
              {Object.entries(machinesByBrand)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([brand, brandMachines]) => (
                  <div key={brand}>
                    <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                      <span className="w-2 h-8 bg-primary rounded-full" />
                      {brand} Machines
                      <span className="text-sm font-normal text-muted-foreground">
                        ({brandMachines.length})
                      </span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {brandMachines.map((machine) => (
                        <Link
                          key={`${machine.make}-${machine.model}`}
                          href={createMachineUrl(machine)}
                          className="group flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                        >
                          <div>
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {machine.make} {machine.model}
                            </h3>
                            {machine.equipment_type && (
                              <p className="text-sm text-muted-foreground">
                                {machine.equipment_type}
                              </p>
                            )}
                            {machine.track_sizes && machine.track_sizes.length > 0 && (
                              <p className="text-xs text-primary mt-1">
                                {machine.track_sizes.length} compatible track
                                {machine.track_sizes.length !== 1 ? "s" : ""}
                              </p>
                            )}
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Rubber Tracks for All Major Equipment Brands
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                Rubber Track Wholesale is your one-stop shop for rubber tracks and
                undercarriage parts for all major construction equipment brands. We
                stock tracks for <strong>Kubota</strong>, <strong>Caterpillar</strong>,{" "}
                <strong>Bobcat</strong>, <strong>John Deere</strong>,{" "}
                <strong>Takeuchi</strong>, <strong>Case</strong>,{" "}
                <strong>Hitachi</strong>, <strong>Kobelco</strong>, and many more.
              </p>
              <p className="text-muted-foreground mb-4">
                Whether you operate a mini excavator, skid steer, or compact track
                loader, we have the rubber tracks you need in stock at our Houston
                warehouse. Our extensive inventory ensures fast shipping nationwide,
                with most orders shipping same-day.
              </p>
              <p className="text-muted-foreground">
                Not sure which track fits your machine? Use our compatibility search
                above or contact our expert team for assistance. We can cross-reference
                OEM part numbers and help you find the perfect replacement track for
                your equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
            Need Help Finding the Right Track?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to help you find the perfect rubber track
            for your equipment. Call us now or request a quote online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href={BUSINESS_INFO.phoneTel}>
                <Phone className="h-4 w-4 mr-2" />
                Call: {BUSINESS_INFO.phone}
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
