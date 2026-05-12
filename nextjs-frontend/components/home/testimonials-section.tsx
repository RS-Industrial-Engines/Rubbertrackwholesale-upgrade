import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Mike Johnson",
    company: "Johnson Excavating",
    text: "Best rubber tracks I've purchased. Quality is outstanding and they last much longer than OEM.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Martinez",
    company: "Martinez Construction",
    text: "Fast shipping and excellent customer service. The tracks fit perfectly on our Bobcat fleet.",
    rating: 5,
  },
  {
    id: 3,
    name: "Tom Wilson",
    company: "Wilson Landscaping",
    text: "Great prices and the quality matches OEM. Will definitely order again.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Trusted by contractors and construction companies nationwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-primary fill-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="border-t border-border pt-4">
                  <p className="text-foreground font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.company}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
