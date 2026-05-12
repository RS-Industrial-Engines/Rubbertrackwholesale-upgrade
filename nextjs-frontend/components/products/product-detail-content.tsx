"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Check, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "@/lib/api";

interface ProductDetailContentProps {
  product: Product;
}

export function ProductDetailContent({ product }: ProductDetailContentProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const images = product.images || [];

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
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

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            {images.length > 0 ? (
              <>
                <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary mb-4">
                  <Image
                    src={images[selectedImage]}
                    alt={product.title || product.name || "Product"}
                    fill
                    className="object-cover"
                  />
                  {product.in_stock && (
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      In Stock
                    </div>
                  )}
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
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
              <div className="aspect-square rounded-lg bg-secondary flex items-center justify-center">
                <span className="text-muted-foreground">No Image Available</span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            {product.brand && (
              <p className="text-primary text-sm font-semibold mb-2">
                {product.brand}
              </p>
            )}
            <h1 className="text-3xl font-bold text-foreground mb-4">
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

            {/* Price */}
            <div className="mb-6">
              {product.price ? (
                <span className="text-4xl font-bold text-foreground">
                  ${parseFloat(String(product.price)).toFixed(2)}
                </span>
              ) : (
                <span className="text-2xl text-muted-foreground">
                  Contact for Price
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {product.in_stock ? (
                <>
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="text-green-500 font-medium">In Stock</span>
                </>
              ) : (
                <span className="text-muted-foreground">
                  Contact for Availability
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-2">
                  Description
                </h3>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            )}

            {/* Specifications */}
            {product.specifications &&
              Object.keys(product.specifications).length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-2">
                    Specifications
                  </h3>
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
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="flex-1">
                <Button size="lg" className="w-full">
                  Request Quote
                </Button>
              </Link>
              <a href="tel:1-800-RUBBER-TRACK" className="flex-1">
                <Button size="lg" variant="outline" className="w-full">
                  <Phone className="h-4 w-4 mr-2" />
                  Call to Order
                </Button>
              </a>
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
                href="tel:1-800-RUBBER-TRACK"
                className="flex items-center gap-2 text-primary hover:text-primary/80"
              >
                <Phone className="h-5 w-5" />
                1-800-RUBBER-TRACK
              </a>
              <a
                href="mailto:quotes@rubbertrackwholesale.com"
                className="flex items-center gap-2 text-primary hover:text-primary/80"
              >
                <Mail className="h-5 w-5" />
                quotes@rubbertrackwholesale.com
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
