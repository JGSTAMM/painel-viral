import type {
  AspectRatioKey,
  FramingMode,
  TrailerScene,
  VideoModelTemplate,
} from "@/data/gta-catalog";

export interface PanOffset {
  x: number;
  y: number;
}

export interface CropInput {
  sourceWidth: number;
  sourceHeight: number;
  targetWidth: number;
  targetHeight: number;
  framing: FramingMode;
  zoom: number;
  panOffset: PanOffset;
}

export interface CropRect {
  sx: number;
  sy: number;
  sw: number;
  sh: number;
}

export interface BrandOverlayConfig {
  name: string;
  handle: string;
  avatarText: string;
  avatarImage: HTMLImageElement | null;
  verified: boolean;
  badgeColor: "blue" | "pink" | "gold";
}

export interface VideoRenderOptions {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  timeSeconds: number;
  scene: TrailerScene;
  sceneImage: HTMLImageElement | null;
  secondarySceneImage?: HTMLImageElement | null;
  videoElement?: HTMLVideoElement | null;
  modelId: VideoModelTemplate["layoutType"];
  caption: string;
  framing: FramingMode;
  zoom: number;
  panOffset: PanOffset;
  accentColor: string;
  cardDark?: boolean;
  brand: BrandOverlayConfig;
}

export interface ImageRenderOptions {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  templateId: string;
  scene: TrailerScene;
  sceneImage: HTMLImageElement | null;
  secondaryImage: HTMLImageElement | null;
  headline: string;
  subheadline: string;
  zoom: number;
  panOffset: PanOffset;
  accentColor: string;
  textColor: string;
  brand: BrandOverlayConfig;
}

export function getCanvasDimensionsForAspect(aspect: AspectRatioKey): {
  width: number;
  height: number;
} {
  switch (aspect) {
    case "9:16":
      return { width: 1080, height: 1920 };
    case "4:5":
      return { width: 1080, height: 1350 };
    case "1:1":
      return { width: 1080, height: 1080 };
    case "16:9":
      return { width: 1920, height: 1080 };
  }
}

