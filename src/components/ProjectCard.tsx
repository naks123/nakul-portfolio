import Link from "next/link";
import type { Tone } from "@/components/AccentMark";
import type { Project } from "@/content/projects";
import TagList from "./TagList";

const GLOW: Record<Tone, string> = {
  yellow: "from-accent-yellow",
  red: "from-accent-red",
  blue: "from-accent-blue",
};

export default function ProjectCard({
  project,
  tone,
  index = 0,
}: {
  project: Project;
  tone: Tone;
  index?: number;
}) {
  return (
    <article
      data-reveal
      style={{ "--reveal-index": index } as React.CSSProperties}
      className="group relative flex min-h-[21rem] flex-col overflow-hidden rounded-card border border-line bg-surface p-8 transition-colors duration-(--duration-hover) hover:border-line-strong sm:p-10"
    >
      {/* Abstract accent glow, cropped by the card edge. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute -right-24 -bottom-32 size-80 rounded-full bg-radial ${GLOW[tone]} to-transparent to-65% opacity-35 blur-2xl transition-opacity duration-(--duration-hover) group-hover:opacity-55`}
      />

      <div className="relative flex items-start justify-between gap-6">
        <h3 className="text-h3 font-medium">
          {/* Stretched link: the whole card is clickable, one tab stop. */}
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {project.name}
          </Link>
        </h3>
        <span
          aria-hidden="true"
          className="grid size-12 shrink-0 place-items-center rounded-full bg-surface-2 text-ink transition-colors duration-(--duration-hover) group-hover:bg-ink group-hover:text-bg"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>

      <p className="relative mt-4 max-w-md text-ink-muted">{project.summary}</p>

      <div className="relative mt-auto pt-10">
        <TagList items={project.tech} />
      </div>
    </article>
  );
}
