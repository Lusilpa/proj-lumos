"use client";

import { useState, useEffect } from "react";
import { Network } from "lucide-react";
import toast from "react-hot-toast";
import { CadastroGeralCargosPage } from "../components/Register/Cargos";
import { TableCargos } from "../components/Table/Cargos";
import { ToolsCargos } from "../components/Tools/Cargos";
import { cargoService } from "@/lib/services/cargos.service";
import { setorService } from "@/lib/services/setores.service";
import type { Setor } from "@/types";

interface CargoItem {
  id: string;
  nome: string;
  slug: string;
  nivel: string;
  setor_slug: string;
}

export default function CargosAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSetorFilter, setSelectedSetorFilter] = useState("");
  const [localCargos, setLocalCargos] = useState<CargoItem[]>([]);
  const [setoresDisponiveis, setSetoresDisponiveis] = useState<Setor[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: "", setor_slug: "", nivel: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [cargos, setores] = await Promise.all([cargoService.getCargos(), setorService.getSetores()]);
        setLocalCargos(cargos);
        setSetoresDisponiveis(setores);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        toast.error("Erro ao carregar cargos.");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCreateCargo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const slug = formData.nome.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      const newCargoId = await cargoService.createCargo({ nome: formData.nome, slug, nivel: formData.nivel, setor_slug: formData.setor_slug });
      const newCargo: CargoItem = { id: newCargoId, nome: formData.nome, slug, nivel: formData.nivel, setor_slug: formData.setor_slug };
      setLocalCargos(prev => [...prev, newCargo]);
      setIsModalOpen(false);
      setFormData({ nome: "", setor_slug: "", nivel: "" });
      toast.success("Cargo cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar cargo:", error);
      toast.error("Erro ao cadastrar cargo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCargo = async (id: string, data: Partial<CargoItem>) => {
    try {
      await cargoService.updateCargo(id, data);
      setLocalCargos(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
      toast.success("Cargo atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar cargo:", error);
      toast.error("Erro ao atualizar cargo.");
    }
  };

  const handleDeleteCargo = async (id: string) => {
    try {
      await cargoService.deleteCargo(id);
      setLocalCargos(prev => prev.filter(c => c.id !== id));
      toast.success("Cargo excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir cargo:", error);
      toast.error("Erro ao excluir cargo.");
    }
  };

  const cargosExibidos = localCargos.filter((cargo) => {
    const matchBusca = cargo.nome.toLowerCase().includes(searchQuery.toLowerCase()) || cargo.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSetor = selectedSetorFilter ? cargo.setor_slug === selectedSetorFilter : true;
    return matchBusca && matchSetor;
  });

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full relative">
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-3">
          <Network className="w-8 h-8 text-brand-100" />
          <h1 className="text-3xl font-black tracking-tight text-brand-100 uppercase">Gestão de Cargos</h1>
        </div>
        <p className="text-brand-300 font-medium">Cadastro e estruturação da hierarquia organizacional</p>
      </div>

      <ToolsCargos searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedSetorFilter={selectedSetorFilter} setSelectedSetorFilter={setSelectedSetorFilter} setIsModalOpen={setIsModalOpen} />

      {isLoading ? (
        <div className="flex justify-center p-8"><span className="text-brand-300">Carregando...</span></div>
      ) : (
        <TableCargos cargosExibidos={cargosExibidos} setoresDisponiveis={setoresDisponiveis} onEdit={handleEditCargo} onDelete={handleDeleteCargo} />
      )}

      <CadastroGeralCargosPage
        isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
        formData={formData} setFormData={setFormData}
        handleCreateCargo={handleCreateCargo} isSubmitting={isSubmitting}
      />
    </div>
  );
}
