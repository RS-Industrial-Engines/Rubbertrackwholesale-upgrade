import type { Metadata } from "next";
import Link from "next/link";
import { Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { BreadcrumbSchema, ItemListSchema } from "@/components/seo/structured-data";
import { generateBreadcrumbs } from "@/lib/seo";
import { getMachines } from "@/lib/api/machines";
import { generateMachineSlug } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Rubber Tracks by Machine Model | Find Compatible Parts",
  description:
    "Find rubber tracks and undercarriage parts by machine model. Browse Kubota, Caterpillar, Bobcat, John Deere, Takeuchi, and more. Wholesale pricing.",
  alternates: {
    canonical: "/machines",
  },
};

// Group machines by brand
function groupMachinesByBrand(
  machines: Awaited<ReturnType<typeof getMachines>>["items"]
) {
  const grouped: Record<string, typeof machines> = {};

  for (const machine of machines) {
    const brand = machine.brand;
    if (!grouped[brand]) {
      grouped[brand] = [];
    }
    grouped[brand].push(machine);
  }

  // Sort brands alphabetically and prioritize US-supported
  return Object.entries(grouped)
    .sort(([a], [b]) => a.localeCompare(b))
    .reduce(
      (acc, [brand, models]) => {
        acc[brand] = models.sort((a, b) =>
          a.model_name.localeCompare(b.model_name)
        );
        return acc;
      },
      {} as Record<string, typeof machines>
    );
}

// Popular brands to feature
const FEATURED_BRANDS = [
  "Kubota",
  "Caterpillar",
  "Bobcat",
  "John Deere",
  "Takeuchi",
  "Case",
  "New Holland",
  "Komatsu",
];

export default async function MachinesPage() {
  const response = await getMachines({ limit: 500, is_us_supported: true });
  const groupedMachines = groupMachinesByBrand(response.items);
  const breadcrumbs = generateBreadcrumbs({ name: "Machines", href: "/machines" });

  // Create item list for schema
  const machineItems = response.items.slice(0, 100).map((machine, index) => ({
    name: machine.full_name,
    url: `https://rubbertrackwholesale.com/machines/${generateMachineSlug(machine.brand, machine.model_name)}`,
    position: index + 1,
  }));

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} />
      <ItemListSchema
        name="Machine Models Directory"
        description="Browse rubber tracks and undercarriage parts by machine model"
        items={machineItems}
      />

      {/* Hero Section */}
      <section className="border-b bg-muted py-8 md:py-12">
        <div className="container-wide">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Find Rubber Tracks by Machine
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Search for your equipment make and model to find compatible rubber
            tracks and undercarriage parts.
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by machine (e.g., Kubota SVL75, Cat 259D)"
                className="h-12 pl-10 text-base"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands */}
      <section className="section-sm border-b">
        <div className="container-wide">
          <h2 className="text-xl font-semibold">Popular Brands</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {FEATURED_BRANDS.map((brand) => (
              <Link
                key={brand}
                href={`/brands/${brand.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <Badge variant="secondary" className="px-4 py-2 text-sm hover:bg-secondary/80">
                  {brand}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Machines by Brand */}
      <section className="section">
        <div className="container-wide">
          <h2 className="text-2xl font-bold tracking-tight">
            All Machines by Brand
          </h2>
          <p className="mt-1 text-muted-foreground">
            {response.total.toLocaleString()} machine models available
          </p>

          <div className="mt-8 space-y-12">
            {Object.entries(groupedMachines)
              .filter(([brand]) =>
                FEATURED_BRANDS.some(
                  (fb) => fb.toLowerCase() === brand.toLowerCase()
                )
              )
              .map(([brand, machines]) => (
                <div key={brand} id={brand.toLowerCase().replace(/\s+/g, "-")}>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{brand}</h3>
                    <Link
                      href={`/brands/${brand.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      View all {brand} <ArrowRight className="ml-1 inline h-3 w-3" />
                    </Link>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {machines.slice(0, 12).map((machine) => {
                      const slug = generateMachineSlug(
                        machine.brand,
                        machine.model_name
                      );
                      return (
                        <Link key={machine._id.$oid} href={`/machines/${slug}`}>
                          <Card className="card-hover h-full">
                            <CardContent className="p-4">
                              <p className="font-model font-semibold">
                                {machine.model_name}
                              </p>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {machine.equipment_type || "Compact Equipment"}
                              </p>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                  {machines.length > 12 && (
                    <div className="mt-4">
                      <Button variant="outline" size="sm" asChild>
                        <Link
                          href={`/brands/${brand.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          View all {machines.length} {brand} models
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* Other Brands */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold">Other Brands</h3>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Object.entries(groupedMachines)
                .filter(
                  ([brand]) =>
                    !FEATURED_BRANDS.some(
                      (fb) => fb.toLowerCase() === brand.toLowerCase()
                    )
                )
                .map(([brand, machines]) => (
                  <Link
                    key={brand}
                    href={`/brands/${brand.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <Card className="card-hover">
                      <CardContent className="flex items-center justify-between p-4">
                        <div>
                          <p className="font-semibold">{brand}</p>
                          <p className="text-sm text-muted-foreground">
                            {machines.length} models
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
