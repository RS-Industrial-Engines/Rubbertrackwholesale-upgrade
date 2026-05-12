import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, Phone, Truck, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import {
  BreadcrumbSchema,
  FAQSchema,
  ItemListSchema,
  ProductSchema,
} from "@/components/seo/structured-data";
import { generateTrackSizeBreadcrumbs, SITE_URL } from "@/lib/seo";
import { getTrackSizeBySize, getTrackSizes } from "@/lib/api/track-sizes";
import { getMachinesForTrackSize } from "@/lib/api/compatibility";
import { formatTrackSize, generateMachineSlug } from "@/lib/utils";

interface Props {
  params: Promise<{ size: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { size } = await params;
  const decodedSize = decodeURIComponent(size);
  const trackSize = await getTrackSizeBySize(decodedSize);
  const machines = await getMachinesForTrackSize(decodedSize);

  const title = `${decodedSize} Rubber Tracks - Compatible Machines & Wholesale Pricing`;
  const description = `${decodedSize} rubber tracks fit ${machines.length}+ machine models including ${machines.slice(0, 3).map((m) => `${m.brand} ${m.model}`).join(", ")}. Premium quality, wholesale pricing from Houston.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/track-sizes/${decodedSize}`,
    },
    openGraph: {
      title: `${title} | Rubber Track Wholesale`,
      description,
      url: `/track-sizes/${decodedSize}`,
      siteName: "Rubber Track Wholesale",
      type: "website",
    },
  };
}

// Generate static params for popular track sizes
export async function generateStaticParams() {
  const response = await getTrackSizes({ limit: 100, is_active: true });

  return response.items.map((size) => ({
    size: size.size,
  }));
}

