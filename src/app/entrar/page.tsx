"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Eye, EyeOff, Lock, Sparkles } from "lucide-react";
import { EM_ALTA_CHARACTERS } from "@/data/gta-catalog";
import { CREATOR_CREDIT } from "@/lib/seo-config";

export default function EntrarPage() {
  const router = useRouter();
  const [charIdx, setCharIdx] = useState(0);
  const [username, setUsername] = useState("vicecriador");
  const [password, setPassword] = useState("gta6gerador2026");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const spotlightChars = EM_ALTA_CHARACTERS.slice(0, 3);
  const currentChar = spotlightChars[charIdx];

  useEffect(() => {
    const timer = setInterval(() => {
      setCharIdx((prev) => (prev + 1) % spotlightChars.length);
    }, 3600);
    return () => clearInterval(timer);
  }, [spotlightChars.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorMsg("Informe seu usuário ou e-mail e sua senha para entrar.");
      return;
    }
    setErrorMsg(null);
    if (remember && typeof window !== "undefined") {
      window.localStorage.setItem("gta6gerador_session_user", username.trim());
    }
    router.push("/usuario");
  };

  return (
    <div className="min-h-screen bg-[#0b0612] text-white flex flex-col justify-between p-4 md:p-8 relative overflow-hidden">
      {/* Background Vice Neon glows */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-32 -left-24 w-96 h-96 rounded-full bg-cyan-500/15 blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[440px] h-[440px] rounded-full bg-pink-600/20 blur-[140px]" />
      </div>

      {/* Top Logo */}
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
          Ir direto para o Painel
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </header>

      {/* Main Split Card matching painel_login.png */}
      <main className="relative z-10 max-w-5xl w-full mx-auto my-8">
        <div className="grid md:grid-cols-2 rounded-[28px] overflow-hidden border border-white/[0.1] bg-[#130b1f]/90 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.65)]">
          {/* Left Panel: Showcase */}
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

            {/* Rotating Character Card */}
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
                  NOVO
                </span>
              </div>
            </div>

            {/* 3 Metrics Row */}
            <ul className="grid grid-cols-3 gap-3 pt-1">
              <li className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-3">
                <div className="text-lg font-extrabold text-white">+80</div>
                <div className="text-[11px] text-white/55">cenas em HD</div>
              </li>
              <li className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-3">
                <div className="text-lg font-extrabold text-pink-400">∞</div>
                <div className="text-[11px] text-white/55">cortes por mês</div>
              </li>
              <li className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-3">
                <div className="text-lg font-extrabold text-cyan-300">1 clique</div>
                <div className="text-[11px] text-white/55">pra postar</div>
              </li>
            </ul>
          </section>

          {/* Right Panel: Login Form */}
          <section className="p-7 md:p-10 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="text-2xl font-extrabold text-white">Bem-vindo de volta</h2>
                <p className="text-xs text-white/60 mt-1">
                  Entre com o usuário e a senha que você recebeu.
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
                  placeholder="seu usuário ou e-mail"
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
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgot((v) => !v);
                      setResetSent(false);
                    }}
                    className="text-xs font-semibold text-pink-400 hover:underline"
                  >
                    Esqueci a senha
                  </button>
                </div>

                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-4 pr-11 py-3 rounded-2xl bg-[#0b0612] border border-white/10 text-sm text-white focus:outline-none focus:border-pink-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Inline Forgot Password expansion */}
              {showForgot && (
                <div className="p-4 rounded-2xl bg-[#0b0612] border border-pink-500/35 space-y-2.5">
                  <p className="text-xs text-white/75">
                    Vamos mandar um link para o seu e-mail para você criar uma senha nova.
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
                      onClick={() => setResetSent(true)}
                      className="px-3.5 py-2 rounded-xl bg-pink-500 text-xs font-bold text-white"
                    >
                      Enviar link
                    </button>
                  </div>
                  {resetSent && (
                    <p className="text-[11px] text-emerald-300 font-semibold">
                      Se a conta existir, o link de redefinição foi enviado para o seu e-mail!
                    </p>
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
                className="w-full py-3.5 px-5 rounded-2xl btn-neon text-sm font-extrabold text-white flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Entrar na conta
              </button>

              <div className="pt-2 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-xs text-white/60">
                <span>
                  Acesso liberado?{" "}
                  <Link href="/usuario" className="text-cyan-300 font-bold hover:underline">
                    Abrir Painel do Criador
                  </Link>
                </span>
                <Link href="/" className="text-white/80 font-semibold hover:text-pink-400">
                  Ver ferramentas →
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
