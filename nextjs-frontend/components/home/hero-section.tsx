"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Phone, MapPin, Truck, Clock } from "lucide-react";
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
      className="relative min-h-[700px] bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1625936182462-b5fc2d0dcc5b?w=1600&h=900&fit=crop')`,
      }}
    >
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl">
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6">
            <MapPin className="h-4 w-4" />
            <span className="font-semibold text-sm">Houston, Texas</span>
            <span className="text-primary/70">|</span>
            <span className="text-sm">Nationwide Shipping</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            <span className="text-primary">Rubber Tracks</span> Houston
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl text-muted-foreground">
              Wholesale Prices, Premium Quality
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl text-pretty">
            Houston&apos;s largest supplier of rubber tracks and undercarriage parts
            for skid steers, mini excavators, and compact track loaders. Wholesale
            pricing with same-day shipping available.
          </p>

          {/* Search Bar */}
          <div className="bg-card rounded-xl p-2 flex flex-col sm:flex-row gap-2 shadow-2xl border border-border mb-6">
            <Input
              type="text"
              placeholder="Search by machine model, track size, or part number..."
              className="flex-1 border-0 text-lg focus-visible:ring-0 bg-transparent h-14"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <Button className="h-14 px-8 text-lg" onClick={handleSearch}>
              <Search className="h-5 w-5 mr-2" />
              Find My Track
            </Button>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Link
              href="/machines"
              className="px-4 py-2 bg-secondary/50 hover:bg-secondary text-foreground rounded-lg text-sm font-medium transition-colors"
            >
              Search by Machine
            </Link>
            <Link
              href="/track-size"
              className="px-4 py-2 bg-secondary/50 hover:bg-secondary text-foreground rounded-lg text-sm font-medium transition-colors"
            >
              Search by Track Size
            </Link>
            <Link
              href="/rubber-tracks"
              className="px-4 py-2 bg-secondary/50 hover:bg-secondary text-foreground rounded-lg text-sm font-medium transition-colors"
            >
              Browse Rubber Tracks
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button size="lg" className="text-lg h-14 px-8" asChild>
              <Link href="/contact">Request a Quote</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg h-14 px-8 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              asChild
            >
              <Link href="tel:+18001234567">
                <Phone className="h-5 w-5 mr-2" />
                Call Now: 1-800-XXX-XXXX
              </Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 bg-secondary/30 rounded-lg p-4">
              <MapPin className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Houston Warehouse</p>
                <p className="text-sm text-muted-foreground">Local pickup available</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-secondary/30 rounded-lg p-4">
              <Truck className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Nationwide Shipping</p>
                <p className="text-sm text-muted-foreground">2-5 day delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-secondary/30 rounded-lg p-4">
              <Clock className="h-8 w-8 text-primary flex-shrink-0" />
              <div>
                <p className="font-semibold text-foreground">Same-Day Shipping</p>
                <p className="text-sm text-muted-foreground">Order before 2pm CT</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
