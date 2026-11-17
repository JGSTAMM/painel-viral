"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  FolderOpen,
  Globe,
  Loader2,
  MessageCircle,
  RefreshCw,
  Send,
  Settings,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { usePainel, type SocialConnection } from "@/context/PainelContext";
import type { ReferralAccountRecord } from "@/app/api/referrals/route";

export function MinhasCriacoesTool() {
  const { creations, removeCreation, setActiveTab, socialConnections, showToast } = usePainel();
  const [publishingId, setPublishingId] = useState<string | null>(null);

  const handlePublishCreation = async (item: (typeof creations)[0]) => {
    setPublishingId(item.id);
    const connectedAccounts = socialConnections.filter((s) => s.connected);
    const targetAcc = connectedAccounts[0] ?? socialConnections[0];

    try {
      const res = await fetch("/api/social/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: targetAcc.id,
          handle: targetAcc.handle,
          videoUrl: item.downloadUrl,
          title: item.title,
          caption: item.title,
          hashtags: "#gta6 #gtavi #rockstargames #shorts",
          webhookUrl: targetAcc.webhookUrl || "",
          apiKey: targetAcc.apiKey || "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(`${item.title}\n\n#gta6 #gtavi #rockstargames #shorts`).catch(() => {});
        }
        if (data.mode === "webhook") {
          showToast(`Publicado via Webhook em ${targetAcc.label} (${targetAcc.handle})!`);
        } else {
          showToast(`Copy copiada! Abrindo ${targetAcc.label} para enviar o MP4.`);
          if (data.platformUploadUrl) {
            window.open(data.platformUploadUrl, "_blank", "noopener,noreferrer");
          }
        }
      } else {
        showToast(data.error || "Erro ao publicar criação.");
      }
    } catch {
      showToast("Falha de rede ao acionar publicação.");
    } finally {
      setPublishingId(null);
    }
  };

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
            Assista aos arquivos reais renderizados em disco, baixe o MP4/PNG original ou publique direto.
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
          <p className="text-sm text-white/65">Nenhuma criação salva ainda. Renderize um vídeo no Editor!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {creations.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl overflow-hidden bg-[#130b1f] border border-white/[0.08] flex flex-col"
            >
              <div className="relative aspect-video bg-black">
                {item.type === "video" ? (
                  <video
                    src={item.downloadUrl}
                    poster={item.thumbnailUrl}
                    controls
                    preload="metadata"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <img
                    src={item.downloadUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-extrabold text-white uppercase pointer-events-none">
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
                    disabled={publishingId === item.id}
                    onClick={() => handlePublishCreation(item)}
                    className="py-2 px-3 rounded-xl bg-white/[0.07] hover:bg-pink-500/25 border border-white/10 text-xs font-bold text-white flex items-center gap-1.5 transition"
                  >
                    {publishingId === item.id ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                    Postar
                  </button>
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
  const { socialConnections, creations, editorState, updateSocialConnection, showToast } = usePainel();
  const [activeModal, setActiveModal] = useState<SocialConnection | null>(null);
  const [modalHandle, setModalHandle] = useState("");
  const [modalWebhookUrl, setModalWebhookUrl] = useState("");
  const [modalApiKey, setModalApiKey] = useState("");
  const [modalAutoPublish, setModalAutoPublish] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isTestingAll, setIsTestingAll] = useState(false);
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);

  const connectedCount = socialConnections.filter((s) => s.connected).length;

  const handleOpenConfig = (acc: SocialConnection) => {
    setActiveModal(acc);
    setModalHandle(acc.handle || "");
    setModalWebhookUrl(acc.webhookUrl || "");
    setModalApiKey(acc.apiKey || "");
    setModalAutoPublish(acc.autoPublish ?? true);
    setModalError(null);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModal || isVerifying) return;
    setModalError(null);
    setIsVerifying(true);

    try {
      const res = await fetch("/api/social/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: activeModal.id,
          handle: modalHandle.trim(),
          webhookUrl: modalWebhookUrl.trim(),
          apiKey: modalApiKey.trim(),
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setModalError(data.error || "Não foi possível validar o canal informado.");
        return;
      }

      updateSocialConnection(activeModal.id, {
        handle: data.handle,
        profileUrl: data.profileUrl,
        uploadUrl: data.uploadUrl,
        webhookUrl: modalWebhookUrl.trim(),
        apiKey: modalApiKey.trim(),
        autoPublish: modalAutoPublish,
        followers: data.followersLabel,
        lastSync: data.lastSync,
        connected: true,
      });

      showToast(
        `${activeModal.label} (${data.handle}) validado em tempo real: ${data.followersLabel}!`
      );
      setActiveModal(null);
    } catch {
      setModalError("Falha de rede ao consultar o perfil.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDisconnect = (id: SocialConnection["id"]) => {
    updateSocialConnection(id, {
      connected: false,
      handle: "",
      followers: "Não conectado",
      lastSync: "Desconectado",
      webhookUrl: "",
      apiKey: "",
    });
    showToast("Conta desconectada.");
    setActiveModal(null);
  };

  const handleDirectPost = async (acc: SocialConnection) => {
    setPublishingId(acc.id);
    const latestVideo = creations.find((c) => c.type === "video") ?? creations[0];
    const videoUrl = latestVideo?.downloadUrl || "/media/gta6-viral-shorts.mp4";
    const title = editorState.caption || latestVideo?.title || "Corte GTA 6 Full HD";
    const hashtags = "#gta6 #gtavi #rockstargames #shorts #gaming";

    try {
      const res = await fetch("/api/social/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: acc.id,
          handle: acc.handle,
          videoUrl,
          title,
          caption: title,
          hashtags,
          webhookUrl: acc.webhookUrl || "",
          apiKey: acc.apiKey || "",
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        showToast(data.error || `Falha ao publicar em ${acc.label}.`);
        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(data.fullCopy).catch(() => {});
      }

      if (data.mode === "webhook") {
        showToast(`Disparo real enviado ao Webhook de ${acc.label} (HTTP ${data.logEntry?.statusCode})!`);
      } else {
        showToast(`Copy real copiada! Abrindo estúdio de envio do ${acc.label}...`);
        window.open(data.platformUploadUrl || acc.uploadUrl, "_blank", "noopener,noreferrer");
      }
    } catch {
      showToast("Erro ao conectar ao servidor de publicação.");
    } finally {
      setPublishingId(null);
    }
  };

  const handleTestAllConnections = async () => {
    const active = socialConnections.filter((s) => s.connected && s.handle);
    if (active.length === 0) {
      showToast("Conecte pelo menos uma conta primeiro para verificar em tempo real.");
      return;
    }
    setIsTestingAll(true);
    try {
      const results = await Promise.all(
        active.map(async (acc) => {
          const res = await fetch("/api/social/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              platform: acc.id,
              handle: acc.handle,
              webhookUrl: acc.webhookUrl || "",
            }),
          });
          const data = await res.json();
          if (res.ok && data.success) {
            updateSocialConnection(acc.id, {
              followers: data.followersLabel,
              lastSync: data.lastSync,
              profileUrl: data.profileUrl,
            });
            return true;
          }
          return false;
        })
      );
      const okCount = results.filter(Boolean).length;
      showToast(`Verificação HTTP concluída: ${okCount}/${active.length} canais ativos confirmados!`);
    } catch {
      showToast("Erro ao testar conexões no servidor.");
    } finally {
      setIsTestingAll(false);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-6 md:p-8 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-widest text-cyan-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              CONTA · MINHAS REDES & INTEGRAÇÃO REAL
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-white mt-1">
              Canais Vinculados para Publicação ({connectedCount}/4 Ativos)
            </h2>
            <p className="text-xs text-white/60 mt-1 max-w-2xl">
              Informe seu @usuário real (validado em tempo real nas redes) e opcionalmente uma URL de Webhook (Make, n8n, Zapier ou Ayrshare) para disparos automáticos com o arquivo MP4.
            </p>
          </div>

          <button
            type="button"
            disabled={isTestingAll}
            onClick={handleTestAllConnections}
            className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white flex items-center gap-1.5 transition disabled:opacity-60"
          >
            {isTestingAll ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-cyan-400" />
            ) : (
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            )}
            {isTestingAll ? "Verificando HTTP..." : "Verificar Conexões"}
          </button>
        </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialConnections.map((acc) => {
          const isYoutube = acc.id === "youtube";
          const isTiktok = acc.id === "tiktok";
          const isInstagram = acc.id === "instagram";

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
                  : "bg-[#0b0612] border-white/[0.08]"
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
                        {acc.connected && <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-white/60">
                        <span>{acc.handle || "Nenhum canal vinculado"}</span>
                        {acc.profileUrl && (
                          <a
                            href={acc.profileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:underline inline-flex items-center"
                            aria-label={`Abrir perfil de ${acc.label}`}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
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
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/50">Validação do Perfil:</span>
                    <span className="font-bold text-white truncate">{acc.followers || "Não conectado"}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/50">Última Checagem:</span>
                    <span className="font-medium text-white/70 truncate">{acc.lastSync || "Nunca"}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-white/50">Modo de Envio:</span>
                    <span className="font-bold text-emerald-300">
                      {acc.webhookUrl ? "Webhook Automático" : "Estúdio + Copy 1-Toque"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-white/[0.06]">
                {acc.connected ? (
                  <>
                    <button
                      type="button"
                      disabled={publishingId === acc.id}
                      onClick={() => handleDirectPost(acc)}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white flex items-center justify-center gap-1.5 transition disabled:opacity-60 ${
                        isYoutube
                          ? "bg-red-500 hover:bg-red-600"
                          : isTiktok
                            ? "bg-cyan-500 hover:bg-cyan-400 text-black"
                            : isInstagram
                              ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
                              : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {publishingId === acc.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Upload className="w-3.5 h-3.5" />
                      )}
                      {acc.webhookUrl ? "Disparar Webhook" : "Postar Agora"}
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
                    Conectar Conta Real
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {activeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#130b1f] border border-white/20 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Settings className="w-4 h-4 text-cyan-400" />
                  Vincular {activeModal.label}
                </h3>
                <p className="text-xs text-white/60 mt-0.5">
                  O servidor validará se o canal existe publicamente e testará o Webhook se informado.
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
              {modalError && (
                <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-xs text-red-200">
                  {modalError}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/80 block">
                  @Usuário ou identificador real do canal
                </label>
                <input
                  type="text"
                  value={modalHandle}
                  onChange={(e) => setModalHandle(e.target.value)}
                  placeholder="Ex: RockstarGames ou seucanal"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/80 block">
                  URL de Webhook para publicação automática (opcional — Make, n8n, Zapier)
                </label>
                <input
                  type="url"
                  value={modalWebhookUrl}
                  onChange={(e) => setModalWebhookUrl(e.target.value)}
                  placeholder="https://hook.us1.make.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/80 block">
                  Token / API Key OAuth (opcional)
                </label>
                <input
                  type="password"
                  value={modalApiKey}
                  onChange={(e) => setModalApiKey(e.target.value)}
                  placeholder="Bearer Token se exigido pelo endpoint"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#0b0612] border border-white/[0.06] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-white block">
                    Incluir no Agendamento Automático
                  </span>
                  <span className="text-[11px] text-white/50">
                    Dispara o vídeo automaticamente quando o horário agendado vencer.
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
                  disabled={isVerifying}
                  className="flex-1 py-2.5 px-4 rounded-xl btn-neon text-xs font-bold text-white flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isVerifying && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {isVerifying ? "Validando perfil..." : "Validar e Conectar"}
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
  const refSlug = brandProfile.handle.replace(/^@/, "").toLowerCase() || "criador";
  const [origin, setOrigin] = useState("https://painel-viral-ten.vercel.app");
  const [account, setAccount] = useState<ReferralAccountRecord | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/referrals?ref=${encodeURIComponent(refSlug)}`);
      const data = await res.json();
      if (data.success && data.account) {
        setAccount(data.account);
        if (data.account.pixKey && !pixKey) {
          setPixKey(data.account.pixKey);
        }
      }
    } catch {
      // Ignore fetch errors
    } finally {
      setIsLoading(false);
    }
  }, [refSlug, pixKey, setPixKey]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const affiliateLink = `${origin}/?ref=${refSlug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(affiliateLink);
      showToast("Link real de indicação copiado!");
    } catch {
      showToast("Selecione e copie seu link.");
    }
  };

  const handleWithdrawPix = async () => {
    if (!pixKey.trim()) {
      showToast("Digite sua chave PIX antes de solicitar o saque.");
      return;
    }
    setIsWithdrawing(true);
    try {
      const res = await fetch("/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ref: refSlug,
          action: "withdraw",
          pixKey: pixKey.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        // Save PIX key cleanly even when balance is 0
        await fetch("/api/referrals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ref: refSlug,
            action: "save_pix",
            pixKey: pixKey.trim(),
          }),
        }).catch(() => {});
        showToast(data.error || "Chave PIX salva. Aguardando saldo positivo para saque.");
        await fetchStats();
        return;
      }
      setAccount(data.account);
      showToast(
        `Saque PIX de R$ ${data.withdrawnAmount.toFixed(2).replace(".", ",")} registrado! Protocolo: ${data.protocol}`
      );
    } catch {
      showToast("Erro ao registrar saque PIX.");
    } finally {
      setIsWithdrawing(false);
    }
  };

  const formatBrl = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="space-y-6 max-w-4xl">
      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-6 md:p-8 space-y-2">
        <span className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-pink-400">
          CONTA · INDIQUE E GANHE
        </span>
        <h2 className="font-display text-3xl md:text-5xl text-white uppercase tracking-wide">
          GANHE 50% INDICANDO
        </h2>
        <p className="text-sm text-white/65 max-w-2xl">
          Todos os acessos com o seu parâmetro <code className="text-cyan-300">?ref={refSlug}</code>{" "}
          e cadastros reais são contabilizados no banco do servidor em tempo real.
        </p>
      </section>

      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-6 space-y-4">
        <label className="text-xs font-bold text-white/75 block">Seu link de rastreamento real</label>
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
            href={`https://wa.me/?text=${encodeURIComponent(`Gere cortes virais de GTA 6 com áudio e roteiros no meu link: ${affiliateLink}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#052e16] text-xs font-extrabold flex items-center gap-1.5 transition"
          >
            <MessageCircle className="w-4 h-4" />
            Enviar no WhatsApp
          </a>
          <button
            type="button"
            onClick={fetchStats}
            className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-bold text-white flex items-center gap-1.5"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
            Atualizar métricas
          </button>
        </div>
      </section>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl bg-[#130b1f] border border-white/[0.08] p-4">
          <div className="text-xs text-white/55">Saldo disponível real</div>
          <div className="text-2xl font-extrabold text-emerald-400 mt-1">
            {formatBrl(account?.availableBalance ?? 0)}
          </div>
          <div className="text-[11px] text-white/40 mt-1">
            Já sacado: {formatBrl(account?.totalWithdrawn ?? 0)}
          </div>
        </div>

        <div className="rounded-2xl bg-[#130b1f] border border-white/[0.08] p-4">
          <div className="text-xs text-white/55">Cliques & Conversões reais</div>
          <div className="text-2xl font-extrabold text-white mt-1">
            {account?.conversions ?? 0} assinaturas
          </div>
          <div className="text-[11px] text-cyan-300 mt-1">
            {account?.clicks ?? 0} cliques rastreados
          </div>
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
              disabled={isWithdrawing}
              onClick={handleWithdrawPix}
              className="px-3 py-1.5 rounded-lg bg-pink-500 text-xs font-bold text-white disabled:opacity-50"
            >
              {isWithdrawing ? "..." : "Sacar"}
            </button>
          </div>
        </div>
      </div>

      {account && account.history.length > 0 && (
        <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-5 space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-white/75">
            Histórico de Eventos e Saques ({account.history.length})
          </h3>
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {account.history.map((ev) => (
              <div
                key={ev.id}
                className="p-3 rounded-xl bg-[#0b0612] border border-white/[0.05] flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-white">{ev.description}</span>
                  {ev.protocol && (
                    <span className="ml-2 px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px]">
                      {ev.protocol}
                    </span>
                  )}
                </div>
                <span className="text-white/50">
                  {ev.amount > 0 ? formatBrl(ev.amount) : new Date(ev.createdAt).toLocaleTimeString("pt-BR")}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
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
            Plano Criador Full — Produção Real
          </h2>
        </div>
        <span className="px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold">
          ● Assinatura ativa
        </span>
      </div>

      <ul className="grid sm:grid-cols-2 gap-3 text-xs text-white/85">
        {[
          "Cortes MP4 ILIMITADOS com Áudio Real (FFmpeg H.264/AAC)",
          "20 modelos de vídeo interativos",
          "10 templates de imagem + 4 proporções",
          "Envio Automático com disparo real no horário agendado",
          "Conexão e validação real de canais + Webhooks",
          "651 arquivos no Drive + 90 roteiros + trailers Full HD",
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
