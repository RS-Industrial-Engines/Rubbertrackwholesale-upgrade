"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Search, ArrowRight, Loader2, AlertCircle, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  parseSearchQuery,
  buildCompatibilitySearchUrl,
  createMachineSlug,
  formatTrackSizeDisplay,
  ParsedQuery,
} from "@/lib/search-utils";
import {
  searchMachines,
  getModelsForBrand,
  getTrackSizesForMachine,
  getMachinesForTrackSize,
  normalizeForMatching,
  fullBrands,
} from "@/lib/data/full-machine-data";

interface CompatibilityResult {
  make: string;
  model: string;
  equipment_type?: string;
  track_sizes?: string[];
}

interface SearchState {
  loading: boolean;
  error: string | null;
  results: CompatibilityResult[];
  parsed: ParsedQuery | null;
  source: "api" | "fallback";
}

export function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQuery);
  const [searchState, setSearchState] = useState<SearchState>({
    loading: false,
    error: null,
    results: [],
    parsed: null,
    source: "api",
  });

  const performSearch = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchState({
        loading: false,
        error: null,
        results: [],
        parsed: null,
        source: "api",
      });
      return;
    }

    const parsed = parseSearchQuery(searchQuery);
    setSearchState((prev) => ({ ...prev, loading: true, error: null, parsed }));

    try {
      // Build the correct API URL based on parsed query
      const apiUrl = buildCompatibilitySearchUrl(parsed);
      
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const results: CompatibilityResult[] = Array.isArray(data) ? data : [];

      if (results.length > 0) {
        setSearchState({
          loading: false,
          error: null,
          results,
          parsed,
          source: "api",
        });
        return;
      }

      // API returned empty, use fallback data
      const fallbackResults = getFallbackResults(parsed);
      setSearchState({
        loading: false,
        error: null,
        results: fallbackResults,
        parsed,
        source: "fallback",
      });
    } catch (err) {
      console.error("[v0] Search API error:", err);
      
      // Use fallback data on error
      const fallbackResults = getFallbackResults(parsed);
      setSearchState({
        loading: false,
        error: fallbackResults.length === 0 ? "No results found. Try a different search." : null,
        results: fallbackResults,
        parsed,
        source: "fallback",
      });
    }
  }, []);

  // Run search when query changes
  useEffect(() => {
    performSearch(initialQuery);
  }, [initialQuery, performSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Update URL with new query
      const url = new URL(window.location.href);
      url.searchParams.set("q", query.trim());
      window.history.pushState({}, "", url.toString());
      performSearch(query.trim());
    }
  };

  const { loading, error, results, parsed, source } = searchState;

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <section className="bg-secondary/30 border-b border-border py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-foreground mb-6">Search Results</h1>
          
          <form onSubmit={handleSearch} className="max-w-2xl">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search by machine (Kubota SVL75), track size (400x86x52), or brand..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="h-12 pr-10"
                />
                {loading && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />
                )}
              </div>
              <Button type="submit" size="lg" className="h-12">
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </form>

          {parsed && (
            <div className="mt-4 text-sm text-muted-foreground">
              {parsed.type === "track_size" && (
                <span>Searching for track size: <strong className="text-foreground">{formatTrackSizeDisplay(parsed.trackSize || "")}</strong></span>
              )}
              {parsed.type === "machine" && (
                <span>Searching for: <strong className="text-foreground">{parsed.make} {parsed.model}</strong></span>
              )}
              {parsed.type === "brand_only" && (
                <span>Showing all machines from: <strong className="text-foreground">{parsed.make}</strong></span>
              )}
              {parsed.type === "model_only" && (
                <span>Searching for model: <strong className="text-foreground">{parsed.model}</strong></span>
              )}
              {parsed.type === "keyword" && (
                <span>Searching for: <strong className="text-foreground">{parsed.originalQuery}</strong></span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {error && (
            <div className="flex items-center gap-2 text-destructive mb-6 p-4 bg-destructive/10 rounded-lg">
              <AlertCircle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}

          {!loading && results.length === 0 && !error && initialQuery && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">No results found</h2>
              <p className="text-muted-foreground mb-6">
                Try searching for a different machine model or track size.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button variant="outline" asChild>
                  <Link href="/machines">Browse by Machine</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/track-size">Browse by Track Size</Link>
                </Button>
              </div>
            </div>
          )}

          {!loading && !initialQuery && (
            <div className="text-center py-12">
              <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">Search for Rubber Tracks</h2>
              <p className="text-muted-foreground mb-6">
                Enter a machine model (e.g., &quot;Kubota SVL75&quot;), track size (e.g., &quot;400x86x52&quot;), or brand name.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Button variant="outline" asChild>
                  <Link href="/machines">Browse by Machine</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/track-size">Browse by Track Size</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/brands">Browse by Brand</Link>
                </Button>
              </div>
            </div>
          )}

          {results.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  Found <strong className="text-foreground">{results.length}</strong> result{results.length !== 1 ? "s" : ""}
                  {source === "fallback" && <span className="text-xs ml-2">(from catalog data)</span>}
                </p>
                
                {/* Track size quick link */}
                {parsed?.type === "track_size" && parsed.trackSize && (
                  <Button asChild variant="outline">
                    <Link href={`/track-size/${parsed.trackSize}`}>
                      View Track Size Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((result, index) => (
                  <MachineResultCard key={`${result.make}-${result.model}-${index}`} result={result} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

function MachineResultCard({ result }: { result: CompatibilityResult }) {
  const slug = createMachineSlug(result.make, result.model);
  const trackSizes = result.track_sizes || [];

  return (
    <Card className="hover:border-primary/50 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs font-medium">
            {result.make}
          </span>
          {result.equipment_type && (
            <span className="bg-secondary text-muted-foreground px-2 py-1 rounded text-xs">
              {result.equipment_type}
            </span>
          )}
        </div>
        <CardTitle className="text-xl">
          <Link href={`/machines/${slug}`} className="hover:text-primary transition-colors">
            {result.make} {result.model}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {trackSizes.length > 0 ? (
          <div>
            <p className="text-sm text-muted-foreground mb-2">Compatible Track Sizes:</p>
            <div className="flex flex-wrap gap-2">
              {trackSizes.map((size) => (
                <Link
                  key={size}
                  href={`/track-size/${size}`}
                  className="inline-flex items-center px-3 py-1 bg-secondary hover:bg-secondary/80 rounded text-sm font-medium text-foreground transition-colors"
                >
                  {formatTrackSizeDisplay(size)}
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Contact us for compatible track sizes.
          </p>
        )}

        <div className="mt-4 pt-4 border-t border-border">
          <Link
            href={`/machines/${slug}`}
            className="inline-flex items-center text-primary hover:text-primary/80 text-sm font-medium"
          >
            View Machine Details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Get fallback results from comprehensive local data when API fails or returns empty
 */
function getFallbackResults(parsed: ParsedQuery): CompatibilityResult[] {
  switch (parsed.type) {
    case "track_size": {
      // Search for machines with this track size using normalized matching
      const machines = getMachinesForTrackSize(parsed.trackSize || "");
      return machines.map((m) => ({
        make: m.brand,
        model: m.model,
        track_sizes: getTrackSizesForMachine(m.brand, m.model),
      }));
    }

    case "brand_only": {
      // Get all models for the brand
      const models = getModelsForBrand(parsed.make || "");
      return models.map((model) => ({
        make: parsed.make || "",
        model: model,
        track_sizes: getTrackSizesForMachine(parsed.make || "", model),
      }));
    }

    case "machine":
    case "model_only": {
      // Search by model using normalized matching
      const modelResults = searchMachines(parsed.model || parsed.originalQuery);
      return modelResults.map((m) => ({
        make: m.brand,
        model: m.model,
        track_sizes: m.trackSizes,
      }));
    }

    default: {
      // Keyword search with comprehensive data
      const keywordResults = searchMachines(parsed.originalQuery);
      return keywordResults.map((m) => ({
        make: m.brand,
        model: m.model,
        track_sizes: m.trackSizes,
      }));
    }
  }
}
