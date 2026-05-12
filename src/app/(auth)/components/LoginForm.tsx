"use client";

import { useState } from "react";
import { LogIn, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

export default function LoginForm() {
    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const { login, isLoading } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        setCpf(value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (cpf.length < 14) {
            toast.error("CPF incompleto.");
            return;
        }

        if (!senha) {
            toast.error("Preencha a senha (email).");
            return;
        }

        setIsSubmitting(true);
        const success = await login(cpf, senha);
        setIsSubmitting(false);

        if (!success) {
            toast.error("Credenciais inválidas ou usuário não encontrado.");
        } else {
            toast.success("Autenticado com sucesso!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
                <label className="block text-xs font-bold text-brand-300 uppercase tracking-widest mb-2">Seu CPF</label>
                <input
                    type="text"
                    value={cpf}
                    onChange={handleCpfChange}
                    placeholder="000.000.000-00"
                    maxLength={14}
                    className="w-full px-5 py-4 rounded-xl bg-brand-900/60 border border-brand-500/30 text-brand-100 placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100/50 focus:border-brand-100 transition-all font-mono tracking-wider shadow-inner"
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-brand-300 uppercase tracking-widest mb-2">Senha de Acesso</label>
                <input
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-5 py-4 rounded-xl bg-brand-900/60 border border-brand-500/30 text-brand-100 placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100/50 focus:border-brand-100 transition-all tracking-widest shadow-inner"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading || isSubmitting}
                className="mt-4 bg-brand-100 text-brand-900 flex items-center justify-center gap-3 font-black uppercase tracking-widest p-4 rounded-xl hover:bg-brand-50 hover:scale-[1.02] transition-all shadow-lg hover:shadow-brand-100/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
                {(isLoading || isSubmitting) ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <LogIn className="w-5 h-5" />
                )}
                Autenticar Identidade
            </button>
        </form>
    );
}