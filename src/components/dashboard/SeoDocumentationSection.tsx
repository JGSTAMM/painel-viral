import React from "react";
import Link from "next/link";
import { IMAGE_TEMPLATES, VIDEO_MODELS } from "@/data/gta-catalog";
import { CREATOR_CREDIT, FAQ_ITEMS } from "@/lib/seo-config";

export function SeoDocumentationSection() {
  return (
    <footer className="mt-12 pt-8 border-t border-white/[0.08] space-y-10 text-white/80">
      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-6 space-y-4">
        <h2 className="text-lg md:text-xl font-extrabold text-white">
          Especificações do Painel do Criador GTA 6 Gerador
        </h2>
        <p className="text-sm text-white/70 leading-relaxed">
          O Painel do Criador reúne em uma única estação de trabalho todas as ferramentas
          necessárias para transformar cenas de GTA 6 e gravações próprias em Reels,
          TikToks, YouTube Shorts e capas de alto alcance. Cada exportação preserva sua
          identidade visual com foto de perfil, nome do canal, selo verificado e frase de
          retenção configurada por palavra-chave.
        </p>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs text-white/75 list-disc pl-5">
          <li>
            <strong>Editor de Vídeo ({VIDEO_MODELS.length} modelos):</strong> renderização ao
            vivo em 1080×1920 com recorte de 8s a 3min e geração em série de 5 cortes.
          </li>
          <li>
            <strong>Em Alta:</strong> monitoramento em tempo real dos personagens mais
            buscados, incluindo Jason Duval, Lucia Caminos e Raul Bautista.
          </li>
          <li>
            <strong>Cortes Virais Limpos:</strong> exportação sem marcações em 9:16, 16:9 e
            1:1 separada por Ação, Personagens, Cidade, Engraçado, Carros e Festa.
          </li>
          <li>
            <strong>Gerar Imagem ({IMAGE_TEMPLATES.length} templates):</strong> criação de
            capas e thumbnails em 9:16, 4:5, 1:1 e 16:9 com personalização de textos e cores.
          </li>
          <li>
            <strong>Biblioteca HD &amp; Baixador:</strong> +80 cenas em alta definição e
            importação direta de clipes sem marca d&apos;água para reaproveitamento.
          </li>
          <li>
            <strong>Envio Automático &amp; Afiliados:</strong> agendamento multi-rede com
            alertas no aparelho e painel Indique e Ganhe com 50% de comissão via PIX.
          </li>
        </ul>
      </section>

      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-6 space-y-4 overflow-x-auto">
        <h2 className="text-lg font-extrabold text-white">
          Tabela Comparativa de Formatos e Exportações Full HD
        </h2>
        <table className="w-full text-left text-xs border-collapse min-w-[560px]">
          <thead>
            <tr className="border-b border-white/10 text-cyan-300 uppercase tracking-wider">
              <th className="py-3 pr-4">Módulo do Painel</th>
              <th className="py-3 pr-4">Proporções Suportadas</th>
              <th className="py-3 pr-4">Resolução Máxima</th>
              <th className="py-3">Aplicação Principal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06] text-white/75">
            <tr>
              <td className="py-3 pr-4 font-bold text-white">Editar Vídeo</td>
              <td className="py-3 pr-4">9:16 Vertical + Enquadramento 1:1</td>
              <td className="py-3 pr-4">1080 × 1920 Full HD</td>
              <td className="py-3">Instagram Reels, TikTok e YouTube Shorts</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-bold text-white">Cortes Virais Limpos</td>
              <td className="py-3 pr-4">9:16 · 16:9 · 1:1</td>
              <td className="py-3 pr-4">1920 × 1080 / 1080 × 1920</td>
              <td className="py-3">Edições limpas, YouTube horizontal e Feed</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-bold text-white">Gerar Imagem</td>
              <td className="py-3 pr-4">9:16 · 4:5 · 1:1 · 16:9</td>
              <td className="py-3 pr-4">1080 × 1920 / 1920 × 1080</td>
              <td className="py-3">Capas de Reels, carrosséis e thumbnails</td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-bold text-white">Envio Automático</td>
              <td className="py-3 pr-4">Multi-rede (até 4 contas)</td>
              <td className="py-3 pr-4">Original sem compressão</td>
              <td className="py-3">Agendamento com melhores horários (12h, 18h, 21h)</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="rounded-3xl bg-[#130b1f] border border-white/[0.08] p-6 space-y-4">
        <h2 className="text-lg font-extrabold text-white">
          Perguntas Frequentes sobre o Sistema
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {FAQ_ITEMS.map((item) => (
            <article
              key={item.question}
              className="rounded-2xl bg-[#0b0612] border border-white/[0.06] p-4 space-y-1.5"
            >
              <h3 className="text-xs font-extrabold text-pink-300">{item.question}</h3>
              <p className="text-xs text-white/65 leading-relaxed">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-6 text-xs text-white/55">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-white transition">
            Painel Principal
          </Link>
          <Link href="/usuario" className="hover:text-white transition">
            Área do Criador
          </Link>
          <Link href="/entrar" className="hover:text-white transition">
            Entrar na Conta
          </Link>
        </div>
        <p className="font-semibold text-white/75">{CREATOR_CREDIT}</p>
      </div>
    </footer>
  );
}
