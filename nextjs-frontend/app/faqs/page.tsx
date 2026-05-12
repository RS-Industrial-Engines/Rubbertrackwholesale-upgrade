import type { Metadata } from "next";
import { FAQContent } from "@/components/faqs/faq-content";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Find answers to frequently asked questions about rubber tracks, undercarriage parts, shipping, warranty, and more.",
};

export default function FAQPage() {
  return <FAQContent />;
}
