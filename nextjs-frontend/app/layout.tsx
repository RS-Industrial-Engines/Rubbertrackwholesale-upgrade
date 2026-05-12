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
  title: {
    default: "Rubber Track Wholesale | Premium Rubber Tracks & Undercarriage Parts",
    template: "%s | Rubber Track Wholesale",
  },
  description:
    "Wholesale prices on top-quality rubber tracks and undercarriage parts for all major brands. Fast shipping from 7 warehouses nationwide.",
  keywords: [
    "rubber tracks",
    "undercarriage parts",
    "sprockets",
    "idlers",
    "rollers",
    "Bobcat tracks",
    "Kubota tracks",
    "Caterpillar tracks",
    "skid steer tracks",
    "excavator tracks",
  ],
  openGraph: {
    title: "Rubber Track Wholesale | Premium Rubber Tracks & Undercarriage Parts",
    description:
      "Wholesale prices on top-quality rubber tracks and undercarriage parts for all major brands.",
    type: "website",
    locale: "en_US",
    siteName: "Rubber Track Wholesale",
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
