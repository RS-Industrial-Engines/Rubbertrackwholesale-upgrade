import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  parseTrackSize,
  MachineModel,
} from "@/lib/api";
import { TrackSizeDetailContent } from "@/components/track-sizes/track-size-detail-content";
import { generateBreadcrumbSchema, generateFAQPageSchema, generateTrackSizeSchema, getSiteUrl } from "@/lib/schema";
import { getMachinesForTrackSize, fullTrackSizes } from "@/lib/data/full-machine-data";

const SITE_URL = getSiteUrl();

interface PageProps {
  params: Promise<{ size: string }>;
}

// Track size data structure
interface TrackSizeData {
  id: number;
  size: string;
  width: number;
  pitch: number;
  links: number;
  is_in_stock: boolean;
}

// Parse track size string into components (e.g., "400x86x52" -> {width: 400, pitch: 86, links: 52})
function parseTrackSizeString(size: string): { width: number; pitch: number; links: number } | null {
  const normalizedSize = size.toLowerCase().replace(/\s+/g, "").replace(/-/g, "x");
  const match = normalizedSize.match(/^(\d+)x([\d.]+)x(\d+)$/);
  if (match) {
    return {
      width: parseInt(match[1]),
      pitch: parseFloat(match[2]),
      links: parseInt(match[3]),
    };
  }
  return null;
}

// Get track size data from fullTrackSizes (PRIMARY source)
function getTrackSizeData(size: string): TrackSizeData | null {
  const normalizedSize = size.toLowerCase().replace(/\s+/g, "").replace(/-/g, "x");
  const found = fullTrackSizes.find(
    (ts) => ts.toLowerCase().replace(/\s+/g, "") === normalizedSize
  );
  
  if (!found) return null;
  
  const parsed = parseTrackSizeString(found);
  return {
    id: 1,
    size: found,
    width: parsed?.width || 0,
    pitch: parsed?.pitch || 0,
    links: parsed?.links || 0,
    is_in_stock: true,
  };
}

// Get compatible machines using full-machine-data with complete reverse lookup
// This is the PRIMARY source - it has the complete compatibility data
function getCompatibleMachinesFromData(size: string): MachineModel[] {
  const machines = getMachinesForTrackSize(size);
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
  // Use fullTrackSizes as PRIMARY source - it has all 381+ track sizes
  // Do NOT use API or old machine-models.ts fallback
  return fullTrackSizes.map((size) => ({
    size: size.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export default async function TrackSizeDetailPage({ params }: PageProps) {
  const { size } = await params;
  const formattedSize = size.replace(/-/g, "x");
  const displaySize = formattedSize.toUpperCase();

  // Parse dimensions from URL
  const dimensions = parseTrackSize(formattedSize);

  // Use full-machine-data as PRIMARY source - no API calls
  const trackSizeData = getTrackSizeData(formattedSize);
  const compatibleMachines = getCompatibleMachinesFromData(formattedSize);

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
        faqs={faqs}
      />
    </>
  );
}