export function calculateCropRect(input: CropInput): CropRect {
  const {
    sourceWidth,
    sourceHeight,
    targetWidth,
    targetHeight,
    framing,
    zoom,
    panOffset,
  } = input;

  const safeZoom = Math.max(1, Math.min(3, zoom));
  const srcRatio = sourceWidth / Math.max(1, sourceHeight);
  const dstRatio = targetWidth / Math.max(1, targetHeight);

  let baseSw = sourceWidth;
  let baseSh = sourceHeight;

  if (srcRatio > dstRatio) {
    baseSh = sourceHeight;
    baseSw = sourceHeight * dstRatio;
  } else {
    baseSw = sourceWidth;
    baseSh = sourceWidth / dstRatio;
  }

  const sw = baseSw / safeZoom;
  const sh = baseSh / safeZoom;

  const maxOffsetX = Math.max(0, sourceWidth - sw);
  const maxOffsetY = Math.max(0, sourceHeight - sh);

  let anchorX = maxOffsetX * 0.5;
  if (framing === "esquerda") anchorX = 0;
  else if (framing === "direita") anchorX = maxOffsetX;
  else if (framing === "automatico") {
    anchorX = maxOffsetX * 0.5;
  }

  const anchorY = maxOffsetY * 0.5;
  const sx = Math.max(0, Math.min(maxOffsetX, anchorX - panOffset.x * (sourceWidth / 300)));
  const sy = Math.max(0, Math.min(maxOffsetY, anchorY - panOffset.y * (sourceHeight / 300)));

  return { sx, sy, sw, sh };
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function drawProceduralScene(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  timeSeconds: number,
  scene: TrailerScene,
  zoom: number,
  panOffset: PanOffset,
  framing: FramingMode
) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();

  const grad = ctx.createLinearGradient(x, y, x, y + h);
  grad.addColorStop(0, scene.primaryColor);
  grad.addColorStop(0.55, scene.secondaryColor);
  grad.addColorStop(1, "#0b0612");
  ctx.fillStyle = grad;
  ctx.fillRect(x, y, w, h);

  const driftX =
    framing === "esquerda"
      ? -w * 0.12
      : framing === "direita"
        ? w * 0.12
        : framing === "automatico"
          ? Math.sin(timeSeconds * 0.9) * w * 0.08
          : 0;
  const cx = x + w / 2 + driftX + panOffset.x * (w / 320);
  const cy = y + h * 0.44 + panOffset.y * (h / 320);

  // Glowing sunset / neon orb
  const orb = ctx.createRadialGradient(cx, cy, 8 * zoom, cx, cy, w * 0.45 * zoom);
  orb.addColorStop(0, `${scene.accentColor}cc`);
  orb.addColorStop(0.5, `${scene.secondaryColor}44`);
  orb.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = orb;
  ctx.fillRect(x, y, w, h);

  // Horizon & animated highway/city silhouette
  const horizonY = y + h * 0.56;
  ctx.fillStyle = "rgba(11, 6, 18, 0.86)";
  ctx.beginPath();
  ctx.moveTo(x, y + h);
  ctx.lineTo(cx - w * 0.16 * zoom, horizonY);
  ctx.lineTo(cx + w * 0.16 * zoom, horizonY);
  ctx.lineTo(x + w, y + h);
  ctx.closePath();
  ctx.fill();

  // Animated road lane markers
  ctx.strokeStyle = scene.accentColor;
  ctx.lineWidth = Math.max(2, w * 0.008);
  const pulse = (timeSeconds * 1.8) % 1;
  for (let i = 0; i < 6; i++) {
    const t0 = ((i + pulse) / 6) ** 1.6;
    const t1 = ((i + pulse + 0.45) / 6) ** 1.6;
    const y0 = horizonY + t0 * (y + h - horizonY);
    const y1 = horizonY + Math.min(1, t1) * (y + h - horizonY);
    ctx.beginPath();
    ctx.moveTo(cx, y0);
    ctx.lineTo(cx, y1);
    ctx.stroke();
  }

  // Stylized car rear silhouette moving slightly
  const bob = Math.sin(timeSeconds * 4.2) * (h * 0.006);
  const carW = w * 0.34 * Math.min(1.4, zoom);
  const carH = h * 0.12 * Math.min(1.4, zoom);
  const carX = cx - carW / 2;
  const carY = y + h * 0.68 + bob;
  ctx.fillStyle = "#09040f";
  drawRoundedRect(ctx, carX, carY, carW, carH, carH * 0.25);
  ctx.fill();
  ctx.strokeStyle = scene.accentColor;
  ctx.lineWidth = Math.max(2, w * 0.005);
  ctx.stroke();

  // Tail lights glow
  ctx.fillStyle = "#ff007f";
  ctx.fillRect(carX + carW * 0.1, carY + carH * 0.42, carW * 0.2, carH * 0.18);
  ctx.fillRect(carX + carW * 0.7, carY + carH * 0.42, carW * 0.2, carH * 0.18);

  ctx.restore();
}

function drawMediaBox(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  timeSeconds: number,
  scene: TrailerScene,
  image: HTMLImageElement | null,
  video: HTMLVideoElement | null | undefined,
  framing: FramingMode,
  zoom: number,
  panOffset: PanOffset,
  radius = 0
) {
  ctx.save();
  if (radius > 0) {
    drawRoundedRect(ctx, x, y, w, h, radius);
    ctx.clip();
  } else {
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.clip();
  }

  const hasVideo = video && video.readyState >= 2 && video.videoWidth > 0;
  const hasImage = image && image.complete && image.naturalWidth > 0;

  if (hasVideo && video) {
    const crop = calculateCropRect({
      sourceWidth: video.videoWidth,
      sourceHeight: video.videoHeight,
      targetWidth: w,
      targetHeight: h,
      framing,
      zoom,
      panOffset,
    });
    ctx.drawImage(video, crop.sx, crop.sy, crop.sw, crop.sh, x, y, w, h);
  } else if (hasImage && image) {
    const drift =
      framing === "automatico" ? Math.sin(timeSeconds * 0.8) * 18 : 0;
    const crop = calculateCropRect({
      sourceWidth: image.naturalWidth,
      sourceHeight: image.naturalHeight,
      targetWidth: w,
      targetHeight: h,
      framing,
      zoom: zoom * (1 + Math.sin(timeSeconds * 0.7) * 0.025),
      panOffset: { x: panOffset.x + drift, y: panOffset.y },
    });
    ctx.drawImage(image, crop.sx, crop.sy, crop.sw, crop.sh, x, y, w, h);
  } else {
    drawProceduralScene(ctx, x, y, w, h, timeSeconds, scene, zoom, panOffset, framing);
  }

  ctx.restore();
}

