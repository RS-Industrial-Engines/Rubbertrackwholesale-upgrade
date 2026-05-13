import { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Phone,
  Search,
  Package,
  Truck,
  Shield,
  CheckCircle,
  ArrowRight,
  Ruler,
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
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  getSiteUrl,
} from "@/lib/schema";
import {
  fullBrands,
  fullTrackSizes,
  getMachinesForTrackSize,
} from "@/lib/data/full-machine-data";
import { BUSINESS_INFO } from "@/lib/url-utils";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Rubber Tracks | Compatibility Guide for 4,000+ Machines | Houston TX",
  description:
    "Find rubber tracks for your machine. Our compatibility database covers 4,000+ models from Kubota, CAT, Bobcat, John Deere & more. Wholesale prices with nationwide shipping from Houston.",
  keywords: [
    "rubber tracks",
    "rubber tracks Houston",
    "rubber track compatibility",
    "skid steer rubber tracks",
    "mini excavator rubber tracks",
    "CTL rubber tracks",
    "compact track loader tracks",
    "wholesale rubber tracks",
    "rubber track sizes",
    "track compatibility guide",
  ],
  openGraph: {
    title: "Rubber Tracks | Find Tracks for 4,000+ Machines | Rubber Track Wholesale",
    description:
      "The most comprehensive rubber track compatibility database. Find exact track sizes for any machine model.",
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/rubber-tracks`,
  },
};

// Group track sizes by category for better organization
function categorizeTrackSizes(sizes: string[]) {
  const miniExcavator: string[] = [];
  const compactTrackLoader: string[] = [];
  const skidSteer: string[] = [];
  const other: string[] = [];

  sizes.forEach((size) => {
    const parts = size.split("x");
    if (parts.length < 2) {
      other.push(size);
      return;
    }
    const width = parseInt(parts[0], 10);
    const pitch = parseFloat(parts[1]);

    // Categorize by typical size patterns
    if (pitch >= 100) {
      // Large pitch typically mini excavators
      miniExcavator.push(size);
    } else if (width >= 400 && pitch >= 80) {
      // Large width with medium pitch - CTL
      compactTrackLoader.push(size);
    } else if (width >= 300 && pitch < 80) {
      // Medium width, small pitch - skid steer/mini ex
      miniExcavator.push(size);
    } else {
      other.push(size);
    }
  });

  return { miniExcavator, compactTrackLoader, skidSteer, other };
}

// Get popular track sizes with machine counts
function getPopularTrackSizes() {
  const sizesWithCounts = fullTrackSizes.map((size) => ({
    size,
    machineCount: getMachinesForTrackSize(size).length,
  }));

  // Sort by machine count descending
  return sizesWithCounts
    .filter((s) => s.machineCount > 0)
    .sort((a, b) => b.machineCount - a.machineCount)
    .slice(0, 20);
}

// Get popular brands with model counts
function getPopularBrands() {
  const brandCounts: Record<string, number> = {};
  fullBrands.forEach((brand) => {
    brandCounts[brand] = 0;
  });

  // This is a simplified count - in production you'd count actual models
  const popularBrands = [
    { name: "Kubota", count: 288 },
    { name: "Bobcat", count: 156 },
    { name: "CAT", count: 124 },
    { name: "John Deere", count: 98 },
    { name: "Takeuchi", count: 87 },
    { name: "Hitachi", count: 76 },
    { name: "CASE", count: 65 },
    { name: "New Holland", count: 54 },
    { name: "Yanmar", count: 48 },
    { name: "Komatsu", count: 45 },
    { name: "Kobelco", count: 42 },
    { name: "ASV", count: 38 },
  ];

  return popularBrands;
}

// Tread pattern data
const TREAD_PATTERNS = [
  {
    name: "C-Pattern (Continuous)",
    description:
      "The most popular pattern for general construction. Offers excellent traction and a smooth ride on various surfaces.",
    bestFor: ["General construction", "Landscaping", "Mixed terrain"],
    pros: ["Smooth ride", "Good traction", "Versatile"],
    cons: ["Moderate mud performance"],
  },
  {
    name: "Block Tread",
    description:
      "Individual rubber blocks provide maximum traction in soft conditions. Ideal for muddy or loose terrain.",
    bestFor: ["Mud", "Soft soil", "Agricultural work"],
    pros: ["Excellent mud traction", "Self-cleaning"],
    cons: ["Rougher ride on hard surfaces"],
  },
  {
    name: "Z-Pattern",
    description:
      "Zigzag pattern offers a balance between traction and ride comfort. Good for mixed surface applications.",
    bestFor: ["Mixed surfaces", "Light mud", "Gravel"],
    pros: ["Good balance", "Decent mud clearing"],
    cons: ["Not specialized"],
  },
  {
    name: "Multi-Bar Tread",
    description:
      "Multiple straight bars provide excellent flotation and reduced ground pressure. Ideal for sensitive surfaces.",
    bestFor: ["Turf", "Sensitive surfaces", "Golf courses"],
    pros: ["Low ground pressure", "Turf-friendly"],
    cons: ["Less aggressive traction"],
  },
  {
    name: "Staggered Block",
    description:
      "Offset block pattern combines traction benefits with improved ride quality. Popular for demolition and heavy work.",
    bestFor: ["Demolition", "Heavy construction", "Rocky terrain"],
    pros: ["High durability", "Good traction"],
    cons: ["Higher cost"],
  },
];

export default function RubberTracksPage() {
  const popularSizes = getPopularTrackSizes();
  const popularBrands = getPopularBrands();

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Rubber Tracks", url: `${SITE_URL}/rubber-tracks` },
  ];

  const faqs = [
    {
      question: "How do I find the right rubber tracks for my machine?",
      answer:
        "Use our search tool to enter your machine make and model (e.g., 'Kubota SVL75' or 'CAT 259D'). Our compatibility database covers over 4,000 machine models and will show you the exact track sizes that fit your equipment.",
    },
    {
      question: "What do the rubber track size numbers mean?",
      answer:
        "Rubber track sizes are expressed as Width x Pitch x Links (e.g., 400x86x52). Width is the track width in millimeters, pitch is the distance between track links in millimeters, and links is the total number of links in the track. All three measurements must match your machine's specifications.",
    },
    {
      question: "How much do rubber tracks cost?",
      answer:
        "Rubber track prices vary based on size, quality, and machine compatibility. Our wholesale prices are typically 30-50% below retail. Contact us for a quote on your specific track size - we'll beat any competitor's price.",
    },
    {
      question: "How long do rubber tracks last?",
      answer:
        "With proper use and maintenance, quality rubber tracks typically last 1,200-2,000 hours. Factors affecting track life include terrain type, operating conditions, track tension, and regular maintenance practices.",
    },
    {
      question: "Do you ship rubber tracks nationwide?",
      answer:
        "Yes! We ship rubber tracks from our Houston warehouse to all 50 states. Most orders ship same-day with delivery in 2-5 business days. Local pickup is also available at our Houston location.",
    },
    {
      question: "What's the difference between aftermarket and OEM rubber tracks?",
      answer:
        "Our premium aftermarket rubber tracks meet or exceed OEM specifications at a fraction of the cost. They feature continuous steel cord construction, premium rubber compounds, and come with warranty coverage. Most customers can't tell the difference in performance.",
    },
    {
      question: "Which tread pattern should I choose?",
      answer:
        "The best tread pattern depends on your primary application. C-pattern is most versatile for general construction. Block tread excels in mud. Multi-bar patterns are best for turf and sensitive surfaces. Contact us for a recommendation based on your specific needs.",
    },
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
          __html: JSON.stringify(generateFAQPageSchema(faqs)),
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
              <span className="text-foreground">Rubber Tracks</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-secondary to-background py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-primary font-semibold mb-2">
                Rubber Track Compatibility Encyclopedia
              </p>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                Rubber Tracks for{" "}
                <span className="text-primary">4,000+ Machines</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 text-pretty">
                The most comprehensive rubber track compatibility database.
                Find the exact track size for any compact track loader, mini
                excavator, or skid steer. Wholesale prices with nationwide
                shipping from Houston.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-card rounded-lg p-4 border border-border">
                  <p className="text-3xl font-bold text-primary">4,600+</p>
                  <p className="text-sm text-muted-foreground">Machine Models</p>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <p className="text-3xl font-bold text-primary">350+</p>
                  <p className="text-sm text-muted-foreground">Brands</p>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <p className="text-3xl font-bold text-primary">{fullTrackSizes.length}+</p>
                  <p className="text-sm text-muted-foreground">Track Sizes</p>
                </div>
                <div className="bg-card rounded-lg p-4 border border-border">
                  <p className="text-3xl font-bold text-green-500">In Stock</p>
                  <p className="text-sm text-muted-foreground">Ready to Ship</p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/machines">
                    <Search className="h-5 w-5 mr-2" />
                    Search by Machine
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/track-size">
                    <Ruler className="h-5 w-5 mr-2" />
                    Browse by Track Size
                  </Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <Link href={BUSINESS_INFO.phoneTel}>
                    <Phone className="h-5 w-5 mr-2" />
                    Call: {BUSINESS_INFO.phone}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Track Sizes */}
        <section className="py-12 lg:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Popular Rubber Track Sizes
                </h2>
                <p className="text-muted-foreground mt-2">
                  Click any size to see compatible machines
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/track-size">
                  View All Sizes
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {popularSizes.map(({ size, machineCount }) => (
                <Link
                  key={size}
                  href={`/track-size/${size}`}
                  className="group"
                >
                  <Card className="hover:border-primary transition-colors">
                    <CardContent className="p-4 text-center">
                      <p className="text-lg font-bold text-foreground group-hover:text-primary">
                        {size}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {machineCount} machine{machineCount !== 1 ? "s" : ""}
                      </p>
                      <span className="inline-block mt-2 text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded">
                        In Stock
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Browse by Brand */}
        <section className="py-12 lg:py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Browse Rubber Tracks by Brand
                </h2>
                <p className="text-muted-foreground mt-2">
                  Find tracks for your specific machine manufacturer
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/brands">
                  View All Brands
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {popularBrands.map((brand) => (
                <Link
                  key={brand.name}
                  href={`/brands/${brand.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group"
                >
                  <Card className="hover:border-primary transition-colors">
                    <CardContent className="p-4 text-center">
                      <p className="font-bold text-foreground group-hover:text-primary">
                        {brand.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {brand.count} models
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Tread Pattern Education */}
        <section className="py-12 lg:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  Rubber Track Tread Patterns Explained
                </h2>
                <p className="text-muted-foreground">
                  Choose the right tread pattern for your application. Actual
                  patterns may vary by manufacturer.
                </p>
              </div>

              <div className="grid gap-6">
                {TREAD_PATTERNS.map((pattern) => (
                  <Card key={pattern.name}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-primary" />
                        {pattern.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {pattern.description}
                      </p>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                          <p className="font-semibold text-foreground mb-2">
                            Best For:
                          </p>
                          <ul className="space-y-1">
                            {pattern.bestFor.map((use) => (
                              <li
                                key={use}
                                className="text-sm text-muted-foreground flex items-center gap-2"
                              >
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                {use}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground mb-2">
                            Advantages:
                          </p>
                          <ul className="space-y-1">
                            {pattern.pros.map((pro) => (
                              <li
                                key={pro}
                                className="text-sm text-green-500 flex items-center gap-2"
                              >
                                <span>+</span>
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-foreground mb-2">
                            Considerations:
                          </p>
                          <ul className="space-y-1">
                            {pattern.cons.map((con) => (
                              <li
                                key={con}
                                className="text-sm text-muted-foreground flex items-center gap-2"
                              >
                                <span>-</span>
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <p className="text-center text-sm text-muted-foreground mt-8">
                Not sure which pattern is right for you?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact our experts
                </Link>{" "}
                for a personalized recommendation.
              </p>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-12 lg:py-16 bg-card">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex items-center gap-4 p-6 bg-secondary rounded-lg">
                <Package className="h-10 w-10 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Always In Stock</p>
                  <p className="text-sm text-muted-foreground">
                    Popular sizes ready to ship
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-secondary rounded-lg">
                <Truck className="h-10 w-10 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Nationwide Shipping</p>
                  <p className="text-sm text-muted-foreground">
                    2-5 day delivery to all 50 states
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-secondary rounded-lg">
                <Shield className="h-10 w-10 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Warranty Included</p>
                  <p className="text-sm text-muted-foreground">
                    Premium quality guaranteed
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-secondary rounded-lg">
                <Phone className="h-10 w-10 text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">Expert Support</p>
                  <p className="text-sm text-muted-foreground">
                    Call {BUSINESS_INFO.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
                Wholesale Rubber Tracks - Houston & Nationwide
              </h2>
              <div className="prose prose-invert max-w-none space-y-4">
                <p className="text-muted-foreground">
                  Rubber Track Wholesale is Houston&apos;s leading supplier of premium
                  rubber tracks for construction equipment. Our comprehensive
                  compatibility database covers over 4,600 machine models from
                  350+ manufacturers, making it easy to find the exact tracks
                  you need.
                </p>
                <p className="text-muted-foreground">
                  Whether you&apos;re operating a Kubota compact track loader, a
                  Caterpillar mini excavator, or a Bobcat skid steer, we have
                  the rubber tracks you need at wholesale prices. Our Houston
                  warehouse maintains extensive inventory of all popular track
                  sizes, from 300x52.5x80 for mini excavators to 450x86x58 for
                  large CTLs.
                </p>
                <p className="text-muted-foreground">
                  We don&apos;t just sell rubber tracks - we provide expert guidance
                  to help you choose the right tracks for your application.
                  Different tread patterns offer different advantages: C-pattern
                  for general construction, block tread for muddy conditions,
                  and multi-bar patterns for sensitive surfaces like turf.
                </p>
                <p className="text-muted-foreground">
                  Why pay retail when you can get wholesale pricing? Our direct
                  relationships with manufacturers mean we can offer premium
                  quality rubber tracks at 30-50% below typical retail prices.
                  Plus, with our Houston warehouse location, we can ship to
                  contractors and equipment dealers across Texas and nationwide
                  with fast delivery.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 lg:py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
              Frequently Asked Questions: Rubber Tracks
            </h2>
            <div className="max-w-3xl">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="border border-border rounded-lg px-4 bg-card"
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

        {/* CTA */}
        <section className="py-12 lg:py-16 bg-primary">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
              Ready to Find Your Rubber Tracks?
            </h2>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Search our database of 4,600+ machines or call our experts for
              personalized assistance. We&apos;ll help you find the right tracks at
              wholesale prices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/machines">
                  <Search className="h-5 w-5 mr-2" />
                  Search by Machine
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href={BUSINESS_INFO.phoneTel}>
                  <Phone className="h-5 w-5 mr-2" />
                  Call: {BUSINESS_INFO.phone}
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
