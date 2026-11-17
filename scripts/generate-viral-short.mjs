import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import sharp from "sharp";

const ROOT = process.cwd();
const INPUT_VIDEO = path.join(ROOT, "public", "media", "gta6-trailer-1.mp4");
const OUTPUT_VIDEO = path.join(ROOT, "public", "downloads", "gta6-viral-shorts.mp4");
const OUTPUT_MEDIA = path.join(ROOT, "public", "media", "gta6-viral-shorts.mp4");
const OVERLAY_PNG = path.join(ROOT, "public", "downloads", "overlay-temp.png");

// Ensure directories
if (!fs.existsSync(path.join(ROOT, "public", "downloads"))) {
  fs.mkdirSync(path.join(ROOT, "public", "downloads"), { recursive: true });
}

async function createOverlay() {
  const width = 1080;
  const height = 1920;

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Neon Gradients -->
      <linearGradient id="neonPink" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ff007f" />
        <stop offset="100%" stop-color="#ec4899" />
      </linearGradient>
      <linearGradient id="neonCyan" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#00f0ff" />
        <stop offset="100%" stop-color="#3b82f6" />
      </linearGradient>
      <linearGradient id="cardBg" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#12061f" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#07020d" stop-opacity="0.98" />
      </linearGradient>
      <filter id="glowPink" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <filter id="shadowDark" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.9" />
      </filter>
    </defs>

    <!-- Top Floating Header Card -->
    <rect x="60" y="80" width="960" height="300" rx="28" fill="url(#cardBg)" stroke="rgba(255, 0, 127, 0.4)" stroke-width="2" filter="url(#shadowDark)" />
    
    <!-- Top Badge -->
    <rect x="90" y="110" width="220" height="36" rx="10" fill="rgba(236, 72, 153, 0.25)" stroke="#ec4899" stroke-width="1.5" />
    <text x="200" y="134" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="900" fill="#ff77ba" text-anchor="middle" letter-spacing="2">
      GTA VI OFICIAL
    </text>

    <!-- Channel Tag with Verified Badge -->
    <circle cx="850" cy="128" r="14" fill="#38bdf8" />
    <path d="M 845 128 L 848 132 L 856 123" fill="none" stroke="#000" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    <text x="825" y="134" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="#e0f2fe" text-anchor="end">
      @vicecriador
    </text>

    <!-- Big Bold Hook Title -->
    <text x="540" y="220" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="900" fill="#ffffff" text-anchor="middle" filter="url(#shadowDark)">
      ISSO VAI MUDAR TUDO NO GTA 6!
    </text>
    
    <text x="540" y="280" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="800" fill="#00f0ff" text-anchor="middle" filter="url(#shadowDark)">
      Olha o que a Lucia e o Jason fizeram 😱
    </text>

    <text x="540" y="340" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="600" fill="#fbcfe8" text-anchor="middle">
      Preste atenção nos 3 últimos segundos deste vídeo...
    </text>

    <!-- Neon Frame Border around video (Y: 410 to 1490) -->
    <rect x="56" y="416" width="968" height="1068" rx="20" fill="none" stroke="url(#neonPink)" stroke-width="6" opacity="0.85" filter="url(#glowPink)" />
    <rect x="58" y="418" width="964" height="1064" rx="18" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.6" />

    <!-- Corner Live Watermark -->
    <rect x="80" y="440" width="130" height="34" rx="8" fill="rgba(0,0,0,0.75)" stroke="rgba(255,255,255,0.2)" stroke-width="1" />
    <circle cx="98" cy="457" r="5" fill="#ef4444" />
    <text x="112" y="463" font-family="Arial, Helvetica, sans-serif" font-size="14" font-weight="800" fill="#ffffff">
      4K 60FPS
    </text>

    <!-- Bottom Interactive Viral Card -->
    <rect x="60" y="1520" width="960" height="320" rx="28" fill="url(#cardBg)" stroke="rgba(0, 240, 255, 0.4)" stroke-width="2" filter="url(#shadowDark)" />

    <!-- Bottom Highlights -->
    <text x="540" y="1585" font-family="Arial, Helvetica, sans-serif" font-size="32" font-weight="900" fill="#ffffff" text-anchor="middle">
      “Confiança é tudo o que nós temos.”
    </text>

    <text x="540" y="1640" font-family="Arial, Helvetica, sans-serif" font-size="23" font-weight="600" fill="#e2e8f0" text-anchor="middle">
      Física da água, multidões hiper-reais e IA avançada em Vice City!
    </text>

    <!-- CTA Box -->
    <rect x="120" y="1680" width="840" height="70" rx="16" fill="rgba(236, 72, 153, 0.2)" stroke="#ec4899" stroke-width="2" />
    <text x="540" y="1725" font-family="Arial, Helvetica, sans-serif" font-size="25" font-weight="800" fill="#ffffff" text-anchor="middle">
      💬 QUAL DETALHE VOCÊ NOTOU PRIMEIRO?
    </text>

    <!-- Footer Signature Pixirica Tecnologias -->
    <text x="540" y="1805" font-family="Arial, Helvetica, sans-serif" font-size="16" font-weight="700" fill="rgba(255, 255, 255, 0.45)" text-anchor="middle" letter-spacing="1">
      Desenvolvido com excelência por Pixirica Tecnologias · @vicecriador
    </text>
  </svg>
  `;

  await sharp(Buffer.from(svg))
    .png()
    .toFile(OVERLAY_PNG);

  console.log("Overlay PNG created successfully at:", OVERLAY_PNG);
}

async function renderVideo() {
  await createOverlay();

  // Segment: Lucia and Jason action climax (01:12 to 01:28 = 16s)
  const START_TIME = 72;
  const DURATION = 16;

  console.log(`Starting FFmpeg rendering: ${DURATION}s vertical 9:16 (1080x1920)...`);

  const ffmpegCmd = [
    `ffmpeg -y`,
    `-ss ${START_TIME} -t ${DURATION} -i "${INPUT_VIDEO}"`,
    `-i "${OVERLAY_PNG}"`,
    `-filter_complex "`,
    `[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,boxblur=25:5[bg];`,
    `[0:v]scale=960:1060:force_original_aspect_ratio=increase,crop=960:1060[fg];`,
    `[bg][fg]overlay=60:420[comp];`,
    `[comp][1:v]overlay=0:0[vout]`,
    `"`,
    `-map "[vout]"`,
    `-map 0:a`,
    `-c:v libx264 -preset fast -crf 19 -pix_fmt yuv420p`,
    `-c:a aac -b:a 192k -ar 48000`,
    `-t ${DURATION}`,
    `"${OUTPUT_VIDEO}"`
  ].join(" ");

  execSync(ffmpegCmd, { stdio: "inherit" });

  // Copy to public/media as well so it's accessible anywhere
  fs.copyFileSync(OUTPUT_VIDEO, OUTPUT_MEDIA);

  console.log("Video successfully rendered and saved to:");
  console.log(" -", OUTPUT_VIDEO);
  console.log(" -", OUTPUT_MEDIA);

  // Clean temp overlay
  if (fs.existsSync(OVERLAY_PNG)) {
    fs.unlinkSync(OVERLAY_PNG);
  }
}

renderVideo().catch((err) => {
  console.error("Error generating video:", err);
  process.exit(1);
});
