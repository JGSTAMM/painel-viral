import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type SocialPlatform = "youtube" | "tiktok" | "instagram" | "facebook";

function buildProfileUrl(platform: SocialPlatform, rawHandle: string): {
  cleanHandle: string;
  formattedHandle: string;
  profileUrl: string;
  uploadUrl: string;
} {
  const cleanHandle = rawHandle.replace(/^@+/, "").trim();
  const formattedHandle = platform === "facebook" ? cleanHandle : `@${cleanHandle}`;

  switch (platform) {
    case "youtube":
      return {
        cleanHandle,
        formattedHandle,
        profileUrl: `https://www.youtube.com/@${encodeURIComponent(cleanHandle)}`,
        uploadUrl: "https://studio.youtube.com/channel/upload",
      };
    case "tiktok":
      return {
        cleanHandle,
        formattedHandle,
        profileUrl: `https://www.tiktok.com/@${encodeURIComponent(cleanHandle)}`,
        uploadUrl: "https://www.tiktok.com/creator-center/upload",
      };
    case "instagram":
      return {
        cleanHandle,
        formattedHandle,
        profileUrl: `https://www.instagram.com/${encodeURIComponent(cleanHandle)}/`,
        uploadUrl: "https://www.instagram.com/create/details/",
      };
    case "facebook":
      return {
        cleanHandle,
        formattedHandle,
        profileUrl: `https://www.facebook.com/${encodeURIComponent(cleanHandle)}`,
        uploadUrl: "https://business.facebook.com/latest/composer/",
      };
  }
}

function extractMetaContent(html: string, property: string): string | null {
  const regex1 = new RegExp(
    `<meta[^>]+(?:property|name)=["']${property}["'][^>]+content=["']([^"']+)["']`,
    "i"
  );
  const regex2 = new RegExp(
    `<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${property}["']`,
    "i"
  );
  return regex1.exec(html)?.[1] ?? regex2.exec(html)?.[1] ?? null;
}

function extractFollowerHint(platform: SocialPlatform, html: string): string | null {
  if (platform === "youtube") {
    const subMatch =
      /"subscriberCountText":\{"simpleText":"([^"]+)"\}/.exec(html) ??
      /\b([\d.,]+\s*(?:[KMB]|mil|mi|milhões)?\s*(?:de\s+)?(?:subscribers|inscritos))/i.exec(html);
    if (subMatch?.[1]) return subMatch[1];
  }

  if (platform === "tiktok") {
    const tikMatch = /"followerCount":(\d+)/.exec(html);
    if (tikMatch?.[1]) {
      const n = Number(tikMatch[1]);
      return n >= 1000 ? `${(n / 1000).toFixed(1)}K seguidores` : `${n} seguidores`;
    }
  }

  if (platform === "instagram") {
    const desc = extractMetaContent(html, "og:description") ?? extractMetaContent(html, "description");
    if (desc) {
      const m = /^([\d.,KMB]+\s+Followers)/i.exec(desc);
      if (m?.[1]) return m[1].replace("Followers", "seguidores");
    }
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const platform = body.platform as SocialPlatform;
    const rawHandle = typeof body.handle === "string" ? body.handle.trim() : "";
    const webhookUrl = typeof body.webhookUrl === "string" ? body.webhookUrl.trim() : "";

    if (!platform || !["youtube", "tiktok", "instagram", "facebook"].includes(platform)) {
      return NextResponse.json({ error: "Plataforma inválida." }, { status: 400 });
    }

    if (!rawHandle) {
      return NextResponse.json(
        { error: "Informe o @usuário ou identificador do canal para verificar." },
        { status: 400 }
      );
    }

    const { cleanHandle, formattedHandle, profileUrl, uploadUrl } = buildProfileUrl(platform, rawHandle);

    let profileReachable = false;
    let httpStatus = 0;
    let channelTitle: string | null = null;
    let avatarUrl: string | null = null;
    let followersLabel: string | null = null;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 7500);

    try {
      const res = await fetch(profileUrl, {
        method: "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36",
          "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8",
        },
        signal: controller.signal,
        redirect: "follow",
      });
      httpStatus = res.status;
      profileReachable = res.status >= 200 && res.status < 400;

      if (res.ok) {
        const html = await res.text();
        channelTitle = extractMetaContent(html, "og:title");
        avatarUrl = extractMetaContent(html, "og:image");
        followersLabel = extractFollowerHint(platform, html);
      }
    } catch {
      profileReachable = false;
    } finally {
      clearTimeout(timer);
    }

    let webhookVerified = false;
    let webhookStatus = 0;
    let webhookLatencyMs = 0;

    if (webhookUrl) {
      try {
        const parsedWebhook = new URL(webhookUrl);
        if (parsedWebhook.protocol === "https:" || parsedWebhook.protocol === "http:") {
          const startedAt = Date.now();
          const whController = new AbortController();
          const whTimer = setTimeout(() => whController.abort(), 6000);
          try {
            const whRes = await fetch(parsedWebhook.toString(), {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                event: "painel_viral_connection_test",
                platform,
                handle: formattedHandle,
                profileUrl,
                timestamp: new Date().toISOString(),
              }),
              signal: whController.signal,
            });
            webhookLatencyMs = Date.now() - startedAt;
            webhookStatus = whRes.status;
            webhookVerified = whRes.ok;
          } finally {
            clearTimeout(whTimer);
          }
        }
      } catch {
        webhookVerified = false;
      }
    }

    const nowFormatted = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (!profileReachable && httpStatus === 404) {
      return NextResponse.json(
        {
          success: false,
          verified: false,
          error: `Perfil "${formattedHandle}" não encontrado (${httpStatus}) em ${profileUrl}. Verifique o nome do canal.`,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      verified: profileReachable || webhookVerified,
      platform,
      handle: formattedHandle,
      cleanHandle,
      profileUrl,
      uploadUrl,
      httpStatus,
      channelTitle: channelTitle || formattedHandle,
      avatarUrl,
      followersLabel:
        followersLabel ??
        (profileReachable
          ? `Canal verificado (HTTP ${httpStatus})`
          : "Vinculado para upload direto"),
      webhookVerified,
      webhookStatus,
      webhookLatencyMs,
      lastSync: webhookVerified
        ? `Webhook OK (${webhookStatus}) · ${nowFormatted}`
        : profileReachable
          ? `Perfil validado às ${nowFormatted}`
          : `Salvo às ${nowFormatted}`,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Erro ao verificar conta social.",
      },
      { status: 500 }
    );
  }
}
