import { Metadata } from "next";
import { getProducts, getMachineModelBrands } from "@/lib/api";
import { CategoryPageContent } from "@/components/categories/category-page-content";
import {
  generateBreadcrumbSchema,
  generateProductCollectionSchema,
  generateFAQPageSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "Idlers | Front Idlers | Undercarriage Parts | Houston TX",
  description:
    "Shop front idlers for mini excavators, skid steers, and CTLs. Wholesale prices on idlers for Kubota, Cat, Bobcat, John Deere. Fast shipping from Houston.",
  keywords: [
    "idlers",
    "front idlers",
    "track idlers",
    "undercarriage idlers",
    "Kubota idlers",
    "Cat idlers",
    "excavator idlers",
  ],
  openGraph: {
    title: "Idlers | Rubber Track Wholesale",
    description:
      "Premium front idlers for all major equipment brands. Wholesale prices from Houston.",
    type: "website",
  },
};

export default async function IdlersPage() {
  let products = [];
  let brands: string[] = [];

  try {
    [products, brands] = await Promise.all([
      getProducts({ category: "idlers" }),
      getMachineModelBrands(),
    ]);
  } catch (error) {
    console.error("Failed to fetch idlers:", error);
  }

  const breadcrumbs = [
    { name: "Home", url: "https://rubbertrackwholesale.com" },
    { name: "Idlers", url: "https://rubbertrackwholesale.com/idlers" },
  ];

  const faqs = [
    {
      question: "What is a front idler?",
      answer:
        "The front idler guides the track at the front of the undercarriage and maintains proper track tension. It's a critical component that affects track alignment and wear.",
    },
    {
      question: "How do I know if my idler needs replacement?",
      answer:
        "Signs of a worn idler include track misalignment, unusual wear patterns, bearing noise, and oil leaks from seals. Regular inspection during maintenance helps identify issues early.",
    },
    {
      question: "Do you carry idlers for my machine?",
      answer:
        "We stock front idlers for all major brands including Kubota, Caterpillar, Bobcat, John Deere, Takeuchi, and more. Contact us with your machine model for availability and pricing.",
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
            generateProductCollectionSchema(products, "Idlers")
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
        title="Idlers"
        subtitle="Track Guidance Components"
        description="Premium front idlers at wholesale prices. Keep your tracks aligned and running true with quality idlers for all major equipment brands."
        categorySlug="idlers"
        products={products}
        brands={brands}
        faqs={faqs}
        seoContent={{
          heading: "Wholesale Front Idlers - Houston & Nationwide",
          paragraphs: [
            "Front idlers are essential for proper track tension and alignment. At Rubber Track Wholesale, we stock premium idlers for mini excavators, skid steers, and compact track loaders from all major manufacturers.",
            "Our idlers feature precision bearings and high-quality seals for long service life. We stock idlers for Kubota, Caterpillar, Bobcat, John Deere, Takeuchi, and all major brands at our Houston warehouse.",
            "A properly functioning idler is critical for track life and machine performance. Worn or damaged idlers can cause premature track wear and alignment issues.",
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
