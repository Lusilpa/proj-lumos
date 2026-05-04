"use client";

import { useState } from "react";
import { CURRENT_MOCK_USER } from "@/data/mockUsers";
import { MOCK_DOCS } from "@/data/mockDocs";
import { MOCK_SETORES } from "@/data/mockSetores";
import { checkAccess } from "@/lib/abac/engine";
import { Search, FileText, Lock, X, ExternalLink, Bot, Send, Loader2 } from "lucide-react";
import { DocumentCard } from "@/components/DocumentCard";
import type { Documento } from "@/types";

export default function DocumentosPage() {
  const [search, setSearch] = useState("");
  const [docModal, setDocModal] = useState<Documento | null>(null);
  const [setorFilter, setSetorFilter] = useState("Todos");

  // Estados do Chat IA
  const [chatDoc, setChatDoc] = useState<Documento | null>(null);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !chatDoc) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput("");
    setIsChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMsg, docContext: chatDoc }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setChatMessages(prev => [...prev, { role: 'ai', text: data.response }]);
    } catch (error: any) {
      setChatMessages(prev => [...prev, { role: 'ai', text: `⚠️ Erro: ${error.message}` }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Filtro ABAC
  const acessiveis = MOCK_DOCS.filter((doc) =>
    checkAccess(doc.regra_acesso, CURRENT_MOCK_USER, doc.cargos_permitidos)
  );

  // Filtro de Busca Local e Setor
  const exibidos = acessiveis.filter((doc) => {
    const matchBusca = doc.nome.toLowerCase().includes(search.toLowerCase()) || doc.descricao.toLowerCase().includes(search.toLowerCase());
    const matchSetor = setorFilter === "Todos" || doc.departamento_alvo.toLowerCase() === setorFilter.toLowerCase();
    return matchBusca && matchSetor;
  });

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full relative">

      {/* Cabeçalho da Página */}
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-brand-100">Meus Documentos Liberados</h1>
        <p className="text-brand-400">
          Exibindo protocolos permitidos para <strong className="text-brand-400 brightness-150">{CURRENT_MOCK_USER.cargo}</strong> do departamento de <strong className="text-brand-400 brightness-150">{CURRENT_MOCK_USER.departamento}</strong>.
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

      {/* Grid de Cards */}
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

      {/* ========================================================= */}
      {/* MODAL DE VISUALIZAÇÃO DE PDF                              */}
      {/* ========================================================= */}
      {docModal && (
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
      )}

      {/* ========================================================= */}
      {/* MODAL DO AGENTE DE IA                                     */}
      {/* ========================================================= */}
      {chatDoc && (
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
      )}

    </div>
  );
}