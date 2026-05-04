"use client";

import { useState } from "react";
import { MOCK_USERS } from "@/data/mockUsers";
import { MOCK_SETORES } from "@/data/mockSetores";
import { Search, UserCircle, Briefcase, Mail, ShieldAlert, X, Loader2, MoreVertical, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ColaboradoresAdminPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSetor, setFilterSetor] = useState("Todos");
  const [localUsers, setLocalUsers] = useState(MOCK_USERS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ nome: "", cpf: "", email: "", departamento: "", cargo: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simula tempo de resposta do servidor (backend)
    await new Promise(r => setTimeout(r, 1200));

    const newUser = {
      uid: `usr_${Math.floor(Math.random() * 10000)}`,
      nome: formData.nome,
      cpf: formData.cpf,
      email: formData.email,
      departamento: formData.departamento,
      cargo: formData.cargo,
    };
    setLocalUsers([...localUsers, newUser]);
    setIsModalOpen(false);
    setFormData({ nome: "", cpf: "", email: "", departamento: "", cargo: "" });
    setIsSubmitting(false);
    toast.success("Colaborador cadastrado com sucesso!");
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
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-brand-400" />
          </div>
          <input
            type="text"
            placeholder="Filtrar por nome, email, cargo ou departamento..."
            className="block w-full pl-12 pr-4 py-4 border border-brand-500/30 rounded-2xl leading-5 bg-brand-800/60 text-brand-100 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-300 transition-all duration-300 sm:text-sm shadow-inner backdrop-blur-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filtro de Setor */}
        <div className="sm:w-64">
          <select
            value={filterSetor}
            onChange={(e) => setFilterSetor(e.target.value)}
            className="block w-full px-4 py-4 border border-brand-500/30 rounded-2xl leading-5 bg-brand-800/60 text-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-300 transition-all duration-300 sm:text-sm appearance-none cursor-pointer shadow-inner backdrop-blur-md"
            style={{ backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%23FFFFFF\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
          >
            <option value="Todos" className="bg-brand-900 text-brand-100">
              Todos os Setores
            </option>
            {MOCK_SETORES.map(setor => (
              <option key={setor.id} value={setor.slug} className="bg-brand-900 text-brand-100">
                {setor.nome}
              </option>
            ))}
          </select>
        </div>
        
        {/* Futuro botão de adicionar colaborador poderia ficar aqui */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-4 bg-brand-100 text-brand-900 font-black uppercase tracking-wider text-xs rounded-2xl hover:bg-brand-300 transition-colors shadow-lg hover:shadow-brand-50/10 flex items-center justify-center gap-2"
        >
          <UserCircle className="w-4 h-4" />
          Novo Colaborador
        </button>
      </div>

      {/* Tabela de Dados Corporativa */}
      <div className="bg-brand-800/40 rounded-3xl border border-brand-500/20 overflow-hidden shadow-2xl backdrop-blur-xl flex-1">
        <div className="overflow-x-auto h-full min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <thead className="bg-brand-900/80 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest">
                  Identificação
                </th>
                <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest">
                  Contato
                </th>
                <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest">
                  Atuação Estratégica
                </th>
                <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-500/10">
              {colaboradoresExibidos.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-brand-400 font-medium">
                    Nenhum colaborador encontrado com os filtros atuais.
                  </td>
                </tr>
              ) : (
                colaboradoresExibidos.map((user) => (
                  <tr 
                    key={user.uid} 
                    className="hover:bg-brand-800/80 transition-all duration-200 group"
                  >
                    {/* Identificação */}
                    <td className="py-4 px-6 align-middle">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-brand-900 border border-brand-500/30 flex items-center justify-center text-brand-100 font-black group-hover:scale-110 transition-transform shadow-md">
                          {user.nome.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-brand-100">{user.nome}</span>
                          <span className="text-[10px] text-brand-400 font-medium tracking-wider uppercase">CPF: ***.{user.cpf.substring(4, 11)}-**</span>
                        </div>
                      </div>
                    </td>

                    {/* Contato */}
                    <td className="py-4 px-6 align-middle">
                      <div className="flex flex-col gap-1 text-brand-100 text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-brand-400" />
                          {user.email}
                        </div>
                      </div>
                    </td>

                    {/* Atuação Estratégica (Cargo e Setor) */}
                    <td className="py-4 px-6 align-middle">
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black bg-brand-900 border border-brand-500/40 text-brand-100 uppercase tracking-widest shadow-sm">
                          <Briefcase className="w-3 h-3 text-brand-300" />
                          {user.departamento}
                        </div>
                        <div className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black bg-brand-100 text-brand-900 uppercase tracking-widest shadow-sm">
                          {user.cargo}
                        </div>
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
          <div className="relative bg-brand-800 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-brand-500/50 z-10">
            <div className="flex items-center justify-between p-6 border-b border-brand-500/30 bg-brand-900/40">
              <h3 className="text-xl font-black text-brand-100 uppercase">Novo Colaborador</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-brand-400 hover:text-brand-100 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleCreateUser} className="p-6 flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-300 uppercase mb-2">Nome Completo</label>
                  <input required type="text" value={formData.nome} onChange={e => setFormData({...formData, nome: e.target.value})} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 placeholder-brand-500 focus:ring-2 focus:ring-brand-400 outline-none" placeholder="Ex: João Silva" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-300 uppercase mb-2">CPF (Apenas números)</label>
                  <input required type="text" value={formData.cpf} onChange={e => {
                    // Máscara ultra-simples de CPF no front
                    let v = e.target.value.replace(/\D/g, "");
                    if(v.length > 11) v = v.substring(0, 11);
                    if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
                    else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
                    else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, "$1.$2");
                    setFormData({...formData, cpf: v})
                  }} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 placeholder-brand-500 focus:ring-2 focus:ring-brand-400 outline-none" placeholder="000.000.000-00" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-300 uppercase mb-2">E-mail Corporativo</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 placeholder-brand-500 focus:ring-2 focus:ring-brand-400 outline-none" placeholder="joao@lhumos.com" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-300 uppercase mb-2">Setor</label>
                  <select required value={formData.departamento} onChange={e => setFormData({...formData, departamento: e.target.value})} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 outline-none">
                    <option value="">Selecione...</option>
                    {MOCK_SETORES.map(s => <option key={s.id} value={s.slug}>{s.nome}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-300 uppercase mb-2">Cargo</label>
                  <select required value={formData.cargo} onChange={e => setFormData({...formData, cargo: e.target.value})} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 outline-none">
                    <option value="">Selecione...</option>
                    <option value="aprendiz">Aprendiz</option>
                    <option value="estagiario">Estagiário</option>
                    <option value="auxiliar">Auxiliar</option>
                    <option value="assistente">Assistente</option>
                    <option value="analista">Analista</option>
                    <option value="supervisor">Supervisor</option>
                    <option value="gerente">Gerente</option>
                    <option value="diretor">Diretor</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} className="flex-1 py-3 px-4 rounded-xl font-bold text-brand-100 border border-brand-500/30 hover:bg-brand-900 transition-colors uppercase text-xs disabled:opacity-50">Cancelar</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-3 px-4 rounded-xl font-black text-brand-900 bg-brand-100 hover:bg-brand-50 transition-colors uppercase text-xs flex items-center justify-center disabled:opacity-70">
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Cadastrar Colaborador"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
}
