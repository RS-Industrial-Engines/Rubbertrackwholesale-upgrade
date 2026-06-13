import type { Metadata } from "next";
import { FAQContent } from "@/components/faqs/faq-content";
import { generateBreadcrumbSchema, generateFAQPageSchema, getSiteUrl } from "@/lib/schema";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "FAQs | Rubber Track Wholesale",
  description:
    "Find answers to frequently asked questions about rubber tracks, track sizing, shipping, warranty, and more. Expert guidance from Houston's leading rubber track supplier.",
  keywords: [
    "rubber track FAQ",
    "rubber track questions",
    "how to measure rubber tracks",
    "rubber track sizing",
    "track compatibility",
  ],
  openGraph: {
    title: "Frequently Asked Questions | Rubber Track Wholesale",
    description:
      "Get answers to common questions about rubber tracks, sizing, shipping, and warranty.",
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/faqs`,
  },
};

// Fallback FAQs for schema generation (server-side)
const faqsForSchema = [
  {
    question: "How do I know what rubber track size fits my machine?",
    answer:
      "The easiest way is to search by your machine's make and model on our website. You can also measure your existing track: measure the width (in mm), count the number of links, and measure the pitch (distance between link centers).",
  },
  {
    question: "Can one machine have more than one compatible track size?",
    answer:
      "Yes, some machines can use multiple track sizes. For example, the Kubota SVL75 can use both 400x72.5x72 and 400x72.5x74 tracks. We list all compatible options on each machine page.",
  },
  {
    question: "Do you sell rubber tracks for Kubota SVL75 and SVL95?",
    answer:
      "Yes! We carry rubber tracks for all Kubota SVL series models including SVL65, SVL75, SVL75-2, SVL75-3, SVL90, SVL95, SVL95-2S, SVL97, and more.",
  },
  {
    question: "Do you ship nationwide?",
    answer:
      "Yes, we ship to all 50 states from our Houston warehouse. Most orders ship same-day if placed before 2PM CST. Fast nationwide shipping, and same-day pickup for local Houston customers.",
  },
  {
    question: "Do you offer local pickup in Houston?",
    answer:
      "Yes! Our warehouse is in Houston, TX and we offer free local pickup. Call to confirm availability and schedule pickup.",
  },
  {
    question: "What warranty do you offer on rubber tracks?",
    answer:
      "All our rubber tracks come with a 1-year warranty against manufacturing defects. Undercarriage parts carry a 6-month warranty.",
  },
];

export default function FAQPage() {
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "FAQs", url: `${SITE_URL}/faqs` },
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
          __html: JSON.stringify(generateFAQPageSchema(faqsForSchema)),
        }}
      />
      <FAQContent />
    </>
  );
}
