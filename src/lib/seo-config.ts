export const BRAND_NAME = "GTA 6 Gerador";
export const CREATOR_CREDIT = "Desenvolvido com excelência por Pixirica Tecnologias";

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const SEO_PAGES = {
  home: {
    path: "/",
    title: "GTA 6 Gerador — Painel Criador de Cortes e Reels Virais",
    description:
      "Painel completo para criadores de GTA 6: edite Reels em 1 minuto com 20 modelos de vídeo, cortes virais Full HD, imagens e agendamento em 1 toque.",
  },
  usuario: {
    path: "/usuario",
    title: "Painel do Criador — Editor de Vídeo e Cortes GTA 6 HD",
    description:
      "Acesse o Painel do Criador GTA 6 Gerador: monte Reels em 1 minuto, escolha cenas em Em Alta, gere cortes 9:16 limpos e crie capas Full HD agora.",
  },
  entrar: {
    path: "/entrar",
    title: "Entrar no Painel do Criador — Plataforma GTA 6 Gerador",
    description:
      "Faça login no Painel do Criador GTA 6 Gerador para acessar mais de 80 cenas em HD, 20 modelos de vídeo, gerador de capas e agendamento automático.",
  },
} as const;

export const FAQ_ITEMS = [
  {
    question: "Como funciona o Editor de Vídeo do Painel do Criador GTA 6 Gerador?",
    answer:
      "Você escolhe uma cena da Biblioteca HD, de Em Alta ou envia um vídeo MP4 próprio, define o trecho inicial, duração de 8s a 3min, ajusta o enquadramento 1:1 (Esquerda, Centro, Direita ou Automático), seleciona um dos 20 modelos visuais e exporta seu Reels ou lote de 5 cortes em Full HD 1080×1920.",
  },
  {
    question: "Quais formatos de vídeo e imagem estão disponíveis para exportação?",
    answer:
      "Para vídeos e cortes limpos sem sobreposição, o sistema suporta 9:16 (1080×1920 para Reels, TikTok e Shorts), 16:9 (1920×1080 para YouTube) e 1:1 (1080×1080 para Feed). No módulo Gerar Imagem você também exporta capas em 4:5 (1080×1350).",
  },
  {
    question: "Como funciona a geração em série de 5 vídeos com frases diferentes?",
    answer:
      "Com base na palavra-chave informada na aba Legenda, o motor gera 5 ganchos virais distintos automaticamente e renderiza cada corte com sua foto, nome de canal e selo verificado configurados em Minha Logo.",
  },
  {
    question: "Posso agendar publicações para Instagram, TikTok e YouTube Shorts?",
    answer:
      "Sim. A ferramenta Envio Automático permite programar data, horário (incluindo sugestões dos melhores horários de GTA 6 às 12h, 18h e 21h), legenda pronta, hashtags e ativar alertas no aparelho.",
  },
] as const;

export function buildJsonLdGraph(baseUrl: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        name: BRAND_NAME,
        url: baseUrl,
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/icon.png`,
          width: 512,
          height: 512,
        },
        founder: {
          "@type": "Organization",
          name: "Pixirica Tecnologias",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: BRAND_NAME,
        inLanguage: "pt-BR",
        publisher: {
          "@type": "Organization",
          name: "Pixirica Tecnologias",
        },
        creator: {
          "@type": "Organization",
          name: "Pixirica Tecnologias",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: `${baseUrl}/?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${baseUrl}/#software`,
        name: "GTA 6 Gerador — Painel do Criador",
        applicationCategory: "MultimediaApplication",
        operatingSystem: "Web",
        url: `${baseUrl}/usuario`,
        description: SEO_PAGES.home.description,
        creator: {
          "@type": "Organization",
          name: "Pixirica Tecnologias",
        },
        publisher: {
          "@type": "Organization",
          name: "Pixirica Tecnologias",
        },
        featureList: [
          "Editor de Reels 1080×1920 em 1 minuto",
          "20 modelos de vídeo interativos",
          "10 templates de imagem Full HD",
          "Cortes Virais limpos 9:16, 16:9 e 1:1",
          "Radar Em Alta com personagens em loop",
          "Envio Automático com melhores horários",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${baseUrl}/#service`,
        name: "GTA 6 Gerador — Tecnologia Pixirica Tecnologias",
        url: baseUrl,
        areaServed: "BR",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Porto Alegre",
          addressRegion: "RS",
          addressCountry: "BR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -30.0346,
          longitude: -51.2177,
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };
}
