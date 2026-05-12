import Link from "next/link";
import {
  ChevronRight,
  Phone,
  Mail,
  Package,
  Truck,
  Shield,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Product, MachineModel, CompatibilitySearchResult } from "@/lib/api";

interface MachineDetailContentProps {
  make: string;
  model: string;
  slug: string;
  compatibility: CompatibilitySearchResult | null;
  products: Product[];
  relatedMachines: MachineModel[];
  faqs: { question: string; answer: string }[];
}

export function MachineDetailContent({
  make,
  model,
  slug,
  compatibility,
  products,
  relatedMachines,
  faqs,
}: MachineDetailContentProps) {
  const trackSizes = compatibility?.track_sizes || [];
  const equipmentType = compatibility?.machine?.equipment_type || "Construction Equipment";

  const categoryLinks = [
    { name: "Rubber Tracks", href: "/rubber-tracks", icon: Package },
    { name: "Bottom Rollers", href: "/bottom-rollers", icon: Package },
    { name: "Sprockets", href: "/sprockets", icon: Package },
    { name: "Idlers", href: "/idlers", icon: Package },
  ];

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
            <Link href="/machines" className="hover:text-foreground">
              Machines
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">
              {make} {model}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-background py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-primary font-semibold mb-2">{equipmentType}</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              {make} {model} Rubber Tracks & Undercarriage Parts
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Find premium replacement rubber tracks and undercarriage components for
              your {make} {model}. Wholesale prices with fast shipping from our Houston
              warehouse.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Get a Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="tel:+18001234567">
                  <Phone className="h-4 w-4 mr-2" />
                  Call: 1-800-XXX-XXXX
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Compatible Track Sizes */}
      <section className="py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
            Compatible Rubber Track Sizes for {make} {model}
          </h2>

          {trackSizes.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {trackSizes.map((track) => (
                <Link
                  key={track.size}
                  href={`/track-size/${track.size.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group"
                >
                  <Card className="h-full hover:border-primary transition-colors">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary mb-2">
                        {track.size}
                      </h3>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Width: {track.width}mm</p>
                        <p>Pitch: {track.pitch}mm</p>
                        <p>Links: {track.links}</p>
                      </div>
                      {track.is_in_stock && (
                        <span className="inline-block mt-3 px-2 py-1 text-xs font-semibold bg-green-500/10 text-green-500 rounded">
                          In Stock
                        </span>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground mb-4">
                  Contact us for compatible track sizes for your {make} {model}.
                </p>
                <Button asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Undercarriage Parts Categories */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
            {make} {model} Undercarriage Parts
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categoryLinks.map((category) => (
              <Link key={category.name} href={category.href} className="group">
                <Card className="h-full hover:border-primary transition-colors">
                  <CardContent className="p-6 text-center">
                    <category.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold text-foreground group-hover:text-primary">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      for {make} {model}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      {products.length > 0 && (
        <section className="py-12 lg:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
              Available Products for {make} {model}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group"
                >
                  <Card className="h-full hover:border-primary transition-colors">
                    <CardContent className="p-4">
                      <div className="aspect-square bg-muted rounded-lg mb-4 flex items-center justify-center">
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
                      <h3 className="font-semibold text-foreground group-hover:text-primary line-clamp-2">
                        {product.title || product.name}
                      </h3>
                      {product.price && (
                        <p className="text-lg font-bold text-primary mt-2">
                          ${product.price.toFixed(2)}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link href={`/products?brand=${make}&q=${model}`}>
                  View All {make} {model} Products
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us */}
      <section className="py-12 lg:py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">
            Why Buy {make} {model} Tracks from Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Package,
                title: "Wholesale Prices",
                description: "30-50% below OEM pricing on premium quality tracks",
              },
              {
                icon: Truck,
                title: "Fast Shipping",
                description: "Same-day shipping from Houston. 2-5 day delivery nationwide.",
              },
              {
                icon: Shield,
                title: "Quality Guaranteed",
                description: "All tracks backed by our satisfaction guarantee.",
              },
              {
                icon: Clock,
                title: "Expert Support",
                description: "Knowledgeable team ready to help with compatibility questions.",
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions: {make} {model}
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

      {/* Related Machines */}
      {relatedMachines.length > 0 && (
        <section className="py-12 lg:py-16 bg-secondary">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
              Other {make} Models
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {relatedMachines.map((machine) => (
                <Link
                  key={`${machine.make}-${machine.model}`}
                  href={`/machines/${machine.make?.toLowerCase().replace(/\s+/g, "-")}-${machine.model?.toLowerCase().replace(/\s+/g, "-")}`}
                  className="group flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <span className="font-semibold text-foreground group-hover:text-primary">
                    {machine.make} {machine.model}
                  </span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
            Ready to Order {make} {model} Rubber Tracks?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Get wholesale pricing on premium rubber tracks for your {make} {model}.
            Contact us today for a free quote.
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
              <Link href="/contact">
                <Mail className="h-4 w-4 mr-2" />
                Request Quote
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
