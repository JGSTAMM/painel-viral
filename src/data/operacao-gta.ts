// Generated automatically from Operação GTA VI pack
// Pixirica Tecnologias - Central de Criação de Conteúdo

export interface OperacaoRoteiro {
  id: string;
  code: string;
  title: string;
  category: string;
  theme: string;
  objective: string;
  suggestedDurationSeconds: number;
  hook: string;
  context: string;
  development: string;
  closing: string;
  cta: string;
  suggestedTitle: string;
  suggestedCaption: string;
  recommendedVisual: string;
  gdriveCategory: string;
  gdriveFolderUrl: string;
}

export interface OperacaoGanchoCategory {
  id: string;
  category: string;
  icon: string;
  hooks: Array<{ number: string; hook: string }>;
}

export interface OperacaoTitleCategory {
  id: string;
  category: string;
  icon: string;
  titles: Array<{ number: string; title: string }>;
}

export interface OperacaoCaptionCategory {
  id: string;
  category: string;
  icon: string;
  captions: Array<{ number: string; caption: string }>;
}

export interface OperacaoCalendarioDia {
  day: number;
  week: number;
  title: string;
  category: string;
  difficulty: "facil" | "media" | "avancada";
  format: string;
  hookPreview: string;
  recommendedScriptId: string;
  gdriveFolderUrl: string;
}

export interface OperacaoSubnicho {
  number: string;
  title: string;
  description: string;
  potential: "Médio" | "Alto" | "Muito Alto";
  difficulty: "Fácil" | "Média" | "Avançada";
  format: string;
  ideas: string[];
}

export interface OperacaoMidiaArea {
  id: string;
  name: string;
  icon: string;
  area: string;
  count: number;
  gdriveUrl: string;
  usage: string;
  badge: string;
  localFiles?: Array<{ name: string; path: string; durationSeconds: number }>;
}

export const CENTRAL_DRIVE_ROOT_URL = "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG";
export const TOTAL_CENTRAL_ARQUIVOS = 651;

export const OPERACAO_MIDIA_AREAS: OperacaoMidiaArea[] = [
  {
    "id": "cenas-sem-audio",
    "name": "Cenas sem Áudio",
    "icon": "🔇",
    "area": "🎬 Cenas para Produção",
    "count": 129,
    "gdriveUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1",
    "usage": "Vídeos narrados, texto na tela e voz de IA.",
    "badge": "129 clipes MP4"
  },
  {
    "id": "cenas-com-audio",
    "name": "Cenas com Áudio",
    "icon": "🔊",
    "area": "🎬 Cenas para Produção",
    "count": 168,
    "gdriveUrl": "https://drive.google.com/drive/folders/1j7SZS5eIB2mm6Laa52f48BUP1T371cDO",
    "usage": "Falas, ambientação e momentos de impacto.",
    "badge": "168 clipes MP4"
  },
  {
    "id": "personagens",
    "name": "Banco de Personagens",
    "icon": "👥",
    "area": "🖼️ Banco Visual",
    "count": 70,
    "gdriveUrl": "https://drive.google.com/drive/folders/19P6D-9hhXqf6sNDNV9UyUwnGoYcPB9b7",
    "usage": "Conteúdo sobre protagonistas (Lucia, Jason) e secundários.",
    "badge": "70 fotos HD"
  },
  {
    "id": "locais-cenarios",
    "name": "Locais e Cenários",
    "icon": "🌴",
    "area": "🖼️ Banco Visual",
    "count": 33,
    "gdriveUrl": "https://drive.google.com/drive/folders/1pL2TNskVd2UNsdVAeqsLfRCaN-t6-tyF",
    "usage": "Mapa de Leonida, Vice City, praias e cidades.",
    "badge": "33 fotos HD"
  },
  {
    "id": "imagens-gerais",
    "name": "Imagens Gerais",
    "icon": "🖼️",
    "area": "🖼️ Banco Visual",
    "count": 9,
    "gdriveUrl": "https://drive.google.com/drive/folders/1pK1Q5ihJ8aICNlAwaWX1oe3T1YvkSfZU",
    "usage": "Apoio visual e transições.",
    "badge": "9 fotos"
  },
  {
    "id": "frames-principais",
    "name": "Frames Principais",
    "icon": "📸",
    "area": "📸 Frames para Análise",
    "count": 56,
    "gdriveUrl": "https://drive.google.com/drive/folders/1-K_G77L4-xA9d3CFFyPVHt9GLteckVcg",
    "usage": "Análises, detalhes, teorias e curiosidades em zoom.",
    "badge": "56 frames 4K"
  },
  {
    "id": "frames-complementares",
    "name": "Frames Complementares",
    "icon": "🔍",
    "area": "📸 Frames para Análise",
    "count": 9,
    "gdriveUrl": "https://drive.google.com/drive/folders/13Xyk41Vza8RSA_IJQ_sAS-t5Bm3viH5-",
    "usage": "Comparações e apoio para análises visuais.",
    "badge": "9 frames"
  },
  {
    "id": "trailers-oficiais",
    "name": "Trailers Oficiais Reais",
    "icon": "🎬",
    "area": "🎞️ Materiais Oficiais",
    "count": 2,
    "gdriveUrl": "https://drive.google.com/drive/folders/10K2RK62WLsPcXirqh-DIgNk5b_AyCFUz",
    "localFiles": [
      {
        "name": "GTA 6 — Trailer 1 Oficial (Full HD)",
        "path": "/media/gta6-trailer-1.mp4",
        "durationSeconds": 91
      },
      {
        "name": "GTA 6 — Trailer 2 Oficial (Full HD)",
        "path": "/media/gta6-trailer-2.mp4",
        "durationSeconds": 125
      }
    ],
    "usage": "Hype, análise e material oficial de altíssima fidelidade.",
    "badge": "2 MP4s Reais"
  },
  {
    "id": "ideias-referencia",
    "name": "Ideias de Referência",
    "icon": "💡",
    "area": "💡 Laboratório de Referências",
    "count": 67,
    "gdriveUrl": "https://drive.google.com/drive/folders/1hEKyxV5iqKDfxnz_auol2nxkbb5Ngfr_",
    "usage": "Encontrar pautas, formatos e novos ângulos.",
    "badge": "67 referências"
  },
  {
    "id": "modelos-prontos",
    "name": "Modelos Prontos",
    "icon": "✅",
    "area": "💡 Laboratório de Referências",
    "count": 100,
    "gdriveUrl": "https://drive.google.com/drive/folders/1eMP-CaPukCWEeHjGZYGvSXjNDOgsuJRP",
    "usage": "Estudar estruturas de vídeos e formatos validados.",
    "badge": "100 layouts"
  },
  {
    "id": "cortes-referencia",
    "name": "Cortes de Referência",
    "icon": "✂️",
    "area": "💡 Laboratório de Referências",
    "count": 8,
    "gdriveUrl": "https://drive.google.com/drive/folders/1hEKyxV5iqKDfxnz_auol2nxkbb5Ngfr_",
    "usage": "Estudar ritmo, cortes e construção visual.",
    "badge": "8 cortes"
  }
];

