import AccentMark, { type Tone } from "@/components/AccentMark";
import type { Experience } from "@/content/experience";

export function experienceAnchor(item: Experience) {
  return item.org.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function ExperienceItem({
  item,
  tone,
  index = 0,
}: {
  item: Experience;
  tone: Tone;
  index?: number;
}) {
  return (
    <article
      id={experienceAnchor(item)}
      data-reveal
      style={{ "--reveal-index": index } as React.CSSProperties}
      className="scroll-mt-32 rounded-card border border-line bg-surface p-8 sm:p-10"
    >
      <div className="flex items-center gap-4">
        <AccentMark tone={tone} />
        <p className="text-label text-ink-subtle uppercase">
          {item.start} — {item.end}
        </p>
      </div>

      <h2 className="mt-8 text-h3 font-medium">{item.role}</h2>
      <p className="mt-3 text-lead text-ink-muted">{item.org}</p>

      <ul className="mt-8 flex flex-col gap-4 border-t border-line pt-8">
        {item.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-4 text-ink-muted">
            <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent-yellow" />
            <span className="max-w-3xl">{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
