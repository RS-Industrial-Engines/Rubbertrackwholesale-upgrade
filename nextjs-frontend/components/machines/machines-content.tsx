"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronRight, Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { MachineModel } from "@/lib/api";

interface MachinesContentProps {
  machines: MachineModel[];
  brands: string[];
}

export function MachinesContent({ machines, brands }: MachinesContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredMachines = useMemo(() => {
    let filtered = machines;

    if (selectedBrand) {
      filtered = filtered.filter(
        (m) => m.make?.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (m) =>
          m.make?.toLowerCase().includes(query) ||
          m.model?.toLowerCase().includes(query) ||
          `${m.make} ${m.model}`.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [machines, selectedBrand, searchQuery]);

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
    const makeSlug = machine.make?.toLowerCase().replace(/\s+/g, "-") || "";
    const modelSlug = machine.model?.toLowerCase().replace(/\s+/g, "-") || "";
    return `/machines/${makeSlug}-${modelSlug}`;
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
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-card border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Filter */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedBrand === null ? "default" : "outline"}
              onClick={() => setSelectedBrand(null)}
              size="sm"
            >
              All Brands
            </Button>
            {brands.map((brand) => (
              <Button
                key={brand}
                variant={selectedBrand === brand ? "default" : "outline"}
                onClick={() => setSelectedBrand(brand)}
                size="sm"
              >
                {brand}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Machines Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {Object.keys(machinesByBrand).length === 0 ? (
            <div className="text-center py-16">
              <Wrench className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                No machines found
              </h2>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
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
              <Link href="tel:+18001234567">Call Now: 1-800-XXX-XXXX</Link>
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
