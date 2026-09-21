import type { Metadata } from "next";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import TagList from "@/components/TagList";
import { education } from "@/content/education";
import { profile } from "@/content/profile";
import { skills } from "@/content/skills";

export const metadata: Metadata = {
  title: "About",
  description:
    "Education, coursework, technical skills, and contact details for Nakul Iyer.",
};

const contact = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "Phone", value: profile.phone, href: profile.phoneHref },
  { label: "LinkedIn", value: profile.linkedinLabel, href: profile.linkedin, external: true },
  { label: "GitHub", value: profile.githubLabel, href: profile.github, external: true },
  { label: "Devpost", value: profile.devpostLabel, href: profile.devpost, external: true },
  { label: "Resume", value: "Download PDF", href: profile.resume, external: true },
];

const card = "rounded-card border border-line bg-surface p-8 sm:p-10";
const sectionLabel = "text-label text-ink-subtle uppercase";

export default function AboutPage() {
  return (
    <Container className="pb-(--space-section)">
      <PageHeader title="About" />

      <div className="flex flex-col gap-6">
        <section data-reveal className={card} aria-labelledby="education">
          <h2 id="education" className={sectionLabel}>
            Education
          </h2>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
            <div>
              <p className="text-h3 font-medium">{education.school}</p>
              <p className="mt-2 text-lead text-ink-muted">{education.degree}</p>
            </div>
            <p className="shrink-0 text-ink-muted">
              {education.start} — {education.end} · {education.location}
            </p>
          </div>
          <div className="mt-8 border-t border-line pt-8">
            <p className={sectionLabel}>Coursework</p>
            <div className="mt-4">
              <TagList items={education.coursework} />
            </div>
          </div>
        </section>

        <section aria-labelledby="skills">
          <h2 id="skills" className="sr-only">
            Skills
          </h2>
          <div className="grid gap-6 lg:grid-cols-3">
            {skills.map((group, i) => (
              <div
                key={group.label}
                data-reveal
                style={{ "--reveal-index": i } as React.CSSProperties}
                className={card}
              >
                <h3 className={sectionLabel}>{group.label}</h3>
                <div className="mt-6">
                  <TagList items={group.items} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section data-reveal className={card} aria-labelledby="contact">
          <h2 id="contact" className={sectionLabel}>
            Contact
          </h2>
          <dl className="mt-4">
            {contact.map((row) => (
              <div
                key={row.label}
                className="flex flex-col gap-1 border-b border-line py-5 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <dt className="text-ink-subtle">{row.label}</dt>
                <dd>
                  <a
                    href={row.href}
                    className="text-lead break-all text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-(--duration-hover) hover:decoration-accent-yellow sm:break-normal"
                    {...(row.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {row.value}
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </Container>
  );
}
