import Link from "next/link";
import {
  CircleDot,
  Cog,
  Target,
  Settings,
  ArrowRight,
  Truck,
  Shield,
  Clock,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LocalBusinessSchema, FAQSchema } from "@/components/seo/structured-data";
import { MAIN_CATEGORIES } from "@/lib/api/categories";

// Icons map for categories
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "rubber-tracks": (
    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  "bottom-rollers": <CircleDot className="h-8 w-8" />,
  sprockets: <Cog className="h-8 w-8" />,
  idlers: <Target className="h-8 w-8" />,
  "final-drives": <Settings className="h-8 w-8" />,
};

const POPULAR_MACHINES = [
  { brand: "Kubota", model: "SVL75-2", slug: "kubota-svl75-2" },
  { brand: "Caterpillar", model: "259D", slug: "caterpillar-259d" },
  { brand: "Bobcat", model: "T650", slug: "bobcat-t650" },
  { brand: "John Deere", model: "333G", slug: "john-deere-333g" },
  { brand: "Takeuchi", model: "TL12V2", slug: "takeuchi-tl12v2" },
  { brand: "Case", model: "TR310", slug: "case-tr310" },
];

const POPULAR_TRACK_SIZES = [
  { size: "400x86x52", machines: "Kubota SVL75, Cat 259D" },
  { size: "450x86x56", machines: "Bobcat T650, Case TR310" },
  { size: "320x86x52", machines: "Kubota SVL65, Takeuchi TL8" },
  { size: "300x52.5x84", machines: "Kubota KX057, Cat 305" },
  { size: "230x96x33", machines: "Kubota U17, Bobcat 325" },
  { size: "350x52.5x86", machines: "Hitachi ZX50, Case CX50" },
];

const VALUE_PROPS = [
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Houston Warehouse",
    description: "Local inventory means faster shipping to Texas and beyond",
  },
  {
    icon: <Truck className="h-6 w-6" />,
    title: "Nationwide Shipping",
    description: "Fast delivery to all 50 states with competitive rates",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Premium Quality",
    description: "OEM-equivalent tracks built to exceed OEM specifications",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Quick Turnaround",
    description: "Same-day shipping on in-stock items ordered before 2pm CT",
  },
];

