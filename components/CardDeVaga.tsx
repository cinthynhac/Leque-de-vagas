import { arquivar } from "@/app/vagas/acoes";
import BotaoDeEnviar from "@/components/BotaoDeEnviar";

export default function CardDeVaga({ vaga }) {
  return (
    <article className="cartao">
      <h3>{vaga.titulo}</h3>
      <p>{vaga.empresa} · {vaga.local}</p>

      <form action={arquivar}>
        <input type="hidden" name="id" value={vaga.id} />
        <BotaoDeEnviar enviando="Arquivando…">Arquivar</BotaoDeEnviar>
      </form>
    </article>
  );
}