"use client";

import { useState, useEffect } from "react";
import { Search, Briefcase, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { CadastroGeralSetoresPage } from "../components/Register/Setores";
import { TableSetores } from "../components/Table/Setores";
import { ToolsSetores } from "../components/Tools/Setores";
import { setorService } from "@/lib/services/setores.service";
import type { Setor } from "@/types";

export default function SetoresAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [localSetores, setLocalSetores] = useState<Setor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await setorService.getSetores();
        setLocalSetores(data);
      } catch (error) {
        console.error("Erro ao buscar setores:", error);
        toast.error("Erro ao carregar setores.");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCreateSetor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const slug = formData.nome.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const newSetorId = await setorService.createSetor({
        nome: formData.nome,
        slug,
      });

      const newSetor: Setor = {
        id: newSetorId,
        nome: formData.nome,
        slug,
      };

      setLocalSetores([...localSetores, newSetor]);
      setIsModalOpen(false);
      setFormData({ nome: "" });
      toast.success("Setor cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar setor:", error);
      toast.error("Erro ao cadastrar setor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const setoresExibidos = localSetores.filter((setor) => {
    const termo = searchQuery.toLowerCase();
    return (
      setor.nome.toLowerCase().includes(termo) ||
      setor.slug.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full relative">

      {/* Cabeçalho */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-3">
          <Briefcase className="w-8 h-8 text-brand-100" />
          <h1 className="text-3xl font-black tracking-tight text-brand-100 uppercase">Gestão de Setores</h1>
        </div>
        <p className="text-brand-300 font-medium">
          Cadastro e estruturação de departamentos organizacionais do laboratório.
        </p>
      </div>

      {/* Ferramentas */}
      <ToolsSetores
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsModalOpen={setIsModalOpen}
      />

      {/* Tabela de Setores */}
      {isLoading ? (
        <div className="flex justify-center p-8"><span className="text-brand-300">Carregando...</span></div>
      ) : (
        <TableSetores setoresExibidos={setoresExibidos} />
      )}

      {/* Modal de Cadastro */}
      <CadastroGeralSetoresPage 
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        formData={formData}
        setFormData={setFormData}
        handleCreateSetor={handleCreateSetor}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
