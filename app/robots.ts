import { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/seo";

const base = getSiteUrl();

const publicDisallow = [
  "/dashboard",
  "/settings",
  "/courses",
  "/api/",
  "/suspended",
  "/auth/",
];

type RobotsRule = {
  userAgent: string | string[];
  allow?: string | string[];
  disallow?: string | string[];
  crawlDelay?: number;
};

/** Rules shared by generic and AI crawlers — index marketing & trust pages only. */
function aiRules(userAgent: string): RobotsRule {
  return {
    userAgent,
    allow: [
      "/",
      "/about",
      "/privacy-policy",
      "/terms-of-service",
      "/child-safety",
    ],
    disallow: publicDisallow,
  };
}

export default function robots(): MetadataRoute.Robots {
  const rules: RobotsRule[] = [
    aiRules("*"),
    aiRules("GPTBot"),
    aiRules("ChatGPT-User"),
    aiRules("OAI-SearchBot"),
    aiRules("Google-Extended"),
    aiRules("GoogleOther"),
    aiRules("PerplexityBot"),
    aiRules("Claude-Web"),
    aiRules("anthropic-ai"),
    aiRules("CCBot"),
    aiRules("Applebot"),
    aiRules("Bytespider"),
    aiRules("Amazonbot"),
    aiRules("meta-externalagent"),
  ];

  return {
    rules: rules as MetadataRoute.Robots["rules"],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
