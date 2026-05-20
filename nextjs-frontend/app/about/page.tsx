import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Truck, Award, Clock, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getSiteUrl } from "@/lib/schema";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Rubber Track Wholesale - your trusted source for premium rubber tracks and undercarriage parts since 2005.",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

const features = [
  {
    title: "Nationwide Coverage",
    description: "7 strategically located warehouses for fast delivery",
    icon: MapPin,
  },
  {
    title: "Expert Team",
    description: "20+ years of industry experience",
    icon: Users,
  },
  {
    title: "Quality Guaranteed",
    description: "OEM-quality products with 1-year warranty",
    icon: Award,
  },
  {
    title: "Fast Shipping",
    description: "Same-day shipping on most orders",
    icon: Truck,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[400px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.85)), url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=800&fit=crop')`,
        }}
      >
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
              About Rubber Track Wholesale
            </h1>
            <p className="text-xl text-muted-foreground">
              Your trusted partner for premium rubber tracks and undercarriage
              parts since 2005.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <p className="text-muted-foreground mb-4">
                Founded in 2005, Rubber Track Wholesale has grown from a small
                family business to one of the nation&apos;s leading suppliers of
                rubber tracks and undercarriage parts.
              </p>
              <p className="text-muted-foreground mb-4">
                Our mission is simple: provide contractors and construction
                companies with the highest quality parts at wholesale prices,
                backed by exceptional customer service.
              </p>
              <p className="text-muted-foreground">
                Today, we serve thousands of customers across the United States,
                shipping from our network of 7 strategically located warehouses
                to ensure fast delivery no matter where you are.
              </p>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop"
                alt="Heavy machinery in action"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="bg-card border-border text-center"
                >
                  <CardContent className="pt-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Contact our team today to find the perfect rubber tracks and parts
            for your equipment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              >
                Contact Us
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
