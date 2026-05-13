"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ShoppingCart, Menu, X, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rubber-tracks", label: "Rubber Tracks" },
  { href: "/machines", label: "By Machine" },
  { href: "/track-size", label: "By Track Size" },
  { href: "/brands", label: "Brands" },
  { href: "/faqs", label: "FAQs" },
  { href: "/contact", label: "Contact" },
];

const productDropdown = [
  { href: "/rubber-tracks", label: "Rubber Tracks" },
  { href: "/bottom-rollers", label: "Bottom Rollers" },
  { href: "/sprockets", label: "Sprockets" },
  { href: "/idlers", label: "Idlers" },
  { href: "/final-drives", label: "Final Drives" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-secondary/80 text-muted-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="hidden sm:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              <span>Call: 1-800-RUBBER-TRACK</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span>quotes@rubbertrackwholesale.com</span>
            </div>
          </div>
          <div className="text-primary font-semibold mx-auto sm:mx-0">
            Free Shipping on Orders Over $500
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold">
                <span className="text-foreground">Rubber Track</span>
                <span className="text-primary">Wholesale</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-muted-foreground hover:text-primary hover:bg-secondary"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-primary hover:bg-secondary relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                  </span>
                  <span className="sr-only">Cart</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden text-muted-foreground hover:text-primary"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="pb-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search by track size, part number, or machine model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="w-full bg-secondary border-border text-foreground placeholder:text-muted-foreground pr-10"
                  autoFocus
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  aria-label="Submit search"
                >
                  <Search className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-secondary border-t border-border">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
