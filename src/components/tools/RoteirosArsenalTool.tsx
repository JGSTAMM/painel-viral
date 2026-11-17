"use client";

import React, { useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  ExternalLink,
  Film,
  Flame,
  FolderOpen,
  HelpCircle,
  Lightbulb,
  Play,
  Search,
  Send,
  Share2,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  CENTRAL_DRIVE_ROOT_URL,
  OPERACAO_CALENDARIO_30D,
  OPERACAO_FLUXO_PASSOS,
  OPERACAO_GANCHOS,
  OPERACAO_LEGENDAS,
  OPERACAO_MAPA_OPORTUNIDADES,
  OPERACAO_MIDIA_AREAS,
  OPERACAO_ROTEIROS,
  OPERACAO_TITULOS,
  type OperacaoRoteiro,
} from "@/data/operacao-gta";
import { usePainel } from "@/context/PainelContext";

type ArsenalSubTab = "roteiros" | "ganchos" | "titulos-legendas" | "guia";

export function RoteirosArsenalTool() {
  const { updateEditorState, setActiveTab, showToast } = usePainel();
  const [activeSubTab, setActiveSubTab] = useState<ArsenalSubTab>("roteiros");

  // Roteiros state
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const [searchRoteiro, setSearchRoteiro] = useState<string>("");
  const [activeRoteiroModal, setActiveRoteiroModal] = useState<OperacaoRoteiro | null>(null);

  // Ganchos state
  const [selectedGanchoCat, setSelectedGanchoCat] = useState<string>("Todas");
  const [searchGancho, setSearchGancho] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Titulos / Legendas state
  const [searchTitulo, setSearchTitulo] = useState<string>("");

  const categories = useMemo(() => {
    const set = new Set<string>();
    OPERACAO_ROTEIROS.forEach((r) => set.add(r.category));
    return ["Todas", ...Array.from(set)];
  }, []);

  const filteredRoteiros = useMemo(() => {
    return OPERACAO_ROTEIROS.filter((r) => {
      const catMatch = selectedCategory === "Todas" || r.category === selectedCategory;
      const q = searchRoteiro.trim().toLowerCase();
      const qMatch =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.theme.toLowerCase().includes(q) ||
        r.hook.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q);
      return catMatch && qMatch;
    });
  }, [selectedCategory, searchRoteiro]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast("Texto copiado para a área de transferência!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendRoteiroToEditor = (roteiro: OperacaoRoteiro) => {
    // Send hook and duration to editor
    updateEditorState({
      caption: roteiro.hook,
      durationSeconds: roteiro.suggestedDurationSeconds || 30,
    });
    setActiveTab("editar-video");
    showToast(`Roteiro #${roteiro.code} carregado no Editor de Vídeo!`);
  };

  const handleSendHookToEditor = (hookText: string) => {
    updateEditorState({ caption: hookText });
    setActiveTab("editar-video");
    showToast("Gancho carregado na legenda do Editor de Vídeo!");
  };

  return (
    <div className="space-y-6">
      {/* Top Arsenal Hero Header */}
      <section className="rounded-3xl bg-gradient-to-r from-[#170a2c] via-[#10071f] to-[#0a1428] border border-white/10 p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-400 text-[11px] font-black uppercase tracking-wider border border-pink-500/30">
                ARSENAL DE CRIAÇÃO · OPERAÇÃO GTA VI
              </span>
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-extrabold tracking-wider border border-cyan-500/30">
                80 ROTEIROS + 10 CORINGAS · 150 GANCHOS
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Biblioteca de Roteiros, Ganchos & Cofre de Títulos
            </h2>
            <p className="text-xs text-white/70 leading-relaxed">
              Nunca mais comece um vídeo do zero. Selecione uma estrutura pronta com ganchos testados,
              teleprompter com tempos sugeridos, títulos otimizados para busca e conexão direta com os materiais
              da Central de Mídia no Google Drive.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={CENTRAL_DRIVE_ROOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white flex items-center gap-2 transition"
            >
              <FolderOpen className="w-4 h-4 text-cyan-400" />
              Central de Mídia (651 Arquivos)
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>

        {/* Sub-tabs Navigation */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-5 border-t border-white/[0.08]">
          {[
            { id: "roteiros", label: "📜 80 Roteiros + 10 Coringas", count: "90" },
            { id: "ganchos", label: "🪝 Arsenal de 150 Ganchos", count: "10 Categorias" },
            { id: "titulos-legendas", label: "✍️ Cofre de Títulos & Legendas", count: "120 Títulos / 60 Legendas" },
            { id: "guia", label: "🧠 Guia: Da Ideia à Publicação", count: "7 Passos" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id as ArsenalSubTab)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                activeSubTab === tab.id
                  ? "btn-neon text-white shadow-lg"
                  : "bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white border border-white/[0.06]"
              }`}
            >
              <span>{tab.label}</span>
              <span className="text-[10px] opacity-75 font-mono px-1.5 py-0.5 rounded bg-black/40">
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* SUB-TAB 1: ROTEIROS */}
      {activeSubTab === "roteiros" && (
        <section className="space-y-6">
          {/* Controls: Search and Categories */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1.5 flex-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                    selectedCategory === cat
                      ? "bg-pink-500/20 text-pink-300 border-pink-500"
                      : "bg-[#130b1f] text-white/60 border-white/[0.08] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative shrink-0 md:w-72">
              <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchRoteiro}
                onChange={(e) => setSearchRoteiro(e.target.value)}
                placeholder="Buscar por tema, gancho ou número..."
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-xs text-white focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          {/* Roteiros Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredRoteiros.map((roteiro) => (
              <article
                key={roteiro.id}
                className="rounded-2xl bg-[#130b1f] border border-white/[0.08] p-5 flex flex-col justify-between gap-4 hover:border-pink-500/40 transition group relative"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      #{roteiro.code}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-bold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{roteiro.suggestedDurationSeconds}s sugeridos</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                      {roteiro.category}
                    </span>
                    <h3 className="text-sm font-extrabold text-white mt-0.5 group-hover:text-pink-300 transition line-clamp-1">
                      {roteiro.title}
                    </h3>
                    <p className="text-[11px] text-white/60 mt-1 line-clamp-2">
                      {roteiro.objective}
                    </p>
                  </div>

                  {/* Hook preview */}
                  <div className="p-3 rounded-xl bg-[#0b0612] border border-white/[0.06] space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-pink-400">
                      🪝 Gancho de Abertura:
                    </span>
                    <p className="text-xs text-white/90 font-medium italic leading-snug">
                      &quot;{roteiro.hook}&quot;
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/[0.06] flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveRoteiroModal(roteiro)}
                    className="flex-1 py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-bold text-white flex items-center justify-center gap-1.5 transition"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    Ver Roteiro Completo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSendRoteiroToEditor(roteiro)}
                    className="py-2 px-3 rounded-xl btn-neon text-xs font-bold text-white flex items-center gap-1.5 transition shrink-0"
                    title="Carregar no Editor de Vídeo"
                  >
                    <Film className="w-3.5 h-3.5" />
                    Usar
                  </button>
                </div>
              </article>
            ))}
          </div>

          {filteredRoteiros.length === 0 && (
            <div className="text-center py-12 rounded-3xl border border-dashed border-white/10 p-8 space-y-2">
              <HelpCircle className="w-8 h-8 text-white/40 mx-auto" />
              <p className="text-sm font-bold text-white">Nenhum roteiro encontrado</p>
              <p className="text-xs text-white/50">Tente buscar por outro termo ou mude a categoria.</p>
            </div>
          )}
        </section>
      )}

      {/* SUB-TAB 2: ARSENAL DE 150 GANCHOS */}
      {activeSubTab === "ganchos" && (
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-extrabold text-white">
                150 Ganchos Validados Divididos em 10 Categorias
              </h3>
              <p className="text-xs text-white/60 mt-0.5">
                O primeiro segundo decide a retenção. Clique em qualquer gancho para enviar direto para a legenda do editor ou copie.
              </p>
            </div>
            <div className="relative shrink-0 sm:w-72">
              <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchGancho}
                onChange={(e) => setSearchGancho(e.target.value)}
                placeholder="Filtrar ganchos por palavra..."
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#0b0612] border border-white/10 text-xs text-white focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          <div className="space-y-6">
            {OPERACAO_GANCHOS.map((cat) => {
              const matchingHooks = cat.hooks.filter((h) =>
                !searchGancho || h.hook.toLowerCase().includes(searchGancho.toLowerCase())
              );
              if (matchingHooks.length === 0) return null;

              return (
                <div key={cat.id} className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl">{cat.icon}</span>
                      <h4 className="text-sm font-black text-white">{cat.category}</h4>
                    </div>
                    <span className="text-[11px] font-mono text-white/50 font-bold">
                      {matchingHooks.length} ganchos
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {matchingHooks.map((h) => {
                      const uid = `hook-${cat.id}-${h.number}`;
                      const isCopied = copiedId === uid;

                      return (
                        <div
                          key={uid}
                          className="p-3.5 rounded-2xl bg-[#0b0612] border border-white/[0.06] hover:border-pink-500/40 transition flex flex-col justify-between gap-3 group"
                        >
                          <div className="space-y-1.5">
                            <span className="text-[10px] font-mono font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded">
                              #{h.number}
                            </span>
                            <p className="text-xs text-white/90 leading-relaxed font-medium">
                              &quot;{h.hook}&quot;
                            </p>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-white/[0.05]">
                            <button
                              type="button"
                              onClick={() => handleSendHookToEditor(h.hook)}
                              className="flex-1 py-1.5 px-2.5 rounded-lg btn-neon text-[11px] font-bold text-white flex items-center justify-center gap-1.5"
                            >
                              <Film className="w-3 h-3" />
                              Usar no Editor
                            </button>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(h.hook, uid)}
                              className="py-1.5 px-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-[11px] font-bold text-white flex items-center gap-1 transition"
                            >
                              {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{isCopied ? "Copiado" : "Copiar"}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* SUB-TAB 3: COFRE DE TÍTULOS & LEGENDAS */}
      {activeSubTab === "titulos-legendas" && (
        <section className="space-y-8">
          {/* Titles Section */}
          <div className="space-y-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-pink-400">
                120 TÍTULOS ESTRATÉGICOS (10 CATEGORIAS)
              </span>
              <h3 className="text-lg font-black text-white mt-0.5">
                Cofre de Títulos Otimizados para Busca e Engajamento
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OPERACAO_TITULOS.map((tCat) => (
                <div key={tCat.id} className="rounded-2xl bg-[#130b1f] border border-white/[0.08] p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{tCat.icon}</span>
                      <h4 className="text-xs font-black text-white">{tCat.category}</h4>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold">
                      {tCat.titles.length} títulos
                    </span>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {tCat.titles.map((item) => (
                      <div
                        key={item.number}
                        className="p-2.5 rounded-xl bg-[#0b0612] border border-white/[0.04] hover:border-pink-500/30 transition flex items-center justify-between gap-2"
                      >
                        <p className="text-xs text-white/85 font-medium line-clamp-2">
                          {item.title}
                        </p>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(item.title, `tit-${tCat.id}-${item.number}`)}
                          className="shrink-0 p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white/70 hover:text-white transition"
                          title="Copiar título"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Captions Section */}
          <div className="space-y-4 pt-6 border-t border-white/[0.08]">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-cyan-400">
                60 MODELOS DE LEGENDAS (6 NICHOS PRÁTICOS)
              </span>
              <h3 className="text-lg font-black text-white mt-0.5">
                Legendas Prontas para TikTok, Instagram Reels e YouTube Shorts
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {OPERACAO_LEGENDAS.map((cCat) => (
                <div key={cCat.id} className="rounded-2xl bg-[#130b1f] border border-white/[0.08] p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cCat.icon}</span>
                      <h4 className="text-xs font-black text-white">{cCat.category}</h4>
                    </div>
                    <span className="text-[10px] font-mono text-pink-400 font-bold">
                      {cCat.captions.length} legendas
                    </span>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {cCat.captions.map((item) => (
                      <div
                        key={item.number}
                        className="p-3 rounded-xl bg-[#0b0612] border border-white/[0.04] space-y-2"
                      >
                        <p className="text-xs text-white/80 leading-relaxed">
                          {item.caption}
                        </p>
                        <div className="flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => copyToClipboard(item.caption, `cap-${cCat.id}-${item.number}`)}
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/15 text-[11px] font-bold text-white flex items-center gap-1 transition"
                          >
                            <Copy className="w-3 h-3" />
                            Copiar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SUB-TAB 4: GUIA DA IDEIA À PUBLICAÇÃO */}
      {activeSubTab === "guia" && (
        <section className="space-y-6">
          <div className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-6 space-y-4">
            <h3 className="text-xl font-black text-white">
              O Fluxo Completo: Da Ideia à Publicação em 7 Etapas
            </h3>
            <p className="text-xs text-white/60 max-w-2xl leading-relaxed">
              Você não precisa começar com uma página em branco. Siga a esteira comprovada da Operação GTA VI
              para criar vídeos em menos de 15 minutos mantendo consistência e retenção máxima.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
              {OPERACAO_FLUXO_PASSOS.map((step) => (
                <div
                  key={step.step}
                  className="p-4 rounded-2xl bg-[#0b0612] border border-white/[0.06] space-y-2 relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{step.icon}</span>
                    <span className="text-xs font-mono font-black text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded">
                      Passo 0{step.step}
                    </span>
                  </div>
                  <h4 className="text-sm font-extrabold text-white mt-1">{step.name}</h4>
                  <p className="text-xs text-white/60 leading-snug">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ROTEIRO MODAL (TELEPROMPTER COMPLETO) */}
      {activeRoteiroModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl max-h-[90vh] rounded-3xl bg-[#130b1f] border border-white/20 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-white/10 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black px-2.5 py-0.5 rounded bg-pink-500/20 text-pink-300 border border-pink-500/30">
                    Roteiro #{activeRoteiroModal.code}
                  </span>
                  <span className="text-xs text-cyan-400 font-bold">
                    ⏱️ {activeRoteiroModal.suggestedDurationSeconds}s sugeridos
                  </span>
                </div>
                <h3 className="text-lg font-black text-white mt-1">
                  {activeRoteiroModal.title}
                </h3>
                <p className="text-xs text-white/60">{activeRoteiroModal.objective}</p>
              </div>

              <button
                type="button"
                onClick={() => setActiveRoteiroModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            {/* Modal Body: Teleprompter Sequence */}
            <div className="p-6 overflow-y-auto space-y-4">
              {/* Gancho */}
              <div className="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-pink-400">
                    1. GANCHO (0–3s) — Retenção Instantânea
                  </span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(activeRoteiroModal.hook, "modal-hook")}
                    className="text-[11px] text-pink-300 font-bold hover:underline"
                  >
                    Copiar
                  </button>
                </div>
                <p className="text-sm font-bold text-white italic leading-relaxed">
                  &quot;{activeRoteiroModal.hook}&quot;
                </p>
              </div>

              {/* Contexto */}
              {activeRoteiroModal.context && (
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400">
                    2. CONTEXTO (3–8s) — Situar o Tema
                  </span>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {activeRoteiroModal.context}
                  </p>
                </div>
              )}

              {/* Desenvolvimento */}
              {activeRoteiroModal.development && (
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white/50">
                    3. DESENVOLVIMENTO / ENTREGA (8–20s) — Informação Principal
                  </span>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {activeRoteiroModal.development}
                  </p>
                </div>
              )}

              {/* Fechamento */}
              {activeRoteiroModal.closing && (
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-white/50">
                    4. FECHAMENTO (20–25s) — Conclusão
                  </span>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {activeRoteiroModal.closing}
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                  5. CTA / CHAMADA PARA AÇÃO (25–30s) — Comentários & Replay
                </span>
                <p className="text-xs font-bold text-white leading-relaxed">
                  {activeRoteiroModal.cta}
                </p>
              </div>

              {/* Mídia Recomendada */}
              <div className="p-4 rounded-2xl bg-[#0b0612] border border-white/10 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-white/60">
                  📁 Material Visual Recomendado na Central:
                </span>
                <p className="text-xs text-white/80">{activeRoteiroModal.recommendedVisual}</p>
                <div className="pt-1">
                  <a
                    href={activeRoteiroModal.gdriveFolderUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:underline"
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    Abrir pasta de cenas no Google Drive
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Modal Footer CTAs */}
            <div className="p-5 border-t border-white/10 flex items-center justify-end gap-3 bg-[#0b0612]">
              <button
                type="button"
                onClick={() => setActiveRoteiroModal(null)}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-white transition"
              >
                Fechar
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSendRoteiroToEditor(activeRoteiroModal);
                  setActiveRoteiroModal(null);
                }}
                className="px-5 py-2.5 rounded-xl btn-neon text-xs font-black text-white flex items-center gap-2 shadow-lg"
              >
                <Film className="w-4 h-4" />
                Carregar no Editor de Vídeo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
