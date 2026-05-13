"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Phone, MapPin, Truck, Clock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API } from "@/lib/api";
import {
  searchMachines,
  searchTrackSizes,
  isTrackSizeQuery,
  brands as fallbackBrands,
} from "@/lib/data/machine-models";

interface SearchResult {
  type: "machine" | "track-size" | "product";
  make?: string;
  model?: string;
  size?: string;
  trackSizes?: string[];
  title?: string;
}

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search function
  const performSearch = useCallback(async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setIsSearching(true);
    const results: SearchResult[] = [];

    try {
      // Check if it's a track size query
      if (isTrackSizeQuery(query)) {
        // Search for track sizes
        const trackSizeResults = searchTrackSizes(query);
        trackSizeResults.forEach((ts) => {
          results.push({
            type: "track-size",
            size: ts.size,
          });
        });
      } else {
        // Search for machines using the API first
        try {
          const params = new URLSearchParams();
          // Try to extract brand and model from query
          const queryLower = query.toLowerCase().trim();
          
          // Check if query starts with a known brand
          const brandMatch = fallbackBrands.find(b => 
            queryLower.startsWith(b.toLowerCase()) || 
            queryLower.startsWith(b.toLowerCase().replace(' ', ''))
          );
          
          if (brandMatch) {
            params.set("make", brandMatch);
            const modelPart = query.slice(brandMatch.length).trim();
            if (modelPart) {
              params.set("model", modelPart);
            }
          } else {
            // Search model only
            params.set("model", query);
          }

          const apiUrl = `${API.compatibilitySearch}?${params.toString()}`;
          const response = await fetch(apiUrl);
          
          if (response.ok) {
            const apiResults = await response.json();
            if (Array.isArray(apiResults) && apiResults.length > 0) {
              apiResults.slice(0, 10).forEach((item: { make?: string; model?: string; track_sizes?: string[] }) => {
                results.push({
                  type: "machine",
                  make: item.make,
                  model: item.model,
                  trackSizes: item.track_sizes || [],
                });
              });
            }
          }
        } catch {
          // API failed, continue to fallback
        }

        // If no API results, use fallback data
        if (results.length === 0) {
          const machineResults = searchMachines(query);
          machineResults.slice(0, 10).forEach((m) => {
            results.push({
              type: "machine",
              make: m.make,
              model: m.model,
              trackSizes: m.trackSizes,
            });
          });
        }

        // Also check for track size matches in the query
        const trackSizeResults = searchTrackSizes(query);
        trackSizeResults.slice(0, 3).forEach((ts) => {
          results.push({
            type: "track-size",
            size: ts.size,
          });
        });
      }
    } catch {
      // Fall back to local search on any error
      if (isTrackSizeQuery(query)) {
        const trackSizeResults = searchTrackSizes(query);
        trackSizeResults.forEach((ts) => {
          results.push({
            type: "track-size",
            size: ts.size,
          });
        });
      } else {
        const machineResults = searchMachines(query);
        machineResults.slice(0, 10).forEach((m) => {
          results.push({
            type: "machine",
            make: m.make,
            model: m.model,
            trackSizes: m.trackSizes,
          });
        });
      }
    }

    setSearchResults(results);
    setShowDropdown(results.length > 0);
    setIsSearching(false);
  }, []);

  // Debounce effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, performSearch]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    // If we have results and the user presses enter, navigate based on the first result
    if (searchResults.length > 0) {
      const firstResult = searchResults[0];
      if (firstResult.type === "machine" && firstResult.make && firstResult.model) {
        const slug = `${firstResult.make.toLowerCase().replace(/\s+/g, "-")}-${firstResult.model.toLowerCase().replace(/\s+/g, "-")}`;
        router.push(`/machines/${slug}`);
        return;
      } else if (firstResult.type === "track-size" && firstResult.size) {
        router.push(`/track-size/${firstResult.size}`);
        return;
      }
    }

    // If it looks like a track size, go to track size page
    if (isTrackSizeQuery(searchQuery)) {
      router.push(`/track-size/${searchQuery.replace(/\s+/g, "")}`);
      return;
    }

    // Otherwise, go to general search results
    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  const handleResultClick = (result: SearchResult) => {
    setShowDropdown(false);
    
    if (result.type === "machine" && result.make && result.model) {
      const slug = `${result.make.toLowerCase().replace(/\s+/g, "-")}-${result.model.toLowerCase().replace(/\s+/g, "-")}`;
      router.push(`/machines/${slug}`);
    } else if (result.type === "track-size" && result.size) {
      router.push(`/track-size/${result.size}`);
    }
  };

  const createSlug = (make: string, model: string) => {
    return `${make.toLowerCase().replace(/\s+/g, "-")}-${model.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <section
      className="relative min-h-[700px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1625936182462-b5fc2d0dcc5b?w=1600&h=900&fit=crop')`,
      }}
    >
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6">
            <MapPin className="h-4 w-4" />
            <span className="font-semibold text-sm">Houston, Texas</span>
            <span className="text-primary/70">|</span>
            <span className="text-sm">Nationwide Shipping</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            <span className="text-primary">Rubber Tracks</span> Houston
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl text-muted-foreground">
              Wholesale Prices, Premium Quality
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl text-pretty">
            Houston&apos;s largest supplier of rubber tracks and undercarriage parts
            for skid steers, mini excavators, and compact track loaders. Wholesale
            pricing with same-day shipping available.
          </p>

          {/* Search Bar with Dropdown */}
          <div className="relative mb-6">
            <div className="bg-card rounded-xl p-2 flex flex-col sm:flex-row gap-2 shadow-2xl border border-border">
              <div className="relative flex-1">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Search by machine model (Kubota SVL75), track size (400x86x52), or part number..."
                  className="flex-1 border-0 text-lg focus-visible:ring-0 bg-transparent h-14 pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setShowDropdown(false);
                      handleSearch();
                    }
                    if (e.key === "Escape") {
                      setShowDropdown(false);
                    }
                  }}
                />
                {isSearching && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 animate-spin text-muted-foreground" />
                )}
              </div>
              <Button className="h-14 px-8 text-lg" onClick={handleSearch}>
                <Search className="h-5 w-5 mr-2" />
                Find My Track
              </Button>
            </div>

            {/* Search Results Dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div
                ref={dropdownRef}
                className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-2xl z-50 overflow-hidden max-h-96 overflow-y-auto"
              >
                {searchResults.map((result, index) => (
                  <button
                    key={`${result.type}-${result.make}-${result.model}-${result.size}-${index}`}
                    className="w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors border-b border-border last:border-b-0"
                    onClick={() => handleResultClick(result)}
                  >
                    {result.type === "machine" ? (
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-primary font-medium">{result.make}</span>
                          <span className="text-foreground ml-2 font-semibold">{result.model}</span>
                        </div>
                        {result.trackSizes && result.trackSizes.length > 0 && (
                          <span className="text-sm text-muted-foreground">
                            {result.trackSizes.slice(0, 2).join(", ")}
                            {result.trackSizes.length > 2 && ` +${result.trackSizes.length - 2}`}
                          </span>
                        )}
                      </div>
                    ) : result.type === "track-size" ? (
                      <div className="flex items-center gap-2">
                        <span className="bg-primary/20 text-primary px-2 py-1 rounded text-sm font-medium">
                          Track Size
                        </span>
                        <span className="text-foreground font-semibold">{result.size}</span>
                      </div>
                    ) : (
                      <span className="text-foreground">{result.title}</span>
                    )}
                  </button>
                ))}
                
                {/* View all results link */}
                <Link
                  href={`/products?search=${encodeURIComponent(searchQuery)}`}
                  className="block w-full px-4 py-3 text-center text-primary hover:bg-secondary/50 transition-colors font-medium"
                  onClick={() => setShowDropdown(false)}
                >
                  View all results for &quot;{searchQuery}&quot;
                </Link>
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Link
              href="/machines"
              className="px-4 py-2 bg-secondary/50 hover:bg-secondary text-foreground rounded-lg text-sm font-medium transition-colors"
            >
              Search by Machine
            </Link>
            <Link
              href="/track-size"
              className="px-4 py-2 bg-secondary/50 hover:bg-secondary text-foreground rounded-lg text-sm font-medium transition-colors"
            >
              Search by Track Size
            </Link>
            <Link
              href="/rubber-tracks"
              className="px-4 py-2 bg-secondary/50 hover:bg-secondary text-foreground rounded-lg text-sm font-medium transition-colors"
            >
              Browse Rubber Tracks
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="text-lg h-14 px-8" asChild>
              <Link href="/contact">Request a Quote</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg h-14 px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <Link href="tel:+18001234567">
                <Phone className="h-5 w-5 mr-2" />
                Call Now: 1-800-XXX-XXXX
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-secondary/30 rounded-lg p-4">
              <MapPin className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Houston Warehouse</p>
                <p className="text-sm text-muted-foreground">Local pickup available</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-secondary/30 rounded-lg p-4">
              <Truck className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Nationwide Shipping</p>
                <p className="text-sm text-muted-foreground">2-5 day delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-secondary/30 rounded-lg p-4">
              <Clock className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Same-Day Shipping</p>
                <p className="text-sm text-muted-foreground">Order before 2pm CT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
