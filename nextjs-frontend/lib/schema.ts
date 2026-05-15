import { BUSINESS_INFO, createMachineSlug } from "./url-utils";
import type { Product } from "./api";
import type { StaticBlogPost } from "./data/blog-posts";

const SITE_URL = BUSINESS_INFO.url;

// ============================================================================
// SITE URL HELPER
// ============================================================================

export function getSiteUrl(): string {
  return SITE_URL;
}

// ============================================================================
// ORGANIZATION SCHEMA
// ============================================================================

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS_INFO.name,
    url: SITE_URL,
    // Note: logo field omitted until /public/logo.png exists
    description:
      "Premier wholesale supplier of rubber tracks and undercarriage parts for construction equipment. Houston-based with nationwide shipping.",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.zipCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: BUSINESS_INFO.phoneSchema,
        contactType: "sales",
        areaServed: "US",
        availableLanguage: ["English", "Spanish"],
      },
      {
        "@type": "ContactPoint",
        telephone: BUSINESS_INFO.phoneSchema,
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: ["English", "Spanish"],
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    priceRange: "$$",
  };
}

// ============================================================================
// LOCAL BUSINESS SCHEMA - Matches Google Business Profile
// ============================================================================

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: BUSINESS_INFO.name,
    // Note: image field omitted until /public/warehouse.jpg exists
    description:
      "Houston's largest rubber track and undercarriage parts warehouse. Same-day pickup available. Serving contractors, rental companies, and equipment dealers nationwide.",
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS_INFO.address.street,
      addressLocality: BUSINESS_INFO.address.city,
      addressRegion: BUSINESS_INFO.address.state,
      postalCode: BUSINESS_INFO.address.zipCode,
      addressCountry: BUSINESS_INFO.address.country,
    },
    url: SITE_URL,
    telephone: BUSINESS_INFO.phoneSchema,
    email: BUSINESS_INFO.email,
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: BUSINESS_INFO.hours.weekdays.opens,
        closes: BUSINESS_INFO.hours.weekdays.closes,
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: BUSINESS_INFO.hours.saturday.opens,
        closes: BUSINESS_INFO.hours.saturday.closes,
      },
    ],
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: BUSINESS_INFO.aggregateRating.ratingValue,
      reviewCount: BUSINESS_INFO.aggregateRating.reviewCount,
    },
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
// ARTICLE SCHEMA (for blog posts)
// ============================================================================

export function generateArticleSchema(post: StaticBlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.published_at,
    dateModified: post.published_at, // Use published_at if no modified date
    author: {
      "@type": "Organization",
      name: BUSINESS_INFO.name,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS_INFO.name,
      url: SITE_URL,
      // Note: logo omitted until /public/logo.png exists
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
    articleSection: post.category,
    url: `${SITE_URL}/blog/${post.slug}`,
    // Note: image omitted unless real and crawlable
  };
}

// ============================================================================
// PRODUCT SCHEMA
// ============================================================================

export function generateProductSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title || product.name,
    description: product.description,
    sku: product.sku,
    mpn: product.part_number,
    image: product.images?.[0] || product.image_url,
    url: `${SITE_URL}/products/${product.id}`,
    brand: product.brand_name
      ? {
          "@type": "Brand",
          name: product.brand_name,
        }
      : undefined,
    category: product.category_name,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/products/${product.id}`,
      priceCurrency: "USD",
      price: product.sale_price || product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      availability: product.in_stock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: BUSINESS_INFO.name,
      },
    },
    // Note: aggregateRating removed - only add when visible reviews exist on page
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
  collectionName: string
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
          url: `${SITE_URL}/products/${product.id}`,
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
  trackSizes: string[]
) {
  // Use canonical slug from url-utils for exact URL matching
  const slug = createMachineSlug(make, model);
  
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
    url: `${SITE_URL}/machines/${slug}`,
    description: `Find compatible rubber tracks and undercarriage parts for ${make} ${model}. Compatible track sizes: ${trackSizes.join(", ")}.`,
    additionalProperty: trackSizes.map((size) => ({
      "@type": "PropertyValue",
      name: "Compatible Track Size",
      value: size,
    })),
  };
}

// ============================================================================
// BRAND PAGE SCHEMA
// ============================================================================

export function generateBrandPageSchema(
  brand: string,
  models: { model: string; trackSizes: string[] }[],
  slug: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${brand} Rubber Tracks & Undercarriage Parts`,
    description: `Find compatible rubber tracks and undercarriage parts for ${brand} machines. ${models.length} models supported.`,
    url: `${SITE_URL}/brands/${slug}`,
    breadcrumb: generateBreadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Brands", url: `${SITE_URL}/brands` },
      { name: brand, url: `${SITE_URL}/brands/${slug}` },
    ]),
    mainEntity: {
      "@type": "ItemList",
      name: `${brand} Machine Models`,
      numberOfItems: models.length,
      itemListElement: models.slice(0, 50).map((m, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Vehicle",
          name: `${brand} ${m.model}`,
          manufacturer: { "@type": "Organization", name: brand },
          model: m.model,
          // Use canonical slug function for consistent URLs
          url: `${SITE_URL}/machines/${createMachineSlug(brand, m.model)}`,
        },
      })),
    },
  };
}

