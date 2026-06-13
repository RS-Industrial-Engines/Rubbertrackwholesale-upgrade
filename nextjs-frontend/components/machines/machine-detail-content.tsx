"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Phone,
  Mail,
  Package,
  Truck,
  Shield,
  Clock,
  MapPin,
  CheckCircle,
  Wrench,
  AlertTriangle,
  Info,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { CompatibilitySearchResult } from "@/lib/api";
import { createMachineSlug, BUSINESS_INFO, formatMachineModelLabel } from "@/lib/url-utils";
import RequestQuoteForm from "@/components/forms/request-quote-form";
import { DualDimensionTable, getDualDimension } from "@/components/track-sizes/dual-dimension-table";
import {
  getAllMachineComponentCards,
  COMPONENT_PLURAL_NAMES,
} from "@/lib/data/undercarriage-data";

interface RelatedMachine {
  make: string;
  model: string;
  slug: string;
  trackSizes: string[];
  equipmentType?: string;
}

interface MachineDetailContentProps {
  make: string;
  model: string;
  equipmentType: string;
  compatibility: CompatibilitySearchResult | null;
  relatedMachines: RelatedMachine[];
  faqs: { question: string; answer: string }[];
  businessInfo: typeof BUSINESS_INFO;
  priceRange?: { low: number; high: number; pricedCount: number } | null;
}

