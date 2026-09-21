import type { Metadata } from "next";
import { TONES } from "@/components/AccentMark";
import Container from "@/components/Container";
import ExperienceItem from "@/components/ExperienceItem";
import PageHeader from "@/components/PageHeader";
import { experience } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Research and software roles at Purdue VIP, Purdue EPICS, and Hack the Future.",
};

export default function ExperiencePage() {
  return (
    <Container className="pb-(--space-section)">
      <PageHeader title="Experience" />
      <div className="flex flex-col gap-6">
        {experience.map((item, i) => (
          <ExperienceItem key={item.org} item={item} tone={TONES[i % TONES.length]} index={i} />
        ))}
      </div>
    </Container>
  );
}
