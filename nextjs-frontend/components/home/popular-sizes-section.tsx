import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";
import { TOP_SELLING_TRACK_SIZES, getTopMachinesForTrackSize, HIGH_PRIORITY_MACHINES } from "@/lib/data/seo-priorities";
import { getMachinesForTrackSize } from "@/lib/data/full-machine-data";

// Top-selling sizes with accurate machine fits based on sales data
const popularSizes = [
  {
    size: "400x86x52",
    rank: 1,
    description: "Most popular CTL size",
    machines: "Kubota SVL95, John Deere 331G, Bobcat T740",
  },
  {
    size: "300x52.5x80",
    rank: 2,
    description: "Top mini excavator size",
    machines: "Kubota KX040, CAT 303.5, John Deere 35G",
  },
  {
    size: "320x86x49",
    rank: 3,
    description: "Compact CTL size",
    machines: "Bobcat T590, CAT 249D",
  },
  {
    size: "450x86x58",
    rank: 4,
    description: "Large CTL size",
    machines: "CAT 299D, Bobcat T770, John Deere 333G, Takeuchi TL12",
  },
  {
    size: "450x86x60",
    rank: 5,
    description: "XL CTL size",
    machines: "CAT 299D2, Bobcat T870",
  },
  {
    size: "320x86x52",
    rank: 6,
    description: "Popular mid-size CTL",
    machines: "Kubota SVL75, John Deere 325G, Takeuchi TL10",
  },
];

export function PopularSizesSection() {
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
              Top-Selling Track Sizes
            </h2>
            <p className="text-muted-foreground mt-2">
              Based on real customer orders - ready to ship nationwide
            </p>
          </div>
          <Link
            href="/track-size"
            className="hidden sm:flex items-center gap-1 text-primary hover:underline font-medium"
          >
            View All 35+ Sizes
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularSizes.map((item) => (
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
              <p className="text-sm text-foreground mt-4 pt-4 border-t border-border">
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
