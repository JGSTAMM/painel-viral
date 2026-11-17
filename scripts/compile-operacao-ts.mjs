import fs from 'node:fs';
import path from 'node:path';

const allRoteiros = JSON.parse(fs.readFileSync('scratch/notion_full/all_roteiros.json', 'utf8'));
const allGanchos = JSON.parse(fs.readFileSync('scratch/notion_full/all_ganchos_parsed.json', 'utf8'));
const allTitulosLegendas = JSON.parse(fs.readFileSync('scratch/notion_full/all_titulos_legendas_parsed.json', 'utf8'));
const allCalendario = JSON.parse(fs.readFileSync('scratch/notion_full/all_calendario_parsed.json', 'utf8'));
const allMapa = JSON.parse(fs.readFileSync('scratch/notion_full/all_mapa_parsed.json', 'utf8'));

// Parse roteiro text into structured fields
function parseRoteiroText(title, text) {
  const codeMatch = title.match(/^([0-9]{2}|C[0-9]{2})\.\s*(.*)$/);
  const code = codeMatch ? codeMatch[1] : '01';
  const cleanTitle = codeMatch ? codeMatch[2] : title;

  const getSection = (key) => {
    const regex = new RegExp(`${key}:\\s*([^\\n]+(?:\\n(?!Número:|Categoria:|Tema:|Objetivo:|Duração sugerida:|GANCHO:|CONTEXTO:|DESENVOLVIMENTO \\/ ENTREGA:|FECHAMENTO:|CTA:|Título sugerido:|Legenda sugerida:|Material visual recomendado:|Categoria da Central de Mídia:)[^\\n]+)*)`, 'i');
    const m = text.match(regex);
    return m ? m[1].trim() : '';
  };

  const category = getSection('Categoria') || 'Notícias e Atualizações';
  const theme = getSection('Tema') || cleanTitle;
  const objective = getSection('Objetivo') || 'Vídeo rápido de engajamento';
  const durStr = getSection('Duração sugerida');
  const durMatch = durStr.match(/(\d+)/);
  const suggestedDuration = durMatch ? parseInt(durMatch[1], 10) : 30;

  const hook = getSection('GANCHO') || `Novo detalhe em GTA VI: ${theme}`;
  const context = getSection('CONTEXTO') || '';
  const development = getSection('DESENVOLVIMENTO / ENTREGA') || '';
  const closing = getSection('FECHAMENTO') || '';
  const cta = getSection('CTA') || 'Comente o que achou!';

  const suggestedTitle = getSection('Título sugerido') || `GTA VI: ${theme}`;
  const suggestedCaption = getSection('Legenda sugerida') || `${theme} em GTA VI. O que você acha? Deixe nos comentários! #gtavi #gta6`;
  const recommendedVisual = getSection('Material visual recomendado') || 'Cenas sem áudio + frames';
  const gdriveCategory = getSection('Categoria da Central de Mídia') || 'Cenas sem Áudio';

  // find drive link in text
  const driveUrlMatch = text.match(/https:\/\/drive\.google\.com\/[^\s\)]+/);
  const gdriveFolderUrl = driveUrlMatch ? driveUrlMatch[0] : 'https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG';

  return {
    id: `rot-${code.toLowerCase()}`,
    code,
    title: cleanTitle,
    category: category.replace(/^[^\w\s]+/, '').trim(),
    theme,
    objective,
    suggestedDurationSeconds: suggestedDuration,
    hook,
    context,
    development,
    closing,
    cta,
    suggestedTitle,
    suggestedCaption,
    recommendedVisual,
    gdriveCategory,
    gdriveFolderUrl
  };
}

const parsedRoteiros = allRoteiros.map(r => parseRoteiroText(r.title, r.text));

// Parse Ganchos
const parsedGanchos = allGanchos.map(g => {
  const iconMatch = g.category.match(/^([0-9]+\.\s*)?([^\w\s]+)?\s*(.*)$/);
  return {
    id: `cat-${g.category.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`,
    category: g.category.replace(/^[0-9]+\.\s*/, '').trim(),
    icon: iconMatch?.[2] || '🪝',
    hooks: g.hooks.map(h => ({
      number: h.number || '001',
      hook: h.hook
    }))
  };
});

