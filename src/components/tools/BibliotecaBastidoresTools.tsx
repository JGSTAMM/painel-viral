"use client";

import React, { useMemo, useRef, useState } from "react";
import {
  Download,
  ExternalLink,
  Film,
  FolderOpen,
  Link2,
  Loader2,
  Play,
  Scissors,
  Search,
  Sparkles,
  Trash2,
  Upload,
  Video,
} from "lucide-react";
import { SCENE_CATEGORIES, TRAILER_SCENES, type SceneCategory } from "@/data/gta-catalog";
import {
  CENTRAL_DRIVE_ROOT_URL,
  OPERACAO_MIDIA_AREAS,
  TOTAL_CENTRAL_ARQUIVOS,
} from "@/data/operacao-gta";
import { usePainel } from "@/context/PainelContext";

export function BibliotecaHdTool() {
  const { openSceneInEditor, updateEditorState, setActiveTab, showToast } = usePainel();
  const [category, setCategory] = useState<SceneCategory>("Todos");
  const [search, setSearch] = useState("");
  const [streamUrl, setStreamUrl] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const filtered = useMemo(() => {
    return TRAILER_SCENES.filter((s) => {
      const catOk = category === "Todos" || s.category === category;
      const q = search.trim().toLowerCase();
      const qOk =
        !q ||
        s.title.toLowerCase().includes(q) ||
        s.defaultHook.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [category, search]);

  const handleUploadLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    updateEditorState({ customVideoUrl: url, customVideoName: file.name });
    setActiveTab("editar-video");
    showToast(`Mídia "${file.name}" carregada no Editor de Vídeo!`);
  };

  const handleLoadRealTrailer = (trailerNumber: 1 | 2) => {
    const trailerPath = `/media/gta6-trailer-${trailerNumber}.mp4`;
    const trailerTitle = `GTA 6 — Trailer ${trailerNumber} Oficial (Full HD)`;
    updateEditorState({
      customVideoUrl: trailerPath,
      customVideoName: trailerTitle,
      startTimeSeconds: 0,
      durationSeconds: 30,
    });
    setActiveTab("editar-video");
    showToast(`Trailer ${trailerNumber} Oficial carregado no Editor!`);
  };

  const handleLoadStreamUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!streamUrl.trim()) return;
    updateEditorState({
      customVideoUrl: streamUrl.trim(),
      customVideoName: "Vídeo Externo (Stream)",
    });
    setActiveTab("editar-video");
    showToast("Vídeo externo carregado no Editor de Vídeo!");
    setStreamUrl("");
  };

  return (
    <div className="space-y-8">
      {/* Central de Mídia Header Banner */}
      <section className="rounded-3xl bg-gradient-to-r from-[#17092b] via-[#10081d] to-[#071324] border border-white/10 p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-pink-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-[11px] font-extrabold uppercase tracking-wider border border-pink-500/30">
                OPERAÇÃO GTA VI · CENTRAL DE MÍDIA
              </span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-extrabold tracking-wider border border-cyan-500/30">
                {TOTAL_CENTRAL_ARQUIVOS} ARQUIVOS OFICIAIS
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Central de Mídia Completa no Google Drive
            </h2>
            <p className="text-xs text-white/70 leading-relaxed">
              Acervo auditado com 6 áreas principais e 11 subcategorias: cenas com áudio e sem áudio,
              banco de personagens (Lucia, Jason e secundários), mapas, cenários de Vice City e Leonida Keys,
              frames 4K para teorias, além dos trailers oficiais completos pré-carregados em MP4.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={CENTRAL_DRIVE_ROOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-2xl btn-neon text-xs font-black text-white flex items-center gap-2 shadow-lg"
            >
              <FolderOpen className="w-4 h-4" />
              Abrir Central no Google Drive
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
            <input
              ref={fileRef}
              type="file"
              accept="video/*"
              onChange={handleUploadLocal}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white flex items-center gap-2 transition"
            >
              <Upload className="w-4 h-4 text-cyan-400" />
              Enviar MP4 do PC
            </button>
          </div>
        </div>
      </section>

      {/* Destaque: Trailers Oficiais Reais em MP4 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-pink-400">
              PRÉ-CARREGADOS NO SERVIDOR (MP4 FULL HD REAL)
            </span>
            <h3 className="text-lg font-black text-white mt-0.5">
              Trailers Oficiais 1 & 2 de GTA 6 Prontos para Editar
            </h3>
          </div>
          <span className="text-xs text-white/50 font-medium">Arquivos reais em /public/media/</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Trailer 1 Card */}
          <div className="rounded-2xl bg-[#130b1f] border border-pink-500/30 p-5 space-y-4 hover:border-pink-500/60 transition group shadow-lg">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-extrabold uppercase">
                  Trailer 1 Oficial
                </span>
                <h4 className="text-base font-black text-white mt-1">
                  GTA VI — Trailer 1 (Apresentação Lucia & Vice City)
                </h4>
                <p className="text-xs text-white/60 mt-0.5">
                  Vídeo MP4 original 1080p (36.6 MB) com áudio oficial e cenas icônicas.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-1 rounded-lg border border-cyan-800/40">
                01:31
              </span>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/10">
              <video
                src="/media/gta6-trailer-1.mp4"
                controls
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleLoadRealTrailer(1)}
                className="flex-1 py-2.5 px-4 rounded-xl btn-neon text-xs font-bold text-white flex items-center justify-center gap-2"
              >
                <Film className="w-4 h-4" />
                Carregar no Editor de Vídeo
              </button>
              <a
                href="/media/gta6-trailer-1.mp4"
                download="gta6-trailer-1-oficial.mp4"
                className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center gap-1.5 transition border border-white/10"
                title="Baixar MP4"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Trailer 2 Card */}
          <div className="rounded-2xl bg-[#130b1f] border border-cyan-500/30 p-5 space-y-4 hover:border-cyan-500/60 transition group shadow-lg">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-extrabold uppercase">
                  Trailer 2 Oficial
                </span>
                <h4 className="text-base font-black text-white mt-1">
                  GTA VI — Trailer 2 (Jason, Ação & Leonida Selvagem)
                </h4>
                <p className="text-xs text-white/60 mt-0.5">
                  Vídeo MP4 original 1080p (51.1 MB) com áudio de alta dinâmica e perseguições.
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-1 rounded-lg border border-cyan-800/40">
                02:05
              </span>
            </div>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/10">
              <video
                src="/media/gta6-trailer-2.mp4"
                controls
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => handleLoadRealTrailer(2)}
                className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-xs font-bold text-white flex items-center justify-center gap-2 transition"
              >
                <Film className="w-4 h-4" />
                Carregar no Editor de Vídeo
              </button>
              <a
                href="/media/gta6-trailer-2.mp4"
                download="gta6-trailer-2-oficial.mp4"
                className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center gap-1.5 transition border border-white/10"
                title="Baixar MP4"
              >
                <Download className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas da Central de Mídia no Google Drive */}
      <section className="space-y-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-cyan-400">
            6 ÁREAS & 11 SUBCATEGORIAS OFICIAIS DA OPERAÇÃO GTA VI
          </span>
          <h3 className="text-lg font-black text-white mt-0.5">
            Acesso Direto às Pastas de Materiais do Google Drive
          </h3>
          <p className="text-xs text-white/60 mt-0.5">
            Clique em qualquer pasta para abrir diretamente os arquivos originais no Google Drive da comunidade RatoFlix.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {OPERACAO_MIDIA_AREAS.map((area) => (
            <div
              key={area.id}
              className="rounded-2xl bg-[#130b1f] border border-white/[0.08] p-4 flex flex-col justify-between gap-3 hover:border-pink-500/40 transition group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{area.icon}</span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-white/[0.08] text-white/80 border border-white/10">
                    {area.count} itens
                  </span>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-pink-400 uppercase tracking-wider">
                    {area.area}
                  </div>
                  <h4 className="text-sm font-extrabold text-white mt-0.5 group-hover:text-pink-300 transition">
                    {area.name}
                  </h4>
                  <p className="text-[11px] text-white/55 mt-1 leading-snug">
                    {area.usage}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2">
                <a
                  href={area.gdriveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-pink-500/20 hover:border-pink-500/40 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition"
                >
                  <FolderOpen className="w-3.5 h-3.5 text-pink-400" />
                  Abrir Pasta
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Importador de URL de Vídeo Externo */}
      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-5 space-y-3">
        <div className="flex items-center gap-2">
          <Link2 className="w-4 h-4 text-cyan-400" />
          <h4 className="text-sm font-bold text-white">Carregar Vídeo via Link Direto ou Streaming</h4>
        </div>
        <form onSubmit={handleLoadStreamUrl} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={streamUrl}
            onChange={(e) => setStreamUrl(e.target.value)}
            placeholder="Cole o link direto do vídeo (MP4, WebM ou CDN)..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 text-xs font-bold text-white transition shrink-0"
          >
            Carregar no Editor
          </button>
        </form>
      </section>

      {/* Catálogo de 80 Cenas Prontas com Enquadramento e Resolução */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400">
              CATÁLOGO DE CENAS E FRAMES DO TRAILER
            </span>
            <h3 className="text-lg font-extrabold text-white mt-0.5">
              +80 Cenas e Momentos Chave Catalogados
            </h3>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar cena ou personagem..."
              className="pl-9 pr-3.5 py-2 rounded-xl bg-[#0b0612] border border-white/10 text-xs text-white focus:outline-none focus:border-pink-500 w-56"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {SCENE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition ${
                category === cat
                  ? "btn-neon text-white border-pink-400"
                  : "bg-[#130b1f] text-white/70 border-white/[0.08] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((scene) => (
            <article
              key={scene.id}
              className="rounded-2xl overflow-hidden bg-[#130b1f] border border-white/[0.08] hover:border-cyan-400/50 transition flex flex-col"
            >
              <div className="relative aspect-video">
                <img
                  src={scene.imageUrl}
                  alt={scene.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-bold text-white">
                  {scene.category}
                </span>
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-cyan-500/85 text-[#0b0612] text-[10px] font-extrabold">
                  {scene.resolution}
                </span>
              </div>
              <div className="p-3.5 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <h4 className="text-xs font-bold text-white">{scene.title}</h4>
                  <p className="text-[11px] text-white/55 mt-0.5 line-clamp-2">
                    {scene.defaultHook}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openSceneInEditor(scene.id, scene.defaultHook)}
                  className="w-full py-2 px-3 rounded-xl bg-white/[0.07] hover:bg-pink-500/25 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition"
                >
                  <Film className="w-3.5 h-3.5 text-pink-400" />
                  Abrir no Editor
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export function BaixadorRepostTool() {
  const {
    downloadedVideos,
    addDownloadedVideo,
    updateDownloadedVideo,
    removeDownloadedVideo,
    updateEditorState,
    setActiveTab,
    showToast,
  } = usePainel();
  const [urlInput, setUrlInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [captionInput, setCaptionInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [activeEmbedId, setActiveEmbedId] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const attachFileRef = useRef<HTMLInputElement | null>(null);
  const [attachingVideoId, setAttachingVideoId] = useState<string | null>(null);

  const handleImportRealVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUrl = urlInput.trim();
    if (!cleanUrl) {
      showToast("Insira um link válido do TikTok, Reels, Shorts, YouTube ou Drive.");
      return;
    }

    setIsLoading(true);
    setLoadingMessage("Conectando ao motor multi-plataforma e extraindo metadados...");

    try {
      const response = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: cleanUrl,
          title: titleInput.trim(),
          caption: captionInput.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Falha ao processar o vídeo");
      }

      addDownloadedVideo({
        title: data.title,
        sourceUrl: data.sourceUrl,
        durationSeconds: data.durationSeconds || 15,
        thumbnailUrl: data.thumbnailUrl,
        videoUrl: data.videoUrl || null,
        cleanCaption: data.cleanCaption,
        platform: data.platform,
        uploader: data.uploader,
        embedUrl: data.embedUrl,
        downloadMirrors: data.downloadMirrors,
      });

      setUrlInput("");
      setTitleInput("");
      setCaptionInput("");
      showToast(`Vídeo "${data.title}" importado com sucesso!`);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao processar o link. Tente outro link.";
      console.error("Erro no download real:", err);
      showToast(msg);
    } finally {
      setIsLoading(false);
      setLoadingMessage("");
    }
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const blobUrl = URL.createObjectURL(file);
    addDownloadedVideo({
      title: file.name.replace(/\.[^/.]+$/, ""),
      sourceUrl: "Arquivo local do PC",
      durationSeconds: 15,
      thumbnailUrl: TRAILER_SCENES[0].imageUrl,
      videoUrl: blobUrl,
      cleanCaption: captionInput.trim() || "Novo corte importado para repost com sua marca",
      platform: "local",
    });
    showToast(`Arquivo "${file.name}" importado com sucesso!`);
    e.target.value = "";
  };

  const handleAttachFileToCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !attachingVideoId) return;
    const blobUrl = URL.createObjectURL(file);
    updateDownloadedVideo(attachingVideoId, {
      videoUrl: blobUrl,
      platform: "local",
    });
    showToast(`MP4 "${file.name}" vinculado ao vídeo com sucesso!`);
    setAttachingVideoId(null);
    e.target.value = "";
  };

  const handleQuickImportGta = (trailerNumber: 1 | 2) => {
    addDownloadedVideo({
      title: `GTA VI — Trailer ${trailerNumber} Oficial (Full HD)`,
      sourceUrl: `/media/gta6-trailer-${trailerNumber}.mp4`,
      durationSeconds: trailerNumber === 1 ? 91 : 125,
      thumbnailUrl: TRAILER_SCENES[trailerNumber === 1 ? 0 : 10].imageUrl,
      videoUrl: `/media/gta6-trailer-${trailerNumber}.mp4`,
      cleanCaption:
        trailerNumber === 1
          ? "O trailer que parou a internet: Lucia e Vice City em 4K!"
          : "Trailer 2 Oficial GTA VI: Jason, ação e detalhes ocultos em Leonida!",
      platform: "direct",
      uploader: "Rockstar Games",
    });
    showToast(`Trailer ${trailerNumber} adicionado à fila de repost!`);
  };

  const handleSendToEditor = (video: (typeof downloadedVideos)[0]) => {
    updateEditorState({
      customVideoUrl: video.videoUrl || "/media/gta6-trailer-1.mp4",
      customVideoName: video.title,
      caption: video.cleanCaption,
    });
    setActiveTab("editar-video");
    showToast(
      video.videoUrl
        ? `"${video.title}" aberto no Editor de Vídeo!`
        : `"${video.title}" carregado no Editor com base GTA 6! (Use "Subir MP4" caso queira trocar o vídeo de fundo)`
    );
  };

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-6 space-y-5">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-pink-400">
            BIBLIOTECA · BAIXADOR & REPOST REAL
          </span>
          <h2 className="text-xl font-extrabold text-white mt-0.5">
            Baixe vídeos limpos sem marca d&apos;água (Backend yt-dlp Integrado)
          </h2>
          <p className="text-xs text-white/60 mt-1">
            Cole um link real do TikTok, Instagram Reels ou YouTube Shorts. O servidor baixa o arquivo
            original em MP4 Full HD e disponibiliza imediatamente para editar com a sua marca.
          </p>
        </div>

        <form onSubmit={handleImportRealVideo} className="grid md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <label className="text-xs font-semibold text-white/75 block mb-1">
              Link do vídeo (TikTok, Instagram Reels, YouTube Shorts ou Google Drive)
            </label>
            <div className="relative">
              <Link2 className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                disabled={isLoading}
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://www.tiktok.com/@canal/video/... ou https://youtube.com/shorts/..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#0b0612] border border-white/10 text-sm text-white focus:outline-none focus:border-pink-500 disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-white/75 block mb-1">
              Nome do clipe no seu painel (opcional)
            </label>
            <input
              type="text"
              disabled={isLoading}
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="Ex: Teoria Lucia & Prisão GTA 6"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-sm text-white disabled:opacity-50"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-white/75 block mb-1">
              Legenda pronta para o repost (opcional)
            </label>
            <input
              type="text"
              disabled={isLoading}
              value={captionInput}
              onChange={(e) => setCaptionInput(e.target.value)}
              placeholder="Ex: O detalhe que todo mundo deixou passar..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-sm text-white disabled:opacity-50"
            />
          </div>

          <div className="md:col-span-2 flex flex-wrap items-center gap-3 pt-1">
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 rounded-2xl btn-neon text-xs font-extrabold text-white flex items-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Baixando no Servidor...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Baixar Vídeo Real</span>
                </>
              )}
            </button>

            <input
              ref={fileRef}
              type="file"
              accept="video/*"
              onChange={handleImportFile}
              className="hidden"
            />
            <input
              ref={attachFileRef}
              type="file"
              accept="video/*"
              onChange={handleAttachFileToCard}
              className="hidden"
            />
            <button
              type="button"
              disabled={isLoading}
              onClick={() => fileRef.current?.click()}
              className="px-4 py-3 rounded-2xl bg-white/[0.07] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white flex items-center gap-2 transition"
            >
              <Upload className="w-4 h-4 text-cyan-400" />
              Subir arquivo MP4 do PC
            </button>
          </div>

          <div className="md:col-span-2 pt-2 border-t border-white/[0.06] flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-white/50 mr-1">
              Atalhos Rápidos GTA VI:
            </span>
            <button
              type="button"
              onClick={() => handleQuickImportGta(1)}
              className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-pink-500/20 border border-white/10 text-[11px] font-bold text-white/80 hover:text-white flex items-center gap-1.5 transition"
            >
              <Video className="w-3.5 h-3.5 text-pink-400" />
              Importar Trailer 1 Oficial
            </button>
            <button
              type="button"
              onClick={() => handleQuickImportGta(2)}
              className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-cyan-500/20 border border-white/10 text-[11px] font-bold text-white/80 hover:text-white flex items-center gap-1.5 transition"
            >
              <Video className="w-3.5 h-3.5 text-cyan-400" />
              Importar Trailer 2 Oficial
            </button>
          </div>

          {isLoading && (
            <div className="md:col-span-2 p-3 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center gap-2.5 text-xs text-pink-300">
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              <span>{loadingMessage}</span>
            </div>
          )}
        </form>
      </section>

      {/* Lista de Vídeos Baixados e Prontos */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
            Vídeos Baixados Prontos para Repost ({downloadedVideos.length})
          </h3>
          <span className="text-xs text-white/50">Disponíveis no Editor de Vídeo</span>
        </div>

        {downloadedVideos.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/15 bg-white/[0.02] p-8 text-center space-y-2">
            <Sparkles className="w-6 h-6 text-pink-400 mx-auto" />
            <p className="text-sm font-bold text-white">Nenhum vídeo importado ainda</p>
            <p className="text-xs text-white/50 max-w-md mx-auto">
              Cole o link de um YouTube, Shorts, Reels, TikTok ou Google Drive acima, ou use os
              atalhos rápidos para adicionar clipes instantaneamente.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {downloadedVideos.map((vid) => (
              <article
                key={vid.id}
                className="rounded-2xl overflow-hidden bg-[#130b1f] border border-white/[0.08] hover:border-pink-500/40 transition flex flex-col"
              >
                <div className="relative aspect-video bg-black/60 group">
                  {vid.videoUrl ? (
                    <video
                      src={vid.videoUrl}
                      controls
                      preload="metadata"
                      className="w-full h-full object-cover"
                    />
                  ) : activeEmbedId === vid.id && vid.embedUrl ? (
                    <iframe
                      src={vid.embedUrl}
                      title={vid.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <>
                      <img
                        src={vid.thumbnailUrl}
                        alt={vid.title}
                        className="w-full h-full object-cover"
                      />
                      {vid.embedUrl && (
                        <button
                          type="button"
                          onClick={() => setActiveEmbedId(vid.id)}
                          className="absolute inset-0 bg-black/35 group-hover:bg-black/50 flex items-center justify-center transition"
                          title="Assistir prévia do vídeo"
                        >
                          <span className="w-12 h-12 rounded-full bg-pink-600/90 hover:bg-pink-500 text-white flex items-center justify-center shadow-lg">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </span>
                        </button>
                      )}
                    </>
                  )}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded bg-black/80 text-[10px] font-bold text-white">
                      {vid.durationSeconds}s
                    </span>
                    {vid.platform && (
                      <span className="px-2 py-0.5 rounded bg-pink-600/90 text-[10px] font-extrabold uppercase text-white">
                        {vid.platform}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDownloadedVideo(vid.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/70 hover:bg-red-600 text-white/70 hover:text-white transition"
                    title="Remover vídeo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">{vid.title}</h4>
                    {vid.uploader && (
                      <span className="text-[10px] text-cyan-400 font-semibold block mt-0.5">
                        Canal: {vid.uploader}
                      </span>
                    )}
                    <p className="text-[11px] text-white/50 mt-1 line-clamp-2">
                      {vid.cleanCaption}
                    </p>
                  </div>

                  {!vid.videoUrl && vid.downloadMirrors && vid.downloadMirrors.length > 0 && (
                    <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white/45 block">
                        Baixar MP4 Limpo (1 Clique):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {vid.downloadMirrors.map((mirror) => (
                          <a
                            key={mirror.label}
                            href={mirror.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2.5 py-1 rounded-lg bg-white/[0.06] hover:bg-cyan-500/20 border border-white/10 text-[10px] font-bold text-cyan-300 flex items-center gap-1 transition"
                          >
                            <Download className="w-3 h-3" />
                            {mirror.label.split(" (")[0]}
                            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleSendToEditor(vid)}
                      className="flex-1 py-2 px-3 rounded-xl btn-neon text-xs font-bold text-white flex items-center justify-center gap-1.5"
                    >
                      <Scissors className="w-3.5 h-3.5" />
                      Editar com Marca
                    </button>
                    {!vid.videoUrl && (
                      <button
                        type="button"
                        onClick={() => {
                          setAttachingVideoId(vid.id);
                          attachFileRef.current?.click();
                        }}
                        className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-cyan-300 transition border border-white/10"
                        title="Vincular arquivo MP4 baixado"
                      >
                        <Upload className="w-3.5 h-3.5" />
                      </button>
                    )}
                    {vid.videoUrl && (
                      <a
                        href={vid.videoUrl}
                        download={`${vid.title}.mp4`}
                        className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-white transition border border-white/10"
                        title="Baixar MP4 Direto"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