function drawMosaicBackground(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  timeSeconds: number,
  scene: TrailerScene,
  primaryImage: HTMLImageElement | null,
  secondaryImage: HTMLImageElement | null | undefined
) {
  ctx.fillStyle = "#0b0612";
  ctx.fillRect(0, 0, width, height);

  const cols = 3;
  const rows = 4;
  const gap = Math.round(width * 0.012);
  const cellW = (width - gap * (cols + 1)) / cols;
  const cellH = (height - gap * (rows + 1)) / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cx = gap + c * (cellW + gap);
      const cy = gap + r * (cellH + gap);
      const img = (r + c) % 2 === 0 ? primaryImage : (secondaryImage ?? primaryImage);
      drawMediaBox(
        ctx,
        cx,
        cy,
        cellW,
        cellH,
        timeSeconds + r * 0.6 + c,
        scene,
        img ?? null,
        null,
        c === 0 ? "esquerda" : c === 2 ? "direita" : "centro",
        1.15,
        { x: 0, y: 0 },
        Math.round(width * 0.018)
      );
    }
  }

  ctx.fillStyle = "rgba(9, 4, 15, 0.42)";
  ctx.fillRect(0, 0, width, height);
}

function drawBrandRow(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  brand: BrandOverlayConfig,
  textColor: string
) {
  const radius = size / 2;
  ctx.save();
  ctx.beginPath();
  ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();

  if (brand.avatarImage && brand.avatarImage.complete && brand.avatarImage.naturalWidth > 0) {
    ctx.drawImage(brand.avatarImage, x, y, size, size);
  } else {
    const grad = ctx.createLinearGradient(x, y, x + size, y + size);
    grad.addColorStop(0, "#ec4899");
    grad.addColorStop(1, "#7c3aed");
    ctx.fillStyle = grad;
    ctx.fillRect(x, y, size, size);

    ctx.fillStyle = "#ffffff";
    ctx.font = `800 ${Math.round(size * 0.42)}px "Plus Jakarta Sans", Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(brand.avatarText.slice(0, 2).toUpperCase(), x + radius, y + radius + 1);
  }
  ctx.restore();

  const textX = x + size + size * 0.28;
  ctx.fillStyle = textColor;
  ctx.font = `800 ${Math.round(size * 0.44)}px "Plus Jakarta Sans", Arial, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  const displayName = brand.name || "ViceCriador";
  ctx.fillText(displayName, textX, y + radius);

  if (brand.verified) {
    const metrics = ctx.measureText(displayName);
    const bx = textX + metrics.width + size * 0.25;
    const by = y + radius;
    const br = size * 0.19;
    ctx.fillStyle =
      brand.badgeColor === "pink"
        ? "#ec4899"
        : brand.badgeColor === "gold"
          ? "#fbbf24"
          : "#38bdf8";
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = Math.max(1.5, br * 0.26);
    ctx.beginPath();
    ctx.moveTo(bx - br * 0.4, by);
    ctx.lineTo(bx - br * 0.1, by + br * 0.35);
    ctx.lineTo(bx + br * 0.45, by - br * 0.3);
    ctx.stroke();
  }
}

function wrapTextLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxLines = 3
): string[] {
  const words = (text || "").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [""];

  const lines: string[] = [];
  let current = words[0];

  for (let i = 1; i < words.length; i++) {
    const candidate = `${current} ${words[i]}`;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      lines.push(current);
      current = words[i];
      if (lines.length === maxLines - 1) break;
    }
  }
  lines.push(current);
  return lines.slice(0, maxLines);
}

