"use client";

import { useState } from "react";
import { KeyRound, Loader2, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function PrimeiroAcessoPage() {
    const { user, atualizarSenha, logout } = useAuth();
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [showSenha, setShowSenha] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (novaSenha.length < 6) {
            toast.error("A senha deve ter no mínimo 6 caracteres.");
            return;
        }
        if (novaSenha !== confirmarSenha) {
            toast.error("As senhas não coincidem.");
            return;
        }
        // Impede que o usuário reuse o email como senha
        if (novaSenha === user?.email) {
            toast.error("A nova senha não pode ser igual à senha temporária (email).");
            return;
        }

        setIsSubmitting(true);
        try {
            await atualizarSenha(novaSenha);
            toast.success("Senha definida com sucesso! Bem-vindo ao Lumos.");
        } catch {
            toast.error("Erro ao salvar a nova senha. Tente novamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-900 text-brand-100 p-4 font-sans">
            <Toaster position="top-right" toastOptions={{ style: { background: '#2d1a0d', color: '#ede8d0', border: '1px solid #b3826c40', fontWeight: 'bold' } }} />

            <div className="max-w-md w-full bg-brand-800/80 p-10 rounded-3xl border border-brand-500/20 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                {/* Barra de topo */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-900 via-brand-100 to-brand-900 opacity-50" />

                {/* Cabeçalho */}
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-brand-900 rounded-2xl border border-brand-500/40 flex items-center justify-center shadow-lg mb-5">
                        <KeyRound className="w-8 h-8 text-brand-100" />
                    </div>
                    <h1 className="text-2xl font-black uppercase tracking-widest text-brand-100 text-center">
                        Defina sua Senha
                    </h1>
                    <div className="mt-3 flex items-center gap-2 bg-brand-900/60 border border-brand-500/30 rounded-xl px-4 py-2">
                        <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                        <p className="text-xs text-amber-300 font-medium">
                            Primeiro acesso detectado. Crie uma senha pessoal para continuar.
                        </p>
                    </div>
                </div>

                {/* Info do usuário */}
                {user && (
                    <div className="mb-6 p-4 bg-brand-900/40 rounded-xl border border-brand-500/20">
                        <p className="text-xs text-brand-400 uppercase tracking-widest font-bold mb-1">Identificado como</p>
                        <p className="text-brand-100 font-bold">{user.nome}</p>
                        <p className="text-brand-400 text-xs capitalize">{user.cargo} · {user.departamento}</p>
                    </div>
                )}

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className="block text-xs font-bold text-brand-300 uppercase tracking-widest mb-2">
                            Nova Senha
                        </label>
                        <div className="relative">
                            <input
                                type={showSenha ? "text" : "password"}
                                value={novaSenha}
                                onChange={e => setNovaSenha(e.target.value)}
                                placeholder="Mínimo 6 caracteres"
                                required
                                className="w-full px-5 py-4 pr-12 rounded-xl bg-brand-900/60 border border-brand-500/30 text-brand-100 placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100/50 focus:border-brand-100 transition-all shadow-inner"
                            />
                            <button type="button" onClick={() => setShowSenha(s => !s)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-400 hover:text-brand-100 transition-colors">
                                {showSenha ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-brand-300 uppercase tracking-widest mb-2">
                            Confirmar Nova Senha
                        </label>
                        <input
                            type="password"
                            value={confirmarSenha}
                            onChange={e => setConfirmarSenha(e.target.value)}
                            placeholder="Repita a senha"
                            required
                            className="w-full px-5 py-4 rounded-xl bg-brand-900/60 border border-brand-500/30 text-brand-100 placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100/50 focus:border-brand-100 transition-all shadow-inner"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="mt-2 bg-brand-100 text-brand-900 flex items-center justify-center gap-3 font-black uppercase tracking-widest p-4 rounded-xl hover:bg-brand-50 hover:scale-[1.02] transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <KeyRound className="w-5 h-5" />}
                        Confirmar e Acessar o Portal
                    </button>
                </form>

                {/* Rodapé */}
                <div className="mt-6 pt-4 border-t border-brand-500/20 flex justify-center">
                    <button onClick={logout} className="text-[10px] text-brand-600 hover:text-brand-400 transition-colors uppercase tracking-widest">
                        Sair e usar outra conta
                    </button>
                </div>
            </div>
        </div>
    );
}
