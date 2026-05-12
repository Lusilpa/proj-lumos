"use client";

import { useState } from "react";
import { MoreVertical, Pencil, Trash2, Check, X } from "lucide-react";
import type { Setor } from "@/types";

interface TableSetoresProps {
    setoresExibidos: Setor[];
    onEdit: (id: string, nome: string) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export function TableSetores({ setoresExibidos, onEdit, onDelete }: TableSetoresProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editNome, setEditNome] = useState("");
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const startEdit = (setor: Setor) => {
        setEditingId(setor.id);
        setEditNome(setor.nome);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditNome("");
    };

    const confirmEdit = async (id: string) => {
        if (!editNome.trim()) return;
        setLoadingId(id);
        await onEdit(id, editNome.trim());
        setLoadingId(null);
        setEditingId(null);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Confirma a exclusão deste setor? Esta ação é irreversível.")) return;
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
                            <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest">Departamento</th>
                            <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest">Identificador Lógico (Slug)</th>
                            <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-500/10">
                        {setoresExibidos.length === 0 ? (
                            <tr><td colSpan={3} className="py-12 text-center text-brand-400 font-medium">Nenhum setor encontrado.</td></tr>
                        ) : (
                            setoresExibidos.map((setor) => (
                                <tr key={setor.id} className="hover:bg-brand-800/80 transition-all duration-200 group">
                                    <td className="py-4 px-6 align-middle">
                                        {editingId === setor.id ? (
                                            <input
                                                autoFocus
                                                value={editNome}
                                                onChange={e => setEditNome(e.target.value)}
                                                className="bg-brand-900 border border-brand-400 rounded-lg px-3 py-1.5 text-brand-100 text-sm outline-none focus:ring-2 focus:ring-brand-400 w-full max-w-[200px]"
                                                onKeyDown={e => e.key === 'Escape' && cancelEdit()}
                                            />
                                        ) : (
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-brand-900 border border-brand-500/30 flex items-center justify-center text-brand-100 font-black group-hover:scale-110 transition-transform shadow-md">
                                                    {setor.nome.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-brand-100">{setor.nome}</span>
                                                    <span className="text-[10px] text-brand-400 font-medium tracking-wider uppercase">ID: {setor.id}</span>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 align-middle">
                                        <div className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brand-900 border border-brand-500/40 text-brand-100 shadow-sm">
                                            {setor.slug}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 align-middle text-right">
                                        {editingId === setor.id ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => confirmEdit(setor.id)} disabled={loadingId === setor.id} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-green-400 bg-green-500/10 hover:bg-green-500/20 rounded-lg transition-colors disabled:opacity-50">
                                                    <Check className="w-3.5 h-3.5" /> Salvar
                                                </button>
                                                <button onClick={cancelEdit} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-brand-400 hover:text-brand-100 bg-brand-500/10 rounded-lg transition-colors">
                                                    <X className="w-3.5 h-3.5" /> Cancelar
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="relative group/dropdown inline-block">
                                                <button className="p-2 hover:bg-brand-500/20 rounded-lg text-brand-400 hover:text-brand-100 transition-colors">
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                                <div className="absolute right-0 top-full mt-1 hidden group-hover/dropdown:flex flex-col bg-brand-900 border border-brand-500/30 rounded-xl shadow-2xl z-50 w-36 overflow-hidden">
                                                    <button onClick={() => startEdit(setor)} className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-brand-100 hover:bg-brand-800 transition-colors text-left w-full">
                                                        <Pencil className="w-4 h-4" /> Editar
                                                    </button>
                                                    <button onClick={() => handleDelete(setor.id)} disabled={loadingId === setor.id} className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors text-left w-full border-t border-brand-500/20 disabled:opacity-50">
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