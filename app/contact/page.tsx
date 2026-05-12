import { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { StructuredData } from "@/components/seo/structured-data"
import { generateBreadcrumbSchema } from "@/lib/seo"
import { MapPin, Phone, Mail, Clock } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us | Rubber Track Wholesale | Houston, TX",
  description:
    "Contact Rubber Track Wholesale in Houston, TX for rubber tracks and undercarriage parts. Call (713) 941-0170 for quotes, technical support, and orders. Fast nationwide shipping.",
  keywords: [
    "contact rubber track wholesale",
    "houston rubber tracks",
    "rubber track quote",
    "undercarriage parts houston",
    "equipment parts texas",
  ],
  openGraph: {
    title: "Contact Rubber Track Wholesale | Houston, TX",
    description: "Contact us for rubber tracks and undercarriage parts. Houston-based with nationwide shipping.",
    type: "website",
  },
}

const breadcrumbItems = [{ label: "Contact", href: "/contact" }]

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)

  return (
    <>
      <StructuredData data={breadcrumbSchema} />

      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Contact Us
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Get in touch with our team for quotes, technical support, or any questions
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Call Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="tel:+17139410170"
                  className="text-2xl font-bold text-primary hover:underline"
                >
                  (713) 941-0170
                </a>
                <p className="mt-2 text-muted-foreground">
                  Speak directly with our parts experts for quotes and technical assistance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href="mailto:sales@rubbertrackwholesale.com"
                  className="text-lg font-medium text-primary hover:underline"
                >
                  sales@rubbertrackwholesale.com
                </a>
                <p className="mt-2 text-muted-foreground">
                  Send us your equipment details for a quick quote.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <address className="not-italic">
                  <p className="font-medium">Rubber Track Wholesale</p>
                  <p className="text-muted-foreground">Houston, TX</p>
                </address>
                <p className="mt-2 text-sm text-muted-foreground">
                  Warehouse location with nationwide shipping capabilities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Business Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-muted-foreground">
                  <p>Monday - Friday: 8:00 AM - 5:00 PM CT</p>
                  <p>Saturday: 9:00 AM - 1:00 PM CT</p>
                  <p>Sunday: Closed</p>
                </div>
                <p className="mt-3 text-sm font-medium text-primary">
                  Same-day shipping on orders placed before 2:00 PM CT
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle>Request a Quote</CardTitle>
              <p className="text-sm text-muted-foreground">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                      Name *
                    </label>
                    <Input id="name" name="name" required placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="company" className="mb-1.5 block text-sm font-medium">
                      Company
                    </label>
                    <Input id="company" name="company" placeholder="Company name" />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
                      Phone *
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="machine" className="mb-1.5 block text-sm font-medium">
                    Machine Make/Model
                  </label>
                  <Input
                    id="machine"
                    name="machine"
                    placeholder="e.g., Kubota SVL75-2, CAT 259D"
                  />
                </div>

                <div>
                  <label htmlFor="trackSize" className="mb-1.5 block text-sm font-medium">
                    Track Size (if known)
                  </label>
                  <Input
                    id="trackSize"
                    name="trackSize"
                    placeholder="e.g., 400x86x52"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Tell us what parts you need, quantities, and any other details..."
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Submit Quote Request
                </Button>

                <p className="text-center text-xs text-muted-foreground">
                  By submitting this form, you agree to be contacted regarding your inquiry.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Why Contact Us Section */}
        <section className="mt-12 rounded-lg bg-muted/50 p-6">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Why Choose Rubber Track Wholesale?
          </h2>
          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <ul className="grid gap-2 sm:grid-cols-2">
              <li>Expert parts specialists with extensive equipment knowledge</li>
              <li>Competitive wholesale pricing on all products</li>
              <li>Fast shipping from our Houston, TX warehouse</li>
              <li>OEM-quality aftermarket parts guaranteed</li>
              <li>Volume discounts for contractors and dealers</li>
              <li>Same-day shipping on in-stock items</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  )
}
