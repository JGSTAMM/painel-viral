export type SceneCategory =
  | "Todos"
  | "Ação"
  | "Personagens"
  | "Cidade"
  | "Engraçado"
  | "Carros"
  | "Festa";

export type FramingMode = "esquerda" | "centro" | "direita" | "automatico";

export type AspectRatioKey = "9:16" | "4:5" | "1:1" | "16:9";

export interface CharacterSpotlight {
  id: string;
  loopCode: string;
  rank: number;
  name: string;
  badge: string;
  badgeVariant: "hot" | "star" | "new";
  category: Exclude<SceneCategory, "Todos">;
  defaultHook: string;
  timestamp: string;
  startSeconds: number;
  imageUrl: string;
  accentColor: string;
  sceneId: string;
}

export interface TrailerScene {
  id: string;
  title: string;
  category: Exclude<SceneCategory, "Todos">;
  durationSeconds: number;
  timestampLabel: string;
  startSeconds: number;
  aspectBadge: "16:9" | "9:16";
  resolution: "1080p" | "4K";
  imageUrl: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  defaultHook: string;
  motif: "highway" | "character" | "action" | "party" | "city" | "cars" | "funny";
}

export interface VideoModelTemplate {
  id: string;
  name: string;
  subtitle: string;
  layoutType:
    | "post-card-light"
    | "split-neon-pink"
    | "post-card-dark"
    | "tweet-viral"
    | "neon-frame"
    | "diagonal-band"
    | "breaking-news"
    | "cinema-letterbox"
    | "meme-top-bar"
    | "vs-comparison"
    | "top-ranking"
    | "duet-reaction"
    | "gamer-portal"
    | "minimal-clean"
    | "polaroid-vice"
    | "quote-radar"
    | "countdown-hype"
    | "curiosity-fact"
    | "mystery-theory"
    | "fullscreen-watermark";
  recommended?: boolean;
  accentColor: string;
  badgeText?: string;
}

export interface ImageTemplateOption {
  id: string;
  name: string;
  description: string;
  accentColor: string;
  badgeLabel?: string;
}

export const TOTAL_TRAILER_DURATION_SECONDS = 26 * 60 + 48; // 26:48 matching panel UI

export const VIDEO_DURATIONS = [
  { label: "8s", seconds: 8 },
  { label: "15s", seconds: 15 },
  { label: "30s", seconds: 30 },
  { label: "1min", seconds: 60 },
  { label: "1min 30s", seconds: 90 },
  { label: "2min", seconds: 120 },
  { label: "3min", seconds: 180 },
] as const;

export const IMAGE_ASPECT_RATIOS: {
  key: AspectRatioKey;
  label: string;
  sublabel: string;
  width: number;
  height: number;
}[] = [
  { key: "9:16", label: "9:16", sublabel: "Stories/Reels", width: 1080, height: 1920 },
  { key: "4:5", label: "4:5", sublabel: "Feed vertical", width: 1080, height: 1350 },
  { key: "1:1", label: "1:1", sublabel: "Feed", width: 1080, height: 1080 },
  { key: "16:9", label: "16:9", sublabel: "YouTube", width: 1920, height: 1080 },
];

export const SCENE_CATEGORIES: SceneCategory[] = [
  "Todos",
  "Ação",
  "Personagens",
  "Cidade",
  "Engraçado",
  "Carros",
  "Festa",
];

