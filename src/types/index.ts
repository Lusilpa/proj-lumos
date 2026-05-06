// ============================================================
// Lumos — Tipagens Centrais (Para uso na Camada de Dados e UI)
// ============================================================

export type Cargo =
  | "aprendiz"
  | "estagiario"
  | "auxiliar"
  | "assistente"
  | "analista"
  | "supervisor"
  | "gerente"
  | "diretor";

export type Departamento = string; // Agora é dinâmico e vem da base de Setores

export interface Setor {
  id: string;
  nome: string;
  slug: string;
}

export interface User {
  uid: string;
  nome: string;
  cpf: string;
  email: string;
  departamento: Departamento | string;
  cargo: Cargo | string;
}

export interface Documento {
  id: string;
  nome: string;
  descricao: string;
  departamento_alvo: string;
  cargos_permitidos: string[];
  regra_acesso: string; // Ex: "departamento == 'vendas' AND cargo == 'gerente'"
  data_ultima_atualizacao: string;
  fileUrl?: string; // Para o protótipo de leitura de PDF
}

export interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
  quantidade_filiais: number;
}
