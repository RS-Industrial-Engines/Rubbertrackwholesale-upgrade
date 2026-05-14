import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";
import { TOP_SELLING_TRACK_SIZES } from "@/lib/data/seo-priorities";
import { getMachinesForTrackSize, fullTrackSizes } from "@/lib/data/full-machine-data";

/**
 * Get sample machine names for a track size by looking up from full-machine-data.ts
 * Returns a formatted string of machine names, limited to 3-4 machines.
 */
function getSampleMachinesForSize(trackSize: string): string {
  const machines = getMachinesForTrackSize(trackSize);
  
  // Get a diverse sample of brands (up to 4 machines, different brands preferred)
  const seenBrands = new Set<string>();
  const sampleMachines: string[] = [];
  
  for (const machine of machines) {
    if (sampleMachines.length >= 4) break;
    
    // Prefer different brands for variety
    if (!seenBrands.has(machine.brand) || sampleMachines.length < 2) {
      // Format model name - remove parenthetical descriptions for display
      const displayModel = machine.model.replace(/\s*\([^)]*\)/g, "").trim();
      sampleMachines.push(`${machine.brand} ${displayModel}`);
      seenBrands.add(machine.brand);
    }
  }
  
  if (sampleMachines.length === 0) {
    return "Multiple machines";
  }
  
  return sampleMachines.join(", ");
}

export function PopularSizesSection() {
  const top10Sizes = TOP_SELLING_TRACK_SIZES.slice(0, 10);
  const totalTrackSizes = fullTrackSizes.length;
  
  // Build the popular sizes array with machine lookups from full-machine-data.ts
  const popularSizes = top10Sizes.map(item => ({
    size: item.size,
    rank: item.rank,
    description: item.description,
    machines: getSampleMachinesForSize(item.size),
  }));

  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wider">
                In Stock Now
              </span>
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Top 10 Selling Track Sizes
            </h2>
            <p className="text-muted-foreground mt-2">
              Based on real customer orders - ready to ship nationwide
            </p>
          </div>
          <Link
            href="/track-size"
            className="hidden sm:flex items-center gap-1 text-primary hover:underline font-medium"
          >
            View All {totalTrackSizes}+ Sizes
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Top 6 with full cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularSizes.slice(0, 6).map((item) => (
            <Link
              key={item.size}
              href={`/track-size/${item.size.toLowerCase()}`}
              className="group bg-card rounded-lg border border-border p-6 hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded">
                      #{item.rank}
                    </span>
                    <h3 className="text-xl font-bold text-primary group-hover:underline">
                      {item.size}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {item.description}
                  </p>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-green-500/10 text-green-600 rounded whitespace-nowrap">
                  In Stock
                </span>
              </div>
              <p className="text-sm text-foreground mt-4 pt-4 border-t border-border line-clamp-2">
                <span className="text-muted-foreground">Fits: </span>
                {item.machines}
              </p>
              <span className="inline-flex items-center text-xs text-primary mt-3 group-hover:underline">
                View Compatible Machines
                <ChevronRight className="h-3 w-3 ml-1" />
              </span>
            </Link>
          ))}
        </div>

        {/* Sizes 7-10 - same visual treatment as 1-6 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          {popularSizes.slice(6, 10).map((item) => (
            <Link
              key={item.size}
              href={`/track-size/${item.size.toLowerCase()}`}
              className="group bg-card rounded-lg border border-border p-4 hover:border-primary hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 flex items-center justify-center bg-primary text-primary-foreground text-xs font-bold rounded">
                    #{item.rank}
                  </span>
                  <h3 className="text-lg font-bold text-primary group-hover:underline">
                    {item.size}
                  </h3>
                </div>
                <span className="px-2 py-0.5 text-xs font-medium bg-green-500/10 text-green-600 rounded whitespace-nowrap">
                  In Stock
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                <span className="text-muted-foreground">Fits: </span>
                {item.machines}
              </p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/track-size"
            className="inline-flex items-center gap-1 text-primary hover:underline font-medium"
          >
            View All Track Sizes
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
