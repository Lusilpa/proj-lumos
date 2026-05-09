import { Lock } from "lucide-react";
import { DocumentCard } from "@/components/DocumentCard";
import type { Documento } from "@/types";

interface GridCardsProps {
    exibidos: Documento[];
    setDocModal: (doc: Documento | null) => void;
    setChatDoc: (doc: Documento | null) => void;
    setChatMessages: React.Dispatch<React.SetStateAction<{ role: 'user' | 'ai', text: string }[]>>;
}

export function GridCards({ exibidos, setDocModal, setChatDoc, setChatMessages }: GridCardsProps) {
    return (
        <>
            {exibidos.length === 0 ? (
                <div className="flex flex-col items-center justify-center flex-1 text-center border-2 border-dashed border-brand-500/30 rounded-2xl p-12 bg-brand-500/5">
                    <div className="w-16 h-16 bg-brand-500/20 rounded-full flex items-center justify-center mb-4">
                        <Lock className="w-8 h-8 text-brand-400" />
                    </div>
                    <h3 className="text-lg font-medium text-brand-100">Nenhum documento encontrado</h3>
                    <p className="text-sm text-brand-400 mt-1">Você não possui permissão ou a busca não retornou resultados.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exibidos.map((doc) => (
                        <DocumentCard
                            key={doc.id}
                            doc={doc}
                            onClick={setDocModal}
                            onConsultarIA={(d) => {
                                setChatDoc(d);
                                setChatMessages([{ role: 'ai', text: `Olá! Sou o assistente do Lumos. Como posso ajudar você sobre o documento "${d.nome}"?` }]);
                            }}
                        />
                    ))}
                </div>
            )}
        </>
    );
}