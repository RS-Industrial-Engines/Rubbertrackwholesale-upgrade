import { Metadata } from "next";
import { getProducts, getMachineModelBrands, Product } from "@/lib/api";
import { CategoryPageContent } from "@/components/categories/category-page-content";
import {
  generateBreadcrumbSchema,
  generateProductCollectionSchema,
  generateFAQPageSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Final Drives | Travel Motors | Undercarriage Parts | Houston TX",
  description:
    "Shop final drives and travel motors for mini excavators, skid steers, and CTLs. Wholesale prices on final drives for Kubota, Cat, Bobcat. Houston warehouse.",
  keywords: [
    "final drives",
    "travel motors",
    "final drive motors",
    "excavator final drives",
    "skid steer final drives",
    "Kubota final drives",
    "Cat final drives",
  ],
  openGraph: {
    title: "Final Drives | Rubber Track Wholesale",
    description:
      "Premium final drives and travel motors for all major equipment brands. Wholesale prices from Houston.",
    type: "website",
  },
};

export default async function FinalDrivesPage() {
  let products: Product[] = [];
  let brands: string[] = [];

  try {
    [products, brands] = await Promise.all([
      getProducts({ category: "final-drives" }),
      getMachineModelBrands(),
    ]);
  } catch (error) {
    console.error("Failed to fetch final drives:", error);
  }

  const breadcrumbs = [
    { name: "Home", url: "https://rubbertrackwholesale.com" },
    { name: "Final Drives", url: "https://rubbertrackwholesale.com/final-drives" },
  ];

  const faqs = [
    {
      question: "What is a final drive?",
      answer:
        "A final drive (also called travel motor) is the hydraulic motor and gearbox assembly that powers your machine's tracks. It converts hydraulic pressure into mechanical rotation to move your equipment.",
    },
    {
      question: "How long do final drives last?",
      answer:
        "With proper maintenance, final drives can last 5,000-10,000 hours or more. Regular oil changes, seal inspections, and avoiding overheating extend final drive life.",
    },
    {
      question: "Can I rebuild my final drive instead of replacing it?",
      answer:
        "Yes, final drives can often be rebuilt with new seals, bearings, and gears. However, if the housing is damaged or wear is extensive, replacement may be more cost-effective.",
    },
    {
      question: "Do you offer final drive exchange programs?",
      answer:
        "Contact us about our final drive exchange options. We may be able to offer rebuilt units in exchange for your core, reducing your overall cost.",
    },
  ];

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
            generateProductCollectionSchema(products, "Final Drives")
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQPageSchema(faqs)),
        }}
      />
      <CategoryPageContent
        title="Final Drives"
        subtitle="Travel Motors & Drive Units"
        description="Premium final drives and travel motors at wholesale prices. Power your equipment with quality drive units for all major brands."
        categorySlug="final-drives"
        products={products}
        brands={brands}
        faqs={faqs}
        seoContent={{
          heading: "Wholesale Final Drives - Houston & Nationwide",
          paragraphs: [
            "Final drives are the powerhouse of your tracked equipment, converting hydraulic power into movement. At Rubber Track Wholesale, we stock new and rebuilt final drives for mini excavators, skid steers, and compact track loaders.",
            "We carry final drives for Kubota, Caterpillar, Bobcat, John Deere, Takeuchi, and all major brands. Our drives are tested and backed by warranty for your peace of mind.",
            "Whether you need a complete final drive assembly or are looking for rebuild options, contact our team for competitive pricing and availability.",
          ],
        }}
        popularMachines={[
          { name: "Kubota SVL75", slug: "kubota-svl75" },
          { name: "Cat 259D", slug: "cat-259d" },
          { name: "Bobcat T650", slug: "bobcat-t650" },
          { name: "John Deere 333G", slug: "john-deere-333g" },
          { name: "Takeuchi TL12", slug: "takeuchi-tl12" },
          { name: "Case TR320", slug: "case-tr320" },
        ]}
      />
    </>
  );
}
