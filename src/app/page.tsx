import { TONES } from "@/components/AccentMark";
import Container from "@/components/Container";
import GitHubPreview from "@/components/GitHubPreview";
import HeroBlobs from "@/components/HeroBlobs";
import HeroVisual from "@/components/HeroVisual";
import Marquee from "@/components/Marquee";
import Pill from "@/components/Pill";
import ProjectCard from "@/components/ProjectCard";
import SocialLinks from "@/components/SocialLinks";
import SplitWords from "@/components/SplitWords";
import Timeline from "@/components/Timeline";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";

// Oldest first, so the numbered sequence reads as a timeline.
const byStart = (s: string) => Date.parse(`1 ${s}`);
const chronological = [...experience].sort((a, b) => byStart(a.start) - byStart(b.start));

const stack = skills.flatMap((group) => group.items);

export default function Home() {
  return (
    <>
      {/* Hero. overflow-x-clip (not hidden) keeps the blobs from widening the
          page while still letting the GitHub hover card hang below. */}
      <section className="overflow-x-clip">
        <Container className="grid items-center gap-10 pt-[clamp(3.5rem,9vw,7rem)] pb-[clamp(3rem,8vw,6rem)] lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h1 data-reveal="words" className="text-display font-medium">
              <SplitWords text={profile.name} />
            </h1>
            <div
              data-reveal
              style={{ "--reveal-index": 3 } as React.CSSProperties}
              className="mt-10 sm:mt-12"
            >
              <SocialLinks variant="circle" githubPreview={<GitHubPreview />} />
            </div>
          </div>
          <HeroVisual fallback={<HeroBlobs />} />
        </Container>
      </section>

      <Marquee items={stack} label="Tech stack" />

      <section className="py-(--space-section)">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 data-reveal="words" className="text-h2 font-medium">
              <SplitWords text="Experience" />
            </h2>
            <div data-reveal>
              <Pill href="/experience" variant="outline">
                All experience
              </Pill>
            </div>
          </div>
          <Timeline items={chronological} />
        </Container>
      </section>

      <section className="pb-(--space-section)">
        <Container>
          <h2 data-reveal="words" className="text-h2 font-medium">
            <SplitWords text="Selected projects" />
          </h2>
          <div className="mt-12 grid gap-6 sm:mt-16 md:grid-cols-2">
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
      </section>

      <section className="border-t border-line py-(--space-section)">
        <Container className="flex flex-col items-start gap-10">
          <h2 data-reveal="words" className="text-h2 font-medium">
            <SplitWords text="Contact" />
          </h2>
          <div data-reveal className="flex flex-wrap gap-3">
            <Pill href={profile.resume} external>
              Resume ↗
            </Pill>
            <Pill href={`mailto:${profile.email}`} variant="outline">
              {profile.email}
            </Pill>
          </div>
        </Container>
      </section>
    </>
  );
}
