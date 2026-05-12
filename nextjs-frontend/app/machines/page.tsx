import { Metadata } from "next";
import { getMachineModels, getMachineModelBrands, MachineModel } from "@/lib/api";
import { MachinesContent } from "@/components/machines/machines-content";
import { generateBreadcrumbSchema, generateItemListSchema } from "@/lib/schema";

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

export default async function MachinesPage() {
  let machines: MachineModel[] = [];
  let brands: string[] = [];

  try {
    [machines, brands] = await Promise.all([
      getMachineModels(),
      getMachineModelBrands(),
    ]);
  } catch (error) {
    console.error("Failed to fetch machines:", error);
  }

  const breadcrumbs = [
    { name: "Home", url: "https://rubbertrackwholesale.com" },
    { name: "Machines", url: "https://rubbertrackwholesale.com/machines" },
  ];

  const machineListItems = machines.slice(0, 50).map((machine, index) => ({
    name: `${machine.make} ${machine.model}`,
    url: `https://rubbertrackwholesale.com/machines/${machine.make?.toLowerCase().replace(/\s+/g, "-")}-${machine.model?.toLowerCase().replace(/\s+/g, "-")}`,
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