export function renderVideoFrameToCanvas(opts: VideoRenderOptions): void {
  const {
    ctx,
    width,
    height,
    timeSeconds,
    scene,
    sceneImage,
    secondarySceneImage,
    videoElement,
    modelId,
    caption,
    framing,
    zoom,
    panOffset,
    accentColor,
    brand,
  } = opts;

  ctx.clearRect(0, 0, width, height);

  if (modelId === "split-neon-pink" || modelId === "duet-reaction" || modelId === "vs-comparison") {
    const halfH = height / 2;
    drawMediaBox(
      ctx,
      0,
      0,
      width,
      halfH,
      timeSeconds,
      scene,
      sceneImage,
      videoElement,
      framing,
      zoom,
      panOffset
    );
    drawMediaBox(
      ctx,
      0,
      halfH,
      width,
      halfH,
      timeSeconds + 1.2,
      scene,
      secondarySceneImage ?? sceneImage,
      null,
      "centro",
      1.08,
      { x: 0, y: 0 }
    );

    const bandH = Math.round(height * 0.085);
    const bandY = halfH - bandH / 2;
    ctx.fillStyle = modelId === "vs-comparison" ? "#f59e0b" : accentColor || "#ff007f";
    ctx.fillRect(0, bandY, width, bandH);

    ctx.fillStyle = "#ffffff";
    ctx.font = `900 ${Math.round(width * 0.056)}px "Anton", Impact, Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText((caption || "VICE CITY NUNCA FOI TÃO REAL").toUpperCase().slice(0, 38), width / 2, halfH);

    if (brand.handle) {
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      drawRoundedRect(ctx, width * 0.04, height * 0.025, width * 0.34, height * 0.032, 999);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = `700 ${Math.round(width * 0.026)}px "Plus Jakarta Sans", Arial, sans-serif`;
      ctx.fillText(brand.handle, width * 0.21, height * 0.041);
    }
    return;
  }

  if (modelId === "fullscreen-watermark" || modelId === "minimal-clean" || modelId === "cinema-letterbox") {
    drawMediaBox(
      ctx,
      0,
      0,
      width,
      height,
      timeSeconds,
      scene,
      sceneImage,
      videoElement,
      framing,
      zoom,
      panOffset
    );

    if (modelId === "cinema-letterbox") {
      const barH = Math.round(height * 0.14);
      ctx.fillStyle = "#050208";
      ctx.fillRect(0, 0, width, barH);
      ctx.fillRect(0, height - barH, width, barH);
    }

    const grad = ctx.createLinearGradient(0, height * 0.65, 0, height);
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(1, "rgba(0,0,0,0.85)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, height * 0.65, width, height * 0.35);

    ctx.fillStyle = "#ffffff";
    ctx.font = `800 ${Math.round(width * 0.05)}px "Plus Jakarta Sans", Arial, sans-serif`;
    ctx.textAlign = "center";
    const lines = wrapTextLines(ctx, caption, width * 0.84, 2);
    lines.forEach((line, idx) => {
      ctx.fillText(line, width / 2, height * 0.8 + idx * width * 0.062);
    });

    drawBrandRow(ctx, width * 0.08, height * 0.055, width * 0.08, brand, "#ffffff");
    return;
  }

  if (modelId === "neon-frame" || modelId === "polaroid-vice" || modelId === "countdown-hype") {
    drawMosaicBackground(ctx, width, height, timeSeconds, scene, sceneImage, secondarySceneImage);
    const pad = Math.round(width * 0.065);
    const boxY = Math.round(height * 0.16);
    const boxW = width - pad * 2;
    const boxH = Math.round(height * 0.62);

    ctx.save();
    ctx.shadowColor = accentColor || "#00f0ff";
    ctx.shadowBlur = Math.round(width * 0.03);
    ctx.strokeStyle = accentColor || "#00f0ff";
    ctx.lineWidth = Math.max(4, Math.round(width * 0.01));
    drawRoundedRect(ctx, pad, boxY, boxW, boxH, Math.round(width * 0.035));
    ctx.stroke();
    ctx.restore();

    drawMediaBox(
      ctx,
      pad + 4,
      boxY + 4,
      boxW - 8,
      boxH - 8,
      timeSeconds,
      scene,
      sceneImage,
      videoElement,
      framing,
      zoom,
      panOffset,
      Math.round(width * 0.03)
    );

    ctx.fillStyle = "rgba(11,6,18,0.86)";
    drawRoundedRect(ctx, pad, height * 0.81, boxW, height * 0.12, Math.round(width * 0.03));
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = `800 ${Math.round(width * 0.045)}px "Plus Jakarta Sans", Arial, sans-serif`;
    ctx.textAlign = "center";
    const lines = wrapTextLines(ctx, caption, boxW * 0.9, 2);
    lines.forEach((line, idx) => {
      ctx.fillText(line, width / 2, height * 0.855 + idx * width * 0.055);
    });

    drawBrandRow(ctx, pad, height * 0.07, width * 0.085, brand, "#ffffff");
    return;
  }

  // Default & Classic Post Card (matches panel screenshot 1:1 square inside mosaic)
  drawMosaicBackground(ctx, width, height, timeSeconds, scene, sceneImage, secondarySceneImage);

  const isDarkCard =
    modelId === "post-card-dark" ||
    modelId === "mystery-theory" ||
    modelId === "quote-radar";
  const cardBg = isDarkCard ? "#110a1a" : "#ffffff";
  const cardText = isDarkCard ? "#ffffff" : "#0f172a";

  const cardPad = Math.round(width * 0.055);
  const cardX = cardPad;
  const cardW = width - cardPad * 2;
  const mediaSize = cardW - Math.round(width * 0.06);
  const headerH = Math.round(height * 0.14);
  const cardH = headerH + mediaSize + Math.round(width * 0.045);
  const cardY = Math.round((height - cardH) / 2);

  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.55)";
  ctx.shadowBlur = Math.round(width * 0.04);
  ctx.fillStyle = cardBg;
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, Math.round(width * 0.032));
  ctx.fill();
  ctx.restore();

  // Optional Urgent / Breaking News or Curiosity ribbon on top of card
  if (modelId === "breaking-news" || modelId === "curiosity-fact" || modelId === "top-ranking") {
    const pillW = Math.round(cardW * 0.44);
    const pillH = Math.round(height * 0.036);
    ctx.fillStyle =
      modelId === "breaking-news"
        ? "#ef4444"
        : modelId === "curiosity-fact"
          ? "#facc15"
          : "#ff007f";
    drawRoundedRect(ctx, cardX + cardW * 0.28, cardY - pillH * 0.5, pillW, pillH, 999);
    ctx.fill();
    ctx.fillStyle = modelId === "curiosity-fact" ? "#0b0612" : "#ffffff";
    ctx.font = `900 ${Math.round(width * 0.028)}px "Plus Jakarta Sans", Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      modelId === "breaking-news"
        ? "URGENTE • GTA 6"
        : modelId === "curiosity-fact"
          ? "VOCÊ SABIA?"
          : "TOP #1 VIRAL",
      width / 2,
      cardY
    );
  }

  const innerPad = Math.round(width * 0.03);
  drawBrandRow(ctx, cardX + innerPad, cardY + innerPad * 0.85, Math.round(width * 0.075), brand, cardText);

  // Caption inside white/dark post card
  ctx.fillStyle = cardText;
  ctx.font = `700 ${Math.round(width * 0.043)}px "Plus Jakarta Sans", Arial, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const captionLines = wrapTextLines(ctx, caption, cardW - innerPad * 2, 2);
  captionLines.forEach((line, idx) => {
    ctx.fillText(
      line,
      width / 2,
      cardY + Math.round(width * 0.13) + idx * Math.round(width * 0.052)
    );
  });

  // Diagonal band overlay if diagonal-band model
  const mediaX = cardX + innerPad;
  const mediaY = cardY + headerH;
  drawMediaBox(
    ctx,
    mediaX,
    mediaY,
    mediaSize,
    mediaSize,
    timeSeconds,
    scene,
    sceneImage,
    videoElement,
    framing,
    zoom,
    panOffset,
    Math.round(width * 0.02)
  );

  if (modelId === "diagonal-band") {
    ctx.save();
    ctx.translate(width / 2, mediaY + mediaSize * 0.82);
    ctx.rotate(-0.07);
    ctx.fillStyle = accentColor || "#ff007f";
    ctx.fillRect(-mediaSize * 0.55, -width * 0.04, mediaSize * 1.1, width * 0.08);
    ctx.fillStyle = "#ffffff";
    ctx.font = `900 ${Math.round(width * 0.04)}px "Anton", Impact, Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("TRAILER OFICIAL GTA 6", 0, 0);
    ctx.restore();
  }
}

