import type { MetadataRoute } from "next";
import { SEO_PAGES } from "@/lib/seo-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "GTA 6 Gerador — Painel do Criador",
    short_name: "GTA6GERADOR",
    description: SEO_PAGES.home.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0612",
    theme_color: "#ff007f",
    icons: [
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
    ],
  };
}
