import type { Metadata } from "next";
import { SEO_PAGES } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: SEO_PAGES.entrar.title,
  description: SEO_PAGES.entrar.description,
  alternates: {
    canonical: "/entrar",
    languages: {
      "pt-BR": "/entrar",
      "x-default": "/entrar",
    },
  },
  openGraph: {
    title: SEO_PAGES.entrar.title,
    description: SEO_PAGES.entrar.description,
    url: "/entrar",
  },
};

export default function EntrarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
