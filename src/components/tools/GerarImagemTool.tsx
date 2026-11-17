"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Download, Image as ImageIcon, Palette, Type, Upload } from "lucide-react";
import {
  IMAGE_ASPECT_RATIOS,
  IMAGE_TEMPLATES,
  TRAILER_SCENES,
  type AspectRatioKey,
} from "@/data/gta-catalog";
import { usePainel } from "@/context/PainelContext";
import {
  getCanvasDimensionsForAspect,
  renderImageTemplateToCanvas,
} from "@/lib/canvas-renderer";

type ImageControlTab = "imagem" | "texto" | "cores";

export function GerarImagemTool() {
  const { brandProfile, addCreation, showToast } = usePainel();
  const [templateId, setTemplateId] = useState<string>(IMAGE_TEMPLATES[0].id);
  const [aspect, setAspect] = useState<AspectRatioKey>("9:16");
  const [sceneId, setSceneId] = useState<string>(TRAILER_SCENES[0].id);
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(null);
  const [headline, setHeadline] = useState("ISSO É GTA 6?");
  const [subheadline, setSubheadline] = useState("VICE CITY EM 4K NO TRAILER OFICIAL");
  const [zoom, setZoom] = useState(1.0);
  const [accentColor, setAccentColor] = useState("#ff007f");
  const [textColor, setTextColor] = useState("#ffffff");
  const [activeSubTab, setActiveSubTab] = useState<ImageControlTab>("imagem");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const activeScene = useMemo(
    () => TRAILER_SCENES.find((s) => s.id === sceneId) ?? TRAILER_SCENES[0],
    [sceneId]
  );

  const secondaryScene = useMemo(() => {
    const idx = TRAILER_SCENES.findIndex((s) => s.id === activeScene.id);
    return TRAILER_SCENES[(idx + 2) % TRAILER_SCENES.length];
  }, [activeScene.id]);

  const dims = useMemo(() => getCanvasDimensionsForAspect(aspect), [aspect]);

  // Redraw high-res preview canvas whenever settings change
  useEffect(() => {
    let cancelled = false;

    const loadImg = (src: string) =>
      new Promise<HTMLImageElement | null>((resolve) => {
        const im = new Image();
        im.crossOrigin = "anonymous";
        im.src = src;
        im.onload = () => resolve(im);
        im.onerror = () => resolve(null);
      });

    async function draw() {
      const [img1, img2, avatarImg] = await Promise.all([
        loadImg(customImageUrl ?? activeScene.imageUrl),
        loadImg(secondaryScene.imageUrl),
        brandProfile.avatarUrl ? loadImg(brandProfile.avatarUrl) : Promise.resolve(null),
      ]);
      if (cancelled || !canvasRef.current) return;

      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      renderImageTemplateToCanvas({
        ctx,
        width: dims.width,
        height: dims.height,
        templateId,
        scene: activeScene,
        sceneImage: img1,
        secondaryImage: img2,
        headline,
        subheadline,
        zoom,
        panOffset: { x: 0, y: 0 },
        accentColor,
        textColor,
        brand: {
          name: brandProfile.name,
          handle: brandProfile.handle,
          avatarText: brandProfile.avatarText,
          avatarImage: avatarImg,
          verified: brandProfile.verified,
          badgeColor: brandProfile.badgeColor,
        },
      });
    }

    draw();
    return () => {
      cancelled = true;
    };
  }, [
    dims.width,
    dims.height,
    templateId,
    activeScene,
    secondaryScene.imageUrl,
    customImageUrl,
    headline,
    subheadline,
    zoom,
    accentColor,
    textColor,
    brandProfile,
  ]);

  const handleUploadCustomImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setCustomImageUrl(reader.result);
        showToast(`Imagem "${file.name}" aplicada ao template.`);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDownloadImage = (format: "png" | "jpeg") => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mime = format === "png" ? "image/png" : "image/jpeg";
    const dataUrl = canvas.toDataURL(mime, 0.94);

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `gta6-capa-${templateId}-${aspect.replace(":", "x")}.${format === "png" ? "png" : "jpg"}`;
    document.body.appendChild(a);
    a.click();
    a.remove();

    const tplName =
      IMAGE_TEMPLATES.find((t) => t.id === templateId)?.name ?? "Capa clássica";

    addCreation({
      id: `img-${Date.now()}`,
      type: "image",
      title: headline || tplName,
      format: aspect,
      modelName: tplName,
      createdAt: "Agora mesmo",
      downloadUrl: dataUrl,
      extension: format === "png" ? "png" : "jpg",
      thumbnailUrl: dataUrl,
    });
    showToast(`Imagem Full HD (${dims.width}×${dims.height}) salva em Minhas Criações!`);
  };

  return (
    <div className="space-y-6">
      {/* Horizontal Templates Carousel matching painel_gerar_imagem.png */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-white/75">
            Templates (10 modelos prontos)
          </h2>
          <span className="text-xs text-white/50">
            Resolução: {dims.width} × {dims.height}
          </span>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {IMAGE_TEMPLATES.map((tpl) => {
            const selected = templateId === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => {
                  setTemplateId(tpl.id);
                  setAccentColor(tpl.accentColor);
                }}
                className={`shrink-0 w-32 rounded-2xl p-2 text-left border transition ${
                  selected
                    ? "bg-pink-500/15 border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.25)]"
                    : "bg-[#130b1f] border-white/[0.08] hover:border-white/25"
                }`}
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-[#0b0612] border border-white/10">
                  <img
                    src={activeScene.imageUrl}
                    alt={tpl.name}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-x-1 bottom-2 text-center px-1 py-0.5 rounded bg-black/75 text-[9px] font-extrabold text-white">
                    ISSO É GTA 6?
                  </div>
                </div>
                <div className="mt-2 text-xs font-bold text-white truncate">{tpl.name}</div>
                <div className="text-[10px] text-white/50 line-clamp-1">{tpl.description}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Split Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-6 items-start">
        {/* Preview + Aspect Ratios */}
        <div className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-5 space-y-4">
          <div className="flex flex-wrap gap-2">
            {IMAGE_ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio.key}
                type="button"
                onClick={() => setAspect(ratio.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                  aspect === ratio.key
                    ? "bg-pink-500/20 border-pink-500 text-white"
                    : "bg-[#0b0612] border-white/[0.08] text-white/65 hover:text-white"
                }`}
              >
                {ratio.label} <span className="opacity-75 font-normal">{ratio.sublabel}</span>
              </button>
            ))}
          </div>

          <div className="flex justify-center bg-[#0b0612] rounded-2xl p-4 border border-white/[0.06]">
            <canvas
              ref={canvasRef}
              width={dims.width}
              height={dims.height}
              className="max-h-[520px] w-auto max-w-full rounded-xl shadow-2xl border border-white/10"
            />
          </div>
        </div>

        {/* Right Controls: Imagem | Texto | Cores */}
        <div className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-5 space-y-5">
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[#0b0612] border border-white/[0.06]">
            {(
              [
                { id: "imagem", label: "Imagem", icon: ImageIcon },
                { id: "texto", label: "Texto", icon: Type },
                { id: "cores", label: "Cores", icon: Palette },
              ] as const
            ).map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveSubTab(t.id)}
                  className={`py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                    activeSubTab === t.id
                      ? "btn-neon text-white"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {t.label}
                </button>
              );
            })}
          </div>

          {activeSubTab === "imagem" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-white/75">Zoom</span>
                  <span className="font-bold text-white tabular-nums">
                    {Math.round(zoom * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={2.2}
                  step={0.05}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full vice-range"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white/75">
                    Escolha uma cena HD
                  </span>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handleUploadCustomImage}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1"
                  >
                    <Upload className="w-3 h-3" />
                    Subir foto
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 max-h-[220px] overflow-y-auto pr-1">
                  {TRAILER_SCENES.slice(0, 12).map((sc) => (
                    <button
                      key={sc.id}
                      type="button"
                      onClick={() => {
                        setCustomImageUrl(null);
                        setSceneId(sc.id);
                      }}
                      className={`aspect-video rounded-xl overflow-hidden border transition ${
                        !customImageUrl && sceneId === sc.id
                          ? "border-pink-500 ring-2 ring-pink-500/50"
                          : "border-white/10 opacity-75 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={sc.imageUrl}
                        alt={sc.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSubTab === "texto" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-white/75 block mb-1">
                  Título principal da capa
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-white/75 block mb-1">
                  Subtítulo / chamada
                </label>
                <input
                  type="text"
                  value={subheadline}
                  onChange={(e) => setSubheadline(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-sm text-white"
                />
              </div>
            </div>
          )}

          {activeSubTab === "cores" && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-semibold text-white/75 block mb-2">
                  Cor de destaque / faixa neon
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {["#ff007f", "#00f0ff", "#a855f7", "#f59e0b", "#ef4444", "#22c55e"].map(
                    (c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setAccentColor(c)}
                        aria-label={`Selecionar cor ${c}`}
                        className={`w-8 h-8 rounded-full border-2 ${
                          accentColor === c ? "border-white scale-110" : "border-transparent"
                        }`}
                        style={{ backgroundColor: c }}
                      />
                    )
                  )}
                </div>
              </div>
              <div>
                <span className="text-xs font-semibold text-white/75 block mb-2">
                  Cor do texto
                </span>
                <div className="flex gap-2.5">
                  {["#ffffff", "#00f0ff", "#fde047", "#f9a8d4"].map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setTextColor(c)}
                      aria-label={`Cor do texto ${c}`}
                      className={`w-8 h-8 rounded-full border-2 ${
                        textColor === c ? "border-pink-500 scale-110" : "border-white/20"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="pt-2 border-t border-white/[0.08] space-y-2">
            <button
              type="button"
              onClick={() => handleDownloadImage("png")}
              className="w-full py-3 px-4 rounded-2xl btn-neon text-xs font-extrabold text-white flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Baixar Imagem Full HD (PNG)
            </button>
            <button
              type="button"
              onClick={() => handleDownloadImage("jpeg")}
              className="w-full py-2.5 px-4 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white transition"
            >
              Baixar JPG Leve para WhatsApp/Feed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