export const OPERACAO_ROTEIROS: OperacaoRoteiro[] = [
  {
    "id": "rot-01",
    "code": "01",
    "title": "A novidade oficial em 30 segundos",
    "category": "Notícias e Atualizações",
    "theme": "A novidade oficial em 30 segundos",
    "objective": "Transformar uma informação variável em um vídeo claro, verificável e rápido.",
    "suggestedDurationSeconds": 20,
    "hook": "Saiu [NOVIDADE], mas o ponto que realmente muda o cenário é este.",
    "context": "Abra dizendo quem publicou, em qual canal e em [DATA]. Mostre a fonte na tela.",
    "development": "Resuma a informação em uma frase, explique a consequência imediata e separe claramente fato de interpretação.",
    "closing": "Até agora, isso é o que está confirmado; qualquer passo além disso ainda é expectativa.",
    "cta": "Comente qual detalhe você percebeu primeiro.",
    "suggestedTitle": "GTA VI: o que [NOVIDADE] realmente muda",
    "suggestedCaption": "Resumo direto para acompanhar o assunto sem ruído. Comente qual detalhe você percebeu primeiro.",
    "recommendedVisual": "Cenas sem áudio para sustentar a narração e frames para destacar a informação principal.",
    "gdriveCategory": "Cenas sem Áudio + Frames Principais\nCena de abertura sugerida: Print ou frame da publicação oficial com a palavra-chave destacada.\nCenas de apoio: 2 a 4 clipes neutros, um frame com zoom e uma tela curta citando a fonte.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 5–7 cortes\nCampos que precisam ser adaptados: [NOVIDADE], [FONTE], [DATA], [CONSEQUÊNCIA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-02",
    "code": "02",
    "title": "Mudança de data ou janela",
    "category": "Notícias e Atualizações",
    "theme": "Mudança de data ou janela",
    "objective": "Transformar uma informação variável em um vídeo claro, verificável e rápido.",
    "suggestedDurationSeconds": 25,
    "hook": "A data mudou — ou só mudou a forma como as pessoas estão lendo o anúncio?",
    "context": "Apresente a data anterior, a nova informação e a origem exata de cada uma.",
    "development": "Monte uma micro linha do tempo e explique o que foi alterado, o que permaneceu igual e o que não foi dito.",
    "closing": "A resposta segura está no texto oficial, não na interpretação mais viral.",
    "cta": "Salve para comparar quando surgir novo material.",
    "suggestedTitle": "A verdade sobre a nova data de GTA VI",
    "suggestedCaption": "O detalhe fica mais claro quando você pausa a cena. Salve para comparar quando surgir novo material.",
    "recommendedVisual": "Cenas sem áudio para sustentar a narração e frames para destacar a informação principal.",
    "gdriveCategory": "Cenas sem Áudio + Frames Principais\nCena de abertura sugerida: Duas datas em tela, separadas por uma seta curta.\nCenas de apoio: 2 a 4 clipes neutros, um frame com zoom e uma tela curta citando a fonte.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 8–11 cortes\nCampos que precisam ser adaptados: [DATA ANTERIOR], [NOVA DATA], [FONTE], [TRECHO OFICIAL]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-03",
    "code": "03",
    "title": "Declaração que ganhou repercussão",
    "category": "Notícias e Atualizações",
    "theme": "Declaração que ganhou repercussão",
    "objective": "Transformar uma informação variável em um vídeo claro, verificável e rápido.",
    "suggestedDurationSeconds": 30,
    "hook": "Todo mundo está repetindo esta frase, mas quase ninguém mostra o contexto completo.",
    "context": "Identifique [DECLARAÇÃO], quem falou e em qual situação.",
    "development": "Mostre o trecho central, explique o assunto ao redor e aponte o limite do que pode ser concluído.",
    "closing": "A frase é relevante, mas não confirma aquilo que não foi declarado.",
    "cta": "Compartilhe com quem acompanha GTA VI.",
    "suggestedTitle": "O contexto por trás de [DECLARAÇÃO]",
    "suggestedCaption": "Hipótese boa precisa de evidência e contraponto. Compartilhe com quem acompanha GTA VI.",
    "recommendedVisual": "Cenas sem áudio para sustentar a narração e frames para destacar a informação principal.",
    "gdriveCategory": "Cenas sem Áudio + Frames Principais\nCena de abertura sugerida: Trecho da declaração em texto grande sobre um clipe neutro.\nCenas de apoio: 2 a 4 clipes neutros, um frame com zoom e uma tela curta citando a fonte.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 12–16 cortes\nCampos que precisam ser adaptados: [DECLARAÇÃO], [PESSOA OU EMPRESA], [FONTE], [CONTEXTO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-04",
    "code": "04",
    "title": "Nova imagem oficial",
    "category": "Notícias e Atualizações",
    "theme": "Nova imagem oficial",
    "objective": "Transformar uma informação variável em um vídeo claro, verificável e rápido.",
    "suggestedDurationSeconds": 20,
    "hook": "Esta nova imagem parece simples até você separar três informações que ela entrega.",
    "context": "Mostre a imagem completa por um segundo e informe onde ela foi publicada.",
    "development": "Analise primeiro [DETALHE 1], depois [DETALHE 2] e finalize com o elemento que ainda permite mais de uma interpretação.",
    "closing": "Temos duas pistas visuais e uma pergunta aberta — não uma confirmação escondida.",
    "cta": "Qual leitura faz mais sentido para você?",
    "suggestedTitle": "3 detalhes da nova imagem de GTA VI",
    "suggestedCaption": "Uma cena curta pode render uma leitura inteira. Qual leitura faz mais sentido para você?",
    "recommendedVisual": "Cenas sem áudio para sustentar a narração e frames para destacar a informação principal.",
    "gdriveCategory": "Cenas sem Áudio + Frames Principais\nCena de abertura sugerida: Imagem oficial inteira, seguida de zoom rápido no detalhe mais forte.\nCenas de apoio: 2 a 4 clipes neutros, um frame com zoom e uma tela curta citando a fonte.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 7–10 cortes\nCampos que precisam ser adaptados: [IMAGEM], [FONTE], [DETALHE 1], [DETALHE 2], [DÚVIDA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-05",
    "code": "05",
    "title": "Novo trailer anunciado ou publicado",
    "category": "Notícias e Atualizações",
    "theme": "Novo trailer anunciado ou publicado",
    "objective": "Transformar uma informação variável em um vídeo claro, verificável e rápido.",
    "suggestedDurationSeconds": 30,
    "hook": "O novo trailer chegou, e estes são os três pontos para observar antes do hype tomar conta.",
    "context": "Informe [DATA], canal oficial e duração do material, sem antecipar conclusões.",
    "development": "Separe um ponto de personagem, um de local e um de gameplay; diga o que é visível e o que é apenas hipótese.",
    "closing": "O trailer amplia as pistas, mas a análise continua depois do primeiro impacto.",
    "cta": "Siga a Operação para continuar esta análise.",
    "suggestedTitle": "O essencial do novo trailer de GTA VI",
    "suggestedCaption": "Material visual certo deixa a explicação mais simples. Siga a Operação para continuar esta análise.",
    "recommendedVisual": "Cenas sem áudio para sustentar a narração e frames para destacar a informação principal.",
    "gdriveCategory": "Cenas sem Áudio + Frames Principais\nCena de abertura sugerida: A cena mais reconhecível do trailer com texto “3 pontos”.\nCenas de apoio: 2 a 4 clipes neutros, um frame com zoom e uma tela curta citando a fonte.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 9–12 cortes\nCampos que precisam ser adaptados: [DATA], [TRAILER], [PERSONAGEM], [LOCAL], [MECÂNICA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-06",
    "code": "06",
    "title": "Alteração em página ou material oficial",
    "category": "Notícias e Atualizações",
    "theme": "Alteração em página ou material oficial",
    "objective": "Transformar uma informação variável em um vídeo claro, verificável e rápido.",
    "suggestedDurationSeconds": 15,
    "hook": "Uma pequena mudança no material oficial chamou atenção — e vale conferir antes de teorizar.",
    "context": "Mostre o antes, o depois e o horário aproximado da alteração.",
    "development": "Explique exatamente o que mudou, liste duas explicações possíveis e indique se houve comunicação oficial.",
    "closing": "Sem posicionamento adicional, a mudança é real; o significado ainda está aberto.",
    "cta": "Escolha uma opção nos comentários.",
    "suggestedTitle": "O que mudou na página oficial de GTA VI",
    "suggestedCaption": "Observe o contexto antes de fechar uma conclusão. Escolha uma opção nos comentários.",
    "recommendedVisual": "Cenas sem áudio para sustentar a narração e frames para destacar a informação principal.",
    "gdriveCategory": "Cenas sem Áudio + Frames Principais\nCena de abertura sugerida: Comparação rápida antes/depois com o elemento circulado.\nCenas de apoio: 2 a 4 clipes neutros, um frame com zoom e uma tela curta citando a fonte.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 4–6 cortes\nCampos que precisam ser adaptados: [ALTERAÇÃO], [PÁGINA], [DATA], [EXPLICAÇÃO POSSÍVEL]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-07",
    "code": "07",
    "title": "Rumor sob verificação",
    "category": "Notícias e Atualizações",
    "theme": "Rumor sob verificação",
    "objective": "Transformar uma informação variável em um vídeo claro, verificável e rápido.",
    "suggestedDurationSeconds": 25,
    "hook": "Antes de compartilhar este rumor sobre [ASSUNTO], confira os três testes que ele precisa passar.",
    "context": "Diga onde o rumor começou e rotule na tela: “não confirmado”.",
    "development": "Cheque origem, evidência verificável e coerência com fontes oficiais; dê um resultado provisório para cada teste.",
    "closing": "Por enquanto, trate como [GRAU DE CONFIANÇA], não como notícia confirmada.",
    "cta": "Marque alguém que vai discordar dessa análise.",
    "suggestedTitle": "Rumor de GTA VI: faz sentido ou não?",
    "suggestedCaption": "Comparar os frames muda a forma de enxergar o tema. Marque alguém que vai discordar dessa análise.",
    "recommendedVisual": "Cenas sem áudio para sustentar a narração e frames para destacar a informação principal.",
    "gdriveCategory": "Cenas sem Áudio + Frames Principais\nCena de abertura sugerida: Texto “RUMOR” sobre fundo desfocado e selo “não confirmado”.\nCenas de apoio: 2 a 4 clipes neutros, um frame com zoom e uma tela curta citando a fonte.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 11–15 cortes\nCampos que precisam ser adaptados: [ASSUNTO], [ORIGEM], [EVIDÊNCIA], [GRAU DE CONFIANÇA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-08",
    "code": "08",
    "title": "Reação da comunidade a uma novidade",
    "category": "Notícias e Atualizações",
    "theme": "Reação da comunidade a uma novidade",
    "objective": "Transformar uma informação variável em um vídeo claro, verificável e rápido.",
    "suggestedDurationSeconds": 20,
    "hook": "A comunidade se dividiu por causa de [NOVIDADE], mas os dois lados têm argumentos diferentes.",
    "context": "Resuma a novidade confirmada e apresente as duas leituras sem caricaturar ninguém.",
    "development": "Mostre o melhor argumento do lado A, o melhor do lado B e o ponto que depende de informação futura.",
    "closing": "A discussão é válida; a certeza só chega quando [CONDIÇÃO] acontecer.",
    "cta": "Volte a este vídeo quando houver confirmação.",
    "suggestedTitle": "Por que [NOVIDADE] dividiu os fãs de GTA VI",
    "suggestedCaption": "A melhor pista pode estar fora do centro da cena. Volte a este vídeo quando houver confirmação.",
    "recommendedVisual": "Cenas sem áudio para sustentar a narração e frames para destacar a informação principal.",
    "gdriveCategory": "Cenas sem Áudio + Frames Principais\nCena de abertura sugerida: Tela dividida com duas opiniões curtas.\nCenas de apoio: 2 a 4 clipes neutros, um frame com zoom e uma tela curta citando a fonte.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 8–12 cortes\nCampos que precisam ser adaptados: [NOVIDADE], [ARGUMENTO A], [ARGUMENTO B], [CONDIÇÃO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-09",
    "code": "09",
    "title": "Impacto de uma informação em personagem ou local",
    "category": "Notícias e Atualizações",
    "theme": "Impacto de uma informação em personagem ou local",
    "objective": "Transformar uma informação variável em um vídeo claro, verificável e rápido.",
    "suggestedDurationSeconds": 25,
    "hook": "Esta atualização não fala só de [NOVIDADE]; ela pode mudar como enxergamos [PERSONAGEM OU LOCAL].",
    "context": "Apresente o fato confirmado e recupere a informação anterior necessária para entendê-lo.",
    "development": "Conecte os dois elementos, explique a consequência plausível e sinalize onde começa a especulação.",
    "closing": "A conexão é possível, mas ainda precisa de [CONFIRMAÇÃO].",
    "cta": "Diga qual ponto merece uma parte 2.",
    "suggestedTitle": "O impacto de [NOVIDADE] em [PERSONAGEM OU LOCAL]",
    "suggestedCaption": "Este formato foi pensado para gerar discussão com critério. Diga qual ponto merece uma parte 2.",
    "recommendedVisual": "Cenas sem áudio para sustentar a narração e frames para destacar a informação principal.",
    "gdriveCategory": "Cenas sem Áudio + Frames Principais\nCena de abertura sugerida: Imagem do personagem ou local com a novidade aparecendo em sobreposição.\nCenas de apoio: 2 a 4 clipes neutros, um frame com zoom e uma tela curta citando a fonte.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 5–8 cortes\nCampos que precisam ser adaptados: [NOVIDADE], [PERSONAGEM OU LOCAL], [FATO ANTERIOR], [CONFIRMAÇÃO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-10",
    "code": "10",
    "title": "Resumo semanal sem ruído",
    "category": "Notícias e Atualizações",
    "theme": "Resumo semanal sem ruído",
    "objective": "Transformar uma informação variável em um vídeo claro, verificável e rápido.",
    "suggestedDurationSeconds": 30,
    "hook": "Se você ficou longe das notícias, estas são as três atualizações de GTA VI que realmente importam.",
    "context": "Defina o período [DATA INICIAL] a [DATA FINAL] e use somente fontes identificáveis.",
    "development": "Entregue três notas em ordem de impacto: o que aconteceu, por que importa e qual é o próximo ponto a observar.",
    "closing": "O resto foi repetição, rumor ou opinião sem novidade concreta.",
    "cta": "Envie para quem precisa ver o contexto completo.",
    "suggestedTitle": "GTA VI: as 3 notícias da semana",
    "suggestedCaption": "Salve esta estrutura e adapte quando houver material novo. Envie para quem precisa ver o contexto completo.",
    "recommendedVisual": "Cenas sem áudio para sustentar a narração e frames para destacar a informação principal.",
    "gdriveCategory": "Cenas sem Áudio + Frames Principais\nCena de abertura sugerida: Contagem 3–2–1 com três frames diferentes.\nCenas de apoio: 2 a 4 clipes neutros, um frame com zoom e uma tela curta citando a fonte.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 13–18 cortes\nCampos que precisam ser adaptados: [DATA INICIAL], [DATA FINAL], [NOTÍCIA 1], [NOTÍCIA 2], [NOTÍCIA 3]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-11",
    "code": "11",
    "title": "A placa que muda a leitura da cena",
    "category": "Curiosidades e Detalhes",
    "theme": "A placa que muda a leitura da cena",
    "objective": "Fazer o público enxergar um detalhe visual e entender por que ele merece atenção.",
    "suggestedDurationSeconds": 20,
    "hook": "Esta placa aparece por poucos segundos, mas pode dizer onde a cena acontece.",
    "context": "Mostre o plano aberto antes de aproximar [PLACA OU TEXTO].",
    "development": "Leia o elemento, relacione com [LOCAL] e apresente uma alternativa caso o texto seja apenas decoração.",
    "closing": "É uma pista útil para localização, não uma coordenada confirmada.",
    "cta": "Comente qual detalhe você percebeu primeiro.",
    "suggestedTitle": "A placa escondida que aponta para [LOCAL]",
    "suggestedCaption": "Resumo direto para acompanhar o assunto sem ruído. Comente qual detalhe você percebeu primeiro.",
    "recommendedVisual": "Frames para o detalhe, imagens gerais para contexto e clipes sem áudio para movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Zoom progressivo no texto quase invisível da cena.\nCenas de apoio: Frame aberto, recorte ampliado, imagem de contexto e clipe curto relacionado.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 5–7 cortes\nCampos que precisam ser adaptados: [PLACA OU TEXTO], [LOCAL], [FRAME]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-12",
    "code": "12",
    "title": "Roupa e identidade de personagem",
    "category": "Curiosidades e Detalhes",
    "theme": "Roupa e identidade de personagem",
    "objective": "Fazer o público enxergar um detalhe visual e entender por que ele merece atenção.",
    "suggestedDurationSeconds": 25,
    "hook": "A roupa de [PERSONAGEM] conta uma história antes mesmo de qualquer diálogo.",
    "context": "Apresente o personagem em corpo inteiro e destaque duas escolhas visuais.",
    "development": "Conecte cor, acessório ou estado da roupa ao momento da cena, evitando afirmar intenção dos criadores como fato.",
    "closing": "O figurino sugere uma fase; a história dirá se a leitura estava certa.",
    "cta": "Salve para comparar quando surgir novo material.",
    "suggestedTitle": "O detalhe no visual de [PERSONAGEM]",
    "suggestedCaption": "O detalhe fica mais claro quando você pausa a cena. Salve para comparar quando surgir novo material.",
    "recommendedVisual": "Frames para o detalhe, imagens gerais para contexto e clipes sem áudio para movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Recorte do acessório mais marcante com movimento de aproximação.\nCenas de apoio: Frame aberto, recorte ampliado, imagem de contexto e clipe curto relacionado.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 8–11 cortes\nCampos que precisam ser adaptados: [PERSONAGEM], [ACESSÓRIO], [COR], [CENA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-13",
    "code": "13",
    "title": "Reflexo com informação escondida",
    "category": "Curiosidades e Detalhes",
    "theme": "Reflexo com informação escondida",
    "objective": "Fazer o público enxergar um detalhe visual e entender por que ele merece atenção.",
    "suggestedDurationSeconds": 30,
    "hook": "Olhe para o reflexo, não para o centro da cena.",
    "context": "Pause o frame e indique a superfície refletora sem revelar tudo de imediato.",
    "development": "Compare o reflexo com o plano principal, identifique [ELEMENTO] e explique duas leituras possíveis.",
    "closing": "O detalhe existe; o que ele representa ainda merece comparação com outros frames.",
    "cta": "Compartilhe com quem acompanha GTA VI.",
    "suggestedTitle": "O reflexo que quase ninguém viu em GTA VI",
    "suggestedCaption": "Hipótese boa precisa de evidência e contraponto. Compartilhe com quem acompanha GTA VI.",
    "recommendedVisual": "Frames para o detalhe, imagens gerais para contexto e clipes sem áudio para movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Frame congelado com seta apontando para o reflexo.\nCenas de apoio: Frame aberto, recorte ampliado, imagem de contexto e clipe curto relacionado.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 12–16 cortes\nCampos que precisam ser adaptados: [FRAME], [ELEMENTO], [LEITURA 1], [LEITURA 2]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-14",
    "code": "14",
    "title": "Animal e ambiente",
    "category": "Curiosidades e Detalhes",
    "theme": "Animal e ambiente",
    "objective": "Fazer o público enxergar um detalhe visual e entender por que ele merece atenção.",
    "suggestedDurationSeconds": 20,
    "hook": "Este animal não está na cena só para decorar o fundo.",
    "context": "Mostre [ANIMAL] e localize o ambiente onde ele aparece.",
    "development": "Explique o que a presença dele comunica sobre bioma, perigo ou rotina do local e separe observação de previsão de gameplay.",
    "closing": "Mesmo sem confirmar uma mecânica, o ambiente já parece mais vivo.",
    "cta": "Qual leitura faz mais sentido para você?",
    "suggestedTitle": "O que [ANIMAL] revela sobre Leonida",
    "suggestedCaption": "Uma cena curta pode render uma leitura inteira. Qual leitura faz mais sentido para você?",
    "recommendedVisual": "Frames para o detalhe, imagens gerais para contexto e clipes sem áudio para movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Entrada do animal em cena com áudio ambiente baixo ou silêncio.\nCenas de apoio: Frame aberto, recorte ampliado, imagem de contexto e clipe curto relacionado.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 7–10 cortes\nCampos que precisam ser adaptados: [ANIMAL], [LOCAL], [POSSÍVEL MECÂNICA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-15",
    "code": "15",
    "title": "Arquitetura que indica interior explorável",
    "category": "Curiosidades e Detalhes",
    "theme": "Arquitetura que indica interior explorável",
    "objective": "Fazer o público enxergar um detalhe visual e entender por que ele merece atenção.",
    "suggestedDurationSeconds": 30,
    "hook": "Este prédio parece cenário, mas três sinais fazem ele merecer atenção.",
    "context": "Mostre fachada, entradas e circulação ao redor de [PRÉDIO].",
    "development": "Aponte porta, iluminação e presença de NPCs; explique que nenhum sinal isolado confirma acesso.",
    "closing": "É candidato a interior, não promessa de que toda porta abrirá.",
    "cta": "Siga a Operação para continuar esta análise.",
    "suggestedTitle": "Esse prédio de GTA VI pode ser explorável?",
    "suggestedCaption": "Material visual certo deixa a explicação mais simples. Siga a Operação para continuar esta análise.",
    "recommendedVisual": "Frames para o detalhe, imagens gerais para contexto e clipes sem áudio para movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Fachada inteira seguida de três marcações rápidas.\nCenas de apoio: Frame aberto, recorte ampliado, imagem de contexto e clipe curto relacionado.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 9–12 cortes\nCampos que precisam ser adaptados: [PRÉDIO], [LOCAL], [SINAL 1], [SINAL 2], [SINAL 3]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-16",
    "code": "16",
    "title": "Objeto cotidiano com função possível",
    "category": "Curiosidades e Detalhes",
    "theme": "Objeto cotidiano com função possível",
    "objective": "Fazer o público enxergar um detalhe visual e entender por que ele merece atenção.",
    "suggestedDurationSeconds": 15,
    "hook": "Um objeto comum pode revelar como o mundo reage ao jogador.",
    "context": "Apresente [OBJETO] dentro da cena e a ação que acontece ao redor.",
    "development": "Explique a função visual atual, a mecânica possível e o que faltaria ver para confirmar interação.",
    "closing": "Pequeno no frame, grande como pista de sistema.",
    "cta": "Escolha uma opção nos comentários.",
    "suggestedTitle": "O objeto que pode virar mecânica em GTA VI",
    "suggestedCaption": "Observe o contexto antes de fechar uma conclusão. Escolha uma opção nos comentários.",
    "recommendedVisual": "Frames para o detalhe, imagens gerais para contexto e clipes sem áudio para movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Close no objeto antes de mostrar o plano completo.\nCenas de apoio: Frame aberto, recorte ampliado, imagem de contexto e clipe curto relacionado.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 4–6 cortes\nCampos que precisam ser adaptados: [OBJETO], [AÇÃO], [MECÂNICA POSSÍVEL]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-17",
    "code": "17",
    "title": "Marca e paródia visual",
    "category": "Curiosidades e Detalhes",
    "theme": "Marca e paródia visual",
    "objective": "Fazer o público enxergar um detalhe visual e entender por que ele merece atenção.",
    "suggestedDurationSeconds": 25,
    "hook": "Este anúncio parece absurdo porque provavelmente está zoando algo muito real.",
    "context": "Mostre [MARCA OU ANÚNCIO] e leia o texto visível.",
    "development": "Explique qual comportamento cultural ele pode satirizar e destaque os elementos usados na piada.",
    "closing": "A graça funciona porque o exagero ainda parece familiar.",
    "cta": "Marque alguém que vai discordar dessa análise.",
    "suggestedTitle": "A paródia escondida neste anúncio de GTA VI",
    "suggestedCaption": "Comparar os frames muda a forma de enxergar o tema. Marque alguém que vai discordar dessa análise.",
    "recommendedVisual": "Frames para o detalhe, imagens gerais para contexto e clipes sem áudio para movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Anúncio ocupando a tela inteira com pausa para leitura.\nCenas de apoio: Frame aberto, recorte ampliado, imagem de contexto e clipe curto relacionado.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 11–15 cortes\nCampos que precisam ser adaptados: [MARCA OU ANÚNCIO], [TEXTO], [REFERÊNCIA CULTURAL]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-18",
    "code": "18",
    "title": "Continuidade entre duas cenas",
    "category": "Curiosidades e Detalhes",
    "theme": "Continuidade entre duas cenas",
    "objective": "Fazer o público enxergar um detalhe visual e entender por que ele merece atenção.",
    "suggestedDurationSeconds": 20,
    "hook": "Duas cenas distantes podem acontecer no mesmo momento — a roupa entrega a conexão.",
    "context": "Mostre cena A e cena B sem afirmar a ordem.",
    "development": "Compare roupa, objeto e iluminação; monte a sequência mais provável e apresente o ponto que pode quebrá-la.",
    "closing": "É uma reconstrução visual, não a cronologia oficial.",
    "cta": "Volte a este vídeo quando houver confirmação.",
    "suggestedTitle": "A conexão escondida entre estas duas cenas",
    "suggestedCaption": "A melhor pista pode estar fora do centro da cena. Volte a este vídeo quando houver confirmação.",
    "recommendedVisual": "Frames para o detalhe, imagens gerais para contexto e clipes sem áudio para movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Corte alternado entre o mesmo detalhe nas duas cenas.\nCenas de apoio: Frame aberto, recorte ampliado, imagem de contexto e clipe curto relacionado.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 8–12 cortes\nCampos que precisam ser adaptados: [CENA A], [CENA B], [ROUPA], [OBJETO], [CONTRAPONTO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-19",
    "code": "19",
    "title": "Comportamento de NPC",
    "category": "Curiosidades e Detalhes",
    "theme": "Comportamento de NPC",
    "objective": "Fazer o público enxergar um detalhe visual e entender por que ele merece atenção.",
    "suggestedDurationSeconds": 25,
    "hook": "Enquanto o protagonista chama atenção, este NPC faz algo muito mais interessante.",
    "context": "Reproduza a ação completa de [NPC] uma vez sem interromper.",
    "development": "Divida o comportamento em reação, deslocamento e interação; explique o que pode indicar sobre rotinas do mundo.",
    "closing": "Um gesto não prova o sistema inteiro, mas mostra onde vale observar.",
    "cta": "Diga qual ponto merece uma parte 2.",
    "suggestedTitle": "O NPC que roubou a cena em GTA VI",
    "suggestedCaption": "Este formato foi pensado para gerar discussão com critério. Diga qual ponto merece uma parte 2.",
    "recommendedVisual": "Frames para o detalhe, imagens gerais para contexto e clipes sem áudio para movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: NPC circulado enquanto a cena roda em velocidade normal.\nCenas de apoio: Frame aberto, recorte ampliado, imagem de contexto e clipe curto relacionado.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 5–8 cortes\nCampos que precisam ser adaptados: [NPC], [AÇÃO], [REAÇÃO], [POSSÍVEL SISTEMA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-20",
    "code": "20",
    "title": "Som que antecipa informação",
    "category": "Curiosidades e Detalhes",
    "theme": "Som que antecipa informação",
    "objective": "Fazer o público enxergar um detalhe visual e entender por que ele merece atenção.",
    "suggestedDurationSeconds": 30,
    "hook": "Feche os olhos por um segundo: o áudio entrega algo antes da imagem.",
    "context": "Toque um trecho curto com [SOM] e depois revele o frame correspondente.",
    "development": "Identifique origem provável, função narrativa e outra explicação possível para o som.",
    "closing": "Nem todo segredo está no frame; alguns chegam primeiro pelo ouvido.",
    "cta": "Envie para quem precisa ver o contexto completo.",
    "suggestedTitle": "O som escondido que muda esta cena",
    "suggestedCaption": "Salve esta estrutura e adapte quando houver material novo. Envie para quem precisa ver o contexto completo.",
    "recommendedVisual": "Frames para o detalhe, imagens gerais para contexto e clipes sem áudio para movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Tela escura por meio segundo com o som em destaque, seguida da cena.\nCenas de apoio: Frame aberto, recorte ampliado, imagem de contexto e clipe curto relacionado.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 13–18 cortes\nCampos que precisam ser adaptados: [SOM], [CENA], [ORIGEM PROVÁVEL]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-21",
    "code": "21",
    "title": "Aliança improvável entre personagens",
    "category": "Teorias e Segredos",
    "theme": "Aliança improvável entre personagens",
    "objective": "Apresentar uma hipótese com evidências e contraponto, sem tratá-la como confirmação.",
    "suggestedDurationSeconds": 20,
    "hook": "E se [PERSONAGEM A] e [PERSONAGEM B] estiverem do mesmo lado por um motivo que ainda não vimos?",
    "context": "Apresente a hipótese e mostre a primeira evidência visual.",
    "development": "Conecte duas pistas, inclua um contraponto e classifique a teoria como fraca, média ou forte.",
    "closing": "A conexão faz sentido, mas continua sendo especulação até surgir confirmação.",
    "cta": "Comente qual detalhe você percebeu primeiro.",
    "suggestedTitle": "A teoria da aliança entre [PERSONAGEM A] e [PERSONAGEM B]",
    "suggestedCaption": "Resumo direto para acompanhar o assunto sem ruído. Comente qual detalhe você percebeu primeiro.",
    "recommendedVisual": "Frames para evidências, imagens de personagens e locais para construir a conexão.",
    "gdriveCategory": "Frames Principais + Personagens + Locais e Cenários\nCena de abertura sugerida: Retratos dos dois personagens entrando de lados opostos.\nCenas de apoio: Dois frames de evidência, uma imagem contextual e um frame final para o contraponto.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 5–7 cortes\nCampos que precisam ser adaptados: [PERSONAGEM A], [PERSONAGEM B], [EVIDÊNCIA 1], [EVIDÊNCIA 2], [CONTRAPONTO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-22",
    "code": "22",
    "title": "Ordem provável das cenas",
    "category": "Teorias e Segredos",
    "theme": "Ordem provável das cenas",
    "objective": "Apresentar uma hipótese com evidências e contraponto, sem tratá-la como confirmação.",
    "suggestedDurationSeconds": 25,
    "hook": "Estas cenas parecem aleatórias, mas três detalhes podem colocar tudo na ordem certa.",
    "context": "Apresente os trechos A, B e C fora de ordem.",
    "development": "Use roupa, horário e dano visível para propor uma sequência; mostre onde há incerteza.",
    "closing": "Esta é a cronologia mais coerente com os frames disponíveis, não a ordem oficial.",
    "cta": "Salve para comparar quando surgir novo material.",
    "suggestedTitle": "A possível ordem destas cenas de GTA VI",
    "suggestedCaption": "O detalhe fica mais claro quando você pausa a cena. Salve para comparar quando surgir novo material.",
    "recommendedVisual": "Frames para evidências, imagens de personagens e locais para construir a conexão.",
    "gdriveCategory": "Frames Principais + Personagens + Locais e Cenários\nCena de abertura sugerida: Três miniaturas embaralhadas que se reorganizam.\nCenas de apoio: Dois frames de evidência, uma imagem contextual e um frame final para o contraponto.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 8–11 cortes\nCampos que precisam ser adaptados: [CENA A], [CENA B], [CENA C], [PISTA DE ORDEM]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-23",
    "code": "23",
    "title": "Possível traição",
    "category": "Teorias e Segredos",
    "theme": "Possível traição",
    "objective": "Apresentar uma hipótese com evidências e contraponto, sem tratá-la como confirmação.",
    "suggestedDurationSeconds": 30,
    "hook": "Uma única reação pode ser a pista de uma futura traição — ou apenas edição do trailer.",
    "context": "Mostre [REAÇÃO] e explique o que acontece antes e depois no material disponível.",
    "development": "Construa a hipótese, apresente duas evidências e dê espaço para a explicação mais simples.",
    "closing": "Boa teoria precisa sobreviver ao contraponto, não fugir dele.",
    "cta": "Compartilhe com quem acompanha GTA VI.",
    "suggestedTitle": "A teoria da traição em GTA VI",
    "suggestedCaption": "Hipótese boa precisa de evidência e contraponto. Compartilhe com quem acompanha GTA VI.",
    "recommendedVisual": "Frames para evidências, imagens de personagens e locais para construir a conexão.",
    "gdriveCategory": "Frames Principais + Personagens + Locais e Cenários\nCena de abertura sugerida: Close silencioso na reação do personagem.\nCenas de apoio: Dois frames de evidência, uma imagem contextual e um frame final para o contraponto.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 12–16 cortes\nCampos que precisam ser adaptados: [PERSONAGEM], [REAÇÃO], [EVIDÊNCIA], [EXPLICAÇÃO ALTERNATIVA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-24",
    "code": "24",
    "title": "Local escondido no mapa",
    "category": "Teorias e Segredos",
    "theme": "Local escondido no mapa",
    "objective": "Apresentar uma hipótese com evidências e contraponto, sem tratá-la como confirmação.",
    "suggestedDurationSeconds": 20,
    "hook": "Este cenário pode estar muito mais perto de [LOCAL CONHECIDO] do que parece.",
    "context": "Mostre horizonte, estrada ou placa usados como referência.",
    "development": "Cruze três pistas geográficas e proponha uma região provável, deixando clara a margem de erro.",
    "closing": "A localização é plausível; coordenada exata só com material adicional.",
    "cta": "Qual leitura faz mais sentido para você?",
    "suggestedTitle": "Onde este local pode estar no mapa de GTA VI",
    "suggestedCaption": "Uma cena curta pode render uma leitura inteira. Qual leitura faz mais sentido para você?",
    "recommendedVisual": "Frames para evidências, imagens de personagens e locais para construir a conexão.",
    "gdriveCategory": "Frames Principais + Personagens + Locais e Cenários\nCena de abertura sugerida: Frame do horizonte com linhas marcando os pontos de referência.\nCenas de apoio: Dois frames de evidência, uma imagem contextual e um frame final para o contraponto.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 7–10 cortes\nCampos que precisam ser adaptados: [LOCAL], [LOCAL CONHECIDO], [PISTA 1], [PISTA 2], [PISTA 3]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-25",
    "code": "25",
    "title": "Disputa de território",
    "category": "Teorias e Segredos",
    "theme": "Disputa de território",
    "objective": "Apresentar uma hipótese com evidências e contraponto, sem tratá-la como confirmação.",
    "suggestedDurationSeconds": 30,
    "hook": "O cenário pode estar contando quem controla esta área antes de qualquer missão começar.",
    "context": "Apresente [LOCAL] e os símbolos encontrados nele.",
    "development": "Relacione grafites, veículos e presença de personagens a uma possível facção; depois mostre o contraponto.",
    "closing": "Os sinais sugerem influência, não domínio confirmado.",
    "cta": "Siga a Operação para continuar esta análise.",
    "suggestedTitle": "Quem pode controlar [LOCAL] em GTA VI?",
    "suggestedCaption": "Material visual certo deixa a explicação mais simples. Siga a Operação para continuar esta análise.",
    "recommendedVisual": "Frames para evidências, imagens de personagens e locais para construir a conexão.",
    "gdriveCategory": "Frames Principais + Personagens + Locais e Cenários\nCena de abertura sugerida: Plano do local com três símbolos destacados em sequência.\nCenas de apoio: Dois frames de evidência, uma imagem contextual e um frame final para o contraponto.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 9–12 cortes\nCampos que precisam ser adaptados: [LOCAL], [SÍMBOLO], [FACÇÃO POSSÍVEL], [CONTRAPONTO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-26",
    "code": "26",
    "title": "Símbolo, tatuagem ou acessório",
    "category": "Teorias e Segredos",
    "theme": "Símbolo, tatuagem ou acessório",
    "objective": "Apresentar uma hipótese com evidências e contraponto, sem tratá-la como confirmação.",
    "suggestedDurationSeconds": 15,
    "hook": "Este símbolo aparece pequeno, mas pode ligar personagem, grupo e lugar.",
    "context": "Mostre [SÍMBOLO] no personagem e procure repetição em outro material.",
    "development": "Apresente a coincidência, a conexão possível e o risco de ser apenas escolha estética.",
    "closing": "Se o símbolo voltar em outro contexto, a teoria ganha força.",
    "cta": "Escolha uma opção nos comentários.",
    "suggestedTitle": "O símbolo que pode conectar três partes de GTA VI",
    "suggestedCaption": "Observe o contexto antes de fechar uma conclusão. Escolha uma opção nos comentários.",
    "recommendedVisual": "Frames para evidências, imagens de personagens e locais para construir a conexão.",
    "gdriveCategory": "Frames Principais + Personagens + Locais e Cenários\nCena de abertura sugerida: Macro do símbolo seguido de dois frames onde ele pode reaparecer.\nCenas de apoio: Dois frames de evidência, uma imagem contextual e um frame final para o contraponto.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 4–6 cortes\nCampos que precisam ser adaptados: [SÍMBOLO], [PERSONAGEM], [GRUPO], [LOCAL]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-27",
    "code": "27",
    "title": "Mecânica sugerida por uma cena",
    "category": "Teorias e Segredos",
    "theme": "Mecânica sugerida por uma cena",
    "objective": "Apresentar uma hipótese com evidências e contraponto, sem tratá-la como confirmação.",
    "suggestedDurationSeconds": 25,
    "hook": "Esta animação pode ser só cinematográfica — ou a pista de uma nova mecânica.",
    "context": "Reproduza [AÇÃO] em velocidade normal e depois em câmera lenta.",
    "development": "Explique o que seria necessário para virar gameplay, quais sinais apoiam a hipótese e o que ainda falta.",
    "closing": "Possibilidade visual não é sistema confirmado.",
    "cta": "Marque alguém que vai discordar dessa análise.",
    "suggestedTitle": "Esta cena revela uma nova mecânica de GTA VI?",
    "suggestedCaption": "Comparar os frames muda a forma de enxergar o tema. Marque alguém que vai discordar dessa análise.",
    "recommendedVisual": "Frames para evidências, imagens de personagens e locais para construir a conexão.",
    "gdriveCategory": "Frames Principais + Personagens + Locais e Cenários\nCena de abertura sugerida: Ação curta repetida duas vezes, normal e lenta.\nCenas de apoio: Dois frames de evidência, uma imagem contextual e um frame final para o contraponto.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 11–15 cortes\nCampos que precisam ser adaptados: [AÇÃO], [MECÂNICA], [SINAL], [INFORMAÇÃO FALTANTE]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-28",
    "code": "28",
    "title": "Rota de fuga pela água",
    "category": "Teorias e Segredos",
    "theme": "Rota de fuga pela água",
    "objective": "Apresentar uma hipótese com evidências e contraponto, sem tratá-la como confirmação.",
    "suggestedDurationSeconds": 20,
    "hook": "A melhor rota de fuga talvez não esteja em nenhuma estrada.",
    "context": "Apresente [LOCAL], acesso à água e o veículo visível ou possível.",
    "development": "Monte a rota em três etapas, destaque vantagem e risco e mantenha o plano como hipótese de gameplay.",
    "closing": "Se a navegação for integrada ao mapa, a água pode mudar perseguições inteiras.",
    "cta": "Volte a este vídeo quando houver confirmação.",
    "suggestedTitle": "A rota de fuga que ignora as estradas",
    "suggestedCaption": "A melhor pista pode estar fora do centro da cena. Volte a este vídeo quando houver confirmação.",
    "recommendedVisual": "Frames para evidências, imagens de personagens e locais para construir a conexão.",
    "gdriveCategory": "Frames Principais + Personagens + Locais e Cenários\nCena de abertura sugerida: Plano aéreo ou amplo da água com uma linha de rota.\nCenas de apoio: Dois frames de evidência, uma imagem contextual e um frame final para o contraponto.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 8–12 cortes\nCampos que precisam ser adaptados: [LOCAL], [VEÍCULO AQUÁTICO], [ROTA], [RISCO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-29",
    "code": "29",
    "title": "Economia e negócios",
    "category": "Teorias e Segredos",
    "theme": "Economia e negócios",
    "objective": "Apresentar uma hipótese com evidências e contraponto, sem tratá-la como confirmação.",
    "suggestedDurationSeconds": 25,
    "hook": "Um detalhe de fachada pode indicar que dinheiro em GTA VI terá mais caminhos do que comprar carros.",
    "context": "Mostre [NEGÓCIO OU IMÓVEL] e o que acontece ao redor.",
    "development": "Apresente a hipótese de uso, compare com sistemas anteriores sem prometer retorno e liste o que confirmaria a mecânica.",
    "closing": "O cenário cria a possibilidade; a função econômica ainda precisa ser mostrada.",
    "cta": "Diga qual ponto merece uma parte 2.",
    "suggestedTitle": "A teoria dos negócios em GTA VI",
    "suggestedCaption": "Este formato foi pensado para gerar discussão com critério. Diga qual ponto merece uma parte 2.",
    "recommendedVisual": "Frames para evidências, imagens de personagens e locais para construir a conexão.",
    "gdriveCategory": "Frames Principais + Personagens + Locais e Cenários\nCena de abertura sugerida: Fachada do negócio com destaque para placa e entrada.\nCenas de apoio: Dois frames de evidência, uma imagem contextual e um frame final para o contraponto.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 5–8 cortes\nCampos que precisam ser adaptados: [NEGÓCIO OU IMÓVEL], [SISTEMA ANTERIOR], [MECÂNICA POSSÍVEL]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-30",
    "code": "30",
    "title": "Teoria avaliada por evidências",
    "category": "Teorias e Segredos",
    "theme": "Teoria avaliada por evidências",
    "objective": "Apresentar uma hipótese com evidências e contraponto, sem tratá-la como confirmação.",
    "suggestedDurationSeconds": 30,
    "hook": "Esta teoria viral parece forte até você separar evidência, suposição e coincidência.",
    "context": "Defina [TEORIA] em uma frase e avise que será avaliada, não confirmada.",
    "development": "Dê nota para origem, evidência visual e contraponto; mostre um placar de confiança.",
    "closing": "Resultado: [NOTA] de confiança hoje, sujeito a novas informações.",
    "cta": "Envie para quem precisa ver o contexto completo.",
    "suggestedTitle": "Avaliando a teoria de [TEORIA]",
    "suggestedCaption": "Salve esta estrutura e adapte quando houver material novo. Envie para quem precisa ver o contexto completo.",
    "recommendedVisual": "Frames para evidências, imagens de personagens e locais para construir a conexão.",
    "gdriveCategory": "Frames Principais + Personagens + Locais e Cenários\nCena de abertura sugerida: Placar vazio que recebe três notas durante o vídeo.\nCenas de apoio: Dois frames de evidência, uma imagem contextual e um frame final para o contraponto.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 13–18 cortes\nCampos que precisam ser adaptados: [TEORIA], [ORIGEM], [EVIDÊNCIA], [CONTRAPONTO], [NOTA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-31",
    "code": "31",
    "title": "Lucia Caminos em três sinais",
    "category": "Personagens",
    "theme": "Lucia Caminos em três sinais",
    "objective": "Transformar traços visuais e relações do elenco em uma narrativa curta e memorável.",
    "suggestedDurationSeconds": 20,
    "hook": "Três detalhes apresentam Lucia antes que a história explique quem ela é.",
    "context": "Mostre um retrato limpo de Lucia e diga que a leitura parte apenas do material disponível.",
    "development": "Analise postura, ambiente e reação; conecte cada sinal a uma característica possível.",
    "closing": "É uma primeira leitura da personagem, não o arco completo.",
    "cta": "Comente qual detalhe você percebeu primeiro.",
    "suggestedTitle": "O que o visual de Lucia revela em GTA VI",
    "suggestedCaption": "Resumo direto para acompanhar o assunto sem ruído. Comente qual detalhe você percebeu primeiro.",
    "recommendedVisual": "Imagens de personagens para identificação e clipes sem áudio para desenvolver a leitura.",
    "gdriveCategory": "Personagens + Cenas sem Áudio\nCena de abertura sugerida: Retrato de Lucia com três marcadores numerados.\nCenas de apoio: Retrato do personagem, dois clipes de ação ou expressão e um frame de contexto.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 5–7 cortes\nCampos que precisam ser adaptados: [CENA], [POSTURA], [AMBIENTE], [REAÇÃO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-32",
    "code": "32",
    "title": "Jason Duval e linguagem corporal",
    "category": "Personagens",
    "theme": "Jason Duval e linguagem corporal",
    "objective": "Transformar traços visuais e relações do elenco em uma narrativa curta e memorável.",
    "suggestedDurationSeconds": 25,
    "hook": "Jason quase não precisa falar para mostrar o que sente nesta cena.",
    "context": "Apresente [CENA] e mantenha o foco no corpo, não no diálogo.",
    "development": "Separe olhar, posição das mãos e distância de outro personagem; explique o que cada sinal pode sugerir.",
    "closing": "A linguagem corporal aponta tensão, mas o motivo ainda depende do contexto.",
    "cta": "Salve para comparar quando surgir novo material.",
    "suggestedTitle": "A linguagem corporal de Jason em GTA VI",
    "suggestedCaption": "O detalhe fica mais claro quando você pausa a cena. Salve para comparar quando surgir novo material.",
    "recommendedVisual": "Imagens de personagens para identificação e clipes sem áudio para desenvolver a leitura.",
    "gdriveCategory": "Personagens + Cenas sem Áudio\nCena de abertura sugerida: Close no gesto mais claro antes de mostrar o restante da cena.\nCenas de apoio: Retrato do personagem, dois clipes de ação ou expressão e um frame de contexto.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 8–11 cortes\nCampos que precisam ser adaptados: [CENA], [GESTO], [PERSONAGEM AO LADO], [EMOÇÃO POSSÍVEL]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-33",
    "code": "33",
    "title": "Raul Bautista e sua função narrativa",
    "category": "Personagens",
    "theme": "Raul Bautista e sua função narrativa",
    "objective": "Transformar traços visuais e relações do elenco em uma narrativa curta e memorável.",
    "suggestedDurationSeconds": 30,
    "hook": "Raul pode ser mais do que apoio: o modo como ele aparece muda a dinâmica do grupo.",
    "context": "Apresente Raul e a situação visível, sem antecipar papel não confirmado.",
    "development": "Analise posição, interação e objetivo aparente; proponha duas funções narrativas possíveis.",
    "closing": "O material abre possibilidades, mas ainda não define de que lado Raul estará.",
    "cta": "Compartilhe com quem acompanha GTA VI.",
    "suggestedTitle": "Qual pode ser o papel de Raul Bautista?",
    "suggestedCaption": "Hipótese boa precisa de evidência e contraponto. Compartilhe com quem acompanha GTA VI.",
    "recommendedVisual": "Imagens de personagens para identificação e clipes sem áudio para desenvolver a leitura.",
    "gdriveCategory": "Personagens + Cenas sem Áudio\nCena de abertura sugerida: Imagem de Raul seguida de corte para o grupo ao redor.\nCenas de apoio: Retrato do personagem, dois clipes de ação ou expressão e um frame de contexto.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 12–16 cortes\nCampos que precisam ser adaptados: [CENA], [INTERAÇÃO], [FUNÇÃO 1], [FUNÇÃO 2]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-34",
    "code": "34",
    "title": "Cal Hampton e o personagem observador",
    "category": "Personagens",
    "theme": "Cal Hampton e o personagem observador",
    "objective": "Transformar traços visuais e relações do elenco em uma narrativa curta e memorável.",
    "suggestedDurationSeconds": 20,
    "hook": "Cal parece o tipo de personagem que entende o caos antes de entrar nele.",
    "context": "Mostre o material de Cal e descreva apenas o comportamento visível.",
    "development": "Organize três sinais: ambiente, expressão e relação com a informação; transforme-os em perfil provisório.",
    "closing": "Talvez ele não seja o mais barulhento, mas pode ser um dos mais informados.",
    "cta": "Qual leitura faz mais sentido para você?",
    "suggestedTitle": "Por que Cal Hampton merece atenção",
    "suggestedCaption": "Uma cena curta pode render uma leitura inteira. Qual leitura faz mais sentido para você?",
    "recommendedVisual": "Imagens de personagens para identificação e clipes sem áudio para desenvolver a leitura.",
    "gdriveCategory": "Personagens + Cenas sem Áudio\nCena de abertura sugerida: Retrato de Cal com um detalhe do ambiente surgindo ao lado.\nCenas de apoio: Retrato do personagem, dois clipes de ação ou expressão e um frame de contexto.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 7–10 cortes\nCampos que precisam ser adaptados: [CENA], [EXPRESSÃO], [AMBIENTE], [INFORMAÇÃO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-35",
    "code": "35",
    "title": "Boobie Ike e presença pública",
    "category": "Personagens",
    "theme": "Boobie Ike e presença pública",
    "objective": "Transformar traços visuais e relações do elenco em uma narrativa curta e memorável.",
    "suggestedDurationSeconds": 30,
    "hook": "Boobie Ike parece construído para dominar qualquer cena em que entra.",
    "context": "Apresente o personagem e o espaço social ao redor dele.",
    "development": "Mostre gestos, figurino e reação das pessoas; explique como isso comunica status ou carisma.",
    "closing": "A presença está clara; o alcance do personagem ainda será descoberto.",
    "cta": "Siga a Operação para continuar esta análise.",
    "suggestedTitle": "O carisma visual de Boobie Ike",
    "suggestedCaption": "Material visual certo deixa a explicação mais simples. Siga a Operação para continuar esta análise.",
    "recommendedVisual": "Imagens de personagens para identificação e clipes sem áudio para desenvolver a leitura.",
    "gdriveCategory": "Personagens + Cenas sem Áudio\nCena de abertura sugerida: Entrada de Boobie Ike com corte sincronizado ao movimento.\nCenas de apoio: Retrato do personagem, dois clipes de ação ou expressão e um frame de contexto.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 9–12 cortes\nCampos que precisam ser adaptados: [CENA], [GESTO], [FIGURINO], [REAÇÃO DO AMBIENTE]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-36",
    "code": "36",
    "title": "Dre'Quan Priest e ambição",
    "category": "Personagens",
    "theme": "Dre'Quan Priest e ambição",
    "objective": "Transformar traços visuais e relações do elenco em uma narrativa curta e memorável.",
    "suggestedDurationSeconds": 15,
    "hook": "Um detalhe no ambiente de Dre'Quan pode resumir exatamente o que ele quer conquistar.",
    "context": "Apresente o personagem junto de [OBJETO OU LOCAL].",
    "development": "Conecte cenário, postura e objetivo aparente em uma mini narrativa de ambição.",
    "closing": "É uma leitura visual do desejo do personagem, não uma missão confirmada.",
    "cta": "Escolha uma opção nos comentários.",
    "suggestedTitle": "A ambição de Dre'Quan Priest em uma cena",
    "suggestedCaption": "Observe o contexto antes de fechar uma conclusão. Escolha uma opção nos comentários.",
    "recommendedVisual": "Imagens de personagens para identificação e clipes sem áudio para desenvolver a leitura.",
    "gdriveCategory": "Personagens + Cenas sem Áudio\nCena de abertura sugerida: Plano do ambiente que revela Dre'Quan no segundo corte.\nCenas de apoio: Retrato do personagem, dois clipes de ação ou expressão e um frame de contexto.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 4–6 cortes\nCampos que precisam ser adaptados: [OBJETO OU LOCAL], [POSTURA], [OBJETIVO POSSÍVEL]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-37",
    "code": "37",
    "title": "Real Dimez como dupla",
    "category": "Personagens",
    "theme": "Real Dimez como dupla",
    "objective": "Transformar traços visuais e relações do elenco em uma narrativa curta e memorável.",
    "suggestedDurationSeconds": 25,
    "hook": "O segredo desta dupla está menos no que elas falam e mais em como dividem a cena.",
    "context": "Mostre as duas integrantes no mesmo enquadramento.",
    "development": "Analise posição, troca de olhares e alternância de protagonismo; explique como a dupla cria identidade.",
    "closing": "Quando a imagem já vende a parceria, o roteiro ganha força antes do diálogo.",
    "cta": "Marque alguém que vai discordar dessa análise.",
    "suggestedTitle": "Como Real Dimez funciona como dupla",
    "suggestedCaption": "Comparar os frames muda a forma de enxergar o tema. Marque alguém que vai discordar dessa análise.",
    "recommendedVisual": "Imagens de personagens para identificação e clipes sem áudio para desenvolver a leitura.",
    "gdriveCategory": "Personagens + Cenas sem Áudio\nCena de abertura sugerida: Frame simétrico da dupla com os nomes entrando em lados opostos.\nCenas de apoio: Retrato do personagem, dois clipes de ação ou expressão e um frame de contexto.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 11–15 cortes\nCampos que precisam ser adaptados: [CENA], [GESTO 1], [GESTO 2], [DINÂMICA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-38",
    "code": "38",
    "title": "Brian Heder e o contraste cômico",
    "category": "Personagens",
    "theme": "Brian Heder e o contraste cômico",
    "objective": "Transformar traços visuais e relações do elenco em uma narrativa curta e memorável.",
    "suggestedDurationSeconds": 20,
    "hook": "Brian parece deslocado da situação — e é exatamente isso que torna a cena interessante.",
    "context": "Apresente o ambiente e depois a reação do personagem.",
    "development": "Mostre o contraste entre expectativa, comportamento e consequência; evite transformar uma cena em definição total.",
    "closing": "O humor nasce do contraste, mas o personagem pode ter outras camadas.",
    "cta": "Volte a este vídeo quando houver confirmação.",
    "suggestedTitle": "Por que Brian Heder chama atenção",
    "suggestedCaption": "A melhor pista pode estar fora do centro da cena. Volte a este vídeo quando houver confirmação.",
    "recommendedVisual": "Imagens de personagens para identificação e clipes sem áudio para desenvolver a leitura.",
    "gdriveCategory": "Personagens + Cenas sem Áudio\nCena de abertura sugerida: Ambiente sério cortando para a reação de Brian.\nCenas de apoio: Retrato do personagem, dois clipes de ação ou expressão e um frame de contexto.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 8–12 cortes\nCampos que precisam ser adaptados: [CENA], [EXPECTATIVA], [REAÇÃO], [CONTRASTE]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-39",
    "code": "39",
    "title": "Relação entre dois personagens",
    "category": "Personagens",
    "theme": "Relação entre dois personagens",
    "objective": "Transformar traços visuais e relações do elenco em uma narrativa curta e memorável.",
    "suggestedDurationSeconds": 25,
    "hook": "A distância entre [PERSONAGEM A] e [PERSONAGEM B] diz mais do que o diálogo desta cena.",
    "context": "Mostre o enquadramento inteiro e identifique a situação.",
    "development": "Analise proximidade, direção do olhar e quem controla o espaço; proponha a dinâmica mais provável.",
    "closing": "A cena sugere confiança, tensão ou dependência — escolha com base nas evidências.",
    "cta": "Diga qual ponto merece uma parte 2.",
    "suggestedTitle": "O que esta cena revela sobre [PERSONAGEM A] e [PERSONAGEM B]",
    "suggestedCaption": "Este formato foi pensado para gerar discussão com critério. Diga qual ponto merece uma parte 2.",
    "recommendedVisual": "Imagens de personagens para identificação e clipes sem áudio para desenvolver a leitura.",
    "gdriveCategory": "Personagens + Cenas sem Áudio\nCena de abertura sugerida: Freeze frame com uma linha ligando os dois personagens.\nCenas de apoio: Retrato do personagem, dois clipes de ação ou expressão e um frame de contexto.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 5–8 cortes\nCampos que precisam ser adaptados: [PERSONAGEM A], [PERSONAGEM B], [CENA], [DINÂMICA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-40",
    "code": "40",
    "title": "Elenco em ranking de impacto visual",
    "category": "Personagens",
    "theme": "Elenco em ranking de impacto visual",
    "objective": "Transformar traços visuais e relações do elenco em uma narrativa curta e memorável.",
    "suggestedDurationSeconds": 30,
    "hook": "Qual personagem causa a melhor primeira impressão sem depender de contexto?",
    "context": "Escolha três personagens e deixe claro o critério: presença visual no material disponível.",
    "development": "Dê um ponto forte para cada um e ordene do terceiro ao primeiro, justificando com imagem.",
    "closing": "O ranking mede impacto de apresentação, não importância na história.",
    "cta": "Envie para quem precisa ver o contexto completo.",
    "suggestedTitle": "Top 3 apresentações de personagens de GTA VI",
    "suggestedCaption": "Salve esta estrutura e adapte quando houver material novo. Envie para quem precisa ver o contexto completo.",
    "recommendedVisual": "Imagens de personagens para identificação e clipes sem áudio para desenvolver a leitura.",
    "gdriveCategory": "Personagens + Cenas sem Áudio\nCena de abertura sugerida: Três silhuetas numeradas antes da revelação.\nCenas de apoio: Retrato do personagem, dois clipes de ação ou expressão e um frame de contexto.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 13–18 cortes\nCampos que precisam ser adaptados: [PERSONAGEM 1], [PERSONAGEM 2], [PERSONAGEM 3], [CRITÉRIO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-41",
    "code": "41",
    "title": "Vice City em dois extremos",
    "category": "Locais e Cenários",
    "theme": "Vice City em dois extremos",
    "objective": "Mostrar como um lugar pode gerar histórias, rotas, conflitos e descobertas.",
    "suggestedDurationSeconds": 20,
    "hook": "Vice City parece vender luxo e caos na mesma avenida.",
    "context": "Apresente um plano luminoso e outro mais tenso da cidade.",
    "development": "Compare arquitetura, movimento e personagens; explique como o contraste pode gerar tipos diferentes de história.",
    "closing": "A cidade funciona porque o cartão-postal nunca está separado do conflito.",
    "cta": "Comente qual detalhe você percebeu primeiro.",
    "suggestedTitle": "As duas faces de Vice City em GTA VI",
    "suggestedCaption": "Resumo direto para acompanhar o assunto sem ruído. Comente qual detalhe você percebeu primeiro.",
    "recommendedVisual": "Imagens de locais para orientação, frames para detalhes e clipes sem áudio para ambientação.",
    "gdriveCategory": "Locais e Cenários + Frames Principais + Cenas sem Áudio\nCena de abertura sugerida: Corte seco entre um plano bonito e outro caótico.\nCenas de apoio: Plano geral do local, dois detalhes, uma transição de rota e um frame de fechamento.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 5–7 cortes\nCampos que precisam ser adaptados: [CENA DE LUXO], [CENA DE CAOS], [CONTRASTE]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-42",
    "code": "42",
    "title": "Port Gellhorn como cidade de passagem",
    "category": "Locais e Cenários",
    "theme": "Port Gellhorn como cidade de passagem",
    "objective": "Mostrar como um lugar pode gerar histórias, rotas, conflitos e descobertas.",
    "suggestedDurationSeconds": 25,
    "hook": "Port Gellhorn pode parecer parada de estrada, mas tem material para histórias próprias.",
    "context": "Mostre visão geral, comércio e circulação do local.",
    "development": "Organize três funções possíveis: passagem, conflito e oportunidade; mantenha previsões como hipótese.",
    "closing": "Lugar secundário não significa conteúdo secundário.",
    "cta": "Salve para comparar quando surgir novo material.",
    "suggestedTitle": "Por que Port Gellhorn pode surpreender",
    "suggestedCaption": "O detalhe fica mais claro quando você pausa a cena. Salve para comparar quando surgir novo material.",
    "recommendedVisual": "Imagens de locais para orientação, frames para detalhes e clipes sem áudio para ambientação.",
    "gdriveCategory": "Locais e Cenários + Frames Principais + Cenas sem Áudio\nCena de abertura sugerida: Placa ou entrada de Port Gellhorn seguida do plano geral.\nCenas de apoio: Plano geral do local, dois detalhes, uma transição de rota e um frame de fechamento.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 8–11 cortes\nCampos que precisam ser adaptados: [FRAME], [COMÉRCIO], [ROTA], [POSSÍVEL CONFLITO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-43",
    "code": "43",
    "title": "Ambrosia e poder industrial",
    "category": "Locais e Cenários",
    "theme": "Ambrosia e poder industrial",
    "objective": "Mostrar como um lugar pode gerar histórias, rotas, conflitos e descobertas.",
    "suggestedDurationSeconds": 30,
    "hook": "Ambrosia pode contar sua história pelas máquinas, não pelos personagens.",
    "context": "Apresente estruturas, veículos e ritmo visual do ambiente.",
    "development": "Explique o que o cenário comunica sobre trabalho, economia e tensão; conecte com uma possibilidade de missão.",
    "closing": "A indústria vira narrativa quando cada elemento parece ter função.",
    "cta": "Compartilhe com quem acompanha GTA VI.",
    "suggestedTitle": "O que Ambrosia revela sobre o mundo de GTA VI",
    "suggestedCaption": "Hipótese boa precisa de evidência e contraponto. Compartilhe com quem acompanha GTA VI.",
    "recommendedVisual": "Imagens de locais para orientação, frames para detalhes e clipes sem áudio para ambientação.",
    "gdriveCategory": "Locais e Cenários + Frames Principais + Cenas sem Áudio\nCena de abertura sugerida: Máquina ou estrutura grande ocupando o quadro.\nCenas de apoio: Plano geral do local, dois detalhes, uma transição de rota e um frame de fechamento.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 12–16 cortes\nCampos que precisam ser adaptados: [ESTRUTURA], [VEÍCULO], [ATIVIDADE], [MISSÃO POSSÍVEL]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-44",
    "code": "44",
    "title": "Grassrivers e ambiente selvagem",
    "category": "Locais e Cenários",
    "theme": "Grassrivers e ambiente selvagem",
    "objective": "Mostrar como um lugar pode gerar histórias, rotas, conflitos e descobertas.",
    "suggestedDurationSeconds": 20,
    "hook": "Em Grassrivers, o próprio cenário pode ser o maior obstáculo.",
    "context": "Mostre água, vegetação e visibilidade do local.",
    "development": "Liste três desafios plausíveis: navegação, fauna e terreno; deixe claro o que é observação e o que é previsão.",
    "closing": "O mapa fica mais interessante quando o perigo não depende só de inimigos.",
    "cta": "Qual leitura faz mais sentido para você?",
    "suggestedTitle": "Os perigos possíveis de Grassrivers",
    "suggestedCaption": "Uma cena curta pode render uma leitura inteira. Qual leitura faz mais sentido para você?",
    "recommendedVisual": "Imagens de locais para orientação, frames para detalhes e clipes sem áudio para ambientação.",
    "gdriveCategory": "Locais e Cenários + Frames Principais + Cenas sem Áudio\nCena de abertura sugerida: Plano amplo com movimento lento sobre água ou vegetação.\nCenas de apoio: Plano geral do local, dois detalhes, uma transição de rota e um frame de fechamento.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 7–10 cortes\nCampos que precisam ser adaptados: [ÁREA], [FAUNA], [TERRENO], [DESAFIO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-45",
    "code": "45",
    "title": "Leonida Keys e rotas pela água",
    "category": "Locais e Cenários",
    "theme": "Leonida Keys e rotas pela água",
    "objective": "Mostrar como um lugar pode gerar histórias, rotas, conflitos e descobertas.",
    "suggestedDurationSeconds": 30,
    "hook": "Leonida Keys pode transformar água em estrada.",
    "context": "Apresente a distribuição de ilhas ou canais visível no material.",
    "development": "Mostre uma rota provável, o veículo adequado e como a geografia muda perseguição ou exploração.",
    "closing": "Se o mapa conectar terra e água com frequência, a mobilidade ganha outra lógica.",
    "cta": "Siga a Operação para continuar esta análise.",
    "suggestedTitle": "Como explorar Leonida Keys em GTA VI",
    "suggestedCaption": "Material visual certo deixa a explicação mais simples. Siga a Operação para continuar esta análise.",
    "recommendedVisual": "Imagens de locais para orientação, frames para detalhes e clipes sem áudio para ambientação.",
    "gdriveCategory": "Locais e Cenários + Frames Principais + Cenas sem Áudio\nCena de abertura sugerida: Vista aberta da água com linha de deslocamento animada.\nCenas de apoio: Plano geral do local, dois detalhes, uma transição de rota e um frame de fechamento.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 9–12 cortes\nCampos que precisam ser adaptados: [ILHA OU CANAL], [ROTA], [VEÍCULO], [OBJETIVO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-46",
    "code": "46",
    "title": "Mount Kalaga e verticalidade",
    "category": "Locais e Cenários",
    "theme": "Mount Kalaga e verticalidade",
    "objective": "Mostrar como um lugar pode gerar histórias, rotas, conflitos e descobertas.",
    "suggestedDurationSeconds": 15,
    "hook": "Este é o tipo de lugar que pode mudar completamente a forma de atravessar o mapa.",
    "context": "Mostre relevo, estrada e escala humana ou veicular.",
    "development": "Explique três usos possíveis da verticalidade: exploração, fuga e observação; evite prometer acesso onde não há confirmação.",
    "closing": "Altura não é apenas cenário quando interfere na rota.",
    "cta": "Escolha uma opção nos comentários.",
    "suggestedTitle": "A verticalidade de Mount Kalaga",
    "suggestedCaption": "Observe o contexto antes de fechar uma conclusão. Escolha uma opção nos comentários.",
    "recommendedVisual": "Imagens de locais para orientação, frames para detalhes e clipes sem áudio para ambientação.",
    "gdriveCategory": "Locais e Cenários + Frames Principais + Cenas sem Áudio\nCena de abertura sugerida: Plano vertical que começa no chão e sobe até o relevo.\nCenas de apoio: Plano geral do local, dois detalhes, uma transição de rota e um frame de fechamento.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 4–6 cortes\nCampos que precisam ser adaptados: [PONTO ALTO], [ESTRADA], [ROTA], [USO POSSÍVEL]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-47",
    "code": "47",
    "title": "Placas que constroem uma rota",
    "category": "Locais e Cenários",
    "theme": "Placas que constroem uma rota",
    "objective": "Mostrar como um lugar pode gerar histórias, rotas, conflitos e descobertas.",
    "suggestedDurationSeconds": 25,
    "hook": "Você pode montar uma rota inteira usando apenas as placas destes frames.",
    "context": "Apresente três placas ou referências de direção.",
    "development": "Ordene os sinais, proponha o caminho e aponte a ligação mais incerta.",
    "closing": "É um mapa provisório construído por evidências visuais.",
    "cta": "Marque alguém que vai discordar dessa análise.",
    "suggestedTitle": "A rota escondida nas placas de GTA VI",
    "suggestedCaption": "Comparar os frames muda a forma de enxergar o tema. Marque alguém que vai discordar dessa análise.",
    "recommendedVisual": "Imagens de locais para orientação, frames para detalhes e clipes sem áudio para ambientação.",
    "gdriveCategory": "Locais e Cenários + Frames Principais + Cenas sem Áudio\nCena de abertura sugerida: Três placas surgindo como peças de um mapa.\nCenas de apoio: Plano geral do local, dois detalhes, uma transição de rota e um frame de fechamento.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 11–15 cortes\nCampos que precisam ser adaptados: [PLACA 1], [PLACA 2], [PLACA 3], [DESTINO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-48",
    "code": "48",
    "title": "Praia de dia e de noite",
    "category": "Locais e Cenários",
    "theme": "Praia de dia e de noite",
    "objective": "Mostrar como um lugar pode gerar histórias, rotas, conflitos e descobertas.",
    "suggestedDurationSeconds": 20,
    "hook": "O mesmo lugar pode parecer dois mapas diferentes quando a luz muda.",
    "context": "Mostre o cenário em dois horários ou condições visuais.",
    "development": "Compare público, cor, atividade e sensação de segurança; conecte cada versão a um tipo de conteúdo ou missão.",
    "closing": "A mudança de atmosfera pode ser tão importante quanto a mudança de local.",
    "cta": "Volte a este vídeo quando houver confirmação.",
    "suggestedTitle": "Dia vs noite nas praias de GTA VI",
    "suggestedCaption": "A melhor pista pode estar fora do centro da cena. Volte a este vídeo quando houver confirmação.",
    "recommendedVisual": "Imagens de locais para orientação, frames para detalhes e clipes sem áudio para ambientação.",
    "gdriveCategory": "Locais e Cenários + Frames Principais + Cenas sem Áudio\nCena de abertura sugerida: Transição alinhada entre o mesmo enquadramento em dois horários.\nCenas de apoio: Plano geral do local, dois detalhes, uma transição de rota e um frame de fechamento.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 8–12 cortes\nCampos que precisam ser adaptados: [PRAIA OU LOCAL], [CENA DIURNA], [CENA NOTURNA], [DIFERENÇA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-49",
    "code": "49",
    "title": "Densidade urbana e interiores",
    "category": "Locais e Cenários",
    "theme": "Densidade urbana e interiores",
    "objective": "Mostrar como um lugar pode gerar histórias, rotas, conflitos e descobertas.",
    "suggestedDurationSeconds": 25,
    "hook": "Esta avenida pode esconder mais conteúdo do que um bairro inteiro de jogos anteriores.",
    "context": "Mostre fluxo de pessoas, fachadas e entradas visíveis.",
    "development": "Conte sinais de atividade, separe prédios decorativos de candidatos a interação e formule uma expectativa realista.",
    "closing": "Densidade visual é confirmada; quantidade de interiores ainda não.",
    "cta": "Diga qual ponto merece uma parte 2.",
    "suggestedTitle": "Quantos interiores esta avenida pode esconder?",
    "suggestedCaption": "Este formato foi pensado para gerar discussão com critério. Diga qual ponto merece uma parte 2.",
    "recommendedVisual": "Imagens de locais para orientação, frames para detalhes e clipes sem áudio para ambientação.",
    "gdriveCategory": "Locais e Cenários + Frames Principais + Cenas sem Áudio\nCena de abertura sugerida: Travelling pela avenida com contadores aparecendo.\nCenas de apoio: Plano geral do local, dois detalhes, uma transição de rota e um frame de fechamento.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 5–8 cortes\nCampos que precisam ser adaptados: [AVENIDA OU LOCAL], [FACHADA], [ENTRADA], [SINAL DE ATIVIDADE]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-50",
    "code": "50",
    "title": "Tour por três regiões",
    "category": "Locais e Cenários",
    "theme": "Tour por três regiões",
    "objective": "Mostrar como um lugar pode gerar histórias, rotas, conflitos e descobertas.",
    "suggestedDurationSeconds": 30,
    "hook": "Se você tivesse um dia em Leonida, esta seria uma rota para ver três mundos diferentes.",
    "context": "Defina ponto inicial e objetivo do tour.",
    "development": "Passe por [LOCAL 1], [LOCAL 2] e [LOCAL 3], dando uma função narrativa para cada parada.",
    "closing": "Três regiões, três atmosferas e uma linha editorial pronta.",
    "cta": "Envie para quem precisa ver o contexto completo.",
    "suggestedTitle": "Rota de 1 dia por Leonida",
    "suggestedCaption": "Salve esta estrutura e adapte quando houver material novo. Envie para quem precisa ver o contexto completo.",
    "recommendedVisual": "Imagens de locais para orientação, frames para detalhes e clipes sem áudio para ambientação.",
    "gdriveCategory": "Locais e Cenários + Frames Principais + Cenas sem Áudio\nCena de abertura sugerida: Mapa simples com três pontos numerados.\nCenas de apoio: Plano geral do local, dois detalhes, uma transição de rota e um frame de fechamento.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 13–18 cortes\nCampos que precisam ser adaptados: [LOCAL 1], [LOCAL 2], [LOCAL 3], [ROTA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-51",
    "code": "51",
    "title": "Leitura visual de dirigibilidade",
    "category": "Veículos e Gameplay",
    "theme": "Leitura visual de dirigibilidade",
    "objective": "Explicar uma mecânica ou possibilidade de gameplay com foco visual e aplicação prática.",
    "suggestedDurationSeconds": 20,
    "hook": "Sem tocar no controle, esta cena já dá pistas sobre como [VEÍCULO] pode se comportar.",
    "context": "Mostre curva, frenagem ou transferência de peso.",
    "development": "Analise movimento da carroceria, aderência e reação do ambiente, deixando claro que é leitura visual.",
    "closing": "A cena sugere sensação de peso; o controle real só poderá ser testado.",
    "cta": "Comente qual detalhe você percebeu primeiro.",
    "suggestedTitle": "O que esta cena sugere sobre a direção de GTA VI",
    "suggestedCaption": "Resumo direto para acompanhar o assunto sem ruído. Comente qual detalhe você percebeu primeiro.",
    "recommendedVisual": "Cenas com e sem áudio para movimento, perseguições e leitura de mecânicas.",
    "gdriveCategory": "Cenas com Áudio + Cenas sem Áudio\nCena de abertura sugerida: Curva do veículo em velocidade normal e repetição lenta.\nCenas de apoio: Ação principal, detalhe do veículo ou sistema, reação do ambiente e repetição em outro ângulo.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 5–7 cortes\nCampos que precisam ser adaptados: [VEÍCULO], [MANOBRA], [PISTA VISUAL], [LIMITAÇÃO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-52",
    "code": "52",
    "title": "Evolução das perseguições",
    "category": "Veículos e Gameplay",
    "theme": "Evolução das perseguições",
    "objective": "Explicar uma mecânica ou possibilidade de gameplay com foco visual e aplicação prática.",
    "suggestedDurationSeconds": 25,
    "hook": "A polícia não precisa ser mais numerosa para tornar uma perseguição muito mais difícil.",
    "context": "Apresente uma cena de fuga e identifique as respostas visíveis.",
    "development": "Organize pressão em três camadas: bloqueio, perseguição e reação do ambiente; não extrapole além do material.",
    "closing": "A evolução pode estar na coordenação, não apenas na quantidade.",
    "cta": "Salve para comparar quando surgir novo material.",
    "suggestedTitle": "Como as perseguições podem evoluir em GTA VI",
    "suggestedCaption": "O detalhe fica mais claro quando você pausa a cena. Salve para comparar quando surgir novo material.",
    "recommendedVisual": "Cenas com e sem áudio para movimento, perseguições e leitura de mecânicas.",
    "gdriveCategory": "Cenas com Áudio + Cenas sem Áudio\nCena de abertura sugerida: Bloqueio ou viatura entrando rapidamente no quadro.\nCenas de apoio: Ação principal, detalhe do veículo ou sistema, reação do ambiente e repetição em outro ângulo.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 8–11 cortes\nCampos que precisam ser adaptados: [CENA], [BLOQUEIO], [REAÇÃO], [MECÂNICA POSSÍVEL]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-53",
    "code": "53",
    "title": "Barcos como ferramenta de gameplay",
    "category": "Veículos e Gameplay",
    "theme": "Barcos como ferramenta de gameplay",
    "objective": "Explicar uma mecânica ou possibilidade de gameplay com foco visual e aplicação prática.",
    "suggestedDurationSeconds": 30,
    "hook": "Neste mapa, barco pode deixar de ser passeio e virar estratégia.",
    "context": "Mostre canal, costa ou ilha e o veículo aquático disponível.",
    "development": "Apresente três usos: fuga, acesso e transporte; inclua um risco para equilibrar.",
    "closing": "A água ganha valor quando encurta rotas ou abre alternativas.",
    "cta": "Compartilhe com quem acompanha GTA VI.",
    "suggestedTitle": "3 usos para barcos em GTA VI",
    "suggestedCaption": "Hipótese boa precisa de evidência e contraponto. Compartilhe com quem acompanha GTA VI.",
    "recommendedVisual": "Cenas com e sem áudio para movimento, perseguições e leitura de mecânicas.",
    "gdriveCategory": "Cenas com Áudio + Cenas sem Áudio\nCena de abertura sugerida: Barco acelerando em direção a uma rota estreita.\nCenas de apoio: Ação principal, detalhe do veículo ou sistema, reação do ambiente e repetição em outro ângulo.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 12–16 cortes\nCampos que precisam ser adaptados: [LOCAL], [BARCO], [USO 1], [USO 2], [USO 3]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-54",
    "code": "54",
    "title": "Aeronaves e leitura do mapa",
    "category": "Veículos e Gameplay",
    "theme": "Aeronaves e leitura do mapa",
    "objective": "Explicar uma mecânica ou possibilidade de gameplay com foco visual e aplicação prática.",
    "suggestedDurationSeconds": 20,
    "hook": "Ver Leonida do alto pode mudar mais do que a paisagem.",
    "context": "Apresente [AERONAVE] ou plano aéreo e a área observada.",
    "development": "Explique como altitude ajuda em reconhecimento, rota e fuga; separe expectativa de mecânica confirmada.",
    "closing": "O céu pode virar ferramenta de planejamento, não só transporte.",
    "cta": "Qual leitura faz mais sentido para você?",
    "suggestedTitle": "Como aeronaves podem mudar a exploração",
    "suggestedCaption": "Uma cena curta pode render uma leitura inteira. Qual leitura faz mais sentido para você?",
    "recommendedVisual": "Cenas com e sem áudio para movimento, perseguições e leitura de mecânicas.",
    "gdriveCategory": "Cenas com Áudio + Cenas sem Áudio\nCena de abertura sugerida: Plano aéreo com três pontos do mapa destacados.\nCenas de apoio: Ação principal, detalhe do veículo ou sistema, reação do ambiente e repetição em outro ângulo.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 7–10 cortes\nCampos que precisam ser adaptados: [AERONAVE], [LOCAL], [ROTA], [MECÂNICA POSSÍVEL]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-55",
    "code": "55",
    "title": "Motocicleta entre trânsito e atalhos",
    "category": "Veículos e Gameplay",
    "theme": "Motocicleta entre trânsito e atalhos",
    "objective": "Explicar uma mecânica ou possibilidade de gameplay com foco visual e aplicação prática.",
    "suggestedDurationSeconds": 30,
    "hook": "Uma moto pode ser a pior escolha para proteção e a melhor para escapar.",
    "context": "Mostre corredor estreito, trânsito ou mudança rápida de direção.",
    "development": "Compare mobilidade, exposição e rota; termine com a situação em que a escolha faz sentido.",
    "closing": "O melhor veículo depende do terreno, não do preço.",
    "cta": "Siga a Operação para continuar esta análise.",
    "suggestedTitle": "Quando escolher uma moto em GTA VI",
    "suggestedCaption": "Material visual certo deixa a explicação mais simples. Siga a Operação para continuar esta análise.",
    "recommendedVisual": "Cenas com e sem áudio para movimento, perseguições e leitura de mecânicas.",
    "gdriveCategory": "Cenas com Áudio + Cenas sem Áudio\nCena de abertura sugerida: Moto atravessando um espaço onde um carro não passaria.\nCenas de apoio: Ação principal, detalhe do veículo ou sistema, reação do ambiente e repetição em outro ângulo.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 9–12 cortes\nCampos que precisam ser adaptados: [MOTO], [LOCAL], [ATALHO], [RISCO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-56",
    "code": "56",
    "title": "Danos e persistência visual",
    "category": "Veículos e Gameplay",
    "theme": "Danos e persistência visual",
    "objective": "Explicar uma mecânica ou possibilidade de gameplay com foco visual e aplicação prática.",
    "suggestedDurationSeconds": 15,
    "hook": "O dano neste veículo pode contar o que aconteceu antes da cena começar.",
    "context": "Mostre amassado, vidro ou sujeira e localize o momento.",
    "development": "Leia três marcas, proponha a sequência anterior e diferencie dano visual de sistema persistente.",
    "closing": "O frame conta uma história; a duração do dano ainda precisa ser testada.",
    "cta": "Escolha uma opção nos comentários.",
    "suggestedTitle": "O veículo que conta a cena anterior",
    "suggestedCaption": "Observe o contexto antes de fechar uma conclusão. Escolha uma opção nos comentários.",
    "recommendedVisual": "Cenas com e sem áudio para movimento, perseguições e leitura de mecânicas.",
    "gdriveCategory": "Cenas com Áudio + Cenas sem Áudio\nCena de abertura sugerida: Close nos danos antes de revelar o veículo inteiro.\nCenas de apoio: Ação principal, detalhe do veículo ou sistema, reação do ambiente e repetição em outro ângulo.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 4–6 cortes\nCampos que precisam ser adaptados: [VEÍCULO], [DANO 1], [DANO 2], [SEQUÊNCIA POSSÍVEL]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-57",
    "code": "57",
    "title": "Trânsito e comportamento do mundo",
    "category": "Veículos e Gameplay",
    "theme": "Trânsito e comportamento do mundo",
    "objective": "Explicar uma mecânica ou possibilidade de gameplay com foco visual e aplicação prática.",
    "suggestedDurationSeconds": 25,
    "hook": "O teste mais interessante desta cena não é o carro do jogador, mas o que o trânsito faz ao redor.",
    "context": "Reproduza o trecho e destaque dois veículos ou pedestres externos.",
    "development": "Analise reação, formação de espaço e recuperação do fluxo; proponha o sistema apenas como possibilidade.",
    "closing": "Mundo vivo aparece quando o cenário reage sem esperar pelo jogador.",
    "cta": "Marque alguém que vai discordar dessa análise.",
    "suggestedTitle": "O trânsito de GTA VI parece mais vivo?",
    "suggestedCaption": "Comparar os frames muda a forma de enxergar o tema. Marque alguém que vai discordar dessa análise.",
    "recommendedVisual": "Cenas com e sem áudio para movimento, perseguições e leitura de mecânicas.",
    "gdriveCategory": "Cenas com Áudio + Cenas sem Áudio\nCena de abertura sugerida: Cena rodando com marcações acompanhando dois elementos do trânsito.\nCenas de apoio: Ação principal, detalhe do veículo ou sistema, reação do ambiente e repetição em outro ângulo.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 11–15 cortes\nCampos que precisam ser adaptados: [CENA], [REAÇÃO 1], [REAÇÃO 2], [SISTEMA POSSÍVEL]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-58",
    "code": "58",
    "title": "Plano de fuga de um golpe",
    "category": "Veículos e Gameplay",
    "theme": "Plano de fuga de um golpe",
    "objective": "Explicar uma mecânica ou possibilidade de gameplay com foco visual e aplicação prática.",
    "suggestedDurationSeconds": 20,
    "hook": "O carro mais rápido pode não ser o melhor para este golpe.",
    "context": "Defina [OBJETIVO], terreno e nível de exposição.",
    "development": "Escolha veículo, rota e troca de transporte; explique o motivo de cada decisão.",
    "closing": "Uma boa fuga resolve velocidade, discrição e saída — nessa ordem.",
    "cta": "Volte a este vídeo quando houver confirmação.",
    "suggestedTitle": "Montando a fuga perfeita em GTA VI",
    "suggestedCaption": "A melhor pista pode estar fora do centro da cena. Volte a este vídeo quando houver confirmação.",
    "recommendedVisual": "Cenas com e sem áudio para movimento, perseguições e leitura de mecânicas.",
    "gdriveCategory": "Cenas com Áudio + Cenas sem Áudio\nCena de abertura sugerida: Mapa da fuga com veículo entrando no primeiro ponto.\nCenas de apoio: Ação principal, detalhe do veículo ou sistema, reação do ambiente e repetição em outro ângulo.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 8–12 cortes\nCampos que precisam ser adaptados: [OBJETIVO], [LOCAL], [VEÍCULO], [ROTA], [PLANO B]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-59",
    "code": "59",
    "title": "Economia de veículos e escolhas",
    "category": "Veículos e Gameplay",
    "theme": "Economia de veículos e escolhas",
    "objective": "Explicar uma mecânica ou possibilidade de gameplay com foco visual e aplicação prática.",
    "suggestedDurationSeconds": 25,
    "hook": "Comprar o veículo mais caro pode atrasar todo o resto do seu progresso.",
    "context": "Apresente [VEÍCULO OU CATEGORIA] e a decisão econômica.",
    "development": "Compare custo, utilidade e frequência de uso; transforme em regra simples de prioridade.",
    "closing": "Valor não é preço: é quanto a escolha melhora sua rotina de jogo.",
    "cta": "Diga qual ponto merece uma parte 2.",
    "suggestedTitle": "Como escolher seu primeiro veículo em GTA VI",
    "suggestedCaption": "Este formato foi pensado para gerar discussão com critério. Diga qual ponto merece uma parte 2.",
    "recommendedVisual": "Cenas com e sem áudio para movimento, perseguições e leitura de mecânicas.",
    "gdriveCategory": "Cenas com Áudio + Cenas sem Áudio\nCena de abertura sugerida: Dois veículos lado a lado com etiquetas “desejo” e “utilidade”.\nCenas de apoio: Ação principal, detalhe do veículo ou sistema, reação do ambiente e repetição em outro ângulo.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 5–8 cortes\nCampos que precisam ser adaptados: [VEÍCULO OU CATEGORIA], [CUSTO], [USO], [ALTERNATIVA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-60",
    "code": "60",
    "title": "Testes para o primeiro dia",
    "category": "Veículos e Gameplay",
    "theme": "Testes para o primeiro dia",
    "objective": "Explicar uma mecânica ou possibilidade de gameplay com foco visual e aplicação prática.",
    "suggestedDurationSeconds": 30,
    "hook": "Quando GTA VI chegar, estes são os cinco testes que revelam como o mundo realmente funciona.",
    "context": "Apresente a lista como plano futuro, não como recurso confirmado.",
    "development": "Inclua reação de NPC, perseguição, dano, água e troca de ambiente; diga o que observar em cada teste.",
    "closing": "Testar com método transforma gameplay em semanas de conteúdo.",
    "cta": "Envie para quem precisa ver o contexto completo.",
    "suggestedTitle": "5 testes para fazer no primeiro dia de GTA VI",
    "suggestedCaption": "Salve esta estrutura e adapte quando houver material novo. Envie para quem precisa ver o contexto completo.",
    "recommendedVisual": "Cenas com e sem áudio para movimento, perseguições e leitura de mecânicas.",
    "gdriveCategory": "Cenas com Áudio + Cenas sem Áudio\nCena de abertura sugerida: Checklist aparecendo sobre montagem rápida de gameplay.\nCenas de apoio: Ação principal, detalhe do veículo ou sistema, reação do ambiente e repetição em outro ângulo.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 13–18 cortes\nCampos que precisam ser adaptados: [TESTE 1], [TESTE 2], [TESTE 3], [TESTE 4], [TESTE 5]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-61",
    "code": "61",
    "title": "Praias de GTA V vs GTA VI",
    "category": "Comparações",
    "theme": "Praias de GTA V vs GTA VI",
    "objective": "Deixar uma diferença fácil de perceber por meio de contraste visual e critério claro.",
    "suggestedDurationSeconds": 20,
    "hook": "A diferença entre estas praias não está só nos gráficos.",
    "context": "Mostre enquadramentos equivalentes de GTA V e GTA VI.",
    "development": "Compare densidade, atividade e identidade visual; evite atribuir gameplay ao que é apenas imagem.",
    "closing": "A evolução mais forte pode estar no comportamento do lugar.",
    "cta": "Comente qual detalhe você percebeu primeiro.",
    "suggestedTitle": "GTA V vs GTA VI: praias lado a lado",
    "suggestedCaption": "Resumo direto para acompanhar o assunto sem ruído. Comente qual detalhe você percebeu primeiro.",
    "recommendedVisual": "Frames e imagens para lado a lado, com clipes sem áudio para demonstrar movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Divisão vertical sincronizada entre as duas praias.\nCenas de apoio: Material A, material B, recortes equivalentes e tela final com o critério da comparação.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 5–7 cortes\nCampos que precisam ser adaptados: [FRAME GTA V], [FRAME GTA VI], [CRITÉRIO 1], [CRITÉRIO 2]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-62",
    "code": "62",
    "title": "Densidade de NPCs entre gerações",
    "category": "Comparações",
    "theme": "Densidade de NPCs entre gerações",
    "objective": "Deixar uma diferença fácil de perceber por meio de contraste visual e critério claro.",
    "suggestedDurationSeconds": 25,
    "hook": "Mais NPCs não significam automaticamente um mundo mais vivo.",
    "context": "Apresente duas cenas com espaço e horário comparáveis.",
    "development": "Conte presença, variedade e reação; dê peso maior ao comportamento do que ao volume.",
    "closing": "Densidade impressiona, mas interação decide a evolução.",
    "cta": "Salve para comparar quando surgir novo material.",
    "suggestedTitle": "GTA V vs GTA VI: qual cidade parece mais viva?",
    "suggestedCaption": "O detalhe fica mais claro quando você pausa a cena. Salve para comparar quando surgir novo material.",
    "recommendedVisual": "Frames e imagens para lado a lado, com clipes sem áudio para demonstrar movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Contadores surgindo sobre cenas lado a lado.\nCenas de apoio: Material A, material B, recortes equivalentes e tela final com o critério da comparação.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 8–11 cortes\nCampos que precisam ser adaptados: [CENA GTA V], [CENA GTA VI], [CONTAGEM], [REAÇÃO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-63",
    "code": "63",
    "title": "Iluminação e atmosfera",
    "category": "Comparações",
    "theme": "Iluminação e atmosfera",
    "objective": "Deixar uma diferença fácil de perceber por meio de contraste visual e critério claro.",
    "suggestedDurationSeconds": 30,
    "hook": "A luz muda completamente a história que esta rua parece contar.",
    "context": "Escolha cenas com clima ou horário semelhante.",
    "development": "Compare sombras, reflexos e cor; explique como cada elemento afeta leitura e não apenas beleza.",
    "closing": "Tecnologia chama atenção quando também melhora a atmosfera.",
    "cta": "Compartilhe com quem acompanha GTA VI.",
    "suggestedTitle": "A evolução da iluminação de GTA V para GTA VI",
    "suggestedCaption": "Hipótese boa precisa de evidência e contraponto. Compartilhe com quem acompanha GTA VI.",
    "recommendedVisual": "Frames e imagens para lado a lado, com clipes sem áudio para demonstrar movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Transição alinhada de uma luz ou reflexo equivalente.\nCenas de apoio: Material A, material B, recortes equivalentes e tela final com o critério da comparação.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 12–16 cortes\nCampos que precisam ser adaptados: [CENA A], [CENA B], [SOMBRA], [REFLEXO], [COR]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-64",
    "code": "64",
    "title": "Dupla de protagonistas e jogos anteriores",
    "category": "Comparações",
    "theme": "Dupla de protagonistas e jogos anteriores",
    "objective": "Deixar uma diferença fácil de perceber por meio de contraste visual e critério claro.",
    "suggestedDurationSeconds": 20,
    "hook": "O maior contraste de GTA VI pode não ser o mapa, mas a forma como a história divide o protagonismo.",
    "context": "Apresente a dupla atual e o modelo narrativo usado como comparação.",
    "development": "Compare relação, conflito e possibilidade de alternância sem inventar detalhes da trama.",
    "closing": "Uma dupla forte não duplica a história; ela cria tensão entre perspectivas.",
    "cta": "Qual leitura faz mais sentido para você?",
    "suggestedTitle": "O que muda com a dupla de GTA VI",
    "suggestedCaption": "Uma cena curta pode render uma leitura inteira. Qual leitura faz mais sentido para você?",
    "recommendedVisual": "Frames e imagens para lado a lado, com clipes sem áudio para demonstrar movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Dois personagens atuais de um lado e referência anterior do outro.\nCenas de apoio: Material A, material B, recortes equivalentes e tela final com o critério da comparação.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 7–10 cortes\nCampos que precisam ser adaptados: [DUPLA], [JOGO ANTERIOR], [CRITÉRIO NARRATIVO], [LIMITAÇÃO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-65",
    "code": "65",
    "title": "Resposta policial",
    "category": "Comparações",
    "theme": "Resposta policial",
    "objective": "Deixar uma diferença fácil de perceber por meio de contraste visual e critério claro.",
    "suggestedDurationSeconds": 30,
    "hook": "Esta perseguição parece mais intensa, mas intensidade e inteligência são coisas diferentes.",
    "context": "Escolha duas cenas comparáveis e defina o mesmo ponto de análise.",
    "development": "Compare aproximação, bloqueio e reação ao caminho do jogador; sinalize quando a edição impede conclusão.",
    "closing": "A evolução real será medida pela adaptação, não pela quantidade de viaturas.",
    "cta": "Siga a Operação para continuar esta análise.",
    "suggestedTitle": "Polícia de GTA V vs GTA VI: o que parece mudar",
    "suggestedCaption": "Material visual certo deixa a explicação mais simples. Siga a Operação para continuar esta análise.",
    "recommendedVisual": "Frames e imagens para lado a lado, com clipes sem áudio para demonstrar movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Duas viaturas entrando em cena no mesmo ritmo.\nCenas de apoio: Material A, material B, recortes equivalentes e tela final com o critério da comparação.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 9–12 cortes\nCampos que precisam ser adaptados: [CENA GTA V], [CENA GTA VI], [BLOQUEIO], [REAÇÃO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-66",
    "code": "66",
    "title": "Detalhes dos veículos",
    "category": "Comparações",
    "theme": "Detalhes dos veículos",
    "objective": "Deixar uma diferença fácil de perceber por meio de contraste visual e critério claro.",
    "suggestedDurationSeconds": 15,
    "hook": "Coloque estes carros lado a lado e observe o que acontece fora da pintura.",
    "context": "Mostre modelos ou situações visualmente equivalentes.",
    "development": "Compare interior, suspensão e dano aparente; escolha um vencedor por critério.",
    "closing": "O detalhe mais importante é aquele que reage ao movimento.",
    "cta": "Escolha uma opção nos comentários.",
    "suggestedTitle": "Carros de GTA V vs GTA VI em 3 detalhes",
    "suggestedCaption": "Observe o contexto antes de fechar uma conclusão. Escolha uma opção nos comentários.",
    "recommendedVisual": "Frames e imagens para lado a lado, com clipes sem áudio para demonstrar movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Close alternado em três partes dos veículos.\nCenas de apoio: Material A, material B, recortes equivalentes e tela final com o critério da comparação.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 4–6 cortes\nCampos que precisam ser adaptados: [VEÍCULO A], [VEÍCULO B], [INTERIOR], [SUSPENSÃO], [DANO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-67",
    "code": "67",
    "title": "Diversidade de regiões",
    "category": "Comparações",
    "theme": "Diversidade de regiões",
    "objective": "Deixar uma diferença fácil de perceber por meio de contraste visual e critério claro.",
    "suggestedDurationSeconds": 25,
    "hook": "O novo mapa parece maior porque muda de identidade mais rápido, não apenas porque ocupa mais espaço.",
    "context": "Selecione três regiões de cada referência ou limite a comparação ao material disponível.",
    "development": "Compare clima, arquitetura e atividade; evite estimar tamanho sem escala confiável.",
    "closing": "Variedade percebida pode ser mais valiosa do que quilômetros anunciados.",
    "cta": "Marque alguém que vai discordar dessa análise.",
    "suggestedTitle": "GTA V vs GTA VI: qual mapa parece mais diverso?",
    "suggestedCaption": "Comparar os frames muda a forma de enxergar o tema. Marque alguém que vai discordar dessa análise.",
    "recommendedVisual": "Frames e imagens para lado a lado, com clipes sem áudio para demonstrar movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Montagem de três biomas ou cidades em sequência.\nCenas de apoio: Material A, material B, recortes equivalentes e tela final com o critério da comparação.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 11–15 cortes\nCampos que precisam ser adaptados: [REGIÃO A], [REGIÃO B], [CRITÉRIO], [LIMITAÇÃO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-68",
    "code": "68",
    "title": "Internet e sátira social",
    "category": "Comparações",
    "theme": "Internet e sátira social",
    "objective": "Deixar uma diferença fácil de perceber por meio de contraste visual e critério claro.",
    "suggestedDurationSeconds": 20,
    "hook": "A internet de GTA VI parece menos uma tela e mais parte do próprio mundo.",
    "context": "Apresente uma referência social de cada jogo ou geração.",
    "development": "Compare formato, velocidade da piada e integração com personagens; mantenha a análise no material visível.",
    "closing": "A sátira evolui quando acompanha como as pessoas realmente se exibem.",
    "cta": "Volte a este vídeo quando houver confirmação.",
    "suggestedTitle": "Como a sátira da internet mudou em GTA VI",
    "suggestedCaption": "A melhor pista pode estar fora do centro da cena. Volte a este vídeo quando houver confirmação.",
    "recommendedVisual": "Frames e imagens para lado a lado, com clipes sem áudio para demonstrar movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Rolagem rápida entre duas interfaces ou cenas sociais.\nCenas de apoio: Material A, material B, recortes equivalentes e tela final com o critério da comparação.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 8–12 cortes\nCampos que precisam ser adaptados: [REFERÊNCIA GTA V], [REFERÊNCIA GTA VI], [COMPORTAMENTO], [PIADA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-69",
    "code": "69",
    "title": "Interiores e sensação de acesso",
    "category": "Comparações",
    "theme": "Interiores e sensação de acesso",
    "objective": "Deixar uma diferença fácil de perceber por meio de contraste visual e critério claro.",
    "suggestedDurationSeconds": 25,
    "hook": "Uma cidade pode parecer enorme e ainda ser fechada — estes frames ajudam a comparar.",
    "context": "Escolha ruas com fachadas e entradas visíveis.",
    "development": "Conte sinais de acesso, atividade e profundidade; não transforme porta iluminada em interior confirmado.",
    "closing": "A comparação mede sensação de possibilidade, não número oficial de prédios.",
    "cta": "Diga qual ponto merece uma parte 2.",
    "suggestedTitle": "GTA V vs GTA VI: a evolução dos interiores?",
    "suggestedCaption": "Este formato foi pensado para gerar discussão com critério. Diga qual ponto merece uma parte 2.",
    "recommendedVisual": "Frames e imagens para lado a lado, com clipes sem áudio para demonstrar movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Duas fachadas com entradas destacadas.\nCenas de apoio: Material A, material B, recortes equivalentes e tela final com o critério da comparação.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 5–8 cortes\nCampos que precisam ser adaptados: [RUA A], [RUA B], [ENTRADA], [ATIVIDADE], [RESSALVA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-70",
    "code": "70",
    "title": "Trailer 1 vs Trailer 2",
    "category": "Comparações",
    "theme": "Trailer 1 vs Trailer 2",
    "objective": "Deixar uma diferença fácil de perceber por meio de contraste visual e critério claro.",
    "suggestedDurationSeconds": 30,
    "hook": "O segundo trailer muda a leitura do primeiro quando você compara estes três momentos.",
    "context": "Escolha cenas equivalentes ou pistas que se complementam nos dois materiais oficiais.",
    "development": "Compare personagem, local e tom; diga o que foi ampliado sem supor a história completa.",
    "closing": "O melhor detalhe do trailer novo pode ser a resposta silenciosa ao anterior.",
    "cta": "Envie para quem precisa ver o contexto completo.",
    "suggestedTitle": "Trailer 1 vs Trailer 2 de GTA VI",
    "suggestedCaption": "Salve esta estrutura e adapte quando houver material novo. Envie para quem precisa ver o contexto completo.",
    "recommendedVisual": "Frames e imagens para lado a lado, com clipes sem áudio para demonstrar movimento.",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura sugerida: Números 1 e 2 sobre frames oficiais que se alternam.\nCenas de apoio: Material A, material B, recortes equivalentes e tela final com o critério da comparação.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 13–18 cortes\nCampos que precisam ser adaptados: [MOMENTO 1], [MOMENTO 2], [PISTA], [MUDANÇA DE LEITURA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-71",
    "code": "71",
    "title": "A cena mais forte do material oficial",
    "category": "Hype, Opinião e Comunidade",
    "theme": "A cena mais forte do material oficial",
    "objective": "Gerar emoção ou participação sem exagerar fatos nem criar promessas falsas.",
    "suggestedDurationSeconds": 20,
    "hook": "Se eu tivesse um segundo para vender o hype de GTA VI, escolheria esta cena.",
    "context": "Mostre [CENA] inteira e defina o critério: impacto visual, não importância narrativa.",
    "development": "Explique composição, movimento e emoção em três batidas rápidas.",
    "closing": "Uma cena forte não revela tudo; ela faz o público querer continuar olhando.",
    "cta": "Comente qual detalhe você percebeu primeiro.",
    "suggestedTitle": "A cena que resume o hype de GTA VI",
    "suggestedCaption": "Resumo direto para acompanhar o assunto sem ruído. Comente qual detalhe você percebeu primeiro.",
    "recommendedVisual": "Trailers e cenas com áudio para intensidade, apoiados por frames nas pausas.",
    "gdriveCategory": "Trailers Oficiais + Cenas com Áudio + Frames Principais\nCena de abertura sugerida: Cena escolhida sem texto no primeiro meio segundo.\nCenas de apoio: Cena forte, reação visual, dois cortes de progressão e frame final para pergunta ou CTA.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 5–7 cortes\nCampos que precisam ser adaptados: [CENA], [MOVIMENTO], [DETALHE], [EMOÇÃO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-72",
    "code": "72",
    "title": "Opinião impopular sobre um recurso",
    "category": "Hype, Opinião e Comunidade",
    "theme": "Opinião impopular sobre um recurso",
    "objective": "Gerar emoção ou participação sem exagerar fatos nem criar promessas falsas.",
    "suggestedDurationSeconds": 25,
    "hook": "Opinião impopular: [RECURSO] pode ser menos importante do que a comunidade imagina.",
    "context": "Declare que é opinião e apresente o motivo principal sem provocar por provocar.",
    "development": "Dê dois argumentos, reconheça a melhor objeção e proponha o que teria mais impacto.",
    "closing": "Discordar faz parte; a discussão melhora quando o critério está claro.",
    "cta": "Salve para comparar quando surgir novo material.",
    "suggestedTitle": "Opinião impopular sobre GTA VI: [OPINIÃO]",
    "suggestedCaption": "O detalhe fica mais claro quando você pausa a cena. Salve para comparar quando surgir novo material.",
    "recommendedVisual": "Trailers e cenas com áudio para intensidade, apoiados por frames nas pausas.",
    "gdriveCategory": "Trailers Oficiais + Cenas com Áudio + Frames Principais\nCena de abertura sugerida: Texto “opinião impopular” sobre frame reconhecível.\nCenas de apoio: Cena forte, reação visual, dois cortes de progressão e frame final para pergunta ou CTA.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 8–11 cortes\nCampos que precisam ser adaptados: [RECURSO], [OPINIÃO], [ARGUMENTO 1], [ARGUMENTO 2], [OBJEÇÃO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-73",
    "code": "73",
    "title": "Escolha de personagem",
    "category": "Hype, Opinião e Comunidade",
    "theme": "Escolha de personagem",
    "objective": "Gerar emoção ou participação sem exagerar fatos nem criar promessas falsas.",
    "suggestedDurationSeconds": 30,
    "hook": "Você só pode acompanhar um destes personagens no primeiro dia. Quem escolhe?",
    "context": "Apresente duas ou três opções com imagens equivalentes.",
    "development": "Dê uma qualidade e uma dúvida de cada personagem; evite declarar favoritismo como fato.",
    "closing": "Sua escolha diz mais sobre o tipo de história que você quer viver.",
    "cta": "Compartilhe com quem acompanha GTA VI.",
    "suggestedTitle": "Qual personagem você escolheria primeiro?",
    "suggestedCaption": "Hipótese boa precisa de evidência e contraponto. Compartilhe com quem acompanha GTA VI.",
    "recommendedVisual": "Trailers e cenas com áudio para intensidade, apoiados por frames nas pausas.",
    "gdriveCategory": "Trailers Oficiais + Cenas com Áudio + Frames Principais\nCena de abertura sugerida: Cards dos personagens com contador de escolha.\nCenas de apoio: Cena forte, reação visual, dois cortes de progressão e frame final para pergunta ou CTA.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 12–16 cortes\nCampos que precisam ser adaptados: [PERSONAGEM 1], [PERSONAGEM 2], [PERSONAGEM 3]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-74",
    "code": "74",
    "title": "Primeiro local para visitar",
    "category": "Hype, Opinião e Comunidade",
    "theme": "Primeiro local para visitar",
    "objective": "Gerar emoção ou participação sem exagerar fatos nem criar promessas falsas.",
    "suggestedDurationSeconds": 20,
    "hook": "O jogo abriu: você vai direto para [LOCAL A] ou [LOCAL B]?",
    "context": "Mostre um plano forte de cada lugar.",
    "development": "Compare atmosfera, possibilidade de exploração e tipo de conteúdo que cada escolha renderia.",
    "closing": "Não existe resposta certa; existe a primeira história que você quer criar.",
    "cta": "Qual leitura faz mais sentido para você?",
    "suggestedTitle": "Onde você iria primeiro em GTA VI?",
    "suggestedCaption": "Uma cena curta pode render uma leitura inteira. Qual leitura faz mais sentido para você?",
    "recommendedVisual": "Trailers e cenas com áudio para intensidade, apoiados por frames nas pausas.",
    "gdriveCategory": "Trailers Oficiais + Cenas com Áudio + Frames Principais\nCena de abertura sugerida: Tela dividida com os dois locais e uma contagem regressiva.\nCenas de apoio: Cena forte, reação visual, dois cortes de progressão e frame final para pergunta ou CTA.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 7–10 cortes\nCampos que precisam ser adaptados: [LOCAL A], [LOCAL B], [MOTIVO A], [MOTIVO B]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-75",
    "code": "75",
    "title": "Top 3 momentos de impacto",
    "category": "Hype, Opinião e Comunidade",
    "theme": "Top 3 momentos de impacto",
    "objective": "Gerar emoção ou participação sem exagerar fatos nem criar promessas falsas.",
    "suggestedDurationSeconds": 30,
    "hook": "Três momentos construíram meu hype — e o primeiro dura menos de um segundo.",
    "context": "Defina o material analisado e o critério de impacto.",
    "development": "Conte do terceiro ao primeiro, usando uma razão diferente para cada escolha.",
    "closing": "O melhor momento é curto, mas muda a expectativa do conjunto.",
    "cta": "Siga a Operação para continuar esta análise.",
    "suggestedTitle": "Top 3 momentos mais fortes de GTA VI",
    "suggestedCaption": "Material visual certo deixa a explicação mais simples. Siga a Operação para continuar esta análise.",
    "recommendedVisual": "Trailers e cenas com áudio para intensidade, apoiados por frames nas pausas.",
    "gdriveCategory": "Trailers Oficiais + Cenas com Áudio + Frames Principais\nCena de abertura sugerida: Contagem 3–2–1 sincronizada a três cenas.\nCenas de apoio: Cena forte, reação visual, dois cortes de progressão e frame final para pergunta ou CTA.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 9–12 cortes\nCampos que precisam ser adaptados: [MOMENTO 3], [MOMENTO 2], [MOMENTO 1], [MATERIAL]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-76",
    "code": "76",
    "title": "Maior expectativa e maior receio",
    "category": "Hype, Opinião e Comunidade",
    "theme": "Maior expectativa e maior receio",
    "objective": "Gerar emoção ou participação sem exagerar fatos nem criar promessas falsas.",
    "suggestedDurationSeconds": 15,
    "hook": "Meu maior hype e meu maior receio sobre GTA VI vêm da mesma coisa.",
    "context": "Apresente [ELEMENTO] e diga que a análise é opinião baseada no material disponível.",
    "development": "Explique por que o elemento pode elevar a experiência e como também pode criar frustração.",
    "closing": "Expectativa saudável reconhece potencial e limite ao mesmo tempo.",
    "cta": "Escolha uma opção nos comentários.",
    "suggestedTitle": "Meu maior hype e receio sobre GTA VI",
    "suggestedCaption": "Observe o contexto antes de fechar uma conclusão. Escolha uma opção nos comentários.",
    "recommendedVisual": "Trailers e cenas com áudio para intensidade, apoiados por frames nas pausas.",
    "gdriveCategory": "Trailers Oficiais + Cenas com Áudio + Frames Principais\nCena de abertura sugerida: Mesmo frame recebe as palavras “HYPE” e “RECEIO” em lados opostos.\nCenas de apoio: Cena forte, reação visual, dois cortes de progressão e frame final para pergunta ou CTA.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 4–6 cortes\nCampos que precisam ser adaptados: [ELEMENTO], [POTENCIAL], [RISCO], [CRITÉRIO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-77",
    "code": "77",
    "title": "Comentário da comunidade analisado",
    "category": "Hype, Opinião e Comunidade",
    "theme": "Comentário da comunidade analisado",
    "objective": "Gerar emoção ou participação sem exagerar fatos nem criar promessas falsas.",
    "suggestedDurationSeconds": 25,
    "hook": "Este comentário viral levanta uma pergunta melhor do que parece.",
    "context": "Mostre [COMENTÁRIO], escondendo dados pessoais, e resuma a discussão.",
    "development": "Separe o argumento, a evidência usada e o ponto que continua sem resposta.",
    "closing": "Comentário popular não vira fato, mas pode virar uma boa pauta.",
    "cta": "Marque alguém que vai discordar dessa análise.",
    "suggestedTitle": "A discussão de GTA VI que merece atenção",
    "suggestedCaption": "Comparar os frames muda a forma de enxergar o tema. Marque alguém que vai discordar dessa análise.",
    "recommendedVisual": "Trailers e cenas com áudio para intensidade, apoiados por frames nas pausas.",
    "gdriveCategory": "Trailers Oficiais + Cenas com Áudio + Frames Principais\nCena de abertura sugerida: Comentário em tela sobre fundo desfocado.\nCenas de apoio: Cena forte, reação visual, dois cortes de progressão e frame final para pergunta ou CTA.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 11–15 cortes\nCampos que precisam ser adaptados: [COMENTÁRIO], [ARGUMENTO], [EVIDÊNCIA], [PERGUNTA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-78",
    "code": "78",
    "title": "Montagem de hype com progressão",
    "category": "Hype, Opinião e Comunidade",
    "theme": "Montagem de hype com progressão",
    "objective": "Gerar emoção ou participação sem exagerar fatos nem criar promessas falsas.",
    "suggestedDurationSeconds": 20,
    "hook": "GTA VI em 20 segundos: começa bonito, acelera e termina no caos.",
    "context": "Abra com ambiente calmo e deixe a narração mínima.",
    "development": "Aumente movimento, som e duração dos cortes em três níveis até a cena de maior impacto.",
    "closing": "Feche com silêncio curto e uma pergunta simples.",
    "cta": "Volte a este vídeo quando houver confirmação.",
    "suggestedTitle": "20 segundos de puro hype por GTA VI",
    "suggestedCaption": "A melhor pista pode estar fora do centro da cena. Volte a este vídeo quando houver confirmação.",
    "recommendedVisual": "Trailers e cenas com áudio para intensidade, apoiados por frames nas pausas.",
    "gdriveCategory": "Trailers Oficiais + Cenas com Áudio + Frames Principais\nCena de abertura sugerida: Plano calmo de local antes da primeira batida.\nCenas de apoio: Cena forte, reação visual, dois cortes de progressão e frame final para pergunta ou CTA.\nRitmo de edição: 🟡 Dinâmico\nQuantidade aproximada de cortes: 8–12 cortes\nCampos que precisam ser adaptados: [CENA CALMA], [CENA MÉDIA], [CENA FORTE], [PERGUNTA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-79",
    "code": "79",
    "title": "Meme de expectativa versus realidade",
    "category": "Hype, Opinião e Comunidade",
    "theme": "Meme de expectativa versus realidade",
    "objective": "Gerar emoção ou participação sem exagerar fatos nem criar promessas falsas.",
    "suggestedDurationSeconds": 25,
    "hook": "Eu dizendo que vou explorar com calma — cinco minutos depois:",
    "context": "Use uma situação reconhecível de expectativa e contraste.",
    "development": "Mostre preparação tranquila e corte brusco para perseguição, acidente ou caos, sem precisar explicar a piada.",
    "closing": "Texto final curto reforça a identificação da comunidade.",
    "cta": "Diga qual ponto merece uma parte 2.",
    "suggestedTitle": "Todo jogador de GTA VI vai fazer isso",
    "suggestedCaption": "Este formato foi pensado para gerar discussão com critério. Diga qual ponto merece uma parte 2.",
    "recommendedVisual": "Trailers e cenas com áudio para intensidade, apoiados por frames nas pausas.",
    "gdriveCategory": "Trailers Oficiais + Cenas com Áudio + Frames Principais\nCena de abertura sugerida: Personagem ou local calmo com a frase da expectativa.\nCenas de apoio: Cena forte, reação visual, dois cortes de progressão e frame final para pergunta ou CTA.\nRitmo de edição: 🟢 Simples\nQuantidade aproximada de cortes: 5–8 cortes\nCampos que precisam ser adaptados: [EXPECTATIVA], [REALIDADE], [CENA DE CAOS], [TEXTO FINAL]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-80",
    "code": "80",
    "title": "Bingo de expectativas da comunidade",
    "category": "Hype, Opinião e Comunidade",
    "theme": "Bingo de expectativas da comunidade",
    "objective": "Gerar emoção ou participação sem exagerar fatos nem criar promessas falsas.",
    "suggestedDurationSeconds": 30,
    "hook": "Quantas destas expectativas você acredita que realmente vão acontecer?",
    "context": "Mostre uma cartela com cinco hipóteses, todas identificadas como expectativas.",
    "development": "Passe por cada item em ritmo rápido e peça uma marcação mental: provável, duvidoso ou improvável.",
    "closing": "Depois do próximo material oficial, volte para conferir quantas sobreviveram.",
    "cta": "Envie para quem precisa ver o contexto completo.",
    "suggestedTitle": "Bingo de expectativas para GTA VI",
    "suggestedCaption": "Salve esta estrutura e adapte quando houver material novo. Envie para quem precisa ver o contexto completo.",
    "recommendedVisual": "Trailers e cenas com áudio para intensidade, apoiados por frames nas pausas.",
    "gdriveCategory": "Trailers Oficiais + Cenas com Áudio + Frames Principais\nCena de abertura sugerida: Cartela de bingo aparecendo célula por célula.\nCenas de apoio: Cena forte, reação visual, dois cortes de progressão e frame final para pergunta ou CTA.\nRitmo de edição: 🔴 Acelerado\nQuantidade aproximada de cortes: 13–18 cortes\nCampos que precisam ser adaptados: [EXPECTATIVA 1], [EXPECTATIVA 2], [EXPECTATIVA 3], [EXPECTATIVA 4], [EXPECTATIVA 5]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-c01",
    "code": "C01",
    "title": "Notícia urgente",
    "category": "Notícias e Atualizações",
    "theme": "Notícia urgente",
    "objective": "Vídeo rápido de engajamento",
    "suggestedDurationSeconds": 30,
    "hook": "Acabou de sair [NOVIDADE] — aqui está o que já dá para confirmar.",
    "context": "Mostre [FONTE], [DATA] e a frase central.\nENTREGA: Entregue o fato, a consequência imediata e o ponto que ainda não foi esclarecido.",
    "development": "",
    "closing": "Atualize a conclusão se a fonte publicar nova informação.",
    "cta": "Salve para acompanhar as próximas atualizações.",
    "suggestedTitle": "GTA VI: Notícia urgente",
    "suggestedCaption": "Notícia urgente em GTA VI. O que você acha? Deixe nos comentários! #gtavi #gta6",
    "recommendedVisual": "Cenas sem áudio + frames",
    "gdriveCategory": "Cenas sem Áudio + Frames Principais\nCena de abertura: Fonte oficial ou manchete identificada em tela.\nRitmo: 🔴 Acelerado\nCortes aproximados: 10–14 cortes\nCampos para adaptar: [NOVIDADE], [FONTE], [DATA], [CONSEQUÊNCIA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-c02",
    "code": "C02",
    "title": "Novo trailer",
    "category": "Notícias e Atualizações",
    "theme": "Novo trailer",
    "objective": "Vídeo rápido de engajamento",
    "suggestedDurationSeconds": 30,
    "hook": "O novo trailer chegou — observe estes três pontos antes de tirar conclusões.",
    "context": "Identifique o trailer, a data e o canal oficial.\nENTREGA: Separe personagem, local e possível gameplay, distinguindo imagem visível de interpretação.",
    "development": "",
    "closing": "Feche com o detalhe que merece análise completa depois.",
    "cta": "Comente qual cena deve virar o próximo vídeo.",
    "suggestedTitle": "GTA VI: Novo trailer",
    "suggestedCaption": "Novo trailer em GTA VI. O que você acha? Deixe nos comentários! #gtavi #gta6",
    "recommendedVisual": "Cenas sem áudio + frames",
    "gdriveCategory": "Trailers Oficiais + Frames Principais\nCena de abertura: Cena mais impactante do trailer por menos de um segundo.\nRitmo: 🔴 Acelerado\nCortes aproximados: 13–18 cortes\nCampos para adaptar: [TRAILER], [DATA], [PERSONAGEM], [LOCAL], [DETALHE]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-c03",
    "code": "C03",
    "title": "Nova imagem oficial",
    "category": "Notícias e Atualizações",
    "theme": "Nova imagem oficial",
    "objective": "Vídeo rápido de engajamento",
    "suggestedDurationSeconds": 30,
    "hook": "A nova imagem de GTA VI entrega mais do que parece.",
    "context": "Mostre a imagem completa e cite [FONTE].\nENTREGA: Amplie três áreas: informação clara, pista possível e detalhe puramente visual.",
    "development": "",
    "closing": "Diga exatamente o que está confirmado e o que permanece aberto.",
    "cta": "Qual detalhe você viu primeiro?",
    "suggestedTitle": "GTA VI: Nova imagem oficial",
    "suggestedCaption": "Nova imagem oficial em GTA VI. O que você acha? Deixe nos comentários! #gtavi #gta6",
    "recommendedVisual": "Cenas sem áudio + frames",
    "gdriveCategory": "Frames Principais + Imagens Gerais\nCena de abertura: Imagem inteira seguida de zoom no ponto de maior contraste.\nRitmo: 🟡 Dinâmico\nCortes aproximados: 8–11 cortes\nCampos para adaptar: [IMAGEM], [FONTE], [DETALHE 1], [DETALHE 2], [DETALHE 3]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-c04",
    "code": "C04",
    "title": "Rumor",
    "category": "Notícias e Atualizações",
    "theme": "Rumor",
    "objective": "Vídeo rápido de engajamento",
    "suggestedDurationSeconds": 30,
    "hook": "Este rumor está circulando, mas ainda não pode ser tratado como fato.",
    "context": "Apresente [RUMOR], origem e selo “não confirmado”.\nENTREGA: Cheque fonte original, evidência verificável e coerência com informação oficial.",
    "development": "",
    "closing": "Classifique como improvável, possível ou bem sustentado, sempre provisoriamente.",
    "cta": "Compartilhe antes que alguém trate hipótese como notícia.",
    "suggestedTitle": "GTA VI: Rumor",
    "suggestedCaption": "Rumor em GTA VI. O que você acha? Deixe nos comentários! #gtavi #gta6",
    "recommendedVisual": "Cenas sem áudio + frames",
    "gdriveCategory": "Cenas sem Áudio + Frames Principais\nCena de abertura: Texto “RUMOR — NÃO CONFIRMADO” sobre cena desfocada.\nRitmo: 🟡 Dinâmico\nCortes aproximados: 7–10 cortes\nCampos para adaptar: [RUMOR], [ORIGEM], [EVIDÊNCIA], [FONTE OFICIAL], [CLASSIFICAÇÃO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-c05",
    "code": "C05",
    "title": "Confirmação oficial",
    "category": "Notícias e Atualizações",
    "theme": "Confirmação oficial",
    "objective": "Vídeo rápido de engajamento",
    "suggestedDurationSeconds": 30,
    "hook": "Agora é oficial: [CONFIRMAÇÃO].",
    "context": "Mostre a publicação e relembre em uma frase o que existia antes.\nENTREGA: Explique o que foi confirmado, o impacto e quais dúvidas continuam sem resposta.",
    "development": "",
    "closing": "Separe a confirmação do entusiasmo para não prometer além do anúncio.",
    "cta": "Envie para quem estava esperando essa confirmação.",
    "suggestedTitle": "GTA VI: Confirmação oficial",
    "suggestedCaption": "Confirmação oficial em GTA VI. O que você acha? Deixe nos comentários! #gtavi #gta6",
    "recommendedVisual": "Cenas sem áudio + frames",
    "gdriveCategory": "Cenas sem Áudio + Trailers Oficiais\nCena de abertura: Palavra “CONFIRMADO” seguida da fonte na tela.\nRitmo: 🔴 Acelerado\nCortes aproximados: 9–13 cortes\nCampos para adaptar: [CONFIRMAÇÃO], [FONTE], [DATA], [IMPACTO], [DÚVIDA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-c06",
    "code": "C06",
    "title": "Discussão viral",
    "category": "Notícias e Atualizações",
    "theme": "Discussão viral",
    "objective": "Vídeo rápido de engajamento",
    "suggestedDurationSeconds": 30,
    "hook": "Esta discussão viral tem uma pergunta boa escondida no meio do barulho.",
    "context": "Mostre [DISCUSSÃO] sem expor dados pessoais.\nENTREGA: Apresente lado A, lado B e o critério que ajuda a avaliar os dois.",
    "development": "",
    "closing": "Convide a comunidade a argumentar, não apenas escolher um time.",
    "cta": "Defenda sua posição em uma frase.",
    "suggestedTitle": "GTA VI: Discussão viral",
    "suggestedCaption": "Discussão viral em GTA VI. O que você acha? Deixe nos comentários! #gtavi #gta6",
    "recommendedVisual": "Cenas sem áudio + frames",
    "gdriveCategory": "Frames Principais + Cenas com Áudio\nCena de abertura: Duas opiniões curtas entrando de lados opostos.\nRitmo: 🟡 Dinâmico\nCortes aproximados: 8–12 cortes\nCampos para adaptar: [DISCUSSÃO], [ARGUMENTO A], [ARGUMENTO B], [CRITÉRIO]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-c07",
    "code": "C07",
    "title": "Meme",
    "category": "Notícias e Atualizações",
    "theme": "Meme",
    "objective": "Vídeo rápido de engajamento",
    "suggestedDurationSeconds": 30,
    "hook": "Eu planejando [EXPECTATIVA] — a realidade cinco minutos depois:",
    "context": "Apresente a expectativa em uma cena calma.\nENTREGA: Corte para [CAOS] no momento da virada, usando contraste visual e texto mínimo.",
    "development": "",
    "closing": "Finalize com uma frase de identificação da comunidade.",
    "cta": "Marque quem vai fazer exatamente isso.",
    "suggestedTitle": "GTA VI: Meme",
    "suggestedCaption": "Meme em GTA VI. O que você acha? Deixe nos comentários! #gtavi #gta6",
    "recommendedVisual": "Cenas sem áudio + frames",
    "gdriveCategory": "Cenas com Áudio + Cenas sem Áudio\nCena de abertura: Cena calma com texto curto de expectativa.\nRitmo: 🔴 Acelerado\nCortes aproximados: 6–9 cortes\nCampos para adaptar: [EXPECTATIVA], [CAOS], [TEXTO FINAL]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-c08",
    "code": "C08",
    "title": "Comparação",
    "category": "Notícias e Atualizações",
    "theme": "Comparação",
    "objective": "Vídeo rápido de engajamento",
    "suggestedDurationSeconds": 30,
    "hook": "Coloque [A] e [B] lado a lado: a maior diferença está em [CRITÉRIO].",
    "context": "Use materiais equivalentes e explique o critério antes de escolher um lado.\nENTREGA: Compare três pontos, dê um vencedor por ponto e reconheça qualquer limitação.",
    "development": "",
    "closing": "Feche com o placar e a ressalva necessária.",
    "cta": "Qual comparação deve ser a próxima?",
    "suggestedTitle": "GTA VI: Comparação",
    "suggestedCaption": "Comparação em GTA VI. O que você acha? Deixe nos comentários! #gtavi #gta6",
    "recommendedVisual": "Cenas sem áudio + frames",
    "gdriveCategory": "Frames Principais + Imagens Gerais + Cenas sem Áudio\nCena de abertura: Tela dividida com A e B sincronizados.\nRitmo: 🟡 Dinâmico\nCortes aproximados: 9–13 cortes\nCampos para adaptar: [A], [B], [CRITÉRIO], [PONTO 1], [PONTO 2], [PONTO 3]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-c09",
    "code": "C09",
    "title": "Descoberta de detalhe",
    "category": "Notícias e Atualizações",
    "theme": "Descoberta de detalhe",
    "objective": "Vídeo rápido de engajamento",
    "suggestedDurationSeconds": 30,
    "hook": "Pause aqui: [DETALHE] muda a forma de enxergar esta cena.",
    "context": "Mostre o frame aberto antes do zoom.\nENTREGA: Localize o detalhe, explique a conexão e apresente uma leitura alternativa.",
    "development": "",
    "closing": "O elemento é real; o significado precisa continuar como hipótese se não houver confirmação.",
    "cta": "Salve o frame e diga sua interpretação.",
    "suggestedTitle": "GTA VI: Descoberta de detalhe",
    "suggestedCaption": "Descoberta de detalhe em GTA VI. O que você acha? Deixe nos comentários! #gtavi #gta6",
    "recommendedVisual": "Cenas sem áudio + frames",
    "gdriveCategory": "Frames Principais + Personagens + Locais e Cenários\nCena de abertura: Zoom com seta no detalhe após meio segundo de suspense.\nRitmo: 🟡 Dinâmico\nCortes aproximados: 7–10 cortes\nCampos para adaptar: [DETALHE], [CENA], [CONEXÃO], [LEITURA ALTERNATIVA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  },
  {
    "id": "rot-c10",
    "code": "C10",
    "title": "Tendência",
    "category": "Notícias e Atualizações",
    "theme": "Tendência",
    "objective": "Vídeo rápido de engajamento",
    "suggestedDurationSeconds": 30,
    "hook": "A tendência diz [FRASE OU ÁUDIO]; GTA VI responde com esta cena.",
    "context": "Apresente a referência da tendência em até dois segundos.\nENTREGA: Adapte o formato ao universo de GTA VI com uma virada visual própria, sem copiar texto de outro criador.",
    "development": "",
    "closing": "Finalize no ponto reconhecível que conecta tendência e comunidade.",
    "cta": "Envie para quem reconheceu a tendência na hora.",
    "suggestedTitle": "GTA VI: Tendência",
    "suggestedCaption": "Tendência em GTA VI. O que você acha? Deixe nos comentários! #gtavi #gta6",
    "recommendedVisual": "Cenas sem áudio + frames",
    "gdriveCategory": "Cenas com Áudio + Trailers Oficiais\nCena de abertura: Trecho inicial da tendência seguido de corte forte para GTA VI.\nRitmo: 🔴 Acelerado\nCortes aproximados: 8–12 cortes\nCampos para adaptar: [TENDÊNCIA], [FRASE OU ÁUDIO], [CENA], [VIRADA]",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/13xKphmJKZwsklXf6rBzA-Eq-N6f3jAMG"
  }
];

export const OPERACAO_GANCHOS: OperacaoGanchoCategory[] = [
  {
    "id": "cat-1-----curiosidade-e-segredo",
    "category": "🔍 Curiosidade e Segredo",
    "icon": "🔍",
    "hooks": [
      {
        "number": "001",
        "hook": "Tem um detalhe nesta cena que muda completamente a forma de enxergar GTA VI."
      },
      {
        "number": "002",
        "hook": "O segredo desta imagem não está nos personagens — está acontecendo lá no fundo."
      },
      {
        "number": "003",
        "hook": "Quase ninguém está fazendo a pergunta mais importante sobre este lugar."
      },
      {
        "number": "004",
        "hook": "A parte mais estranha desta cena aparece por menos de um segundo."
      },
      {
        "number": "005",
        "hook": "Você provavelmente viu este frame várias vezes e ainda não percebeu isso."
      },
      {
        "number": "006",
        "hook": "Este lugar parece comum, até você juntar estas três pistas."
      },
      {
        "number": "007",
        "hook": "A Rockstar pode ter deixado uma pista enorme em um objeto minúsculo."
      },
      {
        "number": "008",
        "hook": "Antes de olhar para os protagonistas, observe quem está ao redor deles."
      },
      {
        "number": "009",
        "hook": "O que esta placa revela sobre uma área que ainda conhecemos muito pouco?"
      },
      {
        "number": "010",
        "hook": "Existe uma razão para esta cena parecer tão diferente das outras."
      },
      {
        "number": "011",
        "hook": "Depois que você nota este detalhe, a cena inteira ganha outro sentido."
      },
      {
        "number": "012",
        "hook": "O mais curioso não é o que aparece aqui — é o que está faltando."
      },
      {
        "number": "013",
        "hook": "Um objeto no canto pode revelar para onde esta história está indo."
      },
      {
        "number": "014",
        "hook": "O mapa pode estar contando uma história sem usar uma única palavra."
      },
      {
        "number": "015",
        "hook": "Esta escolha visual parece pequena, mas diz muito sobre o mundo de GTA VI."
      }
    ]
  },
  {
    "id": "cat-2-----afirma--o-forte",
    "category": "💥 Afirmação Forte",
    "icon": "💥",
    "hooks": [
      {
        "number": "016",
        "hook": "O detalhe mais importante desta cena não é um personagem — é o comportamento da cidade."
      },
      {
        "number": "017",
        "hook": "GTA VI não precisa apenas de um mapa maior; precisa de um mundo que reaja melhor."
      },
      {
        "number": "018",
        "hook": "Esta pode ser a mudança que mais vai separar GTA VI de GTA V."
      },
      {
        "number": "019",
        "hook": "A melhor pista sobre a história está escondida na forma como os protagonistas se olham."
      },
      {
        "number": "020",
        "hook": "Vice City parece bonita, mas o caos ao redor é o verdadeiro protagonista."
      },
      {
        "number": "021",
        "hook": "O veículo mais rápido pode não ser a melhor escolha para uma fuga."
      },
      {
        "number": "022",
        "hook": "A Rockstar não mostra objetos por acaso quando quer construir uma história."
      },
      {
        "number": "023",
        "hook": "O maior salto de GTA VI pode estar nas pequenas reações, não nos grandes gráficos."
      },
      {
        "number": "024",
        "hook": "Esta cena explica melhor o tom do jogo do que qualquer descrição oficial."
      },
      {
        "number": "025",
        "hook": "Um mundo aberto só parece vivo quando continua interessante sem o jogador fazer nada."
      },
      {
        "number": "026",
        "hook": "O verdadeiro luxo em GTA VI pode ser localização, não tamanho."
      },
      {
        "number": "027",
        "hook": "A rede social dentro do jogo pode influenciar muito mais do que simples piadas."
      },
      {
        "number": "028",
        "hook": "O mapa mais memorável não é o maior — é o que cria histórias em cada esquina."
      },
      {
        "number": "029",
        "hook": "Esta comparação mostra que evolução não significa apenas mais resolução."
      },
      {
        "number": "030",
        "hook": "Se esta hipótese estiver certa, uma escolha simples pode mudar toda a campanha."
      }
    ]
  },
  {
    "id": "cat-3----pergunta-que-prende",
    "category": "❓ Pergunta que Prende",
    "icon": "❓",
    "hooks": [
      {
        "number": "031",
        "hook": "Preparação de golpe ou encontro dos protagonistas."
      },
      {
        "number": "032",
        "hook": "Expressão, fala ou atitude suspeita."
      },
      {
        "number": "033",
        "hook": "Explorar, dirigir, seguir história ou observar NPCs."
      },
      {
        "number": "034",
        "hook": "Marina, loja, pista ou prédio."
      },
      {
        "number": "035",
        "hook": "Placas, pontes e vegetação."
      },
      {
        "number": "036",
        "hook": "Canais, costa e embarcações."
      },
      {
        "number": "037",
        "hook": "Suposto vazamento ou interpretação de trailer."
      },
      {
        "number": "038",
        "hook": "Escala contra densidade e interação."
      },
      {
        "number": "039",
        "hook": "Figurino de Lucia, aliado ou rival."
      },
      {
        "number": "040",
        "hook": "Perseguição, festa ou confusão pública."
      },
      {
        "number": "041",
        "hook": "Carro, moto, barco ou helicóptero."
      },
      {
        "number": "042",
        "hook": "Por que o mesmo lugar parece pertencer a dois mundos diferentes?"
      },
      {
        "number": "043",
        "hook": "Persistência, testemunhas e reação social."
      },
      {
        "number": "044",
        "hook": "Possível traição ou conexão entre cenas."
      },
      {
        "number": "045",
        "hook": "Polícia, física, NPCs ou economia."
      }
    ]
  },
  {
    "id": "cat-4-----detalhe-escondido",
    "category": "👀 Detalhe Escondido",
    "icon": "👀",
    "hooks": [
      {
        "number": "046",
        "hook": "Nome de bairro, estrada ou comércio."
      },
      {
        "number": "047",
        "hook": "Descoberta visual com zoom."
      },
      {
        "number": "048",
        "hook": "Reconstrução de cronologia."
      },
      {
        "number": "049",
        "hook": "Conectar facções, marcas ou lugares."
      },
      {
        "number": "050",
        "hook": "Análise de inteligência artificial ou direção de cena."
      },
      {
        "number": "051",
        "hook": "Carro policial, barco ou moto ao fundo."
      },
      {
        "number": "052",
        "hook": "Conteúdo sobre interiores."
      },
      {
        "number": "053",
        "hook": "Investigação de cena criminal fictícia."
      },
      {
        "number": "054",
        "hook": "Cronologia baseada em evidência visual."
      },
      {
        "number": "055",
        "hook": "Comparação de takes e sequência."
      },
      {
        "number": "056",
        "hook": "Hipótese geográfica identificada."
      },
      {
        "number": "057",
        "hook": "Conectar eventos narrativos."
      },
      {
        "number": "058",
        "hook": "Outdoor, tela ou anúncio de rádio."
      },
      {
        "number": "059",
        "hook": "Análise de física ou ambiente."
      },
      {
        "number": "060",
        "hook": "Vídeo de observação guiada."
      }
    ]
  },
  {
    "id": "cat-5-----compara--o",
    "category": "🆚 Comparação",
    "icon": "🆚",
    "hooks": [
      {
        "number": "061",
        "hook": "Troque: cenas e diferença."
      },
      {
        "number": "062",
        "hook": "Troque: sistema e sinal de mudança."
      },
      {
        "number": "063",
        "hook": "Troque: versões e critério."
      },
      {
        "number": "064",
        "hook": "Troque: veículos e cenário."
      },
      {
        "number": "065",
        "hook": "Troque: critérios de mapa."
      },
      {
        "number": "066",
        "hook": "Troque: jogo antigo e contexto novo."
      },
      {
        "number": "067",
        "hook": "Comparação de horário e atmosfera."
      },
      {
        "number": "068",
        "hook": "Troque: personagens e conflito."
      },
      {
        "number": "069",
        "hook": "Troque: itens e utilidade."
      },
      {
        "number": "070",
        "hook": "Uma rota é rápida; a outra é discreta. Qual sobreviveria melhor a uma perseguição?"
      },
      {
        "number": "071",
        "hook": "Troque: regiões e contraste."
      },
      {
        "number": "072",
        "hook": "Comparar gráficos e sistemas."
      },
      {
        "number": "073",
        "hook": "Troque: alegação e fontes."
      },
      {
        "number": "074",
        "hook": "Troque: personagens e cena."
      },
      {
        "number": "075",
        "hook": "Troque: gerações e situação."
      }
    ]
  },
  {
    "id": "cat-6-----pol-mica-e-opini-o",
    "category": "🔥 Polêmica e Opinião",
    "icon": "🔥",
    "hooks": [
      {
        "number": "076",
        "hook": "Abrir debate sobre design."
      },
      {
        "number": "077",
        "hook": "Ajustar expectativas da comunidade."
      },
      {
        "number": "078",
        "hook": "Troque: mecânica realista e custo."
      },
      {
        "number": "079",
        "hook": "Opinião sobre escrita de personagem."
      },
      {
        "number": "080",
        "hook": "Conteúdo sobre credibilidade."
      },
      {
        "number": "081",
        "hook": "Troque: critério fraco e critérios melhores."
      },
      {
        "number": "082",
        "hook": "Troque: recurso e qualidade defendida."
      },
      {
        "number": "083",
        "hook": "Opinião sobre identidade do jogo."
      },
      {
        "number": "084",
        "hook": "Correção de exageros e fact-check."
      },
      {
        "number": "085",
        "hook": "Opinião sobre balanceamento."
      },
      {
        "number": "086",
        "hook": "Troque: referência nostálgica."
      },
      {
        "number": "087",
        "hook": "Troque: alternativa de conteúdo."
      },
      {
        "number": "088",
        "hook": "Troque: rota e desvantagem."
      },
      {
        "number": "089",
        "hook": "Teoria opinativa claramente sinalizada."
      },
      {
        "number": "090",
        "hook": "A discussão mais interessante não é se o jogo será realista, mas onde ele deve deixar de ser."
      }
    ]
  },
  {
    "id": "cat-7----urg-ncia-e-assunto-quente",
    "category": "⚡ Urgência e Assunto Quente",
    "icon": "⚡",
    "hooks": [
      {
        "number": "091",
        "hook": "Use apenas com fonte oficial; troque a informação."
      },
      {
        "number": "092",
        "hook": "Troque: canal e detalhes confirmados."
      },
      {
        "number": "093",
        "hook": "Troque: assunto e contexto ausente."
      },
      {
        "number": "094",
        "hook": "Troque: novidade e trecho confirmado."
      },
      {
        "number": "095",
        "hook": "Troque: rumor; mantenha os rótulos claros."
      },
      {
        "number": "096",
        "hook": "Se você viu esta manchete hoje, precisa conhecer a fonte original."
      },
      {
        "number": "097",
        "hook": "Troque: detalhe e horário real."
      },
      {
        "number": "098",
        "hook": "Troque: informação e pautas."
      },
      {
        "number": "099",
        "hook": "Troque: anúncio e respostas."
      },
      {
        "number": "100",
        "hook": "Troque: termo e conclusão segura."
      },
      {
        "number": "101",
        "hook": "Troque: assunto e fatos verificados."
      },
      {
        "number": "102",
        "hook": "Troque: atualização e três ângulos."
      },
      {
        "number": "103",
        "hook": "Troque: detalhe e hipótese."
      },
      {
        "number": "104",
        "hook": "Troque: informação e nova situação."
      },
      {
        "number": "105",
        "hook": "Troque: tema e lista confirmada."
      }
    ]
  },
  {
    "id": "cat-8-----teorias-e-especula--es",
    "category": "🧠 Teorias e Especulações",
    "icon": "🧠",
    "hooks": [
      {
        "number": "106",
        "hook": "Teoria: esta cena pode acontecer depois de uma escolha que ainda não vimos."
      },
      {
        "number": "107",
        "hook": "E se este personagem estiver ajudando os protagonistas por um motivo completamente diferente?"
      },
      {
        "number": "108",
        "hook": "Esta é apenas uma hipótese, mas três pistas apontam para a mesma região."
      },
      {
        "number": "109",
        "hook": "Talvez o verdadeiro conflito não seja o golpe — seja a confiança entre a dupla."
      },
      {
        "number": "110",
        "hook": "E se a rede social do jogo funcionar como um sistema de reputação?"
      },
      {
        "number": "111",
        "hook": "Uma possibilidade: esta propriedade pode ser mais do que um simples esconderijo."
      },
      {
        "number": "112",
        "hook": "Esta teoria parece forte, mas existe um detalhe que pode derrubá-la."
      },
      {
        "number": "113",
        "hook": "E se o clima não for apenas visual e realmente alterar a estratégia?"
      },
      {
        "number": "114",
        "hook": "Talvez este símbolo conecte grupos que parecem inimigos."
      },
      {
        "number": "115",
        "hook": "Uma hipótese explica por que o mesmo veículo aparece em momentos diferentes."
      },
      {
        "number": "116",
        "hook": "E se algumas missões começarem a partir de acontecimentos espontâneos?"
      },
      {
        "number": "117",
        "hook": "Esta cena pode esconder uma escolha entre dinheiro rápido e segurança."
      },
      {
        "number": "118",
        "hook": "Talvez a polícia investigue o que ficou para trás, não apenas persiga o jogador."
      },
      {
        "number": "119",
        "hook": "E se o mapa mudar de importância conforme a história avança?"
      },
      {
        "number": "120",
        "hook": "Minha leitura é esta, mas a próxima imagem oficial pode mudar tudo."
      }
    ]
  },
  {
    "id": "cat-9-----listas-e-rankings",
    "category": "📋 Listas e Rankings",
    "icon": "📋",
    "hooks": [
      {
        "number": "121",
        "hook": "Mapa, personagens, veículos, NPCs e marcas."
      },
      {
        "number": "122",
        "hook": "Praia, centro urbano e área rural."
      },
      {
        "number": "123",
        "hook": "Carro, moto, barco e utilitário."
      },
      {
        "number": "124",
        "hook": "Placas, pontes, costa e vegetação."
      },
      {
        "number": "125",
        "hook": "Aliado, rival ou figura viral."
      },
      {
        "number": "126",
        "hook": "Iluminação, multidão, veículos e ambiente."
      },
      {
        "number": "127",
        "hook": "Mapa, história, mecânica e personagem."
      },
      {
        "number": "128",
        "hook": "Portas, iluminação e movimento de NPCs."
      },
      {
        "number": "129",
        "hook": "Demora, exagero, falta de prova e CTA precoce."
      },
      {
        "number": "130",
        "hook": "Resumo, impacto, detalhe e opinião."
      },
      {
        "number": "131",
        "hook": "Mundo, comportamento e direção artística."
      },
      {
        "number": "132",
        "hook": "Praia, estrada, pântano, centro e marina."
      },
      {
        "number": "133",
        "hook": "Controle, resistência, discrição e acesso."
      },
      {
        "number": "134",
        "hook": "Origem, evidência e confirmação independente."
      },
      {
        "number": "135",
        "hook": "Trecho com mapa, NPCs e veículos."
      }
    ]
  },
  {
    "id": "cat-10-----nostalgia-e-emo--o",
    "category": "❤️ Nostalgia e Emoção",
    "icon": "❤️",
    "hooks": [
      {
        "number": "136",
        "hook": "Vice City voltou diferente, mas esta sensação parece exatamente a mesma."
      },
      {
        "number": "137",
        "hook": "Quem viveu esta era de GTA vai reconhecer o clima antes mesmo de ver o nome."
      },
      {
        "number": "138",
        "hook": "Esta cena parece uma lembrança antiga recriada com outra geração de tecnologia."
      },
      {
        "number": "139",
        "hook": "O mais emocionante não é voltar à cidade — é perceber o quanto tudo mudou."
      },
      {
        "number": "140",
        "hook": "Existe uma geração inteira que cresceu esperando por este momento."
      },
      {
        "number": "141",
        "hook": "Este som tem o poder de transportar qualquer fã para outra época."
      },
      {
        "number": "142",
        "hook": "Talvez o primeiro passeio sem missão seja o momento mais memorável."
      },
      {
        "number": "143",
        "hook": "A franquia mudou, os jogadores mudaram e agora a cidade também mudou."
      },
      {
        "number": "144",
        "hook": "Esta comparação não é sobre gráficos — é sobre o tempo que passou."
      },
      {
        "number": "145",
        "hook": "Alguns vão procurar missões; outros só vão querer ouvir a cidade por alguns minutos."
      },
      {
        "number": "146",
        "hook": "O retorno de uma atmosfera conhecida pode criar uma história completamente nova."
      },
      {
        "number": "147",
        "hook": "Todo fã tem uma lembrança de GTA que ainda parece recente."
      },
      {
        "number": "148",
        "hook": "Quando este momento chegar, muita gente vai lembrar de onde estava esperando."
      },
      {
        "number": "149",
        "hook": "O detalhe mais bonito desta cena é a sensação de estar voltando e descobrindo ao mesmo tempo."
      },
      {
        "number": "150",
        "hook": "Um novo GTA começa, mas cada jogador leva uma história antiga para dentro dele."
      }
    ]
  }
];

export const OPERACAO_TITULOS: OperacaoTitleCategory[] = [
  {
    "id": "tit-1-----busca-e-seo",
    "category": "🔎 Busca e SEO",
    "icon": "🔎",
    "titles": [
      {
        "number": "001",
        "title": "Tipo de conteúdo recomendado"
      },
      {
        "number": "001",
        "title": "Resumo atualizado ou guia introdutório."
      },
      {
        "number": "002",
        "title": "Análise de sistema ou mecânica."
      },
      {
        "number": "003",
        "title": "Investigação de mapa."
      },
      {
        "number": "004",
        "title": "Apresentar personagem pesquisado."
      },
      {
        "number": "005",
        "title": "Fact-check ou análise de material oficial."
      },
      {
        "number": "006",
        "title": "Organizar busca por veículos."
      },
      {
        "number": "007",
        "title": "Comparação de mecânicas."
      },
      {
        "number": "008",
        "title": "Guia de mundo e exploração."
      },
      {
        "number": "009",
        "title": "GTA V vs GTA VI: as principais diferenças em [TEMA]"
      },
      {
        "number": "010",
        "title": "Atender busca por segredos sem prometer descoberta falsa."
      },
      {
        "number": "011",
        "title": "Análise narrativa."
      },
      {
        "number": "012",
        "title": "Boletim ou atualização."
      }
    ]
  },
  {
    "id": "tit-2-----curiosidade",
    "category": "🧲 Curiosidade",
    "icon": "🧲",
    "titles": [
      {
        "number": "001",
        "title": "Tipo de conteúdo recomendado"
      },
      {
        "number": "013",
        "title": "Criar lacuna de curiosidade."
      },
      {
        "number": "014",
        "title": "Frame e acontecimento."
      },
      {
        "number": "015",
        "title": "Objeto e interpretação."
      },
      {
        "number": "016",
        "title": "Transformar ambiente em descoberta."
      },
      {
        "number": "017",
        "title": "Elemento ausente."
      },
      {
        "number": "018",
        "title": "Placa e informação."
      },
      {
        "number": "019",
        "title": "Elemento escondido."
      },
      {
        "number": "020",
        "title": "Cena e diferença."
      },
      {
        "number": "021",
        "title": "Criar conexão narrativa."
      },
      {
        "number": "022",
        "title": "Trecho e história visual."
      },
      {
        "number": "023",
        "title": "Personagem e pista."
      },
      {
        "number": "024",
        "title": "Descoberta central."
      }
    ]
  },
  {
    "id": "tit-3-----coment-rios-e-debate",
    "category": "💬 Comentários e Debate",
    "icon": "💬",
    "titles": [
      {
        "number": "001",
        "title": "Tipo de conteúdo recomendado"
      },
      {
        "number": "025",
        "title": "Debate sobre mundo aberto."
      },
      {
        "number": "026",
        "title": "Análise narrativa."
      },
      {
        "number": "027",
        "title": "Lista de veículos."
      },
      {
        "number": "028",
        "title": "Opinião sobre mecânicas."
      },
      {
        "number": "029",
        "title": "Teoria sinalizada."
      },
      {
        "number": "030",
        "title": "Mapa e turismo digital."
      },
      {
        "number": "031",
        "title": "GTA V fazia melhor ou GTA VI já parece superior?"
      },
      {
        "number": "032",
        "title": "Golpe, economia ou fuga."
      },
      {
        "number": "033",
        "title": "Facções e personagens."
      },
      {
        "number": "034",
        "title": "Análise de material oficial."
      },
      {
        "number": "035",
        "title": "Exploração versus campanha."
      },
      {
        "number": "036",
        "title": "Opinião ampla e comunidade."
      }
    ]
  },
  {
    "id": "tit-4-----salvamento",
    "category": "🔖 Salvamento",
    "icon": "🔖",
    "titles": [
      {
        "number": "001",
        "title": "Tipo de conteúdo recomendado"
      },
      {
        "number": "037",
        "title": "Número e detalhes."
      },
      {
        "number": "038",
        "title": "Fact-check educativo."
      },
      {
        "number": "039",
        "title": "Regiões e critérios."
      },
      {
        "number": "040",
        "title": "Itens do checklist."
      },
      {
        "number": "041",
        "title": "Número e escala."
      },
      {
        "number": "042",
        "title": "Região e pistas."
      },
      {
        "number": "043",
        "title": "Veículos e categorias."
      },
      {
        "number": "044",
        "title": "Cenas e sequência."
      },
      {
        "number": "045",
        "title": "Tudo o que está confirmado sobre [ASSUNTO] até agora"
      },
      {
        "number": "046",
        "title": "Número e notícia."
      },
      {
        "number": "047",
        "title": "Arquitetura e interiores."
      },
      {
        "number": "048",
        "title": "Testes e sistemas."
      }
    ]
  },
  {
    "id": "tit-5-----compartilhamento",
    "category": "📤 Compartilhamento",
    "icon": "📤",
    "titles": [
      {
        "number": "001",
        "title": "Tipo de conteúdo recomendado"
      },
      {
        "number": "049",
        "title": "Descoberta visual relevante."
      },
      {
        "number": "050",
        "title": "Comparação lado a lado."
      },
      {
        "number": "051",
        "title": "Polêmica ou escolha."
      },
      {
        "number": "052",
        "title": "Fact-check ou boletim."
      },
      {
        "number": "053",
        "title": "Lista divertida de veículos."
      },
      {
        "number": "054",
        "title": "Evolução da franquia."
      },
      {
        "number": "055",
        "title": "Teoria responsável."
      },
      {
        "number": "056",
        "title": "Comparativo visual."
      },
      {
        "number": "057",
        "title": "Dia e noite ou clima."
      },
      {
        "number": "058",
        "title": "Mapa, perseguição ou veículos."
      },
      {
        "number": "059",
        "title": "Segredo e local."
      },
      {
        "number": "060",
        "title": "Escolha, personagem ou mecânica."
      }
    ]
  },
  {
    "id": "tit-6-----seguidores",
    "category": "👥 Seguidores",
    "icon": "👥",
    "titles": [
      {
        "number": "001",
        "title": "Tipo de conteúdo recomendado"
      },
      {
        "number": "061",
        "title": "Detetive do mapa."
      },
      {
        "number": "062",
        "title": "Teorias com evidência."
      },
      {
        "number": "063",
        "title": "Mistério visual."
      },
      {
        "number": "064",
        "title": "Comunidade e experimento."
      },
      {
        "number": "065",
        "title": "Turismo digital e mapa."
      },
      {
        "number": "066",
        "title": "Rumor ou realidade."
      },
      {
        "number": "067",
        "title": "Reconstrução geográfica."
      },
      {
        "number": "068",
        "title": "Perfil de personagens."
      },
      {
        "number": "069",
        "title": "Veículos e escolhas."
      },
      {
        "number": "070",
        "title": "A evolução de GTA em [NÚMERO] comparações"
      },
      {
        "number": "071",
        "title": "Mistérios e exploração."
      },
      {
        "number": "072",
        "title": "Teoria incompleta."
      }
    ]
  },
  {
    "id": "tit-7-----compara--es",
    "category": "🆚 Comparações",
    "icon": "🆚",
    "titles": [
      {
        "number": "001",
        "title": "Tipo de conteúdo recomendado"
      },
      {
        "number": "073",
        "title": "Comparar densidade e comportamento."
      },
      {
        "number": "074",
        "title": "Conectar nostalgia e evolução."
      },
      {
        "number": "075",
        "title": "Comparar veículos por função."
      },
      {
        "number": "076",
        "title": "Mostrar transformação ambiental."
      },
      {
        "number": "077",
        "title": "Gerar debate de design."
      },
      {
        "number": "078",
        "title": "Comparar personalidade."
      },
      {
        "number": "079",
        "title": "Ensinar verificação."
      },
      {
        "number": "080",
        "title": "Comparar estratégia."
      },
      {
        "number": "081",
        "title": "Comparar evolução visual e sistêmica."
      },
      {
        "number": "082",
        "title": "Comparar investimento fictício."
      },
      {
        "number": "083",
        "title": "Atualizar interpretação."
      },
      {
        "number": "084",
        "title": "Testar hipótese com responsabilidade."
      }
    ]
  },
  {
    "id": "tit-8-----not-cias-e-atualiza--es",
    "category": "📰 Notícias e Atualizações",
    "icon": "📰",
    "titles": [
      {
        "number": "001",
        "title": "Tipo de conteúdo recomendado"
      },
      {
        "number": "085",
        "title": "Explicar anúncio oficial."
      },
      {
        "number": "086",
        "title": "Entregar boletim rápido."
      },
      {
        "number": "087",
        "title": "Separar fato de reação."
      },
      {
        "number": "088",
        "title": "Organizar anúncio."
      },
      {
        "number": "089",
        "title": "Cobrir com transparência."
      },
      {
        "number": "090",
        "title": "Direcionar para material oficial."
      },
      {
        "number": "091",
        "title": "Filtrar excesso de conteúdo."
      },
      {
        "number": "092",
        "title": "Analisar consequência sem exagero."
      },
      {
        "number": "093",
        "title": "Criar continuação de notícia."
      },
      {
        "number": "094",
        "title": "Explicar nuance oficial."
      },
      {
        "number": "095",
        "title": "Controlar desinformação."
      },
      {
        "number": "096",
        "title": "Consolidar mudanças."
      }
    ]
  },
  {
    "id": "tit-9-----teorias-e-segredos",
    "category": "🧠 Teorias e Segredos",
    "icon": "🧠",
    "titles": [
      {
        "number": "001",
        "title": "Tipo de conteúdo recomendado"
      },
      {
        "number": "097",
        "title": "Linha do tempo e decisões."
      },
      {
        "number": "098",
        "title": "Investigação especulativa."
      },
      {
        "number": "099",
        "title": "Teoria com evidências."
      },
      {
        "number": "100",
        "title": "Psicologia de personagens."
      },
      {
        "number": "101",
        "title": "Facções ou marcas."
      },
      {
        "number": "102",
        "title": "Arquivo secreto ou cronologia."
      },
      {
        "number": "103",
        "title": "Mapa e descoberta."
      },
      {
        "number": "104",
        "title": "Fact-check de teoria."
      },
      {
        "number": "105",
        "title": "Polícia e evidências."
      },
      {
        "number": "106",
        "title": "Dinheiro, negócios ou propriedades."
      },
      {
        "number": "107",
        "title": "Mapa, facções ou marcas."
      },
      {
        "number": "108",
        "title": "Teoria responsável."
      }
    ]
  },
  {
    "id": "tit-10-----hype-e-emo--o",
    "category": "🔥 Hype e Emoção",
    "icon": "🔥",
    "titles": [
      {
        "number": "001",
        "title": "Tipo de conteúdo recomendado"
      },
      {
        "number": "109",
        "title": "Ambientação e evolução."
      },
      {
        "number": "110",
        "title": "Trailer, anúncio ou lançamento."
      },
      {
        "number": "111",
        "title": "Análise de cena."
      },
      {
        "number": "112",
        "title": "Mapa e mundo aberto."
      },
      {
        "number": "113",
        "title": "Turismo digital."
      },
      {
        "number": "114",
        "title": "Evolução da franquia."
      },
      {
        "number": "115",
        "title": "Misturar nostalgia e descoberta."
      },
      {
        "number": "116",
        "title": "Exploração, história ou veículo."
      },
      {
        "number": "117",
        "title": "Imagem ou anúncio oficial."
      },
      {
        "number": "118",
        "title": "Mercado e produção faceless."
      },
      {
        "number": "119",
        "title": "Trailer e mistérios."
      },
      {
        "number": "120",
        "title": "Nostalgia da franquia."
      }
    ]
  }
];

export const OPERACAO_LEGENDAS: OperacaoCaptionCategory[] = [
  {
    "id": "cap-1-----10-legendas-para-not-cias",
    "category": "📰 10 legendas para notícias",
    "icon": "📰",
    "captions": [
      {
        "number": "01",
        "caption": "Atualização rápida: isto foi confirmado, isto ainda está em aberto. Salve para acompanhar as próximas informações."
      },
      {
        "number": "02",
        "caption": "A novidade saiu agora e o impacto pode ir além do que parece. O que mais chamou sua atenção?"
      },
      {
        "number": "03",
        "caption": "Resumo sem rumor disfarçado de notícia: fato, contexto e o que ainda não sabemos."
      },
      {
        "number": "04",
        "caption": "A Rockstar publicou uma nova informação. Aqui está a parte que realmente muda a conversa."
      },
      {
        "number": "05",
        "caption": "Antes de compartilhar a manchete, confira exatamente o que a fonte oficial informou."
      },
      {
        "number": "06",
        "caption": "Nova atualização sobre GTA VI. Comente qual ponto merece uma análise completa."
      },
      {
        "number": "07",
        "caption": "O assunto está quente, mas a credibilidade continua em primeiro lugar. Estes são os fatos até agora."
      },
      {
        "number": "08",
        "caption": "Três pontos do anúncio e uma pergunta que continua sem resposta. Qual é a sua teoria?"
      },
      {
        "number": "09",
        "caption": "A informação mudou desde a última atualização. Este é o resumo corrigido e atualizado."
      },
      {
        "number": "10",
        "caption": "Notícia confirmada, impacto explicado e nenhuma promessa além do que foi divulgado."
      }
    ]
  },
  {
    "id": "cap-2-----10-legendas-para-curiosidades",
    "category": "🧲 10 legendas para curiosidades",
    "icon": "🧲",
    "captions": [
      {
        "number": "11",
        "caption": "O detalhe estava visível o tempo inteiro. Você percebeu antes do zoom?"
      },
      {
        "number": "12",
        "caption": "Uma cena curta, três pistas e uma nova forma de enxergar o mapa."
      },
      {
        "number": "13",
        "caption": "Olhe para o fundo e depois reveja o começo. Tudo ganha outro sentido."
      },
      {
        "number": "14",
        "caption": "A parte mais curiosa não é o que aparece — é o que está faltando."
      },
      {
        "number": "15",
        "caption": "Este pequeno objeto pode não provar nada sozinho, mas merece entrar na investigação."
      },
      {
        "number": "16",
        "caption": "Quantos detalhes você encontrou sem pausar o vídeo?"
      },
      {
        "number": "17",
        "caption": "Vice City conta histórias até nas placas. Salve para rever com calma."
      },
      {
        "number": "18",
        "caption": "O frame parece simples até você separar frente, meio e fundo."
      },
      {
        "number": "19",
        "caption": "Uma escolha visual, várias interpretações. Qual faz mais sentido para você?"
      },
      {
        "number": "20",
        "caption": "Se você encontrou outro detalhe, deixe o segundo exato nos comentários."
      }
    ]
  },
  {
    "id": "cap-3-----10-legendas-para-teorias",
    "category": "🧠 10 legendas para teorias",
    "icon": "🧠",
    "captions": [
      {
        "number": "21",
        "caption": "Isto é uma teoria, não uma confirmação. As pistas ajudam, mas ainda falta uma peça."
      },
      {
        "number": "22",
        "caption": "Duas evidências sustentam a hipótese; um detalhe pode derrubá-la. Qual lado pesa mais?"
      },
      {
        "number": "23",
        "caption": "E se esta cena acontecer depois do momento que todos consideram o início?"
      },
      {
        "number": "24",
        "caption": "Minha leitura é esta hoje — a próxima imagem oficial pode mudar tudo."
      },
      {
        "number": "25",
        "caption": "A teoria parece possível, mas coincidência também é uma resposta. O que você acha?"
      },
      {
        "number": "26",
        "caption": "Talvez o conflito principal não seja o crime, mas a confiança entre os personagens."
      },
      {
        "number": "27",
        "caption": "Esta hipótese conecta mapa e história sem tratar interpretação como fato."
      },
      {
        "number": "28",
        "caption": "Três pistas apontam na mesma direção. Ainda assim, o veredito continua aberto."
      },
      {
        "number": "29",
        "caption": "Se esta possibilidade estiver certa, uma decisão pequena terá uma consequência enorme."
      },
      {
        "number": "30",
        "caption": "Teoria registrada. Agora vamos esperar a próxima evidência e comparar."
      }
    ]
  },
  {
    "id": "cap-4-----10-legendas-para-compara--es",
    "category": "🆚 10 legendas para comparações",
    "icon": "🆚",
    "captions": [
      {
        "number": "31",
        "caption": "Lado a lado, a diferença fica mais clara. Qual versão funciona melhor para você?"
      },
      {
        "number": "32",
        "caption": "Velocidade ou controle? O vencedor muda quando o critério muda."
      },
      {
        "number": "33",
        "caption": "Não é só gráfico: comportamento, densidade e atmosfera também contam."
      },
      {
        "number": "34",
        "caption": "Duas gerações, a mesma situação e experiências completamente diferentes."
      },
      {
        "number": "35",
        "caption": "Mapa maior ou mundo mais vivo? Escolha um e explique por quê."
      },
      {
        "number": "36",
        "caption": "De dia parece turismo; à noite parece outra cidade."
      },
      {
        "number": "37",
        "caption": "Uma opção custa mais. A outra entrega mais utilidade. Qual você escolheria?"
      },
      {
        "number": "38",
        "caption": "Informação oficial e rumor podem soar parecidos até você comparar a origem."
      },
      {
        "number": "39",
        "caption": "A evolução está nos detalhes que o jogador sente, não apenas nos números."
      },
      {
        "number": "40",
        "caption": "Compare antes de votar: qual lado realmente venceu este duelo?"
      }
    ]
  },
  {
    "id": "cap-5-----10-legendas-para-gerar-coment-rios",
    "category": "💬 10 legendas para gerar comentários",
    "icon": "💬",
    "captions": [
      {
        "number": "41",
        "caption": "Escolha apenas uma opção e defenda sua decisão em uma frase."
      },
      {
        "number": "42",
        "caption": "Sua vez: esta teoria faz sentido ou foi longe demais?"
      },
      {
        "number": "43",
        "caption": "Qual detalhe merece virar o próximo vídeo?"
      },
      {
        "number": "44",
        "caption": "Você começaria pela história, pelo mapa ou pelos veículos?"
      },
      {
        "number": "45",
        "caption": "Dê uma nota para esta ideia e explique o que mudaria."
      },
      {
        "number": "46",
        "caption": "Aliado ou ameaça? Quero ver a leitura da comunidade."
      },
      {
        "number": "47",
        "caption": "Complete a frase: GTA VI precisa acertar principalmente em..."
      },
      {
        "number": "48",
        "caption": "Qual seria seu primeiro teste dentro do jogo?"
      },
      {
        "number": "49",
        "caption": "Salve um veículo e elimine os outros. Qual sobrevive?"
      },
      {
        "number": "50",
        "caption": "A opinião mais curtida vira a pauta da próxima análise."
      }
    ]
  },
  {
    "id": "cap-6-----10-legendas-para-compartilhamentos-e-salvamentos",
    "category": "📤 10 legendas para compartilhamentos e salvamentos",
    "icon": "📤",
    "captions": [
      {
        "number": "51",
        "caption": "Salve este checklist para usar quando sair o próximo material oficial."
      },
      {
        "number": "52",
        "caption": "Envie para quem ainda mistura rumor com informação confirmada."
      },
      {
        "number": "53",
        "caption": "Guarde esta comparação e volte quando tivermos novas imagens."
      },
      {
        "number": "54",
        "caption": "Compartilhe com a pessoa que escolheria exatamente a rota errada."
      },
      {
        "number": "55",
        "caption": "Este mapa ainda vai mudar. Salve a versão de hoje para comparar depois."
      },
      {
        "number": "56",
        "caption": "Mande para o fã de GTA que percebe todos os detalhes antes de todo mundo."
      },
      {
        "number": "57",
        "caption": "Salve os três pontos e use como roteiro para sua próxima análise."
      },
      {
        "number": "58",
        "caption": "Este resumo poupa tempo e organiza tudo que está confirmado."
      },
      {
        "number": "59",
        "caption": "Compartilhe no grupo e descubra qual opção divide mais opiniões."
      },
      {
        "number": "60",
        "caption": "Guarde esta teoria: quando surgir nova evidência, vamos testar novamente."
      }
    ]
  }
];

export const OPERACAO_CALENDARIO_30D: OperacaoCalendarioDia[] = [
  {
    "day": 1,
    "week": 1,
    "title": "O que realmente importa agora",
    "category": "🛰️ Radar e Atualizações",
    "difficulty": "facil",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 01: O que realmente importa agora",
    "recommendedScriptId": "rot-01",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 2,
    "week": 1,
    "title": "O detalhe escondido em um frame",
    "category": "🧩 Mistérios e Narrativas",
    "difficulty": "facil",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 02: O detalhe escondido em um frame",
    "recommendedScriptId": "rot-02",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 3,
    "week": 1,
    "title": "Localizando uma cena no mapa",
    "category": "🌴 Mundo e Exploração",
    "difficulty": "facil",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 03: Localizando uma cena no mapa",
    "recommendedScriptId": "rot-03",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 4,
    "week": 1,
    "title": "O que a postura de Lucia revela",
    "category": "🎭 Personagens e Sociedade",
    "difficulty": "facil",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 04: O que a postura de Lucia revela",
    "recommendedScriptId": "rot-04",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 5,
    "week": 1,
    "title": "Três sistemas que podem mudar o gameplay",
    "category": "🎮 Mecânicas e Gameplay",
    "difficulty": "facil",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 05: Três sistemas que podem mudar o gameplay",
    "recommendedScriptId": "rot-05",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 6,
    "week": 1,
    "title": "Veículos que contam uma história",
    "category": "🚘 Crime, Veículos e Economia",
    "difficulty": "facil",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 06: Veículos que contam uma história",
    "recommendedScriptId": "rot-06",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 7,
    "week": 1,
    "title": "Redublagem do caos",
    "category": "🎬 Entretenimento Criativo",
    "difficulty": "facil",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 07: Redublagem do caos",
    "recommendedScriptId": "rot-07",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 8,
    "week": 2,
    "title": "O rumor da semana sob investigação",
    "category": "🛰️ Radar e Atualizações",
    "difficulty": "facil",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 08: O rumor da semana sob investigação",
    "recommendedScriptId": "rot-08",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 9,
    "week": 2,
    "title": "Escolha um lado",
    "category": "📈 Comunidade e Canal",
    "difficulty": "facil",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 09: Escolha um lado",
    "recommendedScriptId": "rot-09",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 10,
    "week": 2,
    "title": "Reconstruindo a ordem das cenas",
    "category": "🧩 Mistérios e Narrativas",
    "difficulty": "facil",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 10: Reconstruindo a ordem das cenas",
    "recommendedScriptId": "rot-10",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 11,
    "week": 2,
    "title": "A piada escondida no cenário",
    "category": "🌴 Mundo e Exploração",
    "difficulty": "media",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 11: A piada escondida no cenário",
    "recommendedScriptId": "rot-11",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 12,
    "week": 2,
    "title": "Quando um vídeo viral vira parte da história",
    "category": "🎭 Personagens e Sociedade",
    "difficulty": "media",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 12: Quando um vídeo viral vira parte da história",
    "recommendedScriptId": "rot-12",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 13,
    "week": 2,
    "title": "O mesmo lugar, duas vidas diferentes",
    "category": "🎮 Mecânicas e Gameplay",
    "difficulty": "media",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 13: O mesmo lugar, duas vidas diferentes",
    "recommendedScriptId": "rot-13",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 14,
    "week": 2,
    "title": "O plano perfeito para um golpe dar errado",
    "category": "🚘 Crime, Veículos e Economia",
    "difficulty": "media",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 14: O plano perfeito para um golpe dar errado",
    "recommendedScriptId": "rot-14",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 15,
    "week": 3,
    "title": "Cinco pistas em uma única cena",
    "category": "🛰️ Radar e Atualizações",
    "difficulty": "media",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 15: Cinco pistas em uma única cena",
    "recommendedScriptId": "rot-15",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 16,
    "week": 3,
    "title": "GTA VI como trailer de outro gênero",
    "category": "🎬 Entretenimento Criativo",
    "difficulty": "media",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 16: GTA VI como trailer de outro gênero",
    "recommendedScriptId": "rot-16",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 17,
    "week": 3,
    "title": "A mesma situação em duas gerações",
    "category": "📈 Comunidade e Canal",
    "difficulty": "media",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 17: A mesma situação em duas gerações",
    "recommendedScriptId": "rot-17",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 18,
    "week": 3,
    "title": "A teoria da possível traição",
    "category": "🧩 Mistérios e Narrativas",
    "difficulty": "media",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 18: A teoria da possível traição",
    "recommendedScriptId": "rot-18",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 19,
    "week": 3,
    "title": "Os perigos naturais de Leonida",
    "category": "🌴 Mundo e Exploração",
    "difficulty": "media",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 19: Os perigos naturais de Leonida",
    "recommendedScriptId": "rot-19",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 20,
    "week": 3,
    "title": "Quem pode controlar cada território",
    "category": "🎭 Personagens e Sociedade",
    "difficulty": "media",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 20: Quem pode controlar cada território",
    "recommendedScriptId": "rot-20",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 21,
    "week": 3,
    "title": "Como as perseguições podem evoluir",
    "category": "🎮 Mecânicas e Gameplay",
    "difficulty": "media",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 21: Como as perseguições podem evoluir",
    "recommendedScriptId": "rot-21",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 22,
    "week": 4,
    "title": "Por que toda a indústria observa GTA VI",
    "category": "🛰️ Radar e Atualizações",
    "difficulty": "media",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 22: Por que toda a indústria observa GTA VI",
    "recommendedScriptId": "rot-22",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 23,
    "week": 4,
    "title": "A rota de fuga que ignora as estradas",
    "category": "🚘 Crime, Veículos e Economia",
    "difficulty": "avancada",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 23: A rota de fuga que ignora as estradas",
    "recommendedScriptId": "rot-23",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 24,
    "week": 4,
    "title": "Três mitos do trailer",
    "category": "🎬 Entretenimento Criativo",
    "difficulty": "avancada",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 24: Três mitos do trailer",
    "recommendedScriptId": "rot-24",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 25,
    "week": 4,
    "title": "Quando a realidade parece uma missão de GTA",
    "category": "🧩 Mistérios e Narrativas",
    "difficulty": "avancada",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 25: Quando a realidade parece uma missão de GTA",
    "recommendedScriptId": "rot-25",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 26,
    "week": 4,
    "title": "Escolha uma profissão para viver em Vice City",
    "category": "📈 Comunidade e Canal",
    "difficulty": "avancada",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 26: Escolha uma profissão para viver em Vice City",
    "recommendedScriptId": "rot-26",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 27,
    "week": 4,
    "title": "Quantos interiores esta avenida pode esconder?",
    "category": "🌴 Mundo e Exploração",
    "difficulty": "avancada",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 27: Quantos interiores esta avenida pode esconder?",
    "recommendedScriptId": "rot-27",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 28,
    "week": 4,
    "title": "As roupas contam a história antes do diálogo",
    "category": "🎭 Personagens e Sociedade",
    "difficulty": "avancada",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 28: As roupas contam a história antes do diálogo",
    "recommendedScriptId": "rot-28",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 29,
    "week": 5,
    "title": "Três testes para fazer no primeiro dia",
    "category": "🎮 Mecânicas e Gameplay",
    "difficulty": "avancada",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 29: Três testes para fazer no primeiro dia",
    "recommendedScriptId": "rot-29",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  },
  {
    "day": 30,
    "week": 5,
    "title": "O plano para construir um império do zero",
    "category": "🚘 Crime, Veículos e Economia",
    "difficulty": "avancada",
    "format": "Vídeo curto (30s)",
    "hookPreview": "Dia 30: O plano para construir um império do zero",
    "recommendedScriptId": "rot-30",
    "gdriveFolderUrl": "https://drive.google.com/drive/folders/145hqaD9pnFmgfNMbBAFhP3YY11QjMTC1"
  }
];

export const OPERACAO_MAPA_OPORTUNIDADES: OperacaoSubnicho[] = [
  {
    "number": "01",
    "title": "Boletim Vice em 60 Segundos",
    "description": "Subnicho focado em Boletim Vice em 60 Segundos.",
    "potential": "Muito Alto",
    "difficulty": "Fácil",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Boletim Vice em 60 Segundos — revelação e detalhes escondidos",
      "Ideia 2: Boletim Vice em 60 Segundos — teoria comprovada por frames",
      "Ideia 3: Boletim Vice em 60 Segundos — comparação direta com GTA 5"
    ]
  },
  {
    "number": "02",
    "title": "Trailer Sob Microscópio",
    "description": "Subnicho focado em Trailer Sob Microscópio.",
    "potential": "Muito Alto",
    "difficulty": "Média",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Trailer Sob Microscópio — revelação e detalhes escondidos",
      "Ideia 2: Trailer Sob Microscópio — teoria comprovada por frames",
      "Ideia 3: Trailer Sob Microscópio — comparação direta com GTA 5"
    ]
  },
  {
    "number": "03",
    "title": "Rumor ou Realidade",
    "description": "Subnicho focado em Rumor ou Realidade.",
    "potential": "Muito Alto",
    "difficulty": "Avançada",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Rumor ou Realidade — revelação e detalhes escondidos",
      "Ideia 2: Rumor ou Realidade — teoria comprovada por frames",
      "Ideia 3: Rumor ou Realidade — comparação direta com GTA 5"
    ]
  },
  {
    "number": "04",
    "title": "Diário da Contagem Regressiva",
    "description": "acompanhamento seriado da jornada até grandes anúncios, lançamento e marcos posteriores.",
    "potential": "Muito Alto",
    "difficulty": "Fácil",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Diário da Contagem Regressiva — revelação e detalhes escondidos",
      "Ideia 2: Diário da Contagem Regressiva — teoria comprovada por frames",
      "Ideia 3: Diário da Contagem Regressiva — comparação direta com GTA 5"
    ]
  },
  {
    "number": "05",
    "title": "Bastidores da Indústria GTA",
    "description": "traduz o impacto de GTA VI sobre estúdios, plataformas, criadores, publicidade e mercado de games.",
    "potential": "Muito Alto",
    "difficulty": "Média",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Bastidores da Indústria GTA — revelação e detalhes escondidos",
      "Ideia 2: Bastidores da Indústria GTA — teoria comprovada por frames",
      "Ideia 3: Bastidores da Indústria GTA — comparação direta com GTA 5"
    ]
  },
  {
    "number": "06",
    "title": "Arquivos Secretos de Leonida",
    "description": "investigações em formato de dossiê sobre locais, eventos, personagens e pistas do universo do jogo.",
    "potential": "Muito Alto",
    "difficulty": "Avançada",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Arquivos Secretos de Leonida — revelação e detalhes escondidos",
      "Ideia 2: Arquivos Secretos de Leonida — teoria comprovada por frames",
      "Ideia 3: Arquivos Secretos de Leonida — comparação direta com GTA 5"
    ]
  },
  {
    "number": "07",
    "title": "Teorias que Fazem Sentido",
    "description": "construção e avaliação de teorias com evidências, contrapontos e uma conclusão honesta.",
    "potential": "Muito Alto",
    "difficulty": "Fácil",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Teorias que Fazem Sentido — revelação e detalhes escondidos",
      "Ideia 2: Teorias que Fazem Sentido — teoria comprovada por frames",
      "Ideia 3: Teorias que Fazem Sentido — comparação direta com GTA 5"
    ]
  },
  {
    "number": "08",
    "title": "Linha do Tempo do Crime",
    "description": "organiza acontecimentos, pistas e relações em cronologias fáceis de acompanhar.",
    "potential": "Muito Alto",
    "difficulty": "Média",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Linha do Tempo do Crime — revelação e detalhes escondidos",
      "Ideia 2: Linha do Tempo do Crime — teoria comprovada por frames",
      "Ideia 3: Linha do Tempo do Crime — comparação direta com GTA 5"
    ]
  },
  {
    "number": "09",
    "title": "Crimes que Inspiram Ficção",
    "description": "compara situações fictícias e sátiras do universo GTA com fenômenos culturais e crimes históricos, sem glorificação.",
    "potential": "Muito Alto",
    "difficulty": "Avançada",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Crimes que Inspiram Ficção — revelação e detalhes escondidos",
      "Ideia 2: Crimes que Inspiram Ficção — teoria comprovada por frames",
      "Ideia 3: Crimes que Inspiram Ficção — comparação direta com GTA 5"
    ]
  },
  {
    "number": "10",
    "title": "Futuros Alternativos de GTA VI",
    "description": "cenários hipotéticos construídos com lógica: escolhas, consequências, finais e caminhos que o jogo poderia explorar.",
    "potential": "Muito Alto",
    "difficulty": "Fácil",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Futuros Alternativos de GTA VI — revelação e detalhes escondidos",
      "Ideia 2: Futuros Alternativos de GTA VI — teoria comprovada por frames",
      "Ideia 3: Futuros Alternativos de GTA VI — comparação direta com GTA 5"
    ]
  },
  {
    "number": "11",
    "title": "Detetive do Mapa",
    "description": "identificação de regiões e rotas a partir de placas, paisagens, pontes e outros marcos visuais.",
    "potential": "Muito Alto",
    "difficulty": "Média",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Detetive do Mapa — revelação e detalhes escondidos",
      "Ideia 2: Detetive do Mapa — teoria comprovada por frames",
      "Ideia 3: Detetive do Mapa — comparação direta com GTA 5"
    ]
  },
  {
    "number": "12",
    "title": "Turismo Digital em Leonida",
    "description": "apresenta cidades, praias, estradas e atrações como se o canal fosse um guia turístico do universo GTA.",
    "potential": "Muito Alto",
    "difficulty": "Avançada",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Turismo Digital em Leonida — revelação e detalhes escondidos",
      "Ideia 2: Turismo Digital em Leonida — teoria comprovada por frames",
      "Ideia 3: Turismo Digital em Leonida — comparação direta com GTA 5"
    ]
  },
  {
    "number": "13",
    "title": "Natureza Selvagem GTA",
    "description": "fauna, pântanos, praias, clima, ecossistemas e encontros inesperados no mundo aberto.",
    "potential": "Muito Alto",
    "difficulty": "Fácil",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Natureza Selvagem GTA — revelação e detalhes escondidos",
      "Ideia 2: Natureza Selvagem GTA — teoria comprovada por frames",
      "Ideia 3: Natureza Selvagem GTA — comparação direta com GTA 5"
    ]
  },
  {
    "number": "14",
    "title": "Arquitetura e Interiores",
    "description": "análise de edifícios, casas, estabelecimentos, interiores acessíveis e como o espaço influencia o gameplay.",
    "potential": "Muito Alto",
    "difficulty": "Média",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Arquitetura e Interiores — revelação e detalhes escondidos",
      "Ideia 2: Arquitetura e Interiores — teoria comprovada por frames",
      "Ideia 3: Arquitetura e Interiores — comparação direta com GTA 5"
    ]
  },
  {
    "number": "15",
    "title": "Marcas e Paródias de Vice",
    "description": "catálogo e interpretação das empresas, produtos, anúncios e sátiras comerciais do universo GTA.",
    "potential": "Muito Alto",
    "difficulty": "Avançada",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Marcas e Paródias de Vice — revelação e detalhes escondidos",
      "Ideia 2: Marcas e Paródias de Vice — teoria comprovada por frames",
      "Ideia 3: Marcas e Paródias de Vice — comparação direta com GTA 5"
    ]
  },
  {
    "number": "16",
    "title": "Psicologia dos Protagonistas",
    "description": "leitura das motivações, conflitos, linguagem corporal e evolução emocional dos protagonistas.",
    "potential": "Alto",
    "difficulty": "Fácil",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Psicologia dos Protagonistas — revelação e detalhes escondidos",
      "Ideia 2: Psicologia dos Protagonistas — teoria comprovada por frames",
      "Ideia 3: Psicologia dos Protagonistas — comparação direta com GTA 5"
    ]
  },
  {
    "number": "17",
    "title": "Vida Secreta dos NPCs",
    "description": "observação das rotinas, reações, conversas e pequenas histórias criadas pelos habitantes do mundo.",
    "potential": "Alto",
    "difficulty": "Média",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Vida Secreta dos NPCs — revelação e detalhes escondidos",
      "Ideia 2: Vida Secreta dos NPCs — teoria comprovada por frames",
      "Ideia 3: Vida Secreta dos NPCs — comparação direta com GTA 5"
    ]
  },
  {
    "number": "18",
    "title": "Facções, Gangues e Poder",
    "description": "mapeia grupos, territórios, alianças, rivalidades e sua influência sobre a cidade.",
    "potential": "Alto",
    "difficulty": "Avançada",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Facções, Gangues e Poder — revelação e detalhes escondidos",
      "Ideia 2: Facções, Gangues e Poder — teoria comprovada por frames",
      "Ideia 3: Facções, Gangues e Poder — comparação direta com GTA 5"
    ]
  },
  {
    "number": "19",
    "title": "Internet e Fama em Vice City",
    "description": "acompanha influenciadores fictícios, redes sociais, memes internos e a sátira da busca por fama.",
    "potential": "Alto",
    "difficulty": "Fácil",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Internet e Fama em Vice City — revelação e detalhes escondidos",
      "Ideia 2: Internet e Fama em Vice City — teoria comprovada por frames",
      "Ideia 3: Internet e Fama em Vice City — comparação direta com GTA 5"
    ]
  },
  {
    "number": "20",
    "title": "Moda, Estilo e Identidade",
    "description": "explora roupas, estética regional, customização e como o visual comunica personalidade e status.",
    "potential": "Alto",
    "difficulty": "Média",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Moda, Estilo e Identidade — revelação e detalhes escondidos",
      "Ideia 2: Moda, Estilo e Identidade — teoria comprovada por frames",
      "Ideia 3: Moda, Estilo e Identidade — comparação direta com GTA 5"
    ]
  },
  {
    "number": "21",
    "title": "Laboratório de Mecânicas",
    "description": "testa limites e interações do jogo com método, repetição e comparação de resultados.",
    "potential": "Alto",
    "difficulty": "Avançada",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Laboratório de Mecânicas — revelação e detalhes escondidos",
      "Ideia 2: Laboratório de Mecânicas — teoria comprovada por frames",
      "Ideia 3: Laboratório de Mecânicas — comparação direta com GTA 5"
    ]
  },
  {
    "number": "22",
    "title": "Manual da Perseguição",
    "description": "conteúdo dedicado a polícia, níveis de procurado, investigação, fuga e comportamento das autoridades.",
    "potential": "Alto",
    "difficulty": "Fácil",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Manual da Perseguição — revelação e detalhes escondidos",
      "Ideia 2: Manual da Perseguição — teoria comprovada por frames",
      "Ideia 3: Manual da Perseguição — comparação direta com GTA 5"
    ]
  },
  {
    "number": "23",
    "title": "Escola de Golpes",
    "description": "analisa preparação, escolha de equipe, entrada, saída e improviso em missões criminosas fictícias.",
    "potential": "Alto",
    "difficulty": "Média",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Escola de Golpes — revelação e detalhes escondidos",
      "Ideia 2: Escola de Golpes — teoria comprovada por frames",
      "Ideia 3: Escola de Golpes — comparação direta com GTA 5"
    ]
  },
  {
    "number": "24",
    "title": "Mundo Vivo 24 Horas",
    "description": "observa como horário, clima, trânsito, eventos e rotinas transformam lugares e missões.",
    "potential": "Alto",
    "difficulty": "Avançada",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Mundo Vivo 24 Horas — revelação e detalhes escondidos",
      "Ideia 2: Mundo Vivo 24 Horas — teoria comprovada por frames",
      "Ideia 3: Mundo Vivo 24 Horas — comparação direta com GTA 5"
    ]
  },
  {
    "number": "25",
    "title": "Segredos dos Sistemas",
    "description": "explica inteligência artificial, física, interação, inventário e regras ocultas de forma simples.",
    "potential": "Alto",
    "difficulty": "Fácil",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Segredos dos Sistemas — revelação e detalhes escondidos",
      "Ideia 2: Segredos dos Sistemas — teoria comprovada por frames",
      "Ideia 3: Segredos dos Sistemas — comparação direta com GTA 5"
    ]
  },
  {
    "number": "26",
    "title": "Garagem dos Sonhos",
    "description": "carros, personalização, desempenho, coleções e escolhas para diferentes tipos de jogador.",
    "potential": "Alto",
    "difficulty": "Média",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Garagem dos Sonhos — revelação e detalhes escondidos",
      "Ideia 2: Garagem dos Sonhos — teoria comprovada por frames",
      "Ideia 3: Garagem dos Sonhos — comparação direta com GTA 5"
    ]
  },
  {
    "number": "27",
    "title": "Rotas de Água",
    "description": "barcos, canais, ilhas, mergulho e formas de usar o ambiente aquático para explorar ou escapar.",
    "potential": "Alto",
    "difficulty": "Avançada",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Rotas de Água — revelação e detalhes escondidos",
      "Ideia 2: Rotas de Água — teoria comprovada por frames",
      "Ideia 3: Rotas de Água — comparação direta com GTA 5"
    ]
  },
  {
    "number": "28",
    "title": "Céu de Leonida",
    "description": "aviação, helicópteros, paraquedismo, vistas aéreas e acesso a regiões difíceis.",
    "potential": "Alto",
    "difficulty": "Fácil",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Céu de Leonida — revelação e detalhes escondidos",
      "Ideia 2: Céu de Leonida — teoria comprovada por frames",
      "Ideia 3: Céu de Leonida — comparação direta com GTA 5"
    ]
  },
  {
    "number": "29",
    "title": "Império Imobiliário",
    "description": "propriedades, esconderijos, garagens, negócios e evolução patrimonial dentro do jogo.",
    "potential": "Alto",
    "difficulty": "Média",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Império Imobiliário — revelação e detalhes escondidos",
      "Ideia 2: Império Imobiliário — teoria comprovada por frames",
      "Ideia 3: Império Imobiliário — comparação direta com GTA 5"
    ]
  },
  {
    "number": "30",
    "title": "Economia do Submundo",
    "description": "analisa formas de ganhar, gastar, perder e reinvestir dinheiro na progressão criminal fictícia.",
    "potential": "Alto",
    "difficulty": "Avançada",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Economia do Submundo — revelação e detalhes escondidos",
      "Ideia 2: Economia do Submundo — teoria comprovada por frames",
      "Ideia 3: Economia do Submundo — comparação direta com GTA 5"
    ]
  },
  {
    "number": "31",
    "title": "Cinema em Vice City",
    "description": "transforma cenas do jogo em trailers, curtas, videoclipes e sequências cinematográficas.",
    "potential": "Alto",
    "difficulty": "Fácil",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Cinema em Vice City — revelação e detalhes escondidos",
      "Ideia 2: Cinema em Vice City — teoria comprovada por frames",
      "Ideia 3: Cinema em Vice City — comparação direta com GTA 5"
    ]
  },
  {
    "number": "32",
    "title": "Dublagens do Caos",
    "description": "humor criado com dublagens originais, diálogos alternativos e narração sobre situações do jogo.",
    "potential": "Alto",
    "difficulty": "Média",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Dublagens do Caos — revelação e detalhes escondidos",
      "Ideia 2: Dublagens do Caos — teoria comprovada por frames",
      "Ideia 3: Dublagens do Caos — comparação direta com GTA 5"
    ]
  },
  {
    "number": "33",
    "title": "Desafios Impossíveis",
    "description": "regras autoimpostas que transformam atividades comuns em provas com tensão e recompensa.",
    "potential": "Alto",
    "difficulty": "Avançada",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Desafios Impossíveis — revelação e detalhes escondidos",
      "Ideia 2: Desafios Impossíveis — teoria comprovada por frames",
      "Ideia 3: Desafios Impossíveis — comparação direta com GTA 5"
    ]
  },
  {
    "number": "34",
    "title": "Mito ou Mecânica",
    "description": "testa lendas, dicas virais, supostos segredos e comportamentos estranhos do jogo.",
    "potential": "Alto",
    "difficulty": "Fácil",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Mito ou Mecânica — revelação e detalhes escondidos",
      "Ideia 2: Mito ou Mecânica — teoria comprovada por frames",
      "Ideia 3: Mito ou Mecânica — comparação direta com GTA 5"
    ]
  },
  {
    "number": "35",
    "title": "Rádio, Música e Cultura",
    "description": "estações, gêneros, locutores, trilhas, sons ambientes e a identidade cultural construída pelo áudio.",
    "potential": "Alto",
    "difficulty": "Média",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Rádio, Música e Cultura — revelação e detalhes escondidos",
      "Ideia 2: Rádio, Música e Cultura — teoria comprovada por frames",
      "Ideia 3: Rádio, Música e Cultura — comparação direta com GTA 5"
    ]
  },
  {
    "number": "36",
    "title": "GTA VI sem Aparecer",
    "description": "bastidores e formatos específicos para ensinar ou documentar a criação de conteúdo faceless sobre GTA VI.",
    "potential": "Alto",
    "difficulty": "Avançada",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: GTA VI sem Aparecer — revelação e detalhes escondidos",
      "Ideia 2: GTA VI sem Aparecer — teoria comprovada por frames",
      "Ideia 3: GTA VI sem Aparecer — comparação direta com GTA 5"
    ]
  },
  {
    "number": "37",
    "title": "Evolução da Franquia",
    "description": "compara GTA VI com títulos anteriores em mapa, mecânicas, personagens, tecnologia e direção artística.",
    "potential": "Alto",
    "difficulty": "Fácil",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Evolução da Franquia — revelação e detalhes escondidos",
      "Ideia 2: Evolução da Franquia — teoria comprovada por frames",
      "Ideia 3: Evolução da Franquia — comparação direta com GTA 5"
    ]
  },
  {
    "number": "38",
    "title": "Central de Configuração e Acesso",
    "description": "conteúdo utilitário sobre plataformas, armazenamento, acessibilidade, controles, imagem e desempenho com base em informações confirmadas.",
    "potential": "Alto",
    "difficulty": "Média",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Central de Configuração e Acesso — revelação e detalhes escondidos",
      "Ideia 2: Central de Configuração e Acesso — teoria comprovada por frames",
      "Ideia 3: Central de Configuração e Acesso — comparação direta com GTA 5"
    ]
  },
  {
    "number": "39",
    "title": "Tribunal da Comunidade",
    "description": "debates estruturados em que o público vota, defende escolhas e decide rankings ou próximos testes.",
    "potential": "Alto",
    "difficulty": "Avançada",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Tribunal da Comunidade — revelação e detalhes escondidos",
      "Ideia 2: Tribunal da Comunidade — teoria comprovada por frames",
      "Ideia 3: Tribunal da Comunidade — comparação direta com GTA 5"
    ]
  },
  {
    "number": "40",
    "title": "Profissões e Roleplay",
    "description": "explora vidas alternativas, trabalhos, regras de personagem e histórias emergentes além da campanha principal.",
    "potential": "Alto",
    "difficulty": "Fácil",
    "format": "Vídeo curto narrado",
    "ideas": [
      "Ideia 1: Profissões e Roleplay — revelação e detalhes escondidos",
      "Ideia 2: Profissões e Roleplay — teoria comprovada por frames",
      "Ideia 3: Profissões e Roleplay — comparação direta com GTA 5"
    ]
  }
];