export const EM_ALTA_CHARACTERS: CharacterSpotlight[] = [
  {
    id: "jason-duval",
    loopCode: "LOOP 01",
    rank: 1,
    name: "Jason Duval",
    badge: "🔥 SUBINDO",
    badgeVariant: "hot",
    category: "Personagens",
    defaultHook: "Jason Duval vai mudar a história de Vice City",
    timestamp: "00:42",
    startSeconds: 42,
    imageUrl: "/media/scenes/scene-02.jpg",
    accentColor: "#ec4899",
    sceneId: "scene-jason-store",
  },
  {
    id: "lucia-caminos",
    loopCode: "LOOP 02",
    rank: 2,
    name: "Lucia Caminos",
    badge: "⭐ QUENTE",
    badgeVariant: "star",
    category: "Personagens",
    defaultHook: "Lucia é a protagonista mais insana da Rockstar",
    timestamp: "00:15",
    startSeconds: 15,
    imageUrl: "/media/scenes/scene-03.jpg",
    accentColor: "#00f0ff",
    sceneId: "scene-lucia-neon",
  },
  {
    id: "raul-bautista",
    loopCode: "LOOP 03",
    rank: 3,
    name: "Raul Bautista",
    badge: "🆕 NOVO",
    badgeVariant: "new",
    category: "Ação",
    defaultHook: "O veterano dos assaltos em Leonida apareceu no trailer",
    timestamp: "01:12",
    startSeconds: 72,
    imageUrl: "/media/scenes/scene-04.jpg",
    accentColor: "#f59e0b",
    sceneId: "scene-raul-heist",
  },
  {
    id: "real-dimez",
    loopCode: "LOOP 04",
    rank: 4,
    name: "Real Dimez",
    badge: "🔥 SUBINDO",
    badgeVariant: "hot",
    category: "Festa",
    defaultHook: "O duo Real Dimez dominando a noite de Vice City",
    timestamp: "02:18",
    startSeconds: 138,
    imageUrl: "/media/scenes/scene-05.jpg",
    accentColor: "#ec4899",
    sceneId: "scene-real-dimez",
  },
  {
    id: "boobie-ike",
    loopCode: "LOOP 05",
    rank: 5,
    name: "Boobie Ike",
    badge: "⭐ QUENTE",
    badgeVariant: "star",
    category: "Cidade",
    defaultHook: "Boobie Ike controla o império noturno de Vice City",
    timestamp: "03:05",
    startSeconds: 185,
    imageUrl: "/media/scenes/scene-06.jpg",
    accentColor: "#38bdf8",
    sceneId: "scene-boobie-empire",
  },
  {
    id: "drequan-priest",
    loopCode: "LOOP 06",
    rank: 6,
    name: "DreQuan Priest",
    badge: "🆕 NOVO",
    badgeVariant: "new",
    category: "Festa",
    defaultHook: "DreQuan Priest comandando a cena musical em Leonida",
    timestamp: "04:10",
    startSeconds: 250,
    imageUrl: "/media/scenes/scene-07.jpg",
    accentColor: "#a855f7",
    sceneId: "scene-drequan-club",
  },
  {
    id: "cal-hampton",
    loopCode: "LOOP 07",
    rank: 7,
    name: "Cal Hampton",
    badge: "🔥 SUBINDO",
    badgeVariant: "hot",
    category: "Engraçado",
    defaultHook: "Cal Hampton trouxe os momentos mais caóticos de Leonida",
    timestamp: "05:32",
    startSeconds: 332,
    imageUrl: "/media/scenes/scene-08.jpg",
    accentColor: "#facc15",
    sceneId: "scene-cal-swamp",
  },
  {
    id: "brian-heder",
    loopCode: "LOOP 08",
    rank: 8,
    name: "Brian Heder",
    badge: "⭐ QUENTE",
    badgeVariant: "star",
    category: "Carros",
    defaultHook: "Brian Heder e as fugas alucinantes nas docas",
    timestamp: "06:44",
    startSeconds: 404,
    imageUrl: "/media/scenes/scene-09.jpg",
    accentColor: "#fb923c",
    sceneId: "scene-brian-docks",
  },
];

