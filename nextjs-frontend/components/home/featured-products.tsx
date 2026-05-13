"use client";

import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Package, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { API, fetcher, type Product } from "@/lib/api";
import { BUSINESS_INFO } from "@/lib/url-utils";

// Extract track size from product title or description
function extractTrackSize(text: string): string | null {
  const match = text.match(/(\d{2,4})\s*x\s*(\d{2,4}\.?\d*)\s*x\s*(\d{2,4})/i);
  if (match) {
    return `${match[1]}x${match[2]}x${match[3]}`;
  }
  return null;
}

export function FeaturedProducts() {
  const { data: products } = useSWR<Product[]>(
    `${API.products}?limit=3&sort=featured`,
    fetcher
  );

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 text-balance">
              Featured Products
            </h2>
            <p className="text-muted-foreground text-lg">
              Best-selling rubber tracks and parts
            </p>
          </div>
          <Link href="/products">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => {
            const hasImage = product.images && product.images.length > 0;
            const trackSize = product.size || extractTrackSize(product.title || product.name || "");
            
            return (
              <Card
                key={product.id}
                className="bg-secondary border-border hover:border-primary transition-all duration-300 group overflow-hidden"
              >
                <CardContent className="p-0">
                  {hasImage ? (
                    // Show product image
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <Image
                        src={product.images![0]}
                        alt={product.title || product.name || "Product"}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {product.in_stock && (
                        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          In Stock
                        </div>
                      )}
                    </div>
                  ) : (
                    // Show branded placeholder spec card
                    <div className="relative overflow-hidden aspect-[4/3] bg-gradient-to-br from-muted to-secondary flex flex-col items-center justify-center p-6">
                      {product.in_stock && (
                        <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                          <CheckCircle className="h-3 w-3" />
                          In Stock
                        </div>
                      )}
                      
                      {trackSize ? (
                        <>
                          <p className="text-muted-foreground text-sm mb-1">Track Size</p>
                          <p className="text-4xl font-bold text-foreground mb-3">
                            {trackSize}
                          </p>
                        </>
                      ) : (
                        <Package className="h-16 w-16 text-muted-foreground/50 mb-3" />
                      )}
                      
                      <p className="text-xs text-muted-foreground text-center">
                        Premium Rubber Track
                      </p>
                      
                      <div className="mt-4 flex items-center gap-2 text-primary text-sm">
                        <Phone className="h-4 w-4" />
                        <span>{BUSINESS_INFO.phone}</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <p className="text-primary text-sm font-semibold mb-2">
                      {product.brand?.name || product.brand_name || "Rubber Track"}
                    </p>
                    <h3 className="text-foreground font-semibold text-lg mb-2 line-clamp-2">
                      {product.title || product.name}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {product.size || "Contact for sizing"}
                    </p>
                    <div className="flex justify-between items-center">
                      {product.price ? (
                        <span className="text-2xl font-bold text-foreground">
                          ${parseFloat(String(product.price)).toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-lg text-muted-foreground">
                          Call for Price
                        </span>
                      )}
                      <Link href={`/products/${product.id}`}>
                        <Button>View Details</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
