"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { checkAccess } from "@/lib/abac/engine";
import { Search, FileText, Lock, X, ExternalLink, Bot, Send, Loader2 } from "lucide-react";
import { DocumentCard } from "@/components/DocumentCard";
import type { Documento } from "@/types";
import { FiltroAgente } from "../admin/components/Docs_page/Filtro";
import { Agent } from "../admin/components/Docs_page/Agente";
import { Visualizador_pdf } from "../admin/components/Docs_page/Visualizador_pdf";
import { documentoService } from "@/lib/services/documentos.service";
import { GridCards } from "../admin/components/Docs_page/GridCards";

export default function DocumentosPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [docModal, setDocModal] = useState<Documento | null>(null);
  const [setorFilter, setSetorFilter] = useState("Todos");
  const [localDocs, setLocalDocs] = useState<Documento[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Estados do Chat IA
  const [chatDoc, setChatDoc] = useState<Documento | null>(null);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await documentoService.getDocumentos();
        setLocalDocs(data);
      } catch (error) {
        console.error("Erro ao buscar documentos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);
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

  // Filtro ABAC — só executa se o usuário já foi hidratado pelo contexto
  const acessiveis = user ? localDocs.filter((doc) => checkAccess(doc, user)) : [];

  // Filtro de Busca Local e Setor
  const exibidos = acessiveis.filter((doc) => {
    const matchBusca = doc.nome.toLowerCase().includes(search.toLowerCase()) || doc.descricao.toLowerCase().includes(search.toLowerCase());
    const matchSetor = setorFilter === "Todos" || doc.departamento_alvo.toLowerCase() === setorFilter.toLowerCase();
    return matchBusca && matchSetor;
  });

  return (
    <div className="max-w-6xl mx-auto flex flex-col h-full relative">

      {/* Filtros */}
      <FiltroAgente
        search={search}
        setSearch={setSearch}
        setorFilter={setorFilter}
        setSetorFilter={setSetorFilter}
      />

      {/* Grid de Cards */}
      {isLoading ? (
        <div className="flex justify-center p-8"><span className="text-brand-300">Carregando documentos...</span></div>
      ) : (
        <GridCards 
          exibidos={exibidos} 
          setDocModal={setDocModal} 
          setChatDoc={setChatDoc} 
          setChatMessages={setChatMessages} 
        />
      )}


      {/* ========================================================= */}
      {/* MODAL DE VISUALIZAÇÃO DE PDF                              */}
      {/* ========================================================= */}
      <Visualizador_pdf
        docModal={docModal}
        setDocModal={setDocModal}
        setChatDoc={setChatDoc}
        setChatMessages={setChatMessages}
      />

      {/* ========================================================= */}
      {/* MODAL DO AGENTE DE IA                                     */}
      {/* ========================================================= */}
      <Agent
        chatDoc={chatDoc}
        setChatDoc={setChatDoc}
        chatMessages={chatMessages}
        isChatLoading={isChatLoading}
        chatInput={chatInput}
        setChatInput={setChatInput}
        handleSendMessage={handleSendMessage}
      />

    </div>
  );
}