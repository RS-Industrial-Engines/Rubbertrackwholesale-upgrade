"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronRight, Ruler, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { TrackSize, TrackSizeGrouped } from "@/lib/api";
import { BUSINESS_INFO } from "@/lib/url-utils";

interface TrackSizesContentProps {
  trackSizes: TrackSize[];
  trackSizesGrouped: TrackSizeGrouped[];
}

export function TrackSizesContent({
  trackSizes,
  trackSizesGrouped,
}: TrackSizesContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWidth, setSelectedWidth] = useState<number | null>(null);

  const widths = useMemo(() => {
    const unique = [...new Set(trackSizes.map((t) => t.width))].sort((a, b) => a - b);
    return unique;
  }, [trackSizes]);

  const filteredSizes = useMemo(() => {
    let filtered = trackSizes;

    if (selectedWidth) {
      filtered = filtered.filter((t) => t.width === selectedWidth);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((t) => t.size.toLowerCase().includes(query));
    }

    return filtered;
  }, [trackSizes, selectedWidth, searchQuery]);

  const popularSizes = [
    "400x86x52",
    "450x86x56",
    "300x52.5x80",
    "320x86x52",
    "400x72.5x72",
    "450x81x76",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              Rubber Tracks by Size
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Find the exact rubber track size for your machine. Enter your track
              dimensions or browse by width to find compatible tracks.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by size (e.g., 400x86x52)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-card border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Sizes */}
      <section className="py-8 bg-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-lg font-semibold text-primary-foreground mb-4 text-center">
            Popular Track Sizes
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {popularSizes.map((size) => (
              <Link
                key={size}
                href={`/track-size/${size.toLowerCase()}`}
                className="px-4 py-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg text-primary-foreground font-medium transition-colors"
              >
                {size}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Width Filter */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedWidth === null ? "default" : "outline"}
              onClick={() => setSelectedWidth(null)}
              size="sm"
            >
              All Widths
            </Button>
            {widths.map((width) => (
              <Button
                key={width}
                variant={selectedWidth === width ? "default" : "outline"}
                onClick={() => setSelectedWidth(width)}
                size="sm"
              >
                {width}mm
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Track Sizes Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {filteredSizes.length === 0 ? (
            <div className="text-center py-16">
              <Ruler className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                No track sizes found
              </h2>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredSizes.map((track) => (
                <Link
                  key={track.size}
                  href={`/track-size/${track.size.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group"
                >
                  <Card className="h-full hover:border-primary transition-colors">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary mb-3">
                        {track.size}
                      </h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Width: {track.width}mm</p>
                        <p>Pitch: {track.pitch}mm</p>
                        <p>Links: {track.links}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        {track.is_in_stock ? (
                          <span className="px-2 py-1 text-xs font-semibold bg-green-500/10 text-green-500 rounded">
                            In Stock
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-semibold bg-muted text-muted-foreground rounded">
                            Order
                          </span>
                        )}
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How to Measure */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">
              How to Read Rubber Track Sizes
            </h2>
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">W</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Width</h3>
                    <p className="text-sm text-muted-foreground">
                      First number (e.g., <strong>400</strong>x86x52). Measured in
                      millimeters across the track.
                    </p>
                  </div>
                  <div>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">P</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Pitch</h3>
                    <p className="text-sm text-muted-foreground">
                      Second number (e.g., 400x<strong>86</strong>x52). Distance
                      between track links in mm.
                    </p>
                  </div>
                  <div>
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-primary">L</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Links</h3>
                    <p className="text-sm text-muted-foreground">
                      Third number (e.g., 400x86x<strong>52</strong>). Total number
                      of links in the track.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-invert">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Rubber Track Sizes Explained
            </h2>
            <p className="text-muted-foreground mb-4">
              Finding the right rubber track size is essential for optimal machine
              performance. At Rubber Track Wholesale, we stock all popular track sizes
              including <strong>400x86x52</strong> for Bobcat and John Deere compact
              track loaders, <strong>450x86x56</strong> for larger CTLs, and{" "}
              <strong>300x52.5x80</strong> for Kubota and Yanmar mini excavators.
            </p>
            <p className="text-muted-foreground mb-4">
              Our Houston warehouse maintains extensive inventory of rubber tracks in
              every common size. Whether you need tracks for a skid steer, mini
              excavator, or compact track loader, we have the size you need at
              wholesale prices.
            </p>
            <p className="text-muted-foreground">
              Not sure which size fits your machine? Use our{" "}
              <Link href="/machines" className="text-primary hover:underline">
                machine compatibility search
              </Link>{" "}
              or contact our expert team for assistance.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
            Need Help Finding Your Track Size?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Our experts can help you identify the correct track size for your machine.
            Call us or send your machine details for a free quote.
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
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
