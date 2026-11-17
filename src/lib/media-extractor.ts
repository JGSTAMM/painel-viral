export interface DownloadMirror {
  label: string;
  url: string;
}

export interface CloudMediaResult {
  success: true;
  id: string;
  platform: "youtube" | "tiktok" | "instagram" | "gdrive" | "direct";
  title: string;
  sourceUrl: string;
  durationSeconds: number;
  videoUrl: string | null;
  thumbnailUrl: string;
  cleanCaption: string;
  uploader: string;
  format: string;
  embedUrl?: string;
  downloadMirrors?: DownloadMirror[];
}

export function extractYouTubeId(rawUrl: string): string | null {
  try {
    const u = new URL(rawUrl);
    const host = u.hostname.toLowerCase();
    if (host.includes("youtu.be")) {
      const id = u.pathname.replace(/^\/+/, "").split("/")[0];
      return id && /^[a-zA-Z0-9_-]{6,15}$/.test(id) ? id : null;
    }
    if (host.includes("youtube.com") || host.includes("youtube-nocookie.com")) {
      const v = u.searchParams.get("v");
      if (v && /^[a-zA-Z0-9_-]{6,15}$/.test(v)) return v;
      const shortsMatch = u.pathname.match(/^\/(?:shorts|embed|live|v)\/([a-zA-Z0-9_-]{6,15})/);
      if (shortsMatch) return shortsMatch[1];
    }
  } catch {
    // Ignore invalid URL
  }
  return null;
}

export function extractGoogleDriveId(rawUrl: string): string | null {
  try {
    const u = new URL(rawUrl);
    if (!u.hostname.toLowerCase().includes("drive.google.com")) return null;
    const fileMatch = u.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (fileMatch) return fileMatch[1];
    const idParam = u.searchParams.get("id");
    if (idParam && /^[a-zA-Z0-9_-]+$/.test(idParam)) return idParam;
  } catch {
    // Ignore invalid URL
  }
  return null;
}

export function extractInstagramShortcode(rawUrl: string): string | null {
  try {
    const u = new URL(rawUrl);
    if (!u.hostname.toLowerCase().includes("instagram.com")) return null;
    const match = u.pathname.match(/\/(?:reel|reels|p|tv)\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  } catch {
    // Ignore invalid URL
  }
  return null;
}

async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = 6000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

async function resolveYouTube(
  parsedUrl: URL,
  videoId: string,
  customTitle: string,
  customCaption: string
): Promise<CloudMediaResult> {
  const canonicalUrl = `https://www.youtube.com/watch?v=${videoId}`;
  let title = customTitle || "Vídeo YouTube / Shorts";
  let uploader = "YouTube";
  let thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(canonicalUrl)}&format=json`;
    const res = await fetchWithTimeout(oembedUrl, {
      headers: { "User-Agent": "Mozilla/5.0" },
    }, 5000);
    if (res.ok) {
      const data = await res.json();
      if (!customTitle && typeof data.title === "string" && data.title.trim()) {
        title = data.title.trim();
      }
      if (typeof data.author_name === "string" && data.author_name.trim()) {
        uploader = data.author_name.trim();
      }
      if (typeof data.thumbnail_url === "string" && data.thumbnail_url.trim()) {
        thumbnailUrl = data.thumbnail_url.trim();
      }
    }
  } catch {
    // Fallback to default metadata if oEmbed fails
  }

  const isShorts = parsedUrl.pathname.toLowerCase().includes("/shorts/");

  return {
    success: true,
    id: `yt-${videoId}`,
    platform: "youtube",
    title,
    sourceUrl: parsedUrl.toString(),
    durationSeconds: isShorts ? 60 : 120,
    videoUrl: null,
    thumbnailUrl,
    cleanCaption: customCaption || title,
    uploader,
    format: isShorts ? "YouTube Shorts HD" : "YouTube Vídeo HD",
    embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`,
    downloadMirrors: [
      {
        label: "Baixar MP4 HD (SSYouTube)",
        url: `https://ssyoutube.com/watch?v=${videoId}`,
      },
      {
        label: "Baixar MP4 Rápido (10Downloader)",
        url: `https://10downloader.com/download?v=${encodeURIComponent(canonicalUrl)}`,
      },
      {
        label: "Baixar MP4/MP3 (Y2Mate)",
        url: `https://www.y2mate.com/youtube/${videoId}`,
      },
    ],
  };
}

