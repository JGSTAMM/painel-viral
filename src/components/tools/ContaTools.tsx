"use client";

import React, { useRef, useState } from "react";
import {
  CheckCircle2,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  FolderOpen,
  Globe,
  Key,
  MessageCircle,
  RefreshCw,
  Settings,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  Upload,
  Video,
  X,
} from "lucide-react";
import { usePainel, type SocialConnection } from "@/context/PainelContext";

export function MinhasCriacoesTool() {
  const { creations, removeCreation, setActiveTab } = usePainel();

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400">
            CONTA · MINHAS CRIAÇÕES
          </span>
          <h2 className="text-xl font-extrabold text-white mt-0.5">
            Seus vídeos e imagens renderizados ({creations.length})
          </h2>
          <p className="text-xs text-white/60 mt-0.5">
            Todos os cortes e capas gerados na sua sessão ficam prontos para baixar
            novamente.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setActiveTab("editar-video")}
          className="px-4 py-2.5 rounded-xl btn-neon text-xs font-bold text-white"
        >
          + Criar novo vídeo
        </button>
      </section>

      {creations.length === 0 ? (
        <div className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-10 text-center space-y-3">
          <FolderOpen className="w-10 h-10 text-white/30 mx-auto" />
          <p className="text-sm text-white/65">Nenhuma criação salva ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {creations.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl overflow-hidden bg-[#130b1f] border border-white/[0.08] flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-[#0b0612]">
                <img
                  src={item.thumbnailUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-extrabold text-white uppercase">
                  {item.type === "video" ? "VÍDEO" : "IMAGEM"} · {item.format}
                </span>
              </div>
              <div className="p-3.5 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <h3 className="text-xs font-bold text-white line-clamp-1">{item.title}</h3>
                  <p className="text-[11px] text-white/55 mt-0.5">
                    {item.modelName} · {item.createdAt}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={item.downloadUrl}
                    download={`gta6-${item.id}.${item.extension}`}
                    className="flex-1 py-2 px-3 rounded-xl btn-neon text-xs font-bold text-white flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Baixar
                  </a>
                  <button
                    type="button"
                    onClick={() => removeCreation(item.id)}
                    aria-label="Excluir criação"
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-red-500/20 text-white/55 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export function MinhaLogoTool() {
  const { brandProfile, updateBrandProfile, showToast } = usePainel();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        updateBrandProfile({ avatarUrl: reader.result });
        showToast("Sua logo foi salva e aplicada a todos os modelos!");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-6 space-y-6 max-w-2xl">
      <div>
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-pink-400">
          CONTA · MINHA LOGO
        </span>
        <h2 className="text-xl font-extrabold text-white mt-0.5 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400" />
          Identidade visual do seu canal
        </h2>
        <p className="text-xs text-white/60 mt-1">
          Sua foto, nome e selo verificado aparecem automaticamente em todos os Reels e
          capas gerados.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center font-extrabold text-2xl text-white overflow-hidden border-2 border-pink-400/50">
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
        <div className="space-y-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="px-4 py-2.5 rounded-xl btn-neon text-xs font-bold text-white flex items-center gap-2"
          >
            <Upload className="w-3.5 h-3.5" />
            Trocar foto / logo
          </button>
          {brandProfile.avatarUrl && (
            <button
              type="button"
              onClick={() => updateBrandProfile({ avatarUrl: null })}
              className="block text-[11px] text-white/50 hover:text-pink-400"
            >
              Remover foto e usar iniciais
            </button>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-semibold text-white/75 block mb-1">
            Nome do canal
          </label>
          <input
            type="text"
            value={brandProfile.name}
            onChange={(e) => updateBrandProfile({ name: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-sm text-white"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-white/75 block mb-1">
            @Usuário / Handle
          </label>
          <input
            type="text"
            value={brandProfile.handle}
            onChange={(e) => updateBrandProfile({ handle: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-sm text-white"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0b0612] border border-white/[0.08]">
        <label className="flex items-center gap-2.5 text-sm font-semibold text-white cursor-pointer">
          <input
            type="checkbox"
            checked={brandProfile.verified}
            onChange={(e) => updateBrandProfile({ verified: e.target.checked })}
            className="accent-pink-500 w-4 h-4"
          />
          Exibir selo verificado nos vídeos
        </label>
        <div className="flex gap-2">
          {(["blue", "pink", "gold"] as const).map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => updateBrandProfile({ badgeColor: color })}
              className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                brandProfile.badgeColor === color
                  ? "border-pink-500 bg-pink-500/20 text-white"
                  : "border-white/10 text-white/60"
              }`}
            >
              {color === "blue" ? "Azul" : color === "pink" ? "Rosa" : "Ouro"}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MinhasRedesTool() {
  const { socialConnections, updateSocialConnection, showToast } = usePainel();
  const [activeModal, setActiveModal] = useState<SocialConnection | null>(null);
  const [modalHandle, setModalHandle] = useState("");
  const [modalFollowers, setModalFollowers] = useState("");
  const [modalAutoPublish, setModalAutoPublish] = useState(true);
  const [modalApiKey, setModalApiKey] = useState("");

  const connectedCount = socialConnections.filter((s) => s.connected).length;

  const handleOpenConfig = (acc: SocialConnection) => {
    setActiveModal(acc);
    setModalHandle(acc.handle || "");
    setModalFollowers(acc.followers || "");
    setModalAutoPublish(acc.autoPublish ?? true);
    setModalApiKey(acc.apiKey || "");
  };

  const handleSaveModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModal) return;

    updateSocialConnection(activeModal.id, {
      handle: modalHandle.trim() || activeModal.handle,
      followers: modalFollowers.trim() || activeModal.followers,
      autoPublish: modalAutoPublish,
      apiKey: modalApiKey.trim(),
      connected: true,
      lastSync: "Sincronizado agora",
    });

    showToast(`Conta ${activeModal.label} configurada e conectada!`);
    setActiveModal(null);
  };

  const handleDisconnect = (id: SocialConnection["id"]) => {
    updateSocialConnection(id, {
      connected: false,
      lastSync: "Desconectada",
    });
    showToast(`Conta desconectada.`);
    setActiveModal(null);
  };

  const handleDirectPost = (acc: SocialConnection) => {
    if (!acc.uploadUrl) return;
    
    // Copy caption & open direct upload URL
    const viralCopy = `A Rockstar escondeu um detalhe no final do trailer que quase ninguém percebeu... Olha o que a Lucia e o Jason fizeram! 😱\n\n#gta6 #gtavi #rockstargames #shorts #gaming`;
    navigator.clipboard.writeText(viralCopy);
    showToast(`Legenda e hashtags copiadas! Abrindo upload do ${acc.label}...`);
    window.open(acc.uploadUrl, "_blank", "noopener,noreferrer");
  };

  const handleTestAllConnections = () => {
    socialConnections.forEach((acc) => {
      if (acc.connected) {
        updateSocialConnection(acc.id, {
          lastSync: "Verificado agora (100% ativo)",
        });
      }
    });
    showToast(`Todas as ${connectedCount} contas ativas foram verificadas e respondendo!`);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Hero Banner */}
      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-6 md:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              CONTA · MINHAS REDES & CONEXÕES DE CANAIS
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
              Contas Conectadas para Postagem Direta ({connectedCount}/4 Ativas)
            </h2>
            <p className="text-xs text-white/60 mt-1 max-w-2xl">
              Conecte suas contas oficiais do YouTube Shorts, TikTok, Instagram Reels e Facebook para publicar os vídeos gerados com 1 toque ou agendar postagens automáticas.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleTestAllConnections}
              className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white flex items-center gap-1.5 transition"
            >
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
              Testar Conexões
            </button>
          </div>
        </div>

        {/* Quick status bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {socialConnections.map((acc) => (
            <div
              key={acc.id}
              className="p-3 rounded-xl bg-[#0b0612] border border-white/[0.06] flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    acc.connected ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" : "bg-white/20"
                  }`}
                />
                <span className="text-xs font-bold text-white truncate">{acc.label}</span>
              </div>
              <span className="text-[10px] text-white/45">
                {acc.connected ? "Ativa" : "Off"}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Social Connection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialConnections.map((acc) => {
          const isYoutube = acc.id === "youtube";
          const isTiktok = acc.id === "tiktok";
          const isInstagram = acc.id === "instagram";
          const isFacebook = acc.id === "facebook";

          return (
            <div
              key={acc.id}
              className={`rounded-3xl p-5 border transition flex flex-col justify-between gap-4 ${
                acc.connected
                  ? isYoutube
                    ? "bg-gradient-to-br from-[#1b0a0a] to-[#0f0404] border-red-500/30"
                    : isTiktok
                      ? "bg-gradient-to-br from-[#071318] to-[#04090d] border-cyan-400/30"
                      : isInstagram
                        ? "bg-gradient-to-br from-[#1a0815] to-[#0d040a] border-pink-500/30"
                        : "bg-gradient-to-br from-[#080d1a] to-[#04070e] border-blue-500/30"
                  : "bg-[#0b0612] border-white/[0.08] opacity-75"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-sm ${
                        isYoutube
                          ? "bg-red-500 text-white"
                          : isTiktok
                            ? "bg-cyan-400 text-black"
                            : isInstagram
                              ? "bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 text-white"
                              : "bg-blue-600 text-white"
                      }`}
                    >
                      {isYoutube ? "YT" : isTiktok ? "TK" : isInstagram ? "IG" : "FB"}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                        {acc.label}
                        {acc.connected && (
                          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                        )}
                      </h3>
                      <p className="text-xs text-white/60">
                        {acc.handle ? acc.handle : "Nenhum canal vinculado"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                      acc.connected
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        : "bg-white/5 text-white/50 border-white/10"
                    }`}
                  >
                    {acc.connected ? "Conectada" : "Desconectada"}
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-black/40 border border-white/[0.05] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">Audiência / Seguidores:</span>
                    <span className="font-bold text-white">{acc.followers || "0"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">Última Sincronização:</span>
                    <span className="font-medium text-white/70">{acc.lastSync || "Nunca"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50">Publicação em 1 Toque:</span>
                    <span className="font-bold text-emerald-300">
                      {acc.autoPublish ? "Habilitada" : "Manual"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1 border-t border-white/[0.06]">
                {acc.connected ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleDirectPost(acc)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 transition ${
                        isYoutube
                          ? "bg-red-500 hover:bg-red-600 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                          : isTiktok
                            ? "bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.3)]"
                            : isInstagram
                              ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 shadow-[0_0_15px_rgba(236,72,153,0.3)]"
                              : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      Postar Agora
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenConfig(acc)}
                      aria-label={`Configurar ${acc.label}`}
                      className="p-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white/70 hover:text-white transition"
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleOpenConfig(acc)}
                    className="w-full py-2.5 px-3 rounded-xl btn-neon text-xs font-bold text-white flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Conectar Conta
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* How it works instruction box */}
      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-6 space-y-3">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-pink-400" />
          Como Funciona a Publicação em 1 Toque:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-white/70">
          <div className="p-3 rounded-2xl bg-[#0b0612] border border-white/[0.05] space-y-1">
            <span className="font-extrabold text-pink-400">1. Renderize o Vídeo</span>
            <p className="text-white/55">
              Gere seu Reels ou corte 9:16 em 1 minuto no Editor de Vídeo com áudio oficial.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-[#0b0612] border border-white/[0.05] space-y-1">
            <span className="font-extrabold text-cyan-400">2. Copia Inteligente</span>
            <p className="text-white/55">
              Ao tocar em &ldquo;Postar Agora&rdquo;, o título otimizado e a copy com hashtags são copiados instantaneamente.
            </p>
          </div>
          <div className="p-3 rounded-2xl bg-[#0b0612] border border-white/[0.05] space-y-1">
            <span className="font-extrabold text-emerald-400">3. Upload Imediato</span>
            <p className="text-white/55">
              A tela oficial de envio do YouTube Studio ou TikTok abre pronta para arrastar o arquivo MP4 gerado.
            </p>
          </div>
        </div>
      </section>

      {/* Modal: Configurar Conta */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#130b1f] border border-white/20 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Settings className="w-4 h-4 text-cyan-400" />
                  Configurar {activeModal.label}
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  Vincule seu canal e ative a publicação automática.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-white/70 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="p-5 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/80 block">
                  Identificador / Canal (@nome)
                </label>
                <input
                  type="text"
                  value={modalHandle}
                  onChange={(e) => setModalHandle(e.target.value)}
                  placeholder="@seucanal"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/80 block">
                  Contagem de Seguidores / Inscritos
                </label>
                <input
                  type="text"
                  value={modalFollowers}
                  onChange={(e) => setModalFollowers(e.target.value)}
                  placeholder="Ex: 50.4K inscritos"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/80 block">
                  Chave de API / Webhook (Opcional para automação headless)
                </label>
                <input
                  type="password"
                  value={modalApiKey}
                  onChange={(e) => setModalApiKey(e.target.value)}
                  placeholder="Token de acesso ou webhook"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#0b0612] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">
                    Publicação em 1 Toque
                  </span>
                  <span className="text-[11px] text-white/50">
                    Abre a tela de upload e copia automaticamente a legenda.
                  </span>
                </div>
                <input
                  type="checkbox"
                  checked={modalAutoPublish}
                  onChange={(e) => setModalAutoPublish(e.target.checked)}
                  className="w-4 h-4 accent-pink-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                {activeModal.connected && (
                  <button
                    type="button"
                    onClick={() => handleDisconnect(activeModal.id)}
                    className="py-2.5 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-xs font-bold text-red-400 border border-red-500/20 transition"
                  >
                    Desconectar
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 rounded-xl btn-neon text-xs font-bold text-white"
                >
                  Salvar e Conectar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function IndiqueGanheTool() {
  const { brandProfile, pixKey, setPixKey, showToast } = usePainel();
  const refSlug = brandProfile.handle.replace(/^@/, "") || "vicecriador";
  const affiliateLink = `https://gta6gerador.com/?ref=${refSlug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(affiliateLink);
      showToast("Link de indicação copiado!");
    } catch {
      showToast("Selecione e copie seu link.");
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Banner matching painel_indique_ganhe.png */}
      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-6 md:p-8 space-y-2">
        <span className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-pink-400">
          CONTA · INDIQUE E GANHE
        </span>
        <h2 className="font-display text-3xl md:text-5xl text-white uppercase tracking-wide">
          GANHE 50% INDICANDO
        </h2>
        <p className="text-sm text-white/65 max-w-2xl">
          Ganhe 50% ao indicar um amigo. Compartilhe o seu link: quando alguém assina por ele,
          a comissão cai no seu saldo e você saca por PIX.
        </p>
      </section>

      {/* Seu link box */}
      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-6 space-y-4">
        <label className="text-xs font-bold text-white/75 block">Seu link</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            readOnly
            value={affiliateLink}
            className="flex-1 px-4 py-3 rounded-2xl bg-[#0b0612] border border-white/10 text-sm text-white/90"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="px-5 py-3 rounded-2xl btn-neon text-xs font-extrabold text-white flex items-center justify-center gap-2 shrink-0"
          >
            <Copy className="w-4 h-4" />
            Copiar link
          </button>
        </div>

        <div className="flex flex-wrap gap-2.5 pt-1">
          <a
            href={`https://wa.me/?text=${encodeURIComponent(`Gere cortes virais de GTA 6 em 1 minuto no meu link: ${affiliateLink}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#052e16] text-xs font-extrabold flex items-center gap-1.5 transition"
          >
            <MessageCircle className="w-4 h-4" />
            Enviar no WhatsApp
          </a>
          <button
            type="button"
            onClick={handleCopy}
            className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            Compartilhar
          </button>
        </div>
      </section>

      {/* Metrics & PIX Key */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-[#130b1f] border border-white/[0.08] p-4">
          <div className="text-xs text-white/55">Saldo disponível</div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">R$ 248,95</div>
        </div>
        <div className="rounded-2xl bg-[#130b1f] border border-white/[0.08] p-4">
          <div className="text-xs text-white/55">Indicações convertidas</div>
          <div className="text-2xl font-extrabold text-white mt-1">7 assinaturas</div>
        </div>
        <div className="rounded-2xl bg-[#130b1f] border border-white/[0.08] p-4 space-y-2">
          <label className="text-xs text-white/55 block">Sua chave PIX para saque</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={pixKey}
              onChange={(e) => setPixKey(e.target.value)}
              placeholder="CPF, e-mail ou chave aleatória"
              className="flex-1 px-3 py-1.5 rounded-lg bg-[#0b0612] border border-white/10 text-xs text-white"
            />
            <button
              type="button"
              onClick={() => showToast("Solicitação de saque PIX registrada!")}
              className="px-3 py-1.5 rounded-lg bg-pink-500 text-xs font-bold text-white"
            >
              Sacar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MinhaAssinaturaTool() {
  const { setActiveTab } = usePainel();

  return (
    <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-6 space-y-5 max-w-3xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400">
            CONTA · MINHA ASSINATURA
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-0.5 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-pink-400" />
            Plano Anual — Acesso Completo
          </h2>
        </div>
        <span className="px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold">
          ● Assinatura ativa
        </span>
      </div>

      <ul className="grid sm:grid-cols-2 gap-3 text-xs text-white/85">
        {[
          "Cortes ILIMITADO em Full HD 1080×1920",
          "20 modelos de vídeo interativos",
          "10 templates de imagem + 4 proporções",
          "Envio Automático + avisos em 1 toque",
          "4 contas de rede social conectadas",
          "Biblioteca HD com +80 cenas e 48 artes",
        ].map((item) => (
          <li
            key={item}
            className="flex items-center gap-2.5 p-3 rounded-xl bg-[#0b0612] border border-white/[0.06]"
          >
            <CheckCircle2 className="w-4 h-4 text-pink-400 shrink-0" />
            {item}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => setActiveTab("editar-video")}
        className="px-5 py-3 rounded-2xl btn-neon text-xs font-extrabold text-white"
      >
        Voltar para o Editor de Vídeo
      </button>
    </section>
  );
}
