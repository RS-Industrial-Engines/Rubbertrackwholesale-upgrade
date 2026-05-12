import { HeroSection } from "@/components/home/hero-section";
import { CategoryNav } from "@/components/home/category-nav";
import { FeaturesSection } from "@/components/home/features-section";
import { CompatibilitySection } from "@/components/home/compatibility-section";
import { FeaturedProducts } from "@/components/home/featured-products";
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
        <CompatibilitySection />
        <FeaturesSection />
        <FeaturedProducts />
        <TestimonialsSection />
        <SEOContentSection />
        <CTASection />
      </div>
    </>
  );
}
