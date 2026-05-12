import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, Phone, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  BreadcrumbSchema,
  FAQSchema,
  ItemListSchema,
} from "@/components/seo/structured-data";
import { generateMachineBreadcrumbs, SITE_URL } from "@/lib/seo";
import { getMachines } from "@/lib/api/machines";
import { getCompatibilityByMachine } from "@/lib/api/compatibility";
import { generateMachineSlug, formatTrackSize } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getMachineFromSlug(slug: string) {
  // Parse slug to extract brand and model
  const parts = slug.split("-");
  if (parts.length < 2) return null;

  const potentialBrand = parts[0];

  // Search for machines matching the slug
  const searchTerm = parts.slice(1).join(" ");
  const response = await getMachines({ search: searchTerm, limit: 100 });

  // Find best match
  for (const machine of response.items) {
    const machineSlug = generateMachineSlug(machine.brand, machine.model_name);
    if (machineSlug === slug) {
      return machine;
    }
    // Also check if it's a close match
    if (
      machine.brand.toLowerCase() === potentialBrand &&
      machineSlug.includes(slug.slice(potentialBrand.length + 1))
    ) {
      return machine;
    }
  }

  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const machine = await getMachineFromSlug(slug);

  if (!machine) {
    return {
      title: "Machine Not Found",
    };
  }

  const compatibility = await getCompatibilityByMachine(
    machine.brand,
    machine.model_name
  );
  const trackSizes = [...new Set(compatibility.map((c) => c.track_size))];

  const title = `${machine.brand} ${machine.model_name} Rubber Tracks & Undercarriage Parts`;
  const description = `Shop ${machine.brand} ${machine.model_name} rubber tracks${trackSizes.length > 0 ? ` (${trackSizes.slice(0, 3).join(", ")})` : ""}, bottom rollers, sprockets, and idlers. Premium quality, wholesale pricing, Houston warehouse.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/machines/${slug}`,
    },
    openGraph: {
      title: `${title} | Rubber Track Wholesale`,
      description,
      url: `/machines/${slug}`,
      siteName: "Rubber Track Wholesale",
      type: "website",
    },
  };
}

// Generate static params for popular machines
export async function generateStaticParams() {
  const response = await getMachines({ limit: 100, is_us_supported: true });

  return response.items.map((machine) => ({
    slug: generateMachineSlug(machine.brand, machine.model_name),
  }));
}

