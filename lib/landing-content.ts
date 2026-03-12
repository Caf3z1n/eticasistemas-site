import type { LandingContent } from "@/lib/landing-types";

const whatsappNumber = "5515997779103";
const whatsappMessageTemplate =
  "Ola, vi o produto Posto Agil no site da Etica Sistemas, gostaria de mais informacoes sobre o sistema";

export const landingContent: LandingContent = {
  brand: {
    companyName: "Ética Sistemas",
    productName: "Posto Ágil",
    tagline: "Tecnologia para redes de postos com operação integrada.",
    cityState: "Sorocaba-SP",
    supportHours: "08:00 às 18:00",
    phoneContact: "(15) 99777-9103",
    emailContact: "pedro@eticasistemas.com.br",
  },
  links: {
    whatsappNumber,
    whatsappMessageTemplate,
    whatsappLink: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessageTemplate
    )}`,
  },
  navigation: [
    { id: "inicio", label: "Inicio" },
    { id: "integracoes", label: "Bandeiras" },
    { id: "sobre", label: "Empresa" },
    { id: "beneficios", label: "Diferenciais" },
    { id: "contato", label: "Contato" },
  ],
  hero: {
    eyebrow: "Plataforma integrada para redes de postos",
    badge: "3 ambientes, 1 fluxo integrado",
    title: "Caixa, rede e pista no mesmo sistema.",
    subtitle:
      "O Posto Ágil conecta o PC do posto, o painel web e o SmartAgil para atender, fechar e gerir a rede sem retrabalho.",
    primaryCtaLabel: "Solicitar demonstração",
    secondaryCtaLabel: "Ver o sistema em ação",
    autoplayEnabled: true,
    stats: [
      {
        label: "no setor",
        value: "20+ anos",
        estimated: false,
      },
      {
        label: "em operação",
        value: "+40 clientes",
        estimated: false,
      },
      {
        label: "e multiunidade",
        value: "Multiempresa",
        estimated: false,
      },
    ],
    carouselSlides: [
      {
        id: "frente-caixa",
        src: "/images/hero/frente_caixa.png",
        alt: "Tela real do sistema com a operação de frente de caixa no PC do posto",
        shortLabel: "Frente de caixa",
        caption: "Realizando uma venda no caixa",
        detail: "Atendimento, conferência e fechamento no caixa do posto.",
        highlight: "Fluxo real da operação no caixa.",
        videoSrc: "/images/hero/video_frentecaixa.mp4",
        videoLayout: "wide",
      },
      {
        id: "painel-web",
        src: "/images/product/simular_compra.png",
        alt: "Tela real do painel web com simulações de carga e leitura da rede",
        shortLabel: "Painel web",
        caption: "Simulação de carga no sistema web",
        detail: "Análise da rede e simulação de carga em um só painel.",
        highlight: "Gestão central da rede.",
        videoSrc: "/images/hero/video_painelweb.mp4",
        videoLayout: "wide",
      },
      {
        id: "smartagil",
        src: "/images/product/maquininha_smart.png",
        alt: "Maquininha Smart usada no fluxo do SmartAgil",
        shortLabel: "SmartAgil",
        caption: "Venda na maquininha smart",
        detail: "Venda concluída na pista sem sair do fluxo do sistema.",
        highlight: "Fechamento na pista com vídeo real.",
        videoSrc: "/images/product/app-maquininha-pagbank.mp4",
        videoLayout: "smartagil",
      },
    ],
  },
  integrations: {
    eyebrow: "Bandeiras e integrações",
    title: "Atendemos redes de diferentes bandeiras com operação integrada.",
    description:
      "O Posto Ágil foi desenhado para redes que operam com padrão de bandeira e precisam centralizar processo, estoque e tomada de decisão em uma única plataforma.",
    logos: [
      {
        id: "ipiranga",
        name: "Ipiranga",
        src: "/brands/ipiranga.svg",
        alt: "Logo Ipiranga",
      },
      {
        id: "shell",
        name: "Shell",
        src: "/brands/shell.svg",
        alt: "Logo Shell",
      },
      {
        id: "petrobras",
        name: "BR Petrobras",
        src: "/brands/petrobras.svg",
        alt: "Logo Petrobras BR",
      },
      {
        id: "potencial",
        name: "Grupo Potencial",
        src: "/brands/grupo-potencial.webp",
        alt: "Logo Grupo Potencial",
      },
    ],
    programBadges: [
      "Integração com programas de bandeira (ex.: Shell Box)",
      "Conectores para operação fiscal e financeira",
      "Fluxo único para redes com unidades de perfis diferentes",
    ],
  },
  about: {
    eyebrow: "Sobre a Ética Sistemas",
    title:
      "Especialistas em gestão de redes de postos com foco em previsibilidade operacional.",
    description:
      "Nossa proposta é transformar operação complexa em gestão clara: da carga dos caminhões ao estoque em cada unidade da rede.",
    narrative: [
      "A Ética Sistemas atua no segmento de postos com uma visão prática de operação. Em vez de tratar cada posto como uma ilha, estruturamos a rede inteira com dados consistentes, processos padronizados e leitura estratégica para tomada de decisão.",
      "Com o Posto Ágil, gestores conseguem priorizar abastecimento, antecipar ruptura de estoque e acompanhar desempenho multiunidade sem depender de planilhas desconectadas.",
    ],
    stats: [
      {
        label: "Tempo de mercado",
        value: "20+ anos",
        estimated: false,
        note: "Atuação contínua no segmento de postos de combustíveis.",
      },
      {
        label: "Clientes atendidos",
        value: "+40 clientes",
        estimated: false,
        note: "Redes e operações multiunidade em diferentes regiões.",
      },
      {
        label: "Suporte ao sistema",
        value: "Suporte ao sistema",
        estimated: false,
        note: "Profissionais especialistas e bem treinados.",
      },
    ],
    pillars: [
      {
        title: "Proposta clara de valor",
        description:
          "Foco em eficiência operacional, controle de rede e decisões orientadas por dados reais de campo.",
      },
      {
        title: "Prova de capacidade",
        description:
          "Experiência em cenários multiunidade com fluxos logísticos, estoque e acompanhamento de performance.",
      },
      {
        title: "Método de implantação",
        description:
          "Diagnóstico, configuração por unidade, treinamento e acompanhamento evolutivo com baixa fricção operacional.",
      },
      {
        title: "Relacionamento de longo prazo",
        description:
          "Suporte consultivo, melhorias contínuas e aderência ao contexto real de cada rede atendida.",
      },
    ],
    commitments: [
      "Experiência em rotinas críticas de redes multiunidade.",
      "Implantação orientada ao fluxo real da operação.",
      "Equipe de suporte com contexto do setor de combustíveis.",
      "Evolução contínua do produto com foco em escala.",
    ],
  },
  product: {
    eyebrow: "Produto principal",
    title: "Posto Ágil para rede de postos",
    description:
      "Cada módulo foi pensado para reduzir gargalos de rede: da definição da carga do caminhão até a previsão de duração de estoque por posto.",
    modules: [
      {
        id: "carga",
        title: "Gestão de carga por rota",
        description:
          "Planeje as cargas que cada caminhão deve levar com base em necessidade real das unidades, prioridade operacional e previsão de consumo.",
        icon: "Truck",
        imageSrc: "/images/product/module-carga.svg",
        imageAlt: "Tela de planejamento de carga e entrega entre unidades",
        kpis: [
          "Priorização de entrega por risco de ruptura",
          "Roteiro de abastecimento entre unidades da rede",
          "Simulação de volume por produto antes da saída",
        ],
      },
      {
        id: "estoque",
        title: "Estoque inteligente em rede",
        description:
          "Veja a distribuição de cada SKU em todos os postos, compare cobertura por unidade e antecipe transferência entre lojas.",
        icon: "Boxes",
        imageSrc: "/images/product/module-estoque.svg",
        imageAlt: "Tela de estoque por produto e unidade da rede",
        kpis: [
          "Dias de cobertura por SKU em cada unidade",
          "Alertas de excesso e ruptura por produto",
          "Redistribuição interna com base em demanda",
        ],
      },
      {
        id: "abastecimento",
        title: "Controle de abastecimento",
        description:
          "Centralize dados de pista, turnos e performance operacional para padronizar execução e reduzir inconsistências entre postos.",
        icon: "Fuel",
        imageSrc: "/images/product/module-abastecimento.svg",
        imageAlt: "Tela de controle de abastecimento e operação de pista",
        kpis: [
          "Volume abastecido por turno e unidade",
          "Indicadores de eficiência operacional",
          "Rastreabilidade de eventos críticos",
        ],
      },
      {
        id: "inteligencia",
        title: "Inteligência operacional",
        description:
          "Painel consolidado com indicadores por rede, unidade e categoria para orientar decisões táticas e estratégicas.",
        icon: "LineChart",
        imageSrc: "/images/product/module-inteligencia.svg",
        imageAlt: "Tela de inteligência operacional da rede",
        kpis: [
          "Comparativo de desempenho entre unidades",
          "Visão de margem e giro por categoria",
          "Alertas acionáveis para a gestão da rede",
        ],
      },
    ],
  },
  benefits: {
    eyebrow: "Diferenciais",
    title: "Capacidade real para operar redes com escala e controle.",
    description:
      "Do planejamento logístico à análise de desempenho, o Posto Ágil organiza informação para execução padronizada em toda a rede.",
    items: [
      {
        title: "Visão integrada da rede",
        description:
          "Consolidação operacional e financeira das unidades em um único ambiente de decisão.",
        icon: "Workflow",
      },
      {
        title: "Decisões orientadas por estoque",
        description:
          "Monitoramento de cobertura por produto para agir antes de ruptura ou excesso.",
        icon: "BarChart3",
      },
      {
        title: "Escala com governança",
        description:
          "Padrões de processo e acesso para crescimento com segurança operacional.",
        icon: "ShieldCheck",
      },
      {
        title: "Suporte consultivo",
        description:
          "Acompanhamento contínuo para manter aderência do sistema ao dia a dia da rede.",
        icon: "Headset",
      },
    ],
  },
  process: {
    eyebrow: "Como entregamos",
    title: "Implantação orientada para redes com ritmo de operação intenso.",
    description:
      "Estruturamos a jornada em etapas curtas para colocar as unidades em produção com segurança e aderência.",
    steps: [
      {
        title: "Mapeamento da rede",
        description:
          "Levantamento das unidades, fluxos logístico-operacionais e prioridades de controle.",
      },
      {
        title: "Configuração por unidade",
        description:
          "Parametrização de regras de abastecimento, estoque e monitoramento conforme perfil de cada posto.",
      },
      {
        title: "Treinamento da operação",
        description:
          "Capacitação de gestores e equipes com foco nas rotinas de maior impacto.",
      },
      {
        title: "Acompanhamento evolutivo",
        description:
          "Ajustes contínuos com base em indicadores da rede e metas de desempenho.",
      },
    ],
  },
  cases: {
    eyebrow: "Depoimentos de clientes",
    title: "Redes que usam o Posto Ágil para operar com mais previsibilidade.",
    description:
      "Depoimentos provisórios para validação de copy. Ajustaremos com falas oficiais depois.",
    items: [
      {
        name: "Rede Palace",
        network: "Rede regional de postos",
        role: "Direção de Operações",
        quote:
          "Antes do Posto Ágil, cada unidade trabalhava com um ritmo diferente. Hoje temos leitura única da rede e decisão muito mais rápida.",
        impact:
          "Melhorou a distribuição de carga e reduziu falta de produto em unidades críticas.",
      },
      {
        name: "Rede RB2",
        network: "Operação multiunidade",
        role: "Gestão Administrativa",
        quote:
          "A visão de estoque por unidade e a previsão de duração mudaram nosso planejamento. Conseguimos agir antes da ruptura.",
        impact:
          "Aumento da previsibilidade de abastecimento e ganho no controle de estoque da conveniência.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Perguntas frequentes de redes que avaliam o Posto Ágil.",
    description:
      "Respostas mais completas para apoiar sua avaliação técnica e operacional.",
    items: [
      {
        question:
          "Como o Posto Ágil ajuda no planejamento de carga dos caminhões da rede?",
        answer:
          "O sistema cruza histórico de consumo, cobertura de estoque por unidade e prioridade operacional para sugerir volumes de carga mais assertivos. Com isso, sua equipe planeja rotas com base em risco real de ruptura, reduz viagens emergenciais e melhora o aproveitamento dos caminhões.",
      },
      {
        question:
          "É possível controlar estoque de combustível e conveniência em toda a rede no mesmo painel?",
        answer:
          "Sim. O Posto Ágil permite acompanhar distribuição por SKU, comparar unidades e identificar excesso ou falta antes de virar problema. Você visualiza quantos dias cada estoque deve durar e consegue tomar decisão de transferência entre postos com antecedência.",
      },
      {
        question:
          "O sistema atende redes com bandeiras diferentes e processos distintos?",
        answer:
          "Atende. A plataforma foi desenhada para redes multiunidade, incluindo cenários com bandeiras diferentes, políticas operacionais específicas e níveis de maturidade distintos entre unidades. A parametrização é feita para padronizar gestão sem engessar a operação local.",
      },
      {
        question:
          "Como funciona a implantação para não impactar a operação dos postos?",
        answer:
          "A implantação é feita em etapas: diagnóstico da rede, configuração por unidade, treinamento prático e entrada assistida. Esse formato reduz risco operacional e acelera a adoção do sistema, mantendo visibilidade do que já está funcionando e do que precisa de ajuste.",
      },
      {
        question:
          "Que tipo de suporte recebemos após a entrada em produção?",
        answer:
          "Você conta com suporte especializado e equipe bem capacitada no produto e no contexto do setor. Além da resolução de dúvidas, o time acompanha evolução de uso, sugere melhorias de rotina e apoia decisões para aumentar desempenho da rede.",
      },
    ],
  },
  finalCta: {
    title: "Quer ver o Posto Ágil aplicado na sua rede?",
    description:
      "Fale com a Ética Sistemas e receba uma demonstração focada no seu cenário de operação.",
    buttonLabel: "Falar com o comercial no WhatsApp",
  },
  footer: {
    legalNote: "",
  },
};
