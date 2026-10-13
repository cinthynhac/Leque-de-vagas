export default function LayoutVagas({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="area-vagas">
      <p className="secao">Vagas abertas</p>
      {children}
    </section>
  );
}
