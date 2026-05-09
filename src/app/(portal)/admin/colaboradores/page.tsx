"use client";

import { useState, useEffect } from "react";
import { ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";
import { CadastroGeralColaboradoresPage } from "../components/Register/Colaboradores";
import { TableColaboradores } from "../components/Table/Colaboradores";
import { ToolsColaboradores } from "../components/Tools/Colaboradores";
import { usuarioService } from "@/lib/services/usuarios.service";
import type { User } from "@/types";

export default function ColaboradoresAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSetor, setFilterSetor] = useState("Todos");
  const [localUsers, setLocalUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: "", cpf: "", email: "", departamento: "", cargo: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await usuarioService.getUsuarios();
        setLocalUsers(data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        toast.error("Erro ao carregar colaboradores.");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newUserId = await usuarioService.createUsuario({
        nome: formData.nome,
        cpf: formData.cpf,
        email: formData.email,
        departamento: formData.departamento,
        cargo: formData.cargo,
      });

      const newUser: User = {
        uid: newUserId,
        nome: formData.nome,
        cpf: formData.cpf,
        email: formData.email,
        departamento: formData.departamento,
        cargo: formData.cargo,
      };

      setLocalUsers([...localUsers, newUser]);
      setIsModalOpen(false);
      setFormData({ nome: "", cpf: "", email: "", departamento: "", cargo: "" });
      toast.success("Colaborador cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      toast.error("Erro ao cadastrar colaborador.");
    } finally {
      setIsSubmitting(false);
    }
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
      {isLoading ? (
        <div className="flex justify-center p-8"><span className="text-brand-300">Carregando...</span></div>
      ) : (
        <TableColaboradores colaboradoresExibidos={colaboradoresExibidos} />
      )}

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
