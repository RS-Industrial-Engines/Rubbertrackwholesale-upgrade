import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, CheckCircle, CircleDot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/structured-data";
import { generateCategoryBreadcrumbs } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Bottom Rollers for Skid Steers & Mini Excavators | Track Rollers",
  description:
    "Heavy-duty bottom rollers and track rollers for compact track loaders and mini excavators. OEM quality, wholesale prices. Kubota, Cat, Bobcat, John Deere.",
  alternates: {
    canonical: "/bottom-rollers",
  },
};

const POPULAR_BRANDS = [
  "Kubota",
  "Caterpillar",
  "Bobcat",
  "John Deere",
  "Takeuchi",
  "Case",
  "Komatsu",
  "Hitachi",
];

const FAQS = [
  {
    question: "What are bottom rollers?",
    answer:
      "Bottom rollers (also called track rollers or carrier rollers) support the weight of your machine and guide the track along the undercarriage. They are essential components of the undercarriage system.",
  },
  {
    question: "When should I replace my bottom rollers?",
    answer:
      "Replace bottom rollers when you notice excessive wear, wobbling, flat spots, oil leaks from seals, or unusual noises. Regular inspection helps prevent track damage and costly repairs.",
  },
  {
    question: "Do you carry bottom rollers for my machine?",
    answer:
      "We carry bottom rollers for all major equipment brands including Kubota, Caterpillar, Bobcat, John Deere, Takeuchi, Case, and more. Search by your machine model to find compatible parts.",
  },
  {
    question: "What is the difference between single and double flange rollers?",
    answer:
      "Single flange rollers have a guide on one side, while double flange rollers have guides on both sides. The type needed depends on your specific machine design and track configuration.",
  },
];

const FEATURES = [
  "Precision-machined housings",
  "Heavy-duty sealed bearings",
  "Heat-treated steel construction",
  "OEM-equivalent quality",
  "Multiple seal options",
  "Fit guaranteed",
];

export default function BottomRollersPage() {
  const breadcrumbs = generateCategoryBreadcrumbs("Bottom Rollers", "bottom-rollers");

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={FAQS} />

      {/* Hero Section */}
      <section className="border-b bg-muted py-12 md:py-16">
        <div className="container-wide">
          <Breadcrumbs items={breadcrumbs} />
          <div className="mt-4 grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Undercarriage Parts
              </Badge>
              <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl">
                Bottom Rollers & Track Rollers
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Heavy-duty bottom rollers for compact track loaders and mini
                excavators. Precision-machined for long service life and
                reliable performance.
              </p>

              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {FEATURES.slice(0, 4).map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" variant="accent" asChild>
                  <Link href="/machines">
                    Find Your Machine
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Call for Pricing
                </Button>
              </div>
            </div>

            {/* Icon Display */}
            <div className="flex items-center justify-center rounded-lg bg-secondary p-12">
              <div className="text-center">
                <CircleDot className="mx-auto h-24 w-24 text-primary" />
                <p className="mt-4 text-lg font-semibold">Bottom Rollers</p>
                <p className="text-sm text-muted-foreground">
                  Track Support & Guidance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Brands */}
      <section className="section-sm">
        <div className="container-wide">
          <h2 className="text-2xl font-bold tracking-tight">
            Bottom Rollers by Brand
          </h2>
          <p className="mt-1 text-muted-foreground">
            Select your equipment brand to find compatible bottom rollers
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR_BRANDS.map((brand) => (
              <Link
                key={brand}
                href={`/brands/${brand.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Card className="card-hover h-full">
                  <CardContent className="flex items-center justify-between p-4">
                    <span className="font-semibold">{brand}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Button variant="outline" asChild>
              <Link href="/brands">View All Brands</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="section-sm bg-muted">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold tracking-tight">
            About Bottom Rollers
          </h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              Bottom rollers are critical components of your compact track loader
              or mini excavator undercarriage. They support the full weight of
              your machine and guide the track along the undercarriage frame,
              ensuring smooth operation and preventing track derailment.
            </p>
            <p>
              At Rubber Track Wholesale, we carry premium replacement bottom
              rollers manufactured to meet or exceed OEM specifications. Our
              rollers feature precision-machined steel housings, heavy-duty
              sealed bearings, and quality seals for maximum durability and
              service life.
            </p>
            <p>
              Regular bottom roller inspection and replacement is essential for
              maintaining your undercarriage system. Worn rollers can cause
              accelerated track wear, reduced machine performance, and costly
              damage to other undercarriage components.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-sm">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Categories */}
      <section className="section-sm bg-muted">
        <div className="container-wide">
          <h2 className="text-2xl font-bold tracking-tight">
            Related Undercarriage Parts
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Rubber Tracks", href: "/rubber-tracks" },
              { name: "Sprockets", href: "/sprockets" },
              { name: "Idlers", href: "/idlers" },
              { name: "Final Drives", href: "/final-drives" },
            ].map((category) => (
              <Link key={category.href} href={category.href}>
                <Card className="card-hover">
                  <CardContent className="flex items-center justify-between p-4">
                    <span className="font-semibold">{category.name}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-sm bg-primary text-primary-foreground">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Need Bottom Rollers?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-primary-foreground/80">
            Contact our team for wholesale pricing on bottom rollers for your
            equipment.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="accent">
              <Phone className="mr-2 h-4 w-4" />
              Call for Pricing
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/contact">Request Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
