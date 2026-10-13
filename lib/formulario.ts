import type { ZodError } from "zod";
export function porCampo(erro: ZodError): Record<string, string> {
  const erros: Record<string, string> = {};

  for (const problema of erro.issues) {
    const campo = String(problema.path[0] ?? "_");
    if (!erros[campo]) erros[campo] = problema.message;
  }

  return erros;
}
export function valoresDe(dados: FormData): Record<string, string> {
  const valores: Record<string, string> = {};

  for (const [chave, valor] of dados.entries()) {
    if (typeof valor === "string") valores[chave] = valor;
  }

  return valores;