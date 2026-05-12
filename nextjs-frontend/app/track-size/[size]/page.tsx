import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getTrackSizes,
  getCompatibilityByTrackSize,
  getProducts,
  parseTrackSize,
} from "@/lib/api";
import { TrackSizeDetailContent } from "@/components/track-sizes/track-size-detail-content";
import { generateBreadcrumbSchema, generateFAQPageSchema } from "@/lib/schema";

interface PageProps {
  params: Promise<{ size: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { size } = await params;
  const formattedSize = size.replace(/-/g, "x").toUpperCase();

  const title = `${formattedSize} Rubber Tracks | Wholesale Prices | Houston TX`;
  const description = `Buy ${formattedSize} rubber tracks at wholesale prices. Compatible with multiple machines. In stock at Houston warehouse with fast nationwide shipping.`;

  return {
    title,
    description,
    keywords: [
      `${formattedSize} rubber tracks`,
      `${formattedSize} tracks`,
      `${formattedSize} replacement tracks`,
      `rubber tracks ${formattedSize}`,
      `buy ${formattedSize} tracks`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
    },
    alternates: {
      canonical: `https://rubbertrackwholesale.com/track-size/${size}`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const trackSizes = await getTrackSizes();
    return trackSizes.slice(0, 50).map((track) => ({
      size: track.size.toLowerCase().replace(/\s+/g, "-"),
    }));
  } catch {
    return [];
  }
}

export default async function TrackSizeDetailPage({ params }: PageProps) {
  const { size } = await params;
  const formattedSize = size.replace(/-/g, "x");
  const displaySize = formattedSize.toUpperCase();

  // Parse dimensions
  const dimensions = parseTrackSize(formattedSize);

  let trackSizeData = null;
  let compatibleMachines: Awaited<ReturnType<typeof getCompatibilityByTrackSize>> = [];
  let products: Awaited<ReturnType<typeof getProducts>> = [];

  try {
    const trackSizes = await getTrackSizes();
    trackSizeData = trackSizes.find(
      (t) => t.size.toLowerCase().replace(/\s+/g, "") === formattedSize.toLowerCase().replace(/\s+/g, "")
    );

    [compatibleMachines, products] = await Promise.all([
      getCompatibilityByTrackSize(formattedSize).catch(() => []),
      getProducts({ track_size: formattedSize }).catch(() => []),
    ]);
  } catch (error) {
    console.error("Failed to fetch track size data:", error);
  }

  if (!trackSizeData && !dimensions) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: "https://rubbertrackwholesale.com" },
    { name: "Track Sizes", url: "https://rubbertrackwholesale.com/track-size" },
    { name: displaySize, url: `https://rubbertrackwholesale.com/track-size/${size}` },
  ];

  const faqs = [
    {
      question: `What machines use ${displaySize} rubber tracks?`,
      answer:
        compatibleMachines.length > 0
          ? `${displaySize} rubber tracks are compatible with ${compatibleMachines.slice(0, 5).map((m) => `${m.make} ${m.model}`).join(", ")}${compatibleMachines.length > 5 ? `, and ${compatibleMachines.length - 5} more machines` : ""}.`
          : `${displaySize} tracks are compatible with various mini excavators and compact track loaders. Contact us for a complete compatibility list.`,
    },
    {
      question: `How much do ${displaySize} rubber tracks cost?`,
      answer: `${displaySize} rubber track prices depend on quality and brand. We offer premium aftermarket tracks at 30-50% below OEM prices. Request a quote for current wholesale pricing.`,
    },
    {
      question: `Are ${displaySize} rubber tracks in stock?`,
      answer: `Yes, we maintain ${displaySize} rubber tracks in stock at our Houston warehouse. Most orders ship same-day with 2-5 day delivery nationwide.`,
    },
    {
      question: `What is the warranty on ${displaySize} rubber tracks?`,
      answer: `Our ${displaySize} rubber tracks come with manufacturer warranty coverage. Contact us for specific warranty details on your order.`,
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
          __html: JSON.stringify(generateFAQPageSchema(faqs)),
        }}
      />
      <TrackSizeDetailContent
        size={displaySize}
        slug={size}
        trackSizeData={trackSizeData}
        dimensions={dimensions}
        compatibleMachines={compatibleMachines}
        products={products}
        faqs={faqs}
      />
    </>
  );
}
