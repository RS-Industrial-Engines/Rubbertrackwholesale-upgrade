import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailContent } from "@/components/products/product-detail-content";
import { API } from "@/lib/api";
import {
  generateProductSchema,
  generateBreadcrumbSchema,
  getSiteUrl,
} from "@/lib/schema";

const SITE_URL = getSiteUrl();

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

async function getProduct(id: string) {
  try {
    const res = await fetch(API.product(id), {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = product.title || product.name;
  const description =
    product.description ||
    `${product.brand?.name || product.brand_name || ""} ${title} - Premium quality rubber track`;

  return {
    title: `${title} | Rubber Track Wholesale`,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title: `${title} | Rubber Track Wholesale`,
      description,
      type: "website",
      images: product.images?.[0] || product.image_url ? [{ url: product.images?.[0] || product.image_url }] : undefined,
    },
    alternates: {
      canonical: `${SITE_URL}/products/${id}`,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Products", url: `${SITE_URL}/products` },
    { name: product.title || product.name, url: `${SITE_URL}/products/${id}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(breadcrumbs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateProductSchema(product)),
        }}
      />
      <ProductDetailContent product={product} />
    </>
  );
}
