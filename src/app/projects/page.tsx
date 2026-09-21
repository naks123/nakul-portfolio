import type { Metadata } from "next";
import { TONES } from "@/components/AccentMark";
import Container from "@/components/Container";
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
    <Container className="pb-(--space-section)">
      <PageHeader title="Projects" />
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            tone={TONES[(i + 1) % TONES.length]}
            index={i}
          />
        ))}
      </div>
    </Container>
  );
}
