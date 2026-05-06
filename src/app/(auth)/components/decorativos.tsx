import { ShieldAlert } from "lucide-react";

export default function Detalhes() {
    return (
        <>
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
        </>
    )
}

export function Decorativos_Inicio() {
    return (
        <>
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
        </>
    )
}