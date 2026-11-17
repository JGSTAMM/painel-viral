import { NextRequest, NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import fs from "node:fs";
import { resolveCloudMedia } from "@/lib/media-extractor";

const execFileAsync = promisify(execFile);

export const dynamic = "force-dynamic";

function resolveDownloadsDir(): string {
  const localDir = path.join(process.cwd(), "public", "downloads");
  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    const probe = path.join(localDir, ".write-check");
    fs.writeFileSync(probe, "ok", "utf-8");
    fs.unlinkSync(probe);
    return localDir;
  } catch {
    const tmpDir = path.join("/tmp", "painel-downloads");
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }
    return tmpDir;
  }
}

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

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`);
    } catch {
      return NextResponse.json(
        { error: "Formato de URL inválido. Cole um link válido do TikTok, Reels, Shorts ou MP4 direto." },
        { status: 400 }
      );
    }

    // 1. Check if python + yt_dlp is available (works on local / self-hosted servers)
    let ytDlpAvailable = false;
    try {
      await execFileAsync("python", ["-m", "yt_dlp", "--version"], { timeout: 4000 });
      ytDlpAvailable = true;
    } catch {
      ytDlpAvailable = false;
    }

    if (ytDlpAvailable) {
      const downloadsDir = resolveDownloadsDir();
      let meta: {
        id?: string;
        title?: string;
        duration?: number;
        uploader?: string;
        thumbnail?: string;
      } = {};

      try {
        const { stdout } = await execFileAsync(
          "python",
          ["-m", "yt_dlp", "--dump-json", "--no-playlist", parsedUrl.toString()],
          { timeout: 25000 }
        );
        meta = JSON.parse(stdout);
      } catch {
        // Proceed directly to download attempt
      }

      const safeId = (meta.id || `video-${Date.now()}`).replace(/[^a-zA-Z0-9_-]/g, "");
      const outputTemplate = path.join(downloadsDir, `${safeId}.%(ext)s`);

      try {
        await execFileAsync(
          "python",
          [
            "-m",
            "yt_dlp",
            "-f",
            "best[ext=mp4]/best",
            "--no-playlist",
            "--max-filesize",
            "120M",
            "-o",
            outputTemplate,
            parsedUrl.toString(),
          ],
          { timeout: 60000 }
        );

        const downloadedFiles = fs.readdirSync(downloadsDir).filter((f) => f.startsWith(safeId));
        if (downloadedFiles.length > 0 && downloadsDir.includes(path.join("public", "downloads"))) {
          return NextResponse.json({
            success: true,
            id: safeId,
            title: customTitle || meta.title || `Corte (${parsedUrl.hostname.replace("www.", "")})`,
            sourceUrl: parsedUrl.toString(),
            durationSeconds: Math.round(meta.duration || 15),
            videoUrl: `/downloads/${downloadedFiles[0]}`,
            thumbnailUrl: meta.thumbnail || "/media/scenes/scene-01.jpg",
            cleanCaption: customCaption || meta.title || "Corte baixado sem marca d'água",
            uploader: meta.uploader || "Original",
            format: "MP4 Full HD",
          });
        }
      } catch {
        // Fall through to cloud HTTP extractor fallback
      }
    }

    // 2. Cloud serverless multi-platform extractor (works on Vercel & edge/serverless without Python)
    const cloudResult = await resolveCloudMedia(parsedUrl, customTitle, customCaption);
    if (cloudResult) {
      return NextResponse.json(cloudResult);
    }

    return NextResponse.json(
      {
        error:
          "Plataforma não reconhecida ou link inválido. Use URLs do YouTube, YouTube Shorts, TikTok, Instagram Reels, Google Drive ou link direto .mp4.",
      },
      { status: 422 }
    );
  } catch (error) {
    console.error("API /api/download error:", error);
    return NextResponse.json(
      {
        error: `Falha no processamento: ${error instanceof Error ? error.message : "Erro interno"}`,
      },
      { status: 500 }
    );
  }
}
