"use client";

import useSWR from "swr";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { API, fetcher, type FAQ } from "@/lib/api";
import { BUSINESS_INFO } from "@/lib/url-utils";

// Fallback FAQs with relevant rubber track questions
const fallbackFAQs: FAQ[] = [
  {
    id: 1,
    question: "How do I know what rubber track size fits my machine?",
    answer:
      "The easiest way is to search by your machine's make and model on our website. You can also measure your existing track: measure the width (in mm), count the number of links, and measure the pitch (distance between link centers). Common sizes include 400x72.5x74 for Kubota SVL series, 400x86x52 for Bobcat T650, and 450x86x55 for CAT 289D. Our team can also help you identify the correct size if you provide your machine's make, model, and serial number.",
    category: "Products",
  },
  {
    id: 2,
    question: "Can one machine have more than one compatible track size?",
    answer:
      "Yes, some machines can use multiple track sizes. For example, the Kubota SVL75 can use both 400x72.5x72 and 400x72.5x74 tracks. The CAT 259D can use 400x86x50 or 400x86x52. When multiple sizes are compatible, we list all options on the machine page so you can choose based on availability, price, or your specific application needs.",
    category: "Products",
  },
  {
    id: 3,
    question: "Do you sell rubber tracks for Kubota SVL75 and SVL95?",
    answer:
      "Yes! We carry rubber tracks for all Kubota SVL series models including SVL65, SVL75, SVL75-2, SVL75-3, SVL90, SVL95, SVL95-2S, SVL97, and more. The most common size for SVL75 and SVL95 models is 400x72.5x74. We stock these in our Houston warehouse for same-day shipping.",
    category: "Products",
  },
  {
    id: 4,
    question: "Do you sell tracks for Bobcat, Cat, John Deere, Takeuchi, Case, Toro, and Ditch Witch?",
    answer:
      "Absolutely! We stock rubber tracks for all major brands including Bobcat (T450, T550, T590, T650, T770, T870), Caterpillar/CAT (247, 257, 259, 279, 289, 299 series), John Deere (317G, 325G, 331G, 333G), Takeuchi (TL6, TL8, TL10, TL12), Case (TR310, TR340, TV370, TV450), Toro Dingo (323, 427, 525), and Ditch Witch (SK650, SK750, SK800). Browse our machines page to find your exact model.",
    category: "Products",
  },
  {
    id: 5,
    question: "Do you ship nationwide?",
    answer:
      "Yes, we ship to all 50 states from our Houston, Texas warehouse. Most orders ship same-day if placed before 2PM CST. We offer fast nationwide shipping from our Houston warehouse, and same-day pickup for local customers. We can also arrange expedited shipping if you need parts urgently.",
    category: "Shipping",
  },
  {
    id: 6,
    question: "Do you offer local pickup in Houston?",
    answer:
      "Yes! Our main warehouse is located in Houston, TX and we offer free local pickup. Call us to confirm availability and schedule your pickup time. This is a great option if you need tracks immediately and want to save on shipping costs.",
    category: "Shipping",
  },
  {
    id: 7,
    question: "Do you sell bottom rollers, sprockets, idlers, and final drives?",
    answer:
      "Yes, we carry a complete line of undercarriage parts including bottom rollers (track rollers), top rollers (carrier rollers), sprockets, front idlers, and final drive motors. We stock parts for the same brands we sell rubber tracks for. Having a complete undercarriage solution means you can get all your parts from one source with consistent quality.",
    category: "Products",
  },
  {
    id: 8,
    question: "What information should I provide for a quote?",
    answer:
      "To get the fastest and most accurate quote, please provide: 1) Machine make (brand), 2) Machine model number, 3) Machine serial number (helpful but not required), 4) Current track size if known (e.g., 400x86x52), and 5) Quantity needed. You can call us at " + BUSINESS_INFO.phone + ", email us, or use our online contact form.",
    category: "Orders",
  },
  {
    id: 9,
    question: "Are all compatible sizes shown even if not currently in stock?",
    answer:
      "Yes, our website shows all technically compatible track sizes for each machine, regardless of current stock levels. This helps you see all your options. If a specific size is temporarily out of stock, we can usually source it quickly or suggest an equivalent alternative. Contact us for real-time availability.",
    category: "Products",
  },
  {
    id: 10,
    question: "What warranty do you offer on rubber tracks?",
    answer:
      "All our rubber tracks come with a 1-year warranty against manufacturing defects. Undercarriage parts like rollers, idlers, and sprockets carry a 6-month warranty. Our tracks are made with high-quality rubber compounds and steel reinforcement designed for heavy-duty use. If you experience any issues, contact us and we'll make it right.",
    category: "Warranty",
  },
  {
    id: 11,
    question: "How do I measure my rubber track?",
    answer:
      "To measure your rubber track, you'll need three measurements: 1) WIDTH - Measure the track width in millimeters across the face of the track. 2) PITCH - Measure the distance between the centers of two consecutive drive lugs (the metal inserts inside the track). 3) LINKS - Count the total number of drive lugs/links around the entire track. A common measurement would look like 400x86x52 (400mm wide, 86mm pitch, 52 links).",
    category: "Products",
  },
  {
    id: 12,
    question: "Do you offer bulk or fleet discounts?",
    answer:
      "Yes! We offer competitive pricing for fleet operators, dealers, and contractors who purchase multiple tracks or buy regularly. Contact our sales team to discuss volume pricing, dealer programs, or setting up a commercial account. We can also provide custom quotes for large orders.",
    category: "Pricing",
  },
];

export function FAQContent() {
  const { data: apiFaqs } = useSWR<FAQ[]>(API.faqs, fetcher);

  // Use API data if available and not empty, otherwise use fallback
  const faqs = apiFaqs && apiFaqs.length > 0 ? apiFaqs : fallbackFAQs;

  // Group FAQs by category
  const faqsByCategory = faqs.reduce((acc, faq) => {
    const category = faq.category || "General";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(faq);
    return acc;
  }, {} as Record<string, FAQ[]>);

  const categoryOrder = ["Products", "Shipping", "Orders", "Pricing", "Warranty", "General"];
  const sortedCategories = Object.keys(faqsByCategory).sort((a, b) => {
    const aIndex = categoryOrder.indexOf(a);
    const bIndex = categoryOrder.indexOf(b);
    if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Page Header */}
      <section className="bg-gradient-to-br from-secondary to-background py-12 lg:py-16 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about rubber tracks, track sizing,
              shipping, warranty, and more.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {sortedCategories.map((category) => (
            <div key={category} className="mb-10">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-3">
                <span className="w-2 h-6 bg-primary rounded-full" />
                {category}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqsByCategory[category].map((faq) => (
                  <AccordionItem
                    key={faq.id}
                    value={String(faq.id)}
                    className="border-border"
                  >
                    <AccordionTrigger className="text-foreground hover:text-primary text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-card rounded-lg p-8 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Our team of rubber track experts is here to help. Contact us and
              we&apos;ll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">Contact Us</Button>
              </Link>
              <Link href={BUSINESS_INFO.phoneTel}>
                <Button variant="outline" size="lg">
                  <Phone className="h-4 w-4 mr-2" />
                  Call {BUSINESS_INFO.phone}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
