"use client";

import { useState } from "react";
import { MOCK_CARGOS, NIVEIS_HIERARQUICOS } from "@/data/mockCargos";
import { MOCK_SETORES } from "@/data/mockSetores";
import { Search, Network, Plus, X, Loader2, MoreVertical, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { CadastroGeralCargosPage } from "../components/Register/Cargos";
import { TableCargos } from "../components/Table/Cargos";
import { ToolsCargos } from "../components/Tools/Cargos";

export default function CargosAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSetorFilter, setSelectedSetorFilter] = useState("");
  const [localCargos, setLocalCargos] = useState(MOCK_CARGOS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: "", setor_slug: "", nivel: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateCargo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));

    const newCargo = {
      id: `car_${Math.floor(Math.random() * 10000)}`,
      nome: formData.nome,
      slug: formData.nome.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      nivel: formData.nivel,
      setor_slug: formData.setor_slug,
    };
    setLocalCargos([...localCargos, newCargo]);
    setIsModalOpen(false);
    setFormData({ nome: "", setor_slug: "", nivel: "" });
    setIsSubmitting(false);
    toast.success("Cargo cadastrado com sucesso!");
  };

  const cargosExibidos = localCargos.filter((cargo) => {
    const matchBusca = cargo.nome.toLowerCase().includes(searchQuery.toLowerCase()) || cargo.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSetor = selectedSetorFilter ? cargo.setor_slug === selectedSetorFilter : true;
    return matchBusca && matchSetor;
  });

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full relative">

      {/* Cabeçalho */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-3">
          <Network className="w-8 h-8 text-brand-100" />
          <h1 className="text-3xl font-black tracking-tight text-brand-100 uppercase">Gestão de Cargos</h1>
        </div>
        <p className="text-brand-300 font-medium">
          Cadastro e estruturação da hierarquia organizacional
        </p>
      </div>

      {/* Ferramentas extraídas */}
      <ToolsCargos 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSetorFilter={selectedSetorFilter}
        setSelectedSetorFilter={setSelectedSetorFilter}
        setIsModalOpen={setIsModalOpen}
      />      {/* Tabela de Cargos */}
      <TableCargos cargosExibidos={cargosExibidos} />

      {/* Modal de Cadastro */}
      <CadastroGeralCargosPage
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        formData={formData}
        setFormData={setFormData}
        handleCreateCargo={handleCreateCargo}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