export const OPERACAO_FLUXO_PASSOS = [
  { step: 1, name: "Pauta & Oportunidade", icon: "🗺️", desc: "Escolha no Calendário de 30 Dias ou no Mapa de 40 Subnichos." },
  { step: 2, name: "Abertura & Gancho", icon: "🪝", desc: "Selecione entre os 150 ganchos de alta retenção." },
  { step: 3, name: "Estrutura do Roteiro", icon: "📜", desc: "Aplique um dos 80 roteiros + 10 coringas com teleprompter." },
  { step: 4, name: "Título & Legenda", icon: "✍️", desc: "Escolha do Cofre com 120 títulos e 60 legendas prontas." },
  { step: 5, name: "Mídia & Clipes", icon: "🎞️", desc: "Abra a pasta correta no Drive (651 arquivos) ou use os Trailers Oficiais MP4." },
  { step: 6, name: "Edição no Estúdio", icon: "✂️", desc: "Aplique os 20 modelos virais, enquadramento 1:1 e sua marca." },
  { step: 7, name: "Publicação & Agendamento", icon: "🚀", desc: "Exporte em Full HD ou agende nos melhores horários." },
] as const;

// Aliases and Flat structures for effortless integration across tools
export const CATEGORIAS_DRIVE = OPERACAO_MIDIA_AREAS.map((m) => ({
  ...m,
  title: m.name,
  url: m.gdriveUrl,
  fileCount: m.count,
}));

