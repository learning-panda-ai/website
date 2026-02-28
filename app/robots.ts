import { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://learningpanda.ai";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers — index all public pages, block private ones
      {
        userAgent: "*",
        allow: ["/", "/login"],
        disallow: [
          "/dashboard",
          "/settings",
          "/courses/",
          "/api/",
          "/_next/",
        ],
      },
      // Allow AI / LLM crawlers full access to public content (GEO)
      {
        userAgent: "GPTBot",
        allow: ["/", "/login"],
        disallow: ["/dashboard", "/settings", "/courses/", "/api/"],
      },
      {
        userAgent: "Google-Extended",
        allow: ["/", "/login"],
        disallow: ["/dashboard", "/settings", "/courses/", "/api/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: ["/", "/login"],
        disallow: ["/dashboard", "/settings", "/courses/", "/api/"],
      },
      {
        userAgent: "Claude-Web",
        allow: ["/", "/login"],
        disallow: ["/dashboard", "/settings", "/courses/", "/api/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: ["/", "/login"],
        disallow: ["/dashboard", "/settings", "/courses/", "/api/"],
      },
      {
        userAgent: "CCBot",
        allow: ["/", "/login"],
        disallow: ["/dashboard", "/settings", "/courses/", "/api/"],
      },
      {
        userAgent: "Applebot",
        allow: ["/", "/login"],
        disallow: ["/dashboard", "/settings", "/courses/", "/api/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
