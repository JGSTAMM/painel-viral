"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  Check,
  ExternalLink,
  Film,
  FolderDown,
  Layers,
  Pause,
  Play,
  Search,
  Sparkles,
  Upload,
  UserCheck,
  Volume2,
  VolumeX,
  Wand2,
  X,
  Zap,
} from "lucide-react";
import {
  TOTAL_TRAILER_DURATION_SECONDS,
  TRAILER_SCENES,
  VIDEO_DURATIONS,
  VIDEO_MODELS,
  formatSecondsToTimestamp,
  generateViralPhrases,
  type FramingMode,
} from "@/data/gta-catalog";
import {
  CATEGORIAS_DRIVE,
  OPERACAO_GANCHOS_FLAT,
  OPERACAO_ROTEIROS,
  type OperacaoRoteiro,
} from "@/data/operacao-gta";
import { usePainel } from "@/context/PainelContext";
import { recordCanvasVideo, renderVideoFrameToCanvas } from "@/lib/canvas-renderer";

type RightBottomTab = "legenda" | "visual" | "perfil";

export function VideoEditorTool() {
  const {
    editorState,
    brandProfile,
    downloadedVideos,
    updateEditorState,
    updateBrandProfile,
    addCreation,
    showToast,
  } = usePainel();

  const [rightTab, setRightTab] = useState<RightBottomTab>("legenda");
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number; origX: number; origY: number } | null>(
    null
  );

  // Modals for Arsenal integration
  const [showGanchosModal, setShowGanchosModal] = useState(false);
  const [searchGancho, setSearchGancho] = useState("");
  const [ganchoCategory, setGanchoCategory] = useState("Todos");

  const [showRoteirosModal, setShowRoteirosModal] = useState(false);
  const [searchRoteiro, setSearchRoteiro] = useState("");
  const [roteiroCategory, setRoteiroCategory] = useState("Todos");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const hiddenVideoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(TOTAL_TRAILER_DURATION_SECONDS);

  const loadedSceneImgRef = useRef<HTMLImageElement | null>(null);
  const loadedSecondaryImgRef = useRef<HTMLImageElement | null>(null);
  const loadedAvatarImgRef = useRef<HTMLImageElement | null>(null);

  const activeScene = useMemo(
    () => TRAILER_SCENES.find((s) => s.id === editorState.sceneId) ?? TRAILER_SCENES[0],
    [editorState.sceneId]
  );

  const secondaryScene = useMemo(() => {
    const idx = TRAILER_SCENES.findIndex((s) => s.id === activeScene.id);
    return TRAILER_SCENES[(idx + 1) % TRAILER_SCENES.length];
  }, [activeScene.id]);

  const suggestedPhrases = useMemo(
    () => generateViralPhrases(editorState.keyword || "Vice City", 6),
    [editorState.keyword]
  );

  const ganchoCategories = useMemo(() => {
    const set = new Set<string>();
    OPERACAO_GANCHOS_FLAT.forEach((g) => set.add(g.category));
    return ["Todos", ...Array.from(set)];
  }, []);

  const filteredGanchos = useMemo(() => {
    return OPERACAO_GANCHOS_FLAT.filter((g) => {
      const matchCat = ganchoCategory === "Todos" || g.category === ganchoCategory;
      const matchSearch =
        !searchGancho ||
        g.hook.toLowerCase().includes(searchGancho.toLowerCase()) ||
        g.trigger.toLowerCase().includes(searchGancho.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [ganchoCategory, searchGancho]);

  const roteiroCategories = useMemo(() => {
    const set = new Set<string>();
    OPERACAO_ROTEIROS.forEach((r) => set.add(r.category));
    return ["Todos", ...Array.from(set)];
  }, []);

  const filteredRoteiros = useMemo(() => {
    return OPERACAO_ROTEIROS.filter((r) => {
      const matchCat = roteiroCategory === "Todos" || r.category === roteiroCategory;
      const matchSearch =
        !searchRoteiro ||
        r.title.toLowerCase().includes(searchRoteiro.toLowerCase()) ||
        r.hook.toLowerCase().includes(searchRoteiro.toLowerCase()) ||
        r.code.toLowerCase().includes(searchRoteiro.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [roteiroCategory, searchRoteiro]);

  // Load scene primary & secondary images
  useEffect(() => {
    const img1 = new Image();
    img1.crossOrigin = "anonymous";
    img1.src = activeScene.imageUrl;
    img1.onload = () => {
      loadedSceneImgRef.current = img1;
    };

    const img2 = new Image();
    img2.crossOrigin = "anonymous";
    img2.src = secondaryScene.imageUrl;
    img2.onload = () => {
      loadedSecondaryImgRef.current = img2;
    };
  }, [activeScene.imageUrl, secondaryScene.imageUrl]);

  // Load brand avatar image if uploaded
  useEffect(() => {
    if (!brandProfile.avatarUrl) {
      loadedAvatarImgRef.current = null;
      return;
    }
    const avatar = new Image();
    avatar.crossOrigin = "anonymous";
    avatar.src = brandProfile.avatarUrl;
    avatar.onload = () => {
      loadedAvatarImgRef.current = avatar;
    };
  }, [brandProfile.avatarUrl]);

  // Live 60fps canvas animation loop
  useEffect(() => {
    let rafId = 0;
    let start = performance.now();

    const drawLoop = (now: number) => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const elapsed = isPlaying ? (now - start) / 1000 : 0;
          renderVideoFrameToCanvas({
            ctx,
            width: canvas.width,
            height: canvas.height,
            timeSeconds: elapsed,
            scene: activeScene,
            sceneImage: loadedSceneImgRef.current,
            secondarySceneImage: loadedSecondaryImgRef.current,
            videoElement: editorState.customVideoUrl ? hiddenVideoRef.current : null,
            modelId: editorState.videoModelId,
            caption: editorState.caption,
            framing: editorState.framing,
            zoom: editorState.zoom,
            panOffset: editorState.panOffset,
            accentColor: editorState.accentColor,
            brand: {
              name: brandProfile.name,
              handle: brandProfile.handle,
              avatarText: brandProfile.avatarText,
              avatarImage: loadedAvatarImgRef.current,
              verified: brandProfile.verified,
              badgeColor: brandProfile.badgeColor,
            },
          });
        }
      }
      if (isPlaying) {
        rafId = requestAnimationFrame(drawLoop);
      }
    };

    rafId = requestAnimationFrame(drawLoop);
    return () => cancelAnimationFrame(rafId);
  }, [
    isPlaying,
    activeScene,
    editorState.customVideoUrl,
    editorState.videoModelId,
    editorState.caption,
    editorState.framing,
    editorState.zoom,
    editorState.panOffset,
    editorState.accentColor,
    brandProfile,
  ]);

  // Sync hidden <video> playback & seek timestamp when startTimeSeconds or source changes
  useEffect(() => {
    const vid = hiddenVideoRef.current;
    if (!vid || !editorState.customVideoUrl) return;
    vid.muted = isMuted;
    if (isPlaying) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [editorState.customVideoUrl, isPlaying, isMuted]);

  useEffect(() => {
    const vid = hiddenVideoRef.current;
    if (!vid || !editorState.customVideoUrl) return;
    if (Math.abs(vid.currentTime - editorState.startTimeSeconds) > 0.6) {
      try {
        vid.currentTime = editorState.startTimeSeconds;
      } catch {
        // Ignore seek before metadata loaded
      }
    }
  }, [editorState.startTimeSeconds, editorState.customVideoUrl]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      origX: editorState.panOffset.x,
      origY: editorState.panOffset.y,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragging || !dragStartRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    updateEditorState({
      panOffset: {
        x: Math.max(-140, Math.min(140, dragStartRef.current.origX + dx)),
        y: Math.max(-140, Math.min(140, dragStartRef.current.origY + dy)),
      },
    });
  };

  const handlePointerUp = () => {
    setDragging(false);
    dragStartRef.current = null;
  };

  const handleCustomVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    updateEditorState({
      customVideoUrl: url,
      customVideoName: file.name,
    });
    showToast(`Vídeo "${file.name}" carregado no editor.`);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateBrandProfile({ avatarUrl: reader.result });
        showToast("Logo / foto de perfil atualizada no painel.");
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerDownloadUrl = (url: string, filename: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    return url;
  };

  const renderSingleOrFallback = async (
    captionText: string,
    durationSec: number,
    filePrefix: string,
    modelName: string
  ): Promise<{ downloadUrl: string; extension: string }> => {
    const sourceUrl = editorState.customVideoUrl || activeScene.videoUrl;
    // Try real FFmpeg server rendering first when source is a server MP4 path
    if (sourceUrl && sourceUrl.startsWith("/")) {
      try {
        const res = await fetch("/api/render", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sourceVideoUrl: sourceUrl,
            startTimeSeconds: editorState.startTimeSeconds,
            durationSeconds: durationSec,
            aspect: "9:16",
            framing: editorState.framing,
            zoom: editorState.zoom,
            caption: captionText,
            brandHandle: brandProfile.handle,
            clean: editorState.videoModelId === "fullscreen-watermark",
          }),
        });
        const data = await res.json();
        if (data?.success && data?.downloadUrl) {
          triggerDownloadUrl(data.downloadUrl, `${filePrefix}.mp4`);
          return { downloadUrl: data.downloadUrl, extension: "mp4" };
        }
      } catch {
        // Fallback smoothly to browser recording with live video audio track
      }
    }

    const { blob, extension } = await recordCanvasVideo({
      width: 540,
      height: 960,
      durationSeconds: durationSec,
      videoElement: hiddenVideoRef.current,
      onProgress: setExportProgress,
      renderFrame: (ctx, elapsed) => {
        renderVideoFrameToCanvas({
          ctx,
          width: 540,
          height: 960,
          timeSeconds: elapsed,
          scene: activeScene,
          sceneImage: loadedSceneImgRef.current,
          secondarySceneImage: loadedSecondaryImgRef.current,
          videoElement: editorState.customVideoUrl ? hiddenVideoRef.current : null,
          modelId: editorState.videoModelId,
          caption: captionText,
          framing: editorState.framing,
          zoom: editorState.zoom,
          panOffset: editorState.panOffset,
          accentColor: editorState.accentColor,
          brand: {
            name: brandProfile.name,
            handle: brandProfile.handle,
            avatarText: brandProfile.avatarText,
            avatarImage: loadedAvatarImgRef.current,
            verified: brandProfile.verified,
            badgeColor: brandProfile.badgeColor,
          },
        });
      },
    });
    const blobUrl = URL.createObjectURL(blob);
    triggerDownloadUrl(blobUrl, `${filePrefix}.${extension}`);
    return { downloadUrl: blobUrl, extension };
  };

  const handleExportSingleVideo = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportProgress(15);
    try {
      const modelName =
        VIDEO_MODELS.find((m) => m.layoutType === editorState.videoModelId)?.name ??
        "Post Clássico";
      const { downloadUrl, extension } = await renderSingleOrFallback(
        editorState.caption,
        editorState.durationSeconds,
        `gta6-reels-${editorState.durationSeconds}s-${Date.now()}`,
        modelName
      );
      setExportProgress(100);

      addCreation({
        id: `vid-${Date.now()}`,
        type: "video",
        title: editorState.caption || activeScene.title,
        format: "9:16",
        durationSeconds: editorState.durationSeconds,
        modelName: downloadUrl.startsWith("/downloads/") ? `${modelName} · FFmpeg MP4` : modelName,
        createdAt: "Agora mesmo",
        downloadUrl,
        extension,
        thumbnailUrl: activeScene.imageUrl,
      });
      showToast(
        `Vídeo MP4 de ${editorState.durationSeconds}s com áudio real salvo em Minhas Criações!`
      );
    } catch {
      showToast("Não foi possível exportar o vídeo neste navegador.");
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const handleExportBatchFive = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportProgress(10);
    try {
      const phrases = generateViralPhrases(editorState.keyword || editorState.caption, 5);
      const modelName =
        VIDEO_MODELS.find((m) => m.layoutType === editorState.videoModelId)?.name ??
        "Post Clássico";

      for (let i = 0; i < phrases.length; i++) {
        setExportProgress(Math.round(((i + 0.5) / phrases.length) * 100));
        const phrase = phrases[i];
        const dur = Math.min(15, editorState.durationSeconds);
        const { downloadUrl, extension } = await renderSingleOrFallback(
          phrase,
          dur,
          `gta6-serie-${i + 1}-de-5-${Date.now()}`,
          modelName
        );
        addCreation({
          id: `batch-${Date.now()}-${i}`,
          type: "video",
          title: phrase,
          format: "9:16",
          durationSeconds: dur,
          modelName: `${modelName} (Série #${i + 1})`,
          createdAt: "Agora mesmo",
          downloadUrl,
          extension,
          thumbnailUrl: activeScene.imageUrl,
        });
      }
      showToast("Série de 5 vídeos reais com áudio gerada e salva!");
    } catch {
      showToast("Erro ao gerar série em lote.");
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const maxVideoTime = Math.max(20, Math.floor(videoDuration || TOTAL_TRAILER_DURATION_SECONDS));
  const endTimestamp = Math.min(
    maxVideoTime,
    editorState.startTimeSeconds + editorState.durationSeconds
  );

  const nudgeStart = (delta: number) => {
    updateEditorState({
      startTimeSeconds: Math.max(
        0,
        Math.min(Math.max(0, maxVideoTime - 3), editorState.startTimeSeconds + delta)
      ),
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[360px_minmax(0,1fr)] gap-6 items-start">
      {/* Real <video> player for trailer / uploaded MP4 */}
      {editorState.customVideoUrl && (
        <video
          ref={hiddenVideoRef}
          src={editorState.customVideoUrl}
          crossOrigin="anonymous"
          loop
          playsInline
          onLoadedMetadata={(e) => {
            const d = e.currentTarget.duration;
            if (Number.isFinite(d) && d > 0) {
              setVideoDuration(Math.floor(d));
              if (editorState.startTimeSeconds > d - 2) {
                updateEditorState({ startTimeSeconds: 0 });
              }
            }
          }}
          className="hidden"
        />
      )}

      {/* Left Column: Real-Time 1080x1920 Preview + Action CTAs */}
      <div className="flex flex-col items-center xl:sticky xl:top-22">
        <div className="relative w-full max-w-[330px] aspect-[9/16] rounded-[24px] overflow-hidden border border-white/15 bg-[#09040f] shadow-[0_20px_60px_rgba(0,0,0,0.65)]">
          <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur text-[11px] font-bold text-white/90 border border-white/10">
            1080 × 1920
          </div>

          <canvas
            ref={canvasRef}
            width={540}
            height={960}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="w-full h-full object-cover cursor-grab active:cursor-grabbing touch-none"
          />

          {/* Bottom-right playback controls matching original UI */}
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsMuted((m) => !m)}
              className="w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-black/90 transition"
              aria-label={isMuted ? "Ativar som" : "Silenciar"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              className="w-9 h-9 rounded-full bg-white text-[#0b0612] flex items-center justify-center shadow-lg hover:scale-105 transition"
              aria-label={isPlaying ? "Pausar prévia" : "Reproduzir prévia"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
          </div>
        </div>

        <p className="text-[11px] text-white/55 text-center mt-2.5">
          Arraste o vídeo dentro do quadrado para escolher o enquadramento.
        </p>

        {/* Export CTAs */}
        <div className="w-full max-w-[330px] mt-4 space-y-2.5">
          <button
            type="button"
            disabled={isExporting}
            onClick={handleExportSingleVideo}
            className="w-full py-3.5 px-5 rounded-2xl btn-neon text-sm font-extrabold text-white flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <Zap className="w-4 h-4" />
            {isExporting
              ? `Renderizando... ${exportProgress}%`
              : `Gerar vídeo de ${editorState.durationSeconds >= 60 ? `${Math.round(editorState.durationSeconds / 60)}min` : `${editorState.durationSeconds}s`}`}
          </button>

          <button
            type="button"
            disabled={isExporting}
            onClick={handleExportBatchFive}
            className="w-full py-3 px-4 rounded-2xl bg-[#160e24] hover:bg-[#1f1433] border border-white/[0.1] text-xs font-bold text-white/90 flex items-center justify-center gap-2 transition disabled:opacity-60"
          >
            <Layers className="w-4 h-4 text-cyan-400" />
            Gerar série de 5 (frases diferentes)
          </button>
        </div>
      </div>

      {/* Right Column: Configuration Controls */}
      <div className="space-y-5 min-w-0">
        {/* Card 1: Vídeo e trecho */}
        <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-5 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-sm font-extrabold text-white">1. Vídeo e trecho</h2>
            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="video/mp4,video/webm,video/*"
                onChange={handleCustomVideoUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-semibold text-white/85 transition"
              >
                <Upload className="w-3.5 h-3.5 text-cyan-400" />
                Enviar MP4 próprio
              </button>
            </div>
          </div>

          {/* Video Source Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => {
                updateEditorState({
                  customVideoUrl: activeScene.videoUrl,
                  customVideoName: activeScene.title,
                  startTimeSeconds: activeScene.videoStartSeconds,
                });
                showToast(`Cena "${activeScene.title}" carregada em MP4 real!`);
              }}
              className={`rounded-2xl p-2.5 text-left border transition ${
                editorState.customVideoUrl === activeScene.videoUrl
                  ? "border-pink-500 bg-pink-500/10 shadow-[0_0_20px_rgba(236,72,153,0.2)]"
                  : "border-white/[0.08] bg-white/[0.03] hover:border-white/20"
              }`}
            >
              <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-[#230b38] to-[#0f0618] flex items-center justify-center border border-white/10">
                <span className="font-display text-xl grad-text">MP4 REAL</span>
              </div>
              <div className="mt-2 text-xs font-bold text-white truncate">
                Cena do Catálogo
              </div>
              <div className="text-[10px] text-white/50 truncate">{activeScene.title}</div>
            </button>

            {/* Trailer 1 Oficial (MP4 real) */}
            <button
              type="button"
              onClick={() => {
                updateEditorState({
                  customVideoUrl: "/media/gta6-trailer-1.mp4",
                  customVideoName: "GTA VI — Trailer 1 Oficial (MP4)",
                  caption: editorState.caption || "Vice City nunca foi tão real 🔥",
                });
                showToast("Trailer 1 Oficial carregado no editor!");
              }}
              className={`rounded-2xl p-2.5 text-left border transition ${
                editorState.customVideoUrl === "/media/gta6-trailer-1.mp4"
                  ? "border-cyan-400 bg-cyan-500/15 shadow-[0_0_20px_rgba(0,240,255,0.25)]"
                  : "border-white/[0.08] bg-white/[0.03] hover:border-white/20"
              }`}
            >
              <div className="aspect-video rounded-xl overflow-hidden bg-[#0d0615] flex flex-col items-center justify-center border border-cyan-400/30 relative">
                <span className="font-display text-lg text-cyan-300 font-bold">TRAILER 1</span>
                <span className="text-[9px] text-cyan-300/80 uppercase tracking-widest font-extrabold">1080P MP4</span>
              </div>
              <div className="mt-2 text-xs font-bold text-white truncate">
                Trailer 1 Oficial
              </div>
              <div className="text-[10px] text-cyan-300 truncate">36.6 MB · 1080p</div>
            </button>

            {/* Trailer 2 Oficial (MP4 real) */}
            <button
              type="button"
              onClick={() => {
                updateEditorState({
                  customVideoUrl: "/media/gta6-trailer-2.mp4",
                  customVideoName: "GTA VI — Trailer 2 Oficial (MP4)",
                  caption: editorState.caption || "Nova cena vazada de Vice City!",
                });
                showToast("Trailer 2 Oficial carregado no editor!");
              }}
              className={`rounded-2xl p-2.5 text-left border transition ${
                editorState.customVideoUrl === "/media/gta6-trailer-2.mp4"
                  ? "border-pink-500 bg-pink-500/15 shadow-[0_0_20px_rgba(236,72,153,0.25)]"
                  : "border-white/[0.08] bg-white/[0.03] hover:border-white/20"
              }`}
            >
              <div className="aspect-video rounded-xl overflow-hidden bg-[#16061b] flex flex-col items-center justify-center border border-pink-500/30 relative">
                <span className="font-display text-lg text-pink-400 font-bold">TRAILER 2</span>
                <span className="text-[9px] text-pink-400/80 uppercase tracking-widest font-extrabold">1080P MP4</span>
              </div>
              <div className="mt-2 text-xs font-bold text-white truncate">
                Trailer 2 Oficial
              </div>
              <div className="text-[10px] text-pink-300 truncate">51.1 MB · 1080p</div>
            </button>

            {/* Central de Mídia GDrive */}
            <a
              href={CATEGORIAS_DRIVE[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl p-2.5 text-left border border-amber-400/30 bg-amber-500/10 hover:border-amber-400/60 transition flex flex-col justify-between"
            >
              <div className="aspect-video rounded-xl overflow-hidden bg-[#1b1406] flex flex-col items-center justify-center border border-amber-400/30">
                <FolderDown className="w-6 h-6 text-amber-400 mb-0.5" />
                <span className="text-[9px] text-amber-300 uppercase font-extrabold">651 ARQUIVOS</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-200 truncate">Central Drive</span>
                <ExternalLink className="w-3 h-3 text-amber-400 shrink-0" />
              </div>
              <div className="text-[10px] text-amber-300/70 truncate">Pasta Google Drive</div>
            </a>
          </div>

          {/* Downloaded videos from Baixador (if any) */}
          {downloadedVideos.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-white/[0.06]">
              <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Vídeos baixados pelo Baixador ({downloadedVideos.length})
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {downloadedVideos.slice(0, 4).map((vid) => (
                  <button
                    key={vid.id}
                    type="button"
                    onClick={() => {
                      updateEditorState({
                        customVideoUrl: vid.videoUrl,
                        customVideoName: vid.title,
                        caption: vid.cleanCaption || editorState.caption,
                      });
                      showToast(`Vídeo "${vid.title}" carregado no editor!`);
                    }}
                    className={`rounded-2xl p-2 text-left border transition ${
                      editorState.customVideoName === vid.title
                        ? "border-cyan-400 bg-cyan-500/15"
                        : "border-white/[0.08] bg-white/[0.03] hover:border-white/20"
                    }`}
                  >
                    <img
                      src={vid.thumbnailUrl}
                      alt={vid.title}
                      className="w-full aspect-video object-cover rounded-xl"
                    />
                    <div className="mt-1.5 text-xs font-bold text-white truncate">{vid.title}</div>
                    <div className="text-[10px] text-cyan-300">Carregar no Editor</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quick scene switcher */}
          <div className="rounded-2xl p-3 bg-white/[0.02] border border-white/[0.07] space-y-2">
            <div className="text-[11px] font-bold text-white/60">Trocar cena rápida do trailer (MP4 real):</div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {TRAILER_SCENES.slice(0, 6).map((sc) => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() =>
                    updateEditorState({
                      sceneId: sc.id,
                      customVideoUrl: sc.videoUrl,
                      customVideoName: sc.title,
                      startTimeSeconds: sc.videoStartSeconds,
                    })
                  }
                  className={`shrink-0 w-20 rounded-xl overflow-hidden border transition ${
                    editorState.sceneId === sc.id
                      ? "border-pink-500 ring-1 ring-pink-500/60"
                      : "border-white/10 opacity-75 hover:opacity-100"
                  }`}
                >
                  <img
                    src={sc.imageUrl}
                    alt={sc.title}
                    className="w-full h-11 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Começa em */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="start-time-range" className="text-xs font-semibold text-white/75">
                Começa em
              </label>
              <span className="text-xs font-bold text-cyan-400 tabular-nums">
                {formatSecondsToTimestamp(editorState.startTimeSeconds)} →{" "}
                {formatSecondsToTimestamp(endTimestamp)}
              </span>
            </div>
            <input
              id="start-time-range"
              type="range"
              min={0}
              max={Math.max(5, maxVideoTime - 3)}
              value={Math.min(editorState.startTimeSeconds, Math.max(5, maxVideoTime - 3))}
              onChange={(e) =>
                updateEditorState({ startTimeSeconds: Number(e.target.value) })
              }
              className="w-full vice-range"
            />
            <div className="flex items-center justify-between text-[11px] text-white/40">
              <span>00:00</span>
              <span>{formatSecondsToTimestamp(maxVideoTime)}</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {[-5, -1, 1, 5].map((delta) => (
                <button
                  key={delta}
                  type="button"
                  onClick={() => nudgeStart(delta)}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-semibold text-white/80 transition"
                >
                  {delta > 0 ? `+${delta}s` : `${delta}s`}
                </button>
              ))}
            </div>
          </div>

          {/* Duração do vídeo */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label htmlFor="duration-range" className="text-xs font-semibold text-white/75">
                Duração do vídeo
              </label>
              <span className="text-xl font-extrabold text-pink-500 tabular-nums">
                {editorState.durationSeconds >= 60
                  ? `${Math.floor(editorState.durationSeconds / 60)}min${editorState.durationSeconds % 60 ? ` ${editorState.durationSeconds % 60}s` : ""}`
                  : `${editorState.durationSeconds}s`}
              </span>
            </div>
            <input
              id="duration-range"
              type="range"
              min={3}
              max={180}
              value={editorState.durationSeconds}
              onChange={(e) =>
                updateEditorState({ durationSeconds: Number(e.target.value) })
              }
              className="w-full vice-range"
            />
            <div className="flex justify-between text-[11px] text-white/40">
              <span>3s</span>
              <span>1min</span>
              <span>2min</span>
              <span>3min</span>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {VIDEO_DURATIONS.map((d) => {
                const selected = editorState.durationSeconds === d.seconds;
                return (
                  <button
                    key={d.label}
                    type="button"
                    onClick={() => updateEditorState({ durationSeconds: d.seconds })}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                      selected
                        ? "bg-pink-500 text-white border-pink-400 shadow-[0_0_14px_rgba(236,72,153,0.45)]"
                        : "bg-white/[0.04] text-white/70 border-white/[0.08] hover:text-white"
                    }`}
                  >
                    {d.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Enquadramento 1:1 */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-white/75">Enquadramento 1:1</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(
                [
                  { id: "esquerda", label: "Esquerda" },
                  { id: "centro", label: "Centro" },
                  { id: "direita", label: "Direita" },
                  { id: "automatico", label: "🪄 Automático" },
                ] as { id: FramingMode; label: string }[]
              ).map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    updateEditorState({ framing: opt.id, panOffset: { x: 0, y: 0 } })
                  }
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                    editorState.framing === opt.id
                      ? "bg-pink-500/20 border-pink-500 text-white"
                      : "bg-white/[0.03] border-white/[0.08] text-white/70 hover:text-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Zoom */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="zoom-range" className="text-xs font-semibold text-white/75">
                Zoom
              </label>
              <span className="text-xs font-bold text-white tabular-nums">
                {editorState.zoom.toFixed(2)}×
              </span>
            </div>
            <input
              id="zoom-range"
              type="range"
              min={1}
              max={2.5}
              step={0.05}
              value={editorState.zoom}
              onChange={(e) => updateEditorState({ zoom: Number(e.target.value) })}
              className="w-full vice-range"
            />
          </div>
        </section>

        {/* Bottom Tabs Card: Legenda | Visual | Perfil */}
        <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-5 space-y-5">
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#0b0612] border border-white/[0.06]">
            {(
              [
                { id: "legenda", label: "Legenda" },
                { id: "visual", label: "Visual (20 modelos)" },
                { id: "perfil", label: "Perfil" },
              ] as { id: RightBottomTab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setRightTab(tab.id)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold transition ${
                  rightTab === tab.id
                    ? "bg-pink-500/20 text-white border border-pink-500/50"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Legenda & Gerador por Palavra-Chave */}
          {rightTab === "legenda" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="caption-input"
                    className="text-xs font-semibold text-white/75 block"
                  >
                    Legenda (fica abaixo do nome)
                  </label>
                  <span className="text-[10px] text-pink-400 font-bold uppercase tracking-wider">
                    Arsenal GTA VI Conectado
                  </span>
                </div>
                <input
                  id="caption-input"
                  type="text"
                  value={editorState.caption}
                  onChange={(e) => updateEditorState({ caption: e.target.value })}
                  placeholder="Ex: Vice City nunca foi tão real"
                  className="w-full px-4 py-3 rounded-2xl bg-[#0b0612] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              {/* Arsenal GTA VI Integration CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowGanchosModal(true)}
                  className="p-3 rounded-2xl bg-gradient-to-r from-pink-500/15 to-purple-500/15 border border-pink-500/40 hover:border-pink-500 text-left transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                      Arsenal de Ganchos
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-extrabold">
                      150 ganchos
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60 mt-1 line-clamp-1 group-hover:text-white/80">
                    Gatilhos psicológicos prontos para prender nos 3 primeiros segundos.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setShowRoteirosModal(true)}
                  className="p-3 rounded-2xl bg-gradient-to-r from-cyan-500/15 to-blue-500/15 border border-cyan-500/40 hover:border-cyan-400 text-left transition group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      Biblioteca de Roteiros
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-extrabold">
                      80 + 10 coringas
                    </span>
                  </div>
                  <p className="text-[11px] text-white/60 mt-1 line-clamp-1 group-hover:text-white/80">
                    Roteiro completo: gancho, corpo, CTA e duração sincronizados.
                  </p>
                </button>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <Wand2 className="w-3.5 h-3.5" />
                    Frases virais geradas por palavra-chave
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={editorState.keyword}
                    onChange={(e) => updateEditorState({ keyword: e.target.value })}
                    placeholder="Palavra-chave (ex: Lucia, Mapa, Carros, Polícia)"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const next = generateViralPhrases(editorState.keyword, 1)[0];
                      updateEditorState({ caption: next });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-pink-500/25 border border-white/10 text-xs font-bold text-white flex items-center gap-1.5 transition"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-pink-400" />
                    Aplicar frase
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-2">
                  {suggestedPhrases.map((phrase) => (
                    <button
                      key={phrase}
                      type="button"
                      onClick={() => updateEditorState({ caption: phrase })}
                      className={`text-left p-2.5 rounded-xl border text-xs transition ${
                        editorState.caption === phrase
                          ? "bg-pink-500/15 border-pink-500/60 text-white"
                          : "bg-white/[0.03] border-white/[0.06] text-white/75 hover:border-white/20"
                      }`}
                    >
                      {phrase}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Visual (20 Modelos de Vídeo + Cor Neon) */}
          {rightTab === "visual" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs font-bold text-white/80 flex items-center gap-1.5">
                  <Film className="w-4 h-4 text-pink-400" />
                  Modelos de vídeo (20 disponíveis em tempo real)
                </div>
                <div className="flex items-center gap-1.5">
                  {["#ec4899", "#00f0ff", "#a855f7", "#f59e0b", "#ef4444"].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => updateEditorState({ accentColor: color })}
                      aria-label={`Cor destaque ${color}`}
                      className={`w-6 h-6 rounded-full border-2 transition ${
                        editorState.accentColor === color
                          ? "border-white scale-110"
                          : "border-transparent opacity-75"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-h-[340px] overflow-y-auto pr-1">
                {VIDEO_MODELS.map((model, idx) => {
                  const selected = editorState.videoModelId === model.layoutType;
                  return (
                    <button
                      key={model.id}
                      type="button"
                      onClick={() => updateEditorState({ videoModelId: model.layoutType })}
                      className={`relative rounded-2xl p-3 text-left border transition ${
                        selected
                          ? "bg-pink-500/15 border-pink-500 shadow-[0_0_16px_rgba(236,72,153,0.28)]"
                          : "bg-[#0b0612] border-white/[0.08] hover:border-white/25"
                      }`}
                    >
                      {model.badgeText && (
                        <span className="inline-block mb-1.5 px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-pink-500 text-white">
                          {model.badgeText}
                        </span>
                      )}
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-bold text-white/50">#{idx + 1}</span>
                        {selected && <Check className="w-3.5 h-3.5 text-pink-400" />}
                      </div>
                      <div className="text-xs font-extrabold text-white mt-0.5">
                        {model.name}
                      </div>
                      <div className="text-[10px] text-white/55 mt-0.5 line-clamp-2">
                        {model.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 3: Perfil (Foto, Nome, Verificado) */}
          {rightTab === "perfil" && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center font-extrabold text-lg text-white overflow-hidden border border-white/20">
                  {brandProfile.avatarUrl ? (
                    <img
                      src={brandProfile.avatarUrl}
                      alt={brandProfile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    brandProfile.avatarText
                  )}
                </div>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.15] border border-white/10 text-xs font-bold text-white transition"
                >
                  Enviar foto / logo do canal
                </button>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1">
                    Nome exibido no Reels
                  </label>
                  <input
                    type="text"
                    value={brandProfile.name}
                    onChange={(e) => updateBrandProfile({ name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1">
                    @Handle do canal
                  </label>
                  <input
                    type="text"
                    value={brandProfile.handle}
                    onChange={(e) => updateBrandProfile({ handle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-sm text-white"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <label className="flex items-center gap-2 text-xs font-semibold text-white/85 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={brandProfile.verified}
                    onChange={(e) => updateBrandProfile({ verified: e.target.checked })}
                    className="accent-pink-500 w-4 h-4"
                  />
                  <UserCheck className="w-4 h-4 text-sky-400" />
                  Mostrar selo verificado ao lado do nome
                </label>

                <div className="flex items-center gap-2">
                  {(["blue", "pink", "gold"] as const).map((badge) => (
                    <button
                      key={badge}
                      type="button"
                      onClick={() => updateBrandProfile({ badgeColor: badge })}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold border ${
                        brandProfile.badgeColor === badge
                          ? "border-white text-white bg-white/10"
                          : "border-white/10 text-white/55"
                      }`}
                    >
                      {badge === "blue" ? "Azul" : badge === "pink" ? "Neon" : "Ouro"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Modal: Arsenal de Ganchos (150 opções) */}
      {showGanchosModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#130b1f] border border-white/15 rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-pink-400" />
                  Arsenal de Ganchos (150 opções)
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  Selecione um gancho para preencher a legenda e reter a atenção nos primeiros segundos.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowGanchosModal(false)}
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search & Filters */}
            <div className="p-4 border-b border-white/10 bg-[#0b0612] space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchGancho}
                  onChange={(e) => setSearchGancho(e.target.value)}
                  placeholder="Buscar gancho por palavra ou gatilho..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
                {ganchoCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setGanchoCategory(cat)}
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                      ganchoCategory === cat
                        ? "bg-pink-500/20 text-white border-pink-500/60"
                        : "bg-white/[0.03] text-white/60 border-white/[0.06] hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal List */}
            <div className="p-4 overflow-y-auto space-y-2.5 flex-1">
              {filteredGanchos.map((g) => (
                <div
                  key={g.id}
                  className="p-3.5 rounded-2xl bg-[#0b0612] border border-white/[0.07] hover:border-pink-500/50 transition flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-500/20 text-pink-300">
                        {g.category}
                      </span>
                      <span className="text-[10px] text-white/40 font-mono">
                        {g.trigger}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-white/90 group-hover:text-pink-200">
                      &ldquo;{g.hook}&rdquo;
                    </p>
                    {g.example && (
                      <p className="text-[11px] text-white/50 mt-1 italic">
                        Contexto: {g.example}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      updateEditorState({ caption: g.hook });
                      setShowGanchosModal(false);
                      showToast("Gancho aplicado na legenda!");
                    }}
                    className="shrink-0 px-3.5 py-2 rounded-xl bg-pink-500/20 hover:bg-pink-500 border border-pink-500/40 text-xs font-bold text-white transition"
                  >
                    Aplicar
                  </button>
                </div>
              ))}
              {filteredGanchos.length === 0 && (
                <div className="py-12 text-center text-xs text-white/50">
                  Nenhum gancho encontrado para essa busca.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal: Biblioteca de Roteiros (80+10 opções) */}
      {showRoteirosModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#130b1f] border border-white/15 rounded-3xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.8)] animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-cyan-400" />
                  Biblioteca de Roteiros (80 + 10 Coringas)
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  Carregue roteiro, gancho e sugestão de duração diretamente no editor.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowRoteirosModal(false)}
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Search & Filters */}
            <div className="p-4 border-b border-white/10 bg-[#0b0612] space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchRoteiro}
                  onChange={(e) => setSearchRoteiro(e.target.value)}
                  placeholder="Buscar roteiro por título, gancho ou código (ex: R01, C03)..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
                {roteiroCategories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setRoteiroCategory(cat)}
                    className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition border ${
                      roteiroCategory === cat
                        ? "bg-cyan-500/20 text-white border-cyan-400/60"
                        : "bg-white/[0.03] text-white/60 border-white/[0.06] hover:text-white"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal List */}
            <div className="p-4 overflow-y-auto space-y-3 flex-1">
              {filteredRoteiros.map((r) => (
                <div
                  key={r.id}
                  className="p-4 rounded-2xl bg-[#0b0612] border border-white/[0.07] hover:border-cyan-400/50 transition space-y-2 group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 font-mono">
                        {r.code}
                      </span>
                      <span className="text-[11px] text-white/50">{r.category}</span>
                    </div>
                    <span className="text-[10px] text-white/40 font-bold">
                      {r.suggestedDurationSeconds ? `${r.suggestedDurationSeconds}s` : "30s"}
                    </span>
                  </div>

                  <h4 className="text-xs font-extrabold text-white group-hover:text-cyan-200">
                    {r.title}
                  </h4>

                  <p className="text-xs text-white/75 bg-white/[0.02] p-2.5 rounded-xl border border-white/[0.04]">
                    <strong className="text-cyan-300">Gancho:</strong> &ldquo;{r.hook}&rdquo;
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <span className="text-[11px] text-white/45 truncate max-w-md">
                      Mídia sugerida: {r.recommendedVisual}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        updateEditorState({
                          caption: r.hook,
                          durationSeconds: r.suggestedDurationSeconds || 30,
                        });
                        setShowRoteirosModal(false);
                        showToast(`Roteiro ${r.code} carregado no editor!`);
                      }}
                      className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500 border border-cyan-400/40 text-xs font-bold text-white transition"
                    >
                      Carregar no Editor
                    </button>
                  </div>
                </div>
              ))}
              {filteredRoteiros.length === 0 && (
                <div className="py-12 text-center text-xs text-white/50">
                  Nenhum roteiro encontrado para essa busca.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
