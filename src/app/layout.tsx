import type { Metadata } from "next";
import { Anton, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import {
  BRAND_NAME,
  CREATOR_CREDIT,
  SEO_PAGES,
  buildJsonLdGraph,
  getSiteUrl,
} from "@/lib/seo-config";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

const plusJakarta = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SEO_PAGES.home.title,
  description: SEO_PAGES.home.description,
  creator: "Pixirica Tecnologias",
  publisher: "Pixirica Tecnologias",
  authors: [{ name: "Pixirica Tecnologias" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "pt-BR": "/",
      "x-default": "/",
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: BRAND_NAME,
    title: SEO_PAGES.home.title,
    description: SEO_PAGES.home.description,
    images: [
      {
        url: "/images/og-cover.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "GTA 6 Gerador — Painel do Criador de Reels e Cortes Virais",
      },
      {
        url: "/images/og-square.jpg",
        width: 600,
        height: 600,
        type: "image/jpeg",
        alt: "GTA 6 Gerador — Miniatura do Painel do Criador",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_PAGES.home.title,
    description: SEO_PAGES.home.description,
    images: ["/images/og-cover.jpg"],
  },
  other: {
    "geo.region": "BR-RS",
    "geo.placename": "Porto Alegre, Rio Grande do Sul, Brasil",
    "geo.position": "-30.0346;-51.2177",
    ICBM: "-30.0346, -51.2177",
    "developed-by": CREATOR_CREDIT,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = buildJsonLdGraph(siteUrl);

  return (
    <html
      lang="pt-BR"
      className={`${anton.variable} ${plusJakarta.variable} antialiased`}
    >
      <body className="min-h-screen bg-[#0b0612] text-white selection:bg-pink-500 selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
