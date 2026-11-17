import { describe, it, expect } from "vitest";
import {
  extractYouTubeId,
  extractGoogleDriveId,
  extractInstagramShortcode,
  resolveCloudMedia,
} from "../lib/media-extractor";

describe("Media Extractor — Baixador & Repost Multi-Plataforma", () => {
  it("extrai o ID do YouTube para links youtu.be, watch e shorts", () => {
    expect(extractYouTubeId("https://youtu.be/i0-VL3qeWek?si=kPXqU8BWoJ42TPiU")).toBe(
      "i0-VL3qeWek"
    );
    expect(extractYouTubeId("https://www.youtube.com/watch?v=QdBZY2fkU-0&t=12s")).toBe(
      "QdBZY2fkU-0"
    );
    expect(extractYouTubeId("https://www.youtube.com/shorts/VQRLujxTm3c")).toBe("VQRLujxTm3c");
    expect(extractYouTubeId("https://example.com/video")).toBeNull();
  });

  it("extrai o ID do Google Drive para links de compartilhamento", () => {
    expect(
      extractGoogleDriveId("https://drive.google.com/file/d/1A2b3C4d5E6f7G8h9/view?usp=sharing")
    ).toBe("1A2b3C4d5E6f7G8h9");
    expect(extractGoogleDriveId("https://drive.google.com/open?id=XYZ987654")).toBe("XYZ987654");
    expect(extractGoogleDriveId("https://youtube.com/watch?v=123456")).toBeNull();
  });

  it("extrai o shortcode do Instagram para Reels e Posts", () => {
    expect(extractInstagramShortcode("https://www.instagram.com/reel/C8xYz123AbC/")).toBe(
      "C8xYz123AbC"
    );
    expect(extractInstagramShortcode("https://instagram.com/p/D12345abc/")).toBe("D12345abc");
  });

  it("resolve metadados do YouTube sem retornar null ou erro 422", async () => {
    const url = new URL("https://youtu.be/i0-VL3qeWek?si=kPXqU8BWoJ42TPiU");
    const result = await resolveCloudMedia(url, "Reaçao GTA 6", "ninguem viu esse detalhe");

    expect(result).not.toBeNull();
    expect(result?.success).toBe(true);
    expect(result?.platform).toBe("youtube");
    expect(result?.title).toBe("Reaçao GTA 6");
    expect(result?.cleanCaption).toBe("ninguem viu esse detalhe");
    expect(result?.embedUrl).toContain("https://www.youtube.com/embed/i0-VL3qeWek");
    expect(result?.downloadMirrors?.length).toBeGreaterThan(0);
  });

  it("resolve stream direto de Google Drive", async () => {
    const url = new URL("https://drive.google.com/file/d/1A2b3C4d5E6f7G8h9/view");
    const result = await resolveCloudMedia(url, "Cena Oficial Drive", "");

    expect(result).not.toBeNull();
    expect(result?.platform).toBe("gdrive");
    expect(result?.videoUrl).toBe("https://drive.google.com/uc?export=download&id=1A2b3C4d5E6f7G8h9");
  });
});
