export default function TagList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-pill border border-line bg-bg/60 px-3 py-1 text-sm text-ink-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
