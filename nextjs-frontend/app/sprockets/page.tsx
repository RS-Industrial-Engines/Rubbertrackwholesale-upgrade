import { Metadata } from "next";
import { UndercarriageCategoryPageContent } from "@/components/undercarriage/undercarriage-category-page-content";
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  getSiteUrl,
} from "@/lib/schema";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Sprockets | Drive Sprockets | Undercarriage Parts | Houston TX",
  description:
    "Find replacement drive sprockets for your mini excavator, skid steer, or CTL. Browse by machine make and model. Wholesale prices from Houston warehouse with fast nationwide shipping.",
  keywords: [
    "sprockets",
    "drive sprockets",
    "track sprockets",
    "undercarriage sprockets",
    "Kubota sprockets",
    "Cat sprockets",
    "excavator sprockets",
    "Bobcat sprockets",
  ],
  alternates: {
    canonical: `${SITE_URL}/sprockets`,
  },
  openGraph: {
    title: "Sprockets | Rubber Track Wholesale",
    description:
      "Premium drive sprockets for all major equipment brands. Wholesale prices from Houston.",
    type: "website",
    url: `${SITE_URL}/sprockets`,
  },
};

const faqs = [
  {
    question: "What do sprockets do?",
    answer:
      "Drive sprockets transfer power from the final drive motor to the track, propelling your machine forward and backward. They engage with the track's drive lugs (bushings) and are critical for proper track function and movement.",
  },
  {
    question: "When should I replace my sprockets?",
    answer:
      "Replace sprockets when teeth show significant wear, hooking, chips, or damage. Worn sprockets accelerate track wear and can cause track slippage or jumping. Common signs include unusual vibration during travel and visible tooth wear patterns.",
  },
  {
    question: "Should I replace sprockets when I replace tracks?",
    answer:
      "It's strongly recommended to inspect sprockets when replacing tracks. Worn sprockets can damage new tracks quickly, wasting your investment. If sprockets show wear, replacing both together is more cost-effective than premature track failure.",
  },
  {
    question: "Do you have sprockets for my machine?",
    answer:
      "We stock sprockets for all major brands including Kubota, Caterpillar, Bobcat, John Deere, Takeuchi, CASE, Komatsu, Hitachi, and more. Use the search above or browse by brand to find your machine.",
  },
  {
    question: "What causes sprocket wear?",
    answer:
      "Sprocket wear is caused by constant engagement with the track. Factors that accelerate wear include improper track tension, operating in abrasive materials (sand, mud, debris), and misalignment. Regular maintenance and proper tension help extend sprocket life.",
  },
];

const seoContent = {
  heading: "Wholesale Drive Sprockets - Houston & Nationwide",
  paragraphs: [
    "Drive sprockets are critical components that transfer power from your final drive to the rubber tracks. At Rubber Track Wholesale, we stock premium sprockets for all major mini excavators, skid steers, and compact track loaders.",
    "Our sprockets are manufactured to OEM specifications with hardened teeth for extended service life. We stock sprockets for Kubota, Caterpillar, Bobcat, John Deere, Takeuchi, CASE, Komatsu, and all major brands at our Houston warehouse.",
    "For best results, always inspect and consider replacing sprockets when installing new tracks. Worn sprockets with hooked or damaged teeth can significantly reduce the life of new rubber tracks and lead to premature track failure.",
  ],
};

export default function SprocketsPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Sprockets", url: `${SITE_URL}/sprockets` },
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
        componentType="sprocket"
        faqs={faqs}
        seoContent={seoContent}
      />
    </>
  );
}
