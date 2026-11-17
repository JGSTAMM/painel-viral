import type { Metadata } from "next";
import { CreatorDashboard } from "@/components/dashboard/CreatorDashboard";
import { SeoDocumentationSection } from "@/components/dashboard/SeoDocumentationSection";
import { SEO_PAGES } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: SEO_PAGES.home.title,
  description: SEO_PAGES.home.description,
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      "x-default": "/",
    },
  },
};

export default function HomePage() {
  return <CreatorDashboard footerSlot={<SeoDocumentationSection />} />;
}
