import { MOCK_CARGOS } from "@/data/mockCargos";
import { MOCK_SETORES } from "@/data/mockSetores";
import { X, Lock, UploadCloud, FileText, Loader2 } from "lucide-react";

export function CadastroGeralDocumentosPage({
    isModalOpen,
    setIsModalOpen,
    formData,
    setFormData,
    handleCreateDoc,
    isSubmitting,
    handleFileSelect,
    selectedFileName,
    setSelectedFileName,
    activeTab,
    setActiveTab,
    handleCargoToggle
}: any) {
    if (!isModalOpen) return null;
    return (
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
                                        <input required type="text" value={formData.nome} onChange={e => setFormData({ ...formData, nome: e.target.value })} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 placeholder-brand-500 focus:ring-2 focus:ring-brand-400 outline-none" placeholder="Ex: POP - Fechamento de Caixa" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-brand-300 uppercase mb-2">Descrição Breve</label>
                                        <textarea required value={formData.descricao} onChange={e => setFormData({ ...formData, descricao: e.target.value })} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 placeholder-brand-500 focus:ring-2 focus:ring-brand-400 outline-none min-h-[80px]" placeholder="Instruções para o operador de caixa no fim do expediente." />
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
                                            <select required value={formData.departamento_alvo} onChange={e => setFormData({ ...formData, departamento_alvo: e.target.value })} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 outline-none appearance-none cursor-pointer">
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
                                                            className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${isSelected
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
                                        <input type="text" value={formData.regra_acesso} onChange={e => setFormData({ ...formData, regra_acesso: e.target.value })} className="w-full bg-brand-900 border border-brand-500/30 rounded-xl px-4 py-3 text-brand-100 placeholder-brand-500 focus:ring-2 focus:ring-brand-400 outline-none font-mono text-sm" placeholder="Ex: departamento == 'rh' AND cargo == 'gerente'" />
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
    );
}