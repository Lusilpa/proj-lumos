import { Bot, X, Loader2, Send } from "lucide-react";
import type { Documento } from "@/types";

interface AgentProps {
    chatDoc: Documento | null;
    setChatDoc: (doc: Documento | null) => void;
    chatMessages: { role: 'user' | 'ai', text: string }[];
    isChatLoading: boolean;
    chatInput: string;
    setChatInput: (value: string) => void;
    handleSendMessage: (e: React.FormEvent) => void;
}

export function Agent({
    chatDoc,
    setChatDoc,
    chatMessages,
    isChatLoading,
    chatInput,
    setChatInput,
    handleSendMessage
}: AgentProps) {
    if (!chatDoc) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
                className="absolute inset-0 bg-brand-900/80 backdrop-blur-sm transition-opacity"
                onClick={() => setChatDoc(null)}
            />
            <div className="relative bg-brand-900 w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-brand-400/50 z-10">
                {/* Header IA */}
                <div className="flex items-center justify-between p-4 border-b border-brand-500/30 bg-brand-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center">
                            <Bot className="w-6 h-6 text-brand-900" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-brand-100 uppercase tracking-widest">Agente Lumos</h3>
                            <p className="text-xs text-brand-400 line-clamp-1">{chatDoc.nome}</p>
                        </div>
                    </div>
                    <button onClick={() => setChatDoc(null)} className="p-2 text-brand-400 hover:text-brand-100 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Mensagens IA */}
                <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-brand-900/50">
                    {chatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.role === 'user'
                                ? 'bg-brand-400 text-brand-900 rounded-tr-none font-medium'
                                : 'bg-brand-800 border border-brand-500/30 text-brand-100 rounded-tl-none whitespace-pre-wrap leading-relaxed'
                                }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isChatLoading && (
                        <div className="flex justify-start">
                            <div className="bg-brand-800 border border-brand-500/30 text-brand-100 rounded-2xl rounded-tl-none px-4 py-3">
                                <Loader2 className="w-5 h-5 animate-spin text-brand-400" />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Form IA */}
                <form onSubmit={handleSendMessage} className="p-4 border-t border-brand-500/30 bg-brand-800 flex gap-2">
                    <input
                        type="text"
                        value={chatInput}
                        onChange={e => setChatInput(e.target.value)}
                        placeholder="Pergunte algo sobre o documento..."
                        disabled={isChatLoading}
                        className="flex-1 bg-brand-900 border border-brand-500/50 rounded-xl px-4 py-3 text-brand-100 placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400/50"
                    />
                    <button
                        type="submit"
                        disabled={isChatLoading || !chatInput.trim()}
                        className="w-12 h-12 bg-brand-100 text-brand-900 rounded-xl flex items-center justify-center shrink-0 hover:bg-brand-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            </div>
        </div>
    );
}