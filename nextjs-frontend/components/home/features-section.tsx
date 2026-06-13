import { MapPin, Award, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Same-Day Pickup",
    description:
      "Pick up your order today from our Houston warehouse - no waiting on freight.",
    icon: MapPin,
  },
  {
    title: "Premium Quality",
    description: "OEM-quality rubber tracks with 1-year warranty on all products",
    icon: Award,
  },
  {
    title: "Fast Delivery",
    description:
      "Ships same day from our Houston, Texas warehouse with nationwide shipping",
    icon: Clock,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="bg-secondary border-border hover:border-primary transition-all duration-300"
              >
                <CardContent className="pt-6 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
