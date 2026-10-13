import Link from "next/link";
import { listarVagas, listarEmpresas } from "@/lib/api";

export default async function Home() {
  const [vagas, empresas] = await Promise.all([listarVagas(), listarEmpresas()]);

  const paraIniciante = vagas.filter((vaga) => vaga.aceitaIniciante).length;

  return (
    <section>
      <h1>Vagas de tecnologia para quem está migrando</h1>
      <p>
        O Leque de Vagas reúne oportunidades de início de carreira em times que
        aceitam quem está começando. São {vagas.length} vagas abertas de{" "}
        {empresas.length} empresas, e {paraIniciante} delas não exigem
        experiência anterior.
      </p>

      <p>
        <Link href="/vagas">Ver as vagas abertas →</Link>
        {" · "}
        <Link href="/empresas">Conhecer as empresas</Link>
      </p>
    </section>
  );
}
