import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const IMAGES_DIR = path.join(PUBLIC_DIR, "images");
const SCENES_DIR = path.join(PUBLIC_DIR, "media", "scenes");

fs.mkdirSync(IMAGES_DIR, { recursive: true });
fs.mkdirSync(SCENES_DIR, { recursive: true });

function buildOgSvg(width, height, isSquare = false) {
  const titleSize = isSquare ? 56 : 74;
  const subSize = isSquare ? 22 : 28;
  const pad = isSquare ? 48 : 72;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#0b0612"/>
        <stop offset="55%" stop-color="#190b28"/>
        <stop offset="100%" stop-color="#2a0d38"/>
      </linearGradient>
      <linearGradient id="neon" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#00f0ff"/>
        <stop offset="50%" stop-color="#ec4899"/>
        <stop offset="100%" stop-color="#ff007f"/>
      </linearGradient>
      <radialGradient id="glowPink" cx="80%" cy="25%" r="55%">
        <stop offset="0%" stop-color="#ff007f" stop-opacity="0.38"/>
        <stop offset="100%" stop-color="#0b0612" stop-opacity="0"/>
      </radialGradient>
      <radialGradient id="glowCyan" cx="15%" cy="85%" r="55%">
        <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.28"/>
        <stop offset="100%" stop-color="#0b0612" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    <rect width="${width}" height="${height}" fill="url(#glowPink)"/>
    <rect width="${width}" height="${height}" fill="url(#glowCyan)"/>
    <rect x="24" y="24" width="${width - 48}" height="${height - 48}" rx="28" fill="none" stroke="url(#neon)" stroke-width="3" opacity="0.65"/>

    <rect x="${pad}" y="${pad}" width="${isSquare ? 240 : 320}" height="42" rx="21" fill="#ff007f" fill-opacity="0.18" stroke="#ff007f" stroke-opacity="0.6"/>
    <text x="${pad + 20}" y="${pad + 27}" fill="#f9a8d4" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" letter-spacing="2">PAINEL DO CRIADOR • HD</text>

    <text x="${pad}" y="${isSquare ? 230 : 250}" fill="#ffffff" font-family="Impact, Arial Black, sans-serif" font-size="${titleSize}" letter-spacing="2">GTA 6 GERADOR</text>
    <text x="${pad}" y="${isSquare ? 295 : 325}" fill="url(#neon)" font-family="Impact, Arial Black, sans-serif" font-size="${isSquare ? 42 : 56}" letter-spacing="1.5">REELS &amp; CORTES VIRAIS</text>

    <text x="${pad}" y="${isSquare ? 360 : 395}" fill="#d8b4fe" font-family="Arial, Helvetica, sans-serif" font-size="${subSize}" font-weight="600">20 Modelos de Vídeo • 10 Templates • Envio Automático</text>

    <rect x="${pad}" y="${height - pad - 54}" width="${isSquare ? 220 : 280}" height="50" rx="25" fill="url(#neon)"/>
    <text x="${pad + (isSquare ? 110 : 140)}" y="${height - pad - 23}" text-anchor="middle" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="800">1080×1920 FULL HD</text>

    <text x="${width - pad}" y="${height - pad - 22}" text-anchor="end" fill="#a78bfa" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700">Pixirica Tecnologias</text>
  </svg>`;
}

function buildLogoSvg(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#00f0ff"/>
        <stop offset="50%" stop-color="#ec4899"/>
        <stop offset="100%" stop-color="#ff007f"/>
      </linearGradient>
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#1b092b"/>
        <stop offset="100%" stop-color="#0b0612"/>
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="112" fill="url(#bg)"/>
    <rect x="18" y="18" width="476" height="476" rx="96" fill="none" stroke="url(#g1)" stroke-width="18"/>
    <text x="256" y="305" text-anchor="middle" fill="url(#g1)" font-family="Impact, Arial Black, sans-serif" font-size="250" letter-spacing="-6">VI</text>
    <text x="256" y="420" text-anchor="middle" fill="#ffffff" font-family="Arial, Helvetica, sans-serif" font-size="52" font-weight="800" letter-spacing="6">GERADOR</text>
  </svg>`;
}