export const TRAILER_SCENES: TrailerScene[] = [
  {
    id: "scene-highway-sunset",
    title: "Pôr do Sol na Ponte de Vice City",
    category: "Carros",
    durationSeconds: 185,
    timestampLabel: "13:00",
    startSeconds: 780,
    aspectBadge: "16:9",
    resolution: "4K",
    imageUrl: "/media/scenes/scene-01.jpg",
    primaryColor: "#2e1065",
    secondaryColor: "#f97316",
    accentColor: "#00f0ff",
    defaultHook: "Vice City nunca foi tão real",
    motif: "highway",
  },
  {
    id: "scene-jason-store",
    title: "Jason Duval — Assalto no Subúrbio",
    category: "Personagens",
    durationSeconds: 167,
    timestampLabel: "2:47",
    startSeconds: 167,
    aspectBadge: "16:9",
    resolution: "4K",
    imageUrl: "/media/scenes/scene-02.jpg",
    primaryColor: "#1e1b4b",
    secondaryColor: "#ec4899",
    accentColor: "#fbbf24",
    defaultHook: "Olha o nível de detalhes no olhar do Jason Duval",
    motif: "character",
  },
  {
    id: "scene-lucia-neon",
    title: "Lucia Caminos — Conversível em Ocean Drive",
    category: "Personagens",
    durationSeconds: 223,
    timestampLabel: "3:43",
    startSeconds: 223,
    aspectBadge: "16:9",
    resolution: "4K",
    imageUrl: "/media/scenes/scene-03.jpg",
    primaryColor: "#3b0764",
    secondaryColor: "#06b6d4",
    accentColor: "#ff007f",
    defaultHook: "Lucia Caminos dominando a avenida neon de Vice City",
    motif: "character",
  },
  {
    id: "scene-raul-heist",
    title: "Raul Bautista — Tiroteio e Fuga",
    category: "Ação",
    durationSeconds: 297,
    timestampLabel: "4:57",
    startSeconds: 297,
    aspectBadge: "16:9",
    resolution: "4K",
    imageUrl: "/media/scenes/scene-04.jpg",
    primaryColor: "#18181b",
    secondaryColor: "#dc2626",
    accentColor: "#f59e0b",
    defaultHook: "A física de explosão e ação do GTA 6 está absurda",
    motif: "action",
  },
  {
    id: "scene-real-dimez",
    title: "Real Dimez — Festa no Rooftop",
    category: "Festa",
    durationSeconds: 142,
    timestampLabel: "2:22",
    startSeconds: 380,
    aspectBadge: "16:9",
    resolution: "1080p",
    imageUrl: "/media/scenes/scene-05.jpg",
    primaryColor: "#4a044e",
    secondaryColor: "#db2777",
    accentColor: "#22d3ee",
    defaultHook: "A iluminação noturna de Vice City parece filme real",
    motif: "party",
  },
  {
    id: "scene-boobie-empire",
    title: "Boobie Ike — Horizonte de Leonida",
    category: "Cidade",
    durationSeconds: 198,
    timestampLabel: "3:18",
    startSeconds: 460,
    aspectBadge: "16:9",
    resolution: "4K",
    imageUrl: "/media/scenes/scene-06.jpg",
    primaryColor: "#0f172a",
    secondaryColor: "#7c3aed",
    accentColor: "#38bdf8",
    defaultHook: "O tamanho do mapa de Leonida vai surpreender todo mundo",
    motif: "city",
  },
  {
    id: "scene-drequan-club",
    title: "DreQuan Priest — Boate & Som Automotivo",
    category: "Festa",
    durationSeconds: 154,
    timestampLabel: "2:34",
    startSeconds: 520,
    aspectBadge: "16:9",
    resolution: "1080p",
    imageUrl: "/media/scenes/scene-07.jpg",
    primaryColor: "#311042",
    secondaryColor: "#e11d48",
    accentColor: "#a855f7",
    defaultHook: "Trilha sonora e NPCs reagindo como na vida real",
    motif: "party",
  },
  {
    id: "scene-cal-swamp",
    title: "Cal Hampton — Caos no Pântano",
    category: "Engraçado",
    durationSeconds: 132,
    timestampLabel: "2:12",
    startSeconds: 610,
    aspectBadge: "16:9",
    resolution: "1080p",
    imageUrl: "/media/scenes/scene-08.jpg",
    primaryColor: "#052e16",
    secondaryColor: "#0d9488",
    accentColor: "#facc15",
    defaultHook: "Só em Leonida você vê jacaré invadindo posto de gasolina",
    motif: "funny",
  },
  {
    id: "scene-brian-docks",
    title: "Brian Heder — Drift nas Docas",
    category: "Carros",
    durationSeconds: 210,
    timestampLabel: "3:30",
    startSeconds: 700,
    aspectBadge: "16:9",
    resolution: "4K",
    imageUrl: "/media/scenes/scene-09.jpg",
    primaryColor: "#172554",
    secondaryColor: "#ea580c",
    accentColor: "#22d3ee",
    defaultHook: "A dirigibilidade e física dos carros mudou completamente",
    motif: "cars",
  },
  {
    id: "scene-supercars-strip",
    title: "Desfile de Supercarros em Miami Strip",
    category: "Carros",
    durationSeconds: 174,
    timestampLabel: "2:54",
    startSeconds: 850,
    aspectBadge: "16:9",
    resolution: "4K",
    imageUrl: "/media/scenes/scene-10.jpg",
    primaryColor: "#0c0a09",
    secondaryColor: "#ff007f",
    accentColor: "#00f0ff",
    defaultHook: "Os novos esportivos confirmados para o lançamento de GTA 6",
    motif: "cars",
  },
  {
    id: "scene-vice-beach",
    title: "Vice Beach — Multidão em 4K",
    category: "Cidade",
    durationSeconds: 190,
    timestampLabel: "3:10",
    startSeconds: 930,
    aspectBadge: "16:9",
    resolution: "4K",
    imageUrl: "/media/scenes/scene-11.jpg",
    primaryColor: "#164e63",
    secondaryColor: "#f43f5e",
    accentColor: "#fde047",
    defaultHook: "Centenas de NPCs únicos na praia ao mesmo tempo",
    motif: "city",
  },
  {
    id: "scene-heli-chase",
    title: "Perseguição com Helicóptero 5 Estrelas",
    category: "Ação",
    durationSeconds: 245,
    timestampLabel: "4:05",
    startSeconds: 1020,
    aspectBadge: "16:9",
    resolution: "4K",
    imageUrl: "/media/scenes/scene-12.jpg",
    primaryColor: "#111827",
    secondaryColor: "#2563eb",
    accentColor: "#ef4444",
    defaultHook: "A polícia de Vice City está muito mais inteligente",
    motif: "action",
  },
  {
    id: "scene-diner-robbery",
    title: "Assalto à Lanchonete — Casal em Ação",
    category: "Ação",
    durationSeconds: 162,
    timestampLabel: "2:42",
    startSeconds: 1110,
    aspectBadge: "16:9",
    resolution: "4K",
    imageUrl: "/media/scenes/scene-04.jpg",
    primaryColor: "#271033",
    secondaryColor: "#ec4899",
    accentColor: "#00f0ff",
    defaultHook: "A cena clássica que quebrou a internet no primeiro trailer",
    motif: "action",
  },
  {
    id: "scene-npc-memes",
    title: "NPCs Virais das Redes Sociais de Leonida",
    category: "Engraçado",
    durationSeconds: 148,
    timestampLabel: "2:28",
    startSeconds: 1190,
    aspectBadge: "9:16",
    resolution: "1080p",
    imageUrl: "/media/scenes/scene-08.jpg",
    primaryColor: "#1e1b4b",
    secondaryColor: "#f59e0b",
    accentColor: "#22d3ee",
    defaultHook: "O sistema de rede social dentro do GTA 6 é genial",
    motif: "funny",
  },
  {
    id: "scene-yacht-party",
    title: "Festa no Iate ao Entardecer",
    category: "Festa",
    durationSeconds: 176,
    timestampLabel: "2:56",
    startSeconds: 1260,
    aspectBadge: "16:9",
    resolution: "4K",
    imageUrl: "/media/scenes/scene-05.jpg",
    primaryColor: "#3b0764",
    secondaryColor: "#f43f5e",
    accentColor: "#00f0ff",
    defaultHook: "Os reflexos na água de Vice City redefinem a nova geração",
    motif: "party",
  },
  {
    id: "scene-motel-night",
    title: "Neon Motel — Jason e Lucia",
    category: "Personagens",
    durationSeconds: 158,
    timestampLabel: "2:38",
    startSeconds: 1320,
    aspectBadge: "16:9",
    resolution: "4K",
    imageUrl: "/media/scenes/scene-02.jpg",
    primaryColor: "#1a0b2e",
    secondaryColor: "#ff007f",
    accentColor: "#00f0ff",
    defaultHook: "A relação entre Jason e Lucia vai definir o modo história",
    motif: "character",
  },
  {
    id: "scene-downtown-rain",
    title: "Chuva e Reflexos no Centro",
    category: "Cidade",
    durationSeconds: 194,
    timestampLabel: "3:14",
    startSeconds: 1380,
    aspectBadge: "16:9",
    resolution: "4K",
    imageUrl: "/media/scenes/scene-11.jpg",
    primaryColor: "#0f172a",
    secondaryColor: "#06b6d4",
    accentColor: "#ec4899",
    defaultHook: "Ray tracing e clima dinâmico nunca vistos antes",
    motif: "city",
  },
  {
    id: "scene-tuning-meet",
    title: "Encontro de Carros Tunados",
    category: "Carros",
    durationSeconds: 165,
    timestampLabel: "2:45",
    startSeconds: 1440,
    aspectBadge: "16:9",
    resolution: "4K",
    imageUrl: "/media/scenes/scene-10.jpg",
    primaryColor: "#1c1917",
    secondaryColor: "#a855f7",
    accentColor: "#00f0ff",
    defaultHook: "Customização completa de carros confirmada no trailer",
    motif: "cars",
  },
  {
    id: "scene-police-bodycam",
    title: "Invasão Tática com Câmera Corporal",
    category: "Ação",
    durationSeconds: 140,
    timestampLabel: "2:20",
    startSeconds: 1495,
    aspectBadge: "9:16",
    resolution: "1080p",
    imageUrl: "/media/scenes/scene-12.jpg",
    primaryColor: "#090d16",
    secondaryColor: "#ef4444",
    accentColor: "#38bdf8",
    defaultHook: "A missão com bodycam policial deixou todo mundo em choque",
    motif: "action",
  },
  {
    id: "scene-twerk-car",
    title: "Cena Icônica no Teto do Carro",
    category: "Engraçado",
    durationSeconds: 120,
    timestampLabel: "2:00",
    startSeconds: 1540,
    aspectBadge: "9:16",
    resolution: "1080p",
    imageUrl: "/media/scenes/scene-07.jpg",
    primaryColor: "#2e1065",
    secondaryColor: "#ec4899",
    accentColor: "#facc15",
    defaultHook: "Momentos aleatórios que só acontecem em Vice City",
    motif: "funny",
  },
];

