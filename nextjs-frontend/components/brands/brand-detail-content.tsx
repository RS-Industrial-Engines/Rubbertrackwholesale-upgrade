"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronRight, Phone, Mail, Wrench, Filter, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BUSINESS_INFO } from "@/lib/url-utils";

interface ModelWithTrackSizes {
  model: string;
  trackSizes: string[];
  slug: string;
}

interface BrandDetailContentProps {
  brand: string;
  models: ModelWithTrackSizes[];
  totalCount: number;
}

export default function BrandDetailContent({
  brand,
  models,
  totalCount,
}: BrandDetailContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrackSize, setSelectedTrackSize] = useState<string | null>(null);

  // Get unique track sizes for filter
  const allTrackSizes = useMemo(() => {
    const sizes = new Set<string>();
    models.forEach((m) => m.trackSizes.forEach((ts) => sizes.add(ts)));
    return Array.from(sizes).sort();
  }, [models]);

  // Filter models
  const filteredModels = useMemo(() => {
    let result = models;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.model.toLowerCase().includes(query) ||
          m.trackSizes.some((ts) => ts.toLowerCase().includes(query))
      );
    }

    if (selectedTrackSize) {
      result = result.filter((m) => m.trackSizes.includes(selectedTrackSize));
    }

    return result;
  }, [models, searchQuery, selectedTrackSize]);

  // Group models by first character for easier browsing
  const groupedModels = useMemo(() => {
    const groups: Record<string, ModelWithTrackSizes[]> = {};
    filteredModels.forEach((model) => {
      const firstChar = model.model.charAt(0).toUpperCase();
      if (!groups[firstChar]) groups[firstChar] = [];
      groups[firstChar].push(model);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredModels]);

  // FAQs for this brand
  const faqs = [
    {
      question: `Where can I find ${brand} rubber tracks at wholesale prices?`,
      answer: `Rubber Track Wholesale Houston offers premium ${brand} rubber tracks at competitive wholesale prices. We stock tracks for all ${brand} models and ship nationwide from our Houston warehouse.`,
    },
    {
      question: `How do I find the right track size for my ${brand} machine?`,
      answer: `Use our compatibility guide above to find your ${brand} model. Each listing shows the compatible track sizes. You can also call us at ${BUSINESS_INFO.phone} for expert assistance.`,
    },
    {
      question: `Do you have undercarriage parts for ${brand} equipment?`,
      answer: `Yes! In addition to rubber tracks, we carry bottom rollers, sprockets, idlers, and final drives for ${brand} machines. All parts are OEM-quality replacements.`,
    },
    {
      question: `How fast can I get ${brand} tracks shipped?`,
      answer: `Most ${brand} tracks ship same-day from our Houston warehouse. We offer nationwide delivery with typical transit times of 2-5 business days depending on your location.`,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary to-background py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/brands" className="hover:text-primary transition-colors">
              Brands
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground font-medium">{brand}</span>
          </nav>

          <div className="max-w-4xl">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4">
              {brand} Rubber Tracks & Undercarriage Parts
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-6 leading-relaxed">
              Find compatible rubber tracks, bottom rollers, sprockets, idlers, and final drives
              for your {brand} equipment. We support <strong className="text-foreground">{totalCount} {brand} models</strong> with
              wholesale pricing and fast nationwide shipping from Houston.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Get a Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={BUSINESS_INFO.phoneTel}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call: {BUSINESS_INFO.phone}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder={`Search ${brand} models...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {allTrackSizes.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filter by track size:</span>
                <Button
                  variant={selectedTrackSize === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTrackSize(null)}
                >
                  All
                </Button>
                {allTrackSizes.slice(0, 8).map((size) => (
                  <Button
                    key={size}
                    variant={selectedTrackSize === size ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTrackSize(size)}
                  >
                    {size}
                  </Button>
                ))}
                {allTrackSizes.length > 8 && (
                  <span className="text-sm text-muted-foreground">
                    +{allTrackSizes.length - 8} more
                  </span>
                )}
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            Showing {filteredModels.length} of {totalCount} {brand} models
          </p>
        </div>
      </section>

      {/* Models Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
            {brand} Rubber Tracks by Machine Model ({filteredModels.length})
          </h2>

          {groupedModels.length > 0 ? (
            <div className="space-y-12">
              {groupedModels.map(([letter, letterModels]) => (
                <div key={letter}>
                  <h3 className="text-lg font-semibold text-muted-foreground mb-4 border-b border-border pb-2">
                    {letter}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {letterModels.map((model) => (
                      <Link
                        key={model.slug}
                        href={`/machines/${model.slug}`}
                        className="group"
                      >
                        <Card className="h-full hover:border-primary transition-colors">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-start justify-between">
                              <span className="group-hover:text-primary transition-colors">
                                {brand} {model.model}
                              </span>
                              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {model.trackSizes.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {model.trackSizes.map((size) => (
                                  <span
                                    key={size}
                                    className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground rounded"
                                  >
                                    {size}
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">
                                Contact for track sizes
                              </span>
                            )}
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Wrench className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No models found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filter criteria.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTrackSize(null);
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Category Links */}
      <section className="py-12 lg:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
            {brand} Undercarriage Parts
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Rubber Tracks", href: "/rubber-tracks", icon: Package },
              { name: "Bottom Rollers", href: "/bottom-rollers", icon: Wrench },
              { name: "Sprockets", href: "/sprockets", icon: Wrench },
              { name: "Idlers", href: "/idlers", icon: Wrench },
              { name: "Final Drives", href: "/final-drives", icon: Wrench },
            ].map((category) => (
              <Link key={category.name} href={category.href}>
                <Card className="h-full hover:border-primary transition-colors text-center p-6">
                  <category.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <span className="font-medium text-foreground">{category.name}</span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
            Need {brand} Rubber Tracks or Parts?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get wholesale pricing on premium {brand} rubber tracks and undercarriage parts.
            Contact us today for a free quote and fast shipping from Houston.
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
              <Link href="/contact">
                <Mail className="h-4 w-4 mr-2" />
                Request Quote
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
