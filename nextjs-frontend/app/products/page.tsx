import type { Metadata } from "next";
import { ProductsContent } from "@/components/products/products-content";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our complete selection of rubber tracks and undercarriage parts for all major heavy machinery brands.",
};

export default function ProductsPage() {
  return <ProductsContent />;
}
