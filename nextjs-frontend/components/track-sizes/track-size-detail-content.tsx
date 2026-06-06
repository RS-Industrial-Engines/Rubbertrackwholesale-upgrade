import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Phone,
  Mail,
  Package,
  Truck,
  Shield,
  Ruler,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { MachineModel, TrackSize } from "@/lib/api";
import { createMachineSlug, BUSINESS_INFO } from "@/lib/url-utils";
import RequestQuoteForm from "@/components/forms/request-quote-form";

interface TrackSizeDetailContentProps {
  size: string;
  slug: string;
  trackSizeData: TrackSize | null;
  dimensions: { width: number; pitch: number; links: number } | null;
  compatibleMachines: MachineModel[];
  faqs: { question: string; answer: string }[];
}

export function TrackSizeDetailContent({
  size,
  slug,
  trackSizeData,
  dimensions,
  compatibleMachines,
  faqs,
}: TrackSizeDetailContentProps) {
  const width = trackSizeData?.width || dimensions?.width;
  const pitch = trackSizeData?.pitch || dimensions?.pitch;
  const links = trackSizeData?.links || dimensions?.links;

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
            <Link href="/track-size" className="hover:text-foreground">
              Track Sizes
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{size}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-background py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <p className="text-primary font-semibold mb-2">Rubber Track Size</p>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {size} Rubber Tracks
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Premium quality {size} rubber tracks at wholesale prices. In stock and
              ready to ship from our Houston warehouse.
            </p>

            {/* Specifications */}
            {(width || pitch || links) && (
              <div className="flex flex-wrap gap-4 mb-8">
                {width && (
                  <div className="px-4 py-2 bg-card rounded-lg border border-border">
                    <span className="text-muted-foreground text-sm">Width:</span>
                    <span className="ml-2 font-semibold text-foreground">
                      {width}mm
                    </span>
                  </div>
                )}
                {pitch && (
                  <div className="px-4 py-2 bg-card rounded-lg border border-border">
                    <span className="text-muted-foreground text-sm">Pitch:</span>
                    <span className="ml-2 font-semibold text-foreground">
                      {pitch}mm
                    </span>
                  </div>
                )}
                {links && (
                  <div className="px-4 py-2 bg-card rounded-lg border border-border">
                    <span className="text-muted-foreground text-sm">Links:</span>
                    <span className="ml-2 font-semibold text-foreground">{links}</span>
                  </div>
                )}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Get a Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href={BUSINESS_INFO.phoneTel}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call: {BUSINESS_INFO.phone}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stock Status */}
      <section className="py-6 bg-green-500/10 border-y border-green-500/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="font-semibold text-green-500">
              {size} Rubber Tracks - IN STOCK - Ready to Ship
            </span>
          </div>
        </div>
      </section>

      {/* Compatible Machines */}
      <section className="py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">
              Machines Compatible with {size} Rubber Tracks
            </h2>
            {compatibleMachines.length > 0 && (
              <div className="px-4 py-2 bg-primary/10 rounded-lg border border-primary/20">
                <span className="font-semibold text-primary">
                  Compatible with {compatibleMachines.length} machine model{compatibleMachines.length !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>

          {compatibleMachines.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {compatibleMachines.map((machine) => (
                <Link
                  key={`${machine.make}-${machine.model}`}
                  href={`/machines/${createMachineSlug(machine.make || "", machine.model || "")}`}
                  className="group flex items-center justify-between p-4 bg-card rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <div>
                    <p className="font-semibold text-foreground group-hover:text-primary">
                      {machine.make} {machine.model}
                    </p>
                    {machine.equipment_type && (
                      <p className="text-xs text-muted-foreground">
                        {machine.equipment_type}
                      </p>
                    )}
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Ruler className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">
                  Contact us for a complete list of machines compatible with {size}{" "}
                  rubber tracks.
                </p>
                <Button asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Available Tread Patterns */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Available Tread Patterns
          </h2>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            Choose the right tread pattern for your {size} rubber tracks. All patterns in stock.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[
              {
                name: "Block Pattern",
                image: "/images/tread-patterns/block-pattern.jpg",
                bestFor: "Best for paved surfaces, turf, and finished concrete",
              },
              {
                name: "C-Pattern (C-Lug)",
                image: "/images/tread-patterns/c-pattern.jpg",
                bestFor: "Most versatile — dirt, gravel, and mixed terrain",
              },
              {
                name: "Staggered Block",
                image: "/images/tread-patterns/staggered-block.jpg",
                bestFor: "Mixed terrain with surface protection",
              },
              {
                name: "Z-Pattern (Zig-Zag)",
                image: "/images/tread-patterns/z-pattern.jpg",
                bestFor: "Maximum traction in mud, snow, and loose material",
              },
            ].map((pattern) => (
              <Card key={pattern.name} className="overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={pattern.image}
                    alt={`${pattern.name} rubber track tread`}
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">{pattern.name}</h3>
                  <p className="text-sm text-muted-foreground">{pattern.bestFor}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            All tread patterns available and in stock at our Houston warehouse. Block and C-Pattern are our most popular. Call {BUSINESS_INFO.phone} for same-day pickup or nationwide shipping.
          </p>
        </div>
      </section>

      {/* Why This Size */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
              About {size} Rubber Tracks
            </h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                The {size} rubber track is a popular size used on various compact
                construction equipment.{" "}
                {width && (
                  <>
                    With a width of {width}mm, these tracks provide excellent
                    flotation and ground pressure distribution.
                  </>
                )}
              </p>
              <p className="text-muted-foreground mb-4">
                At Rubber Track Wholesale, we stock premium quality {size} rubber
                tracks that meet or exceed OEM specifications. Our tracks feature
                continuous steel cord construction for maximum durability and
                performance.
              </p>
              <p className="text-muted-foreground">
                Whether you&apos;re replacing worn tracks or upgrading your
                equipment, our {size} rubber tracks deliver the quality and value
                you expect from a wholesale supplier.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 lg:py-16 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8 text-center">
            Why Buy {size} Tracks from Rubber Track Wholesale?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Package,
                title: "Wholesale Pricing",
                description:
                  "Get premium quality tracks at 30-50% below retail. Direct wholesale means bigger savings for you.",
              },
              {
                icon: Truck,
                title: "Fast Houston Shipping",
                description:
                  "In-stock items ship same day from our Houston warehouse. Nationwide delivery in 2-5 business days.",
              },
              {
                icon: Shield,
                title: "Quality Guaranteed",
                description:
                  "All tracks meet or exceed OEM specifications. Backed by manufacturer warranty and our satisfaction guarantee.",
              },
            ].map((feature) => (
              <div key={feature.title} className="text-center">
                <feature.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-foreground text-lg mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions: {size} Tracks
          </h2>
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-border rounded-lg px-4"
                >
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Request Quote Form */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <RequestQuoteForm
              trackSize={size}
              sourcePage={`/track-size/${slug}`}
              title={`Get a Quote for ${size} Tracks`}
              subtitle={`Request wholesale pricing on ${size} rubber tracks. We respond within 2 business hours.`}
            />
          </div>
        </div>
      </section>

      {/* Related Sizes */}
      <section className="py-12 lg:py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Other Popular Track Sizes
          </h2>
          <div className="flex flex-wrap gap-3">
            {["400x86x52", "450x86x56", "300x52.5x80", "320x86x52", "400x72.5x72"]
              .filter((s) => s.toLowerCase() !== size.toLowerCase())
              .map((relatedSize) => (
                <Link
                  key={relatedSize}
                  href={`/track-size/${relatedSize.toLowerCase()}`}
                  className="px-4 py-2 bg-card border border-border rounded-lg hover:border-primary transition-colors font-medium text-foreground"
                >
                  {relatedSize}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 lg:py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
            Ready to Order {size} Rubber Tracks?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Get wholesale pricing on premium {size} rubber tracks. Contact us today
            for a free quote and fast shipping from Houston.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href={BUSINESS_INFO.phoneTel}>
                <Phone className="h-4 w-4 mr-2" />
                Call: {BUSINESS_INFO.phone}
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
