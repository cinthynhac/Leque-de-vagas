export default function Loading() {
  return (
    <ul className="lista">
      {[1, 2, 3, 4].map((n) => (
        <li key={n} className="skeleton" />
      ))}
    </ul>
  );
}
