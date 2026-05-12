import type { Metadata } from "next";
import Link from "next/link";
import { Search, ArrowRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbSchema, ItemListSchema } from "@/components/seo/structured-data";
import { generateBreadcrumbs, SITE_URL } from "@/lib/seo";
import { getTrackSizes, getGroupedTrackSizes } from "@/lib/api/track-sizes";
import { formatTrackSize } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Rubber Track Sizes | Complete Size Guide & Compatibility",
  description:
    "Browse all rubber track sizes. Find your track dimensions and compatible machines. Sizes for compact track loaders and mini excavators. Wholesale pricing.",
  alternates: {
    canonical: "/track-sizes",
  },
};

// Popular widths for quick filtering
const POPULAR_WIDTHS = ["230", "300", "320", "350", "400", "450"];

export default async function TrackSizesPage() {
  const [response, groupedSizes] = await Promise.all([
    getTrackSizes({ limit: 300, is_active: true }),
    getGroupedTrackSizes(),
  ]);

  const breadcrumbs = generateBreadcrumbs({
    name: "Track Sizes",
    href: "/track-sizes",
  });

  // Sort sizes by width and popularity
  const sortedSizes = response.items.sort((a, b) => {
    // First by width
    const widthDiff = (a.width || 0) - (b.width || 0);
    if (widthDiff !== 0) return widthDiff;
    // Then by pitch
    const pitchDiff = (a.pitch || 0) - (b.pitch || 0);
    if (pitchDiff !== 0) return pitchDiff;
    // Then by links
    return (a.links || 0) - (b.links || 0);
  });

  // Group by width for display
  const sizesByWidth: Record<string, typeof sortedSizes> = {};
  for (const size of sortedSizes) {
    const width = size.width?.toString() || "Other";
    if (!sizesByWidth[width]) {
      sizesByWidth[width] = [];
    }
    sizesByWidth[width].push(size);
  }

  // Create item list for schema
  const sizeItems = sortedSizes.slice(0, 100).map((size, index) => ({
    name: `${size.size} Rubber Track`,
    url: `${SITE_URL}/track-sizes/${size.size}`,
    position: index + 1,
  }));

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ItemListSchema
        name="Rubber Track Sizes Directory"
        description="Complete list of rubber track sizes for compact track loaders and mini excavators"
        items={sizeItems}
      />

      {/* Hero Section */}
      <section className="border-b bg-muted py-8 md:py-12">
        <div className="container-wide">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Rubber Track Sizes
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Find your rubber track by size. Browse by width or search for your
            specific dimensions (Width x Pitch x Links).
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by size (e.g., 400x86x52)"
                className="h-12 pl-10 font-model text-base"
              />
            </div>
          </div>

          {/* Quick Width Filters */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filter by width:</span>
            {POPULAR_WIDTHS.map((width) => (
              <a key={width} href={`#width-${width}`}>
                <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                  {width}mm
                </Badge>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Understanding Track Sizes */}
      <section className="section-sm border-b">
        <div className="container-wide">
          <h2 className="text-xl font-semibold">Understanding Track Sizes</h2>
          <p className="mt-2 text-muted-foreground">
            Rubber track sizes are measured as{" "}
            <span className="font-model font-semibold text-foreground">
              Width x Pitch x Links
            </span>
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold">Width (mm)</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  The track width in millimeters. Common widths: 230mm, 300mm,
                  320mm, 400mm, 450mm.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold">Pitch (mm)</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Distance between links. Determines sprocket compatibility.
                  Common: 52.5mm, 72mm, 86mm.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <h3 className="font-semibold">Links</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Number of links in the track. Determines track length for your
                  specific machine.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* All Sizes by Width */}
      <section className="section">
        <div className="container-wide">
          <h2 className="text-2xl font-bold tracking-tight">
            All Track Sizes by Width
          </h2>
          <p className="mt-1 text-muted-foreground">
            {response.total.toLocaleString()} track sizes available
          </p>

          <div className="mt-8 space-y-12">
            {Object.entries(sizesByWidth)
              .sort(([a], [b]) => {
                const numA = parseInt(a) || 9999;
                const numB = parseInt(b) || 9999;
                return numA - numB;
              })
              .map(([width, sizes]) => (
                <div key={width} id={`width-${width}`}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{width}mm Wide Tracks</h3>
                    <Badge variant="outline">{sizes.length} sizes</Badge>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {sizes.map((size) => (
                      <Link key={size._id.$oid} href={`/track-sizes/${size.size}`}>
                        <Card className="card-hover h-full">
                          <CardContent className="p-4">
                            <p className="font-model text-lg font-semibold">
                              {formatTrackSize(size.size)}
                            </p>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {size.links} links
                              </span>
                              {size.is_in_stock && (
                                <Badge
                                  variant="secondary"
                                  className="bg-green-100 text-green-800 text-xs"
                                >
                                  In Stock
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-sm bg-primary text-primary-foreground">
        <div className="container-wide text-center">
          <h2 className="text-2xl font-bold tracking-tight">
            Not Sure What Size You Need?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-primary-foreground/80">
            Search by your machine make and model to find the exact track size
            for your equipment.
          </p>
          <Button size="lg" variant="accent" className="mt-6" asChild>
            <Link href="/machines">
              Search by Machine
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
