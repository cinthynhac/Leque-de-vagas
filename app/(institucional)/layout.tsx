export default function LayoutInstitucional({
  children,
}: {
  children: React.ReactNode;
}) {
  return <article className="texto-legal">{children}</article>;
}
