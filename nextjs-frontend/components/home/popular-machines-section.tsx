import Link from "next/link";
import { ChevronRight, TrendingUp } from "lucide-react";
import { createMachineSlug } from "@/lib/url-utils";
import { HIGH_PRIORITY_MACHINES, TOP_SELLING_TRACK_SIZES } from "@/lib/data/seo-priorities";

// Get a diverse mix of popular machines for homepage display
// Based on real sales data - these are the "money machines"
const popularMachines = [
  // Kubota - extremely popular
  { brand: "Kubota", model: "SVL75-2", trackSize: "320x86x52", category: "Compact Track Loader" },
  { brand: "Kubota", model: "SVL95-2", trackSize: "400x86x52", category: "Compact Track Loader" },
  
  // CAT - high commercial value
  { brand: "CAT", model: "259D", trackSize: "400x86x49", category: "Compact Track Loader" },
  { brand: "CAT", model: "299D", trackSize: "450x86x58", category: "Compact Track Loader" },
  
  // Bobcat - very popular
  { brand: "Bobcat", model: "T650", trackSize: "400x86x49", category: "Compact Track Loader" },
  { brand: "Bobcat", model: "T770", trackSize: "450x86x58", category: "Compact Track Loader" },
  
  // John Deere
  { brand: "John Deere", model: "333G", trackSize: "450x86x58", category: "Compact Track Loader" },
  { brand: "John Deere", model: "325G", trackSize: "320x86x52", category: "Compact Track Loader" },
  
  // Takeuchi
  { brand: "Takeuchi", model: "TL12", trackSize: "450x86x58", category: "Compact Track Loader" },
  { brand: "Takeuchi", model: "TL10", trackSize: "320x86x52", category: "Compact Track Loader" },
  
  // Mini Excavators
  { brand: "Kubota", model: "KX040", trackSize: "300x52.5x80", category: "Mini Excavator" },
  { brand: "CAT", model: "305", trackSize: "400x72.5x72", category: "Mini Excavator" },
];

export function PopularMachinesSection() {
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
                    {machine.brand} {machine.model}
                  </h3>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {machine.category}
                </p>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-sm font-medium text-foreground">
                    {machine.trackSize}
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

        {/* Top-selling track sizes for additional internal linking */}
        <div className="mt-8 pt-8 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Top-Selling Track Sizes
          </h3>
          <div className="flex flex-wrap gap-2">
            {TOP_SELLING_TRACK_SIZES.slice(0, 6).map((size, index) => (
              <Link
                key={size}
                href={`/track-size/${size}`}
                className="inline-flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg hover:border-primary hover:text-primary transition-colors text-sm"
              >
                <span className="w-5 h-5 flex items-center justify-center bg-primary/10 text-primary text-xs font-bold rounded">
                  {index + 1}
                </span>
                {size}
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
