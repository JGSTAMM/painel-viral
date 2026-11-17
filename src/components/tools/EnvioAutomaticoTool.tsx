"use client";

import React, { useState } from "react";
import { Bell, Calendar, Clock, Copy, Play, Plus, Sparkles, Trash2 } from "lucide-react";
import { TRAILER_SCENES } from "@/data/gta-catalog";
import { usePainel, type ScheduledPostItem } from "@/context/PainelContext";

const PLATFORM_OPTIONS: ("Instagram" | "TikTok" | "YouTube" | "Facebook")[] = [
  "Instagram",
  "TikTok",
  "YouTube",
  "Facebook",
];

export function EnvioAutomaticoTool() {
  const {
    scheduledPosts,
    addScheduledPost,
    removeScheduledPost,
    importCalendario30D,
    setActiveTab,
    updateEditorState,
    notificationsEnabled,
    setNotificationsEnabled,
    showToast,
  } = usePainel();

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("Corte GTA 6 — Cena em Destaque");
  const [isoDateTime, setIsoDateTime] = useState("2026-11-20T18:00");
  const [platforms, setPlatforms] = useState<ScheduledPostItem["platforms"]>([
    "Instagram",
    "TikTok",
  ]);
  const [caption, setCaption] = useState(
    "Vice City nunca foi tão real — olha esse detalhe do trailer 🔥"
  );
  const [hashtags, setHashtags] = useState("#gta6 #vicecity #reels #tiktokgaming");

  const handleToggleNotifications = async () => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      setNotificationsEnabled(true);
      showToast("Avisos ativados no painel para este dispositivo.");
      return;
    }
    const perm = await Notification.requestPermission();
    setNotificationsEnabled(perm === "granted");
    showToast(
      perm === "granted"
        ? "Avisos ativados neste aparelho!"
        : "Permissão de notificação bloqueada no navegador; avisos ativos apenas no painel."
    );
  };

  const togglePlatform = (p: ScheduledPostItem["platforms"][number]) => {
    setPlatforms((curr) =>
      curr.includes(p) ? (curr.length > 1 ? curr.filter((x) => x !== p) : curr) : [...curr, p]
    );
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const dt = new Date(isoDateTime);
    const formatted = Number.isNaN(dt.getTime())
      ? isoDateTime
      : dt.toLocaleDateString("pt-BR", {
          weekday: "short",
          day: "2-digit",
          month: "2-digit",
        }) +
        " · " +
        dt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

    addScheduledPost({
      title: title.trim() || "Novo Reels GTA 6",
      dateTimeLabel: formatted,
      isoDateTime,
      platforms,
      caption,
      hashtags,
      thumbnailUrl: TRAILER_SCENES[scheduledPosts.length % TRAILER_SCENES.length].imageUrl,
    });
    setShowModal(false);
    showToast("Vídeo agendado no Envio Automático!");
  };

  const handleCopyCaption = async (post: ScheduledPostItem) => {
    try {
      await navigator.clipboard.writeText(`${post.caption}\n\n${post.hashtags}`);
      showToast("Legenda e hashtags copiadas!");
    } catch {
      showToast("Copie manualmente o texto da legenda.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Hero Banner matching painel_envio_automatico.png */}
      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-6 md:p-7 space-y-5">
        <div className="space-y-1.5">
          <span className="text-[11px] font-extrabold tracking-[0.14em] uppercase text-pink-400">
            AUTOMAÇÃO
          </span>
          <h2 className="font-display text-3xl md:text-4xl tracking-wide text-white uppercase">
            ENVIO AUTOMÁTICO
          </h2>
          <p className="text-sm text-white/65 max-w-2xl">
            Agende seus vídeos: eles ficam guardados no servidor e, na hora marcada, o painel te
            avisa e você posta em 1 toque com a legenda pronta.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="px-5 py-3 rounded-2xl btn-neon text-xs md:text-sm font-extrabold text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Criar vídeo para agendar
          </button>

          <button
            type="button"
            onClick={importCalendario30D}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-400/40 text-xs md:text-sm font-extrabold text-cyan-300 flex items-center gap-2 transition"
          >
            <Calendar className="w-4 h-4 text-cyan-400" />
            Importar Calendário GTA VI (30 Dias)
          </button>

          <button
            type="button"
            onClick={handleToggleNotifications}
            className={`px-4 py-3 rounded-2xl border text-xs md:text-sm font-bold flex items-center gap-2 transition ${
              notificationsEnabled
                ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300"
                : "bg-[#0b0612] border-white/[0.1] text-white/85 hover:border-amber-400/50"
            }`}
          >
            <Bell className="w-4 h-4 text-amber-400" />
            {notificationsEnabled
              ? "Avisos ligados neste aparelho"
              : "Ligar avisos neste aparelho"}
          </button>
        </div>
      </section>

      {/* Two columns: Próximos posts + Melhores horários */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6 items-start">
        <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-5 space-y-4">
          <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-pink-400" />
            Próximos posts ({scheduledPosts.length})
          </h2>

          <div className="space-y-3">
            {scheduledPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl bg-[#0b0612] border border-white/[0.08] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <img
                    src={post.thumbnailUrl}
                    alt={post.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0 border border-white/10"
                  />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-extrabold text-white">
                        {post.dateTimeLabel}
                      </span>
                      {post.platforms.map((pl) => (
                        <span
                          key={pl}
                          className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold ${
                            pl === "Instagram"
                              ? "bg-pink-500/20 text-pink-300"
                              : pl === "TikTok"
                                ? "bg-cyan-500/20 text-cyan-300"
                                : pl === "YouTube"
                                  ? "bg-red-500/20 text-red-300"
                                  : "bg-blue-500/20 text-blue-300"
                          }`}
                        >
                          {pl}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xs font-bold text-white/90 mt-1 truncate">
                      {post.title}
                    </h3>
                    <p className="text-[11px] text-white/55 line-clamp-1 mt-0.5">
                      {post.caption} {post.hashtags}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      updateEditorState({ caption: post.caption });
                      setActiveTab("editar-video");
                      showToast(`Post "${post.title}" carregado no Editor!`);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-pink-500/20 hover:bg-pink-500 border border-pink-500/40 text-[11px] font-bold text-white flex items-center gap-1 transition"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    Produzir
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCopyCaption(post)}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-[11px] font-bold text-white flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3 text-cyan-400" />
                    Copiar
                  </button>
                  <button
                    type="button"
                    onClick={() => removeScheduledPost(post.id)}
                    aria-label="Excluir agendamento"
                    className="p-2 rounded-xl bg-white/[0.04] hover:bg-red-500/20 text-white/50 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Melhores horários para GTA 6 */}
        <aside className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-5 space-y-4">
          <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            Melhores horários para GTA 6
          </h2>

          <div className="grid grid-cols-3 gap-2.5">
            {[
              { hour: "12h", label: "Almoço / Pico Reels" },
              { hour: "18h", label: "Saída / TikTok" },
              { hour: "21h", label: "Noite / Máximo Alcance" },
            ].map((slot) => (
              <button
                key={slot.hour}
                type="button"
                onClick={() => {
                  const h = slot.hour.replace("h", "");
                  setIsoDateTime(`2026-11-20T${h}:00`);
                  setShowModal(true);
                }}
                className="rounded-2xl bg-[#0b0612] border border-white/[0.08] hover:border-pink-500/60 p-3 text-center transition"
              >
                <div className="font-display text-2xl text-pink-400">{slot.hour}</div>
                <div className="text-[10px] text-white/55 mt-0.5 leading-tight">
                  {slot.label}
                </div>
              </button>
            ))}
          </div>

          <p className="text-xs text-white/55 leading-relaxed">
            Clique em qualquer horário acima para pré-preencher um novo agendamento no pico
            de visualização da comunidade gamer brasileira.
          </p>
        </aside>
      </div>

      {/* Modal Agendar Vídeo */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="sched-modal-title"
        >
          <form
            onSubmit={handleCreateSchedule}
            className="w-full max-w-lg rounded-3xl bg-[#130b1f] border border-white/15 p-6 space-y-4 shadow-2xl"
          >
            <h3 id="sched-modal-title" className="text-lg font-extrabold text-white">
              Agendar nova publicação
            </h3>

            <div>
              <label className="text-xs font-semibold text-white/75 block mb-1">
                Título do vídeo
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-sm text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-white/75 block mb-1">
                Data e horário
              </label>
              <input
                type="datetime-local"
                value={isoDateTime}
                onChange={(e) => setIsoDateTime(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-sm text-white"
              />
            </div>

            <div>
              <span className="text-xs font-semibold text-white/75 block mb-1.5">
                Redes sociais de destino
              </span>
              <div className="flex flex-wrap gap-2">
                {PLATFORM_OPTIONS.map((p) => {
                  const active = platforms.includes(p);
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => togglePlatform(p)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                        active
                          ? "bg-pink-500/20 border-pink-500 text-white"
                          : "bg-[#0b0612] border-white/10 text-white/60"
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-white/75 block mb-1">
                Legenda pronta
              </label>
              <textarea
                rows={2}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-sm text-white"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-white/75 block mb-1">
                Hashtags virais
              </label>
              <input
                type="text"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-sm text-white"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-4 py-2.5 rounded-xl bg-white/[0.06] text-xs font-bold text-white/80"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl btn-neon text-xs font-extrabold text-white"
              >
                Confirmar agendamento
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
