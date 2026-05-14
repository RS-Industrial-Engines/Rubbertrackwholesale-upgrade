import Link from "next/link";
import { ChevronRight, TrendingUp } from "lucide-react";
import { createMachineSlug } from "@/lib/url-utils";
import { TOP_SELLING_TRACK_SIZES } from "@/lib/data/seo-priorities";
import { getTrackSizesForMachine, fullMachineModels } from "@/lib/data/full-machine-data";

/**
 * Priority machines for homepage display (simplified identifiers).
 * The actual model name is resolved from full-machine-data.ts using slug matching.
 */
const PRIORITY_MACHINE_SPECS = [
  // CTLs first - highest demand
  { brand: "Kubota", searchModel: "SVL75-2", displayModel: "SVL75-2", category: "Compact Track Loader" },
  { brand: "Kubota", searchModel: "SVL75-3", displayModel: "SVL75-3", category: "Compact Track Loader" },
  { brand: "Kubota", searchModel: "SVL95-2", displayModel: "SVL95-2", category: "Compact Track Loader" },
  { brand: "Kubota", searchModel: "SVL97-2", displayModel: "SVL97-2", category: "Compact Track Loader" },
  
  // CAT CTLs
  { brand: "CAT", searchModel: "259D", displayModel: "259D", category: "Compact Track Loader" },
  { brand: "CAT", searchModel: "259D3", displayModel: "259D3", category: "Compact Track Loader" },
  { brand: "CAT", searchModel: "289D", displayModel: "289D", category: "Compact Track Loader" },
  { brand: "CAT", searchModel: "299D2", displayModel: "299D2", category: "Compact Track Loader" },
  
  // Bobcat CTLs
  { brand: "Bobcat", searchModel: "T650", displayModel: "T650", category: "Compact Track Loader" },
  { brand: "Bobcat", searchModel: "T770", displayModel: "T770", category: "Compact Track Loader" },
  
  // John Deere CTLs
  { brand: "John Deere", searchModel: "325G", displayModel: "325G", category: "Compact Track Loader" },
  { brand: "John Deere", searchModel: "333G", displayModel: "333G", category: "Compact Track Loader" },
  
  // Mini Excavators - fill final row slots for SEO clusters
  { brand: "Kubota", searchModel: "KX121-3", displayModel: "KX121-3", category: "Mini Excavator" },
  { brand: "Bobcat", searchModel: "E35", displayModel: "E35", category: "Mini Excavator" },
];

/**
 * Resolve a priority machine to its actual full-machine-data.ts model name
 * by matching the generated slug from the search model.
 */
function resolveActualModel(brand: string, searchModel: string): string | null {
  const models = fullMachineModels[brand] || [];
  const targetSlug = createMachineSlug(brand, searchModel);
  
  // Find the model whose slug matches
  for (const model of models) {
    const modelSlug = createMachineSlug(brand, model);
    if (modelSlug === targetSlug) {
      return model;
    }
  }
  
  return null;
}

interface PopularMachine {
  brand: string;
  model: string;
  displayModel: string;
  category: string;
  trackSize: string;
  allTrackSizes: string[];
  hasMultipleSizes: boolean;
}

/**
 * Build the popular machines list with track sizes looked up from full-machine-data.ts
 */
function getPopularMachinesWithTrackSizes(): PopularMachine[] {
  const results: PopularMachine[] = [];
  
  for (const spec of PRIORITY_MACHINE_SPECS) {
    // Resolve the actual model name from full-machine-data.ts
    const actualModel = resolveActualModel(spec.brand, spec.searchModel);
    
    if (!actualModel) {
      // Skip if model not found
      continue;
    }
    
    // Look up track sizes from the authoritative source using the actual model name
    const trackSizes = getTrackSizesForMachine(spec.brand, actualModel);
    
    if (trackSizes.length === 0) {
      // Skip machines with no track sizes
      continue;
    }
    
    // Use first track size as primary
    const primaryTrackSize = trackSizes[0];
    const hasMultipleSizes = trackSizes.length > 1;
    
    results.push({
      brand: spec.brand,
      model: actualModel, // Use the actual model name for slug generation
      displayModel: spec.displayModel,
      category: spec.category,
      trackSize: primaryTrackSize,
      allTrackSizes: trackSizes,
      hasMultipleSizes,
    });
  }
  
  return results;
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
                    {machine.allTrackSizes.length === 1 ? (
                      // Single size - show it
                      machine.trackSize
                    ) : machine.allTrackSizes.length === 2 ? (
                      // Two sizes - show both explicitly
                      <>{machine.allTrackSizes[0]} + {machine.allTrackSizes[1]}</>
                    ) : (
                      // 3+ sizes - show first two + count
                      <>
                        {machine.allTrackSizes[0]}, {machine.allTrackSizes[1]}
                        <span className="text-xs text-muted-foreground ml-1">
                          +{machine.allTrackSizes.length - 2} more
                        </span>
                      </>
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
