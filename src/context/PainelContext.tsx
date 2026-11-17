"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  EM_ALTA_CHARACTERS,
  TRAILER_SCENES,
  type AspectRatioKey,
  type FramingMode,
  type VideoModelTemplate,
} from "@/data/gta-catalog";
import { OPERACAO_CALENDARIO_30D } from "@/data/operacao-gta";

export type PanelTabId =
  | "editar-video"
  | "roteiros"
  | "em-alta"
  | "cortes-virais"
  | "gerar-imagem"
  | "biblioteca-hd"
  | "baixador-repost"
  | "envio-automatico"
  | "minhas-criacoes"
  | "minha-logo"
  | "minhas-redes"
  | "indique-ganhe"
  | "minha-assinatura";

export interface BrandProfile {
  name: string;
  handle: string;
  avatarText: string;
  avatarUrl: string | null;
  verified: boolean;
  badgeColor: "blue" | "pink" | "gold";
  watermarkOpacity: number;
}

export interface EditorState {
  sceneId: string;
  customVideoUrl: string | null;
  customVideoName: string | null;
  startTimeSeconds: number;
  durationSeconds: number;
  framing: FramingMode;
  zoom: number;
  panOffset: { x: number; y: number };
  caption: string;
  keyword: string;
  videoModelId: VideoModelTemplate["layoutType"];
  accentColor: string;
}

export interface CreationItem {
  id: string;
  type: "video" | "image";
  title: string;
  format: AspectRatioKey;
  durationSeconds?: number;
  modelName: string;
  createdAt: string;
  downloadUrl: string;
  extension: string;
  thumbnailUrl: string;
}

export interface ScheduledPostItem {
  id: string;
  title: string;
  dateTimeLabel: string;
  isoDateTime: string;
  platforms: ("Instagram" | "TikTok" | "YouTube" | "Facebook")[];
  caption: string;
  hashtags: string;
  thumbnailUrl: string;
  status: "Agendado" | "Publicado";
}

export interface DownloadedSourceItem {
  id: string;
  title: string;
  sourceUrl: string;
  durationSeconds: number;
  thumbnailUrl: string;
  videoUrl: string | null;
  cleanCaption: string;
}

export interface SocialConnection {
  id: "instagram" | "tiktok" | "youtube" | "facebook";
  label: string;
  handle: string;
  connected: boolean;
  followers?: string;
  lastSync?: string;
  uploadUrl?: string;
  apiKey?: string;
  autoPublish?: boolean;
}

interface PainelPersistedState {
  brandProfile: BrandProfile;
  editorState: EditorState;
  creations: CreationItem[];
  scheduledPosts: ScheduledPostItem[];
  downloadedVideos: DownloadedSourceItem[];
  socialConnections: SocialConnection[];
  pixKey: string;
  notificationsEnabled: boolean;
}

