import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ArrowRight,
  CheckCircle,
  Truck,
  Shield,
  Phone,
  ChevronRight,
  Ruler,
  Factory,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  getSiteUrl,
} from "@/lib/schema";
import { BUSINESS_INFO, createMachineSlug } from "@/lib/url-utils";
import { fullBrands, fullTrackSizes, getMachinesForTrackSize, fullMachineModels, getTrackSizesForMachine } from "@/lib/data/full-machine-data";
import { TOP_SELLING_TRACK_SIZES, HIGH_PRIORITY_MACHINES, getCTLTrackSizes, getMiniExcavatorTrackSizes } from "@/lib/data/seo-priorities";

const SITE_URL = getSiteUrl();

// Dynamic stats from actual data
const TOTAL_MACHINES = Object.values(fullMachineModels).reduce((acc, models) => acc + models.length, 0);
const TOTAL_BRANDS = fullBrands.length;
const TOTAL_TRACK_SIZES = fullTrackSizes.length;

export const metadata: Metadata = {
  title: `Rubber Track Compatibility Encyclopedia | ${TOTAL_MACHINES.toLocaleString()}+ Machines | Rubber Track Wholesale`,
  description:
    `Find rubber tracks for ${TOTAL_MACHINES.toLocaleString()}+ machines from ${TOTAL_BRANDS}+ brands. Search by machine model, track size, or browse our complete compatibility database. Houston warehouse with nationwide shipping.`,
  keywords: [
    "rubber tracks",
    "rubber track compatibility",
    "rubber tracks Houston",
    "skid steer tracks",
    "mini excavator tracks",
    "CTL tracks",
    "track loader tracks",
    "rubber track sizes",
    "wholesale rubber tracks",
  ],
  openGraph: {
    title: "Rubber Track Compatibility Encyclopedia | Rubber Track Wholesale",
    description:
      `Find rubber tracks for ${TOTAL_MACHINES.toLocaleString()}+ machines. Search by model or track size. Houston warehouse, nationwide shipping.`,
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/rubber-tracks`,
  },
};

// Top brands by model count - dynamically generated from actual data
function getTopBrands() {
  const brandCounts = Object.entries(fullMachineModels)
    .map(([brand, models]) => ({
      name: brand,
      modelCount: models.length,
    }))
    .sort((a, b) => b.modelCount - a.modelCount)
    .slice(0, 12);
  return brandCounts;
}

// Tread pattern education
const TREAD_PATTERNS = [
  {
    name: "C-Pattern (C-Lug)",
    description: "Most versatile pattern. Excellent for mixed terrain - dirt, gravel, and light pavement.",
    bestFor: "General construction, landscaping, agriculture",
    icon: "C",
    image: "/images/tread-patterns/c-pattern.jpg",
  },
  {
    name: "Block Pattern",
    description: "Flat, wide lugs provide maximum surface contact. Best for paved surfaces and turf.",
    bestFor: "Paving, turf work, indoor operations",
    icon: "B",
    image: "/images/tread-patterns/block-pattern.jpg",
  },
  {
    name: "Z-Pattern (Zig-Zag)",
    description: "Aggressive pattern for maximum traction in loose material. Excellent self-cleaning.",
    bestFor: "Muddy conditions, sandy terrain, demolition",
    icon: "Z",
    image: "/images/tread-patterns/z-pattern.jpg",
  },
  {
    name: "Staggered Block",
    description: "Offset block pattern combines traction with surface protection.",
    bestFor: "Mixed terrain, light paving, general use",
    icon: "S",
    image: "/images/tread-patterns/staggered-block.jpg",
  },
];

// FAQ content
const FAQS = [
  {
    question: "How do I find the right rubber tracks for my machine?",
    answer:
      "Use our search to find your machine by make and model, or search by track size. Every machine page shows compatible track sizes with dimensions (width x pitch x links). You can also call us at " + BUSINESS_INFO.phone + " for expert assistance.",
  },
  {
    question: "What do rubber track size numbers mean (e.g., 400x86x52)?",
    answer:
      "Rubber track sizes are measured as Width x Pitch x Links. Width is the track width in millimeters, Pitch is the distance between drive lugs in millimeters, and Links is the number of drive lugs around the track. All three must match your machine for proper fit.",
  },
  {
    question: "How much do rubber tracks cost?",
    answer:
      "Rubber track prices vary by size and quality. Our wholesale prices are typically 30-50% below retail. Mini excavator tracks start around $400-600/pair, while larger CTL tracks range from $1,200-2,500/pair. Contact us for a quote on your specific size.",
  },
  {
    question: "How long do rubber tracks last?",
    answer:
      "Quality rubber tracks typically last 1,200-2,000 hours with proper use and maintenance. Track life depends on terrain (abrasive surfaces wear faster), operating conditions, proper tension adjustment, and avoiding spinning on hard surfaces.",
  },
  {
    question: "Do you ship rubber tracks nationwide?",
    answer:
      "Yes! We ship from our Houston warehouse to all 50 states. Most orders ship same-day with delivery in 2-5 business days. We also offer local pickup in Houston and can arrange freight shipping for bulk orders.",
  },
  {
    question: "What's the difference between OEM and aftermarket tracks?",
    answer:
      "Our premium aftermarket rubber tracks meet or exceed OEM specifications at 30-50% less cost. They feature continuous steel cord construction, high-quality rubber compounds, and the same fit and performance as OEM tracks.",
  },
  {
    question: "Which tread pattern should I choose?",
    answer:
      "C-pattern is most versatile for mixed terrain. Block pattern is best for paved/turf surfaces. Z-pattern provides maximum traction in mud/sand. We can recommend the best pattern for your specific application.",
  },
  {
    question: "Do you offer warranties on rubber tracks?",
    answer:
      "Yes, all our rubber tracks include a manufacturer warranty covering defects in materials and workmanship. Warranty terms vary by product line. Contact us for specific warranty details on any track.",
  },
];

export default async function RubberTracksPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Rubber Tracks", url: `${SITE_URL}/rubber-tracks` },
  ];

  // Get machine counts for each top track size
  const trackSizesWithMachines = TOP_SELLING_TRACK_SIZES.map((item) => {
    const machines = getMachinesForTrackSize(item.size);
    return {
      size: item.size,
      rank: item.rank,
      description: item.description,
      machineCount: machines.length,
      sampleMachines: machines.slice(0, 3).map((m) => `${m.brand} ${m.model}`),
    };
  });

  // Total stats
  const totalBrands = TOTAL_BRANDS;
  const totalMachines = TOTAL_MACHINES;
  const totalTrackSizes = TOTAL_TRACK_SIZES;
  
  // Get top brands dynamically
  const topBrands = getTopBrands();

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
          __html: JSON.stringify(generateFAQPageSchema(FAQS)),
        }}
      />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12 lg:py-20 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Rubber Track Compatibility Encyclopedia
              </h1>
              <p className="text-lg lg:text-xl text-muted-foreground mb-8">
                Find the perfect rubber tracks for your machine. Search {totalMachines.toLocaleString()}+ compatible machines
                from {totalBrands}+ brands.
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-8">
                <form action="/search" method="GET" className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      name="q"
                      type="text"
                      placeholder="Search by machine (e.g., Kubota SVL75) or track size (e.g., 400x86x52)"
                      className="pl-10 h-12 text-base"
                    />
                  </div>
                  <Button type="submit" size="lg" className="h-12 px-6">
                    Search
                  </Button>
                </form>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">{totalMachines.toLocaleString()}+</div>
                  <div className="text-sm text-muted-foreground">Compatible Machines</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">{totalBrands}+</div>
                  <div className="text-sm text-muted-foreground">Equipment Brands</div>
                </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <div className="text-2xl lg:text-3xl font-bold text-primary">{totalTrackSizes}+</div>
                <div className="text-sm text-muted-foreground">Track Sizes</div>
              </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">Houston</div>
                  <div className="text-sm text-muted-foreground">In-Stock Warehouse</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-6 border-b border-border bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-6 lg:gap-12">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>In Stock - Houston Warehouse</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Truck className="h-5 w-5 text-primary" />
                <span>Fast Nationwide Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span>Warranty Included</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-5 w-5 text-primary" />
                <span>Expert Support: {BUSINESS_INFO.phone}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Rubber Tracks by Machine - MACHINE-FIRST SEO */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Popular Rubber Tracks by Machine
                </h2>
                <p className="text-muted-foreground mt-1">
                  Find rubber tracks for the most popular compact track loaders and mini excavators
                </p>
              </div>
              <Link href="/machines">
                <Button variant="outline" className="hidden sm:flex">
                  View All Machines <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {HIGH_PRIORITY_MACHINES.slice(0, 16).map((machine) => {
                const trackSizes = getTrackSizesForMachine(machine.brand, machine.model);
                if (trackSizes.length === 0) return null;
                const slug = createMachineSlug(machine.brand, machine.model);
                return (
                  <Link
                    key={`${machine.brand}-${machine.model}`}
                    href={`/machines/${slug}`}
                    className="group"
                  >
                    <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-muted-foreground">
                            {machine.brand}
                          </span>
                          <span className="text-xs font-semibold px-2 py-0.5 bg-green-100 text-green-700 rounded">
                            In Stock
                          </span>
                        </div>
                        <div className="font-bold text-lg group-hover:text-primary transition-colors">
                          {machine.model}
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                          <span className="font-medium">Track Size{trackSizes.length > 1 ? "s" : ""}:</span>{" "}
                          {trackSizes.slice(0, 2).join(", ")}
                          {trackSizes.length > 2 && ` +${trackSizes.length - 2} more`}
                        </div>
                        <div className="mt-3 text-xs text-primary font-medium group-hover:underline">
                          View Tracks & Parts →
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              }).filter(Boolean)}
            </div>

            <div className="mt-6 text-center">
              <Link href="/machines">
                <Button variant="outline">
                  Browse All {TOTAL_MACHINES.toLocaleString()}+ Machines <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Popular Track Sizes - TOP 12 */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Popular Rubber Track Sizes
                </h2>
                <p className="text-muted-foreground mt-1">
                  Top 12 best-selling track sizes based on real sales data
                </p>
              </div>
              <Link href="/track-size">
                <Button variant="outline" className="hidden sm:flex">
                  View All Sizes <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {trackSizesWithMachines.map((item, index) => (
                <Link
                  key={item.size}
                  href={`/track-size/${item.size}`}
                  className="group"
                >
                  <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold px-2 py-0.5 bg-primary/10 text-primary rounded">
                          #{item.rank}
                        </span>
                        {item.rank <= 3 && (
                          <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-0.5 rounded">
                            Top Seller
                          </span>
                        )}
                      </div>
                      <div className="font-bold text-lg group-hover:text-primary transition-colors">
                        {item.size}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {item.machineCount} machines
                      </div>
                      <div className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {item.sampleMachines.join(", ")}...
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center sm:hidden">
              <Link href="/track-size">
                <Button variant="outline">
                  View All Track Sizes <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Browse by Brand */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Browse Rubber Tracks by Brand
                </h2>
                <p className="text-muted-foreground mt-1">
                  Find tracks for your specific equipment manufacturer
                </p>
              </div>
              <Link href="/brands">
                <Button variant="outline" className="hidden sm:flex">
                  View All Brands <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {topBrands.map((brand) => (
                <Link
                  key={brand.name}
                  href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group"
                >
                  <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                    <CardContent className="p-4 text-center">
                      <div className="font-semibold group-hover:text-primary transition-colors">
                        {brand.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {brand.modelCount} models
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            <div className="mt-6 text-center">
              <Link href="/brands">
                <Button variant="outline">
                  View All {totalBrands}+ Brands <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Tread Patterns Education */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Rubber Track Tread Patterns Explained
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choosing the right tread pattern is crucial for performance and track life.
                Here&apos;s what each pattern is best suited for.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {TREAD_PATTERNS.map((pattern) => (
                  <Card key={pattern.name} className="h-full overflow-hidden">
                    <div className="aspect-[4/3] relative bg-muted">
                      <Image
                        src={pattern.image}
                        alt={`${pattern.name} rubber track tread pattern`}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">{pattern.icon}</span>
                        </div>
                        <CardTitle className="text-lg">{pattern.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-3">
                        {pattern.description}
                      </p>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span className="text-sm">
                          <span className="font-medium">Best for:</span> {pattern.bestFor}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                Not sure which tread pattern is right for your application?
              </p>
              <Link href="/contact">
                <Button>
                  <Phone className="mr-2 h-4 w-4" />
                  Talk to an Expert
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTL vs Skid Steer Rubber Track Guide */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Compact Track Loader (CTL) Rubber Track Guide
              </h2>
              <p className="text-muted-foreground mb-8">
                Everything you need to know about CTL rubber tracks, sizing, and maintenance
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* CTL Track Sizing */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Ruler className="h-5 w-5 text-primary" />
                      Understanding CTL Track Sizes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      CTL rubber tracks are measured in three dimensions: <strong>Width x Pitch x Links</strong>.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">W</div>
                        <div>
                          <div className="font-medium text-sm">Width (mm)</div>
                          <div className="text-xs text-muted-foreground">Track width measured across. Common CTL widths: 320mm, 400mm, 450mm</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">P</div>
                        <div>
                          <div className="font-medium text-sm">Pitch (mm)</div>
                          <div className="text-xs text-muted-foreground">Distance between drive lugs. CTL standard: 86mm pitch</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">L</div>
                        <div>
                          <div className="font-medium text-sm">Links (count)</div>
                          <div className="text-xs text-muted-foreground">Number of drive lugs around the track. Varies by machine length</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Popular CTL Sizes - Data-Driven */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Factory className="h-5 w-5 text-primary" />
                      Top-Selling CTL Track Sizes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getCTLTrackSizes().slice(0, 8).map((size) => {
                        const machines = getMachinesForTrackSize(size).slice(0, 2);
                        return (
                          <Link 
                            key={size}
                            href={`/track-size/${size.toLowerCase()}`} 
                            className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors group"
                          >
                            <span className="font-medium group-hover:text-primary">{size}</span>
                            <span className="text-xs text-muted-foreground">
                              {machines.length > 0 
                                ? machines.map(m => `${m.brand} ${m.model}`).join(", ")
                                : "Multiple machines"}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* CTL Maintenance Tips */}
              <Card className="mb-10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    CTL Rubber Track Maintenance Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">Check Track Tension</div>
                      <p className="text-xs text-muted-foreground">Inspect tension weekly. Proper sag is typically 1-1.5 inches at center span.</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">Avoid Hard Surfaces</div>
                      <p className="text-xs text-muted-foreground">Minimize spinning on concrete/asphalt. Use forward motion when possible.</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">Clean Regularly</div>
                      <p className="text-xs text-muted-foreground">Remove debris from undercarriage. Mud/rocks cause premature wear.</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">Inspect Drive Components</div>
                      <p className="text-xs text-muted-foreground">Check sprockets, idlers, and rollers. Worn parts damage tracks.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTL vs Skid Steer */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">CTL vs Skid Steer: Which is Right for You?</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Compact Track Loaders (CTLs)</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        Lower ground pressure - better for soft terrain
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        Superior traction in mud, snow, and sand
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        Less turf damage on landscaping jobs
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        More stable on slopes and uneven ground
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Wheeled Skid Steers</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        Lower initial cost and maintenance
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        Better for hard surfaces and paved areas
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        Faster travel speeds on flat terrain
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        Easier tire replacement vs track replacement
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mini Excavator Rubber Track Guide */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Mini Excavator Rubber Track Guide
              </h2>
              <p className="text-muted-foreground mb-8">
                Understanding rubber track sizes for compact and mini excavators
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Mini Excavator Track Sizing */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Ruler className="h-5 w-5 text-primary" />
                      Mini Excavator Track Sizing
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Mini excavator tracks use the same <strong>Width x Pitch x Links</strong> format, but typically have smaller widths and different pitch measurements than CTLs.
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">W</div>
                        <div>
                          <div className="font-medium text-sm">Common Widths</div>
                          <div className="text-xs text-muted-foreground">230mm, 250mm, 300mm, 350mm, 400mm for mini excavators</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">P</div>
                        <div>
                          <div className="font-medium text-sm">Pitch Variations</div>
                          <div className="text-xs text-muted-foreground">48.5mm, 52.5mm, 72mm - varies by machine class</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0">L</div>
                        <div>
                          <div className="font-medium text-sm">Link Counts</div>
                          <div className="text-xs text-muted-foreground">70-96 links typical for mini excavators</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Popular Mini Excavator Sizes - Data-Driven */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Factory className="h-5 w-5 text-primary" />
                      Top Mini Excavator Track Sizes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getMiniExcavatorTrackSizes().slice(0, 5).map((size) => {
                        const machines = getMachinesForTrackSize(size).slice(0, 2);
                        return (
                          <Link 
                            key={size}
                            href={`/track-size/${size.toLowerCase()}`} 
                            className="flex items-center justify-between p-2 rounded hover:bg-muted transition-colors group"
                          >
                            <span className="font-medium group-hover:text-primary">{size}</span>
                            <span className="text-xs text-muted-foreground">
                              {machines.length > 0 
                                ? machines.map(m => `${m.brand} ${m.model}`).join(", ")
                                : "Multiple machines"}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Mini Excavator Size Classes */}
              <Card className="mb-10">
                <CardHeader>
                  <CardTitle>Mini Excavator Weight Classes &amp; Track Sizes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">Micro (Under 1 Ton)</div>
                      <p className="text-xs text-muted-foreground mb-2">Track widths: 130-180mm</p>
                      <p className="text-xs text-muted-foreground">Bobcat E10, Kubota K008</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">Small (1-3 Tons)</div>
                      <p className="text-xs text-muted-foreground mb-2">Track widths: 230-300mm</p>
                      <p className="text-xs text-muted-foreground">Bobcat E26, Kubota KX71, CAT 301.7</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">Mid-Size (3-5 Tons)</div>
                      <p className="text-xs text-muted-foreground mb-2">Track widths: 300-400mm</p>
                      <p className="text-xs text-muted-foreground">Bobcat E35, Kubota KX121-3, CAT 303.5</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="font-semibold text-sm mb-1">Large (5-8 Tons)</div>
                      <p className="text-xs text-muted-foreground mb-2">Track widths: 400-450mm</p>
                      <p className="text-xs text-muted-foreground">Kubota KX057, CAT 305.5, Bobcat E50</p>
                    </div>
                    <div className="p-4 bg-muted/50 rounded-lg col-span-full sm:col-span-2 lg:col-span-2">
                      <div className="font-semibold text-sm mb-1">Compact (8+ Tons)</div>
                      <p className="text-xs text-muted-foreground mb-2">Track widths: 450-600mm</p>
                      <p className="text-xs text-muted-foreground">CAT 308, Kubota KX080, John Deere 85G - transitioning to midi excavator class</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Mini Excavator Track Tips */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">Choosing the Right Mini Excavator Tracks</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2 text-primary">Application Considerations</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        Standard tread for general excavation work
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        Turf-friendly tread for landscaping jobs
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        Block tread for hard surfaces
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        Wide tracks for soft ground conditions
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Longevity Factors</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        Quality rubber compound affects lifespan
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        Steel core reinforcement prevents stretching
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        Proper tension extends track life 20-30%
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        Matching machine specs is critical
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 lg:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                Wholesale Rubber Tracks - Houston &amp; Nationwide
              </h2>

              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p>
                  Rubber Track Wholesale is Houston&apos;s leading supplier of premium rubber tracks for construction
                  equipment. Whether you&apos;re operating a mini excavator, skid steer, or compact track loader, we have
                  the tracks you need at wholesale prices.
                </p>

                <p>
                  Our Houston warehouse maintains extensive inventory of rubber tracks in all popular sizes. From
                  300x52.5x80 for mini excavators to 450x86x58 for large CTLs, we stock the tracks you need for Kubota,
                  Caterpillar, Bobcat, John Deere, Takeuchi, and all major brands.
                </p>

                <p>
                  Why pay retail when you can get wholesale pricing? Our direct relationships with manufacturers mean we
                  can offer premium quality rubber tracks at 30-50% below typical retail prices. Plus, with our Houston
                  warehouse location, we can ship to contractors and equipment dealers across Texas and nationwide with
                  fast delivery.
                </p>

                <h3 className="text-xl font-bold text-foreground mt-8 mb-4">
                  How to Find the Right Rubber Tracks
                </h3>

                <div className="grid md:grid-cols-3 gap-6 not-prose my-6">
                  <Card>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          1
                        </div>
                        <h4 className="font-semibold">Search by Machine</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Enter your machine make and model (e.g., &quot;Kubota SVL75&quot;) to see compatible track sizes.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          2
                        </div>
                        <h4 className="font-semibold">Search by Track Size</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        If you know your track size (e.g., &quot;400x86x52&quot;), search directly to see availability and pricing.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          3
                        </div>
                        <h4 className="font-semibold">Call for Expert Help</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Not sure? Call {BUSINESS_INFO.phone} and our experts will help you find the right tracks.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {FAQS.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 lg:py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4">
              Ready to Find Your Rubber Tracks?
            </h2>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Search our database of {totalMachines.toLocaleString()}+ compatible machines or call us for expert assistance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/search">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Search className="mr-2 h-5 w-5" />
                  Search Machines
                </Button>
              </Link>
              <Link href={`tel:${BUSINESS_INFO.phone}`}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  <Phone className="mr-2 h-5 w-5" />
                  Call {BUSINESS_INFO.phone}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
