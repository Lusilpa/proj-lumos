"use client";

import { useState } from "react";
import { Lock, MoreVertical, Pencil, Trash2, Check, X } from "lucide-react";
import type { Documento } from "@/types";

interface TableDocsProps {
    docsExibidos: Documento[];
    onEdit: (id: string, data: Partial<Documento>) => Promise<void>;
    onDelete: (id: string) => Promise<void>;
}

export function TableDocs({ docsExibidos, onEdit, onDelete }: TableDocsProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<Partial<Documento>>({});
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const startEdit = (doc: Documento) => {
        setEditingId(doc.id);
        setEditData({ nome: doc.nome, descricao: doc.descricao, regra_acesso: doc.regra_acesso, departamento_alvo: doc.departamento_alvo });
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
        if (!confirm("Confirma a exclusão deste documento? Esta ação é irreversível.")) return;
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
                            <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest">Identificação do Documento</th>
                            <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest w-1/3">Motor Lógico (ABAC)</th>
                            <th className="py-5 px-6 border-b border-brand-500/30 text-xs font-black text-brand-300 uppercase tracking-widest text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-500/10">
                        {docsExibidos.length === 0 ? (
                            <tr><td colSpan={3} className="py-12 text-center text-brand-400 font-medium">Nenhum documento encontrado.</td></tr>
                        ) : (
                            docsExibidos.map((doc) => (
                                <tr key={doc.id} className="hover:bg-brand-800/80 transition-all duration-200 group">
                                    <td className="py-4 px-6 align-top">
                                        {editingId === doc.id ? (
                                            <div className="flex flex-col gap-2">
                                                <input autoFocus value={editData.nome ?? ''} onChange={e => setEditData(d => ({ ...d, nome: e.target.value }))} placeholder="Nome"
                                                    className="bg-brand-900 border border-brand-400 rounded-lg px-3 py-1.5 text-brand-100 text-sm outline-none focus:ring-1 focus:ring-brand-400 w-full" />
                                                <input value={editData.descricao ?? ''} onChange={e => setEditData(d => ({ ...d, descricao: e.target.value }))} placeholder="Descrição"
                                                    className="bg-brand-900 border border-brand-500/40 rounded-lg px-3 py-1.5 text-brand-300 text-xs outline-none focus:ring-1 focus:ring-brand-400 w-full" />
                                                <input value={editData.departamento_alvo ?? ''} onChange={e => setEditData(d => ({ ...d, departamento_alvo: e.target.value }))} placeholder="Departamento alvo"
                                                    className="bg-brand-900 border border-brand-500/40 rounded-lg px-3 py-1.5 text-brand-300 text-xs outline-none focus:ring-1 focus:ring-brand-400 w-full" />
                                            </div>
                                        ) : (
                                            <div className="flex flex-col gap-1">
                                                <span className="font-bold text-brand-100 text-sm">{doc.nome}</span>
                                                <span className="text-xs text-brand-300 mb-2">{doc.descricao}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] text-brand-400 font-medium tracking-wider uppercase">Atualizado: {doc.data_ultima_atualizacao}</span>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 align-top bg-brand-900/20">
                                        {editingId === doc.id ? (
                                            <input value={editData.regra_acesso ?? ''} onChange={e => setEditData(d => ({ ...d, regra_acesso: e.target.value }))} placeholder="Ex: cargo == 'gerente'"
                                                className="bg-brand-900 border border-brand-400 rounded-lg px-3 py-1.5 text-brand-100 font-mono text-xs outline-none focus:ring-1 focus:ring-brand-400 w-full" />
                                        ) : (
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-brand-900 border border-brand-500/40 text-brand-100 uppercase tracking-widest">{doc.departamento_alvo}</div>
                                                    {doc.cargos_permitidos.map((c: string) => (
                                                        <div key={c} className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-black bg-brand-100 text-brand-900 uppercase tracking-widest">{c}</div>
                                                    ))}
                                                </div>
                                                <div className="flex gap-2 p-2 bg-brand-900 rounded-lg border border-brand-500/30 shadow-inner">
                                                    <Lock className="w-3 h-3 text-brand-400 shrink-0 mt-0.5" />
                                                    <code className="text-[10px] font-mono text-brand-300 break-all">{doc.regra_acesso || "Sem regra definida"}</code>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 align-top text-right">
                                        {editingId === doc.id ? (
                                            <div className="flex items-center justify-end gap-2 mt-1">
                                                <button onClick={() => confirmEdit(doc.id)} disabled={loadingId === doc.id} className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-green-400 bg-green-500/10 hover:bg-green-500/20 rounded-lg transition-colors disabled:opacity-50">
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
                                                    <button onClick={() => startEdit(doc)} className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-brand-100 hover:bg-brand-800 transition-colors text-left w-full">
                                                        <Pencil className="w-4 h-4" /> Editar
                                                    </button>
                                                    <button onClick={() => handleDelete(doc.id)} disabled={loadingId === doc.id} className="flex items-center gap-2 px-4 py-3 text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors text-left w-full border-t border-brand-500/20 disabled:opacity-50">
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