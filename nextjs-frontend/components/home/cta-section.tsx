import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section
      className="py-20 bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(rgba(249, 115, 22, 0.9), rgba(234, 88, 12, 0.9)), url('https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1600&h=600&fit=crop')`,
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4 text-balance">
          Need Help Finding the Right Rubber Track, Sprocket, Roller or Idler?
        </h2>
        <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          Our expert team is ready to help you find the perfect rubber tracks,
          sprockets, rollers, idlers and undercarriage parts for your equipment.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8"
            >
              Contact Us
            </Button>
          </Link>
          <a href="tel:1-800-RUBBER-TRACK">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8"
            >
              Call Now
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
