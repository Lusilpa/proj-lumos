"use client";

import { useState } from "react";
import { MOCK_SETORES } from "@/data/mockSetores";
import { Search, Briefcase, Plus, X, Loader2, MoreVertical, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

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
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-brand-400" />
          </div>
          <input
            type="text"
            placeholder="Filtrar por nome ou slug do setor..."
            className="block w-full pl-12 pr-4 py-4 border border-brand-500/30 rounded-2xl leading-5 bg-brand-800/60 text-brand-100 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-300 transition-all duration-300 sm:text-sm shadow-inner backdrop-blur-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-4 bg-brand-100 text-brand-900 font-black uppercase tracking-wider text-xs rounded-2xl hover:bg-brand-300 transition-colors shadow-lg hover:shadow-brand-50/10 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Novo Setor
        </button>
      </div>

      {/* Tabela de Setores */}
      <div className="bg-brand-800/40 rounded-3xl border border-brand-500/20 overflow-hidden shadow-2xl backdrop-blur-xl flex-1">
        <div className="overflow-x-auto h-full min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-brand-900/80 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest">
                  Departamento
                </th>
                <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest">
                  Identificador Lógico (Slug)
                </th>
                <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-500/10">
              {setoresExibidos.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-brand-400 font-medium">
                    Nenhum setor encontrado.
                  </td>
                </tr>
              ) : (
                setoresExibidos.map((setor) => (
                  <tr 
                    key={setor.id} 
                    className="hover:bg-brand-800/80 transition-all duration-200 group"
                  >
                    <td className="py-4 px-6 align-middle">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-900 border border-brand-500/30 flex items-center justify-center text-brand-100 font-black group-hover:scale-110 transition-transform shadow-md">
                          {setor.nome.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-brand-100">{setor.nome}</span>
                          <span className="text-[10px] text-brand-400 font-medium tracking-wider uppercase">ID: {setor.id}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 align-middle">
                      <div className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brand-900 border border-brand-500/40 text-brand-100 shadow-sm">
                        {setor.slug}
                      </div>
                    </td>

                    <td className="py-4 px-6 align-middle text-right">
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
          <div className="relative bg-brand-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-brand-500/50 z-10">
            <div className="flex items-center justify-between p-6 border-b border-brand-500/30 bg-brand-900/40">
              <h3 className="text-xl font-black text-brand-100 uppercase">Novo Setor</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-400 hover:text-brand-100 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleCreateSetor} className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-xs font-bold text-brand-300 uppercase mb-2">Nome do Departamento</label>
                <input 
                  required 
                  type="text" 
                  value={formData.nome} 
                  onChange={e => setFormData({ nome: e.target.value })} 
                  className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 placeholder-brand-500 focus:ring-2 focus:ring-brand-400 outline-none" 
                  placeholder="Ex: Auditoria Interna" 
                />
              </div>

              <div className="p-4 bg-brand-900/40 rounded-xl border border-brand-500/20">
                <p className="text-[10px] text-brand-400 font-medium uppercase tracking-widest leading-relaxed">
                  O Identificador Lógico (Slug) será gerado automaticamente para compatibilidade com o motor de Álgebra Booleana.
                </p>
              </div>

              <div className="mt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} className="flex-1 py-3 px-4 rounded-xl font-bold text-brand-100 border border-brand-500/30 hover:bg-brand-900 transition-colors uppercase text-xs disabled:opacity-50">Cancelar</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 px-4 rounded-xl font-black text-brand-900 bg-brand-100 hover:bg-brand-50 transition-colors uppercase text-xs flex items-center justify-center disabled:opacity-70">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Cadastrar Setor"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
}
