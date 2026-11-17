import { NextRequest, NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import fs from "node:fs";

const execFileAsync = promisify(execFile);

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawUrl = typeof body.url === "string" ? body.url.trim() : "";
    const customTitle = typeof body.title === "string" ? body.title.trim() : "";
    const customCaption = typeof body.caption === "string" ? body.caption.trim() : "";

    if (!rawUrl) {
      return NextResponse.json(
        { error: "URL inválida ou não informada." },
        { status: 400 }
      );
    }

    // Validate URL syntax
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`);
    } catch {
      return NextResponse.json(
        { error: "Formato de URL inválido. Cole um link válido do TikTok, Reels, Shorts ou Drive." },
        { status: 400 }
      );
    }

    const downloadsDir = path.join(process.cwd(), "public", "downloads");
    if (!fs.existsSync(downloadsDir)) {
      fs.mkdirSync(downloadsDir, { recursive: true });
    }

    // 1. First probe metadata with yt-dlp
    let meta: {
      id?: string;
      title?: string;
      duration?: number;
      uploader?: string;
      thumbnail?: string;
      ext?: string;
    } = {};

    try {
      const { stdout } = await execFileAsync("python", [
        "-m", "yt_dlp",
        "--dump-json",
        "--no-playlist",
        parsedUrl.toString(),
      ], { timeout: 25000 });

      meta = JSON.parse(stdout);
    } catch (probeErr: any) {
      console.warn("Probe warning, attempting direct download:", probeErr?.message);
    }

    const safeId = meta.id || `video-${Date.now()}`;
    const outputTemplate = path.join(downloadsDir, `${safeId}.%(ext)s`);

    // 2. Download clean video (best MP4 format, max 120MB)
    try {
      await execFileAsync("python", [
        "-m", "yt_dlp",
        "-f", "best[ext=mp4]/best",
        "--no-playlist",
        "--max-filesize", "120M",
        "-o", outputTemplate,
        parsedUrl.toString(),
      ], { timeout: 60000 });
    } catch (dlErr: any) {
      // If error occurred, check if file exists anyway or return descriptive error
      const existing = fs.readdirSync(downloadsDir).find(f => f.startsWith(safeId));
      if (!existing) {
        return NextResponse.json(
          {
            error: `Não foi possível baixar o vídeo automaticamente: ${dlErr.message || "Erro no serviço de download"}. Verifique se o link é público e tente novamente.`,
          },
          { status: 500 }
        );
      }
    }

    // Find the downloaded file in downloadsDir
    const downloadedFiles = fs.readdirSync(downloadsDir).filter(f => f.startsWith(safeId));
    const targetFile = downloadedFiles[0] || `${safeId}.mp4`;
    const localVideoUrl = `/downloads/${targetFile}`;

    const finalTitle =
      customTitle ||
      meta.title ||
      `Corte Repost (${parsedUrl.hostname.replace("www.", "")})`;

    const finalCaption =
      customCaption ||
      `Confira este clipe incrível de GTA 6! #gtavi #gta6 #gameplay`;

    const finalDuration = meta.duration || 15;
    const finalThumbnail = meta.thumbnail || "/images/og-cover.jpg";

    return NextResponse.json({
      success: true,
      id: safeId,
      title: finalTitle,
      sourceUrl: parsedUrl.toString(),
      durationSeconds: Math.round(finalDuration),
      videoUrl: localVideoUrl,
      thumbnailUrl: finalThumbnail,
      cleanCaption: finalCaption,
      uploader: meta.uploader || "Original",
      format: "MP4 Full HD",
    });
  } catch (error: any) {
    console.error("API /api/download error:", error);
    return NextResponse.json(
      { error: `Falha no processamento: ${error.message || "Erro interno"}` },
      { status: 500 }
    );
  }
}
