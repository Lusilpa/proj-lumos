export const NIVEIS_HIERARQUICOS = [
  { slug: "aprendiz", nome: "Aprendiz" },
  { slug: "estagiario", nome: "Estagiário" },
  { slug: "auxiliar", nome: "Auxiliar" },
  { slug: "assistente", nome: "Assistente" },
  { slug: "analista", nome: "Analista" },
  { slug: "supervisor", nome: "Supervisor" },
  { slug: "gerente", nome: "Gerente" },
  { slug: "diretor", nome: "Diretor" }
];

export interface CargoItem {
  id: string;
  nome: string;       // Ex: "Engenheiro de Dados Sênior"
  slug: string;       // Ex: "engenheiro-de-dados-senior"
  nivel: string;      // Ex: "analista" (slug de NIVEIS_HIERARQUICOS)
  setor_slug: string; // Ex: "ti" (slug de MOCK_SETORES)
}

export const MOCK_CARGOS: CargoItem[] = [
  { id: "car_01", nome: "Analista de Recrutamento Sênior", slug: "analista-de-recrutamento-senior", nivel: "analista", setor_slug: "rh" },
  { id: "car_02", nome: "Assistente de Folha", slug: "assistente-de-folha", nivel: "assistente", setor_slug: "dp" },
  { id: "car_03", nome: "Engenheiro de Software Sênior", slug: "engenheiro-de-software-senior", nivel: "analista", setor_slug: "ti" },
  { id: "car_04", nome: "Gerente de Engenharia", slug: "gerente-de-engenharia", nivel: "gerente", setor_slug: "ti" },
  { id: "car_05", nome: "Auditor Pleno", slug: "auditor-pleno", nivel: "analista", setor_slug: "auditoria" },
];
