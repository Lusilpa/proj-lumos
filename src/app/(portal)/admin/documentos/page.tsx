"use client";

import { useState, useEffect } from "react";
import { FileSignature } from "lucide-react";
import toast from "react-hot-toast";
import { CadastroGeralDocumentosPage } from "../components/Register/Docs";
import { TableDocs } from "../components/Table/Documentos";
import { ToolsDocs } from "../components/Tools/Docs";
import { documentoService } from "@/lib/services/documentos.service";
import type { Documento } from "@/types";

export default function DocumentosAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [localDocs, setLocalDocs] = useState<Documento[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "", descricao: "", departamento_alvo: "", cargos_permitidos: [] as string[], regra_acesso: "",
  });
  const [activeTab, setActiveTab] = useState<"abac" | "upload">("abac");
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await documentoService.getDocumentos();
        setLocalDocs(data);
      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
        toast.error("Erro ao carregar documentos.");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const handleCargoToggle = (cargoSlug: string) => {
    setFormData(prev => ({
      ...prev,
      cargos_permitidos: prev.cargos_permitidos.includes(cargoSlug)
        ? prev.cargos_permitidos.filter(c => c !== cargoSlug)
        : [...prev.cargos_permitidos, cargoSlug]
    }));
  };

  const handleCreateDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.departamento_alvo) { toast.error("Preencha os campos obrigatórios."); return; }
    setIsSubmitting(true);
    try {
      const newDocId = await documentoService.createDocumento({
        nome: formData.nome, descricao: formData.descricao, departamento_alvo: formData.departamento_alvo,
        cargos_permitidos: formData.cargos_permitidos, regra_acesso: formData.regra_acesso,
        data_ultima_atualizacao: new Date().toLocaleDateString('pt-BR'),
      });
      const newDoc: Documento = { id: newDocId, ...formData, data_ultima_atualizacao: new Date().toLocaleDateString('pt-BR') };
      setLocalDocs(prev => [...prev, newDoc]);
      setIsModalOpen(false);
      setFormData({ nome: "", descricao: "", departamento_alvo: "", cargos_permitidos: [], regra_acesso: "" });
      setSelectedFileName(null);
      setActiveTab("abac");
      toast.success("Documento publicado com sucesso!");
    } catch (error) {
      console.error("Erro ao publicar documento:", error);
      toast.error("Erro ao salvar documento.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditDoc = async (id: string, data: Partial<Documento>) => {
    try {
      await documentoService.updateDocumento(id, { ...data, data_ultima_atualizacao: new Date().toLocaleDateString('pt-BR') });
      setLocalDocs(prev => prev.map(d => d.id === id ? { ...d, ...data, data_ultima_atualizacao: new Date().toLocaleDateString('pt-BR') } : d));
      toast.success("Documento atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar documento:", error);
      toast.error("Erro ao atualizar documento.");
    }
  };

  const handleDeleteDoc = async (id: string) => {
    try {
      await documentoService.deleteDocumento(id);
      setLocalDocs(prev => prev.filter(d => d.id !== id));
      toast.success("Documento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir documento:", error);
      toast.error("Erro ao excluir documento.");
    }
  };

  const docsExibidos = localDocs.filter((doc) => {
    const termo = searchQuery.toLowerCase();
    return doc.nome.toLowerCase().includes(termo) || doc.descricao.toLowerCase().includes(termo) || doc.departamento_alvo.toLowerCase().includes(termo);
  });

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full relative">
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-3">
          <FileSignature className="w-8 h-8 text-brand-100" />
          <h1 className="text-3xl font-black tracking-tight text-brand-100 uppercase">Gestão de Documentos (POPs)</h1>
        </div>
        <p className="text-brand-300 font-medium">Controle centralizado da Base de Conhecimento e parametrização do Motor Lógico ABAC.</p>
      </div>

      <ToolsDocs searchQuery={searchQuery} setSearchQuery={setSearchQuery} setIsModalOpen={setIsModalOpen} />

      {isLoading ? (
        <div className="flex justify-center p-8"><span className="text-brand-300">Carregando...</span></div>
      ) : (
        <TableDocs docsExibidos={docsExibidos} onEdit={handleEditDoc} onDelete={handleDeleteDoc} />
      )}

      <CadastroGeralDocumentosPage
        isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}
        formData={formData} setFormData={setFormData}
        handleCreateDoc={handleCreateDoc} isSubmitting={isSubmitting}
        selectedFileName={selectedFileName} setSelectedFileName={setSelectedFileName}
        activeTab={activeTab} setActiveTab={setActiveTab}
        handleCargoToggle={handleCargoToggle}
      />
    </div>
  );
}
