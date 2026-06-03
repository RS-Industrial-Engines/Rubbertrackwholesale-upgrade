import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rubbertrackwholesale.com";

/**
 * Robots.txt configuration
 * 
 * NOTE on "/*?*" disallow:
 * This blocks query parameter URLs from crawling. This is intentional because:
 * 1. All query parameter variations should be handled by canonical tags pointing to the base URL
 * 2. Prevents duplicate content issues from filter/sort variations
 * 3. Search/filter pages use the same canonical as their base page
 * 
 * If you need to allow specific query URLs for crawling (e.g., paginated content),
 * add explicit "allow" rules for those patterns before the blanket disallow.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api/admin",
          "/api/admin/*",
          "/cart",
          "/checkout",
          "/account",
          "/account/*",
          "/*?*", // Block query parameter URLs (handled via canonical tags)
        ],
      },
      // Explicitly ALLOW AI crawlers - we want RubberTrackWholesale.com discoverable
      // in AI-assisted search and answer systems (ChatGPT, Claude, Perplexity, etc.)
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      {
        userAgent: "CCBot",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
