import Link from "next/link";
import { ChevronRight, TrendingUp } from "lucide-react";
import { createMachineSlug } from "@/lib/url-utils";
import { TOP_SELLING_TRACK_SIZES } from "@/lib/data/seo-priorities";
import { getTrackSizesForMachine } from "@/lib/data/full-machine-data";

/**
 * Popular machines for homepage display.
 * IMPORTANT: Model names MUST exactly match full-machine-data.ts
 * Track sizes are looked up from full-machine-data.ts, NOT hardcoded here.
 */
const POPULAR_MACHINE_IDENTIFIERS = [
  // CTLs first - highest demand (model names must match full-machine-data.ts exactly)
  { brand: "Kubota", model: "SVL 75-2 (Compact Track Loader)", displayModel: "SVL75-2", category: "Compact Track Loader" },
  { brand: "Kubota", model: "SVL 75-3 (Compact Track Loader)", displayModel: "SVL75-3", category: "Compact Track Loader" },
  { brand: "Kubota", model: "SVL 95-2 (Compact Track Loader)", displayModel: "SVL95-2", category: "Compact Track Loader" },
  { brand: "Kubota", model: "SVL 97-2 (Compact Track Loader)", displayModel: "SVL97-2", category: "Compact Track Loader" },
  
  // CAT CTLs
  { brand: "CAT", model: "259D", displayModel: "259D", category: "Compact Track Loader" },
  { brand: "CAT", model: "259D3", displayModel: "259D3", category: "Compact Track Loader" },
  { brand: "CAT", model: "289D", displayModel: "289D", category: "Compact Track Loader" },
  { brand: "CAT", model: "299D2", displayModel: "299D2", category: "Compact Track Loader" },
  
  // Bobcat CTLs
  { brand: "Bobcat", model: "T650", displayModel: "T650", category: "Compact Track Loader" },
  { brand: "Bobcat", model: "T770", displayModel: "T770", category: "Compact Track Loader" },
  
  // John Deere CTLs
  { brand: "John Deere", model: "325G", displayModel: "325G", category: "Compact Track Loader" },
  { brand: "John Deere", model: "333G", displayModel: "333G", category: "Compact Track Loader" },
];

/**
 * Build the popular machines list with track sizes looked up from full-machine-data.ts
 */
function getPopularMachinesWithTrackSizes() {
  return POPULAR_MACHINE_IDENTIFIERS.map(machine => {
    // Look up track sizes from the authoritative source
    const trackSizes = getTrackSizesForMachine(machine.brand, machine.model);
    // Use first track size as primary, or show "Multiple sizes" if more than one
    const primaryTrackSize = trackSizes.length > 0 ? trackSizes[0] : "Contact for size";
    const hasMultipleSizes = trackSizes.length > 1;
    
    return {
      brand: machine.brand,
      model: machine.model,
      displayModel: machine.displayModel,
      category: machine.category,
      trackSize: primaryTrackSize,
      allTrackSizes: trackSizes,
      hasMultipleSizes,
    };
  });
}

export function PopularMachinesSection() {
  const popularMachines = getPopularMachinesWithTrackSizes();
  const top10Sizes = TOP_SELLING_TRACK_SIZES.slice(0, 10);

  return (
    <section className="py-12 lg:py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                Top Sellers
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Popular Machine Models
            </h2>
            <p className="text-muted-foreground mt-2">
              Find rubber tracks for the most requested equipment - based on real customer orders
            </p>
          </div>
          <Link
            href="/machines"
            className="hidden sm:flex items-center gap-1 text-primary hover:underline font-medium"
          >
            View All 4,600+ Machines
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularMachines.map((machine) => {
            const slug = createMachineSlug(machine.brand, machine.model);
            return (
              <Link
                key={slug}
                href={`/machines/${slug}`}
                className="group bg-card rounded-lg border border-border p-4 hover:border-primary hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold text-foreground group-hover:text-primary leading-tight">
                    {machine.brand} {machine.displayModel}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {machine.category}
                </p>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm font-medium text-foreground">
                    {machine.trackSize}
                    {machine.hasMultipleSizes && (
                      <span className="text-xs text-muted-foreground ml-1">
                        +{machine.allTrackSizes.length - 1} more
                      </span>
                    )}
                  </p>
                  <span className="inline-flex items-center text-xs text-primary mt-2 group-hover:underline">
                    View Tracks & Parts
                    <ChevronRight className="h-3 w-3 ml-1" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Top 10 selling track sizes for additional internal linking */}
        <div className="mt-8 pt-8 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Top 10 Selling Track Sizes
          </h3>
          <div className="flex flex-wrap gap-2">
            {top10Sizes.map((item) => (
              <Link
                key={item.size}
                href={`/track-size/${item.size}`}
                className="inline-flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg hover:border-primary hover:text-primary transition-colors text-sm"
              >
                <span className="w-5 h-5 flex items-center justify-center bg-primary/10 text-primary text-xs font-bold rounded">
                  {item.rank}
                </span>
                {item.size}
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/machines"
            className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
          >
            View All Machines
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