const HOMEPAGE_FAQS = [
  {
    question: "What brands of rubber tracks do you carry?",
    answer:
      "We carry rubber tracks for all major equipment brands including Kubota, Caterpillar, Bobcat, John Deere, Takeuchi, Case, New Holland, Komatsu, Hitachi, and many more. Our inventory covers compact track loaders and mini excavators from virtually every manufacturer.",
  },
  {
    question: "How do I find the right track size for my machine?",
    answer:
      "Use our machine lookup tool to search by your equipment make and model. We will show you all compatible track sizes. You can also search directly by track size if you already know your dimensions (e.g., 400x86x52).",
  },
  {
    question: "Do you ship outside of Texas?",
    answer:
      "Yes! While we are based in Houston, we ship nationwide to all 50 states. Many orders qualify for free or discounted freight. Contact us for a shipping quote to your location.",
  },
  {
    question: "What is your warranty policy?",
    answer:
      "All our rubber tracks come with a comprehensive warranty against manufacturing defects. Specific warranty terms vary by product - contact us for details on your specific order.",
  },
  {
    question: "Can I get wholesale pricing?",
    answer:
      "Absolutely! We specialize in wholesale pricing for contractors, dealers, and fleet operators. Contact our sales team for volume discounts and dealer pricing programs.",
  },
];

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <FAQSchema faqs={HOMEPAGE_FAQS} />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary py-16 md:py-24">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
        <div className="container-wide relative">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              Houston, TX Warehouse
            </Badge>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Rubber Tracks &{" "}
              <span className="text-accent">Undercarriage Parts</span>
            </h1>
            <p className="mt-6 text-pretty text-lg text-primary-foreground/80 md:text-xl">
              Premium quality rubber tracks for compact track loaders and mini
              excavators. Wholesale pricing, nationwide shipping from our Houston
              warehouse.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="xl" variant="accent" asChild>
                <Link href="/machines">
                  Find Your Machine
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link href="/track-sizes">Browse Track Sizes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section bg-background">
        <div className="container-wide">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight">
              Shop by Category
            </h2>
            <p className="mt-2 text-muted-foreground">
              Quality undercarriage parts for all your equipment needs
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {MAIN_CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={category.href}
                className="group"
              >
                <Card className="card-hover h-full">
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                      {CATEGORY_ICONS[category.slug]}
                    </div>
                    <h3 className="mt-4 font-semibold">{category.name}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Machines Section */}
      <section className="section-sm bg-muted">
        <div className="container-wide">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Popular Machines
              </h2>
              <p className="mt-1 text-muted-foreground">
                Find tracks for the most common equipment models
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/machines">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_MACHINES.map((machine) => (
              <Link key={machine.slug} href={`/machines/${machine.slug}`}>
                <Card className="card-hover">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {machine.brand}
                      </p>
                      <p className="font-model font-semibold">{machine.model}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-4 sm:hidden">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/machines">View All Machines</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Track Sizes Section */}
      <section className="section-sm bg-background">
        <div className="container-wide">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Popular Track Sizes
              </h2>
              <p className="mt-1 text-muted-foreground">
                Shop by track dimensions
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex">
              <Link href="/track-sizes">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {POPULAR_TRACK_SIZES.map((track) => (
              <Link key={track.size} href={`/track-sizes/${track.size}`}>
                <Card className="card-hover">
                  <CardContent className="p-4">
                    <p className="font-model text-lg font-semibold">
                      {track.size}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Fits: {track.machines}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-4 sm:hidden">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/track-sizes">View All Sizes</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Props Section */}
      <section className="section bg-secondary">
        <div className="container-wide">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight">
              Why Choose Rubber Track Wholesale?
            </h2>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VALUE_PROPS.map((prop, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  {prop.icon}
                </div>
                <h3 className="mt-4 font-semibold">{prop.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Houston Local SEO Section */}
      <section className="section-sm bg-background">
        <div className="container-wide">
          <div className="rounded-lg border bg-card p-8 md:p-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <Badge variant="accent" className="mb-4">
                  Houston, Texas
                </Badge>
                <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
                  Your Local Source for Rubber Tracks in Houston
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Based in Houston, Texas, Rubber Track Wholesale serves the
                  greater Houston area and beyond. Our local warehouse means
                  faster delivery times for Texas customers, with same-day
                  shipping available on in-stock items.
                </p>
                <p className="mt-4 text-muted-foreground">
                  We serve contractors, landscapers, excavation companies, and
                  equipment rental businesses throughout Harris County, Fort
                  Bend, Montgomery, Brazoria, and the entire Houston metro area.
                </p>
                <Button className="mt-6" variant="accent" asChild>
                  <Link href="/contact">Contact Our Houston Team</Link>
                </Button>
              </div>
              <div className="rounded-lg bg-muted p-6">
                <h3 className="font-semibold">Service Areas</h3>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  {[
                    "Houston",
                    "Katy",
                    "Sugar Land",
                    "The Woodlands",
                    "Pearland",
                    "League City",
                    "Cypress",
                    "Spring",
                    "Pasadena",
                    "Baytown",
                    "Conroe",
                    "Galveston",
                  ].map((area) => (
                    <span key={area} className="text-muted-foreground">
                      {area}, TX
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section bg-muted">
        <div className="container-narrow">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-muted-foreground">
              Common questions about our rubber tracks and services
            </p>
          </div>
          <div className="mt-10 space-y-4">
            {HOMEPAGE_FAQS.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border bg-card p-6"
              >
                <h3 className="font-semibold">{faq.question}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary text-primary-foreground">
        <div className="container-wide text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Find the perfect rubber tracks for your equipment. Search by machine
            or track size to get started.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button size="xl" variant="accent" asChild>
              <Link href="/machines">
                Search by Machine
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
