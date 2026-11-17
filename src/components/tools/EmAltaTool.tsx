"use client";

import React, { useMemo, useState } from "react";
import { Compass, Flame, Play, Search, Sparkles, Target, Trophy, Zap } from "lucide-react";
import { EM_ALTA_CHARACTERS } from "@/data/gta-catalog";
import { OPERACAO_MAPA_OPORTUNIDADES, type OperacaoSubnicho } from "@/data/operacao-gta";
import { usePainel } from "@/context/PainelContext";

export function EmAltaTool() {
  const { openCharacterInEditor, updateEditorState, setActiveTab, showToast } = usePainel();
  const topThree = EM_ALTA_CHARACTERS.slice(0, 3);
  const loopOthers = EM_ALTA_CHARACTERS.slice(3);

  const [oppSearch, setOppSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("Todos");

  const filteredOpportunities = useMemo(() => {
    return OPERACAO_MAPA_OPORTUNIDADES.filter((opp) => {
      const matchDiff = difficultyFilter === "Todos" || opp.difficulty === difficultyFilter;
      const matchSearch =
        !oppSearch ||
        opp.title.toLowerCase().includes(oppSearch.toLowerCase()) ||
        opp.description.toLowerCase().includes(oppSearch.toLowerCase()) ||
        opp.ideas.some((i) => i.toLowerCase().includes(oppSearch.toLowerCase()));
      return matchDiff && matchSearch;
    });
  }, [difficultyFilter, oppSearch]);

  const handleOpen = (charId: string, name: string) => {
    openCharacterInEditor(charId);
    showToast(`Cena de ${name} carregada no Editor de Vídeo!`);
  };

  const handleProduceIdea = (title: string, ideaText: string) => {
    updateEditorState({
      caption: ideaText,
      keyword: title,
    });
    setActiveTab("editar-video");
    showToast(`Ideia "${ideaText.slice(0, 35)}..." carregada no Editor!`);
  };

  return (
    <div className="space-y-8">
      {/* Top 3 do momento section */}
      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-5 md:p-6 space-y-5">
        <div>
          <div className="flex items-center gap-2.5">
            <Trophy className="w-6 h-6 text-amber-400" />
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              Top 3 do momento
            </h2>
          </div>
          <p className="text-sm text-white/65 mt-1">
            Os personagens que mais rendem visualização agora. Toque em{" "}
            <strong className="text-white">Criar Reels</strong> e o vídeo já abre pronto
            para editar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {topThree.map((char) => (
            <article
              key={char.id}
              className="group relative rounded-2xl overflow-hidden bg-[#0b0612] border border-white/[0.1] hover:border-pink-500/60 transition flex flex-col"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={char.imageUrl}
                  alt={`${char.name} — cena em alta do GTA 6`}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0612] via-[#0b0612]/25 to-transparent" />

                {/* Rank Number */}
                <span className="absolute top-3 left-3 w-8 h-8 rounded-lg bg-amber-400 text-[#0b0612] font-extrabold text-sm flex items-center justify-center shadow-lg">
                  {char.rank}
                </span>

                {/* Status Badge */}
                <span
                  className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-extrabold shadow ${
                    char.badgeVariant === "hot"
                      ? "bg-red-500/90 text-white"
                      : char.badgeVariant === "star"
                        ? "bg-amber-500/90 text-[#0b0612]"
                        : "bg-sky-500/90 text-white"
                  }`}
                >
                  {char.badge}
                </span>

                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-300">
                    {char.loopCode} · {char.timestamp}
                  </div>
                  <h3 className="font-display text-2xl text-white tracking-wide">
                    {char.name}
                  </h3>
                  <p className="text-xs text-white/75 line-clamp-2 mt-0.5">
                    &ldquo;{char.defaultHook}&rdquo;
                  </p>
                </div>
              </div>

              <div className="p-3.5 mt-auto">
                <button
                  type="button"
                  onClick={() => handleOpen(char.id, char.name)}
                  className="w-full py-2.5 px-4 rounded-xl btn-neon text-xs font-extrabold text-white flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Criar Reels
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Demais Animações em Loop (LOOP 04 - LOOP 08) */}
      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-5 md:p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-pink-400">
              <Flame className="w-3.5 h-3.5" />
              ANIMAÇÕES EM LOOP
            </span>
            <h2 className="text-lg font-extrabold text-white mt-0.5">
              Personagens que ganham vida
            </h2>
            <p className="text-xs text-white/60">
              Clipes curtos em loop infinito, prontos pra virar intro, transição ou gancho dos
              seus cortes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {loopOthers.map((char) => (
            <article
              key={char.id}
              className="rounded-2xl overflow-hidden bg-[#0b0612] border border-white/[0.08] hover:border-cyan-400/50 transition flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={char.imageUrl}
                  alt={char.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0612] to-transparent" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-[10px] font-bold text-white/85">
                  {char.loopCode}
                </span>
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded bg-pink-500/80 text-[10px] font-bold text-white">
                  {char.badge}
                </span>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm text-white">{char.name}</h3>
                  <p className="text-[11px] text-white/55 line-clamp-2 mt-0.5">
                    {char.defaultHook}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleOpen(char.id, char.name)}
                  className="w-full py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-pink-500/25 border border-white/10 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  Criar Reels
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Mapa de Oportunidades GTA VI (40 Subnichos & 120 Ideias) */}
      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-5 md:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-widest uppercase text-cyan-400">
              <Compass className="w-3.5 h-3.5" />
              MAPA DE OPORTUNIDADES
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-white mt-0.5">
              40 Subnichos & 120 Ideias de Vídeo
            </h2>
            <p className="text-xs text-white/60 mt-1 max-w-2xl">
              Navegue pelos temas com maior potencial de retenção em GTA VI. Cada subnicho conta com 3 ângulos concretos prontos para produzir.
            </p>
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 bg-[#0b0612] p-1.5 rounded-2xl border border-white/[0.08]">
            {["Todos", "Fácil", "Média", "Avançada"].map((diff) => (
              <button
                key={diff}
                type="button"
                onClick={() => setDifficultyFilter(diff)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  difficultyFilter === diff
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={oppSearch}
            onChange={(e) => setOppSearch(e.target.value)}
            placeholder="Pesquisar por subnicho (ex: Física, Carros, Lucia, Easter Eggs, Inteligência Artificial)..."
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-[#0b0612] border border-white/[0.1] text-xs text-white placeholder-white/40 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredOpportunities.map((opp) => (
            <article
              key={opp.number}
              className="p-5 rounded-2xl bg-[#0b0612] border border-white/[0.08] hover:border-cyan-400/40 transition space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 text-xs font-mono font-bold flex items-center justify-center border border-cyan-400/30">
                      #{opp.number}
                    </span>
                    <h3 className="font-extrabold text-sm text-white">
                      {opp.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        opp.difficulty === "Fácil"
                          ? "bg-emerald-500/20 text-emerald-300"
                          : opp.difficulty === "Média"
                            ? "bg-amber-500/20 text-amber-300"
                            : "bg-red-500/20 text-red-300"
                      }`}
                    >
                      {opp.difficulty}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-500/20 text-pink-300">
                      {opp.potential}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-white/65 leading-relaxed">
                  {opp.description}
                </p>
              </div>

              {/* Ideas */}
              <div className="space-y-2 pt-2 border-t border-white/[0.06]">
                <span className="text-[10px] font-extrabold tracking-wider uppercase text-cyan-300 flex items-center gap-1">
                  <Target className="w-3 h-3" /> 3 Ângulos Prontos para Gravar:
                </span>
                <div className="space-y-1.5">
                  {opp.ideas.map((idea, i) => (
                    <div
                      key={i}
                      className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center justify-between gap-2 group hover:border-cyan-400/40 transition"
                    >
                      <span className="text-[11px] text-white/80 group-hover:text-white line-clamp-1">
                        {idea}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleProduceIdea(opp.title, idea)}
                        className="shrink-0 px-2.5 py-1 rounded-lg bg-cyan-500/20 hover:bg-cyan-500 text-[10px] font-bold text-white transition flex items-center gap-1"
                      >
                        <Zap className="w-2.5 h-2.5 fill-current" />
                        Produzir
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
