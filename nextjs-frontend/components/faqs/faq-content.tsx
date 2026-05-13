"use client";

import useSWR from "swr";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { API, fetcher, type FAQ } from "@/lib/api";

// Fallback FAQs if API is not available
const fallbackFAQs: FAQ[] = [
  {
    id: 1,
    question: "What brands do you carry rubber tracks for?",
    answer:
      "We carry rubber tracks for all major brands including Bobcat, Kubota, Caterpillar, Case, Gehl, ASV, JCB, Yanmar, Takeuchi, Hitachi, Komatsu, and many more. If you don't see your brand listed, contact us and we'll help you find what you need.",
    category: "Products",
  },
  {
    id: 2,
    question: "How do I know which rubber track size fits my machine?",
    answer:
      "You can search by your machine's brand and model number on our website. Alternatively, you can measure your existing tracks (width x pitch x number of links) or check your machine's manual. Our team is also available to help you find the right fit.",
    category: "Products",
  },
  {
    id: 3,
    question: "What is your shipping policy?",
    answer:
      "We offer free shipping on orders over $500 to commercial addresses in the contiguous United States. Orders typically ship the same day if placed before 2PM EST. We ship from 7 strategically located warehouses for fast delivery.",
    category: "Shipping",
  },
  {
    id: 4,
    question: "What warranty do you offer?",
    answer:
      "All our rubber tracks come with a 1-year warranty against manufacturing defects. Undercarriage parts like rollers, idlers, and sprockets carry a 6-month warranty. Contact us for warranty claims and we'll take care of you.",
    category: "Warranty",
  },
  {
    id: 5,
    question: "How do I request a quote?",
    answer:
      "You can request a quote by calling us at 1-800-RUBBER-TRACK, emailing quotes@rubbertrackwholesale.com, or using our contact form. Please include your machine's brand, model, and the parts you need for the fastest response.",
    category: "Orders",
  },
  {
    id: 6,
    question: "Do you offer bulk discounts?",
    answer:
      "Yes! We offer volume discounts for fleet purchases and regular customers. Contact our sales team to discuss pricing for larger orders or ongoing supply agreements.",
    category: "Pricing",
  },
];

export function FAQContent() {
  const { data: apiFaqs } = useSWR<FAQ[]>(API.faqs, fetcher, {
    fallbackData: fallbackFAQs,
  });

  const faqs = apiFaqs || fallbackFAQs;

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-card py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Find answers to common questions about our products, shipping,
            warranty, and more.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={String(faq.id)}
                className="border-border"
              >
                <AccordionTrigger className="text-foreground hover:text-primary text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <div className="mt-12 text-center bg-card rounded-lg p-8 border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Still Have Questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our team is here to help. Contact us and we&apos;ll get back to
              you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button>Contact Us</Button>
              </Link>
              <a href="tel:1-800-RUBBER-TRACK">
                <Button variant="outline">Call 1-800-RUBBER-TRACK</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
