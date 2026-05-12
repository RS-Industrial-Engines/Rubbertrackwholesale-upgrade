import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, Truck, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  BreadcrumbSchema,
  FAQSchema,
} from "@/components/seo/structured-data";
import { generateCategoryBreadcrumbs } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Rubber Tracks for Skid Steers & Mini Excavators | Wholesale Pricing",
  description:
    "Premium rubber tracks for compact track loaders and mini excavators. OEM quality, wholesale prices, fast shipping from Houston. Kubota, Cat, Bobcat, John Deere and more.",
  alternates: {
    canonical: "/rubber-tracks",
  },
  openGraph: {
    title: "Rubber Tracks for Skid Steers & Mini Excavators | Rubber Track Wholesale",
    description:
      "Premium rubber tracks for compact track loaders and mini excavators. OEM quality, wholesale prices, fast shipping from Houston.",
    url: "/rubber-tracks",
    siteName: "Rubber Track Wholesale",
    type: "website",
  },
};

const POPULAR_MACHINES = [
  { brand: "Kubota", model: "SVL75-2", slug: "kubota-svl75-2" },
  { brand: "Caterpillar", model: "259D", slug: "caterpillar-259d" },
  { brand: "Bobcat", model: "T650", slug: "bobcat-t650" },
  { brand: "John Deere", model: "333G", slug: "john-deere-333g" },
  { brand: "Takeuchi", model: "TL12V2", slug: "takeuchi-tl12v2" },
  { brand: "Case", model: "TR310", slug: "case-tr310" },
  { brand: "New Holland", model: "C238", slug: "new-holland-c238" },
  { brand: "Kubota", model: "KX057-4", slug: "kubota-kx057-4" },
];

const POPULAR_SIZES = [
  { size: "400x86x52", description: "Most popular CTL size" },
  { size: "450x86x56", description: "Large CTLs" },
  { size: "320x86x52", description: "Medium CTLs" },
  { size: "300x52.5x84", description: "Mini excavators" },
  { size: "230x96x33", description: "Compact excavators" },
  { size: "350x52.5x86", description: "Mid-size excavators" },
];

const FAQS = [
  {
    question: "What types of rubber tracks do you carry?",
    answer:
      "We carry rubber tracks for compact track loaders (CTLs), mini excavators, and skid steers from all major manufacturers including Kubota, Caterpillar, Bobcat, John Deere, Takeuchi, Case, New Holland, Komatsu, and more. Our tracks are available in multiple tread patterns for different applications.",
  },
  {
    question: "Are your rubber tracks OEM quality?",
    answer:
      "Yes, our rubber tracks are manufactured to meet or exceed OEM specifications. They feature continuous steel cords, high-quality rubber compounds, and precision-molded lugs for maximum durability and performance.",
  },
  {
    question: "How do I know what size rubber track I need?",
    answer:
      "You can find your track size by searching for your machine make and model on our website. Alternatively, measure your current tracks - you need three measurements: width (mm), pitch (distance between links in mm), and number of links.",
  },
  {
    question: "Do you ship rubber tracks nationwide?",
    answer:
      "Yes! We ship rubber tracks to all 50 states from our Houston warehouse. Many orders qualify for free freight. Contact us for a shipping quote to your location.",
  },
  {
    question: "What is your warranty on rubber tracks?",
    answer:
      "All our rubber tracks come with a comprehensive warranty against manufacturing defects. Warranty terms vary by product - contact us for specific warranty information.",
  },
];

const FEATURES = [
  "Continuous steel cord construction",
  "High-tensile rubber compounds",
  "Precision-molded lug patterns",
  "OEM-equivalent quality",
  "Multiple tread patterns available",
  "Fit guaranteed",
];

