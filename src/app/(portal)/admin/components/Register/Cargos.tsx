import { MOCK_SETORES } from "@/data/mockSetores";
import { NIVEIS_HIERARQUICOS } from "@/data/mockCargos";
import { X, Loader2 } from "lucide-react";

{/* Cadastro de Cargos */ }
export function CadastroGeralCargosPage({
    isModalOpen,
    setIsModalOpen,
    formData,
    setFormData,
    handleCreateCargo,
    isSubmitting
}: any) {
    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-brand-900/80 backdrop-blur-sm transition-opacity"
                onClick={() => setIsModalOpen(false)}
            />
            <div className="relative bg-brand-800 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-brand-500/50 z-10">
                <div className="flex items-center justify-between p-6 border-b border-brand-500/30 bg-brand-900/40">
                    <h3 className="text-xl font-black text-brand-100 uppercase">Novo Cargo</h3>
                    <button onClick={() => setIsModalOpen(false)} className="text-brand-400 hover:text-brand-100 transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleCreateCargo} className="p-6 flex flex-col gap-5">
                    <div>
                        <label className="block text-xs font-bold text-brand-300 uppercase mb-2">Nome do Cargo</label>
                        <input
                            required
                            type="text"
                            value={formData.nome}
                            onChange={e => setFormData({ ...formData, nome: e.target.value })}
                            className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 placeholder-brand-500 focus:ring-2 focus:ring-brand-400 outline-none"
                            placeholder="Ex: Engenheiro de Dados Sênior"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-brand-300 uppercase mb-2">Departamento</label>
                            <select required value={formData.setor_slug} onChange={e => setFormData({ ...formData, setor_slug: e.target.value })} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 outline-none appearance-none cursor-pointer">
                                <option value="">Selecione...</option>
                                {MOCK_SETORES.map(s => <option key={s.id} value={s.slug}>{s.nome}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-brand-300 uppercase mb-2">Nível Hierárquico</label>
                            <select required value={formData.nivel} onChange={e => setFormData({ ...formData, nivel: e.target.value })} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 outline-none appearance-none cursor-pointer">
                                <option value="">Selecione...</option>
                                {NIVEIS_HIERARQUICOS.map(n => <option key={n.slug} value={n.slug}>{n.nome}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="p-4 bg-brand-900/40 rounded-xl border border-brand-500/20">
                        <p className="text-[10px] text-brand-400 font-medium uppercase tracking-widest leading-relaxed">
                            O Identificador Lógico (Slug) será gerado automaticamente para compatibilidade com o motor de Álgebra Booleana.
                        </p>
                    </div>

                    <div className="mt-4 flex gap-3">
                        <button type="button" onClick={() => setIsModalOpen(false)} disabled={isSubmitting} className="flex-1 py-3 px-4 rounded-xl font-bold text-brand-100 border border-brand-500/30 hover:bg-brand-900 transition-colors uppercase text-xs disabled:opacity-50">Cancelar</button>
                        <button type="submit" disabled={isSubmitting} className="flex-1 py-3 px-4 rounded-xl font-black text-brand-900 bg-brand-100 hover:bg-brand-50 transition-colors uppercase text-xs flex items-center justify-center disabled:opacity-70">
                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Cadastrar Cargo"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
