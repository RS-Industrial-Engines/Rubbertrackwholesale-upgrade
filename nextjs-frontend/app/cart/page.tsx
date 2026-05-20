import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSiteUrl } from "@/lib/schema";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "Cart",
  description: "Your shopping cart",
  alternates: {
    canonical: `${SITE_URL}/cart`,
  },
};

export default function CartPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-card py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-4">Your Cart</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-16">
          <ShoppingCart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Browse our selection of premium rubber tracks and undercarriage
            parts. Contact us for quotes and orders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button size="lg">Browse Products</Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                Contact for Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
