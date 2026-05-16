import { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Eye, Package, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { STAGED_PARTS, StagedPart } from "@/lib/data/staged-parts-data";
import {
  getComponentTypeFromStagedPart,
  generateStagedSlug,
} from "@/lib/data/staged-review-helpers";
import {
  COMPONENT_DISPLAY_NAMES,
} from "@/lib/data/undercarriage-data";

export const metadata: Metadata = {
  title: "Staged Parts Review | SEO QA | Rubber Track Wholesale",
  description: "Internal review page for staged undercarriage parts. Not for public indexing.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReviewPartsIndexPage() {
  // Group staged parts by brand
  const partsByBrand: Record<string, StagedPart[]> = {};
  for (const part of STAGED_PARTS) {
    if (!partsByBrand[part.brand]) {
      partsByBrand[part.brand] = [];
    }
    partsByBrand[part.brand].push(part);
  }

  const brands = Object.keys(partsByBrand).sort();

  return (
    <div className="min-h-screen bg-background">
      {/* Review Banner */}
      <div className="bg-yellow-500/20 border-b-2 border-yellow-500">
        <div className="container mx-auto px-4 py-3 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-yellow-800 dark:text-yellow-200">
              STAGED REVIEW MODE - NOT FOR PUBLIC INDEXING
            </p>
            <p className="text-xs text-yellow-700 dark:text-yellow-300">
              These pages are for SEO QA only. They use noindex/nofollow and are excluded from sitemap.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="h-6 w-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold">Staged Parts Review</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            {STAGED_PARTS.length} staged parts across {brands.length} brands.
            Click any part to preview its full page with SEO elements, schema, and internal links.
          </p>

          {/* Stats Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{STAGED_PARTS.length}</p>
                <p className="text-xs text-muted-foreground">Total Staged</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">{brands.length}</p>
                <p className="text-xs text-muted-foreground">Brands</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold">
                  {STAGED_PARTS.filter((p) => p.slug).length}
                </p>
                <p className="text-xs text-muted-foreground">Have Slugs</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl font-bold text-yellow-600">0</p>
                <p className="text-xs text-muted-foreground">Approved</p>
              </CardContent>
            </Card>
          </div>

          {/* Parts by Brand */}
          {brands.map((brand) => {
            const parts = partsByBrand[brand];
            return (
              <section key={brand} className="mb-10">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  {brand}
                  <span className="text-sm font-normal text-muted-foreground">
                    ({parts.length} parts)
                  </span>
                </h2>
                <div className="space-y-2">
                  {parts.map((part) => {
                    const slug = generateStagedSlug(part);
                    const componentType = getComponentTypeFromStagedPart(part);
                    const componentName = componentType
                      ? COMPONENT_DISPLAY_NAMES[componentType]
                      : "Part";

                    return (
                      <Link
                        key={part.record_id}
                        href={`/review/parts/${slug}`}
                        className="group block"
                      >
                        <Card className="hover:border-primary transition-colors">
                          <CardContent className="p-4 flex items-center justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-semibold group-hover:text-primary">
                                  {part.primary_part_number}
                                </span>
                                <span className="text-xs px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-700">
                                  staged
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {componentName}
                                </span>
                              </div>
                              <p className="text-sm text-muted-foreground truncate">
                                {part.product_name || part.compatible_models_text}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Slug: <code className="text-xs">/parts/{slug}</code>
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0" />
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
