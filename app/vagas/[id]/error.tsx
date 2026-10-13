"use client";

export default function ErroDaVaga({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="aviso">
      <h2>Não conseguimos carregar esta vaga</h2>

      {/* Português de gente. NÃO mostre error.message para quem usa o site:
          "fetch failed" não ajuda ninguém e ainda assusta. O digest é um
          identificador que você cruza com o log do servidor. */}
      <p>
        A conexão com a nossa fonte de dados falhou. Isso costuma ser
        momentâneo.
      </p>
      {error.digest && <p className="tecnico">id do erro: {error.digest}</p>}

      <button type="button" onClick={() => retry()}>
        Tentar de novo
      </button>
    </div>
  );
}