export function MachineDetailContent({
  make,
  model,
  equipmentType,
  compatibility,
  relatedMachines,
  faqs,
  businessInfo,
  priceRange,
}: MachineDetailContentProps) {
  // SAFETY DEDUPE: Ensure no duplicate track sizes in render
  // Dedupe by size string (e.g., "300x52.5x80") before rendering cards
  const rawTrackSizes = compatibility?.track_sizes || [];
  const seenSizes = new Set<string>();
  const trackSizes = rawTrackSizes.filter((track) => {
    if (seenSizes.has(track.size)) return false;
    seenSizes.add(track.size);
    return true;
  });
  const primaryTrackSize = trackSizes[0]?.size || "";
  const slug = createMachineSlug(make, model);
  const modelLabel = formatMachineModelLabel(model);

  // Generate equipment-specific content
  const machineUseCases = getMachineUseCases(equipmentType);
  const maintenanceTips = getMaintenanceTips();

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/machines" className="hover:text-foreground">
              Machines
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">
              {make} {modelLabel}
            </span>
          </nav>
        </div>
      </div>

      {/* A. Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-background py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-primary font-semibold mb-2 uppercase tracking-wide">
              {equipmentType}
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              {make} {modelLabel} Rubber Tracks & Undercarriage Parts
            </h1>
            
            {/* Track size summary */}
            {primaryTrackSize && (
              <p className="text-lg text-muted-foreground mb-4">
                Compatible Track Size: <span className="font-semibold text-foreground">{primaryTrackSize}</span>
                {trackSizes.length > 1 && ` (+${trackSizes.length - 1} more options)`}
              </p>
            )}

            {/* Price range — only renders when machine has at least one priced size */}
            {priceRange && (
              <div className="mb-6">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-3xl lg:text-4xl font-bold text-foreground">
                    ${priceRange.low.toLocaleString()} &ndash; ${priceRange.high.toLocaleString()}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    <CheckCircle className="h-4 w-4" />
                    IN STOCK &ndash; Ready to Ship
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
                  Final price varies with freight, tariff, quantity &amp; availability &ndash;{" "}
                  <a href="/contact" className="text-primary hover:underline font-medium">
                    contact us for a quote
                  </a>
                  .
                </p>
              </div>
            )}
            
            <p className="text-xl text-muted-foreground mb-6 text-pretty">
              Premium replacement rubber tracks and undercarriage components for your {make} {model}.
              Wholesale pricing. Houston warehouse with nationwide shipping.
            </p>
            
            {/* Location badge */}
            <div className="flex items-center gap-2 text-muted-foreground mb-8">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{businessInfo.name} - {businessInfo.address.full}</span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Get a Free Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={businessInfo.phoneTel}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call: {businessInfo.phone}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* B. Compatible Rubber Track Sizes OR Call to Confirm Section */}
      <section className="py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          {trackSizes.length > 0 ? (
            <>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Compatible Rubber Track Sizes for {make} {model}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-3xl">
                Below are the rubber track sizes that fit your {make} {model} {equipmentType.toLowerCase()}.
                Click on a size to view detailed specifications and compatible machines.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                {trackSizes.map((track) => (
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
                        {getDualDimension(track.size) ? (
                          <DualDimensionTable size={track.size} />
                        ) : (
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Width:</span>
                              <span className="font-medium">{track.width}mm</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Pitch:</span>
                              <span className="font-medium">{track.pitch}mm</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Links:</span>
                              <span className="font-medium">{track.links}</span>
                            </div>
                          </div>
                        )}
                        <div className="mt-4 pt-4 border-t border-border">
                          <span className="text-sm text-primary font-medium group-hover:underline">
                            View track details →
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
              
              {/* Track size explanation */}
              <Card className="bg-secondary/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Understanding Track Size</h4>
                      <p className="text-sm text-muted-foreground">
                        Track size is expressed as <strong>Width x Pitch x Links</strong> (e.g., {primaryTrackSize || "400x86x52"}).
                        Width is the track width in millimeters, pitch is the distance between track lugs, and links is the total number of track links.
                        Always verify your track size before ordering by measuring your existing track or checking your machine manual.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Call to Confirm Rubber Tracks & Undercarriage Parts for {make} {model}
              </h2>
              <p className="text-muted-foreground mb-8 max-w-3xl">
                We&apos;re verifying the exact rubber track size for your {make} {model}. 
                Contact our parts specialists to confirm compatibility and get a quote for your undercarriage needs.
              </p>
              <Card className="bg-secondary/50">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-shrink-0">
                      <Phone className="h-12 w-12 text-primary" />
                    </div>
                    <div className="text-center md:text-left">
                      <h3 className="text-xl font-semibold mb-2">Need Help Finding the Right Parts?</h3>
                      <p className="text-muted-foreground mb-4">
                        Our experts can verify the correct track size and undercarriage components for your {make} {model}.
                        We&apos;ll help you find the right parts at wholesale prices.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <Button size="lg" asChild>
                          <Link href={businessInfo.phoneTel}>
                            <Phone className="h-4 w-4 mr-2" />
                            Call {businessInfo.phone}
                          </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                          <Link href="/contact">Request a Quote</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </section>

      {/* Available Tread Patterns */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Available Tread Patterns
          </h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Choose the right tread pattern for your application. All patterns available for {make} {model} rubber tracks.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              {
                name: "Block Pattern",
                image: "/images/tread-patterns/block-pattern.jpg",
                bestFor: "Best for paved surfaces, turf, and finished concrete",
              },
              {
                name: "C-Pattern (C-Lug)",
                image: "/images/tread-patterns/c-pattern.jpg",
                bestFor: "Most versatile — dirt, gravel, and mixed terrain",
              },
              {
                name: "Staggered Block",
                image: "/images/tread-patterns/staggered-block.jpg",
                bestFor: "Mixed terrain with surface protection",
              },
              {
                name: "Z-Pattern (Zig-Zag)",
                image: "/images/tread-patterns/z-pattern.jpg",
                bestFor: "Maximum traction in mud, snow, and loose material",
              },
            ].map((pattern) => (
              <Card key={pattern.name} className="overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={pattern.image}
                    alt={`${pattern.name} rubber track tread`}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">{pattern.name}</h3>
                  <p className="text-sm text-muted-foreground">{pattern.bestFor}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            All tread patterns available and in stock at our Houston warehouse. Block and C-Pattern are our most popular. Call {businessInfo.phone} for same-day pickup or nationwide shipping.
          </p>
        </div>
      </section>

      {/* C. About This Machine */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
            About the {make} {model}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Machine Overview</h3>
              <p className="text-muted-foreground mb-4">
                The {make} {model} is a popular {equipmentType.toLowerCase()} known for its reliability
                and performance. {make} equipment is widely used in construction, landscaping, and agricultural
                applications across the United States.
              </p>
              <p className="text-muted-foreground">
                Proper undercarriage maintenance, including timely rubber track replacement, is essential
                for maximizing the performance and lifespan of your {make} {model}.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Common Applications</h3>
              <ul className="space-y-3">
                {machineUseCases.map((useCase, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* D. Undercarriage Maintenance / Buying Guidance */}
      <section className="py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
            {make} {model} Undercarriage Maintenance Guide
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Signs You Need New Tracks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  Signs You Need New Rubber Tracks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Visible cracks in the rubber surface",
                    "Missing or damaged track lugs",
                    "Exposed or damaged steel cords",
                    "Excessive track stretching or looseness",
                    "Uneven wear patterns across the track",
                    "Reduced traction or slipping",
                  ].map((sign, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-amber-500 font-bold">•</span>
                      {sign}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Track Wear Causes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-primary" />
                  Common Causes of Track Wear
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Operating on rough or abrasive surfaces",
                    "Improper track tension (too tight or loose)",
                    "Excessive turning on hard surfaces",
                    "Exposure to chemicals, oil, or fuel",
                    "Worn sprockets, rollers, or idlers",
                    "Operating beyond recommended load capacity",
                  ].map((cause, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary font-bold">•</span>
                      {cause}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Maintenance Tips */}
          <Card className="bg-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                Maintenance Tips for Your {make} {model}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {maintenanceTips.map((tip, i) => (
                  <div key={i}>
                    <h4 className="font-semibold mb-2">{tip.title}</h4>
                    <p className="text-sm text-muted-foreground">{tip.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* E. Compatible Parts */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            {make} {model} Undercarriage Parts
          </h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            We carry a complete range of undercarriage parts for your {make} {model}.
            All parts are available at wholesale prices with fast shipping from Houston.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Rubber Tracks - links to current machine page */}
            <Card className="group hover:border-primary transition-colors h-full flex flex-col">
              <CardContent className="p-6 flex flex-col h-full">
                <Package className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary">
                  Rubber Tracks
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-grow">
                  Premium quality rubber tracks for {make} {model}
                </p>
                <div className="flex flex-col gap-2 mt-auto">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="/rubber-tracks">Browse Rubber Tracks</Link>
                  </Button>
                  <Button size="sm" asChild className="w-full">
                    <Link href={businessInfo.phoneTel}>
                      <Phone className="h-3 w-3 mr-2" />
                      Get Quote
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* All undercarriage component cards - always show all 3 */}
            {/* ALL cards link to component pages - page content varies by data availability */}
            {getAllMachineComponentCards(make, model).map((card) => (
              <Card key={card.component} className="group hover:border-primary transition-colors h-full flex flex-col">
                <CardContent className="p-6 flex flex-col h-full">
                  <Settings className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary">
                    {card.pluralName}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">
                    {make} {model} {card.displayName.toLowerCase()} replacement
                  </p>
                  <div className="flex flex-col gap-2 mt-auto">
                    {/* ALWAYS link to component page - page handles data vs quote mode */}
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link href={card.url}>
                        View {card.pluralName}
                      </Link>
                    </Button>
                    <Button size="sm" asChild className="w-full">
                      <Link href={businessInfo.phoneTel}>
                        <Phone className="h-3 w-3 mr-2" />
                        Call to Confirm
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">
            Why Buy {make} {model} Parts from {businessInfo.name}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Package,
                title: "Wholesale Prices",
                description: "30-50% below OEM pricing on premium quality tracks and parts",
              },
              {
                icon: Truck,
                title: "Fast Shipping",
                description: "Same-day shipping from Houston. 2-5 day delivery nationwide.",
              },
              {
                icon: MapPin,
                title: "Houston Warehouse",
                description: "Local pickup available. Visit us at " + businessInfo.address.full,
              },
              {
                icon: Shield,
                title: "Quality Guaranteed",
                description: "All parts backed by manufacturer warranty and our satisfaction guarantee.",
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* F. Related Machines */}
      {relatedMachines.length > 0 && (
        <section className="py-12 lg:py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
              Other {make} Models
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedMachines.map((machine) => (
                <Link
                  key={machine.slug}
                  href={`/machines/${machine.slug}`}
                  className="group flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <div>
                    <span className="font-semibold text-foreground group-hover:text-primary block">
                      {machine.make} {machine.model}
                    </span>
                    {machine.trackSizes[0] && (
                      <span className="text-xs text-muted-foreground">
                        {machine.trackSizes[0]}
                      </span>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link href={`/machines?brand=${encodeURIComponent(make)}`}>
                  View All {make} Models
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* G. FAQs */}
      <section className="py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions: {make} {model}
          </h2>
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-border rounded-lg px-4"
                >
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

      {/* H. Request Quote Form */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <RequestQuoteForm
              machineBrand={make}
              machineModel={model}
              trackSize={primaryTrackSize}
              sourcePage={`/machines/${slug}`}
              title={`Get a Quote for ${make} ${model}`}
              subtitle={`Request wholesale pricing on rubber tracks and undercarriage parts for your ${make} ${model}. We respond within 2 business hours.`}
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
            Ready to Order {make} {model} Rubber Tracks?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Get wholesale pricing on premium rubber tracks and undercarriage parts for your {make} {model}.
            Contact us today for a free quote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href={businessInfo.phoneTel}>
                <Phone className="h-4 w-4 mr-2" />
                Call: {businessInfo.phone}
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
          <p className="text-primary-foreground/60 text-sm mt-6">
            {businessInfo.name} • {businessInfo.address.full}
          </p>
        </div>
      </section>
    </div>
  );
}

// Helper function to get use cases based on equipment type
function getMachineUseCases(equipmentType: string): string[] {
  const useCases: Record<string, string[]> = {
    "Compact Track Loader": [
      "Landscaping and grading projects",
      "Site preparation and demolition",
      "Material handling and loading",
      "Snow removal operations",
      "Agricultural applications",
      "Utility and construction work",
    ],
    "Mini Excavator": [
      "Trenching for utilities and drainage",
      "Foundation and footing excavation",
      "Landscaping and tree planting",
      "Pool and pond excavation",
      "Demolition and site clearing",
      "Tight space excavation work",
    ],
    "Excavator": [
      "Heavy excavation and earthmoving",
      "Commercial construction projects",
      "Road and highway construction",
      "Mining and quarry operations",
      "Demolition projects",
      "Utility installation",
    ],
    "Crawler Carrier": [
      "Material transport over rough terrain",
      "Pipeline and utility construction",
      "Environmental remediation",
      "Wetland and sensitive area work",
      "Remote site material delivery",
      "Heavy load transportation",
    ],
  };
  
  return useCases[equipmentType] || useCases["Compact Equipment"] || [
    "General construction applications",
    "Material handling and transport",
    "Site preparation work",
    "Landscaping projects",
    "Agricultural operations",
    "Utility installation",
  ];
}

// Helper function to get maintenance tips
function getMaintenanceTips() {
  return [
    {
      title: "Check Track Tension Daily",
      description: "Proper tension extends track life. Too tight causes premature wear; too loose risks de-tracking.",
    },
    {
      title: "Inspect Undercarriage Weekly",
      description: "Check sprockets, rollers, and idlers for wear. Replace worn components to prevent track damage.",
    },
    {
      title: "Clean Tracks Regularly",
      description: "Remove debris, mud, and rocks from tracks and undercarriage. Prevents premature wear and damage.",
    },
    {
      title: "Avoid Sharp Turns",
      description: "Gradual turns reduce track stress. Sharp turns on hard surfaces accelerate edge wear.",
    },
    {
      title: "Match Track to Application",
      description: "Use the right track tread pattern for your work surface. Different applications require different tracks.",
    },
    {
      title: "Store Properly When Not in Use",
      description: "Park on flat surfaces. Avoid prolonged exposure to direct sunlight and chemicals.",
    },
  ];
}
