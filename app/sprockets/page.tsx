import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone, CheckCircle, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbSchema, FAQSchema } from "@/components/seo/structured-data";
import { generateCategoryBreadcrumbs } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Drive Sprockets for Skid Steers & Mini Excavators | Wholesale",
  description:
    "Precision drive sprockets for compact track loaders and mini excavators. OEM quality, wholesale prices. Kubota, Cat, Bobcat, John Deere and more.",
  alternates: {
    canonical: "/sprockets",
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
    question: "What is a drive sprocket?",
    answer:
      "The drive sprocket is the toothed wheel that engages with the track and transfers power from the final drive to propel your machine. It is a critical component of the undercarriage system.",
  },
  {
    question: "When should I replace my sprockets?",
    answer:
      "Replace sprockets when teeth become worn, hooked, or damaged. Worn sprockets can cause accelerated track wear, skipping, and reduced machine performance. Inspect regularly for wear.",
  },
  {
    question: "Do you carry segmented sprockets?",
    answer:
      "Yes, we carry both one-piece sprockets and segmented sprocket systems for applicable machines. Segmented sprockets allow you to replace worn segments without removing the entire sprocket.",
  },
  {
    question: "How do I know what sprocket fits my machine?",
    answer:
      "Search by your machine make and model on our website to find compatible sprockets. You can also contact our team with your machine information for assistance.",
  },
];

const FEATURES = [
  "Heat-treated alloy steel",
  "Precision-machined teeth",
  "OEM-equivalent specifications",
  "Segmented options available",
  "Extended service life",
  "Fit guaranteed",
];

export default function SprocketsPage() {
  const breadcrumbs = generateCategoryBreadcrumbs("Sprockets", "sprockets");

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
                Drive Sprockets
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Precision-machined drive sprockets for compact track loaders and
                mini excavators. Heat-treated for maximum durability and extended
                service life.
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
                <Cog className="mx-auto h-24 w-24 text-primary" />
                <p className="mt-4 text-lg font-semibold">Drive Sprockets</p>
                <p className="text-sm text-muted-foreground">
                  Power Transfer Components
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
            Sprockets by Brand
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
            About Drive Sprockets
          </h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              Drive sprockets are essential components that transfer power from
              your final drive to propel your compact track loader or mini
              excavator. The sprocket teeth engage with the track links to move
              your machine forward and backward.
            </p>
            <p>
              Our sprockets are manufactured from heat-treated alloy steel with
              precision-machined teeth for optimal track engagement. This ensures
              smooth power transfer, reduced track wear, and extended service
              life for both the sprocket and track.
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
          <h2 className="text-2xl font-bold tracking-tight">Need Sprockets?</h2>
          <p className="mx-auto mt-2 max-w-xl text-primary-foreground/80">
            Contact our team for wholesale pricing on drive sprockets for your
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
