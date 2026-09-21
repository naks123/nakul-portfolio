import type { Metadata } from "next";
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
  {
    label: "LinkedIn",
    value: profile.linkedinLabel,
    href: profile.linkedin,
    external: true,
  },
  {
    label: "GitHub",
    value: profile.githubLabel,
    href: profile.github,
    external: true,
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: profile.resume,
    external: true,
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About" />

      <section>
        <h2 className="text-xs uppercase tracking-widest text-soft">
          Education
        </h2>
        <div className="mt-4 border-t border-line py-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <div>
              <h3 className="font-semibold text-ink">{education.school}</h3>
              <p className="text-sm text-soft">{education.degree}</p>
            </div>
            <p className="shrink-0 text-sm text-soft">
              {education.start} — {education.end} · {education.location}
            </p>
          </div>
          <p className="mt-4 text-sm leading-7 text-soft">
            <span className="text-ink">Coursework: </span>
            {education.coursework.join(", ")}
          </p>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xs uppercase tracking-widest text-soft">Skills</h2>
        <dl className="mt-4">
          {skills.map((group) => (
            <div
              key={group.label}
              className="grid gap-3 border-t border-line py-4 sm:grid-cols-[120px_1fr] sm:gap-6"
            >
              <dt className="font-medium text-ink">{group.label}</dt>
              <dd>
                <TagList items={group.items} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="text-xs uppercase tracking-widest text-soft">Contact</h2>
        <dl className="mt-4">
          {contact.map((row) => (
            <div
              key={row.label}
              className="flex items-baseline justify-between gap-6 border-t border-line py-4"
            >
              <dt className="font-medium text-ink">{row.label}</dt>
              <dd>
                <a
                  className="text-sm text-soft underline underline-offset-4 transition-colors duration-150 hover:text-ink"
                  href={row.href}
                  {...(row.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {row.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
