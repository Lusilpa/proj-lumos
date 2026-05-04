"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CURRENT_MOCK_USER } from "@/data/mockUsers";
import { Toaster } from "react-hot-toast";
import { LayoutGrid, Users, LogOut, Briefcase, FileSignature, Network, Bot } from "lucide-react";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const cargosPermitidosAdmin = ["auxiliar", "analista", "gerente", "supervisor"];
  const departamentosPermitidosAdmin = ["rh", "dp", "ti"];

  const isUserAdmin =
    cargosPermitidosAdmin.includes(CURRENT_MOCK_USER.cargo) &&
    departamentosPermitidosAdmin.includes(CURRENT_MOCK_USER.departamento);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-brand-900 text-brand-100 font-sans selection:bg-brand-400/30">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#2d1a0d',
            color: '#ede8d0',
            border: '1px solid #b3826c40',
            fontWeight: 'bold',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#68BA7F', secondary: '#2d1a0d' } },
        }}
      />

      {/* ======================================================= */}
      {/* TOPBAR GLOBAL (De ponta a ponta)      */}
      {/* ======================================================= */}
      <header className="h-16 w-full flex items-center justify-center px-6 border-b border-brand-500/30 bg-brand-900/80 backdrop-blur-xl shrink-0 z-20">
        <div className="text-sm font-medium text-brand-400 tracking-wider uppercase">
          Laboratório Lupa - Repositório de Código
        </div>
      </header>


      {/* ======================================================= */}
      {/* CONTAINER INFERIOR (Sidebar + Área de Conteúdo)         */}
      {/* ======================================================= */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="w-64 border-r border-brand-500/30 flex flex-col justify-between bg-brand-900/40 backdrop-blur-xl">
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

          {/* User Footer */}
          <div className="p-4 border-t border-brand-500/30 space-y-3">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center shrink-0 border border-brand-500/40">
                <span className="font-bold text-sm text-brand-100">
                  {CURRENT_MOCK_USER.nome.charAt(0)}
                </span>
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold truncate text-brand-100">{CURRENT_MOCK_USER.nome}</span>
                <span className="text-xs text-brand-400 truncate capitalize">
                  {CURRENT_MOCK_USER.cargo} · {CURRENT_MOCK_USER.departamento}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Link
                href="/login"
                className="flex-1 flex justify-center items-center py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                title="Sair do Portal"
              >
                <LogOut className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}