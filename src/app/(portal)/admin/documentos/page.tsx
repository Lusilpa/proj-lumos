"use client";

import { useState } from "react";
import { MOCK_DOCS } from "@/data/mockDocs";
import { Search, FileSignature, Plus, Lock, MoreVertical, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { CadastroGeralDocumentosPage } from "../components/Register/Docs";
import { TableDocs } from "../components/Table/Documentos";
import { ToolsDocs } from "../components/Tools/Docs";

export default function DocumentosAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [localDocs, setLocalDocs] = useState(MOCK_DOCS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    departamento_alvo: "",
    cargos_permitidos: [] as string[],
    regra_acesso: "",
  });
  const [activeTab, setActiveTab] = useState<"abac" | "upload">("abac");
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleCargoToggle = (cargoSlug: string) => {
    if (formData.cargos_permitidos.includes(cargoSlug)) {
      setFormData({
        ...formData,
        cargos_permitidos: formData.cargos_permitidos.filter(c => c !== cargoSlug)
      });
    } else {
      setFormData({
        ...formData,
        cargos_permitidos: [...formData.cargos_permitidos, cargoSlug]
      });
    }
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateDoc = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.departamento_alvo) {
      toast.error("Preencha os campos obrigatórios.");
      return;
    }

    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500)); // Simulando upload do PDF + Insert no Banco

    const newDoc = {
      id: `doc_${Math.floor(Math.random() * 10000)}`,
      nome: formData.nome,
      descricao: formData.descricao,
      departamento_alvo: formData.departamento_alvo,
      cargos_permitidos: formData.cargos_permitidos,
      regra_acesso: formData.regra_acesso,
      data_ultima_atualizacao: new Date().toLocaleDateString('pt-BR'),
    };
    setLocalDocs([...localDocs, newDoc]);
    setIsModalOpen(false);
    setFormData({ nome: "", descricao: "", departamento_alvo: "", cargos_permitidos: [], regra_acesso: "" });
    setSelectedFileName(null);
    setActiveTab("abac");
    setIsSubmitting(false);
    toast.success("Documento publicado com sucesso!");
  };

  const docsExibidos = localDocs.filter((doc) => {
    const termo = searchQuery.toLowerCase();
    return (
      doc.nome.toLowerCase().includes(termo) ||
      doc.descricao.toLowerCase().includes(termo) ||
      doc.departamento_alvo.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full relative">

      {/* Cabeçalho */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-3">
          <FileSignature className="w-8 h-8 text-brand-100" />
          <h1 className="text-3xl font-black tracking-tight text-brand-100 uppercase">Gestão de Documentos (POPs)</h1>
        </div>
        <p className="text-brand-300 font-medium">
          Controle centralizado da Base de Conhecimento e parametrização do Motor Lógico ABAC.
        </p>
      </div>

      {/* Ferramentas */}
      <ToolsDocs
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        setIsModalOpen={setIsModalOpen}
      />

      {/* Tabela de Documentos */}
      <TableDocs docsExibidos={docsExibidos} />

      {/* Modal de Cadastro */}
      <CadastroGeralDocumentosPage
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        formData={formData}
        setFormData={setFormData}
        handleCreateDoc={handleCreateDoc}
        isSubmitting={isSubmitting}
        selectedFileName={selectedFileName}
        setSelectedFileName={setSelectedFileName}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        handleCargoToggle={handleCargoToggle}
      />
    </div>
  );
}
