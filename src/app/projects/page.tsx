import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A Monte Carlo portfolio risk engine and a web-based reinforcement learning experiment.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader title="Projects" />
      <div className="grid gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </>
  );
}
