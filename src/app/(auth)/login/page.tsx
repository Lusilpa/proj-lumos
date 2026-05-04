import Link from "next/link";
import { ShieldAlert, LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-900 text-brand-100 p-4 font-sans selection:bg-brand-500/30">
      <div className="max-w-md w-full bg-brand-800/80 p-10 rounded-3xl border border-brand-500/20 shadow-2xl backdrop-blur-xl relative overflow-hidden">

        {/* Detalhe estético */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-900 via-brand-100 to-brand-900 opacity-50" />

        <div className="flex flex-col items-center mb-10 mt-2">
          <div className="w-16 h-16 bg-brand-900 rounded-2xl border border-brand-500/40 flex items-center justify-center shadow-lg mb-6">
            <ShieldAlert className="w-8 h-8 text-brand-100" />
          </div>
          <h1 className="text-3xl font-black uppercase tracking-widest text-brand-100">Lumos</h1>
          <p className="text-sm font-medium text-brand-300 mt-2 text-center uppercase tracking-wider">
            Laboratório Lupa <br /> Acesso Restrito
          </p>
        </div>

        {/* Formulário Real */}
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

        <div className="mt-8 text-center border-t border-brand-500/20 pt-6">
          <p className="text-[10px] text-brand-400 font-medium uppercase tracking-widest">
            Uso exclusivo de colaboradores ativos.<br />Dúvidas? Procure o setor de Recursos Humanos.
          </p>
        </div>
      </div>
    </div>
  );
}
