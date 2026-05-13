"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Phone, Mail, Package, Truck, Shield, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/api";
import { BUSINESS_INFO } from "@/lib/url-utils";

interface ProductDetailContentProps {
  product: Product;
}

export function ProductDetailContent({ product }: ProductDetailContentProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = product.images || [];
  const hasImages = images.length > 0 || product.image_url;
  
  // Parse track size from product title or size field
  const trackSize = product.size || extractTrackSize(product.title || product.name || "");

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/products"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Images or Specs Card */}
          <div>
            {hasImages ? (
              <>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary">
                  <Image
                    src={images[selectedImage] || product.image_url || ""}
                    alt={product.title || product.name || "Product"}
                    fill
                    className="object-cover"
                  />
                  {product.in_stock && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      In Stock
                    </div>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 mt-4">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`relative aspect-square rounded-lg overflow-hidden border-2 ${
                          selectedImage === index
                            ? "border-primary"
                            : "border-border"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Product view ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </>
            ) : (
              // No image - show attractive specs card
              <div className="aspect-square bg-gradient-to-br from-secondary to-muted rounded-2xl flex flex-col items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4">
                  {product.in_stock && (
                    <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
                      In Stock
                    </span>
                  )}
                </div>
                
                {trackSize ? (
                  // Show track size prominently
                  <>
                    <p className="text-muted-foreground text-lg mb-2">Track Size</p>
                    <p className="text-6xl lg:text-7xl font-bold text-foreground mb-4">
                      {trackSize}
                    </p>
                  </>
                ) : (
                  // Show generic part icon
                  <>
                    <Wrench className="h-24 w-24 text-muted-foreground mb-4" />
                    <p className="text-xl font-semibold text-foreground">Product Details Below</p>
                  </>
                )}
                
                {product.brand_name && (
                  <p className="text-primary font-semibold mt-4">
                    {product.brand?.name || product.brand_name}
                  </p>
                )}
                
                {product.specifications && Object.keys(product.specifications).length > 0 && (
                  <div className="flex flex-wrap gap-3 justify-center mt-6">
                    {Object.entries(product.specifications).slice(0, 3).map(([key, value]) => (
                      <div
                        key={key}
                        className="px-3 py-1.5 bg-card rounded-lg border border-border"
                      >
                        <span className="text-muted-foreground text-sm capitalize">
                          {key}:
                        </span>
                        <span className="ml-2 font-semibold text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            {product.brand && (
              <p className="text-primary text-sm font-semibold mb-2">
                {product.brand?.name || product.brand_name || ""}
              </p>
            )}
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {product.title || product.name}
            </h1>

            {product.size && (
              <p className="text-muted-foreground mb-4">Size: {product.size}</p>
            )}

            {product.part_number && (
              <p className="text-muted-foreground mb-4">
                Part Number: {product.part_number}
              </p>
            )}

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {product.in_stock ? (
                <>
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-green-500 font-semibold">In Stock - Ready to Ship</span>
                </>
              ) : (
                <span className="text-muted-foreground">
                  Contact for Availability
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mb-6 p-4 bg-secondary rounded-lg">
              {product.price ? (
                <span className="text-3xl font-bold text-foreground">
                  ${parseFloat(String(product.price)).toFixed(2)}
                </span>
              ) : (
                <div>
                  <span className="text-xl text-muted-foreground">Wholesale Pricing</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    Contact us for competitive quotes
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <h2 className="font-semibold text-foreground mb-2">
                  Description
                </h2>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            )}

            {/* Specifications */}
            {product.specifications &&
              Object.keys(product.specifications).length > 0 && (
                <div className="mb-6">
                  <h2 className="font-semibold text-foreground mb-3">
                    Specifications
                  </h2>
                  <div className="bg-secondary rounded-lg p-4">
                    <dl className="grid grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <div key={key}>
                            <dt className="text-muted-foreground text-sm capitalize">
                              {key.replace(/_/g, " ")}
                            </dt>
                            <dd className="text-foreground font-medium">
                              {value}
                            </dd>
                          </div>
                        )
                      )}
                    </dl>
                  </div>
                </div>
              )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/contact" className="flex-1">
                <Button size="lg" className="w-full">
                  Request Quote
                </Button>
              </Link>
              <a href={BUSINESS_INFO.phoneTel} className="flex-1">
                <Button size="lg" variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call to Order
                </Button>
              </a>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-card rounded-lg border border-border">
                <Package className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Wholesale Pricing</p>
              </div>
              <div className="p-3 bg-card rounded-lg border border-border">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Fast Shipping</p>
              </div>
              <div className="p-3 bg-card rounded-lg border border-border">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-xs text-muted-foreground">Quality Guarantee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <Card className="mt-12 bg-card border-border">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Need Help?
            </h3>
            <p className="text-muted-foreground mb-4">
              Our team of experts is available to answer your questions and help
              you find the right parts for your equipment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={BUSINESS_INFO.phoneTel}
                className="flex items-center gap-2 text-primary hover:text-primary/80"
              >
                <Phone className="h-5 w-5" />
                {BUSINESS_INFO.phone}
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.email}`}
                className="flex items-center gap-2 text-primary hover:text-primary/80"
              >
                <Mail className="h-5 w-5" />
                {BUSINESS_INFO.email}
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Helper to extract track size from product title
function extractTrackSize(title: string): string | null {
  // Match patterns like 400x86x52, 300x52.5x80
  const match = title.match(/(\d{3}x\d{2,3}\.?\d*x\d{2,3})/i);
  return match ? match[1] : null;
}
