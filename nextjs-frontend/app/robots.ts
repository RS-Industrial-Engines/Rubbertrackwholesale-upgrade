import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rubbertrackwholesale.com";

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
          "/*?*", // Block query parameter URLs (handled via canonical URLs)
        ],
      },
      // Note: AI crawlers (GPTBot, ChatGPT-User, CCBot, anthropic-ai) are ALLOWED
      // We want RubberTrackWholesale.com discoverable in AI-assisted search/answer systems
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
