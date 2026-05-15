import Link from "next/link";
import { ChevronRight, TrendingUp } from "lucide-react";
import { createMachineSlug } from "@/lib/url-utils";
import { TOP_SELLING_TRACK_SIZES, HIGH_PRIORITY_MACHINES } from "@/lib/data/seo-priorities";
import { getTrackSizesForMachine, fullMachineModels } from "@/lib/data/full-machine-data";

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
  trackSize: string;
  allTrackSizes: string[];
  hasMultipleSizes: boolean;
}

/**
 * Build the popular machines list with track sizes looked up from full-machine-data.ts.
 * Uses first 14 from HIGH_PRIORITY_MACHINES (shared with /rubber-tracks page).
 */
function getPopularMachinesWithTrackSizes(): PopularMachine[] {
  const results: PopularMachine[] = [];
  
  // Take first 14 machines from HIGH_PRIORITY_MACHINES (the shared priority list)
  const top14 = HIGH_PRIORITY_MACHINES.slice(0, 14);
  
  for (const spec of top14) {
    // Resolve the actual model name from full-machine-data.ts
    const actualModel = resolveActualModel(spec.brand, spec.model);
    
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
      displayModel: spec.model, // Use the original model name for display
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
