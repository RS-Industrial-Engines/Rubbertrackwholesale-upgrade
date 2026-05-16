"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronRight,
  Phone,
  Mail,
  Truck,
  MapPin,
  CheckCircle,
  Wrench,
  AlertTriangle,
  Settings,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { createMachineSlug, BUSINESS_INFO } from "@/lib/url-utils";
import { getTrackSizesForMachine } from "@/lib/data/full-machine-data";
import {
  UndercarriageComponent,
  COMPONENT_DISPLAY_NAMES,
  COMPONENT_PLURAL_NAMES,
  COMPONENT_URL_PATHS,
  getUndercarriageComponents,
  getComponentUrl,
} from "@/lib/data/undercarriage-data";
import RequestQuoteForm from "@/components/forms/request-quote-form";

interface MachineComponentDetailContentProps {
  brand: string;
  model: string;
  componentType: UndercarriageComponent;
  equipmentType?: string;
  trackSizes?: string[];
}

// Component-specific descriptions
const COMPONENT_DESCRIPTIONS: Record<UndercarriageComponent, { 
  short: string; 
  long: string;
  function: string;
  signs: string[];
}> = {
  "bottom-roller": {
    short: "Support and distribute machine weight across the track",
    long: "Bottom rollers (also called track rollers or lower rollers) are critical undercarriage components that support and distribute the weight of your machine across the track. They roll along the inside of the track, keeping it properly aligned and reducing friction.",
    function: "Bottom rollers carry the machine's weight and guide the track as it moves. They are mounted along the track frame and roll against the track links.",
    signs: [
      "Visible wear or flat spots on the roller surface",
      "Wobbling or misalignment during operation",
      "Unusual noise or grinding sounds",
      "Track coming off or poor tracking",
      "Leaking seals or loss of lubrication",
    ],
  },
  "sprocket": {
    short: "Drive the track and transfer power from the motor",
    long: "Sprockets are the driving force behind your machine's track system. They mesh with the track links to transfer power from the hydraulic motor to the track, propelling the machine forward or backward.",
    function: "The sprocket engages with the track bushings to drive the track. It is connected directly to the final drive motor and is essential for machine movement.",
    signs: [
      "Worn or hooked teeth on the sprocket",
      "Track slipping or skipping",
      "Uneven tooth wear patterns",
      "Cracks or chips in sprocket teeth",
      "Excessive vibration during travel",
    ],
  },
  "idler": {
    short: "Guide and maintain track tension",
    long: "Front idlers (also called track idlers) guide the track around the front of the undercarriage and help maintain proper track tension. They play a crucial role in track alignment and machine stability.",
    function: "The idler guides the track at the front of the machine and works with the track adjuster to maintain proper tension. It also absorbs impact from debris and terrain.",
    signs: [
      "Track wandering or coming off",
      "Uneven idler wear",
      "Leaking seals",
      "Excessive track slack",
      "Wobbling or noisy operation",
    ],
  },
  "carrier-roller": {
    short: "Support the top portion of the track",
    long: "Carrier rollers (also called top rollers or return rollers) support the upper portion of the track as it returns from the front idler to the sprocket. They prevent the track from sagging and maintain proper tension.",
    function: "Carrier rollers support the weight of the track on its return path and keep it from sagging or slapping against the frame. Not all machines have carrier rollers - they are typically found on larger excavators and dozers.",
    signs: [
      "Track sagging excessively",
      "Track slapping or bouncing",
      "Visible wear on the roller",
      "Seized or non-rotating roller",
      "Track derailment issues",
    ],
  },
};

// FAQs for component pages
function getComponentFAQs(brand: string, model: string, component: UndercarriageComponent): { question: string; answer: string }[] {
  const displayName = COMPONENT_DISPLAY_NAMES[component];
  const pluralName = COMPONENT_PLURAL_NAMES[component];
  
  return [
    {
      question: `What ${displayName.toLowerCase()} fits a ${brand} ${model}?`,
      answer: `The correct ${displayName.toLowerCase()} for your ${brand} ${model} depends on the serial number and configuration. Contact us with your machine's serial number, and we'll help you find the exact replacement part.`,
    },
    {
      question: `How much does a ${brand} ${model} ${displayName.toLowerCase()} cost?`,
      answer: `${displayName} pricing varies based on quality tier (economy, standard, OEM-equivalent) and your machine's specific requirements. Contact us for a free quote with competitive wholesale pricing.`,
    },
    {
      question: `How long do ${pluralName.toLowerCase()} last?`,
      answer: `${displayName} lifespan depends on operating conditions, maintenance, and terrain. Typical replacement intervals range from 2,000-4,000 hours, but harsh conditions can shorten this. Regular inspection helps maximize component life.`,
    },
    {
      question: `Can I replace just one ${displayName.toLowerCase()}?`,
      answer: `Yes, individual ${pluralName.toLowerCase()} can be replaced. However, if multiple ${pluralName.toLowerCase()} show similar wear, replacing them together is often more cost-effective and ensures even performance.`,
    },
    {
      question: `Do you ship ${pluralName.toLowerCase()} nationwide?`,
      answer: `Yes! We ship ${brand} ${model} undercarriage parts nationwide from our Houston warehouse. Many items ship same-day for fast delivery.`,
    },
  ];
}

