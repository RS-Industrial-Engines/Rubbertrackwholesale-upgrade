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
  AlertTriangle,
  Eye,
  Code,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BUSINESS_INFO, createMachineSlug } from "@/lib/url-utils";
import { STAGED_PARTS, StagedPart } from "@/lib/data/staged-parts-data";
import {
  getComponentTypeFromStagedPart,
  getStagedPartBySlug,
  getAllStagedPartSlugs,
  getCompatibleMachinesForStagedPart,
  generateStagedSlug,
} from "@/lib/data/staged-review-helpers";
import {
  COMPONENT_DISPLAY_NAMES,
  COMPONENT_PLURAL_NAMES,
  COMPONENT_URL_PATHS,
} from "@/lib/data/undercarriage-data";
import { generateBreadcrumbSchema, getSiteUrl } from "@/lib/schema";

const SITE_URL = getSiteUrl();

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all staged parts with slugs
export async function generateStaticParams() {
  // Generate slugs for all staged parts (including auto-generated ones)
  return STAGED_PARTS.map((part) => ({
    slug: generateStagedSlug(part),
  }));
}

// Generate metadata with noindex, nofollow
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const part = findStagedPartBySlug(slug);

  if (!part) {
    return {
      title: "Staged Part Not Found | Review",
      robots: { index: false, follow: false },
    };
  }

  const componentType = getComponentTypeFromStagedPart(part);
  const componentName = componentType ? COMPONENT_DISPLAY_NAMES[componentType] : "Part";

  // Auto-generate SEO fields for QA preview
  const seoTitle = part.seo_title ||
    `${part.brand} ${componentName} ${part.primary_part_number} | Wholesale Undercarriage Parts`;
  const metaDescription = part.meta_description_override ||
    `In-stock ${part.brand} ${componentName} ${part.primary_part_number}. Wholesale undercarriage parts from Houston with nationwide shipping. Fits ${part.compatible_models_text}.`;
  const h1 = part.seo_h1 ||
    `${part.brand} ${componentName} ${part.primary_part_number}`;

  return {
    title: `[REVIEW] ${seoTitle}`,
    description: metaDescription,
    // CRITICAL: noindex, nofollow for staged pages
    robots: {
      index: false,
      follow: false,
    },
    // Show canonical as it WOULD appear if published
    alternates: {
      canonical: `${SITE_URL}/parts/${slug}`,
    },
    openGraph: {
      title: h1,
      description: metaDescription,
      type: "website",
      url: `${SITE_URL}/parts/${slug}`,
    },
  };
}

/**
 * Find a staged part by slug (including auto-generated slugs)
 */
function findStagedPartBySlug(slug: string): StagedPart | null {
  // First try direct slug match
  const direct = getStagedPartBySlug(slug);
  if (direct) return direct;

  // Try matching via generated slugs
  for (const part of STAGED_PARTS) {
    if (generateStagedSlug(part) === slug) {
      return part;
    }
  }

  return null;
}

// Generate Product schema preview (same as production but for QA audit)
function generatePartSchemaPreview(part: StagedPart) {
  const componentType = getComponentTypeFromStagedPart(part);
  const componentName = componentType ? COMPONENT_DISPLAY_NAMES[componentType] : "Undercarriage Part";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: part.product_name || `${part.brand} ${part.primary_part_number}`,
    description: part.meta_description_override ||
      `In-stock ${part.brand} ${componentName} ${part.primary_part_number}. Wholesale undercarriage parts from Houston with nationwide shipping.`,
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
  };
}

