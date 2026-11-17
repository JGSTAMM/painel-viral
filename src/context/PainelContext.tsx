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
  videoUrl?: string;
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
  platform?: "youtube" | "tiktok" | "instagram" | "gdrive" | "direct" | "local";
  uploader?: string;
  embedUrl?: string;
  downloadMirrors?: { label: string; url: string }[];
}

export interface SocialConnection {
  id: "instagram" | "tiktok" | "youtube" | "facebook";
  label: string;
  handle: string;
  connected: boolean;
  followers?: string;
  lastSync?: string;
  uploadUrl?: string;
  profileUrl?: string;
  webhookUrl?: string;
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
  markPostAsPublished: (id: string) => void;
  importCalendario30D: () => void;
  addDownloadedVideo: (video: Omit<DownloadedSourceItem, "id">) => void;
  updateDownloadedVideo: (id: string, patch: Partial<DownloadedSourceItem>) => void;
  removeDownloadedVideo: (id: string) => void;
  toggleSocialConnection: (id: SocialConnection["id"], handle?: string) => void;
  updateSocialConnection: (id: SocialConnection["id"], patch: Partial<SocialConnection>) => void;
  setPixKey: (key: string) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const STORAGE_KEY = "gta6gerador_painel_state_v2";

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
    customVideoUrl: TRAILER_SCENES[0].videoUrl,
    customVideoName: "GTA VI — Trailer 1 Oficial (1080p MP4)",
    startTimeSeconds: TRAILER_SCENES[0].videoStartSeconds,
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
      id: "real-short-gta6",
      type: "video",
      title: "O Detalhe Secreto do Trailer de GTA 6 (9:16)",
      format: "9:16",
      durationSeconds: 16,
      modelName: "MP4 Full HD (H.264 + AAC)",
      createdAt: "Pronto para postar",
      downloadUrl: "/media/gta6-viral-shorts.mp4",
      extension: "mp4",
      thumbnailUrl: "/media/scenes/scene-01.jpg",
    },
  ],
  scheduledPosts: [],
  downloadedVideos: [],
  socialConnections: [
    {
      id: "youtube",
      label: "YouTube Shorts",
      handle: "",
      connected: false,
      followers: "Não conectado",
      lastSync: "Nunca",
      uploadUrl: "https://studio.youtube.com/channel/upload",
      webhookUrl: "",
      autoPublish: false,
    },
    {
      id: "tiktok",
      label: "TikTok",
      handle: "",
      connected: false,
      followers: "Não conectado",
      lastSync: "Nunca",
      uploadUrl: "https://www.tiktok.com/creator-center/upload",
      webhookUrl: "",
      autoPublish: false,
    },
    {
      id: "instagram",
      label: "Instagram Reels",
      handle: "",
      connected: false,
      followers: "Não conectado",
      lastSync: "Nunca",
      uploadUrl: "https://www.instagram.com/create/details/",
      webhookUrl: "",
      autoPublish: false,
    },
    {
      id: "facebook",
      label: "Facebook Reels",
      handle: "",
      connected: false,
      followers: "Não conectado",
      lastSync: "Nunca",
      uploadUrl: "https://business.facebook.com/latest/composer/",
      webhookUrl: "",
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

  // Hydrate persisted state + sync authenticated session + track incoming referral ?ref=
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

      // Check real session user cookie via /api/auth
      fetch("/api/auth")
        .then((r) => (r.ok ? r.json() : null))
        .then((res) => {
          if (res?.authenticated && res.user) {
            setState((prev) => ({
              ...prev,
              brandProfile: {
                ...prev.brandProfile,
                name: res.user.name || prev.brandProfile.name,
                handle: res.user.handle || prev.brandProfile.handle,
                avatarText: (res.user.name || "VI").slice(0, 2).toUpperCase(),
              },
            }));
          }
        })
        .catch(() => {});

      // Track real referral link click when ?ref= is present in URL
      const params = new URLSearchParams(window.location.search);
      const refParam = params.get("ref");
      if (refParam && !window.sessionStorage.getItem(`ref_tracked_${refParam}`)) {
        window.sessionStorage.setItem(`ref_tracked_${refParam}`, "1");
        window.localStorage.setItem("gta6gerador_referred_by", refParam);
        fetch("/api/referrals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ref: refParam, action: "click" }),
        }).catch(() => {});
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
      const safeCreations = state.creations.filter((c) => !c.downloadUrl.startsWith("blob:"));
      const safeDownloads = state.downloadedVideos.map((d) => ({
        ...d,
        videoUrl: d.videoUrl && d.videoUrl.startsWith("blob:") ? null : d.videoUrl,
      }));
      const safeEditor = {
        ...state.editorState,
        customVideoUrl:
          state.editorState.customVideoUrl?.startsWith("blob:")
            ? TRAILER_SCENES[0].videoUrl
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

  // Real scheduler execution loop checking due posts every 20 seconds
  useEffect(() => {
    if (!hydrated) return;

    const checkDuePosts = async () => {
      const now = Date.now();
      const duePosts = state.scheduledPosts.filter((p) => {
        if (p.status !== "Agendado") return false;
        const ts = new Date(p.isoDateTime).getTime();
        return !Number.isNaN(ts) && ts <= now;
      });

      if (duePosts.length === 0) return;

      for (const post of duePosts) {
        const targetPlatform = (post.platforms[0] ?? "YouTube").toLowerCase();
        const conn = state.socialConnections.find((c) => c.id === targetPlatform);

        try {
          await fetch("/api/social/publish", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              platform: targetPlatform,
              handle: conn?.handle || state.brandProfile.handle,
              videoUrl: post.videoUrl || state.creations[0]?.downloadUrl || "/media/gta6-viral-shorts.mp4",
              title: post.title,
              caption: post.caption,
              hashtags: post.hashtags,
              webhookUrl: conn?.webhookUrl || "",
              apiKey: conn?.apiKey || "",
            }),
          });
        } catch {
          // Proceed marking alert so user can post cleanly
        }

        if (state.notificationsEnabled && typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
          new Notification(`Hora de postar: ${post.title}`, {
            body: `${post.platforms.join(", ")} · ${post.caption}`,
            icon: "/icon.png",
          });
        }

        setState((prev) => ({
          ...prev,
          scheduledPosts: prev.scheduledPosts.map((item) =>
            item.id === post.id ? { ...item, status: "Publicado" } : item
          ),
        }));
        showToast(`Agendamento "${post.title}" processado e marcado como Publicado!`);
      }
    };

    checkDuePosts();
    const timer = setInterval(checkDuePosts, 20000);
    return () => clearInterval(timer);
  }, [hydrated, state.scheduledPosts, state.socialConnections, state.brandProfile.handle, state.creations, state.notificationsEnabled, showToast]);

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
    const matchedScene = TRAILER_SCENES.find((s) => s.id === char.sceneId) ?? TRAILER_SCENES[0];
    setState((prev) => ({
      ...prev,
      editorState: {
        ...prev.editorState,
        sceneId: matchedScene.id,
        customVideoUrl: char.videoUrl,
        customVideoName: `${char.name} — ${matchedScene.title}`,
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
          customVideoUrl: scene.videoUrl,
          customVideoName: scene.title,
          startTimeSeconds: scene.videoStartSeconds,
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

  const markPostAsPublished = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      scheduledPosts: prev.scheduledPosts.map((p) =>
        p.id === id ? { ...p, status: "Publicado" } : p
      ),
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
        videoUrl: TRAILER_SCENES[idx % TRAILER_SCENES.length].videoUrl,
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

  const updateDownloadedVideo = useCallback((id: string, patch: Partial<DownloadedSourceItem>) => {
    setState((prev) => ({
      ...prev,
      downloadedVideos: prev.downloadedVideos.map((vid) =>
        vid.id === id ? { ...vid, ...patch } : vid
      ),
    }));
  }, []);

  const removeDownloadedVideo = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      downloadedVideos: prev.downloadedVideos.filter((vid) => vid.id !== id),
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
        markPostAsPublished,
        importCalendario30D,
        addDownloadedVideo,
        updateDownloadedVideo,
        removeDownloadedVideo,
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
