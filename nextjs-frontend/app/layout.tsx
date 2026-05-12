import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rubbertrackwholesale.com"),
  title: {
    default: "Rubber Tracks Houston | Wholesale Rubber Tracks & Undercarriage Parts | Rubber Track Wholesale",
    template: "%s | Rubber Track Wholesale",
  },
  description:
    "Houston's #1 source for wholesale rubber tracks and undercarriage parts. Same-day shipping on Bobcat, Kubota, Caterpillar, and 50+ brands. 7 warehouses, lowest prices guaranteed.",
  keywords: [
    "rubber tracks Houston",
    "rubber tracks",
    "undercarriage parts",
    "sprockets",
    "idlers",
    "bottom rollers",
    "final drives",
    "Bobcat rubber tracks",
    "Kubota rubber tracks",
    "Caterpillar rubber tracks",
    "CAT rubber tracks",
    "John Deere rubber tracks",
    "Takeuchi rubber tracks",
    "skid steer tracks",
    "excavator tracks",
    "mini excavator tracks",
    "compact track loader tracks",
    "CTL tracks",
    "wholesale rubber tracks",
  ],
  authors: [{ name: "Rubber Track Wholesale" }],
  creator: "Rubber Track Wholesale",
  publisher: "Rubber Track Wholesale",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Rubber Tracks Houston | Wholesale Rubber Tracks & Undercarriage Parts",
    description:
      "Houston's #1 source for wholesale rubber tracks and undercarriage parts. Same-day shipping, 50+ brands, lowest prices guaranteed.",
    type: "website",
    locale: "en_US",
    siteName: "Rubber Track Wholesale",
    url: "https://rubbertrackwholesale.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rubber Tracks Houston | Rubber Track Wholesale",
    description:
      "Wholesale rubber tracks and undercarriage parts. Same-day shipping from 7 warehouses nationwide.",
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
    // Add these when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  alternates: {
    canonical: "https://rubbertrackwholesale.com",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} bg-background`}>
      <body className="font-sans min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
