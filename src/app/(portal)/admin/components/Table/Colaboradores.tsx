"use client";

import { useState } from "react";
import { Mail, Briefcase, MoreVertical, Pencil, Trash2, Check, X } from "lucide-react";
import type { User } from "@/types";

interface TableColaboradoresProps {
    colaboradoresExibidos: User[];
    setoresDisponiveis: { id: string; nome: string; slug: string }[];
    onEdit: (uid: string, data: Partial<User>) => Promise<void>;
    onDelete: (uid: string) => Promise<void>;
}

export function TableColaboradores({ colaboradoresExibidos, setoresDisponiveis, onEdit, onDelete }: TableColaboradoresProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<Partial<User>>({});
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const startEdit = (user: User) => {
        setEditingId(user.uid);
        setEditData({ nome: user.nome, email: user.email, departamento: user.departamento, cargo: user.cargo });
    };
    const cancelEdit = () => { setEditingId(null); setEditData({}); };

    const confirmEdit = async (uid: string) => {
        if (!editData.nome?.trim()) return;
        setLoadingId(uid);
        await onEdit(uid, editData);
        setLoadingId(null);
        setEditingId(null);
    };

    const handleDelete = async (uid: string) => {
        if (!confirm("Confirma a exclusão deste colaborador? Esta ação é irreversível.")) return;
        setLoadingId(uid);
        await onDelete(uid);
        setLoadingId(null);
    };

    return (
        <div className="bg-brand-800/40 rounded-3xl border border-brand-500/20 overflow-hidden shadow-2xl backdrop-blur-xl flex-1">
            <div className="overflow-x-auto h-full min-h-[300px]">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-brand-900/80 sticky top-0 z-10 backdrop-blur-md">
                        <tr>
                            <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest">Identificação</th>
                            <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest">Contato</th>
                            <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest">Atuação Estratégica</th>
                            <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-500/10">
                        {colaboradoresExibidos.length === 0 ? (
                            <tr><td colSpan={4} className="py-12 text-center text-brand-400 font-medium">Nenhum colaborador encontrado com os filtros atuais.</td></tr>
                        ) : (
                            colaboradoresExibidos.map((user) => (
                                <tr key={user.uid} className="hover:bg-brand-800/80 transition-all duration-200 group">
                                    <td className="py-4 px-6 align-middle">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-brand-900 border border-brand-500/30 flex items-center justify-center text-brand-100 font-black group-hover:scale-110 transition-transform shadow-md">
                                                {user.nome.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                {editingId === user.uid ? (
                                                    <input autoFocus value={editData.nome ?? ''} onChange={e => setEditData(d => ({ ...d, nome: e.target.value }))}
                                                        className="bg-brand-900 border border-brand-400 rounded-lg px-3 py-1 text-brand-100 text-sm outline-none focus:ring-1 focus:ring-brand-400 max-w-[180px]" />
                                                ) : (
                                                    <span className="font-bold text-brand-100">{user.nome}</span>
                                                )}
                                                <span className="text-[10px] text-brand-400 font-medium tracking-wider uppercase">CPF: ***.{user.cpf.substring(4, 11)}-**</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 align-middle">
                                        {editingId === user.uid ? (
                                            <input value={editData.email ?? ''} onChange={e => setEditData(d => ({ ...d, email: e.target.value }))}
                                                className="bg-brand-900 border border-brand-400 rounded-lg px-3 py-1 text-brand-100 text-sm outline-none focus:ring-1 focus:ring-brand-400 w-full max-w-[200px]" />
                                        ) : (
                                            <div className="flex items-center gap-2 text-sm text-brand-100">
                                                <Mail className="w-4 h-4 text-brand-400" />{user.email}
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 align-middle">
                                        {editingId === user.uid ? (
                                            <div className="flex flex-col gap-2">
                                                <select value={editData.departamento ?? ''} onChange={e => setEditData(d => ({ ...d, departamento: e.target.value }))}
                                                    className="bg-brand-900 border border-brand-400 rounded-lg px-3 py-1 text-brand-100 text-sm outline-none">
                                                    {setoresDisponiveis.map(s => <option key={s.id} value={s.slug}>{s.nome}</option>)}
                                                </select>
                                                <input value={editData.cargo ?? ''} onChange={e => setEditData(d => ({ ...d, cargo: e.target.value }))} placeholder="Cargo"
                                                    className="bg-brand-900 border border-brand-400 rounded-lg px-3 py-1 text-brand-100 text-sm outline-none" />
                                            </div>
                                        ) : (
                                            <div className="flex flex-wrap items-center gap-2">
                                                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black bg-brand-900 border border-brand-500/40 text-brand-100 uppercase tracking-widest shadow-sm">
                                                    <Briefcase className="w-3 h-3 text-brand-300" />{user.departamento}
                                                </div>
                                                <div className="inline-flex items-center px-3 py-1 rounded-lg text-[10px] font-black bg-brand-100 text-brand-900 uppercase tracking-widest shadow-sm">
                                                    {user.cargo}
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 align-middle text-right">
                                        {editingId === user.uid ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => confirmEdit(user.uid)} disabled={loadingId === user.uid} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-green-400 bg-green-500/10 hover:bg-green-500/20 rounded-lg transition-colors disabled:opacity-50">
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
                                                    <button onClick={() => startEdit(user)} className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-brand-100 hover:bg-brand-800 transition-colors text-left w-full">
                                                        <Pencil className="w-4 h-4" /> Editar
                                                    </button>
                                                    <button onClick={() => handleDelete(user.uid)} disabled={loadingId === user.uid} className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors text-left w-full border-t border-brand-500/20 disabled:opacity-50">
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
