import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import TagList from "@/components/TagList";
import { getProject, projects } from "@/content/projects";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  return { title: project.name, description: project.summary };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <article>
      <Link
        href="/projects"
        className="text-sm text-soft underline underline-offset-4 transition-colors duration-150 hover:text-ink"
      >
        ← Projects
      </Link>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink">
        {project.name}
      </h1>
      <p className="mt-2 text-sm text-soft">
        {project.start} — {project.end}
      </p>

      <div className="mt-4">
        <TagList items={project.tech} />
      </div>

      <ul className="mt-8 flex flex-col gap-4 border-t border-line pt-8">
        {project.bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 leading-7 text-soft">
            <span aria-hidden className="mt-3.5 h-px w-3 shrink-0 bg-warm" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
