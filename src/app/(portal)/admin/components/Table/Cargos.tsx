import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { MOCK_SETORES } from "@/data/mockSetores";
import { NIVEIS_HIERARQUICOS } from "@/data/mockCargos";

export function TableCargos({ cargosExibidos }: { cargosExibidos: any[] }) {
    return (
        <div className="bg-brand-800/40 rounded-3xl border border-brand-500/20 overflow-hidden shadow-2xl backdrop-blur-xl flex-1">
            <div className="overflow-x-auto h-full min-h-[300px]">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-brand-900/80 sticky top-0 z-10 backdrop-blur-md">
                        <tr>
                            <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest">
                                Cargo
                            </th>
                            <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest">
                                Nível Hierárquico
                            </th>
                            <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest">
                                Departamento (Setor)
                            </th>
                            <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest text-right">
                                Ações
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-500/10">
                        {cargosExibidos.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-12 text-center text-brand-400 font-medium">
                                    Nenhum cargo encontrado.
                                </td>
                            </tr>
                        ) : (
                            cargosExibidos.map((cargo) => (
                                <tr
                                    key={cargo.id}
                                    className="hover:bg-brand-800/80 transition-all duration-200 group"
                                >
                                    <td className="py-4 px-6 align-middle">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-brand-900 border border-brand-500/30 flex items-center justify-center text-brand-100 font-black group-hover:scale-110 transition-transform shadow-md">
                                                {cargo.nome.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-brand-100">{cargo.nome}</span>
                                                <span className="text-[10px] text-brand-400 font-medium tracking-wider uppercase">SLUG: {cargo.slug}</span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="py-4 px-6 align-middle">
                                        <div className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-brand-100 text-brand-900 shadow-sm">
                                            {NIVEIS_HIERARQUICOS.find(n => n.slug === cargo.nivel)?.nome || cargo.nivel}
                                        </div>
                                    </td>

                                    <td className="py-4 px-6 align-middle">
                                        <span className="text-xs font-bold text-brand-300">
                                            {MOCK_SETORES.find(s => s.slug === cargo.setor_slug)?.nome || cargo.setor_slug}
                                        </span>
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
    );
}