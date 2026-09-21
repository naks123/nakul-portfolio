import Link from "next/link";
import type { Project } from "@/content/projects";
import TagList from "./TagList";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-lg border border-line bg-surf p-6 transition-colors duration-150 hover:border-ink/20">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-semibold text-ink">
          <Link href={`/projects/${project.slug}`} className="hover:underline">
            {project.name}
            <span aria-hidden> ↗</span>
          </Link>
        </h3>
        <p className="shrink-0 text-xs text-soft">
          {project.start} — {project.end}
        </p>
      </div>

      <p className="mt-3 text-sm leading-7 text-soft">{project.summary}</p>

      <div className="mt-4">
        <TagList items={project.tech} />
      </div>
    </article>
  );
}
