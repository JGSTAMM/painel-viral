import type { Metadata } from "next";
import { SEO_PAGES } from "@/lib/seo-config";

export const metadata: Metadata = {
  title: SEO_PAGES.usuario.title,
  description: SEO_PAGES.usuario.description,
  alternates: {
    canonical: "/usuario",
    languages: {
      "pt-BR": "/usuario",
      "x-default": "/usuario",
    },
  },
  openGraph: {
    title: SEO_PAGES.usuario.title,
    description: SEO_PAGES.usuario.description,
    url: "/usuario",
  },
};

export default function UsuarioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
