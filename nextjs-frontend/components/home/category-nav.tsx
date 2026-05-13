import Link from "next/link";
import { Cog, CircleDot, Disc3, Target } from "lucide-react";

const categories = [
  {
    name: "Rubber Tracks",
    description: "Premium quality tracks for all brands",
    icon: CircleDot,
    href: "/rubber-tracks",
  },
  {
    name: "Sprockets",
    description: "Drive sprockets and components",
    icon: Cog,
    href: "/sprockets",
  },
  {
    name: "Rollers",
    description: "Top and bottom rollers",
    icon: Disc3,
    href: "/bottom-rollers",
  },
  {
    name: "Idlers",
    description: "Front idlers and components",
    icon: Target,
    href: "/idlers",
  },
];

export function CategoryNav() {
  return (
    <section className="py-8 bg-card border-b border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.name}
                href={category.href}
                className="flex items-center gap-4 p-4 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors group"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    {category.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
