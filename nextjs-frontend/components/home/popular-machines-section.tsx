import Link from "next/link";
import { ChevronRight } from "lucide-react";

const popularMachines = [
  { name: "Kubota SVL75", slug: "kubota-svl75", trackSize: "400x86x52" },
  { name: "Kubota SVL95", slug: "kubota-svl95", trackSize: "450x86x56" },
  { name: "Cat 259D", slug: "cat-259d", trackSize: "400x86x52" },
  { name: "Cat 289D", slug: "cat-289d", trackSize: "450x86x56" },
  { name: "Bobcat T650", slug: "bobcat-t650", trackSize: "400x86x52" },
  { name: "Bobcat T770", slug: "bobcat-t770", trackSize: "450x86x56" },
  { name: "John Deere 333G", slug: "john-deere-333g", trackSize: "450x86x56" },
  { name: "Takeuchi TL12", slug: "takeuchi-tl12", trackSize: "450x86x56" },
];

export function PopularMachinesSection() {
  return (
    <section className="py-12 lg:py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Popular Machine Models
            </h2>
            <p className="text-muted-foreground mt-2">
              Find rubber tracks for the most common equipment
            </p>
          </div>
          <Link
            href="/machines"
            className="hidden sm:flex items-center gap-1 text-primary hover:underline font-medium"
          >
            View All Machines
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {popularMachines.map((machine) => (
            <Link
              key={machine.slug}
              href={`/machines/${machine.slug}`}
              className="group bg-card rounded-lg border border-border p-4 hover:border-primary transition-colors"
            >
              <h3 className="font-semibold text-foreground group-hover:text-primary mb-1">
                {machine.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                Track: {machine.trackSize}
              </p>
              <span className="inline-flex items-center text-xs text-primary mt-2 group-hover:underline">
                View Tracks
                <ChevronRight className="h-3 w-3 ml-1" />
              </span>
            </Link>
          ))}
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