const SCENES = [
  { id: "scene-01", title: "VICE HIGHWAY", sub: "PÔR DO SOL EM LEONIDA", c1: "#2e1065", c2: "#f97316", accent: "#00f0ff", motif: "highway" },
  { id: "scene-02", title: "JASON DUVAL", sub: "AÇÃO NO SUBÚRBIO", c1: "#1e1b4b", c2: "#ec4899", accent: "#fbbf24", motif: "character" },
  { id: "scene-03", title: "LUCIA CAMINOS", sub: "NEON OCEAN DRIVE", c1: "#3b0764", c2: "#06b6d4", accent: "#ff007f", motif: "character" },
  { id: "scene-04", title: "RAUL BAUTISTA", sub: "ASSALTO DE ALTO RISCO", c1: "#18181b", c2: "#dc2626", accent: "#f59e0b", motif: "action" },
  { id: "scene-05", title: "REAL DIMEZ", sub: "NOITE NO CLUBE", c1: "#4a044e", c2: "#db2777", accent: "#22d3ee", motif: "party" },
  { id: "scene-06", title: "BOOBIE IKE", sub: "IMPÉRIO DE VICE CITY", c1: "#0f172a", c2: "#7c3aed", accent: "#38bdf8", motif: "city" },
  { id: "scene-07", title: "DREQUAN PRIEST", sub: "ESTÚDIO & BALADA", c1: "#311042", c2: "#e11d48", accent: "#a855f7", motif: "party" },
  { id: "scene-08", title: "CAL HAMPTON", sub: "PÂNTANO & LOUCURA", c1: "#052e16", c2: "#0d9488", accent: "#facc15", motif: "funny" },
  { id: "scene-09", title: "BRIAN HEDER", sub: "FUGA NAS DOCAS", c1: "#172554", c2: "#ea580c", accent: "#22d3ee", motif: "cars" },
  { id: "scene-10", title: "SUPERCARROS", sub: "VELOCIDADE MÁXIMA", c1: "#0c0a09", c2: "#ff007f", accent: "#00f0ff", motif: "cars" },
  { id: "scene-11", title: "VICE BEACH", sub: "PALMEIRAS & MAR", c1: "#164e63", c2: "#f43f5e", accent: "#fde047", motif: "city" },
  { id: "scene-12", title: "PERSEGUIÇÃO", sub: "HELICÓPTERO POLICIAL", c1: "#111827", c2: "#2563eb", accent: "#ef4444", motif: "action" },
];

