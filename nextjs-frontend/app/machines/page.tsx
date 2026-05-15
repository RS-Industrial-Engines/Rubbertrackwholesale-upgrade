import { Metadata } from "next";
import type { MachineModel } from "@/lib/api";
import { MachinesContent } from "@/components/machines/machines-content";
import { generateBreadcrumbSchema, generateItemListSchema, getSiteUrl } from "@/lib/schema";
import {
  fullMachineModels,
  fullMachineCompatibility,
  fullBrands,
  popularBrands,
} from "@/lib/data/full-machine-data";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Machines - Find Rubber Tracks by Equipment Model",
  description:
    "Find compatible rubber tracks and undercarriage parts for your machine. Browse by Kubota, Cat, Bobcat, John Deere, Takeuchi, and more. Houston warehouse with nationwide shipping.",
  keywords: [
    "rubber tracks by machine",
    "Kubota rubber tracks",
    "Cat rubber tracks",
    "Bobcat rubber tracks",
    "John Deere rubber tracks",
    "skid steer tracks",
    "mini excavator tracks",
    "compact track loader tracks",
  ],
  openGraph: {
    title: "Find Rubber Tracks by Machine Model | Rubber Track Wholesale",
    description:
      "Search by your machine make and model to find compatible rubber tracks. All major brands in stock.",
    type: "website",
  },
};

// Convert full data to MachineModel format
function getFullMachines(): MachineModel[] {
  const machines: MachineModel[] = [];
  let id = 1;

  for (const [brand, models] of Object.entries(fullMachineModels)) {
    for (const model of models) {
      const key = `${brand}|${model}`;
      const trackSizes = fullMachineCompatibility[key] || [];
      machines.push({
        id: id++,
        make: brand,
        model: model,
        equipment_type: "Compact Track Loader",
        track_sizes: trackSizes,
      });
    }
  }

  return machines;
}

// Get brands sorted with popular brands first
function getSortedBrands(): string[] {
  const popular = popularBrands.filter(b => fullBrands.includes(b));
  const other = fullBrands.filter(b => !popularBrands.includes(b));
  return [...popular, ...other];
}

export default async function MachinesPage() {
  // ALWAYS use full-machine-data.ts as PRIMARY source
  // It has complete 4,631-machine data that API may not have
  const machines: MachineModel[] = getFullMachines();
  const brands: string[] = getSortedBrands();

  // Note: API data is NOT used here - it may be incomplete
  // full-machine-data.ts is the authoritative source

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Machines", url: `${SITE_URL}/machines` },
  ];

  const machineListItems = machines.slice(0, 50).map((machine, index) => ({
    name: `${machine.make} ${machine.model}`,
    url: `${SITE_URL}/machines/${machine.make?.toLowerCase().replace(/\s+/g, "-")}-${machine.model?.toLowerCase().replace(/\s+/g, "-")}`,
    position: index + 1,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateItemListSchema(machineListItems, "Compatible Machines for Rubber Tracks")
          ),
        }}
      />
      <MachinesContent machines={machines} brands={brands} />
    </>
  );
}
