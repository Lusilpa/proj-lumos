import type { User } from "@/types";

export const MOCK_USERS: User[] = [
  {
    uid: "usr_1",
    nome: "João Silva",
    cpf: "123.456.789-00",
    email: "joao.silva@lhumos.com",
    departamento: "vendas",
    cargo: "auxiliar",
  },
  {
    uid: "usr_2",
    nome: "Maria Oliveira",
    cpf: "987.654.321-11",
    email: "maria.oliveira@lhumos.com",
    departamento: "rh",
    cargo: "auxiliar",
  },
  {
    uid: "usr_3",
    nome: "Carlos Souza",
    cpf: "456.789.123-22",
    email: "carlos.souza@lhumos.com",
    departamento: "ti",
    cargo: "gerente",
  },
];

// pode importar este usuário para simular quem está logado:
export const CURRENT_MOCK_USER = MOCK_USERS[2]; // Trocando este índice ele simula acessos diferentes
