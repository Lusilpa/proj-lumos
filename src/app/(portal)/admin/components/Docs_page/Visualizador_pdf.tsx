import { FileText, X, Loader2, ExternalLink, Bot } from "lucide-react";
import type { Documento } from "@/types";

interface VisualizadorPdfProps {
    docModal: Documento | null;
    setDocModal: (doc: Documento | null) => void;
    setChatDoc: (doc: Documento | null) => void;
    setChatMessages: React.Dispatch<React.SetStateAction<{ role: 'user' | 'ai', text: string }[]>>;
}

export function Visualizador_pdf({
    docModal,
    setDocModal,
    setChatDoc,
    setChatMessages
}: VisualizadorPdfProps) {
    if (!docModal) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6">
            <div className="w-full max-w-7xl h-[95vh] bg-brand-900 border border-brand-500/30 rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Cabeçalho do Modal PDF */}
                <div className="flex items-start sm:items-center justify-between p-4 sm:p-6 border-b border-brand-500/30 shrink-0 bg-brand-900/80">
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex w-12 h-12 rounded-xl bg-brand-500/20 items-center justify-center border border-brand-500/40">
                            <FileText className="w-6 h-6 text-brand-100" />
                        </div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-brand-100 leading-tight">
                                {docModal.nome}
                            </h2>
                            <div className="flex flex-wrap items-center gap-3 mt-2">
                                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-brand-500/20 text-brand-400 border border-brand-500/30">
                                    {docModal.departamento_alvo}
                                </span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setDocModal(null)}
                        className="p-2.5 rounded-xl text-brand-400 hover:text-white hover:bg-red-500/20 transition-colors ml-4"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Área Central do iframe (Leitor de PDF) */}
                <div className="flex-1 w-full bg-[#323639] relative flex flex-col items-center justify-center">
                    {docModal.fileUrl ? (
                        <iframe
                            src={`${docModal.fileUrl}#view=FitH`}
                            className="w-full h-full border-none"
                            title={`Visualizando: ${docModal.nome}`}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center bg-brand-900/40 absolute inset-0">
                            <Loader2 className="w-10 h-10 text-brand-400 animate-spin mb-4" />
                            <p className="text-brand-300 font-medium">Documento PDF Indisponível no momento.</p>
                        </div>
                    )}
                </div>

                {/* Rodapé do Modal PDF */}
                <div className="p-4 border-t border-brand-500/30 bg-brand-900/80 shrink-0 flex justify-between items-center">
                    <span className="text-xs text-brand-400/60 font-medium">
                        Acesso concedido via Motor ABAC
                    </span>
                    <div className="flex gap-3">
                        <button
                            disabled={!docModal.fileUrl}
                            onClick={() => docModal.fileUrl && window.open(docModal.fileUrl, '_blank')}
                            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${docModal.fileUrl
                                ? 'border-brand-500/50 text-brand-100 hover:bg-brand-500/20 cursor-pointer'
                                : 'border-brand-500/20 text-brand-100/30 cursor-not-allowed'
                                }`}
                        >
                            <ExternalLink className="w-4 h-4" />
                            <span className="hidden sm:inline">Nova Aba</span>
                        </button>
                        <button
                            onClick={() => {
                                const currentDoc = docModal;
                                setDocModal(null);
                                setChatDoc(currentDoc);
                                setChatMessages([{ role: 'ai', text: `Olá! Sou o assistente do Lumos. Como posso ajudar você sobre o documento "${currentDoc.nome}"?` }]);
                            }}
                            className="px-6 py-2 rounded-lg text-sm font-bold text-brand-900 bg-brand-100 hover:bg-white shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all flex items-center gap-2"
                        >
                            <Bot className="w-4 h-4" />
                            <span className="hidden sm:inline">Consultar IA sobre POP</span>
                            <span className="sm:hidden">IA</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}