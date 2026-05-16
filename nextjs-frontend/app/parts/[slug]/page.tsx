import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronRight,
  Phone,
  Mail,
  Truck,
  MapPin,
  CheckCircle,
  Shield,
  Info,
  Package,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BUSINESS_INFO } from "@/lib/url-utils";
import {
  VERIFIED_PARTS,
  getVerifiedPartBySlug,
  getAllVerifiedPartSlugs,
  getComponentTypeFromPart,
  getCompatibleMachinesForPart,
  VerifiedPart,
} from "@/lib/data/verified-parts-data";
import {
  COMPONENT_DISPLAY_NAMES,
  COMPONENT_PLURAL_NAMES,
  COMPONENT_URL_PATHS,
} from "@/lib/data/undercarriage-data";
import { generateBreadcrumbSchema, getSiteUrl } from "@/lib/schema";
import RequestQuoteForm from "@/components/forms/request-quote-form";

const SITE_URL = getSiteUrl();

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all verified parts
export async function generateStaticParams() {
  return getAllVerifiedPartSlugs().map((slug) => ({ slug }));
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const part = getVerifiedPartBySlug(slug);
  
  if (!part) {
    return {
      title: "Part Not Found | Rubber Track Wholesale",
    };
  }
  
  return {
    title: part.seo_title || `${part.brand} ${part.primary_part_number} | Rubber Track Wholesale`,
    description: part.meta_description || `In-stock ${part.brand} ${part.primary_part_number}. Wholesale undercarriage parts from Houston with nationwide shipping.`,
    alternates: {
      canonical: `${SITE_URL}/parts/${slug}`,
    },
    openGraph: {
      title: part.seo_h1 || `${part.brand} ${part.primary_part_number}`,
      description: part.meta_description,
      type: "website",
      url: `${SITE_URL}/parts/${slug}`,
    },
  };
}

// Generate Product schema for verified parts only
// Note: No price, offers, reviews, or ratings per requirements
// Only showing verified factual information that matches visible page content
function generatePartSchema(part: VerifiedPart) {
  const componentType = getComponentTypeFromPart(part);
  const componentName = componentType ? COMPONENT_DISPLAY_NAMES[componentType] : "Undercarriage Part";
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: part.product_name || `${part.brand} ${part.primary_part_number}`,
    description: part.meta_description,
    sku: part.primary_part_number,
    mpn: part.primary_part_number,
    brand: {
      "@type": "Brand",
      name: part.brand,
    },
    category: componentName,
    manufacturer: {
      "@type": "Organization",
      name: part.brand,
    },
    // No offers/availability/price - would require visible matching content on page
    // No reviews/ratings - would require actual customer reviews
  };
}

