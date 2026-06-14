import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { HeroSection } from "@/components/home/hero-section";
import { CategoryNav } from "@/components/home/category-nav";
import { FeaturesSection } from "@/components/home/features-section";
import { PopularMachinesSection } from "@/components/home/popular-machines-section";
import { PopularSizesSection } from "@/components/home/popular-sizes-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { SEOContentSection } from "@/components/home/seo-content-section";
import { CTASection } from "@/components/home/cta-section";
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebsiteSchema,
} from "@/lib/schema";

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema();
  const localBusinessSchema = generateLocalBusinessSchema();
  const websiteSchema = generateWebsiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <div className="min-h-screen">
        <HeroSection />
        <CategoryNav />
        <PopularMachinesSection />
        <PopularSizesSection />
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg border border-border bg-card p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Local to Houston?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Skip the freight wait and grab your tracks in person.
                </p>
              </div>
            </div>
            <Link
              href="/rubber-tracks-houston"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Same-day pickup at our Houston warehouse
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
        <FeaturesSection />
        <TestimonialsSection />
        <SEOContentSection />
        <CTASection />
      </div>
    </>
  );
}
