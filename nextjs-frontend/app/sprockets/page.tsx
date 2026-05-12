import { Metadata } from "next";
import { getProducts, getMachineModelBrands } from "@/lib/api";
import { CategoryPageContent } from "@/components/categories/category-page-content";
import {
  generateBreadcrumbSchema,
  generateProductCollectionSchema,
  generateFAQPageSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Sprockets | Drive Sprockets | Undercarriage Parts | Houston TX",
  description:
    "Shop drive sprockets for mini excavators, skid steers, and CTLs. Wholesale prices on sprockets for Kubota, Cat, Bobcat, John Deere. Houston warehouse.",
  keywords: [
    "sprockets",
    "drive sprockets",
    "track sprockets",
    "undercarriage sprockets",
    "Kubota sprockets",
    "Cat sprockets",
    "excavator sprockets",
  ],
  openGraph: {
    title: "Sprockets | Rubber Track Wholesale",
    description:
      "Premium drive sprockets for all major equipment brands. Wholesale prices from Houston.",
    type: "website",
  },
};

export default async function SprocketsPage() {
  let products = [];
  let brands: string[] = [];

  try {
    [products, brands] = await Promise.all([
      getProducts({ category: "sprockets" }),
      getMachineModelBrands(),
    ]);
  } catch (error) {
    console.error("Failed to fetch sprockets:", error);
  }

  const breadcrumbs = [
    { name: "Home", url: "https://rubbertrackwholesale.com" },
    { name: "Sprockets", url: "https://rubbertrackwholesale.com/sprockets" },
  ];

  const faqs = [
    {
      question: "What do sprockets do?",
      answer:
        "Drive sprockets transfer power from the final drive to the track, propelling your machine. They engage with the track's drive lugs and are critical for proper track function.",
    },
    {
      question: "When should I replace my sprockets?",
      answer:
        "Replace sprockets when teeth show significant wear, hooking, or damage. Worn sprockets accelerate track wear and can cause track slippage. Inspect sprockets whenever replacing tracks.",
    },
    {
      question: "Should I replace sprockets when I replace tracks?",
      answer:
        "It's recommended to inspect sprockets when replacing tracks. Worn sprockets can damage new tracks quickly. If sprockets show wear, replacing both together is cost-effective.",
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
            generateProductCollectionSchema(products, "Sprockets")
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
        title="Sprockets"
        subtitle="Drive Components"
        description="Premium drive sprockets at wholesale prices. Essential undercarriage components for all major equipment brands."
        categorySlug="sprockets"
        products={products}
        brands={brands}
        faqs={faqs}
        seoContent={{
          heading: "Wholesale Drive Sprockets - Houston & Nationwide",
          paragraphs: [
            "Drive sprockets are critical components that transfer power to your rubber tracks. At Rubber Track Wholesale, we stock premium sprockets for all major mini excavators, skid steers, and compact track loaders.",
            "Our sprockets are manufactured to OEM specifications with hardened teeth for extended service life. We stock sprockets for Kubota, Caterpillar, Bobcat, John Deere, and all major brands at our Houston warehouse.",
            "For best results, inspect and replace sprockets when installing new tracks. Worn sprockets can significantly reduce the life of new rubber tracks.",
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
