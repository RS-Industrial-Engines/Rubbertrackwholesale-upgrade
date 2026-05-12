import { HeroSection } from "@/components/home/hero-section";
import { CategoryNav } from "@/components/home/category-nav";
import { FeaturesSection } from "@/components/home/features-section";
import { CompatibilitySection } from "@/components/home/compatibility-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CTASection } from "@/components/home/cta-section";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CategoryNav />
      <FeaturesSection />
      <CompatibilitySection />
      <FeaturedProducts />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
