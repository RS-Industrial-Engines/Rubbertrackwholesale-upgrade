import { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumbs } from "@/components/seo/breadcrumbs"
import { StructuredData } from "@/components/seo/structured-data"
import { getBrands } from "@/lib/api/brands"
import { generateBreadcrumbSchema } from "@/lib/seo"
import { slugify } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Equipment Brands | Rubber Tracks & Undercarriage Parts | Rubber Track Wholesale",
  description:
    "Find rubber tracks and undercarriage parts for all major equipment brands including Bobcat, Caterpillar, Kubota, John Deere, Takeuchi, and more. Houston-based supplier with nationwide shipping.",
  keywords: [
    "equipment brands",
    "Bobcat rubber tracks",
    "Caterpillar undercarriage",
    "Kubota tracks",
    "John Deere parts",
    "Takeuchi rubber tracks",
    "construction equipment brands",
  ],
  openGraph: {
    title: "Equipment Brands | Rubber Track Wholesale",
    description:
      "Find rubber tracks and undercarriage parts for all major equipment brands. Houston-based supplier.",
    type: "website",
  },
}

const breadcrumbItems = [{ label: "Brands", href: "/brands" }]

export default async function BrandsPage() {
  const brands = await getBrands()

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems)

  // Group brands by first letter
  const groupedBrands = brands.reduce(
    (acc, brand) => {
      const firstLetter = brand.name.charAt(0).toUpperCase()
      if (!acc[firstLetter]) {
        acc[firstLetter] = []
      }
      acc[firstLetter].push(brand)
      return acc
    },
    {} as Record<string, typeof brands>
  )

  const sortedLetters = Object.keys(groupedBrands).sort()

  return (
    <>
      <StructuredData data={breadcrumbSchema} />

      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Equipment Brands
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            We supply rubber tracks and undercarriage parts for {brands.length}+ equipment brands.
            Find your machine manufacturer below.
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="mb-8 flex flex-wrap gap-2">
          {sortedLetters.map((letter) => (
            <a
              key={letter}
              href={`#brand-${letter}`}
              className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {letter}
            </a>
          ))}
        </div>

        {/* Brands by Letter */}
        <div className="space-y-8">
          {sortedLetters.map((letter) => (
            <section key={letter} id={`brand-${letter}`} className="scroll-mt-20">
              <h2 className="mb-4 text-2xl font-bold text-foreground">{letter}</h2>
              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {groupedBrands[letter].map((brand) => (
                  <Link key={brand.id} href={`/brands/${slugify(brand.name)}`}>
                    <Card className="h-full transition-all hover:border-primary hover:shadow-md">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{brand.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          View {brand.name} rubber tracks and undercarriage parts
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* SEO Content */}
        <section className="mt-16 rounded-lg bg-muted/50 p-6">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Rubber Tracks for All Major Equipment Brands
          </h2>
          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <p>
              Rubber Track Wholesale supplies premium rubber tracks and undercarriage parts for all
              major compact equipment manufacturers. Whether you operate Bobcat skid steers,
              Caterpillar excavators, Kubota mini excavators, or any other brand of compact
              construction equipment, we have the parts you need.
            </p>
            <p>
              Our inventory includes rubber tracks, bottom rollers, top rollers, sprockets, idlers,
              and complete undercarriage kits for machines from manufacturers including:
            </p>
            <ul className="columns-2 md:columns-3">
              {brands.slice(0, 30).map((brand) => (
                <li key={brand.id}>
                  <Link href={`/brands/${slugify(brand.name)}`} className="hover:text-primary">
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              Based in Houston, Texas, we ship nationwide with fast delivery times. Contact our
              expert team at <strong>(713) 941-0170</strong> to find the right parts for your
              equipment.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
