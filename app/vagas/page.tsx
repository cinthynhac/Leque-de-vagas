import { Suspense } from "react";
import { listarVagas } from "@/lib/api";
import MuralDeVagas from "@/components/MuralDeVagas";
import NumerosDoCatalogo from "@/components/NumerosDoCatalogo";
import NumerosEsqueleto from "@/components/NumerosEsqueleto";
import ListaEsqueleto from "@/components/ListaEsqueleto";

export default function Vagas() {
  return (
    <>
      <h1>Vagas</h1>

      <Suspense fallback={<NumerosEsqueleto />}>
        <NumerosDoCatalogo />
      </Suspense>

      <Suspense fallback={<ListaEsqueleto />}>
        <ListagemDeVagas />
      </Suspense>
    </>
  );
}

async function ListagemDeVagas() {
  const vagas = await listarVagas();
  return <MuralDeVagas vagas={vagas} />;
}
