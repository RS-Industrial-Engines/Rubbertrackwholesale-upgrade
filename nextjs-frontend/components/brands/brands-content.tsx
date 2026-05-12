"use client";

import useSWR from "swr";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { API, fetcher, type Brand } from "@/lib/api";

export function BrandsContent() {
  const { data: brands, isLoading } = useSWR<Brand[]>(API.brands, fetcher);

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-card py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Shop by Brand
          </h1>
          <p className="text-muted-foreground text-lg">
            Find rubber tracks and undercarriage parts for all major heavy
            machinery brands
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading brands...</p>
          </div>
        ) : brands && brands.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {brands.map((brand) => (
              <Card
                key={brand.id}
                className="bg-card border-border hover:border-primary transition-all duration-300 group"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">
                      {brand.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {brand.name}
                  </h3>
                  {brand.description && (
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {brand.description}
                    </p>
                  )}
                  <Link href={`/products?brand=${encodeURIComponent(brand.name)}`}>
                    <Button
                      variant="outline"
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
                    >
                      View Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No brands found</p>
            <Link href="/products">
              <Button>Browse All Products</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
