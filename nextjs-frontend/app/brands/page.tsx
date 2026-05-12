import type { Metadata } from "next";
import { BrandsContent } from "@/components/brands/brands-content";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "Browse rubber tracks and undercarriage parts from all major heavy machinery brands including Bobcat, Kubota, Caterpillar, Case, and more.",
};

export default function BrandsPage() {
  return <BrandsContent />;
}
