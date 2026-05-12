import { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { StructuredData } from "@/components/seo/structured-data"
import { getBrandBySlug, getBrands } from "@/lib/api/brands"
import { getMachinesByBrand } from "@/lib/api/machines"
import { generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { slugify, formatMachineSlug } from "@/lib/utils"

interface BrandPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const brands = await getBrands()
  return brands.map((brand) => ({
    slug: slugify(brand.name),
  }))
}

export async function generateMetadata({ params }: BrandPageProps): Promise<Metadata> {
  const { slug } = await params
  const brand = await getBrandBySlug(slug)

  if (!brand) {
    return {
      title: "Brand Not Found | Rubber Track Wholesale",
    }
  }

  return {
    title: `${brand.name} Rubber Tracks & Undercarriage Parts | Rubber Track Wholesale`,
    description: `Shop ${brand.name} rubber tracks, bottom rollers, sprockets, idlers, and undercarriage parts. OEM-quality aftermarket parts with fast shipping from Houston, TX. Call (713) 941-0170.`,
    keywords: [
      `${brand.name} rubber tracks`,
      `${brand.name} undercarriage parts`,
      `${brand.name} bottom rollers`,
      `${brand.name} sprockets`,
      `${brand.name} idlers`,
      `${brand.name} excavator tracks`,
      `${brand.name} skid steer tracks`,
    ],
    openGraph: {
      title: `${brand.name} Rubber Tracks & Undercarriage Parts`,
      description: `Shop ${brand.name} rubber tracks and undercarriage parts. OEM-quality aftermarket parts from Houston, TX.`,
      type: "website",
    },
    alternates: {
      canonical: `https://rubbertrackwholesale.com/brands/${slug}`,
    },
  }
}

export default async function BrandPage({ params }: BrandPageProps) {
  const { slug } = await params
  const brand = await getBrandBySlug(slug)

  if (!brand) {
    notFound()
  }

  const machines = await getMachinesByBrand(brand.id)

  const breadcrumbItems = [
    { label: "Brands", href: "/brands" },
    { label: brand.name, href: `/brands/${slug}` },
  ]

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)

  const faqs = [
    {
      question: `What rubber tracks fit ${brand.name} equipment?`,
      answer: `We carry rubber tracks for all ${brand.name} compact track loaders, mini excavators, and skid steers. Our tracks are manufactured to OEM specifications for perfect fit and optimal performance. Browse our ${brand.name} machine listings below to find the exact track size for your model.`,
    },
    {
      question: `Do you have undercarriage parts for ${brand.name} machines?`,
      answer: `Yes! In addition to rubber tracks, we supply complete undercarriage parts for ${brand.name} equipment including bottom rollers, top rollers, sprockets, idlers, and track chains. All parts are OEM-quality aftermarket options at competitive prices.`,
    },
    {
      question: `How do I find the right parts for my ${brand.name} machine?`,
      answer: `Simply find your specific ${brand.name} model in our machine listings below, or call our parts experts at (713) 941-0170. We can cross-reference your model number to ensure you get the correct parts for your equipment.`,
    },
    {
      question: `Do you ship ${brand.name} parts nationwide?`,
      answer: `Yes! We ship ${brand.name} rubber tracks and undercarriage parts to all 50 states from our Houston, TX warehouse. Most orders ship within 1-2 business days with competitive freight rates.`,
    },
  ]

  const faqSchema = generateFAQSchema(faqs)

  // Group machines by type
  const machinesByType = machines.reduce(
    (acc, machine) => {
      const type = machine.machine_type || "Other"
      if (!acc[type]) {
        acc[type] = []
      }
      acc[type].push(machine)
      return acc
    },
    {} as Record<string, typeof machines>
  )

  const machineTypes = Object.keys(machinesByType).sort()

  return (
    <>
      <StructuredData data={breadcrumbSchema} />
      <StructuredData data={faqSchema} />

      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {brand.name} Rubber Tracks & Undercarriage Parts
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Premium rubber tracks and undercarriage parts for {brand.name} compact equipment.
            {machines.length > 0 && ` Browse ${machines.length} machine models below.`}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{machines.length}</div>
              <div className="text-sm text-muted-foreground">Machine Models</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{machineTypes.length}</div>
              <div className="text-sm text-muted-foreground">Equipment Types</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">OEM</div>
              <div className="text-sm text-muted-foreground">Quality Specs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">1-2 Day</div>
              <div className="text-sm text-muted-foreground">Shipping</div>
            </CardContent>
          </Card>
        </div>

        {/* Machines by Type */}
        {machineTypes.length > 0 ? (
          <div className="space-y-8">
            {machineTypes.map((type) => (
              <section key={type}>
                <h2 className="mb-4 text-2xl font-bold text-foreground">
                  {brand.name} {type}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {machinesByType[type].map((machine) => (
                    <Link
                      key={machine.id}
                      href={`/machines/${formatMachineSlug(brand.name, machine.model_name)}`}
                    >
                      <Card className="h-full transition-all hover:border-primary hover:shadow-md">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{machine.model_name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">{type}</Badge>
                            {machine.track_size && (
                              <Badge variant="outline">{machine.track_size}</Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">
              No machine models found for {brand.name}. Please contact us at (713) 941-0170 for
              assistance.
            </p>
          </Card>
        )}

        {/* Parts Categories */}
        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            {brand.name} Undercarriage Parts
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            <Link href="/rubber-tracks">
              <Card className="h-full transition-all hover:border-primary hover:shadow-md">
                <CardContent className="p-4 text-center">
                  <div className="mb-2 text-3xl">🔗</div>
                  <h3 className="font-semibold">Rubber Tracks</h3>
                  <p className="text-sm text-muted-foreground">{brand.name} compatible</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/bottom-rollers">
              <Card className="h-full transition-all hover:border-primary hover:shadow-md">
                <CardContent className="p-4 text-center">
                  <div className="mb-2 text-3xl">⚙️</div>
                  <h3 className="font-semibold">Bottom Rollers</h3>
                  <p className="text-sm text-muted-foreground">{brand.name} compatible</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/sprockets">
              <Card className="h-full transition-all hover:border-primary hover:shadow-md">
                <CardContent className="p-4 text-center">
                  <div className="mb-2 text-3xl">⚡</div>
                  <h3 className="font-semibold">Sprockets</h3>
                  <p className="text-sm text-muted-foreground">{brand.name} compatible</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/idlers">
              <Card className="h-full transition-all hover:border-primary hover:shadow-md">
                <CardContent className="p-4 text-center">
                  <div className="mb-2 text-3xl">🔄</div>
                  <h3 className="font-semibold">Idlers</h3>
                  <p className="text-sm text-muted-foreground">{brand.name} compatible</p>
                </CardContent>
              </Card>
            </Link>
            <Link href="/final-drives">
              <Card className="h-full transition-all hover:border-primary hover:shadow-md">
                <CardContent className="p-4 text-center">
                  <div className="mb-2 text-3xl">🏭</div>
                  <h3 className="font-semibold">Final Drives</h3>
                  <p className="text-sm text-muted-foreground">{brand.name} compatible</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold text-foreground">
            Frequently Asked Questions About {brand.name} Parts
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* SEO Content */}
        <section className="mt-12 rounded-lg bg-muted/50 p-6">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            About {brand.name} Rubber Tracks and Parts
          </h2>
          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <p>
              Rubber Track Wholesale is your trusted source for {brand.name} rubber tracks and
              undercarriage parts. We supply OEM-quality aftermarket parts that meet or exceed
              original equipment specifications, giving you reliable performance at a fraction of
              dealer prices.
            </p>
            <p>
              Our {brand.name} parts inventory includes rubber tracks for compact track loaders and
              mini excavators, as well as bottom rollers, top rollers, sprockets, idlers, and
              complete undercarriage rebuild kits. All parts are manufactured to precise tolerances
              for proper fit and extended service life.
            </p>
            <p>
              Based in Houston, Texas, we maintain a large inventory of {brand.name} parts in stock
              for fast shipping nationwide. Most orders ship within 1-2 business days. Contact our
              parts specialists at <strong>(713) 941-0170</strong> for expert assistance finding the
              right parts for your {brand.name} equipment.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-8 rounded-lg bg-primary p-8 text-center text-primary-foreground">
          <h2 className="mb-2 text-2xl font-bold">Need Help Finding {brand.name} Parts?</h2>
          <p className="mb-4 text-primary-foreground/90">
            Our parts experts are ready to help you find the right parts for your equipment.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="tel:+17139410170"
              className="inline-flex items-center gap-2 rounded-lg bg-background px-6 py-3 font-semibold text-foreground transition-colors hover:bg-background/90"
            >
              <span>Call (713) 941-0170</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-primary-foreground px-6 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground hover:text-primary"
            >
              Request a Quote
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