export default async function TrackSizePage({ params }: Props) {
  const { size } = await params;
  const decodedSize = decodeURIComponent(size);

  const [trackSize, machines] = await Promise.all([
    getTrackSizeBySize(decodedSize),
    getMachinesForTrackSize(decodedSize),
  ]);

  // Even if trackSize is null, we may still have compatibility data
  if (!trackSize && machines.length === 0) {
    notFound();
  }

  const breadcrumbs = generateTrackSizeBreadcrumbs(decodedSize);

  // Group machines by brand
  const machinesByBrand: Record<string, typeof machines> = {};
  for (const machine of machines) {
    if (!machinesByBrand[machine.brand]) {
      machinesByBrand[machine.brand] = [];
    }
    machinesByBrand[machine.brand].push(machine);
  }

  // Parse size components
  const sizeParts = decodedSize.split("x");
  const width = sizeParts[0] || "";
  const pitch = sizeParts[1] || "";
  const links = sizeParts[2] || "";

  // Generate FAQs
  const faqs = [
    {
      question: `What machines use ${decodedSize} rubber tracks?`,
      answer:
        machines.length > 0
          ? `The ${decodedSize} track size fits ${machines.length}+ machine models including ${machines.slice(0, 5).map((m) => `${m.brand} ${m.model}`).join(", ")}, and more. View the full compatibility list above.`
          : `Contact us for a complete list of machines compatible with ${decodedSize} rubber tracks.`,
    },
    {
      question: `What do the numbers in ${decodedSize} mean?`,
      answer: `${decodedSize} indicates ${width}mm width x ${pitch}mm pitch x ${links} links. Width is the track width, pitch is the distance between links, and links is the total number of links in the track.`,
    },
    {
      question: `How much do ${decodedSize} rubber tracks cost?`,
      answer: `Pricing varies based on brand and quantity. Contact us for current wholesale pricing on ${decodedSize} rubber tracks. We offer competitive dealer pricing and volume discounts.`,
    },
    {
      question: `Are ${decodedSize} rubber tracks in stock?`,
      answer: `We maintain inventory of popular track sizes at our Houston warehouse. Contact us to confirm availability and expected delivery times for ${decodedSize} tracks.`,
    },
  ];

  // Machine items for schema
  const machineItems = machines.slice(0, 50).map((machine, index) => ({
    name: `${machine.brand} ${machine.model}`,
    url: `${SITE_URL}/machines/${generateMachineSlug(machine.brand, machine.model)}`,
    position: index + 1,
  }));

  // Related sizes (same width, different links/pitch)
  const relatedResponse = await getTrackSizes({ search: width, limit: 20 });
  const relatedSizes = relatedResponse.items
    .filter((s) => s.size !== decodedSize && s.width?.toString() === width)
    .slice(0, 6);

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={faqs} />
      <ProductSchema
        name={`${decodedSize} Rubber Track`}
        description={`Premium ${decodedSize} rubber track for compact track loaders and mini excavators. ${width}mm width, ${pitch}mm pitch, ${links} links.`}
        url={`${SITE_URL}/track-sizes/${decodedSize}`}
        availability={trackSize?.is_in_stock ? "InStock" : "PreOrder"}
      />
      {machines.length > 0 && (
        <ItemListSchema
          name={`Compatible Machines for ${decodedSize} Rubber Tracks`}
          description={`Machine models that use ${decodedSize} rubber tracks`}
          items={machineItems}
        />
      )}

      {/* Hero Section */}
      <section className="border-b bg-muted py-8 md:py-12">
        <div className="container-wide">
          <Breadcrumbs items={breadcrumbs} />

          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <Badge variant="secondary" className="mb-2">
                Rubber Track
              </Badge>
              <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
                <span className="font-model">{formatTrackSize(decodedSize)}</span>{" "}
                Rubber Tracks
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Premium quality {decodedSize} rubber tracks for compact track
                loaders and mini excavators. Fits {machines.length}+ machine
                models.
              </p>

              {/* Quick Stats */}
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>
                    {machines.length} compatible machine
                    {machines.length !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Ships from Houston, TX</span>
                </div>
                {trackSize?.is_in_stock && (
                  <div className="flex items-center gap-2 text-sm">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      In Stock
                    </Badge>
                  </div>
                )}
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

            {/* Size Specifications Card */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="h-5 w-5" />
                  Track Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Full Size</span>
                    <span className="font-model font-semibold">
                      {formatTrackSize(decodedSize)}
                    </span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Width</span>
                    <span className="font-semibold">{width}mm</span>
                  </div>
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">Pitch</span>
                    <span className="font-semibold">{pitch}mm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Links</span>
                    <span className="font-semibold">{links}</span>
                  </div>
                </div>
                {trackSize?.description && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    {trackSize.description}
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Compatible Machines */}
      <section className="section-sm">
        <div className="container-wide">
          <h2 className="text-2xl font-bold tracking-tight">
            Compatible Machines for {decodedSize} Tracks
          </h2>
          <p className="mt-1 text-muted-foreground">
            {machines.length > 0
              ? `${machines.length} machine models use this track size`
              : "Contact us for compatibility information"}
          </p>

          {machines.length > 0 ? (
            <div className="mt-8 space-y-8">
              {Object.entries(machinesByBrand)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([brand, brandMachines]) => (
                  <div key={brand}>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">{brand}</h3>
                      <Badge variant="outline" className="text-xs">
                        {brandMachines.length} model
                        {brandMachines.length !== 1 ? "s" : ""}
                      </Badge>
                    </div>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {brandMachines.map((machine) => {
                        const slug = generateMachineSlug(
                          machine.brand,
                          machine.model
                        );
                        return (
                          <Link key={slug} href={`/machines/${slug}`}>
                            <Card className="card-hover h-full">
                              <CardContent className="flex items-center justify-between p-4">
                                <span className="font-model font-semibold">
                                  {machine.model}
                                </span>
                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                              </CardContent>
                            </Card>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <Card className="mt-6">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">
                  Machine compatibility information is being updated. Contact us
                  for details.
                </p>
                <Button variant="accent" className="mt-4">
                  Contact for Compatibility
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Related Track Sizes */}
      {relatedSizes.length > 0 && (
        <section className="section-sm bg-muted">
          <div className="container-wide">
            <h2 className="text-2xl font-bold tracking-tight">
              Related Track Sizes
            </h2>
            <p className="mt-1 text-muted-foreground">
              Other {width}mm wide track options
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              {relatedSizes.map((related) => (
                <Link key={related._id.$oid} href={`/track-sizes/${related.size}`}>
                  <Card className="card-hover">
                    <CardContent className="p-4 text-center">
                      <p className="font-model font-semibold">
                        {formatTrackSize(related.size)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {related.links} links
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEO Content Section */}
      <section className="section-sm">
        <div className="container-narrow">
          <h2 className="text-2xl font-bold tracking-tight">
            About {decodedSize} Rubber Tracks
          </h2>
          <div className="mt-4 space-y-4 text-muted-foreground">
            <p>
              The {decodedSize} rubber track is a popular size used on compact
              track loaders and mini excavators. With a {width}mm width,{" "}
              {pitch}mm pitch, and {links} links, this track size provides
              excellent traction and stability for a variety of applications.
            </p>
            <p>
              At Rubber Track Wholesale, we stock premium {decodedSize} rubber
              tracks manufactured to meet or exceed OEM specifications. Our
              tracks feature reinforced steel cores, high-quality rubber
              compounds, and precision-molded lugs for maximum durability.
            </p>
            <p>
              Whether you need tracks for construction, landscaping, agriculture,
              or general contracting, our {decodedSize} rubber tracks deliver
              reliable performance and extended service life.
            </p>
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

      {/* CTA Section */}
      <section className="section-sm bg-primary text-primary-foreground">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Need {decodedSize} Rubber Tracks?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-primary-foreground/80">
            Contact our team for wholesale pricing on {decodedSize} rubber
            tracks. Fast shipping from our Houston warehouse.
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
