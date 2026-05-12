import Link from "next/link";
import { ChevronRight } from "lucide-react";

const popularSizes = [
  {
    size: "400x86x52",
    description: "Most common CTL size",
    machines: "Kubota SVL75, Cat 259D, Bobcat T650",
  },
  {
    size: "450x86x56",
    description: "Large CTL size",
    machines: "Kubota SVL95, Cat 289D, John Deere 333G",
  },
  {
    size: "300x52.5x80",
    description: "Mini excavator size",
    machines: "Kubota KX121, Yanmar VIO35",
  },
  {
    size: "320x86x52",
    description: "Compact CTL size",
    machines: "Bobcat T590, Cat 249D",
  },
  {
    size: "400x72.5x72",
    description: "Excavator/CTL size",
    machines: "Kubota U35, Takeuchi TB230",
  },
  {
    size: "450x81x76",
    description: "Large excavator size",
    machines: "Kubota KX080, Cat 308",
  },
];

export function PopularSizesSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Popular Track Sizes
            </h2>
            <p className="text-muted-foreground mt-2">
              Common rubber track sizes we keep in stock
            </p>
          </div>
          <Link
            href="/track-size"
            className="hidden sm:flex items-center gap-1 text-primary hover:underline font-medium"
          >
            View All Sizes
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularSizes.map((item) => (
            <Link
              key={item.size}
              href={`/track-size/${item.size.toLowerCase()}`}
              className="group bg-card rounded-lg border border-border p-6 hover:border-primary transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-primary group-hover:underline">
                    {item.size}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </p>
                </div>
                <span className="px-2 py-1 text-xs font-medium bg-green-500/10 text-green-500 rounded">
                  In Stock
                </span>
              </div>
              <p className="text-sm text-foreground mt-3">
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
