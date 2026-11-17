"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Sparkles, UserPlus } from "lucide-react";
import { EM_ALTA_CHARACTERS } from "@/data/gta-catalog";
import { CREATOR_CREDIT } from "@/lib/seo-config";

export default function EntrarPage() {
  const router = useRouter();
  const [charIdx, setCharIdx] = useState(0);
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetFeedback, setResetFeedback] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const spotlightChars = EM_ALTA_CHARACTERS.slice(0, 3);
  const currentChar = spotlightChars[charIdx];

  useEffect(() => {
    const timer = setInterval(() => {
      setCharIdx((prev) => (prev + 1) % spotlightChars.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [spotlightChars.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || password.length < 4) {
      setErrorMsg("Informe seu usuário/e-mail e uma senha com pelo menos 4 caracteres.");
      return;
    }

    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: mode,
          identifier: username.trim(),
          name: name.trim() || username.trim().split("@")[0],
          password,
          remember,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || "Não foi possível autenticar.");
        return;
      }

      if (typeof window !== "undefined") {
        window.localStorage.setItem("gta6gerador_session_user", JSON.stringify(data.user));
        // Sync brandProfile in painel state if user logged in or registered
        try {
          const rawState = window.localStorage.getItem("gta6gerador_painel_state_v1");
          const parsedState = rawState ? JSON.parse(rawState) : {};
          const nextState = {
            ...parsedState,
            brandProfile: {
              ...(parsedState.brandProfile || {}),
              name: data.user.name,
              handle: data.user.handle,
              avatarText: data.user.name.slice(0, 2).toUpperCase(),
            },
          };
          window.localStorage.setItem("gta6gerador_painel_state_v1", JSON.stringify(nextState));
        } catch {
          // Ignore localStorage parse failures
        }

        // If registered from an affiliate referral, record real conversion
        const refSlug = window.localStorage.getItem("gta6gerador_referred_by");
        if (mode === "register" && refSlug && refSlug !== data.user.username) {
          await fetch("/api/referrals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ref: refSlug,
              action: "convert",
              buyer: data.user.handle,
            }),
          }).catch(() => {});
          window.localStorage.removeItem("gta6gerador_referred_by");
        }
      }

      router.push("/usuario");
    } catch {
      setErrorMsg("Falha de conexão com o servidor de autenticação.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail.trim()) return;
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reset_password", identifier: resetEmail.trim() }),
      });
      const data = await res.json();
      setResetFeedback(data.message || "Solicitação processada.");
    } catch {
      setResetFeedback("Erro ao solicitar redefinição de senha.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0612] text-white flex flex-col justify-between p-4 md:p-8 relative overflow-hidden">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-cyan-500/15 blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[440px] h-[440px] rounded-full bg-pink-600/20 blur-[140px]" />
      </div>

      <header className="relative z-10 max-w-5xl w-full mx-auto pt-2 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 via-pink-500 to-fuchsia-600 p-[1.5px]">
            <div className="w-full h-full bg-[#0b0612] rounded-[10px] flex items-center justify-center font-display text-base grad-text">
              VI
            </div>
          </div>
          <span className="font-display text-xl tracking-wider text-white">
            GTA <span className="text-pink-500">6</span> GERADOR
          </span>
        </Link>

        <Link
          href="/usuario"
          className="text-xs font-bold text-cyan-300 hover:text-white transition flex items-center gap-1"
        >
          Acessar Estúdio
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      <main className="relative z-10 max-w-5xl w-full mx-auto my-8">
        <div className="grid md:grid-cols-2 rounded-[28px] overflow-hidden border border-white/[0.1] bg-[#130b1f]/90 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
          <section className="p-7 md:p-10 bg-gradient-to-br from-[#1d0f31] via-[#130b1f] to-[#0b0612] border-b md:border-b-0 md:border-r border-white/[0.08] flex flex-col justify-between gap-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/40 text-[10px] font-extrabold tracking-[0.14em] uppercase text-pink-300">
                <Sparkles className="w-3 h-3" />
                PAINEL DO CRIADOR
              </span>
              <h1 className="font-display text-4xl md:text-[2.75rem] leading-[1.02] text-white uppercase">
                Seu gerador está <span className="grad-text">pronto</span>
              </h1>
            </div>

            <div className="relative rounded-2xl overflow-hidden border border-white/15 aspect-[16/10] bg-[#0b0612]">
              <img
                src={currentChar.imageUrl}
                alt={`${currentChar.name} — personagem em destaque no GTA 6 Gerador`}
                className="w-full h-full object-cover transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0612] via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-cyan-300">
                    {currentChar.loopCode}
                  </div>
                  <div className="font-display text-xl text-white">{currentChar.name}</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-pink-500 text-[10px] font-extrabold text-white">
                  FULL HD
                </span>
              </div>
            </div>

            <ul className="grid grid-cols-3 gap-3 pt-1">
              <li className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-3">
                <div className="text-lg font-extrabold text-white">651+</div>
                <div className="text-[11px] text-white/55">arquivos Drive</div>
              </li>
              <li className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-3">
                <div className="text-lg font-extrabold text-pink-400">90</div>
                <div className="text-[11px] text-white/55">roteiros prontos</div>
              </li>
              <li className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-3">
                <div className="text-lg font-extrabold text-cyan-300">MP4</div>
                <div className="text-[11px] text-white/55">corte com áudio</div>
              </li>
            </ul>
          </section>

          <section className="p-7 md:p-10 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#0b0612] border border-white/[0.08] mb-5">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setErrorMsg(null);
                }}
                className={`py-2 rounded-xl text-xs font-bold transition ${
                  mode === "login" ? "btn-neon text-white" : "text-white/60 hover:text-white"
                }`}
              >
                Entrar na conta
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setErrorMsg(null);
                }}
                className={`py-2 rounded-xl text-xs font-bold transition ${
                  mode === "register" ? "btn-neon text-white" : "text-white/60 hover:text-white"
                }`}
              >
                Criar conta
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <h2 className="text-2xl font-extrabold text-white">
                  {mode === "login" ? "Bem-vindo de volta" : "Criar conta de criador"}
                </h2>
                <p className="text-xs text-white/60 mt-1">
                  {mode === "login"
                    ? "Entre com suas credenciais reais registradas."
                    : "Cadastre seu usuário para salvar marca, redes e comissões PIX."}
                </p>
              </div>

              {errorMsg && (
                <div
                  role="alert"
                  className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-xs text-red-200"
                >
                  {errorMsg}
                </div>
              )}

              {mode === "register" && (
                <div className="space-y-1.5">
                  <label htmlFor="reg-name" className="text-xs font-semibold text-white/80 block">
                    Nome do seu canal / perfil
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Cortes Vice City"
                    className="w-full px-4 py-3 rounded-2xl bg-[#0b0612] border border-white/10 text-sm text-white focus:outline-none focus:border-pink-500"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label
                  htmlFor="login-username"
                  className="text-xs font-semibold text-white/80 block"
                >
                  Usuário ou e-mail
                </label>
                <input
                  id="login-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="seu@email.com ou @canal"
                  required
                  className="w-full px-4 py-3 rounded-2xl bg-[#0b0612] border border-white/10 text-sm text-white focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="login-password"
                    className="text-xs font-semibold text-white/80"
                  >
                    Senha
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowForgot((v) => !v);
                        setResetFeedback(null);
                      }}
                      className="text-xs font-semibold text-pink-400 hover:underline"
                    >
                      Esqueci a senha
                    </button>
                  )}
                </div>

                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 4 caracteres"
                    required
                    className="w-full pl-4 pr-11 py-3 rounded-2xl bg-[#0b0612] border border-white/10 text-sm text-white focus:outline-none focus:border-pink-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {showForgot && mode === "login" && (
                <div className="p-4 rounded-2xl bg-[#0b0612] border border-pink-500/35 space-y-2.5">
                  <p className="text-xs text-white/75">
                    Informe seu usuário ou e-mail para registrar a recuperação:
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      placeholder="seu usuário ou e-mail"
                      className="flex-1 px-3 py-2 rounded-xl bg-[#130b1f] border border-white/10 text-xs text-white"
                    />
                    <button
                      type="button"
                      onClick={handleResetPassword}
                      className="px-3.5 py-2 rounded-xl bg-pink-500 text-xs font-bold text-white"
                    >
                      Enviar
                    </button>
                  </div>
                  {resetFeedback && (
                    <p className="text-[11px] text-emerald-300 font-semibold">{resetFeedback}</p>
                  )}
                </div>
              )}

              <label className="flex items-center gap-2.5 text-xs text-white/75 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-pink-500 w-4 h-4 rounded"
                />
                Manter este dispositivo conectado
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-5 rounded-2xl btn-neon text-sm font-extrabold text-white flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : mode === "login" ? (
                  <Lock className="w-4 h-4" />
                ) : (
                  <UserPlus className="w-4 h-4" />
                )}
                {isSubmitting
                  ? "Autenticando..."
                  : mode === "login"
                    ? "Entrar na conta"
                    : "Criar conta e entrar"}
              </button>

              <div className="pt-2 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs text-white/60">
                <span>Acesso imediato ao editor?</span>
                <Link href="/usuario" className="text-cyan-300 font-bold hover:underline">
                  Abrir Painel do Criador →
                </Link>
              </div>
            </form>
          </section>
        </div>
      </main>

      <footer className="relative z-10 max-w-5xl w-full mx-auto text-center text-xs text-white/50 space-y-1">
        <p>Ambiente seguro · GTA 6 GERADOR — Painel do Criador</p>
        <p className="font-semibold text-white/70">{CREATOR_CREDIT}</p>
      </footer>
    </div>
  );
}