async function resolveTikTok(
  parsedUrl: URL,
  customTitle: string,
  customCaption: string
): Promise<CloudMediaResult> {
  try {
    const res = await fetchWithTimeout(
      "https://www.tikwm.com/api/",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ url: parsedUrl.toString(), hd: "1" }),
      },
      6000
    );
    if (res.ok) {
      const json = await res.json();
      if (json?.code === 0 && json?.data?.play) {
        return {
          success: true,
          id: json.data.id || `tiktok-${Date.now()}`,
          platform: "tiktok",
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
  } catch {
    // Fall through to mirror response
  }

  return {
    success: true,
    id: `tiktok-${Date.now()}`,
    platform: "tiktok",
    title: customTitle || "Vídeo TikTok Importado",
    sourceUrl: parsedUrl.toString(),
    durationSeconds: 30,
    videoUrl: null,
    thumbnailUrl: "/media/scenes/scene-01.jpg",
    cleanCaption: customCaption || "Corte TikTok pronto para repost sem marca d'água",
    uploader: "TikTok",
    format: "TikTok Sem Marca",
    downloadMirrors: [
      {
        label: "Baixar Sem Marca (SnapTik)",
        url: `https://snaptik.app/?url=${encodeURIComponent(parsedUrl.toString())}`,
      },
      {
        label: "Baixar Sem Marca (SSSTik)",
        url: `https://ssstik.io/`,
      },
    ],
  };
}

export async function resolveCloudMedia(
  parsedUrl: URL,
  customTitle: string,
  customCaption: string
): Promise<CloudMediaResult | null> {
  const raw = parsedUrl.toString();
  const host = parsedUrl.hostname.toLowerCase();

  // 1. Direct MP4 / WebM / MOV URL
  if (/\.(mp4|webm|mov)(\?.*)?$/i.test(parsedUrl.pathname)) {
    return {
      success: true,
      id: `direct-${Date.now()}`,
      platform: "direct",
      title: customTitle || "Vídeo MP4 Externo",
      sourceUrl: raw,
      durationSeconds: 15,
      videoUrl: raw,
      thumbnailUrl: "/media/scenes/scene-01.jpg",
      cleanCaption: customCaption || "Corte GTA 6 pronto para edição",
      uploader: parsedUrl.hostname,
      format: "MP4 Direto",
    };
  }

  // 2. YouTube / YouTube Shorts
  const ytId = extractYouTubeId(raw);
  if (ytId) {
    return resolveYouTube(parsedUrl, ytId, customTitle, customCaption);
  }

  // 3. Google Drive Video Link
  const driveId = extractGoogleDriveId(raw);
  if (driveId) {
    return {
      success: true,
      id: `gdrive-${driveId}`,
      platform: "gdrive",
      title: customTitle || "Vídeo Google Drive (Central GTA VI)",
      sourceUrl: raw,
      durationSeconds: 30,
      videoUrl: `https://drive.google.com/uc?export=download&id=${driveId}`,
      thumbnailUrl: `https://lh3.googleusercontent.com/d/${driveId}=w800`,
      cleanCaption: customCaption || "Material oficial GTA VI pronto para edição",
      uploader: "Google Drive",
      format: "MP4 Google Drive",
      embedUrl: `https://drive.google.com/file/d/${driveId}/preview`,
      downloadMirrors: [
        {
          label: "Baixar Arquivo Original (Google Drive)",
          url: `https://drive.google.com/uc?export=download&id=${driveId}`,
        },
      ],
    };
  }

  // 4. TikTok
  if (host.includes("tiktok.com")) {
    return resolveTikTok(parsedUrl, customTitle, customCaption);
  }

  // 5. Instagram Reels / Posts
  const igCode = extractInstagramShortcode(raw);
  if (igCode) {
    return {
      success: true,
      id: `ig-${igCode}`,
      platform: "instagram",
      title: customTitle || `Instagram Reels (${igCode})`,
      sourceUrl: raw,
      durationSeconds: 30,
      videoUrl: null,
      thumbnailUrl: "/media/scenes/scene-02.jpg",
      cleanCaption: customCaption || "Reels pronto para repost com a sua marca",
      uploader: "Instagram",
      format: "Instagram Reels HD",
      embedUrl: `https://www.instagram.com/reel/${igCode}/embed`,
      downloadMirrors: [
        {
          label: "Baixar Reels MP4 (SnapInsta)",
          url: `https://snapinsta.app/?url=${encodeURIComponent(raw)}`,
        },
        {
          label: "Baixar Reels MP4 (FastDL)",
          url: `https://fastdl.app/en`,
        },
      ],
    };
  }

  return null;
}
