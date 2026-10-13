import type { Metadata } from "next";
import Link from "next/link";
import { listarEmpresas, listarVagas } from "@/lib/api";
export const metadata: Metadata = {
  title: "Empresas · Leque de Vagas",
  description:
    "As empresas que publicam vagas para quem está migrando para tecnologia.",
};

export default async function Empresas() {
  const [empresas, vagas] = await Promise.all([listarEmpresas(), listarVagas()]);

  return (
    <section>
      <h1>Empresas</h1>

      <ul className="lista">
        {empresas.map((empresa) => {
          const quantas = vagas.filter(
            (vaga) => vaga.empresaSlug === empresa.slug,
          ).length;

          return (
            <li key={empresa.slug}>
              <Link href={`/empresas/${empresa.slug}`}>
                {empresa.nome}
                <span>
                  {quantas === 1 ? "1 vaga aberta" : `${quantas} vagas abertas`}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
