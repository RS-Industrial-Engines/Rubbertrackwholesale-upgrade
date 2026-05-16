import { Metadata } from "next";
import { UndercarriageCategoryPageContent } from "@/components/undercarriage/undercarriage-category-page-content";
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  getSiteUrl,
} from "@/lib/schema";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Bottom Rollers | Undercarriage Parts | Houston TX",
  description:
    "Find replacement bottom rollers for your mini excavator, skid steer, or CTL. Browse by machine make and model. Wholesale prices from Houston warehouse with fast nationwide shipping.",
  keywords: [
    "bottom rollers",
    "track rollers",
    "undercarriage rollers",
    "excavator bottom rollers",
    "skid steer rollers",
    "Kubota bottom rollers",
    "Cat bottom rollers",
    "Bobcat bottom rollers",
  ],
  alternates: {
    canonical: `${SITE_URL}/bottom-rollers`,
  },
  openGraph: {
    title: "Bottom Rollers | Rubber Track Wholesale",
    description:
      "Premium bottom rollers for all major equipment brands. Wholesale prices from Houston.",
    type: "website",
    url: `${SITE_URL}/bottom-rollers`,
  },
};

const faqs = [
  {
    question: "What are bottom rollers?",
    answer:
      "Bottom rollers (also called track rollers or lower rollers) support the weight of your machine and guide the track along the undercarriage. They roll along the inside of the track, keeping it properly aligned and reducing friction during operation.",
  },
  {
    question: "How do I know when to replace bottom rollers?",
    answer:
      "Signs of worn bottom rollers include track wobbling, unusual noise or grinding sounds, visible wear or flat spots on the roller surface, oil leaks from the seals, and track coming off or poor tracking. Regular inspection helps catch issues early.",
  },
  {
    question: "Do you have bottom rollers for my machine?",
    answer:
      "We stock bottom rollers for all major brands including Kubota, Caterpillar, Bobcat, John Deere, Takeuchi, CASE, Komatsu, Hitachi, and more. Use the search above or browse by brand to find your machine.",
  },
  {
    question: "How many bottom rollers does my machine have?",
    answer:
      "The number of bottom rollers varies by machine size and model. Mini excavators typically have 4-6 bottom rollers, while compact track loaders may have 6-8. Contact us with your machine model for exact specifications.",
  },
  {
    question: "What's the difference between single and double flange rollers?",
    answer:
      "Single flange rollers have a guide flange on one side, while double flange rollers have flanges on both sides. The type needed depends on your machine's track design. We can help identify the correct style for your machine.",
  },
];

const seoContent = {
  heading: "Wholesale Bottom Rollers - Houston & Nationwide",
  paragraphs: [
    "Bottom rollers are essential undercarriage components that support your machine's weight and guide the track. At Rubber Track Wholesale, we stock premium bottom rollers for mini excavators, skid steers, and compact track loaders from all major manufacturers.",
    "Our Houston warehouse maintains inventory of bottom rollers for Kubota, Caterpillar, Bobcat, John Deere, Takeuchi, CASE, Komatsu, Hitachi, Kobelco, and many other brands. We offer OEM-quality aftermarket rollers at wholesale prices.",
    "Whether you need single flange, double flange, or heavy-duty rollers, we have the parts you need. All our bottom rollers feature high-quality seals and precision bearings for long service life in demanding conditions.",
  ],
};

export default function BottomRollersPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Bottom Rollers", url: `${SITE_URL}/bottom-rollers` },
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
          __html: JSON.stringify(generateFAQPageSchema(faqs)),
        }}
      />
      <UndercarriageCategoryPageContent
        componentType="bottom-roller"
        faqs={faqs}
        seoContent={seoContent}
      />
    </>
  );
}
