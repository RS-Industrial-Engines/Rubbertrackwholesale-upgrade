"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import Link from "next/link";
import { Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API, fetcher } from "@/lib/api";
import { createMachineSlug } from "@/lib/url-utils";
import {
  brands as fallbackBrands,
  getModelsByBrand,
  machineCompatibility,
} from "@/lib/data/machine-models";

interface CompatibilityResult {
  make: string;
  model: string;
  equipment_type?: string;
  track_sizes?: string[];
}

export function CompatibilitySection() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [searchResults, setSearchResults] = useState<CompatibilityResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  // Fetch brands from API with fallback
  const { data: apiBrands, error: brandsError } = useSWR<string[]>(
    `${API.machineModelBrands}?include_all=true`,
    fetcher,
    { 
      revalidateOnFocus: false,
      shouldRetryOnError: false 
    }
  );

  // Use API brands if available, otherwise fall back to local data
  const brands = apiBrands && apiBrands.length > 0 ? apiBrands : fallbackBrands;

  // Update available models when brand changes
  useEffect(() => {
    if (!selectedBrand) {
      setAvailableModels([]);
      return;
    }

    // Try to fetch models from API
    const fetchModels = async () => {
      try {
        const response = await fetch(
          `${API.machineModels}?brand=${encodeURIComponent(selectedBrand)}&include_all=true`
        );
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const models = data.map((m: { model_name?: string; model?: string }) => m.model_name || m.model || "");
            setAvailableModels(models.filter(Boolean));
            return;
          }
        }
      } catch {
        // API failed, use fallback
      }
      
      // Fall back to local data
      const localModels = getModelsByBrand(selectedBrand);
      setAvailableModels(localModels);
    };

    fetchModels();
  }, [selectedBrand]);

  const handleSearch = async () => {
    if (!selectedBrand && !modelSearch) return;

    setSearching(true);
    const results: CompatibilityResult[] = [];

    try {
      // Try API first
      const params = new URLSearchParams();
      if (selectedBrand) params.append("make", selectedBrand);
      if (modelSearch) params.append("model", modelSearch);
      params.append("include_all", "true");

      const response = await fetch(`${API.compatibilitySearch}?${params.toString()}`);
      
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setSearchResults(data);
          setSearching(false);
          return;
        }
      }
    } catch {
      // API failed, continue to fallback
    }

    // Fallback to local data
    if (selectedBrand) {
      const models = getModelsByBrand(selectedBrand);
      const filteredModels = modelSearch
        ? models.filter((m) => m.toLowerCase().includes(modelSearch.toLowerCase()))
        : models;

      filteredModels.forEach((model) => {
        const key = `${selectedBrand} ${model}`;
        const trackSizes = machineCompatibility[key] || [];
        results.push({
          make: selectedBrand,
          model: model,
          equipment_type: "Compact Track Loader",
          track_sizes: trackSizes,
        });
      });
    }

    setSearchResults(results);
    setSearching(false);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Find Compatible Rubber Tracks
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Search by brand and model to find the right rubber tracks for your
            equipment
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="bg-card rounded-lg p-6 border border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select value={selectedBrand} onValueChange={(value) => {
                setSelectedBrand(value);
                setModelSearch("");
                setSearchResults([]);
              }}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent className="max-h-60 overflow-y-auto">
                  {brands.map((brand) => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative">
                <Input
                  placeholder={selectedBrand ? "Enter model number..." : "Select brand first..."}
                  value={modelSearch}
                  onChange={(e) => setModelSearch(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="bg-secondary border-border"
                  disabled={!selectedBrand}
                  list="model-suggestions"
                />
                {selectedBrand && availableModels.length > 0 && (
                  <datalist id="model-suggestions">
                    {availableModels.slice(0, 20).map((model) => (
                      <option key={model} value={model} />
                    ))}
                  </datalist>
                )}
              </div>

              <Button onClick={handleSearch} disabled={searching || (!selectedBrand && !modelSearch)}>
                {searching ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Search className="h-5 w-5 mr-2" />
                )}
                Search
              </Button>
            </div>
            
            {/* Quick model chips when brand is selected */}
            {selectedBrand && availableModels.length > 0 && !searchResults.length && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Popular {selectedBrand} models:</p>
                <div className="flex flex-wrap gap-2">
                  {availableModels.slice(0, 8).map((model) => (
                    <button
                      key={model}
                      onClick={() => {
                        setModelSearch(model);
                        // Auto-search after selecting
                        setTimeout(() => handleSearch(), 100);
                      }}
                      className="px-3 py-1 bg-secondary hover:bg-secondary/80 rounded-full text-sm text-foreground transition-colors"
                    >
                      {model}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Compatible Machines ({searchResults.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.slice(0, 10).map((machine, idx) => (
                <Card
                  key={`${machine.make}-${machine.model}-${idx}`}
                  className="bg-card border-border hover:border-primary transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-primary text-sm font-semibold">
                          {machine.make}
                        </p>
                        <h4 className="text-foreground font-semibold text-lg">
                          {machine.model}
                        </h4>
                        {machine.equipment_type && (
                          <p className="text-muted-foreground text-sm">
                            {machine.equipment_type}
                          </p>
                        )}
                      </div>
                      <Link href={`/machines/${createMachineSlug(machine.make, machine.model)}`}>
                        <Button size="sm">View Details</Button>
                      </Link>
                    </div>
                    {machine.track_sizes && machine.track_sizes.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-sm text-muted-foreground mb-2">Compatible Track Sizes:</p>
                        <div className="flex flex-wrap gap-2">
                          {machine.track_sizes.map((size) => (
                            <Link
                              key={size}
                              href={`/track-size/${size}`}
                              className="px-2 py-1 bg-primary/10 text-primary rounded text-sm hover:bg-primary/20 transition-colors"
                            >
                              {size}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            {searchResults.length > 10 && (
              <div className="text-center mt-6">
                <Link href={`/machines?brand=${encodeURIComponent(selectedBrand)}`}>
                  <Button variant="outline">
                    View All {searchResults.length} Results
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Empty state after search */}
        {searchResults.length === 0 && (selectedBrand || modelSearch) && !searching && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Click &quot;Search&quot; to find compatible machines{selectedBrand ? ` for ${selectedBrand}` : ""}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
