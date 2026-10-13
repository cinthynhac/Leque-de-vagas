
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { listarVagas, buscarVaga } from "@/lib/api";
import BotaoCopiarLink from "@/components/BotaoCopiarLink";
import DescricaoDaVaga from "@/components/DescricaoDaVaga";
import FormularioDeCandidatura from "@/components/FormularioDeCandidatura";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const vagas = await listarVagas();
  return vagas.map((vaga) => ({ id: String(vaga.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vaga = await buscarVaga(id);

  if (!vaga) return { title: "Vaga não encontrada · Leque de Vagas" };

  return {
    title: `${vaga.titulo} · ${vaga.empresa}`,
    description: vaga.descricao.slice(0, 150),
  };
}

export default async function PaginaDaVaga({ params }: Props) {

  const { id } = await params;
  const vaga = await buscarVaga(id);

  if (!vaga) notFound();

  return (
    <article className="vaga">
      {/* Título e ficha vêm prontos do servidor. Não mudam depois. */}
      <h1>{vaga.titulo}</h1>
      <p>
        <Link href={`/empresas/${vaga.empresaSlug}`}>{vaga.empresa}</Link>
        {" · "}
        {vaga.area} · {vaga.senioridade} · {vaga.local}
      </p>

      {vaga.aceitaIniciante && (
        <p className="selo">Aceita quem está começando</p>
      )}

      {/* Daqui para baixo, componentes de cliente lado a lado. Cada um tem a
          própria memória, nenhum sabe do outro, e todos continuam iguais ao
          que eram na aula 03: só a origem do dado mudou. */}
      <BotaoCopiarLink titulo={vaga.titulo} />
      <DescricaoDaVaga texto={vaga.descricao} />

      <h2>Candidatar-se</h2>
      <FormularioDeCandidatura tituloDaVaga={vaga.titulo} />

      <p>
        <Link href="/vagas">← todas as vagas</Link>
      </p>
    </article>
  );
}