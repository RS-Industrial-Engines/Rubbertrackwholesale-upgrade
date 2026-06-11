import { Metadata } from "next";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  Truck,
  CheckCircle,
  ArrowRight,
  Package,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
  getSiteUrl,
} from "@/lib/schema";
import { BUSINESS_INFO } from "@/lib/url-utils";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title:
    "Rubber Tracks Houston, TX | Same-Day Pickup Warehouse | Rubber Track Wholesale",
  description:
    "Buy rubber tracks in Houston with same-day pickup at our Eagle Pass St warehouse. In-stock tracks and undercarriage parts for Bobcat, Kubota, CAT, John Deere & 50+ brands. Serving Houston contractors plus nationwide shipping.",
  keywords: [
    "rubber tracks Houston",
    "rubber tracks Houston TX",
    "rubber tracks near me",
    "Houston rubber track supplier",
    "rubber tracks for sale Houston",
    "skid steer tracks Houston",
    "mini excavator tracks Houston",
    "undercarriage parts Houston",
    "same day rubber tracks Houston",
    "Bobcat tracks Houston",
    "Kubota tracks Houston",
    "CAT tracks Houston",
  ],
  alternates: {
    canonical: `${SITE_URL}/rubber-tracks-houston`,
  },
  openGraph: {
    title: "Rubber Tracks Houston, TX | Same-Day Pickup Warehouse",
    description:
      "Houston's rubber track warehouse with same-day pickup. In-stock tracks and undercarriage parts for 50+ brands. Local pickup plus nationwide shipping.",
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/rubber-tracks-houston`,
  },
};

const HOUSTON_FAQS = [
  {
    question: "Can I pick up rubber tracks in Houston the same day?",
    answer:
      "Yes. We keep popular rubber track sizes in stock at our Houston warehouse on Eagle Pass St, so most orders placed during business hours are ready for same-day pickup. Call ahead with your machine model or track size and we will confirm availability before you drive over.",
  },
  {
    question: "Where is your Houston rubber track warehouse located?",
    answer: `Our warehouse is at ${BUSINESS_INFO.address.full}. We serve contractors and equipment owners throughout the greater Houston area, including Pasadena, Pearland, Baytown, Katy, Sugar Land, Spring, The Woodlands, and Conroe.`,
  },
  {
    question: "Do you carry tracks for my machine?",
    answer:
      "We stock rubber tracks and undercarriage parts for over 50 brands including Bobcat, Kubota, Caterpillar, John Deere, Takeuchi, Case, and New Holland, covering thousands of skid steer, compact track loader, and mini excavator models. If you tell us your machine make, model, and serial number, we will match you to the exact track size and undercarriage parts you need.",
  },
  {
    question: "Do you ship rubber tracks outside of Houston?",
    answer:
      "Yes. While same-day local pickup is our specialty, we ship rubber tracks and undercarriage parts nationwide. Houston-area customers get the fastest turnaround, but we support equipment owners across Texas and the entire United States.",
  },
  {
    question: "What undercarriage parts do you stock besides tracks?",
    answer:
      "Along with rubber tracks, we supply bottom rollers, drive sprockets, and idlers for the most popular skid steers, compact track loaders, and mini excavators. Sending us your machine serial number and a photo of the worn part helps us confirm the exact fit before you order.",
  },
];

const SERVICE_AREAS = [
  "Houston",
  "Pasadena",
  "Pearland",
  "Baytown",
  "Katy",
  "Sugar Land",
  "Spring",
  "The Woodlands",
  "Conroe",
  "Cypress",
  "Humble",
  "League City",
];

const POPULAR_BRANDS = [
  { name: "Bobcat", slug: "bobcat" },
  { name: "Kubota", slug: "kubota" },
  { name: "Caterpillar", slug: "caterpillar" },
  { name: "John Deere", slug: "john-deere" },
  { name: "Takeuchi", slug: "takeuchi" },
  { name: "ASV", slug: "asv" },
];

export default function RubberTracksHoustonPage() {
  const localBusinessSchema = generateLocalBusinessSchema();
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Rubber Tracks Houston", url: `${SITE_URL}/rubber-tracks-houston` },
  ];
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbs);
  const faqSchema = generateFAQPageSchema(HOUSTON_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Rubber Tracks Houston</span>
        </nav>

        {/* Hero */}
        <section className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Rubber Tracks in Houston, TX
          </h1>
          <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
            Houston&apos;s source for in-stock rubber tracks and undercarriage
            parts with same-day pickup. We supply skid steers, compact track
            loaders, and mini excavators for contractors across the greater
            Houston area, plus nationwide shipping.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={BUSINESS_INFO.phoneTel}>
                <Phone className="mr-2 h-5 w-5" />
                Call {BUSINESS_INFO.phoneFormatted}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/machines">
                Find Your Track
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Why local */}
        <section className="grid md:grid-cols-3 gap-4 mb-12">
          <Card>
            <CardContent className="pt-6">
              <Package className="h-8 w-8 mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Same-Day Pickup</h3>
              <p className="text-sm text-muted-foreground">
                Popular sizes stocked at our Houston warehouse. Call ahead and
                most orders are ready the same day, so your machine is back on
                the job fast.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <Truck className="h-8 w-8 mb-3 text-primary" />
              <h3 className="font-semibold mb-2">Local + Nationwide</h3>
              <p className="text-sm text-muted-foreground">
                Pick up locally in Houston or have your tracks shipped anywhere
                in the U.S. Houston-area orders get the fastest turnaround.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <CheckCircle className="h-8 w-8 mb-3 text-primary" />
              <h3 className="font-semibold mb-2">50+ Brands In Stock</h3>
              <p className="text-sm text-muted-foreground">
                Bobcat, Kubota, CAT, John Deere, Takeuchi, and more, covering
                thousands of skid steer, CTL, and mini excavator models.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Location block */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">
            Visit Our Houston Warehouse
          </h2>
          <Card>
            <CardContent className="pt-6 grid md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                  <div>
                    <p className="font-medium">{BUSINESS_INFO.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {BUSINESS_INFO.address.street}
                      <br />
                      {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state}{" "}
                      {BUSINESS_INFO.address.zipCode}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <Phone className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                  <a
                    href={BUSINESS_INFO.phoneTel}
                    className="text-sm hover:text-primary"
                  >
                    {BUSINESS_INFO.phoneFormatted}
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 mt-0.5 text-primary shrink-0" />
                  <div className="text-sm text-muted-foreground">
                    <p>Monday&ndash;Friday: 8:00 AM &ndash; 5:00 PM</p>
                    <p>Saturday: 9:00 AM &ndash; 1:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-sm">
                  Serving the Greater Houston Area
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_AREAS.map((area) => (
                    <span
                      key={area}
                      className="text-xs bg-muted px-2.5 py-1 rounded-md text-muted-foreground"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Body content for SEO depth */}
        <section className="mb-12 prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-4">
            Why Houston Contractors Choose Local Rubber Track Pickup
          </h2>
          <p className="text-muted-foreground mb-4">
            When a track fails on a job site, downtime costs money every hour the
            machine sits idle. Ordering online and waiting days for a freight
            delivery is not always an option when you have crews waiting. That is
            why we stock the most common rubber track sizes right here in
            Houston: so you can call, confirm the fit, and pick up the same day
            instead of losing a job to a blown track.
          </p>
          <p className="text-muted-foreground mb-4">
            Our warehouse on Eagle Pass St sits close to Houston&apos;s major
            construction corridors, making it convenient for contractors working
            across the metro area and surrounding suburbs. Whether you run a
            single Bobcat skid steer or manage a fleet of compact track loaders
            and mini excavators, we can match your machine to the correct track
            size and undercarriage parts.
          </p>
          <h2 className="text-2xl font-bold mb-4 mt-8">
            Tracks and Undercarriage Parts for Every Major Brand
          </h2>
          <p className="text-muted-foreground mb-4">
            We carry rubber tracks and undercarriage components, including bottom
            rollers, drive sprockets, and idlers, for the brands Houston crews
            run most. Browse by your machine&apos;s manufacturer:
          </p>
          <div className="flex flex-wrap gap-2 not-prose mb-4">
            {POPULAR_BRANDS.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="text-sm border rounded-md px-3 py-1.5 hover:bg-muted transition-colors"
              >
                {brand.name} Tracks
              </Link>
            ))}
          </div>
          <p className="text-muted-foreground">
            Not sure which size you need? Use our{" "}
            <Link href="/machines" className="text-primary hover:underline">
              machine finder
            </Link>{" "}
            to look up your exact model, or browse by{" "}
            <Link href="/track-size" className="text-primary hover:underline">
              track size
            </Link>{" "}
            if you already know your dimensions.
          </p>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">
            Rubber Tracks Houston &ndash; Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {HOUSTON_FAQS.map((faq, i) => (
              <Card key={i}>
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            Need Rubber Tracks in Houston Today?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Call our Houston warehouse with your machine model and we will
            confirm stock and have your tracks ready for same-day pickup.
          </p>
          <Button asChild size="lg">
            <a href={BUSINESS_INFO.phoneTel}>
              <Phone className="mr-2 h-5 w-5" />
              Call {BUSINESS_INFO.phoneFormatted}
            </a>
          </Button>
        </section>
      </div>
    </>
  );
}