export function renderImageTemplateToCanvas(opts: ImageRenderOptions): void {
  const {
    ctx,
    width,
    height,
    templateId,
    scene,
    sceneImage,
    secondaryImage,
    headline,
    subheadline,
    zoom,
    panOffset,
    accentColor,
    textColor,
    brand,
  } = opts;

  ctx.clearRect(0, 0, width, height);

  if (templateId === "tela-dividida" || templateId === "vs-comparacao") {
    const isHorizontal = templateId === "vs-comparacao";
    if (isHorizontal) {
      drawMediaBox(ctx, 0, 0, width / 2, height, 0, scene, sceneImage, null, "centro", zoom, panOffset);
      drawMediaBox(
        ctx,
        width / 2,
        0,
        width / 2,
        height,
        0,
        scene,
        secondaryImage ?? sceneImage,
        null,
        "centro",
        zoom,
        { x: 0, y: 0 }
      );
      ctx.fillStyle = accentColor || "#f59e0b";
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, Math.min(width, height) * 0.085, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#ffffff";
      ctx.font = `900 ${Math.round(Math.min(width, height) * 0.065)}px "Anton", Impact, sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("VS", width / 2, height / 2);
    } else {
      drawMediaBox(ctx, 0, 0, width, height / 2, 0, scene, sceneImage, null, "centro", zoom, panOffset);
      drawMediaBox(
        ctx,
        0,
        height / 2,
        width,
        height / 2,
        0,
        scene,
        secondaryImage ?? sceneImage,
        null,
        "centro",
        zoom,
        { x: 0, y: 0 }
      );
      const bandH = height * 0.11;
      ctx.fillStyle = accentColor || "#ff007f";
      ctx.fillRect(0, height / 2 - bandH / 2, width, bandH);
    }

    ctx.fillStyle = textColor || "#ffffff";
    ctx.font = `900 ${Math.round(width * 0.065)}px "Anton", Impact, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText((headline || "ISSO É GTA 6?").toUpperCase().slice(0, 32), width / 2, height * 0.5);
    return;
  }

  // Base full image render
  drawMediaBox(ctx, 0, 0, width, height, 0, scene, sceneImage, null, "centro", zoom, panOffset);

  if (templateId === "cinema") {
    const bar = Math.round(height * 0.13);
    ctx.fillStyle = "#040207";
    ctx.fillRect(0, 0, width, bar);
    ctx.fillRect(0, height - bar, width, bar);
  } else if (templateId === "meme") {
    const bar = Math.round(height * 0.2);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, bar);
    ctx.fillStyle = "#0f172a";
    ctx.font = `900 ${Math.round(width * 0.055)}px "Plus Jakarta Sans", Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    wrapTextLines(ctx, headline || "QUANDO LANÇAR GTA 6", width * 0.88, 2).forEach((l, i) => {
      ctx.fillText(l, width / 2, bar * 0.42 + i * width * 0.065);
    });
    return;
  }

  // Gradient bottom overlay for legibility
  const ov = ctx.createLinearGradient(0, height * 0.35, 0, height);
  ov.addColorStop(0, "rgba(11,6,18,0)");
  ov.addColorStop(1, "rgba(11,6,18,0.88)");
  ctx.fillStyle = ov;
  ctx.fillRect(0, height * 0.35, width, height * 0.65);

  if (templateId === "moldura-neon") {
    ctx.strokeStyle = accentColor || "#00f0ff";
    ctx.lineWidth = Math.max(8, Math.round(width * 0.018));
    drawRoundedRect(ctx, width * 0.03, height * 0.03, width * 0.94, height * 0.94, width * 0.04);
    ctx.stroke();
  }

  if (templateId === "urgente") {
    ctx.fillStyle = "#ef4444";
    drawRoundedRect(ctx, width * 0.07, height * 0.07, width * 0.28, height * 0.055, 12);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = `900 ${Math.round(width * 0.035)}px "Plus Jakarta Sans", Arial, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("URGENTE", width * 0.21, height * 0.098);
  }

  if (templateId === "tweet-noticia") {
    ctx.fillStyle = "rgba(255,255,255,0.96)";
    drawRoundedRect(ctx, width * 0.06, height * 0.06, width * 0.88, height * 0.18, 28);
    ctx.fill();
    drawBrandRow(ctx, width * 0.09, height * 0.08, width * 0.07, brand, "#0f172a");
    ctx.fillStyle = "#0f172a";
    ctx.font = `700 ${Math.round(width * 0.038)}px "Plus Jakarta Sans", Arial, sans-serif`;
    ctx.textAlign = "left";
    ctx.fillText(headline.slice(0, 40), width * 0.09, height * 0.19);
    return;
  }

  if (templateId === "top-ranking") {
    ctx.fillStyle = accentColor || "#ff007f";
    ctx.font = `900 ${Math.round(width * 0.18)}px "Anton", Impact, sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText("#1", width / 2, height * 0.56);
  }

  if (templateId === "faixa-diagonal") {
    ctx.save();
    ctx.translate(width / 2, height * 0.72);
    ctx.rotate(-0.07);
    ctx.fillStyle = accentColor || "#ff007f";
    ctx.fillRect(-width * 0.6, -height * 0.06, width * 1.2, height * 0.12);
    ctx.fillStyle = textColor || "#ffffff";
    ctx.font = `900 ${Math.round(width * 0.075)}px "Anton", Impact, sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText((headline || "ISSO É GTA 6?").toUpperCase().slice(0, 26), 0, 0);
    ctx.restore();
    return;
  }

  // Headline + subheadline bottom display
  ctx.fillStyle = textColor || "#ffffff";
  ctx.font = `900 ${Math.round(width * 0.085)}px "Anton", Impact, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const lines = wrapTextLines(ctx, (headline || "ISSO É GTA 6?").toUpperCase(), width * 0.86, 2);
  lines.forEach((line, idx) => {
    ctx.fillText(line, width / 2, height * 0.72 + idx * width * 0.095);
  });

  if (subheadline) {
    ctx.fillStyle = accentColor || "#00f0ff";
    ctx.font = `700 ${Math.round(width * 0.036)}px "Plus Jakarta Sans", Arial, sans-serif`;
    ctx.fillText(subheadline, width / 2, height * 0.88);
  }
}

export async function recordCanvasVideo(options: {
  renderFrame: (ctx: CanvasRenderingContext2D, elapsedSeconds: number) => void;
  width: number;
  height: number;
  durationSeconds: number;
  onProgress?: (percent: number) => void;
}): Promise<{ blob: Blob; mimeType: string; extension: string }> {
  const { renderFrame, width, height, durationSeconds, onProgress } = options;
  const offscreen = document.createElement("canvas");
  offscreen.width = width;
  offscreen.height = height;
  const ctx = offscreen.getContext("2d");
  if (!ctx) {
    throw new Error("Contexto 2D indisponível no navegador.");
  }

  const preferredMimes = [
    "video/mp4;codecs=avc1",
    "video/mp4",
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
  ];
  const selectedMime =
    typeof MediaRecorder !== "undefined"
      ? preferredMimes.find((m) => MediaRecorder.isTypeSupported(m)) ?? "video/webm"
      : "video/webm";

  const stream = offscreen.captureStream(30);
  const recorder = new MediaRecorder(stream, {
    mimeType: selectedMime,
    videoBitsPerSecond: 4_500_000,
  });

  const chunks: BlobPart[] = [];
  recorder.ondataavailable = (ev) => {
    if (ev.data && ev.data.size > 0) chunks.push(ev.data);
  };

  // Cap live browser recording to max 6s real-time while simulating full clip timeline speed
  // so 15s / 30s renders smoothly without blocking the user's browser for minutes.
  const actualRecordMs = Math.min(4500, Math.max(1800, durationSeconds * 180));
  const startTime = performance.now();

  return new Promise((resolve, reject) => {
    recorder.onerror = () => reject(new Error("Falha ao gravar vídeo no MediaRecorder."));
    recorder.onstop = () => {
      const ext = selectedMime.includes("mp4") ? "mp4" : "webm";
      resolve({
        blob: new Blob(chunks, { type: selectedMime }),
        mimeType: selectedMime,
        extension: ext,
      });
    };

    recorder.start(100);

    const step = (now: number) => {
      const elapsedMs = now - startTime;
      const progress = Math.min(1, elapsedMs / actualRecordMs);
      const timelineSec = progress * durationSeconds;
      renderFrame(ctx, timelineSec);
      onProgress?.(Math.round(progress * 100));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setTimeout(() => {
          if (recorder.state !== "inactive") recorder.stop();
        }, 120);
      }
    };

    requestAnimationFrame(step);
  });
}
