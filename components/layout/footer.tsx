import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { MAIN_CATEGORIES } from "@/lib/api/categories";

const POPULAR_BRANDS = [
  { name: "Kubota", slug: "kubota" },
  { name: "Caterpillar", slug: "caterpillar" },
  { name: "Bobcat", slug: "bobcat" },
  { name: "John Deere", slug: "john-deere" },
  { name: "Takeuchi", slug: "takeuchi" },
  { name: "Case", slug: "case" },
  { name: "New Holland", slug: "new-holland" },
  { name: "Komatsu", slug: "komatsu" },
];

const POPULAR_SIZES = [
  "400x86x52",
  "450x86x56",
  "320x86x52",
  "300x52.5x84",
  "230x96x33",
  "350x52.5x86",
];

export function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-wide section-sm">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary-foreground">
                <span className="text-lg font-bold text-primary">RT</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">
                  Rubber Track
                </span>
                <span className="text-xs font-medium uppercase tracking-wider opacity-80">
                  Wholesale
                </span>
              </div>
            </Link>
            <p className="mt-4 text-sm opacity-80">
              Premium rubber tracks and undercarriage parts for compact track
              loaders and mini excavators. Wholesale pricing, Houston warehouse,
              nationwide shipping.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a
                href="tel:+1-800-000-0000"
                className="flex items-center gap-2 transition-opacity hover:opacity-80"
              >
                <Phone className="h-4 w-4" />
                <span>Call for Pricing</span>
              </a>
              <a
                href="mailto:sales@rubbertrackwholesale.com"
                className="flex items-center gap-2 transition-opacity hover:opacity-80"
              >
                <Mail className="h-4 w-4" />
                <span>sales@rubbertrackwholesale.com</span>
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Houston, TX</span>
              </div>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h3 className="text-base font-semibold">Products</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {MAIN_CATEGORIES.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={category.href}
                    className="opacity-80 transition-opacity hover:opacity-100"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Brands */}
          <div>
            <h3 className="text-base font-semibold">Popular Brands</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {POPULAR_BRANDS.map((brand) => (
                <li key={brand.slug}>
                  <Link
                    href={`/brands/${brand.slug}`}
                    className="opacity-80 transition-opacity hover:opacity-100"
                  >
                    {brand.name} Tracks
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/brands"
                  className="font-medium opacity-100 transition-opacity hover:opacity-80"
                >
                  View All Brands
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Track Sizes */}
          <div>
            <h3 className="text-base font-semibold">Popular Track Sizes</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {POPULAR_SIZES.map((size) => (
                <li key={size}>
                  <Link
                    href={`/track-sizes/${size}`}
                    className="font-model opacity-80 transition-opacity hover:opacity-100"
                  >
                    {size}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/track-sizes"
                  className="font-medium opacity-100 transition-opacity hover:opacity-80"
                >
                  View All Sizes
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Separator className="bg-primary-foreground/10" />

      {/* Bottom Footer */}
      <div className="container-wide py-6">
        <div className="flex flex-col items-center justify-between gap-4 text-sm opacity-80 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} Rubber Track Wholesale. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-opacity hover:opacity-100">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-opacity hover:opacity-100">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="transition-opacity hover:opacity-100">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
