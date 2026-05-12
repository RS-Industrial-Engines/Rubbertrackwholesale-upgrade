import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, CheckCircle, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/structured-data";
import { generateCategoryBreadcrumbs } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Final Drives for Skid Steers & Mini Excavators | Travel Motors",
  description:
    "Complete final drive assemblies and travel motors for compact track loaders and mini excavators. OEM quality, wholesale prices. Kubota, Cat, Bobcat, John Deere.",
  alternates: {
    canonical: "/final-drives",
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
    question: "What is a final drive?",
    answer:
      "A final drive (also called a travel motor) is the complete assembly that powers each track. It includes the hydraulic motor, planetary gear reduction, and housing. Final drives convert hydraulic pressure into the mechanical force that moves your machine.",
  },
  {
    question: "When should I replace my final drive?",
    answer:
      "Replace final drives when you experience loss of power, unusual noises, oil leaks, overheating, or complete failure. Regular oil changes and inspections can extend final drive life significantly.",
  },
  {
    question: "Can final drives be rebuilt?",
    answer:
      "Yes, many final drives can be rebuilt. However, depending on the damage and age of the unit, replacement may be more cost-effective. Contact us for an evaluation of your specific situation.",
  },
  {
    question: "Do you offer final drive exchange programs?",
    answer:
      "Yes, we offer exchange programs on select final drives. Send us your old unit and receive a discount on a replacement. Contact us for details on available exchange options.",
  },
];

const FEATURES = [
  "Complete assemblies",
  "New and remanufactured options",
  "OEM-equivalent quality",
  "Warranty included",
  "Core exchange available",
  "Fit guaranteed",
];

export default function FinalDrivesPage() {
  const breadcrumbs = generateCategoryBreadcrumbs("Final Drives", "final-drives");

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
                Final Drives & Travel Motors
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Complete final drive assemblies for compact track loaders and
                mini excavators. New and remanufactured options available with
                warranty.
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

            <div className="flex items-center justify-center rounded-lg bg-secondary p-12">
              <div className="text-center">
                <Settings className="mx-auto h-24 w-24 text-primary" />
                <p className="mt-4 text-lg font-semibold">Final Drives</p>
                <p className="text-sm text-muted-foreground">
                  Complete Power Assemblies
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
            Final Drives by Brand
          </h2>
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
        </div>
      </section>

      {/* SEO Content */}
      <section className="section-sm bg-muted">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold tracking-tight">
            About Final Drives
          </h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              Final drives are the heart of your compact track loader or mini
              excavator undercarriage system. Each machine has two final drives -
              one for each track - that convert hydraulic power into the
              mechanical force needed to move your equipment.
            </p>
            <p>
              We offer both new and remanufactured final drives for most major
              equipment brands. Our remanufactured units are completely rebuilt
              with new bearings, seals, and wear components to ensure reliable
              performance and extended service life.
            </p>
            <p>
              All our final drives come with a warranty and are tested before
              shipping. We also offer core exchange programs to help reduce your
              costs.
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
              { name: "Bottom Rollers", href: "/bottom-rollers" },
              { name: "Sprockets", href: "/sprockets" },
              { name: "Idlers", href: "/idlers" },
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
            Need a Final Drive?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-primary-foreground/80">
            Contact our team for pricing on final drives for your equipment. New
            and remanufactured options available.
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
