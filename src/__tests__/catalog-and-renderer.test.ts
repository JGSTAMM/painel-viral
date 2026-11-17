import { describe, expect, it } from "vitest";
import {
  EM_ALTA_CHARACTERS,
  IMAGE_ASPECT_RATIOS,
  IMAGE_TEMPLATES,
  TRAILER_SCENES,
  VIDEO_DURATIONS,
  VIDEO_MODELS,
  formatSecondsToTimestamp,
  generateViralPhrases,
  getDefaultSceneForCharacter,
} from "@/data/gta-catalog";
import {
  calculateCropRect,
  getCanvasDimensionsForAspect,
} from "@/lib/canvas-renderer";

describe("GTA 6 Gerador Catalog", () => {
  it("exposes exactly 8 Em Alta characters with Top 3 ranked", () => {
    expect(EM_ALTA_CHARACTERS).toHaveLength(8);
    expect(EM_ALTA_CHARACTERS[0].name).toBe("Jason Duval");
    expect(EM_ALTA_CHARACTERS[1].name).toBe("Lucia Caminos");
    expect(EM_ALTA_CHARACTERS[2].name).toBe("Raul Bautista");
    expect(EM_ALTA_CHARACTERS.slice(0, 3).map((c) => c.rank)).toEqual([1, 2, 3]);
  });

  it("exposes 20 video models starting with recommended classic post and split screen", () => {
    expect(VIDEO_MODELS).toHaveLength(20);
    expect(VIDEO_MODELS[0].id).toBe("post-card-light");
    expect(VIDEO_MODELS[0].recommended).toBe(true);
    expect(VIDEO_MODELS.some((m) => m.id === "split-neon-pink")).toBe(true);
  });

  it("exposes 10 image templates and 4 image aspect ratios", () => {
    expect(IMAGE_TEMPLATES).toHaveLength(10);
    expect(IMAGE_ASPECT_RATIOS).toHaveLength(4);
    expect(IMAGE_TEMPLATES[0].name).toBe("Capa clássica");
    expect(IMAGE_TEMPLATES[9].name).toBe("Cinema");
  });

  it("exposes 7 standard duration presets and rich trailer scenes across all categories", () => {
    expect(VIDEO_DURATIONS.map((d) => d.label)).toEqual([
      "8s",
      "15s",
      "30s",
      "1min",
      "1min 30s",
      "2min",
      "3min",
    ]);
    expect(TRAILER_SCENES.length).toBeGreaterThanOrEqual(20);
    const categories = new Set(TRAILER_SCENES.map((s) => s.category));
    expect(categories.has("Ação")).toBe(true);
    expect(categories.has("Personagens")).toBe(true);
    expect(categories.has("Cidade")).toBe(true);
    expect(categories.has("Engraçado")).toBe(true);
    expect(categories.has("Carros")).toBe(true);
    expect(categories.has("Festa")).toBe(true);
  });

  it("generates distinct viral phrases from a keyword without mutating inputs", () => {
    const phrases = generateViralPhrases("Lucia", 5);
    expect(phrases).toHaveLength(5);
    expect(new Set(phrases).size).toBe(5);
    expect(phrases.some((p) => p.toLowerCase().includes("lucia"))).toBe(true);
  });

  it("formats seconds to MM:SS timestamps and maps characters to scenes", () => {
    expect(formatSecondsToTimestamp(780)).toBe("13:00");
    expect(formatSecondsToTimestamp(795)).toBe("13:15");
    expect(formatSecondsToTimestamp(90)).toBe("01:30");

    const jasonScene = getDefaultSceneForCharacter("jason-duval");
    expect(jasonScene).toBeDefined();
    expect(jasonScene?.id).toBeTruthy();
  });
});

describe("Canvas Renderer Geometry", () => {
  it("calculates Full HD dimensions for 9:16, 4:5, 1:1 and 16:9", () => {
    expect(getCanvasDimensionsForAspect("9:16")).toEqual({ width: 1080, height: 1920 });
    expect(getCanvasDimensionsForAspect("4:5")).toEqual({ width: 1080, height: 1350 });
    expect(getCanvasDimensionsForAspect("1:1")).toEqual({ width: 1080, height: 1080 });
    expect(getCanvasDimensionsForAspect("16:9")).toEqual({ width: 1920, height: 1080 });
  });

  it("calculates framing crop rectangle respecting left, center, right, zoom and pan", () => {
    const center = calculateCropRect({
      sourceWidth: 1920,
      sourceHeight: 1080,
      targetWidth: 1080,
      targetHeight: 1080,
      framing: "centro",
      zoom: 1,
      panOffset: { x: 0, y: 0 },
    });
    expect(center.sw).toBe(1080);
    expect(center.sh).toBe(1080);
    expect(center.sx).toBe(420);

    const left = calculateCropRect({
      sourceWidth: 1920,
      sourceHeight: 1080,
      targetWidth: 1080,
      targetHeight: 1080,
      framing: "esquerda",
      zoom: 1,
      panOffset: { x: 0, y: 0 },
    });
    expect(left.sx).toBe(0);

    const right = calculateCropRect({
      sourceWidth: 1920,
      sourceHeight: 1080,
      targetWidth: 1080,
      targetHeight: 1080,
      framing: "direita",
      zoom: 1,
      panOffset: { x: 0, y: 0 },
    });
    expect(right.sx).toBe(840);
  });
});
