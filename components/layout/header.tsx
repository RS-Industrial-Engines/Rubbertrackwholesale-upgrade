"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MAIN_CATEGORIES } from "@/lib/api/categories";

const NAV_ITEMS = [
  {
    label: "Products",
    href: "/products",
    children: MAIN_CATEGORIES.map((cat) => ({
      label: cat.name,
      href: cat.href,
      description: cat.description,
    })),
  },
  {
    label: "Brands",
    href: "/brands",
  },
  {
    label: "Machines",
    href: "/machines",
  },
  {
    label: "Track Sizes",
    href: "/track-sizes",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar */}
      <div className="hidden border-b bg-primary text-primary-foreground md:block">
        <div className="container-wide flex h-9 items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <span>Houston, TX Warehouse</span>
            <span>Nationwide Shipping</span>
          </div>
          <a
            href="tel:+1-800-000-0000"
            className="flex items-center gap-1.5 transition-colors hover:text-accent"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>Call for Pricing</span>
          </a>
        </div>
      </div>

      {/* Main header */}
      <div className="container-wide">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
              <span className="text-lg font-bold text-primary-foreground">RT</span>
            </div>
            <div className="hidden flex-col sm:flex">
              <span className="text-lg font-bold leading-tight text-foreground">
                Rubber Track
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Wholesale
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:items-center lg:gap-1">
            {NAV_ITEMS.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className="h-3.5 w-3.5 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-0 top-full w-64 rounded-lg border bg-card p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                      >
                        <span className="font-medium">{child.label}</span>
                        {child.description && (
                          <span className="mt-0.5 block text-xs text-muted-foreground">
                            {child.description}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center gap-2">
            {/* Desktop Search */}
            <div className="hidden w-64 lg:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search machines, track sizes..."
                  className="pl-9"
                />
              </div>
            </div>

            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Toggle search"
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* CTA Button */}
            <Button variant="accent" className="hidden sm:flex">
              Get Quote
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="border-t py-3 lg:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search machines, track sizes..."
                className="pl-9"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="border-t lg:hidden">
          <nav className="container-wide space-y-1 py-4">
            {NAV_ITEMS.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4">
              <Button variant="accent" className="w-full">
                Get Quote
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
