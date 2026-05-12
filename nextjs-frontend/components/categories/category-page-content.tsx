"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Package, Phone, Filter, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product } from "@/lib/api";

interface CategoryPageContentProps {
  title: string;
  subtitle: string;
  description: string;
  categorySlug: string;
  products: Product[];
  brands: string[];
  faqs: { question: string; answer: string }[];
  seoContent: {
    heading: string;
    paragraphs: string[];
  };
  popularMachines: { name: string; slug: string }[];
  popularSizes?: string[];
}

export function CategoryPageContent({
  title,
  subtitle,
  description,
  categorySlug,
  products,
  brands,
  faqs,
  seoContent,
  popularMachines,
  popularSizes,
}: CategoryPageContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedBrand) {
      filtered = filtered.filter(
        (p) =>
          p.brand_name?.toLowerCase() === selectedBrand.toLowerCase() ||
          p.brand?.name?.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(query) ||
          p.name?.toLowerCase().includes(query) ||
          p.sku?.toLowerCase().includes(query) ||
          p.part_number?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [products, selectedBrand, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-background py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary font-semibold mb-2">{subtitle}</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              {title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              {description}
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder={`Search ${title.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-card border-border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Popular Sizes (for rubber tracks) */}
      {popularSizes && popularSizes.length > 0 && (
        <section className="py-6 bg-primary">
          <div className="container mx-auto px-4">
            <h2 className="text-lg font-semibold text-primary-foreground mb-4 text-center">
              Popular Track Sizes
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {popularSizes.map((size) => (
                <Link
                  key={size}
                  href={`/track-size/${size.toLowerCase()}`}
                  className="px-4 py-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg text-primary-foreground font-medium transition-colors"
                >
                  {size}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Brand Filter */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Filter by Brand:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedBrand === null ? "default" : "outline"}
              onClick={() => setSelectedBrand(null)}
              size="sm"
            >
              All Brands
            </Button>
            {brands.slice(0, 12).map((brand) => (
              <Button
                key={brand}
                variant={selectedBrand === brand ? "default" : "outline"}
                onClick={() => setSelectedBrand(brand)}
                size="sm"
              >
                {brand}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {filteredProducts.length} {title} Available
            </h2>
          </div>

          {filteredProducts.length === 0 ? (
            <Card>
              <CardContent className="p-16 text-center">
                <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria.
                </p>
                <Button onClick={() => { setSearchQuery(""); setSelectedBrand(null); }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group"
                >
                  <Card className="h-full hover:border-primary transition-colors">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                        {product.image_url || product.images?.[0] ? (
                          <img
                            src={product.image_url || product.images?.[0]}
                            alt={product.title || product.name || "Product"}
                            className="object-contain w-full h-full"
                          />
                        ) : (
                          <Package className="h-16 w-16 text-muted-foreground" />
                        )}
                      </div>
                      <div className="space-y-2">
                        {product.brand_name && (
                          <p className="text-xs font-medium text-primary">
                            {product.brand_name}
                          </p>
                        )}
                        <h3 className="font-semibold text-foreground group-hover:text-primary line-clamp-2 min-h-[3rem]">
                          {product.title || product.name}
                        </h3>
                        {product.size && (
                          <p className="text-sm text-muted-foreground">
                            Size: {product.size}
                          </p>
                        )}
                        <div className="flex items-center justify-between pt-2">
                          {product.price ? (
                            <p className="text-lg font-bold text-primary">
                              ${product.price.toFixed(2)}
                            </p>
                          ) : (
                            <p className="text-sm text-muted-foreground">
                              Request Quote
                            </p>
                          )}
                          {product.in_stock && (
                            <span className="px-2 py-1 text-xs font-medium bg-green-500/10 text-green-500 rounded">
                              In Stock
                            </span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Popular Machines */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
            Popular Machines for {title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularMachines.map((machine) => (
              <Link
                key={machine.slug}
                href={`/machines/${machine.slug}`}
                className="group flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors"
              >
                <span className="font-semibold text-foreground group-hover:text-primary">
                  {machine.name}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/machines">View All Machines</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
              {seoContent.heading}
            </h2>
            <div className="prose prose-invert max-w-none">
              {seoContent.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-muted-foreground mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 lg:py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions: {title}
          </h2>
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-border rounded-lg px-4"
                >
                  <AccordionTrigger className="text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
            Need Help Finding the Right {title}?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Our experts are ready to help you find the perfect parts for your
            equipment. Call us now or request a quote online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="tel:+18001234567">
                <Phone className="h-4 w-4 mr-2" />
                Call: 1-800-XXX-XXXX
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              asChild
            >
              <Link href="/contact">Request a Quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
