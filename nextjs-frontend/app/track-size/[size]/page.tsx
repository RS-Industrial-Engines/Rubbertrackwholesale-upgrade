import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getTrackSizes,
  getCompatibilityByTrackSize,
  getProducts,
  parseTrackSize,
  TrackSize,
  MachineModel,
} from "@/lib/api";
import { TrackSizeDetailContent } from "@/components/track-sizes/track-size-detail-content";
import { generateBreadcrumbSchema, generateFAQPageSchema, generateTrackSizeSchema, getSiteUrl } from "@/lib/schema";
import {
  trackSizes as fallbackTrackSizesData,
} from "@/lib/data/machine-models";
import { getMachinesForTrackSize } from "@/lib/data/full-machine-data";
import { normalizeTrackSize } from "@/lib/url-utils";

const SITE_URL = getSiteUrl();

interface PageProps {
  params: Promise<{ size: string }>;
}

// Get fallback track size data
function getFallbackTrackSizeData(size: string): TrackSize | null {
  const normalizedSize = size.toLowerCase().replace(/\s+/g, "").replace(/-/g, "x");
  const found = fallbackTrackSizesData.find(
    (ts) => ts.size.toLowerCase().replace(/\s+/g, "") === normalizedSize
  );
  
  if (!found) return null;
  
  return {
    id: 1,
    size: found.size,
    width: found.width,
    pitch: found.pitch,
    links: found.links,
    is_in_stock: true,
  };
}

// Get fallback compatible machines using full-machine-data with normalized comparison
function getFallbackCompatibleMachines(size: string): MachineModel[] {
  const normalizedSize = normalizeTrackSize(size);
  const machines = getMachinesForTrackSize(normalizedSize);
  return machines.map((m, i) => ({
    id: i + 1,
    make: m.brand,
    model: m.model,
    equipment_type: "Compact Track Loader",
  }));
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
      canonical: `${SITE_URL}/track-size/${size}`,
    },
  };
}

export async function generateStaticParams() {
  try {
    const trackSizes = await getTrackSizes();
    if (trackSizes && trackSizes.length > 0) {
      return trackSizes.slice(0, 50).map((track) => ({
        size: track.size.toLowerCase().replace(/\s+/g, "-"),
      }));
    }
  } catch {
    // Fall back to local data
  }
  
  // Generate from fallback data
  return fallbackTrackSizesData.slice(0, 50).map((track) => ({
    size: track.size.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export default async function TrackSizeDetailPage({ params }: PageProps) {
  const { size } = await params;
  const formattedSize = size.replace(/-/g, "x");
  const displaySize = formattedSize.toUpperCase();

  // Parse dimensions
  const dimensions = parseTrackSize(formattedSize);

  let trackSizeData: TrackSize | null = null;
  let compatibleMachines: MachineModel[] = [];
  let products: Awaited<ReturnType<typeof getProducts>> = [];

  try {
    const apiTrackSizes = await getTrackSizes();
    const found = apiTrackSizes?.find(
      (t) => t.size.toLowerCase().replace(/\s+/g, "") === formattedSize.toLowerCase().replace(/\s+/g, "")
    );
    
    trackSizeData = found || getFallbackTrackSizeData(formattedSize);

    const [apiCompatibleMachines, apiProducts] = await Promise.all([
      getCompatibilityByTrackSize(formattedSize).catch(() => []),
      getProducts({ track_size: formattedSize }).catch(() => []),
    ]);
    
    compatibleMachines = apiCompatibleMachines && apiCompatibleMachines.length > 0
      ? apiCompatibleMachines
      : getFallbackCompatibleMachines(formattedSize);
    products = apiProducts || [];
  } catch (error) {
    console.error("Failed to fetch track size data, using fallback:", error);
    trackSizeData = getFallbackTrackSizeData(formattedSize);
    compatibleMachines = getFallbackCompatibleMachines(formattedSize);
  }

  // Allow page to render even without exact track size data if dimensions can be parsed
  if (!trackSizeData && !dimensions) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Track Sizes", url: `${SITE_URL}/track-size` },
    { name: displaySize, url: `${SITE_URL}/track-size/${size}` },
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
          __html: JSON.stringify(generateTrackSizeSchema(displaySize, compatibleMachines)),
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
