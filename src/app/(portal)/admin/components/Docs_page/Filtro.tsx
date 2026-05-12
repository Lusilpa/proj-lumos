"use client";

import { Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { MOCK_SETORES } from "@/data/mockSetores";

interface FiltroAgenteProps {
    search: string;
    setSearch: (value: string) => void;
    setorFilter: string;
    setSetorFilter: (value: string) => void;
}

export function FiltroAgente({ search, setSearch, setorFilter, setSetorFilter }: FiltroAgenteProps) {
    const { user } = useAuth();
    return (
        <>
            {/* Cabeçalho da Página */}
            <div className="flex flex-col gap-2 mb-8">
                <h1 className="text-3xl font-bold tracking-tight text-brand-100">Meus Documentos Liberados</h1>
                <p className="text-brand-400">
                    Exibindo protocolos permitidos para <strong className="text-brand-400 brightness-150">{user?.cargo}</strong> do departamento de <strong className="text-brand-400 brightness-150">{user?.departamento}</strong>.
                </p>
            </div>

            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 max-w-3xl">
                {/* Barra de Busca */}
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-brand-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar documentos (POPs)... [Ctrl + K]"
                        className="block w-full pl-10 pr-3 py-3 border border-brand-500/50 rounded-xl leading-5 bg-brand-900/80 text-brand-100 placeholder-brand-500/80 focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400 transition-all duration-300 sm:text-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Filtro de Setor */}
                <div className="sm:w-64">
                    <select
                        value={setorFilter}
                        onChange={(e) => setSetorFilter(e.target.value)}
                        className="block w-full px-4 py-3 border border-brand-500/50 rounded-xl leading-5 bg-brand-900/80 text-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-400/50 focus:border-brand-400 transition-all duration-300 sm:text-sm appearance-none cursor-pointer"
                        style={{ backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%2368BA7F\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right .8rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
                    >
                        <option value="Todos" className="bg-brand-900 text-brand-100">
                            Todos os Setores
                        </option>
                        {MOCK_SETORES.map(setor => (
                            <option key={setor.id} value={setor.slug} className="bg-brand-900 text-brand-100">
                                {setor.nome}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </>
    );
}