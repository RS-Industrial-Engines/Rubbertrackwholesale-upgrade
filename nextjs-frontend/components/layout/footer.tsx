import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";
import { BUSINESS_INFO } from "@/lib/url-utils";

const quickLinks = [
  { href: "/rubber-tracks", label: "Rubber Tracks" },
  { href: "/machines", label: "Shop by Machine" },
  { href: "/track-size", label: "Shop by Track Size" },
  { href: "/brands", label: "Brands" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

const categories = [
  { href: "/rubber-tracks", label: "Rubber Tracks" },
  { href: "/bottom-rollers", label: "Bottom Rollers" },
  { href: "/sprockets", label: "Sprockets" },
  { href: "/idlers", label: "Idlers" },
  { href: "/final-drives", label: "Final Drives" },
];

export function Footer() {
  return (
    <footer className="bg-card text-muted-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-foreground mb-4">
              {BUSINESS_INFO.name}
            </h3>
            <p className="text-sm mb-4">
              Your trusted source for premium rubber tracks and undercarriage
              parts for all major heavy machinery brands. Wholesale pricing with
              fast shipping from Houston, TX.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Categories
            </h4>
            <ul className="flex flex-col gap-2 text-sm">
              {categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Contact Us
            </h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <Link href={BUSINESS_INFO.phoneTel} className="font-medium hover:text-primary transition-colors">
                    {BUSINESS_INFO.phone}
                  </Link>
                  <p className="text-muted-foreground">Mon-Fri: 8AM - 6PM CST</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <a
                  href={`mailto:${BUSINESS_INFO.email}`}
                  className="hover:text-primary transition-colors"
                >
                  {BUSINESS_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <p>{BUSINESS_INFO.address}</p>
                  <p className="text-muted-foreground">Nationwide Shipping Available</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 text-sm text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
