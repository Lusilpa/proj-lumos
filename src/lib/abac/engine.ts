import { Parser } from "expr-eval";
import type { User } from "@/types";

// Inicializa o parser habilitando operadores lógicos e de comparação
const parser = new Parser({
  operators: {
    logical: true,
    comparison: true,
    in: true,
  },
});

/**
 * Avalia a regra booleana de acesso de um documento contra o perfil de um usuário.
 *
 * @param regra A string do Motor ABAC (Ex: "departamento == 'vendas' OR cargo == 'diretor'")
 * @param user Os atributos do usuário logado que servirão de variáveis.
 * @param cargos_permitidos (Opcional) O array de cargos extra para a regra IN.
 * @returns true se o acesso for concedido, false caso contrário.
 */
export function checkAccess(
  regra: string,
  user: User,
  cargos_permitidos: string[] = []
): boolean {
  try {
    const expr = parser.parse(regra);
    const result = expr.evaluate({
      departamento: user.departamento.toLowerCase(),
      cargo: user.cargo.toLowerCase(),
      cargos_permitidos: cargos_permitidos.map((c) => c.toLowerCase()) as any,
    });
    return result === true;
  } catch (err) {
    console.error(`[ABAC Engine] Falha ao processar regra: "${regra}"`, err);
    return false;
  }
}
