"use client";

import { useState } from "react";
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
import { API, fetcher, type Brand, type Compatibility } from "@/lib/api";

export function CompatibilitySection() {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Compatibility[]>([]);
  const [searching, setSearching] = useState(false);

  const { data: brands } = useSWR<Brand[]>(API.brands, fetcher);

  const handleSearch = async () => {
    if (!selectedBrand && !modelSearch) return;

    setSearching(true);
    try {
      const params = new URLSearchParams();
      if (selectedBrand) params.append("make", selectedBrand);
      if (modelSearch) params.append("model", modelSearch);

      const res = await fetch(`${API.compatibilitySearch}?${params.toString()}`);
      const data = await res.json();
      setSearchResults(data);
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
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
              <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                <SelectTrigger className="bg-secondary border-border">
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  {brands?.map((brand) => (
                    <SelectItem key={brand.id} value={brand.name}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                placeholder="Enter model number..."
                value={modelSearch}
                onChange={(e) => setModelSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
                className="bg-secondary border-border"
              />

              <Button onClick={handleSearch} disabled={searching}>
                {searching ? (
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Search className="h-5 w-5 mr-2" />
                )}
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Compatible Machines ({searchResults.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {searchResults.slice(0, 6).map((machine, idx) => (
                <Card
                  key={idx}
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
                      <Link
                        href={`/products?brand=${machine.make}&model=${machine.model}`}
                      >
                        <Button size="sm">View Parts</Button>
                      </Link>
                    </div>
                    {machine.track_sizes && machine.track_sizes.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border">
                        <p className="text-sm text-muted-foreground">
                          Track Sizes: {machine.track_sizes.join(", ")}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            {searchResults.length > 6 && (
              <div className="text-center mt-6">
                <Link href={`/products?brand=${selectedBrand}`}>
                  <Button variant="outline">
                    View All {searchResults.length} Results
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
