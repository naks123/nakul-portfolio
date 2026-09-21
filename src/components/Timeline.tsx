"use client";

import { useEffect, useRef, useState } from "react";
import type { Experience } from "@/content/experience";

/* Numbered 01/02/03 sequence. The step crossing mid-screen is "active": its
   dot turns yellow and the other steps dim. Until the visitor scrolls (and
   without JavaScript) every step is fully lit. Dimmed text stays at 50%
   white, which still meets AA contrast on black. */
export default function Timeline({ items }: { items: Experience[] }) {
  const [active, setActive] = useState<number | null>(null);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.step));
          }
        }
      },
      { rootMargin: "-42% 0px -48% 0px" },
    );

    steps.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <ol className="relative mt-16 sm:mt-20">
      <span aria-hidden="true" className="absolute top-4 bottom-4 left-[0.7rem] w-px bg-line" />

      {items.map((item, i) => {
        const lit = active === null || active === i;

        return (
          <li
            key={item.org}
            ref={(el) => {
              steps.current[i] = el;
            }}
            data-step={i}
            data-reveal
            style={{ "--reveal-index": i } as React.CSSProperties}
            className="relative grid grid-cols-[1.5rem_1fr] gap-x-6 pb-16 last:pb-0 sm:gap-x-10 sm:pb-20"
          >
            <span
              aria-hidden="true"
              className={`mt-[0.35rem] ml-[0.4rem] block size-2.5 rounded-full transition-colors duration-(--duration-hover) ${
                active === i ? "bg-accent-yellow" : "bg-line-strong"
              }`}
            />

            <div
              className={`transition-colors duration-(--duration-hover) ${
                lit ? "text-ink" : "text-ink-subtle"
              }`}
            >
              <p className="text-label uppercase tabular-nums">
                {String(i + 1).padStart(2, "0")}
                <span className="mx-2" aria-hidden="true">
                  ·
                </span>
                {item.start} — {item.end}
              </p>
              <h3 className="mt-4 text-h3 font-medium">{item.role}</h3>
              <p className={`mt-3 text-lead ${lit ? "text-ink-muted" : ""}`}>{item.org}</p>
              <p className={`mt-2 max-w-2xl ${lit ? "text-ink-muted" : ""}`}>{item.summary}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
