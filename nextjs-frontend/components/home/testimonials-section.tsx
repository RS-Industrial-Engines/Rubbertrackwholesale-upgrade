import { Card, CardContent } from "@/components/ui/card";
import { Star, ExternalLink } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/url-utils";
import { Button } from "@/components/ui/button";

/**
 * Social Proof Section
 * 
 * Displays real Google Business Profile rating instead of fabricated testimonials.
 * Links to actual Google reviews for authenticity and trust.
 */
export function TestimonialsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Google Reviews Card */}
          <Card className="bg-card border-border">
            <CardContent className="py-10 px-6">
              {/* Star Rating */}
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-8 h-8 text-primary fill-primary"
                  />
                ))}
              </div>
              
              {/* Rating Value */}
              <div className="text-5xl font-bold text-foreground mb-2">
                {BUSINESS_INFO.aggregateRating.ratingValue}
              </div>
              
              {/* Google Business Profile Link */}
              <a
                href="https://share.google/SAzceJjbTkGUR6FZr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button variant="outline" className="gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Read Our Google Reviews
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </a>
              
              {/* Trust Statement */}
              <p className="text-sm text-muted-foreground mt-6">
                Trusted by contractors and construction companies across Texas and nationwide
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
