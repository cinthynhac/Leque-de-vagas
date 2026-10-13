import { z } from "zod";

export const EsquemaDeArquivar = z.object({
  id: z.string().min(1, "Vaga não informada."),
});