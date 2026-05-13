import type { Metadata } from "next";
import { BlogListContent } from "@/components/blog/blog-list-content";
import { getSiteUrl } from "@/lib/schema";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Rubber Track Guides & Resources | Expert Tips | Houston TX",
  description:
    "Expert guides on rubber tracks: how to measure, size selection, maintenance tips, tread patterns, and equipment-specific recommendations. Free resources from Rubber Track Wholesale.",
  keywords: [
    "rubber track guide",
    "how to measure rubber tracks",
    "rubber track maintenance",
    "rubber track size guide",
    "CTL track replacement",
    "mini excavator tracks",
  ],
  openGraph: {
    title: "Rubber Track Guides & Resources | Rubber Track Wholesale",
    description:
      "Expert guides and tips for rubber track selection, measurement, and maintenance.",
    type: "website",
  },
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
};

export default function BlogPage() {
  return <BlogListContent />;
}
