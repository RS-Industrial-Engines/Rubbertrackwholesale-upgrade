"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API, fetcher, type Brand, type Product } from "@/lib/api";

const CATEGORIES = [
  { id: "rubber-tracks", name: "Rubber Tracks" },
  { id: "sprockets", name: "Sprockets" },
  { id: "rollers", name: "Rollers" },
  { id: "idlers", name: "Idlers" },
];

export function ProductsContent() {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") || "";
  const urlBrand = searchParams.get("brand") || "";
  const urlCategory = searchParams.get("category") || "";

  const [searchTerm, setSearchTerm] = useState(urlSearch);
  const [selectedBrand, setSelectedBrand] = useState(urlBrand || "all");
  const [selectedCategory, setSelectedCategory] = useState(
    urlCategory || "all"
  );
  const [sortBy, setSortBy] = useState("featured");

  // Update states when URL params change
  useEffect(() => {
    setSearchTerm(urlSearch);
    setSelectedBrand(urlBrand || "all");
    setSelectedCategory(urlCategory || "all");
  }, [urlSearch, urlBrand, urlCategory]);

  // Fetch brands
  const { data: brands } = useSWR<Brand[]>(API.brands, fetcher);

  // Build products URL with filters
  const buildProductsUrl = () => {
    const params = new URLSearchParams();
    if (searchTerm) params.append("search", searchTerm);
    if (selectedBrand !== "all") params.append("brand", selectedBrand);
    if (selectedCategory !== "all") params.append("category", selectedCategory);
    params.append("sort", sortBy);
    params.append("limit", "50");
    return `${API.products}?${params.toString()}`;
  };

  // Fetch products
  const { data: products, isLoading } = useSWR<Product[]>(
    buildProductsUrl(),
    fetcher
  );

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedBrand("all");
    setSelectedCategory("all");
    setSortBy("featured");
  };

  const hasFilters =
    searchTerm || selectedBrand !== "all" || selectedCategory !== "all";

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-card py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            All Products
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse our complete selection of rubber tracks and undercarriage
            parts
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-card rounded-lg p-6 mb-8 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by size, part number, or machine model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-secondary border-border text-foreground placeholder:text-muted-foreground pr-10"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>

            {/* Brand Filter */}
            <Select value={selectedBrand} onValueChange={setSelectedBrand}>
              <SelectTrigger className="bg-secondary border-border text-foreground">
                <SelectValue placeholder="All Brands" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Brands</SelectItem>
                {brands?.map((brand) => (
                  <SelectItem key={brand.id} value={brand.name}>
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="bg-secondary border-border text-foreground">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap items-center justify-between mt-4 gap-4">
            <div className="flex items-center gap-2">
              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-primary hover:text-primary/80"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Filters
                </Button>
              )}
              <span className="text-muted-foreground text-sm">
                {products?.length || 0}{" "}
                {products?.length === 1 ? "product" : "products"} found
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-muted-foreground text-sm">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-secondary border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name: A to Z</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : !products || products.length === 0 ? (
          <div className="text-center py-16">
            <Filter className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-muted-foreground mb-2">
              {searchTerm
                ? "No products found"
                : "No products match your filters"}
            </h3>
            <p className="text-muted-foreground mb-4">
              {searchTerm ? (
                <>
                  Products for{" "}
                  <span className="text-primary font-semibold">
                    &quot;{searchTerm}&quot;
                  </span>{" "}
                  are not listed yet.
                  <br />
                  Try a different machine model or contact us for availability.
                </>
              ) : (
                "Try adjusting your search or filters"
              )}
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={clearFilters}>Clear All Filters</Button>
              <Link href="/contact">
                <Button variant="outline">Contact Us</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Card
                key={product.id}
                className="bg-card border-border hover:border-primary transition-all duration-300 group overflow-hidden"
              >
                <CardContent className="p-0">
                  {product.images && product.images.length > 0 ? (
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <Image
                        src={product.images[0]}
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
                    <div className="aspect-[4/3] bg-secondary flex items-center justify-center">
                      <span className="text-muted-foreground">No Image</span>
                    </div>
                  )}
                  <div className="p-4">
                    {product.brand && (
                      <p className="text-primary text-sm font-semibold mb-1">
                        {product.brand?.name || product.brand_name || ""}
                      </p>
                    )}
                    <h3 className="text-foreground font-semibold text-base mb-1 line-clamp-2">
                      {product.title || product.name}
                    </h3>
                    {product.size && (
                      <p className="text-muted-foreground text-sm mb-3">
                        {product.size}
                      </p>
                    )}
                    <div className="flex justify-between items-center">
                      {product.price ? (
                        <span className="text-xl font-bold text-foreground">
                          ${parseFloat(String(product.price)).toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Contact for Price
                        </span>
                      )}
                      <Link href={`/products/${product.id}`}>
                        <Button size="sm">View</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
