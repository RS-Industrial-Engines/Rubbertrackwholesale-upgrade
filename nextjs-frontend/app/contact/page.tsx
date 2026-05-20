import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/contact-form";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { BUSINESS_INFO } from "@/lib/url-utils";
import { getSiteUrl } from "@/lib/schema";

const SITE_URL = getSiteUrl();

export const metadata: Metadata = {
  title: `Contact Us | ${BUSINESS_INFO.name}`,
  description:
    `Get in touch with ${BUSINESS_INFO.name}. Our expert team is ready to help you find the right rubber tracks and undercarriage parts for your equipment. Call ${BUSINESS_INFO.phone}.`,
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
};

const contactInfo = [
  {
    title: "Phone",
    value: BUSINESS_INFO.phone,
    description: "Mon-Fri: 8AM - 6PM CST",
    icon: Phone,
    href: BUSINESS_INFO.phoneTel,
  },
  {
    title: "Email",
    value: BUSINESS_INFO.email,
    description: "We respond within 24 hours",
    icon: Mail,
    href: `mailto:${BUSINESS_INFO.email}`,
  },
  {
    title: "Location",
    value: BUSINESS_INFO.address.full,
    description: "Local pickup available",
    icon: MapPin,
  },
  {
    title: "Hours",
    value: "Mon - Fri: 8AM - 6PM CST",
    description: "Sat: 9AM - 2PM CST",
    icon: Clock,
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="bg-card py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Contact Us
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Have questions about our products or need help finding the right
            parts? Our team of experts is here to help. Call us at{" "}
            <a href={BUSINESS_INFO.phoneTel} className="text-primary hover:underline font-medium">
              {BUSINESS_INFO.phone}
            </a>
            {" "}or fill out the form below.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Send Us a Message
                </h2>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-4">
            {contactInfo.map((info) => {
              const Icon = info.icon;
              const content = (
                <Card className="bg-card border-border hover:border-primary transition-colors">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {info.title}
                      </h3>
                      <p className="text-foreground">{info.value}</p>
                      <p className="text-muted-foreground text-sm">
                        {info.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );

              if (info.href) {
                return (
                  <a key={info.title} href={info.href}>
                    {content}
                  </a>
                );
              }

              return <div key={info.title}>{content}</div>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
