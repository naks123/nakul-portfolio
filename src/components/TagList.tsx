export default function TagList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-md border border-line px-2 py-0.5 text-xs text-soft"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
