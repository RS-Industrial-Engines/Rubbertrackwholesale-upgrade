"use client";

import Link from "next/link";
import { ChevronRight, Phone, AlertTriangle, CheckCircle, Truck, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BUSINESS_INFO } from "@/lib/url-utils";
import {
  UndercarriageComponent,
  COMPONENT_DISPLAY_NAMES,
  COMPONENT_PLURAL_NAMES,
  COMPONENT_URL_PATHS,
} from "@/lib/data/undercarriage-data";

interface MachineComponentQuoteContentProps {
  brand: string;
  model: string;
  componentType: UndercarriageComponent;
  equipmentType?: string;
  trackSizes: string[];
}

/**
 * Quote/Verification page content for machines WITHOUT verified part data.
 * 
 * BUSINESS RULE: This page is shown when no researched part numbers exist.
 * - NO Product schema
 * - NO fake part numbers
 * - NO fake inventory/pricing
 * - noindex, follow (set in page metadata)
 * - Asks customer to call with serial number for verification
 */
export function MachineComponentQuoteContent({
  brand,
  model,
  componentType,
  equipmentType,
  trackSizes,
}: MachineComponentQuoteContentProps) {
  const displayName = COMPONENT_DISPLAY_NAMES[componentType];
  const pluralName = COMPONENT_PLURAL_NAMES[componentType];
  const urlPath = COMPONENT_URL_PATHS[componentType];

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
            <Link href={`/${urlPath}`} className="hover:text-foreground">
              {pluralName}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">
              {brand} {model}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-background py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-amber-600 mb-4">
              <AlertTriangle className="h-5 w-5" />
              <span className="font-semibold">Part Number Verification Required</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-balance">
              {brand} {model} {displayName} Replacement
            </h1>
            <p className="text-xl text-muted-foreground mb-6 text-pretty">
              We can source {pluralName.toLowerCase()} for your {brand} {model}
              {equipmentType ? ` ${equipmentType}` : ""}. Please call with your machine&apos;s serial number for exact fitment verification and pricing.
            </p>
            
            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-lg">
                <Link href={BUSINESS_INFO.phoneTel}>
                  <Phone className="h-5 w-5 mr-2" />
                  Call: {BUSINESS_INFO.phone}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Request Quote Online</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Verification Notice */}
      <section className="py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <Card className="border-amber-200 bg-amber-50/50">
            <CardContent className="p-6 lg:p-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-xl font-bold text-foreground mb-2">
                    Why We Need Your Serial Number
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {brand} {model} machines may have different {displayName.toLowerCase()} specifications depending on the production year and configuration. To ensure you receive the correct part, we need to verify:
                  </p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Exact {displayName.toLowerCase()} dimensions and tooth count</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Drive system compatibility (sprocket engagement type)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Production year variations and part number changes</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What to Have Ready */}
      <section className="py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
            What to Have Ready When You Call
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Machine Serial Number</h3>
                <p className="text-muted-foreground text-sm">
                  Usually found on the frame near the operator station. This confirms exact specifications.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Current Part Condition</h3>
                <p className="text-muted-foreground text-sm">
                  Photos of existing {pluralName.toLowerCase()} help us verify correct replacement parts.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold text-lg mb-2">Shipping Address</h3>
                <p className="text-muted-foreground text-sm">
                  For accurate shipping quotes. We ship nationwide from our Houston warehouse.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Track Sizes (if available) */}
      {trackSizes.length > 0 && (
        <section className="py-12 lg:py-16 border-b border-border bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              {brand} {model} Track Sizes
            </h2>
            <p className="text-muted-foreground mb-6">
              Compatible track sizes for reference. {displayName} specifications may vary - call to confirm.
            </p>
            <div className="flex flex-wrap gap-3">
              {trackSizes.map((size) => (
                <span
                  key={size}
                  className="px-4 py-2 bg-card border border-border rounded-lg text-sm font-medium"
                >
                  {size}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">
            Why Buy from {BUSINESS_INFO.name}?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Expert Verification</h3>
                <p className="text-sm text-muted-foreground">
                  We verify every part number before shipping to ensure correct fitment.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Truck className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Fast Shipping</h3>
                <p className="text-sm text-muted-foreground">
                  Same-day shipping from Houston. 2-5 day delivery nationwide.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Houston Warehouse</h3>
                <p className="text-sm text-muted-foreground">
                  Local pickup available at {BUSINESS_INFO.address.city}.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-10 w-10 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Quick Quotes</h3>
                <p className="text-sm text-muted-foreground">
                  Get pricing and availability within minutes of your call.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary/5 rounded-2xl p-8 lg:p-12 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Ready to Get Your {brand} {model} {displayName}?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Call now with your serial number and we&apos;ll verify the exact part you need and provide pricing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg">
                <Link href={BUSINESS_INFO.phoneTel}>
                  <Phone className="h-5 w-5 mr-2" />
                  {BUSINESS_INFO.phone}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Request Quote Online</Link>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              {BUSINESS_INFO.address.full}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
