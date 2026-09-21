import type { Experience } from "@/content/experience";

export default function ExperienceItem({ item }: { item: Experience }) {
  return (
    <article className="border-t border-line py-6">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <div>
          <h3 className="font-semibold text-ink">{item.role}</h3>
          <p className="text-sm text-soft">{item.org}</p>
        </div>
        <p className="shrink-0 text-sm text-soft">
          {item.start} — {item.end}
        </p>
      </div>

      <ul className="mt-4 flex flex-col gap-3">
        {item.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 text-sm leading-7 text-soft">
            <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-warm" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
