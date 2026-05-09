import Link from "next/link";
import { LogIn } from "lucide-react";

export default function Login() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <label className="block text-xs font-bold text-brand-300 uppercase tracking-widest mb-2">Seu CPF</label>
                <input
                    type="text"
                    placeholder="000.000.000-00"
                    maxLength={14}
                    className="w-full px-5 py-4 rounded-xl bg-brand-900/60 border border-brand-500/30 text-brand-100 placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100/50 focus:border-brand-100 transition-all font-mono tracking-wider shadow-inner"
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-brand-300 uppercase tracking-widest mb-2">Senha de Acesso</label>
                <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-5 py-4 rounded-xl bg-brand-900/60 border border-brand-500/30 text-brand-100 placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100/50 focus:border-brand-100 transition-all tracking-widest shadow-inner"
                />
            </div>

            <Link href="/documentos" className="mt-4 bg-brand-100 text-brand-900 flex items-center justify-center gap-3 font-black uppercase tracking-widest p-4 rounded-xl hover:bg-brand-50 hover:scale-[1.02] transition-all shadow-lg hover:shadow-brand-100/20 active:scale-95">
                <LogIn className="w-5 h-5" />
                Autenticar Identidade
            </Link>
        </div>
    )
}