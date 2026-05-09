"use client";

import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/Footer";
import { Menu } from "@/components/menu";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
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
          <Menu />

          {/* User Footer */}
          <Footer />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}