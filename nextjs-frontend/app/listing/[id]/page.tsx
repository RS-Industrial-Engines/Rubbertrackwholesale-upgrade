import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronRight, Phone, Mail, Package, Truck, Shield, Check, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  type FallbackProduct,
  fallbackRubberTracks,
  fallbackBottomRollers,
  fallbackSprockets,
  fallbackIdlers,
  fallbackFinalDrives,
} from "@/lib/data/products";
import { generateBreadcrumbSchema, getSiteUrl } from "@/lib/schema";
import { BUSINESS_INFO } from "@/lib/url-utils";

const SITE_URL = getSiteUrl();

// Combine all fallback products
const allFallbackProducts = [
  ...fallbackRubberTracks,
  ...fallbackBottomRollers,
  ...fallbackSprockets,
  ...fallbackIdlers,
  ...fallbackFinalDrives,
];

interface ListingPageProps {
  params: Promise<{ id: string }>;
}

async function getListingById(id: string): Promise<FallbackProduct | undefined> {
  return allFallbackProducts.find((p) => p.id === id);
}

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    return {
      title: "Listing Not Found",
    };
  }

  return {
    title: `${listing.title} | Rubber Track Wholesale`,
    description: listing.description,
    alternates: {
      canonical: `${SITE_URL}/listing/${id}`,
    },
    openGraph: {
      title: listing.title,
      description: listing.description,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  return allFallbackProducts.map((product) => ({
    id: product.id,
  }));
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { id } = await params;
  const listing = await getListingById(id);

  if (!listing) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: getCategoryName(listing.category), url: `${SITE_URL}/${listing.category}` },
    { name: listing.title, url: `${SITE_URL}/listing/${listing.id}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: listing.title,
            description: listing.description,
            brand: {
              "@type": "Brand",
              name: listing.brand_name,
            },
            offers: {
              "@type": "Offer",
              availability: listing.in_stock
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
              price: listing.price || undefined,
              priceCurrency: listing.price ? "USD" : undefined,
              url: `${SITE_URL}/listing/${listing.id}`,
            },
          }),
        }}
      />
      <ListingDetailContent listing={listing} />
    </>
  );
}

function getCategoryName(slug: string): string {
  const names: Record<string, string> = {
    "rubber-tracks": "Rubber Tracks",
    "bottom-rollers": "Bottom Rollers",
    "sprockets": "Sprockets",
    "idlers": "Idlers",
    "final-drives": "Final Drives",
  };
  return names[slug] || slug;
}

function ListingDetailContent({ listing }: { listing: FallbackProduct }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/${listing.category}`} className="hover:text-foreground">
              {getCategoryName(listing.category)}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground truncate max-w-[200px]">{listing.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Visual/Specs Card */}
          <div>
            {listing.track_size ? (
              // Track size product - show size prominently
              <div className="aspect-square bg-gradient-to-br from-secondary to-muted rounded-2xl flex flex-col items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  {listing.in_stock && (
                    <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                      In Stock
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground text-lg mb-2">Track Size</p>
                <p className="text-6xl lg:text-7xl font-bold text-foreground mb-4">
                  {listing.track_size}
                </p>
                <div className="flex flex-wrap gap-4 justify-center mt-4">
                  {listing.specifications &&
                    Object.entries(listing.specifications).slice(0, 3).map(([key, value]) => (
                      <div
                        key={key}
                        className="px-4 py-2 bg-card rounded-lg border border-border"
                      >
                        <span className="text-muted-foreground text-sm capitalize">
                          {key}:
                        </span>
                        <span className="ml-2 font-semibold text-foreground">{value}</span>
                      </div>
                    ))}
                </div>
                <p className="text-primary font-semibold mt-6">{listing.brand_name}</p>
              </div>
            ) : (
              // Undercarriage part - show icon and specs
              <div className="aspect-square bg-gradient-to-br from-secondary to-muted rounded-2xl flex flex-col items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  {listing.in_stock && (
                    <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                      In Stock
                    </span>
                  )}
                </div>
                <Wrench className="h-24 w-24 text-muted-foreground mb-4" />
                <p className="text-2xl font-bold text-foreground text-center">
                  {getCategoryName(listing.category)}
                </p>
                <p className="text-primary font-semibold mt-4">{listing.brand_name}</p>
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div>
            <p className="text-primary font-semibold mb-2">{listing.brand_name}</p>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {listing.title}
            </h1>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {listing.in_stock ? (
                <>
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-green-500 font-semibold">In Stock - Ready to Ship</span>
                </>
              ) : (
                <span className="text-muted-foreground">Contact for Availability</span>
              )}
            </div>

            {/* Price */}
            <div className="mb-6 p-4 bg-secondary rounded-lg">
              {listing.price ? (
                <span className="text-3xl font-bold text-foreground">
                  ${listing.price.toFixed(2)}
                </span>
              ) : (
                <div>
                  <span className="text-xl text-muted-foreground">Wholesale Pricing</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Contact us for competitive quotes
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="font-semibold text-foreground mb-2">Description</h2>
              <p className="text-muted-foreground">{listing.description}</p>
            </div>

            {/* Specifications */}
            {listing.specifications && Object.keys(listing.specifications).length > 0 && (
              <div className="mb-6">
                <h2 className="font-semibold text-foreground mb-3">Specifications</h2>
                <div className="bg-secondary rounded-lg p-4">
                  <dl className="grid grid-cols-2 gap-4">
                    {Object.entries(listing.specifications).map(([key, value]) => (
                      <div key={key}>
                        <dt className="text-muted-foreground text-sm capitalize">
                          {key.replace(/_/g, " ")}
                        </dt>
                        <dd className="text-foreground font-medium">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/contact" className="flex-1">
                <Button size="lg" className="w-full">
                  Request Quote
                </Button>
              </Link>
              <a href={BUSINESS_INFO.phoneTel} className="flex-1">
                <Button size="lg" variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call to Order
                </Button>
              </a>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-card rounded-lg border border-border">
                <Package className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Wholesale Pricing</p>
              </div>
              <div className="p-3 bg-card rounded-lg border border-border">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Fast Shipping</p>
              </div>
              <div className="p-3 bg-card rounded-lg border border-border">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Quality Guarantee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Compatible Machines */}
        <section className="mt-12 lg:mt-16 pt-12 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Compatible Machines
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {listing.compatible_machines.map((machine) => {
              const slug = machine.toLowerCase().replace(/\s+/g, "-");
              return (
                <Link
                  key={machine}
                  href={`/machines/${slug}`}
                  className="group flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <span className="font-semibold text-foreground group-hover:text-primary">
                    {machine}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </section>

        {/* Related Track Sizes (for rubber tracks) */}
        {listing.category === "rubber-tracks" && (
          <section className="mt-12 pt-12 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Other Popular Track Sizes
            </h2>
            <div className="flex flex-wrap gap-3">
              {["400x86x52", "450x86x56", "300x52.5x80", "320x86x52", "400x72.5x72"]
                .filter((s) => s !== listing.track_size)
                .map((size) => (
                  <Link
                    key={size}
                    href={`/track-size/${size.toLowerCase()}`}
                    className="px-4 py-2 bg-card border border-border rounded-lg hover:border-primary transition-colors font-medium text-foreground"
                  >
                    {size}
                  </Link>
                ))}
            </div>
          </section>
        )}

        {/* Contact Section */}
        <Card className="mt-12 bg-card border-border">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Need Help?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our team of experts is available to answer your questions and help
              you find the right parts for your equipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="flex items-center gap-2 text-primary hover:text-primary/80"
              >
                <Phone className="h-5 w-5" />
                {BUSINESS_INFO.phone}
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-2 text-primary hover:text-primary/80"
              >
                <Mail className="h-5 w-5" />
                {BUSINESS_INFO.email}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
