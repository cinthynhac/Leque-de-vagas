import type { Vaga, Empresa } from "@/lib/tipos";

const FONTE =
  "https://raw.githubusercontent.com/Um-Leque-de-Tecnologia/lequedevagas-web/main/dados";


const CACHE_VAGAS = { next: { revalidate: 60, tags: ["vagas"] } };

const CACHE_EMPRESAS = { next: { revalidate: 3600, tags: ["empresas"] } };

const arquivadas = new Set<string>();

async function buscarVagasPublicadas(): Promise<Vaga[]> {
  const resposta = await fetch(`${FONTE}/vagas.json`, CACHE_VAGAS);

  if (!resposta.ok) {
    throw new Error(`vagas.json respondeu ${resposta.status}`);
  }

  return resposta.json();
}

export async function listarVagas(): Promise<Vaga[]> {
  const publicadas = await buscarVagasPublicadas();
  return publicadas.filter((vaga) => !arquivadas.has(vaga.id));
}

export function arquivarVaga(id: string): void {
  arquivadas.add(id);
}

export async function buscarVaga(id: string): Promise<Vaga | undefined> {
  const vagas = await listarVagas();
  return vagas.find((vaga) => vaga.id === id);
}

export async function listarEmpresas(): Promise<Empresa[]> {
  const resposta = await fetch(`${FONTE}/empresas.json`, CACHE_EMPRESAS);
  if (!resposta.ok) {
    throw new Error(`empresas.json respondeu ${resposta.status}`);
  }
  return resposta.json();
}

export async function buscarEmpresa(slug: string): Promise<Empresa | undefined> {
  const empresas = await listarEmpresas();
  return empresas.find((empresa) => empresa.slug === slug);
}