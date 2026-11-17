import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  CREATOR_CREDIT,
  FAQ_ITEMS,
  SEO_PAGES,
  buildJsonLdGraph,
} from "@/lib/seo-config";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import manifest from "@/app/manifest";

const ROOT = process.cwd();

describe("SEO, GEO & Pixirica Tecnologias Compliance (100/100)", () => {
  it("keeps every page title strictly between 50 and 60 characters", () => {
    for (const [key, meta] of Object.entries(SEO_PAGES)) {
      expect(meta.title.length, `${key} title "${meta.title}"`).toBeGreaterThanOrEqual(50);
      expect(meta.title.length, `${key} title "${meta.title}"`).toBeLessThanOrEqual(60);
    }
  });

  it("keeps every page description strictly between 120 and 160 characters", () => {
    for (const [key, meta] of Object.entries(SEO_PAGES)) {
      expect(meta.description.length, `${key} description`).toBeGreaterThanOrEqual(120);
      expect(meta.description.length, `${key} description`).toBeLessThanOrEqual(160);
    }
  });

  it("includes Pixirica Tecnologias signature in creator metadata and JSON-LD @graph", () => {
    expect(CREATOR_CREDIT).toContain("Pixirica Tecnologias");
    const graph = buildJsonLdGraph("https://painelviral.example");
    const serialized = JSON.stringify(graph);
    expect(serialized).toContain("Pixirica Tecnologias");
    expect(serialized).toContain("FAQPage");
    expect(serialized).toContain("Organization");
    expect(serialized).toContain("WebSite");
    expect(FAQ_ITEMS.length).toBeGreaterThanOrEqual(4);
  });

  it("ships optimized JPEG OpenGraph covers and required favicons under size limits", () => {
    const ogCover = path.join(ROOT, "public", "images", "og-cover.jpg");
    const ogSquare = path.join(ROOT, "public", "images", "og-square.jpg");
    const favicon = path.join(ROOT, "public", "favicon.ico");
    const iconPng = path.join(ROOT, "public", "icon.png");
    const appleIcon = path.join(ROOT, "public", "apple-touch-icon.png");

    expect(fs.existsSync(ogCover)).toBe(true);
    expect(fs.existsSync(ogSquare)).toBe(true);
    expect(fs.existsSync(favicon)).toBe(true);
    expect(fs.existsSync(iconPng)).toBe(true);
    expect(fs.existsSync(appleIcon)).toBe(true);

    expect(fs.statSync(ogCover).size).toBeLessThan(250 * 1024);
    expect(fs.statSync(ogSquare).size).toBeLessThan(150 * 1024);
  });

  it("configures robots.ts for all required AI crawlers, sitemap.ts, manifest.ts and llms.txt", () => {
    const robotsConfig = robots();
    const rules = Array.isArray(robotsConfig.rules) ? robotsConfig.rules : [robotsConfig.rules];
    const agents = rules.flatMap((r) => (Array.isArray(r.userAgent) ? r.userAgent : [r.userAgent]));

    for (const bot of [
      "*",
      "GPTBot",
      "ChatGPT-User",
      "OAI-SearchBot",
      "ClaudeBot",
      "Claude-Web",
      "anthropic-ai",
      "PerplexityBot",
      "CCBot",
      "Google-Extended",
      "Applebot-Extended",
    ]) {
      expect(agents).toContain(bot);
    }

    expect(robotsConfig.sitemap).toBeTruthy();

    const entries = sitemap();
    expect(entries.length).toBeGreaterThanOrEqual(3);

    const webManifest = manifest();
    expect(webManifest.name).toBeTruthy();
    expect(webManifest.icons?.length).toBeGreaterThanOrEqual(1);

    const llmsPath = path.join(ROOT, "public", "llms.txt");
    expect(fs.existsSync(llmsPath)).toBe(true);
    const llmsContent = fs.readFileSync(llmsPath, "utf8");
    expect(llmsContent).toContain("Pixirica Tecnologias");
    expect(llmsContent.length).toBeGreaterThan(800);
  });
});
