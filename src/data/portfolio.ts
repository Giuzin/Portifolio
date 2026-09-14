export type CaseDetailBlock = {
  heading: string;
  text: string;
  aside: string;
};

export type CaseDetailMeta = {
  label: string;
  value: string;
};

export type CaseDetail = {
  summary: string;
  meta: CaseDetailMeta[];
  blocks: CaseDetailBlock[];
};

export type PortfolioCase = {
  slug: string;
  year: string;
  title: string;
  description: string;
  category: string;
  detail: CaseDetail;
};

const defaultDetail = (label: string): CaseDetail => ({
  summary: `Desenvolvimento de uma solução de software com foco em integração, confiabilidade e evolução contínua do produto ${label}.`,
  meta: [
    { label: "Papel", value: "Desenvolvedor Full Stack" },
    { label: "Stack", value: "React | TypeScript | APIs | C/C++" },
    { label: "Período", value: "Projeto em andamento" },
  ],
  blocks: [
    {
      heading: "Contexto",
      text: "Solução criada para responder a uma necessidade real de negócio, conectando software, dados e integrações.",
      aside: "Contexto, objetivos e restrições considerados durante o desenvolvimento.",
    },
    {
      heading: "Processo",
      text: "O trabalho combinou desenvolvimento de aplicações, integração de APIs, dados e evolução incremental do produto.",
      aside: "Decisões técnicas orientadas por estabilidade, manutenção e experiência de uso.",
    },
    {
      heading: "Resultado",
      text: "Entrega de uma solução mais integrada, confiável e preparada para novas funcionalidades.",
      aside: "Impacto, aprendizados e próximos caminhos de evolução do projeto.",
    },
  ],
});

export const workItems: PortfolioCase[] = [
  {
    slug: "trabalho-1",
    year: "2024 — 2026",
    title: "Rede Industrial",
    description:
      "Desenvolvedor Pleno em sistemas embarcados, telemetria e integrações entre dispositivos, APIs e aplicações web.",
    category: "DESENVOLVEDOR PLENO",
    detail: defaultDetail("trabalho"),
  },
  {
    slug: "trabalho-2",
    year: "2023 — 2024",
    title: "MW Automação",
    description:
      "Estagiário em desenvolvimento, atuando com ESP32 e suporte à manutenção de soluções embarcadas.",
    category: "ESTÁGIO EM DESENVOLVIMENTO",
    detail: defaultDetail("trabalho"),
  },
  {
    slug: "trabalho-3",
    year: "2026 — Atual",
    title: "MW Automação",
    description:
      "Desenvolvedor Full Stack, atuando no desenvolvimento, manutenção e evolução de sistemas web, integrações e soluções embarcadas.",
    category: "DESENVOLVEDOR FULL STACK",
    detail: defaultDetail("trabalho"),
  },
];

export const projectItems: PortfolioCase[] = [
  {
    slug: "projeto-1",
    year: "Projeto de destaque",
    title: "Sigma SaaS",
    description:
      "Atuação na evolução e modernização de um sistema SaaS, com integração entre aplicação web, banco de dados e dispositivos de telemetria, incluindo geração de relatórios e fichas técnicas.",
    category: "PROJETO DE DESTAQUE",
    detail: defaultDetail("projeto"),
  },
  {
    slug: "projeto-2",
    year: "Projeto de destaque",
    title: "ERP",
    description:
      "Aplicação web de ERP para centralização de processos e informações empresariais, com gerenciamento de empresas, visão consolidada das operações e integrações com WhatsApp e e-mail.",
    category: "PROJETO DE DESTAQUE",
    detail: defaultDetail("projeto"),
  },
];

export function getWorkItem(slug: string) {
  return workItems.find((item) => item.slug === slug);
}

export function getProjectItem(slug: string) {
  return projectItems.find((item) => item.slug === slug);
}
