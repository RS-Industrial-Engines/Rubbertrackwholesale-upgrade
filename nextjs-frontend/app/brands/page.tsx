import type { Metadata } from "next";
import { BrandsContent } from "@/components/brands/brands-content";
import { getSiteUrl } from "@/lib/schema";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Brands",
  description:
    "Browse rubber tracks and undercarriage parts from all major heavy machinery brands including Bobcat, Kubota, Caterpillar, Case, and more.",
  alternates: {
    canonical: `${SITE_URL}/brands`,
  },
};

export default function BrandsPage() {
  return <BrandsContent />;
}
