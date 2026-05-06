"use client";

import { useState } from "react";
import { MOCK_SETORES } from "@/data/mockSetores";
import { Search, Briefcase, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { CadastroGeralSetoresPage } from "../components/Register/Setores";
import { TableSetores } from "../components/Table/Setores";
import { ToolsSetores } from "../components/Tools/Setores";

export default function SetoresAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [localSetores, setLocalSetores] = useState(MOCK_SETORES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateSetor = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));

    const newSetor = {
      id: `setor_${Math.floor(Math.random() * 10000)}`,
      nome: formData.nome,
      slug: formData.nome.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
    };
    setLocalSetores([...localSetores, newSetor]);
    setIsModalOpen(false);
    setFormData({ nome: "" });
    setIsSubmitting(false);
    toast.success("Setor cadastrado com sucesso!");
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
      <TableSetores setoresExibidos={setoresExibidos} />

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