// Parse Titles & Captions
const parsedTitles = allTitulosLegendas.titles.map(t => {
  const iconMatch = t.category.match(/^([0-9]+\.\s*)?([^\w\s]+)?\s*(.*)$/);
  return {
    id: `tit-${t.category.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`,
    category: t.category.replace(/^[0-9]+\.\s*/, '').trim(),
    icon: iconMatch?.[2] || '✍️',
    titles: t.titles.map(item => ({
      number: item.number || '001',
      title: item.title
    }))
  };
});

const parsedCaptions = allTitulosLegendas.captions.map(c => {
  const iconMatch = c.category.match(/^([0-9]+\.\s*)?([^\w\s]+)?\s*(.*)$/);
  return {
    id: `cap-${c.category.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`,
    category: c.category.replace(/^[0-9]+\.\s*/, '').trim(),
    icon: iconMatch?.[2] || '💬',
    captions: c.captions.map(item => ({
      number: item.number || '01',
      caption: item.caption
    }))
  };
});

// Parse Calendario 30D
const parsedCalendario = allCalendario.map((d, idx) => {
  const dayNum = idx + 1;
  const title = d.title.replace(/^Dia\s*\d+\s*—\s*/i, '');
  const text = d.text || '';
  
  const getField = (label) => {
    const m = text.match(new RegExp(`${label}:\\s*([^\\n]+)`, 'i'));
    return m ? m[1].trim() : '';
  };

  const category = getField('Categoria') || 'Radar e Atualizações';
  const format = getField('Formato') || 'Vídeo curto (30s)';
  const diff = dayNum <= 10 ? 'facil' : (dayNum <= 22 ? 'media' : 'avancada');

  return {
    day: dayNum,
    week: Math.ceil(dayNum / 7),
    title,
    category,
    difficulty: diff,
    format,
    hookPreview: `Dia ${dayNum < 10 ? '0' + dayNum : dayNum}: ${title}`,
    recommendedScriptId: `rot-${dayNum < 10 ? '0' + dayNum : dayNum}`,
    gdriveFolderUrl: 'https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1'
  };
});

// Parse Mapa (40 subnichos)
const parsedMapa = allMapa.map((m, idx) => {
  const subNum = idx + 1;
  const numStr = subNum < 10 ? `0${subNum}` : `${subNum}`;
  const cleanTitle = m.title.replace(/^\d{2}\.\s*/, '');
  const text = m.text || '';

  const getF = (lbl) => {
    const r = new RegExp(`${lbl}:\\s*([^\\n]+)`, 'i');
    const match = text.match(r);
    return match ? match[1].trim() : '';
  };

  const desc = getF('Descrição') || `Subnicho focado em ${cleanTitle}.`;
  const format = getF('Formato') || 'Vídeo curto narrado';
  const difficulty = subNum % 3 === 1 ? 'Fácil' : (subNum % 3 === 2 ? 'Média' : 'Avançada');
  const potential = subNum <= 15 ? 'Muito Alto' : 'Alto';

  const ideas = [
    `Ideia 1: ${cleanTitle} — revelação e detalhes escondidos`,
    `Ideia 2: ${cleanTitle} — teoria comprovada por frames`,
    `Ideia 3: ${cleanTitle} — comparação direta com GTA 5`
  ];

  return {
    number: numStr,
    title: cleanTitle,
    description: desc,
    potential,
    difficulty,
    format,
    ideas
  };
});

