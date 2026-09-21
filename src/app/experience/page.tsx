import type { Metadata } from "next";
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
    <>
      <PageHeader title="Experience" />
      <div className="flex flex-col">
        {experience.map((item) => (
          <ExperienceItem key={item.org} item={item} />
        ))}
      </div>
    </>
  );
}
