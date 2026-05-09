import { FileText } from "lucide-react";
import type { Documento } from "@/types";

interface DocumentCardProps {
  doc: Documento;
  onClick: (doc: Documento) => void;
  onConsultarIA?: (doc: Documento) => void;
}

export function DocumentCard({ doc, onClick, onConsultarIA }: DocumentCardProps) {
  return (
    <article
      onClick={() => onClick(doc)}
      className="bg-brand-800 rounded-3xl overflow-hidden border border-brand-500/30 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-400/10 hover:border-brand-400/60 group flex flex-col cursor-pointer backdrop-blur-md"
    >
      <div className="flex flex-col grow px-6 pb-6 pt-6 relative z-10">

        {/* Categoria / Setor */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-brand-400 font-bold text-xs uppercase tracking-widest">
            {doc.departamento_alvo}
          </span>
        </div>

        {/* Título */}
        <h3 className="text-xl font-black text-brand-100 mb-4 leading-tight uppercase line-clamp-2 group-hover:text-brand-400 transition-colors">
          {doc.nome}
        </h3>

        {/* Metadados e Divisor Horizontal */}
        <div className="mb-4 pb-4 border-b border-brand-500/30 flex flex-wrap gap-x-4 gap-y-2 text-[10px] font-black text-brand-400/80 uppercase tracking-widest">
          <div className="flex items-center gap-1">🗓️ última atualização em {doc.data_ultima_atualizacao}</div>
        </div>

        {/* Descrição */}
        <p className="text-xs text-brand-400 mb-6 line-clamp-3 leading-relaxed flex-1">
          {doc.descricao}
        </p>

        {/* Botões Ação */}
        <div className="flex flex-col gap-2 mt-auto">
          <button
            className="w-full flex items-center justify-center py-3 bg-brand-500/20 hover:bg-brand-500/40 text-brand-100 font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-xl transition-colors border border-brand-500/50"
          >
            Ler Protocolo
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onConsultarIA) {
                onConsultarIA(doc);
              } else {
                alert("Integração com Agente IA não configurada.");
              }
            }}
            className="w-full flex items-center justify-center py-3 bg-brand-100 hover:bg-brand-300 text-brand-900 font-bold text-[10px] sm:text-xs uppercase tracking-wider rounded-xl transition-colors border border-transparent shadow-md"
          >
            Consultar Agente de IA
          </button>
        </div>
      </div>
    </article>
  );
}
