import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Pill from "@/components/Pill";
import SplitWords from "@/components/SplitWords";
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
    <Container className="pb-(--space-section)">
      <article>
        <header className="pt-[clamp(3rem,8vw,6rem)] pb-[clamp(2.5rem,6vw,4rem)]">
          <Pill href="/projects" variant="outline" size="sm">
            ← Projects
          </Pill>
          <h1 data-reveal="words" className="mt-10 text-h2 font-medium">
            <SplitWords text={project.name} />
          </h1>
          <p data-reveal className="mt-6 max-w-2xl text-lead text-ink-muted">
            {project.summary}
          </p>
          <div data-reveal className="mt-8">
            <TagList items={project.tech} />
          </div>
        </header>

        <div
          data-reveal
          className="rounded-card border border-line bg-surface p-8 sm:p-10"
        >
          <ul className="flex flex-col gap-5">
            {project.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-4 text-ink-muted">
                <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent-yellow" />
                <span className="max-w-3xl">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Container>
  );
}
