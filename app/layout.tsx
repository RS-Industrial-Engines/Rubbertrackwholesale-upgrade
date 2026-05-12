import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { OrganizationSchema } from "@/components/seo/structured-data";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://rubbertrackwholesale.com"
  ),
  title: {
    default: "Rubber Track Wholesale | Premium Tracks & Undercarriage Parts",
    template: "%s | Rubber Track Wholesale",
  },
  description:
    "Premium rubber tracks and undercarriage parts for compact track loaders, mini excavators, and skid steers. Wholesale pricing, Houston warehouse, nationwide shipping.",
  keywords: [
    "rubber tracks",
    "rubber tracks Houston",
    "compact track loader tracks",
    "mini excavator tracks",
    "undercarriage parts",
    "bottom rollers",
    "sprockets",
    "idlers",
    "final drives",
    "skid steer tracks",
    "wholesale rubber tracks",
  ],
  authors: [{ name: "Rubber Track Wholesale" }],
  creator: "Rubber Track Wholesale",
  publisher: "Rubber Track Wholesale",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Rubber Track Wholesale",
    title: "Rubber Track Wholesale | Premium Tracks & Undercarriage Parts",
    description:
      "Premium rubber tracks and undercarriage parts for compact track loaders, mini excavators, and skid steers. Wholesale pricing, Houston warehouse, nationwide shipping.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rubber Track Wholesale - Premium Rubber Tracks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rubber Track Wholesale | Premium Tracks & Undercarriage Parts",
    description:
      "Premium rubber tracks and undercarriage parts for compact track loaders, mini excavators, and skid steers.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add verification codes as needed
    // google: 'verification-code',
  },
};

export const viewport: Viewport = {
  themeColor: "#2d3a4a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <head>
        <OrganizationSchema />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
