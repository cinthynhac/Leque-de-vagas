"use client";

import { useState } from "react";
import Filtros from "./Filtros";
import CardDeVaga from "./CardDeVaga";
import { Vaga } from "@/lib/tipos";

export default function MuralDeVagas({ vagas }: { vagas: Vaga[] }) {
  const [busca, setBusca] = useState("");
  const [area, setArea] = useState("Todas");

  const areas = ["Todas", ...new Set(vagas.map((v) => v.area))];

  const visiveis = vagas.filter((vaga) => {
    const termo = busca.toLowerCase();
    const bateBusca =
      vaga.titulo.toLowerCase().includes(termo) ||
      vaga.empresa.toLowerCase().includes(termo);
    const bateArea = area === "Todas" || vaga.area === area;
    return bateBusca && bateArea;
  });

  const aceitamIniciante = visiveis.filter((v) => v.aceitaIniciante).length;

  return (
    <section>
      <Filtros
        busca={busca}
        aoMudarBusca={setBusca}
        area={area}
        aoMudarArea={setArea}
        areas={areas}
      />

      <p className="numeros">
        <strong>{visiveis.length}</strong> de {vagas.length} vagas ·{" "}
        <strong>{aceitamIniciante}</strong> aceitam quem está começando
      </p>

      {visiveis.length === 0 ? (
        <p>Nenhuma vaga com esse filtro. Tente outra palavra.</p>
      ) : (
        <ul className="lista">
          {visiveis.map((vaga) => (
            <CardDeVaga key={vaga.id} vaga={vaga} />
          ))}
        </ul>
      )}
    </section>
  );
}
