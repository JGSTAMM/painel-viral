import { NextRequest, NextResponse } from "next/server";
import { readJsonStore, writeJsonStore } from "@/lib/json-store";

export const dynamic = "force-dynamic";

interface PublishedLogEntry {
  id: string;
  platform: string;
  handle: string;
  title: string;
  caption: string;
  hashtags: string;
  videoUrl: string;
  mode: "webhook" | "direct_studio" | "api";
  statusCode: number;
  publishedAt: string;
}

const STORE_FILE = "published-posts.json";

const PLATFORM_UPLOAD_URLS: Record<string, string> = {
  youtube: "https://studio.youtube.com/channel/upload",
  tiktok: "https://www.tiktok.com/creator-center/upload",
  instagram: "https://www.instagram.com/create/details/",
  facebook: "https://business.facebook.com/latest/composer/",
};

export async function GET() {
  const logs = readJsonStore<PublishedLogEntry[]>(STORE_FILE, []);
  return NextResponse.json({ logs });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const platform = typeof body.platform === "string" ? body.platform.toLowerCase() : "youtube";
    const handle = typeof body.handle === "string" ? body.handle.trim() : "";
    const rawVideoUrl =
      typeof body.videoUrl === "string" && body.videoUrl.trim()
        ? body.videoUrl.trim()
        : "/media/gta6-viral-shorts.mp4";
    const title = typeof body.title === "string" ? body.title.trim() : "Corte GTA 6 Full HD";
    const caption = typeof body.caption === "string" ? body.caption.trim() : "";
    const hashtags = typeof body.hashtags === "string" ? body.hashtags.trim() : "";
    const webhookUrl = typeof body.webhookUrl === "string" ? body.webhookUrl.trim() : "";
    const apiKey = typeof body.apiKey === "string" ? body.apiKey.trim() : "";

    const origin = req.nextUrl.origin;
    const absoluteVideoUrl = rawVideoUrl.startsWith("http")
      ? rawVideoUrl
      : `${origin}${rawVideoUrl.startsWith("/") ? "" : "/"}${rawVideoUrl}`;

    const fullCopy = [title, caption, hashtags].filter(Boolean).join("\n\n");
    const publishedAt = new Date().toISOString();

    let mode: PublishedLogEntry["mode"] = "direct_studio";
    let statusCode = 200;
    let webhookResponse: unknown = null;

    // 1. If a real Webhook URL (Make, n8n, Zapier, Ayrshare or custom) was configured, POST to it
    if (webhookUrl && (webhookUrl.startsWith("http://") || webhookUrl.startsWith("https://"))) {
      mode = "webhook";
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 10000);
      try {
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
          },
          body: JSON.stringify({
            event: "publish_video",
            platform,
            handle,
            title,
            caption,
            hashtags,
            fullCopy,
            videoUrl: absoluteVideoUrl,
            publishedAt,
          }),
          signal: controller.signal,
        });
        statusCode = res.status;
        const text = await res.text().catch(() => "");
        try {
          webhookResponse = JSON.parse(text);
        } catch {
          webhookResponse = text.slice(0, 300);
        }
        if (!res.ok) {
          return NextResponse.json(
            {
              success: false,
              error: `O webhook respondeu com status ${res.status}. Verifique a URL ou o token configurado.`,
              webhookResponse,
            },
            { status: 502 }
          );
        }
      } finally {
        clearTimeout(timer);
      }
    }

    const logEntry: PublishedLogEntry = {
      id: `pub-${Date.now()}`,
      platform,
      handle: handle || "(canal local)",
      title,
      caption,
      hashtags,
      videoUrl: absoluteVideoUrl,
      mode,
      statusCode,
      publishedAt,
    };

    const existing = readJsonStore<PublishedLogEntry[]>(STORE_FILE, []);
    writeJsonStore(STORE_FILE, [logEntry, ...existing].slice(0, 100));

    return NextResponse.json({
      success: true,
      mode,
      publishedAt,
      absoluteVideoUrl,
      platformUploadUrl: PLATFORM_UPLOAD_URLS[platform] ?? PLATFORM_UPLOAD_URLS.youtube,
      fullCopy,
      webhookResponse,
      logEntry,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao processar publicação social.",
      },
      { status: 500 }
    );
  }
}