// ============================================================================
// TRACK SIZE SCHEMA (Product category)
// ============================================================================

export function generateTrackSizeSchema(
  size: string,
  compatibleMachines: { make: string; model: string }[]
) {
  // Use CollectionPage - track-size pages are compatibility/encyclopedia pages,
  // NOT individual product offer pages. No pricing is visible on these pages.
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${size} Rubber Tracks - Compatible Machines`,
    description: `Find ${size} rubber tracks compatible with ${compatibleMachines.slice(0, 5).map(m => `${m.make} ${m.model}`).join(", ")}${compatibleMachines.length > 5 ? ` and ${compatibleMachines.length - 5} more machines` : ""}.`,
    url: `${SITE_URL}/track-size/${size.toLowerCase()}`,
    breadcrumb: generateBreadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Track Sizes", url: `${SITE_URL}/track-size` },
      { name: size, url: `${SITE_URL}/track-size/${size.toLowerCase()}` },
    ]),
    mainEntity: {
      "@type": "ItemList",
      name: `Machines Compatible with ${size} Rubber Tracks`,
      numberOfItems: compatibleMachines.length,
      itemListElement: compatibleMachines.slice(0, 20).map((m, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Vehicle",
          name: `${m.make} ${m.model}`,
          manufacturer: { "@type": "Organization", name: m.make },
          model: m.model,
          url: `${SITE_URL}/machines/${createMachineSlug(m.make, m.model)}`,
        },
      })),
    },
    provider: {
      "@type": "Organization",
      name: BUSINESS_INFO.name,
      url: SITE_URL,
    },
  };
}

// ============================================================================
// WEBSITE SCHEMA
// ============================================================================

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS_INFO.name,
    url: SITE_URL,
    description: "Premier wholesale supplier of rubber tracks and undercarriage parts for construction equipment.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
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
      name: BUSINESS_INFO.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS_INFO.address.street,
        addressLocality: BUSINESS_INFO.address.city,
        addressRegion: BUSINESS_INFO.address.state,
        postalCode: BUSINESS_INFO.address.zipCode,
        addressCountry: BUSINESS_INFO.address.country,
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
// UNDERCARRIAGE COMPONENT PAGE SCHEMA
// ============================================================================

export function generateUndercarriageComponentSchema(
  brand: string,
  model: string,
  componentType: string,
  componentDisplayName: string,
  componentPluralName: string,
  urlPath: string
) {
  const machineSlug = `${brand.toLowerCase().replace(/\s+/g, "-")}-${model.toLowerCase().replace(/\s+/g, "-")}`.replace(/-+/g, "-");
  const pageUrl = `${SITE_URL}/${urlPath}/${machineSlug}`;
  
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${brand} ${model} ${componentDisplayName} Replacement`,
    description: `Find replacement ${componentPluralName.toLowerCase()} for your ${brand} ${model}. Premium quality undercarriage components with wholesale pricing and fast shipping from Houston warehouse.`,
    url: pageUrl,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: componentPluralName,
          item: `${SITE_URL}/${urlPath}`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: `${brand} ${model}`,
          item: pageUrl,
        },
      ],
    },
    mainEntity: {
      "@type": "ItemList",
      name: `${brand} ${model} ${componentPluralName}`,
      description: `Replacement ${componentPluralName.toLowerCase()} available for ${brand} ${model}`,
      numberOfItems: 1,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: `${brand} ${model} ${componentDisplayName}`,
          url: pageUrl,
        },
      ],
    },
    provider: {
      "@type": "Organization",
      name: BUSINESS_INFO.name,
      telephone: BUSINESS_INFO.phoneSchema,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS_INFO.address.street,
        addressLocality: BUSINESS_INFO.address.city,
        addressRegion: BUSINESS_INFO.address.state,
        postalCode: BUSINESS_INFO.address.zipCode,
        addressCountry: BUSINESS_INFO.address.country,
      },
    },
  };
}

// ============================================================================
// SCRIPT TAG GENERATOR
// ============================================================================

export function schemaToScript(schema: object | object[]): string {
  return JSON.stringify(schema);
}
