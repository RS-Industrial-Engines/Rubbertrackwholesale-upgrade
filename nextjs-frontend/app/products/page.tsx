import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsContent } from "@/components/products/products-content";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse our complete selection of rubber tracks and undercarriage parts for all major heavy machinery brands.",
};

function ProductsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-10 bg-muted rounded w-1/4 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-muted rounded-lg h-64"></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsContent />
    </Suspense>
  );
}
