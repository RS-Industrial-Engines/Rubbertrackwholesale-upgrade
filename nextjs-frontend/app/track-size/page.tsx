import { Metadata } from "next";
import { getTrackSizes, getTrackSizesGrouped, TrackSize, TrackSizeGrouped } from "@/lib/api";
import { TrackSizesContent } from "@/components/track-sizes/track-sizes-content";
import { generateBreadcrumbSchema, generateItemListSchema } from "@/lib/schema";

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

export default async function TrackSizesPage() {
  let trackSizes: TrackSize[] = [];
  let trackSizesGrouped: TrackSizeGrouped[] = [];

  try {
    [trackSizes, trackSizesGrouped] = await Promise.all([
      getTrackSizes(),
      getTrackSizesGrouped(),
    ]);
  } catch (error) {
    console.error("Failed to fetch track sizes:", error);
  }

  const breadcrumbs = [
    { name: "Home", url: "https://rubbertrackwholesale.com" },
    { name: "Track Sizes", url: "https://rubbertrackwholesale.com/track-size" },
  ];

  const sizeListItems = trackSizes.slice(0, 50).map((size, index) => ({
    name: `${size.size} Rubber Tracks`,
    url: `https://rubbertrackwholesale.com/track-size/${size.size.toLowerCase().replace(/\s+/g, "-")}`,
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