export interface OperacaoGanchoFlatItem {
  id: string;
  category: string;
  number: string;
  hook: string;
  trigger: string;
  example?: string;
}

export const OPERACAO_GANCHOS_FLAT: OperacaoGanchoFlatItem[] = OPERACAO_GANCHOS.flatMap((cat) =>
  cat.hooks.map((h, idx) => ({
    id: `${cat.id}-${h.number || idx}`,
    category: cat.category.replace(/^[^\w\s]+/, "").trim(),
    number: h.number || String(idx + 1),
    hook: h.hook,
    trigger: cat.category,
    example: `Cena temática de ${cat.category.replace(/^[^\w\s]+/, "").trim()}`,
  }))
);

export interface OperacaoTituloFlatItem {
  id: string;
  category: string;
  number: string;
  title: string;
}

export const COFRE_TITULOS: OperacaoTituloFlatItem[] = OPERACAO_TITULOS.flatMap((cat) =>
  cat.titles.map((t, idx) => ({
    id: `${cat.id}-${t.number || idx}`,
    category: cat.category.replace(/^[^\w\s]+/, "").trim(),
    number: t.number || String(idx + 1),
    title: t.title,
  }))
);

export interface OperacaoLegendaFlatItem {
  id: string;
  category: string;
  number: string;
  caption: string;
  objective: string;
}

export const COFRE_LEGENDAS: OperacaoLegendaFlatItem[] = OPERACAO_LEGENDAS.flatMap((cat) =>
  cat.captions.map((c, idx) => ({
    id: `${cat.id}-${c.number || idx}`,
    category: cat.category.replace(/^[^\w\s]+/, "").trim(),
    number: c.number || String(idx + 1),
    caption: c.caption,
    objective: cat.category.replace(/^[^\w\s]+/, "").trim(),
  }))
);
