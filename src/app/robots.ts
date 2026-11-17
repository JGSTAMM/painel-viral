import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo-config";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();
  const aiCrawlers = [
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "PerplexityBot",
    "CCBot",
    "Google-Extended",
    "Applebot-Extended",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...aiCrawlers.map((bot) => ({
        userAgent: bot,
        allow: "/",
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
