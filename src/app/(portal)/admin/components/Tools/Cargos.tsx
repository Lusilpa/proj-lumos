import { Search, Plus } from "lucide-react";
import { MOCK_SETORES } from "@/data/mockSetores";

export function ToolsCargos({
    searchQuery,
    setSearchQuery,
    selectedSetorFilter,
    setSelectedSetorFilter,
    setIsModalOpen
}: {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedSetorFilter: string;
    setSelectedSetorFilter: (filter: string) => void;
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
                    placeholder="Filtrar por nome ou slug do cargo..."
                    className="block w-full pl-12 pr-4 py-4 border border-brand-500/30 rounded-2xl leading-5 bg-brand-800/60 text-brand-100 placeholder-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-300 transition-all duration-300 sm:text-sm shadow-inner backdrop-blur-md"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <select
                value={selectedSetorFilter}
                onChange={e => setSelectedSetorFilter(e.target.value)}
                className="px-4 py-4 bg-brand-800/60 border border-brand-500/30 rounded-2xl text-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50 sm:text-sm backdrop-blur-md"
            >
                <option value="">Todos os Departamentos</option>
                {MOCK_SETORES.map(s => <option key={s.id} value={s.slug}>{s.nome}</option>)}
            </select>

            <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-4 bg-brand-100 text-brand-900 font-black uppercase tracking-wider text-xs rounded-2xl hover:bg-brand-300 transition-colors shadow-lg hover:shadow-brand-50/10 flex items-center justify-center gap-2"
            >
                <Plus className="w-4 h-4" />
                Novo Cargo
            </button>
        </div>
    )
}