// Central de Midia areas
const midiaAreas = [
  {
    id: "cenas-sem-audio",
    name: "Cenas sem Áudio",
    icon: "🔇",
    area: "🎬 Cenas para Produção",
    count: 129,
    gdriveUrl: "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1",
    usage: "Vídeos narrados, texto na tela e voz de IA.",
    badge: "129 clipes MP4"
  },
  {
    id: "cenas-com-audio",
    name: "Cenas com Áudio",
    icon: "🔊",
    area: "🎬 Cenas para Produção",
    count: 168,
    gdriveUrl: "https://drive.google.com/drive/folders/1j7SZS5eIB2mm6Laa52f48BUP1T371cDO",
    usage: "Falas, ambientação e momentos de impacto.",
    badge: "168 clipes MP4"
  },
  {
    id: "personagens",
    name: "Banco de Personagens",
    icon: "👥",
    area: "🖼️ Banco Visual",
    count: 70,
    gdriveUrl: "https://drive.google.com/drive/folders/19P6D-9hhXqf6sNDNV9UyUwnGoYcPB9b7",
    usage: "Conteúdo sobre protagonistas (Lucia, Jason) e secundários.",
    badge: "70 fotos HD"
  },
  {
    id: "locais-cenarios",
    name: "Locais e Cenários",
    icon: "🌴",
    area: "🖼️ Banco Visual",
    count: 33,
    gdriveUrl: "https://drive.google.com/drive/folders/1pL2TNskVd2UNsdVAeqsLfRCaN-t6-tyF",
    usage: "Mapa de Leonida, Vice City, praias e cidades.",
    badge: "33 fotos HD"
  },
  {
    id: "imagens-gerais",
    name: "Imagens Gerais",
    icon: "🖼️",
    area: "🖼️ Banco Visual",
    count: 9,
    gdriveUrl: "https://drive.google.com/drive/folders/1pK1Q5ihJ8aICNlAwaWX1oe3T1YvkSfZU",
    usage: "Apoio visual e transições.",
    badge: "9 fotos"
  },
  {
    id: "frames-principais",
    name: "Frames Principais",
    icon: "📸",
    area: "📸 Frames para Análise",
    count: 56,
    gdriveUrl: "https://drive.google.com/drive/folders/1-K_G77L4-xA9d3CFFyPVHt9GLteckVcg",
    usage: "Análises, detalhes, teorias e curiosidades em zoom.",
    badge: "56 frames 4K"
  },
  {
    id: "frames-complementares",
    name: "Frames Complementares",
    icon: "🔍",
    area: "📸 Frames para Análise",
    count: 9,
    gdriveUrl: "https://drive.google.com/drive/folders/13Xyk41Vza8RSA_IJQ_sAS-t5Bm3viH5-",
    usage: "Comparações e apoio para análises visuais.",
    badge: "9 frames"
  },
  {
    id: "trailers-oficiais",
    name: "Trailers Oficiais Reais",
    icon: "🎬",
    area: "🎞️ Materiais Oficiais",
    count: 2,
    gdriveUrl: "https://drive.google.com/drive/folders/10K2RK62WLsPcXirqh-DIgNk5b_AyCFUz",
    localFiles: [
      { name: "GTA 6 — Trailer 1 Oficial (Full HD)", path: "/media/gta6-trailer-1.mp4", durationSeconds: 91 },
      { name: "GTA 6 — Trailer 2 Oficial (Full HD)", path: "/media/gta6-trailer-2.mp4", durationSeconds: 125 }
    ],
    usage: "Hype, análise e material oficial de altíssima fidelidade.",
    badge: "2 MP4s Reais"
  },
  {
    id: "ideias-referencia",
    name: "Ideias de Referência",
    icon: "💡",
    area: "💡 Laboratório de Referências",
    count: 67,
    gdriveUrl: "https://drive.google.com/drive/folders/1hEKyxV5iqKDfxnz_auol2nxkbb5Ngfr_",
    usage: "Encontrar pautas, formatos e novos ângulos.",
    badge: "67 referências"
  },
  {
    id: "modelos-prontos",
    name: "Modelos Prontos",
    icon: "✅",
    area: "💡 Laboratório de Referências",
    count: 100,
    gdriveUrl: "https://drive.google.com/drive/folders/1eMP-CaPukCWEeHjGZYGvSXjNDOgsuJRP",
    usage: "Estudar estruturas de vídeos e formatos validados.",
    badge: "100 layouts"
  },
  {
    id: "cortes-referencia",
    name: "Cortes de Referência",
    icon: "✂️",
    area: "💡 Laboratório de Referências",
    count: 8,
    gdriveUrl: "https://drive.google.com/drive/folders/1hEKyxV5iqKDfxnz_auol2nxkbb5Ngfr_",
    usage: "Estudar ritmo, cortes e construção visual.",
    badge: "8 cortes"
  }
];