interface PainelContextValue extends PainelPersistedState {
  activeTab: PanelTabId;
  setActiveTab: (tab: PanelTabId) => void;
  updateBrandProfile: (patch: Partial<BrandProfile>) => void;
  updateEditorState: (patch: Partial<EditorState>) => void;
  openCharacterInEditor: (characterId: string) => void;
  openSceneInEditor: (sceneId: string, customHook?: string, duration?: number) => void;
  addCreation: (item: CreationItem) => void;
  removeCreation: (id: string) => void;
  addScheduledPost: (post: Omit<ScheduledPostItem, "id" | "status">) => void;
  removeScheduledPost: (id: string) => void;
  importCalendario30D: () => void;
  addDownloadedVideo: (video: Omit<DownloadedSourceItem, "id">) => void;
  toggleSocialConnection: (id: SocialConnection["id"], handle?: string) => void;
  updateSocialConnection: (id: SocialConnection["id"], patch: Partial<SocialConnection>) => void;
  setPixKey: (key: string) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const STORAGE_KEY = "gta6gerador_painel_state_v1";

const DEFAULT_PERSISTED_STATE: PainelPersistedState = {
  brandProfile: {
    name: "ViceCriador",
    handle: "@vicecriador",
    avatarText: "VI",
    avatarUrl: null,
    verified: true,
    badgeColor: "blue",
    watermarkOpacity: 0.9,
  },
  editorState: {
    sceneId: TRAILER_SCENES[0].id,
    customVideoUrl: null,
    customVideoName: null,
    startTimeSeconds: 780, // 13:00 matching screenshot
    durationSeconds: 15,
    framing: "centro",
    zoom: 1,
    panOffset: { x: 0, y: 0 },
    caption: "Vice City nunca foi tão real",
    keyword: "Vice City",
    videoModelId: "post-card-light",
    accentColor: "#ec4899",
  },
  creations: [
    {
      id: "demo-creation-1",
      type: "image",
      title: "Capa Lucia Caminos Neon",
      format: "9:16",
      modelName: "Capa clássica",
      createdAt: "Hoje, 19:20",
      downloadUrl: "/media/scenes/scene-03.jpg",
      extension: "jpg",
      thumbnailUrl: "/media/scenes/scene-03.jpg",
    },
  ],
  scheduledPosts: [
    {
      id: "sched-1",
      title: "Vice City nunca foi tão real",
      dateTimeLabel: "sáb., 07/11 · 11:05",
      isoDateTime: "2026-11-16T12:00",
      platforms: ["Instagram", "TikTok"],
      caption: "Vice City nunca foi tão real — olha esse nível de gráfico no GTA 6 🔥",
      hashtags: "#gta6 #vicecity #rockstargames #reels",
      thumbnailUrl: "/media/scenes/scene-01.jpg",
      status: "Agendado",
    },
    {
      id: "sched-2",
      title: "Jason Duval — Detalhes 4K",
      dateTimeLabel: "dom., 08/11 · 18:00",
      isoDateTime: "2026-11-17T18:00",
      platforms: ["Instagram", "YouTube"],
      caption: "Jason Duval vai dominar Leonida! Você já reparou nesse detalhe?",
      hashtags: "#gta6trailer #jasonduval #shorts #gaming",
      thumbnailUrl: "/media/scenes/scene-02.jpg",
      status: "Agendado",
    },
    {
      id: "sched-3",
      title: "Lucia Caminos — Ocean Drive",
      dateTimeLabel: "seg., 09/11 · 21:00",
      isoDateTime: "2026-11-18T21:00",
      platforms: ["TikTok", "Instagram", "Facebook"],
      caption: "Lucia Caminos na avenida neon de Vice City. Hype nas alturas!",
      hashtags: "#luciacaminos #gta6brasil #viral",
      thumbnailUrl: "/media/scenes/scene-03.jpg",
      status: "Agendado",
    },
  ],
  downloadedVideos: [],
  socialConnections: [
    {
      id: "youtube",
      label: "YouTube Shorts",
      handle: "@ViceCriadorTV",
      connected: true,
      followers: "14.2K inscritos",
      lastSync: "Sincronizado hoje às 14:32",
      uploadUrl: "https://studio.youtube.com/channel/upload",
      autoPublish: true,
    },
    {
      id: "tiktok",
      label: "TikTok",
      handle: "@vicecriador",
      connected: true,
      followers: "48.5K seguidores",
      lastSync: "Sincronizado hoje às 12:10",
      uploadUrl: "https://www.tiktok.com/creator-center/upload",
      autoPublish: true,
    },
    {
      id: "instagram",
      label: "Instagram Reels",
      handle: "@vicecriador",
      connected: true,
      followers: "28.1K seguidores",
      lastSync: "Sincronizado ontem às 21:00",
      uploadUrl: "https://www.instagram.com/create/details/",
      autoPublish: true,
    },
    {
      id: "facebook",
      label: "Facebook Reels",
      handle: "",
      connected: false,
      followers: "Aguardando conexão",
      lastSync: "Nunca",
      uploadUrl: "https://business.facebook.com/creatorstudio",
      autoPublish: false,
    },
  ],
  pixKey: "",
  notificationsEnabled: false,
};

const PainelContext = createContext<PainelContextValue | null>(null);

export function PainelProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<PanelTabId>("editar-video");
  const [state, setState] = useState<PainelPersistedState>(DEFAULT_PERSISTED_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<PainelPersistedState>;
        setState((prev) => ({
          ...prev,
          ...parsed,
          brandProfile: { ...prev.brandProfile, ...(parsed.brandProfile ?? {}) },
          editorState: { ...prev.editorState, ...(parsed.editorState ?? {}) },
        }));
      }
    } catch {
      // Ignore storage read error
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      // Avoid persisting transient blob URLs in localStorage
      const safeCreations = state.creations.filter((c) => !c.downloadUrl.startsWith("blob:"));
      const safeDownloads = state.downloadedVideos.map((d) => ({
        ...d,
        videoUrl: d.videoUrl && d.videoUrl.startsWith("blob:") ? null : d.videoUrl,
      }));
      const safeEditor = {
        ...state.editorState,
        customVideoUrl:
          state.editorState.customVideoUrl?.startsWith("blob:")
            ? null
            : state.editorState.customVideoUrl,
      };
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ...state,
          creations: safeCreations,
          downloadedVideos: safeDownloads,
          editorState: safeEditor,
        })
      );
    } catch {
      // Ignore storage write quota errors
    }
  }, [state, hydrated]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3600);
  }, []);

  const updateBrandProfile = useCallback((patch: Partial<BrandProfile>) => {
    setState((prev) => ({
      ...prev,
      brandProfile: { ...prev.brandProfile, ...patch },
    }));
  }, []);

  const updateEditorState = useCallback((patch: Partial<EditorState>) => {
    setState((prev) => ({
      ...prev,
      editorState: { ...prev.editorState, ...patch },
    }));
  }, []);

  const openCharacterInEditor = useCallback((characterId: string) => {
    const char = EM_ALTA_CHARACTERS.find((c) => c.id === characterId);
    if (!char) return;
    setState((prev) => ({
      ...prev,
      editorState: {
        ...prev.editorState,
        sceneId: char.sceneId,
        customVideoUrl: null,
        customVideoName: null,
        startTimeSeconds: char.startSeconds,
        caption: char.defaultHook,
        keyword: char.name,
        panOffset: { x: 0, y: 0 },
      },
    }));
    setActiveTab("editar-video");
  }, []);

  const openSceneInEditor = useCallback(
    (sceneId: string, customHook?: string, duration?: number) => {
      const scene = TRAILER_SCENES.find((s) => s.id === sceneId) ?? TRAILER_SCENES[0];
      setState((prev) => ({
        ...prev,
        editorState: {
          ...prev.editorState,
          sceneId: scene.id,
          customVideoUrl: null,
          customVideoName: null,
          startTimeSeconds: scene.startSeconds,
          durationSeconds: duration ?? prev.editorState.durationSeconds,
          caption: customHook ?? scene.defaultHook,
          panOffset: { x: 0, y: 0 },
        },
      }));
      setActiveTab("editar-video");
    },
    []
  );

  const addCreation = useCallback((item: CreationItem) => {
    setState((prev) => ({
      ...prev,
      creations: [item, ...prev.creations],
    }));
  }, []);

  const removeCreation = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      creations: prev.creations.filter((c) => c.id !== id),
    }));
  }, []);

  const addScheduledPost = useCallback((post: Omit<ScheduledPostItem, "id" | "status">) => {
    const newPost: ScheduledPostItem = {
      ...post,
      id: `sched-${Date.now()}`,
      status: "Agendado",
    };
    setState((prev) => ({
      ...prev,
      scheduledPosts: [newPost, ...prev.scheduledPosts],
    }));
  }, []);

  const removeScheduledPost = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      scheduledPosts: prev.scheduledPosts.filter((p) => p.id !== id),
    }));
  }, []);

  const importCalendario30D = useCallback(() => {
    const newItems: ScheduledPostItem[] = OPERACAO_CALENDARIO_30D.map((dia, idx) => {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + dia.day);
      targetDate.setHours(18, 0, 0, 0);

      const formatted =
        `Dia ${dia.day < 10 ? "0" + dia.day : dia.day} (${targetDate.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" })}) · 18:00`;

      return {
        id: `cal-30d-${dia.day}`,
        title: `Dia ${dia.day < 10 ? "0" + dia.day : dia.day}: ${dia.title}`,
        dateTimeLabel: formatted,
        isoDateTime: targetDate.toISOString(),
        platforms: ["Instagram", "TikTok", "YouTube"],
        caption: `[Dia ${dia.day}/30 - ${dia.category}] ${dia.title}. O que você achou dessa descoberta em GTA VI?`,
        hashtags: "#gtavi #gta6 #operacaogtavi #games #reels",
        thumbnailUrl: TRAILER_SCENES[idx % TRAILER_SCENES.length].imageUrl,
        status: "Agendado",
      };
    });

    setState((prev) => ({
      ...prev,
      scheduledPosts: newItems,
    }));
  }, []);

  const addDownloadedVideo = useCallback((video: Omit<DownloadedSourceItem, "id">) => {
    const item: DownloadedSourceItem = {
      ...video,
      id: `dl-${Date.now()}`,
    };
    setState((prev) => ({
      ...prev,
      downloadedVideos: [item, ...prev.downloadedVideos],
    }));
  }, []);

  const toggleSocialConnection = useCallback(
    (id: SocialConnection["id"], handle?: string) => {
      setState((prev) => ({
        ...prev,
        socialConnections: prev.socialConnections.map((acc) =>
          acc.id === id
            ? {
                ...acc,
                connected: handle !== undefined ? true : !acc.connected,
                handle: handle !== undefined ? handle : acc.handle || prev.brandProfile.handle,
              }
            : acc
        ),
      }));
    },
    []
  );

  const updateSocialConnection = useCallback(
    (id: SocialConnection["id"], patch: Partial<SocialConnection>) => {
      setState((prev) => ({
        ...prev,
        socialConnections: prev.socialConnections.map((acc) =>
          acc.id === id ? { ...acc, ...patch } : acc
        ),
      }));
    },
    []
  );

  const setPixKey = useCallback((key: string) => {
    setState((prev) => ({ ...prev, pixKey: key }));
  }, []);

  const setNotificationsEnabled = useCallback((enabled: boolean) => {
    setState((prev) => ({ ...prev, notificationsEnabled: enabled }));
  }, []);

  return (
    <PainelContext.Provider
      value={{
        ...state,
        activeTab,
        setActiveTab,
        updateBrandProfile,
        updateEditorState,
        openCharacterInEditor,
        openSceneInEditor,
        addCreation,
        removeCreation,
        addScheduledPost,
        removeScheduledPost,
        importCalendario30D,
        addDownloadedVideo,
        toggleSocialConnection,
        updateSocialConnection,
        setPixKey,
        setNotificationsEnabled,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </PainelContext.Provider>
  );
}

export function usePainel() {
  const ctx = useContext(PainelContext);
  if (!ctx) {
    throw new Error("usePainel deve ser usado dentro de PainelProvider");
  }
  return ctx;
}
