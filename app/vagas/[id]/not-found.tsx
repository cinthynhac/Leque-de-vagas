import Link from "next/link";
export default function VagaNaoEncontrada() {
  return (
    <div className="aviso">
      <h2>Vaga não encontrada</h2>
      <p>Ela pode ter sido preenchida ou removida.</p>
      <Link href="/vagas">Ver todas as vagas</Link>
    </div>
  );
}
