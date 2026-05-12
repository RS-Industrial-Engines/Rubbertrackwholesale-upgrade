"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section
      className="relative h-[600px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1625936182462-b5fc2d0dcc5b?w=1600&h=900&fit=crop')`,
      }}
    >
      <div className="container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
            Premium <span className="text-primary">Rubber Tracks</span> for
            Heavy Machinery
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            Wholesale prices on top-quality rubber tracks and undercarriage
            parts for all major brands. Fast shipping from 7 warehouses
            nationwide.
          </p>

          {/* Search Bar */}
          <div className="bg-foreground rounded-lg p-2 flex gap-2 shadow-2xl">
            <Input
              type="text"
              placeholder="Search by track size, part number, or machine model..."
              className="flex-1 border-0 text-lg focus-visible:ring-0 bg-foreground text-background placeholder:text-background/60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <Button className="px-8" onClick={handleSearch}>
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
          </div>

          {/* Search Help Text */}
          <p className="text-foreground text-center mt-4 text-sm md:text-base max-w-4xl mx-auto">
            <span className="font-semibold">Find Your Undercarriage Part:</span>{" "}
            Type track size, machine brand &amp; model to find rubber tracks,
            rollers, idlers, or sprockets. You can also search by part number
            for specific components.
          </p>
        </div>
      </div>
    </section>
  );
}