export default async function MachinePage({ params }: Props) {
  const { slug } = await params;
  const machine = await getMachineFromSlug(slug);

  if (!machine) {
    notFound();
  }

  const compatibility = await getCompatibilityByMachine(
    machine.brand,
    machine.model_name
  );

  // Get unique track sizes
  const trackSizes = [...new Set(compatibility.map((c) => c.track_size))];
  const trackTypes = [...new Set(compatibility.map((c) => c.track_type))];

  const breadcrumbs = generateMachineBreadcrumbs(
    machine.brand,
    machine.model_name
  );

  // Generate FAQs specific to this machine
  const faqs = [
    {
      question: `What size rubber tracks fit the ${machine.brand} ${machine.model_name}?`,
      answer:
        trackSizes.length > 0
          ? `The ${machine.brand} ${machine.model_name} uses ${trackSizes.join(", ")} rubber tracks. We carry all compatible sizes in stock at our Houston warehouse.`
          : `Contact us for compatible track sizes for the ${machine.brand} ${machine.model_name}. Our experts can help you find the right fit.`,
    },
    {
      question: `How long do rubber tracks last on a ${machine.brand} ${machine.model_name}?`,
      answer: `Rubber track lifespan varies based on terrain and usage, but typically ranges from 1,200 to 2,000 hours. Our premium tracks are built to OEM specifications for maximum durability.`,
    },
    {
      question: `Do you offer undercarriage parts for the ${machine.brand} ${machine.model_name}?`,
      answer: `Yes! We carry a complete line of undercarriage parts including bottom rollers, top rollers, sprockets, idlers, and final drives for the ${machine.brand} ${machine.model_name}.`,
    },
    {
      question: `What is the price for ${machine.brand} ${machine.model_name} rubber tracks?`,
      answer: `Prices vary by track size and quantity. Contact us for current wholesale pricing on ${machine.brand} ${machine.model_name} rubber tracks. We offer competitive pricing for contractors and dealers.`,
    },
  ];

  // Track size items for schema
  const trackSizeItems = trackSizes.map((size, index) => ({
    name: `${size} Rubber Track`,
    url: `${SITE_URL}/track-sizes/${size}`,
    position: index + 1,
  }));

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      {trackSizes.length > 0 && (
        <ItemListSchema
          name={`Compatible Track Sizes for ${machine.brand} ${machine.model_name}`}
          description={`Rubber track sizes that fit the ${machine.brand} ${machine.model_name}`}
          items={trackSizeItems}
        />
      )}

      {/* Hero Section */}
      <section className="border-b bg-muted py-8 md:py-12">
        <div className="container-wide">
          <Breadcrumbs items={breadcrumbs} />

          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <Badge variant="secondary" className="mb-2">
                {machine.equipment_type || "Compact Track Loader"}
              </Badge>
              <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
                {machine.brand} {machine.model_name} Rubber Tracks &
                Undercarriage Parts
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Premium quality rubber tracks and undercarriage parts for the{" "}
                {machine.full_name}. Wholesale pricing, ships from our Houston
                warehouse.
              </p>

              {/* Quick Stats */}
              <div className="mt-6 flex flex-wrap gap-4">
                {trackSizes.length > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>
                      {trackSizes.length} compatible track size
                      {trackSizes.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Ships from Houston, TX</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" variant="accent">
                  <Phone className="mr-2 h-4 w-4" />
                  Call for Pricing
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Request Quote</Link>
                </Button>
              </div>
            </div>

            {/* Machine Image Placeholder */}
            <div className="flex items-center justify-center rounded-lg bg-secondary p-8 lg:p-12">
              <div className="text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-3xl font-bold text-primary">
                    {machine.brand.charAt(0)}
                  </span>
                </div>
                <p className="mt-4 text-lg font-semibold">{machine.brand}</p>
                <p className="font-model text-2xl font-bold">
                  {machine.model_name}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compatible Track Sizes */}
      <section className="section-sm">
        <div className="container-wide">
          <h2 className="text-2xl font-bold tracking-tight">
            Compatible Rubber Track Sizes
          </h2>
          <p className="mt-1 text-muted-foreground">
            {trackSizes.length > 0
              ? `The ${machine.brand} ${machine.model_name} fits the following track sizes`
              : "Contact us for track size compatibility information"}
          </p>

          {trackSizes.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trackSizes.map((size) => {
                const sizeCompatibility = compatibility.filter(
                  (c) => c.track_size === size
                );
                const types = [
                  ...new Set(sizeCompatibility.map((c) => c.track_type)),
                ];

                return (
                  <Link key={size} href={`/track-sizes/${size}`}>
                    <Card className="card-hover h-full">
                      <CardHeader className="pb-2">
                        <CardTitle className="font-model text-xl">
                          {formatTrackSize(size)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-1">
                          {types.map((type) => (
                            <Badge key={type} variant="secondary" className="text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-4 flex items-center text-sm text-primary">
                          View compatible machines
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <Card className="mt-6">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  Track size information not available. Please contact us for
                  compatibility details.
                </p>
                <Button variant="accent" className="mt-4">
                  Contact for Sizing
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Undercarriage Parts */}
      <section className="section-sm bg-muted">
        <div className="container-wide">
          <h2 className="text-2xl font-bold tracking-tight">
            Undercarriage Parts for {machine.brand} {machine.model_name}
          </h2>
          <p className="mt-1 text-muted-foreground">
            Complete undercarriage solutions available
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                name: "Bottom Rollers",
                description: "Heavy-duty track rollers",
                href: "/bottom-rollers",
              },
              {
                name: "Sprockets",
                description: "Drive sprockets and segments",
                href: "/sprockets",
              },
              {
                name: "Idlers",
                description: "Front and rear idler wheels",
                href: "/idlers",
              },
              {
                name: "Final Drives",
                description: "Complete drive assemblies",
                href: "/final-drives",
              },
            ].map((part) => (
              <Link key={part.name} href={part.href}>
                <Card className="card-hover h-full">
                  <CardContent className="p-6">
                    <h3 className="font-semibold">{part.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {part.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-primary">
                      Shop {part.name}
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="section-sm">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold tracking-tight">
            About {machine.brand} {machine.model_name} Rubber Tracks
          </h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              The {machine.brand} {machine.model_name} is a popular{" "}
              {machine.equipment_type?.toLowerCase() || "compact track loader"}{" "}
              used in construction, landscaping, and agricultural applications.
              Keeping your machine running efficiently requires quality rubber
              tracks and undercarriage maintenance.
            </p>
            <p>
              At Rubber Track Wholesale, we carry premium replacement rubber
              tracks specifically designed for the {machine.brand}{" "}
              {machine.model_name}. Our tracks are manufactured to meet or
              exceed OEM specifications, ensuring optimal performance and
              longevity.
            </p>
            {trackSizes.length > 0 && (
              <p>
                The {machine.brand} {machine.model_name} accepts{" "}
                {trackSizes.join(", ")} rubber tracks
                {trackTypes.length > 0 &&
                  ` in ${trackTypes.join(" and ")} configurations`}
                . All sizes are available from our Houston warehouse with fast
                nationwide shipping.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-sm bg-muted">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-lg border bg-card p-6">
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Machines */}
      <section className="section-sm">
        <div className="container-wide">
          <h2 className="text-2xl font-bold tracking-tight">
            More {machine.brand} Models
          </h2>
          <p className="mt-1 text-muted-foreground">
            Browse other {machine.brand} equipment
          </p>
          <div className="mt-6">
            <Button variant="outline" asChild>
              <Link
                href={`/brands/${machine.brand.toLowerCase().replace(/\s+/g, "-")}`}
              >
                View All {machine.brand} Models
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