export default async function ReviewPartDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const part = findStagedPartBySlug(slug);

  if (!part) {
    notFound();
  }

  const componentType = getComponentTypeFromStagedPart(part);
  const componentName = componentType ? COMPONENT_DISPLAY_NAMES[componentType] : "Undercarriage Part";
  const componentPluralName = componentType ? COMPONENT_PLURAL_NAMES[componentType] : "Undercarriage Parts";
  const componentUrlPath = componentType ? COMPONENT_URL_PATHS[componentType] : "";

  // Generate schema and SEO for QA audit
  const productSchema = generatePartSchemaPreview(part);
  const effectiveSlug = generateStagedSlug(part);
  const seoTitle = part.seo_title ||
    `${part.brand} ${componentName} ${part.primary_part_number} | Wholesale Undercarriage Parts`;
  const metaDescription = part.meta_description_override ||
    `In-stock ${part.brand} ${componentName} ${part.primary_part_number}. Wholesale undercarriage parts from Houston with nationwide shipping. Fits ${part.compatible_models_text}.`;
  const h1 = part.seo_h1 || `${part.brand} ${componentName} ${part.primary_part_number}`;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: componentPluralName, url: componentUrlPath ? `${SITE_URL}/${componentUrlPath}` : `${SITE_URL}/parts` },
    { name: part.primary_part_number, url: `${SITE_URL}/parts/${effectiveSlug}` },
  ]);

  return (
    <>
      {/* Schema preview - same as production would render */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([productSchema, breadcrumbSchema]),
        }}
      />

      <div className="min-h-screen bg-background">
        {/* REVIEW BANNER - clearly labels this as staged */}
        <div className="bg-yellow-500/20 border-b-2 border-yellow-500 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-yellow-800 dark:text-yellow-200">
                  STAGED REVIEW - noindex, nofollow
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-300">
                  Record: {part.record_id} | Confidence: {part.confidence} | Status: {part.publish_status}
                </p>
              </div>
            </div>
            <Link
              href="/review/parts"
              className="text-xs text-yellow-700 hover:text-yellow-900 underline flex-shrink-0"
            >
              Back to Review Index
            </Link>
          </div>
        </div>

        {/* SEO AUDIT PANEL */}
        <div className="bg-secondary border-b border-border">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-2 mb-4">
              <Code className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-bold">SEO Audit Panel</h2>
            </div>
            <div className="grid gap-3 text-sm">
              <div className="flex gap-2">
                <span className="font-medium text-muted-foreground w-40 flex-shrink-0">Proposed URL:</span>
                <code className="text-foreground break-all">/parts/{effectiveSlug}</code>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-muted-foreground w-40 flex-shrink-0">Canonical:</span>
                <code className="text-foreground break-all">{SITE_URL}/parts/{effectiveSlug}</code>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-muted-foreground w-40 flex-shrink-0">SEO Title:</span>
                <span className="text-foreground">{seoTitle}</span>
                <span className="text-xs text-muted-foreground">({seoTitle.length} chars)</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-muted-foreground w-40 flex-shrink-0">Meta Description:</span>
                <span className="text-foreground">{metaDescription}</span>
                <span className="text-xs text-muted-foreground">({metaDescription.length} chars)</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-muted-foreground w-40 flex-shrink-0">H1:</span>
                <span className="text-foreground">{h1}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-muted-foreground w-40 flex-shrink-0">Robots:</span>
                <span className="text-red-600 font-medium">noindex, nofollow</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-muted-foreground w-40 flex-shrink-0">Sitemap:</span>
                <span className="text-red-600 font-medium">EXCLUDED (staged)</span>
              </div>
              <div className="flex gap-2">
                <span className="font-medium text-muted-foreground w-40 flex-shrink-0">Breadcrumbs:</span>
                <span className="text-foreground">
                  Home &gt; {componentPluralName} &gt; {part.primary_part_number}
                </span>
              </div>
            </div>

            {/* Schema preview */}
            <details className="mt-4">
              <summary className="cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground">
                View JSON-LD Schema Preview
              </summary>
              <pre className="mt-2 p-4 bg-background rounded-lg text-xs overflow-auto max-h-64 border border-border">
                {JSON.stringify([productSchema, breadcrumbSchema], null, 2)}
              </pre>
            </details>
          </div>
        </div>

        {/* Breadcrumb - same as production */}
        <div className="bg-secondary/50 border-b border-border">
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

        {/* Hero Section - mirrors production but with STAGED badge */}
        <section className="bg-gradient-to-br from-secondary to-background py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="h-5 w-5 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-600 uppercase tracking-wide">
                  Staged Review - Researched Part (Not Yet Published)
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 text-balance">
                {h1}
              </h1>

              <p className="text-lg text-muted-foreground mb-6 text-pretty">
                {part.product_name || `${part.brand} ${componentName} ${part.primary_part_number}`}. Wholesale pricing with fast shipping from our Houston warehouse.
              </p>

              {/* Key benefits - same as production */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                  <span>Researched Part</span>
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
              <Card className="border-yellow-500/30 bg-yellow-500/5">
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

                    {part.superseded_part_numbers && (
                      <div className="flex justify-between items-start border-b border-border pb-4">
                        <span className="text-muted-foreground">Supersession Notes</span>
                        <span className="font-medium text-right text-sm">{part.superseded_part_numbers}</span>
                      </div>
                    )}
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

                  {part.fitment_notes && (
                    <div className="mt-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        <strong>Fitment Notes:</strong> {part.fitment_notes}
                      </p>
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

        {/* Compatible Machine Links - preview of internal linking */}
        {part.compatible_models.length > 0 && componentType && (
          <section className="py-12 lg:py-16 border-b border-border bg-secondary/30">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6">
                View {componentName} Pages by Machine
              </h2>
              <p className="text-muted-foreground mb-8">
                Click a machine below to view the full {componentName.toLowerCase()} page with specifications, installation information, and ordering details.
              </p>

              {(() => {
                const { verified, unverified } = getCompatibleMachinesForStagedPart(part, componentType);

                return (
                  <>
                    {verified.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
                        {verified.slice(0, 15).map((machine) => (
                          <div key={machine.slug} className="flex flex-col gap-2">
                            <Link
                              href={machine.url}
                              className="group"
                            >
                              <Card className="hover:border-primary transition-colors">
                                <CardContent className="p-4 text-center">
                                  <p className="text-xs text-muted-foreground mb-1">{machine.brand}</p>
                                  <span className="font-semibold group-hover:text-primary">
                                    {machine.model}
                                  </span>
                                  <p className="text-xs text-primary mt-1">{componentName}</p>
                                </CardContent>
                              </Card>
                            </Link>
                            <Link
                              href={`/machines/${machine.slug}`}
                              className="text-xs text-muted-foreground hover:text-primary text-center"
                            >
                              View all {machine.brand} {machine.model} parts
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}

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

        {/* Quote Form placeholder */}
        <section id="quote" className="py-12 lg:py-16 border-b border-border scroll-mt-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Get a Quote for {part.brand} {part.primary_part_number}
                </h2>
                <p className="text-muted-foreground">
                  Contact us for wholesale pricing. Our team in Houston, TX is ready to help you find the right part.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Call Us</h3>
                    <p className="text-lg font-bold text-primary">{BUSINESS_INFO.phone}</p>
                    <p className="text-sm text-muted-foreground mt-1">Mon-Fri 8am-5pm CT</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Email Us</h3>
                    <p className="text-lg font-bold text-primary">{BUSINESS_INFO.email}</p>
                    <p className="text-sm text-muted-foreground mt-1">Include your serial number</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
