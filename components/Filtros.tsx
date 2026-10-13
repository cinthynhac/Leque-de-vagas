export default function Filtros({  busca,
  aoMudarBusca,
  area,
  aoMudarArea,
  areas,
}: {
  busca: string;
  aoMudarBusca: (valor: string) => void;
  area: string;
  aoMudarArea: (valor: string) => void;
  areas: string[];
}) {
  return (
    <div className="filtros">
      <label className="sr-only" htmlFor="busca">
        Buscar vaga
      </label>
      <input
        id="busca"
        type="search"
        placeholder="Buscar por título ou empresa"
        value={busca}
        onChange={(e) => aoMudarBusca(e.target.value)}
      />

      <div className="chips">
        {areas.map((nome) => (
          <button
            key={nome}
            type="button"
            className={nome === area ? "chip ativo" : "chip"}
            onClick={() => aoMudarArea(nome)}
          >
            {nome}
          </button>
        ))}
      </div>
    </div>
  );
}