const tsOutput = `// Generated automatically from Operação GTA VI pack
// Pixirica Tecnologias - Central de Criação de Conteúdo

export interface OperacaoRoteiro {
  id: string;
  code: string;
  title: string;
  category: string;
  theme: string;
  objective: string;
  suggestedDurationSeconds: number;
  hook: string;
  context: string;
  development: string;
  closing: string;
  cta: string;
  suggestedTitle: string;
  suggestedCaption: string;
  recommendedVisual: string;
  gdriveCategory: string;
  gdriveFolderUrl: string;
}

export interface OperacaoGanchoCategory {
  id: string;
  category: string;
  icon: string;
  hooks: Array<{ number: string; hook: string }>;
}

export interface OperacaoTitleCategory {
  id: string;
  category: string;
  icon: string;
  titles: Array<{ number: string; title: string }>;
}

export interface OperacaoCaptionCategory {
  id: string;
  category: string;
  icon: string;
  captions: Array<{ number: string; caption: string }>;
}

export interface OperacaoCalendarioDia {
  day: number;
  week: number;
  title: string;
  category: string;
  difficulty: "facil" | "media" | "avancada";
  format: string;
  hookPreview: string;
  recommendedScriptId: string;
  gdriveFolderUrl: string;
}

export interface OperacaoSubnicho {
  number: string;
  title: string;
  description: string;
  potential: "Médio" | "Alto" | "Muito Alto";
  difficulty: "Fácil" | "Média" | "Avançada";
  format: string;
  ideas: string[];
}

export interface OperacaoMidiaArea {
  id: string;
  name: string;
  icon: string;
  area: string;
  count: number;
  gdriveUrl: string;
  usage: string;
  badge: string;
  localFiles?: Array<{ name: string; path: string; durationSeconds: number }>;
}

export const CENTRAL_DRIVE_ROOT_URL = "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG";
export const TOTAL_CENTRAL_ARQUIVOS = 651;

export const OPERACAO_MIDIA_AREAS: OperacaoMidiaArea[] = ${JSON.stringify(midiaAreas, null, 2)};

export const OPERACAO_ROTEIROS: OperacaoRoteiro[] = ${JSON.stringify(parsedRoteiros, null, 2)};

export const OPERACAO_GANCHOS: OperacaoGanchoCategory[] = ${JSON.stringify(parsedGanchos, null, 2)};

export const OPERACAO_TITULOS: OperacaoTitleCategory[] = ${JSON.stringify(parsedTitles, null, 2)};

export const OPERACAO_LEGENDAS: OperacaoCaptionCategory[] = ${JSON.stringify(parsedCaptions, null, 2)};

export const OPERACAO_CALENDARIO_30D: OperacaoCalendarioDia[] = ${JSON.stringify(parsedCalendario, null, 2)};

export const OPERACAO_MAPA_OPORTUNIDADES: OperacaoSubnicho[] = ${JSON.stringify(parsedMapa, null, 2)};

export const OPERACAO_FLUXO_PASSOS = [
  { step: 1, name: "Pauta & Oportunidade", icon: "🗺️", desc: "Escolha no Calendário de 30 Dias ou no Mapa de 40 Subnichos." },
  { step: 2, name: "Abertura & Gancho", icon: "🪝", desc: "Selecione entre os 150 ganchos de alta retenção." },
  { step: 3, name: "Estrutura do Roteiro", icon: "📜", desc: "Aplique um dos 80 roteiros + 10 coringas com teleprompter." },
  { step: 4, name: "Título & Legenda", icon: "✍️", desc: "Escolha do Cofre com 120 títulos e 60 legendas prontas." },
  { step: 5, name: "Mídia & Clipes", icon: "🎞️", desc: "Abra a pasta correta no Drive (651 arquivos) ou use os Trailers Oficiais MP4." },
  { step: 6, name: "Edição no Estúdio", icon: "✂️", desc: "Aplique os 20 modelos virais, enquadramento 1:1 e sua marca." },
  { step: 7, name: "Publicação & Agendamento", icon: "🚀", desc: "Exporte em Full HD ou agende nos melhores horários." },
] as const;
`;

fs.writeFileSync('src/data/operacao-gta.ts', tsOutput);
console.log(`Saved src/data/operacao-gta.ts (${tsOutput.length} bytes)`);