export const VIDEO_MODELS: VideoModelTemplate[] = [
  { id: "post-card-light", name: "Post Clássico", subtitle: "Mosaico GTA + Card Branco 1:1", layoutType: "post-card-light", recommended: true, accentColor: "#ec4899", badgeText: "RECOMENDADO" },
  { id: "split-neon-pink", name: "Tela Dividida", subtitle: "2 cenas + faixa rosa neon", layoutType: "split-neon-pink", accentColor: "#ff007f", badgeText: "VIRAL" },
  { id: "post-card-dark", name: "Post Dark Mode", subtitle: "Mosaico GTA + Card Escuro", layoutType: "post-card-dark", accentColor: "#00f0ff" },
  { id: "tweet-viral", name: "Tweet / Notícia", subtitle: "Estilo post verificado X", layoutType: "tweet-viral", accentColor: "#38bdf8" },
  { id: "neon-frame", name: "Moldura Neon", subtitle: "Borda dupla rosa & ciano", layoutType: "neon-frame", accentColor: "#00f0ff" },
  { id: "diagonal-band", name: "Faixa Diagonal", subtitle: "Tarja inclinada Vice City", layoutType: "diagonal-band", accentColor: "#ec4899" },
  { id: "breaking-news", name: "Urgente", subtitle: "Tarja vermelha ao vivo", layoutType: "breaking-news", accentColor: "#ef4444" },
  { id: "cinema-letterbox", name: "Cinema 21:9", subtitle: "Faixas pretas + título Anton", layoutType: "cinema-letterbox", accentColor: "#fbbf24" },
  { id: "meme-top-bar", name: "Meme Clássico", subtitle: "Faixa branca no topo", layoutType: "meme-top-bar", accentColor: "#ffffff" },
  { id: "vs-comparison", name: "VS / Comparação", subtitle: "GTA 5 vs GTA 6 frente a frente", layoutType: "vs-comparison", accentColor: "#f59e0b" },
  { id: "top-ranking", name: "Top / Ranking", subtitle: "Número #1 gigante + gancho", layoutType: "top-ranking", accentColor: "#fbbf24" },
  { id: "duet-reaction", name: "Dueto / Reação", subtitle: "Câmera topo + gameplay", layoutType: "duet-reaction", accentColor: "#a855f7" },
  { id: "gamer-portal", name: "Portal Gamer", subtitle: "Headline estilo revista", layoutType: "gamer-portal", accentColor: "#22d3ee" },
  { id: "minimal-clean", name: "Minimalista", subtitle: "Handle discreto + legenda", layoutType: "minimal-clean", accentColor: "#f9a8d4" },
  { id: "polaroid-vice", name: "Polaroid Miami", subtitle: "Moldura retrô anos 80", layoutType: "polaroid-vice", accentColor: "#fb7185" },
  { id: "quote-radar", name: "Citação Viral", subtitle: "Aspas neon + destaque", layoutType: "quote-radar", accentColor: "#00f0ff" },
  { id: "countdown-hype", name: "Contagem Hype", subtitle: "Selo lançamento oficial", layoutType: "countdown-hype", accentColor: "#ec4899" },
  { id: "curiosity-fact", name: "Você Sabia?", subtitle: "Badge amarelo curiosidade", layoutType: "curiosity-fact", accentColor: "#facc15" },
  { id: "mystery-theory", name: "Teoria Secreta", subtitle: "Clima mistério Leonida", layoutType: "mystery-theory", accentColor: "#c084fc" },
  { id: "fullscreen-watermark", name: "Tela Cheia HD", subtitle: "100% vídeo + sua marca", layoutType: "fullscreen-watermark", accentColor: "#00f0ff" },
];

