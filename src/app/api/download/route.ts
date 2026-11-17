import { NextRequest, NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import path from "node:path";
import fs from "node:fs";

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

async function tryCloudFallback(
  parsedUrl: URL,
  customTitle: string,
  customCaption: string
) {
  const host = parsedUrl.hostname.toLowerCase();

  // Direct MP4 / WebM URL support
  if (/\.(mp4|webm|mov)(\?.*)?$/i.test(parsedUrl.pathname)) {
    return {
      success: true,
      id: `direct-${Date.now()}`,
      title: customTitle || "Vídeo MP4 Externo",
      sourceUrl: parsedUrl.toString(),
      durationSeconds: 15,
      videoUrl: parsedUrl.toString(),
      thumbnailUrl: "/media/scenes/scene-01.jpg",
      cleanCaption: customCaption || "Corte GTA 6 pronto para edição",
      uploader: parsedUrl.hostname,
      format: "MP4 Direto",
    };
  }

  // TikTok serverless HTTP extractor fallback via tikwm
  if (host.includes("tiktok.com")) {
    const res = await fetch("https://www.tikwm.com/api/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ url: parsedUrl.toString(), hd: "1" }),
    });
    const json = await res.json();
    if (json?.code === 0 && json?.data?.play) {
      return {
        success: true,
        id: json.data.id || `tiktok-${Date.now()}`,
        title: customTitle || json.data.title || "Vídeo TikTok Sem Marca",
        sourceUrl: parsedUrl.toString(),
        durationSeconds: Number(json.data.duration) || 15,
        videoUrl: json.data.hdplay || json.data.play,
        thumbnailUrl: json.data.cover || "/media/scenes/scene-01.jpg",
        cleanCaption: customCaption || json.data.title || "Corte sem marca d'água pronto",
        uploader: json.data.author?.unique_id || "TikTok",
        format: "MP4 HD (Sem Marca d'Água)",
      };
    }
  }

  return null;
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

    // 2. Cloud serverless HTTP extractor fallback (works on Vercel & edge/serverless without Python)
    const cloudResult = await tryCloudFallback(parsedUrl, customTitle, customCaption);
    if (cloudResult) {
      return NextResponse.json(cloudResult);
    }

    return NextResponse.json(
      {
        error:
          "Não foi possível extrair o vídeo automaticamente dessa URL no servidor serverless. Tente um link público do TikTok, um link direto .mp4 ou suba o arquivo MP4 do seu computador.",
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
