import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  CATEGORIAS_DRIVE,
  COFRE_LEGENDAS,
  COFRE_TITULOS,
  OPERACAO_CALENDARIO_30D,
  OPERACAO_GANCHOS,
  OPERACAO_GANCHOS_FLAT,
  OPERACAO_MAPA_OPORTUNIDADES,
  OPERACAO_ROTEIROS,
} from "@/data/operacao-gta";

const ROOT = process.cwd();

describe("Operação GTA VI — Pack Completo & Arsenal de Criação", () => {
  it("contains all 90 scripts (80 main + 10 wildcard structures) with complete teleprompter fields", () => {
    expect(OPERACAO_ROTEIROS.length).toBe(90);

    const mainScripts = OPERACAO_ROTEIROS.filter((r) => !r.code.startsWith("C"));
    const wildcardScripts = OPERACAO_ROTEIROS.filter((r) => r.code.startsWith("C"));

    expect(mainScripts.length).toBe(80);
    expect(wildcardScripts.length).toBe(10);

    for (const script of OPERACAO_ROTEIROS) {
      expect(script.code).toBeTruthy();
      expect(script.title).toBeTruthy();
      expect(script.hook).toBeTruthy();
      expect(script.context || script.development).toBeTruthy();
      expect(script.closing).toBeTruthy();
      expect(script.cta).toBeTruthy();
      expect(script.suggestedDurationSeconds).toBeGreaterThan(0);
      expect(script.category).toBeTruthy();
      expect(script.gdriveFolderUrl).toContain("drive.google.com");
    }
  });

  it("contains 150 hooks across 10 psychological categories", () => {
    expect(OPERACAO_GANCHOS.length).toBe(10);
    expect(OPERACAO_GANCHOS_FLAT.length).toBe(150);

    const categories = new Set(OPERACAO_GANCHOS_FLAT.map((g) => g.category));
    expect(categories.size).toBe(10);

    for (const hook of OPERACAO_GANCHOS_FLAT) {
      expect(hook.id).toBeTruthy();
      expect(hook.hook.length).toBeGreaterThan(5);
      expect(hook.trigger).toBeTruthy();
      expect(hook.category).toBeTruthy();
    }
  });

  it("contains viral titles across 10 categories and 60 captions across 6 categories", () => {
    expect(COFRE_TITULOS.length).toBeGreaterThanOrEqual(120);
    expect(COFRE_LEGENDAS.length).toBe(60);

    const titleCats = new Set(COFRE_TITULOS.map((t) => t.category));
    expect(titleCats.size).toBe(10);

    const captionCats = new Set(COFRE_LEGENDAS.map((c) => c.category));
    expect(captionCats.size).toBe(6);

    for (const title of COFRE_TITULOS) {
      expect(title.title).toBeTruthy();
      expect(title.category).toBeTruthy();
    }

    for (const caption of COFRE_LEGENDAS) {
      expect(caption.caption).toBeTruthy();
      expect(caption.objective).toBeTruthy();
    }
  });

  it("contains 30 days in the editorial content calendar", () => {
    expect(OPERACAO_CALENDARIO_30D.length).toBe(30);

    const days = OPERACAO_CALENDARIO_30D.map((d) => d.day);
    for (let i = 1; i <= 30; i++) {
      expect(days).toContain(i);
    }

    for (const day of OPERACAO_CALENDARIO_30D) {
      expect(day.title).toBeTruthy();
      expect(day.category).toBeTruthy();
      expect(day.format).toBeTruthy();
      expect(day.difficulty).toMatch(/facil|media|avancada/i);
    }
  });

  it("contains 40 subniches and 120 concrete video ideas in Opportunity Map", () => {
    expect(OPERACAO_MAPA_OPORTUNIDADES.length).toBe(40);

    let totalIdeas = 0;
    for (const opp of OPERACAO_MAPA_OPORTUNIDADES) {
      expect(opp.title).toBeTruthy();
      expect(opp.description).toBeTruthy();
      expect(opp.difficulty).toMatch(/Fácil|Média|Avançada/);
      expect(opp.ideas.length).toBe(3);
      totalIdeas += opp.ideas.length;
    }
    expect(totalIdeas).toBe(120);
  });

  it("contains 11 Google Drive subcategories linking to the 651 files", () => {
    expect(CATEGORIAS_DRIVE.length).toBe(11);
    for (const cat of CATEGORIAS_DRIVE) {
      expect(cat.title).toBeTruthy();
      expect(cat.url).toContain("drive.google.com");
      expect(cat.fileCount).toBeGreaterThan(0);
    }
  });

  it("has real GTA 6 Trailer 1 and Trailer 2 MP4 files stored in public/media/", () => {
    const t1 = path.join(ROOT, "public", "media", "gta6-trailer-1.mp4");
    const t2 = path.join(ROOT, "public", "media", "gta6-trailer-2.mp4");

    expect(fs.existsSync(t1)).toBe(true);
    expect(fs.existsSync(t2)).toBe(true);

    const stat1 = fs.statSync(t1);
    const stat2 = fs.statSync(t2);

    // Trailer 1 is ~36.6 MB
    expect(stat1.size).toBeGreaterThan(30 * 1024 * 1024);
    // Trailer 2 is ~51.1 MB
    expect(stat2.size).toBeGreaterThan(45 * 1024 * 1024);
  });

  it("has public/downloads/ directory ready for yt-dlp real downloads", () => {
    const downloadsDir = path.join(ROOT, "public", "downloads");
    expect(fs.existsSync(downloadsDir)).toBe(true);
  });
});
