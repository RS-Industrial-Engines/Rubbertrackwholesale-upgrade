import { Metadata } from "next";
import { getTrackSizes, getTrackSizesGrouped, TrackSize, TrackSizeGrouped } from "@/lib/api";
import { TrackSizesContent } from "@/components/track-sizes/track-sizes-content";
import { generateBreadcrumbSchema, generateItemListSchema, getSiteUrl } from "@/lib/schema";
import { trackSizes as fallbackTrackSizesData } from "@/lib/data/machine-models";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Rubber Track Sizes - Find Tracks by Size | Houston TX",
  description:
    "Browse rubber tracks by size. Find 400x86x52, 450x86x56, 300x52.5x80, and all popular track sizes. Wholesale prices from Houston warehouse with nationwide shipping.",
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

// Convert fallback data to API format
function getFallbackTrackSizes(): TrackSize[] {
  return fallbackTrackSizesData.map((ts, index) => ({
    id: index + 1,
    size: ts.size,
    width: ts.width,
    pitch: ts.pitch,
    links: ts.links,
    is_in_stock: true,
  }));
}

function getFallbackTrackSizesGrouped(): TrackSizeGrouped[] {
  const grouped: Record<number, TrackSize[]> = {};
  
  fallbackTrackSizesData.forEach((ts, index) => {
    if (!grouped[ts.width]) {
      grouped[ts.width] = [];
    }
    grouped[ts.width].push({
      id: index + 1,
      size: ts.size,
      width: ts.width,
      pitch: ts.pitch,
      links: ts.links,
      is_in_stock: true,
    });
  });

  return Object.entries(grouped)
    .map(([width, sizes]) => ({
      width: parseInt(width),
      sizes,
    }))
    .sort((a, b) => a.width - b.width);
}

export default async function TrackSizesPage() {
  let trackSizes: TrackSize[] = [];
  let trackSizesGrouped: TrackSizeGrouped[] = [];

  try {
    const [apiTrackSizes, apiTrackSizesGrouped] = await Promise.all([
      getTrackSizes(),
      getTrackSizesGrouped(),
    ]);
    
    // Use API data if available, otherwise fall back
    trackSizes = apiTrackSizes && apiTrackSizes.length > 0 ? apiTrackSizes : getFallbackTrackSizes();
    trackSizesGrouped = apiTrackSizesGrouped && apiTrackSizesGrouped.length > 0 ? apiTrackSizesGrouped : getFallbackTrackSizesGrouped();
  } catch (error) {
    console.error("Failed to fetch track sizes, using fallback data:", error);
    trackSizes = getFallbackTrackSizes();
    trackSizesGrouped = getFallbackTrackSizesGrouped();
  }

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
