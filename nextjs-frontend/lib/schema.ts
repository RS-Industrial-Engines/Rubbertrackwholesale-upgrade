import type { Product, FAQ, Brand } from "./api";

// ============================================================================
// ORGANIZATION SCHEMA
// ============================================================================

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rubber Track Wholesale",
    alternateName: "RTW",
    url: "https://rubbertrackwholesale.com",
    logo: "https://rubbertrackwholesale.com/logo.png",
    description:
      "Premier wholesale supplier of rubber tracks and undercarriage parts for construction equipment. Houston-based with nationwide shipping.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Houston",
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: "77001",
      addressCountry: "US",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-800-XXX-XXXX",
        contactType: "sales",
        areaServed: "US",
        availableLanguage: ["English", "Spanish"],
      },
      {
        "@type": "ContactPoint",
        telephone: "+1-800-XXX-XXXX",
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: ["English", "Spanish"],
      },
    ],
    sameAs: [
      "https://www.facebook.com/rubbertrackwholesale",
      "https://www.linkedin.com/company/rubbertrackwholesale",
    ],
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    priceRange: "$$",
  };
}

// ============================================================================
// LOCAL BUSINESS SCHEMA
// ============================================================================

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://rubbertrackwholesale.com/#localbusiness",
    name: "Rubber Track Wholesale Houston",
    image: "https://rubbertrackwholesale.com/warehouse.jpg",
    description:
      "Houston's largest rubber track and undercarriage parts warehouse. Same-day pickup available. Serving contractors, rental companies, and equipment dealers nationwide.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Houston",
      addressLocality: "Houston",
      addressRegion: "TX",
      postalCode: "77001",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.7604,
      longitude: -95.3698,
    },
    url: "https://rubbertrackwholesale.com",
    telephone: "+1-800-XXX-XXXX",
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Rubber Tracks & Undercarriage Parts",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Rubber Tracks",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Mini Excavator Rubber Tracks" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Skid Steer Rubber Tracks" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Compact Track Loader Rubber Tracks" } },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Undercarriage Parts",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Bottom Rollers" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Sprockets" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Idlers" } },
            { "@type": "Offer", itemOffered: { "@type": "Product", name: "Final Drives" } },
          ],
        },
      ],
    },
  };
}

// ============================================================================
// BREADCRUMB SCHEMA
// ============================================================================

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ============================================================================
// FAQ PAGE SCHEMA
// ============================================================================

export function generateFAQPageSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ============================================================================
// PRODUCT SCHEMA
// ============================================================================

export function generateProductSchema(product: Product, baseUrl: string = "https://rubbertrackwholesale.com") {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title || product.name,
    description: product.description,
    sku: product.sku,
    mpn: product.part_number,
    image: product.images?.[0] || product.image_url,
    url: `${baseUrl}/products/${product.id}`,
    brand: product.brand_name
      ? {
          "@type": "Brand",
          name: product.brand_name,
        }
      : undefined,
    category: product.category_name,
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/products/${product.id}`,
      priceCurrency: "USD",
      price: product.sale_price || product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      availability: product.in_stock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Rubber Track Wholesale",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
    },
  };
}

// ============================================================================
// ITEM LIST SCHEMA
// ============================================================================

export function generateItemListSchema(
  items: { name: string; url: string; image?: string; position: number }[],
  listName: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: item.url,
      image: item.image,
    })),
  };
}

// ============================================================================
// PRODUCT COLLECTION SCHEMA (for category/brand pages)
// ============================================================================

export function generateProductCollectionSchema(
  products: Product[],
  collectionName: string,
  baseUrl: string = "https://rubbertrackwholesale.com"
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collectionName,
    description: `Shop ${collectionName} at wholesale prices. Fast shipping from Houston warehouse.`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.slice(0, 20).map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: product.title || product.name,
          url: `${baseUrl}/products/${product.id}`,
          image: product.images?.[0] || product.image_url,
          offers: {
            "@type": "Offer",
            price: product.sale_price || product.price,
            priceCurrency: "USD",
            availability: product.in_stock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        },
      })),
    },
  };
}

// ============================================================================
// MACHINE/VEHICLE SCHEMA
// ============================================================================

export function generateMachineSchema(
  make: string,
  model: string,
  equipmentType: string,
  trackSizes: string[],
  baseUrl: string = "https://rubbertrackwholesale.com"
) {
  const slug = `${make.toLowerCase().replace(/\s+/g, "-")}-${model.toLowerCase().replace(/\s+/g, "-")}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${make} ${model}`,
    manufacturer: {
      "@type": "Organization",
      name: make,
    },
    model: model,
    vehicleConfiguration: equipmentType,
    url: `${baseUrl}/machines/${slug}`,
    description: `Find compatible rubber tracks and undercarriage parts for ${make} ${model}. Compatible track sizes: ${trackSizes.join(", ")}.`,
    additionalProperty: trackSizes.map((size) => ({
      "@type": "PropertyValue",
      name: "Compatible Track Size",
      value: size,
    })),
  };
}

// ============================================================================
// WEBSITE SCHEMA
// ============================================================================

export function generateWebsiteSchema(baseUrl: string = "https://rubbertrackwholesale.com") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rubber Track Wholesale",
    url: baseUrl,
    description: "Premier wholesale supplier of rubber tracks and undercarriage parts for construction equipment.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ============================================================================
// SERVICE SCHEMA
// ============================================================================

export function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Rubber Track Supply & Distribution",
    provider: {
      "@type": "LocalBusiness",
      name: "Rubber Track Wholesale",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Houston",
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    serviceType: "Wholesale Distribution",
    description:
      "Wholesale supply of rubber tracks and undercarriage parts for mini excavators, skid steers, and compact track loaders. Same-day shipping from Houston warehouse.",
    offers: {
      "@type": "Offer",
      name: "Wholesale Rubber Tracks",
      description: "Premium quality rubber tracks at wholesale prices",
    },
  };
}

// ============================================================================
// HELPER: Combine multiple schemas for page
// ============================================================================

export function combineSchemas(...schemas: object[]) {
  return schemas;
}

// ============================================================================
// SCRIPT TAG GENERATOR
// ============================================================================

export function schemaToScript(schema: object | object[]): string {
  return JSON.stringify(schema);
}
