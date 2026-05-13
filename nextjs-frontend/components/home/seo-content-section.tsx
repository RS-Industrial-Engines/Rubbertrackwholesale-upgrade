import Link from "next/link";

export function SEOContentSection() {
  return (
    <section className="py-12 lg:py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-6">
            Houston&apos;s Premier Rubber Track Supplier
          </h2>

          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground mb-4">
              <strong className="text-foreground">Rubber Track Wholesale</strong> is
              Houston&apos;s leading supplier of premium rubber tracks and undercarriage
              parts for construction equipment. Based in Houston, Texas, we serve
              contractors, equipment rental companies, and dealers across the nation
              with wholesale pricing and fast shipping.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Why Choose Rubber Track Wholesale?
            </h3>

            <p className="text-muted-foreground mb-4">
              We specialize in <strong className="text-foreground">rubber tracks</strong>{" "}
              for all major equipment brands including{" "}
              <Link href="/machines?brand=kubota" className="text-primary hover:underline">
                Kubota
              </Link>
              ,{" "}
              <Link href="/machines?brand=cat" className="text-primary hover:underline">
                Caterpillar
              </Link>
              ,{" "}
              <Link href="/machines?brand=bobcat" className="text-primary hover:underline">
                Bobcat
              </Link>
              ,{" "}
              <Link href="/machines?brand=john-deere" className="text-primary hover:underline">
                John Deere
              </Link>
              , and{" "}
              <Link href="/machines?brand=takeuchi" className="text-primary hover:underline">
                Takeuchi
              </Link>
              . Our Houston warehouse stocks the most popular track sizes including{" "}
              <Link href="/track-size/400x86x52" className="text-primary hover:underline">
                400x86x52
              </Link>
              ,{" "}
              <Link href="/track-size/450x86x56" className="text-primary hover:underline">
                450x86x56
              </Link>
              , and{" "}
              <Link href="/track-size/300x52.5x80" className="text-primary hover:underline">
                300x52.5x80
              </Link>
              .
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Complete Undercarriage Solutions
            </h3>

            <p className="text-muted-foreground mb-4">
              Beyond rubber tracks, we offer a complete line of undercarriage parts:
            </p>

            <ul className="list-disc list-inside text-muted-foreground mb-4 space-y-2">
              <li>
                <Link href="/rubber-tracks" className="text-primary hover:underline">
                  Rubber Tracks
                </Link>{" "}
                - Premium tracks for skid steers, mini excavators, and CTLs
              </li>
              <li>
                <Link href="/bottom-rollers" className="text-primary hover:underline">
                  Bottom Rollers
                </Link>{" "}
                - Track rollers to support your machine&apos;s weight
              </li>
              <li>
                <Link href="/sprockets" className="text-primary hover:underline">
                  Sprockets
                </Link>{" "}
                - Drive sprockets for reliable power transfer
              </li>
              <li>
                <Link href="/idlers" className="text-primary hover:underline">
                  Idlers
                </Link>{" "}
                - Front idlers for proper track tension
              </li>
              <li>
                <Link href="/final-drives" className="text-primary hover:underline">
                  Final Drives
                </Link>{" "}
                - Travel motors and drive units
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">
              Serving Houston and Beyond
            </h3>

            <p className="text-muted-foreground mb-4">
              Located in Houston, Texas, we offer local pickup for Houston-area
              customers and fast nationwide shipping. Most orders ship same-day from
              our warehouse with delivery in 2-5 business days anywhere in the
              continental United States.
            </p>

            <p className="text-muted-foreground">
              Whether you&apos;re looking for{" "}
              <strong className="text-foreground">rubber tracks in Houston</strong> or
              need parts shipped to your location, Rubber Track Wholesale delivers
              quality products at wholesale prices. Contact our expert team today for
              help finding the right parts for your equipment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
