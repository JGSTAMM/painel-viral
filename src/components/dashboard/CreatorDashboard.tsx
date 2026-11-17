"use client";

import React from "react";
import { PainelProvider, usePainel } from "@/context/PainelContext";
import { DashboardShell } from "./DashboardShell";
import { VideoEditorTool } from "@/components/tools/VideoEditorTool";
import { RoteirosArsenalTool } from "@/components/tools/RoteirosArsenalTool";
import { EmAltaTool } from "@/components/tools/EmAltaTool";
import { CortesViraisTool } from "@/components/tools/CortesViraisTool";
import { GerarImagemTool } from "@/components/tools/GerarImagemTool";
import {
  BaixadorRepostTool,
  BibliotecaHdTool,
} from "@/components/tools/BibliotecaBastidoresTools";
import { EnvioAutomaticoTool } from "@/components/tools/EnvioAutomaticoTool";
import {
  IndiqueGanheTool,
  MinhaAssinaturaTool,
  MinhaLogoTool,
  MinhasCriacoesTool,
  MinhasRedesTool,
} from "@/components/tools/ContaTools";

function ActiveToolView() {
  const { activeTab } = usePainel();

  switch (activeTab) {
    case "editar-video":
      return <VideoEditorTool />;
    case "roteiros":
      return <RoteirosArsenalTool />;
    case "em-alta":
      return <EmAltaTool />;
    case "cortes-virais":
      return <CortesViraisTool />;
    case "gerar-imagem":
      return <GerarImagemTool />;
    case "biblioteca-hd":
      return <BibliotecaHdTool />;
    case "baixador-repost":
      return <BaixadorRepostTool />;
    case "envio-automatico":
      return <EnvioAutomaticoTool />;
    case "minhas-criacoes":
      return <MinhasCriacoesTool />;
    case "minha-logo":
      return <MinhaLogoTool />;
    case "minhas-redes":
      return <MinhasRedesTool />;
    case "indique-ganhe":
      return <IndiqueGanheTool />;
    case "minha-assinatura":
      return <MinhaAssinaturaTool />;
  }
}

export function CreatorDashboard({
  footerSlot,
}: {
  footerSlot?: React.ReactNode;
}) {
  return (
    <PainelProvider>
      <DashboardShell>
        <ActiveToolView />
        {footerSlot}
      </DashboardShell>
    </PainelProvider>
  );
}
