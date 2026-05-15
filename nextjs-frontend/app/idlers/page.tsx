import { Metadata } from "next";
import { UndercarriageCategoryPageContent } from "@/components/undercarriage/undercarriage-category-page-content";
import {
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  getSiteUrl,
} from "@/lib/schema";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Idlers | Front Idlers | Undercarriage Parts | Houston TX",
  description:
    "Find replacement front idlers for your mini excavator, skid steer, or CTL. Browse by machine make and model. Wholesale prices from Houston warehouse with fast nationwide shipping.",
  keywords: [
    "idlers",
    "front idlers",
    "track idlers",
    "undercarriage idlers",
    "Kubota idlers",
    "Cat idlers",
    "excavator idlers",
    "Bobcat idlers",
  ],
  alternates: {
    canonical: `${SITE_URL}/idlers`,
  },
  openGraph: {
    title: "Idlers | Rubber Track Wholesale",
    description:
      "Premium front idlers for all major equipment brands. Wholesale prices from Houston.",
    type: "website",
    url: `${SITE_URL}/idlers`,
  },
};

const faqs = [
  {
    question: "What is a front idler?",
    answer:
      "The front idler (also called track idler) guides the track around the front of the undercarriage and helps maintain proper track tension. It works with the track adjuster to keep the track at the correct tension and absorbs impact from terrain and debris.",
  },
  {
    question: "How do I know if my idler needs replacement?",
    answer:
      "Signs of a worn idler include track wandering or coming off, unusual wear patterns on the idler surface, bearing noise or grinding, oil leaks from seals, excessive track slack even after adjustment, and wobbling during operation.",
  },
  {
    question: "Do you carry idlers for my machine?",
    answer:
      "We stock front idlers for all major brands including Kubota, Caterpillar, Bobcat, John Deere, Takeuchi, CASE, Komatsu, Hitachi, and more. Use the search above or browse by brand to find your machine.",
  },
  {
    question: "What causes idler failure?",
    answer:
      "Idler failure is commonly caused by seal damage allowing contamination, excessive track tension, impact damage from debris, normal bearing wear, and operating in harsh conditions. Regular inspection and proper track tension help extend idler life.",
  },
  {
    question: "Can I replace just the idler bearings?",
    answer:
      "In some cases idler bearings can be replaced separately, but complete idler assemblies are often more cost-effective and ensure proper seal integrity. Contact us with your machine details to discuss the best option.",
  },
];

const seoContent = {
  heading: "Wholesale Front Idlers - Houston & Nationwide",
  paragraphs: [
    "Front idlers are essential for proper track tension and alignment. At Rubber Track Wholesale, we stock premium idlers for mini excavators, skid steers, and compact track loaders from all major manufacturers.",
    "Our idlers feature precision bearings and high-quality seals for long service life in demanding conditions. We stock idlers for Kubota, Caterpillar, Bobcat, John Deere, Takeuchi, CASE, Komatsu, and all major brands at our Houston warehouse.",
    "A properly functioning idler is critical for track life and machine performance. Worn or damaged idlers can cause premature track wear, track derailment, and alignment issues that affect productivity.",
  ],
};

export default function IdlersPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Idlers", url: `${SITE_URL}/idlers` },
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
        componentType="idler"
        faqs={faqs}
        seoContent={seoContent}
      />
    </>
  );
}
