"use client";

import { useState, useEffect } from "react";
import { CURRENT_MOCK_USER } from "@/data/mockUsers";
import { MOCK_DOCS } from "@/data/mockDocs";
import { checkAccess } from "@/lib/abac/engine";
import { Bot, Send, Loader2, ShieldCheck } from "lucide-react";

export default function AgentePage() {
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Filtra apenas o que o usuário tem acesso (Motor ABAC)
  const acessiveis = MOCK_DOCS.filter((doc) =>
    checkAccess(doc.regra_acesso, CURRENT_MOCK_USER, doc.cargos_permitidos)
  );

  useEffect(() => {
    // Initial welcome message
    setChatMessages([
      {
        role: 'ai',
        text: `Olá, ${CURRENT_MOCK_USER.nome}! Sou o Agente Lumos.\n\nFui configurado com conceitos de Algebra Booleana para responder perguntas *exclusivamente* sobre os ${acessiveis.length} documentos aos quais o cargo de ${CURRENT_MOCK_USER.cargo} (${CURRENT_MOCK_USER.departamento}) tem permissão de leitura.\n\nComo posso ajudar hoje?`
      }
    ]);
  }, [acessiveis.length]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput("");
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/agente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg,
          acessiveisContext: acessiveis,
          userName: CURRENT_MOCK_USER.nome,
          userRole: CURRENT_MOCK_USER.cargo,
          userDept: CURRENT_MOCK_USER.departamento
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setChatMessages(prev => [...prev, { role: 'ai', text: data.response }]);
    } catch (error: any) {
      setChatMessages(prev => [...prev, { role: 'ai', text: `⚠️ Erro de Comunicação: ${error.message}` }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto flex flex-col h-[calc(100vh-8rem)] relative">
      <div className="flex flex-col gap-2 mb-6 shrink-0">
        <div className="flex items-center gap-3">
          <Bot className="w-8 h-8 text-brand-100" />
          <h1 className="text-3xl font-black tracking-tight text-brand-100 uppercase">Consultar Agente Lumos</h1>
        </div>
        <p className="text-brand-300 font-medium flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          Conexão Segura. Contexto restrito aos {acessiveis.length} documentos do seu nível de acesso.
        </p>
      </div>

      <div className="flex-1 bg-brand-800/40 rounded-3xl border border-brand-500/30 overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col min-h-0">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {chatMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-6 py-4 text-sm shadow-md ${msg.role === 'user'
                  ? 'bg-brand-100 text-brand-900 rounded-tr-none font-bold'
                  : 'bg-brand-900 border border-brand-500/40 text-brand-100 rounded-tl-none whitespace-pre-wrap leading-relaxed'
                }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isChatLoading && (
            <div className="flex justify-start">
              <div className="bg-brand-900 border border-brand-500/40 text-brand-100 rounded-2xl rounded-tl-none px-6 py-4 shadow-md">
                <Loader2 className="w-6 h-6 animate-spin text-brand-400" />
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-brand-500/30 bg-brand-900/60 flex gap-4 shrink-0">
          <input
            type="text"
            value={chatInput}
            onChange={e => setChatInput(e.target.value)}
            placeholder="Ex: Como é o procedimento de caixa?"
            disabled={isChatLoading}
            className="flex-1 bg-brand-800/80 border border-brand-500/50 rounded-2xl px-6 py-4 text-brand-100 placeholder-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-400/50 shadow-inner"
          />
          <button
            type="submit"
            disabled={isChatLoading || !chatInput.trim()}
            className="w-14 h-14 bg-brand-100 text-brand-900 rounded-2xl flex items-center justify-center shrink-0 hover:bg-brand-300 transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
}
