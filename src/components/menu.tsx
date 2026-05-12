import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutGrid, Bot, Users, Briefcase, Network, FileSignature } from "lucide-react";

export function Menu() {
    const pathname = usePathname();
    const { user } = useAuth();

    const cargosPermitidosAdmin = ["auxiliar", "analista", "gerente", "supervisor"];
    const departamentosPermitidosAdmin = ["rh", "dp", "ti"];

    const isUserAdmin =
        cargosPermitidosAdmin.includes(user?.cargo ?? '') &&
        departamentosPermitidosAdmin.includes(user?.departamento ?? '');

    return (
        <div>
            {/* Menu Principal */}
            <nav className="p-4 space-y-1">
                <Link
                    href="/documentos"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === "/documentos"
                        ? "bg-brand-500/40 text-brand-100"
                        : "text-brand-400 hover:text-brand-100 hover:bg-brand-500/20"
                        }`}
                >
                    <LayoutGrid className={`w-4 h-4 ${pathname === "/documentos" ? "text-brand-100" : ""}`} />
                    Base de Conhecimento
                </Link>

                <Link
                    href="/agente"
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${pathname === "/agente"
                        ? "bg-brand-500/40 text-brand-100"
                        : "text-brand-400 hover:text-brand-100 hover:bg-brand-500/20"
                        }`}
                >
                    <Bot className={`w-4 h-4 ${pathname === "/agente" ? "text-brand-100" : ""}`} />
                    Consultar Agente de IA
                </Link>

                {isUserAdmin && (
                    <>
                        <div className="pt-6 pb-2 px-3">
                            <p className="text-[10px] font-black text-brand-400 uppercase tracking-widest opacity-80">⚙️ Gestão Lupa</p>
                        </div>

                        <Link href="/admin/colaboradores" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${pathname.includes("/admin/colaboradores") ? "bg-brand-500/40 text-brand-100 shadow-inner" : "text-brand-400 hover:text-brand-100 hover:bg-brand-500/20"}`}>
                            <Users className="w-4 h-4" />
                            Colaboradores
                        </Link>

                        <Link href="/admin/setores" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${pathname.includes("/admin/setores") ? "bg-brand-500/40 text-brand-100 shadow-inner" : "text-brand-400 hover:text-brand-100 hover:bg-brand-500/20"}`}>
                            <Briefcase className="w-4 h-4" />
                            Setores
                        </Link>

                        <Link href="/admin/cargos" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${pathname.includes("/admin/cargos") ? "bg-brand-500/40 text-brand-100 shadow-inner" : "text-brand-400 hover:text-brand-100 hover:bg-brand-500/20"}`}>
                            <Network className="w-4 h-4" />
                            Cargos
                        </Link>

                        <Link href="/admin/documentos" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${pathname.includes("/admin/documentos") ? "bg-brand-500/40 text-brand-100 shadow-inner" : "text-brand-400 hover:text-brand-100 hover:bg-brand-500/20"}`}>
                            <FileSignature className="w-4 h-4" />
                            Documentos (POPs)
                        </Link>
                    </>
                )}
            </nav>
        </div>
    )
}