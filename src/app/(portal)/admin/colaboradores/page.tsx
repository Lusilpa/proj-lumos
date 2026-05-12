"use client";

import { useState, useEffect } from "react";
import { ShieldAlert } from "lucide-react";
import toast from "react-hot-toast";
import { CadastroGeralColaboradoresPage } from "../components/Register/Colaboradores";
import { TableColaboradores } from "../components/Table/Colaboradores";
import { ToolsColaboradores } from "../components/Tools/Colaboradores";
import { usuarioService } from "@/lib/services/usuarios.service";
import { setorService } from "@/lib/services/setores.service";
import type { User, Setor } from "@/types";

export default function ColaboradoresAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSetor, setFilterSetor] = useState("Todos");
  const [localUsers, setLocalUsers] = useState<User[]>([]);
  const [setoresDisponiveis, setSetoresDisponiveis] = useState<Setor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: "", cpf: "", email: "", departamento: "", cargo: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [users, setores] = await Promise.all([usuarioService.getUsuarios(), setorService.getSetores()]);
        setLocalUsers(users);
        setSetoresDisponiveis(setores);
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
        senha: formData.email,        // Senha inicial = email do colaborador
        primeiro_acesso: true,         // Força troca de senha no 1º login
      });
      const newUser: User = { uid: newUserId, ...formData };
      setLocalUsers(prev => [...prev, newUser]);
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

  const handleEditUser = async (uid: string, data: Partial<User>) => {
    try {
      await usuarioService.updateUsuario(uid, data);
      setLocalUsers(prev => prev.map(u => u.uid === uid ? { ...u, ...data } : u));
      toast.success("Colaborador atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar colaborador:", error);
      toast.error("Erro ao atualizar colaborador.");
    }
  };

  const handleDeleteUser = async (uid: string) => {
    try {
      await usuarioService.deleteUsuario(uid);
      setLocalUsers(prev => prev.filter(u => u.uid !== uid));
      toast.success("Colaborador excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir colaborador:", error);
      toast.error("Erro ao excluir colaborador.");
    }
  };

  const colaboradoresExibidos = localUsers.filter((user) => {
    const termo = searchQuery.toLowerCase();
    const matchBusca = user.nome.toLowerCase().includes(termo) || user.cpf.toLowerCase().includes(termo) || user.email.toLowerCase().includes(termo);
    const matchSetor = filterSetor === "Todos" || user.departamento.toLowerCase() === filterSetor.toLowerCase();
    return matchBusca && matchSetor;
  });

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full relative">
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-8 h-8 text-brand-100" />
          <h1 className="text-3xl font-black tracking-tight text-brand-100 uppercase">Gestão de Colaboradores</h1>
        </div>
        <p className="text-brand-300 font-medium">Painel administrativo unificado. Gerencie acessos, departamentos e regras de negócio da equipe Lupa.</p>
      </div>

      <ToolsColaboradores searchQuery={searchQuery} setSearchQuery={setSearchQuery} filterSetor={filterSetor} setFilterSetor={setFilterSetor} setIsModalOpen={setIsModalOpen} />

      {isLoading ? (
        <div className="flex justify-center p-8"><span className="text-brand-300">Carregando...</span></div>
      ) : (
        <TableColaboradores colaboradoresExibidos={colaboradoresExibidos} setoresDisponiveis={setoresDisponiveis} onEdit={handleEditUser} onDelete={handleDeleteUser} />
      )}

      <CadastroGeralColaboradoresPage
        isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
        formData={formData} setFormData={setFormData}
        handleCreateUser={handleCreateUser} isSubmitting={isSubmitting}
      />
    </div>
  );
}
