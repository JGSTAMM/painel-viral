"use client";

import React, { useMemo, useState } from "react";
import { Download, ExternalLink, FolderDown, Monitor, Play, Scissors, Smartphone, Sparkles, Square } from "lucide-react";
import {
  SCENE_CATEGORIES,
  TRAILER_SCENES,
  VIDEO_DURATIONS,
  type AspectRatioKey,
  type SceneCategory,
  type TrailerScene,
} from "@/data/gta-catalog";
import { CATEGORIAS_DRIVE } from "@/data/operacao-gta";
import { usePainel } from "@/context/PainelContext";
import {
  getCanvasDimensionsForAspect,
  recordCanvasVideo,
  renderVideoFrameToCanvas,
} from "@/lib/canvas-renderer";

type CleanVideoAspect = Exclude<AspectRatioKey, "4:5">;

export function CortesViraisTool() {
  const { brandProfile, openSceneInEditor, updateEditorState, setActiveTab, addCreation, showToast } = usePainel();
  const [durationSeconds, setDurationSeconds] = useState(30);
  const [aspect, setAspect] = useState<CleanVideoAspect>("16:9");
  const [category, setCategory] = useState<SceneCategory>("Todos");
  const [renderingSceneId, setRenderingSceneId] = useState<string | null>(null);

  const filteredScenes = useMemo(() => {
    if (category === "Todos") return TRAILER_SCENES;
    return TRAILER_SCENES.filter((s) => s.category === category);
  }, [category]);

  const handleDownloadCleanCut = async (scene: TrailerScene) => {
    if (renderingSceneId) return;
    setRenderingSceneId(scene.id);
    try {
      const dims = getCanvasDimensionsForAspect(aspect);
      const scaleW = Math.round(dims.width / 2);
      const scaleH = Math.round(dims.height / 2);

      const sceneImg = await new Promise<HTMLImageElement | null>((resolve) => {
        const im = new Image();
        im.crossOrigin = "anonymous";
        im.src = scene.imageUrl;
        im.onload = () => resolve(im);
        im.onerror = () => resolve(null);
      });

      const { blob, extension } = await recordCanvasVideo({
        width: scaleW,
        height: scaleH,
        durationSeconds,
        renderFrame: (ctx, elapsed) => {
          renderVideoFrameToCanvas({
            ctx,
            width: scaleW,
            height: scaleH,
            timeSeconds: elapsed,
            scene,
            sceneImage: sceneImg,
            modelId: "fullscreen-watermark",
            caption: "",
            framing: "centro",
            zoom: 1.05,
            panOffset: { x: 0, y: 0 },
            accentColor: scene.accentColor,
            brand: {
              name: "",
              handle: "",
              avatarText: brandProfile.avatarText,
              avatarImage: null,
              verified: false,
              badgeColor: brandProfile.badgeColor,
            },
          });
        },
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `corte-limpo-${scene.id}-${aspect.replace(":", "x")}-${durationSeconds}s.${extension}`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      addCreation({
        id: `cut-${Date.now()}`,
        type: "video",
        title: `${scene.title} (Corte Limpo)`,
        format: aspect,
        durationSeconds,
        modelName: "Vídeo Limpo",
        createdAt: "Agora mesmo",
        downloadUrl: url,
        extension,
        thumbnailUrl: scene.imageUrl,
      });
      showToast(`Corte limpo ${aspect} (${durationSeconds}s) baixado com sucesso!`);
    } catch {
      showToast("Erro ao renderizar corte limpo.");
    } finally {
      setRenderingSceneId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Duration + Format Configuration Box (exact match to screenshot) */}
      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-5 md:p-6 space-y-6">
        <div className="grid lg:grid-cols-[1fr_280px] gap-4 items-center">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="cut-duration-slider" className="text-xs font-bold text-white/80">
                Duração de cada corte
              </label>
              <span className="text-2xl font-extrabold text-pink-500 tabular-nums">
                {durationSeconds >= 60
                  ? `${Math.floor(durationSeconds / 60)}min${durationSeconds % 60 ? ` ${durationSeconds % 60}s` : ""}`
                  : `${durationSeconds}s`}
              </span>
            </div>
            <input
              id="cut-duration-slider"
              type="range"
              min={3}
              max={180}
              value={durationSeconds}
              onChange={(e) => setDurationSeconds(Number(e.target.value))}
              className="w-full vice-range"
            />
            <div className="flex justify-between text-[11px] text-white/40">
              <span>3s</span>
              <span>1min</span>
              <span>2min</span>
              <span>3min</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {VIDEO_DURATIONS.map((d) => (
                <button
                  key={d.label}
                  type="button"
                  onClick={() => setDurationSeconds(d.seconds)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                    durationSeconds === d.seconds
                      ? "bg-pink-500 text-white border-pink-400 shadow-[0_0_16px_rgba(236,72,153,0.45)]"
                      : "bg-white/[0.04] text-white/70 border-white/[0.08] hover:text-white"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/55 leading-relaxed bg-[#0b0612] p-3.5 rounded-2xl border border-white/[0.06]">
            O corte começa na cena escolhida e segue o trailer pelo tempo que você marcar.
          </p>
        </div>

        {/* Formato do vídeo */}
        <div className="space-y-3 pt-2 border-t border-white/[0.06]">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-white/80">Formato do vídeo</span>
            <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/35 text-[10px] font-extrabold tracking-wider text-cyan-300 uppercase">
              VÍDEO LIMPO · SEM NADA POR CIMA
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {(
              [
                {
                  key: "9:16",
                  res: "1080 × 1920",
                  sub: "Reels · TikTok · Shorts",
                  icon: Smartphone,
                },
                {
                  key: "16:9",
                  res: "1920 × 1080",
                  sub: "YouTube · tela cheia",
                  icon: Monitor,
                },
                {
                  key: "1:1",
                  res: "1080 × 1080",
                  sub: "Feed · Facebook",
                  icon: Square,
                },
              ] as const
            ).map((fmt) => {
              const Icon = fmt.icon;
              const selected = aspect === fmt.key;
              return (
                <button
                  key={fmt.key}
                  type="button"
                  onClick={() => setAspect(fmt.key)}
                  className={`flex items-center gap-3.5 p-4 rounded-2xl text-left border transition ${
                    selected
                      ? "bg-pink-500/15 border-pink-500 shadow-[0_0_24px_rgba(236,72,153,0.22)]"
                      : "bg-[#0b0612] border-white/[0.08] hover:border-white/25"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                      selected
                        ? "bg-pink-500/20 border-pink-400 text-pink-300"
                        : "bg-white/[0.04] border-white/10 text-white/50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-white">
                      {fmt.key}{" "}
                      <span className="text-xs font-medium text-white/55">{fmt.res}</span>
                    </div>
                    <div className="text-xs text-white/55 mt-0.5">{fmt.sub}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Official Trailers in 1080p MP4 */}
      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-5 md:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-extrabold tracking-widest uppercase text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              ARQUIVOS REAIS EM DISCO
            </span>
            <h2 className="text-lg md:text-xl font-extrabold text-white mt-0.5">
              Trailers Oficiais GTA VI (1080p MP4 Limpos)
            </h2>
            <p className="text-xs text-white/60">
              Baixe os trailers em formato bruto ou carregue direto no editor para aplicar modelos e legendas virais.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Trailer 1 */}
          <div className="rounded-2xl p-4 bg-[#0b0612] border border-cyan-400/30 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 font-mono">
                  TRAILER 1
                </span>
                <span className="text-[10px] text-white/50 font-bold">36.6 MB · 1080p</span>
              </div>
              <h3 className="text-sm font-bold text-white">GTA VI — Trailer Oficial 1</h3>
              <p className="text-xs text-white/55 mt-1">
                Apresentação de Lucia e Vice City, incluindo praias, pântanos e cenas urbanas.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
              <a
                href="/media/gta6-trailer-1.mp4"
                download="gta6-trailer-1-1080p.mp4"
                className="flex-1 py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                Baixar MP4
              </a>
              <button
                type="button"
                onClick={() => {
                  updateEditorState({
                    customVideoUrl: "/media/gta6-trailer-1.mp4",
                    customVideoName: "GTA VI — Trailer 1 Oficial (MP4)",
                  });
                  setActiveTab("editar-video");
                  showToast("Trailer 1 carregado no Editor!");
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 border border-cyan-400/40 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                No Editor
              </button>
            </div>
          </div>

          {/* Trailer 2 */}
          <div className="rounded-2xl p-4 bg-[#0b0612] border border-pink-500/30 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-pink-500/20 text-pink-300 font-mono">
                  TRAILER 2
                </span>
                <span className="text-[10px] text-white/50 font-bold">51.1 MB · 1080p</span>
              </div>
              <h3 className="text-sm font-bold text-white">GTA VI — Trailer Oficial 2</h3>
              <p className="text-xs text-white/55 mt-1">
                Foco na narrativa de Lucia e Jason, fugas em alta velocidade e detalhes da física.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
              <a
                href="/media/gta6-trailer-2.mp4"
                download="gta6-trailer-2-1080p.mp4"
                className="flex-1 py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition"
              >
                <Download className="w-3.5 h-3.5 text-pink-400" />
                Baixar MP4
              </a>
              <button
                type="button"
                onClick={() => {
                  updateEditorState({
                    customVideoUrl: "/media/gta6-trailer-2.mp4",
                    customVideoName: "GTA VI — Trailer 2 Oficial (MP4)",
                  });
                  setActiveTab("editar-video");
                  showToast("Trailer 2 carregado no Editor!");
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-pink-500/20 hover:bg-pink-500 border border-pink-500/40 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                No Editor
              </button>
            </div>
          </div>

          {/* GDrive Central */}
          <div className="rounded-2xl p-4 bg-[#0b0612] border border-amber-400/30 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-amber-500/20 text-amber-300 font-mono">
                  DRIVE NUVEM
                </span>
                <span className="text-[10px] text-amber-300/80 font-bold">651 Arquivos</span>
              </div>
              <h3 className="text-sm font-bold text-white">Central de Mídia Completa</h3>
              <p className="text-xs text-white/55 mt-1">
                Acesse todas as 6 áreas e 11 subpastas do Google Drive com clipes, áudios e imagens.
              </p>
            </div>
            <div className="pt-2 border-t border-white/[0.06]">
              <a
                href={CATEGORIAS_DRIVE[0].url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-xs font-bold text-amber-200 flex items-center justify-center gap-1.5 transition"
              >
                <FolderDown className="w-3.5 h-3.5 text-amber-400" />
                Abrir Pasta no Drive
                <ExternalLink className="w-3 h-3 text-amber-400" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2">
        {SCENE_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition border ${
              category === cat
                ? "btn-neon text-white border-pink-400"
                : "bg-[#130b1f] text-white/70 border-white/[0.08] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Scenes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredScenes.map((scene) => {
          const isBusy = renderingSceneId === scene.id;
          return (
            <article
              key={scene.id}
              className="rounded-2xl overflow-hidden bg-[#130b1f] border border-white/[0.08] hover:border-pink-500/50 transition flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={scene.imageUrl}
                  alt={scene.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0612] via-transparent to-black/40" />

                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/75 border border-white/10 text-[10px] font-extrabold uppercase text-white">
                  {scene.category}
                </span>
                <span className="absolute top-2.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded bg-pink-500 text-[10px] font-extrabold text-white shadow">
                  {aspect}
                </span>
                <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/75 text-[10px] font-bold text-white/90 tabular-nums">
                  {scene.timestampLabel}
                </span>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-white">{scene.title}</h2>
                  <p className="text-xs text-white/55 mt-0.5">
                    Qualidade {scene.resolution} · Sem texto por cima
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={Boolean(renderingSceneId)}
                    onClick={() => handleDownloadCleanCut(scene)}
                    className="py-2 px-3 rounded-xl btn-neon text-xs font-bold text-white flex items-center justify-center gap-1.5 disabled:opacity-60"
                  >
                    <Download className="w-3.5 h-3.5" />
                    {isBusy ? "Gerando..." : "Baixar Corte"}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      openSceneInEditor(scene.id, scene.defaultHook, durationSeconds)
                    }
                    className="py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition"
                  >
                    <Scissors className="w-3.5 h-3.5 text-cyan-400" />
                    Editar
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
