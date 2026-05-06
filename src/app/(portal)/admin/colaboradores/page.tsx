"use client";

import { useState } from "react";
import { MOCK_USERS } from "@/data/mockUsers";
import { ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";
import { CadastroGeralColaboradoresPage } from "../components/Register/Colaboradores";
import { TableColaboradores } from "../components/Table/Colaboradores";
import { ToolsColaboradores } from "../components/Tools/Colaboradores";

export default function ColaboradoresAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSetor, setFilterSetor] = useState("Todos");
  const [localUsers, setLocalUsers] = useState(MOCK_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: "", cpf: "", email: "", departamento: "", cargo: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simula tempo de resposta do servidor (backend)
    await new Promise(r => setTimeout(r, 1200));

    const newUser = {
      uid: `usr_${Math.floor(Math.random() * 10000)}`,
      nome: formData.nome,
      cpf: formData.cpf,
      email: formData.email,
      departamento: formData.departamento,
      cargo: formData.cargo,
    };
    setLocalUsers([...localUsers, newUser]);
    setIsModalOpen(false);
    setFormData({ nome: "", cpf: "", email: "", departamento: "", cargo: "" });
    setIsSubmitting(false);
    toast.success("Colaborador cadastrado com sucesso!");
  };

  const colaboradoresExibidos = localUsers.filter((user) => {
    const termo = searchQuery.toLowerCase();
    const matchBusca =
      user.nome.toLowerCase().includes(termo) ||
      user.cpf.toLowerCase().includes(termo) ||
      user.email.toLowerCase().includes(termo) ||
      user.departamento.toLowerCase().includes(termo) ||
      user.cargo.toLowerCase().includes(termo);

    const matchSetor = filterSetor === "Todos" || user.departamento.toLowerCase() === filterSetor.toLowerCase();

    return matchBusca && matchSetor;
  });

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full relative">

      {/* Cabeçalho da Página */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-brand-100" />
          <h1 className="text-3xl font-black tracking-tight text-brand-100 uppercase">Gestão de Colaboradores</h1>
        </div>
        <p className="text-brand-300 font-medium">
          Painel administrativo unificado. Gerencie acessos, departamentos e regras de negócio da equipe Lupa.
        </p>
      </div>

      {/* Área de Filtros e Ferramentas */}
      <ToolsColaboradores
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filterSetor={filterSetor}
        setFilterSetor={setFilterSetor}
        setIsModalOpen={setIsModalOpen}
      />

      {/* Tabela de Dados Corporativa */}
      <TableColaboradores colaboradoresExibidos={colaboradoresExibidos} />

      {/* Modal de Cadastro */}
      <CadastroGeralColaboradoresPage
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        formData={formData}
        setFormData={setFormData}
        handleCreateUser={handleCreateUser}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
