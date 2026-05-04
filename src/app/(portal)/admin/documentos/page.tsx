"use client";

import { useState } from "react";
import { MOCK_DOCS } from "@/data/mockDocs";
import { MOCK_SETORES } from "@/data/mockSetores";
import { MOCK_CARGOS } from "@/data/mockCargos";
import { Search, FileSignature, Plus, X, Lock, UploadCloud, FileText, Loader2, MoreVertical, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

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
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-brand-400" />
          </div>
          <input
            type="text"
            placeholder="Filtrar por nome, descrição ou departamento..."
            className="block w-full pl-12 pr-4 py-4 border border-brand-500/30 rounded-2xl leading-5 bg-brand-800/60 text-brand-100 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-300 transition-all duration-300 sm:text-sm shadow-inner backdrop-blur-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-4 bg-brand-100 text-brand-900 font-black uppercase tracking-wider text-xs rounded-2xl hover:bg-brand-300 transition-colors shadow-lg hover:shadow-brand-50/10 flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Novo Documento
        </button>
      </div>

      {/* Tabela de Documentos */}
      <div className="bg-brand-800/40 rounded-3xl border border-brand-500/20 overflow-hidden shadow-2xl backdrop-blur-xl flex-1">
        <div className="overflow-x-auto h-full min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-brand-900/80 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest">
                  Identificação do Documento
                </th>
                <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest w-1/3">
                  Motor Lógico (ABAC)
                </th>
                <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-500/10">
              {docsExibidos.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-brand-400 font-medium">
                    Nenhum documento encontrado.
                  </td>
                </tr>
              ) : (
                docsExibidos.map((doc) => (
                  <tr 
                    key={doc.id} 
                    className="hover:bg-brand-800/80 transition-all duration-200 group"
                  >
                    <td className="py-4 px-6 align-top">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-brand-100 text-sm">{doc.nome}</span>
                        <span className="text-xs text-brand-300 mb-2">{doc.descricao}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-brand-400 font-medium tracking-wider uppercase">ID: {doc.id}</span>
                          <span className="text-[10px] text-brand-500">•</span>
                          <span className="text-[10px] text-brand-400 font-medium tracking-wider uppercase">Atualizado: {doc.data_ultima_atualizacao}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 align-top bg-brand-900/20">
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-brand-900 border border-brand-500/40 text-brand-100 uppercase tracking-widest">
                            {doc.departamento_alvo}
                          </div>
                          {doc.cargos_permitidos.map(c => (
                            <div key={c} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-brand-100 text-brand-900 uppercase tracking-widest">
                              {c}
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 p-2 bg-brand-900 rounded-lg border border-brand-500/30 shadow-inner">
                          <Lock className="w-3 h-3 text-brand-400 shrink-0 mt-0.5" />
                          <code className="text-[10px] font-mono text-brand-300 break-all">
                            {doc.regra_acesso || "Sem regra definida"}
                          </code>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 align-top text-right">
                      <div className="relative group/dropdown inline-block">
                        <button className="p-2 hover:bg-brand-500/20 rounded-lg text-brand-400 hover:text-brand-100 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                        </button>
                        <div className="absolute right-0 top-full mt-1 hidden group-hover/dropdown:flex flex-col bg-brand-900 border border-brand-500/30 rounded-xl shadow-2xl z-50 w-36 overflow-hidden">
                          <button onClick={() => toast('Função de edição em desenvolvimento', { icon: '🚧' })} className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-brand-100 hover:bg-brand-800 transition-colors text-left w-full">
                            <Pencil className="w-4 h-4" /> Editar
                          </button>
                          <button onClick={() => toast('Função de exclusão em desenvolvimento', { icon: '🚧' })} className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors text-left w-full border-t border-brand-500/20">
                            <Trash2 className="w-4 h-4" /> Excluir
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Cadastro */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-brand-900/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative bg-brand-800 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-brand-500/50 z-10 max-h-[90vh]">
            <div className="flex flex-col border-b border-brand-500/30 bg-brand-900/40 shrink-0">
              <div className="flex items-center justify-between p-6 pb-4">
                <h3 className="text-xl font-black text-brand-100 uppercase">Novo Documento</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-brand-400 hover:text-brand-100 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="flex px-6 gap-6">
                <button 
                  onClick={() => setActiveTab("abac")}
                  className={`pb-3 text-xs font-black uppercase tracking-widest border-b-2 transition-colors ${activeTab === "abac" ? "text-brand-100 border-brand-100" : "text-brand-500 border-transparent hover:text-brand-300"}`}
                >
                  Metadados & ABAC
                </button>
                <button 
                  onClick={() => setActiveTab("upload")}
                  className={`pb-3 text-xs font-black uppercase tracking-widest border-b-2 transition-colors ${activeTab === "upload" ? "text-brand-100 border-brand-100" : "text-brand-500 border-transparent hover:text-brand-300"}`}
                >
                  Arquivo PDF
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form onSubmit={handleCreateDoc} className="flex flex-col gap-6">
                
                {activeTab === "abac" ? (
                  <>
                    {/* Metadados Básicos */}
                    <div className="flex flex-col gap-4">
                      <div>
                        <label className="block text-xs font-bold text-brand-300 uppercase mb-2">Título do Documento</label>
                        <input required type="text" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 placeholder-brand-500 focus:ring-2 focus:ring-brand-400 outline-none" placeholder="Ex: POP - Fechamento de Caixa" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-brand-300 uppercase mb-2">Descrição Breve</label>
                        <textarea required value={formData.descricao} onChange={e => setFormData({...formData, descricao: e.target.value})} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 placeholder-brand-500 focus:ring-2 focus:ring-brand-400 outline-none min-h-[80px]" placeholder="Instruções para o operador de caixa no fim do expediente." />
                      </div>
                    </div>

                    <hr className="border-brand-500/20" />

                    {/* Motor Lógico */}
                    <div className="flex flex-col gap-4">
                      <h4 className="text-sm font-black text-brand-100 uppercase tracking-widest flex items-center gap-2">
                        <Lock className="w-4 h-4 text-brand-400" />
                        Matriz de Acesso ABAC
                      </h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-brand-300 uppercase mb-2">Departamento Alvo</label>
                          <select required value={formData.departamento_alvo} onChange={e => setFormData({...formData, departamento_alvo: e.target.value})} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 outline-none appearance-none cursor-pointer">
                            <option value="">Selecione...</option>
                            {MOCK_SETORES.map(s => <option key={s.id} value={s.slug}>{s.nome}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-300 uppercase mb-2">Cargos Permitidos (Multi-Select)</label>
                        <div className="flex flex-wrap gap-2 p-4 bg-brand-900 border border-brand-500/30 rounded-xl">
                          {!formData.departamento_alvo ? (
                            <p className="text-xs text-brand-400 font-medium italic py-2">
                              Selecione um Departamento Alvo acima para listar os cargos disponíveis.
                            </p>
                          ) : (
                            MOCK_CARGOS.filter(cargo => cargo.setor_slug === formData.departamento_alvo).map(cargo => {
                              const isSelected = formData.cargos_permitidos.includes(cargo.slug);
                              return (
                                <button
                                  key={cargo.id}
                                  type="button"
                                  onClick={() => handleCargoToggle(cargo.slug)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                                    isSelected 
                                      ? "bg-brand-100 text-brand-900 shadow-md" 
                                      : "bg-brand-800 text-brand-400 hover:bg-brand-700 border border-brand-500/30"
                                  }`}
                                >
                                  {cargo.nome}
                                </button>
                              );
                            })
                          )}
                          
                          {formData.departamento_alvo && MOCK_CARGOS.filter(cargo => cargo.setor_slug === formData.departamento_alvo).length === 0 && (
                            <p className="text-xs text-brand-400 font-medium italic py-2">
                              Nenhum cargo cadastrado neste departamento.
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-brand-300 uppercase mb-2">Fórmula Lógica (Opcional)</label>
                        <input type="text" value={formData.regra_acesso} onChange={e => setFormData({...formData, regra_acesso: e.target.value})} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 placeholder-brand-500 focus:ring-2 focus:ring-brand-400 outline-none font-mono text-sm" placeholder="Ex: departamento == 'rh' AND cargo == 'gerente'" />
                        <p className="text-[10px] text-brand-400 uppercase tracking-widest mt-2">
                          Se deixado em branco, o sistema usará a interseção básica de Departamento e Cargo.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="relative flex flex-col items-center justify-center p-12 border-2 border-dashed border-brand-500/30 rounded-2xl bg-brand-900/20 hover:bg-brand-900/40 transition-colors cursor-pointer group">
                    {!selectedFileName ? (
                      <>
                        <div className="w-16 h-16 rounded-full bg-brand-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <UploadCloud className="w-8 h-8 text-brand-300" />
                        </div>
                        <p className="text-brand-100 font-bold mb-1">Clique ou arraste seu arquivo PDF aqui</p>
                        <p className="text-xs text-brand-400 font-medium">Tamanho máximo: 10MB</p>
                        {/* Simulação de input de arquivo invisível */}
                        <input 
                          type="file" 
                          accept=".pdf" 
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          onChange={(e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              setSelectedFileName(e.target.files[0].name);
                            }
                          }}
                        />
                      </>
                    ) : (
                      <div className="flex items-center gap-4 text-brand-100">
                        <FileText className="w-10 h-10 text-brand-400" />
                        <div className="flex flex-col">
                          <span className="font-bold text-sm">{selectedFileName}</span>
                          <span className="text-xs text-brand-500">Pronto para upload</span>
                        </div>
                        <button type="button" onClick={(e) => { e.preventDefault(); setSelectedFileName(null); }} className="ml-4 p-2 bg-brand-800 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-colors">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className="mt-4 flex gap-3 pt-4 border-t border-brand-500/20">
                  <button type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} className="flex-1 py-4 px-4 rounded-xl font-bold text-brand-100 border border-brand-500/30 hover:bg-brand-900 transition-colors uppercase text-xs tracking-widest disabled:opacity-50">Cancelar</button>
                  <button type="submit" disabled={isSubmitting} className="flex-1 py-4 px-4 rounded-xl font-black text-brand-900 bg-brand-100 hover:bg-brand-50 transition-colors uppercase text-xs tracking-widest flex items-center justify-center disabled:opacity-70">
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Publicar Documento"}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}
