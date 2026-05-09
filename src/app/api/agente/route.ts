import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt, acessiveisContext, userName, userRole, userDept } = body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key não configurada no servidor." }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemInstruction = `Você é o "Agente Lumos", o assistente de IA oficial do portal corporativo Lumos.
Você está conversando com:
- Nome: ${userName}
- Cargo: ${userRole}
- Departamento: ${userDept}

ATENÇÃO RIGOROSA DE CONFORMIDADE (COMPLIANCE - NÍVEL MÁXIMO):
O usuário SÓ PODE saber de informações contidas nos documentos aos quais ele tem permissão de acesso.
Abaixo está a lista de documentos (POPs) que este usuário possui permissão para ler:

[INÍCIO DO CONTEXTO DE DOCUMENTOS]
${acessiveisContext.map((doc: any) => `- TÍTULO: ${doc.nome}\n  SETOR: ${doc.departamento_alvo}\n  DESCRIÇÃO: ${doc.descricao}`).join("\n\n")}
[FIM DO CONTEXTO DE DOCUMENTOS]

DIRETRIZES:
1. Responda APENAS sobre o conteúdo listado acima.
2. Se o usuário perguntar sobre qualquer coisa fora deste escopo ou sobre um documento/setor que não está na lista acima, VOCÊ DEVE RECUSAR A RESPOSTA dizendo elegantemente que ele não possui Nível de Acesso (Clearance) para consultar esse assunto, conforme as políticas de RH do Lumos.
3. Não invente informações corporativas que não estejam no contexto.
4. Mantenha o tom corporativo, profissional e polido (estética Dark Academia).`;

    const fullPrompt = `${systemInstruction}\n\nPergunta do usuário: ${prompt}`;

    const result = await model.generateContent(fullPrompt);
    const responseText = result.response.text();

    return NextResponse.json({ response: responseText });
  } catch (error: any) {
    console.error("Erro na API do Agente Lumos:", error);
    return NextResponse.json({ error: error.message || "Erro interno ao processar a requisição." }, { status: 500 });
  }
}
