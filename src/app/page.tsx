import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";

const current = experience.filter((item) => item.end === "Present");

export default function Home() {
  return (
    <div className="flex flex-col gap-16">
      <section>
        <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {profile.name}
        </h1>
        <p className="mt-3 text-lg text-soft">{profile.headline}</p>

        <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <a
            className="rounded-md border border-ink px-4 py-2 transition-colors duration-150 hover:bg-warm"
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
          >
            Resume ↗
          </a>
          <a
            className="self-center text-soft transition-colors duration-150 hover:text-ink"
            href={`mailto:${profile.email}`}
          >
            {profile.email}
          </a>
        </div>
      </section>

      <section>
        <h2 className="text-xs uppercase tracking-widest text-soft">
          Currently
        </h2>
        <ul className="mt-4 flex flex-col">
          {current.map((item) => (
            <li
              key={item.org}
              className="flex flex-col gap-1 border-t border-line py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <div>
                <p className="font-medium text-ink">{item.role}</p>
                <p className="text-sm text-soft">{item.org}</p>
              </div>
              <p className="shrink-0 text-sm text-soft">{item.summary}</p>
            </li>
          ))}
        </ul>
        <Link
          href="/experience"
          className="mt-4 inline-block text-sm text-soft underline underline-offset-4 transition-colors duration-150 hover:text-ink"
        >
          All experience
        </Link>
      </section>

      <section>
        <h2 className="text-xs uppercase tracking-widest text-soft">
          Selected projects
        </h2>
        <div className="mt-4 grid gap-4">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
