import { Metadata } from "next";
import { TrackSize, TrackSizeGrouped } from "@/lib/api";
import { TrackSizesContent } from "@/components/track-sizes/track-sizes-content";
import { generateBreadcrumbSchema, generateItemListSchema, getSiteUrl } from "@/lib/schema";
import { fullTrackSizes } from "@/lib/data/full-machine-data";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Rubber Track Sizes - Find Tracks by Size | Houston TX",
  description:
    "Browse rubber tracks by size. Find 400x86x52, 450x86x56, 300x52.5x80, and all popular track sizes. Wholesale prices from Houston warehouse with nationwide shipping.",
  alternates: {
    canonical: `${SITE_URL}/track-size`,
  },
  keywords: [
    "rubber track sizes",
    "400x86x52 rubber tracks",
    "450x86x56 rubber tracks",
    "300x52.5x80 rubber tracks",
    "skid steer track sizes",
    "mini excavator track sizes",
    "CTL track sizes",
  ],
  openGraph: {
    title: "Rubber Track Sizes | Rubber Track Wholesale",
    description:
      "Find your rubber track by size. All popular sizes in stock at wholesale prices.",
    type: "website",
  },
};

// Parse track size string into components (e.g., "400x86x52" -> {width: 400, pitch: 86, links: 52})
function parseTrackSizeString(size: string): { width: number; pitch: number; links: number } | null {
  // Handle formats like "400x86x52" or "300x52.5x80"
  const match = size.match(/^(\d+)x([\d.]+)x(\d+)$/);
  if (match) {
    return {
      width: parseInt(match[1]),
      pitch: parseFloat(match[2]),
      links: parseInt(match[3]),
    };
  }
  return null;
}

// Build track sizes from fullTrackSizes (PRIMARY source - 381+ track sizes)
function getTrackSizesFromData(): TrackSize[] {
  return fullTrackSizes.map((ts, index) => {
    const parsed = parseTrackSizeString(ts);
    return {
      id: index + 1,
      size: ts,
      width: parsed?.width || 0,
      pitch: parsed?.pitch || 0,
      links: parsed?.links || 0,
      is_in_stock: true,
    };
  });
}

function getTrackSizesGroupedFromData(): TrackSizeGrouped[] {
  const trackSizes = getTrackSizesFromData();
  const grouped: Record<number, TrackSize[]> = {};
  
  trackSizes.forEach((ts) => {
    if (!grouped[ts.width]) {
      grouped[ts.width] = [];
    }
    grouped[ts.width].push(ts);
  });

  return Object.entries(grouped)
    .map(([width, sizes]) => ({
      width: parseInt(width),
      sizes,
    }))
    .sort((a, b) => a.width - b.width);
}

export default async function TrackSizesPage() {
  // Use fullTrackSizes as PRIMARY source - no API calls
  const trackSizes = getTrackSizesFromData();
  const trackSizesGrouped = getTrackSizesGroupedFromData();

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Track Sizes", url: `${SITE_URL}/track-size` },
  ];

  const sizeListItems = trackSizes.slice(0, 50).map((size, index) => ({
    name: `${size.size} Rubber Tracks`,
    url: `${SITE_URL}/track-size/${size.size.toLowerCase().replace(/\s+/g, "-")}`,
    position: index + 1,
  }));

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
            generateItemListSchema(sizeListItems, "Rubber Track Sizes")
          ),
        }}
      />
      <TrackSizesContent trackSizes={trackSizes} trackSizesGrouped={trackSizesGrouped} />
    </>
  );
}
