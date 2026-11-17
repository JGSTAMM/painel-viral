import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const now = new Date();

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/usuario`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/entrar`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
