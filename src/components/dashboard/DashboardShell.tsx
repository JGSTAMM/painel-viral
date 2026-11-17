"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Calendar,
  CreditCard,
  Download,
  Film,
  Flame,
  FolderOpen,
  Image as ImageIcon,
  Link2,
  LogOut,
  Menu,
  Pencil,
  Scissors,
  Share2,
  Star,
  X,
  BookOpen,
} from "lucide-react";
import { usePainel, type PanelTabId } from "@/context/PainelContext";

interface NavItemConfig {
  id: PanelTabId;
  label: string;
  subtitle?: string;
  badge?: string;
  badgeVariant?: "pink" | "cyan" | "solid";
  icon: React.ComponentType<{ className?: string }>;
}

const TAB_TITLES: Record<PanelTabId, string> = {
  "editar-video": "Editar Vídeo",
  "roteiros": "Roteiros & Arsenal (80+10)",
  "em-alta": "Em Alta",
  "cortes-virais": "Cortes Virais",
  "gerar-imagem": "Gerar Imagem",
  "biblioteca-hd": "Biblioteca HD",
  "baixador-repost": "Baixador & Repost",
  "envio-automatico": "Envio Automático",
  "minhas-criacoes": "Minhas Criações",
  "minha-logo": "Minha Logo",
  "minhas-redes": "Minhas Redes",
  "indique-ganhe": "Indique e Ganhe",
  "minha-assinatura": "Minha Assinatura",
};