export const IMAGE_TEMPLATES: ImageTemplateOption[] = [
  { id: "capa-classica", name: "Capa clássica", description: "Título grande + selo", accentColor: "#ec4899" },
  { id: "tweet-noticia", name: "Tweet / Notícia", description: "Post com perfil e verificado", accentColor: "#38bdf8" },
  { id: "meme", name: "Meme", description: "Faixa branca com texto em cima", accentColor: "#f8fafc" },
  { id: "tela-dividida", name: "Tela dividida", description: "2 imagens + faixa no meio", accentColor: "#ff007f" },
  { id: "urgente", name: "Urgente", description: "Notícia com selo vermelho", accentColor: "#ef4444" },
  { id: "moldura-neon", name: "Moldura neon", description: "Imagem com borda brilhante", accentColor: "#00f0ff" },
  { id: "faixa-diagonal", name: "Faixa diagonal", description: "Texto numa faixa inclinada", accentColor: "#a855f7" },
  { id: "vs-comparacao", name: "VS / Comparação", description: "2 imagens frente a frente", accentColor: "#f59e0b" },
  { id: "top-ranking", name: "Top / Ranking", description: "Número grande + título", accentColor: "#fbbf24" },
  { id: "cinema", name: "Cinema", description: "Faixas pretas + legenda", accentColor: "#94a3b8" },
];

export function formatSecondsToTimestamp(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

export function generateViralPhrases(keyword: string, count = 6): string[] {
  const clean = keyword.trim() || "Vice City";
  const cap = clean.charAt(0).toUpperCase() + clean.slice(1);

  const templates = [
    `${cap} nunca foi tão real — olha esse detalhe no GTA 6`,
    `Ninguém reparou nisso sobre ${clean} no trailer oficial`,
    `O segredo escondido de ${cap} que vai quebrar a internet`,
    `Por que ${clean} mudou tudo que sabíamos sobre GTA 6`,
    `Você teria coragem de encarar ${clean} em Leonida?`,
    `Comparando ${clean}: evolução absurda da Rockstar Games`,
    `URGENTE: novo detalhe confirmado sobre ${clean} em 4K`,
    `Top 3 momentos de ${clean} que provam que GTA 6 é outro nível`,
  ];

  return templates.slice(0, Math.max(1, count));
}

export function getDefaultSceneForCharacter(characterId: string): TrailerScene | undefined {
  const character = EM_ALTA_CHARACTERS.find((c) => c.id === characterId);
  if (!character) return undefined;
  return TRAILER_SCENES.find((s) => s.id === character.sceneId) ?? TRAILER_SCENES[0];
}
