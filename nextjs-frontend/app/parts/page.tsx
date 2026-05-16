import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Phone, Shield, Package, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BUSINESS_INFO } from "@/lib/url-utils";
import {
  VERIFIED_PARTS,
  getComponentTypeFromPart,
} from "@/lib/data/verified-parts-data";
import {
  COMPONENT_DISPLAY_NAMES,
  COMPONENT_PLURAL_NAMES,
} from "@/lib/data/undercarriage-data";
import { generateBreadcrumbSchema, getSiteUrl } from "@/lib/schema";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Verified Undercarriage Part Numbers | Rubber Track Wholesale",
  description: "Browse verified undercarriage part numbers for bottom rollers, sprockets, and idlers. Parts imported and sold by Rubber Track Wholesale with confirmed fitment.",
  alternates: {
    canonical: `${SITE_URL}/parts`,
  },
};

export default function PartsIndexPage() {
  // Group parts by component type
  const partsByType = VERIFIED_PARTS.reduce((acc, part) => {
    const type = getComponentTypeFromPart(part);
    const key = type || "other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(part);
    return acc;
  }, {} as Record<string, typeof VERIFIED_PARTS>);
  
  // Group parts by brand
  const partsByBrand = VERIFIED_PARTS.reduce((acc, part) => {
    if (!acc[part.brand]) acc[part.brand] = [];
    acc[part.brand].push(part);
    return acc;
  }, {} as Record<string, typeof VERIFIED_PARTS>);
  
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Verified Parts", url: `${SITE_URL}/parts` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      
      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-secondary border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground">Verified Parts</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-br from-secondary to-background py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-green-600 uppercase tracking-wide">
                  Verified Part Numbers
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 text-balance">
                Verified Undercarriage Part Numbers
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6 text-pretty">
                Browse part numbers that we have imported and sold successfully. These verified parts have confirmed fitment and are available from our Houston warehouse with wholesale pricing.
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

        {/* Parts by Type */}
        <section className="py-12 lg:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Browse by Part Type</h2>
            
            <div className="space-y-12">
              {Object.entries(partsByType).map(([type, parts]) => {
                const displayName = type !== "other" 
                  ? COMPONENT_PLURAL_NAMES[type as keyof typeof COMPONENT_PLURAL_NAMES]
                  : "Other Parts";
                
                return (
                  <div key={type}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Wrench className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold">{displayName}</h3>
                      <span className="text-sm text-muted-foreground">
                        ({parts.length} verified)
                      </span>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {parts.map((part) => (
                        <Link key={part.slug} href={`/parts/${part.slug}`} className="group">
                          <Card className="h-full hover:border-primary transition-colors border-green-500/20 bg-green-500/5">
                            <CardContent className="p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <Shield className="h-4 w-4 text-green-500" />
                                <span className="text-xs text-green-600 font-medium">Verified</span>
                              </div>
                              <p className="font-bold group-hover:text-primary">
                                {part.primary_part_number}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {part.brand}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                                {part.compatible_models.slice(0, 4).join(", ")}
                                {part.compatible_models.length > 4 && "..."}
                              </p>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Parts by Brand */}
        <section className="py-12 lg:py-16 border-b border-border bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">Browse by Brand</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(partsByBrand).map(([brand, parts]) => (
                <Card key={brand}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{brand}</h3>
                        <p className="text-sm text-muted-foreground">
                          {parts.length} verified parts
                        </p>
                      </div>
                    </div>
                    
                    <ul className="space-y-2">
                      {parts.slice(0, 3).map((part) => (
                        <li key={part.slug}>
                          <Link
                            href={`/parts/${part.slug}`}
                            className="text-sm hover:text-primary hover:underline"
                          >
                            {part.primary_part_number}
                          </Link>
                        </li>
                      ))}
                      {parts.length > 3 && (
                        <li className="text-sm text-muted-foreground">
                          +{parts.length - 3} more
                        </li>
                      )}
                    </ul>
                    
                    <Button variant="outline" size="sm" className="w-full mt-4" asChild>
                      <Link href={`/brands/${brand.toLowerCase()}`}>
                        View All {brand} Parts
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="bg-primary/5 rounded-2xl p-8 lg:p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Need a Part Number Not Listed?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We stock many more undercarriage parts than those listed here. Contact us with your machine make, model, and serial number, and we will verify the correct part number for your equipment.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Request a Quote</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={BUSINESS_INFO.phoneTel}>
                    <Phone className="h-4 w-4 mr-2" />
                    {BUSINESS_INFO.phone}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
