import { Metadata } from "next";
import { getProducts, getCategories, getMachineModelBrands, Product } from "@/lib/api";
import { CategoryPageContent } from "@/components/categories/category-page-content";
import {
  generateBreadcrumbSchema,
  generateProductCollectionSchema,
  generateFAQPageSchema,
  getSiteUrl,
} from "@/lib/schema";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Rubber Tracks | Wholesale Prices | Houston TX | Nationwide Shipping",
  description:
    "Shop premium rubber tracks at wholesale prices. Skid steer tracks, mini excavator tracks, CTL tracks. In stock at our Houston warehouse. Fast nationwide shipping.",
  keywords: [
    "rubber tracks",
    "rubber tracks Houston",
    "Houston rubber tracks",
    "rubber tracks near me",
    "skid steer rubber tracks",
    "mini excavator rubber tracks",
    "CTL rubber tracks",
    "compact track loader tracks",
    "wholesale rubber tracks",
    "buy rubber tracks",
  ],
  openGraph: {
    title: "Rubber Tracks | Wholesale Prices | Rubber Track Wholesale",
    description:
      "Premium rubber tracks for skid steers, mini excavators, and CTLs. Wholesale prices from Houston warehouse.",
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/rubber-tracks`,
  },
};

export default async function RubberTracksPage() {
  let products: Product[] = [];
  let brands: string[] = [];

  try {
    [products, brands] = await Promise.all([
      getProducts({ category: "rubber-tracks" }),
      getMachineModelBrands(),
    ]);
  } catch (error) {
    console.error("Failed to fetch rubber tracks:", error);
  }

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Rubber Tracks", url: `${SITE_URL}/rubber-tracks` },
  ];

  const faqs = [
    {
      question: "How much do rubber tracks cost?",
      answer:
        "Rubber track prices vary based on size, quality, and machine compatibility. Our wholesale prices are typically 30-50% below retail. Contact us for a quote on your specific track size.",
    },
    {
      question: "How long do rubber tracks last?",
      answer:
        "With proper use and maintenance, quality rubber tracks typically last 1,200-2,000 hours. Factors affecting track life include terrain, operating conditions, and maintenance practices.",
    },
    {
      question: "Do you ship rubber tracks nationwide?",
      answer:
        "Yes! We ship rubber tracks from our Houston warehouse to all 50 states. Most orders ship same-day with delivery in 2-5 business days.",
    },
    {
      question: "What brands of rubber tracks do you carry?",
      answer:
        "We stock rubber tracks compatible with all major equipment brands including Kubota, Caterpillar, Bobcat, John Deere, Takeuchi, Case, Hitachi, and many more.",
    },
    {
      question: "Are your rubber tracks OEM quality?",
      answer:
        "Our premium aftermarket rubber tracks meet or exceed OEM specifications. They feature continuous steel cord construction and high-quality rubber compounds for maximum durability.",
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
            generateProductCollectionSchema(products, "Rubber Tracks")
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
        title="Rubber Tracks"
        subtitle="Houston's Premier Rubber Track Supplier"
        description="Shop premium rubber tracks at wholesale prices. We stock tracks for all major brands including Kubota, Cat, Bobcat, John Deere, and more. Fast shipping from our Houston warehouse."
        categorySlug="rubber-tracks"
        products={products}
        brands={brands}
        faqs={faqs}
        seoContent={{
          heading: "Wholesale Rubber Tracks - Houston & Nationwide",
          paragraphs: [
            "Rubber Track Wholesale is Houston's leading supplier of premium rubber tracks for construction equipment. Whether you're operating a mini excavator, skid steer, or compact track loader, we have the tracks you need at wholesale prices.",
            "Our Houston warehouse maintains extensive inventory of rubber tracks in all popular sizes. From 300x52.5x80 for mini excavators to 450x86x56 for large CTLs, we stock the tracks you need for Kubota, Caterpillar, Bobcat, John Deere, Takeuchi, and all major brands.",
            "Why pay retail when you can get wholesale pricing? Our direct relationships with manufacturers mean we can offer premium quality rubber tracks at 30-50% below typical retail prices. Plus, with our Houston warehouse location, we can ship to contractors and equipment dealers across Texas and nationwide with fast delivery.",
          ],
        }}
        popularMachines={[
          { name: "Kubota SVL75", slug: "kubota-svl75" },
          { name: "Kubota SVL95", slug: "kubota-svl95" },
          { name: "Cat 259D", slug: "cat-259d" },
          { name: "Cat 289D", slug: "cat-289d" },
          { name: "Bobcat T650", slug: "bobcat-t650" },
          { name: "John Deere 333G", slug: "john-deere-333g" },
          { name: "Takeuchi TL12", slug: "takeuchi-tl12" },
          { name: "Case TR320", slug: "case-tr320" },
        ]}
        popularSizes={[
          "400x86x52",
          "450x86x56",
          "300x52.5x80",
          "320x86x52",
          "400x72.5x72",
        ]}
      />
    </>
  );
}