export default function RubberTracksPage() {
  const breadcrumbs = generateCategoryBreadcrumbs("Rubber Tracks", "rubber-tracks");

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={FAQS} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-12 md:py-20">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="container-wide relative">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="accent" className="mb-4">
                Premium Quality
              </Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
                Rubber Tracks for{" "}
                <span className="text-accent">Skid Steers & Excavators</span>
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80">
                Premium rubber tracks for compact track loaders and mini
                excavators. OEM quality at wholesale prices, shipping nationwide
                from our Houston warehouse.
              </p>

              {/* Features List */}
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {FEATURES.slice(0, 4).map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-primary-foreground/80"
                  >
                    <CheckCircle className="h-4 w-4 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="xl" variant="accent" asChild>
                  <Link href="/machines">
                    Find Your Machine
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call for Pricing
                </Button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="rounded-lg bg-primary-foreground/10 p-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="text-center">
                  <p className="text-4xl font-bold text-accent">500+</p>
                  <p className="mt-1 text-sm text-primary-foreground/80">
                    Track Sizes Available
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-accent">5,000+</p>
                  <p className="mt-1 text-sm text-primary-foreground/80">
                    Compatible Machines
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-accent">100+</p>
                  <p className="mt-1 text-sm text-primary-foreground/80">
                    Equipment Brands
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-accent">50</p>
                  <p className="mt-1 text-sm text-primary-foreground/80">
                    States Served
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Machines */}
      <section className="section-sm">
        <div className="container-wide">
          <h2 className="text-2xl font-bold tracking-tight">
            Popular Machines - Find Your Tracks
          </h2>
          <p className="mt-1 text-muted-foreground">
            Select your equipment to view compatible rubber tracks
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR_MACHINES.map((machine) => (
              <Link key={machine.slug} href={`/machines/${machine.slug}`}>
                <Card className="card-hover h-full">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {machine.brand}
                      </p>
                      <p className="font-model font-semibold">{machine.model}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" asChild>
              <Link href="/machines">
                View All Machines
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Sizes */}
      <section className="section-sm bg-muted">
        <div className="container-wide">
          <h2 className="text-2xl font-bold tracking-tight">
            Popular Rubber Track Sizes
          </h2>
          <p className="mt-1 text-muted-foreground">
            Shop by track dimensions
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_SIZES.map((track) => (
              <Link key={track.size} href={`/track-sizes/${track.size}`}>
                <Card className="card-hover h-full">
                  <CardContent className="p-4">
                    <p className="font-model text-lg font-semibold">
                      {track.size}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {track.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" asChild>
              <Link href="/track-sizes">
                View All Track Sizes
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Houston Local SEO */}
      <section className="section-sm">
        <div className="container-wide">
          <div className="rounded-lg border bg-card p-8 md:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge variant="accent" className="mb-4">
                  <MapPin className="mr-1 h-3 w-3" />
                  Houston, Texas
                </Badge>
                <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                  Rubber Tracks Houston - Local Warehouse, Nationwide Shipping
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Based in Houston, Texas, we serve contractors throughout the
                  greater Houston area with same-day pickup available. Our
                  central location also means fast shipping to customers across
                  the United States.
                </p>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-primary" />
                    Same-day shipping on in-stock items
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    Local pickup available in Houston
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    Competitive freight rates nationwide
                  </li>
                </ul>
                <Button className="mt-6" variant="accent" asChild>
                  <Link href="/contact">Contact Our Houston Team</Link>
                </Button>
              </div>
              <div className="rounded-lg bg-muted p-6">
                <h3 className="font-semibold">Service Areas</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We proudly serve customers across Texas and nationwide:
                </p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  {[
                    "Houston",
                    "Dallas",
                    "San Antonio",
                    "Austin",
                    "Fort Worth",
                    "El Paso",
                    "Corpus Christi",
                    "Lubbock",
                  ].map((city) => (
                    <span key={city} className="text-muted-foreground">
                      {city}, TX
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-muted">
        <div className="container-narrow">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Rubber Track FAQs
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            Common questions about our rubber tracks
          </p>

          <div className="mt-10 space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="container-wide text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Order Rubber Tracks?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Find the perfect rubber tracks for your equipment. Search by machine
            or track size, or contact our team for personalized assistance.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="xl" variant="accent" asChild>
              <Link href="/machines">
                Search by Machine
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
