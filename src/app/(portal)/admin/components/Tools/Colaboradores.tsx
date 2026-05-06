import { Search, UserCircle } from "lucide-react";
import { MOCK_SETORES } from "@/data/mockSetores";

export function ToolsColaboradores({
    searchQuery,
    setSearchQuery,
    filterSetor,
    setFilterSetor,
    setIsModalOpen
}: {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    filterSetor: string;
    setFilterSetor: (filter: string) => void;
    setIsModalOpen: (open: boolean) => void;
}) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1 max-w-2xl">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-brand-400" />
                </div>
                <input
                    type="text"
                    placeholder="Filtrar por nome, email, cargo ou departamento..."
                    className="block w-full pl-12 pr-4 py-4 border border-brand-500/30 rounded-2xl leading-5 bg-brand-800/60 text-brand-100 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-300 transition-all duration-300 sm:text-sm shadow-inner backdrop-blur-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Filtro de Setor */}
            <div className="sm:w-64">
                <select
                    value={filterSetor}
                    onChange={(e) => setFilterSetor(e.target.value)}
                    className="block w-full px-4 py-4 border border-brand-500/30 rounded-2xl leading-5 bg-brand-800/60 text-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-300 transition-all duration-300 sm:text-sm appearance-none cursor-pointer shadow-inner backdrop-blur-md"
                    style={{ backgroundImage: 'url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3E%3Cpath stroke=\'%23FFFFFF\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'m6 8 4 4 4-4\'/%3E%3C/svg%3E")', backgroundPosition: 'right 1rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em' }}
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

            {/* Botão de adicionar colaborador */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-4 bg-brand-100 text-brand-900 font-black uppercase tracking-wider text-xs rounded-2xl hover:bg-brand-300 transition-colors shadow-lg hover:shadow-brand-50/10 flex items-center justify-center gap-2"
            >
                <UserCircle className="w-4 h-4" />
                Novo Colaborador
            </button>
        </div>
    );
}