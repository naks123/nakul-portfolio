export default function PageHeader({
  title,
  intro,
}: {
  title: string;
  intro?: string;
}) {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
      {intro ? <p className="mt-3 max-w-xl text-soft">{intro}</p> : null}
    </div>
  );
}