export default async function PartDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const part = getVerifiedPartBySlug(slug);
  
  if (!part) {
    notFound();
  }
  
  const componentType = getComponentTypeFromPart(part);
  const componentName = componentType ? COMPONENT_DISPLAY_NAMES[componentType] : "Undercarriage Part";
  const componentPluralName = componentType ? COMPONENT_PLURAL_NAMES[componentType] : "Undercarriage Parts";
  const componentUrlPath = componentType ? COMPONENT_URL_PATHS[componentType] : "";
  
  // Generate schemas
  const productSchema = generatePartSchema(part);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: componentPluralName, url: componentUrlPath ? `${SITE_URL}/${componentUrlPath}` : `${SITE_URL}/parts` },
    { name: part.primary_part_number, url: `${SITE_URL}/parts/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([productSchema, breadcrumbSchema]),
        }}
      />
      
      <div className="min-h-screen bg-background">
        {/* Breadcrumb */}
        <div className="bg-secondary border-b border-border">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              {componentUrlPath && (
                <>
                  <Link href={`/${componentUrlPath}`} className="hover:text-foreground">
                    {componentPluralName}
                  </Link>
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
              <span className="text-foreground">
                {part.primary_part_number}
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary to-background py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-green-600 uppercase tracking-wide">
                  Verified Part - Imported and Sold by Rubber Track Wholesale
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 text-balance">
                {part.seo_h1 || `${part.brand} ${componentName} ${part.primary_part_number}`}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6 text-pretty">
                {part.product_name}. Wholesale pricing with fast shipping from our Houston warehouse.
              </p>
              
              {/* Key benefits */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>Verified Part</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Fast Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Houston Warehouse</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                  <span>Expert Support</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="#quote">Get a Quote</Link>
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

        {/* Part Details Section */}
        <section className="py-12 lg:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Main Part Info Card */}
              <Card className="border-green-500/30 bg-green-500/5">
                <CardContent className="p-6 lg:p-8">
                  <h2 className="text-xl font-bold mb-6">Part Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-start border-b border-border pb-4">
                      <span className="text-muted-foreground">Primary Part Number</span>
                      <span className="font-bold text-lg">{part.primary_part_number}</span>
                    </div>
                    
                    {part.alt_part_numbers.length > 0 && (
                      <div className="flex justify-between items-start border-b border-border pb-4">
                        <span className="text-muted-foreground">Alternate Part Numbers</span>
                        <span className="font-medium text-right">{part.alt_part_numbers.join(", ")}</span>
                      </div>
                    )}
                    
                    {part.oem_equivalent && (
                      <div className="flex justify-between items-start border-b border-border pb-4">
                        <span className="text-muted-foreground">OEM Equivalent</span>
                        <span className="font-medium">{part.oem_equivalent}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-start border-b border-border pb-4">
                      <span className="text-muted-foreground">Brand</span>
                      <span className="font-medium">{part.brand}</span>
                    </div>
                    
                    <div className="flex justify-between items-start border-b border-border pb-4">
                      <span className="text-muted-foreground">Part Type</span>
                      <span className="font-medium">{componentName}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fitment Info Card */}
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <h2 className="text-xl font-bold mb-6">Compatible Machines</h2>
                  
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">Common Fitment Includes:</p>
                    <p className="text-foreground">{part.compatible_models_text}</p>
                  </div>
                  
                  {part.chassis_mount_notes && (
                    <div className="mb-6 p-4 bg-secondary rounded-lg">
                      <p className="text-sm font-medium mb-1">Mounting Notes</p>
                      <p className="text-sm text-muted-foreground">{part.chassis_mount_notes}</p>
                    </div>
                  )}
                  
                  {part.serial_notes && (
                    <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                      <div className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-1">
                            Serial Number Specific
                          </p>
                          <p className="text-sm text-yellow-700 dark:text-yellow-300">
                            {part.serial_notes}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <strong>Verify fitment by serial number before ordering.</strong> Contact us with your machine serial number to confirm this part fits your specific configuration.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Compatible Machine Links */}
        {part.compatible_models.length > 0 && componentType && (
          <section className="py-12 lg:py-16 border-b border-border bg-secondary/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">
                View {componentName} Pages by Machine
              </h2>
              <p className="text-muted-foreground mb-8">
                Click a machine below to view the full {componentName.toLowerCase()} page with specifications, installation information, and ordering details.
              </p>
              
              {/* Get validated machine links - only render links for machines that exist */}
              {(() => {
                const { verified, unverified } = getCompatibleMachinesForPart(part, componentType);
                
                return (
                  <>
                    {/* Verified machines with working links */}
                    {verified.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
                        {verified.slice(0, 15).map((machine) => (
                          <Link
                            key={machine.slug}
                            href={machine.url}
                            className="group"
                          >
                            <Card className="hover:border-primary transition-colors">
                              <CardContent className="p-4 text-center">
                                <p className="text-xs text-muted-foreground mb-1">{machine.brand}</p>
                                <span className="font-semibold group-hover:text-primary">
                                  {machine.model}
                                </span>
                              </CardContent>
                            </Card>
                          </Link>
                        ))}
                      </div>
                    )}
                    
                    {/* Unverified machines - show as text only, no links */}
                    {unverified.length > 0 && (
                      <div className="mt-6 p-4 bg-secondary rounded-lg">
                        <p className="text-sm font-medium mb-2">Additional Compatible Models:</p>
                        <p className="text-sm text-muted-foreground">
                          {unverified.map((m) => `${m.brand} ${m.model}`).join(", ")}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Contact us to verify fitment for these models.
                        </p>
                      </div>
                    )}
                    
                    {verified.length > 15 && (
                      <p className="text-sm text-muted-foreground mt-4 text-center">
                        And {verified.length - 15} more compatible models with pages. Contact us for full compatibility list.
                      </p>
                    )}
                  </>
                );
              })()}
            </div>
          </section>
        )}

        {/* Related Links Section */}
        <section className="py-12 lg:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">Related Resources</h2>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Link to component category page */}
              {componentUrlPath && (
                <Link href={`/${componentUrlPath}`} className="group">
                  <Card className="h-full hover:border-primary transition-colors">
                    <CardContent className="p-6 flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Wrench className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary mb-1">
                          All {componentPluralName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Browse all {componentPluralName.toLowerCase()} by brand and machine
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )}
              
              {/* Link to brand page */}
              <Link href={`/brands/${part.brand.toLowerCase()}`} className="group">
                <Card className="h-full hover:border-primary transition-colors">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary mb-1">
                        {part.brand} Parts
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        View all rubber tracks and undercarriage parts for {part.brand}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              {/* Link to rubber tracks */}
              <Link href="/rubber-tracks" className="group">
                <Card className="h-full hover:border-primary transition-colors">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold group-hover:text-primary mb-1">
                        Rubber Tracks
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Browse rubber tracks by size and machine compatibility
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Quote Form */}
        <section id="quote" className="py-12 lg:py-16 border-b border-border scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Get a Quote for {part.brand} {part.primary_part_number}
                </h2>
                <p className="text-muted-foreground">
                  Contact us with your machine details for competitive wholesale pricing.
                  Include your serial number for accurate fitment verification.
                </p>
              </div>
              
              <RequestQuoteForm
                machineBrand={part.brand}
                machineModel={part.compatible_models[0] || ""}
                category={componentType || "bottom-roller"}
                partNumber={part.primary_part_number}
              />
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="bg-primary/5 rounded-2xl p-8 lg:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Why Buy From Rubber Track Wholesale?
                  </h2>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Verified Parts</span>
                        <p className="text-sm text-muted-foreground">Parts we have imported and sold successfully</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Wholesale Pricing</span>
                        <p className="text-sm text-muted-foreground">Competitive pricing direct from our Houston warehouse</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Expert Support</span>
                        <p className="text-sm text-muted-foreground">Knowledgeable staff to verify fitment before ordering</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium">Fast Nationwide Shipping</span>
                        <p className="text-sm text-muted-foreground">Same-day shipping on in-stock items</p>
                      </div>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-background rounded-xl p-6 shadow-lg">
                  <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <a href={BUSINESS_INFO.phoneTel} className="font-medium hover:text-primary">
                          {BUSINESS_INFO.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a href={`mailto:${BUSINESS_INFO.email}`} className="font-medium hover:text-primary">
                          {BUSINESS_INFO.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p className="font-medium">Houston, TX</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
