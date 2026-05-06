import { MOCK_SETORES } from "@/data/mockSetores";
import { X, Loader2 } from "lucide-react";

{/* Cadastro de Colaboradores */ }
export function CadastroGeralColaboradoresPage({
    isModalOpen,
    setIsModalOpen,
    formData,
    setFormData,
    handleCreateUser,
    isSubmitting
}: any) {
    if (!isModalOpen) return null;

    return (
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
                            <input required type="text" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 placeholder-brand-500 focus:ring-2 focus:ring-brand-400 outline-none" placeholder="Ex: João Silva" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-brand-300 uppercase mb-2">CPF (Apenas números)</label>
                            <input required type="text" value={formData.cpf} onChange={e => {
                                // Máscara ultra-simples de CPF no front
                                let v = e.target.value.replace(/\D/g, "");
                                if (v.length > 11) v = v.substring(0, 11);
                                if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
                                else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
                                else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, "$1.$2");
                                setFormData({ ...formData, cpf: v })
                            }} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 placeholder-brand-500 focus:ring-2 focus:ring-brand-400 outline-none" placeholder="000.000.000-00" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-brand-300 uppercase mb-2">E-mail Corporativo</label>
                        <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 placeholder-brand-500 focus:ring-2 focus:ring-brand-400 outline-none" placeholder="joao@lhumos.com" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-brand-300 uppercase mb-2">Setor</label>
                            <select required value={formData.departamento} onChange={e => setFormData({ ...formData, departamento: e.target.value })} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 outline-none">
                                <option value="">Selecione...</option>
                                {MOCK_SETORES.map(s => <option key={s.id} value={s.slug}>{s.nome}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-brand-300 uppercase mb-2">Cargo</label>
                            <select required value={formData.cargo} onChange={e => setFormData({ ...formData, cargo: e.target.value })} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 outline-none">
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
    );
}
