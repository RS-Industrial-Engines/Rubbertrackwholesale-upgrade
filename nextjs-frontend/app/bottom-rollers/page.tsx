import { Metadata } from "next";
import { getProducts, getMachineModelBrands, Product } from "@/lib/api";
import { CategoryPageContent } from "@/components/categories/category-page-content";
import {
  generateBreadcrumbSchema,
  generateProductCollectionSchema,
  generateFAQPageSchema,
  getSiteUrl,
} from "@/lib/schema";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Bottom Rollers | Undercarriage Parts | Houston TX",
  description:
    "Shop bottom rollers for mini excavators, skid steers, and CTLs. Wholesale prices on track rollers for Kubota, Cat, Bobcat, John Deere. Fast shipping from Houston.",
  keywords: [
    "bottom rollers",
    "track rollers",
    "undercarriage rollers",
    "excavator bottom rollers",
    "skid steer rollers",
    "Kubota bottom rollers",
    "Cat bottom rollers",
  ],
  openGraph: {
    title: "Bottom Rollers | Rubber Track Wholesale",
    description:
      "Premium bottom rollers for all major equipment brands. Wholesale prices from Houston.",
    type: "website",
  },
};

export default async function BottomRollersPage() {
  let products: Product[] = [];
  let brands: string[] = [];

  try {
    [products, brands] = await Promise.all([
      getProducts({ category: "bottom-rollers" }),
      getMachineModelBrands(),
    ]);
  } catch (error) {
    console.error("Failed to fetch bottom rollers:", error);
  }

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Bottom Rollers", url: `${SITE_URL}/bottom-rollers` },
  ];

  const faqs = [
    {
      question: "What are bottom rollers?",
      answer:
        "Bottom rollers (also called track rollers) support the weight of your machine and guide the track along the undercarriage. They're critical components that wear over time and need periodic replacement.",
    },
    {
      question: "How do I know when to replace bottom rollers?",
      answer:
        "Signs of worn bottom rollers include track wobbling, unusual noise, visible wear on the roller surface, and oil leaks from the seals. Regular inspection helps catch issues early.",
    },
    {
      question: "Do you have bottom rollers for my machine?",
      answer:
        "We stock bottom rollers for all major brands including Kubota, Caterpillar, Bobcat, John Deere, Takeuchi, Case, and more. Contact us with your machine model for availability.",
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
            generateProductCollectionSchema(products, "Bottom Rollers")
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
        title="Bottom Rollers"
        subtitle="Undercarriage Components"
        description="Premium bottom rollers at wholesale prices. Keep your machine running smooth with quality track rollers for all major equipment brands."
        categorySlug="bottom-rollers"
        products={products}
        brands={brands}
        faqs={faqs}
        seoContent={{
          heading: "Wholesale Bottom Rollers - Houston & Nationwide",
          paragraphs: [
            "Bottom rollers are essential undercarriage components that support your machine's weight and guide the track. At Rubber Track Wholesale, we stock premium bottom rollers for mini excavators, skid steers, and compact track loaders.",
            "Our Houston warehouse maintains inventory of bottom rollers for Kubota, Caterpillar, Bobcat, John Deere, Takeuchi, and all major brands. We offer OEM-quality aftermarket rollers at wholesale prices.",
            "Whether you need single or double flange rollers, we have the parts you need. All our bottom rollers feature high-quality seals and precision bearings for long service life.",
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
