import Link from "next/link";

export default function NaoEncontrado() {
  return (
    <div className="aviso">
      <h2>404 — página não encontrada</h2>
      <p>Esse endereço não existe no Leque de Vagas.</p>
      <Link href="/">Voltar para o início</Link>
    </div>
  );
}
