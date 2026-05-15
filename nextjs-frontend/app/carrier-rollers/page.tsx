import { Metadata } from "next";
import { UndercarriageCategoryPageContent } from "@/components/undercarriage/undercarriage-category-page-content";
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  getSiteUrl,
} from "@/lib/schema";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Carrier Rollers | Top Rollers | Undercarriage Parts | Houston TX",
  description:
    "Find replacement carrier rollers (top rollers) for your excavator or dozer. Browse by machine make and model. Wholesale prices from Houston warehouse with fast nationwide shipping.",
  keywords: [
    "carrier rollers",
    "top rollers",
    "return rollers",
    "upper rollers",
    "excavator carrier rollers",
    "dozer carrier rollers",
    "Komatsu carrier rollers",
    "Cat carrier rollers",
  ],
  alternates: {
    canonical: `${SITE_URL}/carrier-rollers`,
  },
  openGraph: {
    title: "Carrier Rollers | Rubber Track Wholesale",
    description:
      "Premium carrier rollers (top rollers) for excavators and dozers. Wholesale prices from Houston.",
    type: "website",
    url: `${SITE_URL}/carrier-rollers`,
  },
};

const faqs = [
  {
    question: "What are carrier rollers?",
    answer:
      "Carrier rollers (also called top rollers or return rollers) support the upper portion of the track as it returns from the front idler to the sprocket. They prevent the track from sagging and help maintain proper track tension.",
  },
  {
    question: "Does my machine have carrier rollers?",
    answer:
      "Not all machines have carrier rollers. They are typically found on larger excavators (20+ tons) and bulldozers. Most compact track loaders and mini excavators do not use carrier rollers - their tracks are supported differently.",
  },
  {
    question: "How do I know if my carrier rollers need replacement?",
    answer:
      "Signs of worn carrier rollers include excessive track sag on the top of the undercarriage, track slapping or bouncing during travel, visible wear or flat spots on the roller, seized or non-rotating rollers, and track derailment issues.",
  },
  {
    question: "Do you carry carrier rollers for my machine?",
    answer:
      "We stock carrier rollers for large excavators and dozers from CAT, Komatsu, Hitachi, Kobelco, John Deere, Volvo, and other major manufacturers. Use the search above or browse by brand to find your machine.",
  },
  {
    question: "How many carrier rollers does my machine have?",
    answer:
      "The number of carrier rollers varies by machine size. Most machines with carrier rollers have 1-2 per side. Larger machines may have more. Contact us with your machine model for exact specifications.",
  },
];

const seoContent = {
  heading: "Wholesale Carrier Rollers - Houston & Nationwide",
  paragraphs: [
    "Carrier rollers (top rollers) are essential undercarriage components found on larger tracked equipment. They support the upper track strand and prevent sagging that can cause track damage and derailment.",
    "Our Houston warehouse stocks carrier rollers for large excavators and dozers from CAT, Komatsu, Hitachi, Kobelco, John Deere, Volvo, and other major manufacturers. We offer OEM-quality aftermarket rollers at wholesale prices.",
    "Note: Most compact track loaders and mini excavators do not use carrier rollers. If you have a CTL or mini excavator, check our bottom rollers, sprockets, and idlers pages for the undercarriage parts you need.",
  ],
};

export default function CarrierRollersPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Carrier Rollers", url: `${SITE_URL}/carrier-rollers` },
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
        componentType="carrier-roller"
        faqs={faqs}
        seoContent={seoContent}
      />
    </>
  );
}