export function MachineComponentDetailContent({
  brand,
  model,
  componentType,
  equipmentType = "Tracked Equipment", // Neutral default - never assume CTL
  trackSizes = [],
}: MachineComponentDetailContentProps) {
  const slug = createMachineSlug(brand, model);
  const componentInfo = COMPONENT_DESCRIPTIONS[componentType];
  const displayName = COMPONENT_DISPLAY_NAMES[componentType];
  const pluralName = COMPONENT_PLURAL_NAMES[componentType];
  const urlPath = COMPONENT_URL_PATHS[componentType];
  const faqs = getComponentFAQs(brand, model, componentType);
  
  // Get other available components for this machine
  const availableComponents = getUndercarriageComponents(brand, model);
  const otherComponents = availableComponents.filter((c) => c !== componentType);
  
  // Get track sizes for this machine
  const machineTrackSizes = getTrackSizesForMachine(brand, model);
  
  // Generic component image path
  const componentImagePath = `/images/undercarriage/${componentType}-generic.jpg`;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href={`/${urlPath}`} className="hover:text-foreground">
              {pluralName}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">
              {brand} {model}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary to-background py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <p className="text-primary font-semibold mb-2 uppercase tracking-wide">
                {pluralName} for {equipmentType}
              </p>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 text-balance">
                {brand} {model} {pluralName}
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6 text-pretty">
                {componentInfo.short}. Premium quality replacement {pluralName.toLowerCase()} for your {brand} {model} with wholesale pricing and Houston warehouse availability.
              </p>
              
              {/* Key benefits */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Wholesale Pricing</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Fast Nationwide Shipping</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Houston Warehouse</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>Expert Support</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Get a Free Quote</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href={BUSINESS_INFO.phoneTel}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call: {BUSINESS_INFO.phone}
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Component Image */}
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl" />
              <Image
                src={componentImagePath}
                alt={`${brand} ${model} ${displayName} - Replacement undercarriage component`}
                fill
                className="object-contain p-8"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Component Info Section */}
      <section className="py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
            About {brand} {model} {pluralName}
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-muted-foreground mb-6">
                {componentInfo.long}
              </p>
              
              <Card className="bg-secondary/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Settings className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">How It Works</h4>
                      <p className="text-sm text-muted-foreground">
                        {componentInfo.function}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-3">Signs of Wear</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Watch for these indicators that your {displayName.toLowerCase()} may need replacement:
                      </p>
                      <ul className="space-y-2">
                        {componentInfo.signs.map((sign, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <span className="text-primary mt-1">•</span>
                            <span>{sign}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Components Section */}
      <section className="py-12 lg:py-16 border-b border-border bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
            Related {brand} {model} Parts
          </h2>
          <p className="text-muted-foreground mb-8">
            Complete your undercarriage maintenance with these related components.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Link to machine page */}
            <Link
              href={`/machines/${slug}`}
              className="group"
            >
              <Card className="h-full hover:border-primary transition-colors">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="font-semibold group-hover:text-primary">
                      Rubber Tracks
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground flex-grow">
                    {brand} {model} rubber track sizes and specifications
                  </p>
                  <span className="text-sm text-primary mt-3 group-hover:underline">
                    View tracks →
                  </span>
                </CardContent>
              </Card>
            </Link>
            
            {/* Other undercarriage components */}
            {otherComponents.map((component) => (
              <Link
                key={component}
                href={getComponentUrl(brand, model, component)}
                className="group"
              >
                <Card className="h-full hover:border-primary transition-colors">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Wrench className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold group-hover:text-primary">
                        {COMPONENT_DISPLAY_NAMES[component]}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground flex-grow">
                      {COMPONENT_DESCRIPTIONS[component].short}
                    </p>
                    <span className="text-sm text-primary mt-3 group-hover:underline">
                      View {COMPONENT_PLURAL_NAMES[component].toLowerCase()} →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Compatible Rubber Track Sizes Section */}
      {machineTrackSizes.length > 0 && (
        <section className="py-12 lg:py-16 border-b border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Compatible Rubber Track Sizes for {brand} {model}
            </h2>
            <p className="text-muted-foreground mb-6">
              Find the correct rubber track size for your {brand} {model}. Always verify with your serial number for accurate fitment.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {machineTrackSizes.map((trackSize) => (
                <Link
                  key={trackSize}
                  href={`/track-size/${trackSize.toLowerCase()}`}
                  className="group"
                >
                  <Card className="hover:border-primary transition-colors">
                    <CardContent className="p-4 text-center">
                      <span className="font-semibold text-lg group-hover:text-primary">
                        {trackSize}
                      </span>
                      <p className="text-xs text-muted-foreground mt-1">
                        View details
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline" asChild>
                <Link href={`/machines/${slug}`}>
                  View All {brand} {model} Rubber Track Options →
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Request Quote Form */}
      <section className="py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Get a Quote for {brand} {model} {pluralName}
              </h2>
              <p className="text-muted-foreground">
                Contact us with your machine details for competitive wholesale pricing.
                Include your serial number for accurate fitment verification.
              </p>
            </div>
            
            <RequestQuoteForm
              machineBrand={brand}
              machineModel={model}
              category={componentType}
            />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 lg:py-16 border-b border-border bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
            Frequently Asked Questions
          </h2>
          
          <Accordion type="single" collapsible className="max-w-3xl">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary/5 rounded-2xl p-8 lg:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Why Choose Rubber Track Wholesale?
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Wholesale pricing for contractors and dealers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Houston warehouse with same-day pickup available</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Fast nationwide shipping</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Expert fitment support - call with your serial number</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <span>Quality guaranteed - multiple tier options available</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Call or Text</p>
                      <Link href={BUSINESS_INFO.phoneTel} className="font-semibold hover:text-primary">
                        {BUSINESS_INFO.phone}
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <Link href={`mailto:${BUSINESS_INFO.email}`} className="font-semibold hover:text-primary">
                        {BUSINESS_INFO.email}
                      </Link>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold">{BUSINESS_INFO.address.full}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
