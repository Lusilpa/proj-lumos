import type { Documento } from "@/types";

export const MOCK_DOCS: Documento[] = [
  {
    id: "doc_01",
    nome: "Política de Comissões de Vendas Q3",
    descricao: "Regras de comissionamento para o terceiro trimestre de 2026.",
    departamento_alvo: "Vendas",
    cargos_permitidos: ["analista", "supervisor", "gerente", "diretor"],
    regra_acesso: "departamento == 'vendas' and cargo in cargos_permitidos",
    data_ultima_atualizacao: "02/05/2026",
    fileUrl: "/pdf/129079.pdf",
  },
  {
    id: "doc_02",
    nome: "POP - Integração de Novos Desenvolvedores",
    descricao: "Guia passo a passo para setup do ambiente de dev (Node/Next.js).",
    departamento_alvo: "TI",
    cargos_permitidos: ["estagiario", "analista", "gerente", "diretor"],
    regra_acesso: "departamento == 'ti' or cargo == 'diretor'",
    data_ultima_atualizacao: "28/04/2026",
    fileUrl: "/pdf/GuilhermeSA_TCC.pdf",
  },
  {
    id: "doc_03",
    nome: "Diretrizes de Avaliação de Desempenho",
    descricao: "Formulários e prazos para o ciclo de avaliação semestral.",
    departamento_alvo: "RH",
    cargos_permitidos: ["gerente", "diretor"],
    regra_acesso: "cargo in cargos_permitidos", // Qualquer gerente/diretor de qualquer área
    data_ultima_atualizacao: "15/04/2026",
    fileUrl: "/pdf/BrenoRSC_ART.pdf",
  },
];
