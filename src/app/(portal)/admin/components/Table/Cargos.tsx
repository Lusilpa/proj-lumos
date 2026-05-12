"use client";

import { useState } from "react";
import { MoreVertical, Pencil, Trash2, Check, X } from "lucide-react";
import { NIVEIS_HIERARQUICOS } from "@/data/mockCargos";

interface CargoItem {
    id: string;
    nome: string;
    slug: string;
    nivel: string;
    setor_slug: string;
}

interface TableCargosProps {
    cargosExibidos: CargoItem[];
    setoresDisponiveis: { id: string; nome: string; slug: string }[];
    onEdit: (id: string, data: Partial<CargoItem>) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export function TableCargos({ cargosExibidos, setoresDisponiveis, onEdit, onDelete }: TableCargosProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<Partial<CargoItem>>({});
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const startEdit = (cargo: CargoItem) => {
        setEditingId(cargo.id);
        setEditData({ nome: cargo.nome, nivel: cargo.nivel, setor_slug: cargo.setor_slug });
    };

    const cancelEdit = () => { setEditingId(null); setEditData({}); };

    const confirmEdit = async (id: string) => {
        if (!editData.nome?.trim()) return;
        setLoadingId(id);
        await onEdit(id, editData);
        setLoadingId(null);
        setEditingId(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Confirma a exclusão deste cargo? Esta ação é irreversível.")) return;
        setLoadingId(id);
        await onDelete(id);
        setLoadingId(null);
    };

    return (
        <div className="bg-brand-800/40 rounded-3xl border border-brand-500/20 overflow-hidden shadow-2xl backdrop-blur-xl flex-1">
            <div className="overflow-x-auto h-full min-h-[300px]">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-brand-900/80 sticky top-0 z-10 backdrop-blur-md">
                        <tr>
                            <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest">Cargo</th>
                            <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest">Nível Hierárquico</th>
                            <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest">Departamento</th>
                            <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-500/10">
                        {cargosExibidos.length === 0 ? (
                            <tr><td colSpan={4} className="py-12 text-center text-brand-400 font-medium">Nenhum cargo encontrado.</td></tr>
                        ) : (
                            cargosExibidos.map((cargo) => (
                                <tr key={cargo.id} className="hover:bg-brand-800/80 transition-all duration-200 group">
                                    <td className="py-4 px-6 align-middle">
                                        {editingId === cargo.id ? (
                                            <input autoFocus value={editData.nome ?? ''} onChange={e => setEditData(d => ({ ...d, nome: e.target.value }))}
                                                className="bg-brand-900 border border-brand-400 rounded-lg px-3 py-1.5 text-brand-100 text-sm outline-none focus:ring-2 focus:ring-brand-400 w-full max-w-[200px]" />
                                        ) : (
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-brand-900 border border-brand-500/30 flex items-center justify-center text-brand-100 font-black group-hover:scale-110 transition-transform shadow-md">{cargo.nome.charAt(0)}</div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-brand-100">{cargo.nome}</span>
                                                    <span className="text-[10px] text-brand-400 font-medium tracking-wider uppercase">SLUG: {cargo.slug}</span>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 align-middle">
                                        {editingId === cargo.id ? (
                                            <select value={editData.nivel ?? ''} onChange={e => setEditData(d => ({ ...d, nivel: e.target.value }))}
                                                className="bg-brand-900 border border-brand-400 rounded-lg px-3 py-1.5 text-brand-100 text-sm outline-none">
                                                {NIVEIS_HIERARQUICOS.map(n => <option key={n.slug} value={n.slug}>{n.nome}</option>)}
                                            </select>
                                        ) : (
                                            <div className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest bg-brand-100 text-brand-900 shadow-sm">
                                                {NIVEIS_HIERARQUICOS.find(n => n.slug === cargo.nivel)?.nome || cargo.nivel}
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 align-middle">
                                        {editingId === cargo.id ? (
                                            <select value={editData.setor_slug ?? ''} onChange={e => setEditData(d => ({ ...d, setor_slug: e.target.value }))}
                                                className="bg-brand-900 border border-brand-400 rounded-lg px-3 py-1.5 text-brand-100 text-sm outline-none">
                                                {setoresDisponiveis.map(s => <option key={s.id} value={s.slug}>{s.nome}</option>)}
                                            </select>
                                        ) : (
                                            <span className="text-xs font-bold text-brand-300">
                                                {setoresDisponiveis.find(s => s.slug === cargo.setor_slug)?.nome || cargo.setor_slug}
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 align-middle text-right">
                                        {editingId === cargo.id ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => confirmEdit(cargo.id)} disabled={loadingId === cargo.id} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-green-400 bg-green-500/10 hover:bg-green-500/20 rounded-lg transition-colors disabled:opacity-50">
                                                    <Check className="w-3.5 h-3.5" /> Salvar
                                                </button>
                                                <button onClick={cancelEdit} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-brand-400 hover:text-brand-100 bg-brand-500/10 rounded-lg transition-colors">
                                                    <X className="w-3.5 h-3.5" /> Cancelar
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="relative group/dropdown inline-block">
                                                <button className="p-2 hover:bg-brand-500/20 rounded-lg text-brand-400 hover:text-brand-100 transition-colors"><MoreVertical className="w-5 h-5" /></button>
                                                <div className="absolute right-0 top-full mt-1 hidden group-hover/dropdown:flex flex-col bg-brand-900 border border-brand-500/30 rounded-xl shadow-2xl z-50 w-36 overflow-hidden">
                                                    <button onClick={() => startEdit(cargo)} className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-brand-100 hover:bg-brand-800 transition-colors text-left w-full">
                                                        <Pencil className="w-4 h-4" /> Editar
                                                    </button>
                                                    <button onClick={() => handleDelete(cargo.id)} disabled={loadingId === cargo.id} className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors text-left w-full border-t border-brand-500/20 disabled:opacity-50">
                                                        <Trash2 className="w-4 h-4" /> Excluir
                                                    </button>
                                                </div>
                                            </div>
                                        )}
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