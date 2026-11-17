import { NextRequest, NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import fs from "node:fs";

const execFileAsync = promisify(execFile);

export const dynamic = "force-dynamic";

function resolvePublicFile(relativeUrl: string): string | null {
  const cleanUrl = relativeUrl.split("?")[0].replace(/^\/+/, "");
  const publicDir = path.resolve(process.cwd(), "public");
  const candidate = path.resolve(publicDir, cleanUrl);
  if (!candidate.startsWith(publicDir + path.sep) && candidate !== publicDir) {
    return null;
  }
  return fs.existsSync(/*turbopackIgnore: true*/ candidate) ? candidate : null;
}

function findFontFile(): string | null {
  const candidates = [
    "C:/Windows/Fonts/arialbd.ttf",
    "C:/Windows/Fonts/arial.ttf",
    "C:/Windows/Fonts/segoeui.ttf",
    "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
    "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf",
  ];
  for (const fontPath of candidates) {
    if (fs.existsSync(/*turbopackIgnore: true*/ fontPath)) {
      // Escape drive colon for ffmpeg filter parser on Windows (C\:/...)
      return fontPath.replace(/\\/g, "/").replace(/^([A-Za-z]):/, "$1\\:");
    }
  }
  return null;
}

function escapeDrawtext(text: string): string {
  return text
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\u2019")
    .replace(/:/g, "\\:")
    .replace(/%/g, "\\%")
    .replace(/\n/g, " ")
    .trim();
}

function getDimensions(aspect: string): { width: number; height: number } {
  switch (aspect) {
    case "16:9":
      return { width: 1920, height: 1080 };
    case "1:1":
      return { width: 1080, height: 1080 };
    case "4:5":
      return { width: 1080, height: 1350 };
    case "9:16":
    default:
      return { width: 1080, height: 1920 };
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const sourceVideoUrl =
      typeof body.sourceVideoUrl === "string" && body.sourceVideoUrl.trim()
        ? body.sourceVideoUrl.trim()
        : "/media/gta6-trailer-1.mp4";
    const startTimeSeconds = Math.max(0, Number(body.startTimeSeconds) || 0);
    const durationSeconds = Math.min(180, Math.max(3, Number(body.durationSeconds) || 15));
    const aspect = typeof body.aspect === "string" ? body.aspect : "9:16";
    const framing = typeof body.framing === "string" ? body.framing : "centro";
    const zoom = Math.min(2.5, Math.max(1, Number(body.zoom) || 1));
    const caption = typeof body.caption === "string" ? body.caption.trim() : "";
    const brandHandle = typeof body.brandHandle === "string" ? body.brandHandle.trim() : "";
    const clean = Boolean(body.clean);

    // Verify ffmpeg availability
    try {
      await execFileAsync("ffmpeg", ["-version"], { timeout: 5000 });
    } catch {
      return NextResponse.json({
        success: false,
        fallbackRequired: true,
        error: "FFmpeg não está disponível no servidor serverless; usando gravação local com áudio.",
      });
    }

    const inputPath = resolvePublicFile(sourceVideoUrl);
    if (!inputPath) {
      return NextResponse.json(
        {
          success: false,
          fallbackRequired: true,
          error: "Arquivo de vídeo de origem não encontrado localmente para corte via FFmpeg.",
        },
        { status: 200 }
      );
    }

    const downloadsDir = path.join(process.cwd(), "public", "downloads");
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }

    const { width, height } = getDimensions(aspect);
    const filename = `render-${aspect.replace(":", "x")}-${Date.now()}.mp4`;
    const outputPath = path.join(downloadsDir, filename);

    // Build crop expression supporting framing + zoom
    const scaledH = Math.round(height * zoom);
    let cropX = "(iw-ow)/2";
    if (framing === "esquerda") cropX = "0";
    else if (framing === "direita") cropX = "iw-ow";

    const filterParts: string[] = [
      `scale=-2:${scaledH}:flags=lanczos`,
      `crop=${width}:${height}:${cropX}:(ih-${height})/2`,
      `setsar=1`,
    ];

    if (!clean && (caption || brandHandle)) {
      const fontFile = findFontFile();
      if (fontFile) {
        if (brandHandle) {
          const safeHandle = escapeDrawtext(brandHandle.slice(0, 32));
          filterParts.push(
            `drawtext=fontfile='${fontFile}':text='${safeHandle}':fontcolor=#00f0ff:fontsize=${Math.round(width * 0.032)}:x=w-tw-${Math.round(width * 0.06)}:y=${Math.round(height * 0.045)}:shadowcolor=black@0.8:shadowx=2:shadowy=2`
          );
        }
        if (caption) {
          const words = escapeDrawtext(caption).split(" ");
          const lines: string[] = [];
          let current = "";
          for (const w of words) {
            if ((current + " " + w).trim().length > 26 && current) {
              lines.push(current.trim());
              current = w;
            } else {
              current = (current + " " + w).trim();
            }
          }
          if (current) lines.push(current.trim());
          const topLines = lines.slice(0, 3);

          const boxY = Math.round(height * 0.14);
          const boxH = Math.round(height * (0.04 + topLines.length * 0.042));
          filterParts.push(
            `drawbox=x=0:y=${boxY}:w=iw:h=${boxH}:color=black@0.68:t=fill`
          );
          topLines.forEach((line, idx) => {
            const lineY = boxY + Math.round(height * (0.025 + idx * 0.038));
            filterParts.push(
              `drawtext=fontfile='${fontFile}':text='${line}':fontcolor=white:fontsize=${Math.round(width * 0.042)}:x=(w-tw)/2:y=${lineY}:shadowcolor=black:shadowx=2:shadowy=2`
            );
          });
        }
      }
    }

    const args = [
      "-y",
      "-ss",
      String(startTimeSeconds),
      "-i",
      inputPath,
      "-t",
      String(durationSeconds),
      "-vf",
      filterParts.join(","),
      "-c:v",
      "libx264",
      "-preset",
      "veryfast",
      "-crf",
      "21",
      "-pix_fmt",
      "yuv420p",
      "-c:a",
      "aac",
      "-b:a",
      "192k",
      "-ar",
      "48000",
      "-movflags",
      "+faststart",
      outputPath,
    ];

    await execFileAsync("ffmpeg", args, { timeout: 120000 });

    const stat = fs.statSync(outputPath);

    return NextResponse.json({
      success: true,
      downloadUrl: `/downloads/${filename}`,
      filename,
      extension: "mp4",
      durationSeconds,
      width,
      height,
      sizeBytes: stat.size,
    });
  } catch (error) {
    console.error("API /api/render error:", error);
    return NextResponse.json({
      success: false,
      fallbackRequired: true,
      error: error instanceof Error ? error.message : "Erro ao processar vídeo com FFmpeg.",
    });
  }
}