const SIDEBAR_GROUPS: { title: string; items: NavItemConfig[] }[] = [
  {
    title: "CRIAR",
    items: [
      { id: "roteiros", label: "Roteiros & Arsenal", badge: "80+10", badgeVariant: "pink", icon: BookOpen },
      { id: "cortes-virais", label: "Cortes Virais", badge: "NOVO", badgeVariant: "pink", icon: Scissors },
      { id: "gerar-imagem", label: "Gerar Imagem", badge: "NOVO", badgeVariant: "pink", icon: ImageIcon },
    ],
  },
  {
    title: "BIBLIOTECA",
    items: [
      { id: "biblioteca-hd", label: "Biblioteca HD", icon: Film },
      { id: "baixador-repost", label: "Baixador & Repost", icon: Download },
    ],
  },
  {
    title: "AUTOMAÇÃO",
    items: [
      { id: "envio-automatico", label: "Envio Automático", badge: "NOVO", badgeVariant: "pink", icon: Calendar },
    ],
  },
  {
    title: "CONTA",
    items: [
      { id: "minhas-criacoes", label: "Minhas Criações", icon: FolderOpen },
      { id: "minha-logo", label: "Minha Logo", icon: Star },
      { id: "minhas-redes", label: "Minhas Redes", icon: Share2 },
      { id: "indique-ganhe", label: "Indique e Ganhe", badge: "50%", badgeVariant: "pink", icon: Link2 },
      { id: "minha-assinatura", label: "Minha Assinatura", icon: CreditCard },
    ],
  },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { activeTab, setActiveTab, brandProfile, toastMessage } = usePainel();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectTab = (tab: PanelTabId) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const renderSidebarContent = () => (
    <div className="flex flex-col h-full bg-[#0e0817] border-r border-white/[0.08] select-none">
      {/* Brand header */}
      <div className="px-4 pt-5 pb-4 flex items-center justify-between border-b border-white/[0.06]">
        <Link href="/usuario" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 via-pink-500 to-fuchsia-600 p-[1.5px] shadow-[0_0_16px_rgba(236,72,153,0.45)]">
            <div className="w-full h-full bg-[#0b0612] rounded-[6px] flex items-center justify-center font-display text-sm grad-text">
              VI
            </div>
          </div>
          <div className="font-display text-lg tracking-wider text-white">
            GTA <span className="text-pink-500">6</span> GERADOR
          </div>
        </Link>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="lg:hidden p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10"
          aria-label="Fechar menu lateral"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5" aria-label="Menu do painel">
        {/* Highlighted Principal Button: Editar Vídeo */}
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => handleSelectTab("editar-video")}
            className={`w-full text-left rounded-2xl p-3 transition-all border ${
              activeTab === "editar-video"
                ? "bg-gradient-to-r from-pink-500/25 via-fuchsia-600/20 to-purple-600/15 border-pink-500/70 shadow-[0_0_24px_rgba(236,72,153,0.28)]"
                : "bg-white/[0.04] border-white/[0.08] hover:border-pink-500/40"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-fuchsia-600 flex items-center justify-center text-white shrink-0 shadow">
                <Pencil className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-sm font-bold text-white truncate">Editar Vídeo</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-white/95 text-[#0b0612] tracking-wide">
                    PRINCIPAL
                  </span>
                </div>
                <p className="text-[11px] text-white/65 truncate mt-0.5">
                  Monte seu Reels em 1 minuto
                </p>
              </div>
            </div>
          </button>

          {/* Em Alta quick tab */}
          <button
            type="button"
            onClick={() => handleSelectTab("em-alta")}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "em-alta"
                ? "bg-pink-500/20 text-white border border-pink-500/50"
                : "text-white/75 hover:text-white hover:bg-white/[0.05] border border-transparent"
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Flame className="w-4 h-4 text-orange-400" />
              Em Alta
            </span>
            <span className="text-xs" aria-hidden="true">
              🔥
            </span>
          </button>
        </div>

        {/* Grouped Menu Items */}
        {SIDEBAR_GROUPS.map((group) => (
          <div key={group.title} className="space-y-1">
            <div className="px-3 pb-1 text-[10px] font-bold tracking-[0.14em] text-white/40 uppercase">
              {group.title}
            </div>
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all border ${
                    isActive
                      ? "bg-gradient-to-r from-pink-500/20 to-purple-500/15 text-white border-pink-500/50 shadow-[0_0_16px_rgba(236,72,153,0.18)]"
                      : "text-white/70 hover:text-white hover:bg-white/[0.05] border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${isActive ? "text-pink-400" : "text-white/50"}`}
                    />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded-md text-[10px] font-extrabold bg-pink-500/20 text-pink-300 border border-pink-500/35">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom User Card */}
      <div className="p-3 border-t border-white/[0.08]">
        <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center font-extrabold text-xs text-white shrink-0 overflow-hidden">
              {brandProfile.avatarUrl ? (
                <img
                  src={brandProfile.avatarUrl}
                  alt={`Avatar de ${brandProfile.name}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                brandProfile.avatarText.slice(0, 1).toUpperCase()
              )}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">
                {brandProfile.handle.replace(/^@/, "") || "vicecriador"}
              </div>
              <div className="text-[11px] text-white/50">Plano Anual</div>
            </div>
          </div>
          <Link
            href="/entrar"
            title="Trocar conta ou sair"
            aria-label="Sair para tela de login"
            className="p-1.5 rounded-lg text-white/50 hover:text-pink-400 hover:bg-white/5 transition"
          >
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0b0612] text-white flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative z-10 w-72 max-w-[85vw] h-full">
            {renderSidebarContent()}
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 px-4 md:px-6 bg-[#0b0612]/90 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white/80 hover:text-white"
              aria-label="Abrir menu lateral"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-base md:text-lg font-bold text-white truncate">
              {TAB_TITLES[activeTab]} <span className="sr-only">— Painel do Criador GTA 6 Gerador</span>
            </h1>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Assinatura ativa
            </span>
            <button
              type="button"
              onClick={() => setActiveTab("editar-video")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full btn-neon text-xs md:text-sm font-bold text-white"
            >
              <Pencil className="w-3.5 h-3.5" />
              Editar vídeo
            </button>
          </div>
        </header>

        {/* Active Tool Canvas */}
        <main className="flex-1 p-4 md:p-6 max-w-[1440px] w-full mx-auto">{children}</main>

        {/* Toast feedback */}
        {toastMessage && (
          <div
            role="status"
            aria-live="polite"
            className="fixed bottom-5 right-5 z-50 px-4 py-3 rounded-2xl bg-[#1a0f2b] border border-pink-500/50 shadow-[0_10px_30px_rgba(236,72,153,0.35)] text-sm font-semibold text-white flex items-center gap-2.5"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  );
}
