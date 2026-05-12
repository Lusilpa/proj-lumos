import { Parser } from "expr-eval";
import type { User, Documento } from "@/types";

/**
 * ============================================================================
 * MOTOR LÓGICO ABAC (Attribute-Based Access Control)
 * ============================================================================
 * 
 * Este módulo centraliza TODA a lógica de permissões do Portal Lumos.
 * Ele avalia expressões booleanas dinâmicas (ex: "departamento == 'ti' OR cargo == 'diretor'")
 * contra os atributos do usuário logado.
 * 
 * DIRETRIZ DE SEGURANÇA (Fail-Safe): 
 * Se a regra for mal formatada ou ocorrer qualquer erro de parsing,
 * o sistema DEVE retornar FALSE (Acesso Negado) para evitar vazamento de dados.
 */

// Inicializa o parser habilitando estritamente os operadores necessários
const parser = new Parser({
  operators: {
    logical: true,    // Habilita AND, OR, NOT
    comparison: true, // Habilita ==, !=, >, <, etc
    in: true,         // Habilita operador IN para arrays (ex: cargo in cargos_permitidos)
  },
});

/**
 * Avalia de forma segura se o usuário possui acesso ao documento fornecido.
 *
 * @param documento O objeto completo do documento/POP tentado.
 * @param user Os atributos do usuário logado (contexto da requisição).
 * @returns {boolean} true se o acesso for concedido, false caso contrário.
 */
export function checkAccess(documento: Documento, user: User | null | undefined): boolean {
  try {
    // Guarda de Segurança: usuário nulo = acesso negado (Fail-Safe)
    if (!user || !user.departamento || !user.cargo) return false;

    // 1. Fallback de Segurança: Regra de Intersecção Básica
    // Se o documento não tiver uma regra booleana estrita definida, 
    // avaliamos se o departamento e o cargo batem exatamente com as permissões.
    if (!documento.regra_acesso || documento.regra_acesso.trim() === "") {
      const isDepartamentoOk = user.departamento.toLowerCase() === documento.departamento_alvo.toLowerCase();
      const isCargoOk = documento.cargos_permitidos.map(c => c.toLowerCase()).includes(user.cargo.toLowerCase());

      return isDepartamentoOk && isCargoOk;
    }

    // 2. Avaliação da Álgebra Booleana (Expressão Dinâmica)
    const expr = parser.parse(documento.regra_acesso);

    // Injeção segura do contexto do usuário no motor matemático
    const result = expr.evaluate({
      departamento: user.departamento.toLowerCase(),
      cargo: user.cargo.toLowerCase(),
      // 'cargos_permitidos' atua como um array global disponível para o operador 'IN'
      cargos_permitidos: documento.cargos_permitidos.map((c) => c.toLowerCase()) as any,
    });

    return result === true;
  } catch (err) {
    // LOG DE AUDITORIA: Registro silencioso do erro para análise, mantendo o usuário protegido
    console.error(`[🔒 ABAC Engine Security Alert] Falha ao processar regra do Doc ID: "${documento.id}". Regra: "${documento.regra_acesso}"`, err);

    // Tolerância Zero: Bloqueio imediato em caso de falha matemática.
    return false;
  }
}
