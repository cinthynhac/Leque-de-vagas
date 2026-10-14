"use server";

import { revalidatePath } from "next/cache";
import { EsquemaDeArquivar } from "@/lib/esquemas";
import { arquivarVaga } from "@/lib/api";

export async function arquivar(dados: FormData) {
  const analise = EsquemaDeArquivar.safeParse(Object.fromEntries(dados));
  if (!analise.success) {
    throw new Error(analise.error.issues[0]?.message ?? "Vaga inválida.");
  }

  arquivarVaga(analise.data.id);

  revalidatePath("/vagas");
}