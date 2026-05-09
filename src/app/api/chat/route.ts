import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, docContext } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key não configurada no servidor." }, { status: 500 });
    }

    // Inicializa o cliente do Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Instrução do Sistema adaptada como prompt
    const systemInstruction = `Você é um agente assistente especializado do portal corporativo Lumos.
O usuário está consultando o seguinte documento (POP):
- Título: ${docContext?.nome || "Desconhecido"}
- Departamento Alvo: ${docContext?.departamento_alvo || "Desconhecido"}
- Descrição: ${docContext?.descricao || "Sem descrição"}

Regras:
1. Responda à pergunta do usuário de forma profissional, clara e concisa.
2. Como não temos acesso ao conteúdo completo do documento (PDF) no momento, baseie sua resposta nos metadados acima e em boas práticas de mercado para esse tipo de procedimento/setor.
3. Se não tiver certeza, sugira que o usuário leia o documento completo clicando em "Ler Documento".
4. Adote um tom corporativo polido, alinhado à estética "Dark Academia / Terroso" (tradição, clareza, seriedade).`;

    const fullPrompt = `${systemInstruction}\n\nPergunta do usuário: ${prompt}`;

    const result = await model.generateContent(fullPrompt);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    console.error("Erro na API do Gemini:", error);
    return NextResponse.json({ error: error.message || "Erro interno ao processar a requisição de IA" }, { status: 500 });
  }
}