function escapeXml(str) {
  return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildSceneSvg(scene) {
  const w = 1280;
  const h = 720;
  const motifShapes =
    scene.motif === "highway" || scene.motif === "cars"
      ? `
        <circle cx="640" cy="300" r="135" fill="${scene.c2}" opacity="0.72"/>
        <rect x="0" y="395" width="${w}" height="325" fill="#0d0618" opacity="0.5"/>
        <polygon points="240,720 550,395 730,395 1040,720" fill="#090514" opacity="0.92"/>
        <line x1="640" y1="405" x2="640" y2="720" stroke="${scene.accent}" stroke-width="6" stroke-dasharray="32 22"/>
        <path d="M510,595 L545,535 L735,535 L770,595 L770,635 L510,635 Z" fill="#130920" stroke="${scene.accent}" stroke-width="4"/>
        <rect x="530" y="582" width="60" height="16" rx="6" fill="#ff007f"/>
        <rect x="690" y="582" width="60" height="16" rx="6" fill="#ff007f"/>
        <path d="M120,420 Q150,270 210,230 M120,420 Q80,300 40,280 M120,420 Q180,330 245,330" stroke="#080310" stroke-width="10" fill="none" stroke-linecap="round"/>
        <path d="M1140,420 Q1110,260 1050,210 M1140,420 Q1185,295 1230,275 M1140,420 Q1075,320 1015,315" stroke="#080310" stroke-width="10" fill="none" stroke-linecap="round"/>
      `
      : scene.motif === "city" || scene.motif === "party"
        ? `
        <rect x="70" y="240" width="130" height="480" fill="#0f071d" opacity="0.9"/>
        <rect x="230" y="150" width="160" height="570" fill="#170b2c" opacity="0.95"/>
        <rect x="420" y="280" width="140" height="440" fill="#0f071d" opacity="0.9"/>
        <rect x="600" y="210" width="150" height="510" fill="#140924" opacity="0.9"/>
        <rect x="780" y="190" width="165" height="530" fill="#170b2c" opacity="0.95"/>
        <rect x="975" y="135" width="195" height="585" fill="#0d0618" opacity="0.95"/>
        <line x1="70" y1="240" x2="200" y2="240" stroke="${scene.accent}" stroke-width="6"/>
        <line x1="230" y1="150" x2="390" y2="150" stroke="#ff007f" stroke-width="6"/>
        <line x1="780" y1="190" x2="945" y2="190" stroke="#ff007f" stroke-width="5"/>
        <line x1="975" y1="135" x2="1170" y2="135" stroke="${scene.accent}" stroke-width="6"/>
        <rect x="265" y="210" width="90" height="12" rx="4" fill="${scene.accent}" opacity="0.65"/>
        <rect x="265" y="250" width="90" height="12" rx="4" fill="#ff007f" opacity="0.55"/>
        <rect x="1010" y="195" width="120" height="14" rx="4" fill="${scene.accent}" opacity="0.65"/>
      `
        : `
        <circle cx="640" cy="340" r="230" fill="${scene.accent}" opacity="0.18"/>
        <circle cx="640" cy="300" r="105" fill="#140924" stroke="${scene.accent}" stroke-width="6"/>
        <path d="M440,680 C440,500 840,500 840,680 Z" fill="#140924" stroke="#ff007f" stroke-width="6"/>
        <line x1="120" y1="140" x2="480" y2="300" stroke="${scene.accent}" stroke-width="2" opacity="0.35"/>
        <line x1="1160" y1="140" x2="800" y2="300" stroke="#ff007f" stroke-width="2" opacity="0.35"/>
      `;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${scene.c1}"/>
        <stop offset="60%" stop-color="${scene.c2}" stop-opacity="0.82"/>
        <stop offset="100%" stop-color="#0b0612"/>
      </linearGradient>
      <radialGradient id="sun" cx="50%" cy="42%" r="48%">
        <stop offset="0%" stop-color="${scene.accent}" stop-opacity="0.52"/>
        <stop offset="100%" stop-color="#0b0612" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="url(#sky)"/>
    <rect width="${w}" height="${h}" fill="url(#sun)"/>
    ${motifShapes}
  </svg>`;
}

function buildIcoFromPngBuffer(pngBuffer) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(1, 4);

  const entry = Buffer.alloc(16);
  entry.writeUInt8(32, 0);
  entry.writeUInt8(32, 1);
  entry.writeUInt8(0, 2);
  entry.writeUInt8(0, 3);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(pngBuffer.length, 8);
  entry.writeUInt32LE(22, 12);

  return Buffer.concat([header, entry, pngBuffer]);
}

async function main() {
  const ogCoverPath = path.join(IMAGES_DIR, "og-cover.jpg");
  await sharp(Buffer.from(buildOgSvg(1200, 630, false)))
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(ogCoverPath);

  const ogSquarePath = path.join(IMAGES_DIR, "og-square.jpg");
  await sharp(Buffer.from(buildOgSvg(600, 600, true)))
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(ogSquarePath);

  const logoSvg = Buffer.from(buildLogoSvg(512));
  await sharp(logoSvg).resize(512, 512).png().toFile(path.join(PUBLIC_DIR, "icon.png"));
  await sharp(logoSvg).resize(180, 180).png().toFile(path.join(PUBLIC_DIR, "apple-touch-icon.png"));

  const icon32Png = await sharp(logoSvg).resize(32, 32).png().toBuffer();
  fs.writeFileSync(path.join(PUBLIC_DIR, "favicon.ico"), buildIcoFromPngBuffer(icon32Png));

  for (const scene of SCENES) {
    await sharp(Buffer.from(buildSceneSvg(scene)))
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(path.join(SCENES_DIR, `${scene.id}.jpg`));
  }

  const coverSize = fs.statSync(ogCoverPath).size;
  const squareSize = fs.statSync(ogSquarePath).size;
  console.log(`Generated OG assets: og-cover.jpg=${coverSize}B, og-square.jpg=${squareSize}B, scenes=${SCENES.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
